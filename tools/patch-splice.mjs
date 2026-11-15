#!/usr/bin/env node
// Render tambalan untuk video 3D (serial): render ulang scene tertentu saja, lalu sambung ke render penuh
// di frame yang sama (start × fps). Audio tetap dari render penuh. Menghemat render ulang ±70 menit.
//
// Pemakaian:
//   node tools/patch-splice.mjs videos/<slug> S4,S8                 # render tambalan + sambung + QA
//   node tools/patch-splice.mjs videos/<slug> S4,S8 --gain -2.6     # + koreksi loudness (dB) di audio
//   node tools/patch-splice.mjs videos/<slug> S4,S8 --no-render     # pakai renders/patch-s*.mp4 yang sudah ada
//   node tools/patch-splice.mjs videos/<slug> S1 --with S4,S8       # render S1 baru + pakai ulang tambalan lama S4,S8
//   opsi lain: --fps 30 · --full renders/<slug>.mp4 · --out renders/<slug>-final.mp4
//
// PENTING: sambungan selalu dari render penuh ASLI. Revisi kedua wajib menyebut tambalan lama lewat --with,
// kalau tidak perbaikan sebelumnya hilang dari final.
//
// Syarat: build.mjs episode mendukung env PATCH (salin blok "Tambalan" dari
// videos/anak-pertama-eps1-3d/build.mjs) dan render penuh sudah ada di --full.
// Catatan: CLI render bisa exit 0 walau gagal → script mengecek mtime + jumlah frame, bukan exit code.

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync, statSync, rmSync, openSync, closeSync } from "node:fs";
import { resolve, basename, join } from "node:path";

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i === -1 ? d : args[i + 1]; };
const has = (n) => args.includes(`--${n}`);
const VAL = new Set(["--gain", "--fps", "--full", "--out", "--with"]);
const pos = args.filter((a, i) => !a.startsWith("--") && !VAL.has(args[i - 1]));
if (pos.length < 2) { console.error("usage: node tools/patch-splice.mjs videos/<slug> S4,S8 [--gain dB] [--no-render] [--fps 30]"); process.exit(2); }

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const dir = resolve(pos[0]), slug = basename(dir);
const list = (v) => (v ?? "").split(",").map((s) => s.trim().toUpperCase()).filter(Boolean);
const ids = list(pos[1]), reuse = list(opt("with")).filter((id) => !ids.includes(id)), all = [...ids, ...reuse];
const FPS = Number(opt("fps", 30)), GAIN = opt("gain", null);
const full = resolve(dir, opt("full", `renders/${slug}.mp4`)), out = resolve(dir, opt("out", `renders/${slug}-final.mp4`));
const T = JSON.parse(readFileSync(join(dir, "timing.json"), "utf8"));
const SC = Object.fromEntries(T.scenes.map((s) => [s.id.toUpperCase(), s]));
const die = (m) => { console.error(`FAIL ${m}`); process.exit(1); };
const frames = (f) => Number(execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-count_packets", "-show_entries", "stream=nb_read_packets", "-of", "csv=p=0", f]).toString().trim());

for (const id of all) if (!SC[id]) die(`scene ${id} tidak ada di timing.json (${Object.keys(SC).join(",")})`);
if (!existsSync(full)) die(`render penuh tidak ada: ${full}`);
const TOTAL = Math.round(T.total * FPS);
if (frames(full) !== TOTAL) die(`render penuh ${frames(full)} frame, harus ${TOTAL}`);
const seg = all.map((id) => ({ id, a: Math.round(SC[id].start * FPS), n: Math.round(SC[id].duration * FPS), f: join(dir, `renders/patch-${id.toLowerCase()}.mp4`) })).sort((x, y) => x.a - y.a);
for (let i = 1; i < seg.length; i++) if (seg[i].a < seg[i - 1].a + seg[i - 1].n) die("scene tambalan tumpang tindih");

// 1) render tambalan
if (!has("no-render")) {
  execFileSync("node", ["build.mjs"], { cwd: dir, env: { ...process.env, PATCH: ids.join(",") }, stdio: "inherit" });
  try {
    for (const s of seg.filter((x) => ids.includes(x.id))) {
      const html = `patch-${s.id.toLowerCase()}.html`;
      if (!existsSync(join(dir, html))) die(`${html} tidak dibuat — build.mjs belum mendukung PATCH`);
      const t0 = Date.now(), log = join(dir, `qc/render-${s.id.toLowerCase()}.log`);
      console.log(`render ${s.id} (${s.n} frame) → ${basename(s.f)} · log ${log}`);
      const fd = openSync(log, "w");
      spawnSync("npx", ["--yes", "hyperframes@0.8.169", "render", "-c", html, "--quality", "looks", "--fps", String(FPS), "--video-bitrate", "14M", "-o", s.f],
        { cwd: dir, env: { ...process.env, PRODUCER_LOW_MEMORY_MODE: "false" }, stdio: ["ignore", fd, fd] });
      closeSync(fd);
      if (!existsSync(s.f) || statSync(s.f).mtimeMs < t0) die(`render ${s.id} tidak menghasilkan file baru — cek ${log}`);
    }
  } finally {
    for (const s of seg.filter((x) => ids.includes(x.id))) rmSync(join(dir, `patch-${s.id.toLowerCase()}.html`), { force: true });
  }
}
for (const s of seg) { if (!existsSync(s.f)) die(`tidak ada ${s.f}`); const n = frames(s.f); if (n !== s.n) die(`${basename(s.f)} ${n} frame, harus ${s.n}`); }

// 2) sambung: full[0:a1] + patch1 + full[a1+n1:a2] + patch2 + ... + full[..:TOTAL]  (tanpa filter fps: itu membuang frame)
const parts = [], inputs = ["-i", full];
let cur = 0;
seg.forEach((s, k) => {
  if (s.a > cur) parts.push(`[0:v]trim=start_frame=${cur}:end_frame=${s.a},setpts=PTS-STARTPTS[p${parts.length}]`);
  inputs.push("-i", s.f);
  parts.push(`[${k + 1}:v]trim=end_frame=${s.n},setpts=PTS-STARTPTS[p${parts.length}]`);
  cur = s.a + s.n;
});
if (cur < TOTAL) parts.push(`[0:v]trim=start_frame=${cur},setpts=PTS-STARTPTS[p${parts.length}]`);
const fc = parts.join(";") + ";" + parts.map((_, i) => `[p${i}]`).join("") + `concat=n=${parts.length}:v=1:a=0[v]`;
const audio = GAIN === null ? ["-c:a", "copy"] : ["-af", `volume=${GAIN}dB`, "-c:a", "aac", "-b:a", "192k"];
console.log(`sambung ${parts.length} potong → ${out}`);
execFileSync("ffmpeg", ["-v", "error", ...inputs, "-filter_complex", fc, "-map", "[v]", "-map", "0:a",
  "-c:v", "libx264", "-preset", "slow", "-crf", "19", "-maxrate", "8M", "-bufsize", "16M", "-profile:v", "high", "-level", "5.1",
  "-pix_fmt", "yuv420p", "-g", "60", "-keyint_min", "30", "-r", String(FPS), ...audio, "-movflags", "+faststart", "-y", out], { stdio: "inherit" });

// 3) verifikasi
const nOut = frames(out);
if (nOut !== TOTAL) die(`hasil ${nOut} frame, harus ${TOTAL}`);
console.log(`frame ${nOut}/${TOTAL} OK`);
for (const s of seg) { // info: frame 0 tambalan vs frame awal scene di render penuh (tinggi = sejajar, kecuali frame itu memang diubah)
  const p = spawnSync("ffmpeg", ["-v", "info", "-i", full, "-i", s.f, "-filter_complex",
    `[0:v]trim=start_frame=${s.a}:end_frame=${s.a + 1},setpts=PTS-STARTPTS,scale=270:480[a];[1:v]trim=end_frame=1,scale=270:480[b];[a][b]psnr`, "-f", "null", "-"]).stderr.toString();
  console.log(`  sambungan ${s.id} @frame ${s.a}: PSNR ${(p.match(/average:([0-9.inf]+)/) || [])[1] ?? "?"} dB (>45 = sejajar bila frame awal tak diubah)`);
}
const lufs = spawnSync("ffmpeg", ["-nostats", "-i", out, "-af", "ebur128", "-f", "null", "-"]).stderr.toString().match(/I:\s+(-?[0-9.]+) LUFS/g)?.pop();
console.log(`loudness ${lufs ?? "?"} (target -14..-16)`);
const qa = spawnSync("node", [join(ROOT, "tools/qa-video.mjs"), out, "--fps", String(FPS)], { stdio: "inherit" });
process.exit(qa.status ?? 1);
