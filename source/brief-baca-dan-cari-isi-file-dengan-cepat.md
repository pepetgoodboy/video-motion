# BRIEF — Baca dan Cari Isi File dengan Cepat: `cat`, `less`, `grep`, `find`

> **Slug:** `baca-cari-isi-file-linux`  
> **Format:** Reels / TikTok, 9:16, 1080×1920 px  
> **Durasi:** 75 detik (maksimum 120 detik; dipilih karena empat command perlu dijelaskan beserta perbedaan tugasnya)  
> **Frame rate:** 60 fps final; pipeline dapat render 120 fps lalu blend ke 60 fps  
> **Engine:** HyperFrames — HTML + CSS + GSAP timeline `paused`, deterministik  
> **Bahasa:** Indonesia santai-teknis, faceless, dengan voice-over  
> **Lingkungan render:** CPU tanpa GPU; hindari efek berat  
> **Status fakta:** Materi evergreen; command dan opsi diverifikasi terhadap dokumentasi GNU/Linux pada 5 November 2026. Contoh memakai lingkungan GNU/Linux umum.  
> **Asumsi setup:** Berkas demo `notes.txt` dan `logs/app.log` tersedia di direktori kerja yang disiapkan pipeline. Lokasi fixture final perlu dicocokkan dengan setup repo (`⟦SETUP⟧`).

---

## 0. Cara Pakai File

1. Baca seluruh brief sebelum membuat scene atau aset.
2. Periksa `/hyperframes-registry` untuk blok terminal, teks, diagram, dan transisi yang relevan; jangan mengarang ID blok.
3. Cocokkan path fixture `notes.txt` dan `logs/app.log` dengan dokumen setup repo. Ganti path hanya bila memang berbeda, lalu perbarui semua kemunculannya secara konsisten.
4. Implementasikan timing, koordinat, command, warna, font, audio, dan audit persis seperti brief. Jangan menambah opsi command atau klaim teknis yang tidak tercantum di bagian 8.

## 1. Konsep

### 1.1 Pesan inti

**Pilih command berdasarkan apa yang sedang dicari: `cat` untuk membaca isi singkat, `less` untuk menelusuri file panjang, `grep` untuk menemukan teks di dalam file, dan `find` untuk menemukan berkas berdasarkan nama atau lokasinya.**

Jangan menggambarkan empat command ini sebagai empat cara melakukan hal yang sama. Mereka menyelesaikan empat tugas yang berbeda dan dapat dirangkai saat dibutuhkan.

### 1.2 Concept Lab

| Kandidat | Metafora literal | Dunia visual | Protagonis visual | Momen wow | Open loop | Literal | Akurat | Gerak | Kebaruan | Feasibility | Total |
|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|
| **A — Arsip Terminal** *(terpilih)* | Empat alat arsip untuk empat jenis pencarian | Ruang arsip digital berbentuk pohon direktori ASCII; lorong file dan panel terminal | Token file `app.log` dengan kursor oranye yang bergerak | Pohon direktori melebar menjadi peta keputusan empat kuadran; token masuk ke alat yang tepat | “Kalau semua command sama-sama berurusan dengan file, kapan memakai yang mana?” | 5 | 5 | 5 | 4 | 5 | **24/25** |
| B — Meja kerja operator | Empat operator dengan alat berbeda | Meja kontrol dengan laci, buku, kaca pembesar, dan denah | Kartu file kecil | Keempat alat saling menyambungkan dalam satu alur | “Alat mana yang harus diambil dulu?” | 5 | 4 | 4 | 3 | 4 | 20/25 |
| C — Balapan empat kendaraan | Setiap command menjadi kendaraan pencari | Sirkuit empat jalur | Paket file | Empat jalur bertemu di satu tujuan | “Siapa paling cepat?” | 5 | 3 | 4 | 2 | 5 | 19/25 |

**Alasan memilih A:** visual pohon direktori dan terminal dekat dengan konteks Linux, mudah menggambarkan perbedaan antara menemukan path dan mencari teks di dalam file, serta memberi ruang untuk transisi morph yang punya makna. Kandidat B ditolak karena alat fisiknya lebih mudah berubah menjadi empat kartu statis. Kandidat C ditolak karena framing balapan memberi kesan command saling bersaing dan berisiko menyesatkan.

### 1.3 Dunia visual dan protagonis

- **Dunia visual:** “Arsip Terminal”, sebuah ruang arsip digital berbentuk denah pohon direktori. Cabang direktori dibuat dari karakter ASCII (`/`, `|`, `+`, `-`, `.`); panel terminal berada di lapisan tengah; garis rute oranye bergerak mengikuti pencarian.
- **Protagonis:** token file `app.log`. Token ini muncul di hampir semua scene. Ia tidak berubah menjadi karakter manusia; ia tetap berupa chip file kecil dengan ekstensi `.log`.
- **Nasib protagonis:** mula-mula berada di lorong arsip, lalu dibuka, ditelusuri, dipindai isinya, ditemukan kembali lewat nama/path, dan akhirnya melewati alur gabungan `find` + `grep`.
- **Tiga motif maksimum:** (1) pohon path ASCII, (2) token `app.log`, (3) garis rute/kursor oranye.

### 1.4 Tabel metafora

| Konsep teknis | Bentuk visual literal | Makna yang harus terbaca |
|---|---|---|
| `cat` | Seluruh lembar isi file terbentang langsung ke layar | Tampilkan isi file langsung; cocok untuk file pendek atau saat isi lengkap memang ingin dilihat |
| `less` | Tumpukan halaman dengan jendela baca yang berpindah | Menjelajahi file panjang tanpa menumpahkan semuanya sekaligus ke terminal |
| `grep` | Pemindai melintasi baris; hanya baris yang cocok menyala | Mencari pola pada isi file dan menampilkan baris yang cocok |
| `find` | Kamera menelusuri cabang pohon direktori; file yang cocok diberi penanda | Menemukan path/berkas berdasarkan kriteria seperti nama dan tipe |
| `find` + `grep` | Cabang hasil `find` masuk ke pemindai `grep` | Cari berkas yang sesuai, lalu cari teks di dalam berkas tersebut |

### 1.5 Open loop dan payoff

- **Dibuka pada 0–5 detik:** “Kalau semua command sama-sama berurusan dengan file, kapan memakai yang mana?”
- **Dijaga:** setiap command memperlihatkan tugas yang berbeda, tetapi jawaban final belum diberikan sebagai rumus hafalan.
- **Payoff pada 57–63 detik (76–84% durasi):** peta keputusan empat bagian menjawab: baca cepat → `cat`; file panjang → `less`; cari teks → `grep`; cari berkas/path → `find`.
- **Janji yang ditepati:** penonton pulang dengan cara memilih command, bukan sekadar menghafal empat nama.

### 1.6 Hook Lab

| Jenis | Opsi hook | Catatan |
|---|---|---|
| Kontradiksi | **“File-nya ada. Isinya masih misteri.”** | Menghadirkan masalah dan membuka pertanyaan cara mencari |
| Angka mengejutkan | “Empat command, empat misi berbeda.” | Jelas, tetapi tidak cukup mengejutkan |
| Pertanyaan yang salah | “Kenapa `grep` tidak menemukan file?” | Mengoreksi salah paham tentang pencarian isi vs pencarian path |
| Cold open hasil akhir | Tampilkan peta `cat / less / grep / find`, lalu zoom mundur ke terminal | Payoff muncul terlalu awal jika tidak ditahan |
| Taruhan/konsekuensi | “Salah pilih command, waktu habis cari log.” | Konsekuensi masuk akal, tetapi kurang spesifik |

**Hook terpilih:** “File-nya ada. Isinya masih misteri.” (6 kata). Dipilih karena mudah dipahami pemula dan langsung memunculkan masalah yang akan diselesaikan. Frame t=0 sudah menampilkan token `app.log` yang bergerak, bukan layar kosong.

### 1.7 Tension map

| Scene | Fungsi | Ketegangan (1–5) | Energi musik |
|---|---|---:|---|
| S1 | Hook dan pertanyaan utama | 4 | Low-pass, bass tertahan |
| S2 | `cat`: baca cepat | 2 | Stabil, ringan |
| S3 | `less`: navigasi file panjang | 3 | Pulse mulai terbentuk |
| S4 | `grep`: cari isi | 4 | Build-up, ritme scan |
| S5 | `find`: cari path + wow map empat alat | 5 | Riser lalu hit penuh |
| S6 | Gabungkan `find` dan `grep` | 4 | Energi terbuka, groove stabil |
| S7 | Payoff: peta keputusan | 5 | Tegang singkat lalu resolve |
| S8 | Ringkasan dan loop | 2 | Resolve hangat |

Kurva tidak datar: hook → turun saat contoh pertama → naik ketika kebutuhan pencarian makin spesifik → puncak visual di S5 → payoff di S7 → resolve.

### 1.8 Struktur retensi

| Waktu | Beat | Fungsi retensi |
|---|---|---|
| 0–6s | File ada, bagian yang dicari belum ketemu | Hook + open loop |
| 6–24s | `cat` lalu `less` | Dua kebutuhan baca yang kontras |
| 24–34s | `grep` | Pattern interrupt: baris lain meredup, baris cocok menyala |
| 34–44s | `find` + peta empat alat | Wow moment; perubahan skala dan layout |
| 44–54s | Contoh gabungan `find` + `grep` | Membuktikan alat bisa dirangkai |
| 54–64s | Peta keputusan | Payoff open loop |
| 64–75s | Ringkasan empat pasangan | Memori dan loop ke frame awal |

