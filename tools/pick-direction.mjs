#!/usr/bin/env node
// Pilih arahan video (format, tipe visual V, palet, tipografi, layout, suara) secara
// DETERMINISTIK dari tools/direction-map.json + STYLE-LEDGER.md.
//
// Kenapa script, bukan ingatan agent: ledger pernah dibaca salah dua kali — bagian
// "V terkunci" basi, dan baris 12 (cek-kelola-proses-linux) memakai V19 tepat setelah
// baris 11 memakai V19 karena catatannya salah menyebut "3 baris terakhir V2/V10/V5".
// Hitung rotasi tidak boleh bergantung pada pembacaan manual.
//
// Pakai:
//   node tools/pick-direction.mjs --status
//   node tools/pick-direction.mjs --table
//   node tools/pick-direction.mjs --category tech-konsep --slug apa-itu-docker \
//        --topic "apa itu docker?" [--force-v V23] [--force-format F8] [--write]
//   node tools/pick-direction.mjs --record videos/<slug>      # tambah baris ledger
//   node tools/pick-direction.mjs --series series/<nama> --episode 1 --slug <nama>-eps1 --topic "..." --write
//        mode serial: gaya/palet/font/suara/musik DIKUNCI dari series/<nama>/series.json; hanya layout K
//        yang berotasi per episode (rotasi anti-monoton berlaku antar-serial, bukan antar-episode).
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MAP = JSON.parse(readFileSync(join(ROOT, "tools/direction-map.json"), "utf8"));
const LEDGER = join(ROOT, "STYLE-LEDGER.md");

const argv = process.argv.slice(2);
const arg = (k, d) => (argv.includes(`--${k}`) ? argv[argv.indexOf(`--${k}`) + 1] : d);
const has = (k) => argv.includes(`--${k}`);

