// Lembar desain tokoh: node sheet.mjs → sheet.html + sheet.png (Chrome headless)
import { writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { char, CHARS, PAL } from "../chars.mjs";

const S = JSON.parse(execFileSync("cat", ["../series.json"]).toString());
const cast = S.cast;
const fig = (id, x, y, sc, expr = "netral") => `<svg class="abs" style="left:${x}px;top:${y}px" width="${400 * sc}" height="${760 * sc}" viewBox="0 0 400 760">${char(id, { p: `${id}-${expr}`, expr })}</svg>`;
const face = (id, x, y, sc, expr) => `<svg class="abs" style="left:${x}px;top:${y}px" width="${240 * sc}" height="${250 * sc}" viewBox="80 80 240 250">${char(id, { p: `${id}-f-${expr}`, expr })}</svg>`;
const label = (x, y, w, name, sub, col = PAL.ink) => `<div class="abs lab" style="left:${x}px;top:${y}px;width:${w}px"><b style="color:${col}">${name}</b><span>${sub}</span></div>`;

const exprs = ["netral", "senang", "sedih", "kaget", "pasrah"];
const row2 = ["ibu", "raka", "mega", "hendra"];
const v = (k) => `${cast[k].voice} ${cast[k].speed}${cast[k].pitch ? ` · ${cast[k].pitch > 0 ? "+" : ""}${cast[k].pitch} st` : ""}`;
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Fredoka;src:url('../../../shared/fonts/fredoka-var-latin.woff2') format('woff2');font-weight:300 700}
@font-face{font-family:Nunito;src:url('../../../shared/fonts/nunito-var-latin.woff2') format('woff2');font-weight:200 1000}
html,body{margin:0;width:1080px;height:1920px;background:${PAL.paper};overflow:hidden}
.abs{position:absolute}
h1{position:absolute;left:0;top:56px;width:1080px;margin:0;text-align:center;font:700 108px/1 Fredoka;color:${PAL.ink}}
h2{position:absolute;left:0;top:176px;width:1080px;margin:0;text-align:center;font:700 38px/1 Nunito;color:${PAL.teal}}
.lab{text-align:center;font-family:Nunito}
.lab b{display:block;font:700 40px/1.1 Fredoka}
.lab span{display:block;font:700 23px/1.3 Nunito;color:#7A6A60;white-space:nowrap}
.ex{font:700 26px/1 Nunito;color:${PAL.ink};text-align:center}
.sw{width:96px;height:56px;border-radius:14px;border:4px solid ${PAL.ink}}
.panel{border-radius:36px;background:#F4E6CF}
</style></head><body>
<h1>ANAK PERTAMA</h1><h2>Tokoh Musim 1 · flat kartun · palet Senja hangat</h2>
<div class="abs panel" style="left:36px;top:250px;width:1008px;height:880px"></div>
${fig("dinda", 48, 290, 1.0)}
${label(48, 1064, 400, "Dinda, 25", `anak sulung · suara ${v("dinda")}`, PAL.teal)}
<div class="abs ex" style="left:470px;top:290px;width:540px;font:700 34px/1 Fredoka;text-align:left">Ekspresi Dinda</div>
${exprs.map((e, i) => `${face("dinda", 470 + (i % 3) * 182, 344 + Math.floor(i / 3) * 300, 0.72, e)}<div class="abs ex" style="left:${470 + (i % 3) * 182}px;top:${530 + Math.floor(i / 3) * 300}px;width:173px">${e}</div>`).join("")}
<div class="abs ex" style="left:470px;top:960px;width:540px;text-align:left;font:700 26px/1.35 Nunito;color:#7A6A60">Ikon serial: tas selempang kuning.<br>Batin Dinda = suara sama + efek ruang tipis.</div>
${row2.map((id, i) => `${fig(id, 24 + i * 262, 1170, 0.62)}${label(14 + i * 262, 1652, 270, CHARS[id].name, `suara ${v(id)}`)}`).join("")}
<div class="abs" style="left:96px;top:1790px;display:flex;gap:16px">${Object.values(S.lock.palette.colors).map((c) => `<div class="sw" style="background:${c}"></div>`).join("")}</div>
</body></html>`;
writeFileSync("sheet.html", html);
execFileSync("google-chrome", ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files", "--window-size=1080,1920", "--virtual-time-budget=3000", `--screenshot=${process.cwd()}/sheet.png`, `file://${process.cwd()}/sheet.html`], { stdio: "ignore" });
console.log("sheet.png");
