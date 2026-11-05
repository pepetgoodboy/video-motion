---
name: video-reels-presenter
description: Buat video Reels/TikTok 9:16 yang TIDAK faceless — presenter nyata (footage sendiri) dipadukan dengan scene HyperFrames. Dipakai saat user menempel footage/folder rekaman atau minta "video reels tapi ada orangnya / pakai muka gue / ada presenter". Menjalankan pipeline HyperFrames yang sama dengan video-reels (scaffold portrait, font shared, BGM/SFX, render 120fps, blend 60fps) TAMBAH lapisan presenter — trim per shot, cutout alpha, sinkron audio rekaman, dan gerbang verifikasi alpha + lip-sync.
---

# /video-reels-presenter — brief + footage → MP4

Skill ini **bukan pengganti** `/video-reels`. Langkah scaffold, font, BGM/SFX, larangan komposisi,
render 120fps, blend 60fps, dan QA MP4 **identik** — semuanya didefinisikan di
`.claude/skills/video-reels/SKILL.md` dan `CLAUDE.md`. Yang ditambahkan di sini hanya **apa yang
berubah ketika ada manusia di dalam frame**.

Kalau langkah umum disalin ke sini, dua file akan basi bersamaan dan tiap gotcha baru harus
diperbaiki dua kali. **Rujuk, jangan duplikat.**

## Yang berbeda dari jalur faceless

| Tahap | Faceless (`/video-reels`) | Presenter (skill ini) |
|---|---|---|
| Input | 1 path brief `.md` | brief `.md` **+ folder footage** |
| Naskah | VO Cartesia dari teks | **kata-kata user sendiri** (audio rekaman) |
| Aset baru | BGM + SFX | + shot terpotong, opsional cutout alpha |
| Timing | brief menentukan | **durasi rekaman menentukan**; brief menyesuaikan |
| Komposisi | scene penuh | scene + `<video>` presenter (P1/P2/P3) |
| Verifikasi | frame hitam/beku/loudness | + **alpha cutout**, **lip-sync ≤1 frame**, **oklusi teks** |
| Style card | 1 kartu V | kartu V **+** `presenter-layer.md` (sumbu ke-7) |

## Prinsip yang tidak bisa ditawar

1. **Suara presenter = suara rekaman.** Jangan menimpa mulut yang bergerak dengan VO Cartesia.
   Kalau bibir bilang "delapan" dan audio bilang "sembilan", penonton tahu, dan seluruh alasan
   memakai orang nyata hilang. TTS hanya sah untuk scene yang presenter-nya **tidak** terlihat
   sedang bicara (screencast, tangan, b-roll).
2. **V-code tetap dipilih lebih dulu.** Presenter tidak menggantikan tipe visual. Dunia di belakang
   orang tetap diatur card V — baca `styles/V<n>.md` utuh, tolak bentrok dengan 3 baris terakhir
   `STYLE-LEDGER.md`.
3. **P1 ≤ 25% durasi.** Lebih dari itu jadi vlog, dan kekayaan pipeline tidak terpakai.
4. **Tanpa footage, jangan mulai.** Skill ini tidak mengarang orang. Kalau user belum punya rekaman,
   berhenti dan berikan checklist rekam (Langkah 2).

## Input yang diminta (sekali, di awal)

Tanya **satu kali**, lalu jalan:

| # | Yang dibutuhkan | Default kalau user tidak menjawab |
|---|---|---|
| 1 | Path brief `.md` | cari `.md` terbaru di `source/`, konfirmasi sekali |
| 2 | Path folder footage (mp4/mov mentah) | **wajib** — tanpa ini skill berhenti |
| 3 | Cutout (orang tanpa latar) atau footage apa adanya? | tanya; default **footage apa adanya (P1/P3)** karena cutout mahal |
| 4 | Audio menempel di footage, atau terpisah? | default: menempel |

Sebelum lanjut, **probe footage** dan laporkan apa adanya:

```bash
for f in "$FOOTAGE"/*.mp4 "$FOOTAGE"/*.MOV "$FOOTAGE"/*.mov; do
  [ -e "$f" ] || continue
  printf "%s  " "$(basename "$f")"
  ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -of csv=p=0 "$f"
  printf "    durasi: %s  " "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")"
  ffprobe -v error -select_streams a:0 -show_entries stream=codec_name,channels -of csv=p=0 "$f" \
    | sed 's/^/    audio: /'
  echo
done
```

