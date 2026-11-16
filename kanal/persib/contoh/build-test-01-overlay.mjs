// CONTOH /video-komentar mode OVERLAY (kanal persib) — presenter tampil penuh sepanjang video, grafis jadi stiker
// di zona aman (atas kepala y 240–520, kiri/kanan kepala). Build tes 01-overlay (15 Nov 2026, 11 s).
// Panduan: .claude/skills/video-komentar/SKILL.md (Langkah 5, mode overlay).

// Tes 01 versi OVERLAY /video-komentar (kanal persib): presenter tampil PENUH sepanjang video, grafis kolase
// jadi stiker di zona aman (atas kepala y 240–520, kiri/kanan kepala) — wajah (x 330–660, y 650–1050) tidak ditutup.
// node build.mjs → index.html. Foto memakai versi yang sudah DIPANGGANG (gbla-bw.png, gbla-halftone.png).
import { writeFileSync } from "node:fs";

const D = 11.0;
const C = { bg: "#14151C", biru: "#1F4FD8", kuning: "#FFD43B", merah: "#E0303A", krem: "#FFFDF8" };
const WORDS = [["YAUDAH", 0.02], ["JANGAN", 0.56], ["LUPA", 0.99], ["SAKSIKAN", 1.26], ["PERSIB", 1.83], ["VS", 2.25], ["SHAN", 2.55], ["UNITED", 2.88],
  ["DI", 3.49], ["GBLA", 3.83], ["UNTUK", 4.73], ["SPECIAL", 5.32], ["MATCH", 6.10], ["SHOPEE", 6.76], ["CUP", 7.25], ["DI", 7.73], ["HARI", 7.84],
  ["KAMIS", 8.41], ["MALAM", 9.02], ["HARI", 9.43], ["LANGSUNG", 9.59], ["AJA", 10.11], ["KITA", 10.31], ["NONTON", 10.57]];
const f2 = (n) => (+n).toFixed(2);
const SEG = { I1: [1.8, 3.45], I2: [3.45, 4.7], I3: [5.3, 8.9] };
// zoom wrapper per segmen (maks 1,08): lompatan skala di batas segmen = rasa "jump cut" ala referensi
const ZOOM = [[0, 1.8, 1.0, 1.03], [1.8, 3.45, 1.05, 1.07], [3.45, 4.7, 1.02, 1.04], [4.7, 5.3, 1.06, 1.08], [5.3, 8.9, 1.0, 1.05], [8.9, D, 1.05, 1.08]];

const sun = (id, col, size, cx, cy) => `<div id="${id}" class="sun" style="left:${cx - size / 2}px;top:${cy - size / 2}px;width:${size}px;height:${size}px;background:repeating-conic-gradient(${col} 0deg 5deg,transparent 5deg 15deg);opacity:0"></div>`;
const plate = (id, size, cx, cy) => `<div id="${id}" class="plate" style="left:${cx - size / 2}px;top:${cy - size / 2}px;width:${size}px;height:${size}px;opacity:0"></div>`;
const logo = (id, src, w, h, cx, cy) => `<img id="${id}" class="logo" src="${src}" style="left:${cx - w / 2}px;top:${cy - h / 2}px;width:${w}px;height:${h}px">`;
const glow = (id, txt, size, y, extra = "") => `<div id="${id}" class="glow" style="top:${y}px;font-size:${size}px;${extra}">${[...txt].map((c, i) => `<span id="${id}c${i}" style="display:inline-block">${c === " " ? "&nbsp;" : c}</span>`).join("")}</div>`;
const TORN = "polygon(0% 4%,7% 0%,15% 3%,24% 0%,33% 4%,42% 0%,51% 3%,60% 0%,69% 4%,78% 0%,87% 3%,95% 0%,100% 5%,98% 30%,100% 55%,98% 80%,100% 96%,91% 100%,82% 96%,72% 100%,62% 96%,52% 100%,42% 96%,32% 100%,22% 96%,12% 100%,3% 96%,0% 88%,2% 62%,0% 38%,2% 14%)";

