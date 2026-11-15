---
name: video-reels
description: Buat video Reels/TikTok 9:16 (sekali jadi, BUKAN episode serial — itu video-series) dari SATU TOPIK ("/video-reels apa itu docker?") atau dari path brief markdown (source/brief-*.md). Mode topik riset ≥3 sumber → naskah 60-120 detik bahasa bayi → pilih arahan visual otomatis (29 tipe V, layout K, palet, tipografi; rotasi dari STYLE-LEDGER) → VO Cartesia (multi-suara untuk kisah keluarga/kehidupan/islami/anak). Topik apa pun (42 kategori + cadangan `umum`): tech, edukasi sekolah, bahasa, sains, sejarah, pelajaran hidup, psikologi, hubungan, parenting, karier, keuangan, kisah islami/keluarga/drama/komedi/seram/inspiratif, berita artis/umum, olahraga, kuliner, travel, hewan, otomotif, gaming, DIY, pertanian, kecantikan, ibadah → komposisi HyperFrames → render 120fps, blend 60fps → verifikasi MP4 (frame hitam/beku + gate variasi visual).
---

# /video-reels — topik atau brief → MP4

Semua perintah dijalankan dari **root repo** (`video-motion/`) kecuali yang ditandai
`cd videos/<slug>`. CLI HyperFrames membaca **cwd** sebagai project, jadi jangan lupa `cd`.

## Input — dua mode

| Input | Mode | Mulai dari |
|---|---|---|
| Path `.md` (mis. `source/brief-x.md`) | **brief** | Langkah 0 |
| Teks topik (`apa itu docker?`, `kisah ayah dan sepeda tua`) | **topik** | **Fase A** lalu Langkah 0 |
| "buatkan video X" tanpa path | cari brief cocok di `source/`; kalau tidak ada → **topik** | |

Mode topik berjalan **tanpa berhenti** sampai MP4 (user minta satu perintah). Jangan bertanya
kecuali topik benar-benar tak bisa ditebak; tulis asumsi di brief.

## Serial bersambung → pakai `/video-series`

Episode serial dengan tokoh tetap (`series/<nama>/` ada, mis. Anak Pertama) **tidak** dibuat di skill ini.
Pakai `/video-series` (`.claude/skills/video-series/SKILL.md`): gaya, format, dan suara dikunci per serial,
render 3D 30 fps, template build, tambalan per scene. Aturan komposisi & audio di skill ini tetap berlaku.

## Fase A — topik → BRIEF.md (mode topik saja)

Ikuti `references/topik-ke-brief.md` seluruhnya. Ringkas:

| Fase | Hasil | Alat |
|---|---|---|
| A0 baca permintaan + **scaffold** | slug, kategori, override user, `videos/<slug>/` (Langkah 1 dijalankan **di sini**, sebelum file lain ditulis) | `node tools/pick-direction.mjs --table` |
| A1 riset ≥ 3 sumber | `videos/<slug>/research.md` | WebSearch paralel, Context7 (tech), baca halaman kunci |
| A2 arahan | `videos/<slug>/direction.json` | `node tools/pick-direction.mjs --category <k> --slug <s> --topic "<t>" --write` |
| A3 naskah bahasa bayi | `videos/<slug>/vo-script.json` | `node tools/naskah-check.mjs` (wajib bukan FAIL) |
| A4 brief | `videos/<slug>/BRIEF.md` | MASTER-PROMPT §3–6, 8–9, 11, 14 |

Bahan baca Fase A: `references/peta-gaya.md` (taksonomi + aturan layout K + adab),
`references/suara.md` (cast multi-suara), card `styles/<V>.md`.

Setelah A4, `BRIEF.md` diperlakukan persis seperti brief dari `source/`.

## Membaca brief

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
Brief lama (dari Claude web) tidak punya kolom K per scene — tetap terapkan aturan layout
`references/peta-gaya.md` §5 saat menulis komposisi.

## Langkah

### 0. Arahan visual — wajib, sebelum scaffold

```bash
node tools/pick-direction.mjs --status      # rotasi dihitung script, JANGAN baca ledger manual
```

1. **Mode topik:** arahan sudah ada di `videos/<slug>/direction.json` (Fase A2).
   **Mode brief:** ambil kode V utama (+ aksen) dari brief (`Tipe visual (V)`). Kalau brief
   **tidak punya** kode V → jalankan picker dengan kategori yang paling cocok
   (`--write`) dan pakai hasilnya; sebut di ringkasan bahwa V dipilih otomatis.