Laporkan resolusi, fps, durasi, ada/tidak audio. Ini menentukan langkah berikutnya.

---

## Langkah 0 — Tipe visual + peta presenter

```bash
# 1. V-code dari brief (wajib; jangan menebak)
grep -nE "Tipe visual|V[0-9]+( \+ V[0-9]+)?" source/<brief>.md | head

# 2. ledger rotasi
sed -n '1,40p' STYLE-LEDGER.md
```

- Brief **tidak** punya kode V → berhenti, minta user menambahkannya. Brief = sumber kebenaran.
- V utama sama dengan 3 baris terakhir yang terisi → laporkan konflik, jangan diam-diam ganti.
- Baca `.claude/skills/video-reels/styles/V<n>.md` **seluruhnya** +
  `.claude/skills/video-reels/styles/README.md` + `presenter-layer.md` (satu folder dengan file ini).
  Untuk **V13–V21**, baca juga `styles/FEASIBILITY.md`. Tipe berbasis canvas/karakter
  (V13/V19/V21) **jarang cocok** dengan presenter: dunia di belakang orang tidak boleh
  menarik perhatian lebih dari wajah. Kalau dipakai, batasi sebagai aksen ≤ 30% durasi.

Tentukan **peta presenter** sebelum menyentuh kode, tulis di `STYLE.md`:

| Scene | Penempatan | Shot | Rentang sumber | Durasi | Alasan |
|---|---|---|---|---|---|
| S1 | P1 full | shot-a.mp4 | 3.2–10.0 | 6.8s | hook, kontak mata |
| S3 | P3 bubble | shot-b.mp4 | 0.0–5.0 | 5.0s | narasi, visual utama di kanan |
| S5 | P2 cutout | shot-c.mp4 | 4.0–9.4 | 5.4s | diagram di belakang badan |

Scene tanpa presenter ditulis `—`. Campuran presenter dan faceless **normal dan disarankan** —
itu yang membedakan video ini dari vlog.

## Langkah 1 — Scaffold

Sama persis dengan `/video-reels` Langkah 1 (`--resolution=portrait`, pin `0.8.169`). Tambahan folder:

```bash
mkdir -p "videos/$SLUG"/{assets/{fonts,bgm,sfx,vo,presenter,raw},compositions/frames,renders}
```

`assets/raw/` = footage mentah (jangan diedit). `assets/presenter/` = shot terpotong + cutout.

Keduanya **tidak perlu** ditambahkan ke `.gitignore` — `videos/` sudah di-ignore utuh. Jangan
menambah entri yang tidak berefek.

## Langkah 2 — Rekam (atau minta user merekam)

Kalau footage sudah ada, lewati ke Langkah 3. Kalau belum, berikan checklist ini apa adanya:

```
Checklist rekam (9:16, HP ditahan vertikal):
1. Resolusi 1080×1920 (4K vertikal lebih aman untuk crop).
2. Kamera setinggi mata. Duduk, kamera di tripod/tiang. Jangan handheld.
3. Jarak: kepala sampai dada bawah memenuhi frame. Mata di sekitar 1/3 atas.
4. Cahaya dari DEPAN (jendela di depan wajah). Hindari hanya lampu langit-langit — mata jadi gelap.
5. Suara: mic eksternal 15–20 cm di bawah dagu, kamar tanpa gema (karpet, gorden, buku).
6. Rekam per-shot, satu poin per shot. Mulai 1 detik SEBELUM bicara, berhenti 1 detik sesudah.
7. Shutter 1/60 (24–30fps). Manual focus kalau bisa.
8. Latar yang tidak mencuri perhatian. Kalau akan di-cutout, latar harus kontras dengan pakaian & rambut.
```

**Kenapa mic eksternal, bukan mic kamera:** mic internal HP menangkap gema ruangan dan suara
refleksi. Hasilnya terdengar "di dalam kaleng", dan EQ tidak memperbaikinya. Sampaikan **sebelum**
user merekam 20 menit yang sia-sia.

## Langkah 3 — Potong jadi shot (selalu)

Trim di ffmpeg, bukan di HyperFrames — lebih cepat diiterasi, hasilnya deterministik, dan file yang
masuk render sudah bersih.

```bash
cd "videos/$SLUG"
ffmpeg -ss 3.2 -to 10.0 -i assets/raw/shot-a.mp4 -c:v libx264 -crf 18 -preset slow \
  -c:a aac -b:a 192k -movflags +faststart -y assets/presenter/s1.mp4
```

