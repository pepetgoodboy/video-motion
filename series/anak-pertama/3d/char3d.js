// Tokoh & set 3D kartun (gaya mainan/clay) serial "Anak Pertama" — three.js r149 (global THREE).
// Dipakai ulang tiap episode. AP3D.makeChar(key) → { root, parts, setExpr(name), setMouth(0..1), blink(0..1) }.
// Satuan: 1 unit ≈ 30 cm; tinggi tokoh ±3 unit (proporsi kartun: kepala besar).
(function () {
  const T = THREE;
  T.ColorManagement.legacyMode = false; // hex = sRGB → warna jenuh, tidak pucat
  const mat = (color, o = {}) => new T.MeshStandardMaterial({ color, roughness: o.r ?? 0.62, metalness: 0, ...o });
  const sph = (r, m, sx = 1, sy = 1, sz = 1) => { const g = new T.Mesh(new T.SphereGeometry(r, 48, 32), m); g.scale.set(sx, sy, sz); g.castShadow = true; g.receiveShadow = true; return g; };
  const cap = (r, len, m) => { const g = new T.Mesh(new T.CapsuleGeometry(r, len, 12, 24), m); g.castShadow = true; g.receiveShadow = true; return g; };
  const at = (o, x, y, z) => { o.position.set(x, y, z); return o; };
  const rbox = (w, h, d, r, m) => { // kotak membulat sederhana: capsule-ish lewat sphere ter-skala + box
    const g = new T.Group(); const b = new T.Mesh(new T.BoxGeometry(w - 2 * r, h, d), m); b.castShadow = b.receiveShadow = true; g.add(b);
    const b2 = new T.Mesh(new T.BoxGeometry(w, h - 2 * r, d - 2 * r), m); b2.castShadow = true; g.add(b2);
    for (const sx of [-1, 1]) { const c = new T.Mesh(new T.CylinderGeometry(r, r, d - 2 * r, 20), m); c.rotation.x = Math.PI / 2; c.position.set(sx * (w / 2 - r), 0, 0); c.scale.set(1, 1, (h - 0) / (2 * r) > 1 ? 1 : 1); g.add(c); }
    return g;
  };

  const SPEC = {
    dinda: { skin: "#E3AC85", hair: "#2B1E1A", style: "bob", top: "#2F7F86", pants: "#2B3A55", shoes: "#F7F3EA", bag: true },
    ibu: { skin: "#D49B76", hijab: "#C8553D", top: "#8A5A3C", dress: true, dots: "#F2B32E", shoes: "#5A3A2A" },
    raka: { skin: "#C98E68", hair: "#1F1715", style: "spiky", top: "#6C8A6E", pants: "#3A5A80", shoes: "#F2F2F2", phones: true },
    mega: { skin: "#EDBB94", hijab: "#E9A6B5", top: "#9C89C9", pants: "#4A4458", shoes: "#FFFDF8", glasses: "round" },
    hendra: { skin: "#C48A64", hair: "#33302E", style: "short", top: "#2B4C7E", pants: "#2E2E36", shoes: "#2A2420", glasses: "rect", mustache: true },
  };
  const EXPR = {
    netral: { brow: [0, 0], eye: 1, smile: 0.6 },
    senang: { brow: [0.05, 0.12], eye: 0.62, smile: 1.15 },
    sedih: { brow: [0.04, 0.3], eye: 0.8, smile: -0.7, tear: true },
    kaget: { brow: [0.08, 0], eye: 1.25, smile: 0, o: 0.7 },
    pasrah: { brow: [-0.02, 0.1], eye: 0.5, smile: 0 },
    haru: { brow: [0.04, 0.22], eye: 0.6, smile: 1, tear: true },
  };

  const RR = (w, h, r) => { const sh = new T.Shape(); sh.moveTo(-w / 2 + r, -h / 2); sh.lineTo(w / 2 - r, -h / 2); sh.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r); sh.lineTo(w / 2, h / 2 - r); sh.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2); sh.lineTo(-w / 2 + r, h / 2); sh.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r); sh.lineTo(-w / 2, -h / 2 + r); sh.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2); return sh; };
  function makeBag(scale = 1) {
    const g = new T.Group();
    const bag = new T.Mesh(new T.ExtrudeGeometry(RR(0.46, 0.34, 0.08), { depth: 0.12, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 6, curveSegments: 16 }), mat("#F2B32E", { r: 0.45 })); at(bag, 0, 0, -0.06); g.add(bag);
    const flap = new T.Mesh(new T.ExtrudeGeometry(RR(0.48, 0.16, 0.06), { depth: 0.03, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 4 }), mat("#D99A1E", { r: 0.45 })); at(flap, 0, 0.09, 0.12); g.add(flap);
    const btn = sph(0.035, mat("#3B2F2A", { r: 0.3 })); at(btn, 0, 0.03, 0.17); g.add(btn);
    const strap = new T.Mesh(new T.TorusGeometry(0.28, 0.025, 8, 40, Math.PI), mat("#B8841B", { r: 0.6 })); at(strap, 0, 0.14, 0.03); g.add(strap);
    g.scale.setScalar(scale); g.traverse((o) => { if (o.isMesh) o.castShadow = o.receiveShadow = true; }); return g;
  }
  function makePhone(screenColor = "#7FD0D6") {
    const g = new T.Group(); const b = new T.Mesh(new T.ExtrudeGeometry(RR(0.32, 0.6, 0.06), { depth: 0.03, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 3 }), mat("#2A2422", { r: 0.3 })); at(b, 0, 0, -0.02); g.add(b);
    const sc = new T.Mesh(new T.PlaneGeometry(0.28, 0.54), new T.MeshStandardMaterial({ color: screenColor, emissive: screenColor, emissiveIntensity: 0.55, roughness: 0.2 })); at(sc, 0, 0, 0.026); g.add(sc); g.userData.screen = sc;
    g.traverse((o) => { if (o.isMesh) o.castShadow = true; }); return g;
  }

  function makeChar(key, opt = {}) {
    const s = SPEC[key], root = new T.Group(), P = {};
    const skin = mat(s.skin, { r: 0.5, emissive: new T.Color(s.skin).multiplyScalar(0.06) }), top = mat(s.top, { r: 0.85 }), dark = mat("#2A1E1A", { r: 0.35 });
    // kaki / rok
    if (s.dress) { const d = new T.Mesh(new T.CylinderGeometry(0.42, 0.62, 1.35, 40), top); d.castShadow = d.receiveShadow = true; at(d, 0, 0.82, 0); root.add(d); }
    else for (const x of [-0.19, 0.19]) {
      const pm = mat(s.pants, { r: 0.85 }); const hip = new T.Group(); at(hip, x, 0.92, 0); root.add(hip);
      const th = cap(0.18, 0.26, pm); at(th, 0, -0.2, 0); hip.add(th);
      const kn = new T.Group(); at(kn, 0, -0.42, 0); hip.add(kn);
      const sn = cap(0.17, 0.24, pm); at(sn, 0, -0.18, 0); kn.add(sn);
      const sh = sph(0.2, mat(s.shoes, { r: 0.5 }), 1, 0.6, 1.4); at(sh, 0, -0.4, 0.06); kn.add(sh);
      P[x < 0 ? "hipR" : "hipL"] = hip; P[x < 0 ? "kneeR" : "kneeL"] = kn;
    }
    if (s.dress) for (const x of [-0.19, 0.19]) { const sh = sph(0.2, mat(s.shoes, { r: 0.5 }), 1, 0.6, 1.4); at(sh, x, 0.1, 0.06); root.add(sh); }
    // badan
    const torso = cap(0.4, 0.5, top); torso.scale.set(1, 1, 0.78); at(torso, 0, 1.22, 0); root.add(torso); P.torso = torso;
    if (s.dots) for (let i = 0; i < 26; i++) { const a = -1.1 + ((i * 0.618) % 1) * 2.2, y = 0.25 + ((i * 0.37) % 1) * 1.1; const r = 0.62 - ((y - 0.145) / 1.35) * 0.2 + 0.01; const dt = sph(0.04, mat(s.dots), 1, 1, 0.35); at(dt, Math.sin(a) * r, y, Math.cos(a) * r); dt.lookAt(Math.sin(a) * 3, y, Math.cos(a) * 3); root.add(dt); }
    const neck = new T.Mesh(new T.CylinderGeometry(0.1, 0.12, 0.22, 20), skin); at(neck, 0, 1.68, 0); root.add(neck);
    if (!s.hijab) { const col = new T.Mesh(new T.TorusGeometry(0.17, 0.05, 12, 32), mat(new T.Color(s.top).multiplyScalar(0.8).getStyle(), { r: 0.8 })); col.rotation.x = Math.PI / 2; at(col, 0, 1.6, 0.02); root.add(col); }
    // lengan (bahu → siku → tangan)
    for (const side of [-1, 1]) {
      const sh = new T.Group(); at(sh, side * 0.44, 1.5, 0); sh.rotation.z = side * 0.14; root.add(sh);
      const ua = cap(0.125, 0.3, top); at(ua, 0, -0.22, 0); sh.add(ua);
      const el = new T.Group(); at(el, 0, -0.44, 0); sh.add(el);
      const fa = cap(0.085, 0.28, skin); at(fa, 0, -0.18, 0); el.add(fa);
      const hd = sph(0.11, skin); at(hd, 0, -0.4, 0); el.add(hd);
      P[side < 0 ? "armR" : "armL"] = sh; P[side < 0 ? "elbowR" : "elbowL"] = el; P[side < 0 ? "handR" : "handL"] = hd;
    }
    // kepala
    const head = new T.Group(); at(head, 0, 2.28, 0); root.add(head); P.head = head;
    const skull = sph(0.6, skin, 1, 1.03, 0.95); head.add(skull);
    if (!s.hijab) for (const x of [-1, 1]) { const e = sph(0.1, skin, 0.6, 1, 1); at(e, x * 0.58, -0.02, 0); head.add(e); }
    const hairM = mat(s.hair ?? "#222", { r: 0.45, side: T.DoubleSide });
    if (s.style === "bob") {
      const back = new T.Mesh(new T.SphereGeometry(0.68, 64, 48, Math.PI * 0.86, Math.PI * 1.28, 0, Math.PI * 0.64), hairM); back.castShadow = true; back.scale.set(1.04, 1.02, 1); head.add(back);
      const cap1 = new T.Mesh(new T.SphereGeometry(0.675, 64, 48, 0, Math.PI * 2, 0, Math.PI * 0.235), hairM); cap1.castShadow = true; cap1.rotation.z = 0.12; head.add(cap1);
      const sweep = new T.Mesh(new T.SphereGeometry(0.68, 64, 48, Math.PI * 0.2, Math.PI * 0.62, Math.PI * 0.22, Math.PI * 0.2), hairM); sweep.rotation.z = 0.12; head.add(sweep);
    } else if (s.style === "spiky") {
      const cap1 = new T.Mesh(new T.SphereGeometry(0.67, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.36), hairM); head.add(cap1);
      for (let i = 0; i < 9; i++) { const a = -1.2 + i * 0.3; const c = new T.Mesh(new T.ConeGeometry(0.14, 0.38, 12), hairM); at(c, Math.sin(a) * 0.45, 0.58 - Math.abs(a) * 0.08, Math.cos(a) * 0.2 - 0.05); c.rotation.z = -a * 0.6; c.rotation.x = -0.3; head.add(c); }
    } else if (s.style === "short") {
      const cap1 = new T.Mesh(new T.SphereGeometry(0.665, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.33), hairM); head.add(cap1);
      const back = new T.Mesh(new T.SphereGeometry(0.662, 48, 32, Math.PI * 0.95, Math.PI * 1.1, 0, Math.PI * 0.55), hairM); head.add(back);
      for (const x of [-1, 1]) { const g = new T.Mesh(new T.SphereGeometry(0.668, 24, 16, x < 0 ? Math.PI * 0.92 : Math.PI * -0.08, Math.PI * 0.16, Math.PI * 0.3, Math.PI * 0.16), mat("#9A9A9A", { r: 0.5 })); head.add(g); }
    }
    if (s.hijab) {
      const hm = mat(s.hijab, { r: 0.9, side: T.DoubleSide });
      const hood = new T.Mesh(new T.SphereGeometry(0.7, 48, 32, Math.PI * 0.72, Math.PI * 1.56, 0, Math.PI * 0.82), hm); hood.castShadow = true; head.add(hood);
      const capH = new T.Mesh(new T.SphereGeometry(0.705, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.2), hm); head.add(capH);
      const drape = new T.Mesh(new T.CylinderGeometry(0.42, 0.74, 0.7, 40, 1, true), hm); drape.castShadow = true; at(drape, 0, 1.5, 0); root.add(drape);
      const chin = new T.Mesh(new T.SphereGeometry(0.62, 48, 24, 0, Math.PI * 2, Math.PI * 0.62, Math.PI * 0.38), hm); chin.scale.set(1, 1.05, 1); at(chin, 0, 0, 0); head.add(chin);
      const ring = new T.Mesh(new T.TorusGeometry(0.6, 0.07, 16, 48), hm); ring.scale.set(1, 1.05, 1); at(ring, 0, -0.03, 0.18); head.add(ring);
    }
    // wajah
    const face = new T.Group(); at(face, 0, 0, 0.55); head.add(face); P.face = face;
    const eyeM = mat("#20160F", { r: 0.15 }), hiM = new T.MeshBasicMaterial({ color: "#ffffff" });
    P.eyes = [];
    P.pupils = [];
    for (const x of [-1, 1]) {
      const g = new T.Group(); at(g, x * 0.2, 0.0, 0.02); g.rotation.y = x * 0.32; face.add(g);
      if (opt.eyes === "sclera") { // gaya ref1: bola mata putih + pupil yang bisa melirik (P.pupils, geser x/y ±0.03)
        g.add(sph(0.118, new T.MeshBasicMaterial({ color: "#F6F2EA" }), 1, 1.22, 0.35)); const pu = new T.Group(); at(pu, 0, -0.005, 0.03); g.add(pu); // datar seperti dilukis (unlit)
        pu.add(sph(0.066, new T.MeshBasicMaterial({ color: "#1E1712" }), 1, 1.18, 0.35)); const h = sph(0.022, hiM); at(h, 0.022, 0.035, 0.03); pu.add(h); P.pupils.push(pu);
      } else { const e = sph(0.1, eyeM, 1, 1.32, 0.55); g.add(e); const h = sph(0.03, hiM); at(h, 0.035, 0.06, 0.05); g.add(h); }
      P.eyes.push(g);
    }
    P.brows = [];
    for (const x of [-1, 1]) { const b = cap(0.032, 0.14, mat(s.hair ?? "#3B2A22", { r: 0.5 })); b.rotation.z = Math.PI / 2; at(b, x * 0.2, 0.16, 0.0); face.add(b); P.brows.push(b); }
    const nose = sph(0.05, mat(new T.Color(s.skin).multiplyScalar(0.9).getStyle(), { r: 0.55 })); at(nose, 0, -0.1, 0.06); face.add(nose);
    for (const x of [-1, 1]) { const c = sph(0.095, new T.MeshStandardMaterial({ color: "#E98C8C", transparent: true, opacity: 0.42, roughness: 0.8 }), 1, 0.6, 0.3); at(c, x * 0.33, -0.15, -0.08); face.add(c); }
    const mouth = new T.Group(); at(mouth, 0, -0.27, 0.0); face.add(mouth); P.mouth = mouth;
    const smile = new T.Mesh(new T.TorusGeometry(0.11, 0.024, 12, 28, Math.PI), dark); smile.rotation.z = Math.PI; mouth.add(smile); P.smile = smile;
    const open = sph(0.085, mat("#6E2626", { r: 0.4 }), 1.2, 1, 0.45); mouth.add(open); P.open = open;
    const tongue = sph(0.05, mat("#E07A7A"), 1.2, 0.6, 0.4); at(tongue, 0, -0.04, 0.02); open.add(tongue);
    const tear = sph(0.04, new T.MeshStandardMaterial({ color: "#9CC9D9", roughness: 0.1, transparent: true, opacity: 0.9 }), 1, 1.5, 0.6); at(tear, -0.27, -0.13, 0.0); tear.visible = false; face.add(tear); P.tear = tear;
    if (s.glasses) { const gm = mat("#2A1E1A", { r: 0.3 }); for (const x of [-1, 1]) { const r = s.glasses === "round" ? new T.Mesh(new T.TorusGeometry(0.13, 0.018, 10, 32), gm) : new T.Mesh(new T.TorusGeometry(0.17, 0.014, 6, 4), gm); if (s.glasses === "rect") r.rotation.z = Math.PI / 4; at(r, x * 0.2, 0.0, 0.07); face.add(r); } const br = cap(0.012, 0.1, gm); br.rotation.z = Math.PI / 2; at(br, 0, 0.02, 0.08); face.add(br); }
    if (s.mustache) { const m = sph(0.12, mat(s.hair), 1.3, 0.35, 0.4); at(m, 0, -0.19, 0.04); face.add(m); }
    if (s.phones) { const pm = mat("#2F2F33", { r: 0.3 }); const ring = new T.Mesh(new T.TorusGeometry(0.3, 0.05, 12, 40, Math.PI), pm); ring.rotation.x = Math.PI / 2 + 0.3; at(ring, 0, 1.62, 0.05); root.add(ring); for (const x of [-1, 1]) { const c = sph(0.11, pm, 0.6, 1, 1); at(c, x * 0.3, 1.62, 0.05); root.add(c); } }
    if (s.bag) {
      const rr = RR; const _ = (w, h, r) => { const sh = new T.Shape(); sh.moveTo(-w / 2 + r, -h / 2); sh.lineTo(w / 2 - r, -h / 2); sh.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r); sh.lineTo(w / 2, h / 2 - r); sh.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2); sh.lineTo(-w / 2 + r, h / 2); sh.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r); sh.lineTo(-w / 2, -h / 2 + r); sh.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2); return sh; };
      const bag = new T.Mesh(new T.ExtrudeGeometry(rr(0.46, 0.34, 0.08), { depth: 0.12, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 6, curveSegments: 16 }), mat("#F2B32E", { r: 0.45 })); at(bag, 0.42, 0.95, 0.24); bag.rotation.y = -0.15; root.add(bag);
      const flap = new T.Mesh(new T.ExtrudeGeometry(rr(0.48, 0.16, 0.06), { depth: 0.03, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 4 }), mat("#D99A1E", { r: 0.45 })); at(flap, 0.42, 1.04, 0.42); flap.rotation.y = -0.15; root.add(flap);
      const btn = sph(0.035, mat("#3B2F2A", { r: 0.3 })); at(btn, 0.415, 0.98, 0.47); root.add(btn);
      const curve = new T.CatmullRomCurve3([new T.Vector3(-0.3, 1.62, 0.1), new T.Vector3(-0.05, 1.48, 0.34), new T.Vector3(0.25, 1.2, 0.36), new T.Vector3(0.4, 1.1, 0.34)]);
      const strap = new T.Mesh(new T.TubeGeometry(curve, 40, 0.028, 8), mat("#B8841B", { r: 0.6 })); strap.castShadow = true; root.add(strap);
    }
    root.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    const api = {
      root, parts: P,
      // brow[1] > 0 = ujung dalam naik (sedih/cemas); < 0 = turun (marah)
      setExpr(name) { const e = EXPR[name]; P.brows.forEach((b, i) => { b.position.y = 0.16 + e.brow[0]; b.rotation.z = Math.PI / 2 + (i ? -1 : 1) * e.brow[1]; }); P.eyes.forEach((g) => (g.scale.y = e.eye)); P.smile.scale.set(1, Math.max(0.05, Math.abs(e.smile)), 1); P.smile.rotation.z = e.smile >= 0 ? Math.PI : 0; P.tear.visible = !!e.tear; api.base = e; api.setMouth(e.o ?? 0); },
      setMouth(v) { P.open.visible = v > 0.12; P.open.scale.y = 0.25 + v * 0.95; P.smile.visible = v <= 0.12; },
      blink(v) { P.eyes.forEach((g) => (g.scale.y = (api.base?.eye ?? 1) * (1 - 0.92 * v))); },
    };
    api.setExpr("netral");
    return api;
  }

  // ---------- set kamar kos ----------
  function canvasTex(w, h, draw) { const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; return t; }
  function makeKos(o = {}) {
    const g = new T.Group(); const dusk = !!o.dusk;
    const wall = mat(dusk ? "#D9B08F" : "#EEC7A4", { r: 0.95 });
    const floorTex = canvasTex(512, 512, (x, w, h) => { for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? "#C99A6A" : "#BF8F5F"; x.fillRect(0, i * 64, w, 64); x.fillStyle = "rgba(0,0,0,.08)"; x.fillRect(0, i * 64 + 62, w, 2); } });
    floorTex.wrapS = floorTex.wrapT = T.RepeatWrapping; floorTex.repeat.set(3, 3);
    const floor = new T.Mesh(new T.PlaneGeometry(14, 14), new T.MeshStandardMaterial({ map: floorTex, roughness: 0.8 })); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; g.add(floor);
    const back = new T.Mesh(new T.PlaneGeometry(14, 8), wall); at(back, 0, 4, -2.6); back.receiveShadow = true; g.add(back);
    const left = new T.Mesh(new T.PlaneGeometry(14, 8), wall); left.rotation.y = Math.PI / 2; at(left, -3.4, 4, 0); left.receiveShadow = true; g.add(left);
    // jendela
    const sky = canvasTex(256, 512, (x, w, h) => { const gr = x.createLinearGradient(0, 0, 0, h); if (dusk) { gr.addColorStop(0, "#1E2746"); gr.addColorStop(1, "#3D4A6B"); } else { gr.addColorStop(0, "#8EC5E8"); gr.addColorStop(0.55, "#F2A65A"); gr.addColorStop(1, "#F2B32E"); } x.fillStyle = gr; x.fillRect(0, 0, w, h); x.fillStyle = dusk ? "#FBF3E4" : "#FFE7A8"; x.beginPath(); x.arc(w * 0.6, h * (dusk ? 0.25 : 0.62), 34, 0, 7); x.fill(); });
    const glass = new T.Mesh(new T.PlaneGeometry(1.6, 2.1), new T.MeshBasicMaterial({ map: sky })); at(glass, 1.4, 3.1, -2.58); g.add(glass); g.userData.glass = glass; g.userData.wall = wall;
    const fm = mat("#FBF3E4", { r: 0.6 });
    for (const [w, h, x, y] of [[1.8, 0.12, 1.4, 4.2], [1.8, 0.12, 1.4, 2.0], [0.12, 2.3, 0.5, 3.1], [0.12, 2.3, 2.3, 3.1], [0.06, 2.1, 1.4, 3.1]]) { const b = new T.Mesh(new T.BoxGeometry(w, h, 0.12), fm); b.castShadow = true; at(b, x, y, -2.52); g.add(b); }
    const curtain = (x, col) => { const geo = new T.PlaneGeometry(0.8, 2.7, 48, 1); const p = geo.attributes.position; for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin(p.getX(i) * 22) * 0.09); geo.computeVertexNormals(); const m = new T.Mesh(geo, mat(col, { r: 0.9, side: T.DoubleSide })); m.castShadow = true; at(m, x, 3.05, -2.4); return m; };
    g.add(curtain(0.25, "#E9A6B5")); g.add(curtain(2.55, "#D98C9C"));
    // kasur
    const bedM = mat("#8E5E3A", { r: 0.7 }); const frame = new T.Mesh(new T.BoxGeometry(2.4, 0.6, 3.4), bedM); at(frame, -2.1, 0.3, -0.6); g.add(frame);
    const mat1 = sph(1, mat("#FFFDF8", { r: 0.95 }), 1.2, 0.22, 1.68); at(mat1, -2.1, 0.75, -0.6); g.add(mat1);
    const blanket = sph(1, mat("#2F7F86", { r: 0.95 }), 1.18, 0.2, 1.1); at(blanket, -2.1, 0.86, 0.0); g.add(blanket);
    const pillow = sph(0.5, mat("#F7EFE6", { r: 0.95 }), 1.3, 0.38, 0.8); at(pillow, -2.1, 1.0, -1.8); g.add(pillow);
    // meja + lampu
    const tab = new T.Mesh(new T.CylinderGeometry(0.45, 0.45, 0.08, 32), bedM); at(tab, 2.6, 1.1, -1.4); g.add(tab);
    const leg = new T.Mesh(new T.CylinderGeometry(0.06, 0.06, 1.1, 12), bedM); at(leg, 2.6, 0.55, -1.4); g.add(leg);
    const shade = new T.Mesh(new T.CylinderGeometry(0.22, 0.38, 0.45, 32, 1, true), new T.MeshStandardMaterial({ color: "#F2B32E", emissive: "#F2B32E", emissiveIntensity: dusk ? 0.9 : 0.3, side: T.DoubleSide })); at(shade, 2.6, 1.75, -1.4); g.add(shade);
    const pole = new T.Mesh(new T.CylinderGeometry(0.03, 0.03, 0.5, 8), mat("#3B2F2A")); at(pole, 2.6, 1.38, -1.4); g.add(pole);
    const lamp = new T.PointLight("#FFC27A", dusk ? 2.2 : 0.6, 7, 2); at(lamp, 2.6, 1.7, -1.3); lamp.castShadow = false; g.add(lamp); g.userData.lamp = lamp; g.userData.shade = shade;
    // poster
    const pf = new T.Mesh(new T.BoxGeometry(0.9, 1.15, 0.06), mat("#2F7F86")); at(pf, -1.5, 3.3, -2.56); g.add(pf);
    const pp = new T.Mesh(new T.PlaneGeometry(0.75, 1.0), mat("#FBF3E4")); at(pp, -1.5, 3.3, -2.52); g.add(pp);
    return g;
  }

  function makeLights(scene, dusk = false) {
    scene.add(new T.HemisphereLight(dusk ? "#9FA8D8" : "#FFE9D0", dusk ? "#5A3E2E" : "#B98A5A", dusk ? 0.45 : 0.75));
    const key = new T.DirectionalLight(dusk ? "#BFCBFF" : "#FFC992", dusk ? 0.55 : 1.55); key.position.set(3.5, 6, 2.5); key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048); key.shadow.camera.left = -6; key.shadow.camera.right = 6; key.shadow.camera.top = 7; key.shadow.camera.bottom = -2; key.shadow.radius = 4; key.shadow.bias = -0.0004; scene.add(key);
    const fill = new T.DirectionalLight("#B9D3FF", 0.35); fill.position.set(-4, 3, 5); scene.add(fill);
    const rim = new T.DirectionalLight("#FFD9A8", 0.6); rim.position.set(-2, 5, -5); scene.add(rim);
  }

  function makeRenderer(w, h) {
    const r = new T.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    r.setSize(w, h); r.setPixelRatio(1); r.shadowMap.enabled = true; r.shadowMap.type = T.PCFSoftShadowMap;
    r.outputEncoding = T.sRGBEncoding; r.toneMapping = T.ACESFilmicToneMapping; r.toneMappingExposure = 0.95;
    return r;
  }

  // ---------- set lain ----------
  const box = (w, h, d, m, x, y, z) => { const b = new T.Mesh(new T.BoxGeometry(w, h, d), m); b.castShadow = b.receiveShadow = true; return at(b, x, y, z); };
  const cyl = (rt, rb, h, m, x, y, z, seg = 32) => { const c = new T.Mesh(new T.CylinderGeometry(rt, rb, h, seg), m); c.castShadow = c.receiveShadow = true; return at(c, x, y, z); };
  const room = (g, wallCol, floorCol, w = 14) => {
    const fl = new T.Mesh(new T.PlaneGeometry(w, 14), mat(floorCol, { r: 0.85 })); fl.rotation.x = -Math.PI / 2; fl.receiveShadow = true; g.add(fl);
    const bw = new T.Mesh(new T.PlaneGeometry(w, 8), mat(wallCol, { r: 0.95 })); at(bw, 0, 4, -2.6); bw.receiveShadow = true; g.add(bw);
  };
  function makeKitchen(o = {}) {
    const g = new T.Group();
    const tiles = canvasTex(512, 512, (x, w, h) => { x.fillStyle = "#CFE3E0"; x.fillRect(0, 0, w, h); x.strokeStyle = "#A9C9C4"; x.lineWidth = 6; for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(i * 64, 0); x.lineTo(i * 64, h); x.stroke(); x.beginPath(); x.moveTo(0, i * 64); x.lineTo(w, i * 64); x.stroke(); } });
    tiles.wrapS = tiles.wrapT = T.RepeatWrapping; tiles.repeat.set(4, 2.5);
    const fl = new T.Mesh(new T.PlaneGeometry(14, 14), mat("#B48A64", { r: 0.85 })); fl.rotation.x = -Math.PI / 2; fl.receiveShadow = true; g.add(fl);
    const bw = new T.Mesh(new T.PlaneGeometry(14, 8), new T.MeshStandardMaterial(o.planks ? { map: planksTex(o.planks, 7), roughness: 0.9 } : { map: tiles, roughness: 0.6 })); at(bw, 0, 4, -2.6); bw.receiveShadow = true; g.add(bw);
    if (o.pendant) addPendant(g, o.pendant[0], o.pendant[1], o.pendant[2]);
    const wood = mat("#9C6B44", { r: 0.7 });
    g.add(box(5, 1.3, 1.1, wood, 1.2, 0.65, -2.0)); g.add(box(5.1, 0.1, 1.2, mat("#E8DCC8", { r: 0.5 }), 1.2, 1.33, -2.0));
    const rc = cyl(0.36, 0.36, 0.45, mat("#FFFDF8", { r: 0.35 }), 2.4, 1.62, -2.0); g.add(rc); g.add(cyl(0.33, 0.36, 0.12, mat("#E07A5F", { r: 0.4 }), 2.4, 1.9, -2.0));
    g.add(cyl(0.3, 0.26, 0.25, mat("#5A6B7A", { r: 0.3, metalness: 0.5 }), 0.4, 1.5, -2.0));
    g.add(box(2.4, 0.08, 0.5, wood, -1.4, 3.2, -2.35));
    for (let i = 0; i < 4; i++) g.add(cyl(0.12, 0.12, 0.32, mat(["#F2B32E", "#E07A5F", "#7DB46C", "#FBF3E4"][i], { r: 0.4 }), -2.3 + i * 0.6, 3.42, -2.35, 16));
    // foto Bapak
    const ph = canvasTex(256, 320, (x, w, h) => { x.fillStyle = "#EFE6D8"; x.fillRect(0, 0, w, h); x.fillStyle = "#9A8A80"; x.beginPath(); x.arc(w / 2, 130, 52, 0, 7); x.fill(); x.beginPath(); x.ellipse(w / 2, 300, 95, 110, 0, Math.PI, 0); x.fill(); });
    g.add(box(1.05, 1.3, 0.06, mat("#7A4E2E", { r: 0.6 }), -1.9, 4.4, -2.56));
    const pp = new T.Mesh(new T.PlaneGeometry(0.85, 1.1), new T.MeshStandardMaterial({ map: ph, roughness: 0.8 })); at(pp, -1.9, 4.4, -2.52); g.add(pp);
    const lamp = new T.PointLight("#FFD9A8", 0.8, 9, 2); at(lamp, 0, 4.5, 0.5); g.add(lamp);
    return g;
  }
  function makeOffice(o = {}) {
    const g = new T.Group(); room(g, o.wall ?? "#D6E8E6", o.floor ?? "#BFC9C7");
    const wood = mat("#A0714A", { r: 0.65 });
    g.add(box(3.6, 0.12, 1.1, wood, -0.4, 1.15, 0.35)); g.add(box(3.4, 1.1, 0.1, mat("#8E5E3A", { r: 0.7 }), -0.4, 0.57, 0.85));
    const scr = canvasTex(512, 320, (x, w, h) => { x.fillStyle = "#FBF8F2"; x.fillRect(0, 0, w, h); x.strokeStyle = "#2F7F86"; x.lineWidth = 18; x.lineCap = "round"; x.beginPath(); x.moveTo(40, 260); x.lineTo(160, 180); x.lineTo(270, 210); x.lineTo(380, 100); x.lineTo(470, 60); x.stroke(); });
    g.add(box(1.5, 1.0, 0.12, mat("#2A2422", { r: 0.3 }), -1.5, 1.95, 0.1));
    const ms = new T.Mesh(new T.PlaneGeometry(1.36, 0.86), new T.MeshStandardMaterial({ map: scr, emissive: "#ffffff", emissiveMap: scr, emissiveIntensity: 0.35 })); at(ms, -1.5, 1.95, 0.17); g.add(ms);
    g.add(box(0.12, 0.3, 0.12, mat("#2A2422"), -1.5, 1.33, 0.05));
    // dompet (tutup bisa dibuka)
    const wal = new T.Group(); at(wal, 0.45, 1.24, 0.45); g.add(wal); wal.add(box(0.5, 0.06, 0.34, mat("#8A5A3C", { r: 0.6 }), 0, 0, 0));
    const lid = new T.Group(); at(lid, 0, 0.03, -0.17); wal.add(lid); lid.add(box(0.5, 0.05, 0.34, mat("#9C6A48", { r: 0.6 }), 0, 0.02, 0.17)); g.userData.walletLid = lid;
    const moth = new T.Group(); moth.visible = false; moth.rotation.x = 1.1; g.add(moth); const mm = mat("#B8B0A6", { r: 0.8 }); moth.add(sph(0.045, mat("#5A4E46"), 1, 1, 2.2));
    const wl = new T.Group(), wr = new T.Group(); moth.add(wl, wr); const w1 = sph(0.11, mm, 1.3, 0.25, 1); at(w1, -0.12, 0, 0); wl.add(w1); const w2 = sph(0.11, mm, 1.3, 0.25, 1); at(w2, 0.12, 0, 0); wr.add(w2);
    moth.userData.wl = wl; moth.userData.wr = wr; g.userData.moth = moth;
    // tanaman, jam, kerai, pintu
    g.add(cyl(0.32, 0.25, 0.6, mat("#E07A5F", { r: 0.6 }), 3.2, 0.3, -1.6));
    for (let i = 0; i < 6; i++) { const lf = sph(0.32, mat("#5E9E5A", { r: 0.7 }), 0.7, 1.3, 0.7); at(lf, 3.2 + Math.cos(i) * 0.25, 1.0 + (i % 3) * 0.25, -1.6 + Math.sin(i) * 0.2); lf.rotation.z = (i - 2.5) * 0.3; g.add(lf); }
    const ck = cyl(0.42, 0.42, 0.08, mat("#FFFDF8", { r: 0.4 }), -2.8, 5.0, -2.55); ck.rotation.x = Math.PI / 2; g.add(ck);
    const hh = box(0.05, 0.3, 0.02, mat("#3B2F2A"), -2.8, 5.12, -2.49); g.add(hh); const mh = box(0.26, 0.05, 0.02, mat("#3B2F2A"), -2.68, 5.0, -2.49); g.add(mh);
    for (let i = 0; i < 7; i++) g.add(box(2.4, 0.12, 0.05, mat("#FBFBF8", { r: 0.5 }), 1.4, 3.2 + i * 0.32, -2.52));
    g.add(box(1.6, 3.6, 0.08, mat("#8E5E3A", { r: 0.7 }), 4.4, 1.8, -2.5));
    return g;
  }
  function makeRakaRoom(o = {}) {
    const g = new T.Group(); room(g, o.wall ?? "#C9D6E8", o.floor ?? "#8E6E58");
    g.add(box(1.4, 1.9, 0.06, mat("#2B3A55", { r: 0.6 }), -1.6, 3.6, -2.55));
    const pst = canvasTex(256, 360, (x, w, h) => { x.fillStyle = "#F2B32E"; x.fillRect(0, 0, w, h); x.fillStyle = "#2B3A55"; x.beginPath(); x.arc(w / 2, 150, 70, 0, 7); x.fill(); x.fillRect(40, 260, 176, 30); });
    const pp = new T.Mesh(new T.PlaneGeometry(1.2, 1.7), new T.MeshStandardMaterial({ map: pst })); at(pp, -1.6, 3.6, -2.5); g.add(pp);
    g.add(box(2.4, 0.1, 0.6, mat("#A0714A"), 1.8, 2.6, -2.3)); for (let i = 0; i < 5; i++) g.add(box(0.18, 0.55, 0.4, mat(["#E07A5F", "#7DB46C", "#2F7F86", "#F2B32E", "#9C89C9"][i]), 1.0 + i * 0.3, 2.93, -2.3));
    const lamp = new T.PointLight("#FFE2B0", 0.7, 8, 2); at(lamp, 1.5, 4.0, 0.5); g.add(lamp);
    return g;
  }
  let PUFF = null;
  function makeWarung() {
    PUFF = canvasTex(64, 64, (x, w, h) => { const gr = x.createRadialGradient(w / 2, h / 2, 2, w / 2, h / 2, w / 2); gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(1, "rgba(255,255,255,0)"); x.fillStyle = gr; x.fillRect(0, 0, w, h); });
    const g = new T.Group(); g.userData.anim = [];
    const ground = new T.Mesh(new T.PlaneGeometry(30, 30), mat("#3A3F52", { r: 0.95 })); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; g.add(ground);
    const skyT = canvasTex(64, 256, (x, w, h) => { const gr = x.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, "#151B33"); gr.addColorStop(1, "#3D4A6B"); x.fillStyle = gr; x.fillRect(0, 0, w, h); });
    const sky = new T.Mesh(new T.PlaneGeometry(40, 16), new T.MeshBasicMaterial({ map: skyT })); at(sky, 0, 7, -9); g.add(sky);
    g.add(box(30, 4, 0.5, mat("#2C3550", { r: 0.9 }), 0, 2, -7));
    // lampu untai
    for (let i = 0; i < 14; i++) { const x = -6.5 + i; const y = 5.2 - Math.sin((i / 13) * Math.PI) * 0.6; const b = sph(0.11, new T.MeshStandardMaterial({ color: "#FFE7A8", emissive: "#F2B32E", emissiveIntensity: 1.4 })); at(b, x, y, -3); g.add(b); g.userData.anim.push((t) => { b.material.emissiveIntensity = 1.0 + 0.5 * Math.sin(t * 2 + i); }); }
    // gerobak
    const cart = new T.Group(); at(cart, 1.5, 0, -2.6); g.add(cart);
    cart.add(box(2.4, 1.3, 1.1, mat("#E07A5F", { r: 0.5 }), 0, 1.05, 0)); cart.add(box(2.5, 0.12, 1.2, mat("#FFFDF8", { r: 0.4 }), 0, 1.76, 0));
    const glass = new T.Mesh(new T.BoxGeometry(2.2, 1.0, 1.0), new T.MeshStandardMaterial({ color: "#CFE9F2", transparent: true, opacity: 0.35, roughness: 0.05 })); at(glass, 0, 2.3, 0); cart.add(glass);
    cart.add(box(2.7, 0.14, 1.4, mat("#C8553D", { r: 0.5 }), 0, 3.6, 0)); for (const x of [-1.2, 1.2]) cart.add(box(0.08, 1.8, 0.08, mat("#3B2F2A"), x, 2.7, 0.55));
    for (const x of [-0.8, 0.8]) { const w = new T.Mesh(new T.TorusGeometry(0.32, 0.09, 12, 32), mat("#2A2422", { r: 0.5 })); at(w, x, 0.4, 0.6); w.castShadow = true; cart.add(w); }
    const sign = canvasTex(512, 160, (x, w, h) => { x.fillStyle = "#FDF6EC"; x.fillRect(0, 0, w, h); x.fillStyle = "#B0462C"; x.font = "bold 110px sans-serif"; x.textAlign = "center"; x.fillText("BAKSO", w / 2, 120); });
    const sg = new T.Mesh(new T.PlaneGeometry(2.0, 0.62), new T.MeshStandardMaterial({ map: sign, emissive: "#ffffff", emissiveMap: sign, emissiveIntensity: 0.25 })); at(sg, 0, 3.2, 0.71); cart.add(sg);
    const pot = cyl(0.36, 0.32, 0.5, mat("#9AA4AE", { r: 0.25, metalness: 0.6 }), -0.4, 2.1, 0); cart.add(pot);
    const bulb = sph(0.14, new T.MeshStandardMaterial({ color: "#FFF1C8", emissive: "#FFD27A", emissiveIntensity: 2 })); at(bulb, 0.3, 3.35, 0.2); cart.add(bulb);
    const cl = new T.PointLight("#FFC27A", 3.2, 10, 2); at(cl, 0.3, 3.2, 0.9); cart.add(cl);
    // meja + taplak + mangkuk + uap
    const cloth = canvasTex(256, 256, (x, w, h) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#FFFDF8" : "#2F7F86"; x.fillRect(i * 32, j * 32, 32, 32); } });
    cloth.wrapS = cloth.wrapT = T.RepeatWrapping; cloth.repeat.set(2, 1);
    const strip = canvasTex(512, 64, (x, w, h) => { for (let i = 0; i < 16; i++) for (let j = 0; j < 2; j++) { x.fillStyle = (i + j) % 2 ? "#FFFDF8" : "#2F7F86"; x.fillRect(i * 32, j * 32, 32, 32); } });
    const cM = new T.MeshStandardMaterial({ map: cloth, roughness: 0.8 }), sM = new T.MeshStandardMaterial({ map: strip, roughness: 0.8 });
    const ttop = new T.Mesh(new T.BoxGeometry(3.62, 0.36, 1.52), [sM, sM, cM, cM, sM, sM]); ttop.castShadow = ttop.receiveShadow = true; at(ttop, 0, 1.34, 1.1); g.add(ttop);
    g.add(box(3.5, 1.2, 1.4, mat("#7A5238", { r: 0.8 }), 0, 0.6, 1.15));
    for (const x of [-0.85, 0.85]) {
      const bowl = new T.Mesh(new T.LatheGeometry([new T.Vector2(0.0, 0), new T.Vector2(0.18, 0.02), new T.Vector2(0.3, 0.12), new T.Vector2(0.34, 0.24)], 32), mat("#FFFDF8", { r: 0.3, side: T.DoubleSide })); at(bowl, x, 1.5, 1.35); bowl.castShadow = true; g.add(bowl);
      const soup = new T.Mesh(new T.CircleGeometry(0.31, 32), mat("#C99A6A", { r: 0.3 })); soup.rotation.x = -Math.PI / 2; at(soup, x, 1.71, 1.35); g.add(soup);
      for (let k = 0; k < 3; k++) { const ball = sph(0.08, mat("#8A6A4E", { r: 0.6 })); at(ball, x - 0.1 + k * 0.1, 1.74, 1.33 + (k % 2) * 0.08); g.add(ball); }
      for (let k = 0; k < 3; k++) { const st = new T.Mesh(new T.PlaneGeometry(0.3, 0.45), new T.MeshBasicMaterial({ map: PUFF, transparent: true, opacity: 0.35, depthWrite: false })); g.add(st); const ph0 = k / 3; g.userData.anim.push((t) => { const p = ((t * 0.45 + ph0) % 1); st.position.set(x - 0.08 + k * 0.08 + Math.sin(t * 2 + k) * 0.05, 1.85 + p * 0.9, 1.35); st.material.opacity = 0.35 * Math.sin(p * Math.PI); st.scale.set(1 + p, 1 + p * 0.5, 1); }); }
    }
    for (const x of [-0.85, 0.85]) g.add(cyl(0.3, 0.26, 0.9, mat("#3D7DC8", { r: 0.6 }), x, 0.45, 0.0));
    return g;
  }
  function makeTitle() {
    const g = new T.Group(); const bg = new T.Mesh(new T.PlaneGeometry(30, 20), mat("#F2B32E", { r: 0.9 })); at(bg, 0, 5, -4); bg.receiveShadow = true; g.add(bg);
    const fl = new T.Mesh(new T.PlaneGeometry(30, 30), mat("#E9A529", { r: 0.9 })); fl.rotation.x = -Math.PI / 2; fl.receiveShadow = true; g.add(fl);
    g.add(cyl(0.9, 1.0, 0.8, mat("#FBF3E4", { r: 0.6 }), 0, 0.4, 0, 48));
    const bag = makeBag(2.2); at(bag, 0, 1.55, 0); g.add(bag); g.userData.bag = bag;
    return g;
  }

  // ---------- gaya ref1: ruang minimal gelap-hangat + lampu gantung ----------
  function planksTex(col, rep = 7) { const t = canvasTex(256, 256, (x, w, h) => { x.fillStyle = col; x.fillRect(0, 0, w, h); for (let i = 0; i < 4; i++) { x.fillStyle = i % 2 ? "rgba(0,0,0,.07)" : "rgba(255,255,255,.04)"; x.fillRect(i * 64, 0, 64, h); x.fillStyle = "rgba(0,0,0,.28)"; x.fillRect(i * 64, 0, 3, h); } }); t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(rep, 1); return t; }
  function skyTex(kind) {
    return canvasTex(256, 320, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h);
      if (kind === "dawn") { g.addColorStop(0, "#3B3F78"); g.addColorStop(0.6, "#B97A92"); g.addColorStop(1, "#F2B27E"); } else { g.addColorStop(0, "#141A3A"); g.addColorStop(1, "#2B3263"); }
      x.fillStyle = g; x.fillRect(0, 0, w, h);
      if (kind === "dawn") { x.fillStyle = "rgba(255,226,170,.9)"; x.beginPath(); x.arc(170, 300, 40, 0, 7); x.fill(); return; }
      x.fillStyle = "#F4ECD0"; x.beginPath(); x.arc(150, 100, 38, 0, 7); x.fill(); x.fillStyle = "#1A2147"; x.beginPath(); x.arc(168, 88, 34, 0, 7); x.fill();
      x.fillStyle = "rgba(255,255,255,.85)"; [[40, 60], [90, 180], [200, 230], [60, 260], [220, 40], [120, 290], [30, 150]].forEach(([a, b]) => { x.beginPath(); x.arc(a, b, 2.5, 0, 7); x.fill(); }); });
  }
  let HALO = null;
  function addPendant(g, x, y, z, o = {}) {
    HALO ??= canvasTex(128, 128, (c, w, h) => { const gr = c.createRadialGradient(64, 64, 4, 64, 64, 64); gr.addColorStop(0, "rgba(255,214,150,.9)"); gr.addColorStop(0.35, "rgba(255,190,120,.25)"); gr.addColorStop(1, "rgba(255,190,120,0)"); c.fillStyle = gr; c.fillRect(0, 0, w, h); });
    const cord = new T.Mesh(new T.CylinderGeometry(0.012, 0.012, 2.4, 8), mat("#1A1420")); at(cord, x, y + 1.22, z); g.add(cord);
    const bulb = new T.Mesh(new T.SphereGeometry(0.13, 24, 16), new T.MeshBasicMaterial({ color: "#FFF1CF" })); at(bulb, x, y, z); g.add(bulb);
    const halo = new T.Sprite(new T.SpriteMaterial({ map: HALO, transparent: true, depthWrite: false, blending: T.AdditiveBlending })); halo.scale.set(1.6, 1.6, 1); at(halo, x, y, z); g.add(halo);
    const l = new T.PointLight(o.color ?? "#FFB870", o.power ?? 2.4, 9, 2); at(l, x, y, z); g.add(l); (g.userData.lamps ??= []).push(l); return l;
  }
  function makeRoomRef1(o = {}) {
    const g = new T.Group(); g.userData.anim = [];
    const wm = o.planks ? new T.MeshStandardMaterial({ map: planksTex(o.planks, 8), roughness: 0.95 }) : mat(o.wall ?? "#3A3352", { r: 0.95 });
    const wall = new T.Mesh(new T.PlaneGeometry(16, 10), wm); at(wall, 0, 5, -2.6); wall.receiveShadow = true; g.add(wall);
    const fl = new T.Mesh(new T.PlaneGeometry(16, 12), mat(o.floor ?? "#3B2A2A", { r: 0.9 })); fl.rotation.x = -Math.PI / 2; fl.receiveShadow = true; g.add(fl);
    if (o.window) {
      const wx = o.winX ?? 1.45, win = new T.Mesh(new T.PlaneGeometry(1.5, 1.9), new T.MeshBasicMaterial({ map: skyTex(o.window) })); at(win, wx, 3.55, -2.58); g.add(win);
      const wd = mat("#5A3E2E", { r: 0.7 }); const bar = (w, h, x, y) => g.add(box(w, h, 0.1, wd, x, y, -2.53));
      bar(1.7, 0.1, wx, 4.5); bar(1.7, 0.1, wx, 2.6); bar(0.1, 2.0, wx - 0.8, 3.55); bar(0.1, 2.0, wx + 0.8, 3.55); bar(0.06, 1.9, wx, 3.55); bar(1.5, 0.06, wx, 3.55);
    }
    if (o.lamp !== false) addPendant(g, o.lampX ?? -1.25, 4.38, -0.6, { power: o.lampPower });
    if (o.bed) { const bx = o.bed; g.add(box(2.3, 0.45, 1.7, mat("#4A3426", { r: 0.8 }), bx, 0.22, -1.3)); g.add(box(2.2, 0.28, 1.6, mat("#E9E2D6", { r: 0.9 }), bx, 0.6, -1.3));
      g.add(box(1.5, 0.1, 1.64, mat("#2F7F86", { r: 0.9 }), bx + 0.35, 0.78, -1.3)); const pl = sph(0.3, mat("#F4EEE4", { r: 0.9 }), 1.6, 0.5, 1); at(pl, bx - 0.75, 0.86, -1.6); g.add(pl); }
    if (o.bag) { const b = makeBag(0.75); at(b, o.bag[0], o.bag[1], -2.4); g.add(b); }
    if (o.frame) { g.add(box(0.9, 1.1, 0.06, mat("#2A2230", { r: 0.7 }), o.frame[0], o.frame[1], -2.55)); g.add(box(0.74, 0.94, 0.02, mat(o.frame[2] ?? "#C9A27A", { r: 0.9 }), o.frame[0], o.frame[1], -2.51)); }
    return g;
  }

  window.AP3D = { makeRoomRef1, addPendant, makeChar, makeKos, makeKitchen, makeOffice, makeRakaRoom, makeWarung, makeTitle, makeBag, makePhone, makeLights, makeRenderer, canvasTex, EXPR, SPEC };
})();
