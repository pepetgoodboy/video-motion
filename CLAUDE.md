# CLAUDE.md — Video Motion (HyperFrames Reels)

Project ini **khusus** membuat video Reels/TikTok 9:16 dari brief markdown, memakai HyperFrames
(HTML + CSS + GSAP timeline `paused`), dirender ke MP4.

> Jangan bawa aturan dari project lain. Project ini cuma punya satu tujuan: brief → MP4.

---

## Alur kerja

1. User memberi **path brief** `.md` (biasanya di `source/`).
2. Baca brief sampai habis. Brief adalah **sumber kebenaran desain** — jangan improvisasi.
3. Scaffold project baru di `videos/<slug>/`.
4. Siapkan font, BGM, SFX, VO (Cartesia).
5. Tulis komposisi HTML per scene.
6. `lint` → `check` → `snapshot` → perbaiki.
7. Render 120fps → blend 60fps → verifikasi frame dari MP4.

Kalau user cuma bilang "buatkan video X", cari briefnya di `source/` dulu.

---

## Perintah wajib

```bash
# scaffold
npx -y hyperframes@latest init "videos/<slug>" --non-interactive --example=blank --skill=general-video

# validasi
npx --yes hyperframes@0.8.169 lint
npx --yes hyperframes@0.8.169 check

# render (SELALU pakai low-memory off + 120fps)
PRODUCER_LOW_MEMORY_MODE=false npx --yes hyperframes@0.8.169 render \
  --quality looks --video-bitrate 14M --fps 120 -o renders/raw120.mp4

# blend 120 -> 60fps (motion blur)
ffmpeg -i renders/raw120.mp4 -filter_complex \
  "[0:v]split[a][b];[a]select='not(mod(n,2))',setpts=N/60/TB[a1];[b]select='mod(n,2)',setpts=N/60/TB[b1];[a1][b1]blend=all_mode=average[out]" \
  -map "[out]" -map 0:a -c:v libx264 -preset slow -crf 19 -maxrate 8M -bufsize 16M \
  -bf 3 -b_strategy 2 -profile:v high -level 5.1 -pix_fmt yuv420p -g 60 -keyint_min 60 \
  -sc_threshold 40 -movflags +faststart -r 60 -c:a copy -y renders/final.mp4
```

**Kenapa 120fps lalu blend:** HyperFrames di Windows/Linux tanpa `beginframe` capture bisa
menghasilkan gerakan yang tidak rata. Blend pasangan frame memberi motion blur dan menghaluskan.

---

## Aturan komposisi (WAJIB — ini yang bikin render gagal kalau dilanggar)

| Aturan | Akibat kalau dilanggar |
|---|---|
| Root `data-composition-id` = key `window.__timelines[id]` = host `data-composition-id` | Render diam 45s lalu frame statis |
| `<style>`/`<script>` di **dalam** `<template>` untuk sub-composition | `<head>` dibuang saat mount, semua unstyled |
| Root sub-comp di-style via `#root`, bukan class | lint error |
| `data-start` + `data-duration` scene harus **tepat menyambung** | Celah = layar hitam |
| Setiap scene punya elemen bergerak di **frame pertama dan terakhir** | Frame beku = terasa "patah" |
| `gsap.set(...)` baseline + `fromTo(..., immediateRender: false)` | State akhir muncul di t=0 |
| `data-track-index` unik per `<audio>` | Audio bertumpuk di satu lane |
| Font wajib `@font-face` lokal | `font_family_without_font_face` |
| Tidak ada `Math.random` / `Date.now` / `repeat:-1` | Render tidak deterministik |
| Easing: **hindari `expo.inOut`** (flat di ujung = frame beku) | Pakai `power2.inOut` / `sine.inOut` |
| Selector `#id .class` menargetkan **turunan**, bukan elemen itu sendiri | Teks jatuh ke ukuran default |
| Animasi ketik: capture nilai di loop build, bukan baca variabel di callback | Teks tampil penuh + 1 karakter acak |
| Teks minimum 32px, area konten x 72–952, y 240–1460 | Tidak terbaca / tertutup UI Reels |

---

## Audio

- **VO**: Cartesia `POST https://api.cartesia.ai/tts/bytes`, header `Cartesia-Version: 2026-08-14`,
  `Authorization: Bearer $CARTESIA_API_KEY`. Model `sonic-3.6`, `language: "id"`.
  Voice Indonesia tersedia: Galang (`04b567df-2923-4b0c-896b-4b7df0a07e1a`), Intan, Anisa, Safira, dll.
  `speed` ada di dalam `generation_config`, **bukan** top-level.
- **BGM**: `node ~/.agents/skills/media-use/audio/scripts/audio.mjs --request <req> --only bgm`
- Kompres BGM setelah ambil: `ffmpeg -i track.mp3 -c:a libmp3lame -b:a 192k out.mp3`
- **SFX**: `searchSounds()` + `downloadTo()` dari `~/.agents/skills/media-use/audio/scripts/lib/heygen.mjs`
- Master limiter: `data-fx-chain` `truepeak` di root, `ceiling: -2`

---

## Verifikasi (jangan skip)

**MP4 adalah kebenaran**, bukan snapshot. Snapshot bisa menampilkan frame yang sudah termount
walau render asli berbeda.

```bash
# frame hitam (target 0)
ffmpeg -v error -i out.mp4 -vf "scale=108:192,format=gray" -f rawvideo -y qc/g.raw
# frame beku: diff antar frame < 0.02
```

**Kalau user bilang "patah-patah", TANYA PLAYER-NYA DULU.** Windows Media Player tersendat memutar
1080×1920@60fps dan terlihat seperti patah. VLC dan Chrome lancar. Ini sudah terjadi sekali dan
menghabiskan belasan render sia-sia.

---

## Struktur repo

```
video-motion/
├── source/              # brief .md (input dari Claude web)
├── shared/              # font + SFX lintas video
├── tools/               # script bantu (cartesia-vo.mjs, diagnose-motion.mjs)
└── videos/<slug>/       # satu project HyperFrames per video
    ├── index.html
    ├── compositions/frames/
    ├── assets/{fonts,bgm,sfx,vo}/
    └── renders/<slug>.mp4
```

`videos/` **tidak di-commit** (ada di `.gitignore`) — isinya render besar dan aset per-video.

---

## Batas konten

Kalau brief punya bagian **"Batas konten"** (topik keamanan), patuhi ketat: jangan tambahkan
payload, contoh request, langkah eksploitasi, kode PoC, atau detail internal perangkat lunak.
