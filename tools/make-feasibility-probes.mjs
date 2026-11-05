#!/usr/bin/env node
/**
 * make-feasibility-probes.mjs — buat ulang semua probe tes kelayakan V13–V21.
 *
 * Probe ini scaffolding ukur, bukan video. Regenerasi kapan saja:
 *   node tools/make-feasibility-probes.mjs
 * lalu ukur:
 *   node tools/measure-frame-cost.mjs --probe videos/_stylefeasibility/probes/b1-canvas --frames 60
 *   node tools/verify-probes.mjs
 *
 * Dirujuk oleh .claude/skills/video-reels/styles/FEASIBILITY.md.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(process.cwd(), "videos/_stylefeasibility");
const PROBES = path.join(ROOT, "probes");
const GSAP_SRC = path.join(process.cwd(), "shared/vendor/gsap.min.js");

const shell = (body, css, script, extra = "") => `<!doctype html>
<html lang="id" data-resolution="portrait">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="./assets/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; }
      #root { position: relative; width: 100%; height: 100%; overflow: hidden; }
      #idle { position: absolute; inset: 0; background: transparent; }
${css}
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="6" data-width="1080" data-height="1920">
      <div id="idle" class="clip" data-start="3" data-duration="3" data-track-index="0"></div>
      <div id="work" class="clip" data-start="0" data-duration="3" data-track-index="1">${body}</div>
    </div>
    <script>
${script}
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = tl;
      tl.seek(0);
    </script>${extra}
  </body>
</html>
`;

const probes = {
  // b9 — lantai biaya: layar diam sama sekali
  "b9-static": shell("", `html, body { background: #101010; }`, `      const tl = gsap.timeline({ paused: true });`),

  // b0 — baseline: 90 blok DOM beranimasi
  "b0-baseline": shell(
    "",
    `html, body { background: #101010; }
      .blk { position: absolute; width: 60px; height: 60px; background: #e8e4d8; }`,
    `      const work = document.getElementById("work");
      for (let i = 0; i < 90; i++) {
        const d = document.createElement("div");
        d.className = "blk";
        d.style.left = ((i % 10) * 104 + 20) + "px";
        d.style.top = (Math.floor(i / 10) * 200 + 120) + "px";
        work.appendChild(d);
      }
      const tl = gsap.timeline({ paused: true });
      work.querySelectorAll(".blk").forEach((b, i) => {
        tl.fromTo(b, { x: -40, y: -160, rotate: -20 },
          { x: 0, y: 0, rotate: 0, duration: 1.2, ease: "power2.out" }, i * 0.02);
        tl.to(b, { x: 30, y: 24, rotate: 6, duration: 1.0, ease: "sine.inOut" }, 1.4 + i * 0.01);
      });`,
  ),

  // b1 — canvas 2D: 2600 partikel digambar tiap frame
  "b1-canvas": shell(
    `<canvas id="cv" width="1080" height="1920"></canvas>`,
    `html, body { background: #0b0b0a; }
      #cv { position: absolute; inset: 0; }`,
    `      const cv = document.getElementById("cv");
      const ctx = cv.getContext("2d");
      const N = 2600;
      const pts = [];
      let s = 1337;
      const rnd = () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
      for (let i = 0; i < N; i++) {
        pts.push({ x: rnd() * 1080, y: rnd() * 1920, r: 1.2 + rnd() * 2.6,
                   p: rnd() * 6.283, sp: 0.4 + rnd() * 0.9 });
      }
      for (let i = 0; i < N; i++) {
        const a = (i / N) * 6.283 * 3;
        pts[i].tx = 540 + Math.cos(a) * (240 + (i % 7) * 6);
        pts[i].ty = 960 + Math.sin(a) * (240 + (i % 7) * 6);
      }
      function draw(t) {
        ctx.fillStyle = "#0b0b0a";
        ctx.fillRect(0, 0, 1080, 1920);
        const e = t * t * (3 - 2 * t);
        for (let i = 0; i < N; i++) {
          const p = pts[i];
          const x = p.x + (p.tx - p.x) * e + Math.sin(t * 6.283 * p.sp + p.p) * 8;
          const y = p.y + (p.ty - p.y) * e + Math.cos(t * 6.283 * p.sp + p.p) * 8;
          ctx.fillStyle = i % 5 === 0 ? "#c6ff3d" : "rgba(241,239,232,0.62)";
          ctx.beginPath();
          ctx.arc(x, y, p.r, 0, 6.283);
          ctx.fill();
        }
      }
      draw(0);
      const state = { t: 0 };
      const tl = gsap.timeline({ paused: true });
      tl.to(state, { t: 1, duration: 3, ease: "none", onUpdate: () => draw(state.t) }, 0);`,
  ),

  // b2 — ASCII 64x100 dibangun ulang tiap frame
  "b2-ascii": shell(
    `<pre id="pre"></pre>`,
    `html, body { background: #0b0b0a; }
      #pre { position: absolute; left: 60px; top: 120px;
             font: 15px/17px "DejaVu Sans Mono", monospace;
             color: #c6ff3d; white-space: pre; }`,
    `      const COLS = 64, ROWS = 100;
      const RAMP = " .:-=+*#%@";
      const pre = document.getElementById("pre");
      function build(t) {
        let out = "";
        for (let y = 0; y < ROWS; y++) {
          let line = "";
          for (let x = 0; x < COLS; x++) {
            const nx = (x - COLS / 2) / (COLS / 2);
            const ny = (y - ROWS / 2) / (ROWS / 2);
            const d = Math.sqrt(nx * nx + ny * ny);
            let v = Math.sin(d * 7 - t * 6.283) * 0.5 + 0.5;
            v *= Math.max(0, 1 - d * 0.9);
            line += RAMP[Math.min(RAMP.length - 1, Math.max(0, Math.round(v * (RAMP.length - 1))))];
          }
          out += line + "\\n";
        }
        return out;
      }
      pre.textContent = build(0);
      const state = { t: 0 };
      const tl = gsap.timeline({ paused: true });
      tl.to(state, { t: 1, duration: 3, ease: "none",
                     onUpdate: () => { pre.textContent = build(state.t); } }, 0);`,
  ),

  // b3 / b4 — mix-blend-mode pada 3 dan 1 elemen
  "b3-blend3": shell(
    `<div id="label">3 blend</div><div id="c1" class="card"></div><div id="c2" class="card"></div><div id="c3" class="card"></div>`,
    `html, body { background: #062a2e; }
      .card { position: absolute; width: 520px; height: 720px; border-radius: 28px;
              background: linear-gradient(120deg, #1a5f5a, #7fe3d2 40%, #d8b4fe 72%, #1a5f5a);
              mix-blend-mode: color-dodge; }
      #c1 { left: 80px; top: 340px; }
      #c2 { left: 440px; top: 620px; mix-blend-mode: overlay;
            background: conic-gradient(from 40deg, #7fe3d2, #d8b4fe, #1a5f5a, #7fe3d2); }
      #c3 { left: 220px; top: 900px; mix-blend-mode: overlay;
            background: linear-gradient(200deg, #f0abfc, #22d3ee 60%, #0b0b0a); }
      #label { position: absolute; left: 80px; top: 200px;
               font: 700 60px/1 sans-serif; color: #f4f4f2; }`,
    `      const tl = gsap.timeline({ paused: true });
      tl.fromTo(["#c1", "#c2", "#c3"], { x: -120, rotate: -14 },
        { x: 60, rotate: 10, duration: 3, ease: "sine.inOut", stagger: 0.12 }, 0);
      tl.fromTo("#label", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }, 0);`,
  ),

  "b4-blend1": shell(
    `<div id="label">1 blend</div><div id="c1" class="card"></div>
     <div id="c2" class="card" style="display:none"></div><div id="c3" class="card" style="display:none"></div>`,
    `html, body { background: #062a2e; }
      .card { position: absolute; width: 520px; height: 720px; border-radius: 28px;
              background: linear-gradient(120deg, #1a5f5a, #7fe3d2 40%, #d8b4fe 72%, #1a5f5a);
              mix-blend-mode: color-dodge; }
      #c1 { left: 80px; top: 340px; }
      #c2 { left: 440px; top: 620px; }
      #c3 { left: 220px; top: 900px; }
      #label { position: absolute; left: 80px; top: 200px;
               font: 700 60px/1 sans-serif; color: #f4f4f2; }`,
    `      const tl = gsap.timeline({ paused: true });
      tl.fromTo("#c1", { x: -120, rotate: -14 }, { x: 60, rotate: 10, duration: 3, ease: "sine.inOut" }, 0);
      tl.fromTo("#label", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }, 0);`,
  ),

  // b5 — oklch / gradient in oklch / color-mix
  "b5-oklch": shell(
    `<div id="sw-oklch"></div><div id="sw-hex"></div>
     <div id="grad-oklch"></div><div id="grad-srgb"></div><div id="mix"></div>`,
    `html, body { background: #0b0b0a; }
      #sw-oklch { position: absolute; left: 60px; top: 200px; width: 440px; height: 400px;
                  background: oklch(70% 0.18 150); }
      #sw-hex { position: absolute; left: 560px; top: 200px; width: 440px; height: 400px;
                background: #35c46a; }
      #grad-oklch { position: absolute; left: 60px; top: 700px; width: 940px; height: 300px;
                    background: linear-gradient(in oklch 90deg, #2b50aa, #e8452c); }
      #grad-srgb { position: absolute; left: 60px; top: 1100px; width: 940px; height: 300px;
                   background: linear-gradient(90deg, #2b50aa, #e8452c); }
      #mix { position: absolute; left: 60px; top: 1500px; width: 440px; height: 300px;
             background: color-mix(in oklch, #2b50aa 50%, #e8452c); }`,
    `      const tl = gsap.timeline({ paused: true });
      tl.fromTo("#mix", { scale: 1 }, { scale: 1.1, duration: 3, ease: "sine.inOut" }, 0);`,
  ),

  // b6 — tween attr:{d} native + interpolasi manual
  "b6-pathd": shell(
    `<svg viewBox="0 0 1080 1920" width="1080" height="1920">
       <path id="morph" class="blob" d="M540,660 C620,660 660,760 660,860 C660,960 620,1060 540,1060 C460,1060 420,960 420,860 C420,760 460,660 540,660 Z" />
       <path id="native" class="blob" style="opacity:.55"
             d="M540,1660 C620,1660 660,1760 660,1860 C660,1930 620,1900 540,1900 C460,1900 420,1930 420,1860 C420,1760 460,1660 540,1660 Z" />
     </svg>`,
    `html, body { background: #0d2b52; }
      svg { position: absolute; inset: 0; }
      .blob { fill: #ffb703; }`,
    `      const TARGET = "M540,600 C680,600 760,740 760,880 C760,1020 680,1140 540,1140 C400,1140 320,1020 320,880 C320,740 400,600 540,600 Z";
      const parse = (d) => d.match(/-?\\d+(\\.\\d+)?/g).map(Number);
      const cmd = document.getElementById("morph");
      const from = parse(cmd.getAttribute("d"));
      const to = parse(TARGET);
      let s = 99;
      const rnd = () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
      const wob = from.map(() => (rnd() - 0.5) * 24);
      const lerped = { t: 0 };
      function apply(t) {
        const o = from.map((v, i) => v + (to[i] - v) * t + wob[i] * Math.sin(t * 3.14));
        cmd.setAttribute("d",
          "M" + o[0] + "," + o[1] + " C" + o[2] + "," + o[3] + " " + o[4] + "," + o[5] + " " + o[6] + "," + o[7] +
          " C" + o[8] + "," + o[9] + " " + o[10] + "," + o[11] + " " + o[12] + "," + o[13] +
          " C" + o[14] + "," + o[15] + " " + o[16] + "," + o[17] + " " + o[18] + "," + o[19] +
          " C" + o[20] + "," + o[21] + " " + o[22] + "," + o[23] + " " + o[24] + "," + o[25] + " Z");
      }
      const tl = gsap.timeline({ paused: true });
      tl.to(lerped, { t: 1, duration: 3, ease: "power2.inOut", onUpdate: () => apply(lerped.t) }, 0);
      tl.to("#native", { duration: 3, ease: "power2.inOut",
        attr: { d: "M540,1600 C680,1600 760,1740 760,1880 C760,1920 680,1840 540,1840 C400,1840 320,1920 320,1880 C320,1740 400,1600 540,1600 Z" } }, 0);`,
  ),

  // b7 — filter goo: satu grup kecil 4 blob bertumpuk
  "b7-goo": shell(
    `<svg width="0" height="0" style="position:absolute">
       <filter id="goo">
         <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
         <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" result="goo" />
         <feComposite in="SourceGraphic" in2="goo" operator="atop" />
       </filter>
     </svg>
     <div id="goo"><div class="drop" id="d1"></div><div class="drop" id="d2"></div><div class="drop" id="d3"></div><div class="drop" id="d4"></div></div>
     <div id="plain"><div class="drop2" id="e1"></div><div class="drop2" id="e2"></div><div class="drop2" id="e3"></div><div class="drop2" id="e4"></div></div>`,
    `html, body { background: #efe8d6; }
      #goo { position: absolute; left: 240px; top: 620px; width: 600px; height: 600px; filter: url(#goo); }
      .drop { position: absolute; width: 200px; height: 200px; border-radius: 50%; background: #0f2a22; }
      #d1 { left: 130px; top: 130px; } #d2 { left: 270px; top: 130px; }
      #d3 { left: 130px; top: 270px; } #d4 { left: 270px; top: 270px; }
      #plain { position: absolute; left: 240px; top: 1300px; width: 600px; height: 600px; }
      .drop2 { position: absolute; width: 200px; height: 200px; border-radius: 50%; background: #b5452e; }
      #e1 { left: 60px; top: 60px; } #e2 { left: 300px; top: 60px; }
      #e3 { left: 60px; top: 300px; } #e4 { left: 300px; top: 300px; }`,
    `      const tl = gsap.timeline({ paused: true });
      for (const pre of ["d", "e"]) {
        tl.fromTo("#" + pre + "1", { x: -40, y: -40 }, { x: 40, y: 40, duration: 3, ease: "sine.inOut" }, 0);
        tl.fromTo("#" + pre + "2", { x: 40, y: -40 }, { x: -40, y: 40, duration: 3, ease: "sine.inOut" }, 0);
        tl.fromTo("#" + pre + "3", { x: -40, y: 40 }, { x: 40, y: -40, duration: 3, ease: "sine.inOut" }, 0);
        tl.fromTo("#" + pre + "4", { x: 40, y: 40 }, { x: -40, y: -40, duration: 3, ease: "sine.inOut" }, 0);
      }`,
  ),

  // b8 — 400 elemen DOM beranimasi (batas budget)
  "b8-dom400": shell(
    "",
    `html, body { background: #0e100e; }
      .el { position: absolute; width: 36px; height: 36px; border-radius: 4px; background: #c6ff3d; }`,
    `      const work = document.getElementById("work");
      for (let i = 0; i < 400; i++) {
        const d = document.createElement("div");
        d.className = "el";
        d.style.left = ((i % 20) * 52 + 20) + "px";
        d.style.top = (Math.floor(i / 20) * 92 + 120) + "px";
        work.appendChild(d);
      }
      const tl = gsap.timeline({ paused: true });
      work.querySelectorAll(".el").forEach((el, i) => {
        tl.fromTo(el, { y: 30, opacity: 0.2 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          (i % 40) * 0.02);
        tl.to(el, { rotate: 18, x: 10, duration: 1.4, ease: "sine.inOut" }, 1.2 + (i % 20) * 0.02);
      });`,
  ),

  // b10 — split-flap dengan tl.call() (varian murah, 2 elemen/huruf)
  "b10-splitflap": shell(
    `<div id="board"></div>`,
    `html, body { background: #0b0b0a; }
      #board { position: absolute; left: 80px; top: 700px; width: 920px; display: flex; flex-wrap: wrap; gap: 6px;
               font: 700 74px/1 "DejaVu Sans Mono", monospace; color: #f1efe8; }
      .cell { position: relative; width: 74px; height: 96px; overflow: hidden;
              background: #1a1a18; border-radius: 4px; }
      .cell span { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }`,
    `      const TEXT = "ESOK 06 00";
      const SUN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
      const board = document.getElementById("board");
      const letters = [];
      for (const ch of TEXT) {
        const cell = document.createElement("div");
        cell.className = "cell";
        const sp = document.createElement("span");
        sp.textContent = " ";
        cell.appendChild(sp);
        board.appendChild(cell);
        letters.push({ el: sp, target: ch });
      }
      const tl = gsap.timeline({ paused: true });
      letters.forEach((L, i) => {
        const start = i * 0.06;
        const steps = 10 + (i % 6);
        for (let s = 0; s <= steps; s++) {
          const t = start + s * 0.06;
          const ch = s === steps ? L.target : SUN[(i * 7 + s * 3) % SUN.length];
          tl.call(() => { L.el.textContent = ch; }, null, t);
        }
      });`,
  ),

  // b11 varian BURUK — text-shadow 4 lapis dianimasikan tiap frame
  "b11-neon-bad": shell(
    `<div id="halo"></div><div id="good">NEON</div><div id="neon">NEON</div>`,
    `html, body { background: #0b0b0a; }
      #neon { position: absolute; left: 72px; top: 760px; width: 936px;
              font: 700 120px/1.1 sans-serif; color: #7fe3d2; text-align: center;
              text-shadow: 0 0 18px #7fe3d2, 0 0 46px #7fe3d2, 0 0 90px #22d3ee, 0 0 140px #1a5f5a; }
      #halo { position: absolute; left: 40px; top: 480px; width: 1000px; height: 520px;
              background: radial-gradient(ellipse at center, rgba(127,227,210,0.55) 0%,
                          rgba(127,227,210,0.22) 38%, rgba(127,227,210,0) 70%); }
      #good { position: absolute; left: 72px; top: 760px; width: 936px;
              font: 700 120px/1.1 sans-serif; color: #f4fff9; text-align: center; opacity: 0; }`,
    `      const tl = gsap.timeline({ paused: true });
      const el = document.getElementById("neon");
      const state = { r: 18 };
      tl.to(state, { r: 46, duration: 3, ease: "sine.inOut", onUpdate: () => {
        const r = state.r;
        el.style.textShadow = "0 0 " + r + "px #7fe3d2, 0 0 " + r * 2.4 + "px #7fe3d2, 0 0 " +
          r * 4.6 + "px #22d3ee, 0 0 " + r * 7 + "px #1a5f5a";
      } }, 0);`,
  ),

  // b11 varian BAIK — halo pra-render + flicker opasitas
  "b11-neon-good": shell(
    `<div id="halo"></div><div id="good">NEON</div><div id="neon">NEON</div>`,
    `html, body { background: #0b0b0a; }
      #neon { display: none; }
      #halo { position: absolute; left: 40px; top: 480px; width: 1000px; height: 520px;
              background: radial-gradient(ellipse at center, rgba(127,227,210,0.55) 0%,
                          rgba(127,227,210,0.22) 38%, rgba(127,227,210,0) 70%); }
      #good { position: absolute; left: 72px; top: 760px; width: 936px;
              font: 700 120px/1.1 sans-serif; color: #f4fff9; text-align: center; }`,
    `      const tl = gsap.timeline({ paused: true });
      const flick = [1, 0.72, 1, 0.55, 1, 0.86, 1, 0.62, 1];
      flick.forEach((v, i) =>
        tl.to("#good", { opacity: v, duration: 0.034, ease: "steps(1)" }, 0.4 + i * 0.05));
      tl.to("#halo", { opacity: 0.85, duration: 3, ease: "sine.inOut" }, 0);`,
  ),
};

// --- tulis semua probe ---
if (!fs.existsSync(GSAP_SRC)) {
  console.error(`GSAP vendored tidak ditemukan: ${GSAP_SRC}`);
  console.error("Ambil sekali dari https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js lalu simpan di shared/vendor/ (jangan pakai CDN di komposisi — render gagal).");
  process.exit(1);
}
fs.mkdirSync(PROBES, { recursive: true });

const hfJson = fs.readFileSync(path.join(ROOT, "hyperframes.json"), "utf8");
for (const [name, html] of Object.entries(probes)) {
  const dir = path.join(PROBES, name);
  fs.mkdirSync(path.join(dir, "assets"), { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
  fs.writeFileSync(path.join(dir, "hyperframes.json"), hfJson);
  fs.copyFileSync(GSAP_SRC, path.join(dir, "assets", "gsap.min.js"));
  console.log("ok", name);
}
console.log(`\n${Object.keys(probes).length} probe di ${PROBES}`);
console.log(
  "Catatan: probe memakai #work bersarang (tanpa sub-composition) supaya ringkas. Lint akan\n" +
  "memberi 1 warning nested_structure_needs_subcomposition per probe — itu diabaikan untuk\n" +
  "scaffolding ukur. Video sungguhan wajib 0 warning."
);
console.log("Ukur: node tools/measure-frame-cost.mjs --probe videos/_stylefeasibility/probes/<nama> --frames 60");
