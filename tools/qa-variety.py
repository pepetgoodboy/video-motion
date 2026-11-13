#!/usr/bin/env python3
"""Gate variasi visual — mengukur "monoton" dari piksel, bukan dari niat.

Kenapa ada: 8 video pertama punya kode V berbeda-beda, tapi contact sheet-nya terlihat
sama: judul di pojok kiri-atas + kotak kecil + label mono, 50-60% layar kosong. Kode V
hanya mengganti material; tata letak tidak pernah dipaksa berubah. Gate ini mengukur
tiga hal yang membuat video terasa sama, langsung dari MP4 (atau folder snapshot PNG):

  1. occupancy   — porsi area aman yang terisi visual (bukan latar polos) per scene
  2. layout-kembar — dua scene berurutan dengan peta isi yang hampir identik
  3. look-mirip  — sidik visual video ini vs video lain di videos/*/renders

Pakai:
  python3 tools/qa-variety.py videos/<slug>/renders/<slug>.mp4 --project videos/<slug>
  python3 tools/qa-variety.py videos/<slug>/renders/<slug>.mp4 --scenes 0:8,8:15,15:24
  python3 tools/qa-variety.py videos/<slug>/qc/snap/            # folder PNG snapshot (pra-render)
  python3 tools/qa-variety.py --calibrate                       # bandingkan semua video lama

Exit 1 kalau ada FAIL.
"""
import glob, json, os, re, subprocess, sys
import numpy as np

W, H = 108, 192                      # 1080x1920 / 10
SAFE = (7, 95, 24, 146)              # x0,x1,y0,y1 → area aman 72-952 x 240-1460
GRID = (9, 16)                       # sidik layout (kolom, baris)
BG_DIST = 26                         # jarak warna minimal agar dianggap "isi"

# Ambang dikalibrasi 10 Nov 2026 dari 9 video lama (python3 tools/qa-variety.py --calibrate):
#   video "slide" yang terasa monoton  → median occupancy 0.05–0.18
#   video yang terasa kaya (docker, struktur-folder, cara-coba, bikin-salin) → 0.33–0.45
OCC_FAIL, OCC_WARN = 0.10, 0.20      # per scene
VID_OCC_FAIL, VID_OCC_WARN = 0.20, 0.28  # median semua scene; card boleh override via --min-occ
TWIN_SIM = 0.72                      # layout scene berurutan hampir identik (docker S4→S5 = 0.73)
# Masker "bukan-latar" jenuh kalau layar penuh terisi (occupancy ≥ 0,5): semua sel grid terisi,
# semua scene tampak kembar (false positive di video #14: laptop ≈ jalan ≈ kardus, 0,79).
# Untuk pasangan yang sama-sama padat, bandingkan kepadatan TEPI per sel. Kalibrasi 10 Nov 2026:
# kembar asli (baca-cari LESS→GREP) 0,76 · bukan kembar (#14 jalan→kardus) 0,71.
DENSE_OCC, EDGE_TWIN = 0.5, 0.74
LOOK_WARN, LOOK_FAIL = 0.78, 0.85    # vs video lain; FAIL hanya terhadap 3 video terbaru


def frame_at(src, t):
    out = subprocess.run(
        ["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", src, "-frames:v", "1",
         "-vf", f"scale={W}:{H}:flags=area", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
        capture_output=True, check=True).stdout
    if len(out) < W * H * 3:
        return None
    return np.frombuffer(out[:W * H * 3], np.uint8).reshape(H, W, 3).astype(np.int16)


def png(path):
    out = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", path, "-vf", f"scale={W}:{H}:flags=area",
         "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(out[:W * H * 3], np.uint8).reshape(H, W, 3).astype(np.int16)


def duration(src):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "csv=p=0", src], capture_output=True, text=True)
    return float(r.stdout.strip())


