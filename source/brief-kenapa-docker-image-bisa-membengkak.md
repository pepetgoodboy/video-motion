# BRIEF: Kenapa Docker Image Bisa Membengkak

| Item | Nilai |
|---|---|
| Format | Reels / TikTok / Shorts 9:16, **1080×1920**, **45 detik**, output 60 fps (render 120 fps lalu blend ke 60) |
| Engine | HyperFrames (HTML + CSS + GSAP timeline `paused`, deterministik) |
| Bahasa | Indonesia santai-teknis, voice over ±145 kata/menit (2.0-2.8 kata/detik) |
| Dibuat | 31 Okt 2026, berdasarkan MASTER-PROMPT v2.1 |
| Status fakta | 31 Okt 2026. Halaman Docker Docs "Building best practices" tercatat diperbarui 4 Sep 2026. Lihat bagian 8 |
| Lingkungan render | CPU tanpa GPU, kadang di HP (default bagian 11 master) |
| Tipe visual (V) | **V2 Cutout craft (utama, ≥ 70%) + V6 Tactile (aksen)**, dengan material **tekstil tenun/sulam** sebagai "tanda tangan" video |

**Asumsi yang saya ambil (ubah bila perlu):**
1. Durasi 45 detik (tidak disebut; default master 60 detik, dipadatkan agar satu ide tuntas).
2. Satu ide inti + dua solusi inti. `.dockerignore` dan base image kecil hanya disebut singkat di akhir.
3. Penonton: developer pemula-menengah yang sudah pernah menulis Dockerfile.
4. **Semua angka ukuran di layar adalah ILUSTRASI**, bukan hasil ukur. Angka ditandai `⟦UKUR⟧` dan diberi chip "ILUSTRASI". Bagian 8 berisi cara mengukur angka nyata bila mau menggantinya.
5. Gaya mengacu pada Shorts "Danau Toba" (penampang berlapis bermaterial kain). Semua aset dibuat baru oleh agent; tidak ada yang disalin.
6. Tidak membahas Alpine/musl (rawan salah kaprah bila binary dikompilasi dengan glibc). Narasi hanya berkata "base image kecil".

---

## 0. Cara pakai file

1. Taruh file ini sebagai `BRIEF.md` di folder proyek HyperFrames.
2. Jalankan Claude Code dan tempel prompt di **bagian 9**.
3. (Disarankan) Ukur angka nyata dengan skrip di bagian 8, lalu ganti semua `⟦UKUR⟧` di brief. Bila tidak sempat, biarkan angka ilustrasi dengan chip "ILUSTRASI".
4. Alur: lint → snapshot → preview → render. Render hanya setelah checklist bagian 7 lulus.

---

## 1. Konsep

### Pesan inti
**Menghapus file di lapisan berikutnya tidak mengecilkan image Docker, karena lapisan lama tetap tersimpan. Bersihkan di RUN yang sama, atau lebih kuat: pakai multi-stage build.**

### Concept Lab (3 kandidat)
Skor 1-5: Literal / Akurat / Gerak / Kebaruan / Feasibility.

| Kandidat | Metafora literal | Dunia visual | Protagonis | Momen wow | Open loop | Skor |
|---|---|---|---|---|---|---|
| **A (dipilih)** | Image = bukit dari kain tenun berlapis; tiap RUN/COPY = satu lapisan kain; "hapus" = tirai kain yang menutupi karung | Penampang bukit tenun (cutaway) | Karung `build-essential` | Tirai tersingkap, karung masih di lapisan bawah | "Kok bisa tetap gendut?" | **5 / 4 / 5 / 3 / 4 = 21** |
| B (ditolak) | Image = tumpukan kardus pindahan; hapus = stiker "dibuang" di kardus yang tetap diangkut | Gudang dan truk | Kardus | Truk tetap berat | "Kok truknya tetap berat?" | 5 / 4 / 4 / 2 / 4 = 19 (klise, kebaruan rendah) |
| C (ditolak) | Image = buku besar akuntansi append-only; hapus = jurnal koreksi | Kantor pembukuan | Satu baris jurnal | Jurnal koreksi menumpuk | "Kok saldonya tidak turun?" | 4 / 5 / 3 / 4 / 4 = 20 (kurang kaya gerak, tidak cocok dengan gaya tekstil referensi) |

### Hook Lab (5 opsi)
| # | Jenis | Teks | Catatan |
|---|---|---|---|
| 1 | **Kontradiksi (dipilih)** | "SUDAH DIHAPUS. TETAP 480 MB." (5 kata) | Konkret, langsung membuka loop "kok bisa?" |
| 2 | Angka mengejutkan | "480 MB, sebelum dan sesudah dihapus" | Angka saja kurang memancing rasa ingin tahu |
| 3 | Pertanyaan yang salah | "Jangan cari file yang mau dihapus" | Terlalu abstrak di detik pertama |
| 4 | Cold open hasil akhir | Tunjukkan 95 MB vs 480 MB dulu | Membocorkan payoff |
| 5 | Taruhan | "Image gendut = deploy lambat" | Klaim umum, kurang visual |

### Dunia visual dan protagonis
- **Dunia:** *Bukit Tenun*, penampang bukit yang terbuat dari lapisan kain tenun/sulam, dilihat dari samping. Jahitan putus-putus (stitch) di tepi tiap lapisan, tekstur benang horizontal.
- **Protagonis:** *Karung* goni berlabel `build-essential`. Nasibnya: tergeletak (S1) → disulam masuk ke lapisan (S2) → ditutup tirai (S3) → tersingkap, ternyata masih ada (S3 wow) → ditarik keluar dari lapisan lewat satu RUN (S4) → ditinggal di bukit `build` (S5) → samar di latar (S6).

### Tabel metafora
| Dunia visual | Arti teknis | Catatan akurasi |
|---|---|---|
| Bukit tenun penampang | Image Docker | Konseptual |
| Satu lapisan kain | Satu layer (dibuat oleh RUN/COPY) | Hanya RUN, COPY, ADD yang menambah layer filesystem; LABEL dan sejenisnya tidak |
| Kain tidak bisa dijahit ulang, diberi simpul mati | Layer immutable | Docker Docs |
| Tirai kain di atas karung | Penanda hapus (whiteout) di layer yang lebih baru | Konseptual; file asli tetap di layer lama |
| Karung masih ada di lapisan bawah | Data layer lama tetap tersimpan dan ikut ter-pull | OneUptime 2026 |
| Satu strip dijahit utuh | Pasang dan hapus dalam satu RUN | Layer hanya mencatat hasil akhir RUN itu |
| Dua bukit dihubungkan benang | Multi-stage build (`COPY --from`) | Docker Docs |
| Pagar jahit | `.dockerignore` | Docker Docs |

### Open loop dan payoff
- **Dibuka** di 3.6 s: "Kok bisa?" (+ janji tersirat: ada cara membuatnya benar-benar kecil).
- **Mini-loop** ditutup di 19.0 s (wow): "kok bisa" = lapisan lama tetap ada.
- **Payoff utama** di **35.5 s (78.9%)**: karung tertinggal, image akhir kecil, angka turun.

### Tension map
| Scene | Waktu | Fungsi | Ketegangan | Energi musik |
|---|---|---|---|---|
| S1 | 0.0-5.0 | Hook | 4 | tertahan, bass rendah |
| S2 | 5.0-13.0 | Penjelasan lapisan | 2 | tertahan |
| S3 | 13.0-21.0 | Penutup tirai → **wow 19.0** | 3 → 5 | riser, hening 0.6 s, lalu terbuka |
| S4 | 21.0-28.0 | Solusi 1 (satu RUN) | 3 | terbuka (lebih ringan) |
| S5 | 28.0-38.0 | Solusi 2 (multi-stage) → **payoff 35.5** | 4 → 5 | terbuka, puncak |
| S6 | 38.0-45.0 | Kebiasaan tambahan + cek | 2 | resolve hangat |

### Motif visual (maks 3)
1. Jahitan putus-putus (stitch) di semua tepi.
2. Tekstur benang horizontal (tenun).
3. Goni/karung.

### Tone
Hangat, tenang tapi tajam. Penjelasan jernih; humor sangat ringan (karung yang "ngeyel" tidak mau pergi).

---

## 2. Aturan anti-slop

**Dilarang**
- Logo/ikon paus Docker, gradient neon biru-ungu, glassmorphism, ikon gembok generik.
- Diagram kotak-dan-panah generik; semua penjelasan memakai dunia Bukit Tenun.
- Transisi acak yang tidak membawa makna.
- Font bawaan sistem, teks di atas warna terakota/hijau (kontras tidak cukup).
- Angka ukuran tanpa chip "ILUSTRASI", atau klaim "selalu"/"pasti".
- Menyalin aset visual dari video referensi.
- Kata "optimasi" tanpa wujud visual yang jelas.

**Wajib**
- Setiap gerak punya makna (bagian 5.3 master): karung = beban, tirai = penyembunyian, benang = perpindahan, jahitan menyala = terkunci.
- Satu "tanda tangan" material (kain tenun + jahitan) konsisten di semua scene.
- Diagram bertanda "konseptual" bila menyederhanakan (S3, S4, S5).
- Perintah dan sintaks yang tampil harus nyata (bagian 8).

---

## 3. Design tokens

