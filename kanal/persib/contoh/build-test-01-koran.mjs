// CONTOH /video-komentar mode KORAN OLAHRAGA (kanal persib) — presenter tampil penuh dalam bingkai kertas sobek,
// halaman surat kabar: masthead serif, headline, foto stiker, cap merah, ticker. Tes 15 Nov 2026, 11 s.
// Panduan: .claude/skills/video-komentar/SKILL.md (Langkah 3 & 5, mode koran).

// Tes 01 versi KORAN OLAHRAGA /video-komentar (kanal persib): presenter tampil penuh, disajikan sebagai
// halaman surat kabar — kertas krem bertekstur, headline serif, kolom teks, foto dibingkai kertas sobek,
// cap merah miring, dan ticker berjalan. Grafis tidak menutup wajah (zona: atas kepala, tepi bawah).
import { writeFileSync } from "node:fs";

const D = 11.0;
const C = { kertas: "#F3ECDD", tinta: "#1E1A17", merah: "#B3231F", biru: "#204098", kuning: "#F0E820", abu: "#6B625A" };
const WORDS = [["YAUDAH", 0.02], ["JANGAN", 0.56], ["LUPA", 0.99], ["SAKSIKAN", 1.26], ["PERSIB", 1.83], ["VS", 2.25], ["SHAN", 2.55], ["UNITED", 2.88],
  ["DI", 3.49], ["GBLA", 3.83], ["UNTUK", 4.73], ["SPECIAL", 5.32], ["MATCH", 6.10], ["SHOPEE", 6.76], ["CUP", 7.25], ["DI", 7.73], ["HARI", 7.84],
  ["KAMIS", 8.41], ["MALAM", 9.02], ["HARI", 9.43], ["LANGSUNG", 9.59], ["AJA", 10.11], ["KITA", 10.31], ["NONTON", 10.57]];
const f2 = (n) => (+n).toFixed(2);
const TORN = "polygon(0% 4%,7% 0%,15% 3%,24% 0%,33% 4%,42% 0%,51% 3%,60% 0%,69% 4%,78% 0%,87% 3%,95% 0%,100% 5%,98% 30%,100% 55%,98% 80%,100% 96%,91% 100%,82% 96%,72% 100%,62% 96%,52% 100%,42% 96%,32% 100%,22% 96%,12% 100%,3% 96%,0% 88%,2% 62%,0% 38%,2% 14%)";
const FOTO = "polygon(0% 3%,8% 0%,18% 2%,27% 0%,38% 3%,48% 0%,58% 2%,68% 0%,78% 3%,88% 0%,100% 3%,99% 25%,100% 48%,98% 70%,100% 92%,90% 100%,80% 97%,70% 100%,60% 97%,50% 100%,40% 97%,30% 100%,20% 97%,10% 100%,1% 97%,0% 75%,2% 52%,0% 30%)";

