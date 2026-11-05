---
name: video-reels
description: Buat video Reels/TikTok 9:16 dari file brief markdown. Dipakai saat user menempel path brief (mis. source/brief-*.md) atau minta "buatkan video reels soal X". Menjalankan seluruh pipeline HyperFrames — scaffold portrait, font/SFX dari shared, BGM, VO Cartesia (opsional), komposisi per scene, lint/check, render 120fps, blend 60fps, verifikasi MP4 + hitung frame hitam/beku.
---

# /video-reels — brief → MP4

Semua perintah dijalankan dari **root repo** (`video-motion/`) kecuali yang ditandai
`cd videos/<slug>`. CLI HyperFrames membaca **cwd** sebagai project, jadi jangan lupa `cd`.

## Input

User memberi **path brief** `.md`. Kalau tidak ada path, cari `.md` terbaru di `source/`,
lalu konfirmasi sekali sebelum jalan.

Baca brief **sampai habis**. Brief adalah sumber kebenaran desain: timing scene, koordinat, copy,
warna, font, easing, Event Map, dan tabel fakta. Jangan improvisasi.

Yang wajib diekstrak dari brief sebelum menulis kode:

| Bagian brief | Dipakai untuk |
|---|---|
| Event Map / peta scene (waktu, durasi) | `data-start` + `data-duration`, plan timing |
| Detail scene (layout, gerak, teknik M/C/X/A) | isi tiap file scene |
| Design tokens (warna, font, skala) | CSS tiap scene |
| Audio (VO, BGM, tabel SFX) | VO/BGM/SFX + `data-track-index` |
| **Batas konten** (kalau ada) | patuhi ketat: tanpa payload, contoh request, langkah eksploitasi, PoC, atau detail internal |
| Cek ulang sebelum posting | ringkasan akhir ke user |

Kalau brief tidak punya bagian VO, jalankan **mode tanpa VO** (lihat Langkah 4).

## Langkah

### 0. Tipe visual — wajib, sebelum scaffold

Brief menentukan **kode V** (`Tipe visual (V)` di bagian 12.1 brief). Jangan menebak dari palet.

```bash
# baca ledger dulu, lalu cocokkan dengan brief
sed -n '1,40p' STYLE-LEDGER.md   # tabel + status terkunci (yang dibutuhkan langkah 1–2)
grep -nE "Tipe visual|V[0-9]+( \+ V[0-9]+)?" source/<brief>.md | head
```

1. Ambil kode V utama (+ aksen bila hibrida) dari brief. **Kalau brief tidak punya kode V →
   berhenti** dan minta user menambahkannya. Jangan memilih sendiri: brief adalah sumber kebenaran.
2. Tolak bila V utama sama dengan **3 baris terakhir** yang terisi di `STYLE-LEDGER.md`.
   Laporkan konflik ke user; jangan diam-diam mengganti.
3. Baca `styles/V<n>.md` **seluruhnya**, plus `styles/README.md`.
   Untuk **V13–V21**, baca juga `styles/FEASIBILITY.md` (biaya terukur + syarat determinisme).
4. Tulis `videos/$SLUG/STYLE.md`: salin tabel *Parameter wajib* dan *Nilai audit* dari card,
   isi kolom "aktual" setelah implementasi. Setiap scene merujuk file ini.

Card mengalahkan aturan generik yang bertabrakan. Contoh yang sering: audit #4/#7 mewajibkan
gerak kamera & ambient di **100% scene**, tetapi V1 dan V9 memang hidup dari kamera mati — ikuti
**Nilai audit** di card, dan tulis di ringkasan akhir bahwa audit itu di-override beserta alasannya.

### 1. Scaffold project

```bash
SLUG=$(basename "$BRIEF" .md | sed -E 's/^brief-(reels-)?//' | tr '[:upper:]' '[:lower:]')
npx -y hyperframes@0.8.169 init "videos/$SLUG" --non-interactive --example=blank \
  --skill=general-video --resolution=portrait
mkdir -p "videos/$SLUG"/{assets/{fonts,bgm,sfx,vo},compositions/frames,renders}
```

- Pin versi **0.8.169** (sama dengan lint/check/render). Jangan `@latest`.
- `--resolution=portrait` **wajib**. Tanpa itu scaffold default 1920×1080 landscape.
- Verifikasi cepat: root `data-width="1080"` dan `data-height="1920"`.
- FPS tidak perlu diubah di root; render selalu dipaksa eksplisit (`--fps 120`, lalu blend 60).