2. Kalau V dari brief terkunci menurut `--status` (3 video terakhir atau keluarga sama dengan
   video terakhir): laporkan konflik di awal ringkasan, lalu pakai kandidat picker teratas
   yang terbuka. Override hanya bila user menyebut V itu eksplisit (`--force-v`, catat alasan).
3. Baca `styles/V<n>.md` **seluruhnya**, plus `styles/README.md` dan
   `references/peta-gaya.md` §5 (aturan layout K).
   Untuk **V13–V21**, baca juga `styles/FEASIBILITY.md` (biaya terukur + syarat determinisme).
4. Tulis `videos/$SLUG/STYLE.md`: salin tabel *Parameter wajib* dan *Nilai audit* dari card,
   isi kolom "aktual" setelah implementasi. Setiap scene merujuk file ini.

Tulis juga rencana **K per scene** di `STYLE.md` (≥ 4 berbeda, tidak berurutan, K0 ≤ 1).

Card mengalahkan aturan generik yang bertabrakan. Contoh yang sering: audit #4/#7 mewajibkan
gerak kamera & ambient di **100% scene**, tetapi V1 dan V9 memang hidup dari kamera mati — ikuti
**Nilai audit** di card, dan tulis di ringkasan akhir bahwa audit itu di-override beserta alasannya.

### 1. Scaffold project

Mode topik: langkah ini sudah dijalankan di A0 (slug dari topik) — lewati.

```bash
# mode brief: slug dari nama file. Mode topik: SLUG=<slug dari A0>
SLUG=$(basename "$BRIEF" .md | sed -E 's/^brief-(reels-)?//' | tr '[:upper:]' '[:lower:]')
npx -y hyperframes@0.8.169 init "videos/$SLUG" --non-interactive --example=blank \
  --skill=general-video --resolution=portrait
test -f "videos/$SLUG/index.html" || { echo "init GAGAL"; exit 1; }
mkdir -p "videos/$SLUG"/{assets/{fonts,bgm,sfx,vo},compositions/frames,renders}
```

- `init` **menolak folder yang sudah berisi file tapi tetap exit 0** (dicek 10 Nov 2026) —
  karena itu scaffold harus jalan sebelum `research.md`/`direction.json` ditulis, dan
  keberadaan `index.html` wajib dicek, bukan exit code.

- Pin versi **0.8.169** (sama dengan lint/check/render). Jangan `@latest`.
- `--resolution=portrait` **wajib**. Tanpa itu scaffold default 1920×1080 landscape.
- Verifikasi cepat: root `data-width="1080"` dan `data-height="1920"`.
- FPS tidak perlu diubah di root; render selalu dipaksa eksplisit (`--fps 120`, lalu blend 60).

### 2. Font — pakai `shared/fonts` dulu

`shared/fonts/` sudah berisi subset latin (`ls shared/fonts/*.woff2`): Bricolage, Instrument
Serif (regular/italic), JetBrains Mono, Archivo var, Newsreader italic, IBM Plex Mono, DM Mono,
Familjen, Schibsted, Martian Mono, Geist Mono, Unbounded. Font T6–T13 (Alfa Slab, Baloo 2,
Caveat, Press Start 2P, VT323, Fraunces, Cormorant, Fredoka, Instrument Sans, Nunito) belum
ada — ambil sekali lalu simpan ke `shared/fonts/`. `fonts.css` di sana hanya **referensi** —
jangan di-copy apa adanya karena `src`-nya masih URL gstatic.

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

Mode topik: `query` BGM di `audio_request.json` = `direction.json → music` (mood per kategori),
supaya musik ikut berganti dengan arahan — bukan mood yang sama tiap video.
`~/.agents/skills/media-use` harus ada (symlink ke `~/.claude/skills/media-use`, lihat README §3.2);
kalau `audio.mjs` "not found", buat symlink itu dulu.

**Secret:** `video-motion/.env` di root (mode **600**, sudah di `.gitignore`). Jangan export key di
shell/`.bashrc`. `audio.mjs` auto-load lewat `loadEnvFromDir()` (walk-up 5 level dari `--hyperframes .`),
jadi BGM/SFX dapat `HEYGEN_API_KEY` tanpa flag. Script Node ad-hoc yang mengimpor `heygen.mjs` harus
memanggil `loadEnvFromDir(process.cwd())` atau dijalankan dengan `node --env-file=../../.env`.
Auth HeyGen fallback: `~/.heygen/credentials` (kalau env tidak ada).