const html = `<!doctype html><html lang="id" data-resolution="portrait"><head><meta charset="utf-8"><meta name="viewport" content="width=1080,height=1920">
<script src="./assets/vendor/gsap.min.js"></script>
<style>
@font-face{font-family:Archivo;src:url('./assets/fonts/archivo-var-latin.woff2') format('woff2');font-weight:100 900;font-stretch:62% 125%}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1920px;overflow:hidden;background:${C.bg}}
#root{position:relative;width:1080px;height:1920px;overflow:hidden;background:${C.bg}}
#thw{position:absolute;inset:0;overflow:hidden}#pv{position:absolute;left:0;top:0;width:1080px;height:1920px;object-fit:cover}
.ov{position:absolute;inset:0}
.band{position:absolute;left:0;right:0;top:0;height:760px;background:linear-gradient(rgba(10,10,16,.72) 0%,rgba(10,10,16,.55) 55%,rgba(10,10,16,0) 100%);opacity:0}
.sun{position:absolute;border-radius:50%;-webkit-mask:radial-gradient(circle,transparent 30%,#000 31%,#000 68%,transparent 69%);mask:radial-gradient(circle,transparent 30%,#000 31%,#000 68%,transparent 69%)}
.plate{position:absolute;border-radius:50%;background:${C.krem};box-shadow:0 0 0 6px #fff,0 16px 26px rgba(0,0,0,.5)}
.logo{position:absolute;object-fit:contain;opacity:0}
.glow{position:absolute;left:0;right:0;text-align:center;font-family:Archivo,sans-serif;font-weight:900;font-stretch:75%;color:${C.kuning};line-height:1;letter-spacing:2px;text-shadow:0 0 18px rgba(255,212,59,.85),0 0 42px rgba(255,170,0,.55),0 6px 0 rgba(0,0,0,.6)}
.lbl{position:absolute;font-family:Archivo,sans-serif;font-weight:800;font-stretch:90%;letter-spacing:3px}
.plat{display:inline-block;background:${C.merah};color:#fff;padding:0 18px;border-radius:6px;transform:rotate(-2deg)}
.cap{position:absolute;left:50%;top:1350px;padding:6px 26px;border-radius:14px;background:rgba(8,8,12,.62);white-space:nowrap;text-align:center;font-family:Archivo,sans-serif;font-weight:800;font-stretch:80%;font-size:84px;color:#fff;letter-spacing:2px;text-shadow:0 5px 0 rgba(0,0,0,.65),0 0 20px rgba(0,0,0,.5);opacity:0}
.paper{position:absolute;background:#F1EDE4;clip-path:${TORN};box-shadow:0 18px 30px rgba(0,0,0,.45);opacity:0}
.stamp{position:absolute;opacity:0}.stamp span{display:inline-block;font-family:Archivo,sans-serif;font-weight:900;font-stretch:80%;font-size:96px;color:#fff;background:${C.merah};padding:4px 24px;border-radius:10px;border:7px solid #fff;box-shadow:0 14px 26px rgba(0,0,0,.5)}
</style></head><body>
<div id="root" data-composition-id="main" data-width="1080" data-height="1920" data-duration="${D}" data-fx-chain='{"version":1,"nodes":[{"id":"master-truepeak","type":"truepeak","label":"Master ceiling -2 dBTP","params":{"ceiling":-2}}]}'>
<hf-audio-group id="voiceover"></hf-audio-group><hf-audio-group id="sfx"></hf-audio-group>
<div id="thw"><video id="pv" class="clip" src="assets/presenter/pv.mp4" data-start="0" data-duration="${D}" data-track-index="0" muted playsinline></video></div>
<div id="bandAll" class="ov clip" data-start="0" data-duration="${D}" data-track-index="1"><div id="band" class="band"></div></div>
<div id="hook" class="ov clip" data-start="0" data-duration="1.8" data-track-index="2">
 <div id="hl" class="lbl" style="left:0;right:0;top:262px;text-align:center;font-size:36px;color:${C.kuning}">SPECIAL MATCH · SHOPEE CUP</div>
 <div id="h1" class="glow" style="top:314px;font-size:118px;color:#fff;text-shadow:0 6px 0 rgba(0,0,0,.6)">PERSIB</div>
 <div id="h2" class="glow" style="top:430px;font-size:100px"><span class="plat">VS</span> SHAN UNITED</div>
</div>
<div id="i1" class="ov clip" data-start="${SEG.I1[0]}" data-duration="${f2(SEG.I1[1] - SEG.I1[0])}" data-track-index="3">
 ${sun("s1a", C.biru, 420, 190, 640)}${plate("p1a", 240, 190, 640)}${logo("lgP", "assets/aset/persib.png", 196, 196, 190, 640)}
 ${sun("s1b", C.merah, 400, 890, 640)}${plate("p1b", 230, 890, 640)}${logo("lgS", "assets/aset/shan-united.png", 172, 162, 890, 640)}
 ${glow("vs", "VS", 190, 280)}
</div>
<div id="i2" class="ov clip" data-start="${SEG.I2[0]}" data-duration="${f2(SEG.I2[1] - SEG.I2[0])}" data-track-index="4">
 <div id="pp2" class="paper" style="left:250px;top:236px;width:580px;height:410px;transform:rotate(-4deg)"></div>
 <img id="gbla" src="assets/aset/gbla-bw.png" style="position:absolute;left:276px;top:262px;width:528px;height:358px;object-fit:cover;transform:rotate(-4deg);opacity:0">
 ${glow("gt", "GBLA", 150, 560, "left:520px;right:auto;transform:rotate(5deg)")}
 <div id="gl2" class="lbl" style="left:72px;top:660px;font-size:34px;color:#fff;background:rgba(10,10,16,.75);padding:8px 16px;border-radius:8px;opacity:0">GELORA BANDUNG<br>LAUTAN API</div>
</div>
<div id="i3" class="ov clip" data-start="${SEG.I3[0]}" data-duration="${f2(SEG.I3[1] - SEG.I3[0])}" data-track-index="5">
 <div id="pp3" class="paper" style="left:40px;top:236px;width:1000px;height:300px;transform:rotate(1.5deg)"></div>
 <img id="ht" src="assets/aset/gbla-halftone.png" style="position:absolute;left:60px;top:254px;width:960px;height:264px;object-fit:cover;transform:rotate(1.5deg);opacity:0">
 <div id="htd" style="position:absolute;left:60px;top:254px;width:960px;height:264px;transform:rotate(1.5deg);background:rgba(10,10,16,.42);opacity:0"></div>
 ${glow("sm", "SPECIAL MATCH", 112, 330)}
 ${sun("s3", C.biru, 380, 890, 700)}${plate("p3", 220, 890, 700)}${logo("lgC", "assets/aset/shopee-cup.png", 140, 187, 890, 700)}
 <div id="stamp" class="stamp" style="left:52px;top:640px;transform:rotate(-8deg)"><span>KAMIS</span></div>
</div>
<div id="end" class="ov clip" data-start="8.9" data-duration="${f2(D - 8.9)}" data-track-index="6">
 <div id="eb" style="position:absolute;left:72px;top:262px;display:flex;align-items:center;gap:18px;padding:14px 24px 14px 14px;border-radius:18px;background:rgba(10,10,16,.8);opacity:0"><img src="assets/aset/persib-badge.png" style="width:86px;height:86px;object-fit:contain"><div class="lbl" style="position:static;font-size:40px;color:#fff">KAMIS MALAM<br><span style="color:${C.kuning}">GBLA</span></div></div>
</div>
<div id="caps" class="ov clip" data-start="0" data-duration="${D}" data-track-index="7">${WORDS.map(([w], i) => `<div id="w${i}" class="cap">${w}</div>`).join("")}</div>
<audio id="vo" data-audio-group="voiceover" src="assets/audio/clean.wav" data-start="0" data-duration="${D}" data-track-index="200" data-volume="1"></audio>
${[[SEG.I1[0], "whoosh", 0.3], [1.83, "pop", 0.4], [2.25, "pop", 0.3], [2.88, "pop", 0.4], [SEG.I2[0], "whoosh", 0.3], [3.83, "tap", 0.35], [SEG.I3[0], "whoosh", 0.3], [6.76, "pop", 0.4], [8.41, "thunk", 0.5], [8.9, "whoosh", 0.22]]
  .map(([t, n, v], i) => `<audio id="sfx${i}" data-audio-group="sfx" src="assets/sfx/${n}.mp3" data-start="${t}" data-duration="0.6" data-track-index="${300 + i}" data-volume="${v}"></audio>`).join("\n")}
</div>
<script>
window.__timelines=window.__timelines||{};(function(){const tl=gsap.timeline({paused:true});
gsap.set('#thw',{transformOrigin:'50% 40%'});
${ZOOM.map(([a, b, s0, s1]) => `tl.fromTo('#thw',{scale:${s0}},{scale:${s1},duration:${f2(b - a)},ease:'none',immediateRender:false},${a});`).join("")}
// pita gelap atas: muncul selama ada stiker di atas kepala (hook + sisipan)
gsap.set('#band',{opacity:0});tl.fromTo('#band',{opacity:0},{opacity:1,duration:.2,immediateRender:false},0);tl.to('#band',{opacity:0,duration:.25},4.6);
tl.fromTo('#band',{opacity:0},{opacity:1,duration:.2,immediateRender:false},5.3);tl.to('#band',{opacity:.55,duration:.3},8.9);
// judul hook
gsap.set(['#hl','#h1','#h2'],{opacity:0});tl.fromTo('#hl',{opacity:0,y:-20},{opacity:1,y:0,duration:.25,immediateRender:false},.05);
tl.fromTo('#h1',{opacity:0,scale:1.4},{opacity:1,scale:1,duration:.3,ease:'back.out(1.6)',immediateRender:false},.12);
tl.fromTo('#h2',{opacity:0,x:-60},{opacity:1,x:0,duration:.3,ease:'power3.out',immediateRender:false},.35);
const sunIn=(s,t)=>{tl.fromTo(s,{opacity:0,scale:.3,rotation:0},{opacity:1,scale:1,duration:.35,ease:'back.out(1.5)',immediateRender:false},t);tl.to(s,{rotation:45,duration:4,ease:'none'},t)};
const stick=(p,l,t,r)=>{tl.fromTo(p,{opacity:0,scale:.2},{opacity:1,scale:1,duration:.35,ease:'back.out(1.8)',immediateRender:false},t);tl.fromTo(l,{opacity:0,scale:.2,rotation:r},{opacity:1,scale:1,rotation:0,duration:.4,ease:'back.out(1.8)',immediateRender:false},t+.03)};
const glowIn=(id,n,t)=>{for(let i=0;i<n;i++){tl.fromTo('#'+id+'c'+i,{opacity:0,y:-70,rotation:i%2?14:-14},{opacity:1,y:0,rotation:0,duration:.22,ease:'back.out(2.2)',immediateRender:false},t+i*.045)}};
const out=(sel,t)=>tl.to(sel,{opacity:0,duration:.1},t);
// I1: Persib kiri, Shan kanan, VS di atas
sunIn('#s1a',1.8);stick('#p1a','#lgP',1.83,-12);glowIn('vs',2,2.25);sunIn('#s1b',2.85);stick('#p1b','#lgS',2.88,10);
tl.fromTo('#vs',{scale:1},{scale:1.08,duration:.3,yoyo:true,repeat:1,ease:'sine.inOut',immediateRender:false},2.75);
out(['#s1a','#p1a','#lgP','#s1b','#p1b','#lgS','#vs'],${f2(SEG.I1[1] - 0.1)});
// I2: foto GBLA ditempel di atas kepala
tl.fromTo('#pp2',{opacity:0,scale:1.2,rotation:-10},{opacity:1,scale:1,rotation:-4,duration:.3,ease:'back.out(1.4)',immediateRender:false},3.47);
tl.fromTo('#gbla',{opacity:0,scale:1.2,rotation:-10},{opacity:1,scale:1,rotation:-4,duration:.3,ease:'back.out(1.4)',immediateRender:false},3.5);
tl.fromTo('#gbla',{scale:1},{scale:1.04,duration:1.0,ease:'none',immediateRender:false},3.8);
glowIn('gt',4,3.83);tl.fromTo('#gl2',{opacity:0,x:-30},{opacity:1,x:0,duration:.25,immediateRender:false},4.0);
out(['#pp2','#gbla','#gt','#gl2'],${f2(SEG.I2[1] - 0.1)});
// I3: guntingan koran halftone + SPECIAL MATCH, Shopee Cup kanan, cap KAMIS kiri
tl.fromTo('#pp3',{opacity:0,y:-40},{opacity:1,y:0,duration:.25,ease:'power3.out',immediateRender:false},5.3);
tl.fromTo('#ht',{opacity:0,y:-40},{opacity:1,y:0,duration:.25,ease:'power3.out',immediateRender:false},5.32);tl.fromTo('#htd',{opacity:0,y:-40},{opacity:1,y:0,duration:.25,ease:'power3.out',immediateRender:false},5.32);
tl.fromTo('#ht',{x:0},{x:-30,duration:3.3,ease:'none',immediateRender:false},5.55);
glowIn('sm',13,5.38);sunIn('#s3',6.7);stick('#p3','#lgC',6.76,-8);
tl.fromTo('#stamp',{opacity:0,scale:1.8},{opacity:1,scale:1,duration:.18,ease:'power3.in',immediateRender:false},8.41);
out(['#pp3','#ht','#htd','#sm','#s3','#p3','#lgC','#stamp'],${f2(SEG.I3[1] - 0.1)});
tl.fromTo('#eb',{opacity:0,x:-40},{opacity:1,x:0,duration:.3,ease:'power3.out',immediateRender:false},9.0);
// caption satu kata
gsap.set('.cap',{xPercent:-50});const W=${JSON.stringify(WORDS)};W.forEach(([w,t],i)=>{const e=(W[i+1]?W[i+1][1]:${D})-.02;tl.set('#w'+i,{opacity:1},t);tl.fromTo('#w'+i,{scale:1.25,xPercent:-50},{scale:1,xPercent:-50,duration:.1,immediateRender:false},t);tl.set('#w'+i,{opacity:0},e)});
tl.to({},{duration:${D}},0);window.__timelines["main"]=tl;})();
</script></body></html>`;
writeFileSync("index.html", html);
console.log("persib-test-01-overlay: index ok · durasi", D);
