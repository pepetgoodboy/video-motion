// Post-processing gaya ref3 tanpa modul tambahan: glow (bloom), blur kedalaman (DOF), grading hangat,
// vignette, tone mapping ACES + sRGB, lalu FXAA. AP3D.makePost(renderer, W, H) → post.render(scene, cam, o)
// o = { focus (jarak fokus), range (zona tajam), dof (kekuatan blur), bloom, threshold, exposure, warm, vig }
(function () {
  const T = THREE;
  const VS = "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }";
  const mat = (fs, uniforms) => new T.ShaderMaterial({ vertexShader: VS, fragmentShader: fs, uniforms, depthTest: false, depthWrite: false });
  const LUMA = "float luma(vec3 c){ return dot(c, vec3(0.2126, 0.7152, 0.0722)); }";
  const BRIGHT = `uniform sampler2D t; uniform float th; varying vec2 vUv; ${LUMA}
    void main(){ vec3 c = texture2D(t, vUv).rgb; gl_FragColor = vec4(c * smoothstep(th, th + 0.6, luma(c)), 1.0); }`;
  const COPY = "uniform sampler2D t; varying vec2 vUv; void main(){ gl_FragColor = vec4(texture2D(t, vUv).rgb, 1.0); }";
  const BLUR = `uniform sampler2D t; uniform vec2 dir; varying vec2 vUv;
    void main(){ vec3 c = texture2D(t, vUv).rgb * 0.2270;
      c += (texture2D(t, vUv + dir * 1.3846).rgb + texture2D(t, vUv - dir * 1.3846).rgb) * 0.3162;
      c += (texture2D(t, vUv + dir * 3.2308).rgb + texture2D(t, vUv - dir * 3.2308).rgb) * 0.0703;
      gl_FragColor = vec4(c, 1.0); }`;
  const COMP = `uniform sampler2D tS; uniform sampler2D tD; uniform sampler2D tB; uniform sampler2D tF;
    uniform float near, far, focus, range, dof, bloom, exposure, warm, vig; varying vec2 vUv;
    vec3 aces(vec3 x){ return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }
    void main(){
      float d = texture2D(tD, vUv).x; float z = (near * far) / (far - d * (far - near));
      float df = z - focus; float coc = clamp((abs(df) - range) * (df < 0.0 ? dof * 1.6 : dof), 0.0, 1.0);
      vec3 c = mix(texture2D(tS, vUv).rgb, texture2D(tF, vUv).rgb, coc);
      c += texture2D(tB, vUv).rgb * bloom;
      c = aces(c * exposure);
      c = pow(c, vec3(1.0 / 2.2));
      c *= mix(vec3(1.0), vec3(1.06, 1.0, 0.9), warm); c += vec3(0.025, 0.012, 0.0) * warm;
      float g = dot(c, vec3(0.299, 0.587, 0.114)); c = mix(vec3(g), c, 1.0 + 0.1 * warm);
      vec2 q = vUv - 0.5; c *= 1.0 - vig * smoothstep(0.35, 0.85, length(q * vec2(1.0, 0.75)));
      gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0); }`;
  const FXAA = `uniform sampler2D t; uniform vec2 px; varying vec2 vUv; ${LUMA}
    void main(){
      vec3 rgbM = texture2D(t, vUv).rgb;
      float lNW = luma(texture2D(t, vUv + vec2(-1.0, -1.0) * px).rgb), lNE = luma(texture2D(t, vUv + vec2(1.0, -1.0) * px).rgb);
      float lSW = luma(texture2D(t, vUv + vec2(-1.0, 1.0) * px).rgb), lSE = luma(texture2D(t, vUv + vec2(1.0, 1.0) * px).rgb), lM = luma(rgbM);
      float lMin = min(lM, min(min(lNW, lNE), min(lSW, lSE))), lMax = max(lM, max(max(lNW, lNE), max(lSW, lSE)));
      vec2 dir = vec2(-((lNW + lNE) - (lSW + lSE)), (lNW + lSW) - (lNE + lSE));
      float red = max((lNW + lNE + lSW + lSE) * 0.03125, 0.0078125), rcp = 1.0 / (min(abs(dir.x), abs(dir.y)) + red);
      dir = clamp(dir * rcp, vec2(-8.0), vec2(8.0)) * px;
      vec3 a = 0.5 * (texture2D(t, vUv + dir * (1.0 / 3.0 - 0.5)).rgb + texture2D(t, vUv + dir * (2.0 / 3.0 - 0.5)).rgb);
      vec3 b = a * 0.5 + 0.25 * (texture2D(t, vUv - dir * 0.5).rgb + texture2D(t, vUv + dir * 0.5).rgb);
      float lB = luma(b); gl_FragColor = vec4((lB < lMin || lB > lMax) ? a : b, 1.0); }`;

  function makePost(R, W, H) {
    const rt = (w, h, depth, type = T.HalfFloatType) => { const r = new T.WebGLRenderTarget(w, h, { type, minFilter: T.LinearFilter, magFilter: T.LinearFilter });
      if (depth) { r.depthTexture = new T.DepthTexture(w, h); r.depthTexture.type = T.UnsignedIntType; } return r; };
    const S = rt(W, H, true), h1 = rt(W / 2, H / 2), h2 = rt(W / 2, H / 2), q1 = rt(W / 4, H / 4), q2 = rt(W / 4, H / 4), O = rt(W, H, false, T.UnsignedByteType);
    const quad = new T.Mesh(new T.PlaneGeometry(2, 2)), qs = new T.Scene(), qc = new T.OrthographicCamera(-1, 1, 1, -1, 0, 1); quad.frustumCulled = false; qs.add(quad);
    const mB = mat(BRIGHT, { t: { value: null }, th: { value: 1 } }), mC = mat(COPY, { t: { value: null } }), mBl = mat(BLUR, { t: { value: null }, dir: { value: new T.Vector2() } });
    const mX = mat(COMP, { tS: { value: S.texture }, tD: { value: S.depthTexture }, tB: { value: h1.texture }, tF: { value: q1.texture }, near: { value: 0.1 }, far: { value: 120 },
      focus: { value: 6 }, range: { value: 0.6 }, dof: { value: 0.35 }, bloom: { value: 0.5 }, exposure: { value: 1 }, warm: { value: 1 }, vig: { value: 0.35 } });
    const mF = mat(FXAA, { t: { value: O.texture }, px: { value: new T.Vector2(1 / W, 1 / H) } });
    const pass = (m, target) => { quad.material = m; R.setRenderTarget(target); R.render(qs, qc); };
    const blur = (a, b, w, h, k = 1) => { mBl.uniforms.t.value = a.texture; mBl.uniforms.dir.value.set(k / w, 0); pass(mBl, b); mBl.uniforms.t.value = b.texture; mBl.uniforms.dir.value.set(0, k / h); pass(mBl, a); };
    return {
      render(scene, cam, o = {}) {
        const tm = R.toneMapping, enc = R.outputEncoding, sc = R.getScissorTest();
        R.setScissorTest(false); R.toneMapping = T.NoToneMapping; R.outputEncoding = T.LinearEncoding;
        R.setRenderTarget(S); R.clear(); R.render(scene, cam);
        mB.uniforms.t.value = S.texture; mB.uniforms.th.value = o.threshold ?? 1.0; pass(mB, h1); blur(h1, h2, W / 2, H / 2, 1.5); blur(h1, h2, W / 2, H / 2, 3);
        mC.uniforms.t.value = S.texture; pass(mC, q1); blur(q1, q2, W / 4, H / 4, 1.2);
        const u = mX.uniforms; u.near.value = cam.near; u.far.value = cam.far; u.focus.value = o.focus ?? 6; u.range.value = o.range ?? 0.6; u.dof.value = o.dof ?? 0.35;
        u.bloom.value = o.bloom ?? 0.5; u.exposure.value = o.exposure ?? 1; u.warm.value = o.warm ?? 1; u.vig.value = o.vig ?? 0.35;
        pass(mX, O);
        R.toneMapping = tm; R.outputEncoding = enc; R.setRenderTarget(null); R.setViewport(0, 0, W, H); quad.material = mF; R.render(qs, qc); R.setScissorTest(sc);
      },
    };
  }
  window.AP3D.makePost = makePost;
})();