### 2. Font — pakai `shared/fonts` dulu

`shared/fonts/` sudah berisi subset latin: **Bricolage Grotesque** (`bricolage-latin.woff2`),
**Instrument Serif** (`instrument-serif-regular-latin.woff2`, `instrument-serif-italic-latin.woff2`),
**JetBrains Mono** (`jetbrains-mono-latin.woff2`). `fonts.css` di sana hanya **referensi** — jangan
di-copy apa adanya karena `src`-nya masih URL gstatic.

```bash
cp shared/fonts/<keluarga>.woff2 "videos/$SLUG/assets/fonts/"
```

Tulis `@font-face` **lokal** di setiap file scene (style di dalam `<template>`), `src: url("./assets/fonts/...")`.
Jangan memakai URL `fonts.gstatic.com` di `@font-face` — aturan project: font wajib lokal
(`font_family_without_font_face`).

Hanya kalau keluarga font di brief belum ada di `shared/fonts/`: ambil dari Google Fonts,
subset **latin saja**, simpan `.woff2` ke `assets/fonts/`, lalu daftarkan lokal. Setelah dipakai,
salin ke `shared/fonts/` supaya video berikutnya tidak download ulang.

### 3. Audio

```bash
cd "videos/$SLUG"

# BGM
node ~/.agents/skills/media-use/audio/scripts/audio.mjs \
  --request ./audio_request.json --hyperframes . --out ./audio_meta.json --only bgm
ffmpeg -i assets/bgm/track.mp3 -c:a libmp3lame -b:a 192k -y assets/bgm/track.mp3

# SFX dari shared (fallback: katalog)
cp ../../shared/sfx/<nama>.mp3 assets/sfx/
```

**Secret:** `video-motion/.env` di root (mode **600**, sudah di `.gitignore`). Jangan export key di
shell/`.bashrc`. `audio.mjs` auto-load lewat `loadEnvFromDir()` (walk-up 5 level dari `--hyperframes .`),
jadi BGM/SFX dapat `HEYGEN_API_KEY` tanpa flag. Script Node ad-hoc yang mengimpor `heygen.mjs` harus
memanggil `loadEnvFromDir(process.cwd())` atau dijalankan dengan `node --env-file=../../.env`.
Auth HeyGen fallback: `~/.heygen/credentials` (kalau env tidak ada).

**SFX — cek `shared/sfx/` dulu** (10 file): `chime-soft`, `error-thud`, `keyboard-typing`,
`lock-click`, `pop`, `riser`, `swipe`, `thunk`, `tick`, `whoosh`. Copy yang cocok. Kalau tidak ada,
baru ambil dari katalog lewat `searchSounds()` + `downloadTo()` (`~/.agents/skills/media-use/audio/scripts/lib/heygen.mjs`).

**VO Cartesia** (hanya kalau brief punya VO):

```bash
cd "videos/$SLUG"
node --env-file=../../.env ../../tools/cartesia-vo.mjs --list-voices --language id
node --env-file=../../.env ../../tools/cartesia-vo.mjs --script vo-script.json --out assets/vo \
  --voice 04b567df-2923-4b0c-896b-4b7df0a07e1a --speed 1.0    # Galang
```

Butuh Node ≥20.6 untuk `--env-file` (cek `node -v`, terutama di Termux) dan `.env` harus ada.
Jangan pakai `source .env` dan jangan cetak nilai key ke log/chat.

`vo-script.json` = `[{id, scene, text}]`. Script menulis `assets/vo/manifest.json`, skip file yang
sudah ada (pakai `--force` untuk regenerate). Kalau total VO > durasi target: **padatkan naskah
dulu**, baru naikkan `speed` (maks **1.15**).

**Master limiter:** `data-fx-chain` `truepeak` di root, `ceiling: -2`.
Setiap `<audio>` punya `data-track-index` **unik**.

### 4. Timing

**Mode VO** — brief adalah target; VO harus pas di slot:

```bash
cd "videos/$SLUG"
for f in assets/vo/*.mp3; do
  printf "%s %s\n" "$(basename "$f" .mp3)" "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")"
done
```

- Kalau durasi VO ≤ slot brief (±0.2s): **pakai timing brief apa adanya** (biasanya kelipatan 0.5s
  dan sudah dirujuk Event Map).