## 2. Aturan Anti-Slop

### Wajib

- Bedakan **mencari berkas** (`find`) dari **mencari teks di dalam berkas** (`grep`). Ini adalah inti edukasi.
- Tampilkan perintah asli, bukan pseudo-command. Path demo harus berasal dari fixture yang benar-benar tersedia.
- Beri alasan kapan menggunakan setiap command; jangan hanya menunjukkan sintaks.
- Perlihatkan `less` sebagai pager interaktif: `/error` untuk mencari ke depan, `n` untuk hasil berikutnya, dan `q` untuk keluar.
- Beri makna pada setiap gerak: file mengalir saat diproses, baris menyala saat cocok, cabang path terbuka saat ditemukan.
- Seluruh scene memakai bahasa material V19 ASCII Art yang konsisten.
- Tanpa suara pun, label command, contoh sintaks, dan peta keputusan harus menyampaikan inti.

### Dilarang

- Jangan menyebut `cat` sebagai editor file; pada contoh ini ia menampilkan isi ke standard output.
- Jangan menyebut `less` sebagai alat pencarian direktori.
- Jangan menyebut `grep` sebagai pencari nama file; fokusnya adalah baris yang cocok di dalam input.
- Jangan menyebut `find` sebagai pencari kata di dalam isi file.
- Jangan menyarankan `cat` untuk log yang sangat panjang; arahkan penonton ke `less` atau pencarian terarah.
- Jangan menggunakan `sudo`, menghapus file, mengubah permission, menulis ke sistem, atau menelusuri seluruh root filesystem.
- Jangan menampilkan path privat, nama user sungguhan, hostname, token, password, alamat IP privat, atau isi log produksi.
- Jangan menambahkan klaim bahwa satu command selalu lebih cepat daripada yang lain.
- Jangan menampilkan wildcard `*.log` tanpa quote pada contoh `find`; quote menjaga pola tetap diterima `find`, bukan diekspansi shell terlebih dahulu.

## 3. Design Tokens

### 3.1 Tipe visual dan format narasi

- **Format narasi:** tutorial pemula, problem → alat → demonstrasi → pemilihan alat.
- **Kandidat tipe visual:** V19 ASCII Art dan V5 Hand-drawn / stop-motion feel. V19 dipilih karena konteks utama video adalah terminal, karakter teks, file, dan path.
- **Tipe utama:** **V19 — ASCII Art**. Tidak ada tipe aksen; pertahankan satu tanda tangan material.
- **Resep V19:** satu medan `<pre>` ASCII per scene, grid 20×45 karakter (900 sel), monospace IBM Plex Mono, karakter dari jarang ke padat membentuk cabang direktori, panel, jalur scan, dan siluet file. Posisi dan pergantian karakter diturunkan dari seed tetap; semua keyframe disiapkan sebelum timeline berjalan. Pergantian pola dilakukan dengan GSAP `tl.call()` / update deterministik, bukan timer dinding.
- **Batas:** 20×45 sel per medan, jauh di bawah batas 64×100. Grid adalah material visual; teks instruksi foreground tetap jelas dan kontras tinggi. Tidak menggunakan efek noise atau filter animatif.

### 3.2 Status rotasi Registry

Snapshot Registry pada MASTER-PROMPT v2.2 menunjukkan tiga video terakhir memakai V2, V10, dan V2. V19 tidak muncul pada tiga baris terakhir yang memiliki kode V, sehingga lolos berdasarkan snapshot. Snapshot tidak mencatat riwayat penggunaan V19 dan V5 secara lengkap; V19 dipilih karena paling sesuai dengan konteks terminal, bukan karena klaim bahwa ia paling lama tidak dipakai.

**`STYLE-LEDGER.md` belum tersedia di konteks kerja ini.** Sebelum render, agent wajib memeriksa ledger aktual. Bila ledger menunjukkan V19 termasuk tiga tipe terakhir, hentikan dan laporkan konflik ke pemilik proyek; jangan mengganti tipe sendiri. Snapshot mungkin basi dan ledger menang.

### 3.3 Palet — P3 Cobalt Blueprint

| Token | Nilai | Makna tetap |
|---|---|---|
| `--ink` | `#0D2B52` | Latar utama, ruang arsip |
| `--line` | `#CFE3FF` | Struktur path, teks utama, garis netral |
| `--signal` | `#FFB703` | Protagonis, cursor, hasil yang sedang dipilih |
| `--alert` | `#FF5D5D` | Hanya mismatch/error atau hasil gagal; bukan aksen dekoratif |

Maksimal empat warna dasar. Tidak ada gradient latar; warna dominan bergeser per babak melalui perpindahan bidang warna, bukan mengubah makna token.

### 3.4 Tipografi — T2

- **Display:** Archivo Expanded / variable (judul, angka, kata kunci); axis `wght` dan `wdth` boleh dianimasikan bila variable WOFF2 tersedia.
- **Aksen:** Newsreader Italic (frasa pendek, maksimal satu kemunculan per scene).
- **Mono:** IBM Plex Mono (command, path, log, label).
- Semua font self-host dari aset repo; jangan bergantung pada pemuatan jaringan saat render.

### 3.5 Canvas, safe zone, dan CSS

```css
:root {
  --ink: #0D2B52;
  --line: #CFE3FF;
  --signal: #FFB703;
  --alert: #FF5D5D;
  --font-display: "Archivo";
  --font-accent: "Newsreader";
  --font-mono: "IBM Plex Mono";
}

html, body {
  width: 1080px;
  height: 1920px;
  margin: 0;
  overflow: hidden;
  background: var(--ink);
}

#safe {
  position: absolute;
  left: 72px;
  top: 240px;
  width: 880px;
  height: 1220px;
  overflow: hidden;
}

.ascii-field {
  white-space: pre;
  font-family: var(--font-mono);
  font-size: 32px;
  line-height: 1.12;
  color: var(--line);
  opacity: 0.16;
  pointer-events: none;
}
```

- Safe zone wajib: x=72–952, y=240–1460.
- Semua teks foreground minimal 32px; tidak ada baris melewati 880px.
- ASCII grid 45 kolom × 20 baris; lebar aktual harus diukur setelah font dimuat dan tidak boleh melewati 880px.
- Teks utama ditahan tetap saat dibaca; kamera dan ambient boleh bergerak halus.

### 3.6 Skala tipografi

| Jenis | Ukuran | Penggunaan |
|---|---:|---|
| Display hero | 224px | `CAT`, `LESS`, `GREP`, `FIND` / angka dekoratif skala |
| Headline | 112px | Satu klaim per beat |
| Subhead | 64px | Penjelas pendek |
| Command / contoh | 40px | Sintaks terminal; pecah baris bila perlu |
| Label minimum | 32px | Nomor baris, key hint, label path |

Kontras skala per scene: 224:32 = **7:1**. Semua baris diuji agar tidak melewati 880px.

### 3.7 Teknik teks yang dipakai

| Kode | Teknik | Scene | Pemakaian |
|---|---|---|---|
| M6 | Word slam | S1, S5 | Kata hook dan kata “EMPAT” |
| M7 | Scramble/decode ber-seed | S1 | Pertanyaan muncul dari karakter path |
| M1 | Mask reveal | S2, S8 | Contoh dan ringkasan |
| M12 | Per-karakter drop | S2 | `cat` dan nomor baris |
| M3 | Terminal cut + type | S3, S6 | Perintah yang diketik |
| M5 | Slide-snap | S3, S7 | Halaman dan kartu keputusan |
| M2 | Bar-wipe | S4, S5 | Pemindaian baris cocok |
| M9 | Counter / split-flap angka | S4, S8 | Nomor baris dan empat alat |
| M8 | Variable-font morph | S5 | Kata `FIND` mengembang menjadi peta |
| M10 | Slice | S7 | Empat pertanyaan berubah menjadi jawaban |

Tidak ada teknik teks utama yang sama pada dua scene berurutan. Masing-masing teknik hanya digunakan sesuai makna, bukan sekadar variasi dekoratif.

### 3.8 Preset kamera

| Kode | Parameter proyek | Penggunaan |
|---|---|---|
| C1 | Push-in scale 1.00→1.08 | Hook / penegasan |
| C2 | Pull-back scale 1.12→1.00 | Reveal struktur utuh |
| C3 | Pan horizontal/vertikal 0→-120px | Mengikuti path atau halaman |
| C4 | Rack focus; blur maksimum 4px pada satu elemen selama ≤0.6s | Menyorot baris hasil grep |
| C5 | Tilt semu `rotateY` maksimum 5° + parallax | Kartu command pada wow map |
| C6 | Parallax shift layer 0.2× / 0.6× / 1.2× | Kamera bergerak tanpa 3D berat |
| C8 | Zoom-through scale 1.05→1.35 lalu morph | Match-cut menuju scene berikutnya |

Setiap scene wajib memakai satu preset kamera. Nilai `translate` dan scale dijalankan di wrapper `#cam`; teks utama harus tetap di safe zone.

### 3.9 Transisi

| Kode | Transisi | Fungsi dalam video |
|---|---|---|
| X2 | Match-cut / SVG morph | Token file atau garis path berubah menjadi bentuk scene berikutnya |
| X8 | Zoom-through | Masuk ke dalam baris hasil grep |
| X9 | Scale-fill | Baris hasil berubah menjadi cabang direktori |
| X5 | Push / cover CSS | Beralih dari peta ke contoh command gabungan |
| X7 | 3D flip CSS | Membalik pertanyaan menjadi jawaban |
| X4 | Iris | Menutup pada token file untuk loop akhir |