// ---------- ledger ----------
function readLedger() {
  const lines = readFileSync(LEDGER, "utf8").split("\n");
  const hi = lines.findIndex((l) => /^\|\s*#\s*\|/.test(l));
  if (hi === -1) throw new Error("header tabel ledger (| # | ...) tidak ditemukan");
  const header = lines[hi].split("|").slice(1, -1).map((s) => s.trim());
  const rows = [];
  lines.forEach((l, i) => {
    if (!/^\|\s*\d+\s*\|/.test(l)) return;
    const cells = l.split("|").slice(1, -1).map((s) => s.trim());
    if (cells.length !== header.length) {
      throw new Error(`ledger baris file ${i + 1}: ${cells.length} kolom, header ${header.length}`);
    }
    const r = Object.fromEntries(header.map((h, j) => [h, cells[j]]));
    const code = (col, re) => (r[col] ?? "").match(re)?.[0] ?? null;
    rows.push({
      line: i,
      n: Number(cells[0]),
      slug: (r["Slug"] ?? "").replace(/[`()]/g, "").trim(),
      v: code("V utama", /V\d+/),
      accent: code("V aksen", /V\d+/),
      p: code("Palet", /P\d+/),
      t: code("Tipografi", /T\d+/),
      f: code("Format", /F\d+/),
      k: code("Layout (K)", /K\d+/),
      raw: r,
    });
  });
  rows.sort((a, b) => a.n - b.n);
  return { lines, header, rows };
}

const filled = (rows, key) => rows.filter((r) => r[key]);
const lastN = (rows, key, n) => filled(rows, key).slice(-n).map((r) => r[key]);
function sinceLastUse(rows, key, value) {
  const list = filled(rows, key);
  for (let i = list.length - 1; i >= 0; i--) if (list[i][key] === value) return list.length - 1 - i;
  return Infinity;
}
function hash(s) {
  let h = 2166136261;
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  return h;
}

// ---------- status ----------
function status() {
  const { rows } = readLedger();
  const lockedV = lastN(rows, "v", MAP.rotation.v_window);
  const lastV = lockedV.at(-1);
  console.log(`ledger: ${rows.length} baris, ${filled(rows, "v").length} dengan kode V`);
  console.log(`\n5 baris terakhir:`);
  for (const r of rows.slice(-5)) {
    console.log(`  #${r.n} ${r.slug.padEnd(42)} V=${r.v ?? "—"} aksen=${r.accent ?? "—"} P=${r.p ?? "—"} T=${r.t ?? "—"} F=${r.f ?? "—"} K=${r.k ?? "—"}`);
  }
  console.log(`\nV terkunci (${MAP.rotation.v_window} terakhir): ${lockedV.join(", ")}`);
  if (lastV) console.log(`keluarga terkunci (video terakhir): ${MAP.styles[lastV]?.family} (${lastV})`);
  console.log(`palet terkunci: ${lastN(rows, "p", MAP.rotation.palette_window).join(", ")}`);
  console.log(`tipografi terkunci: ${lastN(rows, "t", MAP.rotation.typography_window).join(", ")}`);
  const never = Object.keys(MAP.styles).filter((v) => sinceLastUse(rows, "v", v) === Infinity);
  console.log(`V belum pernah dipakai: ${never.join(", ")}`);
  // pelanggaran rotasi historis
  const vs = filled(rows, "v");
  for (let i = 1; i < vs.length; i++) {
    const prev = vs.slice(Math.max(0, i - MAP.rotation.v_window), i).map((r) => r.v);
    if (prev.includes(vs[i].v)) console.log(`  catatan: #${vs[i].n} ${vs[i].slug} memakai ${vs[i].v} padahal ada di ${MAP.rotation.v_window} baris sebelumnya`);
  }
}

// ---------- table ----------
function table() {
  console.log("| Kelompok | Kategori | Contoh topik | Format | Tipe V (urut cocok) | Suara | Aturan |");
  console.log("|---|---|---|---|---|---|---|");
  for (const [c, d] of Object.entries(MAP.categories)) {
    const roles = Object.entries(MAP.casts[d.voice]).map(([r, x]) => `${r}=${x.voice}`).join(", ");
    const fl = Object.entries(d).filter(([, v]) => v === true).map(([k]) => k).join(", ") || "—";
    console.log(`| ${d.group ?? "—"} | \`${c}\` | ${d.desc} | ${d.formats.join(", ")} | ${d.styles.join(", ")} | ${roles} | ${fl} |`);
  }
}

// ---------- pick ----------
function pickFrom(list, rows, key, window, fallbackAll = true) {
  const recent = lastN(rows, key, window);
  const ok = list.filter((x) => !recent.includes(x));
  if (ok.length) return { value: ok[0], excluded: list.filter((x) => recent.includes(x)) };
  if (!fallbackAll) return { value: null, excluded: list };
  const lru = [...list].sort((a, b) => sinceLastUse(rows, key, b) - sinceLastUse(rows, key, a));
  return { value: lru[0], excluded: [], relaxed: true };
}

function pick() {
  const category = arg("category");
  const slug = arg("slug");
  if (!category || !slug) {
    console.error("Butuh --category <kategori> --slug <slug>. Kategori: " + Object.keys(MAP.categories).join(", "));
    process.exit(2);
  }
  const cat = MAP.categories[category];
  if (!cat) {
    console.error(`kategori '${category}' tidak ada. Pilihan: ${Object.keys(MAP.categories).join(", ")}`);
    process.exit(2);
  }
  const { rows } = readLedger();
  const notes = [];
  const lockedV = lastN(rows, "v", MAP.rotation.v_window);
  const lastV = lockedV.at(-1);
  const lastFamily = lastV ? MAP.styles[lastV]?.family : null;

  // --- tipe visual V
  const n = cat.styles.length;
  const scored = cat.styles.map((v, i) => {
    const s = MAP.styles[v];
    const since = sinceLastUse(rows, "v", v);
    const fit = ((n - i) / n) * 10;
    const recency = Math.min(since === Infinity ? 12 : since, 12) * 0.5;
    const cost = s.cost === "berat" ? -4 : s.cost === "sedang" ? -0.5 : 0;
    const blocked = lockedV.includes(v) ? `dipakai di ${MAP.rotation.v_window} video terakhir`
      : s.family === lastFamily ? `keluarga '${s.family}' sama dengan video terakhir (${lastV})` : null;
    const tie = (hash(slug + v) % 1000) / 100000;
    return { v, score: +(fit + recency + cost + tie).toFixed(3), blocked, since };
  }).sort((a, b) => b.score - a.score);

  let main;
  const forced = arg("force-v");
  if (forced) {
    if (!MAP.styles[forced]) { console.error(`V '${forced}' tidak dikenal`); process.exit(2); }
    main = forced;
    const why = scored.find((s) => s.v === forced)?.blocked ?? (lockedV.includes(forced) ? "terkunci rotasi" : null);
    if (why) notes.push(`OVERRIDE rotasi: ${forced} dipaksa walau ${why}. Tulis alasannya di ledger.`);
    if (!cat.styles.includes(forced)) notes.push(`${forced} di luar daftar kandidat kategori ${category}.`);
  } else {
    let open = scored.filter((s) => !s.blocked);
    if (!open.length) {
      open = scored.filter((s) => !lockedV.includes(s.v));
      notes.push("semua kandidat terblokir keluarga; aturan keluarga dilonggarkan");
    }
    main = open[0].v;
  }
  const S = MAP.styles[main];

  // --- aksen
  // orang nyata tidak boleh digambar (karikatur/maskot/siluet bisa terbaca sebagai orangnya)
  const FIGURATIVE = ["V23", "V25", "V20"];
  const accentPool = S.accents.filter((a) => a !== main && a !== lastV && !(cat.real_persons && FIGURATIVE.includes(a)));
  const accent = accentPool.sort((a, b) => sinceLastUse(rows, "accent", b) - sinceLastUse(rows, "accent", a))[0] ?? null;

  // --- palet, tipografi
  const pal = pickFrom(S.palettes, rows, "p", MAP.rotation.palette_window);
  const typ = pickFrom(S.typography, rows, "t", MAP.rotation.typography_window);
  if (pal.relaxed) notes.push(`semua palet card ${main} baru dipakai; pakai yang paling lama: ${pal.value}`);
  if (typ.relaxed) notes.push(`semua tipografi card ${main} baru dipakai; pakai yang paling lama: ${typ.value}`);

  // --- format
  // Format mengikuti isi (urutan kategori). Rotasi hanya memotong "streak": format yang
  // sudah dipakai `format_window` + 1 video berturut-turut diganti kandidat berikutnya.
  let format = arg("force-format");
  if (!format) {
    const recentF = lastN(rows, "f", MAP.rotation.format_window + 1);
    const streak = recentF.length === MAP.rotation.format_window + 1 && recentF.every((f) => f === recentF[0]) ? recentF[0] : null;
    format = cat.formats.find((f) => f !== streak) ?? cat.formats[0];
    if (streak && format !== cat.formats[0]) notes.push(`format ${streak} sudah ${recentF.length}× beruntun → ${format}`);
  }
  const F = MAP.formats[format];
  if (!F) { console.error(`format '${format}' tidak dikenal`); process.exit(2); }

  // --- layout: selang-seling style & format, dominan ≠ video terakhir, K0 tidak pernah dipilih
  const lastK = lastN(rows, "k", 1)[0];
  const merged = [];
  for (let i = 0; i < 6; i++) for (const src of [S.layouts, F.layouts]) if (src[i] && !merged.includes(src[i])) merged.push(src[i]);
  if (merged[0] === lastK && merged.length > 1) merged.push(merged.shift());
  const layouts = merged.filter((k) => k !== "K0").slice(0, 6);
  if (layouts.length < 4) notes.push("kurang dari 4 layout kandidat — tambah manual dari daftar K");

  // --- suara
  const cast = MAP.casts[cat.voice];
  const castOut = Object.fromEntries(Object.entries(cast).map(([role, c]) => [role, { ...c, id: MAP.voices[c.voice].id }]));
  const multi = Object.keys(cast).length > 1;
  if (F.multi_voice && !multi) notes.push(`format ${format} butuh >1 suara; tambahkan tokoh dari cast-keluarga/cast-anak`);

  const story = /^kisah-/.test(category);
  const out = {
    slug,
    topic: arg("topic", ""),
    category,
    created: new Date().toISOString(),
    duration_target: story ? [90, 120] : [60, 90],
    format: { code: format, name: F.name, beats: F.beats },
    style: { main, name: S.name, family: S.family, card: `.claude/skills/video-reels/styles/${S.card}`,
             accent, accent_name: accent ? MAP.styles[accent].name : null, cost: S.cost,
             min_occ: S.min_occ ?? null },
    palette: { code: pal.value, ...MAP.palettes[pal.value] },
    typography: { code: typ.value, ...MAP.typography[typ.value] },
    layouts,
    voice: { preset: cat.voice, multi_voice: multi, cast: castOut },
    music: cat.music,
    // semua properti boolean true di kategori = aturan konten (lihat peta-gaya.md §8)
    flags: Object.fromEntries(Object.entries(cat).filter(([, v]) => v === true)),
    seed: hash(slug) % 100000,
    rotation: {
      locked_v: lockedV, locked_family: lastFamily,
      locked_palette: lastN(rows, "p", MAP.rotation.palette_window),
      locked_typography: lastN(rows, "t", MAP.rotation.typography_window),
      last_layout: lastK ?? null,
    },
    alternatives: scored.slice(0, 5),
    notes,
  };

  console.log(`arah untuk '${slug}' (${category})`);
  console.log(`  format   ${format}  ${F.name}`);
  console.log(`  visual   ${main}  ${S.name}  [keluarga ${S.family}, biaya ${S.cost}]  aksen ${accent ?? "—"}`);
  console.log(`  palet    ${pal.value}  ${MAP.palettes[pal.value].name}`);
  console.log(`  tipo     ${typ.value}  ${MAP.typography[typ.value].display} + ${MAP.typography[typ.value].accent}`);
  console.log(`  layout   ${layouts.join(" · ")}  (terakhir: ${lastK ?? "—"})`);
  console.log(`  suara    ${cat.voice}: ${Object.entries(cast).map(([r, c]) => `${r}=${c.voice}${c.pitch ? `(${c.pitch > 0 ? "+" : ""}${c.pitch}st)` : ""}`).join(", ")}`);
  console.log(`  durasi   ${out.duration_target.join("–")} detik`);
  console.log(`  kandidat ${scored.slice(0, 5).map((s) => `${s.v}:${s.score}${s.blocked ? "✗" : ""}`).join("  ")}`);
  const fl = Object.entries(out.flags).filter(([, v]) => v).map(([k]) => k);
  if (fl.length) console.log(`  aturan   ${fl.join(", ")}  → baca peta-gaya.md §8`);
  for (const nt of notes) console.log(`  ! ${nt}`);

  if (has("write")) {
    const dir = join(ROOT, "videos", slug);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "direction.json"), JSON.stringify(out, null, 2) + "\n");
    console.log(`→ videos/${slug}/direction.json`);
  }
}


// ---------- serial ----------
function seriesPick() {
  const sdir = arg("series"), ep = Number(arg("episode", "1")), slug = arg("slug");
  if (!slug) { console.error("butuh --slug <nama>-eps<n>"); process.exit(2); }
  const S = JSON.parse(readFileSync(join(ROOT, sdir, "series.json"), "utf8"));
  const cat = MAP.categories[S.category];
  const F = MAP.formats.F2, St = MAP.styles[S.lock.style.main];
  const voiceId = (v) => (MAP.voices[v]?.id ?? (/^[0-9a-f-]{36}$/.test(v) ? v : null));
  const cast = Object.fromEntries(Object.entries(S.cast).map(([r, c]) => {
    const id = voiceId(c.voice); if (!id) throw new Error(`suara '${c.voice}' (${r}) tidak dikenal di direction-map.json`);
    return [r, { voice: c.voice, speed: c.speed, ...(c.pitch ? { pitch: c.pitch } : {}), ...(c.fx ? { fx: c.fx } : {}), id }]; }));
  const { rows } = readLedger();
  const prev = rows.filter((r) => r.slug?.startsWith(`${S.slug}-eps`)).at(-1);
  const pool = [...new Set([...(St.layouts || []), ...(F.layouts || []), "K4", "K6"])];
  const rot = (ep - 1) % pool.length;
  let layouts = [...pool.slice(rot), ...pool.slice(0, rot)];
  if (prev?.k && layouts[0] === prev.k) layouts = [...layouts.slice(1), layouts[0]];
  const T = MAP.typography[S.lock.typography.code];
  const out = {
    slug, topic: arg("topic", ""), category: S.category, created: new Date().toISOString(),
    series: { slug: S.slug, title: S.title, episode: ep, dir: sdir },
    duration_target: S.duration_target,
    format: { code: "F2", name: `${F.name} (serial)`, beats: S.episode_beats },
    style: { main: S.lock.style.main, name: St.name, family: St.family, card: `.claude/skills/video-reels/styles/${St.card}`,
             accent: S.lock.style.accent ?? null, accent_name: null, cost: St.cost, min_occ: St.min_occ ?? null },
    palette: { code: S.lock.palette.code, name: S.lock.palette.name, colors: S.lock.palette.colors },
    typography: { code: S.lock.typography.code, ...T },
    layouts, voice: { preset: `serial:${S.slug}`, multi_voice: true, cast },
    music: S.lock.music,
    flags: Object.fromEntries(Object.entries(cat).filter(([, v]) => v === true)),
    seed: hash(slug) % 100000,
    rotation: { note: "arahan dikunci serial; rotasi V/palet/tipografi tidak berlaku", previous_episode: prev?.slug ?? null },
    alternatives: [], notes: [],
  };
  console.log(`serial '${S.title}' eps ${ep} → ${slug}`);
  console.log(`  visual   ${out.style.main} ${out.style.name} · palet ${out.palette.code} ${out.palette.name} · tipo ${out.typography.code}`);
  console.log(`  layout   ${layouts.join(" · ")}`);
  console.log(`  suara    ${Object.entries(cast).map(([r, c]) => `${r}=${c.voice}${c.pitch ? `(${c.pitch > 0 ? "+" : ""}${c.pitch}st)` : ""}${c.fx ? `[${c.fx}]` : ""}`).join(", ")}`);
  if (has("write")) {
    const dir = join(ROOT, "videos", slug); mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "direction.json"), JSON.stringify(out, null, 2) + "\n");
    console.log(`→ videos/${slug}/direction.json`);
  }
}

// ---------- record ----------
function record() {
  const dir = arg("record");
  const d = JSON.parse(readFileSync(join(dir, "direction.json"), "utf8"));
  const rowPath = join(dir, "ledger-row.json");
  if (!existsSync(rowPath)) {
    console.error(`butuh ${rowPath}: {"gerak": "...", "tekstur": "...", "blend": "ya|tidak", "catatan": "...", "presenter": "tidak", "mode_presenter": "—", "layouts_aktual": ["K.."], "suara": "..."}`);
    process.exit(2);
  }
  const x = JSON.parse(readFileSync(rowPath, "utf8"));
  const { lines, header, rows } = readLedger();
  if (rows.some((r) => r.slug === d.slug) && !has("force")) {
    console.error(`slug ${d.slug} sudah ada di ledger (pakai --force untuk menambah baris kedua)`);
    process.exit(1);
  }
  const clean = (s) => String(s ?? "—").replace(/\|/g, "/").replace(/\n/g, " ").trim() || "—";
  const date = new Date().toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta", day: "numeric", month: "short", year: "numeric" });
  const T = MAP.typography[d.typography.code];
  const ks = x.layouts_aktual?.length ? x.layouts_aktual : d.layouts;
  const castTxt = x.suara ?? Object.entries(d.voice.cast).map(([r, c]) => `${r}=${c.voice} ${c.speed}${c.pitch ? ` ${c.pitch > 0 ? "+" : ""}${c.pitch}st` : ""}`).join(", ");
  const cell = {
    "#": String(Math.max(...rows.map((r) => r.n)) + 1),
    "Tanggal": date,
    "Slug": `\`${d.slug}\``,
    "V utama": `**${d.style.main}** (${d.style.name})`,
    "V aksen": d.style.accent ? `${d.style.accent} (${d.style.accent_name})` : "—",
    "Palet": `${d.palette.code} (${d.palette.name})`,
    "Tipografi": `${d.typography.code} (${T.display} + ${T.accent})`,
    "Bahasa gerak": x.gerak,
    "Tekstur": x.tekstur,
    "Blend 120→60": x.blend ?? "ya",
    "Presenter": x.presenter ?? "tidak",
    "Mode presenter": x.mode_presenter ?? "—",
    "Catatan": x.catatan,
    "Format": `${d.format.code} (${d.format.name})`,
    "Layout (K)": ks.join(" · "),
    "Suara": castTxt,
  };
  const missing = header.filter((h) => !(h in cell));
  if (missing.length) throw new Error(`kolom ledger tidak dikenal: ${missing.join(", ")}`);
  const line = "| " + header.map((h) => clean(cell[h])).join(" | ") + " |";
  const at = rows.at(-1).line + 1;
  lines.splice(at, 0, line);
  writeFileSync(LEDGER, lines.join("\n"));
  console.log(`ledger +1 baris (#${cell["#"]}) di baris file ${at + 1}`);
}

if (has("status")) status();
else if (has("table")) table();
else if (has("record")) record();
else if (has("series")) seriesPick();
else pick();
