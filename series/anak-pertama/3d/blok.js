// Gaya ref3: tokoh balok (kepala "tahu" membulat, rambut blok), wajah DILUKIS di tekstur kanvas
// (ekspresi, bicara, kedip, lirikan), garis tepi tipis (inverted hull), dan ruangan dengan jendela
// berlubang supaya matahari jatuh sebagai petak cahaya. Menambah window.AP3D (butuh char3d.js dulu).
// API tokoh sama dengan makeChar: { root, parts, setExpr, setMouth, blink, setGaze, updateFace }.
(function () {
  const T = THREE, A = AP3D;
  const M = (c, r = 0.85, o = {}) => new T.MeshStandardMaterial({ color: c, roughness: r, ...o });
  const at = (m, x, y, z) => { m.position.set(x, y, z); return m; };
  const mesh = (g, m) => { const x = new T.Mesh(g, m); x.castShadow = x.receiveShadow = true; return x; };
  const boxM = (w, h, d, m) => mesh(new T.BoxGeometry(w, h, d), m);
  const cylM = (rt, rb, h, m, seg = 24) => mesh(new T.CylinderGeometry(rt, rb, h, seg), m);
  function rrShape(w, h, r) { const s = new T.Shape(), x = -w / 2, y = -h / 2; s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h); s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s; }
  // kotak membulat: lebar/tinggi/dalam total (termasuk bevel)
  function rbox(w, h, d, r, m, bev = 0.06) {
    const g = new T.ExtrudeGeometry(rrShape(w - 2 * bev, h - 2 * bev, Math.max(0.01, r - bev)), { depth: Math.max(0.01, d - 2 * bev), bevelEnabled: true, bevelThickness: bev, bevelSize: bev, bevelSegments: 3, curveSegments: 10 });
    g.center(); g.computeVertexNormals(); return mesh(g, m);
  }
  // bingkai (kotak membulat berlubang) — tepi hijab di sekeliling wajah
  function rframe(w, h, hw, hh, r, d, m) {
    const s = rrShape(w, h, r), hole = rrShape(hw, hh, r * 0.8); s.holes.push(hole);
    const g = new T.ExtrudeGeometry(s, { depth: d, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2, curveSegments: 10 }); g.center(); return mesh(g, m);
  }
  // garis tepi: salinan sisi-belakang yang diperbesar sedikit (geometri harus terpusat)
  const OUT = new T.MeshBasicMaterial({ color: "#2A1D17", side: T.BackSide });
  function outline(root, w = 0.014, skip = () => false) {
    const list = []; root.traverse((m) => { if (m.isMesh && !m.userData.noOutline && !skip(m) && !m.geometry.isPlaneGeometry && m.geometry.type !== "PlaneGeometry") list.push(m); });
    for (const m of list) { m.geometry.computeBoundingSphere(); const r = m.geometry.boundingSphere.radius || 1, sc = m.getWorldScale(new T.Vector3()); const s = 1 + w / (r * Math.max(0.2, (sc.x + sc.y + sc.z) / 3));
      const o = new T.Mesh(m.geometry, OUT); o.scale.setScalar(s); o.position.copy(m.geometry.boundingSphere.center).multiplyScalar(1 - s); o.userData.noOutline = true; o.castShadow = false; o.receiveShadow = false; m.add(o); }
  }
  const tex = (w, h, draw) => A.canvasTex(w, h, draw);
  const pattern = {
    dots: (base, dot) => tex(256, 256, (x, w, h) => { x.fillStyle = base; x.fillRect(0, 0, w, h); x.fillStyle = dot; for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) { x.beginPath(); x.arc(20 + i * 43 + (j % 2) * 21, 20 + j * 43, 7, 0, 7); x.fill(); } }),
    batik: (base, ink) => tex(256, 256, (x, w, h) => { x.fillStyle = base; x.fillRect(0, 0, w, h); x.strokeStyle = ink; x.lineWidth = 6; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { const cx = 32 + i * 64, cy = 32 + j * 64; x.beginPath(); x.arc(cx, cy, 20, 0, 7); x.stroke(); x.beginPath(); x.moveTo(cx - 28, cy); x.lineTo(cx + 28, cy); x.moveTo(cx, cy - 28); x.lineTo(cx, cy + 28); x.stroke(); } }),
  };

  // ---------- wajah dilukis ----------
  // brow: [naik, putar] — putar > 0 = ujung DALAM naik (sedih/cemas), < 0 = turun (marah/licik)
  const FACE = {
    netral: { eyes: "open", brow: [0, 0], mouth: "smile", blush: 0.35 },
    senang: { eyes: "happy", brow: [0.04, 0.1], mouth: "grin", blush: 0.55 },
    sedih: { eyes: "open", brow: [0.02, 0.38], mouth: "frown", blush: 0.3, tear: true },
    kaget: { eyes: "wide", brow: [0.07, 0], mouth: "o", blush: 0.3 },
    pasrah: { eyes: "half", brow: [-0.02, 0.06], mouth: "flat", blush: 0.25 },
    haru: { eyes: "happy", brow: [0.02, 0.3], mouth: "smile", blush: 0.5, tear: true },
    cemas: { eyes: "open", brow: [0.02, 0.3], mouth: "wavy", blush: 0.3, sweat: true },
    licik: { eyes: "half", brow: [0.01, -0.12], mouth: "side", blush: 0.4 },
  };
  const FW = 516, FH = 480, PX = 600; // kanvas wajah ↔ bidang 0.86 × 0.80 unit
  function paintFace(x, st, sp) {
    const f = FACE[st.expr] ?? FACE.netral, ink = "#1E1512";
    x.clearRect(0, 0, FW, FH);
    const cx = FW / 2, ey = 238, ex = 112, gx = st.gaze[0] * 9, gy = -st.gaze[1] * 9;
    // pipi
    x.fillStyle = `rgba(232,120,120,${f.blush})`; for (const s of [-1, 1]) { x.beginPath(); x.ellipse(cx + s * 172, ey + 70, 40, 24, 0, 0, 7); x.fill(); }
    // alis: brow[0] naik (unit), brow[1] > 0 ujung dalam naik
    x.strokeStyle = sp.hair ?? ink; x.lineCap = "round"; x.lineWidth = 15;
    for (const s of [-1, 1]) { const by = ey - 82 - f.brow[0] * PX, dy = f.brow[1] * 40; x.beginPath(); x.moveTo(cx + s * (ex + 40), by + dy * 0.3); x.lineTo(cx + s * (ex - 32), by - dy); x.stroke(); }
    // mata
    const blink = st.blink;
    for (const s of [-1, 1]) {
      const px = cx + s * ex + gx, py = ey + gy;
      x.fillStyle = ink; x.strokeStyle = ink; x.lineWidth = 12;
      if (f.eyes === "happy" || blink > 0.6) { x.beginPath(); if (f.eyes === "happy") x.arc(px, py + 12, 26, Math.PI * 1.1, Math.PI * 1.9); else { x.moveTo(px - 24, py + 4); x.quadraticCurveTo(px, py + 16, px + 24, py + 4); } x.stroke(); }
      else {
        const rx = f.eyes === "wide" ? 27 : 22, ry = (f.eyes === "wide" ? 38 : 31) * (1 - 0.6 * blink);
        x.beginPath(); x.ellipse(px, py, rx, ry, 0, 0, 7); x.fill();
        x.fillStyle = "#FFFFFF"; x.beginPath(); x.arc(px + rx * 0.35, py - ry * 0.4, f.eyes === "wide" ? 9 : 7.5, 0, 7); x.fill();
        x.beginPath(); x.arc(px - rx * 0.3, py + ry * 0.35, 3.5, 0, 7); x.fill();
        if (f.eyes === "half") { x.fillStyle = sp.skin; x.fillRect(px - rx - 4, py - ry - 6, rx * 2 + 8, ry * 0.95); x.strokeStyle = ink; x.lineWidth = 9; x.beginPath(); x.moveTo(px - rx - 3, py - ry * 0.05); x.lineTo(px + rx + 3, py - ry * 0.05); x.stroke(); }
      }
      if (sp.lashes && f.eyes !== "happy" && blink < 0.6) { x.strokeStyle = ink; x.lineWidth = 6; x.beginPath(); x.moveTo(px + s * 18, py - 22); x.lineTo(px + s * 32, py - 32); x.stroke(); }
    }
    if (f.tear) { x.fillStyle = "rgba(130,190,240,.95)"; for (const s of [-1, 1]) { const tx = cx + s * (ex - 6), ty = ey + 46; x.beginPath(); x.moveTo(tx, ty - 14); x.quadraticCurveTo(tx + 13, ty + 8, tx, ty + 14); x.quadraticCurveTo(tx - 13, ty + 8, tx, ty - 14); x.fill(); } }
    if (f.sweat) { x.fillStyle = "rgba(140,200,245,.95)"; const tx = cx + 200, ty = ey - 120; x.beginPath(); x.moveTo(tx, ty - 22); x.quadraticCurveTo(tx + 18, ty + 10, tx, ty + 20); x.quadraticCurveTo(tx - 18, ty + 10, tx, ty - 22); x.fill(); }
    if (sp.mustache) { x.fillStyle = sp.hair ?? ink; x.beginPath(); x.ellipse(cx - 30, ey + 92, 34, 12, 0.15, 0, 7); x.ellipse(cx + 30, ey + 92, 34, 12, -0.15, 0, 7); x.fill(); }
    // mulut
    const my = ey + 128, m = st.mouth;
    x.strokeStyle = ink; x.lineWidth = 10; x.lineCap = "round";
    if (m > 0.08) { const w = 26 + 14 * m, h = 10 + 36 * m; x.fillStyle = "#5A1B1E"; x.beginPath(); x.ellipse(cx, my, w, h, 0, 0, 7); x.fill(); x.fillStyle = "#E07A7A"; x.beginPath(); x.ellipse(cx, my + h * 0.5, w * 0.6, h * 0.38, 0, 0, 7); x.fill(); }
    else if (f.mouth === "grin") { x.fillStyle = "#5A1B1E"; x.beginPath(); x.moveTo(cx - 40, my - 8); x.quadraticCurveTo(cx, my + 56, cx + 40, my - 8); x.closePath(); x.fill(); x.fillStyle = "#E07A7A"; x.beginPath(); x.ellipse(cx, my + 18, 18, 9, 0, 0, 7); x.fill(); }
    else if (f.mouth === "smile") { x.beginPath(); x.arc(cx, my - 22, 30, Math.PI * 0.2, Math.PI * 0.8); x.stroke(); }
    else if (f.mouth === "frown") { x.beginPath(); x.arc(cx, my + 26, 26, Math.PI * 1.2, Math.PI * 1.8); x.stroke(); }
    else if (f.mouth === "o") { x.fillStyle = "#5A1B1E"; x.beginPath(); x.ellipse(cx, my, 15, 20, 0, 0, 7); x.fill(); }
    else if (f.mouth === "wavy") { x.beginPath(); for (let i = 0; i <= 24; i++) { const xx = cx - 34 + i * 2.83, yy = my + Math.sin(i * 0.8) * 6; i ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); }
    else if (f.mouth === "side") { x.beginPath(); x.moveTo(cx - 26, my + 2); x.quadraticCurveTo(cx + 6, my + 14, cx + 32, my - 10); x.stroke(); }
    else { x.beginPath(); x.moveTo(cx - 24, my); x.lineTo(cx + 24, my); x.stroke(); }
  }

  // ---------- spesifikasi tokoh balok ----------
  const SPEC = {
    dinda: { skin: "#E7B08A", hair: "#2A1C17", style: "bob", top: "#2F8A8F", sleeve: "short", pants: "#2B3A55", shoes: "#F4EFE6", bag: true, lashes: true, collar: "#F4EFE6" },
    ibu: { skin: "#D59A73", hijab: "#C8553D", top: "#7E4E34", dress: true, dots: "#F2B32E", shoes: "#5A3A2A", lashes: true, sleeve: "long" },
    raka: { skin: "#C98E68", hair: "#1F1715", style: "spiky", top: "#6F8F72", sleeve: "long", pants: "#3A5A80", shoes: "#F2F2F2", phones: true, hood: true },
    mega: { skin: "#EDBB94", hijab: "#E9A6B5", top: "#9C89C9", inner: "#F4EFE6", sleeve: "long", pants: "#4A4458", shoes: "#FFFDF8", glasses: "round", lashes: true },
    hendra: { skin: "#C48A64", hair: "#33302E", grey: "#A9A39B", style: "short", top: "#2B4C7E", batik: "#E9D8A6", sleeve: "short", pants: "#2E2E36", shoes: "#2A2420", glasses: "rect", mustache: true },
  };

  function makeCharBlok(key, opt = {}) {
    const s = SPEC[key], root = new T.Group(), P = {};
    const skinM = M(s.skin, 0.8), topMap = s.dots ? pattern.dots(s.top, s.dots) : s.batik ? pattern.batik(s.top, s.batik) : null;
    const topM = topMap ? new T.MeshStandardMaterial({ map: topMap, roughness: 0.85 }) : M(s.top, 0.85);
    // badan
    const torsoM = topM.clone(); torsoM.flatShading = true; // limas: shading datar, tanpa garis diagonal
    const torso = mesh(new T.CylinderGeometry(0.6, 0.53, 0.86, 4, 1), torsoM); torso.rotation.y = Math.PI / 4; torso.scale.set(1, 1, 0.56); at(torso, 0, 1.38, 0); root.add(torso); P.torso = torso;
    if (s.inner) { const f = boxM(0.2, 0.8, 0.05, M(s.inner)); at(f, 0, 1.38, 0.235); root.add(f); }
    if (s.collar) { for (const x of [-1, 1]) { const c = boxM(0.2, 0.08, 0.1, M(s.collar)); c.rotation.z = x * 0.35; at(c, x * 0.1, 1.78, 0.2); root.add(c); } }
    if (s.hood) { const h = rbox(0.62, 0.3, 0.3, 0.12, M(new T.Color(s.top).multiplyScalar(0.85).getStyle())); at(h, 0, 1.86, -0.2); root.add(h); }
    const neck = cylM(0.15, 0.16, 0.24, skinM, 16); at(neck, 0, 1.94, 0); root.add(neck);
    // kaki atau rok
    if (s.dress) {
      const skirtM = topM.clone(); skirtM.flatShading = true; const skirt = cylM(0.47, 0.68, 0.98, skirtM, 4); skirt.rotation.y = Math.PI / 4; skirt.scale.set(1, 1, 0.62); at(skirt, 0, 0.5, 0); root.add(skirt);
      for (const x of [-1, 1]) { const sh = rbox(0.3, 0.12, 0.44, 0.05, M(s.shoes, 0.6), 0.03); at(sh, x * 0.18, 0.06, 0.08); root.add(sh); }
    } else {
      const hips = boxM(0.76, 0.2, 0.44, M(s.pants)); at(hips, 0, 0.9, 0); root.add(hips);
      for (const [k, x] of [["L", 1], ["R", -1]]) {
        const hip = new T.Group(); at(hip, x * 0.19, 0.86, 0); root.add(hip); P["hip" + k] = hip;
        const th = boxM(0.33, 0.46, 0.38, M(s.pants)); at(th, 0, -0.21, 0); hip.add(th);
        const kn = new T.Group(); at(kn, 0, -0.42, 0); hip.add(kn); P["knee" + k] = kn;
        const sh = boxM(0.31, 0.38, 0.36, M(s.pants)); at(sh, 0, -0.19, 0); kn.add(sh);
        const shoe = rbox(0.34, 0.13, 0.5, 0.05, M(s.shoes, 0.6), 0.03); at(shoe, 0, -0.38, 0.06); kn.add(shoe);
      }
    }
    // lengan
    const sleeveM = s.dots ? M(s.top) : topM;
    for (const [k, x] of [["L", 1], ["R", -1]]) {
      const arm = new T.Group(); at(arm, x * 0.47, 1.72, 0); arm.rotation.z = x * 0.14; root.add(arm); P["arm" + k] = arm;
      const ua = cylM(0.12, 0.115, 0.46, sleeveM, 16); at(ua, 0, -0.2, 0); arm.add(ua);
      const sh = mesh(new T.SphereGeometry(0.125, 16, 12), sleeveM); arm.add(sh);
      const el = new T.Group(); at(el, 0, -0.42, 0); arm.add(el); P["elbow" + k] = el;
      const fa = cylM(0.108, 0.1, 0.38, s.sleeve === "long" ? sleeveM : skinM, 16); at(fa, 0, -0.17, 0); el.add(fa);
      const hd = new T.Group(); at(hd, 0, -0.38, 0); el.add(hd); P["hand" + k] = hd;
      const hand = mesh(new T.SphereGeometry(0.13, 16, 12), skinM); hand.scale.set(1, 1.08, 0.85); hd.add(hand);
    }
    // tas selempang
    if (s.bag) { const b = A.makeBag(0.7); at(b, -0.44, 0.98, 0.12); root.add(b); const st = boxM(0.05, 1.05, 0.03, M("#E2A21E", 0.6)); st.rotation.z = -0.62; at(st, -0.04, 1.42, 0.27); root.add(st); }
    // kepala
    const head = new T.Group(); at(head, 0, 2.28, 0); head.scale.setScalar(opt.headScale ?? 1.12); root.add(head); P.head = head;
    const skull = rbox(1.0, 0.94, 0.76, 0.24, skinM, 0.08); at(skull, 0, 0.27, 0.02); head.add(skull);
    const hairM = M(s.hair ?? "#222", 0.75);
    if (s.style === "bob") {
      const top = rbox(1.1, 0.34, 0.86, 0.14, hairM); at(top, 0, 0.66, -0.02); head.add(top);
      const back = rbox(1.1, 0.84, 0.24, 0.1, hairM); at(back, 0, 0.32, -0.36); head.add(back);
      for (const x of [-1, 1]) { const sd = rbox(0.17, 0.74, 0.84, 0.07, hairM, 0.04); at(sd, x * 0.52, 0.33, -0.02); head.add(sd); }
      const bang = rbox(1.02, 0.2, 0.16, 0.07, hairM, 0.04); at(bang, 0, 0.6, 0.36); head.add(bang);
    } else if (s.style === "spiky") {
      const top = rbox(1.06, 0.3, 0.84, 0.12, hairM); at(top, 0, 0.66, -0.02); head.add(top);
      const back = rbox(1.06, 0.6, 0.2, 0.08, hairM); at(back, 0, 0.42, -0.36); head.add(back);
      for (let i = 0; i < 7; i++) { const c = mesh(new T.ConeGeometry(0.11, 0.26, 4), hairM); at(c, -0.42 + i * 0.14, 0.86, -0.06 + ((i % 2) * 0.14 - 0.07)); c.rotation.set(-0.3, 0, (i - 3) * 0.12); head.add(c); }
      const bang = rbox(0.96, 0.14, 0.14, 0.05, hairM, 0.03); at(bang, 0, 0.62, 0.36); head.add(bang);
    } else if (s.style === "short") {
      const top = rbox(1.05, 0.22, 0.82, 0.1, hairM); at(top, 0, 0.7, -0.03); head.add(top);
      const back = rbox(1.05, 0.5, 0.18, 0.07, hairM); at(back, 0, 0.5, -0.36); head.add(back);
      for (const x of [-1, 1]) { const g = boxM(0.06, 0.3, 0.4, M(s.grey ?? s.hair)); at(g, x * 0.51, 0.42, -0.06); head.add(g); }
    }
    if (s.hijab) {
      const hm = M(s.hijab, 0.9);
      const shell = rbox(1.2, 1.14, 0.94, 0.3, hm, 0.1); at(shell, 0, 0.3, -0.08); head.add(shell);
      const frame = rframe(1.18, 1.12, 0.84, 0.78, 0.3, 0.06, hm); at(frame, 0, 0.27, 0.38); head.add(frame);
      const drape = cylM(0.56, 0.84, 0.66, hm, 28); drape.scale.set(1, 1, 0.72); at(drape, 0, -0.42, -0.02); head.add(drape);
    }
    // wajah: bidang + kanvas
    const cv = document.createElement("canvas"); cv.width = FW; cv.height = FH; const cx2 = cv.getContext("2d");
    const ftex = new T.CanvasTexture(cv); ftex.encoding = T.sRGBEncoding; ftex.anisotropy = 4;
    const facePlane = new T.Mesh(new T.PlaneGeometry(0.86, 0.8), new T.MeshStandardMaterial({ map: ftex, transparent: true, roughness: 0.85, polygonOffset: true, polygonOffsetFactor: -2 }));
    at(facePlane, 0, 0.27, 0.405); facePlane.userData.noOutline = true; head.add(facePlane); P.face = facePlane;
    if (s.glasses) {
      const gm = M("#1E1A1A", 0.4);
      for (const x of [-1, 1]) {
        const g = s.glasses === "round" ? mesh(new T.TorusGeometry(0.11, 0.016, 8, 28), gm) : mesh(new T.TorusGeometry(0.12, 0.016, 4, 4), gm);
        if (s.glasses === "rect") { g.rotation.z = Math.PI / 4; g.scale.set(1.15, 0.85, 1); }
        at(g, x * 0.187, 0.27 - 0.0 + (238 - FH / 2) / -PX, 0.43); head.add(g);
      }
      const br = boxM(0.12, 0.018, 0.018, gm); at(br, 0, 0.27 + (238 - FH / 2) / -PX + 0.02, 0.43); head.add(br);
    }
    if (s.phones) { const hp = mesh(new T.TorusGeometry(0.3, 0.05, 10, 28), M("#2A2A30", 0.5)); hp.rotation.x = Math.PI / 2; at(hp, 0, -0.2, 0.02); head.add(hp); }
    outline(root, opt.outline ?? 0.014);
    // keadaan wajah → gambar ulang hanya kalau berubah
    const st = { expr: "netral", mouth: 0, blink: 0, gaze: [0, 0] }; let lastKey = "";
    const api = {
      root, parts: P, base: { o: 0 },
      setExpr(n) { st.expr = n; }, setMouth(v) { st.mouth = v < 0.1 ? 0 : Math.round(v * 10) / 10; }, blink(v) { st.blink = v > 0.6 ? 1 : v > 0.25 ? 0.5 : 0; },
      setGaze(g) { st.gaze = [Math.round(g[0] / 0.006) * 0.006 / 0.03, Math.round(g[1] / 0.006) * 0.006 / 0.03]; },
      updateFace() { const k = `${st.expr}|${st.mouth}|${st.blink}|${st.gaze}`; if (k !== lastKey) { paintFace(cx2, st, s); ftex.needsUpdate = true; lastKey = k; } },
    };
    api.updateFace();
    return api;
  }

  // ---------- ruangan bermatahari (jendela berlubang) ----------
  const tiles = (a, b, n = 8) => { const t = tex(256, 256, (x, w, h) => { const c = w / n; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { x.fillStyle = (i + j) % 2 ? a : b; x.fillRect(i * c, j * c, c, c); } x.strokeStyle = "rgba(0,0,0,.12)"; x.lineWidth = 2; for (let i = 0; i <= n; i++) { x.beginPath(); x.moveTo(i * c, 0); x.lineTo(i * c, h); x.moveTo(0, i * c); x.lineTo(w, i * c); x.stroke(); } }); t.wrapS = t.wrapT = T.RepeatWrapping; return t; };
  const skyDay = () => tex(64, 256, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, "#8EC3E8"); g.addColorStop(0.7, "#F3E3C4"); g.addColorStop(1, "#F6C98E"); x.fillStyle = g; x.fillRect(0, 0, w, h); });
  const skyNight = () => tex(128, 256, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, "#121838"); g.addColorStop(1, "#2C3466"); x.fillStyle = g; x.fillRect(0, 0, w, h); x.fillStyle = "#F4ECD0"; x.beginPath(); x.arc(84, 60, 18, 0, 7); x.fill(); x.fillStyle = "rgba(255,255,255,.8)"; [[20, 40], [50, 110], [100, 150], [30, 200], [110, 30]].forEach(([a, b]) => { x.beginPath(); x.arc(a, b, 1.6, 0, 7); x.fill(); }); });
  function makeRoomSun(o = {}) {
    const g = new T.Group(); g.userData.anim = [];
    const night = !!o.night, wall = M(o.wall ?? "#E8D6B3", 0.95), wx = o.winX ?? 1.4, wy = o.winY ?? 3.0, ww = o.winW ?? 1.7, wh = o.winH ?? 1.8, Z = -2.6, th = 0.16;
    const fl = new T.Mesh(new T.PlaneGeometry(16, 12), new T.MeshStandardMaterial({ map: (() => { const t = tiles(o.floorA ?? "#D9C4A2", o.floorB ?? "#CDB592"); t.repeat.set(8, 6); return t; })(), roughness: 0.8 }));
    fl.rotation.x = -Math.PI / 2; fl.receiveShadow = true; g.add(fl);
    const wb = (w, h, x, y) => { const b = boxM(w, h, th, wall); at(b, x, y, Z); g.add(b); };
    const L = -8, R = 8, top = 7;
    wb(wx - ww / 2 - L, top, (L + wx - ww / 2) / 2, top / 2); wb(R - (wx + ww / 2), top, (R + wx + ww / 2) / 2, top / 2);
    wb(ww, wy - wh / 2, wx, (wy - wh / 2) / 2); wb(ww, top - (wy + wh / 2), wx, (wy + wh / 2 + top) / 2);
    if (o.tilesWall) { const tw = new T.Mesh(new T.PlaneGeometry(o.tilesWall[0], o.tilesWall[1]), new T.MeshStandardMaterial({ map: (() => { const t = tiles("#E7F0EE", "#9FC3C0", 8); t.repeat.set(o.tilesWall[0] / 1.6, o.tilesWall[1] / 1.6); return t; })(), roughness: 0.5 })); at(tw, o.tilesWall[2], o.tilesWall[1] / 2, Z + th / 2 + 0.005); tw.receiveShadow = true; g.add(tw); }
    const side = new T.Mesh(new T.PlaneGeometry(12, top), wall); side.rotation.y = Math.PI / 2; at(side, -3.6, top / 2, 2); side.receiveShadow = true; g.add(side);
    const sky = new T.Mesh(new T.PlaneGeometry(12, 8), new T.MeshBasicMaterial({ map: night ? skyNight() : skyDay() })); at(sky, wx, wy, Z - 3); g.add(sky);
    const wood = M(o.frameColor ?? "#7A4E30", 0.7), bar = (w, h, d, x, y, z) => { const b = boxM(w, h, d, wood); at(b, x, y, z); g.add(b); };
    bar(ww + 0.14, 0.09, 0.24, wx, wy + wh / 2, Z); bar(ww + 0.14, 0.12, 0.34, wx, wy - wh / 2, Z + 0.05); bar(0.08, wh, 0.22, wx - ww / 2, wy, Z); bar(0.08, wh, 0.22, wx + ww / 2, wy, Z);
    bar(0.05, wh, 0.08, wx, wy, Z); bar(ww, 0.05, 0.08, wx, wy + 0.25, Z);
    if (o.curtains !== false) { const ct = (() => { const t = tiles(o.curtA ?? "#B9874F", o.curtB ?? "#E8D2A8", 6); t.repeat.set(1.2, 2.4); return t; })(), cm = new T.MeshStandardMaterial({ map: ct, roughness: 0.9, side: T.DoubleSide });
      for (const sx of [-1, 1]) for (let k = 0; k < 3; k++) { const c = boxM(0.2, wh + 0.4, 0.05, cm); c.rotation.y = (k % 2 ? 0.35 : -0.35); at(c, wx + sx * (ww / 2 + 0.08 + k * 0.17), wy + 0.05, Z + 0.18); g.add(c); } }
    if (night) A.addPendant(g, o.lampX ?? -0.6, 4.35, -0.4, { power: o.lampPower ?? 2.6 });
    const add = (m, x, y, z) => { at(m, x, y, z); g.add(m); return m; };
    for (const p of o.props ?? []) {
      if (p.t === "bed") { add(boxM(2.3, 0.45, 1.7, M("#6B4630", 0.8)), p.x, 0.22, -1.6); add(rbox(2.2, 0.3, 1.6, 0.1, M("#F1EADF", 0.9)), p.x, 0.6, -1.6); add(rbox(1.5, 0.1, 1.64, 0.04, M("#2F8A8F", 0.9), 0.03), p.x + 0.35, 0.78, -1.6); add(rbox(0.7, 0.2, 0.42, 0.09, M("#FFFDF8", 0.9)), p.x - 0.7, 0.84, -1.9); }
      if (p.t === "desk") { add(boxM(1.6, 0.08, 0.8, M("#9A6A44", 0.7)), p.x, 1.1, p.z ?? -2.0); for (const dx of [-0.7, 0.7]) add(boxM(0.08, 1.1, 0.7, M("#835838", 0.7)), p.x + dx, 0.55, p.z ?? -2.0); add(cylM(0.12, 0.1, 0.24, M("#F2B32E", 0.5)), p.x - 0.4, 1.26, (p.z ?? -2.0) + 0.1); add(boxM(0.5, 0.06, 0.36, M("#F4EFE6")), p.x + 0.25, 1.17, (p.z ?? -2.0)); }
      if (p.t === "wardrobe") { add(boxM(1.3, 2.9, 0.7, M("#8A5C3A", 0.75)), p.x, 1.45, -2.2); add(boxM(0.04, 2.6, 0.02, M("#5A3A24")), p.x, 1.5, -1.84); }
      if (p.t === "frame") { add(boxM(0.8, 1.0, 0.05, M("#5A3A24", 0.6)), p.x, p.y, Z + 0.11); const ph = tex(160, 200, (x, w, h) => { x.fillStyle = "#E6DCC8"; x.fillRect(0, 0, w, h); x.fillStyle = "#8D7A6E"; x.fillRect(48, 40, 64, 64); x.fillRect(30, 112, 100, 88); x.fillStyle = "#3B2F2A"; x.fillRect(48, 34, 64, 18); }); const pp = new T.Mesh(new T.PlaneGeometry(0.64, 0.84), new T.MeshStandardMaterial({ map: ph, roughness: 0.8 })); add(pp, p.x, p.y, Z + 0.14); }
      if (p.t === "counter") { add(boxM(p.w ?? 3.4, 1.2, 0.9, M("#8E9B8A", 0.7)), p.x, 0.6, -2.05); add(boxM((p.w ?? 3.4) + 0.06, 0.08, 0.96, M("#3F3A36", 0.4)), p.x, 1.24, -2.05);
        add(boxM(0.9, 0.12, 0.6, M("#2E2E30", 0.4)), p.x - 0.7, 1.34, -2.05); add(cylM(0.2, 0.26, 0.32, M("#B8BEC4", 0.25, { metalness: 0.6 })), p.x - 0.9, 1.56, -2.05); add(mesh(new T.TorusGeometry(0.12, 0.025, 8, 20, Math.PI), M("#2A2A2A")), p.x - 0.9, 1.74, -2.05);
        add(cylM(0.3, 0.3, 0.42, M("#FFFDF8", 0.35)), p.x + 0.9, 1.49, -2.1); add(cylM(0.28, 0.3, 0.1, M("#E07A5F", 0.4)), p.x + 0.9, 1.74, -2.1);
        const pan = add(cylM(0.32, 0.3, 0.06, M("#3A3A3C", 0.4)), p.x - 1.3, 3.0, Z + 0.25); pan.rotation.x = Math.PI / 2; add(boxM(0.06, 0.5, 0.04, M("#2A2A2A")), p.x - 1.3, 3.5, Z + 0.25);
        add(boxM(1.0, 0.06, 0.32, M("#A3A9AE", 0.3, { metalness: 0.5 })), p.x + 0.2, 2.6, Z + 0.25); for (let k = 0; k < 4; k++) add(cylM(0.16, 0.16, 0.03, M("#FFFDF8", 0.4)), p.x - 0.1 + k * 0.2, 2.8, Z + 0.25).rotation.x = 1.3; }
      if (p.t === "table") { const cloth = tiles("#FFFDF8", "#8FB7A0", 10); cloth.repeat.set(2, 1); add(boxM(2.6, 0.08, 1.3, new T.MeshStandardMaterial({ map: cloth, roughness: 0.8 })), p.x, 1.2, p.z); for (const dx of [-1.15, 1.15]) for (const dz of [-0.5, 0.5]) add(boxM(0.08, 1.2, 0.08, M("#7A4E30")), p.x + dx, 0.6, p.z + dz);
        for (const [dx, dz] of [[-0.6, 0.15], [0.55, -0.1]]) { add(cylM(0.26, 0.22, 0.04, M("#FFFDF8", 0.4)), p.x + dx, 1.26, p.z + dz); add(cylM(0.12, 0.12, 0.02, M("#F6E3A0", 0.5)), p.x + dx, 1.29, p.z + dz); add(mesh(new T.SphereGeometry(0.05, 12, 8), M("#F2A62E", 0.4)), p.x + dx, 1.31, p.z + dz); }
        for (const [dx, dz] of [[-0.95, 0.45], [0.15, 0.45], [0.95, -0.3]]) add(cylM(0.07, 0.06, 0.22, M("#E8743B", 0.3, { transparent: true, opacity: 0.85 })), p.x + dx, 1.35, p.z + dz); }
      if (p.t === "blinds") { for (let k = 0; k < 9; k++) add(boxM(ww - 0.05, 0.05, 0.12, M("#F4F2EC", 0.5)), wx, wy + wh / 2 - 0.1 - k * 0.2, Z + 0.14).rotation.x = 0.5; }
      if (p.t === "plant") { add(cylM(0.3, 0.24, 0.55, M("#C8553D", 0.6)), p.x, 0.28, p.z); for (let k = 0; k < 6; k++) { const l = mesh(new T.SphereGeometry(0.3, 12, 8), M("#4F8F4E", 0.8)); l.scale.set(0.6, 1.3, 0.6); add(l, p.x + Math.cos(k) * 0.22, 0.95 + (k % 3) * 0.22, p.z + Math.sin(k) * 0.18).rotation.z = (k - 2.5) * 0.3; } }
      if (p.t === "officeDesk") { add(boxM(3.4, 0.1, 1.1, M("#A0714A", 0.65)), -0.4, 1.15, 0.35); add(boxM(3.3, 1.1, 0.08, M("#7E5434", 0.7)), -0.4, 0.57, 0.86);
        add(rbox(1.5, 1.0, 0.12, 0.05, M("#26201E", 0.3), 0.03), -1.5, 1.95, 0.1); const scr = tex(256, 160, (x, w, h) => { x.fillStyle = "#F7F4EC"; x.fillRect(0, 0, w, h); x.strokeStyle = "#2F7F86"; x.lineWidth = 10; x.beginPath(); x.moveTo(20, 130); x.lineTo(80, 90); x.lineTo(140, 105); x.lineTo(230, 30); x.stroke(); });
        add(new T.Mesh(new T.PlaneGeometry(1.36, 0.86), new T.MeshBasicMaterial({ map: scr })), -1.5, 1.95, 0.17); add(boxM(0.1, 0.32, 0.1, M("#26201E")), -1.5, 1.34, 0.05);
        const wal = new T.Group(); at(wal, 0.45, 1.24, 0.45); g.add(wal); wal.add(rbox(0.5, 0.07, 0.34, 0.03, M("#8A5A3C", 0.6), 0.02)); const lid = new T.Group(); at(lid, 0, 0.03, -0.17); wal.add(lid); lid.add(at(rbox(0.5, 0.05, 0.34, 0.03, M("#9C6A48", 0.6), 0.02), 0, 0.02, 0.17)); g.userData.walletLid = lid;
        const moth = new T.Group(); moth.visible = false; moth.rotation.x = 1.1; g.add(moth); const mm = M("#B8B0A6", 0.8); moth.add(mesh(new T.SphereGeometry(0.045, 12, 8), M("#5A4E46")));
        const wl = new T.Group(), wr = new T.Group(); moth.add(wl, wr); const w1 = mesh(new T.SphereGeometry(0.11, 12, 8), mm); w1.scale.set(1.3, 0.25, 1); at(w1, -0.12, 0, 0); wl.add(w1); const w2 = w1.clone(); at(w2, 0.12, 0, 0); wr.add(w2); moth.userData.wl = wl; moth.userData.wr = wr; g.userData.moth = moth; }
    }
    outline(g, 0.012, (m) => m.geometry.type === "PlaneGeometry" || m.parent === g && m.geometry.parameters?.width > 6);
    g.userData.sun = { pos: [wx + 2.2, wy + 4.2, Z - 5.5], target: [wx - 1.0, 0.6, 1.0] };
    return g;
  }

  Object.assign(window.AP3D, { makeCharBlok, makeRoomSun, outline, FACE, SPEC_BLOK: SPEC });
})();