### 3.1 Canvas
```
Canvas      : 1080×1920, 60 fps output (render 120 fps lalu blend)
Safe zone   : x 72→952, y 240→1460 (semua teks di dalamnya)
Pita caption: y 1360→1440 (tinggi 80)
HUD (CNT, HDL, TAG, CAP, kartu kode) : DI LUAR #cam, tetap
WORLD (bukit, karung, kain, chip lapisan): DI DALAM #cam
Transisi: aturan safe zone boleh dilonggarkan maks 0.6 s (zoom-through/iris)
```

### 3.2 Warna (Palet baru **P9 "Tenun senja"**, makna tetap)
```css
:root{
  --indigo:   #1E2A52; /* latar malam, dasar teks terang */
  --krem:     #F2E6C9; /* teks, kain terang, chip */
  --mustard:  #E3A72F; /* sorotan, angka, kata kunci, aksi */
  --terakota: #C8553D; /* beban / lapisan berat (HANYA bentuk, bukan teks) */
  --hijau:    #3F7D58; /* ramping / bersih / berhasil (HANYA bentuk, bukan teks) */
}
```
Kontras terhitung: krem di atas indigo 11.2:1; mustard di atas indigo 6.5:1; indigo di atas krem 11.2:1. Terakota dan hijau di atas indigo hanya 3.2:1 dan 2.8:1, jadi **teks tidak pernah langsung di atas terakota/hijau**; pakai chip krem (teks indigo).

### 3.3 Tipografi (opsi baru **T6**, self-host, semua dari Google Fonts)
| Peran | Font | Catatan |
|---|---|---|
| Display | **Alfa Slab One** | Satu bobot, tanpa axis. Beda dari display video sebelumnya (Bricolage, Archivo, Schibsted) |
| Caption / badan | **Nunito** (variable, axis `wght` 200-1000) | Untuk M8 (variable-font morph) pada kata kunci |
| Kode / label | **JetBrains Mono** 400, 700 | Label chip, kartu kode |

### 3.4 Skala tipografi
| Peran | Ukuran |
|---|---|
| Angka CNT (counter) | **220 px** (6 karakter ≈ 818 px lebar) |
| Headline | 150 px (maks "DIHAPUS." ≈ 745 px) |
| Sub-headline | 100-104 px |
| Caption pill | 40 px |
| Label mono (min) | **32 px** |

Lebar teks dihitung: display ≈ jumlah karakter × 0.62 × ukuran; mono ≈ 0.6 × ukuran. Semua baris ≤ 880 px.

### 3.5 Resep material "tekstil" (tanda tangan visual; berlaku V2+V6)
- **Benang tenun:** tekstur statis (PNG/WebP tile dibuat agent, atau `repeating-linear-gradient` horizontal tipis, opasitas 5-8%) di semua bidang kain. **Tidak** memakai `feTurbulence` animatif.
- **Jahitan:** garis SVG `stroke-dasharray: 10 8`, `stroke-linecap: round`, lebar 3 px, warna krem (atau mustard untuk benang penanda). Satu elemen per tepi, bukan per-dash.
- **Bayangan:** `box-shadow` statis atau bayangan SVG pra-render (bukan `filter: drop-shadow` pada banyak elemen beranimasi).
- **Gerak "kain":** gerak sedikit patah dengan `steps()` ±12 fps hanya untuk gelombang tirai/kain; kamera dan angka tetap mulus. Hindari jeda < 0.05 s per langkah (blend 120→60 fps).
- **Bentuk:** tepi lapisan bergelombang amplitudo ≤ 10 px dengan kontrol titik tetap (seeded).

### 3.6 Teknik teks (kode M) yang dipakai
| Scene | Teknik | Dipakai untuk |
|---|---|---|
| S1 | M6 word slam; M4 stamp | Headline hook; stempel `apt-get purge` |
| S2 | M3 cut + type; M9 split-flap | Chip lapisan; counter dan tag ukuran |
| S3 | M7 scramble/decode; M10 slice | "DIHAPUS" → "DISEMBUNYIKAN"; chip/label |
| S4 | M2 bar-wipe; M3 cut + type; M1 mask reveal | Kartu kode; baris kode; angka counter |
| S5 | M11 outline→fill; M8 variable-font morph; M9 split-flap; M5 slide-snap | Judul MULTI-STAGE; kata kunci caption; counter; baris kode |
| S6 | M4 stamp; M12 per-karakter drop; M10 slice | `.dockerignore`; counter/caption; chip sampah dan baris terminal |

Total **12 teknik berbeda**; tidak ada teknik yang sama di dua scene berurutan. Caption pill (karaoke per kata) adalah **elemen persisten** dan tidak dihitung dalam aturan variasi.

### 3.7 Preset kamera (kode C)
| Kode | Dipakai | Parameter |
|---|---|---|
| C1 | S1, S3, S4, S5 (akhir), S6 | push-in lambat 1.00→1.06/1.08, origin sesuai scene |
| C2 | S2 (akhir), S5 (payoff), S6 | pull-back 1.12→1.0 |
| C3 | S2, S5 | pan vertikal (S2) / horizontal (S5) |
| C4 | S3, S5 | rack focus: **satu grup** di-blur 5 px, target tajam |
| C5 | S4 | tilt ringan `rotateX` 6°→0 |
| C6 | S2, S5 | parallax lapisan (latar 0.2×, tengah 1.0×, depan 1.3×) |
| C7 | S1, S3, S4 | guncang dari **tabel offset tetap** `[+8,-6,+5,-3,+2,0]`, langkah 0.03 s |
| C8 | S2→S3 | zoom-through ke lapisan L2 |

Zoom world dijaga ≤ 1.08 agar chip tidak keluar safe zone (chip lapisan berada di x ≥ 120).

### 3.8 Transisi (kode X)
| Dari → ke | Kode | Makna |
|---|---|---|
| S1 → S2 | **X2 match-cut** | Kain penutup mendatar jadi dasar lapisan: dari "tertutup" ke "mari lihat isinya" |
| S2 → S3 | **X8 zoom-through** | Masuk ke dalam lapisan L2 (tempat karung) |
| S3 → S4 | X1 panel wipe kain | Ganti mode: dari masalah ke solusi |
| S4 → S5 | **X2 match-cut** | Lapisan tunggal ramping memanjang jadi jembatan benang antara dua bukit |
| S5 → S6 | X4 iris | Fokus ke image akhir yang kecil |

4 jenis berbeda; 3 di antaranya match-cut/morph (X2 ×2, X8). Shader WebGL: **0**.

### 3.9 Ambient (kode A)
A1 grain statis bergeser (semua scene); A5 "napas" ±1% (S1, S2, S3, S5); A8 kilau/light sweep pada jahitan (S1, S2, S3, S5, S6). Partikel: 0. Tidak ada `Math.random()`.

### 3.10 Bahasa gerak dan easing (maks 3 per scene)
| Scene | Set easing |
|---|---|
| S1 | `back.out(1.7)`, `expo.out`, `sine.inOut` |
| S2 | `steps(n)`, `power4.out`, `sine.inOut` |
| S3 | `steps(n)`, `expo.out`, `sine.inOut` |
| S4 | `steps(n)`, `expo.out`, `sine.inOut` |
| S5 | `steps(n)`, `expo.out`, `sine.inOut` |
| S6 | `back.out(1.7)`, `expo.out`, `sine.inOut` |

### 3.11 Elemen persisten
- **CAP** caption pill: x 72, y 1360, 880×80, radius 40, isi indigo 88%, tepi jahitan krem 2 px. Teks Nunito 40 px krem; kata kunci mustard (wght 900). Memuat **ringkasan 2-4 kata per momen**, bukan salinan penuh narasi.
- **TAG** chip "ILUSTRASI": chip krem 173×40, mono 32 px indigo; rata kanan di bawah CNT (x 779, y = bawah CNT + 10).
- **CNT** counter ukuran: Alfa Slab One 220 px, mustard.

---

## 4. Event Map dan Peta scene

### 4.1 Peta scene
| # | Waktu (abs) | Durasi | Nama | Latar | Layout dominan | Kamera | Transisi masuk | Wow / interrupt | Jumlah kejadian |
|---|---|---|---|---|---|---|---|---|---|
| S1 | 0.0-5.0 | 5.0 | Hook: sudah dihapus | indigo + benang tenun | Headline + angka raksasa + bukit terpotong | C1, C7 | (cold open) | Impact stempel 1.6 | 10 |
| S2 | 5.0-13.0 | 8.0 | Image = tumpukan lapisan | indigo | Penampang bukit 4 lapisan | C3, C2, C6 | X2 dari S1 | Interrupt 5.0 dan 11.0 | 16 |
| S3 | 13.0-21.0 | 8.0 | Tirai dan karung yang masih ada | indigo | Macro lapisan L2 + tirai | C8, C4, C1, C7 | X8 dari S2 | **WOW 19.0** | 13 |
| S4 | 21.0-28.0 | 7.0 | Solusi 1: satu RUN | indigo | Kartu kode + bukit | C5, C1 | X1 dari S3 | Impact 24.4 | 13 |
| S5 | 28.0-38.0 | 10.0 | Solusi 2: multi-stage | indigo | Dua bukit + benang | C3, C6, C4, C2 | X2 dari S4 | **Payoff 35.5** | 15 |
| S6 | 38.0-45.0 | 7.0 | Kebiasaan tambahan dan cek | indigo | Bukit kecil + pagar + terminal | C2, C1 | X4 dari S5 | Impact kecil 40.6 | 11 |