- Kalau VO lebih panjang: padatkan naskah → speed ≤1.15 → kalau masih lebih, geser boundary scene
  dan catat deviasi di ringkasan.
- Jangan mempercepat berlebihan sampai terdengar terburu-buru.

**Mode tanpa VO** — timing 100% dari brief. Jangan mengarang `start`/`duration`; scene harus
tepat menyambung (`start` scene N+1 = `start + duration` scene N).

### 5. Komposisi

Satu file per scene di `compositions/frames/`. `index.html` memuat semua scene + audio.
Scene di `data-track-index` berbeda supaya tidak saling menutupi saat transisi.

**Setiap scene wajib:**
- elemen bergerak sejak frame 0 (`gsap.set` baseline + `fromTo` tanpa opacity 0)
- elemen bergerak sampai frame terakhir (final-beat pulse di `dur - 0.34`)
- ambient drift `#root` (scale + xy) sepanjang slot
- tidak ada tween yang berakhir >0.4s sebelum slot habis

**Aturan yang bikin render gagal / rusak** (detail lengkap di `CLAUDE.md`):

| Aturan | Akibat |
|---|---|
| Root `data-composition-id` = key `window.__timelines[id]` = host | Render diam 45s lalu frame statis |
| `<style>`/`<script>` di **dalam** `<template>` untuk sub-composition | Semua unstyled |
| Root sub-comp di-style via `#root`, bukan class | lint error |
| `data-start` + `data-duration` tepat menyambung | Celah = layar hitam |
| `fromTo(..., immediateRender: false)` + `gsap.set` baseline | State akhir muncul di t=0 |
| Selector `#id .class` menargetkan **turunan**, bukan elemen itu sendiri | Teks jatuh ke ukuran default |
| Animasi ketik: capture `acc + ch` di loop build | Teks tampil penuh + 1 karakter acak |
| Tanpa `Math.random` / `Date.now` / `repeat: -1` | Render tidak deterministik |
| Hindari `expo.inOut`; pakai `power2.inOut` / `sine.inOut` | Flat di ujung = frame beku |
| Jangan pakai mask `overflow:hidden` untuk reveal teks display | Descender terpotong, teks tampak patah |
| Grain: `opacity ≤ 0.03`, `baseFrequency ≤ 0.45`, statis | Bitrate jatuh, gerak patah |
| **Grain hanya bila card style V memintanya** (V4/V5/V11). V1/V9/V6/V7/V8: nol grain | Video terasa sama seperti sebelumnya |
| **`steps()`: interval ≥ 0.034s** (≥ 4 frame @120fps). `duration`/`n` ≥ 0.034 | Blend 120→60 merata-ratakan hold pendek → patahan hilang jadi smear |
| **Kamera: ikuti card, bukan default push-in.** V1/V9 kamera mati | Semua video bergerak dengan cara yang sama |
| Teks ≥ 32px; konten x 72–952, y 240–1460 | Tidak terbaca / tertutup UI Reels |
| Scene statis >0.5s diisi gerak (aliran, scan, pulse) | Dead air terasa patah |

Kepadatan mengikuti Event Map brief (target 1 kejadian ≤1.5s), bukan tebakan.

### 6. Validasi

```bash
cd "videos/$SLUG"
npx --yes hyperframes@0.8.169 lint
npx --yes hyperframes@0.8.169 check --at-transitions
npx --yes hyperframes@0.8.169 snapshot --at <20 titik dari brief>
```

Perbaiki semua `✗`. Overlap teks biasanya karena dua elemen berdekatan — geser, jangan kecilkan
font di bawah 32px. Snapshot hanya untuk cek visual cepat; **bukan** bukti hasil render.

**Cek drift style** (jalankan sebelum render, bukan setelah):

```bash
# 1. grain tidak boleh muncul di V yang melarang
grep -l "feTurbulence" compositions/frames/*.html | wc -l
# 2. steps() — kalau ada, interval harus >= 0.034s
grep -hoE "duration: [0-9.]+[^}]*steps\([0-9]+\)" compositions/frames/*.html
# 3. easing yang dipakai harus yang tercantum di STYLE.md
grep -hoE 'ease: "[a-zA-Z0-9.()]+"' compositions/frames/*.html | sort | uniq -c
# 4. kamera — V1/V9 harus 0 tween pada #cam
grep -c "#cam" compositions/frames/*.html
```