Enam jenis transisi direncanakan; X2 dipakai minimal dua kali. Shader WebGL tidak diperlukan.

### 3.10 Ambient dan bahasa gerak

| Kode | Ambient | Batas |
|---|---|---|
| A3 | ASCII grid / titik path drift | Kecepatan rendah; opacity stabil |
| A4 | Scan line horizontal | Satu garis, opacity rendah |
| A6 | Caret terminal berkedip | Maksimal 4 kedip terbatas per scene; bukan infinite repeat |
| A8 | Shimmer garis rute | Hanya satu sweep pendek; bukan glow blur |

- **Primer:** perubahan isi atau struktur ASCII sesuai tugas command.
- **Sekunder:** token file bereaksi (offset, overshoot, follow-through 0.1–0.2s).
- **Ambient:** drift path, scan line, atau caret berjalan sepanjang scene.
- Easing maksimum tiga jenis per scene: `power4.out` untuk masuk, `power2.inOut` untuk kamera/transisi, `back.out(1.7)` untuk impact.
- Semua posisi dan urutan karakter berasal dari seed tetap; tidak ada `Math.random()`.

### 3.11 Elemen persisten

1. Token file `app.log` (kecil, oranye) — protagonis seluruh perjalanan.
2. Breadcrumb path `./logs/app.log` — muncul ketika konteks lokasi diperlukan.
3. Indikator scene `01/08` — 32px minimum, berada di safe zone.

## 4. Event Map dan Peta Scene

### 4.1 Peta scene

| Scene | Waktu absolut | Durasi | Nama | Latar | Layout dominan | Kamera | Transisi masuk | Wow / interrupt | Jumlah kejadian |
|---|---:|---:|---|---|---|---|---|---|---:|
| S1 | 0–6s | 6s | File ada, isi misteri | Ink + ASCII corridor | Hook besar + token file | C1 | Cold open | Jalur arsip bercabang | 6 |
| S2 | 6–15s | 9s | `cat`: baca langsung | Ink + lembar konten | Terminal + lembar isi | C6 | X2 | Seluruh isi terbentang sekaligus | 8 |
| S3 | 15–24s | 9s | `less`: jelajahi panjang | Ink + tumpukan halaman | Pager / window baca | C3 | X2 | Pencarian `/error` melompat ke baris | 8 |
| S4 | 24–34s | 10s | `grep`: cari teks | Ink + scan corridor | Baris log bertingkat | C4 | X8 | Baris cocok menyala, lainnya redup | 9 |
| S5 | 34–44s | 10s | `find`: cari berkas | Cobalt + pohon path | Denah arsip → empat kuadran | C2 | X9 | **Wow di t=39s (52%)** | 9 |
| S6 | 44–54s | 10s | Rangkai `find` + `grep` | Ink + jalur ganda | Terminal dua baris + output | C5 | X5 | Hasil path masuk ke pemindai grep | 9 |
| S7 | 54–64s | 10s | Kapan pakai yang mana? | Cobalt terang | Peta keputusan empat kartu | C8 | X7 | **Payoff di t=60s (80%)** | 9 |
| S8 | 64–75s | 11s | Ringkas dan ingat | Cobalt → ink | Empat pasangan + token | C1 | X4 | Empat kartu menyatu, loop | 10 |

Total durasi scene = **75 detik**. Semua batas scene berada pada kelipatan 0.5 detik. Maksimal jarak antar-event dalam tabel detail adalah 1.2 detik.

### 4.2 Event Map — beat global

| Waktu | Event | Lapisan | Fungsi |
|---:|---|---|---|
| 0.0s | Token `app.log` bergerak dan hook word-slam masuk | Depan + kamera | Gerak pada frame pertama |
| 5.5s | Token berubah jadi kursor `cat` | Semua | Match-cut ke contoh pertama |
| 14.5s | Lembar isi terlipat jadi halaman | Semua | Match-cut `cat` → `less` |
| 23.5s | Satu baris membesar dan memenuhi frame | Semua | Zoom-through ke `grep` |
| 33.5s | Garis nomor baris berubah menjadi cabang path | Semua | Match-cut `grep` → `find` |
| **39.0s** | Denah arsip zoom-out menjadi peta empat command | Semua | **Wow moment; 4 lapisan impact** |
| 43.5s | Peta menutup menjadi prompt terminal | Semua | Transisi ke contoh gabungan |
| 53.5s | Dua kartu terbalik menjadi empat pertanyaan | Semua | Transisi ke payoff |
| **60.0s** | Peta keputusan menampilkan jawaban lengkap | Tengah + kamera | **Payoff open loop** |
| 74.5s | Token `app.log` kembali ke posisi frame awal | Semua | Seamless loop |

### 4.3 Kurva energi musik

- **0–24s — tertahan / low-pass:** bass rendah, tick terminal ringan, ruang untuk memahami command pertama dan kedua.
- **24–39s — build:** pulse scan dan riser 1–2 detik sebelum wow.
- **39–54s — terbuka:** full-band hit pada reveal, lalu groove stabil untuk command gabungan.
- **54–64s — resolve tertahan:** drop singkat sebelum peta keputusan, lalu harmoni hangat saat jawaban muncul.
- **64–75s — resolve:** motif musik kembali sederhana; akhir menyambung ke intro.

## 5. Detail Scene

> Catatan koordinat: semua posisi x/y memakai piksel dari sudut kiri-atas canvas. Semua elemen foreground berada di safe zone x=72–952, y=240–1460. Angka `t` pada Event Map di bawah adalah waktu lokal scene.

### S1 · FILE ADA, ISI MISTERI (0–6s, durasi 6s) · latar P3 ink

**Tujuan:** Membuka masalah dan pertanyaan pemilihan command.

**VO:** “File-nya ada, tapi bagian yang kamu cari di mana? Empat perintah ini punya tugas berbeda.”

**Dunia visual / protagonis:** Lorong arsip ASCII terbentuk dari cabang `/home/project/logs/`. Token `app.log` bergerak di antara cabang, berhenti di persimpangan. Empat lorong belum diberi nama.

**Lapisan:**
- Latar: bidang `--ink`, ASCII tree 20×45 (parallax 0.15×).
- Tengah: cabang direktori dan garis rute (0.6×).
- Depan: token `app.log`, headline, cursor (1.2×).
- Overlay: scan line A4 + vignette statis (0.05×).

**Kamera:** C1 push-in 1.00→1.08 sepanjang 6s; `translateX` 0→-18px; tidak menggeser headline keluar safe zone.

**Layout:**

| Elemen | x | y | w | h | Font / ukuran | Warna |
|---|---:|---:|---:|---:|---|---|
| Headline “FILE-NYA ADA.” | 96 | 300 | 850 | 150 | Archivo 112px | `--line` |
| Headline “ISINYA?” | 96 | 438 | 850 | 230 | Archivo 224px | `--signal` |
| ASCII corridor | 108 | 690 | 864 | 720 | IBM Plex Mono 32px | `--line`, opacity 0.16 |
| Token `app.log` | 220 | 1050 | 300 | 64 | IBM Plex Mono 40px | `--signal` |
| Label `01/08` | 850 | 1400 | 90 | 40 | IBM Plex Mono 32px | `--line` |

Skala terbesar:terkecil = 224:32 = **7:1**.

**Gerak:** Primer: lorong ASCII tumbuh ke kanan. Sekunder: token file meluncur lalu overshoot 8px dan settle. Ambient: scan line bergerak pelan.

**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Depan | Token file bergerak masuk bersamaan dengan kata “FILE-NYA” | M6 | `back.out(1.7)` | 0.35s | Thud ringan |
| 0.8 | Tengah | Cabang path ASCII terbentuk dari titik awal | draw / A3 | `power2.inOut` | 0.45s | Tick beruntun |
| 1.6 | Depan | Headline “ADA.” masuk dari mask bawah | M1 | `power4.out` | 0.40s | Whoosh pendek |
| 2.4 | Tengah | Token berhenti di simpang; tiga jalur bercabang | C6 | `power2.inOut` | 0.40s | Klik |
| 3.2 | Depan | “ISINYA?” slam ke depan | M6 | `back.out(1.7)` | 0.35s | Bass hit |
| 4.4 | Tengah | Karakter ASCII membentuk empat slot kosong | M7 | `steps(8)` | 0.45s | Decode ticks |
| 5.5 | Semua | Token berubah menjadi tanda `>` pada prompt scene berikutnya | X2 | `power2.inOut` | 0.40s | Swish |

**Catalog block:** cek `/hyperframes-registry` untuk: terminal prompt, ASCII/text field, kinetic type. Jangan mengarang ID. Retint ke P3.

**Impact:** Pada 3.2s: kata `ISINYA?` scale 1.12→1.0, kamera kick +3%, thud tepat pada frame pertama, musik hit singkat. Reaksi token terlambat 0.12s.

**Elemen opsional:** scan line kedua dan partikel titik tambahan.

**Match cut ke scene berikutnya:** tanda `>` pada prompt menjadi bentuk kurung sudut di kartu `cat`.

### S2 · `cat`: BACA LANGSUNG (6–15s, durasi 9s) · latar P3 ink

**Tujuan:** Memperlihatkan `cat` sebagai cara singkat menampilkan isi file yang sudah diketahui.

**VO:** “Kalau nama file sudah jelas dan isinya pendek, pakai cat. Ia menampilkan isi file langsung ke terminal. Opsi -n menambahkan nomor baris.”