Semua batas di kelipatan 0.5 s (musik 120 BPM). Jumlah: 5 + 8 + 8 + 7 + 10 + 7 = **45.0 s**.

### 4.2 Kurva energi musik
| Rentang | Keadaan |
|---|---|
| 0.0-18.4 | **Tertahan**: drone bass rendah, low-pass; riser 16.9-18.4 |
| 18.4-19.0 | **Hening 0.6 s** (jeda berisi: kamera dan ambient tetap jalan) |
| 19.0-38.0 | **Terbuka**: kick, bass, arp; puncak di 35.5 |
| 38.0-45.0 | **Resolve hangat**: pad dan nada tunggal |

---

## 5. Detail scene

> Waktu di Event Map adalah perkiraan terhadap pembacaan 2.2-2.4 kata/detik. Agent **wajib menyinkronkan ke timestamp transkrip VO** per kata. Dua titik tetap terikat ke kata: wow S3 terikat ke kata **"tetap"**; payoff S5 terikat ke frasa **"image akhir"**. Keduanya harus tetap berada di 40-60% (wow) dan 70-85% (payoff) durasi.
> Konvensi hitung kata di layar: **satu baris kode/terminal dihitung 1 unit**; teks bahasa manusia dan angka dihitung per kata/angka.

### S1 · HOOK: SUDAH DIHAPUS (0.0-5.0, 5.0 s) · latar indigo

**Tujuan:** Membuka dengan kontradiksi: file sudah dihapus, ukuran tetap. Membuka open loop.
**VO (11 kata):** "Kamu sudah hapus file besarnya. Tapi image tetap gendut. Kok bisa?"
**Dunia visual / protagonis:** Puncak Bukit Tenun. Karung `build-essential` tergeletak, ditimpa stempel, ditutup kain; angka tidak turun.
**Lapisan:** latar indigo + benang tenun (parallax 0.2×); tengah = potongan bukit (1.0×); depan = karung, stempel, kain (1.3×); overlay = grain statis, vignette. HUD (headline, counter, TAG, CAP) di luar #cam.
**Kamera:** C1 push-in 1.00→1.08 selama 5.0 s, origin (540,1040), `sine.inOut`. C7 guncang di 1.6 dan 2.8.

| ID | Elemen | x | y | Ukuran | Font · warna |
|---|---|---|---|---|---|
| H1a | "SUDAH" | 72 | 250 | tinggi 150, lebar ≈ 465 | Alfa Slab One · krem |
| H1b | "DIHAPUS." | 72 | 400 | tinggi 150, lebar ≈ 745 | Alfa Slab One · krem |
| TET | "TETAP" | 72 | 560 | tinggi 96, lebar ≈ 300 | Alfa Slab One · mustard (muncul 2.8) |
| CNT | "480 MB" `⟦UKUR⟧` | 72 | 650 | tinggi 220, lebar ≈ 818 | Alfa Slab One · krem, jadi mustard di 2.8 |
| TAG | "ILUSTRASI" | 779 | 880 | chip 173×40 | JetBrains Mono 32 · indigo di chip krem |
| KAR | Karung `build-essential` (SVG) | 600 | 920 | 300×200 | goni krem-terakota; label mono 32 |
| STP | Stempel `apt-get purge` | 585 | 960 | 290×60, rotasi −6° | mono 32 · indigo di chip krem |
| CLT | Kain penutup | 570 | 920 | 360×210 | krem, tepi jahitan |
| HIL | Puncak bukit + strata terpotong | 72 | 1120 | 880×220 (terlihat) | terakota, mustard, krem + benang tenun |
| CAP | Caption "Kok bisa?" (2 kata) | 72 | 1360 | 880×80 | Nunito 40 · krem |

Rasio skala: 220 : 32 = **6.9 : 1**. Teks di layar: SUDAH, DIHAPUS, TETAP, 480, MB, ILUSTRASI, apt-get, purge, Kok, bisa = **10**.

**Gerak:** *Primer:* stempel menimpa karung, kain menutup, angka tetap. *Sekunder:* karung bergoyang, angka bergetar, kick kamera. *Ambient:* A1, A5 (bukit), A8 (kilau benang).

**Event Map**
| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---|---|---|---|---|---|---|
| 0.0 | Depan (HUD) | H1a/H1b tampil di state akhir; slam mikro scale 1.06→1.0 (frame 0 sudah layak jadi cover) | M6 | `back.out(1.7)` | 0.3 | thud ringan |
| 0.0 | Kamera | Push-in mulai | C1 | `sine.inOut` | 5.0 | drone bass (musik: tertahan) |
| 0.4 | Tengah | Kilau menyapu benang di puncak bukit kiri→kanan | A8 | `sine.inOut` | 0.8 | shimmer halus |
| 1.0 | Depan | KAR bergoyang kecil (squash 0.96→1) seperti memikul beban | sekunder | `back.out(1.7)` | 0.6 | gesekan goni |
| 1.6 | Depan | **STP jatuh menimpa KAR** (scale 1.12→1, rotasi −6°) | M4 | `expo.out` | 0.25 | **impact** + hit musik rendah |
| 1.6 | Kamera | Kick +3% lalu kembali; guncang tabel offset | C7 | `expo.out` | 0.2 | |
| 2.2 | Depan | CLT turun dari atas menutup KAR (gelombang kain ±12 fps) | gerak kain | `sine.inOut` | 0.6 | whoosh kain |
| 2.8 | HUD | TET masuk; CNT berubah mustard dan bergetar 2 kali (tabel offset) | M6 + C7 | `back.out(1.7)` | 0.4 | thud kecil |
| 3.6 | HUD | CAP "Kok bisa?" masuk (karaoke per kata) | persisten | `expo.out` | 0.4 | |
| 4.2 | Tengah | CLT menggembung lalu mendatar jadi strip krem di puncak bukit (x 72-952, y 1120-1140) | morph prep | `sine.inOut` | 0.7 | swish pelan |
| 4.7 | Kamera | Tahan; ambient bernapas | A5 | `sine.inOut` | 0.3 | riser pendek ke S2 |

Celah terbesar: 0.8 s.
**Catalog block:** cek registry untuk: *grain/film overlay*, *stamp/shake*. Retint ke P9.
**Impact (1.6):** visual (stempel 1.12→1) + kamera (kick + guncang) + SFX (thud) + musik (hit rendah) dalam ±1 frame @60 fps.
**Match cut ke S2 (X2):** strip krem di puncak bukit memanjang menjadi lapisan dasar L1 di S2.
**Opsional (korbankan dulu):** A8 kilau benang.

---

### S2 · IMAGE = TUMPUKAN LAPISAN (5.0-13.0, 8.0 s) · latar indigo

**Tujuan:** Menjelaskan image sebagai tumpukan lapisan yang masing-masing tidak bisa diubah.
**VO (19 kata):** "Soalnya image itu tumpukan lapisan. Setiap RUN dan COPY menambah satu lapisan baru, yang isinya tidak bisa diubah lagi."
**Dunia visual / protagonis:** Bukit Tenun ditenun naik, lapisan demi lapisan. Karung terbang dan disulam ke lapisan L2. Di akhir, tiap lapisan diberi simpul mati.
**Lapisan:** latar (0.2×) indigo + benang; tengah (1.0×) 4 lapisan; depan (1.3×) chip, tag, karung, simpul; overlay grain + vignette. HUD: CNT, TAG, CAP.
**Kamera:** C3 pan vertikal translateY +160→0 dan scale 1.08→1.0 (5.0-11.0, `sine.inOut`); C2 pull-back dikunci di 11.0; di 12.6 C8 persiapan zoom-through ke L2 (1.0→1.06).

| ID | Elemen | x | y | Ukuran | Font · warna |
|---|---|---|---|---|---|
| CNT | Counter 0→480 MB `⟦UKUR⟧` | 72 | 250 | 220, lebar ≈ 818 | Alfa Slab One · mustard (M9) |
| TAG | "ILUSTRASI" | 779 | 480 | chip 173×40 | mono 32 · indigo di chip krem |
| L1 | `FROM` dasar (80) | 72 | 1212 | 880×88 | kain krem |
| L2 | `RUN apt` (300) | 72 | 882 | 880×330 | kain terakota |
| L3 | `COPY` (60) | 72 | 816 | 880×66 | kain mustard |
| L4 | `RUN make` (40) | 72 | 772 | 880×44 | kain mustard, jahitan rapat |
| CH1-CH4 | Chip: `FROM` (120,1236), `RUN apt` (120,900), `COPY` (120,826), `RUN make` (120,774) | 120 | per baris | tinggi 40 | mono 32 · indigo di chip krem |
| TG1-TG4 | Tag ukuran: `80` (860,1236), `300` (860,900), `60` (860,828), `40` (860,776) | 860 | per baris | chip tinggi 40 | mono 32 · indigo di chip krem |
| KAR | Karung disulam di L2 | 380 | 950 | 280×200 | goni; label `build-essential` mono 32 |
| KNT | 4 ikon simpul mati (garis krem) | 76 | pusat tiap lapisan | 40×40 | krem |
| CAP | 3 momen: "Tumpukan lapisan" (6.0), "RUN dan COPY" (8.0), "tak bisa diubah" (11.4) | 72 | 1360 | 880×80 | Nunito 40 |

