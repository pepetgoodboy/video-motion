// Cartesia TTS → voiceover per scene untuk project HyperFrames.
// Pakai: node tools/cartesia-vo.mjs --list-voices
//        node tools/cartesia-vo.mjs --script <file.json> --out <dir> [--voice <id>] [--speed 1.0]
//
// API key dibaca dari env CARTESIA_API_KEY (jangan ditulis di file).
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";

const API = "https://api.cartesia.ai";
const VERSION = "2026-08-14";
const KEY = process.env.CARTESIA_API_KEY;

const argv = process.argv.slice(2);
const arg = (name, dflt) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? dflt : argv[i + 1];
};
const has = (name) => argv.includes(`--${name}`);

if (!KEY) {
  console.error("CARTESIA_API_KEY belum di-set. Jalankan: export CARTESIA_API_KEY=sk_car_...");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${KEY}`,
  "Cartesia-Version": VERSION,
  "Content-Type": "application/json",
};

async function listVoices() {
  const lang = arg("language", "id");
  const url = `${API}/voices?language=${encodeURIComponent(lang)}&limit=100&expand[]=preview_file_url`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`voices ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.data ?? [];
}

async function tts({ transcript, voiceId, outPath, speed = 1.0, emotion }) {
  const body = {
    model_id: arg("model", "sonic-3.6"),
    transcript,
    voice: { id: voiceId },
    language: "id",
    output_format: { container: "mp3", sample_rate: 44100, bit_rate: 128000 },
    generation_config: { speed, volume: 1.0, ...(emotion ? { emotion } : {}) },
  };
  const res = await fetch(`${API}/tts/bytes`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`tts ${res.status}: ${await res.text()}`);
  const buf = Buffer.from(await res.arrayBuffer());
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, buf);
  return buf.length;
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
const voiceId = arg("voice");
const speed = Number(arg("speed", "1.0"));

const { readFileSync } = await import("node:fs");
const lines = JSON.parse(readFileSync(scriptPath, "utf8"));
if (!voiceId) {
  console.error("Butuh --voice <id>. Lihat pilihan dengan --list-voices");
  process.exit(1);
}

const manifest = [];
for (const line of lines) {
  const outPath = join(outDir, `${line.id}.mp3`);
  if (existsSync(outPath) && !has("force")) {
    console.log(`${line.id}: ada, skip`);
    manifest.push({ ...line, file: outPath, skipped: true });
    continue;
  }
  const bytes = await tts({ transcript: line.text, voiceId, outPath, speed, emotion: line.emotion });
  console.log(`${line.id}: ${(bytes / 1024).toFixed(0)} KB → ${outPath}`);
  manifest.push({ ...line, file: outPath });
}
writeFileSync(join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`manifest → ${join(outDir, "manifest.json")}`);