**Dunia visual / protagonis:** Lorong arsip berubah menjadi meja baca. Token `notes.txt` terbuka dan seluruh lembar isi tampil sekaligus; nomor baris masuk sebagai kolom kiri setelah `-n`.

**Lapisan:**
- Latar: ASCII folder texture (0.15×).
- Tengah: panel terminal dan lembar teks (0.6×).
- Depan: token file dan nomor baris (1.2×).
- Overlay: caret A6 dan scan line tipis (0.05×).

**Kamera:** C6 parallax shift, layer depan 1.2× bergerak 24px, tengah 0.6× bergerak 12px, latar 0.15× bergerak 3px selama 9s.

**Layout:**

| Elemen | x | y | w | h | Font / ukuran | Warna |
|---|---:|---:|---:|---:|---|---|
| Hero `CAT` | 96 | 280 | 850 | 220 | Archivo 224px | `--signal` |
| Command `cat -n notes.txt` | 104 | 560 | 840 | 64 | IBM Plex Mono 40px | `--line` |
| Panel output 5 baris | 104 | 680 | 840 | 420 | IBM Plex Mono 32px | `--line` |
| Nomor baris | 104 | 680 | 70 | 420 | IBM Plex Mono 32px | `--signal` |
| Label `FILE KECIL / SUDAH DIKENAL` | 104 | 1180 | 840 | 64 | IBM Plex Mono 32px | `--line` |
| Indikator scene | 850 | 1400 | 90 | 40 | IBM Plex Mono 32px | `--line` |

Skala terbesar:terkecil = 224:32 = **7:1**.

**Gerak:** Primer: lembar output tampil cepat dalam satu aliran. Sekunder: nomor baris masuk sesudah teks utama. Ambient: caret berkedip terbatas.

**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Tengah | Kurung prompt morph menjadi `cat` | X2 + M1 | `power4.out` | 0.40s | Klik terminal |
| 1.0 | Depan | `CAT` muncul sebagai headline | M12 | `back.out(1.7)` | 0.45s | Thump |
| 2.0 | Tengah | `cat -n notes.txt` diketik | M3 | `steps(14)` | 0.65s | Foley ketik |
| 3.1 | Tengah | Seluruh isi file masuk sekaligus ke panel | M1 | `power4.out` | 0.50s | Paper flick |
| 4.2 | Depan | Kolom nomor baris muncul satu per satu | M12 | `back.out(1.7)` | 0.40s | Tick x5 |
| 5.4 | Tengah | Token `notes.txt` berhenti; output tidak berpindah halaman | A3 | `sine.inOut` | 0.45s | Low click |
| 6.6 | Depan | Label “FILE PENDEK” dan “ISI LANGSUNG” saling mengunci | M1 | `power4.out` | 0.45s | Stamp |
| 7.8 | Semua | Lembar output melipat menjadi tumpukan halaman | X2 | `power2.inOut` | 0.55s | Page fold |
| 8.7 | Kamera | Dorong kamera ke satu halaman untuk S3 | C8 | `power2.inOut` | 0.25s | Whoosh |

**Catalog block:** cek registry untuk: terminal/code typing, text panel, page transition. Retint ke P3.

**Impact:** Pada 3.1s, lembar output mengembang 1.08→1.0; kamera kick +3%; SFX paper flick; musik memberi hit ringan. Nomor baris bereaksi 0.12s setelah lembar.

**Elemen opsional:** highlight nomor baris kedua dan tekstur kertas digital.

**Match cut ke scene berikutnya:** lembar isi melipat menjadi halaman berlapis yang dapat digulir di `less`.

### S3 · `less`: JELAJAHI FILE PANJANG (15–24s, durasi 9s) · latar P3 ink

**Tujuan:** Menjelaskan bahwa `less` cocok untuk menelusuri file panjang dan menyediakan navigasi pencarian.

**VO:** “Untuk file panjang, pakai less. Gulir halaman, cari dengan garis miring, tekan n untuk hasil berikutnya, lalu q untuk keluar.”

**Dunia visual / protagonis:** `app.log` menjadi buku halaman tanpa akhir. Jendela baca bergerak di atasnya; pencarian `/error` melompat ke satu baris, `n` ke hasil berikutnya, `q` menutup pager.

**Lapisan:**
- Latar: tumpukan halaman ASCII (0.15×).
- Tengah: jendela pager dan baris log (0.6×).
- Depan: search caret, key hints `/`, `n`, `q` (1.2×).
- Overlay: A6 caret dan A4 scan line (0.05×).

**Kamera:** C3 pan vertikal 0→-110px menyusuri halaman; berhenti saat hasil pencarian ditemukan. Tidak ada scroll saat teks yang dibaca sedang tampil.

**Layout:**

| Elemen | x | y | w | h | Font / ukuran | Warna |
|---|---:|---:|---:|---:|---|---|
| Hero `LESS` | 96 | 270 | 850 | 220 | Archivo 224px | `--signal` |
| Command `less logs/app.log` | 104 | 550 | 840 | 64 | IBM Plex Mono 40px | `--line` |
| Pager window | 104 | 660 | 840 | 470 | IBM Plex Mono 32px | `--line` |
| Key hint `/error  →  n  →  q` | 104 | 1190 | 840 | 64 | IBM Plex Mono 40px | `--signal` |
| Label `NAVIGASI FILE PANJANG` | 104 | 1280 | 840 | 48 | IBM Plex Mono 32px | `--line` |

Skala terbesar:terkecil = 224:32 = **7:1**.

**Gerak:** Primer: window pager berpindah di sepanjang dokumen. Sekunder: token file mengikuti window dengan offset kecil. Ambient: caret berkedip terbatas dan halaman belakang drift perlahan.

**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Tengah | Tumpukan lembar menjadi pager `less` | X2 | `power2.inOut` | 0.45s | Page snap |
| 1.0 | Depan | `LESS` muncul dengan mask horizontal | M1 | `power4.out` | 0.40s | Whoosh |
| 2.0 | Tengah | Command `less logs/app.log` diketik | M3 | `steps(18)` | 0.70s | Foley ketik |
| 3.0 | Tengah | Jendela baca bergerak satu halaman | M5 | `power2.inOut` | 0.45s | Page slide |
| 4.0 | Depan | Prompt `/error` muncul; satu baris disorot | M3 | `steps(8)` | 0.40s | Search beep |
| 5.0 | Tengah | Tombol `n` memindahkan highlight ke hasil berikutnya | M5 | `power2.inOut` | 0.45s | Tick |
| 6.1 | Depan | Tombol `q` menutup jendela pager | M12 | `back.out(1.7)` | 0.35s | Soft key click |
| 7.2 | Kamera | Pan memperlihatkan panjang dokumen di belakang window | C3 | `power2.inOut` | 0.50s | Whoosh rendah |
| 8.3 | Semua | Baris yang disorot membesar menjadi koridor scan | X8 | `power2.inOut` | 0.45s | Zoom-through |

**Catalog block:** cek registry untuk: terminal command typing, pager/window UI, text highlight. Retint ke P3.

**Impact:** Pada 4.0s, baris `ERROR` scale 1.10→1.0, kamera kick +3%, search beep tepat saat highlight aktif, musik menambah pulse. Background tetap bergerak halus.

**Elemen opsional:** halaman latar tambahan dan indikator persentase dokumen.

**Match cut ke scene berikutnya:** baris yang dipilih oleh `/error` memenuhi frame lalu berubah menjadi daftar hasil `grep`.

### S4 · `grep`: CARI TEKS DI DALAM FILE (24–34s, durasi 10s) · latar P3 ink

**Tujuan:** Membuat jelas bahwa `grep` mencari pola di isi file dan menampilkan baris yang cocok.

**VO:** “Mau menemukan baris berisi kata tertentu? grep mencari pola di dalam isi file. Tambahkan -n untuk nomor baris, dan -i agar kapital tidak jadi masalah.”

**Dunia visual / protagonis:** Koridor scan terdiri dari baris log. Scanner bergerak dari atas ke bawah; baris `ERROR` dan `FAILED` tersorot sementara baris lain tetap terlihat redup, bukan dihapus dari dunia visual.

**Lapisan:**
- Latar: ASCII row field (0.15×).
- Tengah: daftar baris log (0.6×).
- Depan: scanner, hasil cocok, nomor baris (1.2×).
- Overlay: satu scan line A4 (0.05×).

**Kamera:** C4 rack focus: blur maksimum 4px pada baris non-target selama 0.45s; satu elemen blur aktif pada satu waktu. Setelah fokus, push 1.04→1.08.

**Layout:**

| Elemen | x | y | w | h | Font / ukuran | Warna |
|---|---:|---:|---:|---:|---|---|
| Hero `GREP` | 96 | 270 | 850 | 220 | Archivo 224px | `--signal` |
| Command `grep -nEi 'error|failed' logs/app.log` | 96 | 540 | 880 | 96 | IBM Plex Mono 32px | `--line` |
| Daftar baris log | 104 | 680 | 840 | 430 | IBM Plex Mono 32px | `--line` |
| Nomor baris hasil | 104 | 1120 | 840 | 64 | IBM Plex Mono 40px | `--signal` |
| Label `MATCH = BARIS COCOK` | 104 | 1240 | 840 | 56 | IBM Plex Mono 32px | `--line` |

Skala terbesar:terkecil = 224:32 = **7:1**.

