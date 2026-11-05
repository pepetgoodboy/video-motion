#!/usr/bin/env node
/**
 * measure-suite.mjs — ukur banyak probe secara terinterleasi lalu laporkan rasio.
 *
 * Kenapa terinterleasi: CPU ms/frame bergeser sampai ±40% antar sesi karena mesin
 * sibuk. Membandingkan angka dari sesi berbeda menyesatkan. Skrip ini menjalankan
 * putaran probe secara bergiliran, mengambil median tiap probe, lalu melaporkan
 * rasio terhadap kontrol dalam sesi yang sama.
 *
 *   node tools/measure-suite.mjs --rounds 3 --frames 40
 */

import { spawnSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

const args = { rounds: 3, frames: 40 };
for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === "--rounds") args.rounds = Number(process.argv[++i]);
  else if (process.argv[i] === "--frames") args.frames = Number(process.argv[++i]);
}

const PROBES = [
  "b9-static",
  "b0-baseline",
  "b6-pathd",
  "b5-oklch",
  "b10-splitflap",
  "b1-canvas",
  "b11-neon-good",
  "b2-ascii",
  "b8-dom400",
  "b4-blend1",
  "b11-neon-bad",
  "b3-blend3",
  "b7-goo",
];

const runs = Object.fromEntries(PROBES.map((p) => [p, []]));

// Pre-warm: the first measurement of each probe is inflated (cold JIT, cold
// caches, cold Chrome). Discard it instead of letting it skew the median.
if (!args.noWarm) {
  process.stderr.write("pre-warm pass...\n");
  for (const probe of PROBES) {
    const dir = path.join("videos/_stylefeasibility/probes", probe);
    if (!fs.existsSync(path.join(dir, "index.html"))) continue;
    spawnSync(process.execPath, ["tools/measure-frame-cost.mjs", "--probe", dir, "--frames", "12"], {
      encoding: "utf8",
    });
  }
}

for (let r = 1; r <= args.rounds; r++) {
  for (const probe of PROBES) {
    const dir = path.join("videos/_stylefeasibility/probes", probe);
    if (!fs.existsSync(path.join(dir, "index.html"))) {
      console.error(`skip ${probe}: tidak ada index.html (jalankan tools/make-feasibility-probes.mjs)`);
      continue;
    }
    const res = spawnSync(
      process.execPath,
      ["tools/measure-frame-cost.mjs", "--probe", dir, "--frames", String(args.frames)],
      { encoding: "utf8" },
    );
    const line = (res.stdout || "").trim().split("\n").filter(Boolean).at(-1);
    let row;
    try {
      row = JSON.parse(line);
    } catch {
      console.error(`gagal ukur ${probe} (round ${r}):`, (res.stderr || "").slice(0, 200));
      continue;
    }
    runs[probe].push(row.cpuMsPerFrame);
    process.stderr.write(`round ${r} ${probe}: ${row.cpuMsPerFrame.toFixed(2)} ms\n`);
  }
}

const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  if (!s.length) return NaN;
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

const table = PROBES.filter((p) => runs[p].length).map((p) => ({
  probe: p,
  runs: runs[p].map((v) => Number(v.toFixed(2))),
  medianMs: Number(median(runs[p]).toFixed(2)),
}));

const base = table.find((t) => t.probe === "b0-baseline")?.medianMs;
const floor = table.find((t) => t.probe === "b9-static")?.medianMs;
for (const t of table) {
  t.vsBaselinePct = base ? Number((((t.medianMs - base) / base) * 100).toFixed(0)) : null;
  t.vsFloorPct = floor ? Number((((t.medianMs - floor) / floor) * 100).toFixed(0)) : null;
}

console.log(
  ["probe".padEnd(16), "runs".padEnd(28), "median", "vs baseline", "vs floor"].join(" | ") +
    "\n" +
    "-".repeat(90),
);
for (const t of table) {
  console.log(
    [
      t.probe.padEnd(16),
      t.runs.join(", ").padEnd(28),
      String(t.medianMs).padStart(6),
      `${t.vsBaselinePct >= 0 ? "+" : ""}${t.vsBaselinePct}%`.padStart(11),
      `${t.vsFloorPct >= 0 ? "+" : ""}${t.vsFloorPct}%`.padStart(8),
    ].join(" | "),
  );
}
const out = path.resolve("qc/measure-suite.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify({ rounds: args.rounds, frames: args.frames, table }, null, 2));
console.log(`\nhasil mentah: ${out}`);