| Aturan trim | Alasan |
|---|---|
| Mulai **0.1s sesudah** tarikan napas / sebelum kata pertama | Frame pertama sering masih bergerak |
| Akhir **0.3s sesudah** kata terakhir | Memotong di tengah kata terdengar "dipotong" |
| Jangan trim rapat lalu menambal crossfade | Terdengar nafas terpotong |
| Satu shot = satu ide | Shot 20 detik berisi tiga poin memaksa semua scene menunggu |

Ukur ulang setelah potong:

```bash
for f in assets/presenter/s*.mp4; do
  printf "%s %s\n" "$(basename "$f" .mp4)" \
    "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")"
done
```

**Angka inilah yang mengatur timing scene**, bukan sebaliknya.

### Cek geseran audio akibat trim

```bash
ffmpeg -v error -i assets/presenter/s1.mp4 -vn -ac 1 -ar 16000 -f wav -y /tmp/a1.wav
ffmpeg -v error -ss 3.2 -to 10.0 -i assets/raw/shot-a.mp4 -vn -ac 1 -ar 16000 -f wav -y /tmp/a2.wav
ffmpeg -v error -i /tmp/a1.wav -i /tmp/a2.wav -filter_complex \
  "axcorrelate=size=1024:algo=fast" -f null - 2>&1 | tail -3
```

Selisih > **±0.04s** (≈1 frame @24fps) → re-mux dengan `-itsoffset` dan ukur lagi.

## Langkah 4 — Cutout (hanya kalau brief meminta P2)

**Skip kalau semua presenter P1/P3.** Ini langkah termahal di seluruh pipeline.

### 4a. Turunkan FPS dulu — resolusi hampir tidak menolong

**Terukur di mesin ini (2 Nov 2026).** Tiga klip dengan isi sama, **96 frame identik** @24fps:

| Resolusi | Waktu | Per frame |
|---|---|---|
| 270×480 | 115 s | 1,20 s |
| 540×960 | 117 s | 1,22 s |
| 1080×1920 | 143 s | 1,49 s |

Kesimpulan yang mengubah rencana: **biayanya per-frame tetap, bukan per-piksel.** Turun dari 1080p
ke 540p (area piksel ¼) hanya menghemat **~18%**. Yang benar-benar menghemat adalah **jumlah frame**:

- **Turunkan FPS** — ini tuas utamanya. 30fps → 24fps = hemat 20%; → 15fps = hemat 50%.
- Resolusi: turunkan **hanya kalau memang tujuannya kecil** (P3 bubble), bukan sebagai strategi
  menghemat waktu. Untuk P2 full-frame, tetap 1080p — 18% tidak sebanding dengan kehilangan detail.
- Jangan berharap bisa "mempercepat dengan mengecilkan gambar". Tidak begitu cara kerjanya.

```bash
# P2 full-frame: pertahankan resolusi, turunkan fps saja
ffmpeg -i assets/presenter/s3.mp4 -r 24 -c:v libx264 -crf 18 -preset slow -an \
  -y assets/presenter/s3-pre.mp4

# P3 bubble (tampil ~0.3 skala): di sini resolusi kecil SAH, karena tujuannya memang kecil
ffmpeg -i assets/presenter/s5.mp4 -r 24 -vf "scale=540:960" -c:v libx264 -crf 18 \
  -preset slow -an -y assets/presenter/s5-pre.mp4
```

`-an` penting — audio diambil dari footage asli, bukan dari file cutout.

### 4b. Removal

```bash
cd "videos/$SLUG"
npx --yes hyperframes@0.8.169 remove-background assets/presenter/s3-pre.mp4 \
  -o assets/presenter/s3.webm --quality balanced --device cpu
```

Waktu terukur di mesin ini: **≈1,2–1,5 detik per frame** (hampir tetap, lihat tabel di 4a). Contoh
nyata: 4 detik @24fps = 96 frame ≈ **2 menit**. Run pertama menambah waktu unduh model + pasang
`onnxruntime-node`.

- Satu per satu. Jangan paralel (RAM 8 GB).
- Butuh teks **di belakang** orang **dan** latar asli tetap tampil? Tambah
  `--background-output assets/presenter/s3-plate.webm`.

### 4c. Verifikasi alpha — gerbang mutlak