**Gerak:** Primer: scanner melewati baris dan menahan pada match. Sekunder: nomor baris melompat ke depan 10px lalu settle. Ambient: scan line dan ASCII row drift.

**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Tengah | Baris hasil `less` menyebar menjadi daftar log | X8 | `power2.inOut` | 0.45s | Zoom whoosh |
| 1.0 | Depan | `GREP` muncul dengan word-slam | M6 | `back.out(1.7)` | 0.40s | Thud |
| 2.0 | Tengah | Command grep diketik dalam dua baris visual | M3 | `steps(22)` | 0.70s | Foley ketik |
| 3.1 | Tengah | Scanner bergerak melintasi baris pertama | A4 | `power2.inOut` | 0.50s | Scan sweep |
| 4.2 | Tengah | Baris `ERROR` menyala, lainnya meredup | M2 | `power4.out` | 0.40s | Alert tick |
| 5.3 | Depan | `-n` menarik nomor baris ke depan | M9 | `steps(5)` | 0.35s | Counter tick |
| 6.4 | Depan | `-i` membalik `error` dan `ERROR` menjadi satu kategori | M8 | `power2.inOut` | 0.45s | Toggle click |
| 7.5 | Tengah | Baris `FAILED` ikut menyala sebagai match kedua | M2 | `power4.out` | 0.40s | Double tick |
| 8.7 | Semua | Garis nomor baris memanjang menjadi cabang pohon file | X9 | `power2.inOut` | 0.55s | Morph swish |

**Catalog block:** cek registry untuk: code/terminal text, scan-line reveal, focus highlight. Retint ke P3.

**Impact:** Pada 4.2s: baris match scale 1.10→1.0; kamera kick +3%; alert tick + hit musik; baris tetangga memberi offset kecil 0.12s setelah impact.

**Elemen opsional:** baris log latar di luar dua hasil match dan blur rack-focus (fallback ke opacity jika render berat).

**Match cut ke scene berikutnya:** nomor baris hasil menjadi garis cabang pohon direktori; kamera zoom keluar dari isi ke lokasi file.

### S5 · `find`: CARI BERKAS (34–44s, durasi 10s) · latar P3 cobalt

**Tujuan:** Menjelaskan bahwa `find` menelusuri direktori untuk menemukan berkas berdasarkan kriteria, lalu mengadakan wow reveal peta keputusan.

**VO:** “Tapi bila nama file atau lokasinya belum diketahui, gunakan find. Ia menelusuri folder dan bisa menyaring nama serta tipe file.”

**Dunia visual / protagonis:** Kamera keluar dari satu baris ke denah pohon direktori. Token `app.log` ditemukan di cabang `./logs/`. Setelah ditemukan, pohon melebar dan berubah menjadi peta empat alat.

**Lapisan:**
- Latar: pohon direktori ASCII (0.15×).
- Tengah: cabang path, filter nama/tipe, empat kartu keputusan (0.6×).
- Depan: token `app.log`, cursor, label `-type f` (1.2×).
- Overlay: sweep A8 berupa garis statis yang berpindah posisi, tanpa blur (0.05×).

**Kamera:** C2 pull-back scale 1.18→1.00 selama 10s; pada wow t=5s, kamera berhenti 0.2s lalu pull-back tambahan 1.08→1.00. Empat kartu mendapat tilt semu maksimal 5°.

**Layout:**

| Elemen | x | y | w | h | Font / ukuran | Warna |
|---|---:|---:|---:|---:|---|---|
| Hero `FIND` | 96 | 270 | 850 | 220 | Archivo 224px | `--signal` |
| Command `find . -type f -name '*.log'` | 96 | 540 | 880 | 64 | IBM Plex Mono 40px | `--line` |
| Pohon direktori | 104 | 650 | 840 | 380 | IBM Plex Mono 32px | `--line` |
| Empat kartu keputusan | 104 | 1080 | 840 | 270 | Archivo 64px + mono 32px | `--line`, `--signal` |
| Label `NAMA / TIPE / LOKASI` | 104 | 1380 | 840 | 40 | IBM Plex Mono 32px | `--line` |

Skala terbesar:terkecil = 224:32 = **7:1**.

**Gerak:** Primer: pohon direktori terbuka berdasarkan kriteria `-type f` dan pola `'*.log'`. Sekunder: token file melompat ke cabang yang cocok. Ambient: cabang latar drift lembut.

**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Tengah | Garis hasil grep membentuk cabang direktori | X9 | `power2.inOut` | 0.45s | Branch draw |
| 1.0 | Depan | `FIND` muncul dan melebar | M8 | `power4.out` | 0.50s | Rising click |
| 2.0 | Tengah | `find . -type f -name '*.log'` diketik | M3 | `steps(25)` | 0.65s | Foley ketik |
| 3.0 | Tengah | Pola `'*.log'` diberi bingkai quote | M2 | `power4.out` | 0.35s | Bracket snap |
| 4.0 | Tengah | Folder yang bukan regular file meredup; file `.log` tetap | M5 | `power2.inOut` | 0.45s | Filter sweep |
| **5.0** | **Semua** | **Wow: kamera pull-back; pohon menjadi peta empat kuadran `cat / less / grep / find`** | **C2 + X2 + M6** | **`expo.out`** | **0.55s** | **Impact + riser release** |
| 6.0 | Depan | Empat kartu masuk dengan stagger singkat | M5 | `back.out(1.7)` | 0.45s | Four ticks |
| 7.1 | Tengah | Token bergerak ke kartu `find` lalu menunjuk kartu `grep` untuk pencarian isi | C5 | `power2.inOut` | 0.50s | Route pulse |
| 8.3 | Semua | Peta menutup menjadi prompt command gabungan | X5 | `power2.inOut` | 0.50s | Panel cover |
| 9.5 | Kamera | Kamera mengunci prompt gabungan di tengah safe zone sebelum cut | C2 | `sine.inOut` | 0.30s | Low whoosh |

**Catalog block:** cek registry untuk: tree/graph layout, isometric/panel cards, morph transition. Retint P3; hindari shader.

**Impact / wow 4 lapisan:** visual: pohon menjadi empat kuadran dalam scale 1.12→1.0; kamera: kick +3% lalu settle; SFX: low thud + empat klik berurutan; musik: riser 1.5s sebelumnya lalu full-band hit tepat pada frame reveal. Setelah hit, jeda berisi 0.4s; kamera dan ambient tetap bergerak.

**Elemen opsional:** tilt kartu 3D, cabang pohon tambahan, sweep A8 kedua.

**Match cut ke scene berikutnya:** empat kartu dipersempit menjadi contoh alur `find` → `grep`.

### S6 · RANGKAI `find` + `grep` (44–54s, durasi 10s) · latar P3 ink

**Tujuan:** Menunjukkan bahwa `find` dapat memilih berkas, lalu `grep` mencari teks di dalam berkas hasil pilihan.

**VO:** “Lihat bedanya: find memilih berkas, grep memeriksa baris di dalamnya. Gabungkan keduanya, dan kamu bisa mencari kata error hanya pada file log.”

**Dunia visual / protagonis:** Token `app.log` melewati gerbang `find`; daftar file hasil masuk ke scanner `grep`. Tampilkan command bertahap, jangan menampilkan semua token sekaligus.

**Lapisan:**
- Latar: ASCII folder grid (0.15×).
- Tengah: daftar file dan terminal command (0.6×).
- Depan: token hasil dan baris `error` (1.2×).
- Overlay: caret A6 dan garis route A3 (0.05×).

**Kamera:** C5 tilt semu `rotateY` 0→5° pada kartu hasil, lalu kembali 0°; perspektif hanya CSS ringan, tanpa Three.js.

**Layout:**

| Elemen | x | y | w | h | Font / ukuran | Warna |
|---|---:|---:|---:|---:|---|---|
| Headline `FIND → GREP` | 96 | 270 | 850 | 140 | Archivo 112px | `--signal` |
| Command baris 1 | 96 | 500 | 880 | 56 | IBM Plex Mono 32px | `--line` |
| Command baris 2 | 96 | 560 | 880 | 56 | IBM Plex Mono 32px | `--line` |
| Daftar file hasil | 104 | 720 | 840 | 280 | IBM Plex Mono 32px | `--line` |
| Match `error` + nama file:baris | 104 | 1080 | 840 | 160 | IBM Plex Mono 40px | `--signal` |
| Label `FILE TERPILIH → BARIS COCOK` | 104 | 1300 | 840 | 64 | IBM Plex Mono 32px | `--line` |

Command ditampilkan dalam dua baris visual yang merupakan satu command shell dengan line continuation:

```bash
find ./logs -type f -name '*.log' \
  -exec grep -nH error {} +
```

Skala terbesar:terkecil = 112:32 = **3.5:1** belum cukup; tambahkan angka latar `02` pada Archivo 224px di x=710, y=760, opacity 0.12. Rasio final 224:32 = **7:1**.

**Gerak:** Primer: file hasil `find` masuk ke proses grep. Sekunder: hasil match muncul setelah nama file dan nomor baris. Ambient: caret terbatas dan route line drift.