Rasio skala: 220 : 32 = **6.9 : 1**. Teks di layar: 6 chip + 4 tag + 2 counter + 1 TAG + 8 caption = **21**.

**Gerak:** *Primer:* lapisan ditenun naik, counter berputar. *Sekunder:* karung disulam, simpul berdenyut. *Ambient:* A1, A5, A8.

**Event Map**
| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---|---|---|---|---|---|---|
| 5.0 | Tengah | Strip krem dari S1 memanjang jadi L1, benang ditenun kiri→kanan | X2 → draw | `power4.out` | 0.8 | swish kain |
| 5.0 | Kamera | Pan mulai | C3 | `sine.inOut` | 6.0 | whoosh lembut |
| 5.4 | HUD | CNT berputar ke 80 | M9 | `steps(6)` | 0.5 | tick beruntun |
| 6.0 | HUD | CAP "Tumpukan lapisan" | persisten | `power4.out` | 0.6 | |
| 6.6 | Tengah | CH1 `FROM` dan TG1 `80` diketik | M3 | `steps(n)` | 0.4 | klik |
| 7.4 | Tengah | L2 ditenun naik (tinggi 0→330); CH2 `RUN apt` diketik | draw + M3 | `power4.out` | 0.9 | swish + tick |
| 7.8 | Depan | KAR terbang dari kanan-atas, disulam masuk L2 (dash menutup) | sekunder | `power4.out` | 0.7 | thud goni |
| 8.0 | HUD | CAP "RUN dan COPY" | persisten | `power4.out` | 0.6 | |
| 8.1 | HUD | CNT → 380; TG2 `300` | M9 | `steps(6)` | 0.5 | tick x6 |
| 8.6 | Tengah | L3 ditenun; CH3 `COPY`; TG3 `60` | draw + M3 | `power4.out` | 0.6 | swish |
| 9.4 | HUD | CNT → 440 | M9 | `steps(4)` | 0.4 | tick |
| 9.8 | Tengah | L4 ditenun; CH4 `RUN make`; TG4 `40` | draw + M3 | `power4.out` | 0.6 | swish |
| 10.4 | HUD | CNT → 480; TAG "ILUSTRASI" masuk | M9 | `steps(4)` | 0.4 | tick |
| 11.0 | Kamera | Pull-back menampakkan tumpukan penuh; jahitan menyala berurutan bawah→atas | C2 + A8 | `sine.inOut` | 1.0 | whoosh turun |
| 11.4 | HUD | CAP "tak bisa diubah" | persisten | `power4.out` | 0.6 | |
| 12.2 | Depan | 4 simpul mati dijahit berurutan (stagger 0.1) | stamp-like | `power4.out` | 0.4 | klik x4 |
| 12.6 | Kamera | Push-in 1.0→1.06 ke L2 (persiapan zoom-through) | C8 prep | `sine.inOut` | 0.4 | riser pendek |

Celah terbesar: 0.8 s.
**Catalog block:** cek registry untuk: *stagger/draw path*, *counter/odometer*. Retint ke P9.
**Impact:** tidak ada impact besar; momen penting adalah simpul mati (12.2) dengan hit musik ringan.
**Match cut ke S3 (X8):** kamera menembus permukaan L2 (zoom-through) menuju tampilan dekat karung.
**Opsional:** A8 (11.0), ikon simpul KNT.

---

### S3 · TIRAI DAN KARUNG YANG MASIH ADA (13.0-21.0, 8.0 s) · latar indigo

**Tujuan:** Menjawab "kok bisa": penghapusan hanya menaruh penanda; file asli tetap di lapisan lama. Momen wow.
**VO (21 kata):** "Waktu kamu hapus file di lapisan berikutnya, Docker cuma menaruh penanda 'hilang' di atasnya. File aslinya tetap ada di lapisan bawah."
**Dunia visual / protagonis:** Lapisan baru `RUN purge` (0 MB) ditenun di puncak; benang penanda menarik tirai menutupi karung di L2; di 19.0 tirai tersingkap, karung masih utuh.
**Lapisan:** latar (0.2×); tengah = L1-L4 (satu grup untuk blur C4); depan = L5, tirai, karung, label (1.3×); overlay = grain, flash krem. HUD: CNT, HDL, TAG, CAP.
**Kamera:** masuk dari zoom-through (1.5→1.08 dalam 0.6 s pertama; longgar safe zone 0.6 s), lalu C4 rack focus ke L2 (grup lain blur 5 px), C1 push-in 1.0→1.06; C7 di 19.0.

| ID | Elemen | x | y | Ukuran | Font · warna |
|---|---|---|---|---|---|
| CNT | "480 MB" tetap `⟦UKUR⟧` | 72 | 250 | 220 | Alfa Slab One · mustard |
| TAG | "ILUSTRASI" | 779 | 480 | chip 173×40 | mono 32 |
| HDL | "DIHAPUS" → "DISEMBUNYIKAN" | 72 | 500 | tinggi 104, lebar ≤ 840 | Alfa Slab One · krem (M7) |
| L1-L4 | Lapisan seperti S2 | 72 | 772-1300 | 880 lebar | kain |
| L5 | Pita tipis `RUN purge` (0 MB) | 72 | 732 | 880×40 | kain krem, jahitan |
| CH5 / TG5 | Chip `RUN purge` / tag `+0` | 120 / 860 | 733 | 200×40 / 60×40 | mono 32 · indigo di chip krem (M10) |
| THR | Benang penanda (path jahitan) | (540,772)→(510,940) | | 3 px | mustard |
| CUR | Tirai kain | 360 | 940 | 320×240 | krem 92%, tepi jahitan |
| KAR | Karung | 380 | 950 | 280×200 | goni |
| LBL | Chip "penanda hilang" | 680 | 1010 | 272×40 | mono 32 (M10) |
| LBK | Chip `build-essential` | 372 | 1160 | 296×40 | mono 32 (muncul 19.0) |
| CAP | "tetap ada" (19.8), "di lapisan bawah" (20.4) | 72 | 1360 | 880×80 | Nunito 40 |

Rasio skala: 220 : 32 = **6.9 : 1**. Teks di layar: CNT 2, HDL 1 (bergantian), chip 2 + tag 1, LBL 2, LBK 1, TAG 1, caption 6 = **16**.

**Gerak:** *Primer:* tirai menutup lalu tersingkap. *Sekunder:* benang penanda dijahit, tag `+0` bergetar, cincin jahitan. *Ambient:* A1, A5, A8.

**Event Map**
| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---|---|---|---|---|---|---|
| 13.0 | Kamera | Zoom-through selesai: macro L2 (1.5→1.08), rack focus ke L2 | C8 + C4 | `sine.inOut` | 1.0 | whoosh masuk |
| 13.4 | HUD | HDL "DIHAPUS" ter-decode dari karakter acak (seed tetap) | M7 | `steps(8)` | 0.6 | tick-decode |
| 14.2 | Tengah | L5 ditenun di puncak; CH5 `RUN purge`, TG5 `+0` | draw + M10 | `expo.out` | 0.6 | swish |
| 14.8 | Depan | THR dijahit dari L5 turun ke tirai (path draw) | draw | `sine.inOut` | 1.0 | jahitan tik-tik |
| 15.6 | Depan | CUR turun menutup KAR; LBL "penanda hilang" masuk | gerak kain + M10 | `sine.inOut` | 0.7 | whoosh kain |
| 16.4 | Depan | CNT tetap 480; TG5 `+0` bergetar | sekunder | `expo.out` | 0.3 | thud kecil |
| 17.0 | HUD | HDL decode "DIHAPUS" → "DISEMBUNYIKAN" | M7 | `steps(10)` | 0.8 | tick naik |
| 17.8 | Kamera | Push-in pelan; ambient jalan | C1 | `sine.inOut` | 0.6 | riser (sejak 16.9) |
| 18.4 | Semua | **Jeda berisi 0.6 s**: audio dropout; kamera + ambient tetap bergerak | A1/A5 | `sine.inOut` | 0.6 | (hening) |
| 19.0 | Semua | **WOW**: CUR tersingkap (terangkat dari bawah), flash krem 3 frame, KAR utuh scale 1.12→1, cincin jahitan mengembang, LBK muncul | impact 5.5 | `expo.out` | 0.35 | **impact besar** + drop musik |
| 19.0 | Kamera | Kick +3% + guncang tabel offset | C7 | `expo.out` | 0.3 | |
| 19.8 | HUD | CAP "tetap ada" | persisten | `expo.out` | 0.5 | |
| 20.4 | Tengah | Cincin jahitan berdenyut 2 kali; CAP "di lapisan bawah" | A8 | `sine.inOut` | 0.6 | denyut rendah |

Celah terbesar: 0.8 s (jeda berisi 0.6 s).
**Catalog block:** cek registry untuk: *flash/light-leak*, *shake*, *decode text*. Retint ke P9.
**Impact (19.0), 4 lapisan sinkron:** visual (tirai tersingkap + flash + karung 1.12→1) | kamera (kick + C7) | SFX (impact besar) | musik (drop ke keadaan "terbuka").
**Match cut ke S4 (X1):** panel kain krem menyapu kiri→kanan membawa kartu kode.
**Opsional:** C4 blur (ganti penurunan opasitas grup bila berat), cincin A8.

---

### S4 · SOLUSI 1: SATU RUN (21.0-28.0, 7.0 s) · latar indigo