**Cara cek yang naif memberi hasil salah.** Terukur di mesin ini:

| Perintah | Hasil | Artinya |
|---|---|---|
| `ffprobe ... pix_fmt` | `yuv420p` | **Normal.** Alpha VP9 = side-stream, bukan pix_fmt |
| `-vf format=rgba` lalu baca byte ke-4 | semua 255 | Decoder default abaikan alpha — **false negative** |
| `ffprobe ... stream_tags=ALPHA_MODE` | `1` | **Penanda sah** alpha ada |
| `-c:v libvpx-vp9 -vf alphaextract` | 0…255 | **Cara ukur yang benar** |

```bash
# penanda
ffprobe -v error -select_streams v:0 -show_entries stream_tags=ALPHA_MODE -of csv=p=0 assets/presenter/s3.webm

# ukur alpha sebenarnya (WAJIB -c:v libvpx-vp9)
ffmpeg -v error -c:v libvpx-vp9 -ss 1 -i assets/presenter/s3.webm -frames:v 1 \
  -vf "alphaextract,format=gray" -f rawvideo -y /tmp/alpha.raw
node -e '
const b=require("fs").readFileSync("/tmp/alpha.raw");
let amin=255,amax=0,vis=0;
for(const a of b){if(a<amin)amin=a;if(a>amax)amax=a;if(a>200)vis++;}
console.log("alpha min:",amin,"max:",amax,"subjek-solid:",(100*vis/b.length).toFixed(1)+"%");'
```

Lulus bila **`subjek-solid` antara 1% dan 70%**. Semua 255 = alpha hilang. **`subjek-solid` = 0%
berarti segmentasi mengembalikan mask kosong** — cutout jadi lapisan tak terlihat dan scene P2
berubah jadi latar kosong tanpa error apa pun.

### Ambang (terukur di mesin ini)

| `subjek-solid` | Arti | Tindakan |
|---|---|---|
| 0% | mask kosong — **cutout tak terlihat** | ganti shot, jangan render |
| 1–70% | normal (kepala+dada 9:16 biasanya 15–40%) | lanjut |
| > 90% | mask hampir menutupi frame — latar ikut terbawa | perbaiki kontras latar/pakaian, ulangi |

### `check` TIDAK menangkap cutout kosong — terbukti

Diuji 1 Nov 2026 pada cutout dengan `subjek-solid` **0.00%** di semua frame: `lint` 0 error,
`check` → **`Check passed`**, layout 0 issue. **`check` bukan bukti cutout benar.** Bukti sah hanya
pengukuran di atas **plus** satu frame yang dilihat sendiri:

```bash
ffmpeg -v error -c:v libvpx-vp9 -ss 1 -i assets/presenter/s3.webm -frames:v 1 \
  -vf "format=rgba" -y qc/cutout-cek.png
```

Buka `qc/cutout-cek.png` dengan Read. Harus terlihat sosok orang. Transparan semua = gagal;
orang terpotong separuh (kepala/tangan hilang) = juga gagal.

Gagal → ulangi `--quality best`; kalau masih gagal, turunkan scene ke P3.

## Langkah 5 — Audio

Suara presenter **dari rekaman**. BGM & SFX dari pipeline biasa (`/video-reels` Langkah 3).

| Sumber | Dipakai untuk |
|---|---|
| audio di `assets/presenter/s*.mp4` | suara presenter (`data-has-audio="true"`, tanpa `muted`) |
| BGM `audio.mjs` | bed, **di-duck** saat presenter bicara |
| SFX `shared/sfx/` | aksen transisi, impact |

### Ducking BGM di bawah suara presenter

Suara orang adalah fokus. Turunkan BGM 8–12 dB saat presenter bicara. Pakai lane automation —
tween volume di timeline **diabaikan** bila lane ada:

```html
<audio
  id="bgm"
  src="./assets/bgm/track.mp3"
  data-start="0"
  data-duration="52"
  data-track-index="2"
  data-volume="0.55"
  data-automation='{"lanes":{"volume":[{"t":0,"value":0.12},{"t":6.8,"value":0.55},{"t":13.6,"value":0.12}]}}'
></audio>
```

Jeda presenter > 1.5s → naikkan lagi. BGM yang terus rendah terasa "menahan napas".