**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Semua | Empat kartu menutup menjadi terminal panel | X5 | `power2.inOut` | 0.45s | Panel slide |
| 1.0 | Depan | Headline `FIND → GREP` masuk | M1 | `power4.out` | 0.40s | Whoosh |
| 2.0 | Tengah | Baris pertama command diketik | M3 | `steps(22)` | 0.55s | Foley ketik |
| 3.0 | Tengah | Baris kedua `-exec grep...` muncul | M3 | `steps(20)` | 0.55s | Foley ketik |
| 4.0 | Tengah | Cabang `./logs` menghasilkan token berkas | A3 | `power2.inOut` | 0.45s | File ticks |
| 5.0 | Tengah | Token masuk ke scanner grep | C5 | `power2.inOut` | 0.45s | Scan start |
| 6.0 | Depan | Baris dengan `error` dan nomor baris muncul | M2 | `power4.out` | 0.40s | Match beep |
| 7.0 | Tengah | Label memperjelas `find = berkas`, `grep = isi` | M5 | `power2.inOut` | 0.45s | Two clicks |
| 8.2 | Semua | Dua jalur menjadi kartu pertanyaan | X7 | `power2.inOut` | 0.50s | Flip whoosh |
| 9.4 | Kamera | Panel berhenti pada framing simetris untuk payoff berikutnya | C6 | `sine.inOut` | 0.30s | Soft settle |

**Catalog block:** cek registry untuk: command terminal, text highlight, split card/flip. Retint P3.

**Impact:** Pada 6.0s: output match scale 1.10→1.0; kamera kick +3%; match beep; musik hit singkat. Nama file dan nomor baris muncul dalam 0.12s sesudah baris match.

**Elemen opsional:** animasi tilt kartu, tambahan token hasil, caret blink kedua.

**Match cut ke scene berikutnya:** dua jalur `find` dan `grep` menjadi empat kartu pertanyaan pada peta keputusan.

### S7 · KAPAN PAKAI YANG MANA? (54–64s, durasi 10s) · latar P3 cobalt terang

**Tujuan:** Membayar open loop dengan peta keputusan yang mudah diingat.

**VO:** “Jadi, tentukan dulu pertanyaannya: ingin membaca cepat, menelusuri file panjang, mencari isi, atau mencari nama dan lokasi? Itulah kuncinya.”

**Dunia visual / protagonis:** Empat pertanyaan muncul di empat cabang. Token `app.log` memilih satu cabang sesuai kebutuhan. Setiap cabang berubah menjadi pasangan command dan tugasnya.

**Lapisan:**
- Latar: ASCII decision tree 0.15×.
- Tengah: empat kartu keputusan (0.6×).
- Depan: token dan kata kunci jawaban (1.2×).
- Overlay: vignette statis dan A8 sweep singkat (0.05×).

**Kamera:** C8 zoom-through dari dua kartu ke empat kartu, scale 1.00→1.12 lalu settle 1.05; semua kartu tetap di safe zone.

**Layout:**

| Elemen | x | y | w | h | Font / ukuran | Warna |
|---|---:|---:|---:|---:|---|---|
| Headline `PILIH DARI PERTANYAANNYA` | 96 | 270 | 880 | 120 | Archivo 64px | `--line` |
| Kartu 1 `BACA CEPAT → cat` | 104 | 470 | 840 | 150 | Archivo 64px + mono 40px | `--signal` |
| Kartu 2 `FILE PANJANG → less` | 104 | 650 | 840 | 150 | Archivo 64px + mono 40px | `--line` |
| Kartu 3 `CARI ISI → grep` | 104 | 830 | 840 | 150 | Archivo 64px + mono 40px | `--signal` |
| Kartu 4 `CARI BERKAS → find` | 104 | 1010 | 840 | 150 | Archivo 64px + mono 40px | `--line` |
| Label `4 TUGAS / 4 ALAT` | 104 | 1260 | 840 | 72 | IBM Plex Mono 40px | `--line` |
| Indikator scene | 850 | 1400 | 90 | 40 | IBM Plex Mono 32px | `--line` |

Skala terbesar:terkecil = 224:32 = **7:1**; angka latar `04` berukuran 224px opacity 0.12 di belakang kartu.

**Gerak:** Primer: tiap pertanyaan flip menjadi jawaban command. Sekunder: token melompat ke kartu sesuai rute. Ambient: decision tree drift lambat.

**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Semua | Dua kartu jalur membuka menjadi empat cabang | X7 | `power2.inOut` | 0.45s | Flip |
| 1.0 | Depan | Headline “PILIH DARI PERTANYAANNYA” masuk | M1 | `power4.out` | 0.40s | Soft whoosh |
| 2.0 | Tengah | Pertanyaan “baca cepat?” muncul | M10 | `power2.inOut` | 0.40s | Slice |
| 3.0 | Tengah | Jawaban `cat` masuk | M12 | `back.out(1.7)` | 0.35s | Tick |
| 4.0 | Tengah | Pertanyaan “file panjang?” berubah jadi `less` | M10 | `power2.inOut` | 0.40s | Slice + tick |
| 5.0 | Tengah | Pertanyaan “cari isi?” berubah jadi `grep` | M10 | `power2.inOut` | 0.40s | Slice + tick |
| 6.0 | Tengah | Pertanyaan “cari berkas?” berubah jadi `find` | M10 | `power2.inOut` | 0.40s | Slice + tick |
| 7.2 | Depan | Token menyapu keempat kartu lalu berhenti di tengah | C8 | `power2.inOut` | 0.45s | Route pulse |
| 8.4 | Semua | Empat pasangan menyatu menjadi ringkasan penutup | X2 | `power2.inOut` | 0.50s | Resolve chord |
| 9.5 | Depan | Token melewati pusat peta dan menuju label akhir | C8 | `power2.inOut` | 0.35s | Route pulse |

**Catalog block:** cek registry untuk: decision tree, flip card, typography slice. Retint P3.

**Impact / payoff:** Pada global 60.0s (lokal 6.0s), empat pasangan jawaban menyala bersama: visual scale 1.10→1.0, kamera kick +3%, empat klik sinkron, musik berpindah ke resolve hangat. Ini menutup open loop pada 80% durasi.

**Elemen opsional:** tilt kartu dan sweep A8 kedua.

**Match cut ke scene berikutnya:** empat kartu menyusut menjadi empat label ringkasan pada satu garis.

### S8 · EMPAT TUGAS, EMPAT ALAT (64–75s, durasi 11s) · latar P3 cobalt → ink

**Tujuan:** Mengunci ringkasan empat command dan menyambungkan akhir ke frame pembuka.

**VO:** “Ingat empat pasangan ini: cat untuk baca cepat, less untuk file panjang, grep untuk isi, dan find untuk berkas. Mulai dari pertanyaannya, bukan dari perintahnya.”

**Dunia visual / protagonis:** Empat label menjadi empat tab arsip; token `app.log` melintas ke tengah dan berubah kembali menjadi chip pada posisi frame pembuka untuk seamless loop.

**Lapisan:**
- Latar: ASCII corridor yang sama seperti S1 (0.15×).
- Tengah: empat label command (0.6×).
- Depan: token `app.log` dan headline akhir (1.2×).
- Overlay: vignette statis, A3 drift (0.05×).

**Kamera:** C1 push-in 1.00→1.06 hingga 10.5s, lalu kembali ke scale/translate frame awal dalam 0.5s terakhir supaya loop bersih.

**Layout:**

| Elemen | x | y | w | h | Font / ukuran | Warna |
|---|---:|---:|---:|---:|---|---|
| Headline `4 TUGAS.` | 96 | 280 | 850 | 150 | Archivo 112px | `--line` |
| Headline `4 ALAT.` | 96 | 420 | 850 | 220 | Archivo 224px | `--signal` |
| Empat label ringkasan | 104 | 760 | 840 | 360 | IBM Plex Mono 40px | `--line` |
| Penutup `MULAI DARI PERTANYAANNYA` | 104 | 1190 | 840 | 64 | Archivo 64px | `--line` |
| Token `app.log` | 220 | 1330 | 300 | 64 | IBM Plex Mono 40px | `--signal` |

Skala terbesar:terkecil = 224:32 = **7:1**.

**Gerak:** Primer: empat label masuk sebagai daftar. Sekunder: token file mengikuti satu garis rute. Ambient: pohon ASCII kembali ke posisi awal.

**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Tengah | Empat pasangan berubah menjadi label ringkas | X2 | `power2.inOut` | 0.45s | Resolve snap |
| 1.0 | Depan | “4 TUGAS.” masuk dengan mask reveal | M1 | `power4.out` | 0.40s | Soft thud |
| 2.0 | Depan | “4 ALAT.” word-slam | M6 | `back.out(1.7)` | 0.40s | Bass hit lembut |
| 3.2 | Tengah | `cat — baca cepat` muncul | M9 | `steps(5)` | 0.35s | Counter tick |
| 4.4 | Tengah | `less — file panjang` muncul | M1 | `power4.out` | 0.40s | Page tick |
| 5.6 | Tengah | `grep — cari isi` muncul | M1 | `power4.out` | 0.40s | Scan tick |
| 6.8 | Tengah | `find — cari berkas` muncul | M1 | `power4.out` | 0.40s | File tick |
| 8.0 | Depan | Headline penutup masuk; token kembali ke jalur awal | M5 | `power2.inOut` | 0.45s | Warm resolve |
| 9.4 | Kamera | Pull-in ke token `app.log` | C1 | `sine.inOut` | 0.50s | Whoosh lembut |
| 10.5 | Semua | Posisi token dan kamera identik dengan frame t=0 | X4 | `power2.inOut` | 0.40s | Tail kembali ke beat awal |

**Catalog block:** cek registry untuk: terminal label, typography reveal, iris/loop transition. Retint P3.

**Impact:** Pada 2.0s, `4 ALAT.` scale 1.10→1.0; kamera kick +2%; thud ringan; musik resolve. Dampak ditahan agar tidak mengalahkan VO.

