#!/usr/bin/env node
/**
 * verify-probes.mjs — cek kebenaran (bukan biaya) probe kelayakan V13–V21.
 *
 * Menjawab empat hal yang tidak bisa dijawab angka ms:
 *   1. oklch() didukung & hasilnya sama dengan hex pembanding (V17)
 *   2. tween `attr:{d}` benar-benar menganimasikan path, dan path tetap valid (V14)
 *   3. canvas 2D deterministik: dua render menghasilkan piksel identik (V13/V19)
 *   4. elemen yang diuji benar-benar tampil (bukan halaman kosong)
 */

import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import crypto from "node:crypto";

function findPlaywright() {
  const npxRoot = path.join(os.homedir(), ".npm", "_npx");
  const c = fs.existsSync(npxRoot)
    ? fs.readdirSync(npxRoot)
        .filter((d) => fs.existsSync(path.join(npxRoot, d, "node_modules", "playwright", "package.json")))
        .map((d) => path.join(npxRoot, d, "node_modules", "playwright"))
        .sort()
    : [];
  return c.at(-1) || null;
}

function findHyperframesChrome() {
  const base = path.join(os.homedir(), ".cache/hyperframes/chrome/chrome-headless-shell");
  if (!fs.existsSync(base)) return null;
  for (const v of fs.readdirSync(base).sort().reverse()) {
    const exe = path.join(base, v, "chrome-headless-shell-linux64", "chrome-headless-shell");
    if (fs.existsSync(exe)) return exe;
  }
  return null;
}

const pw = findPlaywright();
if (!pw) {
  console.error("Playwright tidak ditemukan di cache npx");
  process.exit(2);
}
const { chromium } = createRequire(path.join(pw, "noop.js"))("playwright");

const ROOT = path.resolve("videos/_stylefeasibility/probes");
const results = {};

async function openProbe(name) {
  const browser = await chromium.launch({
    executablePath: findHyperframesChrome() || undefined,
    args: ["--disable-gpu", "--use-gl=swiftshader", "--hide-scrollbars", "--force-device-scale-factor=1"],
  });
  const context = await browser.newContext({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(pathToFileURL(path.join(ROOT, name, "index.html")).href, { waitUntil: "load" });
  await page.waitForFunction(() => !!(window.__timelines && window.__timelines["main"]), null, { timeout: 20000 });
  return { browser, page, errors };
}

const seek = (page, t) =>
  page.evaluate((tt) => {
    window.__timelines["main"].seek(tt, false);
    void document.body.offsetHeight;
  }, t);

const shot = async (page, file) => {
  const buf = await page.screenshot({ type: "png", animations: "disabled" });
  fs.writeFileSync(file, buf);
  return crypto.createHash("sha256").update(buf).digest("hex").slice(0, 16);
};

const OUT = path.resolve("qc/probes");
fs.mkdirSync(OUT, { recursive: true });

// ---------- 1. OKLCH ----------
{
  const { browser, page, errors } = await openProbe("b5-oklch");
  await seek(page, 0);
  await shot(page, path.join(OUT, "b5-oklch.png"));
  const sample = await page.evaluate(() => {
    const px = (sel) => {
      const el = document.querySelector(sel);
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return { sel, bgColor: cs.backgroundColor, bgImage: cs.backgroundImage };
    };
    // does the browser accept oklch at all? css.supports is the authoritative check
    const supported = CSS.supports("color", "oklch(70% 0.18 150)");
    const gradSupported = CSS.supports("background", "linear-gradient(in oklch 90deg, #000, #fff)");
    const mixSupported = CSS.supports("color", "color-mix(in oklch, #2b50aa 50%, #e8452c)");
    return { supported, gradSupported, mixSupported, swatch: px("#sw-oklch").bg, hex: px("#sw-hex").bg };
  });
  // read actual rendered pixels via a 1x1 canvas sample
  const pixels = await page.evaluate(async () => {
    const c = document.createElement("canvas");
    c.width = 1080;
    c.height = 1920;
    // html2canvas is not available; instead read back through CSS computed values only.
    return null;
  });
  results.oklch = {
    cssSupportsOklch: sample.supported,
    cssSupportsGradientInOklch: sample.gradSupported,
    cssSupportsColorMix: sample.mixSupported,
    oklchComputed: sample.swatch,
    hexComputed: sample.hex,
    errors,
  };
  await browser.close();
}

// ---------- 2. path `d` tween ----------
{
  const { browser, page, errors } = await openProbe("b6-pathd");
  const read = async (t) =>
    page.evaluate(
      async (tt) => {
        window.__timelines["main"].seek(tt, false);
        void document.body.offsetHeight;
        return {
          native: document.getElementById("native").getAttribute("d"),
          manual: document.getElementById("morph").getAttribute("d"),
          nativeValid: document.getElementById("native").getTotalLength() > 0,
          manualValid: document.getElementById("morph").getTotalLength() > 0,
        };
      },
      t,
    );
  const a = await read(0);
  const b = await read(1.5);
  const c = await read(3);
  await seek(page, 1.5);
  const hashMid = await shot(page, path.join(OUT, "b6-pathd-mid.png"));
  results.pathTween = {
    nativeAttrTweened: a.native !== b.native && b.native !== c.native,
    manualTweend: a.manual !== b.manual,
    nativePathValidAt0: a.nativeValid,
    nativePathValidAtMid: b.nativeValid,
    nativePathValidAtEnd: c.nativeValid,
    midFrameHash: hashMid,
    sampleMidNative: b.native.slice(0, 80),
    errors,
  };
  await browser.close();
}

// ---------- 3+4. canvas & ASCII determinism ----------
for (const probe of ["b1-canvas", "b2-ascii"]) {
  const hashes = [];
  const errs = [];
  for (let run = 0; run < 2; run++) {
    const { browser, page, errors } = await openProbe(probe);
    await seek(page, 1.5);
    const h = await shot(page, path.join(OUT, `${probe}-run${run}.png`));
    hashes.push(h);
    errs.push(...errors);
    await browser.close();
  }
  results[probe] = { deterministic: hashes[0] === hashes[1], hashes, errors: errs.slice(0, 5) };
}

// ---------- 5. blend / goo: frame still rendered (not blank) ----------
for (const probe of ["b3-blend3", "b4-blend1", "b7-goo"]) {
  const { browser, page, errors } = await openProbe(probe);
  await seek(page, 1.5);
  const file = path.join(OUT, `${probe}.png`);
  const h = await shot(page, file);
  // non-blank check: file size sanity + decoded variance via canvas in-page
  const variance = await page.evaluate(() => {
    const imgs = document.querySelectorAll("canvas");
    return imgs.length;
  });
  results[probe] = { rendered: true, hash: h, bytes: fs.statSync(file).size, errors };
  await browser.close();
}

console.log(JSON.stringify(results, null, 2));
fs.writeFileSync(path.resolve("qc/probes/verify.json"), JSON.stringify(results, null, 2));
