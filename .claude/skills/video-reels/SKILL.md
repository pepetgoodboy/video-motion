---
name: video-reels
description: Buat video Reels/TikTok 9:16 dari file brief markdown. Dipakai saat user menempel path brief (mis. source/brief-*.md) atau minta "buatkan video reels soal X". Menjalankan seluruh pipeline HyperFrames — scaffold, font, BGM/SFX, VO Cartesia, komposisi per scene, lint/check, render 120fps, blend 60fps, verifikasi MP4.
---

# /video-reels — brief → MP4

## Input

User memberi **path brief** `.md`. Kalau tidak ada path, cari file `.md` di `source/` yang paling
baru, lalu konfirmasi sekali sebelum jalan.

Baca brief **sampai habis**. Brief adalah sumber kebenaran desain: timing scene, koordinat, copy,
warna, font, easing, dan tabel fakta. Jangan improvisasi.

## Langkah

### 1. Siapkan project

```bash
SLUG=$(basename "$BRIEF" .md | sed 's/^brief-reels-//')
npx -y hyperframes@latest init "videos/$SLUG" --non-interactive --example=blank --skill=general-video
mkdir -p "videos/$SLUG"/{assets/{fonts,bgm,sfx,vo},compositions/frames,renders}
```

### 2. Font

Brief menyebut font (display / aksen / mono). Ambil dari Google Fonts, **subset latin saja**:

```bash
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
curl -s -A "$UA" "https://fonts.googleapis.com/css2?family=<FAMILY>:wght@..." -o fonts.css
# ambil URL woff2 yang unicode-range-nya U+0000-00FF (latin), download ke assets/fonts/
```

Daftarkan `@font-face` di **setiap** file scene (style ada di dalam `<template>`).

### 3. Audio

**BGM:**
```bash
node ~/.agents/skills/media-use/audio/scripts/audio.mjs \
  --request ./audio_request.json --hyperframes . --out ./audio_meta.json --only bgm
# lalu kompres: ffmpeg -i track.mp3 -c:a libmp3lame -b:a 192k -y track.mp3
```

**SFX** sesuai tabel brief. Ambil dari katalog lewat `searchSounds()` + `downloadTo()`.

**VO Cartesia** — tulis `vo-script.json` (`[{id, scene, text}]`) dari bagian VO tiap scene di brief.
Generate lewat `tools/cartesia-vo.mjs` atau PowerShell (lihat CLAUDE.md). Kalau total VO > durasi
target, padatkan naskah dulu; baru naikkan `speed` (maks 1.15).

### 4. Timing

Hitung timing dari durasi VO:

```js
const plan = {};
let t = 0;
for (const s of order) { const d = vo[s] + 0.35; plan[s] = { start: +t.toFixed(2), dur: d }; t += d; }
```

Kalau total > target brief tapi masih ≤ 90s, pakai total baru dan catat di ringkasan.
Jangan paksa VO masuk target dengan mempercepat berlebihan — hasilnya terdengar terburu-buru.

### 5. Komposisi

Satu file per scene di `compositions/frames/`. Ikuti aturan di `CLAUDE.md` (tabel "Aturan komposisi").

**Setiap scene wajib:**
- elemen bergerak sejak frame 0 (`gsap.set` baseline + `fromTo` tanpa opacity 0)
- elemen bergerak sampai frame terakhir (final-beat pulse di `dur - 0.34`)
- ambient drift `#root` (scale + xy) sepanjang slot
- tidak ada tween yang berakhir >0.4s sebelum slot habis

`index.html` memuat semua scene + audio. Scene di track berbeda (`data-track-index` 1..N) supaya
tidak saling menutupi saat transisi.

### 6. Validasi

```bash
npx --yes hyperframes@0.8.169 lint
npx --yes hyperframes@0.8.169 check
npx --yes hyperframes@0.8.169 snapshot --at <20 titik dari brief>
```

Perbaiki semua `✗`. Overlap teks biasanya karena dua elemen di posisi berdekatan — geser, jangan
kecilkan font di bawah 32px.

### 7. Render

```bash
PRODUCER_LOW_MEMORY_MODE=false npx --yes hyperframes@0.8.169 render \
  --quality looks --video-bitrate 14M --fps 120 -o renders/raw120.mp4
```

Lalu blend ke 60fps (perintah ffmpeg ada di `CLAUDE.md`).

### 8. Verifikasi

Ekstrak frame dari **MP4** (bukan snapshot) di ~14 titik, lihat gambarnya. Cek:

- frame hitam total → target **0**
- frame beku (diff < 0.02) → seminimal mungkin
- durasi = jumlah slot scene
- loudness ≈ -14..-23 LUFS

### 9. Ringkas ke user

Sebut: path MP4, durasi, ukuran, jumlah scene, dan hal yang perlu dicek ulang sebelum posting
(dari bagian "Cek ulang sebelum posting" di brief).

**Jangan bilang "selesai" sebelum frame MP4 benar-benar dilihat.**