**Jangan pakai VO Cartesia untuk scene yang mulut presenter terlihat bergerak.** Kalau user minta
"suaranya lebih bagus", jelaskan sekali: mengganti suara = lip-sync palsu, terlihat jelas di 9:16
close-up. Tawarkan rekam ulang dengan mic lebih baik.

## Langkah 6 — Timing scene

**Durasi rekaman menentukan slot scene.**

1. Scene presenter: `data-duration` = durasi shot (bulatkan ke 0.1s).
2. Scene faceless di antaranya: durasi dari brief, boleh disesuaikan agar total = target brief.
3. `data-start` scene N+1 = `data-start` scene N + `data-duration` scene N. **Tepat menyambung.**
4. Total melebihi target → **potong footage**. Jangan `atempo` > 1.08 (cempreng, merusak kredibilitas).
5. Total kurang → tambah scene faceless, jangan ulang shot yang sama.

Catat deviasi total terhadap target brief, sebutkan di ringkasan akhir.

## Langkah 7 — Komposisi

Semua aturan `CLAUDE.md` + `/video-reels` Langkah 5 tetap berlaku. Tambahan presenter:

### P1 — full frame

```html
<!-- scene s1.html, di dalam <template> -->
<div id="root" class="scene">
  <video
    id="pres-s1"
    src="./assets/presenter/s1.mp4"
    data-start="0"
    data-duration="6.8"
    data-track-index="31"
    data-has-audio="true"
    playsinline
  ></video>
  <!-- tipografi DI ATAS orang, di area yang tidak menutup mata/mulut -->
</div>
```

Zoom digital **dilarang** (upscale + blur). Variasi = shot kedua.

### P2 — cutout

```html
<div id="scene">
  <div id="board">...</div>                        <!-- latar HyperFrames -->
  <h1 id="headline" style="z-index:20">...</h1>    <!-- teks DI BELAKANG badan -->
  <div id="cut" style="position:absolute; inset:0; z-index:30">
    <video id="pres-s3" src="./assets/presenter/s3.webm"
      data-start="0" data-duration="5.4" data-track-index="31"
      data-media-start="0" muted playsinline></video>
  </div>
</div>
```

Butuh latar asli juga? Pakai `-plate` dari `--background-output` sebagai lapisan bawah.

### P3 — bubble

```html
<div id="bub" style="position:absolute; left:72px; bottom:460px; width:330px; z-index:30">
  <video id="pres-s3b" src="./assets/presenter/s3b.mp4"
    data-start="0" data-duration="5.0" data-track-index="31"
    data-has-audio="true" playsinline></video>
</div>
```

Footage apa adanya, tanpa cutout. Beri tepi (border 1px + bayangan statis) supaya terbaca sebagai
komponen. Wajib dalam x 72–952 / y 240–1460.

### Gerak

| Elemen | Boleh | Dilarang |
|---|---|---|
| wrapper tanpa `data-*` | `scale 1.00→1.03` `sine.inOut`, drift ≤8px | rotasi, bounce, parallax besar |
| `<video>` itu sendiri | — | tween `opacity`/`autoAlpha`/`visibility` (framework menimpa) |
| latar scene | parallax penuh | ikut turun bersama orang |

Satu scene tetap wajib punya elemen bergerak di **frame pertama dan terakhir**. Kalau orangnya diam
di frame terakhir, isi dengan gerak latar/ambient.

**Safe zone tidak berubah** (x 72–952, y 240–1460). Yang berubah: **area untuk teks menyusut**
sebesar badan presenter. Petakan ulang di `STYLE.md` per scene.

## Langkah 8 — Validasi

```bash
cd "videos/$SLUG"
npx --yes hyperframes@0.8.169 lint
npx --yes hyperframes@0.8.169 check --at-transitions
npx --yes hyperframes@0.8.169 snapshot --at <20 titik>
```

Kegagalan khas jalur presenter:

| Temuan | Artinya / fix |
|---|---|
| `video_nested_in_timed_element` | `<video data-start>` di dalam wrapper ber-`data-start` → timing di salah satu saja |
| `video_missing_muted` | video tanpa `muted` dan tanpa `data-has-audio="true"` |
| `media_missing_id` | `<audio>` tanpa `id` → render senyap |
| `media_crossorigin_breaks_preview` | ada `crossorigin` di media → hapus |
| `video_alpha_unread` | alpha cutout tak terbaca → ulangi 4c |
| oklusi teks **error** | kata 80% tertutup badan → geser teks atau orang |
| `text_below_floor` / `line_unread` | teks di dalam footage, atau teks HyperFrames kurang lama |
| `canvas_covered` | video P1 menutup kanvas sepanjang film → itu vlog, potong |

