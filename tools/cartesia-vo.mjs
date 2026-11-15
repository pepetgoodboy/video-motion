// Cartesia TTS → voiceover per baris untuk project HyperFrames. Mendukung satu narator
// (format lama) maupun banyak tokoh (cast).
//
// Pakai:
//   node tools/cartesia-vo.mjs --list-voices [--language id]
//   node tools/cartesia-vo.mjs --script vo-script.json --out assets/vo [--voice Galang] [--speed 1.0]
//   node tools/cartesia-vo.mjs --script vo-script.json --out assets/vo --dry-run   # cek cast, 0 kredit
//   node tools/cartesia-vo.mjs ... --review        # + assets/vo/_review.mp3 (semua baris digabung)
//
// Format script:
//   lama  : [{ "id": "s1a", "scene": "S1", "text": "..." }]            (butuh --voice)
//   cast  : { "cast": { "narator": {"voice":"Safira","speed":1.0},
//                       "anak":    {"voice":"Citra","speed":1.06,"pitch":2} },
//             "lines": [{ "id": "s1a", "scene": "S1", "speaker": "narator", "text": "..." }] }
//   Prioritas per baris: line.voice/speed > cast[speaker] > --voice/--speed.
//   voice boleh nama (lihat tools/direction-map.json → voices) atau UUID.
//   pitch = semitone, diterapkan lokal lewat ffmpeg rubberband (bukan fitur Cartesia).
//   language = kode bahasa baris itu (default id); mis. "en" untuk contoh pelafalan Inggris
//   dengan suara bilingual (Siti: id-ID + en-US). Andi dihapus dari katalog Cartesia (14 Nov 2026).
//
// Cache: file dilewati bila teks+suara+speed+pitch sama dengan manifest sebelumnya
// (hemat kuota). Ubah salah satunya → baris itu saja yang digenerate ulang. --force = semua.
//
// API key dibaca dari env CARTESIA_API_KEY (jalankan dengan node --env-file=../../.env).
// Punya beberapa key (kuota habis)? --key-env CARTESIA_API_KEY_3 → pakai variabel itu (nilainya tidak dicetak).
import { writeFileSync, mkdirSync, existsSync, readFileSync, renameSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";

const API = "https://api.cartesia.ai";
const VERSION = "2026-08-14";
const KEY_ENV = (() => { const i = process.argv.indexOf("--key-env"); return i === -1 ? "CARTESIA_API_KEY" : process.argv[i + 1]; })();
const KEY = process.env[KEY_ENV];
const MAP = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), "direction-map.json"), "utf8"));

const argv = process.argv.slice(2);
const arg = (name, dflt) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? dflt : argv[i + 1];
};
const has = (name) => argv.includes(`--${name}`);
const DRY = has("dry-run");

if (!KEY && !DRY) {
  console.error(`${KEY_ENV} belum di-set.`, " Jalankan dengan: node --env-file=../../.env tools/cartesia-vo.mjs ...");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${KEY}`,
  "Cartesia-Version": VERSION,
  "Content-Type": "application/json",
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function resolveVoice(v) {
  if (!v) return null;
  if (UUID.test(v)) return { id: v, name: Object.entries(MAP.voices).find(([, x]) => x.id === v)?.[0] ?? v };
  const hit = Object.entries(MAP.voices).find(([n]) => n.toLowerCase() === String(v).toLowerCase());
  if (!hit) throw new Error(`suara '${v}' tidak dikenal. Pilihan: ${Object.keys(MAP.voices).join(", ")} (atau UUID)`);
  return { id: hit[1].id, name: hit[0] };
}

async function listVoices() {
  const lang = arg("language", "id");
  const url = `${API}/voices?language=${encodeURIComponent(lang)}&limit=100&expand[]=preview_file_url`;
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`voices ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.data ?? [];
}

async function tts({ transcript, voiceId, outPath, speed = 1.0, emotion, language = "id" }) {
  const body = {
    model_id: arg("model", "sonic-3.6"),
    transcript,
    voice: { id: voiceId },
    language,
    output_format: { container: "mp3", sample_rate: 44100, bit_rate: 128000 },
    generation_config: { speed, volume: 1.0, ...(emotion ? { emotion } : {}) },
  };
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(`${API}/tts/bytes`, {
        method: "POST", headers, body: JSON.stringify(body), signal: AbortSignal.timeout(90000),
      });
      if (res.status === 402 || res.status === 401) throw Object.assign(new Error(`tts ${res.status}: ${await res.text()}`), { fatal: true });
      if (!res.ok) throw new Error(`tts ${res.status}: ${await res.text()}`);
      const buf = Buffer.from(await res.arrayBuffer());
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, buf);
      return buf.length;
    } catch (e) {
      lastErr = e;
      if (e.fatal || attempt === 3) break;
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
  throw lastErr;
}

function pitchShift(file, semitones) {
  const tmp = file.replace(/\.mp3$/, ".pitch.mp3");
  const ratio = Math.pow(2, semitones / 12).toFixed(5);
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", file, "-af", `rubberband=pitch=${ratio}:formant=shifted`,
    "-c:a", "libmp3lame", "-b:a", "192k", tmp]);
  renameSync(tmp, file);
}

function durationOf(file) {
  try {
    return Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).toString().trim());
  } catch {
    return null;
  }
}

if (has("list-voices")) {
  const voices = await listVoices();
  console.log(`voices (language=${arg("language", "id")}): ${voices.length}`);
  for (const v of voices) {
    const locale = v.accents?.map((a) => a.locale).join(",") ?? v.language;
    console.log(`  ${v.id}  ${v.name}  [${v.gender}] ${locale}  ${v.description ?? ""}`);
  }
  process.exit(0);
}

