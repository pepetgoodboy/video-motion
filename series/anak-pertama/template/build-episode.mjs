// ===================================================================================================
// TEMPLATE EPISODE — Anak Pertama (gaya ref3). Ini salinan build Eps 1 v4 yang lolos QA (15 Nov 2026).
// Pakai: cp series/anak-pertama/template/build-episode.mjs videos/<slug>/build.mjs, lalu ganti bagian
// yang ditandai per episode: SETS (lokasi), LIGHT (matahari per lokasi), CHARS, SPEAK (baris bersuara tokoh
// di layar), S (shot per scene), SPK (label kutipan), isi make("S1".."S9") (sisipan grafis + SFX), dan teks
// kartu BERSAMBUNG. Mesin (jangan disalin): series/anak-pertama/3d/{char3d,blok,post,world}.js.
// Dipakai skill /video-series. Urutan kerja lengkap: .claude/skills/video-series/references/serial-3d.md §2.
// ===================================================================================================
// Anak Pertama Eps 1 v4 — arah ref3: Dinda bercerita sendiri ("aku"), tokoh BALOK + wajah dilukis + garis tepi,
// matahari lewat jendela, glow + blur kedalaman + grading hangat (post.js), caption 2–3 kata kapital berlabel nama,
// ditutup "BERSAMBUNG". node build.mjs → plan.js + compositions/frames/s1..s9.html + index.html (PATCH=S4 → patch-s4.html)
// Panduan: .claude/skills/video-series/references/serial-3d.md
import { writeFileSync, readFileSync, mkdirSync, copyFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const SER = "../../series/anak-pertama/3d";
for (const f of ["vendor/three.min.js", "char3d.js", "blok.js", "post.js", "world.js"]) copyFileSync(`${SER}/${f}`, `assets/vendor/${f.split("/").pop()}`);

const T = JSON.parse(readFileSync("timing.json", "utf8"));
const WT = JSON.parse(readFileSync("word-timing.json", "utf8"));
const SC = Object.fromEntries(T.scenes.map((s) => [s.id, s]));
const AT = {}, END = {}, ABS = {};
for (const s of T.scenes) for (const l of s.lines) { AT[l.id] = l.at; END[l.id] = +(l.at + l.dur).toFixed(3); ABS[l.id] = l.abs; }
const norm = (w) => w.toLowerCase().replace(/[^a-z0-9]/g, "");
const WI = (id, word) => { const i = WT[id].findIndex((x) => norm(x.w).startsWith(word.toLowerCase())); if (i < 0) throw new Error(`kata "${word}" tidak ada di ${id}`); return i; };
const W = (id, word) => +(AT[id] + WT[id][WI(id, word)].s).toFixed(3);
const f2 = (n) => (+n).toFixed(2);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const C = { ink: "#2A2238", cream: "#FFFDF8", teal: "#2F7F86", mustard: "#F5C542", coralT: "#B0462C", leafT: "#2F7340", rose: "#E9A6B5", night: "#1B1726" };
const env = (id) => JSON.parse(execFileSync("node", ["../../tools/vo-envelope.mjs", `assets/vo/t/${id}.mp3`, "--hz", "12", "--levels", "3"]).toString()).mouth;

// ================= RENCANA 3D =================
const OFF = { kosP: 0, kosM: 40, dapur: 80, dapurM: 120, kantor: 160, raka: 200, warung: 240 };
const SETS = {
  kosP: { type: "roomSun", o: { wall: "#EAD7B5", winX: 1.5, props: [{ t: "bed", x: -2.5 }, { t: "desk", x: 2.7, z: -2.0 }, { t: "frame", x: -1.0, y: 3.7 }] } },
  kosM: { type: "roomSun", o: { wall: "#9C8A74", floorA: "#8E7A62", floorB: "#84705A", winX: 1.5, night: true, lampX: -0.9, lampPower: 1.6, props: [{ t: "bed", x: -2.5 }, { t: "desk", x: 2.7, z: -2.0 }] } },
  dapur: { type: "roomSun", o: { wall: "#EADFC8", winX: 0.4, tilesWall: [3.6, 2.0, 1.6], props: [{ t: "counter", x: 1.6, w: 3.0 }, { t: "frame", x: -2.0, y: 3.4 }] } },
  dapurM: { type: "roomSun", o: { wall: "#9E9078", floorA: "#8E7A62", floorB: "#84705A", winX: 0.4, night: true, lampX: -0.6, lampPower: 1.6, tilesWall: [3.6, 2.0, 1.6], props: [{ t: "counter", x: 1.6, w: 3.0 }, { t: "frame", x: -2.0, y: 3.4 }] } },
  kantor: { type: "roomSun", o: { wall: "#DCE3DF", floorA: "#C9CFCB", floorB: "#BEC5C1", winX: 1.6, curtains: false, props: [{ t: "officeDesk" }, { t: "blinds" }, { t: "plant", x: 3.4, z: -1.6 }] } },
  raka: { type: "roomSun", o: { wall: "#C9D3E0", winX: -1.6, curtA: "#4F6E9C", curtB: "#C9D3E0", props: [{ t: "desk", x: 1.7, z: -2.0 }, { t: "frame", x: 0.4, y: 3.7 }] } },
  warung: { type: "warungBlok", o: {} },
};
const sunTo = (win, head, k = 3) => win.map((v, i) => +(v - (head[i] - v) * k).toFixed(2)); // matahari di garis jendela→kepala
const LIGHT = {
  kosP: { bg: "#EAD7B5", hemi: ["#FFF1DC", "#B88E66", 0.55], key: ["#FFD9A0", 2.8], sun: true, sunPos: sunTo([1.5, 3.0, -2.6], [0, 2.55, 0.3]), sunTarget: [0, 2.0, 0.3], camFill: 0.35, rim: 0.25 },
  kosM: { bg: C.night, hemi: ["#6E6AA8", "#2A2030", 0.3], key: ["#FFC98A", 0.35], keyPos: [-1.6, 4.8, 4], camFill: 0.25, camFillColor: "#C9C2FF", rim: 0.6, post: { exposure: 0.72, warm: 0.5, bloom: 0.85, threshold: 0.75 } },
  dapur: { bg: "#EADFC8", hemi: ["#FFF1DC", "#B88E66", 0.55], key: ["#FFD9A0", 2.8], sun: true, sunPos: sunTo([0.4, 3.0, -2.6], [-0.9, 2.55, 0.3]), sunTarget: [-0.9, 2.0, 0.3], camFill: 0.35, rim: 0.25 },
  dapurM: { bg: C.night, hemi: ["#6E6AA8", "#2A2030", 0.3], key: ["#FFC98A", 0.35], keyPos: [-1.6, 4.8, 4], camFill: 0.25, camFillColor: "#C9C2FF", rim: 0.6, post: { exposure: 0.72, warm: 0.5, bloom: 0.85, threshold: 0.75 } },
  kantor: { bg: "#DCE3DF", hemi: ["#F2F7FF", "#9AA6A4", 0.55], key: ["#FFE6C0", 2.6], sun: true, sunPos: sunTo([1.6, 3.0, -2.6], [-0.3, 2.55, -0.65]), sunTarget: [-0.3, 1.8, -0.4], camFill: 0.35, camFillColor: "#E6F0FF", rim: 0.25 },
  raka: { bg: "#C9D3E0", hemi: ["#EAF0FF", "#8C7A6A", 0.55], key: ["#FFE0B0", 2.6], sun: true, sunPos: sunTo([-1.6, 3.0, -2.6], [0.2, 2.55, 0.3]), sunTarget: [0.2, 2.0, 0.3], camFill: 0.35, rim: 0.25 },
  warung: { bg: "#151B33", hemi: ["#8A92C8", "#3A2A30", 0.62], key: ["#FFC890", 1.2], camFill: 0.4, rim: 0.7 },
};
const CHARS = { dP: { key: "dinda", set: "kosP" }, dM: { key: "dinda", set: "kosM" }, dK: { key: "dinda", set: "kantor" }, dW: { key: "dinda", set: "warung" },
  ibu: { key: "ibu", set: "dapur" }, ibuM: { key: "ibu", set: "dapurM" }, raka: { key: "raka", set: "raka" }, hd: { key: "hendra", set: "kantor" }, mP: { key: "mega", set: "kosP" }, mW: { key: "mega", set: "warung" } };
const SPEAK = { n09: "ibu", n20: "ibuM" };
const lines = {}; for (const [lid, cid] of Object.entries(SPEAK)) (lines[cid] ??= []).push([ABS[lid], env(lid)]);
const blinks = {}; Object.keys(CHARS).forEach((cid, k) => { const a = []; for (let t = 0.8 + k * 0.37; t < T.total; t += 3.1 + ((k * 7 + a.length * 3) % 13) / 10) a.push(+t.toFixed(2)); blinks[cid] = a; });

// framing tokoh balok (pusat kepala y≈2.58): med = setinggi dada, cu = close-up, low = sudut rendah, side = 3/4 dari kanan
const med = (cx, cz, dx = 0, push = 0.4) => ({ p0: [cx + 0.05 + dx, 2.65, cz + 6.2], p1: [cx + 0.05 + dx, 2.65, cz + 6.2 - push], l: [cx + dx, 2.45, cz - 0.3] });
const cu = (cx, cz, dx = 0, push = 0.3) => ({ p0: [cx + 0.05 + dx, 2.55, cz + 4.4], p1: [cx + 0.05 + dx, 2.55, cz + 4.4 - push], l: [cx + dx, 2.33, cz - 0.3] });
const low = (cx, cz) => ({ p0: [cx + 0.4, 1.35, cz + 4.6], p1: [cx + 0.3, 1.4, cz + 4.2], l: [cx, 2.35, cz] });
const side = (cx, cz, push = 0.3) => ({ p0: [cx + 3.0, 2.55, cz + 4.4], p1: [cx + 2.8, 2.55, cz + 4.1 - push], l: [cx - 0.1, 2.35, cz - 0.2] });
const face = (cx, cz) => ({ p0: [cx, 2.66, cz + 3.4], l: [cx, 2.6, cz] });
const shot = (set, a, b, f, extra = {}) => ({ set, from: a, to: b, fov: [[0, 40]], pos: [[a, f.p0], [b, f.p1 ?? f.p0]], look: [[a, f.l], [b, f.l1 ?? f.l]], ...extra });
const vp = (set, rect, a, b, f, extra = {}) => ({ ...shot(set, a, b, f), rect, fov: [[0, 34]], ...extra });
const DOWN = [0.012, -0.024], CAM = [0, 0], SIDE_R = [0.026, 0], SIDE_L = [-0.026, 0];

const S = {
  S1: { clear: C.night, views: [shot("kosP", 0, W("n01", "Lima"), med(0, 0.3)), shot("kosP", W("n01", "Lima"), AT.n02, side(0, 0.3)), shot("kosP", AT.n02, 99, cu(0, 0.3))],
    chars: { dP: { pos: [[0, [0, 0, 0.3]]], rotY: [[0, -0.1]], poses: [[0, "phone"], [AT.n02, "phoneLow"]], expr: [[0, "senang"], [AT.n02 + 0.3, "kaget"], [W("n02", "tinggal") + 0.4, "pasrah"]],
      gaze: [[0, DOWN], [W("n01", "Lima") - 0.2, DOWN], [W("n01", "Lima"), CAM], [AT.n02 + 0.2, CAM], [AT.n02 + 0.5, DOWN]], head: [[0, [0.08, 0, 0.05]], [AT.n02, [0.02, 0, 0]], [END.n02, [0.16, 0, -0.08]]] } } },
  S2: { clear: C.night, views: [
      shot("kosP", 0, AT.n04, { p0: [0.38, 2.65, 6.5], p1: [0.3, 2.6, 5.7], l: [0.33, 2.45, 0] }),
      vp("dapur", [724, 344, 212, 212], 0.35, AT.n04, face(-0.9, 0.3)),
      shot("kosP", AT.n04, AT.n05, { p0: [-0.3, 2.65, 6.4], p1: [-0.22, 2.6, 5.6], l: [-0.33, 2.45, 0] }),
      vp("raka", [144, 344, 212, 212], AT.n04 + 0.15, AT.n05, face(0.2, 0.3)),
      shot("kosP", AT.n05, 99, { p0: [-0.6, 3.7, 8.4], p1: [-0.6, 3.5, 7.9], l: [-0.8, 1.9, -0.4] })],
    chars: { dP: { pos: [[0, [0, 0, 0.3]]], rotY: [[0, -0.18], [AT.n04 - 0.01, -0.18], [AT.n04, 0.2], [AT.n05 - 0.01, 0.2], [AT.n05, 0.25]], poses: [[0, "phoneLow"], [AT.n05, "idle"]],
        expr: [[0, "netral"], [AT.n04 + 1.4, "pasrah"], [AT.n05, "pasrah"]], gaze: [[0, SIDE_R], [1.4, DOWN], [AT.n04 - 0.01, DOWN], [AT.n04, SIDE_L], [AT.n04 + 1.4, DOWN], [AT.n05, [0, -0.02]]],
        head: [[0, [0.04, 0.12, -0.05]], [1.5, [0.1, 0.08, 0.0]], [2.8, [0.06, 0.16, -0.07]], [AT.n04, [0.06, -0.1, 0.05]], [AT.n04 + 1.5, [0.13, -0.04, 0.0]], [AT.n04 + 3.0, [0.08, -0.12, 0.05]], [AT.n05, [0.18, 0, 0.06]]] },
      ibu: { pos: [[0, [-0.9, 0, 0.3]]], expr: [[0, "senang"]], gaze: [[0, CAM]] }, raka: { pos: [[0, [0.2, 0, 0.3]]], expr: [[0, "senang"]], gaze: [[0, CAM]] } } },
  S3: { clear: "#1B1621", views: [shot("kosP", 0, AT.n07, low(0, 0.3)), shot("dapur", AT.n07, W("n07", "semua") - 0.05, { p0: [-1.4, 3.3, 2.4], p1: [-1.85, 3.35, 0.9], l: [-1.9, 3.38, -2.5], l1: [-2.0, 3.4, -2.5] })],
    chars: { dP: { pos: [[0, [0, 0, 0.3]]], poses: [[0, "forward"]], expr: [[0, "netral"]], gaze: [[0, CAM]], head: [[0, [-0.06, 0, 0]]] } } },
  S4: { clear: "#14111C", views: [
      vp("dapur", [420, 390, 240, 240], 0, AT.n09, face(-0.9, 0.3)),
      shot("dapur", AT.n09, AT.n10, med(-0.9, 0.3, 0.15)),
      shot("kosP", AT.n10, 99, cu(0, 0.3, 0.05))],
    chars: { ibu: { pos: [[0, [-0.9, 0, 0.3]]], rotY: [[0, 0.15]], poses: [[0, "hands"], [AT.n09, "forward"]], expr: [[0, "senang"], [AT.n09 - 0.1, "sedih"]], gaze: [[0, CAM], [AT.n09 + 1.2, [-0.02, -0.02]]], head: [[0, [0, 0, 0]], [AT.n09, [0.08, 0, 0.1]]] },
      dP: { pos: [[0, [0, 0, 0.3]]], rotY: [[0, -0.08]], poses: [[0, "phone"]], expr: [[0, "senang"]], gaze: [[0, DOWN]], head: [[0, [0.05, 0, -0.06]]] } } },
  S5: { clear: "#2A2238", views: [shot("raka", 0, AT.n12, med(0.2, 0.3))],
    chars: { raka: { pos: [[0, [0.2, 0, 0.3]]], poses: [[0, "idle"], [W("n11", "Makasih") - 0.2, "wave"], [W("n11", "Nanti"), "forward"]], expr: [[0, "senang"]], gaze: [[0, DOWN], [W("n11", "Makasih") - 0.3, CAM]], head: [[0, [0.12, 0, 0]], [W("n11", "Makasih") - 0.3, [0, 0, 0.08]]] } } },
  S6: { clear: "#22302F", views: [
      shot("kantor", 0, AT.n14, { p0: [0.75, 2.8, 9.6], p1: [0.7, 2.75, 9.1], l: [0.75, 1.95, 0] }),
      shot("kantor", AT.n14, AT.n15, { p0: [-0.25, 2.65, 5.6], p1: [-0.25, 2.65, 5.3], l: [-0.3, 2.35, -0.65] }),
      shot("kantor", AT.n15, 99, { p0: [0.62, 1.78, 1.75], p1: [0.6, 1.72, 1.5], l: [0.45, 1.3, 0.45] })],
    wallet: [[0, 0], [W("n15", "Dompetku") - 0.1, 0], [W("n15", "Dompetku") + 0.35, 1]],
    moth: [[W("n15", "Dompetku") + 0.45, [0.45, 1.3, 0.45]], [W("n15", "Dompetku") + 1.2, [0.75, 1.95, 0.9]], [W("n15", "Dompetku") + 2.2, [1.2, 2.6, 1.4]]],
    chars: { dK: { pos: [[0, [-0.3, 0, -0.65]]], rotY: [[0, 0.1]], poses: [[0, "idle"], [AT.n14 + 0.1, "salute"], [AT.n15, "idle"]], expr: [[0, "netral"], [AT.n14, "senang"], [AT.n15 + 0.3, "pasrah"]],
        gaze: [[0, SIDE_R], [AT.n14, CAM], [AT.n15, DOWN]], head: [[0, [0, 0.3, 0]], [AT.n14, [0, 0, 0]], [AT.n15, [0.3, 0.2, 0]]] },
      hd: { pos: [[0, [5.6, 0, 1.1]], [1.2, [1.75, 0, 1.1]]], rotY: [[0, -1.3], [1.15, -1.3], [1.35, -0.45]], walk: [[0, 1.2]], poses: [[0, "idle"], [W("n13", "Laporan") - 0.2, "open"], [END.n13, "idle"]],
        expr: [[0, "netral"], [W("n13", "Laporan"), "licik"]], gaze: [[0, SIDE_L]], head: [[0, [0, 0, 0]], [END.n13 - 0.3, [0.15, 0, 0]]] } } },
  S7: { clear: "#22302F", views: [
      shot("kantor", 0, AT.n17, { p0: [-0.25, 2.65, 5.6], p1: [-0.25, 2.65, 5.3], l: [-0.3, 2.45, -0.65] }),
      vp("kosP", [128, 318, 124, 124], 0.3, AT.n18 - 0.15, face(1.2, 0.3)),
      shot("kantor", AT.n17, AT.n18, side(-0.3, -0.65)),
      shot("kantor", AT.n18, 99, { p0: [-0.35, 2.35, 4.6], p1: [-0.35, 2.3, 4.3], l: [-0.3, 2.15, -0.65] })],
    chars: { dK: { pos: [[0, [-0.3, 0, -0.65]]], rotY: [[0, 0.05]], poses: [[0, "phone"], [AT.n18, "idle"]], expr: [[0, "senang"], [AT.n18 - 0.1, "pasrah"], [W("n18", "bunyi"), "cemas"]],
        gaze: [[0, DOWN], [AT.n17, CAM], [AT.n18, DOWN], [W("n18", "bunyi"), [0, -0.03]]], head: [[0, [0.1, 0, 0]], [AT.n18, [0.25, 0, 0.05]]] },
      mP: { pos: [[0, [1.2, 0, 0.3]]], poses: [[0, "wave"]], expr: [[0, "senang"]], gaze: [[0, CAM]] } } },
  S8: { clear: C.night, views: [
      shot("kosM", 0, AT.n20, med(0.05, 0.3, 0.05)),
      shot("kosM", AT.n20, AT.n21, med(0.05, 0.3, 0.05, 0.5)),
      vp("dapurM", [170, 310, 160, 160], AT.n20, AT.n21 - 0.15, face(-0.9, 0.3)),
      shot("kosM", AT.n21, W("n21", "Tapi"), cu(0.05, 0.3, 0, 0.35)),
      shot("dapurM", W("n21", "Tapi"), 99, med(-0.9, 0.3, 0.1, 0.5))],
    chars: { dM: { pos: [[0, [0.05, 0, 0.3]]], rotY: [[0, -0.12]], poses: [[0, "phone"]], shake: [[W("n19", "bergetar") - 0.1, W("n19", "bergetar") + 0.8]],
        expr: [[0, "netral"], [W("n19", "bergetar"), "kaget"], [AT.n20 + 0.4, "sedih"], [AT.n20 + 2.6, "haru"], [AT.n21, "sedih"]],
        gaze: [[0, DOWN]], head: [[0, [0.1, 0.06, 0.07]], [AT.n21, [0.14, 0, -0.1]]] },
      ibuM: { pos: [[0, [-0.9, 0, 0.3]]], rotY: [[0, 0.25]], poses: [[0, "hands"]], expr: [[0, "haru"]], gaze: [[0, CAM], [W("n21", "Tapi"), SIDE_L]], head: [[0, [0.05, -0.1, 0.06]], [W("n21", "Tapi"), [0.05, -0.25, 0.08]]] } } },
  S9: { clear: "#151B33", views: [
      shot("warung", 0, AT.n23, { p0: [0, 4.2, 9.4], p1: [0.05, 4.0, 8.8], l: [0, 1.9, 0] }),
      shot("warung", AT.n23, AT.n24, { p0: [-0.75, 2.6, 4.7], p1: [-0.75, 2.6, 4.4], l: [-0.85, 2.38, 0] }),
      shot("warung", AT.n24, AT.n25, { p0: [0, 4.0, 9.0], p1: [0, 3.9, 8.5], l: [0, 2.0, 0] }),
      shot("raka", AT.n25, 99, cu(0.2, 0.3, 0, 0.4))],
    chars: { dW: { pos: [[0, [-0.85, 0.03, 0.05]]], poses: [[0, "sit"]], expr: [[0, "senang"]], gaze: [[0, SIDE_R], [AT.n23, CAM], [AT.n23 + 2.5, SIDE_R]], head: [[0, [0, 0.12, 0]], [AT.n23, [0.05, 0, 0.06]]] },
      mW: { pos: [[0, [0.85, 0.03, 0.05]]], poses: [[0, "sit"], [0.4, "sit+wave"], [2.0, "sit"]], expr: [[0, "senang"]], gaze: [[0, SIDE_L]], head: [[0, [0, -0.12, 0]]] },
      raka: { pos: [[0, [0.2, 0, 0.3]]], poses: [[0, "phone"]], expr: [[0, "licik"]], gaze: [[0, CAM]], head: [[0, [0, 0, 0.08]]] } } },
};
const PLAN = { offsets: OFF, sets: SETS, light: LIGHT, charMaker: "blok", charOpt: {}, phoneGlow: 0.9, phoneScreen: "#CFE8FF",
  post: { bloom: 0.55, threshold: 0.95, dof: 0.4, range: 0.5, warm: 0.7, vig: 0.3, exposure: 1.0 }, chars: CHARS, lines, blinks,
  scenes: T.scenes.map((s) => ({ id: s.id, start: s.start, dur: s.duration, ...S[s.id] })) };
// "to: 99" = sampai akhir adegan → potong ke durasi adegan, termasuk kunci track kamera.
// Tanpa ini dorongan kamera dibagi ke 99 s dan shot terakhir nyaris diam (ketahuan sebagai blok beku).
for (const sc of PLAN.scenes) for (const v of sc.views) {
  if (v.to != null && v.to > sc.dur) v.to = sc.dur;
  for (const k of ["pos", "look", "fov"]) v[k] = v[k]?.map(([t, val]) => [Math.min(t, sc.dur), val]);
}
writeFileSync("assets/vendor/plan.js", "window.EP_PLAN=" + JSON.stringify(PLAN) + ";\n");

// ================= LAPISAN 2D =================
let CUES = [];
const cue = (t, name, vol = 0.3, dur) => CUES.push([t, name, vol, dur]);
const css = (id) => `
@font-face{font-family:Nunito;src:url('./assets/fonts/nunito-var-latin.woff2') format('woff2');font-weight:200 1000}
@font-face{font-family:Archivo;src:url('./assets/fonts/archivo-var-latin.woff2') format('woff2');font-weight:100 900;font-stretch:62% 125%}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:transparent}
#${id}-root{position:absolute;inset:0;width:1080px;height:1920px;overflow:hidden;background:transparent;color:${C.ink};font-family:Nunito,sans-serif}
.abs{position:absolute}
.kc{position:absolute;left:60px;right:60px;top:1250px;text-align:center;font-family:Archivo,sans-serif;font-weight:800;font-stretch:75%;font-size:92px;line-height:1.02;text-transform:uppercase;color:#fff;letter-spacing:1px;text-shadow:0 5px 0 rgba(0,0,0,.55),0 0 18px rgba(0,0,0,.4);opacity:0}
.tg{display:inline-block;margin-bottom:12px;padding:6px 18px;border-radius:10px;font-size:34px;font-stretch:100%;letter-spacing:2px;color:#fff;text-shadow:none}
.card{position:absolute;box-sizing:border-box;border-radius:28px;background:${C.cream};box-shadow:0 18px 40px rgba(0,0,0,.35);opacity:0}
.dark{position:absolute;box-sizing:border-box;border-radius:28px;background:rgba(20,16,30,.88);border:2px solid rgba(255,255,255,.12);color:#fff;opacity:0}
.fr{font-family:Archivo,sans-serif;font-weight:800;font-stretch:75%;line-height:1.05;white-space:nowrap}
.nu{font-family:Nunito,sans-serif;font-weight:800;line-height:1.2}
`;
const RT = `
const $=k=>'#'+P+k;
const pop=(k,t,d=.4)=>{tl.set($(k),{opacity:1},t);tl.fromTo($(k),{scale:.4},{scale:1,duration:d,ease:'back.out(1.8)',immediateRender:false},t)};
const fadeUp=(k,t,dy=30,d=.35)=>{tl.set($(k),{opacity:1},t);tl.fromTo($(k),{y:dy,opacity:0},{y:0,opacity:1,duration:d,ease:'power3.out',immediateRender:false},t)};
const hide=(k,t,d=.2)=>tl.to($(k),{opacity:0,duration:d,ease:'power1.in'},t);
const count=(k,a,b,t,d,pre='Rp')=>{const n=Math.max(2,Math.round(d/.05));for(let i=0;i<=n;i++){const v=Math.round((a+(b-a)*i/n)/1000)*1000;tl.set($(k),{textContent:pre+v.toLocaleString('id-ID')},t+d*i/n)}};
`;
// caption gaya ref3: 2–3 kata kapital, tanpa tanda baca; kutipan tokoh diberi label + warna
const SPK = { n09: [0, "IBU", "#FF8FB8"], n20: [0, "IBU", "#FF8FB8"], n11: ["Makasih", "RAKA", "#8FE07E"], n13: ["Laporan", "PAK HENDRA", "#86C8FF"], n25: ["Kak", "RAKA", "#8FE07E"] };
function captions(ids) {
  const chunks = [];
  for (const id of ids) {
    const sp = SPK[id], from = sp ? (typeof sp[0] === "number" ? sp[0] : WI(id, sp[0])) : Infinity;
    let cur = [];
    WT[id].forEach((w, i) => {
      const who = i >= from ? sp : null;
      if (cur.length && cur[0].who !== who) { chunks.push(cur); cur = []; }
      cur.push({ ...w, t0: AT[id] + w.s, t1: AT[id] + w.e, who });
      if ((/[,.?!:]["”]?$/.test(w.w) && cur.length >= 2) || cur.length >= 3 || i === WT[id].length - 1) { chunks.push(cur); cur = []; }
    });
  }
  let html = "", anim = "";
  chunks.forEach((c, k) => {
    const show = c[0].t0 - 0.04, nxt = chunks[k + 1], end = nxt && nxt[0].t0 - c[c.length - 1].t1 < 0.6 ? nxt[0].t0 - 0.04 : c[c.length - 1].t1 + 0.25;
    const who = c[0].who, txt = esc(c.map((w) => w.w.replace(/[,.:"“”!]/g, "")).join(" "));
    html += `<div id="§k${k}" class="kc"${who ? ` style="color:${who[2]}"` : ""}>${who ? `<span class="tg" style="background:${who[2]};color:#2A1D17">${who[1]}</span><br>` : ""}${txt}</div>`;
    anim += `tl.set($('k${k}'),{opacity:1},${f2(show)});tl.fromTo($('k${k}'),{scale:.92},{scale:1,duration:.12,ease:'power2.out',immediateRender:false},${f2(show)});tl.set($('k${k}'),{opacity:0},${f2(end)});`;
  });
  return { html, anim };
}
const scene = (id, body, anim) => {
  const s = SC[id.toUpperCase()];
  return `<!doctype html><html lang="id"><head><meta charset="utf-8"></head><body><template><style>${css(id)}</style>
<div id="${id}-root" data-composition-id="${id}" data-width="1080" data-height="1920">${body}</div>
<script>(function(){const P='${id}-';const D=${s.duration};const tl=gsap.timeline({paused:true});${RT}
${anim}
tl.to($('root'),{opacity:1,duration:.01},D-.01);
window.__timelines["${id}"]=tl;tl.seek(0);})();</script></template></body></html>`.replaceAll("§", `${id}-`);
};
const out = {}, sceneCues = {};
const make = (sid, ids, body, anim, cues) => { CUES = []; cues?.(); const k = captions(ids); out[sid.toLowerCase()] = scene(sid.toLowerCase(), body + k.html, anim + k.anim); sceneCues[sid] = CUES; };
const notif = (k, title, amt, top = 260) => `<div id="§${k}" class="card nu" style="left:330px;top:${top}px;width:670px;padding:24px 30px;font-size:40px"><span style="display:inline-block;width:54px;height:54px;border-radius:16px;background:${C.teal};vertical-align:middle;margin-right:16px"></span><span style="font-size:32px;color:#7A7085">Dompetku</span><br><b>${title}</b> <b style="color:${C.leafT}">${amt}</b></div>`;

make("S1", ["n01", "n02"],
  `<div id="§clk" class="dark fr" style="left:80px;top:270px;padding:14px 26px;font-size:64px">09.00</div>${notif("nt", "Gaji masuk", "+Rp5.200.000")}
<div id="§ct" class="dark" style="left:190px;top:250px;width:700px;padding:26px 36px;text-align:center"><div class="nu" style="font-size:32px;letter-spacing:2px;color:#CFC6DD">SALDO · 09.05</div><div id="§cv" class="fr" style="font-size:110px;margin-top:8px">Rp5.200.000</div></div>`,
  `pop('clk',.15);pop('nt',${f2(W("n01", "gajiku") - 0.1)});hide('nt',${f2(AT.n02 - 0.25)});hide('clk',${f2(AT.n02 - 0.25)});
pop('ct',${f2(AT.n02 + 0.1)});count('cv',5200000,300000,${f2(AT.n02 + 0.5)},${f2(W("n02", "tinggal") - AT.n02 - 0.3)});tl.to($('cv'),{color:'${C.mustard}',duration:.2},${f2(W("n02", "tinggal") + 0.25)});`,
  () => { cue(0.15, "pop", 0.25); cue(W("n01", "gajiku") - 0.1, "notif", 0.4); cue(AT.n02 + 0.1, "whoosh", 0.25); cue(W("n02", "tinggal") + 0.25, "thunk", 0.4); });

const cloud = (k, top = 300, left = 680, mirror = false) => `<div id="§${k}" class="abs" style="left:${left}px;top:${top}px;width:300px;height:300px;opacity:0;background:radial-gradient(circle at 150px 150px,transparent 105px,${C.cream} 105.5px,${C.cream} 150px,rgba(0,0,0,0) 150.5px)">
<div class="abs" style="left:${mirror ? 280 : -36}px;top:268px;width:56px;height:56px;border-radius:50%;background:${C.cream}"></div><div class="abs" style="left:${mirror ? 348 : -78}px;top:330px;width:30px;height:30px;border-radius:50%;background:${C.cream}"></div></div>`;
const row = (k, label, amt, dot, top, left = 80) => `<div id="§${k}" class="card nu" style="left:${left}px;top:${top}px;width:520px;padding:22px 28px;font-size:40px"><span style="display:inline-block;width:26px;height:26px;border-radius:50%;background:${dot};margin-right:14px"></span>${label}<br><b style="color:${C.coralT};font-size:48px">${amt}</b></div>`;
make("S2", ["n03", "n04", "n05"],
  `${cloud("c1")}${cloud("c2", 300, 100, true)}${row("r1", "Untuk Ibu", "−Rp1.500.000", C.rose, 300)}${row("r2", "Kuliah Raka", "−Rp1.800.000", C.teal, 300, 432)}
<div id="§bl" class="dark" style="left:150px;top:270px;width:780px;padding:30px 40px">
 <div class="nu" style="font-size:40px;display:flex;justify-content:space-between"><span>Bayar kos</span><b style="color:#FF9C84">−Rp1.200.000</b></div>
 <div class="nu" style="font-size:40px;display:flex;justify-content:space-between;margin-top:14px"><span>Listrik rumah</span><b style="color:#FF9C84">−Rp400.000</b></div>
 <div style="height:2px;background:rgba(255,255,255,.2);margin:22px 0"></div>
 <div class="nu" style="font-size:34px;letter-spacing:2px;color:#CFC6DD">SISA</div><div class="fr" style="font-size:110px;color:${C.mustard}">Rp300.000</div></div>`,
  `pop('c1',.3);fadeUp('r1',${f2(W("n03", "juta") - 0.1)});hide('c1',${f2(AT.n04 - 0.15)});hide('r1',${f2(AT.n04 - 0.15)});
pop('c2',${f2(AT.n04 + 0.1)});fadeUp('r2',${f2(W("n04", "kuliah") - 0.1)});hide('c2',${f2(AT.n05 - 0.15)});hide('r2',${f2(AT.n05 - 0.15)});fadeUp('bl',${f2(AT.n05 + 0.15)});`,
  () => { cue(0.3, "pop", 0.25); cue(W("n03", "juta") - 0.1, "tap", 0.3); cue(AT.n04 + 0.1, "pop", 0.25); cue(W("n04", "kuliah") - 0.1, "tap", 0.3); cue(AT.n05 + 0.15, "paper", 0.3); });

make("S3", ["n06", "n07"],
  `<div id="§tb" class="abs" style="left:0;right:0;top:250px;height:300px;background:linear-gradient(rgba(14,10,22,.0),rgba(14,10,22,.72) 25%,rgba(14,10,22,.72) 75%,rgba(14,10,22,0));opacity:0"></div><div id="§t1" class="abs fr" style="left:0;right:0;top:290px;text-align:center;font-size:150px;color:#fff;text-shadow:0 7px 0 rgba(0,0,0,.45);opacity:0">ANAK <span style="color:${C.mustard}">PERTAMA</span></div>
<div id="§t2" class="abs" style="left:0;right:0;top:460px;text-align:center;opacity:0"><span class="fr" style="display:inline-block;padding:10px 26px;border-radius:14px;background:rgba(20,16,30,.85);color:#fff;font-size:52px;letter-spacing:2px">EPS 1 · GAJI JAM 9</span></div>
<div id="§bw" class="abs" style="left:0;top:0;width:1080px;height:1300px">${["TAGIHAN LISTRIK|Rp400.000|#E07A5F|-6", "UANG KOS|Rp1.200.000|#2F7F86|5", "KULIAH RAKA|Rp1.800.000|#7DB46C|-3", "KIRIMAN IBU|Rp1.500.000|#E9A6B5|7"].map((v, i) => { const [a, b, c, r] = v.split("|"); return `<div id="§e${i}" class="abs" style="left:190px;top:${360 + i * 150}px;width:700px;height:200px;border-radius:18px;background:${C.cream};box-shadow:0 16px 30px rgba(0,0,0,.45);transform:rotate(${r}deg);opacity:0"><div class="abs" style="left:0;top:0;width:700px;height:16px;border-radius:18px 18px 0 0;background:${c}"></div><div class="abs fr" style="left:34px;top:44px;font-size:58px;color:#2A2238">${a}</div><div class="abs nu" style="left:34px;top:116px;font-size:44px;color:#B0462C">${b}</div></div>`; }).join("")}</div>`,
  `tl.set($('tb'),{opacity:1},.1);pop('t1',.1,.45);fadeUp('t2',.4);hide('tb',${f2(AT.n07 - 0.2)});hide('t1',${f2(AT.n07 - 0.2)});hide('t2',${f2(AT.n07 - 0.2)});${[0, 1, 2, 3].map((i) => `tl.set($('e${i}'),{opacity:1},${f2(W("n07", "semua") + i * 0.42)});tl.fromTo($('e${i}'),{y:-260},{y:0,duration:.32,ease:'power3.in',immediateRender:false},${f2(W("n07", "semua") + i * 0.42)});`).join("")}tl.fromTo($('bw'),{y:0,scale:1},{y:-40,scale:1.05,duration:${f2(SC.S3.duration - W("n07", "semua"))},ease:'none',immediateRender:false},${f2(W("n07", "semua"))});`,
  () => { cue(0.1, "chime-soft", 0.35); cue(AT.n07, "whoosh", 0.2); [0, 1, 2, 3].forEach((i) => cue(W("n07", "semua") + i * 0.42 + 0.3, "thunk", 0.25)); });

make("S4", ["n08", "n09", "n10"],
  `<div id="§ph" class="abs" style="left:240px;top:250px;width:600px;height:1000px;box-sizing:border-box;border-radius:70px;border:10px solid #0E0B16;opacity:0;background:radial-gradient(circle at 290px 250px,transparent 120px,#1E1A2B 120.5px)">
 <div class="abs" style="left:164px;top:124px;width:252px;height:252px;border-radius:50%;box-shadow:0 0 0 6px rgba(255,255,255,.85)"></div>
 <div class="abs fr" style="left:0;right:0;top:420px;text-align:center;font-size:72px;color:#fff">IBU</div>
 <div class="abs nu" style="left:0;right:0;top:510px;text-align:center;font-size:36px;color:#BDB4CC">Panggilan video…</div>
 <div class="abs" style="left:120px;top:780px;width:120px;height:120px;border-radius:50%;background:#E0524A"></div><div class="abs" style="left:340px;top:780px;width:120px;height:120px;border-radius:50%;background:#3FB96B"></div></div>`,
  `pop('ph',.15);${[0, 1, 2].map((i) => `tl.fromTo($('ph'),{rotation:-2},{rotation:2,duration:.08,yoyo:true,repeat:5,ease:'sine.inOut',immediateRender:false},${f2(0.5 + i * 0.75)});`).join("")}hide('ph',${f2(AT.n09 - 0.15)});`,
  () => { cue(0.15, "chime-soft", 0.35); cue(1.4, "chime-soft", 0.3); });

make("S5", ["n11", "n12"],
  `<div id="§stk" class="abs" style="left:0;top:0;width:1080px;height:1100px">${["Semester 1", "Semester 2", "Semester 3 · hari ini"].map((d, i) => `<div id="§m${i}" class="abs" style="left:120px;top:${330 + i * 230}px;width:840px;opacity:0"><div class="nu" style="font-size:32px;color:#BDB4CC;margin:0 0 8px 8px">${d}</div><div class="nu" style="display:inline-block;padding:24px 34px;border-radius:30px 30px 30px 8px;background:${C.cream};font-size:46px;color:${C.ink}">Makasih, Kak. Nanti aku ganti, janji.</div></div>`).join("")}</div>`,
  `${[0, 1, 2].map((i) => `fadeUp('m${i}',${f2(AT.n12 + 0.15 + i * 0.7)});`).join("")}tl.fromTo($('stk'),{y:40,scale:1},{y:-30,scale:1.04,duration:${f2(SC.S5.duration - AT.n12)},ease:'none',immediateRender:false},${f2(AT.n12)});`,
  () => { cue(W("n11", "Makasih") - 0.15, "notif", 0.35); [0, 1, 2].forEach((i) => cue(AT.n12 + 0.15 + i * 0.7, "tap", 0.3)); });

make("S6", ["n13", "n14", "n15"], ``, ``,
  () => { cue(W("n13", "Laporan") - 0.15, "pop", 0.2); cue(AT.n14 + 0.1, "pop", 0.2); cue(W("n15", "Dompetku"), "paper", 0.35); cue(W("n15", "Dompetku") + 0.5, "whoosh", 0.18); });

make("S7", ["n16", "n17", "n18"],
  `<div id="§ch" class="card" style="left:90px;top:280px;width:900px;height:200px;background:radial-gradient(circle at 100px 100px,transparent 62px,${C.cream} 62.5px)">
 <div class="abs" style="left:38px;top:38px;width:124px;height:124px;border-radius:50%;box-shadow:0 0 0 5px ${C.rose}"></div>
 <div class="abs fr" style="left:200px;top:30px;font-size:46px;color:#B0476C">MEGA</div><div class="abs nu" style="left:200px;top:96px;font-size:44px">Bakso yuk! Aku traktir setengah.</div></div>
<div id="§rp" class="abs nu" style="right:90px;top:520px;padding:24px 34px;border-radius:30px 30px 8px 30px;background:#D7F2DD;font-size:46px;opacity:0">Aku udah makan kok.</div>
<div id="§kr" class="abs fr" style="left:110px;top:1060px;font-size:96px;color:${C.mustard};text-shadow:0 5px 0 rgba(0,0,0,.45);opacity:0">KRRUUK~</div>`,
  `pop('ch',.25);hide('ch',${f2(AT.n18 - 0.15)});pop('rp',${f2(W("n17", "udah") - 0.2)});hide('rp',${f2(AT.n18 - 0.15)});
tl.set($('kr'),{opacity:1},${f2(W("n18", "bunyi"))});${[...Array(10)].map((_, i) => `tl.set($('kr'),{x:${(i % 2 ? -12 : 12) * (1 - i / 10)}},${f2(W("n18", "bunyi") + i * 0.04)});`).join("")}`,
  () => { cue(0.25, "notif", 0.4); cue(W("n17", "udah") - 0.2, "tap", 0.3); cue(W("n18", "bunyi"), "thunk", 0.35); });

const wv = env("n20");
make("S8", ["n19", "n20", "n21"],
  `${notif("nt", "Ibu mengirim", "+Rp50.000")}
<div id="§vn" class="card" style="left:90px;top:230px;width:900px;height:240px;background:radial-gradient(circle at 160px 120px,transparent 80px,${C.cream} 80.5px)">
 <div class="abs" style="left:80px;top:40px;width:160px;height:160px;border-radius:50%;box-shadow:0 0 0 5px ${C.teal}"></div>
 <div class="abs fr" style="left:290px;top:44px;font-size:46px;color:${C.teal}">IBU · PESAN SUARA</div>
 ${[...Array(14)].map((_, i) => `<div id="§w${i}" class="abs" style="left:${292 + i * 40}px;top:130px;width:18px;height:60px;border-radius:9px;background:${C.coralT}"></div>`).join("")}</div>`,
  `pop('nt',${f2(W("n19", "kirim") - 0.15)});hide('nt',${f2(AT.n20 - 0.15)});tl.set($('vn'),{opacity:1},${f2(AT.n20)});hide('vn',${f2(AT.n21 - 0.15)});
${wv.map((lv, i) => [AT.n20 + i / 12, lv]).filter((_, i) => i % 2 === 0).map(([t, lv]) => `tl.set([${[...Array(14)].map((_, k) => `$('w${k}')`).join(",")}],{scaleY:${[0.35, 0.8, 1.25][lv]}},${f2(t)});`).join("")}`,
  () => { cue(W("n19", "bergetar") - 0.1, "vibrate", 0.45, 0.8); cue(W("n19", "kirim") - 0.15, "notif", 0.4); cue(AT.n20, "pop", 0.2); cue(W("n21", "Tapi"), "chime-soft", 0.25); });

make("S9", ["n22", "n23", "n24", "n25"],
  `<div id="§q" class="abs" style="left:90px;top:280px;width:900px;box-sizing:border-box;padding:40px 44px;border-radius:30px;background:${C.mustard};text-align:center;box-shadow:0 18px 40px rgba(0,0,0,.35);opacity:0">
 <div class="fr" style="font-size:84px;line-height:1.05;white-space:normal;color:#2A2238">GAJIMU SISA BERAPA BUAT DIRIMU SENDIRI?</div><div class="nu" style="font-size:36px;margin-top:18px;color:#5A4A3A">Tulis di komentar</div></div>
<div id="§bs" class="abs" style="inset:0;background:radial-gradient(ellipse at 50% 45%,rgba(16,12,28,.72),rgba(10,8,18,.94));opacity:0">
 <div class="abs fr" style="left:0;right:0;top:760px;text-align:center;font-size:150px;color:${C.mustard};text-shadow:0 7px 0 rgba(0,0,0,.5)">BERSAMBUNG…</div>
 <div class="abs fr" style="left:0;right:0;top:940px;text-align:center;font-size:54px;color:#fff;letter-spacing:2px">EPS 2 · HP BARU RAKA</div></div>`,
  `pop('q',${f2(AT.n24 + 0.1)});hide('q',${f2(AT.n25 - 0.15)});tl.fromTo($('bs'),{opacity:0},{opacity:1,duration:.35,immediateRender:false},${f2(END.n25 + 0.15)});`,
  () => { cue(0.2, "pop", 0.18); cue(AT.n24 + 0.1, "pop", 0.3); cue(AT.n25 + 0.1, "notif", 0.3); cue(END.n25 + 0.15, "chime-soft", 0.4); });

mkdirSync("compositions/frames", { recursive: true });
for (const [id, html] of Object.entries(out)) writeFileSync(`compositions/frames/${id}.html`, html);

// ================= index =================
const hosts = T.scenes.map((s, i) => `<div id="scene-host-${s.id.toLowerCase()}" class="clip" data-composition-src="compositions/frames/${s.id.toLowerCase()}.html" data-composition-id="${s.id.toLowerCase()}" data-start="${s.start}" data-duration="${s.duration}" data-track-index="${i + 3}" data-track-kind="graphics"></div>`).join("\n");
let ti = 200;
const vo = T.scenes.flatMap((s) => s.lines.map((l) => `<audio id="vo-${l.id}" data-audio-group="voiceover" src="${l.file}" data-start="${l.abs}" data-duration="${l.dur}" data-track-index="${ti++}" data-volume="1"></audio>`)).join("\n");
const MD = {};
const mdur = (n) => (MD[n] ??= +execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", `assets/sfx/${n}.mp3`]).toString().trim());
const cues = Object.entries(sceneCues).flatMap(([sid, list]) => list.map(([t, name, vol, dur]) => [+(SC[sid].start + t).toFixed(3), name, vol, dur]));
const sfx = cues.map(([t, name, vol, dur], i) => `<audio id="sfx-${i + 1}" data-audio-group="sfx" src="assets/sfx/${name}.mp3" data-start="${t}" data-duration="${Math.min(dur ?? 0.8, Math.floor(mdur(name) * 100) / 100)}" data-track-index="${300 + i}" data-volume="${vol}"></audio>`).join("\n");
const index = `<!doctype html><html lang="id" data-resolution="portrait"><head><meta charset="utf-8"><meta name="viewport" content="width=1080,height=1920">
<script src="./assets/vendor/gsap.min.js"></script><script src="./assets/vendor/three.min.js"></script><script src="./assets/vendor/char3d.js"></script><script src="./assets/vendor/blok.js"></script><script src="./assets/vendor/post.js"></script><script src="./assets/vendor/plan.js"></script>
<style>@font-face{font-family:Archivo;src:url('./assets/fonts/archivo-var-latin.woff2') format('woff2');font-weight:100 900;font-stretch:62% 125%}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1920px;overflow:hidden;background:${C.night}}#root{position:relative;width:1080px;height:1920px;overflow:hidden;background:${C.night}}#gl{position:absolute;left:0;top:0;width:1080px;height:1920px}
#band{position:absolute;inset:0;background:linear-gradient(rgba(0,0,0,0) 58%,rgba(10,8,16,.35) 80%,rgba(10,8,16,.55) 100%)}
#mark{position:absolute;left:72px;top:246px;font-family:Archivo,sans-serif;font-weight:800;font-stretch:75%;font-size:36px;letter-spacing:3px;color:rgba(255,255,255,.9);text-shadow:0 2px 6px rgba(0,0,0,.5)}</style></head><body>
<div id="root" data-composition-id="main" data-width="1080" data-height="1920" data-duration="${T.total}" data-fx-chain='{"version":1,"nodes":[{"id":"master-truepeak","type":"truepeak","label":"Master ceiling -2 dBTP","params":{"ceiling":-2}}]}'><hf-audio-group id="voiceover"></hf-audio-group><hf-audio-group id="music"></hf-audio-group><hf-audio-group id="sfx"></hf-audio-group>
<canvas id="gl" class="clip" data-start="0" data-duration="${T.total}" data-track-index="0" width="1080" height="1920"></canvas>
<div id="band" class="clip" data-start="0" data-duration="${T.total}" data-track-index="1"></div>
<div id="mark" class="clip" data-start="0" data-duration="${T.total}" data-track-index="2">ANAK <span style="color:${C.mustard}">PERTAMA</span></div>
${hosts}
<audio id="bgm" data-audio-group="music" src="assets/bgm/final.mp3" data-start="0" data-duration="${T.total}" data-track-index="40" data-volume="0.6"></audio>
${vo}
${sfx}
</div>
<script src="./assets/vendor/world.js"></script>
<script>window.__timelines=window.__timelines||{};(function(){const tl=gsap.timeline({paused:true,onUpdate:()=>WORLD.render(tl.time())});tl.to({},{duration:${T.total}},0);window.__timelines["main"]=tl;WORLD.render(0);})();</script>
</body></html>`;
writeFileSync("index.html", index);
// Tambalan: PATCH=S4,S8 node build.mjs → patch-s4.html … (dipakai tools/patch-splice.mjs)
for (const sid of (process.env.PATCH ?? "").split(",").filter(Boolean)) {
  const s = SC[sid], id = sid.toLowerCase();
  writeFileSync(`patch-${id}.html`, index.split("\n").filter((l) => !l.startsWith("<audio") && !l.startsWith("<div id=\"scene-host-")).join("\n")
    .replace(`data-duration="${T.total}" data-fx-chain`, `data-duration="${s.duration}" data-fx-chain`)
    .replaceAll(`data-start="0" data-duration="${T.total}"`, `data-start="0" data-duration="${s.duration}"`)
    .replace("</canvas>", `</canvas>\n<div id="scene-host-${id}" class="clip" data-composition-src="compositions/frames/${id}.html" data-composition-id="${id}" data-start="0" data-duration="${s.duration}" data-track-index="3" data-track-kind="graphics"></div>`)
    .replace(`WORLD.render(tl.time())});tl.to({},{duration:${T.total}},0);`, `WORLD.render(${s.start}+tl.time())});tl.to({},{duration:${s.duration}},0);`)
    .replace("WORLD.render(0);", `WORLD.render(${s.start});`));
}
console.log("v4: plan + overlay + index ok · total", T.total, "· sfx", cues.length);
