// Diagnose smoothness: per-frame uniqueness + motion continuity.
import { execSync } from "node:child_process";

const f = process.argv[2];
const start = Number(process.argv[3] ?? 0);
const dur = Number(process.argv[4] ?? 60);

const out = execSync(
  `ffmpeg -hide_banner -nostats -ss ${start} -t ${dur} -i "${f}" -vf "signalstats,metadata=print:key=lavfi.signalstats.YDIF" -an -f null - 2>&1`,
  { maxBuffer: 64 * 1024 * 1024, encoding: "utf8" }
);
const vals = [...out.matchAll(/YDIF=([0-9.]+)/g)].map((m) => Number(m[1]));
console.log(`frames=${vals.length}`);
const moving = vals.filter((v) => v > 0.5);
console.log(`moving frames (>0.5): ${moving.length}`);
// A "stutter" = motion collapses to ~0 then resumes sharply.
let dips = 0, runs = 0, inDip = false;
for (const v of vals) {
  if (v < 0.05) { if (!inDip) { inDip = true; runs++; } }
  else if (v > 1.0 && inDip) { inDip = false; if (runs) dips++; }
  else inDip = false;
}
console.log(`motion-collapse-then-resume events: ${dips}`);
// print timeline in 0.5s buckets
const per = 15;
const buckets = [];
for (let i = 0; i < vals.length; i += per) {
  const slice = vals.slice(i, i + per);
  const zeros = slice.filter((v) => v < 0.05).length;
  buckets.push(`${(start + i / 30).toFixed(1)}s zero=${zeros}/${slice.length}`);
}
console.log(buckets.join("\n"));
