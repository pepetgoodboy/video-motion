# STYLE LEDGER — rotasi Tipe Visual

Dibaca oleh `video-reels` **sebelum** membaca brief. Tujuannya satu: menjawab "tipe V apa yang
belum dipakai" tanpa mengandalkan ingatan.

Aturan (dari MASTER-PROMPT 12.1): **tipe V utama tidak boleh sama dengan 3 baris terakhir.**

## Catatan

| # | Tanggal | Slug | V utama | V aksen | Palet | Tipografi | Bahasa gerak | Tekstur | Blend 120→60 | Presenter | Mode presenter | Catatan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 25 Okt 2026 | (Cloudflare Tunnel vs Nginx) | — | — | P1 | T1 | — | — | ya | tidak | — | V belum tercatat saat dibuat |
| 2 | 25 Okt 2026 | (PHP2Shell) | — | — | P2 | T2 | — | — | ya | tidak | — | V belum tercatat saat dibuat |
| 3 | 25 Okt 2026 | (Tutorial motion di HP) | — | — | P4 | T3 | — | — | ya | tidak | — | V belum tercatat saat dibuat |
| 4 | 29–30 Okt 2026 | `cara-coba-linux-tanpa-hapus-windows` | **V10** (dibaca ulang dari MP4, bukan brief) | V2 (denah dapur) | P8 | T4 (Familjen + Martian) | mulus; `power2/back/sine`, tanpa `steps()` | grain statis 0.028 di 9/9 scene | ya | tidak | — | Brief lama tidak menulis kode V. V10 disimpulkan dari isi: terminal/mock UI + denah = peta. **Konfirmasi ke user sebelum dipakai sebagai kunci rotasi penuh.** |
| 5 | 1 Nov 2026 | `kenapa-docker-image-bisa-membengkak` | **V2** (Cutout craft — brief) | **V6** (Tactile, tekstil tenun/sulam) | **P9 (baru)** | **T6 (baru: Alfa Slab One + Nunito)** | stepped; interval tween ≥ 0.034s; easing halus hanya kamera | serat tenun statis + noise halus, **nol grain film** | ya | tidak | — | Dicatat ulang 5 Nov 2026 — sebelumnya terlewat. Sumber: `videos/kenapa-docker-image-bisa-membengkak/STYLE.md` + brief §11. |
| 6 | 1 Nov 2026 | `8-command-dasar-terminal-linux` | **V10** (UI/product motion) | — | P1 | — | aksi-dulu (state berubah karena klik/ketik nyata) | tidak tercatat di STYLE.md | ya | tidak | — | **Override rotasi resmi**: aturan melarang V10 (baris 4), user memutuskan tetap. Alasan di `videos/8-command-dasar-terminal-linux/STYLE.md`. |
| 7 | 3 Nov 2026 | `struktur-folder-linux` | **V2** (Cutout craft — brief §3/11) | — | P4 | T3 (Schibsted + DM Mono) | stepped; **semua 236 tween dinormalisasi ke 12 fps (hold 83 ms)**; kamera sine (S1/S4) & steps (S2/S3/S5/S6) | paper-grain PNG 1400×2400 repeat, geser 1–2px/0.5s (A1) di 6/6 scene | **TIDAK** — native 60fps beginframe | tidak | — | **QA 5 Nov: FAIL → overhaul.** Ghosting blend 120→60 (188 frame >2 level, max 28.9 @51.63s) → blend dibuang, render native 60fps. 5 paper-wipe transisi berlabel (X1/X2/X5/X9). S2 parallax 3 kedalaman nyata (−120/−430/−600) + crate/pipa/hangtag. S3 wire+node+4 config paper. S5 84→190 kertas, pull-back 1.22→1.52. S6 mini-denah di kartu penutup. VO dinaskah ulang (dead air 13.3s→~2s) + loudnorm −16 LUFS; BGM −18 LUFS. SFX 14 sampel. Safe area & font 30→32px diperbaiki. |
| 8 | 5 Nov 2026 | `bikin-salin-pindah-hapus-file-di-linux` | **V3** (Mixed media collage — pilihan user) | **V1** (kinetic typography) | P4 | T2 (Archivo var 62–125 + Newsreader italic + IBM Plex Mono) | campuran: potongan ditempel `back.out(1.4–1.8)`, label/ketikan `steps(6–9)` & `set()` 0.036–0.052s, kamera `sine.inOut`/`power3` | **4 tekstur**: fotokopi (multiply 0.40–0.55), halftone riso (0.13–0.22), serat kertas (0.44–0.50), tinta padat; semua statis | ya | tidak | — | Brief minta V2 → **V2 terkunci** (baris 5 & 7), user pilih V3. Fix pra-render: perintah `cp`/`mv`/`rm` terpotong di terminal → wrap + font 34–40px (brief §2 wajib utuh). Naskah dipadatkan + speed 1.08 (VO 56.8s). BGM 54s, outro 6s tanpa loop. 18 motion-collapse = hold `set()` ketikan (bukan stutter). |