**Tujuan:** Menunjukkan bahwa memasang, membangun, dan menghapus dalam satu RUN membuat lapisan hanya mencatat hasil akhir.
**VO (17 kata):** "Solusi pertama: pasang dan hapus di RUN yang sama, jadi file itu tidak pernah tersimpan di lapisan."
**Dunia visual / protagonis:** Kartu kode terjahit di atas bukit. Setelah baris terakhir diketik, lapisan L2 ditarik keluar seperti benang dan karung terlempar ke luar bukit (tidak pernah tersimpan). Tumpukan turun menutup celah.
**Lapisan:** latar (0.2×); tengah = bukit L1, L3, L4 (+ L2 sampai 24.4); depan = karung, benang tarik (1.3×); overlay grain. HUD: CNT, TAG, DK (kartu kode), CAP, centang.
**Kamera:** C5 tilt `rotateX` 6°→0 (21.0-22.0), lalu C1 push-in 1.00→1.05 sampai 28.0; kick 2% di 24.4.

| ID | Elemen | x | y | Ukuran | Font · warna |
|---|---|---|---|---|---|
| CNT | 480 → 180 MB `⟦UKUR⟧` | 72 | 250 | 220 | Alfa Slab One · mustard (M1) |
| TAG | "ILUSTRASI" | 779 | 480 | chip 173×40 | mono 32 |
| DK | Kartu kode krem, tepi jahitan | 72 | 520 | 880×200 | latar krem; teks mono 32 · indigo |
| DK1 | `RUN apt-get install -y build-essential \` | 96 | 548 | 1 baris (≈ 41 karakter, ≈ 790) | mono 32 · indigo (M3) |
| DK2 | `  && make \` | 96 | 596 | 1 baris | mono 32 · indigo (M3) |
| DK3 | `  && apt-get purge -y build-essential` | 96 | 644 | 1 baris (≈ 38 karakter) | mono 32 · indigo (M3) |
| L1-L4 | Bukit seperti S2 (tanpa L5) | 72 | 772-1300 | 880 lebar | kain |
| KAR | Karung di L2, lalu terlempar | 380 | 950 | 280×200 | goni |
| CHK | Centang jahitan hijau | 888 | 260 | 64×64 | hijau (bentuk) |
| CAP | "satu RUN" (21.6), "tidak pernah tersimpan" (25.6) | 72 | 1360 | 880×80 | Nunito 40 |

Rasio skala: 220 : 32 = **6.9 : 1**. Teks di layar: CNT 2, kode 3 unit, TAG 1, caption 5 = **11**.

**Gerak:** *Primer:* tiga baris diketik, L2 ditarik keluar, tumpukan turun. *Sekunder:* karung bergetar lalu terlempar, benang tarik. *Ambient:* A1, A5.

**Event Map**
| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---|---|---|---|---|---|---|
| 21.0 | Semua | Panel kain krem menyapu kiri→kanan; bukit L1-L4 muncul kembali | X1 | `expo.out` | 0.7 | whoosh kain |
| 21.0 | Kamera | Tilt 6°→0 | C5 | `sine.inOut` | 1.0 | |
| 21.4 | HUD | DK terbuka (bar-wipe krem) | M2 | `expo.out` | 0.5 | swish |
| 21.6 | HUD | CAP "satu RUN" | persisten | `expo.out` | 0.5 | |
| 22.0 | HUD | DK1 diketik; L2 berpendar | M3 | `steps(n)` | 0.8 | ketik |
| 22.8 | HUD | DK2 diketik | M3 | `steps(n)` | 0.5 | ketik |
| 23.4 | HUD | DK3 diketik; KAR bergetar di L2 | M3 | `steps(n)` | 0.9 | ketik + gemetar |
| 24.4 | Tengah | **L2 ditarik keluar seperti benang; KAR terlempar keluar bukit dan "pof"** | impact 5.5 | `expo.out` | 0.4 | **impact** sedang + hit musik |
| 24.4 | Kamera | Kick +2% | C1 | `expo.out` | 0.2 | |
| 25.0 | Tengah | L3 dan L4 turun menutup celah, tumpukan mengecil | draw | `sine.inOut` | 0.8 | whoosh turun |
| 25.2 | HUD | CNT 480 → 180 (angka naik dari baseline) | M1 | `expo.out` | 0.8 | tick turun |
| 25.6 | HUD | CAP "tidak pernah tersimpan" | persisten | `expo.out` | 0.6 | |
| 26.2 | HUD | CHK dijahit di samping CNT | draw | `expo.out` | 0.4 | ping |
| 26.8 | Kamera | Tahan; push-in lambat | C1 | `sine.inOut` | 1.2 | |
| 27.6 | Tengah | Jahitan lapisan berkilau sekali | A8 | `sine.inOut` | 0.4 | shimmer |

Celah terbesar: 1.0 s (23.4→24.4, saat ketikan berlangsung).
**Catalog block:** cek registry untuk: *code typing/typewriter*, *bar wipe*. Retint ke P9.
**Impact (24.4):** visual (L2 tertarik, karung terlempar) | kamera (kick 2%) | SFX (impact sedang) | musik (hit).
**Catatan akurasi:** diagram konseptual. Cara satu-RUN bergantung pada pembersihan yang menyeluruh; multi-stage (S5) adalah batas yang lebih kuat (OneUptime 2026).
**Match cut ke S5 (X2):** lapisan tunggal ramping memanjang menjadi jembatan benang antara dua bukit.
**Opsional:** A8 (27.6).

---

### S5 · SOLUSI 2: MULTI-STAGE (28.0-38.0, 10.0 s) · latar indigo

**Tujuan:** Menunjukkan multi-stage build: kompilasi di stage pertama, salin hasil saja ke image akhir. **Payoff dari open loop.**
**VO (22 kata):** "Solusi yang lebih kuat: multi-stage build. Kompilasi di stage pertama, lalu salin hasil jadinya saja ke image akhir yang ramping. Compiler-nya tertinggal."
**Dunia visual / protagonis:** Dua bukit dihubungkan benang. Bukit kiri `build` (tinggi, berisi karung) dan bukit kanan `image akhir` (kecil). Benih "hasil" mustard berjalan di benang; karung tertinggal di bukit kiri.
**Lapisan:** latar (0.2×); tengah = dua bukit + jembatan (1.0×); depan = benih hasil, chip, karung (1.3×); overlay grain + cincin kejut. HUD: CNT, TAG, HDL, DK2, CAP.
**Kamera:** C3 pan horizontal translateX +60→0 (28.0-31.0); C6 parallax; C4 rack focus ke bukit kiri (blur 5 px pada **satu grup** bukit kanan) 32.6-33.2; C2 pull-back 1.1→1.0 di payoff; C1 push-in singkat 37.7-38.0.

| ID | Elemen | x | y | Ukuran | Font · warna |
|---|---|---|---|---|---|
| CNT | 480 → 95 MB `⟦UKUR⟧` | 72 | 250 | 220 | Alfa Slab One · mustard (M9) |
| TAG | "ILUSTRASI" | 779 | 480 | chip 173×40 | mono 32 |
| HDL | "MULTI-STAGE" | 72 | 490 | tinggi 100, lebar ≈ 682 | Alfa Slab One · krem (M11 outline→fill) |
| DK2 | Kartu kode krem | 72 | 600 | 880×160 | mono 32 · indigo |
| DK2a | `FROM ubuntu:24.04 AS build` | 96 | 616 | 1 baris | (M5) |
| DK2b | `FROM ubuntu:24.04` | 96 | 664 | 1 baris | (M5) |
| DK2c | `COPY --from=build /app/hasil /app/hasil` | 96 | 712 | 1 baris (≈ 39 karakter, ≈ 749) | (M5) |
| LH | Bukit kiri `build` (4 lapisan; karung di L2) | 72 | 772 | 400×528 | kain (skala lebar 400) |
| CHB | Chip `build` | 90 | 1240 | 100×40 | mono 32 |
| RH | Bukit kanan: dasar krem 88 px + hasil hijau 17 px | 600 | 1195 | 352×105 | kain krem + hijau |
| CHA | Chip `image akhir` | 610 | 1140 | 220×40 | mono 32 |
| BRG | Jembatan benang | (472,1000)→(600,1195) | | 4 px | mustard, putus-putus |
| HAS | Benih "hasil" | mulai (300,772) | | 56×56 | mustard |
| KAR | Karung di L2 kiri | 140 | 950 | 220×160 | goni |
| CHK | Centang jahitan hijau | 888 | 260 | 64×64 | hijau |
| CAP | "multi-stage build" (29.6), "stage pertama" (32.0), "salin hasil saja" (34.8), "compiler tertinggal" (36.5) | 72 | 1360 | 880×80 | Nunito 40 |

Rasio skala: 220 : 32 = **6.9 : 1**. Teks di layar: CNT 2, HDL 1, kode 3 unit, chip 3, TAG 1, caption 9 = **19**.

**Gerak:** *Primer:* bukit kiri ditenun, benih menyeberang, bukit kanan menyala. *Sekunder:* kick kamera, cincin kejut, bukit kiri meredup. *Ambient:* A1, A5, A8.

**Event Map**
| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---|---|---|---|---|---|---|
| 28.0 | Tengah | Lapisan hijau ramping dari S4 memanjang jadi jembatan; kerangka dua bukit | X2 | `expo.out` | 0.8 | swish |
| 28.0 | Kamera | Pan horizontal + parallax | C3 + C6 | `sine.inOut` | 3.0 | whoosh lembut |
| 28.4 | HUD | HDL "MULTI-STAGE" outline→fill menyapu | M11 | `sine.inOut` | 1.0 | whoosh |
| 29.6 | HUD | CAP "multi-stage build" (kata kunci morph `wght` 500→900) | M8 | `sine.inOut` | 0.6 | |
| 29.8 | Tengah | LH ditenun cepat (time-lapse 4 lapisan); CHB `build` | draw | `expo.out` | 1.2 | swish + tick |
| 31.2 | HUD | DK2 masuk; DK2a `FROM ubuntu:24.04 AS build` | M5 | `expo.out` | 0.6 | klik |
| 32.0 | HUD | CAP "stage pertama" (kata "stage" morph `wght`) | M8 | `sine.inOut` | 0.6 | |
| 32.6 | Kamera | Rack focus ke LH (grup kanan blur 5 px) | C4 | `sine.inOut` | 0.6 | whoosh |
| 33.2 | Depan | HAS lahir di puncak LH; BRG menyala | draw | `expo.out` | 0.5 | ping |
| 33.8 | HUD | DK2b dan DK2c masuk (stagger 0.3) | M5 | `expo.out` | 0.8 | klik x2 |
| 34.8 | Depan | HAS berjalan di BRG (busur); CAP "salin hasil saja" | sekunder + M8 | `sine.inOut` | 0.7 | whoosh kecil |
| 35.5 | Semua | **PAYOFF**: HAS mendarat di RH; RH menyala hijau; LH meredup; KAR tertinggal; CNT 480 → 95; cincin kejut | impact 5.5 + M9 | `expo.out` | 0.4 | **impact** + hit musik (puncak) |
| 35.5 | Kamera | Kick +3% lalu pull-back 1.1→1.0 | C2 | `expo.out` | 1.0 | whoosh turun |
| 36.5 | HUD | CHK dijahit; CAP "compiler tertinggal" | draw | `expo.out` | 0.4 | ping |
| 37.2 | Tengah | LH + KAR memudar (opasitas 1→0.35) | sekunder | `sine.inOut` | 0.8 | desis halus |
| 37.7 | Kamera | Push-in singkat ke RH | C1 | `sine.inOut` | 0.3 | riser pendek |

Celah terbesar: 1.4 s (29.8→31.2; ambient dan time-lapse berjalan).
**Catalog block:** cek registry untuk: *split-screen/compare*, *path travel*, *counter/odometer*. Retint ke P9.
**Impact (35.5):** visual (hasil mendarat, RH menyala, cincin) | kamera (kick + pull-back) | SFX (impact) | musik (puncak/hit).
**Catatan akurasi:** diagram konseptual; potongan Dockerfile diringkas (langkah install/COPY/make tidak ditampilkan). Docker Docs: multi-stage memisahkan proses build dan output akhir, sehingga output hanya berisi yang dibutuhkan untuk menjalankan aplikasi.
**Match cut ke S6 (X4):** iris menutup pada RH (bukit kecil) lalu membuka di S6 dengan bukit yang sama.
**Opsional:** C4 blur (ganti penurunan opasitas), C6 parallax, A8.

---

### S6 · KEBIASAAN TAMBAHAN DAN CEK (38.0-45.0, 7.0 s) · latar indigo

**Tujuan:** Dua kebiasaan murah (base kecil, `.dockerignore`) dan cara memverifikasi (`docker image history`).
**VO (15 kata):** "Tambahkan base image kecil dan .dockerignore. Cek hasilnya pakai docker image history, lalu bandingkan ukurannya."
**Dunia visual / protagonis:** Bukit final kecil di kiri; pagar jahit menahan tumpukan sampah (`.git`, `node_modules`, `*.md`); siluet bukit gemuk dengan karung samar di latar kanan (kameo protagonis).
**Lapisan:** latar (0.2×); tengah = bukit final + siluet lama (opasitas 0.28); depan = pagar, chip sampah (1.3×); overlay grain. HUD: CNT, TAG, HIS (kartu terminal), CAP.
**Kamera:** C2 pull-back 1.12→1.0 (38.0-39.5, `sine.inOut`); C1 push-in 1.00→1.04 (39.5-45.0); kick 2% di 40.6.

| ID | Elemen | x | y | Ukuran | Font · warna |
|---|---|---|---|---|---|
| CNT | 95 → 60 MB `⟦UKUR⟧` | 72 | 250 | 220 | Alfa Slab One · mustard (M12) |
| TAG | "ILUSTRASI" | 779 | 480 | chip 173×40 | mono 32 |
| HIS | Kartu terminal krem | 72 | 520 | 880×200 | mono 32 · indigo (M10) |
| HIS1 | `SIZE   CREATED BY` | 96 | 548 | 1 baris | |
| HIS2 | `15 MB  COPY --from=build` | 96 | 596 | 1 baris | `⟦UKUR⟧` |
| HIS3 | `45 MB  FROM <base kecil>` | 96 | 644 | 1 baris | `⟦UKUR⟧` |
| HF | Bukit final: dasar menyusut 88→50 px + hasil 17 px | 120 | 1233 | 360×67 | kain krem + hijau |
| OLD | Siluet bukit gemuk + karung samar | 560 | 772 | 392×528, opasitas 0.28 | kain |
| PG | Pagar jahit | 505 | 1120 | 30×180 | tiang krem/mustard |
| JK1-JK3 | Chip `.git` (y 1140), `node_modules` (y 1190), `*.md` (y 1240) | mulai di luar kanan, berhenti di x ≈ 560 | | tinggi 40 | mono 32 · indigo di chip krem (M10) |
| STP2 | Stempel `.dockerignore` | 540 | 1060 | 300×60, rotasi −6° | mono 32 · indigo di chip krem (M4) |
| CAP | "base image kecil" (38.6), "bandingkan ukurannya" (43.6) | 72 | 1360 | 880×80 | Nunito 40 |

Rasio skala: 220 : 32 = **6.9 : 1**. Teks di layar: CNT 2, chip 3, stempel 1, kode/terminal 3 unit, TAG 1, caption 5 = **15**.

**Gerak:** *Primer:* sampah terpental dari pagar, kartu terminal terisi. *Sekunder:* dasar bukit menyusut, kick kamera. *Ambient:* A1, A8.

**Event Map**
| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---|---|---|---|---|---|---|
| 38.0 | Semua | Iris membuka dari bukit kecil | X4 | `expo.out` | 0.7 | whoosh |
| 38.0 | Kamera | Pull-back | C2 | `sine.inOut` | 1.5 | |
| 38.6 | HUD | CAP "base image kecil"; dasar HF menyusut 88→50 px; CNT 95 → 60 | M12 | `back.out(1.7)` | 0.6 | squish halus |
| 39.4 | Tengah | OLD memudar masuk (opasitas 0→0.28) | sekunder | `sine.inOut` | 0.8 | desis |
| 40.0 | Depan | JK1-JK3 meluncur dari kanan menuju bukit | M10 | `expo.out` | 0.6 | whoosh x3 |
| 40.6 | Depan | PG naik; STP2 `.dockerignore` menimpa pagar | M4 | `expo.out` | 0.25 | **impact** kecil + hit musik |
| 40.6 | Kamera | Kick +2% | C1 | `expo.out` | 0.2 | |
| 41.2 | Depan | JK1-JK3 terpental dari pagar, berputar, jatuh keluar layar | sekunder | `back.out(1.7)` | 0.8 | bonk x3 |
| 41.8 | HUD | HIS masuk dari bawah; HIS1 | M10 | `expo.out` | 0.6 | klik |
| 42.4 | HUD | HIS2 | M10 | `expo.out` | 0.5 | klik |
| 43.0 | HUD | HIS3 | M10 | `expo.out` | 0.5 | klik |
| 43.6 | HUD | Sorotan mustard menyapu kolom SIZE; CAP "bandingkan ukurannya" | A8 | `sine.inOut` | 0.8 | tick |
| 44.4 | Kamera | Tahan; musik resolve | C1 | `sine.inOut` | 0.6 | pad menutup |

Celah terbesar: 0.8 s.
**Catalog block:** cek registry untuk: *iris*, *stamp*. Retint ke P9.
**Impact (40.6):** visual (stempel menimpa pagar) | kamera (kick 2%) | SFX (impact kecil) | musik (hit ringan).
**Catatan akurasi:** isi kartu terminal konseptual; **ganti dengan keluaran nyata** `docker image history` dari Dockerfile contoh Anda bila memungkinkan (bagian 8).
**Akhir:** tidak ada trik loop; video berakhir sebagai resolusi, bukan pertanyaan. Frame terakhir tetap layak sebagai thumbnail alternatif.
**Opsional:** OLD (siluet), A8.

---

## 6. Audio

| Elemen | Spesifikasi |
|---|---|
| Voice over | ±145 kata/menit, tenang; 2.0-2.8 kata/detik (total 105 kata / 45 s ≈ 2.3). Jeda nyata di akhir tiap kalimat. Sinkron kata-per-kata untuk karaoke caption dan titik wow/payoff memakai timestamp transkrip VO |
| Musik | 120 BPM (batas scene di kelipatan 0.5 s). 3 keadaan energi: **tertahan** (0-18.4), **terbuka** (19.0-38.0, puncak 35.5), **resolve hangat** (38.0-45.0). Riser 16.9-18.4; riser pendek 37.7-38.0 |
| Impact | Tiap beat penting memakai koreografi 4 lapisan: 1.6, 19.0, 24.4, 35.5, 40.6 (ukuran impact membesar sampai 19.0 dan 35.5) |
| Whoosh | Tiap gerak kamera besar dan transisi (X1, X2, X4, X8) |
| Foley | Gesekan goni, jahitan tik-tik, ketikan, tick counter, klik. Level di bawah VO |
| Keheningan | Satu momen hening 0.6 s tepat sebelum wow (18.4-19.0) |
| Ducking | Musik turun otomatis di bawah VO (sidechain) |
| Mode tanpa suara | Visual dan caption membawa pesan inti ("sudah dihapus, tetap gendut → pakai multi-stage") |
| Sumber | VO, musik, SFX dihasilkan lewat `/media-use` atau pipeline repo |

**Naskah VO penuh (105 kata)**
1. (S1, 11) Kamu sudah hapus file besarnya. Tapi image tetap gendut. Kok bisa?
2. (S2, 19) Soalnya image itu tumpukan lapisan. Setiap RUN dan COPY menambah satu lapisan baru, yang isinya tidak bisa diubah lagi.
3. (S3, 21) Waktu kamu hapus file di lapisan berikutnya, Docker cuma menaruh penanda "hilang" di atasnya. File aslinya tetap ada di lapisan bawah.
4. (S4, 17) Solusi pertama: pasang dan hapus di RUN yang sama, jadi file itu tidak pernah tersimpan di lapisan.
5. (S5, 22) Solusi yang lebih kuat: multi-stage build. Kompilasi di stage pertama, lalu salin hasil jadinya saja ke image akhir yang ramping. Compiler-nya tertinggal.
6. (S6, 15) Tambahkan base image kecil dan .dockerignore. Cek hasilnya pakai docker image history, lalu bandingkan ukurannya.

---

## 7. Aturan teknis HyperFrames

- **Deterministik:** semua gerak di GSAP timeline `paused: true`, didaftarkan ke `window.__timelines`. Dilarang `Math.random()`, `Date.now()`, `setInterval`, `repeat: -1`. Posisi acak (decode M7, gelombang kain) memakai PRNG ber-seed tetap (mis. `mulberry32(seed)`). Guncang kamera memakai tabel offset tetap.
- **Font self-host (woff2):** Alfa Slab One 400; Nunito variable (`wght` 200-1000) untuk M8; JetBrains Mono 400 dan 700. Tidak ada request jaringan saat render.
- **Aset:** semua ilustrasi (bukit, karung, kain, benih, pagar, chip) dibuat sebagai SVG/CSS oleh agent. Tidak ada gambar eksternal. Tekstur benang = tile statis.
- **Kamera:** bungkus WORLD dalam `#cam`; HUD di luar `#cam`. Parallax: latar 0.2×, tengah 1.0×, depan 1.3×.
- **Budget (bagian 11 master):** elemen DOM beranimasi ≤ ±400 per scene (estimasi ≤ 250); partikel ambient 0; blur bersamaan ≤ 3 (rencana: 1 grup, hanya S3 dan S5); `backdrop-filter` **tidak dipakai**; transisi shader 0; Three.js/WebGL 0; `feTurbulence` animatif **dilarang** (grain statis).
- **Fallback ladder:** (1) matikan A8; (2) ganti C4 blur dengan penurunan opasitas grup; (3) hilangkan C6 parallax (jadi 2 lapisan); (4) kurangi elemen jahitan (satu path per lapisan); pertahankan selalu gerak primer, kamera C1, dan impact 4 lapisan.
- **Alur:** lint/validate → snapshot (awal, tengah, akhir tiap scene; tiap transisi; 19.0 dan 35.5) → preview → render MP4 hanya setelah checklist di bawah lulus.

