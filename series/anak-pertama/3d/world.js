// Mesin episode 3D: membaca window.EP_PLAN, membangun set & tokoh, lalu WORLD.render(t) — fungsi murni waktu
// (deterministik, aman untuk seek HyperFrames). Dipanggil dari onUpdate timeline "main".
(function () {
  const T = THREE, A = AP3D, PLAN = window.EP_PLAN, W = 1080, H = 1920;
  const canvas = document.getElementById("gl");
  const R = new T.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  R.setPixelRatio(1); R.setSize(W, H, false); R.shadowMap.enabled = true; R.shadowMap.type = T.PCFSoftShadowMap;
  R.outputEncoding = T.sRGBEncoding; R.toneMapping = T.ACESFilmicToneMapping; R.toneMappingExposure = 0.95; R.autoClear = false;
  const scene = new T.Scene();
  const hemi = new T.HemisphereLight("#FFE9D0", "#B98A5A", 0.75); scene.add(hemi);
  const key = new T.DirectionalLight("#FFC992", 1.5); key.castShadow = true; key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -6, right: 6, top: 7, bottom: -2, near: 0.5, far: 30 }); key.shadow.radius = 4; key.shadow.bias = -0.0005;
  scene.add(key); scene.add(key.target);
  const fill = new T.DirectionalLight("#B9D3FF", 0.35); scene.add(fill); scene.add(fill.target);
  const rim = new T.DirectionalLight("#FFD9A8", 0.6); scene.add(rim); scene.add(rim.target);
  const LIGHT = {
    kosDay: { bg: "#EEC7A4", hemi: ["#FFE9D0", "#B98A5A", 0.75], key: ["#FFC992", 1.5], fill: 0.35, rim: 0.6 },
    kosDusk: { bg: "#D9B08F", hemi: ["#9FA8D8", "#5A3E2E", 0.5], key: ["#BFCBFF", 0.5], fill: 0.25, rim: 0.4 },
    kitchen: { bg: "#CFE3E0", hemi: ["#FFF1DE", "#A07A5A", 0.85], key: ["#FFE0B8", 1.2], fill: 0.35, rim: 0.5 },
    office: { bg: "#D6E8E6", hemi: ["#F2F7FF", "#9AA6A4", 0.9], key: ["#FFF3E0", 1.2], fill: 0.4, rim: 0.4 },
    raka: { bg: "#C9D6E8", hemi: ["#EAF0FF", "#7A5E4A", 0.8], key: ["#FFE7C4", 1.1], fill: 0.4, rim: 0.5 },
    warung: { bg: "#151B33", hemi: ["#8A92C8", "#3A2A30", 0.62], key: ["#FFC890", 1.2], fill: 0.4, rim: 0.7 },
    title: { bg: "#F2B32E", hemi: ["#FFF3D6", "#C98A2E", 0.9], key: ["#FFE8C0", 1.3], fill: 0.4, rim: 0.6 },
  };
  Object.assign(LIGHT, PLAN.light ?? {}); // preset cahaya per episode (opsional)
  const SETS = {}, OFF = PLAN.offsets;
  const mk = { kosDay: (o) => A.makeKos({ dusk: false, ...o }), kosDusk: (o) => A.makeKos({ dusk: true, ...o }), kitchen: (o) => A.makeKitchen(o), office: (o) => A.makeOffice(o),
    raka: (o) => A.makeRakaRoom(o), warung: (o) => A.makeWarung(o), title: (o) => A.makeTitle(o), room: (o) => A.makeRoomRef1(o),
    roomSun: (o) => A.makeRoomSun(o), warungBlok: (o) => { const g = A.makeWarung(o); A.outline(g, 0.012, (m) => m.geometry.type === "PlaneGeometry"); return g; } };
  // PLAN.sets (opsional): { nama: { type: "room"|"kitchen"|…, o: {…} } } — tanpa itu, nama = tipe (episode lama)
  for (const k of Object.keys(OFF)) { const sp = PLAN.sets?.[k] ?? { type: k }; SETS[k] = mk[sp.type](sp.o ?? {}); SETS[k].position.x = OFF[k]; scene.add(SETS[k]); }

  // ---------- tokoh ----------
  const CH = {};
  for (const [id, spec] of Object.entries(PLAN.chars)) {
    const c = (PLAN.charMaker === "blok" ? A.makeCharBlok : A.makeChar)(spec.key, PLAN.charOpt ?? {}); CH[id] = c; SETS[spec.set].add(c.root);
    if (PLAN.matte) c.root.traverse((o) => { if (o.isMesh && o.material?.roughness !== undefined) o.material.roughness = Math.max(o.material.roughness, PLAN.matte); });
    if (spec.key === "dinda" || PLAN.charMaker === "blok") { const ph = A.makePhone(PLAN.phoneScreen); ph.position.set(0, -0.42, 0.1); ph.rotation.set(-0.5, 0, 0); c.parts.elbowL.add(ph); c.phone = ph; ph.visible = false;
      if (PLAN.phoneGlow) { const gl = new T.PointLight("#CFE3FF", PLAN.phoneGlow, 1.6, 2); gl.position.set(0, 0.05, 0.25); ph.add(gl); } }
  }
  const IDLE = { armL: [0, 0, 0.14], armR: [0, 0, -0.14], elbowL: [0, 0, 0], elbowR: [0, 0, 0], hipL: [0, 0, 0], hipR: [0, 0, 0], kneeL: [0, 0, 0], kneeR: [0, 0, 0] };
  const POSE = {
    idle: {}, phone: { armL: [-0.9, 0, 0.35], elbowL: [-1.35, 0, 0] }, phoneLow: { armL: [-0.55, 0, 0.3], elbowL: [-1.25, 0, 0] },
    shrug: { armL: [-0.3, 0, 1.0], elbowL: [-0.9, 0, 0], armR: [-0.3, 0, -1.0], elbowR: [-0.9, 0, 0] },
    salute: { armR: [-2.55, 0, -0.45], elbowR: [-1.85, 0, 0] }, wave: { armR: [-0.2, 0, -2.65], elbowR: [-0.45, 0, 0] },
    handNo: { armL: [-1.3, 0, 0.3], elbowL: [-1.1, 0, 0] }, open: { armL: [-0.6, 0, 0.45], elbowL: [-0.9, 0, 0] },
    hands: { armL: [0, 0, 0.32], armR: [0, 0, -0.32] }, chin: { armR: [-1.7, 0, -0.2], elbowR: [-2.2, 0, 0] },
    sit: { hipL: [-1.45, 0, 0], hipR: [-1.45, 0, 0], kneeL: [1.45, 0, 0], kneeR: [1.45, 0, 0] },
    forward: { armL: [-0.25, 0, 0.2], elbowL: [-1.45, 0, 0], armR: [-0.25, 0, -0.2], elbowR: [-1.45, 0, 0] }, // gaya ref1: lengan bawah ke arah kamera
  };
  const J = Object.keys(IDLE);
  const poseVals = (name) => { const o = { ...IDLE }; for (const n of name.split("+")) Object.assign(o, POSE[n] ?? {}); return o; };
  const ss = (x) => x * x * (3 - 2 * x), clamp = (x) => Math.max(0, Math.min(1, x));
  const lerp = (a, b, f) => (Array.isArray(a) ? a.map((v, i) => v + (b[i] - v) * f) : a + (b - a) * f);
  // track: [[t, v], ...] — interpolasi smoothstep antar-kunci
  function tr(track, t, def) {
    if (!track || !track.length) return def;
    if (t <= track[0][0]) return track[0][1];
    for (let i = 1; i < track.length; i++) if (t < track[i][0]) { const [t0, a] = track[i - 1], [t1, b] = track[i]; return lerp(a, b, ss(clamp((t - t0) / Math.max(1e-6, t1 - t0)))); }
    return track[track.length - 1][1];
  }
  function poseAt(list, t) {
    if (!list || !list.length) return poseVals("idle");
    let i = -1; for (let k = 0; k < list.length; k++) if (list[k][0] <= t) i = k;
    if (i < 0) return poseVals(list[0][1]);
    const cur = poseVals(list[i][1]); if (i === 0) return cur;
    const prev = poseVals(list[i - 1][1]), f = ss(clamp((t - list[i][0]) / (list[i][2] ?? 0.35)));
    const o = {}; for (const j of J) o[j] = lerp(prev[j], cur[j], f); return o;
  }
  const lastExpr = {};
  function applyChar(id, st, lt, t) {
    const c = CH[id], P = c.parts;
    const pos = tr(st.pos, lt, [0, 0, 0]); c.root.position.set(pos[0], pos[1], pos[2]); c.root.rotation.y = tr(st.rotY, lt, 0);
    const pose = poseAt(st.poses, lt); let walking = false;
    for (const [a, b] of st.walk ?? []) if (lt >= a && lt <= b) walking = true;
    for (const j of J) if (P[j]) P[j].rotation.set(...pose[j]);
    if (walking) { const ph = Math.sin(lt * Math.PI * 4); if (P.hipL) { P.hipL.rotation.x = 0.45 * ph; P.hipR.rotation.x = -0.45 * ph; P.kneeL.rotation.x = Math.max(0, -ph) * 0.7; P.kneeR.rotation.x = Math.max(0, ph) * 0.7; } P.armL.rotation.x = -0.35 * ph; P.armR.rotation.x = 0.35 * ph; c.root.position.y += Math.abs(ph) * 0.05; }
    const posesNow = (st.poses ?? []).filter((p) => p[0] <= lt).map((p) => p[1]).pop() ?? "idle";
    if (posesNow.includes("wave")) P.armR.rotation.z += Math.sin(lt * Math.PI * 5) * 0.28;
    if (posesNow.includes("handNo")) P.armL.rotation.y = Math.sin(lt * Math.PI * 5) * 0.35;
    const hd = tr(st.head, lt, [0, 0, 0]); P.head.rotation.set(hd[0], hd[1], hd[2]);
    const gz = tr(st.gaze, lt, [0, 0]); if (c.setGaze) c.setGaze(gz); else if (P.pupils?.length) P.pupils.forEach((pu) => pu.position.set(gz[0], -0.005 + gz[1], 0.03)); // lirikan: x/y ±0.03
    P.torso.scale.y = 1 + 0.012 * Math.sin(t * 2.2 + id.length); P.head.position.y = 2.28 + 0.012 * Math.sin(t * 2.2 + id.length);
    // ekspresi
    let ex = "netral"; for (const [et, en] of st.expr ?? []) if (et <= lt) ex = en;
    if (lastExpr[id] !== ex) { c.setExpr(ex); lastExpr[id] = ex; }
    // mulut dari amplop VO (waktu absolut)
    let mv = null;
    for (const [s0, env] of PLAN.lines[id] ?? []) { const x = (t - s0) * 12; if (x >= 0 && x < env.length) { const i = Math.floor(x), f = x - i; mv = lerp(env[i], env[Math.min(env.length - 1, i + 1)], f) / 2; break; } }
    c.setMouth(mv === null ? (c.base?.o ?? 0) : 0.08 + mv * 0.85);
    // kedip
    let bl = 0; for (const bt of PLAN.blinks[id] ?? []) { const d = Math.abs(t - bt); if (d < 0.08) bl = Math.max(bl, 1 - d / 0.08); }
    c.blink(bl);
    c.updateFace?.(); // wajah dilukis (blok.js): gambar ulang kalau keadaan berubah
    if (c.phone) { const on = posesNow.includes("phone"); c.phone.visible = on; let sh = 0; for (const [a, b] of st.shake ?? []) if (lt >= a && lt <= b) sh = 0.025; c.phone.position.x = sh * Math.sin(t * 90); }
  }
  function lightFor(setName, cp, lk) {
    const L = LIGHT[setName], o = OFF[setName], kp = L.keyPos ?? [3.5, 6, 2.5];
    hemi.color.set(L.hemi[0]); hemi.groundColor.set(L.hemi[1]); hemi.intensity = L.hemi[2];
    key.color.set(L.key[0]); key.intensity = L.key[1]; key.position.set(o + kp[0], kp[1], kp[2]); key.target.position.set(o, 1, 0);
    // matahari lewat jendela (roomSun): posisi dari L.sunPos/sunTarget atau userData.sun set; bayangan lebih tegas
    const su = L.sun ? { pos: L.sunPos ?? SETS[setName].userData.sun.pos, target: L.sunTarget ?? SETS[setName].userData.sun.target } : null;
    if (su) { key.position.set(o + su.pos[0], su.pos[1], su.pos[2]); key.target.position.set(o + su.target[0], su.target[1], su.target[2]); key.shadow.radius = L.shadowSoft ?? 1.5;
      Object.assign(key.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 0.5, far: 40 }); } else { key.shadow.radius = 4; Object.assign(key.shadow.camera, { left: -6, right: 6, top: 7, bottom: -2, near: 0.5, far: 30 }); }
    key.shadow.camera.updateProjectionMatrix();
    // camFill: cahaya isi lembut dari arah kamera (wajah rata-lembut ala ref1); tanpa itu = fill samping lama
    if (L.camFill) { fill.color.set(L.camFillColor ?? "#FFE2C4"); fill.intensity = L.camFill; fill.position.set(cp.x, cp.y + 0.3, cp.z); fill.target.position.copy(lk); }
    else { fill.color.set("#B9D3FF"); fill.intensity = L.fill; fill.position.set(o - 4, 3, 5); fill.target.position.set(o, 1, 0); }
    rim.intensity = L.rim; rim.position.set(o - 2, 5, -5); rim.target.position.set(o, 1, 0);
    key.target.updateMatrixWorld(); fill.target.updateMatrixWorld(); rim.target.updateMatrixWorld();
  }
  const cam = new T.PerspectiveCamera(30, W / H, 0.1, 120);
  const POST = PLAN.post ? A.makePost(R, W, H) : null; // glow + blur kedalaman + grading (post.js)
  function render(t) {
    const S = PLAN.scenes.find((s) => t >= s.start && t < s.start + s.dur) ?? PLAN.scenes[PLAN.scenes.length - 1];
    const lt = t - S.start;
    for (const k of Object.keys(SETS)) { const sg = SETS[k]; for (const f of sg.userData.anim ?? []) f(t); }
    if (SETS.title?.userData.bag) { const b = SETS.title.userData.bag; b.rotation.y = t * 1.6; b.position.y = 1.55 + Math.abs(Math.sin(t * 3)) * 0.12; }
    for (const id of Object.keys(CH)) CH[id].root.visible = !!(S.chars && S.chars[id]);
    for (const [id, st] of Object.entries(S.chars ?? {})) applyChar(id, st, lt, t);
    const OFFICE = Object.values(SETS).find((g) => g.userData.walletLid); // set kantor apa pun namanya
    if (S.wallet && OFFICE) OFFICE.userData.walletLid.rotation.x = -tr(S.wallet, lt, 0) * 1.9;
    const moth = OFFICE?.userData.moth;
    if (moth) { const on = !!S.moth && lt >= S.moth[0][0] && lt <= S.moth[S.moth.length - 1][0]; moth.visible = on;
      if (on) { moth.position.set(...tr(S.moth, lt, [0, 0, 0])); const fl = 0.7 * Math.sin(t * 38); moth.userData.wl.rotation.z = fl; moth.userData.wr.rotation.z = -fl; } }
    if (S.lamp && SETS.kosDusk.userData.lamp) SETS.kosDusk.userData.lamp.intensity = tr(S.lamp, lt, 2.2);
    R.setScissorTest(false); R.setClearColor(S.clear ?? "#FBF3E4", 1); R.setViewport(0, 0, W, H); R.clear();
    // viewport kecil (rect) selalu digambar SETELAH shot layar penuh, supaya tidak tertimpa cut berikutnya
    for (const vp of [...S.views].sort((p, q) => (p.rect ? 1 : 0) - (q.rect ? 1 : 0))) {
      if (vp.from != null && lt < vp.from) continue;
      if (vp.to != null && lt >= vp.to) continue;
      for (const k of Object.keys(SETS)) SETS[k].visible = k === vp.set;
      const [x, y, w, h] = vp.rect ?? [0, 0, W, H], o = OFF[vp.set];
      const p = tr(vp.pos, lt, [0, 2, 8]), l = tr(vp.look, lt, [0, 1.6, 0]);
      cam.fov = tr(vp.fov, lt, 30); cam.aspect = w / h; cam.position.set(o + p[0], p[1], p[2]); cam.lookAt(o + l[0], l[1], l[2]); cam.updateProjectionMatrix();
      lightFor(vp.set, cam.position, new T.Vector3(o + l[0], l[1], l[2])); scene.background = new T.Color(LIGHT[vp.set].bg);
      if (POST && !vp.rect) { POST.render(scene, cam, { ...PLAN.post, ...(LIGHT[vp.set].post ?? {}), ...(vp.post ?? {}), focus: vp.focus ?? cam.position.distanceTo(new T.Vector3(o + l[0], l[1], l[2])) }); continue; }
      R.setViewport(x, H - y - h, w, h); R.setScissor(x, H - y - h, w, h); R.setScissorTest(true); R.clearDepth();
      R.render(scene, cam);
    }
  }
  window.WORLD = { render, CH, SETS };
})();
