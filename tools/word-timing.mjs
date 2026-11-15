#!/usr/bin/env node
// Waktu per kata untuk caption karaoke, dari audio VO yang sudah dipotong (assets/vo/t/<id>.mp3).
// Tanpa API: energi suara 10 ms → rentang bersuara + jeda nyata; jeda dipasangkan ke tanda baca
// (, . ? ! :), lalu kata di tiap potongan dibagi menurut jumlah suku kata (gugus vokal).
// Akurasi dicek silang dengan Whisper lokal (lihat --check): selisih rata-rata 70–170 ms, dan selisih besar
// ternyata salah Whisper (Whisper memasukkan jeda ke kata sebelumnya; diukur dari energi audio, 15 Nov 2026).
//
// Pakai (dari folder video):
//   node ../../tools/word-timing.mjs                 # baca timing.json + vo-script.json → word-timing.json
//   node ../../tools/word-timing.mjs --check n06,n10 # bandingkan dengan whisper (hyperframes transcribe)
// Output: word-timing.json { "<lineId>": [{ "w": "Jam", "s": 0.02, "e": 0.31 }, …] }  (detik relatif file baris)

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i === -1 ? d : args[i + 1]; };
const T = JSON.parse(readFileSync("timing.json", "utf8"));
const VS = JSON.parse(readFileSync("vo-script.json", "utf8"));
const TXT = Object.fromEntries(VS.lines.map((l) => [l.id, l.text]));
const RATE = 16000, HOP = 160; // 10 ms

function energy(file) {
  const buf = execFileSync("ffmpeg", ["-v", "error", "-i", file, "-ac", "1", "-ar", String(RATE), "-f", "f32le", "-"], { maxBuffer: 1 << 28 });
  const a = new Float32Array(buf.buffer, buf.byteOffset, buf.length / 4), db = [];
  for (let i = 0; i + HOP <= a.length; i += HOP) { let s = 0; for (let k = i; k < i + HOP; k++) s += a[k] * a[k]; db.push(10 * Math.log10(s / HOP + 1e-12)); }
  return db;
}
const syl = (w) => Math.max(1, (w.toLowerCase().match(/[aiueo]+/g) || []).length);

function timeLine(id, file) {
  const words = TXT[id].split(/\s+/).filter(Boolean), db = energy(file), n = db.length;
  const thr = Math.max(...db) - 32, v = db.map((x) => x > thr);
  let a = v.indexOf(true), b = n - 1 - [...v].reverse().indexOf(true); if (a < 0) { a = 0; b = n - 1; }
  const pauses = []; // jeda di dalam rentang bersuara, ≥ 90 ms
  for (let i = a, s = -1; i <= b; i++) { if (!v[i] && s < 0) s = i; if (v[i] && s >= 0) { if (i - s >= 9) pauses.push([s, i]); s = -1; } }
  const wt = words.map((w) => syl(w) + 0.3), cum = [0]; wt.forEach((x) => cum.push(cum[cum.length - 1] + x));
  const total = cum[cum.length - 1];
  const breaks = words.map((w, i) => (/[,.?!:…]["”]?$/.test(w) && i < words.length - 1 ? i + 1 : -1)).filter((i) => i > 0); // kata awal potongan baru
  // pasangkan jeda terpanjang ke tanda baca yang perkiraan waktunya paling dekat
  const est = (i) => a + ((b - a) * cum[i]) / total;
  const anchors = []; // [wordIndex, endOfPrevFrame, startFrame]
  const used = new Set();
  for (const [s, e] of [...pauses].sort((x, y) => (y[1] - y[0]) - (x[1] - x[0])).slice(0, breaks.length)) {
    let best = -1, bd = Infinity; for (const k of breaks) if (!used.has(k)) { const d = Math.abs(est(k) - (s + e) / 2); if (d < bd) { bd = d; best = k; } }
    if (best > 0 && bd < (b - a) * 0.25) { used.add(best); anchors.push([best, s, e]); }
  }
  anchors.sort((x, y) => x[0] - y[0]);
  const segs = []; let wi = 0, fs = a;
  for (const [k, s, e] of anchors) { segs.push([wi, k, fs, s]); wi = k; fs = e; }
  segs.push([wi, words.length, fs, b + 1]);
  const out = [];
  for (const [i0, i1, f0, f1] of segs) {
    const tot = cum[i1] - cum[i0];
    for (let i = i0; i < i1; i++) out.push({ w: words[i], s: +(((f0 + ((f1 - f0) * (cum[i] - cum[i0])) / tot) * HOP) / RATE).toFixed(3), e: +(((f0 + ((f1 - f0) * (cum[i + 1] - cum[i0])) / tot) * HOP) / RATE).toFixed(3) });
  }
  return { out, pauses: pauses.length, anchors: anchors.length, breaks: breaks.length };
}

const lines = T.scenes.flatMap((s) => s.lines);
if (opt("check")) {
  const norm = (w) => w.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (const id of opt("check").split(",")) {
    const l = lines.find((x) => x.id === id), mine = timeLine(id, l.file).out, dir = mkdtempSync(join(tmpdir(), "wt-"));
    execFileSync("npx", ["--yes", "hyperframes@0.8.169", "transcribe", l.file, "-d", dir, "-e", "whisper", "-m", "small", "-l", "id"], { stdio: "ignore" });
    const tf = ["transcript.json", "captions.json"].map((f) => join(dir, f)).find(existsSync);
    const raw = JSON.parse(readFileSync(tf, "utf8")), ww = (Array.isArray(raw) ? raw : raw.words ?? raw.segments?.flatMap((s) => s.words) ?? []).map((x) => ({ w: norm(x.text ?? x.word), s: x.start }));
    const diffs = []; let j = 0;
    for (const m of mine) { const k = ww.findIndex((x, q) => q >= j && x.w === norm(m.w)); if (k >= 0) { diffs.push(Math.abs(ww[k].s - m.s)); j = k + 1; } }
    const avg = diffs.reduce((p, q) => p + q, 0) / (diffs.length || 1);
    console.log(`${id}: ${diffs.length}/${mine.length} kata cocok · selisih awal kata rata-rata ${(avg * 1000).toFixed(0)} ms · maks ${(Math.max(0, ...diffs) * 1000).toFixed(0)} ms`);
  }
} else {
  const res = {}; let a = 0, k = 0;
  for (const l of lines) { const r = timeLine(l.id, l.file); res[l.id] = r.out; a += r.anchors; k += r.breaks; }
  writeFileSync("word-timing.json", JSON.stringify(res, null, 0));
  console.log(`word-timing.json: ${lines.length} baris · ${Object.values(res).flat().length} kata · tanda baca terpasang ke jeda ${a}/${k}`);
}