**Checklist QA**
- [ ] Frame t=0 layak jadi cover (headline + angka + bukit terlihat).
- [ ] Tidak ada teks < 32 px, baris > 880 px, atau teks di luar safe zone (x 72→952, y 240→1460) di luar jendela transisi 0.6 s.
- [ ] Tidak ada teks langsung di atas terakota/hijau (hanya chip krem).
- [ ] Wow di 19.0 s dan payoff di 35.5 s tetap terikat ke kata "tetap" dan frasa "image akhir" setelah sinkron VO.
- [ ] Semua angka ukuran ada chip "ILUSTRASI" atau sudah diganti hasil ukur.
- [ ] Perintah di layar sama dengan bagian 8.
- [ ] Kontras teks ≥ 4.5:1; waktu baca ≥ 0.3 s/kata + 0.5 s per momen.

---

## 8. Fakta dan sumber

### Tabel klaim dan sumber
| Klaim di video | Sumber | URL | Status |
|---|---|---|---|
| Image terdiri dari layer; tiap layer memuat perubahan filesystem (tambahan, penghapusan, modifikasi); layer yang sudah dibuat bersifat immutable | Docker Docs, "Understanding the image layers" | https://docs.docker.com/guides/docker-concepts/building-images/understanding-image-layers/ | Primer |
| Hanya RUN, COPY, ADD yang membuat layer filesystem; LABEL tidak lagi menambah layer sejak Docker 1.10 | JFrog (artikel Docker image); Docker Docs "Building best practices" (bagian LABEL) | https://jfrog.com/ja/devops-tools/article/understanding-and-building-docker-images/ ; https://docs.docker.com/build/building/best-practices/ | Sekunder + primer |
| Menghapus file di RUN berikutnya menambah penanda hapus di layer baru; byte layer lama tetap tersimpan dan ikut saat pull | OneUptime, 3 Agu 2026 | https://oneuptime.com/blog/post/2026-08-03-multi-stage-build-vs-apt-remove-image-layers/view | Sekunder |
| Satu RUN yang membersihkan di instruksi yang sama dapat mengecilkan image (contoh: hapus `/var/lib/apt/lists` karena cache apt tidak tersimpan di layer) | Docker Docs, "Building best practices" (bagian RUN/apt-get) | https://docs.docker.com/build/building/best-practices/ | Primer |
| Multi-stage build memisahkan proses build dari output akhir sehingga output hanya berisi file yang dibutuhkan untuk menjalankan aplikasi | Docker Docs, "Building best practices" (bagian multi-stage) | https://docs.docker.com/build/building/best-practices/ | Primer |
| Multi-stage adalah batas yang lebih kuat daripada mengandalkan pembersihan manual di satu RUN | OneUptime, 3 Agu 2026 | (sama dengan di atas) | Sekunder (opini teknis penulis) |
| `.dockerignore` mengecualikan file yang tidak relevan dari build, pola mirip `.gitignore` (contoh `*.md`) | Docker Docs, "Building best practices" | https://docs.docker.com/build/building/best-practices/ | Primer |
| Base image yang lebih kecil memperkecil ukuran image dan jumlah kerentanan dari dependensi | Docker Docs, "Building best practices" | (sama) | Primer |
| `COPY --from=<stage>` menyalin file dari stage lain dalam multi-stage build | Docker Docs, "Building best practices" (bagian ADD atau COPY) | (sama) | Primer |
| `docker image history` menampilkan layer dan ukurannya | Docker Docs (panduan layer, perintah `docker image history`) | https://docs.docker.com/guides/docker-concepts/building-images/understanding-image-layers/ | Primer |