const html = `<!doctype html><html lang="id" data-resolution="portrait"><head><meta charset="utf-8"><meta name="viewport" content="width=1080,height=1920">
<script src="./assets/vendor/gsap.min.js"></script>
<style>
@font-face{font-family:Archivo;src:url('./assets/fonts/archivo-var-latin.woff2') format('woff2');font-weight:100 900;font-stretch:62% 125%}
@font-face{font-family:Instrument;src:url('./assets/fonts/instrument-serif-regular-latin.woff2') format('woff2');font-weight:400}
@font-face{font-family:InstrumentI;src:url('./assets/fonts/instrument-serif-italic-latin.woff2') format('woff2');font-weight:400;font-style:italic}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1920px;overflow:hidden;background:${C.kertas}}
#root{position:relative;width:1080px;height:1920px;overflow:hidden;background:${C.kertas}}
#thw{position:absolute;left:70px;top:520px;width:940px;height:1000px;overflow:hidden;background:#000;clip-path:${FOTO};transform:rotate(-1.2deg)}
#pv{position:absolute;left:0;top:0;width:940px;height:1000px;object-fit:cover}
#paper{position:absolute;inset:0;background:url('./assets/aset/paper-tex.png') repeat;background-size:512px 512px}
.grain{position:absolute;inset:0;background:url('./assets/aset/paper-tex.png') repeat;background-size:512px 512px;mix-blend-mode:multiply;opacity:.55}
#mast{position:absolute;left:0;right:0;top:176px;text-align:center;font-family:Instrument,sans-serif;font-weight:400;font-size:92px;letter-spacing:-1px;color:${C.tinta};opacity:0}
#mast i{font-family:InstrumentI;color:${C.merah}}
.rule{position:absolute;left:70px;right:70px;height:3px;background:${C.tinta};opacity:0}
.thin{position:absolute;left:70px;right:70px;height:1.5px;background:${C.tinta};opacity:0}
.kicker{position:absolute;left:0;right:0;font-family:Archivo,sans-serif;font-weight:800;font-stretch:90%;letter-spacing:4px;color:${C.merah};text-align:center;opacity:0}
#hl1{position:absolute;left:0;right:0;top:356px;text-align:center;font-family:Instrument,sans-serif;font-weight:400;font-size:58px;line-height:1;color:${C.tinta};letter-spacing:0;opacity:0;white-space:nowrap}
#hl1 em{font-family:InstrumentI;font-style:italic;color:${C.merah}}
#hl2{position:absolute;left:0;right:0;top:440px;text-align:center;font-family:Archivo,sans-serif;font-weight:900;font-stretch:70%;font-size:54px;letter-spacing:1px;color:${C.tinta};opacity:0;white-space:nowrap}
#hl2 .b{color:${C.biru}}
.col{position:absolute;font-family:Archivo,sans-serif;font-weight:500;font-size:30px;line-height:1.32;color:${C.tinta};opacity:0}
#cap{margin:0 auto;max-width:900px;text-align:center;font-family:InstrumentI,sans-serif;font-style:italic;font-size:38px;line-height:1.25;color:${C.tinta};opacity:0}
#byline{position:absolute;left:0;right:0;text-align:center;font-family:Archivo,sans-serif;font-weight:800;font-stretch:90%;font-size:26px;letter-spacing:3px;color:${C.abu};opacity:0}
.foto{position:absolute;background:#fff;box-shadow:0 16px 30px rgba(40,30,20,.28);opacity:0}
.foto img{position:absolute;inset:14px;width:calc(100% - 28px);height:calc(100% - 28px);object-fit:cover}
#stamp{position:absolute;opacity:0}#stamp span{display:inline-block;font-family:Archivo,sans-serif;font-weight:900;font-stretch:80%;font-size:92px;color:${C.merah};border:7px solid ${C.merah};padding:4px 26px;border-radius:10px;letter-spacing:2px;transform:rotate(-9deg);background:rgba(243,236,221,.6)}
#tick{position:absolute;left:0;right:0;top:1770px;height:86px;background:${C.tinta};overflow:hidden;opacity:0}
#tick .t{position:absolute;top:0;height:86px;white-space:nowrap;font-family:Archivo,sans-serif;font-weight:800;font-stretch:85%;font-size:40px;letter-spacing:2px;color:${C.kertas};line-height:86px}
#tick .t b{color:${C.kuning}}
.cap{position:absolute;left:50%;top:1600px;padding:6px 24px;border-radius:8px;background:${C.tinta};color:${C.kertas};font-family:Archivo,sans-serif;font-weight:800;font-stretch:80%;font-size:78px;letter-spacing:2px;white-space:nowrap;text-align:center;opacity:0}
</style></head><body>
<div id="root" data-composition-id="main" data-width="1080" data-height="1920" data-duration="${D}" data-fx-chain='{"version":1,"nodes":[{"id":"master-truepeak","type":"truepeak","label":"Master ceiling -2 dBTP","params":{"ceiling":-2}}]}'>
<hf-audio-group id="voiceover"></hf-audio-group><hf-audio-group id="sfx"></hf-audio-group>
<div id="paper"></div>
<div id="thw"><video id="pv" class="clip" src="assets/presenter/pv.mp4" data-start="0" data-duration="${D}" data-track-index="0" muted playsinline></video></div>
<div id="grain" class="grain clip" data-start="0" data-duration="${D}" data-track-index="1"></div>
<div id="head" class="clip" data-start="0" data-duration="${D}" data-track-index="2">
 <div id="mast">BANDUNG <i>Post</i></div>
 <div id="r1" class="rule" style="top:292px"></div>
 <div id="k1" class="kicker" style="top:306px;font-size:26px">EDISI KHUSUS · SEPAK BOLA · KAMIS</div>
 <div id="r2" class="thin" style="top:344px"></div>
 <div id="hl1" style="top:400px">Siap-siap, <em>Bobotoh!</em></div>
 <div id="hl2">PERSIB <span class="b">VS</span> SHAN UNITED</div>
 <div id="r3" class="thin" style="top:536px"></div>
</div>
<div id="i1" class="clip" data-start="1.8" data-duration="1.65" data-track-index="3">
 <div id="f1" class="foto" style="left:770px;top:1120px;width:260px;height:260px;transform:rotate(-5deg);clip-path:${TORN}"><img src="assets/aset/persib.png"></div>
 <div id="f2" class="foto" style="left:770px;top:770px;width:230px;height:230px;transform:rotate(6deg);clip-path:${TORN}"><img src="assets/aset/shan-united.png"></div>
 <div id="vs" style="position:absolute;left:0;right:0;top:1180px;text-align:center;opacity:0"><span style="display:inline-block;font-family:InstrumentI;font-style:italic;font-size:110px;color:${C.merah};background:${C.kertas};border-radius:50%;padding:0 16px">vs</span></div>
</div>
<div id="i2" class="clip" data-start="3.45" data-duration="1.25" data-track-index="4">
 <div id="f3" class="foto" style="left:620px;top:640px;width:400px;height:330px;transform:rotate(-3deg);clip-path:${TORN}"><img src="assets/aset/gbla-bw.png"></div>
 <div id="capf" style="position:absolute;left:600px;top:1000px;width:420px;text-align:left;opacity:0;background:${C.kertas};padding:12px 16px;box-shadow:0 10px 20px rgba(40,30,20,.18)"><div class="col" style="position:static;opacity:1;font-size:23px;line-height:1.25;letter-spacing:.4px">STADION GELORA BANDUNG LAUTAN API — markas Persib Bandung.</div></div>
</div>
<div id="i3" class="clip" data-start="5.3" data-duration="3.6" data-track-index="5">
 <div id="f4" class="foto" style="left:620px;top:640px;width:400px;height:330px;transform:rotate(2deg);clip-path:${TORN}"><img src="assets/aset/gbla-halftone.png"></div>
 <div id="k3" class="kicker" style="left:600px;right:auto;width:440px;top:1010px;font-size:23px;text-align:left;background:${C.kertas};padding:10px 16px;box-shadow:0 10px 20px rgba(40,30,20,.18)">KOMPETISI ANTAR-KLUB ASEAN</div>
 <div id="st" style="position:absolute;left:0;right:0;top:1030px;text-align:center"><div id="stamp"><span>SHOPEE CUP</span></div></div>
 <div id="lgC" style="position:absolute;left:840px;top:640px;width:180px;opacity:0"><img src="assets/aset/shopee-cup.png" style="width:100%"></div>
</div>
<div id="end" class="clip" data-start="8.9" data-duration="${f2(D - 8.9)}" data-track-index="6">
 <div id="st2" style="position:absolute;left:0;right:0;top:1120px;text-align:center"><div id="stamp2"><span>KAMIS</span></div></div>
 <div id="by" class="byline" style="top:1250px">LAPANGAN GBLA · KAMIS MALAM · JANGAN SAMPAI KETINGGALAN</div>
</div>
<div id="ticker" class="clip" data-start="0" data-duration="${D}" data-track-index="7"><div id="tick"><div id="tA" class="t"></div><div id="tB" class="t"></div></div></div>
<div id="caps" class="clip" data-start="0" data-duration="${D}" data-track-index="8">${WORDS.map(([w], i) => `<div id="w${i}" class="cap">${w}</div>`).join("")}</div>
<audio id="vo" data-audio-group="voiceover" src="assets/audio/clean.wav" data-start="0" data-duration="${D}" data-track-index="200" data-volume="1"></audio>
${[[0.0, "paper", 0.4], [1.8, "paper", 0.35], [2.3, "thunk", 0.3], [3.45, "paper", 0.35], [5.3, "paper", 0.35], [6.7, "pop", 0.35], [8.41, "thunk", 0.5], [8.9, "whoosh", 0.25]]
  .map(([t, n, v], i) => `<audio id="sfx${i}" data-audio-group="sfx" src="assets/sfx/${n}.mp3" data-start="${t}" data-duration="0.7" data-track-index="${300 + i}" data-volume="${v}"></audio>`).join("\n")}
</div>
<script>
window.__timelines=window.__timelines||{};(function(){const tl=gsap.timeline({paused:true});
gsap.set('#thw',{transformOrigin:'50% 45%'});
tl.fromTo('#thw',{scale:1.0},{scale:1.05,duration:${D},ease:'none',immediateRender:false},0);
tl.fromTo('#pv',{y:0},{y:-10,duration:${D},ease:'none',immediateRender:false},0);
// kepala koran: masthead + aturan garis + headline berganti per momen
tl.fromTo('#mast',{opacity:0,y:-24},{opacity:1,y:0,duration:.35,ease:'power3.out',immediateRender:false},.05);
tl.fromTo(['#r1','#r2','#r3'],{opacity:0,scaleX:.2},{opacity:1,scaleX:1,duration:.35,ease:'power3.out',immediateRender:false,stagger:.06},.15);
tl.fromTo('#k1',{opacity:0},{opacity:1,duration:.25,immediateRender:false},.3);
tl.fromTo('#hl1',{opacity:0,y:30},{opacity:1,y:0,duration:.35,ease:'power3.out',immediateRender:false},.35);
tl.fromTo('#hl2',{opacity:0,y:30},{opacity:1,y:0,duration:.35,ease:'power3.out',immediateRender:false},.5);
tl.to(['#hl1','#hl2','#k1'],{opacity:0,duration:.25},4.5);tl.to(['#mast','#r1','#r2','#r3'],{opacity:0,duration:.3},4.5);
tl.fromTo('#k3',{opacity:0},{opacity:1,duration:.2,immediateRender:false},5.35);
// I1: dua foto klub ditempel miring + 'vs'
const card=(s,t,r)=>tl.fromTo(s,{opacity:0,scale:1.25,rotation:r*2},{opacity:1,scale:1,rotation:r,duration:.32,ease:'back.out(1.5)',immediateRender:false},t);
card('#f1',1.8,-5);tl.fromTo('#vs',{opacity:0,scale:.4},{opacity:1,scale:1,duration:.3,ease:'back.out(2)',immediateRender:false},2.25);card('#f2',2.88,6);
tl.to(['#f1','#f2','#vs'],{opacity:0,duration:.2},${f2(3.45 - 0.15)});
// I2: foto stadion + caption koran
card('#f3',3.5,-2);tl.fromTo('#capf',{opacity:0,y:16},{opacity:1,y:0,duration:.25,immediateRender:false},3.8);
tl.to(['#f3','#capf'],{opacity:0,duration:.2},${f2(4.7 - 0.15)});
// I3: guntingan halftone + cap SHOPEE CUP + logo
card('#f4',5.32,1.5);tl.fromTo('#lgC',{opacity:0,scale:.3,rotation:-10},{opacity:1,scale:1,rotation:0,duration:.35,ease:'back.out(1.8)',immediateRender:false},6.7);
tl.fromTo('#stamp',{opacity:0,scale:1.9},{opacity:1,scale:1,duration:.2,ease:'power3.in',immediateRender:false},6.8);
tl.to(['#f4','#k3','#stamp','#lgC'],{opacity:0,duration:.2},${f2(8.9 - 0.15)});
// penutup: cap KAMIS + byline
tl.fromTo('#stamp2',{opacity:0,scale:1.9,rotation:-9},{opacity:1,scale:1,rotation:-9,duration:.22,ease:'power3.in',immediateRender:false},8.95);
tl.fromTo('#by',{opacity:0,y:20},{opacity:1,y:0,duration:.3,immediateRender:false},9.2);
// ticker berjalan (deterministik: x dari waktu)
const TICK='<b>PERSIB VS SHAN UNITED</b> &nbsp;·&nbsp; SPECIAL MATCH SHOPEE CUP &nbsp;·&nbsp; KAMIS MALAM DI GBLA &nbsp;·&nbsp; <b>JANGAN LUPA SAKSIKAN</b> &nbsp;·&nbsp; ';
document.getElementById('tA').innerHTML=TICK;document.getElementById('tB').innerHTML=TICK;
tl.set('#tick',{opacity:1},0);tl.fromTo('#tick',{y:90},{y:0,duration:.35,ease:'power3.out',immediateRender:false},.25);
const W2=document.getElementById('tA').offsetWidth||1200;
tl.fromTo(['#tA','#tB'],{x:0},{x:-W2,duration:${f2(D)},ease:'none',immediateRender:false},0);
// caption satu kata
gsap.set('.cap',{xPercent:-50});const W=${JSON.stringify(WORDS)};W.forEach(([w,t],i)=>{const e=(W[i+1]?W[i+1][1]:${D})-.02;tl.set('#w'+i,{opacity:1},t);tl.fromTo('#w'+i,{scale:1.18,xPercent:-50},{scale:1,xPercent:-50,duration:.1,immediateRender:false},t);tl.set('#w'+i,{opacity:0},e)});
tl.to({},{duration:${D}},0);window.__timelines["main"]=tl;})();
</script></body></html>`;
writeFileSync("index.html", html);
console.log("persib-test-01-koran: index ok · durasi", D);