Snapshot **bukan** bukti hasil render.

## Langkah 9 — Render

Sama seperti `/video-reels` Langkah 7.

```bash
cd "videos/$SLUG"
PRODUCER_LOW_MEMORY_MODE=false npx --yes hyperframes@0.8.169 render \
  --quality looks --video-bitrate 14M --fps 120 -o renders/raw120.mp4
# lalu perintah ffmpeg blend di CLAUDE.md → renders/<slug>.mp4
```

Decode footage menambah beban. Kalau gagal karena RAM, turunkan **worker** — jangan fps/bitrate.

## Langkah 10 — Verifikasi MP4 (fail-closed)

Semua cek `/video-reels` Langkah 8 tetap jalan, lewat `qa-video.mjs`:

```bash
node ../../tools/qa-video.mjs "renders/<slug>.mp4" --scenes <a:b,c:d,...>
```

**Plus tiga gerbang khusus presenter:**

### 10a. Alpha benar-benar transparan di MP4 final

WebM benar ≠ MP4 benar. Ambil frame dari **MP4** di area yang seharusnya latar HyperFrames:

```bash
ffmpeg -v error -ss <t_scene_p2> -i "renders/<slug>.mp4" -frames:v 1 -y qc/p2.png
```

Buka `qc/p2.png` dengan Read. Latar HyperFrames **harus terlihat**. Area sekitar badan **hitam pekat**
atau kotak gelap = alpha hilang di jalur render. Fix cutout, jangan lanjut.

### 10b. Lip-sync ≤ 1 frame

Ambil 2 frame per scene presenter: saat plosif (b/p/m — bibir tertutup) dan saat vokal lebar.
Cocokkan dengan waveform:

```bash
ffmpeg -v error -ss <t_mulai_bicara-0.5> -t 2 -i "renders/<slug>.mp4" -ac 1 -ar 8000 -f wav -y /tmp/lip.wav
```

Toleransi **≤0.017s (1 frame @60fps)**. Lebih dari itu → geser `data-media-start` shot tersebut.

### 10c. Oklusi teks di semua scene presenter

Jalankan `check` ulang pada range scene presenter; nol error oklusi. Jangan diakali dengan font
di bawah 32px.

**Jangan bilang selesai sebelum ketiganya lulus.** Gagal → fix → render ulang → verifikasi ulang.

## Langkah 11 — Ringkas + ledger

Sebut:

- path MP4, durasi, ukuran, jumlah scene, **berapa scene presenter + penempatannya**
- `qa-video.mjs`: frame hitam, frame beku, loudness
- 3 gerbang presenter (alpha, lip-sync, oklusi)
- V-code + dua sumbu paling beda dari video sebelumnya
- deviasi timing terhadap target brief
- residual risk (mis. "cutout S5 hanya 540×960, jika diputar penuh akan sedikit lembut")

Update `STYLE-LEDGER.md` — satu baris dengan **semua 13 kolom**, termasuk palet, tipografi,
dan dua kolom presenter:

| Tanggal | Slug | V utama | V aksen | Palet | Tipografi | Bahasa gerak | Tekstur | Blend | **Presenter** | **Mode** | Catatan |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 2 Nov 2026 | `...` | V5 | — | P4 | T3 | `steps()` 0.04s | grain statis 0.02 | ya | **ya** | P1 20% · P3 60% · P2 20% | cutout S5 540p |

Tanpa baris baru di ledger, rotasi V video berikutnya salah hitung. **Presenter tidak mengisi
slot rotasi V** — kolom V tetap berisi tipe visual dunia di belakang/samping orang.

## Batas skill ini

| Bukan tugas skill ini | Pakai |
|---|---|
| Menulis naskah / hook | `/m-copy` atau MASTER-PROMPT di Claude web |
| Memilih tipe visual V | `.claude/skills/video-reels/styles/V<n>.md` + MASTER-PROMPT 12.1 |
| VO TTS (scene tanpa presenter terlihat) | `tools/cartesia-vo.mjs` |
| Avatar AI dari foto | `media-use generate --type avatar` (berbayar, wallet 0 USD per 1 Nov 2026) |
| Grading footage gelap/flat | `media-use` media treatment |
| Video faceless murni | `/video-reels` |