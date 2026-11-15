// Rig tokoh flat-vector serial "Anak Pertama" — dipakai ulang di setiap episode.
// char(id, { p, expr }) → string SVG <g> dalam ruang 400×760 (titik kaki tengah = 200,742).
// Grup ber-id untuk animasi: {p}-all, {p}-body, {p}-armL/{p}-armR (engsel bahu 132,350 / 268,350), {p}-head
// (engsel leher 200,300), {p}-eyes (kedip, pusat 200,222) berisi {p}-eye-{open|happy|sad|wide|tired},
// {p}-brows berisi {p}-brow-{neutral|up|sad|angry}, {p}-mouth-{smile|open|flat|sad|o}, {p}-tear.
// Semua varian ada di DOM; ekspresi = varian mana yang opacity 1 (lihat EXPR).
// Ekspresi: netral | senang | sedih | kaget | pasrah.

export const PAL = {
  paper: "#FBF3E4", ink: "#3B2F2A", teal: "#2F7F86", mustard: "#F2B32E", coral: "#E07A5F",
  rose: "#E9A6B5", sky: "#9CC9D9", leaf: "#7DB46C", white: "#FFFDF8", mouth: "#7A2E2E", tongue: "#E07A7A",
};
export const dark = (hex, k = 0.12) => "#" + [1, 3, 5].map((i) => Math.round(parseInt(hex.slice(i, i + 2), 16) * (1 - k)).toString(16).padStart(2, "0")).join("");

export const CHARS = {
  dinda: { name: "Dinda", skin: "#E3AC85", hair: "#2B1E1A", hairStyle: "bob", top: PAL.teal, pants: "#2B3A55", shoes: PAL.white, acc: ["bag"] },
  ibu: { name: "Ibu", skin: "#D49B76", hijab: "#C8553D", top: "#8A5A3C", pants: "#8A5A3C", dress: true, shoes: "#5A3A2A", acc: ["dots", "age"] },
  raka: { name: "Raka", skin: "#C98E68", hair: "#1F1715", hairStyle: "messy", top: "#6C8A6E", pants: "#3A5A80", shoes: "#F2F2F2", acc: ["phones", "hood"] },
  mega: { name: "Mega", skin: "#EDBB94", hijab: "#E9A6B5", top: "#9C89C9", pants: "#4A4458", shoes: "#FFFDF8", acc: ["roundGlasses", "cardigan"] },
  hendra: { name: "Pak Hendra", skin: "#C48A64", hair: "#33302E", hairStyle: "short", top: "#2B4C7E", pants: "#2E2E36", shoes: "#2A2420", acc: ["glasses", "mustache", "batik", "belly"] },
};

export const EXPR = {
  netral: { eyes: "open", brows: "neutral", mouth: "smile" },
  senang: { eyes: "happy", brows: "up", mouth: "open" },
  sedih: { eyes: "sad", brows: "sad", mouth: "sad", tear: true },
  kaget: { eyes: "wide", brows: "up", mouth: "o" },
  pasrah: { eyes: "tired", brows: "neutral", mouth: "flat" },
};

