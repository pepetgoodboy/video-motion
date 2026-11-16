# CLAUDE.md — Video Motion (HyperFrames Reels)

Project ini **khusus** membuat video Reels/TikTok 9:16 dari **topik** atau brief markdown, memakai HyperFrames
(HTML + CSS + GSAP timeline `paused`), dirender ke MP4.

> Jangan bawa aturan dari project lain. Project ini cuma punya satu tujuan: topik/brief → MP4.

---

## Alur kerja

0. **Mode topik** (`/video-reels apa itu docker?`): riset ≥ 3 sumber → naskah bahasa bayi
   60–120 s → arahan otomatis (`tools/pick-direction.mjs`) → VO (multi-suara untuk kisah) →
   agent menulis `videos/<slug>/BRIEF.md` sendiri → lanjut langkah 2. Detail:
   `.claude/skills/video-reels/references/topik-ke-brief.md`.
1. **Mode brief:** user memberi **path brief** `.md` (biasanya di `source/`).
2. Baca brief sampai habis. Brief adalah **sumber kebenaran desain** — jangan improvisasi.
3. Scaffold project baru di `videos/<slug>/`.
4. Siapkan font, BGM, SFX, VO (Cartesia).
5. Tulis komposisi HTML per scene.
6. `lint` → `check` → `snapshot` → perbaiki.
7. Render 120fps → blend 60fps → verifikasi frame dari MP4.

Kalau user cuma bilang "buatkan video X", cari briefnya di `source/` dulu; tidak ada → mode topik.

### Anti-monoton (wajib, dari diagnosis 10 Nov 2026)

12 video pertama terasa sama walau kode V-nya beda: 5/8 didominasi layout **K0 "slide"**
(judul pojok + kotak kecil + label), median occupancy 0,05–0,18. Karena itu:

- Arahan (F · V · P · T · K · suara) **dipilih script**, bukan dibaca manual dari ledger.
- Layout K per scene: ≥ 4 berbeda, tidak berurutan, K0 ≤ 1 (`references/peta-gaya.md` §5).
- `python3 tools/qa-variety.py` di snapshot (pra-render) dan MP4 — FAIL = perbaiki, bukan lapor.
- Mesin tetap HyperFrames; Remotion **tidak** dipasang di repo ini (alasan: `peta-gaya.md` §7).

### Mode serial (drama bersambung 3D)

Folder `series/<nama>/` (saat ini **Anak Pertama**): gaya, format, suara dikunci di `series.json` + `BIBLE.md`.
Pakai skill **`/video-series`** (`.claude/skills/video-series/`, panduan mesin `references/serial-3d.md` §2) dan template
`series/<nama>/template/build-episode.mjs`. **Pengecualian render:** seri 3D = **30 fps** tanpa blend 120→60
(three.js di CPU, ±80 menit/episode); gate `qa-video.mjs --fps 30`; revisi lewat `tools/patch-splice.mjs`.

### Mode: faceless vs presenter vs komentar

| Mode | Skill | Input | Kapan |
|---|---|---|---|
| **Faceless** (default) | `/video-reels` | topik **atau** 1 brief `.md` | tidak ada orang di frame |
| **Presenter** | `/video-reels-presenter` | brief `.md` **+ folder footage** | ada orang nyata di frame |
| **Komentar** | `/video-komentar` | `<kanal> <folder-rekaman>` | user bicara bebas di kamera (tanpa brief/TTS), disunting + sisipan kolase |

Mode presenter memakai seluruh pipeline yang sama; skill di
`.claude/skills/video-reels-presenter/` hanya menambah lapisan presenter (P1/P2/P3), trim per shot,
cutout alpha, dan verifikasi lip-sync. **Langkah umum jangan diduplikat** — rujuk skill faceless.

Pemicu: user menyebut footage/rekaman/"pakai muka gue"/"ada orangnya"/"presenter".

**Mode komentar** (`.claude/skills/video-komentar/`): suara = rekaman user yang dibersihkan dari noise, transkrip
Whisper per kata (ejaan dikoreksi manual), tiga tata letak (sisipan penuh / overlay / koran). Profil kanal di
`kanal/<nama>/kanal.json`; aset pihak ketiga di `kanal/<nama>/aset/` (di-ignore git). Contoh build teruji:
`kanal/persib/contoh/`. Pemicu: "video komentar", "bahas Persib", "bersihkan suaranya".

---

## Perintah wajib

```bash
# scaffold
npx -y hyperframes@latest init "videos/<slug>" --non-interactive --example=blank --skill=general-video

# validasi
npx --yes hyperframes@0.8.169 lint
npx --yes hyperframes@0.8.169 check

# render (SELALU pakai low-memory off + 120fps; kecuali seri 3D = 30 fps, lihat Mode serial)
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

**Kalau user bilang "patah-patah": audit interval `steps()` DULU** (durasi/n; gerak yang
lebih dari 1 s harus ≤ 50 ms per langkah). Ini akar masalah yang terkonfirmasi di HP juga — menyalahkan
player adalah tebakan salah yang pernah terjadi. Baru setelah interval bersih, cek player
(Windows Media Player memang tersendat di 1080×1920@60fps; VLC/Chrome lancar).

---

## Struktur repo

```
video-motion/
├── source/              # brief .md (input dari Claude web)
├── kanal/<nama>/        # profil kanal /video-komentar: kanal.json + contoh/ (aset/ di-ignore)
├── series/<nama>/       # serial 3D: series.json + BIBLE.md + template/
├── shared/              # font + SFX lintas video
├── tools/               # script bantu: pick-direction.mjs + direction-map.json (arahan),
│                        #   cartesia-vo.mjs (VO multi-suara), naskah-check.mjs, qa-variety.py,
│                        #   vo-envelope.mjs, qa-video.mjs, diagnose-motion.mjs
└── videos/<slug>/       # satu project HyperFrames per video
    ├── research.md / direction.json / vo-script.json / BRIEF.md   # mode topik
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