const scriptPath = arg("script");
if (!scriptPath) {
  console.error("Butuh --script <file.json> atau --list-voices");
  process.exit(1);
}
const outDir = arg("out", "assets/vo");
const raw = JSON.parse(readFileSync(scriptPath, "utf8"));
const lines = Array.isArray(raw) ? raw : raw.lines;
const cast = Array.isArray(raw) ? {} : (raw.cast ?? {});
const defVoice = arg("voice");
const defSpeed = Number(arg("speed", "1.0"));

// --- resolve cast per baris + validasi sebelum memakai kredit
const plan = lines.map((line) => {
  const role = line.speaker ? cast[line.speaker] : null;
  if (line.speaker && !role) throw new Error(`${line.id}: speaker '${line.speaker}' tidak ada di cast (${Object.keys(cast).join(", ")})`);
  const v = resolveVoice(line.voice ?? role?.voice ?? defVoice);
  if (!v) throw new Error(`${line.id}: tidak ada suara. Isi cast/speaker atau --voice`);
  const speed = Number(line.speed ?? role?.speed ?? defSpeed);
  if (!(speed >= 0.6 && speed <= 1.5)) throw new Error(`${line.id}: speed ${speed} di luar 0.6–1.5`);
  const pitch = Number(line.pitch ?? role?.pitch ?? 0);
  const language = line.language ?? role?.language ?? arg("language", "id");
  const hash = createHash("sha1").update(JSON.stringify([line.text, v.id, speed, pitch, line.emotion ?? null, language === "id" ? null : language])).digest("hex").slice(0, 12);
  return { line, voice: v, speed, pitch, language, hash, speaker: line.speaker ?? "narator" };
});

// dua tokoh berbeda tidak boleh terdengar identik
const sig = new Map();
for (const p of plan) {
  const k = `${p.voice.id}|${p.pitch}`;
  if (sig.has(k) && sig.get(k) !== p.speaker) {
    console.warn(`PERINGATAN: '${p.speaker}' dan '${sig.get(k)}' memakai suara+pitch yang sama (${p.voice.name}, ${p.pitch}st) — penonton tidak bisa membedakan.`);
  }
  sig.set(k, p.speaker);
}

if (DRY) {
  const chars = plan.reduce((a, p) => a + p.line.text.length, 0);
  console.log(`dry-run: ${plan.length} baris, ${chars} karakter, ${new Set(plan.map((p) => p.speaker)).size} pembicara`);
  for (const p of plan) {
    console.log(`  ${p.line.id.padEnd(6)} ${p.speaker.padEnd(15)} ${p.voice.name.padEnd(7)} speed ${p.speed}${p.pitch ? ` pitch ${p.pitch > 0 ? "+" : ""}${p.pitch}st` : ""}${p.language !== "id" ? ` [${p.language}]` : ""}  "${p.line.text.slice(0, 60)}${p.line.text.length > 60 ? "…" : ""}"`);
  }
  process.exit(0);
}

const manPath = join(outDir, "manifest.json");
const prev = existsSync(manPath) ? JSON.parse(readFileSync(manPath, "utf8")) : [];
const prevById = new Map(prev.map((m) => [m.id, m]));

const manifest = [];
for (const p of plan) {
  const outPath = join(outDir, `${p.line.id}.mp3`);
  const old = prevById.get(p.line.id);
  // manifest lama (tanpa hash) dipercaya selama tidak ada pitch — supaya project lama tidak regenerate
  const fresh = existsSync(outPath) && (old?.hash === p.hash || (!old?.hash && !p.pitch));
  if (fresh && !has("force")) {
    console.log(`${p.line.id}: sama dengan sebelumnya, skip`);
    manifest.push({ ...old, ...p.line, file: outPath, speaker: p.speaker, voice: p.voice.name, speed: p.speed, pitch: p.pitch, hash: p.hash, duration: durationOf(outPath) });
    continue;
  }
  const bytes = await tts({ transcript: p.line.text, voiceId: p.voice.id, outPath, speed: p.speed, emotion: p.line.emotion, language: p.language });
  if (p.pitch) pitchShift(outPath, p.pitch);
  const dur = durationOf(outPath);
  console.log(`${p.line.id}: ${p.speaker}/${p.voice.name} ${(bytes / 1024).toFixed(0)} KB ${dur?.toFixed(2)}s → ${outPath}`);
  manifest.push({ ...p.line, file: outPath, speaker: p.speaker, voice: p.voice.name, speed: p.speed, pitch: p.pitch, hash: p.hash, duration: dur });
}
writeFileSync(manPath, JSON.stringify(manifest, null, 2));
const total = manifest.reduce((a, m) => a + (m.duration ?? 0), 0);
console.log(`manifest → ${manPath}  (total VO ${total.toFixed(2)}s, ${manifest.length} baris)`);

if (has("review")) {
  // gabung semua baris + jeda 0.35s, supaya bisa didengar sekali putar
  const list = join(outDir, "_review.txt");
  const gap = join(outDir, "_gap.mp3");
  execFileSync("ffmpeg", ["-v", "error", "-y", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono", "-t", "0.35", "-c:a", "libmp3lame", "-b:a", "128k", gap]);
  writeFileSync(list, manifest.flatMap((m) => [`file '${m.id}.mp3'`, `file '_gap.mp3'`]).join("\n"));
  const out = join(outDir, "_review.mp3");
  execFileSync("ffmpeg", ["-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", list, "-ac", "1", "-c:a", "libmp3lame", "-b:a", "128k", out]);
  unlinkSync(list); unlinkSync(gap);
  console.log(`review → ${out}`);
}