const eyes = (kind, c) => {
  const E = (cx) => {
    if (kind === "happy") return `<path d="M${cx - 12} 226 Q${cx} 212 ${cx + 12} 226" fill="none" stroke="${PAL.ink}" stroke-width="7" stroke-linecap="round"/>`;
    if (kind === "tired") return `<ellipse cx="${cx}" cy="226" rx="11" ry="7" fill="${PAL.ink}"/><path d="M${cx - 15} 219 L${cx + 15} 219" stroke="${c.skin}" stroke-width="8"/><path d="M${cx - 14} 221 L${cx + 14} 221" stroke="${PAL.ink}" stroke-width="5" stroke-linecap="round"/>`;
    const rx = kind === "wide" ? 13 : 11, ry = kind === "wide" ? 18 : kind === "sad" ? 12 : 14;
    return `<ellipse cx="${cx}" cy="222" rx="${rx}" ry="${ry}" fill="${PAL.ink}"/><circle cx="${cx + 4}" cy="${216}" r="4.5" fill="${PAL.white}"/>`;
  };
  return E(163) + E(237);
};
const brows = (kind) => {
  const L = { neutral: "M145 192 Q163 184 181 190", up: "M145 184 Q163 174 181 182", sad: "M145 194 Q163 188 181 180", angry: "M145 182 Q163 186 181 196" }[kind];
  const R = { neutral: "M219 190 Q237 184 255 192", up: "M219 182 Q237 174 255 184", sad: "M219 180 Q237 188 255 194", angry: "M219 196 Q237 186 255 182" }[kind];
  return `<path d="${L}" fill="none" stroke="${PAL.ink}" stroke-width="6.5" stroke-linecap="round"/><path d="${R}" fill="none" stroke="${PAL.ink}" stroke-width="6.5" stroke-linecap="round"/>`;
};
const MOUTHS = {
  smile: `<path d="M180 268 Q200 284 220 268" fill="none" stroke="${PAL.ink}" stroke-width="6" stroke-linecap="round"/>`,
  open: `<path d="M176 264 Q200 302 224 264 Z" fill="${PAL.mouth}" stroke="${PAL.ink}" stroke-width="5" stroke-linejoin="round"/><path d="M188 284 Q200 294 212 284 Q206 278 194 278 Z" fill="${PAL.tongue}"/>`,
  flat: `<path d="M184 274 L216 274" stroke="${PAL.ink}" stroke-width="6" stroke-linecap="round"/>`,
  sad: `<path d="M182 280 Q200 264 218 280" fill="none" stroke="${PAL.ink}" stroke-width="6" stroke-linecap="round"/>`,
  o: `<ellipse cx="200" cy="276" rx="12" ry="15" fill="${PAL.mouth}" stroke="${PAL.ink}" stroke-width="5"/>`,
};

