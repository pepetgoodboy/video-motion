#!/usr/bin/env node
/**
 * measure-frame-cost.mjs — ukur biaya raster per frame untuk komposisi HyperFrames.
 *
 * Kenapa ada: wall-clock `hyperframes render` terlalu berisik untuk tes kelayakan
 * gaya (kontrol statis bisa lebih lambat dari komposisi berat). Skrip ini mengisolasi
 * biaya yang relevan — seek timeline + rasterisasi frame penuh 1080x1920 dengan
 * software rasterizer, jalur yang sama dengan `beginframe` capture milik renderer.
 *
 * Pemakaian:
 *   node tools/measure-frame-cost.mjs --probe videos/_stylefeasibility/probes/b3-blend3 \
 *     --frames 180 --fps 120 [--json out.json]
 *
 * Butuh Playwright di cache npx. Path-nya dicari otomatis.
 */

import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";

function findPlaywright() {
  const candidates = [];
  const npxRoot = path.join(os.homedir(), ".npm", "_npx");
  if (fs.existsSync(npxRoot)) {
    for (const d of fs.readdirSync(npxRoot)) {
      const p = path.join(npxRoot, d, "node_modules", "playwright");
      if (fs.existsSync(path.join(p, "package.json"))) candidates.push(p);
    }
  }
  // prefer the newest
  candidates.sort();
  return candidates.at(-1) || null;
}

function parseArgs(argv) {
  const out = { frames: 180, fps: 120, probe: null, json: null, warmup: 12 };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === "--probe") out.probe = next();
    else if (a === "--frames") out.frames = Number(next());
    else if (a === "--fps") out.fps = Number(next());
    else if (a === "--warmup") out.warmup = Number(next());
    else if (a === "--json") out.json = next();
  }
  return out;
}

const args = parseArgs(process.argv);
if (!args.probe) {
  console.error("usage: node tools/measure-frame-cost.mjs --probe <dir> [--frames N] [--fps N] [--json file]");
  process.exit(2);
}

const pwPath = findPlaywright();
if (!pwPath) {
  console.error("Playwright tidak ditemukan di cache npx. Jalankan: npx --yes playwright --version");
  process.exit(2);
}
const require_ = createRequire(path.join(pwPath, "noop.js"));
const { chromium } = require_("playwright");

const probeDir = path.resolve(args.probe);
const indexPath = path.join(probeDir, "index.html");
if (!fs.existsSync(indexPath)) {
  console.error(`index.html tidak ada di ${probeDir}`);
  process.exit(2);
}

const HF_CHROME = path.join(
  os.homedir(),
  ".cache/hyperframes/chrome/chrome-headless-shell",
);
function findHyperframesChrome() {
  if (!fs.existsSync(HF_CHROME)) return null;
  const versions = fs.readdirSync(HF_CHROME).sort();
  for (const v of versions.reverse()) {
    const exe = path.join(HF_CHROME, v, "chrome-headless-shell-linux64", "chrome-headless-shell");
    if (fs.existsSync(exe)) return exe;
  }
  return null;
}

