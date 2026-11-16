// CONTOH /video-komentar (kanal persib) — build tes 01 yang lolos QA (15 Nov 2026, 11 s).
// Salin ke videos/<slug>/build.mjs lalu ganti: WORDS (transkrip terkoreksi), SEG/TH (sisipan vs talking head),
// isi sisipan I1..I3, judul hook, badge penutup, SFX. Panduan: .claude/skills/video-komentar/SKILL.md.

// Tes pertama /video-komentar (kanal persib): rekaman bicara bebas 11 s + sisipan kolase gaya referensi
// (grid gelap, lingkaran sinar, logo pop, judul kuning bercahaya, foto hitam-putih bertepi sobek, cap merah)
// + caption satu kata. node build.mjs → index.html, lalu perlakuan foto lewat `hyperframes media-treatment`.
import { writeFileSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const K = JSON.parse(readFileSync("../../kanal/persib/kanal.json", "utf8"));
const D = 11.0;
const C = { bg: "#14151C", grid: "#2A2D3A", biru: "#1F4FD8", kuning: "#FFD43B", merah: "#E0303A", putih: "#FFFFFF" };
// kata + waktu (Whisper), ejaan dikoreksi manual: persih persocian→PERSIB VS SHAN, Shopikak→SHOPEE CUP, Amis→KAMIS
const WORDS = [["YAUDAH", 0.02], ["JANGAN", 0.56], ["LUPA", 0.99], ["SAKSIKAN", 1.26], ["PERSIB", 1.83], ["VS", 2.25], ["SHAN", 2.55], ["UNITED", 2.88],
  ["DI", 3.49], ["GBLA", 3.83], ["UNTUK", 4.73], ["SPECIAL", 5.32], ["MATCH", 6.10], ["SHOPEE", 6.76], ["CUP", 7.25], ["DI", 7.73], ["HARI", 7.84],
  ["KAMIS", 8.41], ["MALAM", 9.02], ["HARI", 9.43], ["LANGSUNG", 9.59], ["AJA", 10.11], ["KITA", 10.31], ["NONTON", 10.57]];
const f2 = (n) => (+n).toFixed(2);
// segmen: talking head (TH) vs sisipan (I1..I3)
const SEG = { I1: [1.8, 3.45], I2: [3.45, 4.7], I3: [5.3, 8.9] }; // I3 sampai 8,9: cap KAMIS (8,41) harus terlihat utuh
const TH = [[0, 1.8], [4.7, 5.3], [8.9, D]];

const sun = (id, col, size, x, y) => `<div id="${id}" class="sun" style="left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;background:repeating-conic-gradient(${col} 0deg 5deg,transparent 5deg 15deg);filter:drop-shadow(0 0 22px ${col});opacity:0"></div>`;
const glow = (id, txt, size, y, extra = "") => `<div id="${id}" class="glow" style="top:${y}px;font-size:${size}px;${extra}">${[...txt].map((c, i) => `<span id="${id}c${i}" style="display:inline-block">${c === " " ? "&nbsp;" : c}</span>`).join("")}</div>`;
const caps = WORDS.map(([w, t], i) => `<div id="w${i}" class="cap">${w}</div>`).join("");

const html = `<!doctype html><html lang="id" data-resolution="portrait"><head><meta charset="utf-8"><meta name="viewport" content="width=1080,height=1920">
<script src="./assets/vendor/gsap.min.js"></script>
<style>
@font-face{font-family:Archivo;src:url('./assets/fonts/archivo-var-latin.woff2') format('woff2');font-weight:100 900;font-stretch:62% 125%}
@font-face{font-family:Nunito;src:url('./assets/fonts/nunito-var-latin.woff2') format('woff2');font-weight:200 1000}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1920px;overflow:hidden;background:${C.bg}}
#root{position:relative;width:1080px;height:1920px;overflow:hidden;background:${C.bg}}
#thw{position:absolute;inset:0;overflow:hidden}#pv{position:absolute;left:0;top:0;width:1080px;height:1920px;object-fit:cover}
.ins{position:absolute;inset:0;overflow:hidden;opacity:0;background-color:${C.bg};background-image:linear-gradient(${C.grid} 2px,transparent 2px),linear-gradient(90deg,${C.grid} 2px,transparent 2px);background-size:90px 90px}
.sun{position:absolute;border-radius:50%;-webkit-mask:radial-gradient(circle,transparent 18%,#000 19%,#000 68%,transparent 69%);mask:radial-gradient(circle,transparent 18%,#000 19%,#000 68%,transparent 69%)}
.glow{position:absolute;left:0;right:0;text-align:center;font-family:Archivo,sans-serif;font-weight:900;font-stretch:75%;color:${C.kuning};line-height:1;letter-spacing:2px;text-shadow:0 0 18px rgba(255,212,59,.85),0 0 42px rgba(255,170,0,.55),0 6px 0 rgba(0,0,0,.6)}
.logo{position:absolute;object-fit:contain;filter:drop-shadow(0 18px 24px rgba(0,0,0,.55));opacity:0}
.cap{position:absolute;left:0;right:0;top:1360px;text-align:center;font-family:Archivo,sans-serif;font-weight:800;font-stretch:80%;font-size:84px;color:#fff;letter-spacing:2px;text-shadow:0 5px 0 rgba(0,0,0,.65),0 0 20px rgba(0,0,0,.5);opacity:0}
.lbl{position:absolute;font-family:Archivo,sans-serif;font-weight:800;font-stretch:90%;letter-spacing:3px}
.plat{display:inline-block;background:${C.merah};color:#fff;padding:0 18px;border-radius:6px;transform:rotate(-2deg)}
#paper{position:absolute;left:40px;top:470px;width:1000px;height:760px;background:#F1EDE4;clip-path:polygon(0% 3%,6% 0%,13% 2%,21% 0%,30% 3%,39% 0%,47% 2%,56% 0%,64% 3%,73% 0%,82% 2%,90% 0%,100% 3%,98% 12%,100% 24%,98% 37%,100% 50%,98% 63%,100% 76%,98% 88%,100% 97%,92% 100%,83% 97%,74% 100%,65% 97%,56% 100%,47% 97%,38% 100%,29% 97%,20% 100%,11% 97%,3% 100%,0% 92%,2% 80%,0% 67%,2% 54%,0% 41%,2% 28%,0% 15%);transform:rotate(-3deg);opacity:0}


#stamp{position:absolute;left:0;right:0;top:1000px;text-align:center;opacity:0}
#stamp span{display:inline-block;font-family:Archivo,sans-serif;font-weight:900;font-stretch:80%;font-size:150px;color:#fff;background:${C.merah};padding:6px 34px;border-radius:10px;border:8px solid #fff;transform:rotate(-7deg);box-shadow:0 14px 30px rgba(0,0,0,.5)}
</style></head><body>
<div id="root" data-composition-id="main" data-width="1080" data-height="1920" data-duration="${D}" data-fx-chain='{"version":1,"nodes":[{"id":"master-truepeak","type":"truepeak","label":"Master ceiling -2 dBTP","params":{"ceiling":-2}}]}'>
<hf-audio-group id="voiceover"></hf-audio-group><hf-audio-group id="sfx"></hf-audio-group>
<div id="thw"><video id="pv" class="clip" src="assets/presenter/pv.mp4" data-start="0" data-duration="${D}" data-track-index="0" muted playsinline></video></div>
<div id="hook" class="clip" data-start="0" data-duration="1.8" data-track-index="1" style="position:absolute;inset:0">
 <div style="position:absolute;left:0;right:0;top:240px;height:330px;background:linear-gradient(rgba(10,10,16,.0),rgba(10,10,16,.72) 22%,rgba(10,10,16,.72) 78%,rgba(10,10,16,0))"></div>
 <div id="hl" class="lbl" style="left:0;right:0;top:268px;text-align:center;font-size:36px;color:${C.kuning}">SPECIAL MATCH · SHOPEE CUP</div>
 <div id="h1" class="glow" style="top:322px;font-size:120px;color:#fff;text-shadow:0 6px 0 rgba(0,0,0,.6)">PERSIB</div>
 <div id="h2" class="glow" style="top:440px;font-size:104px"><span class="plat">VS</span> SHAN UNITED</div>
</div>
<div id="i1" class="ins clip" data-start="${SEG.I1[0]}" data-duration="${f2(SEG.I1[1] - SEG.I1[0])}" data-track-index="2">
 ${sun("s1a", C.biru, 620, 330, 600)}${sun("s1b", C.merah, 560, 750, 1080)}
 <img id="lgP" class="logo" src="assets/aset/persib.png" style="left:150px;top:420px;width:360px;height:360px">
 <img id="lgS" class="logo" src="assets/aset/shan-united.png" style="left:590px;top:920px;width:320px;height:320px">
 ${glow("vs", "VS", 200, 760)}
</div>
<div id="i2" class="ins clip" data-start="${SEG.I2[0]}" data-duration="${f2(SEG.I2[1] - SEG.I2[0])}" data-track-index="3">
 ${sun("s2", C.biru, 900, 540, 860)}
 <div id="paper"></div>
 <img id="gbla" src="assets/aset/gbla-bw.png" style="position:absolute;left:100px;top:530px;width:880px;height:640px;object-fit:cover;transform:rotate(-3deg)">
 ${glow("gt", "GBLA", 210, 250)}
 <div id="gl2" class="lbl" style="left:0;right:0;top:1250px;text-align:center;font-size:40px;color:#fff;opacity:0">GELORA BANDUNG LAUTAN API</div>
</div>
<div id="i3" class="ins clip" data-start="${SEG.I3[0]}" data-duration="${f2(SEG.I3[1] - SEG.I3[0])}" data-track-index="4">
 <img id="gblaHt" src="assets/aset/gbla-halftone.png" style="position:absolute;left:-140px;top:420px;width:1360px;height:1020px;object-fit:cover">
 <div style="position:absolute;inset:0;background:rgba(20,21,28,.62)"></div>
 ${sun("s3", C.biru, 760, 540, 800)}
 <div id="plC" style="position:absolute;left:330px;top:580px;width:420px;height:420px;border-radius:50%;background:#FFFDF8;box-shadow:0 18px 30px rgba(0,0,0,.45);opacity:0"></div>
 ${glow("sm", "SPECIAL MATCH", 112, 260)}
 <img id="lgC" class="logo" src="assets/aset/shopee-cup.png" style="left:410px;top:600px;width:260px;height:347px">
 <div id="stamp"><span>KAMIS</span></div>
</div>
<div id="end" class="clip" data-start="8.9" data-duration="${f2(D - 8.9)}" data-track-index="5" style="position:absolute;inset:0">
 <div id="eb" style="position:absolute;left:72px;top:262px;display:flex;align-items:center;gap:18px;padding:14px 24px 14px 14px;border-radius:18px;background:rgba(10,10,16,.78);opacity:0"><img src="assets/aset/persib-badge.png" style="width:86px;height:86px;object-fit:contain"><div class="lbl" style="position:static;font-size:40px;color:#fff">KAMIS MALAM<br><span style="color:${C.kuning}">GBLA</span></div></div>
</div>
<div id="caps" class="clip" data-start="0" data-duration="${D}" data-track-index="6" style="position:absolute;inset:0">${caps}</div>
<audio id="vo" data-audio-group="voiceover" src="assets/audio/clean.wav" data-start="0" data-duration="${D}" data-track-index="200" data-volume="1"></audio>
${[[SEG.I1[0], "whoosh", 0.35], [1.83, "pop", 0.4], [2.25, "pop", 0.3], [2.88, "pop", 0.4], [SEG.I2[0], "whoosh", 0.3], [3.83, "tap", 0.35], [SEG.I3[0], "whoosh", 0.3], [6.76, "pop", 0.4], [8.41, "thunk", 0.5], [8.9, "whoosh", 0.25]]
  .map(([t, n, v], i) => `<audio id="sfx${i}" data-audio-group="sfx" src="assets/sfx/${n}.mp3" data-start="${t}" data-duration="0.6" data-track-index="${300 + i}" data-volume="${v}"></audio>`).join("\n")}
</div>
<script>
window.__timelines=window.__timelines||{};(function(){const tl=gsap.timeline({paused:true});const $=s=>document.querySelector(s);
// talking head: punch-in pelan per segmen (maks 1,08 — lebih dari itu gambar 1080p mulai buram)
${TH.map(([a, b], i) => `tl.fromTo('#thw',{scale:${[1.0, 1.05, 1.03][i]}},{scale:${[1.04, 1.08, 1.07][i]},duration:${f2(b - a)},ease:'none',immediateRender:false},${a});`).join("")}
gsap.set('#thw',{transformOrigin:'50% 40%'});
// judul hook
gsap.set(['#hl','#h1','#h2'],{opacity:0});tl.fromTo('#hl',{opacity:0,y:-20},{opacity:1,y:0,duration:.25,immediateRender:false},.05);
tl.fromTo('#h1',{opacity:0,scale:1.4},{opacity:1,scale:1,duration:.3,ease:'back.out(1.6)',immediateRender:false},.12);
tl.fromTo('#h2',{opacity:0,x:-60},{opacity:1,x:0,duration:.3,ease:'power3.out',immediateRender:false},.35);
// sisipan muncul/hilang
${Object.entries(SEG).map(([k, [a, b]]) => `tl.fromTo('#${k.toLowerCase()}',{opacity:0},{opacity:1,duration:.12,immediateRender:false},${a});tl.to('#${k.toLowerCase()}',{opacity:0,duration:.1},${f2(b - 0.1)});`).join("")}
const sunIn=(s,t)=>{tl.fromTo(s,{opacity:0,scale:.3,rotation:0},{opacity:1,scale:1,duration:.35,ease:'back.out(1.5)',immediateRender:false},t);tl.to(s,{rotation:40,duration:3,ease:'none'},t)};
const logo=(s,t,r)=>{tl.fromTo(s,{opacity:0,scale:.2,rotation:r},{opacity:1,scale:1,rotation:0,duration:.4,ease:'back.out(1.8)',immediateRender:false},t)};
const glowIn=(id,n,t)=>{for(let i=0;i<n;i++){tl.fromTo('#'+id+'c'+i,{opacity:0,y:-70,rotation:i%2?14:-14},{opacity:1,y:0,rotation:0,duration:.22,ease:'back.out(2.2)',immediateRender:false},t+i*.045)}};
sunIn('#s1a',1.8);sunIn('#s1b',2.85);logo('#lgP',1.83,-12);glowIn('vs',2,2.25);logo('#lgS',2.88,10);
tl.fromTo('#vs',{scale:1},{scale:1.08,duration:.3,yoyo:true,repeat:3,ease:'sine.inOut',immediateRender:false},2.6);
sunIn('#s2',3.45);tl.fromTo('#paper',{opacity:0,scale:1.15,rotation:-8},{opacity:1,scale:1,rotation:-3,duration:.3,ease:'back.out(1.4)',immediateRender:false},3.47);
tl.fromTo('#gbla',{scale:1.0},{scale:1.06,duration:1.25,ease:'none',immediateRender:false},3.45);glowIn('gt',4,3.83);tl.fromTo('#gl2',{opacity:0,y:20},{opacity:1,y:0,duration:.25,immediateRender:false},4.0);
tl.fromTo('#gblaHt',{scale:1.0,x:0},{scale:1.1,x:-40,duration:3.6,ease:'none',immediateRender:false},5.3);
glowIn('sm',13,5.32);sunIn('#s3',6.7);tl.fromTo('#plC',{opacity:0,scale:.3},{opacity:1,scale:1,duration:.3,ease:'back.out(1.6)',immediateRender:false},6.72);logo('#lgC',6.76,-8);
tl.fromTo('#stamp',{opacity:0,scale:1.8},{opacity:1,scale:1,duration:.18,ease:'power3.in',immediateRender:false},8.41);
tl.fromTo('#eb',{opacity:0,x:-40},{opacity:1,x:0,duration:.3,ease:'power3.out',immediateRender:false},9.0);
// caption satu kata
const W=${JSON.stringify(WORDS)};W.forEach(([w,t],i)=>{const e=(W[i+1]?W[i+1][1]:${D})-.02;tl.set('#w'+i,{opacity:1},t);tl.fromTo('#w'+i,{scale:1.25},{scale:1,duration:.1,immediateRender:false},t);tl.set('#w'+i,{opacity:0},e)});
tl.to({},{duration:${D}},0);window.__timelines["main"]=tl;})();
</script></body></html>`;
writeFileSync("index.html", html);
// perlakuan foto (aturan proyek: lewat media-treatment, bukan filter CSS)
const T = (sel, g) => execFileSync("npx", ["--yes", "hyperframes@0.8.169", "media-treatment", "--project", ".", "--selector", sel, "--grading", JSON.stringify(g), "--apply", "--json"]).toString();
// Foto sisipan memakai versi yang DIPANGGANG lewat shader resmi (media-treatment di komposisi 1 gambar → snapshot):
// perlakuan runtime pada <img> di dalam sisipan tidak ikut ter-render di 0.8.169 (snapshot B/W, MP4 tetap berwarna — diuji).
// gbla-bw.png = saturation -1, contrast 0.3, blacks -0.12, whites 0.06 · gbla-halftone.png = Editorial Halftone 0.94/0.36.
void T;
// #gblaHt: halftone sudah "dipanggang" lewat shader resmi (Editorial Halftone) ke assets/aset/gbla-halftone.png —
// efek halftone pada <img> di dalam sisipan ini tidak dirender oleh 0.8.169 (diuji), dan gambar statis lebih ringan.
console.log("persib-test-01: index ok · durasi", D, "· kata", WORDS.length);
