#!/usr/bin/env node
// QA gate untuk MP4 hasil render HyperFrames.
// MP4 = kebenaran, bukan snapshot. Script ini mengukur artefak yang benar-benar
// lolos ke file final: frame hitam, frame beku, gerak per scene, spec container,
// dan level audio.
//
// Pemakaian:
//   node tools/qa-video.mjs videos/<slug>/renders/final.mp4
//   node tools/qa-video.mjs <file> --scenes 0:10,10:22,22:31,...   # override scene map
//   node tools/qa-video.mjs <file> --freeze 0.02 --frame 0.02       # tuning threshold
//
// Exit code 1 kalau ada FAIL, supaya bisa dipakai di gate CI/lokal.

import { execFileSync, spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--") && !a.match(/^[0-9.]+$/));
if (!file) {
  console.error("usage: node tools/qa-video.mjs <video.mp4> [--scenes a:b,c:d] [--freeze 0.02]");
  process.exit(2);
}

const opt = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? dflt : args[i + 1];
};
// Ambang "hampir beku": selisih rata-rata antar frame (skala 0-255).
const FREEZE = Number(opt("freeze", 0.02));
// Ambang frame hitam: mean luma 0-255.
const BLACK = Number(opt("black", 8));

const run = (bin, argv, binOpts = {}) =>
  execFileSync(bin, argv, { maxBuffer: 1024 * 1024 * 1024, ...binOpts });

const fail = [];
const warn = [];
const line = (s = "") => console.log(s);

// ---------------------------------------------------------------- 1. container
const probe = JSON.parse(
  run("ffprobe", [
    "-v", "error", "-of", "json",
    "-show_entries", "format=duration,size,bit_rate",
    "-show_entries", "stream=codec_type,codec_name,width,height,r_frame_rate,nb_frames,pix_fmt,profile",
    file,
  ]).toString(),
);
const v = probe.streams.find((s) => s.codec_type === "video") ?? {};
const a = probe.streams.find((s) => s.codec_type === "audio");
const dur = Number(probe.format.duration);
const bitrate = Number(probe.format.bit_rate);

line("== SPEC ==");
line(`  ${v.width}x${v.height}  ${v.r_frame_rate}  ${v.codec_name}/${v.profile}/${v.pix_fmt}`);
line(`  frames ${v.nb_frames}  duration ${dur.toFixed(3)}s  ${(bitrate / 1e6).toFixed(2)} Mbps`);
line(`  audio ${a ? `${a.codec_name} ${a.r_frame_rate}` : "NONE"}`);

if (v.width !== 1080 || v.height !== 1920) fail.push(`resolusi ${v.width}x${v.height}, harus 1080x1920`);
if (v.r_frame_rate !== "60/1") fail.push(`r_frame_rate ${v.r_frame_rate}, harus 60/1`);
if (v.pix_fmt !== "yuv420p") fail.push(`pix_fmt ${v.pix_fmt}, harus yuv420p (kompatibilitas player)`);
if (!a) fail.push("tidak ada audio stream");

// faststart check — atom moov harus muncul sebelum mdat
try {
  const head = run("head", ["-c", "2000000", file]).toString("binary");
  const moov = head.indexOf("moov");
  const mdat = head.indexOf("mdat");
  if (moov === -1) warn.push("moov tidak ditemukan dalam 2MB pertama — faststart mungkin mati");
  else if (mdat !== -1 && moov > mdat) fail.push("moov setelah mdat — faststart mati, player web harus unduh seluruh file dulu");
} catch { /* head opsional */ }

// ------------------------------------------------------------- 2. frame stats
// Downscale agresif: cukup untuk mendeteksi beku, jauh lebih cepat dari full-res.
const W = 135;
const H = 240;
line("\n== MEMINDAI FRAME ==");
const raw = run("ffmpeg", [
  "-v", "error", "-i", file,
  "-vf", `scale=${W}:${H},format=gray`,
  "-f", "rawvideo", "-",
]);

const FS = W * H;
const n = Math.floor(raw.length / FS);
const meanOf = (i) => {
  let s = 0;
  for (let p = 0; p < FS; p++) s += raw[i * FS + p];
  return s / FS;
};
const diffOf = (i) => {
  let s = 0;
  for (let p = 0; p < FS; p++) s += Math.abs(raw[(i + 1) * FS + p] - raw[i * FS + p]);
  return s / FS;
};

const means = new Float32Array(n);
for (let i = 0; i < n; i++) means[i] = meanOf(i);
const diffs = new Float32Array(n - 1);
for (let i = 0; i < n - 1; i++) diffs[i] = diffOf(i);
line(`  ${n} frame terbaca`);

// ---------------------------------------------------------- 3. frame hitam
const dark = [];
for (let i = 0; i < n; i++) if (means[i] < BLACK) dark.push(i);
line("\n== FRAME HITAM ==");
if (dark.length) {
  const fps = n / dur;
  fail.push(`${dark.length} frame mendekati hitam (mean<${BLACK})`);
  line(`  FAIL ${dark.length} frame < ${BLACK}  (contoh t=${dark.slice(0, 8).map((i) => (i / fps).toFixed(2)).join(", ")})`);
} else {
  line(`  PASS 0 frame < ${BLACK}  (luma ${Math.min(...means).toFixed(1)}..${Math.max(...means).toFixed(1)})`);
}

