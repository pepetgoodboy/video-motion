#!/usr/bin/env python3
"""QC gate untuk struktur-folder-linux.

Mengukur artefak yang benar-benar lolos ke MP4 final:
  1. spec container & faststart
  2. frame hitam / beku
  3. ghosting (double exposure) — artefak blend 120->60
  4. cadence gerak per scene
  5. loudness EBU R128 + dead air VO
  6. zona kosong (scene yang isinya tinggal kertas polos)
"""
import json, subprocess, sys, numpy as np

MP4 = sys.argv[1] if len(sys.argv) > 1 else "renders/final.mp4"
SLOTS = [("S1", 0, 9), ("S2", 9, 22), ("S3", 22, 34), ("S4", 34, 45), ("S5", 45, 59), ("S6", 59, 68)]
W, H = 135, 240
fails, warns, notes = [], [], []


def sh(cmd, **kw):
    return subprocess.run(cmd, capture_output=True, **kw)


def probe():
    p = sh(["ffprobe", "-v", "error", "-of", "json", "-show_entries",
            "format=duration,size,bit_rate",
            "-show_entries", "stream=codec_type,codec_name,width,height,r_frame_rate,nb_frames,pix_fmt,profile", MP4])
    return json.loads(p.stdout)


def gray():
    p = sh(["ffmpeg", "-v", "error", "-i", MP4, "-vf", f"scale={W}:{H},format=gray", "-f", "rawvideo", "-"])
    d = np.frombuffer(p.stdout, dtype=np.uint8)
    return d[: len(d) // (W * H) * (W * H)].reshape(-1, H, W).astype(np.float32)


def loudness(ss=None, to=None):
    a = ["ffmpeg", "-hide_banner"]
    if ss is not None:
        a += ["-ss", str(ss), "-to", str(to)]
    a += ["-i", MP4, "-af", "ebur128=peak=true", "-f", "null", "-"]
    out = sh(a).stderr.decode()
    i = [l.split("I:")[1].split("LUFS")[0].strip() for l in out.splitlines() if "I:" in l]
    pk = [l.split("Peak:")[1].split("dBFS")[0].strip() for l in out.splitlines() if "Peak:" in l]
    return (float(i[-1]) if i else None, float(pk[-1]) if pk else None)


def main():
    info = probe()
    v = next(s for s in info["streams"] if s["codec_type"] == "video")
    a = next((s for s in info["streams"] if s["codec_type"] == "audio"), None)
    dur = float(info["format"]["duration"])
    num, den = v["r_frame_rate"].split("/")
    fps = int(num) / int(den)

    print(f"== SPEC ==\n  {v['width']}x{v['height']} @ {v['r_frame_rate']} {v['codec_name']}/{v.get('profile')}/{v['pix_fmt']}")
    print(f"  frames {v.get('nb_frames')}  dur {dur:.3f}s  {float(info['format']['bit_rate'])/1e6:.2f} Mbps")
    print(f"  audio {a['codec_name'] if a else 'NONE'}")
    if v["width"] != 1080 or v["height"] != 1920:
        fails.append(f"resolusi {v['width']}x{v['height']}")
    if v["pix_fmt"] != "yuv420p":
        fails.append(f"pix_fmt {v['pix_fmt']}")
    if not a:
        fails.append("tidak ada audio")
    head = open(MP4, "rb").read(2_000_000)
    if not (0 < head.find(b"moov") < (head.find(b"mdat") if head.find(b"mdat") > 0 else 10**9)):
        warns.append("faststart tidak terdeteksi")

    f = gray()
    n = len(f)
    d = np.abs(np.diff(f, axis=0)).mean(axis=(1, 2))
    print(f"\n== FRAME ==\n  {n} frame terbaca ({n/dur:.1f} fps)")

    dark = int((f.max(axis=(1, 2)) < 8).sum())
    print(f"  frame hitam: {dark}")
    if dark:
        fails.append(f"{dark} frame hitam")

    # runs of near-identical frames
    static = d < 0.02
    fps_n = n / dur
    runs, cur = [], 0
    for x in static:
        if x:
            cur += 1
        else:
            if cur:
                runs.append(cur)
            cur = 0
    if cur:
        runs.append(cur)
    long = [r for r in runs if r / fps_n >= 0.5]
    print(f"  hold total {static.sum()/fps_n:.1f}s; blok beku >=0.5s: {len(long)}")
    if long:
        fails.append(f"{len(long)} blok beku >=0.5s")

    print("\n== GHOSTING (double exposure) ==")
    # Ghost sejati = frame yang mirip rata-rata dua tetangganya, padahal kedua
    # tetangganya berbeda jauh. Ini tanda satu frame = hasil blending dua posisi.
    n = len(f)
    ghost = 0
    worst = []
    for i in range(1, n - 1):
        nb = np.abs(f[i + 1] - f[i - 1]).mean()
        if nb < 3:
            continue
        a = np.abs(f[i] - f[i - 1]).mean()
        b = np.abs(f[i] - f[i + 1]).mean()
        mid = np.abs(f[i] - (f[i - 1] + f[i + 1]) / 2).mean()
        if mid < 0.35 * nb and a > 0.2 * nb and b > 0.2 * nb:
            ghost += 1
            worst.append((i / fps, round(float(mid), 2), round(float(nb), 1)))
    print(f"  frame ghost (mirip rata-rata tetangga): {ghost}")
    if worst:
        print("  contoh:", ", ".join(f"t={t}s" for t, _, _ in worst[:8]))
    if ghost > 10:
        fails.append(f"{ghost} frame ghosting (double exposure)")

    print("\n== CADENCE PER SCENE ==")
    fps_n = n / dur
    for name, s, e in SLOTS:
        seg = d[int(s * fps_n): int(e * fps_n)]
        seg = seg[seg > 0.0]
        uniq = int((seg > 0.5).sum())
        print(f"  {name}: motion frames {uniq}/{len(seg)}  ({uniq/(e-s):.1f} fps visual)  mean {seg.mean():.3f}")
        if uniq / (e - s) < 8:
            warns.append(f"{name} gerak visual hanya {uniq/(e-s):.0f} fps")

    print("\n== LOUDNESS ==")
    i, pk = loudness()
    print(f"  integrated {i} LUFS, true peak {pk} dBFS")
    if i is not None and i < -16:
        fails.append(f"terlalu pelan: {i} LUFS (target -14)")
    if i is not None and i > -12:
        warns.append(f"terlalu keras: {i} LUFS")
    for name, s, e in SLOTS:
        si, _ = loudness(s + 0.2, e - 0.1)
        print(f"  {name}: {si} LUFS")

    print("\n== ZONA KOSONG ==")
    for name, s, e in SLOTS:
        seg = f[int(s * fps_n): int(e * fps_n)]
        med = np.median(seg, axis=0)
        cov = np.array([(np.abs(x - med) > 14).mean() for x in seg])
        low = (cov < 0.05).mean() * 100
        print(f"  {name}: rata-rata isi {cov.mean()*100:4.0f}%  frame nyaris kosong {low:4.1f}%")
        if low > 12:
            warns.append(f"{name} punya {low:.0f}% frame nyaris kosong")

    print("\n== HASIL ==")
    for x in fails:
        print(f"  FAIL {x}")
    for x in warns:
        print(f"  WARN {x}")
    if not fails:
        print("  PASS — nol pelanggaran kritis")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