**SFX — cek `shared/sfx/` dulu** (`ls shared/sfx`): `chime-soft`, `error-thud`, `keyboard-typing`,
`lock-click`, `pop`, `riser`, `swipe`, `thunk`, `tick`, `whoosh`, `paper`, `impact-boom`, `bass-rumble`,
`gas-hiss`, `chalk-long`, `chalk-short`, `shutter-noise`, dan bunyi game 8-bit `px-coin/jump/blip/power/hit/clear/step/door/unlock/wipe/type`
(`python3 -I tools/sfx-chip.py <folder>` untuk membuat ulang). Copy yang cocok. Kalau tidak ada,
baru ambil dari katalog lewat `searchSounds(query, "sound_effects", headers)` + `downloadTo()`
(`~/.agents/skills/media-use/audio/scripts/lib/heygen.mjs`; tipe `"sfx"` ditolak HTTP 400).
Katalog sering **kosong** untuk bunyi spesifik ("chalk", "shutter", "click" — dicek 11 Nov 2026):
sintesis dengan ffmpeg, contoh kapur
`anoisesrc=d=0.9:c=pink → highpass=1400,bandpass=3600 (w 2600),tremolo=f=17:d=0.7,afade` — lalu simpan
ke `shared/sfx/`. `data-duration` SFX ≤ durasi file (kalau lebih, `check` memberi `clip_media_fit`).

**VO Cartesia** (hanya kalau brief punya VO). Detail cast & pitch: `references/suara.md`.

```bash
cd "videos/$SLUG"
node ../../tools/naskah-check.mjs vo-script.json --duration <detik>      # gratis, dulu
node --env-file=../../.env ../../tools/cartesia-vo.mjs --script vo-script.json --out assets/vo --dry-run
node --env-file=../../.env ../../tools/cartesia-vo.mjs --script vo-script.json --out assets/vo --review
#   format lama (array tanpa cast): tambah --voice Galang --speed 1.05
```

- **Kisah keluarga/kehidupan/islami/anak = multi-suara** (narator + tokoh dari
  `direction.json → voice.cast`). Topik lain = satu narator.
- Cache hash: rerun hanya menggenerate baris yang berubah — jangan pakai `--force` kecuali
  perlu (kuota Cartesia pernah habis di tengah revisi video semut).
- `assets/vo/_review.mp3` = semua baris digabung; sebut path-nya di ringkasan supaya user bisa
  dengar cast-nya.

Butuh Node ≥20.6 untuk `--env-file` (cek `node -v`, terutama di Termux) dan `.env` harus ada.
Jangan pakai `source .env` dan jangan cetak nilai key ke log/chat.

Script menulis `assets/vo/manifest.json` (speaker, voice, speed, pitch, hash, **duration**).
Kalau total VO > durasi target: **padatkan naskah dulu**, baru naikkan `speed` (maks **1.15**;
untuk naskah bahasa bayi utamakan ≤ 1.08 — terlalu cepat = tidak terkejar telinga).

**Master limiter:** `data-fx-chain` `truepeak` di root, `ceiling: -2`.
Setiap `<audio>` punya `data-track-index` **unik**.

### 4. Timing

**Mode topik (audio-first)** — durasi scene dihitung DARI VO, bukan sebaliknya:

```bash
cd "videos/$SLUG"
node ../../tools/vo-timing.mjs            # potong hening + gain +10,5 dB + timing.json
```

`timing.json` (start/duration scene, `at` tiap baris relatif scene) jadi sumber waktu untuk
brief §4 dan komposisi; `<audio>` VO memakai `assets/vo/t/<id>.mp3`. Output Cartesia ±−26,7 LUFS
dan membawa hening ±0,3 s per file — tanpa tool ini VO terlalu pelan dan timing molor.

