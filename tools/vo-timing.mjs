#!/usr/bin/env node
// VO → timing scene (audio-first). Potong hening awal/akhir tiap baris, beri gain tetap +
// limiter, lalu susun waktu scene dari durasi UCAPAN nyata → timing.json.
//
// Kenapa ada (run pertama mode topik, 10 Nov 2026):
//   - tiap file Cartesia membawa ±0,13–0,23 s hening di awal + ±0,05–0,23 s di akhir;
//     25 baris tanpa dipotong = ±9 s hening yang tidak direncanakan.
//   - output Cartesia pelan (±−26,7 LUFS) → butuh ±+10,5 dB supaya VO ±−16 LUFS.
//
// Pakai (dari folder video):
//   node ../../tools/vo-timing.mjs [--gain 10.5] [--lead 0.3] [--gap 0.2] [--tail 0.5] [--last-tail 1.4]
// Input : assets/vo/manifest.json (dari cartesia-vo.mjs; field `scene` mengelompokkan baris)
// Output: assets/vo/t/<id>.mp3 + timing.json { total, scenes:[{id,start,duration,lines:[{id,file,dur,at,abs}]}] }
//         at = detik relatif scene, abs = detik absolut video. Durasi scene dibulatkan ke 0,5 s.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const argv = process.argv.slice(2);
const num = (k, d) => (argv.includes(`--${k}`) ? Number(argv[argv.indexOf(`--${k}`) + 1]) : d);
const GAIN = num("gain", 10.5), LEAD = num("lead", 0.3), GAP = num("gap", 0.2), TAIL = num("tail", 0.5), LAST = num("last-tail", 1.4);
const SR = 16000, THR = 32768 * Math.pow(10, -42 / 20);

const man = JSON.parse(readFileSync("assets/vo/manifest.json", "utf8"));
mkdirSync("assets/vo/t", { recursive: true });
const lines = man.map((m) => {
  const pcm = execFileSync("ffmpeg", ["-v", "error", "-i", m.file, "-ac", "1", "-ar", String(SR), "-f", "s16le", "-"], { maxBuffer: 1 << 26 });
  const s = new Int16Array(pcm.buffer, pcm.byteOffset, pcm.length / 2);
  let a = 0; while (a < s.length && Math.abs(s[a]) < THR) a++;
  let b = s.length - 1; while (b > a && Math.abs(s[b]) < THR) b--;
  const from = Math.max(0, a / SR - 0.04), to = Math.min(s.length / SR, b / SR + 0.08);
  const out = `assets/vo/t/${m.id}.mp3`;
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", m.file, "-af",
    `atrim=${from.toFixed(3)}:${to.toFixed(3)},asetpts=N/SR/TB,afade=t=in:d=0.02,areverse,afade=t=in:d=0.04,areverse,volume=${GAIN}dB,alimiter=limit=0.89:attack=4:release=60:level=disabled`,
    "-c:a", "libmp3lame", "-b:a", "160k", out]);
  return { id: m.id, scene: m.scene, speaker: m.speaker, file: out, dur: +(to - from).toFixed(3) };
});

const scenes = [];
for (const l of lines) {
  let sc = scenes.find((x) => x.id === l.scene);
  if (!sc) scenes.push((sc = { id: l.scene, lines: [] }));
  sc.lines.push(l);
}
let t = 0;
for (const sc of scenes) {
  let local = LEAD;
  for (const l of sc.lines) { l.at = +local.toFixed(3); l.abs = +(t + local).toFixed(3); local += l.dur + GAP; }
  const raw = local - GAP + (sc === scenes.at(-1) ? LAST : TAIL);
  sc.start = +t.toFixed(3);
  sc.duration = Math.ceil(raw * 2) / 2;
  t += sc.duration;
}
writeFileSync("timing.json", JSON.stringify({ total: t, params: { GAIN, LEAD, GAP, TAIL, LAST }, scenes }, null, 2));
const speech = lines.reduce((a, l) => a + l.dur, 0);
for (const sc of scenes) console.log(sc.id.padEnd(4), "start", String(sc.start).padStart(6), "dur", String(sc.duration).padStart(5), sc.lines.map((l) => `${l.id}@${l.at}`).join(" "));
console.log(`total ${t}s · ucapan ${speech.toFixed(1)}s · ${lines.length} baris · gain +${GAIN} dB`);