Bandingkan hasil dengan `STYLE.md`. Kalau easing/kamera/grain tidak cocok dengan card, **perbaiki
dulu** — jangan bergantung pada review mata setelah render.

### 7. Render

```bash
cd "videos/$SLUG"
PRODUCER_LOW_MEMORY_MODE=false npx --yes hyperframes@0.8.169 render \
  --quality looks --video-bitrate 14M --fps 120 -o renders/raw120.mp4
```

Lalu blend 120 → 60fps + motion blur (perintah ffmpeg lengkap di `CLAUDE.md`), output
`renders/<slug>.mp4`. Jangan render 60fps satu pass.

Di Termux/HP: perintah sama, tapi render bisa 20–40 menit. Jalankan saat dicas; jangan turunkan
fps/bitrate untuk "mempercepat" — hasilnya patah.

### 8. Verifikasi MP4 (wajib, fail-closed)

MP4 adalah kebenaran, bukan snapshot. Ekstrak ~14 titik dari **MP4**, lihat gambarnya dengan Read.

```bash
cd "videos/$SLUG"
# durasi / resolusi / fps
ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,r_frame_rate,nb_frames -show_entries format=duration \
  -of default=nw=1 "renders/<slug>.mp4"

# frame hitam total (target 0): max brightness < 40
mkdir -p qc
ffmpeg -v error -i "renders/<slug>.mp4" -vf "scale=108:192,format=gray" -f rawvideo -y qc/g.raw
node -e 'const b=require("fs").readFileSync("qc/g.raw");const n=20736,f=b.length/n;let c=0;for(let i=0;i<f;i++){let m=0;for(let j=0;j<n;j++){const v=b[i*n+j];if(v>m)m=v;}if(m<40)c++;}console.log("frames",f,"black",c)'

# frame beku / motion collapse
node ../../tools/diagnose-motion.mjs "renders/<slug>.mp4" 0 <durasi>

# loudness
ffmpeg -i "renders/<slug>.mp4" -af ebur128=peak=true -f null - 2>&1 | tail -20

# frame visual
for t in <14 titik>; do ffmpeg -v error -ss "$t" -i "renders/<slug>.mp4" -frames:v 1 -y "qc/f-$t.png"; done
```

Target: frame hitam **0**, collapse event seminimal mungkin, durasi = jumlah slot, loudness
**-14..-23 LUFS**, peak < -1 dBTP (limiter -2), 1080×1920 @ 60fps.

**Kalau user bilang "patah-patah": tanya player-nya dulu.** Windows Media Player tersendat memutar
1080×1920@60fps dan terlihat seperti patah. Minta coba VLC atau Chrome sebelum render ulang.

**Kalau render gagal:** `Chrome not found` → `export PUPPETEER_EXECUTABLE_PATH=$(which chromium)`;
RAM kecil → tetap `PRODUCER_LOW_MEMORY_MODE=false` tapi turunkan worker; `ENOSPC` → hapus render lama.

### 9. Ringkas ke user

Sebut: path MP4, durasi, ukuran file, jumlah scene, hasil hitung frame hitam/beku, dan daftar
"Cek ulang sebelum posting" dari brief. Sebut juga deviasi timing (kalau ada) dan residual risk.

Sebut juga **V-code yang dipakai**, dua sumbu yang paling berbeda dari video sebelumnya
(bahasa gerak + tekstur), dan apakah ada aturan audit yang di-override oleh card style.

Terakhir, **update `STYLE-LEDGER.md`** — satu baris baru dengan **semua 13 kolom** terisi:
tanggal, slug, V utama, V aksen, palet, tipografi, bahasa gerak, tekstur, blend ya/tidak,
presenter, mode presenter, catatan. Palet dan tipografi **wajib** diisi (kode P/T); kolom
"catatan" memuat override, kegagalan, dan fix yang tidak kelihatan dari kode.

Tanpa baris baru di ledger, rotasi video berikutnya akan salah hitung. Kalau kolom palet atau
tipografi dibiarkan kosong, video berikutnya akan mengulang look yang sama tanpa ketahuan —
ini persis kesalahan yang membuat baris 1–3 sekarang tidak bisa dipakai untuk rotasi.

**Jangan bilang "selesai" sebelum frame MP4 benar-benar dilihat dan hitungan frame hitam = 0.**