// ------------------------------------------------- 4. run pembekuan (freeze)
// Kelompokkan frame berurutan yang selisihnya < FREEZE. Satu-dua frame beku itu
// normal (tahan beat); yang jadi masalah adalah run panjang, terutama saat VO
// sedang bicara.
const frozen = new Uint8Array(diffs.length);
for (let i = 0; i < diffs.length; i++) frozen[i] = diffs[i] < FREEZE ? 1 : 0;
const runs = [];
for (let i = 0; i < frozen.length; i++) {
  if (!frozen[i]) continue;
  let j = i;
  while (j + 1 < frozen.length && frozen[j + 1]) j++;
  runs.push({ from: i / 60, to: (j + 2) / 60, len: j - i + 2 });
  i = j;
}
runs.sort((x, y) => y.len - x.len);

line("\n== FRAME BEKU ==");
line(`  ambang selisih < ${FREEZE}; ${frozen.reduce((s, x) => s + x, 0)}/${frozen.length} frame (${((100 * frozen.reduce((s, x) => s + x, 0)) / frozen.length).toFixed(1)}%)`);
const longRuns = runs.filter((r) => r.len >= 30); // >= 0.5s
if (longRuns.length) {
  line("  run >= 0.5s:");
  for (const r of longRuns.slice(0, 10)) {
    line(`    ${r.from.toFixed(2)}s .. ${r.to.toFixed(2)}s   ${(r.len / 60).toFixed(2)}s`);
  }
  fail.push(`${longRuns.length} blok beku >= 0.5s (terpanjang ${(longRuns[0].len / 60).toFixed(2)}s @ ${longRuns[0].from.toFixed(1)}s)`);
} else {
  line("  PASS tidak ada blok beku >= 0.5s");
}

// ------------------------------------------------------------- 5. per scene
const scenesArg = opt("scenes");
const scenes = scenesArg
  ? scenesArg.split(",").map((p, k) => {
      const [s, e] = p.split(":").map(Number);
      return { name: `S${k + 1}`, from: s, to: e };
    })
  : [];

if (scenes.length) {
  line("\n== GERAK PER SCENE ==");
  line(`  scene        mean   median   <${FREEZE}      verdict`);
  for (const sc of scenes) {
    const i0 = Math.round(sc.from * 60);
    const i1 = Math.round(sc.to * 60);
    const seg = diffs.subarray(Math.max(0, i0), Math.min(diffs.length, i1 - 1));
    if (!seg.length) continue;
    const sorted = Array.from(seg).sort((x, y) => x - y);
    const mean = seg.reduce((s, x) => s + x, 0) / seg.length;
    const med = sorted[Math.floor(sorted.length / 2)];
    let still = 0;
    for (const x of seg) if (x < FREEZE) still++;
    const pct = (100 * still) / seg.length;
    const verdict = pct > 50 ? "FAIL beku" : pct > 25 ? "WARN" : "ok";
    if (pct > 50) fail.push(`${sc.name} ${pct.toFixed(0)}% frame beku`);
    else if (pct > 25) warn.push(`${sc.name} ${pct.toFixed(0)}% frame beku`);
    line(
      `  ${sc.name.padEnd(11)} ${mean.toFixed(3).padStart(6)} ${med.toFixed(3).padStart(7)}   ${String(still).padStart(4)}/${String(seg.length).padEnd(4)} (${pct.toFixed(0).padStart(3)}%)  ${verdict}`,
    );
  }
}

// -------------------------------------------------------------- 6. audio
line("\n== AUDIO ==");
// volumedetect menulis hasilnya ke stderr, bukan stdout.
const volres = spawnSync("ffmpeg", ["-hide_banner", "-i", file, "-af", "volumedetect", "-f", "null", "-"], {
  maxBuffer: 64 * 1024 * 1024,
});
const vtxt = `${volres.stdout ?? ""}${volres.stderr ?? ""}`;
const meanM = /mean_volume:\s*(-?[0-9.]+) dB/.exec(vtxt);
const maxM = /max_volume:\s*(-?[0-9.]+) dB/.exec(vtxt);
if (maxM) {
  const mx = Number(maxM[1]);
  line(`  mean ${meanM ? meanM[1] : "?"} dB   peak ${mx} dB`);
  if (mx > -0.5) fail.push(`peak ${mx} dB — terlalu dekat 0, risiko clipping saat transcoding`);
  else if (mx > -1.0) warn.push(`peak ${mx} dB — headroom tipis`);
} else {
  line("  (volumedetect tidak tersedia)");
}

// ---------------------------------------------------------------- ringkasan
line("\n== RINGKASAN ==");
for (const w of warn) line(`  WARN ${w}`);
for (const f of fail) line(`  FAIL ${f}`);
if (!fail.length) line("  PASS semua gate lolos");
process.exit(fail.length ? 1 : 0);