const browser = await chromium.launch({
  // Same binary the renderer uses, so frame cost here maps to render cost.
  executablePath: findHyperframesChrome() || undefined,
  args: [
    "--disable-gpu",
    "--use-gl=swiftshader",
    "--disable-lcd-text",
    "--force-device-scale-factor=1",
    "--hide-scrollbars",
    "--disable-background-timer-throttling",
    "--disable-renderer-backgrounding",
  ],
});
const context = await browser.newContext({
  viewport: { width: 1080, height: 1920 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

const consoleErrors = [];
page.on("pageerror", (e) => consoleErrors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push(m.text());
});

await page.goto(pathToFileURL(indexPath).href, { waitUntil: "load" });
// return a boolean: the timeline object is circular and cannot be serialized back
await page.waitForFunction(() => !!(window.__timelines && window.__timelines["main"]), null, { timeout: 20000 });

const cdp = await context.newCDPSession(page);
// Raster is forced through CDP screenshot — the same surface capture path the
// renderer uses. `HeadlessExperimental.beginFrame` is unavailable without
// --run-all-compositor-stages-before-draw and blocks when display updates are on.
await cdp.send("Page.enable");
// Performance domain gives script/style/layout/paint task time for THIS page only,
// which is immune to other Chrome windows and other processes on the machine.
// Process-wide CPU time was tried first and swung +/-40% while the host was busy.
await cdp.send("Performance.enable");
const perfMetric = async (name) => {
  const { metrics } = await cdp.send("Performance.getMetrics");
  return metrics.find((m) => m.name === name)?.value ?? 0;
};
const sumTaskSeconds = async () => {
  const { metrics } = await cdp.send("Performance.getMetrics");
  const pick = (n) => metrics.find((m) => m.name === n)?.value ?? 0;
  return (
    pick("ScriptDuration") +
    pick("RecalcStyleDuration") +
    pick("LayoutDuration") +
    pick("TaskDuration")
  );
};
// headroom: ScriptDuration etc. do not include paint/composite, so capture a
// screenshot inside the same window to keep paint in the picture.


const step = 1 / args.fps;
const total = args.frames + args.warmup;
const times = [];
const failed = [];

/**
 * Total CPU ticks consumed by every chrome-headless-shell process spawned by
 * this node process. Wall-clock per frame is dominated by CDP/screenshot
 * transport (~70ms constant), which hides the raster cost we actually care
 * about; CPU time does not include that waiting.
 */
function readTicks(pid) {
  try {
    const stat = fs.readFileSync(`/proc/${pid}/stat`, "utf8");
    // fields after comm (which may contain spaces/parens); rest[0] is field 3
    const rest = stat.slice(stat.lastIndexOf(")") + 2).split(" ");
    return Number(rest[11]) + Number(rest[12]); // utime + stime
  } catch {
    return 0;
  }
}

function descendants(rootPid) {
  const seen = new Set();
  const stack = [rootPid];
  while (stack.length) {
    const pid = stack.pop();
    if (!pid || seen.has(pid)) continue;
    seen.add(pid);
    try {
      const kids = fs
        .readFileSync(`/proc/${pid}/task/${pid}/children`, "utf8")
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map(Number);
      stack.push(...kids);
    } catch {}
  }
  seen.delete(rootPid);
  return [...seen];
}

function chromeCpuTicks() {
  const pids = descendants(process.pid).filter((pid) => {
    try {
      return fs.readFileSync(`/proc/${pid}/comm`, "utf8").includes("chrome");
    } catch {
      return false;
    }
  });
  return pids.reduce((sum, pid) => sum + readTicks(pid), 0);
}
function countChrome() {
  return descendants(process.pid).filter((pid) => {
    try {
      return fs.readFileSync(`/proc/${pid}/comm`, "utf8").includes("chrome");
    } catch {
      return false;
    }
  }).length;
}

const cpuBefore = chromeCpuTicks();
const chromeProcs = countChrome();
const taskBefore = await sumTaskSeconds();
const tStart = process.hrtime.bigint();

for (let i = 0; i < total; i++) {
  const t = i * step;
  const t0 = process.hrtime.bigint();
  try {
    // 1. advance the paused timeline
    await page.evaluate((tt) => {
      const tl = window.__timelines["main"];
      tl.seek(tt, false);
      // force style + layout synchronously so their cost lands in this frame
      void document.body.offsetHeight;
    }, t);
    // 2. force full rasterization of the 1080x1920 frame
    await cdp.send("Page.captureScreenshot", {
      format: "jpeg",
      quality: 40,
      fromSurface: true,
      captureBeyondViewport: false,
    });
  } catch (e) {
    failed.push(`${t.toFixed(3)}s: ${e.message.split("\n")[0]}`);
  }
  const t1 = process.hrtime.bigint();
  if (i >= args.warmup) times.push(Number(t1 - t0) / 1e6);
}
const wallTotalMs = Number(process.hrtime.bigint() - tStart) / 1e6;
const cpuAfter = chromeCpuTicks();
const cpuDeltaMs = ((cpuAfter - cpuBefore) * 1000) / 100; // USER_HZ = 100 on Linux
const cpuPerFrameMs = cpuDeltaMs / total;
const taskAfter = await sumTaskSeconds();
const pageTaskMsPerFrame = ((taskAfter - taskBefore) * 1000) / total;

await browser.close();

times.sort((a, b) => a - b);
const pick = (q) => times[Math.min(times.length - 1, Math.floor(times.length * q))];
const mean = times.reduce((a, b) => a + b, 0) / times.length;
const result = {
  probe: path.basename(probeDir),
  captureMode: "cdp Page.captureScreenshot(fromSurface)",
  frames: times.length,
  fps: args.fps,
  wallMeanMs: Number(mean.toFixed(2)),
  wallMedianMs: Number(pick(0.5).toFixed(2)),
  wallP90Ms: Number(pick(0.9).toFixed(2)),
  cpuMsPerFrame: Number(cpuPerFrameMs.toFixed(2)),
  pageTaskMsPerFrame: Number(pageTaskMsPerFrame.toFixed(3)),
  cpuSource: chromeProcs ? `chrome process tree (${chromeProcs} procs) utime+stime` : "unavailable",
  consoleErrors: consoleErrors.slice(0, 5),
  failures: failed.slice(0, 5),
};
console.log(JSON.stringify(result));
if (args.json) {
  const rows = fs.existsSync(args.json) ? JSON.parse(fs.readFileSync(args.json, "utf8")) : [];
  rows.push(result);
  fs.writeFileSync(args.json, JSON.stringify(rows, null, 2));
}