def fg_mask(img):
    """Isi = piksel yang jauh dari warna latar dominan (modus warna terkuantisasi)."""
    q = (img // 24).reshape(-1, 3)
    keys = q[:, 0] * 10000 + q[:, 1] * 100 + q[:, 2]
    vals, counts = np.unique(keys, return_counts=True)
    k = vals[counts.argmax()]
    bg = img.reshape(-1, 3)[keys == k].mean(axis=0)
    dist = np.abs(img - bg).max(axis=2)
    return dist > BG_DIST


def occupancy(mask):
    x0, x1, y0, y1 = SAFE
    return float(mask[y0:y1, x0:x1].mean())


def layout_grid(mask):
    x0, x1, y0, y1 = SAFE
    m = mask[y0:y1, x0:x1].astype(np.float32)
    gx, gy = GRID
    hh, ww = m.shape
    return np.array([[m[r * hh // gy:(r + 1) * hh // gy, c * ww // gx:(c + 1) * ww // gx].mean()
                      for c in range(gx)] for r in range(gy)]).ravel()


def edge_grid(img):
    g = img.mean(axis=2)
    gx = np.abs(np.diff(g, axis=1))[:-1, :]
    gy = np.abs(np.diff(g, axis=0))[:, :-1]
    e = (np.hypot(gx, gy) > 18).astype(np.float32)
    x0, x1, y0, y1 = SAFE
    e = e[y0:y1, x0:x1]
    gxn, gyn = GRID
    hh, ww = e.shape
    v = np.array([[e[r * hh // gyn:(r + 1) * hh // gyn, c * ww // gxn:(c + 1) * ww // gxn].mean()
                   for c in range(gxn)] for r in range(gyn)]).ravel()
    return v / (v.sum() + 1e-6)


def grid_sim(a, b):
    # 1 - jarak L1 ternormalisasi; 1 = identik
    return float(1 - np.abs(a - b).sum() / max(a.sum() + b.sum(), 1e-6))


def hist(img):
    q = (img // 64).reshape(-1, 3)        # 4x4x4
    idx = q[:, 0] * 16 + q[:, 1] * 4 + q[:, 2]
    h = np.bincount(idx, minlength=64).astype(np.float32)
    return h / h.sum()


def cos(a, b):
    return float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-9))


def scenes_from_project(proj):
    html = open(os.path.join(proj, "index.html"), encoding="utf8").read()
    out = []
    for m in re.finditer(r"<[^>]*data-composition-src[^>]*>", html):
        tag = m.group(0)
        s = re.search(r'data-start="([0-9.]+)"', tag)
        d = re.search(r'data-duration="([0-9.]+)"', tag)
        if s and d:
            out.append((float(s.group(1)), float(s.group(1)) + float(d.group(1))))
    out.sort()
    return out


def look_fingerprint(src, n=8):
    d = duration(src)
    frames = [frame_at(src, d * (i + 0.5) / n) for i in range(n)]
    frames = [f for f in frames if f is not None]
    h = np.mean([hist(f) for f in frames], axis=0)
    g = np.mean([layout_grid(fg_mask(f)) for f in frames], axis=0)
    occ = float(np.mean([occupancy(fg_mask(f)) for f in frames]))
    return {"hist": h.tolist(), "grid": g.tolist(), "occ": occ}


def look_sim(a, b):
    return 0.5 * cos(np.array(a["hist"]), np.array(b["hist"])) + \
           0.5 * grid_sim(np.array(a["grid"]), np.array(b["grid"]))


def cached_fingerprint(src):
    cache = os.path.join(os.path.dirname(os.path.abspath(src)), ".look.json")
    mt = os.path.getmtime(src)
    if os.path.exists(cache):
        c = json.load(open(cache))
        if c.get("src") == os.path.basename(src) and c.get("mtime") == mt:
            return c["fp"]
    fp = look_fingerprint(src)
    try:
        json.dump({"src": os.path.basename(src), "mtime": mt, "fp": fp}, open(cache, "w"))
    except OSError:
        pass
    return fp


def other_videos(exclude):
    picks = []
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # repo root, apa pun cwd-nya
    for d in sorted(glob.glob(os.path.join(root, "videos", "*", ""))):
        slug = os.path.basename(d.rstrip("/"))
        if slug.startswith("_") or "presenter-test" in slug:
            continue
        cands = [f for f in glob.glob(os.path.join(d, "renders", "*.mp4"))
                 if not re.search(r"raw120|draft|test|pregain", os.path.basename(f))]
        if not cands:
            continue
        best = max(cands, key=os.path.getmtime)
        if os.path.abspath(best) != os.path.abspath(exclude):
            picks.append((slug, best))
    return picks


def calibrate():
    vids = other_videos("")
    fps = {s: cached_fingerprint(p) for s, p in vids}
    print("occupancy rata-rata per video (8 sampel):")
    for s in fps:
        print(f"  {fps[s]['occ']:.3f}  {s}")
    print("\nkemiripan look antar video (0..1):")
    names = list(fps)
    pairs = []
    for i in range(len(names)):
        for j in range(i + 1, len(names)):
            pairs.append((look_sim(fps[names[i]], fps[names[j]]), names[i], names[j]))
    for sim, a, b in sorted(pairs, reverse=True):
        print(f"  {sim:.3f}  {a}  ~  {b}")


def main():
    args = sys.argv[1:]
    if "--calibrate" in args:
        calibrate()
        return 0
    if not args:
        print(__doc__)
        return 2
    src = args[0]
    opt = lambda k: args[args.index(k) + 1] if k in args else None
    fails, warns = [], []
    vid_fail = float(opt("--min-occ")) if opt("--min-occ") else VID_OCC_FAIL
    vid_warn = vid_fail + (VID_OCC_WARN - VID_OCC_FAIL)

    # ---- kumpulkan frame per scene
    per_scene = []
    if os.path.isdir(src):
        num = lambda f: float(m.group(1)) if (m := re.search(r"([0-9]+(?:\.[0-9]+)?)s?\.png$", f)) else 0.0
        files = sorted(glob.glob(os.path.join(src, "*.png")), key=lambda f: (num(f), f))
        per_scene = [(os.path.basename(f), [png(f)]) for f in files]
    else:
        if opt("--scenes"):
            slots = [tuple(map(float, s.split(":"))) for s in opt("--scenes").split(",")]
        elif opt("--project"):
            slots = scenes_from_project(opt("--project"))
        else:
            d = duration(src)
            slots = [(d * i / 8, d * (i + 1) / 8) for i in range(8)]
        for i, (a, b) in enumerate(slots):
            ts = [a + (b - a) * f for f in (0.3, 0.55, 0.8)]
            per_scene.append((f"S{i + 1} {a:.1f}-{b:.1f}s", [x for x in (frame_at(src, t) for t in ts) if x is not None]))

    # ---- 1. occupancy + 2. layout kembar
    print("=== VARIASI VISUAL ===")
    grids, occs, edges = [], [], []
    for name, frames in per_scene:
        masks = [fg_mask(f) for f in frames]
        occ = float(np.median([occupancy(m) for m in masks]))
        grid = np.mean([layout_grid(m) for m in masks], axis=0)
        grids.append(grid)
        occs.append(occ)
        edges.append(np.mean([edge_grid(f) for f in frames], axis=0))
        tag = "ok"
        if occ < OCC_FAIL:
            tag = "FAIL kosong"; fails.append(f"{name}: occupancy {occ:.2f} < {OCC_FAIL}")
        elif occ < OCC_WARN:
            tag = "WARN tipis"; warns.append(f"{name}: occupancy {occ:.2f} < {OCC_WARN}")
        print(f"  {name:<18} occupancy {occ:.2f}  {tag}")
    med = float(np.median(occs)) if occs else 0.0
    print(f"  median occupancy {med:.2f} (FAIL < {vid_fail:.2f}, WARN < {vid_warn:.2f})")
    if med < vid_fail:
        fails.append(f"median occupancy {med:.2f} < {vid_fail:.2f} — layar kebanyakan kosong (gejala 'slide')")
    elif med < vid_warn:
        warns.append(f"median occupancy {med:.2f} < {vid_warn:.2f}")
    twins = 0
    for i in range(1, len(grids)):
        if min(occs[i - 1], occs[i]) >= DENSE_OCC:
            s, lim, kind = float(1 - 0.5 * np.abs(edges[i - 1] - edges[i]).sum()), EDGE_TWIN, "tepi"
        else:
            s, lim, kind = grid_sim(grids[i - 1], grids[i]), TWIN_SIM, "isi"
        if s > lim:
            twins += 1
            warns.append(f"layout {per_scene[i - 1][0]} ≈ {per_scene[i][0]} (sim {kind} {s:.2f})")
    if len(grids) >= 4 and twins >= len(grids) // 2:
        fails.append(f"{twins}/{len(grids) - 1} pasangan scene berurutan berlayout kembar")

    # ---- 3. look vs video lain (hanya untuk MP4)
    if not os.path.isdir(src):
        me = look_fingerprint(src)
        others = other_videos(src)
        recent = {s for s, p in sorted(others, key=lambda x: os.path.getmtime(x[1]))[-3:]}
        sims = sorted(((look_sim(me, cached_fingerprint(p)), s) for s, p in others), reverse=True)
        print("\n  look paling mirip:")
        for sim, s in sims[:3]:
            print(f"    {sim:.3f}  {s}{'  (3 terbaru)' if s in recent else ''}")
        for sim, s in sims:
            if sim >= LOOK_FAIL and s in recent:
                fails.append(f"look {sim:.2f} ≈ {s} (3 video terbaru, ≥ {LOOK_FAIL})")
            elif sim >= LOOK_WARN:
                warns.append(f"look {sim:.2f} ≈ {s} (≥ {LOOK_WARN})")

    print()
    for w in warns:
        print("  WARN", w)
    for f in fails:
        print("  FAIL", f)
    print(f"\nverdict: {'FAIL' if fails else ('WARN' if warns else 'PASS')}")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
