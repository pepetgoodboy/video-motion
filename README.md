# Video Motion — brief markdown → Reels 9:16

Pipeline video pendek 1080×1920@60fps dari satu file brief `.md`, memakai
**HyperFrames** (HTML + CSS + GSAP timeline `paused`) lalu dirender ke MP4.

Tidak ada editor timeline, tidak ada After Effects, tidak ada footage yang harus direkam. Yang
kamu tulis adalah HTML; yang keluar MP4.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Node](https://img.shields.io/badge/node-%E2%89%A522-brightgreen)
![HyperFrames](https://img.shields.io/badge/hyperframes-0.8.169-blue)

> **English TL;DR** — A brief-markdown → vertical-video pipeline. HyperFrames renders HTML+GSAP
> to MP4. Needs Node ≥22, ffmpeg, Chromium, plus optional API keys (Cartesia for Indonesian
> voiceover, HeyGen for the music catalog). Any coding agent can drive it; the repo is just
> markdown instructions plus shell commands.
>
> **Catatan repo:** README ini berbahasa Indonesia karena repo ini dipakai sehari-hari oleh penulis.
> Perintah shell, nama file, dan semua kode tetap bahasa Inggris — kalau kamu butuh versi English
> atau ingin menerjemahkan bagian tertentu, issue/PR dipersilakan.

**Quick start** (requirements §2 → instalasi §3 → alur §5):

```bash
# 1. clone + kredensial (semua key opsional — lihat .env.example)
git clone https://github.com/pepetgoodboy/video-motion.git && cd video-motion
cp .env.example .env && chmod 600 .env   # node 22+, ffmpeg, chromium — §2

# 2. bikin brief di chat AI (attach MASTER-PROMPT.md), simpan hasilnya:
#    source/brief-<slug>.md

# 3. jalankan agent di repo
claude
/video-reels source/brief-<slug>.md

# 4. hasil ada di sini
videos/<slug>/renders/<slug>.mp4
```

---

## 1. Cara kerjanya

```
brief .md                  HyperFrames project            MP4
────────────────           ─────────────────────          ────────────────
source/brief-x.md   →   videos/<slug>/index.html    →   renders/<slug>.mp4
(timing, palet, font,   + compositions/frames/*.html     1080×1920, 60fps,
 copy, SFX, VO)          + assets/{fonts,bgm,sfx,vo}     H.264 + AAC
```

Yang membuat hasilnya tidak "template AI": setiap brief **wajib** menyebut satu **Tipe Visual
(V1–V21)** — bahasa material dan bahasa gerak video itu (kinetic type, cutout paper, collage,
ASCII, split-flap, dst). Aturan rotasi di `STYLE-LEDGER.md` melarang tipe yang sama dipakai
di 3 video berurutan.

Alur kerja lengkap (langkah per langkah, termasuk gotcha render) ada di
`.claude/skills/video-reels/SKILL.md` dan `CLAUDE.md`.

### Contoh hasil

<!-- TODO penulis: isi link YouTube/Instagram/TikTok atau GIF preview di sini.
     README open source jauh lebih kuat kalau ada 1–2 contoh output yang bisa ditonton. -->

| Video | Tipe visual | Panjang | Brief |
|---|---|---|---|
| Bikin/salin/pindah/hapus file di Linux | V3 Collage + V1 aksen | 60 s | `source/brief-bikin-salin-pindah-hapus-file-di-linux.md` |
| Kenapa Docker image bisa membengkak | V2 Cutout + V6 Tactile | — | `source/brief-kenapa-docker-image-bisa-membengkak.md` |
| Struktur folder Linux | V2 Cutout craft | 68 s | `source/brief-struktur-folder-linux.md` |
| 8 command dasar terminal Linux | V10 UI/product motion | 90 s | `source/brief-8-command-dasar-terminal-linux.md` |
| Cloudflare Tunnel vs Nginx · PHP2Shell · Coba Linux tanpa hapus Windows | belum tercatat (brief pra-v2.1) | — | `source/` |

Semua brief contoh **ikut di-commit**; video hasilnya tidak (`.gitignore`), jadi bisa dirender
ulang sendiri sebagai titik awal. Brief yang dibuat sebelum MASTER-PROMPT v2.1 (31 Okt 2026) belum
punya kode V — untuk brief lama seperti itu, agent mencatat di `STYLE.md` kode V yang disimpulkan
dari isi brief (lihat baris 1–4 `STYLE-LEDGER.md`).

---

## 2. Requirements

| Kebutuhan | Status | Versi / catatan |
|---|---|---|
| **Node.js** | wajib | ≥ 22 (engine `hyperframes`). Node 24 juga OK |
| **ffmpeg + ffprobe** | wajib | render, blend 120→60, QA frame · `sudo apt install ffmpeg` |
| **Chrome / Chromium** | wajib | dipakai HyperFrames untuk capture. `which chromium` |
| **npx** | wajib | CLI dipanggil `npx hyperframes@0.8.169` (tidak di-install global) |
| **Agent / LLM** | wajib | Claude Code, Codex CLI, Gemini CLI, OpenCode, atau model murah lain — lihat §6 |
| **CARTESIA_API_KEY** | opsional | hanya kalau brief punya voiceover bahasa Indonesia |
| **HEYGEN_API_KEY** *(atau OAuth)* | opsional-rekomendasi | katalog musik untuk BGM. Tanpa ini pakai `"mode": "generate"` (Lyria/MusicGen) atau BGM manual |
| **GEMINI_API_KEY** | opsional | jalur generate BGM kalau HeyGen tidak ada |
| **Python 3 + numpy + Pillow** | opsional | hanya untuk generator tekstur one-off (`tools/gen-tex-copier.py`) |
| **Git** | wajib | clone repo |

Cek cepat:

```bash
node -v          # v22+ atau v24+
ffmpeg -version | head -1
which chromium || which chromium-browser || which google-chrome
npx --yes hyperframes@0.8.169 --version    # 0.8.169
```

**SFX tidak butuh akun.** `shared/sfx/` sudah berisi 14 efek siap pakai; kalau tidak ada yang cocok,
engine mengambil dari Openverse (CC0/CC BY) tanpa kredensial.

**VO tidak wajib.** Tanpa `CARTESIA_API_KEY` jalankan mode tanpa voice: teks di layar + BGM + SFX.
Banyak brief memang dirancang begitu.

---

## 3. Instalasi

```bash
git clone https://github.com/pepetgoodboy/video-motion.git
cd video-motion
```

### 3.1 Kredensial

Repo sudah menyediakan template `.env.example`. Salin, lalu isi yang kamu punya:

```bash
cp .env.example .env
chmod 600 .env       # .env sudah di-.gitignore
```

Isi `.env.example`:

```dotenv
# opsional — VO bahasa Indonesia (https://play.cartesia.ai/keys)
CARTESIA_API_KEY=

# opsional — katalog musik BGM (alternatif: npx hyperframes auth login)
HEYGEN_API_KEY=

# opsional — generate BGM tanpa HeyGen (Lyria, butuh google-genai)
GEMINI_API_KEY=
```

Ketiganya **opsional** — tanpa key, pipeline tetap jalan.

| Key | Ambil di | Dipakai untuk | Kalau kosong |
|---|---|---|---|
| `CARTESIA_API_KEY` | https://play.cartesia.ai/keys | TTS bahasa Indonesia (`sonic-3.6`) | mode tanpa VO (teks di layar + BGM + SFX) |
| `HEYGEN_API_KEY` | dashboard HeyGen | katalog musik BGM (API key = billing API) | ganti `audio_request.json` ke `"mode": "generate"` → Lyria (`GEMINI_API_KEY`) / MusicGen lokal; atau taruh sendiri `assets/bgm/track.mp3` |
| `GEMINI_API_KEY` | https://aistudio.google.com/apikey | generate BGM lewat Lyria | generate jatuh ke MusicGen lokal (butuh `transformers` + `torch`) |

Alternatif HeyGen tanpa API key: `npx hyperframes auth login` (sesi OAuth; free plan memberi akses
katalog musik). `audio.mjs` membaca env otomatis (`loadEnvFromDir()`, walk-up 5 level dari folder
video), jadi key di `.env` root langsung terpakai — tidak perlu `export`.

Catatan BGM: kalau `audio_request.json` menulis eksplisit `"mode": "retrieve"` dan tidak ada
kredensial HeyGen, BGM **dilewati** (bukan otomatis di-generate). `"auto"` (default) yang memilih
generate saat HeyGen tidak ada. Kalau generate dipakai, engine menjalankannya detached —
jalankan `wait-bgm.mjs` sebelum assemble.

> Jangan `export` key di `.bashrc`, jangan tempel key di chat/log. Kalau key sudah pernah bocor,
> revoke lalu buat baru.

### 3.2 Skill media-use (BGM/SFX)

Repo memakai engine audio dari skill `media-use` milik HyperFrames:

```bash
npx -y hyperframes@0.8.169 skills update media-use
```

HyperFrames memasang skill ke folder agent yang terdeteksi. Perintah di `CLAUDE.md` dan
`video-reels/SKILL.md` menunjuk `~/.agents/skills/media-use`; kalau instalasimu mendarat di
`~/.claude/skills/media-use`, buat tautan supaya path di dokumen tetap valid:

```bash
mkdir -p ~/.agents/skills
[ -e ~/.agents/skills/media-use ] || \
  ln -s ~/.claude/skills/media-use ~/.agents/skills/media-use
```

Butuh `heygen` CLI hanya kalau kamu memakai jalur katalog HeyGen:
https://developers.heygen.com/cli (v0.3.0+), lalu `npx hyperframes auth login`.

### 3.3 Verifikasi instalasi

```bash
npx --yes hyperframes@0.8.169 --version    # harus 0.8.169
node -e "console.log(typeof fetch)"        # function
```

Kalau render nanti gagal dengan `Chrome not found`:

```bash
export PUPPETEER_EXECUTABLE_PATH=$(which chromium)
```

---

## 4. Struktur repo

```
video-motion/
├── CLAUDE.md                  # aturan project untuk agent (dibaca Claude Code otomatis)
├── MASTER-PROMPT.md           # prompt generator brief — untuk chat model, BUKAN untuk agent
├── STYLE-LEDGER.md            # catatan rotasi tipe visual V1–V21 (dibaca sebelum tiap video)
├── SETUP-TERMUX.md            # panduan setup di Android (Termux + proot Ubuntu)
├── .env.example               # template kredensial (copy → .env, isi, jangan commit)
├── LICENSE                    # MIT — kode, skill, docs, brief
├── THIRD-PARTY.md             # lisensi GSAP, font, SFX (bukan MIT)
├── source/                    # brief .md (input)              ~15–55 KB per brief
├── shared/
│   ├── fonts/                 # 13 file .woff2 subset latin (SIL OFL) — dipakai ulang tiap video
│   ├── sfx/                   # 14 SFX siap pakai (lihat THIRD-PARTY.md untuk lisensi)
│   └── vendor/gsap.min.js     # GSAP lokal (jangan CDN — lihat §7)
├── tools/                     # cartesia-vo, qa-video, diagnose-motion, measure-*, gen-tex-copier
├── .claude/skills/
│   └── video-reels/           # pipeline + 21 style card + FEASIBILITY
└── videos/<slug>/             # satu project per video — TIDAK di-commit
    ├── index.html
    ├── compositions/frames/   # satu file per scene
    ├── assets/{fonts,bgm,sfx,vo}/
    ├── STYLE.md               # salinan parameter style card yang dipakai
    └── renders/{raw120,final}.mp4
```

`videos/` di-`.gitignore`: isinya render 20–100 MB dan aset per-video. Biaya disk
per video baru ≈ 40–70 MB (MP4 final 20–50 MB + BGM 2.3 MB + HTML/aset kecil), ditambah
`raw120.mp4` sementara yang bisa 2× ukuran final dan boleh dihapus setelah blend.

### Tool yang tersedia

| Tool | Fungsi |
|---|---|
| `tools/cartesia-vo.mjs` | TTS Indonesia per scene dari `vo-script.json` → `assets/vo/` + manifest |
| `tools/qa-video.mjs` | **gate utama MP4**: spec container, faststart, frame hitam, blok beku, gerak per scene, peak audio. Exit 1 kalau FAIL |
| `tools/diagnose-motion.mjs` | hitung frame bergerak & motion-collapse (patah-patah) |
| `tools/measure-frame-cost.mjs` | ukur biaya raster per frame satu komposisi (ms/frame, software raster) |
| `tools/measure-suite.mjs` | bandingkan beberapa probe secara terinterleasi (untuk uji gaya V13–V21) |
| `tools/verify-probes.mjs` | uji determinisme & kebenaran teknik (canvas identik antar render, morph path, oklch) |
| `tools/make-feasibility-probes.mjs` | regenerate semua probe uji kelayakan |
| `tools/gen-tex-copier.py` | generator tekstur fotokopi one-off (numpy + Pillow, seeded) |
| `tools/qa-struktur.py` | QA spesifik untuk video `struktur-folder-linux` (contoh gate domain-spesifik) |

---

## 5. Bikin satu video Reels — step by step

Contoh: brief 60 detik tentang topik apa pun. Ganti `<slug>` sesuai nama file brief.

### Langkah 1 — Buat brief di chat AI

Brief adalah **sumber kebenaran desain** — timing scene, palet, font, copy, SFX, semuanya ada di
sana. Agent tidak boleh mengarang.

Buka chat web apa pun yang bisa attach file: **ChatGPT, Claude.ai, Gemini, DeepSeek, dsb.**
(Ingat: ini langkah terpisah dari agent coding di Langkah 3 — yang menulis HTML nanti agent.)

1. **Attach `MASTER-PROMPT.md`** dari repo, lalu kirim:

   ```
   Coba pahami master prompt ini, sebelum saya memberikan topik tertentu.
   ```

2. Tunggu model konfirmasi paham (biasanya menjawab "Paham" + ringkasan singkat).
3. Baru kirim topiknya:

   ```
   Buatkan brief untuk topik <topik yang kamu mau>.
   ```

   Boleh tambah durasi/angle kalau perlu, mis. *"60 detik, untuk pemula Linux"*.
4. **Download file `.md`** hasilnya, lalu simpan ke folder `source/` di repo:

   ```
   source/brief-<slug>.md
   ```

   Nama file bebas; `slug` diambil dari nama file saat scaffold, jadi usahakan deskriptif
   (`brief-kenapa-docker-image-membengkak.md`, bukan `brief-1.md`).

Brief yang valid **wajib** punya bagian `Tipe visual (V)` (mis. `V3 + V1`) — agent akan berhenti
kalau tidak ada, bukan menebak. Kalau model belum mencantumkannya, minta tambahkan dulu di chat
sebelum disimpan. Contoh brief lengkap ada di `source/`.

> **Kenapa pakai chat web, bukan agent coding langsung?** Chat web punya akses web untuk riset
> fakta/sumber, dan hasilnya bisa kamu review dulu sebagai dokumen markdown sebelum masuk repo.
> Brief yang salah (timing tidak menyambung, kode V bentrok, klaim tanpa sumber) jauh lebih mahal
> diperbaiki setelah scene HTML ditulis.

### Langkah 2 — Cek rotasi tipe visual

```bash
sed -n '1,40p' STYLE-LEDGER.md
```

Tiga baris terakhir yang terisi = tipe yang **terkunci**. Kalau brief memakai salah satunya,
agent akan melaporkan konflik; pilih tipe lain atau konfirmasi override secara sadar.

### Langkah 3 — Jalankan pipeline

```bash
cd /path/ke/video-motion
claude                      # atau agent lain — lihat §6
```

Lalu:

```
/video-reels source/brief-<slug>.md
```

Bisa juga with attach — di Claude Code ketik `/video-reels ` lalu `@` untuk memilih file brief,
mis. `/video-reels @source/brief-kenapa-docker-image-membengkak.md`. Natural language juga jalan:
*"Bang, buatkan video reels dari brief ini: source/brief-x.md"*.

Yang dikerjakan agent:

| # | Tahap | Hasil |
|---|---|---|
| 0 | Baca brief + style card | `videos/<slug>/STYLE.md` |
| 1 | Scaffold portrait | `index.html` 1080×1920 (`--resolution=portrait`) |
| 2 | Font lokal | `assets/fonts/*.woff2` + `@font-face` di tiap scene |
| 3 | BGM + SFX (+VO) | `assets/bgm/track.mp3`, `assets/sfx/`, `assets/vo/` |
| 4 | Timing | `data-start`/`data-duration` tiap scene menyambung tepat |
| 5 | Komposisi | `compositions/frames/*.html`, satu file per scene |
| 6 | Validasi | `lint` + `check --at-transitions` + snapshot |
| 7 | Render | `renders/raw120.mp4` (120fps) → `renders/final.mp4` (blend 60fps) |
| 8 | QA MP4 | frame hitam, frame beku, loudness, spec container |
| 9 | Catat | baris baru di `STYLE-LEDGER.md` |

Render desktop CPU ≈ 3–10 menit untuk 60 detik (tergantung kepadatan scene dan mesin); laptop tua
atau HP bisa 20–40 menit.

### Langkah 4 — Perintah manual (kalau mau jalan sendiri)

```bash
SLUG=<slug>          # mis. bikin-salin-pindah-hapus-file-di-linux

# scaffold
npx -y hyperframes@0.8.169 init "videos/$SLUG" --non-interactive --example=blank \
  --skill=general-video --resolution=portrait
mkdir -p "videos/$SLUG"/{assets/{fonts,bgm,sfx,vo},compositions/frames,renders}

# font + sfx + gsap dari shared (semua lokal — jangan CDN)
cp shared/fonts/bricolage-latin.woff2 "videos/$SLUG/assets/fonts/"
cp shared/sfx/whoosh.mp3 "videos/$SLUG/assets/sfx/"
cp shared/vendor/gsap.min.js "videos/$SLUG/assets/gsap.min.js"

# PENTING: index.html hasil scaffold masih memuat GSAP dari CDN jsdelivr.
# Ganti baris itu dengan yang lokal — CDN = titik gagal (render gagal tapi exit 0):
#   <script src="./assets/gsap.min.js"></script>

cd "videos/$SLUG"

# audio_meta.json — bentuk minimal; `query` = deskripsi mood, `lines` untuk TTS
cat > audio_request.json <<'JSON'
{ "provider": "auto", "lang": "id", "speed": 1.0, "lines": [],
  "bgm": { "mode": "retrieve",
           "query": "calm educational tech underscore 120 bpm no vocals" } }
JSON

# BGM (Butuh HeyGen; kalau tidak ada ganti "mode" jadi "generate")
node "$HOME/.agents/skills/media-use/audio/scripts/audio.mjs" \
  --request ./audio_request.json --hyperframes . --out ./audio_meta.json --only bgm

# kalau audio_meta.json berisi "bgm_pending": true → tunggu (Lyria/MusicGen jalan detached)
node "$HOME/.agents/skills/media-use/audio/scripts/wait-bgm.mjs" \
  --audio-meta ./audio_meta.json --hyperframes .

ffmpeg -i assets/bgm/track.mp3 -c:a libmp3lame -b:a 192k -y assets/bgm/track.mp3

# VO (opsional, butuh CARTESIA_API_KEY) — vo-script.json = [{id, scene, text}]
node --env-file=../../.env ../../tools/cartesia-vo.mjs --list-voices --language id
node --env-file=../../.env ../../tools/cartesia-vo.mjs \
  --script vo-script.json --out assets/vo \
  --voice 04b567df-2923-4b0c-896b-4b7df0a07e1a --speed 1.0   # Galang

# tulis scene di compositions/frames/ + index.html, lalu:
npx --yes hyperframes@0.8.169 lint
npx --yes hyperframes@0.8.169 check --at-transitions
npx --yes hyperframes@0.8.169 snapshot --at 1,5,10,20
npx --yes hyperframes@0.8.169 preview --background   # studio lokal, cek timeline manual

# render
PRODUCER_LOW_MEMORY_MODE=false npx --yes hyperframes@0.8.169 render \
  --quality looks --video-bitrate 14M --fps 120 -o renders/raw120.mp4
```

`raw120.mp4` → `final.mp4` (60fps + motion blur):

```bash
ffmpeg -i renders/raw120.mp4 -filter_complex \
  "[0:v]split[a][b];[a]select='not(mod(n,2))',setpts=N/60/TB[a1];[b]select='mod(n,2)',setpts=N/60/TB[b1];[a1][b1]blend=all_mode=average[out]" \
  -map "[out]" -map 0:a -c:v libx264 -preset slow -crf 19 -maxrate 8M -bufsize 16M \
  -bf 3 -b_strategy 2 -profile:v high -level 5.1 -pix_fmt yuv420p -g 60 -keyint_min 60 \
  -sc_threshold 40 -movflags +faststart -r 60 -c:a copy -y renders/<slug>.mp4
```

**Kenapa 120fps lalu blend:** capture `screenshot` di Linux/Windows menghasilkan gerak yang tidak
rata; merata-ratakan pasangan frame memberi motion blur halus. **Pengecualian:** kalau muncul
ghosting (double exposure), render langsung `--fps 60` tanpa blend dan catat di `STYLE.md` —
sudah pernah terjadi (lihat baris 7 `STYLE-LEDGER.md`).

### Langkah 5 — Verifikasi (jangan skip)

MP4 adalah kebenaran — snapshot bisa menampilkan frame yang termount walau render asli berbeda.

```bash
cd "videos/$SLUG"

# gate otomatis: spec 1080x1920@60, yuv420p, faststart, frame hitam, blok beku, peak audio
# --scenes opsional: ambil dari Event Map brief supaya laporan per-scene bermakna
node ../../tools/qa-video.mjs "renders/<slug>.mp4" --scenes 0:9,9:22,22:34

# cadence gerak
node ../../tools/diagnose-motion.mjs "renders/<slug>.mp4" 0 60

# loudness (target -14..-23 LUFS, true peak < -1 dBTP)
ffmpeg -i "renders/<slug>.mp4" -af ebur128=peak=true -f null - 2>&1 | tail -20

# lihat frame asli
for t in 2 8 15 25 40 55; do
  ffmpeg -v error -ss "$t" -i "renders/<slug>.mp4" -frames:v 1 -y "qc/f-$t.png"
done
```

Target: **0 frame hitam**, tidak ada blok beku ≥ 0.5 s, durasi = jumlah slot scene, `qa-video.mjs`
keluar dengan `PASS semua gate lolos`. Contoh keluaran nyata:

```
== SPEC ==
  1080x1920  60/1  h264/High/yuv420p
  frames 5400  duration 90.000s  4.11 Mbps
== FRAME HITAM ==
  PASS 0 frame < 8  (luma 20.4..233.0)
== FRAME BEKU ==
  PASS tidak ada blok beku >= 0.5s
== AUDIO ==
  mean -20.4 dB   peak -2 dB
== RINGKASAN ==
  PASS semua gate lolos
```

### Langkah 6 — Catat rotasi

Tambahkan satu baris di `STYLE-LEDGER.md` dengan **semua kolom terisi** (#, tanggal, slug, V utama,
V aksen, palet, tipografi, bahasa gerak, tekstur, blend, catatan; kolom presenter & mode presenter
diisi `—`/`tidak` untuk video tanpa orang di frame). Tanpa itu, video berikutnya akan mengulang
look yang sama tanpa ketahuan.

---

## 6. Agent & model — tidak terikat satu vendor

Pipeline ini **tidak bergantung pada model tertentu**. Isinya markdown + perintah shell biasa.
Repo ini sendiri dikembangkan dengan **Claude Code + model murah (DeepSeek)** — aturan di
`CLAUDE.md` sengaja ditulis eksplisit justru karena agent yang dipakai bukan model flagship:
semua gotcha yang "biasanya model ingat sendiri" dituliskan sebagai aturan yang bisa dibaca ulang.

| Bagian | Untuk siapa |
|---|---|
| `CLAUDE.md` | agent coding (dibaca Claude Code otomatis; agent lain bisa menautkannya sebagai `AGENTS.md`) |
| `.claude/skills/video-reels/SKILL.md` | agent yang mendukung skill/command (atau dibaca manual sebagai runbook) |
| `MASTER-PROMPT.md` | chat model mana pun, untuk menghasilkan brief |

Repo ini **tidak peduli model mana yang menulis HTML-nya**. Yang penting bukan vendor-nya, tapi:
context window cukup untuk membaca brief 15–55 KB + satu style card + riwayat error render, dan
kemampuan menjalankan shell (`npx`, `ffmpeg`).

**Dua pekerjaan, dua kebutuhan berbeda:**

| Pekerjaan | Butuh | Kenapa |
|---|---|---|
| **Menulis brief** (sekali per topik) | **chat web** dengan penalaran kuat + akses web — ChatGPT, Claude.ai, Gemini | brief menentukan 80% kualitas video: tension map, hook, metafora visual, perhitungan timing. Model lemah di sini = video datar walau render-nya sempurna |
| **Menjalankan pipeline** (render loop) | **agent coding** yang bisa shell — boleh model murah | kerjaannya membaca brief, menulis HTML per scene, menjalankan lint/render, memperbaiki error. DeepSeek, Gemini Flash, Qwen, GLM, atau model lokal 30B+ cukup |

Kombinasi yang dipakai repo ini: **brief dari ChatGPT / Claude.ai / Gemini web → eksekusi
Claude Code dengan DeepSeek**. Jadi biaya mahal cuma di langkah brief (dan itu pun bisa pakai
tier gratis), sementara loop render yang panjang berjalan di model murah.

**Pakai model non-Anthropic di Claude Code** — harness-nya bisa diarahkan ke endpoint yang
kompatibel dengan Anthropic Messages API. Cara paling rapi: tulis di **settings**, bukan `export`
di shell, supaya tidak bentrok dengan sesi lain — di `~/.claude/settings.json`:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://<provider-kamu>",
    "ANTHROPIC_AUTH_TOKEN": "<api-key-provider>",
    "ANTHROPIC_MODEL": "<nama-model>"
  }
}
```

Nama env var dan path endpoint berbeda per provider (DeepSeek, Kimi, GLM, Qwen, OpenRouter, dst) —
ikuti dokumentasi provider-mu. Remap model juga bisa per-tier lewat
`ANTHROPIC_DEFAULT_OPUS_MODEL` / `ANTHROPIC_DEFAULT_SONNET_MODEL` / `ANTHROPIC_DEFAULT_HAIKU_MODEL`
kalau agent memakai alias tier, bukan nama model langsung.

Untuk agent lain (Codex CLI, Gemini CLI, OpenCode, aider, dst) yang penting sama: agent harus bisa
`Read`/`Write` file, menjalankan `bash`, dan menyimpan konteks cukup lama untuk satu render
(10–40 menit). Kalau agent-mu tidak punya mekanisme skill, cukup bilang:

```
Baca CLAUDE.md dan .claude/skills/video-reels/SKILL.md, lalu jalankan untuk source/brief-x.md
```

> Model murah sering "lupa" aturan komposisi di tengah render panjang. Kalau hasil render aneh,
> cek dulu apakah agent masih mengikuti `CLAUDE.md` §"Aturan komposisi" sebelum menyalahkan
> pipeline.

---

## 7. Aturan komposisi yang wajib

Daftar lengkap + alasannya ada di `CLAUDE.md` §"Aturan komposisi". Yang paling sering menggigit:

| Aturan | Kalau dilanggar |
|---|---|
| Root `data-composition-id` = key `window.__timelines[id]` = host | Render diam 45 s lalu frame statis |
| `<style>`/`<script>` **di dalam** `<template>` untuk sub-composition | Semua unstyled |
| `data-start` + `data-duration` scene tepat menyambung | Celah = layar hitam |
| `gsap.set` baseline + `fromTo(..., immediateRender: false)` | State akhir muncul di t=0 |
| Font via `@font-face` lokal (bukan CDN) | Lint error / render gagal tanpa sebab |
| GSAP lokal (`shared/vendor/gsap.min.js`), bukan CDN | Render gagal tapi exit code 0 |
| Tanpa `Math.random` / `Date.now` / `repeat: -1` | Render tidak deterministik |
| Teks ≥ 32 px, konten x 72–952, y 240–1460 | Tak terbaca / tertutup UI Reels |
| `steps()`: hold ≥ 0.034 s (lantai blend), ~0.045–0.05 s untuk gerak panjang | Patah-patah atau smear |
| Hindari `expo.inOut` | Flat di ujung = frame beku |
| Grain/dekorasi statis, hanya kalau style card memintanya | Bitrate jatuh, semua video terasa sama |

---

## 8. Troubleshooting

| Gejala | Penyebab | Perbaikan |
|---|---|---|
| `Chrome not found` | Chromium tidak di path standar | `export PUPPETEER_EXECUTABLE_PATH=$(which chromium)` |
| Render "selesai" tapi output kosong/basi | HyperFrames bisa **exit 0 walau gagal** | cek log untuk `✗` / `Render failed`, cek mtime `raw120.mp4` |
| Render lambat & gerak patah | low-memory mode aktif | `PRODUCER_LOW_MEMORY_MODE=false` |
| Video terasa "patah-patah" di Windows | Windows Media Player tersendat 1080×1920@60 | coba **VLC** atau Chrome dulu |
| Masih patah di VLC | hold `steps()` terlalu kasar / scene statis | audit interval `steps()` + isi dead air |
| Ghosting / double exposure | blend 120→60 pada gerak keras | render `--fps 60` tanpa blend |
| `font_family_without_font_face` | font tidak di-embed | `@font-face` lokal di **setiap** file scene |
| VO lebih panjang dari slot | naskah terlalu padat | padatkan naskah → `speed` ≤ 1.15 → geser boundary |
| `ENOSPC` | render lama menumpuk | hapus `videos/*/renders/raw120.mp4` |
| BGM kosong | HeyGen tidak terautentikasi | isi `HEYGEN_API_KEY` atau `npx hyperframes auth login` |

---

## 9. Biaya & batas

- **LLM**: sesuai model yang kamu pakai (repo ini tidak mengunci vendor).
- **Cartesia**: kredit gratis di awal, lalu bayar per karakter. VO 60 detik ≈ 150–170 kata.
- **HeyGen**: katalog musik lewat OAuth free plan; API key memakai billing API.
- **SFX**: gratis (Openverse CC0/CC BY + 14 file bawaan).
- **Render**: lokal, tanpa biaya. Yang mahal cuma waktu.

---

## 10. Batas konten (penting untuk topik keamanan)

Sebagian brief di repo ini membahas keamanan sistem (mis. `source/brief-reels-php2shell.md`).
Aturan yang dipakai: kalau brief punya bagian **"Batas konten"**, patuhi ketat — tanpa payload,
contoh request eksploitasi, langkah serangan, PoC, atau detail internal perangkat lunak.
Video menjelaskan **mekanisme dan pencegahan**, bukan cara menyerang.

---

## 11. Lisensi & atribusi

Repo ini dirilis dengan **MIT License** — lihat [`LICENSE`](LICENSE). Kamu bebas memakai,
memodifikasi, dan menjual hasil video yang dibuat dengan pipeline ini.

**Aset pihak ketiga tidak ikut MIT.** Detail lengkap di [`THIRD-PARTY.md`](THIRD-PARTY.md):

| Aset | Lisensi | Catatan |
|---|---|---|
| `shared/vendor/gsap.min.js` v3.14.2 | **GreenSock Standard License** (bukan MIT) | gratis untuk proyek komersial, tapi tidak boleh dijual ulang sebagai library |
| `shared/fonts/*.woff2` | **SIL OFL 1.1** (Google Fonts) | boleh dibundel; sertakan teks OFL kalau mendistribusikan ulang file font |
| `shared/sfx/*.mp3` | **belum terdokumentasi** | cek/telusuri asalnya sebelum repo ini menyebar; tabel isian ada di `THIRD-PARTY.md` |
| SFX dari `media-use` | Openverse CC0/CC BY | tidak masuk repo; lisensi per video di `audio_meta.json`, CC BY wajib atribusi di caption |
| Brief di `source/` | MIT | klaim faktual tetap tanggung jawab pembuat brief |

Video hasil render (`videos/`, tidak di-commit) adalah milik pembuatnya.

---

## 12. Setup di HP

Panduan Termux + proot Ubuntu lengkap: **[SETUP-TERMUX.md](SETUP-TERMUX.md)**.
Render di HP 20–40 menit per video; jalankan saat dicas dan aktifkan wakelock Termux.