**Elemen opsional:** garis rute sekunder dan label kecil tambahan.

**Match cut ke scene berikutnya:** akhir sengaja kembali ke komposisi token dan lorong ASCII S1; posisi, skala, dan opacity frame awal harus identik.

## 6. Audio

| Elemen | Spesifikasi |
|---|---|
| Voice-over | ±145 kata/menit; naskah total sekitar 168 kata; tempo aktual 2.24 kata/detik. Suara tenang, akrab, jelas; jeda 0.4s sesudah wow. |
| Musik | 120 BPM; tertahan 0–24s, build 24–39s, terbuka 39–54s, resolve 54–75s. Batas scene tepat di kelipatan 0.5s. |
| Riser | 1.5s menjelang wow di global 39s. |
| Impact | Sinkron visual + kamera + SFX + hit musik dalam ±1 frame @60fps pada wow, payoff, dan dua beat utama. |
| Foley | Ketikan terminal, file tick, page flick, scan beep, klik tombol. Level selalu di bawah VO. |
| Whoosh | Hanya pada zoom-through, pan besar, morph, dan flip. |
| Keheningan | Jeda berisi maksimum 0.4s setelah wow; kamera dan ambient tetap berjalan. |
| Ducking | Musik turun di bawah VO; jangan menutupi nama command atau key hint. |
| Mode tanpa suara | Semua command, fungsi, dan peta keputusan tetap dapat dipahami dari teks. |
| Sumber produksi | VO, musik, dan SFX melalui `/media-use` atau pipeline repo yang tersedia. Jangan memakai musik/SFX berhak cipta tanpa lisensi. |

## 7. Aturan Teknis HyperFrames

### 7.1 Determinisme dan timeline

- Setiap scene dibungkus elemen kamera `#cam`.
- Semua GSAP timeline menggunakan `paused: true` dan didaftarkan ke `window.__timelines`.
- Tidak memakai `Math.random()`, `Date.now()`, `setInterval`, CSS animation berbasis jam dinding, atau `repeat: -1`.
- PRNG memakai seed tetap; posisi awal dan target token, path, serta karakter ASCII dihitung sebelum timeline dibuat.
- Pergantian ASCII frame memakai jadwal tetap / `tl.call()`. Tidak membuat loop timer di browser.
- Render memakai `seek(t, false)` pada callback renderer. Script preview/ukur buatan sendiri juga harus memakai `seek(t, false)`.

### 7.2 Budget render

| Komponen | Batas proyek |
|---|---|
| DOM beranimasi | Target <200 per scene; tidak pernah melebihi ±400 |
| ASCII field | Satu `<pre>` per scene, 20×45 = 900 sel; batas mutlak 64×100 |
| Partikel | Tidak wajib; bila dipakai, maksimum 40 dan deterministik |
| Blur aktif | Maksimum 1 elemen pada S4, radius 4px, durasi ≤0.6s; fallback ke opacity |
| `backdrop-filter` | Dilarang |
| Shader/WebGL | Tidak digunakan |
| Three.js | Tidak digunakan |
| Blend mode | Tidak digunakan |
| Goo filter | Dilarang |
| Grain / texture | Statis; tidak memakai `feTurbulence` animatif |
| Bayangan | `box-shadow` statis atau aset pra-render; bukan filter drop-shadow pada banyak elemen |

### 7.3 Fallback ladder

1. Hapus sweep A8 kedua dan ambient tambahan.
2. Kurangi jumlah baris ASCII, tetapi pertahankan bentuk path yang bermakna.
3. Ganti C4 blur menjadi perubahan opacity.
4. Ganti C5 tilt semu menjadi parallax 2D C6.
5. Pertahankan gerak primer, kamera dasar C1, dan impact empat lapis.

### 7.4 Fixture dan akurasi command

- Siapkan fixture sintetis `notes.txt` dan `logs/app.log`; isinya hanya contoh netral, bukan log produksi. Isi fixture yang diharapkan untuk render:

  `notes.txt` (5 baris):
  ```text
  Linux shell
  cat prints file contents
  less pages through text
  grep matches lines
  find locates paths
  ```

  `logs/app.log` (18 baris; cukup panjang agar `less` benar-benar perlu dinavigasi):
  ```text
  INFO service started
  INFO loading configuration
  INFO cache warmed
  WARN retry budget low
  INFO worker online
  INFO request accepted
  WARN response delayed
  error database timeout
  INFO retry scheduled
  INFO retry succeeded
  INFO queue drained
  WARN disk usage high
  INFO cleanup complete
  INFO health check passed
  INFO connection closed
  INFO job resumed
  FAILED backup check
  INFO service ready
  ```
  Semua baris tersebut adalah data sintetis; jangan menggantinya dengan log produksi.
- Contoh command yang tampil:

```bash
cat -n notes.txt
less logs/app.log
grep -nEi 'error|failed' logs/app.log
find . -type f -name '*.log'
```

- Untuk `less logs/app.log`, tampilkan hint interaksi `/error` + Enter, `n`, dan `q` sebagai key overlay, bukan sebagai bagian command shell.
- `grep -nEi 'error|failed' logs/app.log`: `-n` menampilkan nomor baris, `-i` mengabaikan perbedaan huruf besar/kecil, `-E` mengaktifkan extended regular expression sehingga `|` menjadi alternasi.
- `find . -type f -name '*.log'`: `.` adalah titik awal penelusuran, `-type f` membatasi ke regular file, `-name` mencocokkan nama dasar, dan pola dikutip agar shell tidak mengembangkannya terlebih dahulu.
- Command gabungan S6 adalah satu baris shell yang divisualkan menjadi dua baris:

```bash
find ./logs -type f -name '*.log' \
  -exec grep -nH error {} +
```

`find` memilih regular file `.log`; `-exec ... {} +` menyerahkan daftar hasil ke `grep`; `-nH` meminta nomor baris dan nama file. Contoh ini hanya berjalan pada direktori demo yang disiapkan.
- Semua path demo perlu diverifikasi terhadap setup repo dan diberi penanda `⟦SETUP⟧` sampai file fixture benar-benar tersedia. Jangan menambahkan command yang tidak ada pada bagian 8 atau mengubah contoh tanpa memperbarui sumber.

### 7.5 Batas konten dan kehati-hatian

- Tidak ada kredensial, data pribadi, log produksi, hostname, atau path user sungguhan.
- Tidak menjalankan operasi destruktif atau memodifikasi file sistem.
- Batasi pencarian pada `.` atau `./logs` di fixture demo; jangan memberi contoh `find /` untuk pemula.
- Jangan memberi kesan bahwa `grep` membaca seluruh konteks file seperti `less`; hasil utamanya adalah baris yang cocok.

### 7.6 Alur QA

1. Lint / validate semua scene dan daftar timeline.
2. Pastikan total durasi 75.0s dan seluruh batas scene kelipatan 0.5s.
3. Periksa font self-host, safe zone, lebar teks, dan rasio skala.
4. Snapshot awal, tengah, akhir setiap scene, semua transisi, wow, dan payoff.
5. Verifikasi output command di terminal Linux dengan fixture yang sama; jangan hanya mengandalkan screenshot buatan.
6. Jalankan Boredom Audit bagian 12. Perbaiki kegagalan sebelum render MP4.

## 8. Fakta dan Sumber

### 8.1 Klaim dan verifikasi

| Klaim yang boleh ditampilkan | Dasar dokumentasi | Catatan implementasi |
|---|---|---|
| `cat` menyalin isi file ke standard output; `-n` memberi nomor pada semua baris | GNU Coreutils — `cat` invocation: https://www.gnu.org/software/coreutils/manual/html_node/cat-invocation.html | Contoh `cat -n notes.txt` sesuai fungsi tersebut. Jangan menyebutnya editor. |
| `less` adalah pager untuk menampilkan isi file; `/pattern` mencari ke depan; `q` keluar | Linux man-pages — `less(1)`: https://man7.org/linux/man-pages/man1/less.1.html | Key `n` mengulangi pencarian terakhir; `/pattern` mencari ke depan dan `q` keluar. Cocokkan key binding dengan versi `less` di image render. |
| `grep` memilih baris yang cocok; `-i` mengabaikan kapital; `-n` menampilkan nomor baris; `-r` melakukan pencarian rekursif | GNU Grep manual — Usage dan Command-line options: https://www.gnu.org/software/grep/manual/html_node/Usage.html dan https://www.gnu.org/s/grep/manual/grep.html | Contoh utama memakai `-nEi`; `-r` tidak perlu ditampilkan di layar. |
| `find -name` mencocokkan nama dasar; pola wildcard perlu dikutip; `-type f` berarti regular file | GNU Findutils — Base Name Patterns dan Type: https://www.gnu.org/software/findutils/manual/html_node/find_html/Base-Name-Patterns.html dan https://www.gnu.org/software/findutils/manual/html_node/find_html/Type.html | Path mulai dari `.`; pola ` '*.log' ` wajib dikutip. |
| `find -exec command {} +` mengirim nama-nama hasil sebagai argumen dalam kelompok | GNU Findutils — Multiple Files: https://www.gnu.org/software/findutils/manual/html_node/find_html/Multiple-Files.html | Dipakai hanya pada scene integrasi; jangan mengubahnya menjadi eksekusi destruktif. |

### 8.2 Konflik antar sumber

Tidak ditemukan konflik substansial pada fungsi inti empat command dalam dokumentasi yang diperiksa. Perbedaan versi atau implementasi distribusi dapat memengaruhi opsi tertentu; video menggunakan perilaku dasar GNU/Linux umum. `less` dapat memiliki konfigurasi key binding lokal, sehingga key `n` perlu diuji pada image render final.

