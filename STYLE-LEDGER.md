# STYLE LEDGER — rotasi Tipe Visual

Dibaca oleh `tools/pick-direction.mjs` (bukan dibaca manual). Tujuannya satu: menjawab "arah
visual apa yang belum dipakai" tanpa mengandalkan ingatan.

Aturan rotasi (detail di `tools/direction-map.json` → `rotation`):
**V utama ≠ 3 video terakhir · keluarga gaya ≠ video terakhir · palet ≠ 2 terakhir ·
tipografi ≠ 2 terakhir · layout dominan (K) ≠ video terakhir.**

```bash
node tools/pick-direction.mjs --status          # siapa yang terkunci sekarang
node tools/pick-direction.mjs --record videos/<slug>   # tambah baris (jangan tulis tangan)
```

Baris ditambah lewat `--record` supaya jumlah & urutan kolom selalu benar. Baris yang ditulis
tangan pernah dua kali rusak (baris 12 terpisah baris kosong; baris semut tertempel di akhir
file dengan urutan kolom lain) — dua-duanya membuat rotasi salah hitung.

## Catatan

| # | Tanggal | Slug | V utama | V aksen | Palet | Tipografi | Bahasa gerak | Tekstur | Blend 120→60 | Presenter | Mode presenter | Catatan | Format | Layout (K) | Suara |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 25 Okt 2026 | (Cloudflare Tunnel vs Nginx) | — | — | P1 | T1 | — | — | ya | tidak | — | V belum tercatat saat dibuat | — | — | — |
| 2 | 25 Okt 2026 | (PHP2Shell) | — | — | P2 | T2 | — | — | ya | tidak | — | V belum tercatat saat dibuat | — | — | — |
| 3 | 25 Okt 2026 | (Tutorial motion di HP) | — | — | P4 | T3 | — | — | ya | tidak | — | V belum tercatat saat dibuat | — | — | — |
| 4 | 29–30 Okt 2026 | `cara-coba-linux-tanpa-hapus-windows` | **V10** (dibaca ulang dari MP4, bukan brief) | V2 (denah dapur) | P8 | T4 (Familjen + Martian) | mulus; `power2/back/sine`, tanpa `steps()` | grain statis 0.028 di 9/9 scene | ya | tidak | — | Brief lama tidak menulis kode V. V10 disimpulkan dari isi: terminal/mock UI + denah = peta. **Konfirmasi ke user sebelum dipakai sebagai kunci rotasi penuh.** | — | — | — |
| 5 | 1 Nov 2026 | `kenapa-docker-image-bisa-membengkak` | **V2** (Cutout craft — brief) | **V6** (Tactile, tekstil tenun/sulam) | **P9 (baru)** | **T6 (baru: Alfa Slab One + Nunito)** | stepped; interval tween ≥ 0.034s; easing halus hanya kamera | serat tenun statis + noise halus, **nol grain film** | ya | tidak | — | Dicatat ulang 5 Nov 2026 — sebelumnya terlewat. Sumber: `videos/kenapa-docker-image-bisa-membengkak/STYLE.md` + brief §11. | — | K11 · K2 (dibaca dari contact sheet 10 Nov) | — |
| 6 | 1 Nov 2026 | `8-command-dasar-terminal-linux` | **V10** (UI/product motion) | — | P1 | — | aksi-dulu (state berubah karena klik/ketik nyata) | tidak tercatat di STYLE.md | ya | tidak | — | **Override rotasi resmi**: aturan melarang V10 (baris 4), user memutuskan tetap. Alasan di `videos/8-command-dasar-terminal-linux/STYLE.md`. | — | — | — |
| 7 | 3 Nov 2026 | `struktur-folder-linux` | **V2** (Cutout craft — brief §3/11) | — | P4 | T3 (Schibsted + DM Mono) | stepped; **semua 236 tween dinormalisasi ke 12 fps (hold 83 ms)**; kamera sine (S1/S4) & steps (S2/S3/S5/S6) | paper-grain PNG 1400×2400 repeat, geser 1–2px/0.5s (A1) di 6/6 scene | **TIDAK** — native 60fps beginframe | tidak | — | **QA 5 Nov: FAIL → overhaul.** Ghosting blend 120→60 (188 frame >2 level, max 28.9 @51.63s) → blend dibuang, render native 60fps. 5 paper-wipe transisi berlabel (X1/X2/X5/X9). S2 parallax 3 kedalaman nyata (−120/−430/−600) + crate/pipa/hangtag. S3 wire+node+4 config paper. S5 84→190 kertas, pull-back 1.22→1.52. S6 mini-denah di kartu penutup. VO dinaskah ulang (dead air 13.3s→~2s) + loudnorm −16 LUFS; BGM −18 LUFS. SFX 14 sampel. Safe area & font 30→32px diperbaiki. | — | K0 · K2 · K6 (contact sheet 10 Nov) | — |
| 8 | 5 Nov 2026 | `bikin-salin-pindah-hapus-file-di-linux` | **V3** (Mixed media collage — pilihan user) | **V1** (kinetic typography) | P4 | T2 (Archivo var 62–125 + Newsreader italic + IBM Plex Mono) | campuran: potongan ditempel `back.out(1.4–1.8)`, label/ketikan `steps(6–9)` & `set()` 0.036–0.052s, kamera `sine.inOut`/`power3` | **4 tekstur**: fotokopi (multiply 0.40–0.55), halftone riso (0.13–0.22), serat kertas (0.44–0.50), tinta padat; semua statis | ya | tidak | — | Brief minta V2 → **V2 terkunci** (baris 5 & 7), user pilih V3. Fix pra-render: perintah `cp`/`mv`/`rm` terpotong di terminal → wrap + font 34–40px (brief §2 wajib utuh). Naskah dipadatkan + speed 1.08 (VO 56.8s). BGM 54s, outro 6s tanpa loop. 18 motion-collapse = hold `set()` ketikan (bukan stutter). | — | K0 · K8 (contact sheet 10 Nov) | — |
| 9 | 6 Nov 2026 | `hak-akses-file-linux-rwx-chmod` | **V18** (Isometric — brief) | **V21** (Split-flap aksen S4) | P3 (+mint) | T5 (Unbounded + Newsreader + Geist Mono) | stepped untuk digit/label; `power2`/`sine` kamera C2/C3; S4 statis mengikuti card V21 | isometric flat shading + dot-grid statis; tanpa grain | ya | tidak | — | Render final 1080×1920, 60fps, 60.000s; 8 scene; 0 frame hitam/3600. Cartesia Galang, speed 1.15; BGM 30s diulang + fade. 20 motion-collapse-then-resume terdeteksi (hold stepped termasuk); skrip diagnosis memakai asumsi 30fps sehingga label waktu perlu dikali 0.5 untuk file 60fps. | — | K0 · K11 (contact sheet 10 Nov) | Galang 1.15 |
| 10 | 7 Nov 2026 | `apa-itu-sudo` | **V10** (UI / product motion — brief) | — | P8 (Concrete + Signal) | T4 (Familjen Grotesk + Instrument Serif + Martian Mono) | aksi dahulu; kursor/klik memicu state; `power3`/`power2`/`sine`; tanpa `steps()` | grid 4px statis + bayangan UI; ring klik; tanpa grain | ya | tidak | — | Final 1080×1920, 60fps, 60.000s; 7 scene; 0 frame hitam/3600. Cartesia Galang 1.15; BGM 37s di-loop silang + fade; punch S5 34.5s. Loudness −14.3 LUFS, true peak −2 dBFS. Lint + Studio lint bersih; `check` browser session timeout (120s), snapshot dan MP4 diperiksa. | — | K0 (contact sheet 10 Nov) | Galang 1.15 |
| 11 | 7 Nov 2026 | `baca-cari-isi-file-linux` | **V19** (ASCII Art — brief) | — | **P3** (Cobalt Blueprint) | **T2** (Archivo Expanded + Newsreader Italic + IBM Plex Mono) | pemetaan ulang karakter deterministik **24 Hz** (interval 0,0417s); kamera diam/skala 1.0 | grid ASCII 20×45 sebagai tekstur, opacity 0,12–0,24; latar solid; tanpa grain/filter | ya | tidak | — | Final 1080×1920, 60fps, 75.000s; 8 scene; 0 frame hitam/4500; loudness −17,8 LUFS, true peak −2 dBFS; 22 motion-collapse terdeteksi. Timestamp bucket `diagnose-motion.mjs` perlu ×0,5 karena asumsi 30fps pada file 60fps. Kamera C3/C4/C5/C8 di brief diturunkan menjadi diam sesuai card V19; tidak ada V aksen. VO Galang 1.15; S3/S4 dipadatkan agar muat. Fixture sintetis + command `cat`, `grep`, `find`, pipeline `find -exec grep`, serta key `less` `/error`, `n`, `q` dijalankan. Registry HyperFrames tidak tersedia di tool/repo. | — | K0 · K3 (contact sheet 10 Nov) | Galang 1.15 |
| 12 | 8 Nov 2026 | `kisah-semut-yang-cerdas-dan-nabi-sulaiman` | **V5** (Hand-drawn — brief) | — | **P10** (Kebun Ceria — baru) | **T7** (Baloo 2 + Nunito Sans + IBM Plex Mono — baru) | draw-on `stroke-dashoffset` `power2.inOut`/`sine.inOut`; goyang stepped ≥ 0,04s dari tabel offset | butir kertas statis; tanpa grain film | ya | tidak | — | Kids Edition, QS. An-Naml 27:17–19; ±96s, 9 scene; VO Galang; durasi scene digeser agar VO muat (kuota Cartesia habis saat revisi). Baris ini ditulis ulang 10 Nov — aslinya tertempel di akhir file dengan urutan kolom lain. Per 10 Nov `renders/` hanya berisi `raw120.mp4`. `qa-variety`: median occupancy 0,16 (FAIL — layar dominan kosong). | F2 (Kisah bertokoh, 1 suara) | K1 (tipis) | Galang |
| 13 | 10 Nov 2026 | `cek-kelola-proses-linux` | **V19** (ASCII Art — brief) | **V9** (Bold minimalism, S6–S8) | P5 (ink/paper/acid/red) | **T2** (Archivo var 800/wdth 125 + Newsreader italic + IBM Plex Mono) | ASCII 12 Hz deterministik; label `steps`/`set`; kamera `sine`/`power2`, pan+push per scene; **tanpa `expo.inOut`** | grid ASCII 45×14 + dot-grid 0,06; latar solid ink/acid/paper; **nol grain** | ya | tidak | — | Final 1080×1920, 60fps (blend 120→60), 75.000s; 8 scene; **0 frame hitam/4500**; loudness −18,3 LUFS, true peak −2,03 dBFS; 17 hold terdeteksi (bucket `diagnose` ×0,5 — semuanya hold stepped/ketik, bukan freeze). V19 tidak ada di 3 baris terakhir (V2/V10/V5). Override V9: kamera push/pull + blend sesuai brief; grain dimatikan di semua scene. VO Galang 1.15 (naskah ejaan huruf: pe-es, pe-i-de, term, min sembilan). Render gagal 4× karena encoder streaming putus di frame 244–556 → solusi: render ulang tanpa `--video-bitrate` (pakai `--crf 20`) + foreground/`setsid`; `HF_SEGMENTED_CAPTURE` dan `--low-memory-mode` tidak membantu. Fix pra-render: `letterSpacing` non-transform di S6 → scale/x; ladder S6 awalnya dibuat runtime (clip 0) → markup statis + `clip-path`; `#s7-wipe` awal tertinggal menutup layar (x:0) → `x:1080`; S5 label "menunggu I/O" menimpa "sudah mati" → teks ditukar; S5 low-contrast acid+putih saat overlap S6 → hold-lift + dim 0.35 + drift grid/kamera. | — | K11 · K8 · K3 (contact sheet 10 Nov) | Galang 1.15 |
| 14 | 10 Nov 2026 | `install-aplikasi-linux-apt-dnf` | **V23** (Flat vector + maskot) | V22 (Whiteboard / papan kapur) | P14 (Buku cerita) | T12 (Fredoka + Nunito) | akting rig maskot: land/hop squash 0,86→1,05→1, back.out(1.3–2.2) pop, power2.inOut pindah, sine.inOut kamera; kedip 0,07 s dari tabel; kaki jalan 8 Hz (pose); tanpa steps() | nol grain; bidang datar P14 + 1 bayangan 12% lebih gelap per bentuk; kardus mini melayang (A2) | ya | tidak | — | Run pertama MODE TOPIK (/video-reels <topik>) end-to-end. Final 1080x1920 60fps 102,0 s, 8 scene, 0 frame hitam/6120, -14,9 LUFS, peak -3,5 dBFS, qa-video PASS, qa-variety median occupancy 0,65 (video lama 0,05-0,45) WARN look 0,87 vs struktur-folder (latar krem P14~P4 - pertimbangkan palet non-krem berikutnya). Resep V23 (rig SVG 26 elemen) jalan di render pertama. Render 20m47s; dirender 2x karena frame t=0 (cover) memuat ikon .exe menimpa judul. check: 2 error overlap diperbaiki (? vs kotak cari S1, papan ganda S5). Durasi 102 s > target lunak 60-90 (Galang 1,05 = 1,95 kata/detik). Bug tool ditemukan & diperbaiki di run ini: naskah-check menilai teks layar bukan ucapan; qa-variety layout-kembar false positive di scene padat; titik nyasar path draw-on. | F1 (Analogi bahasa bayi) | K2 · K1 · K7 · K15 · K5 · K4 · K3 · K1 | narator=Galang 1.05 (25 baris, ucapan 88,8 s, gain +10,5 dB) |
| 15 | 11 Nov 2026 | `cek-dan-kelola-proses-di-linux` | **V22** (Whiteboard / papan kapur) | V5 (Hand-drawn / stop-motion) | P12 (Papan kapur) | T8 (Caveat + Nunito) | garis kapur menggambar diri (dashoffset power1.inOut) + kapur mengikuti ujung garis (getPointAtLength 50/s), huruf Caveat ditulis per huruf, arsiran isian draw-on, panel arsir steps(7); kamera drift 1,03, pan papan 2600 px (S4), zoom 2,1x (S3), iris S6, penghapus zigzag | papan P12 + vinyet; halo debu tiap garis (2,6x, 0,09); 5 bekas hapusan radial statis 0,035-0,055; nol feTurbulence | ya | tidak | — | Mode topik #2. Final 1080x1920 60fps 97,5 s, 8 scene, 0 frame hitam/5850, -15,1 LUFS, peak -3,3 dBFS, qa-video PASS, qa-variety MP4 median occupancy 0,33 WARN (S6 0,18; S7~S8 sim isi 0,74), look maks 0,76 vs apa-itu-sudo (lolos; palet gelap beda dari #14). Resep V22 chalkboard (kapur ikut ujung garis, Caveat per huruf dari metrik font, arsiran draw-on) jalan di render pertama. Palet picker P11 -> P12 (varian card) karena #14 WARN look latar terang. Durasi 97,5 s > target 60-90 (4 alat + konsep; s5b dibuang). Bug dari snapshot: id 'pan' bentrok dengan pembungkus kamera (S2 hilang 5,7 s), box-sizing border-box global menyusutkan polaroid, penghapus diam di pojok, angka 1/2 muncul dini; qa-variety pra-render S7 FAIL 0,09 -> panel arsir 0,17. Render 2x (33m44s + 40m30s): bar pilihan htop solid karena fadeIn -> opacity 1, teks tak terbaca (check kontras tidak menangkap). SFX kapur & rana disintesis ffmpeg (katalog kosong). Bug tool: qa-variety tidak menemukan video lain bila dijalankan dari folder video -> diperbaiki (root repo). | F4 (Tutorial langkah) | K1 · K2 · K8 · K5 · K9 · K7 · K4 · K3 | narator=Galang 1.05 |
| 16 | 12 Nov 2026 | `pipe-dan-redirect-linux` | **V6** (Tactile / sensory) | — (V23 dilepas; picker pilih V7 → turun ke V6, card V7) | P10 (Kebun ceria — latar dingin #B7CCE8) | T5 (Unbounded + Newsreader italic) | squash & stretch + overshoot; back.out(2.2) popul; power2.inOut untuk transisi benda; kamera C1/C2/C3 (push-in, pull-back, zoom ke tumpukan); guncang tabel offset saat isi stoples hilang | highlight statis kiri-atas + core shadow kanan-bawah (2 gradient radial), tanpa grain; dot-grid tipis; latar denim #B7CCE8 (varian dingin P10) | ya | tidak | — | Topik mode end-to-end (8 scene, 85,5 s). Render pertama FAIL gate look qa-variety (cos 0,905 vs apt-dnf, 80% piksel krem identik 3 video terbaru) -> latar diganti #B7CCE8 (varian dingin P10) + teks coral #8E3320; render ulang 34 m. Check: 0 error / 0 warning, kontras 60/60 AA. qa-video PASS: 0 frame hitam, 0 blok beku >=0,5 s (hold 0,35 s di 24,1 s), -14,5 LUFS, peak -3,1 dBTP. qa-variety PASS: occupancy median 0,32, look 0,555. Fix visual yang ketahuan di snapshot: judul S1/S2/S4 dipindah keluar kamera (tidak ter-crop), zoom S3 fade-out judul sebelum close-up, cap S8 naik ke y1394 (aman dari UI Reels), stamp HILANG S7 tidak keluar frame, papan poster S4 ikut kamera. Render 120fps 34 m -> blend 60fps. | F1 (Analogi bahasa bayi) | K2 · K1 · K7 · K3 · K5 · K8 · K4 · K9 | narrator=Galang 1.0 |
| 17 | 13 Nov 2026 | `dasar-jaringan-di-linux` | **V10** (UI / product motion) | V2 (Cutout craft) | P1 (Terminal-editorial) | T4 (Familjen Grotesk + Instrument Serif italic) | aksi dulu (kursor mengetik, klik, state berubah) + pop back.out(1.7); kamera C1/C2/C3/C5/C7/C8 dipicu aksi; sapuan ambient (CRT scan) linear 2 arah; guncang C7 memakai tabel offset tetap [9,-7,6,-4,3,0] | grid 4px halus + cincin fokus oranye 2px + permukaan navy #10203C di atas halaman blueprint #1E4470; tanpa grain, tanpa blur, tanpa backdrop-filter | ya | tidak | — | Mode topik end-to-end (8 scene, 87,5 s). V10 UI/product motion (aksen V2 cutout di S6 saja), P1 Terminal-editorial varian blueprint-biru, T4 Familjen+Instrument Serif+Martian Mono. Iterasi palette 3x karena gate look qa-variety: krem->tinta (look 0,905 vs apt-dnf) -> navy (#1E4470 + panel #10203C, look 0,553 vs #15, PASS). Stav: qa-video PASS (0 frame hitam, 0 blok beku >=0,5 s), occupancy median 0,42, kontras 34/34 AA, -14,4 LUFS, peak -3,1 dBTP. Bug yang ketahuan: .pan tanpa position:absolute bikin anak kartu mengidol ke root; zoom 2.2 di S4geser kartu (diganti masuk dari bawah + push-in); baris inet di S4 tak pernah muncul (tween hilang); vignette biru mencawash panel sehingga occupancy jatuh 0,16 (vignette diubah hanya di tepi). S3/S5 terlalu tipis -> baris terminal kosong tampil dari awal. Konvensi: satu MP4 per folder renders (duplikat bikin qa-variety membandingkan dirinya sendiri). | F4 (Tutorial langkah) | K14 · K5 · K8 · K7 · K8 · K2 · K4 · K9 | narator=Galang 1.05 (23 baris, 80,1 s) |
## Koreksi 10 Nov 2026

- **Pelanggaran rotasi #13:** `cek-kelola-proses-linux` memakai V19 tepat setelah #11
  (`baca-cari-isi-file-linux`, V19). Catatannya menyebut "3 baris terakhir V2/V10/V5" — itu
  salah baca. Penyebab ini yang membuat rotasi kini dihitung script.
- **Kolom Format / Layout (K) / Suara** ditambahkan. Untuk baris lama, Layout (K) dibaca dari
  contact sheet MP4 (8 frame per video) pada 10 Nov — **K0 (slide: judul pojok + panel + label)
  dominan di 5 dari 8 video yang diperiksa**. Ini akar rasa monoton: kode V mengganti material,
  tata letak tidak pernah dipaksa berubah. Format dan Suara yang tidak tercatat ditulis "—".
- Baris 1–3 tetap "—": tipe V belum ada saat video itu dibuat. Baris 6 adalah override
  historis (V10 dipakai meski terkunci).

## Pool V lengkap (V1–V29)

Card eksekusi ada di `.claude/skills/video-reels/styles/`. V13–V21 sudah **diukur** — biaya
raster dan hasil verifikasi determinisme ada di `styles/FEASIBILITY.md`. V22–V29 ditambahkan
10 Nov 2026 dari riset taksonomi gaya animasi (`references/peta-gaya.md`); tekniknya memakai
primitif yang sudah terverifikasi (SVG draw-on, `steps()`, transform, canvas), **belum** ada
render nyata per tipe — video pertama tiap tipe baru wajib dicatat hasilnya di kolom Catatan.

| Kode | Nama | Catatan rotasi |
|---|---|---|
| V1 | Kinetic typography | kamera & ambient mati (di-override card) |
| V2 | Cutout craft | |
| V3 | Mixed media collage | |
| V4 | Analog / retro (termasuk Retro VHS) | varian = tipe sama |
| V5 | Hand-drawn / stop-motion | |
| V6 | Tactile / sensory | |
| V7 | Stylised 3D (termasuk Clay 3D) | Three.js ≤ 6 detik |
| V8 | Liquid glass (tiruan) | tanpa `backdrop-filter` |
| V9 | Bold minimalism | kamera & ambient mati (di-override card) |
| V10 | UI / product motion | |
| V11 | Grunge / street | |
| V12 | Surreal / absurd | |
| V13 | Particles | canvas ≤ 5.000 butir (deterministik, biaya ≈ baseline) |
| V14 | Liquid morph | morph `attr:{d}`; filter goo dilarang |
| V15 | Neon glow | halo pra-render; `text-shadow` beranimasi dilarang |
| V16 | Y2K chrome | gradient + pita highlight keras |
| V17 | Holographic | ≤ 1 elemen blend aktif |
| V18 | Isometric | flat shading 3 sisi |
| V19 | ASCII art | `<pre>` ≤ 64×100 |
| V20 | Comic book | halftone statis; tanpa IP berhak cipta |
| V21 | Split-flap | `tl.call()`; jeda ≥ 0,05s per langkah |
| V22 | Whiteboard / papan kapur | keluarga `garis` (sama dengan V5) |
| V23 | Flat vector + maskot | rig SVG; keluarga `karakter` |
| V24 | Buku cerita (storybook) | tekstur cat air pra-render |
| V25 | Siluet / kelir wayang | **bukan** untuk menggambarkan Nabi/sahabat (adab) |
| V26 | Pixel art 8-bit | `steps()` ≥ 0,034s; `image-rendering: pixelated` |
| V27 | Infografis / data story | angka wajib dari tabel fakta |
| V28 | Peta / perjalanan | peta digambar sendiri / data terbuka berlisensi |
| V29 | Low-poly / faset | poligon SVG, shading tetap |

Status terkunci **tidak ditulis di sini** (pasti basi) — jalankan `--status`.

## Yang wajib diisi setiap selesai render

Isi `videos/<slug>/ledger-row.json`, lalu `node tools/pick-direction.mjs --record videos/<slug>`.
Kolom yang tidak bisa diturunkan dari `direction.json`:

1. **V utama** persis kode dari `direction.json` / brief.
2. **Bahasa gerak** — sebut easing dan apakah ada `steps()`; ini yang paling sering "lupa".
3. **Tekstur** — sebut jenis dan nilai opasitas; jangan tulis "grain" saja.
4. **Blend** — `ya` bila lewat 120fps→blend, `tidak` bila render 60fps langsung (dan alasannya
   di Catatan).
5. **Presenter** — `ya`/`tidak`. `tidak` untuk mode faceless (`/video-reels`).
6. **Mode presenter** — komposisi penempatan + porsi durasi, mis. `P1 20% · P3 60% · P2 20%`.
   Tulis `—` bila tidak ada presenter.
7. **Layout (K) aktual** — kode K per scene sesuai yang benar-benar dirender (bukan rencana).

> **Presenter bukan Tipe Visual.** Lapisan presenter adalah sumbu ke-7 (`presenter-layer.md`), bukan
> kode V. Presenter **tidak** mengisi slot rotasi V — kolom V tetap diisi tipe visual dunia di
> belakang/samping orang. Jangan membuat kode V baru untuk presenter: pool resmi V1–V29 dipakai untuk
> tipe visual nyata.

Kalau kolom 2–4 kosong, video berikutnya akan mengulang look yang sama tanpa ketahuan.