**Mode brief** — brief adalah target; VO harus pas di slot:

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
| **Grain hanya bila card style V memintanya** (V4/V5/V11). V1/V9/V6/V7/V8/V23/V27/V29: nol grain. Tekstur kertas/kapur V22/V24/V28 = PNG statis, bukan grain | Video terasa sama seperti sebelumnya |
| **`steps()`: interval ≥ 0.034s** (≥ 4 frame @120fps). `duration`/`n` ≥ 0.034 | Blend 120→60 merata-ratakan hold pendek → patahan hilang jadi smear |
| **`steps()` gerak panjang (> 1 s): interval ≤ 0.05s** (3.0 s → `steps(60)`); aksen pendek boleh kasar | Hold 70–115 ms = terbaca "patah-patah" (terkonfirmasi di HP, bukan salah player) |
| **Kamera: ikuti card, bukan default push-in.** V1/V9 kamera mati | Semua video bergerak dengan cara yang sama |
| Teks ≥ 32px; konten x 72–952, y 240–1460 | Tidak terbaca / tertutup UI Reels |
| Scene statis >0.5s diisi gerak (aliran, scan, pulse) | Dead air terasa patah |
| Path "draw-on" (`pathLength=1`, `dasharray 1`, `dashoffset 1`) dengan `stroke-linecap:round` **disembunyikan (opacity 0) sampai mulai digambar** | Ujung bulat dash nol tetap menggambar **titik nyasar** (terjadi di S3/S5 video #14) |
| Dua versi elemen yang ditukar (papan lama → baru) tidak boleh tampil bersamaan; matikan yang lama di frame yang sama | `check` FAIL `content_overlap` |
| Elemen yang muncul belakangan diparkir **di luar frame atau di balik objek opaque**, bukan hanya digeser sedikit | Topi/kardus "yang belum waktunya" terlihat sejak t=0 |
| **ID unik per scene**, termasuk terhadap pembungkus (`cam`, `kick`, `pan`, `ink`, …): `querySelector` mengambil yang pertama | Wajan bernama `pan` menembak pembungkus kamera → seluruh S2 tersembunyi 5,7 s (#15) |
| `index.html` memasang `*{box-sizing:border-box}` dan itu **berlaku di sub-composition** — elemen ber-border yang ukurannya dihitung sebagai content-box wajib `box-sizing:content-box` | Bingkai polaroid menyusut, baris teks tertutup border (#15) |
| Elemen yang di-`pop()` (fromTo scale 0→1, `immediateRender:false`) wajib `hide()` dulu | Tampil penuh sejak t=0 sampai saat pop |
| Elemen yang dirancang semi-transparan (bar pilihan, panel redup) jangan masuk lewat helper `fadeIn` → opacity 1; tween ke nilai rancangannya | Bar biru jadi solid, teks di atasnya tak terbaca — `check` kontras **tidak** menangkap ini (#15) |
| `tl.set(el,{textContent:'000100'})` — GSAP memperlakukan string angka sebagai **angka** (jadi `100`). Awali dengan `'\u200B'` atau pakai karakter non-angka | Skor kehilangan nol di depan (#18) |
| Transisi yang **menutup layar penuh** (wipe blok, iris, layar "LEVEL") memakai warna dengan kecerahan > 40/255 — jangan warna tinta/hitam palet | Gate frame hitam menghitungnya hitam: 70 frame di render pertama #18 (wipe `#0D1028`) |
| Gaya bergerak bertahap (V26, V19, V21) tetap butuh **elemen yang berubah tiap ≤ 0,25 s** di tiap scene (kursor berkedip, idle sprite, ikon memantul) | `qa-video` menandai blok beku ≥ 0,5 s; di #18 ada 10 blok (S5–S7, S10) |

Kepadatan mengikuti Event Map brief (target 1 kejadian ≤1.5s), bukan tebakan.

**Layout (anti "slide")** — aturan lengkap `references/peta-gaya.md` §5:
- Tiap scene mengikuti kode **K** di `STYLE.md`; visual utama (objek/karakter/dunia) ≥ 55%
  lebar area aman di ≥ 50% scene. Teks bukan protagonis kecuali K3/V1/V9/V21.
- Judul pojok kiri-atas + kotak kecil + label mono (K0) **maks 1 scene**. Posisi teks utama
  berpindah ≥ 3 zona per video.
- Sebelum menggambar dari nol, cari blok: `npx --yes hyperframes@0.8.169 catalog --query "<efek dalam bahasa Inggris>" --json`.

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
# 2. steps() — interval 0.034–0.05s untuk gerak > 1s (aksen pendek boleh lebih kasar)
grep -hoE "duration: [0-9.]+[^}]*steps\([0-9]+\)" compositions/frames/*.html
# 3. easing yang dipakai harus yang tercantum di STYLE.md
grep -hoE 'ease: "[a-zA-Z0-9.()]+"' compositions/frames/*.html | sort | uniq -c
# 4. kamera — V1/V9 harus 0 tween pada #cam
grep -c "#cam" compositions/frames/*.html
```

Bandingkan hasil dengan `STYLE.md`. Kalau easing/kamera/grain tidak cocok dengan card, **perbaiki
dulu** — jangan bergantung pada review mata setelah render.

**Cek variasi layout pra-render** (murah, dari snapshot):

```bash
rm -rf qc/snap && npx --yes hyperframes@0.8.169 snapshot --at <tengah tiap scene, koma> --no-end --keep -o qc/snap
python3 ../../tools/qa-variety.py qc/snap/ [--min-occ <card.min_occ>]
```

FAIL "kosong" atau dua scene berurutan berlayout kembar → perbaiki komposisi sebelum render.

### 7. Render

```bash
cd "videos/$SLUG"
PRODUCER_LOW_MEMORY_MODE=false npx --yes hyperframes@0.8.169 render \
  --quality looks --video-bitrate 14M --fps 120 -o renders/raw120.mp4
```

**Render bisa gagal tapi exit 0.** Simpan log (`... 2>&1 | tee renders/render.log`), lalu
wajib: `grep -E "Render failed|✗" renders/render.log` kosong **dan** mtime `raw120.mp4` lebih
baru dari waktu mulai render. Kalau encoder streaming putus di tengah (pernah 4× di #13),
render ulang tanpa `--video-bitrate`, pakai `--crf 20`.

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

```bash
# gate variasi visual (occupancy, layout kembar, kemiripan look vs video lain)
python3 ../../tools/qa-variety.py "renders/<slug>.mp4" --project . [--min-occ <card.min_occ>]
```

Target: frame hitam **0**, collapse event seminimal mungkin, durasi = jumlah slot, loudness
**-14..-23 LUFS**, peak < -1 dBTP (limiter -2), 1080×1920 @ 60fps, `qa-variety` **bukan FAIL**
(median occupancy ≥ 0,20; look < 0,85 terhadap 3 video terbaru). FAIL = perbaiki komposisi,
render ulang — bukan dilaporkan lalu berhenti.

**Kalau user bilang "patah-patah": audit interval `steps()` dulu** (`duration/n` ≤ 0,05 s untuk
gerak > 1 s; aksen pendek boleh kasar). Itu akar masalah yang terkonfirmasi. Baru setelah itu
tanya player (Windows Media Player tersendat di 1080×1920@60fps; VLC/Chrome lancar).

**Kalau render gagal:** `Chrome not found` → `export PUPPETEER_EXECUTABLE_PATH=$(which chromium)`;
RAM kecil → tetap `PRODUCER_LOW_MEMORY_MODE=false` tapi turunkan worker; `ENOSPC` → hapus render lama.

### 9. Ringkas ke user

Sebut: path MP4, durasi, ukuran file, jumlah scene, hasil hitung frame hitam/beku, dan daftar
"Cek ulang sebelum posting" dari brief. Sebut juga deviasi timing (kalau ada) dan residual risk.

Sebut juga **arahan yang dipakai** (F · V · P · T · K · cast), dua sumbu yang paling berbeda
dari video sebelumnya, hasil `qa-variety`, path `_review.mp3`, dan apakah ada aturan audit
yang di-override oleh card style. Mode topik: sebut juga sumber riset utama dan daftar
"cek ulang sebelum posting" dari `research.md` (wajib untuk kisah islami: rujukan ayat).

Terakhir, **update `STYLE-LEDGER.md` lewat script** (jangan tulis baris tangan):

```bash
# videos/<slug>/ledger-row.json:
# {"gerak": "...", "tekstur": "...", "blend": "ya", "catatan": "...", "layouts_aktual": ["K15","K2",...]}
node tools/pick-direction.mjs --record videos/<slug>
```

Mode brief tanpa `direction.json`: jalankan picker dengan `--force-v <V brief>` + `--write`
dulu supaya `--record` punya data. Kolom "catatan" memuat override, kegagalan, hasil
`qa-variety`, dan fix yang tidak kelihatan dari kode. Untuk tipe V22–V29, catat juga apakah
resep card bekerja di render pertama (itu uji kelayakannya).

Tanpa baris baru di ledger, rotasi video berikutnya akan salah hitung. Kalau kolom palet atau
tipografi dibiarkan kosong, video berikutnya akan mengulang look yang sama tanpa ketahuan —
ini persis kesalahan yang membuat baris 1–3 sekarang tidak bisa dipakai untuk rotasi.

**Jangan bilang "selesai" sebelum frame MP4 benar-benar dilihat dan hitungan frame hitam = 0.**