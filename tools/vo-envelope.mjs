#!/usr/bin/env node
// Amplop suara VO → keadaan mulut per langkah (untuk maskot/tokoh yang bicara).
// Hasilnya ditempel ke komposisi sebagai array konstan dan dipakai lewat tl.call()/set()
// — dihitung SEBELUM timeline dibuat, jadi deterministik.
//
// Pakai: node tools/vo-envelope.mjs assets/vo/s1a.mp3 [--hz 12] [--levels 3]
// Output JSON: { file, hz, duration, mouth: [0,1,2,1,0,...] }  0 = tutup … levels-1 = lebar
//
// 12 Hz = interval 0,083 s, aman untuk blend 120→60 (≥ 0,034 s) dan terasa seperti
// animasi tangan; jangan naikkan di atas 24 Hz.
import { execFileSync } from "node:child_process";

const argv = process.argv.slice(2);
const file = argv.find((a) => !a.startsWith("--"));
if (!file) {
  console.error("Pakai: node tools/vo-envelope.mjs <vo.mp3> [--hz 12] [--levels 3]");
  process.exit(2);
}
const opt = (k, d) => (argv.includes(`--${k}`) ? Number(argv[argv.indexOf(`--${k}`) + 1]) : d);
const HZ = opt("hz", 12);
const LEVELS = opt("levels", 3);
const SR = 8000;

const pcm = execFileSync("ffmpeg", ["-v", "error", "-i", file, "-ac", "1", "-ar", String(SR), "-f", "s16le", "-"], { maxBuffer: 1 << 28 });
const samples = new Int16Array(pcm.buffer, pcm.byteOffset, pcm.length / 2);
const win = Math.round(SR / HZ);
const rms = [];
for (let i = 0; i < samples.length; i += win) {
  let s = 0;
  const end = Math.min(i + win, samples.length);
  for (let j = i; j < end; j++) s += samples[j] * samples[j];
  rms.push(Math.sqrt(s / Math.max(end - i, 1)));
}
const sorted = [...rms].sort((a, b) => a - b);
const floor = sorted[Math.floor(sorted.length * 0.2)] ?? 0;   // derau/diam
const peak = sorted[Math.floor(sorted.length * 0.95)] ?? 1;
const mouth = rms.map((r) => {
  const x = (r - floor) / Math.max(peak - floor, 1);
  return x < 0.12 ? 0 : Math.min(LEVELS - 1, 1 + Math.floor(x * (LEVELS - 1)));
});
console.log(JSON.stringify({ file, hz: HZ, duration: +(samples.length / SR).toFixed(3), mouth }));
