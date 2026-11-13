#!/usr/bin/env node
// Gate naskah "bahasa bayi" — dijalankan SEBELUM VO digenerate (revisi naskah gratis,
// revisi VO makan kuota Cartesia).
//
// Diadaptasi dari motion-video/scripts/readability.mjs, batasnya diperketat: telinga tidak
// bisa baca ulang, dan targetnya penonton awam total ("jelasin ke adik umur 10 tahun").
//
// Pakai: node tools/naskah-check.mjs videos/<slug>/vo-script.json [--duration 75]
// Format script sama dengan tools/cartesia-vo.mjs (array lama atau {cast, lines, meta}).
//   meta.istilah = ["container", "image"]  → istilah teknis yang SENGAJA diajarkan (maks 3)
import { readFileSync } from "node:fs";

const argv = process.argv.slice(2);
const file = argv.find((a) => !a.startsWith("--"));
if (!file) {
  console.error("Pakai: node tools/naskah-check.mjs <vo-script.json> [--duration <detik>]");
  process.exit(2);
}
const opt = (k) => (argv.includes(`--${k}`) ? argv[argv.indexOf(`--${k}`) + 1] : null);
const raw = JSON.parse(readFileSync(file, "utf8"));
const lines = Array.isArray(raw) ? raw : raw.lines;
const meta = Array.isArray(raw) ? {} : (raw.meta ?? {});
const istilah = (meta.istilah ?? []).map((s) => s.toLowerCase());
const duration = Number(opt("duration") ?? meta.duration ?? 0);

const MAX_WORDS = 12;      // per kalimat
const MAX_AVG = 9;         // rata-rata kata per kalimat
const MAX_CLAUSES = 2;
const MAX_ISTILAH = 3;
// kata per detik UCAPAN. Terukur 10 Nov 2026: Galang speed 1.05 = 1,95 kata/detik (192 kata =
// 98,5 s ucapan, tanpa hening awal/akhir). Batas bawah 1,8 supaya naskah tempo pelan tidak
// ditolak; override per video lewat meta.rate = [min, max].
const RATE = meta.rate ?? [1.8, 2.6];

const ENGLISH = [
  "input", "output", "prompt", "user", "tool", "agent", "training", "dataset", "runtime",
  "deploy", "framework", "library", "server", "client", "request", "response", "install",
  "build", "environment", "dependency", "software", "hardware", "file", "folder", "update",
  "upgrade", "setting", "default", "error", "bug", "cloud", "network", "port", "host",
  "virtual", "machine", "storage", "performance", "scalable", "platform", "feature",
];
const SLOP = [
  "pada dasarnya", "secara sederhana", "di era digital", "revolusioner", "memungkinkan",
  "solusi", "game changer", "tidak hanya", "melainkan juga", "sangat penting untuk",
  "mari kita", "jangan lupa like", "di dunia yang", "seamless", "dengan kata lain",
];

const clauses = (s) => s.split(/,| dan | atau | sehingga | karena | namun | tetapi | sedangkan /i).filter((x) => x.trim()).length;
const words = (s) => s.split(/\s+/).filter(Boolean);

let fails = 0, warns = 0, nSent = 0, nWords = 0;
const speakers = new Map();
const usedTerms = new Set();
console.log(`=== NASKAH ${file} ===`);
for (const l of lines) {
  // yang dinilai = yang DIUCAPKAN (text), bukan teks layar (display): telinga tidak bisa baca ulang
  const text = l.text;
  const sent = text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
  const issues = [];
  for (const s of sent) {
    const w = words(s).length;
    nSent++; nWords += w;
    if (w > MAX_WORDS) issues.push(`FAIL kalimat ${w} kata (maks ${MAX_WORDS}): "${s.slice(0, 70)}"`);
    if (clauses(s) > MAX_CLAUSES) issues.push(`WARN ${clauses(s)} klausa: "${s.slice(0, 70)}"`);
  }
  const lower = text.toLowerCase();
  for (const t of ENGLISH) {
    if (new RegExp(`\\b${t}\\b`, "i").test(lower) && !istilah.some((k) => k.includes(t))) issues.push(`WARN istilah Inggris '${t}' — pakai padanan Indonesia atau masukkan meta.istilah`);
  }
  for (const k of istilah) if (lower.includes(k)) usedTerms.add(k);
  for (const p of SLOP) if (lower.includes(p)) issues.push(`FAIL frasa generik '${p}'`);
  const sp = l.speaker ?? "narator";
  speakers.set(sp, (speakers.get(sp) ?? 0) + words(text).length);
  const bad = issues.filter((i) => i.startsWith("FAIL")).length;
  fails += bad; warns += issues.length - bad;
  console.log(`${issues.length ? (bad ? "FAIL" : "CEK ") : "OK  "} ${String(l.id).padEnd(6)} ${sp.padEnd(14)} ${String(words(text).length).padStart(3)} kata`);
  for (const i of issues) console.log(`       - ${i}`);
}

const avg = nWords / Math.max(nSent, 1);
console.log(`\n  ${nWords} kata, ${nSent} kalimat, rata-rata ${avg.toFixed(1)} kata/kalimat (maks ${MAX_AVG})`);
if (avg > MAX_AVG) { console.log("  FAIL rata-rata kalimat terlalu panjang untuk didengar sekali"); fails++; }
if (istilah.length > MAX_ISTILAH) { console.log(`  FAIL ${istilah.length} istilah teknis diajarkan (maks ${MAX_ISTILAH})`); fails++; }
const unused = istilah.filter((k) => !usedTerms.has(k));
if (unused.length) { console.log(`  WARN istilah di meta tidak pernah diucapkan: ${unused.join(", ")}`); warns++; }
if (duration) {
  const lo = Math.round(duration * RATE[0]), hi = Math.round(duration * RATE[1]);
  const ok = nWords >= lo && nWords <= hi;
  console.log(`  target ${duration}s → ${lo}–${hi} kata: ${ok ? "OK" : "FAIL"}`);
  if (!ok) fails++;
}
if (speakers.size > 1) {
  const total = [...speakers.values()].reduce((a, b) => a + b, 0);
  const nar = speakers.get("narator") ?? 0;
  console.log(`  pembicara: ${[...speakers].map(([k, v]) => `${k} ${Math.round((v / total) * 100)}%`).join(", ")}`);
  if (nar / total > 0.7) { console.log("  WARN narator > 70% — kisah terasa dibacakan, bukan dimainkan"); warns++; }
}
console.log(`\nverdict: ${fails ? "FAIL" : warns ? "WARN" : "PASS"} (${fails} fail, ${warns} warn)`);
process.exit(fails ? 1 : 0);