### 8.3 Checklist cek ulang sebelum posting

- [ ] Verifikasi versi dan perilaku `less` yang dipasang pada environment render, khususnya `/pattern`, `n`, dan `q`.
- [ ] Pastikan `notes.txt` dan `logs/app.log` fixture tersedia dan path tepat.
- [ ] Jalankan empat command utama dan command gabungan pada fixture yang sama.
- [ ] Pastikan command gabungan ditampilkan dengan continuation `\` yang benar pada baris pertama.
- [ ] Pastikan output `grep` menunjukkan nama file dan nomor baris sesuai fixture.
- [ ] Pastikan tidak ada data log produksi atau informasi privat pada footage terminal.
- [ ] Verifikasi `STYLE-LEDGER.md` sebelum menyetujui tipe visual untuk render.

## 9. Prompt untuk Agent

```text
Using /hyperframes (faceless-explainer workflow) [or /video-reels if available], build the video described in BRIEF.md.

Rules:
- Follow BRIEF.md exactly: scene timing, layout coordinates, copy, colors, fonts, motion codes (M/C/X/A), and event maps. Do NOT improvise design.
- Canvas 1080x1920, 60fps final, 75s total. Use the Design Tokens block as DESIGN.md.
- Self-host Archivo Expanded variable, Newsreader Italic, and IBM Plex Mono. For M8, load variable Archivo WOFF2 and verify its wght/wdth axes.
- Deterministic only: paused GSAP timelines. No Math.random/Date.now/infinite repeats. Use a fixed-seed PRNG for ASCII patterns and token routes; precompute frames/targets before timeline creation.
- Wrap every scene in a camera element (#cam) and implement the camera moves in the brief. Place content in 3-4 depth layers with different parallax factors.
- Before hand-building any transition, effect, caption style, chart, or code animation, consult /hyperframes-registry and install the matching catalog block. Retint catalog blocks to the palette in DESIGN.md. Do NOT invent block IDs.
- Implement every impact as four synchronized layers (visual, camera, SFX, music) within one frame at 60fps.
- Implement V19 ASCII Art consistently in every scene. One 20x45 `<pre>` field per scene; never exceed 64x100 cells. No style switching mid-video.
- Respect the CPU render budget in section 7. If a scene is too heavy, drop elements marked "opsional" first, following the fallback ladder.
- Generate VO, music, and SFX via the pipeline. Sync kinetic text to word-level timestamps from the VO transcript.
- This is a tutorial: never show real credentials, production logs, private paths, or personally identifying data. Use only synthetic demo fixtures.
- Verify `notes.txt` and `logs/app.log` against the repo setup documentation. Replace `⟦SETUP⟧` only after confirming the actual fixture paths.
- Every displayed command, option, path, and key binding must match section 8 and section 7.4 exactly. Run the commands against the synthetic fixture before snapshotting.
- Check `STYLE-LEDGER.md` before finalizing the visual type. The snapshot in this brief may be stale. If V19 conflicts with the last three actual types, STOP and report the conflict; do not choose an alternative without approval.
- Run lint/validate/inspect (if available), then snapshot key frames (start, middle, and end of every scene, plus every transition, wow moment, and payoff). Check against the QA checklist and Boredom Audit, and fix before rendering.
- Render to MP4 only after the checklist passes.
```

## 10. Caption Postingan

Empat command Linux ini punya tugas yang beda:

`cat` buat baca cepat, `less` buat file panjang, `grep` buat cari teks di dalam file, dan `find` buat cari berkas berdasarkan nama atau lokasi. 🔎

Kuncinya: tentukan dulu apa yang mau kamu cari.

#Linux #LinuxPemula #TerminalLinux #CommandLine #BelajarLinux #DeveloperTools

## 11. Catatan Variasi

| Dimensi | Video sebelumnya dalam snapshot | Brief ini | Perbedaan |
|---|---|---|---|
| Tipe visual | V2 — Cutout craft (`struktur-folder-linux`) | **V19 — ASCII Art** | Berbeda |
| Palet | P4 — Riso print | **P3 — Cobalt Blueprint** | Berbeda |
| Tipografi | T3 — Schibsted Grotesk / Fraunces / DM Mono | **T2 — Archivo / Newsreader / IBM Plex Mono** | Berbeda |
| Teknik teks utama | Tidak tercatat di snapshot | M3 terminal type + M1/M2 pendukung | Perlu cek ledger |
| Metafora / dunia | Gedung kertas kriya | Arsip Terminal / pohon direktori ASCII | Berbeda |
| Arketipe layout dominan | Tidak tercatat di snapshot | Peta/denah dunia visual → peta keputusan | Perlu cek ledger |

Dari informasi snapshot, setidaknya **4 dari 6 dimensi** berbeda (tipe visual, palet, tipografi, metafora). Data yang tidak tercatat dibiarkan kosong, bukan ditebak. Tiga video terakhir dalam snapshot memakai V2, V10, V2; V19 tidak termasuk di sana. `STYLE-LEDGER.md` tetap harus diperiksa sebelum render.

**Baris Registry siap-tempel:**

```text
2026-11-05 | baca-cari-isi-file-linux | V19 | — | P3 | T2 (Archivo Expanded + Newsreader Italic + IBM Plex Mono) | Arsip Terminal / pohon direktori ASCII + token app.log
```

## 12. Hasil Boredom Audit

| # | Pemeriksaan | Hasil terukur | Status |
|---:|---|---|---|
| 1 | Celah terbesar antar kejadian visual | **1.4s** maksimum antar-event pada Event Map detail | LULUS |
| 2 | Jumlah teknik teks berbeda | **10 kode**: M1, M2, M3, M5, M6, M7, M8, M9, M10, M12; tidak ada yang sama pada scene berurutan | LULUS |
| 3 | Jumlah jenis transisi berbeda | **6 jenis**: X2, X4, X5, X7, X8, X9; X2/morph digunakan lebih dari dua kali | LULUS |
| 4 | Gerak kamera per scene | **8/8 scene (100%)** memiliki preset kamera | LULUS |
| 5 | Lapisan z/parallax | **8/8 scene** memiliki 4 lapisan dengan parallax berbeda | LULUS |
| 6 | Kontras skala per scene | Minimum **7:1**; S6 memakai angka latar 224px agar rasio tetap tercapai | LULUS |
| 7 | Gerak ambient per scene | **8/8 scene (100%)**; A3/A4/A6/A8 | LULUS |
| 8 | Wow moment | Global **39.0s = 52%** durasi; 4 lapisan sinkron | LULUS |
| 9 | Pattern interrupt | Perubahan mode/layout/skala terjadwal; tidak ada rentang >10s tanpa perubahan besar | LULUS |
| 10 | Open loop | Dibuka **0–5s**, ditutup **57–63s = 76–84%** durasi | LULUS |
| 11 | Kurva ketegangan | **4 → 2 → 3 → 4 → 5 → 4 → 5 → 2**; puncak payoff pada 80% | LULUS |
| 12 | Dinamika musik | **4 keadaan**: tertahan, build, terbuka, resolve | LULUS |
| 13 | Metafora / protagonis | Dunia visual muncul **8/8 scene**; token file hadir **8/8 scene** | LULUS |
| 14 | Budget render | ASCII 20×45; tidak ada shader, Three.js, blend mode, goo, atau backdrop-filter; elemen opsional ditandai | LULUS |
| 15 | Keterbacaan | Teks foreground minimum **32px**; lebar maksimum **880px**; VO sekitar **168 kata / 75s = 2.24 kata/detik**; maksimum 25 kata VO per scene | LULUS |
| 16 | Tipe visual | V19 berbeda dari tiga video terakhir menurut snapshot; konsistensi material terjaga. Konfirmasi akhir masih menunggu `STYLE-LEDGER.md` | LULUS BERSYARAT |

### Checklist akhir

- [x] Struktur bagian 0–12 lengkap dan urut.
- [x] Concept Lab dan Hook Lab tercatat dengan kandidat, skor, dan alasan.
- [x] Pesan inti satu kalimat; semua scene mendukungnya.
- [x] Total durasi scene = 75 detik; batas scene kelipatan 0.5s.
- [x] VO sekitar 168 kata, sesuai target 2.0–2.8 kata/detik.
- [x] Ukuran foreground minimum 32px; baris maksimum 880px; safe zone x=72–952, y=240–1460.
- [ ] Tipe visual sudah diverifikasi terhadap `STYLE-LEDGER.md` aktual; file ledger belum tersedia di konteks ini.
- [x] Identitas visual berbeda pada minimal 3 dari 6 dimensi berdasarkan snapshot: V, palet, tipografi, metafora.
- [x] Baris siap-tempel Registry tersedia.
- [x] Klaim teknis empat command didukung dokumentasi primer; cek ulang key binding `less` pada image render final.
- [x] Tidak ada kredensial, data privat, atau command destruktif.
- [x] Balasan chat setelah file diserahkan cukup merangkum ide utama, asumsi, dan hal yang perlu dicek.

**Status serah-terima:** Brief siap diimplementasikan dengan dua prasyarat sebelum render: (1) cocokkan fixture `notes.txt` dan `logs/app.log` dengan setup repo, (2) verifikasi rotasi V19 pada `STYLE-LEDGER.md` aktual. Bila ledger bertentangan, jangan mengganti tipe tanpa persetujuan pemilik proyek.