### Konflik dan catatan antar sumber
1. Banyak artikel sekunder menulis "setiap instruksi Dockerfile membuat layer". Docker Docs (bagian LABEL) dan JFrog menunjukkan hanya RUN, COPY, ADD yang menambah layer filesystem. Brief memakai versi yang lebih sempit ("RUN dan COPY menambah lapisan").
2. Satu buku daring yang saya temukan menyatakan dirinya dihasilkan AI dan mungkin tidak akurat; isinya sejalan dengan sumber di atas tetapi **tidak dipakai sebagai sumber**.
3. Alat pihak ketiga seperti `dive` sering disebut untuk memeriksa layer. Tidak dimasukkan ke video agar tetap fokus pada perintah bawaan Docker.
4. Docker Docs menyebut Alpine kecil (di bawah 6 MB). Brief **sengaja tidak** merekomendasikan Alpine secara spesifik, karena binary yang dikompilasi di distro berbasis glibc tidak otomatis jalan di Alpine (musl). Pesan di video hanya "base image kecil".

### Skrip mengukur angka nyata (opsional; belum saya jalankan)
Saya belum menjalankan Docker untuk memverifikasi angka. Bila Anda ingin mengganti angka ilustrasi, buat folder dengan `hello.c` dan tiga Dockerfile berikut, lalu ukur.

```c
#include <stdio.h>
int main(void){ puts("halo"); return 0; }
```

`Dockerfile.naive`
```dockerfile
# syntax=docker/dockerfile:1
FROM ubuntu:24.04
RUN apt-get update && apt-get install -y --no-install-recommends build-essential
COPY hello.c /src/hello.c
RUN gcc -o /usr/local/bin/hello /src/hello.c
RUN apt-get purge -y build-essential && apt-get autoremove -y
```