export function char(id, { p = id, expr = "netral" } = {}) {
  const c = CHARS[id], e = EXPR[expr], acc = new Set(c.acc || []), hij = !!c.hijab;
  const skinD = dark(c.skin), topD = dark(c.top), belly = acc.has("belly") ? 16 : 0;
  const torso = c.dress
    ? `M130 356 Q130 328 162 324 L238 324 Q270 328 270 356 L300 690 Q300 704 284 704 L116 704 Q100 704 100 690 Z`
    : `M130 356 Q130 328 162 324 L238 324 Q270 328 270 356 L${284 + belly} 540 Q${284 + belly} 558 ${266 + belly} 558 L${134 - belly} 558 Q${116 - belly} 558 ${116 - belly} 540 Z`;
  const legs = c.dress ? "" : `<rect x="148" y="520" width="44" height="200" rx="20" fill="${c.pants}"/><rect x="208" y="520" width="44" height="200" rx="20" fill="${dark(c.pants)}"/>`;
  const shoes = `<ellipse cx="168" cy="726" rx="34" ry="17" fill="${c.shoes}" stroke="${PAL.ink}" stroke-width="4"/><ellipse cx="232" cy="726" rx="34" ry="17" fill="${c.shoes}" stroke="${PAL.ink}" stroke-width="4"/>`;
  const arm = (side) => { const x = side === "L" ? 102 : 262, hx = side === "L" ? 120 : 280, ox = side === "L" ? 132 : 268;
    return `<g id="${p}-arm${side}" data-pivot="${ox} 350"><rect x="${x}" y="340" width="36" height="${c.dress ? 120 : 110}" rx="18" fill="${side === "L" ? c.top : topD}"/>${acc.has("cardigan") ? `<rect x="${x}" y="340" width="36" height="110" rx="18" fill="${side === "L" ? "#B7A8E0" : dark("#B7A8E0")}"/>` : ""}<rect x="${x + 4}" y="430" width="28" height="80" rx="14" fill="${side === "L" ? c.skin : skinD}"/><circle cx="${hx}" cy="516" r="19" fill="${c.skin}" stroke="${PAL.ink}" stroke-width="3"/></g>`; };
  // pola baju
  let pattern = "";
  if (acc.has("dots")) for (let i = 0; i < 18; i++) pattern += `<circle cx="${130 + ((i * 47) % 150)}" cy="${380 + ((i * 71) % 300)}" r="7" fill="${PAL.mustard}" opacity=".85"/>`;
  if (acc.has("batik")) for (let i = 0; i < 12; i++) { const x = 150 + ((i * 53) % 110), y = 370 + ((i * 61) % 160); pattern += `<path d="M${x} ${y - 12} L${x + 12} ${y} L${x} ${y + 12} L${x - 12} ${y} Z" fill="none" stroke="#7FA6D6" stroke-width="4"/>`; }
  const cardigan = acc.has("cardigan") ? `<path d="M130 356 Q130 328 162 324 L178 324 L172 558 L134 558 Q116 558 116 540 Z" fill="#B7A8E0"/><path d="M270 356 Q270 328 238 324 L222 324 L228 558 L266 558 Q284 558 284 540 Z" fill="${dark("#B7A8E0")}"/>` : "";
  const hood = acc.has("hood") ? `<path d="M150 330 Q200 360 250 330 L262 352 Q200 384 138 352 Z" fill="${dark(c.top, 0.2)}"/><path d="M188 352 L184 404 M212 352 L216 404" stroke="${PAL.white}" stroke-width="5" stroke-linecap="round"/>` : "";
  const bag = acc.has("bag") ? `<path d="M146 332 L266 508" stroke="${dark(PAL.mustard, 0.25)}" stroke-width="13" stroke-linecap="round"/><rect x="236" y="490" width="78" height="62" rx="14" fill="${PAL.mustard}" stroke="${PAL.ink}" stroke-width="4"/><path d="M236 508 L314 508" stroke="${dark(PAL.mustard)}" stroke-width="8"/><circle cx="275" cy="512" r="6" fill="${PAL.ink}"/>` : "";
  const phones = acc.has("phones") ? `<path d="M148 330 Q200 368 252 330" fill="none" stroke="#2F2F33" stroke-width="12" stroke-linecap="round"/><circle cx="146" cy="330" r="19" fill="#2F2F33"/><circle cx="254" cy="330" r="19" fill="#2F2F33"/>` : "";
  // kepala
  const hairBack = !hij && c.hairStyle === "bob" ? `<path d="M90 214 Q86 100 200 90 Q314 100 310 214 L312 300 Q312 316 294 316 L106 316 Q88 316 88 300 Z" fill="${c.hair}"/>` : "";
  const hijBack = hij ? `<path d="M200 86 Q76 96 80 236 Q84 338 132 384 L268 384 Q316 338 320 236 Q324 96 200 86 Z" fill="${c.hijab}"/>` : "";
  const ears = hij ? "" : `<ellipse cx="100" cy="218" rx="14" ry="20" fill="${skinD}"/><ellipse cx="300" cy="218" rx="14" ry="20" fill="${skinD}"/>`;
  const headFace = `<ellipse cx="200" cy="208" rx="${hij ? 94 : 102}" ry="${hij ? 104 : 110}" fill="${c.skin}"/>`;
  let hairFront = "";
  if (!hij && c.hairStyle === "bob") hairFront = `<path d="M96 200 Q100 104 200 96 Q300 102 306 196 Q262 150 214 146 Q168 150 148 180 Q124 204 96 200 Z" fill="${c.hair}"/><path d="M220 116 Q262 122 284 150" fill="none" stroke="${dark(c.hair, -0.6)}" stroke-width="6" stroke-linecap="round" opacity=".5"/>`;
  if (!hij && c.hairStyle === "messy") hairFront = `<path d="M98 196 Q90 120 128 104 L120 80 L158 96 L170 66 L196 92 L222 62 L238 94 L272 74 L268 106 Q310 122 304 196 Q286 150 240 140 L226 158 L206 138 L186 160 L170 140 Q120 150 98 196 Z" fill="${c.hair}"/>`;
  if (!hij && c.hairStyle === "short") hairFront = `<path d="M98 190 Q98 104 200 98 Q302 104 302 190 Q292 150 262 138 Q200 122 140 138 Q108 150 98 190 Z" fill="${c.hair}"/><path d="M98 190 Q98 160 108 146 L110 200 Z M302 190 Q302 160 292 146 L290 200 Z" fill="#9A9A9A"/>`;
  const hijFront = hij ? `<path fill-rule="evenodd" d="M200 92 Q86 96 86 214 Q86 316 200 322 Q314 316 314 214 Q314 96 200 92 Z M200 116 Q110 118 110 214 Q110 300 200 304 Q290 300 290 214 Q290 118 200 116 Z" fill="${c.hijab}"/><path d="M128 300 Q200 350 272 300 L292 392 Q200 428 108 392 Z" fill="${c.hijab}"/><path d="M200 300 L290 392 Q260 410 228 418 Z" fill="${dark(c.hijab)}"/>` : "";
  const cheeks = `<circle cx="146" cy="256" r="15" fill="${PAL.rose}" opacity=".45"/><circle cx="254" cy="256" r="15" fill="${PAL.rose}" opacity=".45"/>`;
  const nose = `<path d="M197 236 Q192 252 205 252" fill="none" stroke="${dark(c.skin, 0.3)}" stroke-width="4" stroke-linecap="round"/>`;
  const age = acc.has("age") ? `<path d="M120 222 Q126 228 122 236 M280 222 Q274 228 278 236" fill="none" stroke="${dark(c.skin, 0.3)}" stroke-width="3" stroke-linecap="round"/>` : "";
  const glasses = acc.has("glasses") ? `<rect x="138" y="202" width="50" height="40" rx="10" fill="${PAL.white}" fill-opacity=".25" stroke="${PAL.ink}" stroke-width="5"/><rect x="212" y="202" width="50" height="40" rx="10" fill="${PAL.white}" fill-opacity=".25" stroke="${PAL.ink}" stroke-width="5"/><path d="M188 218 L212 218" stroke="${PAL.ink}" stroke-width="5"/>` : "";
  const roundG = acc.has("roundGlasses") ? `<circle cx="163" cy="222" r="26" fill="${PAL.white}" fill-opacity=".2" stroke="${PAL.ink}" stroke-width="5"/><circle cx="237" cy="222" r="26" fill="${PAL.white}" fill-opacity=".2" stroke="${PAL.ink}" stroke-width="5"/><path d="M189 220 L211 220" stroke="${PAL.ink}" stroke-width="5"/>` : "";
  const mustache = acc.has("mustache") ? `<path d="M174 258 Q188 250 200 258 Q212 250 226 258 Q214 268 200 262 Q186 268 174 258 Z" fill="${c.hair}"/>` : "";
  const tear = `<path id="${p}-tear" d="M150 240 Q144 254 150 260 Q156 254 150 240 Z" fill="${PAL.sky}" stroke="${PAL.ink}" stroke-width="2" opacity="${e.tear ? 1 : 0}"/>`;
  const mouths = Object.entries(MOUTHS).map(([k, d]) => `<g id="${p}-mouth-${k}" opacity="${k === e.mouth ? 1 : 0}">${d}</g>`).join("");
  return `<g id="${p}-all">
<ellipse cx="200" cy="742" rx="118" ry="14" fill="${PAL.ink}" opacity=".12"/>
<g id="${p}-body">${legs}${shoes}${arm("R")}<path d="${torso}" fill="${c.top}"/><path d="M238 324 Q270 328 270 356 L${(c.dress ? 300 : 284 + belly)} ${c.dress ? 690 : 540} Q${c.dress ? 300 : 284 + belly} ${c.dress ? 704 : 558} ${c.dress ? 284 : 266 + belly} ${c.dress ? 704 : 558} L250 ${c.dress ? 704 : 558} Z" fill="${topD}"/>${cardigan}${pattern}${hood}<rect x="182" y="292" width="36" height="40" fill="${skinD}"/>${phones}${bag}${arm("L")}</g>
<g id="${p}-head">${hijBack}${hairBack}${ears}${headFace}${hairFront}${cheeks}${nose}${age}<g id="${p}-eyes">${["open", "happy", "sad", "wide", "tired"].map((k) => `<g id="${p}-eye-${k}" opacity="${k === e.eyes ? 1 : 0}">${eyes(k, c)}</g>`).join("")}</g><g id="${p}-brows">${["neutral", "up", "sad", "angry"].map((k) => `<g id="${p}-brow-${k}" opacity="${k === e.brows ? 1 : 0}">${brows(k)}</g>`).join("")}</g>${glasses}${roundG}${mustache}${mouths}${tear}${hijFront}</g>
</g>`;
}