## V yang terkunci untuk video berikutnya

Tiga baris terakhir yang terisi = baris 6, 7, 8 → terkunci: **V10**, **V2**, **V3**.
Artinya praktis: **semua V kecuali V10, V2, dan V3 masih terbuka** — dan ketiganya dilarang.

> Baris 1–3 bertanda "—" karena tipe V belum ada saat video itu dibuat. Aturan rotasi hanya
> menghitung baris yang terisi (sesuai catatan Registry di MASTER-PROMPT). Baris 1–3 tidak
> lagi menghitung sekarang karena sudah tergeser keluar dari jendela 3-terakhir.
>
> **Baris 6 adalah override.** V10 dipakai walau aturan melarangnya; user memutuskan dengan
> alasan tertulis. Konsekuensinya V10 tetap dihitung sebagai "dipakai" di baris ini.

## Pool V lengkap (V1–V21)

Card eksekusi ada di `.claude/skills/video-reels/styles/`. V13–V21 sudah **diukur** — biaya
raster dan hasil verifikasi determinisme ada di `styles/FEASIBILITY.md`.

| Kode | Nama | Catatan rotasi |
|---|---|---|
| V1 | Kinetic typography | kamera & ambient mati (di-override card) |
| V2 | Cutout craft | **terkunci** (baris 5) |
| V3 | Mixed media collage | |
| V4 | Analog / retro (termasuk Retro VHS) | varian = tipe sama |
| V5 | Hand-drawn / stop-motion | |
| V6 | Tactile / sensory | |
| V7 | Stylised 3D (termasuk Clay 3D) | Three.js ≤ 6 detik |
| V8 | Liquid glass (tiruan) | tanpa `backdrop-filter` |
| V9 | Bold minimalism | kamera & ambient mati (di-override card) |
| V10 | UI / product motion | **terkunci** (baris 4) |
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

## Yang wajib diisi setiap selesai render

1. **V utama** persis kode dari brief.
2. **Bahasa gerak** — sebut easing dan apakah ada `steps()`; ini yang paling sering "lupa".
3. **Tekstur** — sebut jenis dan nilai opasitas; jangan tulis "grain" saja.
4. **Blend** — `ya` bila lewat 120fps→blend, `tidak` bila render 60fps langsung (dan alasannya
   di Catatan).
5. **Presenter** — `ya`/`tidak`. `tidak` untuk mode faceless (`/video-reels`).
6. **Mode presenter** — komposisi penempatan + porsi durasi, mis. `P1 20% · P3 60% · P2 20%`.
   Tulis `—` bila tidak ada presenter.

> **Presenter bukan Tipe Visual.** Lapisan presenter adalah sumbu ke-7 (`presenter-layer.md`), bukan
> kode V. Presenter **tidak** mengisi slot rotasi V — kolom V tetap diisi tipe visual dunia di
> belakang/samping orang. Jangan membuat kode V baru untuk presenter: pool resmi V1–V21 sudah
> terpakai semua untuk tipe visual nyata.

Kalau kolom 2–4 kosong, video berikutnya akan mengulang look yang sama tanpa ketahuan.