`Dockerfile.onerun`
```dockerfile
# syntax=docker/dockerfile:1
FROM ubuntu:24.04
COPY hello.c /src/hello.c
RUN apt-get update && apt-get install -y --no-install-recommends build-essential \
    && gcc -o /usr/local/bin/hello /src/hello.c \
    && apt-get purge -y build-essential && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*
```

`Dockerfile.multistage`
```dockerfile
# syntax=docker/dockerfile:1
FROM ubuntu:24.04 AS build
RUN apt-get update && apt-get install -y --no-install-recommends build-essential
COPY hello.c /src/hello.c
RUN mkdir /out && gcc -o /out/hello /src/hello.c

FROM ubuntu:24.04
COPY --from=build /out/hello /usr/local/bin/hello
```

```console
$ docker build -f Dockerfile.naive      -t demo:naive .
$ docker build -f Dockerfile.onerun     -t demo:onerun .
$ docker build -f Dockerfile.multistage -t demo:multi .
$ docker image ls demo
$ docker image history demo:naive
```
Catatan: contoh ini kecil, jadi selisih ukurannya mungkin tidak sedramatis angka ilustrasi (480 → 180 → 95). Bila ingin selisih yang lebih besar, gunakan aplikasi nyata. Ganti semua `⟦UKUR⟧` dengan hasil Anda, dan sesuaikan tinggi lapisan (1.1 px per MB).

### Daftar "cek ulang sebelum posting"
- [ ] Angka ilustrasi sudah diganti hasil ukur, atau chip "ILUSTRASI" tampil di semua scene yang memuat angka.
- [ ] Tag `ubuntu:24.04` masih tersedia dan sintaks `COPY --from` sesuai versi Docker Anda.
- [ ] Ukuran image bisa dilaporkan berbeda tergantung versi/engine (mis. ukuran terkompresi vs tidak). Catat cara Anda mengukur.
- [ ] Bandingkan kembali halaman Docker Docs "Building best practices" bila sudah lewat beberapa bulan.
- [ ] Narasi tidak menyiratkan bahwa `apt-get purge` selalu menghapus semua dependensi (konseptual).

---

## 9. Prompt untuk agent

```text
Using /hyperframes (faceless-explainer workflow) [or /video-reels if available], build the video described in BRIEF.md.

Rules:
- Follow BRIEF.md exactly: scene timing, layout coordinates, copy, colors, fonts, motion codes (M/C/X/A), and event maps. Do NOT improvise design.
- Canvas 1080x1920, 60fps, 45s total. Use the Design Tokens block (section 3) as DESIGN.md.
- Self-host fonts (Alfa Slab One 400, Nunito variable wght 200-1000, JetBrains Mono 400/700). For variable-font animation (M8), load the Nunito variable woff2.
- Deterministic only: paused GSAP timelines. No Math.random/Date.now/infinite repeats. Use a fixed-seed PRNG for decode text and cloth waves, and fixed offset tables for camera shake.
- Wrap the WORLD of every scene in a camera element (#cam) and implement the camera moves in the brief. Keep HUD elements (counter, headline, caption pill, ILUSTRASI chip, code cards) outside #cam. Place content in 3-4 depth layers with different parallax factors.
- Implement the Visual Type recipe from section 3.5 consistently: one textile material language (woven thread texture, stitched dashed edges) in every scene. Do not switch to a different look mid-video. If a recipe element is too heavy, follow the fallback ladder in section 7, do not substitute another style.
- Before hand-building any transition, effect, caption style, chart, or code animation, consult /hyperframes-registry and install the matching catalog block. Retint catalog blocks to palette P9 in DESIGN.md.
- Implement every impact as four synchronized layers (visual, camera, SFX, music) within one frame at 60fps.
- Respect the render budget in section 7 of the brief (no backdrop-filter, no animated feTurbulence, no shader transitions, no Three.js). If a scene is too heavy, drop elements marked "opsional" first, following the fallback ladder.
- Draw all illustrations (hill layers, sack, cloth curtain, seed, fence, chips) as inline SVG/CSS. No external images.
- Generate VO (calm Indonesian, ~145 wpm), music (120 BPM, three energy states per section 4.2), and SFX via the pipeline. Sync karaoke captions and the two anchored beats (wow on the word "tetap", payoff on the phrase "image akhir") to word-level timestamps from the VO transcript.
- Every number, version, ID, command, and date on screen must match section 8 exactly. Illustrative sizes must keep the ILUSTRASI chip unless the brief's values were replaced with measured ones.
- Run lint/validate/inspect (if available), then snapshot key frames (start, middle, and end of every scene, plus every transition, 19.0s and 35.5s). Check against the QA checklist and the Boredom Audit, and fix before rendering.
- Render to MP4 only after the checklist passes.
```

---

## 10. Caption postingan

> Kamu sudah `rm` file besarnya, tapi image Docker tetap gendut? Itu karena layer lama tetap tersimpan. Hapus di RUN yang sama, atau pakai multi-stage build. Cek pakai `docker image history`. (Angka di video hanya ilustrasi.)
>
> #docker #devops #dockerfile #backend #belajarcoding #developerindonesia

---

## 11. Catatan variasi

| Aspek | Video 1 (Cloudflare Tunnel vs Nginx) | Video 2 (PHP2Shell) | Video 3 (Termux) | **Video 4 (ini)** |
|---|---|---|---|---|
| Tipe visual (V) | belum dicatat | belum dicatat | belum dicatat | **V2 + V6, material tekstil** |
| Palet | P1 | P2 | P4 | **P9 (baru)** |
| Tipografi | T1 | T2 | T3 | **T6 (baru: Alfa Slab One + Nunito)** |
| Teknik teks utama | M1 | M2 | M3 | **M6** (set pendukung 12 teknik) |
| Metafora / dunia | Resepsionis vs telepon keluar | Kunci kamar hotel | Master stensil → mesin riso | **Bukit tenun berlapis + karung** |
| Arketipe layout dominan | (tidak dicatat) | (tidak dicatat) | (tidak dicatat) | #14 Macro/micro + penampang |

**Baris Registry untuk ditempel ke MASTER-PROMPT.md (bagian 12):**
```
| 4 | Kenapa Docker image membengkak | V2+V6 | P9 (baru) | T6 (baru) | M6 | Bukit tenun berlapis + karung build-essential | 31 Okt 2026 |
```
Definisi P9 (bagian 3.2) dan T6 (bagian 3.3) juga perlu ditambahkan ke Library bila ingin dipakai ulang.

---

## 12. Hasil Boredom Audit

| # | Pemeriksaan | Hasil |
|---|---|---|
| 1 | Celah terbesar antar kejadian | **1.4 s** (S5, 29.8→31.2; ambient dan time-lapse berjalan). Jeda berisi: 0.6 s (18.4) |
| 2 | Teknik teks berbeda | **12** (M1-M12); tidak ada yang sama di scene berurutan |
| 3 | Jenis transisi | **4** (X1, X2, X4, X8); match-cut/morph = **3** (X2 ×2, X8) |
| 4 | Gerak kamera per scene | **6/6** (100%) |
| 5 | Lapisan z/parallax | **4 lapisan di 6/6** scene |
| 6 | Kontras skala | **6.9 : 1** di semua scene (CNT 220 px : label 32 px) |
| 7 | Ambient per scene | **6/6** (A1 di semua scene) |
| 8 | Wow moment | **19.0 s = 42.2%** durasi; 4 lapisan sinkron |
| 9 | Pattern interrupt | Rentang terpanjang tanpa perubahan besar: **8.0 s** (5.0→13.0; interrupt tambahan di 11.0). Titik: 1.6, 5.0, 11.0, 13.0, 19.0, 21.0, 24.4, 28.0, 35.5, 38.0, 40.6 |
| 10 | Open loop | Dibuka di **3.6 s**; mini-loop ditutup 19.0 s; payoff utama **35.5 s = 78.9%** |
| 11 | Kurva ketegangan | 4 → 2 → 3/5 → 3 → 4/5 → 2; puncak di 35.5 s (78.9%) |
| 12 | Dinamika musik | **3 keadaan**: tertahan, terbuka, resolve (+ hening 0.6 s) |
| 13 | Metafora/dunia visual | **6/6 scene (100%)**; protagonis di **6/6** (S6 sebagai kameo samar) |
| 14 | Budget render | DOM/scene est. ≤ 250 (batas ±400); partikel 0; blur ≤ 1 grup; `backdrop-filter` 0; shader 0; Three.js 0; `feTurbulence` animatif 0. Elemen opsional ditandai per scene |
| 15 | Keterbacaan | Kata di layar per scene (konvensi: 1 baris kode = 1 unit): S1 10, S2 21, S3 16, S4 11, S5 19, S6 15 (**≤ 25**). Kontras teks ≥ 6.5:1 (krem/mustard di indigo; indigo di krem 11.2:1) |
| 16 | Tipe visual (V) | V2+V6; Registry belum mencatat V video 1-3, jadi tidak ada bentrok. Resep tekstil konsisten di 6/6 scene |

**Hal yang gagal / perlu perhatian**
- Item 15 memakai konvensi "1 baris kode = 1 unit". Bila dihitung per token, S4 dan S5 melewati 25. Solusinya memangkas satu baris kode di DK/DK2.
- Waktu event adalah perkiraan; kata terikat untuk wow (19.0) dan payoff (35.5) harus diperiksa ulang setelah VO jadi.
- Angka ukuran masih ilustrasi (`⟦UKUR⟧`).
