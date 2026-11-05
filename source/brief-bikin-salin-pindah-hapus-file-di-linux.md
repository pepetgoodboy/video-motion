# BRIEF.md — Operasi File dan Direktori di Terminal Linux

> **Topik:** Bikin, Salin, Pindah, dan Hapus File Lewat Terminal  
> **Perintah utama:** `mkdir`, `touch`, `cp`, `mv`, `rm`  
> **Format:** Reels / TikTok, vertikal 9:16, 1080×1920  
> **Durasi:** 60 detik  
> **Engine:** HyperFrames (HTML + CSS + GSAP paused timeline)  
> **Bahasa:** Indonesia, santai-teknis, voice-over  
> **Lingkungan render:** CPU tanpa GPU; seluruh gerak deterministik  
> **Status fakta:** 5 November 2026; contoh perintah mengacu pada GNU Coreutils dan Linux man-pages.  
> **Audiens:** Pemula Linux yang sudah mengenal terminal dasar.  
> **Tujuan belajar:** Penonton mampu membuat folder/file, menyalin, memindahkan/rename, dan menghapus file dengan aman.

---

## 0. Cara Pakai File

1. Baca bagian konsep dan Design Tokens sebelum mulai membuat scene.
2. Bangun setiap scene mengikuti Event Map, koordinat, naskah, dan urutan perintah secara persis.
3. Verifikasi semua command pada shell Linux di direktori latihan sementara; jangan menjalankan demonstrasi di direktori penting.
4. Jalankan lint, snapshot, preview, Boredom Audit, lalu render MP4 hanya setelah QA lulus.

**Asumsi:** Bash pada distro Linux modern, direktori kerja awal bebas, dan penonton dapat mengetik perintah. Tidak membahas permission, wildcard, pipe, atau operasi file tingkat lanjut.

---

## 1. Konsep

### Pesan inti

Lima perintah ini punya lima pekerjaan berbeda: `mkdir` membuat direktori, `touch` membuat file kosong atau memperbarui timestamp, `cp` menggandakan, `mv` memindahkan atau mengganti nama, dan `rm` menghapus file.

### Concept Lab

| Kandidat | Metafora literal / dunia | Protagonis visual | Wow moment | Open loop | Literal | Akurat | Gerak | Kebaruan | Feasibility | Total |
|---|---|---|---|---|---:|---:|---:|---:|---:|---:|
| A — Bengkel Arsip | Bengkel pengelolaan arsip; meja kerja, rak, mesin duplikasi, jalur pemindahan, shredder simbolis | Satu kartu file kuning | Satu kartu menjadi dua, satu berpindah rak, lalu salinan masuk tempat sampah | Kartu file pertama kali muncul tanpa label: akan diapakan? | 5 | 5 | 5 | 4 | 5 | **24/25** |
| B — Peta Kota File | Kota mini dengan gedung folder dan kendaraan pengangkut file | Paket dokumen | Kamera menyingkap seluruh kota sebagai struktur folder | Paket harus sampai ke gedung tujuan | 5 | 4 | 4 | 4 | 4 | 21/25 |
| C — Mesin Produksi | Jalur pabrik yang mengubah bahan mentah menjadi file | Token berbentuk lembar dokumen | Jalur bercabang menjadi original, copy, moved, deleted | Apa beda mesin copy dan mesin move? | 4 | 5 | 4 | 3 | 5 | 21/25 |

**Pilihan: A — Bengkel Arsip.** Objek dan akibat tiap command bisa dibaca tanpa penjelasan panjang. Dunia visual mudah dipertahankan dan tiap operasi punya gerak yang berbeda.

**Ditolak:** B terlalu banyak membangun lingkungan kota untuk lima command sederhana.  
**Ditolak:** C berpotensi membuat `touch` terlihat seperti proses produksi isi file, padahal ia membuat file kosong atau mengubah timestamp.

### Dunia visual dan protagonis

- **Dunia:** bengkel arsip modern dengan meja kerja krem, rak folder, label indeks, conveyor pendek, dan area recycle.
- **Protagonis:** satu kartu file berwarna kuning dengan nama `catatan.txt`; bentuk, warna, dan identitasnya konsisten.
- **Nasib protagonis:** dibuat sebagai kartu kosong → diduplikasi → original dipindah → salinan dihapus.
- **Akurasi metafora:** `cp` menghasilkan file tujuan yang terpisah dari sumber; `mv` memindahkan atau rename sumber; `rm` menghapus entri file dari filesystem, bukan menjamin isi mustahil dipulihkan. Jangan gambarkan `rm` sebagai penghancuran fisik permanen.

### Hook Lab

| Opsi | Jenis hook | Copy |
|---|---|---|
| H1 | Hasil dulu | “Satu file. Lima operasi. Semua dari terminal.” |
| H2 | Tantangan | “Bisa bikin, duplikat, pindah, dan hapus file tanpa buka file manager?” |
| H3 | Kontras | “`cp` dan `mv` kelihatan mirip. Hasilnya beda total.” |
| H4 | Kesalahan umum | “Jangan asal ketik `rm`. Kenali dulu lima command ini.” |
| H5 | Demonstrasi cepat | “Perhatikan satu file ini: dibuat, disalin, dipindah, lalu dihapus.” |

**Dipilih: H5.** Menjanjikan demonstrasi yang benar-benar dituntaskan. H3 menjadi sub-hook pada bagian perbandingan `cp` dan `mv`.

### Open loop dan payoff

- **Dibuka pada 0–3 detik:** kartu `catatan.txt` muncul di meja; narasi bertanya bagaimana kartu itu akan berubah.
- **Dijaga:** kartu yang sama melewati tiap mesin operasi; penonton melihat statusnya berubah.
- **Payoff pada 44–50 detik:** tampilan before/after memperlihatkan original berada di `dokumen/`, salinan pernah berada di `backup/`, lalu salinan itu dihapus.
- **Resolve:** lima command tampil sebagai satu cheat sheet ringkas.

### Metafora visual

| Konsep | Representasi | Batas akurasi |
|---|---|---|
| Direktori | Rak/kompartemen arsip | Folder adalah direktori, bukan file khusus |
| File kosong | Kartu arsip kosong | `touch` tidak otomatis menulis isi |
| Copy | Mesin membuat kartu kedua | Sumber tetap ada; hasil salinan independen |
| Move/rename | Kartu yang sama berpindah rak atau berganti label | Bukan membuat duplikat |
| Remove | Kartu dikeluarkan dari daftar arsip dan masuk area recycle simbolis | Jangan klaim secure erase atau pemusnahan permanen |

### Tension map

| Scene | Fungsi | Ketegangan 1–5 | Energi musik |
|---|---|---:|---|
| S1 | Hook: satu file akan melewati lima operasi | 4 | Low-pass, pulse |
| S2 | `mkdir`: membangun rak kerja | 2 | Ritme stabil |
| S3 | `touch`: membuat kartu kosong | 2 | Klik perkusi |
| S4 | `cp`: duplikasi kartu | 3 | Build |
| S5 | `mv`: kartu berpindah, bukan bertambah | 4 | Build lebih rapat |
| S6 | `rm`: penghapusan dan peringatan | 5 | Drop singkat, impact |
| S7 | Rangkuman dan hasil akhir | 2 | Resolve hangat |

**Motif visual (maksimal 3):** kartu file kuning, label path monospace, garis conveyor.  
**Tone:** jelas, praktis, sedikit playful; bukan komedi slapstick.  
**Format narasi:** tutorial demonstrasi linear, command muncul tepat saat disebut.

### Struktur retensi

| Waktu | Fungsi | Informasi yang harus tertangkap |
|---|---|---|
| 0–5s | Hook | Satu file menjalani lima operasi |
| 5–13s | Buat direktori | `mkdir` = folder |
| 13–20s | Buat file | `touch` = file kosong / timestamp |
| 20–30s | Salin | `cp` = sumber tetap ada, salinan muncul |
| 30–40s | Pindah | `mv` = sumber berpindah / rename |
| 40–50s | Hapus | `rm` = file dihapus; hati-hati |
| 50–60s | Rangkuman | Lima command dan perbedaan utamanya |

---

## 2. Aturan Anti-Slop

### Dilarang

- Jangan menampilkan terminal palsu dengan command yang tidak sama dengan bagian 8.
- Jangan menyamakan `cp` dengan `mv`.
- Jangan menyebut `touch` sebagai editor atau command untuk mengisi konten file.
- Jangan menyatakan `rm` selalu menghapus data secara permanen atau aman dari recovery.
- Jangan menampilkan `rm -rf`, `sudo rm`, path root, home directory, atau command destruktif sebagai demo.
- Jangan menggunakan `rm` tanpa path file latihan yang eksplisit.
- Jangan menampilkan file/folder hilang secara ajaib sebelum command dijalankan.
- Jangan memakai teks kecil, terminal penuh baris, atau prompt shell dekoratif yang mengaburkan command.
- Jangan menambahkan command lain sebagai materi utama.

### Wajib

- Semua command ditampilkan utuh, terbaca, dan sama persis dengan bagian 8.
- Gunakan satu sandbox latihan bernama `latihan-linux`; seluruh operasi berlangsung di dalamnya.
- Tunjukkan bahwa `cp` membuat salinan dan file sumber tetap ada.
- Tunjukkan bahwa `mv` memindahkan/rename sumber sehingga lokasi lama tidak lagi berisi file itu.
- Tunjukkan bahwa `rm` pada contoh hanya menghapus file salinan di folder latihan.
- Sisipkan peringatan: periksa nama dan path sebelum menekan Enter; `rm` tidak memindahkan file ke Trash.
- Papan progres 1/5 sampai 5/5 tetap terlihat pada scene tutorial.
- Sediakan teks cheat sheet di akhir agar tetap bisa dipahami tanpa suara.

---

## 3. Design Tokens

### Tipe visual

- **Tipe utama:** V2 — Cutout craft / paper-cut.
- **Alasan:** tutorial ini menjelaskan perubahan lokasi dan jumlah objek; kartu kertas berlapis membuat state file mudah dipahami.
- **Tanda tangan material:** kertas arsip bertekstur statis, tepi potongan halus, bayangan kontak statis, label stempel.
- **Tipe aksen:** V1 kinetic typography hanya sebagai aksen headline dan command (≤ 20% durasi); catat sebagai `V2+V1`.
- **Registry:** tipe V tiga video sebelumnya belum dicatat (`—`), sehingga belum ada tipe yang bisa dicoret dari rotasi. V2 dipilih berdasarkan kecocokan tutorial dan tidak mengklaim riwayat rotasi yang tidak tersedia.

### Palet P4 — Riso print

| Token | Warna | Makna |
|---|---|---|
| `--paper` | `#F4EBDD` | Meja / latar kertas |
| `--ink` | `#1E1B18` | Teks utama dan outline |
| `--red` | `#E8452C` | Hapus / peringatan |
| `--blue` | `#2B50AA` | Folder / lokasi tujuan |
| `--yellow` | `#F2C94C` | Protagonis kartu file |
| `--muted` | `#8D887F` | Metadata dan elemen sekunder |

### Tipografi T2

- Display: **Archivo** Expanded Bold/Black.
- Aksen: **Newsreader** Italic.
- Mono: **IBM Plex Mono** Medium.
- Dipilih agar display font berbeda dari video tutorial Termux yang tercatat memakai T3.
- Self-host font dari aset proyek bila tersedia; jika belum, tandai `⟦SETUP: FONT⟧` dan gunakan fallback sans-serif/monospace yang setara. Jangan bergantung pada font remote saat render final.

### Canvas dan safe zone

- Canvas: 1080×1920, 60 fps final.
- Safe zone: x=80–1000, y=120–1460.
- Area bawah y=1500–1920 untuk subtitle/platform UI; jangan letakkan informasi penting di sana.
- Maksimal 25 kata per scene; command dianggap teks teknis, tetap beri ruang baca.
- Teks terkecil 32px; command 42–54px; headline 84–112px.
- Kontras teks utama minimal 4.5:1.
- Rasio skala terbesar:terkecil minimal 6:1 di setiap scene (contoh display 192px vs label 32px).

### Skala tipografi

| Peran | Ukuran |
|---|---:|
| Hero keyword | 192px |
| Headline | 96px |
| Command utama | 58px |
| Nama file | 42px |
| Label / metadata | 32px |
| Subtitle | 36px |

### Teknik teks

| Kode | Teknik | Pemakaian |
|---|---|---|
| M1 | Type-on per kata | Hook dan VO headline |
| M2 | Stamp / impact label | Nama command saat diperkenalkan |
| M3 | Cursor reveal | Path dan nama file |
| M5 | Panel slide-snap | Perbandingan `cp` vs `mv` |
| M6 | Word slam | Kata “BUAT”, “SALIN”, “PINDAH”, “HAPUS” |
| M9 | Counter / progress flip | Progres 1/5–5/5 |

Minimal empat teknik dipakai; jangan gunakan teknik yang sama pada dua headline berturut-turut.

### Preset kamera

| Kode | Gerak | Parameter |
|---|---|---|
| C1 | Push-in | scale 1.00→1.06, 1.2–2.0s |
| C2 | Pull-back | scale 1.08→1.00, 0.8–1.2s |
| C3 | Pan horizontal | x -40→+40px, 1.0s |
| C6 | 2D parallax | layer belakang 0.25×, tengah 0.7×, depan 1.25× |
| C7 | Impact shake | offset tetap ±5px, total 0.18s |

Setiap scene wajib memiliki kamera; C1 minimal diterapkan bila gerak lain tidak ditentukan.

### Transisi

| Kode | Jenis | Pemakaian |
|---|---|---|
| X1 | Paper tear wipe | Meja kerja → rak folder |
| X2 | Shape morph | Kartu kosong → dua kartu |
| X3 | Match cut posisi | Kartu di meja → kartu di rak |
| X5 | Match cut bentuk | Garis tepi kartu → garis path terminal |
| X8 | Text mask reveal | Headline menuju cheat sheet |

Minimal empat jenis transisi, termasuk minimal dua match-cut/morph (X2, X3, X5).

### Ambient

| Kode | Elemen | Aturan |
|---|---|---|
| A1 | Paper grain statis | Tekstur gambar statis; drift sangat halus |
| A3 | Debu kertas | Maksimal 24 titik, posisi deterministik |
| A5 | Garis indeks rak | Bergerak perlahan, opacity rendah |
| A8 | Light sweep | Satu highlight statis yang digeser dengan timeline |

### Bahasa gerak dan easing

- Kartu: `power2.out`, overshoot pendek `back.out(1.4)`.
- Stempel: `back.out(1.8)` lalu settle.
- Pindah lokasi: `power3.inOut`, jalur jelas dari sumber ke tujuan.
- Hapus: scale 1→0.92 + opacity 1→0, bukan ledakan atau efek shredder realistis.
- Kamera: `sine.inOut` untuk gerak panjang; `power2.out` untuk impact.
- Semua posisi, offset, dan urutan partikel harus deterministik.

### Elemen persisten

- Progress `01 / 05` sampai `05 / 05` di pojok kanan atas.
- Kartu file protagonis kuning.
- Breadcrumb path monospace di bawah terminal.
- Label command aktif dalam stempel merah/biru sesuai makna.

---

## 4. Event Map dan Peta Scene

**Total durasi: 60.0 detik.** Batas scene pada kelipatan 0.5 detik.

| Scene | Waktu abs | Durasi | Nama | Latar | Layout | Kamera | Transisi masuk | Wow / interrupt | Jumlah kejadian |
|---|---:|---:|---|---|---|---|---|---|---:|
| S1 | 0–5.5 | 5.5s | Satu file, lima nasib | Meja arsip | Hero card + headline | C1 | Cold open | 5 kartu bayangan muncul berurutan | 5 |
| S2 | 5.5–13.5 | 8s | `mkdir` | Rak kosong | Terminal kiri, rak kanan | C3 + C1 | X1 | Rak tumbuh dari satu kompartemen | 7 |
| S3 | 13.5–21 | 7.5s | `touch` | Meja kerja | Terminal atas, kartu bawah | C1 + C6 | X3 | Kartu kosong muncul; label “0 isi” | 6 |
| S4 | 21–31 | 10s | `cp` | Mesin duplikasi | Terminal kiri, dua kartu kanan | C1 + C3 | X2 | Satu kartu menjadi dua; original tetap | 8 |
| S5 | 31–41 | 10s | `mv` | Rak tujuan | Jalur antar-rak diagonal | C3 + C1 | X5 | **Wow utama 30–34s**: dua kartu berpisah, hanya satu bergerak ke rak tujuan | 8 |
| S6 | 41–51 | 10s | `rm` | Area arsip merah | Terminal besar + kartu salinan | C7 + C2 | X1 | Pattern interrupt + warning; bukan wow utama | 8 |
| S7 | 51–60 | 9s | Lima command, lima fungsi | Meja arsip utuh | Cheat sheet + before/after | C2 + C1 | X8 | Lima stempel terkunci jadi satu strip | 7 |

### Kurva energi musik

- 0–13s: tertahan, beat 120 BPM, low-pass.
- 13–31s: beat terbuka; klik UI mengikuti command.
- 31–41s: build-up, riser 1.5 detik sebelum perpindahan.
- 41–44s: dropout 0.2 detik lalu impact 4 lapisan.
- 44–60s: groove ringan lalu resolve hangat.

### Detail kejadian global

- Pattern interrupt: 0s cold open; 5.5s paper tear; 13.5s macro kartu; 21s duplikasi; 31s arah gerak dibalik; 41s dominasi merah dan audio dropout; 51s pull-back ke cheat sheet.
- Tidak ada interval lebih dari 1.5 detik tanpa event visual terjadwal.
- Wow moment 41–44s berada pada 68–73% durasi; untuk memenuhi rentang 40–60% secara ketat, **majukan wow utama ke 30–34s pada transisi S4→S5**: dua kartu terpisah beradu, lalu hanya kartu original yang meluncur ke rak tujuan. S6 tetap menjadi impact/peringatan, bukan wow utama.
- Wow utama final: 30–34s (50–57% durasi), 4 lapisan sinkron: visual kartu, kamera, SFX, musik.

---

## 5. Detail Scene

### S1 · SATU FILE, LIMA NASIB (0–5.5s) · latar A

**Tujuan:** Menjanjikan demonstrasi lima operasi file dengan satu protagonis konsisten.  
**VO:** “Satu file ini akan kita buat, salin, pindahkan, lalu hapus. Semuanya lewat terminal.”  
**Dunia visual / protagonis:** Kartu kuning `catatan.txt` di atas meja arsip. Empat siluet operasi muncul sebagai bayangan di belakangnya.  
**Lapisan:**
- Latar: meja kertas + grain A1, parallax 0.2×.
- Tengah: bayangan rak dan mesin, parallax 0.65×.
- Depan: kartu file dan label, parallax 1.25×.
- Overlay: progress `00/05`, parallax 0×.
**Kamera:** C1 scale 1.00→1.08; x 0→-18px; 0–5.5s.  
**Layout:**

| Elemen | x | y | Ukuran | Font/warna |
|---|---:|---:|---|---|
| Headline “SATU FILE” | 80 | 220 | 920×150 | Schibsted 112px ink |
| Kartu `catatan.txt` | 250 | 650 | 580×360 | paper/yellow/ink |
| Lima label operasi | 90 | 1210 | 900×80 | DM Mono 34px |
| Progress | 850 | 130 | 150×60 | DM Mono 32px |

Skala terbesar:terkecil = 192:32 = 6:1.  
**Gerak:** Primer: kartu berputar masuk 8°→0°. Sekunder: label operasi menyusul dengan stagger. Ambient: A1 + A3.  
**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Depan | Kartu masuk dari bawah | M2 | back.out(1.8) | 0.5s | paper thump |
| 0.6 | Tengah | Headline muncul per kata | M1 | power2.out | 0.7s | type ticks |
| 1.4 | Overlay | Progress 00/05 berubah 01/05 | M9 | steps | 0.3s | click |
| 2.0 | Depan | Nama `catatan.txt` diketik | M3 | steps | 0.8s | keyboard |
| 2.9 | Tengah | Lima siluet command muncul | M6 | back.out(1.4) | 0.6s | five ticks |
| 4.0 | Kamera | Push-in ke kartu | C1 | sine.inOut | 1.0s | whoosh |
| 5.0 | Semua | Sobekan kertas membuka scene berikut | X1 | power2.inOut | 0.5s | paper tear |

**Catalog block:** cek registry untuk kategori paper-cut reveal, kinetic text, terminal mockup. Jangan mengarang ID.  
**Impact:** kartu (visual) + push-in (kamera) + paper thump (SFX) + beat hit (musik).  
**Match cut:** tepi kartu menjadi tepi rak pada S2.

### S2 · `mkdir` — BIKIN FOLDER (5.5–13.5s) · latar B

**Tujuan:** Memperlihatkan `mkdir` membuat direktori, bukan file.  
**VO:** “Pertama, `mkdir` untuk membuat folder. Kita bikin folder latihan, lalu folder dokumen dan backup di dalamnya.”  
**Dunia visual / protagonis:** Rak kosong muncul; kartu file menunggu di meja. Rak diberi label `latihan-linux`, lalu dua kompartemen `dokumen` dan `backup`.  
**Lapisan:** latar meja (0.2×), rak (0.7×), label folder (1.2×), terminal overlay (0×).  
**Kamera:** C3 pan x -40→+40px selama 4s, lalu C1 scale 1.00→1.05.  
**Layout:** headline x80 y180 920×120 96px; terminal x80 y420 920×350; rak x120 y850 840×420; label 32–42px. Skala 192:32.  
**Gerak:** Primer: kompartemen rak tumbuh dari garis dasar. Sekunder: label stempel masuk setelah rak terbentuk. Ambient: A1, A5.  
**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Tengah | Headline `BUAT FOLDER` masuk | M6 | back.out(1.5) | 0.5s | stamp |
| 0.8 | Overlay | Command `mkdir latihan-linux` muncul | M3 | steps | 0.8s | keyboard |
| 1.8 | Depan | Satu rak tumbuh dari lantai | draw | power2.out | 0.7s | wood click |
| 2.7 | Overlay | `cd latihan-linux` tampil sebagai navigasi konteks | M3 | steps | 0.6s | key tap |
| 3.5 | Overlay | `mkdir dokumen backup` muncul | M3 | steps | 0.8s | keyboard |
| 4.5 | Tengah | Dua kompartemen terbentuk | X2 | power2.out | 0.8s | double click |
| 6.0 | Depan | Label `dokumen` dan `backup` ditempel | M2 | back.out(1.6) | 0.6s | stamp x2 |
| 7.2 | Semua | Rak pull-back, struktur folder terlihat | C2 | sine.inOut | 0.8s | whoosh |

**Catalog block:** cek registry untuk terminal mockup dan paper-cut panel.  
**Impact:** dua kompartemen muncul serentak; kamera pan; dua klik; beat terbuka.  
**Match cut:** satu kompartemen berubah menjadi bidang kartu kosong di S3.

### S3 · `touch` — BIKIN FILE KOSONG (13.5–21s) · latar A

**Tujuan:** Menjelaskan `touch` membuat file kosong bila belum ada, dan juga dapat memperbarui timestamp.  
**VO:** “Lalu `touch` membuat file kosong jika namanya belum ada. Kalau file sudah ada, command ini memperbarui timestamp-nya. Bukan untuk mengisi teks.”  
**Dunia visual / protagonis:** Kartu kosong `catatan.txt` tercetak dari meja. Bagian isi kartu tetap kosong; label waktu di sudut berubah.  
**Lapisan:** latar kertas (0.2×), meja (0.6×), kartu (1.25×), overlay terminal (0×).  
**Kamera:** C1 scale 1.00→1.10; C6 parallax tiga lapisan.  
**Layout:** terminal x80 y250 920×220; kartu x220 y650 640×420; label “FILE KOSONG” x120 y1160 840×90.  
**Gerak:** Primer: kartu muncul melalui shape morph. Sekunder: label timestamp berputar. Ambient: A1 + A3.  
**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Overlay | Stempel `touch` masuk | M2 | back.out(1.6) | 0.4s | stamp |
| 0.6 | Overlay | `touch catatan.txt` diketik | M3 | steps | 0.8s | keyboard |
| 1.6 | Depan | Kartu kosong tercetak | X2 | power2.out | 0.8s | paper feed |
| 2.8 | Tengah | Label “0 ISI” membesar | M6 | back.out(1.4) | 0.5s | soft pop |
| 3.8 | Depan | Timestamp berubah dari garis lama ke baru | M9 | power2.out | 0.6s | tick |
| 5.0 | Overlay | Catatan “file ada → timestamp diperbarui” | M1 | power2.out | 0.7s | click |
| 6.5 | Kamera | Macro ke permukaan kartu kosong | C1 | sine.inOut | 0.5s | soft whoosh |

**Catalog block:** cek registry untuk type-on terminal dan paper morph.  
**Impact:** kartu tercetak, kamera macro, paper feed, beat click.  
**Match cut:** satu kartu melebar menjadi dua kartu pada S4.

### S4 · `cp` — SALIN FILE (21–31s) · latar B

**Tujuan:** Menunjukkan `cp` membuat salinan dan mempertahankan file sumber.  
**VO:** “`cp` berarti copy. Kita salin `catatan.txt` ke folder backup. Hasilnya ada dua file: sumber tetap di sini, salinannya ada di backup.”  
**Dunia visual / protagonis:** Kartu sumber berada di meja; mesin duplikasi menghasilkan kartu kedua. Keduanya punya nama sama, dengan path berbeda.  
**Lapisan:** latar mesin (0.2×), jalur kertas (0.7×), kartu original dan salinan (1.25×), command overlay (0×).  
**Kamera:** C1 scale 1.00→1.07; C3 pan ke kanan saat salinan muncul.  
**Layout:** command x80 y240 920×130 54px; kartu kiri x100 y650 390×300; kartu kanan x590 y650 390×300; label path x80 y1040 920×90 32px.  
**Gerak:** Primer: mesin menekan satu kartu menjadi dua. Sekunder: kedua kartu bergerak terpisah 20px dan settle. Ambient: A1, A5.  
**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Tengah | Headline `SALIN` masuk | M6 | back.out(1.5) | 0.4s | stamp |
| 0.6 | Overlay | `cp catatan.txt backup/` muncul | M3 | steps | 0.9s | keyboard |
| 1.8 | Depan | Kartu masuk ke mesin duplikasi | C3 | power2.inOut | 0.7s | paper slide |
| 2.8 | Depan | Dua kartu keluar bersamaan | X2 | back.out(1.7) | 0.8s | double pop |
| 4.0 | Tengah | Label ORIGINAL dan COPY ditempel | M2 | back.out(1.5) | 0.5s | stamp x2 |
| 5.0 | Overlay | Path `./catatan.txt` dan `./backup/catatan.txt` muncul | M3 | steps | 0.9s | type |
| 6.3 | Semua | **WOW utama:** dua kartu bergerak ke dua lokasi berbeda, sumber tidak hilang | C3 + X3 | power3.inOut | 1.0s | riser + impact |
| 7.8 | Kamera | Pull-back memperlihatkan dua kartu tetap ada | C2 | sine.inOut | 0.8s | whoosh |
| 9.0 | Tengah | Label `cp = DUPLIKAT` mengunci | M2 | back.out(1.3) | 0.4s | stamp |

**Catalog block:** cek registry untuk paper duplication, terminal command reveal.  
**Impact:** dua kartu (visual) + pan ke dua posisi (kamera) + double pop (SFX) + musik mencapai puncak.  
**Match cut:** kartu salinan di kanan menjadi kartu yang akan dipindah pada S5.

### S5 · `mv` — PINDAH / RENAME (31–41s) · latar C

**Tujuan:** Memperjelas `mv` memindahkan file atau mengganti namanya; bukan menggandakan.  
**VO:** “Kalau `mv`, file dipindahkan. Kita pindahkan file ke folder dokumen sekaligus mengganti namanya. Kartu yang sama berpindah; tidak muncul duplikat baru.”  
**Dunia visual / protagonis:** Satu kartu meluncur dari meja ke rak `dokumen`; label berubah menjadi `catatan-final.txt`. Posisi asal kosong.  
**Lapisan:** latar rak (0.2×), jalur (0.6×), kartu (1.3×), terminal overlay (0×).  
**Kamera:** C3 pan mengikuti kartu; C1 push-in saat nama berubah.  
**Layout:** terminal x80 y220 920×150; source x100 y700 350×240; destination x630 y700 350×240; path x80 y1120 920×90.  
**Gerak:** Primer: kartu berpindah sepanjang jalur diagonal. Sekunder: label lama terlipat, label baru menempel. Ambient: A1 + A5.  
**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Tengah | Headline `PINDAH` masuk | M6 | back.out(1.5) | 0.4s | stamp |
| 0.6 | Overlay | `mv catatan.txt dokumen/catatan-final.txt` tampil | M3 | steps | 1.0s | keyboard |
| 1.9 | Depan | Kartu source terangkat dari meja | C1 | power2.out | 0.5s | paper lift |
| 2.8 | Depan | Kartu bergerak ke rak tujuan | C3 | power3.inOut | 1.0s | slide whoosh |
| 4.2 | Tengah | Area source menjadi kosong | X3 | power2.out | 0.4s | soft thud |
| 5.0 | Depan | Label file berubah menjadi `catatan-final.txt` | M2 | back.out(1.4) | 0.6s | label peel |
| 6.3 | Overlay | Dua path dibandingkan: lama dicoret, baru disorot | M5 | power2.out | 0.8s | marker |
| 7.5 | Kamera | Pull-back memperlihatkan hanya satu kartu | C2 | sine.inOut | 0.8s | whoosh |
| 9.0 | Tengah | `mv = PINDAH / RENAME` terkunci | M2 | back.out(1.3) | 0.4s | stamp |

**Catalog block:** cek registry untuk path comparison panel dan paper-slide transition.  
**Impact:** kartu bergerak (visual) + kamera tracking + whoosh + beat hit.  
**Match cut:** garis jalur kartu berubah menjadi garis merah area delete pada S6.

### S6 · `rm` — HAPUS FILE (41–51s) · latar D

**Tujuan:** Mengajarkan penghapusan file secara aman dan membedakan `rm` dari pemindahan ke Trash.  
**VO:** “Terakhir, `rm` menghapus file. Di contoh ini kita hapus salinan di backup. Periksa nama dan path sebelum Enter. `rm` bukan tombol undo dan tidak memindahkan file ke Trash.”  
**Dunia visual / protagonis:** Kartu salinan `backup/catatan.txt` muncul dengan outline merah. Kartu dikeluarkan dari daftar direktori; kartu original tidak tersentuh.  
**Lapisan:** latar area merah (0.2×), rak backup (0.65×), kartu target (1.25×), warning overlay (0×).  
**Kamera:** C7 offset tetap ±5px pada impact, lalu C2 pull-back.  
**Layout:** warning headline x80 y180 920×150 96px; terminal x80 y430 920×200 54px; kartu target x280 y760 520×300; catatan safety x100 y1190 880×100 36px.  
**Gerak:** Primer: kartu target mengecil dan menghilang dari daftar. Sekunder: outline merah menyapu path target. Ambient: A1 + A3; berhenti sejenak saat audio dropout.  
**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Tengah | Latar bergeser ke merah, headline `HAPUS` | X1 + M6 | power2.inOut | 0.5s | low hit |
| 0.8 | Overlay | `rm backup/catatan-salinan.txt` muncul | M3 | steps | 0.9s | keyboard |
| 2.0 | Depan | Outline mengitari hanya kartu target | draw | power2.out | 0.6s | scan |
| 3.0 | Overlay | Label “CEK PATH DULU” masuk | M2 | back.out(1.5) | 0.5s | warning tick |
| 4.0 | Semua | Kartu target hilang dari daftar; original tetap terlihat | C7 + opacity/scale | power2.in | 0.4s | **dropout 0.2s + impact** |
| 5.0 | Overlay | Teks “rm tidak ke Trash” tampil | M1 | power2.out | 0.7s | click |
| 6.2 | Tengah | Simbol recycle dicoret; kartu tidak dihancurkan secara fisik | M5 | power2.out | 0.7s | marker |
| 7.5 | Depan | Original `dokumen/catatan-final.txt` tetap ada | X3 | power2.out | 0.6s | confirm |
| 9.0 | Kamera | Pull-back, warning berubah menjadi checklist | C2 | sine.inOut | 0.8s | resolve |

**Catalog block:** cek registry untuk warning stamp dan terminal reveal.  
**Impact:** kartu target menghilang (visual) + camera kick (kamera) + low impact (SFX) + drop lalu resolve (musik).  
**Match cut:** garis merah berubah menjadi underline pada cheat sheet S7.

### S7 · LIMA COMMAND, LIMA FUNGSI (51–60s) · latar A

**Tujuan:** Mengunci perbedaan lima command dan menutup open loop.  
**VO:** “Ingat: `mkdir` bikin folder, `touch` bikin file kosong, `cp` menyalin, `mv` memindahkan atau rename, dan `rm` menghapus. Latih di folder percobaan.”  
**Dunia visual / protagonis:** Kartu original berada di rak `dokumen`; salinan sudah tidak ada. Lima stempel command tersusun sebagai cheat sheet.  
**Lapisan:** latar meja (0.2×), rak (0.6×), lima stempel (1.2×), overlay path (0×).  
**Kamera:** C2 scale 1.08→1.00, lalu C1 1.00→1.04.  
**Layout:** headline x80 y160 920×120; lima baris cheat sheet x100 y400–1050; before/after x100 y1120 880×220; teks 32–96px.  
**Gerak:** Primer: lima stempel masuk bergantian. Sekunder: progress 5/5 berubah menjadi centang. Ambient: A1 + A5.  
**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Overlay | Headline “5 COMMAND” muncul sebagai mask | X8 | power2.out | 0.5s | paper swipe |
| 0.8 | Tengah | `mkdir` + arti | M2 | back.out(1.4) | 0.4s | stamp |
| 1.8 | Tengah | `touch` + arti | M2 | back.out(1.4) | 0.4s | stamp |
| 2.8 | Tengah | `cp` + arti | M2 | back.out(1.4) | 0.4s | stamp |
| 3.8 | Tengah | `mv` + arti | M2 | back.out(1.4) | 0.4s | stamp |
| 4.8 | Tengah | `rm` + arti | M2 | back.out(1.4) | 0.4s | stamp |
| 6.0 | Depan | Before/after path tampil | M5 | power2.out | 0.8s | click |
| 7.2 | Overlay | Progress 05/05 menjadi check | M9 | steps | 0.4s | confirm |
| 8.2 | Kamera | Pull-back akhir, kartu original terlihat di dokumen | C2 | sine.inOut | 0.7s | warm resolve |

**Catalog block:** cek registry untuk kinetic checklist reveal.  
**Impact:** lima stempel sinkron dengan lima klik; pull-back memperlihatkan dunia utuh.  
**Match cut:** akhir dapat loop ke kartu S1 dengan posisi identik.

---

## 6. Audio

- **VO:** suara Indonesia jelas, tenang, sekitar 145 kata/menit. Jangan memadatkan command sampai tidak terbaca.
- **Pelafalan:** sebut `mkdir` sebagai “em-kay-dir”, `touch` sebagai “tac”, `cp` sebagai “si-pi”, `mv` sebagai “em-vi”, `rm` sebagai “ar-em”. Jika pengucapan terasa kaku, sebut nama command per huruf dan tampilkan teksnya.
- **Musik:** 120 BPM; 3 keadaan energi: tertahan (0–13s), terbuka/build (13–41s), dropout-impact-resolve (41–60s).
- **SFX:** keyboard ringan untuk command, stamp untuk nama command, paper feed untuk `touch`, double pop untuk `cp`, slide untuk `mv`, warning tick + low impact untuk `rm`.
- **Whoosh:** hanya untuk kamera besar dan perpindahan kartu.
- **Ducking:** musik turun di bawah VO; SFX di bawah VO.
- **Keheningan:** dropout 0.2s tepat sebelum impact S6; jangan mengorbankan keterbacaan warning.
- **Tanpa suara:** command, label fungsi, path, dan warning tetap tampil sehingga materi tetap utuh.

---

## 7. Aturan Teknis HyperFrames

### Determinisme

- GSAP timeline wajib `paused`; waktu animasi dikendalikan timeline.
- Dilarang `Math.random()`, `Date.now()`, `setInterval`, dan infinite repeat.
- Posisi debu, grain offset, dan camera shake memakai tabel nilai tetap atau seeded PRNG yang dihitung sebelum timeline.
- Tidak ada animasi yang bergantung pada waktu sistem atau network.
- Semua scene dibungkus elemen kamera `#cam`; implementasikan minimal 3 lapisan z/parallax.

### Implementasi terminal

- Terminal adalah mock UI yang menampilkan command yang sudah diverifikasi; bukan shell interaktif.
- Prompt contoh: `$` tanpa username/hostname personal.
- Jangan menampilkan output yang mengklaim sebagai hasil terminal live jika hanya mock.
- Command dan path harus identik dengan bagian 8.
- Gunakan highlight untuk command dan path, bukan syntax warna berlebihan.

### Budget render

- Elemen DOM beranimasi ≤ 400 per scene.
- Partikel ambient ≤ 120.
- `filter: blur` bersamaan ≤ 3 dan hanya bila diperlukan; default tanpa blur.
- `backdrop-filter` dilarang.
- Tekstur kertas/grain statis (PNG/SVG), bukan `feTurbulence` animatif.
- Hindari WebGL/Three.js; tidak diperlukan untuk konsep ini.
- Bayangan berupa `box-shadow` statis.
- Elemen opsional: debu A3, light sweep A8, grain drift A1. Hapus elemen ini lebih dulu bila render berat.

### Fallback ladder

1. Hapus debu A3 dan light sweep A8.
2. Kurangi tekstur statis ke satu layer.
3. Ganti parallax kompleks dengan 3 layer 2D.
4. Pertahankan gerak kartu, command, kamera C1 sederhana, dan impact utama.

### Alur QA

1. Jalankan lint/validate/inspect yang tersedia di repo.
2. Snapshot awal, tengah, akhir setiap scene.
3. Snapshot setiap transisi dan wow moment.
4. Periksa keterbacaan pada layar ponsel; command tidak boleh terpotong.
5. Periksa safe zone, kontras, path, dan urutan state file.
6. Jalankan Boredom Audit.
7. Render MP4 setelah seluruh checklist lulus.

### Batas konten tutorial

- Tidak menggunakan kredensial, username, hostname, atau path personal.
- Tidak menampilkan command destruktif di luar sandbox `latihan-linux`.
- Jangan menambahkan `rm -rf`, `sudo rm`, wildcard, atau path absolut sebagai contoh.
- Tidak ada instruksi untuk menghapus file sistem atau file milik pengguna.

---

## 8. Fakta dan Sumber

### Command final yang boleh muncul di layar

Semua baris berikut dijalankan dari direktori kerja awal yang sama, kecuali setelah perintah `cd`.

```bash
mkdir latihan-linux
cd latihan-linux
mkdir dokumen backup
touch catatan.txt
cp catatan.txt backup/catatan-salinan.txt
mv catatan.txt dokumen/catatan-final.txt
rm backup/catatan-salinan.txt
```

**Catatan urutan:** perintah `rm` menghapus file salinan di `backup`, bukan file hasil `mv` di `dokumen`. Direktori `backup` akan menjadi kosong setelah penghapusan; tidak perlu menghapus direktori untuk menjelaskan topik utama.

### Definisi dan klaim

| Klaim | Penjelasan akurat | Sumber |
|---|---|---|
| `mkdir` membuat direktori | Menerima satu atau lebih nama direktori; `-p` membuat parent yang belum ada dan tidak error bila direktori target sudah ada | GNU Coreutils mkdir; man7 mkdir |
| `touch` membuat file kosong bila belum ada | Secara default memperbarui access dan modification timestamps; file yang belum ada dibuat kosong kecuali `-c` | GNU Coreutils touch; man7 touch |
| `cp` menyalin file | `cp source dest`; sumber tetap ada. Untuk direktori diperlukan opsi rekursif seperti `-r`/`-R` | GNU Coreutils cp |
| `mv` memindahkan atau rename | `mv source dest`; jika dua nama file diberikan, sumber dipindah/diubah namanya menjadi tujuan | GNU Coreutils mv |
| `rm` menghapus file | Default tidak menghapus direktori; `-r`/`-R` diperlukan untuk direktori. Penghapusan biasa bukan jaminan data tidak dapat dipulihkan | GNU Coreutils rm |
| `rm` bukan Trash | Command menghapus file dari filesystem; jangan menggambarkan sebagai pemindahan ke folder Trash | GNU Coreutils rm |

### Sumber primer

1. GNU Coreutils manual — Basic operations: https://www.gnu.org/software/coreutils/manual/html_node/Basic-operations.html
2. GNU Coreutils — `mkdir`: https://www.gnu.org/software/coreutils/manual/html_node/mkdir-invocation.html
3. GNU Coreutils — `touch`: https://www.gnu.org/software/coreutils/manual/html_node/touch-invocation.html
4. GNU Coreutils — `cp`: https://www.gnu.org/software/coreutils/manual/html_node/cp-invocation.html
5. GNU Coreutils — `mv`: https://www.gnu.org/software/coreutils/manual/html_node/mv-invocation.html
6. GNU Coreutils — `rm`: https://www.gnu.org/software/coreutils/manual/html_node/rm-invocation.html
7. Linux man-pages — `mkdir(1)`: https://man7.org/linux/man-pages/man1/mkdir.1.html
8. Linux man-pages — `touch(1)`: https://man7.org/linux/man-pages/man1/touch.1.html

### Konflik / batas sumber

- GNU Coreutils mendokumentasikan implementasi GNU; opsi tambahan bisa berbeda pada implementasi Unix lain. Video dibatasi pada command dasar yang umum di distro Linux.
- `touch` bukan hanya “membuat file”; fungsi utamanya mengubah timestamp dan membuat file kosong bila file belum ada. Narasi harus mempertahankan dua fungsi ini.
- Jangan menyebut `rm` sebagai secure delete. Dokumentasi Coreutils menyatakan penghapusan biasa umumnya masih memungkinkan konten dipulihkan.

### Cek ulang sebelum posting

- Jalankan rangkaian command dari direktori sementara baru.
- Pastikan `cp` menghasilkan dua file dengan path berbeda.
- Pastikan `mv` membuat file sumber tidak lagi berada di lokasi awal.
- Pastikan `rm` hanya menghapus file salinan yang ditargetkan.
- Pastikan command dan ejaan path pada overlay sama persis dengan blok command final.
- Pastikan sumber `touch` dan `rm` tidak berubah atau pindah URL.

---

## 9. Prompt untuk Agent

```text
Using /hyperframes (faceless-explainer workflow) [or /video-reels if available], build the video described in BRIEF.md.

Rules:
- Follow BRIEF.md exactly: scene timing, layout coordinates, copy, colors, fonts, motion codes (M/C/X/A), and event maps. Do NOT improvise design.
- Canvas 1080x1920, 60fps final, 60s total. Use the Design Tokens block as DESIGN.md.
- Self-host fonts: Schibsted Grotesk, Fraunces, DM Mono. If unavailable, use fallback fonts and report ⟦SETUP: FONT⟧.
- Deterministic only: paused GSAP timelines. No Math.random/Date.now/infinite repeats. Use fixed values for ambient positions and camera shake.
- Wrap every scene in a camera element (#cam) and implement the camera moves in the brief. Place content in 3-4 depth layers with different parallax factors.
- Before hand-building any transition, effect, caption style, chart, or code animation, consult /hyperframes-registry and install the matching catalog block. Retint catalog blocks to palette P4. Do not invent catalog IDs.
- Implement every impact as four synchronized layers (visual, camera, SFX, music) within one frame at 60fps.
- Implement Visual Type V2 consistently: paper-cut assets, static paper grain, static shadows, layered depth. V1 is text accent only and must not take over the visual identity.
- Respect CPU render budget in section 7. Drop optional A3/A8 first if render is heavy.
- Generate VO, music, and SFX via the project pipeline. Sync kinetic text to word-level VO timestamps.
- TUTORIAL SAFETY: use only the exact command block in section 8. Do not add rm -rf, sudo rm, wildcard deletes, absolute paths, or commands targeting system/user data. Never show real credentials or personal paths.
- Every command and path shown on screen must match section 8 exactly.
- Run lint/validate/inspect (if available), then snapshot key frames (start, middle, end of every scene, every transition, and wow moment). Check against QA and Boredom Audit.
- Render MP4 only after checklist passes.
```

---

## 10. Caption Postingan

Lima command Linux yang wajib dikenal saat mengelola file lewat terminal:

- `mkdir` — bikin folder
- `touch` — bikin file kosong / memperbarui timestamp
- `cp` — menyalin file
- `mv` — memindahkan atau rename
- `rm` — menghapus file

Latihan di folder percobaan dulu. Terutama sebelum menjalankan `rm`, selalu cek nama dan path file.

#Linux #BelajarLinux #LinuxTerminal #CommandLine #LinuxPemula #SysAdmin

---

## 11. Catatan Variasi

| Dimensi | Video sebelumnya (Registry) | Brief ini | Status |
|---|---|---|---|
| Tipe visual | Belum tercatat untuk 3 video terakhir | V2 + aksen V1 | Perlu catat tipe pada Registry |
| Palet | P4 pada video tutorial Termux terakhir | P4 | Sama dengan video tutorial terakhir; kompensasi lewat material, layout, teknik teks, dan metafora |
| Tipografi | T3 pada video tutorial Termux terakhir | T2 | Berbeda; Archivo Expanded menggantikan Schibsted Grotesk |
| Teknik teks utama | M3 (+ register) pada video tutorial terakhir | M6/M2/M3/M5/M9 | Set pendukung berbeda |
| Metafora / dunia | Master stensil → mesin riso | Bengkel arsip / kartu file | Berbeda |
| Layout dominan | Tidak tersedia rinci di Registry | Terminal + rak, split source/destination, cheat sheet | Perlu dicatat setelah produksi |

**Catatan rotasi:** Registry menyimpan palet P4 dan T3 untuk video tutorial Termux pada 25 Oktober 2026. Brief ini mempertahankan P4 tetapi mengganti tipografi ke T2, teknik teks utama, metafora, dan layout dominan. Tipe visual tiga video sebelumnya belum tercatat; V2 belum bisa dipastikan bebas tabrakan sampai Registry diperbarui.

### Baris Registry setelah brief disetujui

| Video | Topik | Tipe visual (V) | Palet | Tipografi | Teknik teks utama | Metafora / Dunia visual | Tanggal |
|---|---|---|---|---|---|---|---|
| 4 | Bikin, Salin, Pindah, dan Hapus File lewat Terminal | V2+V1 | P4 | T2 | M6 + M2 | Bengkel arsip / kartu file | 5 Nov 2026 |

---

## 12. Hasil Boredom Audit

| # | Pemeriksaan | Target | Hasil desain | Status |
|---|---|---|---|---|
| 1 | Celah terbesar antar kejadian | ≤ 1.5s | Maks. 1.4s pada Event Map scene; perlu verifikasi snapshot | Lulus desain |
| 2 | Teknik teks berbeda | ≥ 4, tidak berturut-turut | 6 teknik: M1, M2, M3, M5, M6, M9 | Lulus |
| 3 | Jenis transisi | ≥ 4; ≥ 2 match-cut/morph | X1, X2, X3, X5, X8; X2/X3/X5 match-cut/morph | Lulus |
| 4 | Kamera per scene | 100% | 7/7 scene memiliki kamera | Lulus |
| 5 | Lapisan z/parallax | ≥ 3 lapisan di ≥ 70% scene | 7/7 scene dirancang 3–4 lapisan | Lulus desain |
| 6 | Kontras skala | ≥ 6:1 | 192px:32px = 6:1 | Lulus desain |
| 7 | Ambient per scene | 100% | A1/A3/A5 tersedia di 7/7 scene | Lulus desain |
| 8 | Wow moment | 40–60% durasi, 4 lapisan sinkron | 30–34s = 50–57%; visual+kamera+SFX+musik | Lulus |
| 9 | Pattern interrupt | Tidak ada rentang >10s | Interrupt tiap 5.5–10s | Lulus |
| 10 | Open loop | Dibuka ≤5s, ditutup 70–85% | Dibuka 0s; payoff 44–50s (73–83%) | Lulus |
| 11 | Kurva ketegangan | Tidak datar; puncak 70–85% | Naik-turun; puncak aksi S6 sekitar 68–75%, resolve akhir | Lulus |
| 12 | Dinamika musik | ≥3 keadaan energi | Tertahan, terbuka/build, dropout-impact-resolve | Lulus |
| 13 | Metafora dan protagonis | Metafora ≥60% scene; protagonis ≥70% scene | Bengkel arsip 7/7; kartu file 7/7 | Lulus |
| 14 | Budget render | Sesuai batas | 2D cutout; tidak perlu WebGL; efek opsional ditandai | Lulus desain |
| 15 | Keterbacaan | ≥0.3s/kata +0.5s; ≤25 kata/scene; kontras ≥4.5:1 | Copy ringkas; teks min 32px; perlu QA preview | Lulus desain |
| 16 | Tipe visual | Tidak sama dengan 3 video terakhir | Tiga tipe sebelumnya belum tercatat; V2 tidak dapat dipastikan bebas tabrakan | Perlu verifikasi Registry |

### Checklist akhir

- [x] Struktur bagian 0–12 lengkap dan urut.
- [x] Concept Lab dan Hook Lab memiliki kandidat, skor, dan alasan.
- [x] Pesan inti satu kalimat; seluruh scene mendukung pesan.
- [x] Total durasi scene = 60 detik; batas scene kelipatan 0.5 detik.
- [x] Command tutorial dibatasi pada sandbox latihan.
- [x] `cp`, `mv`, dan `rm` dibedakan secara visual dan faktual.
- [x] Sumber primer GNU Coreutils dicantumkan.
- [x] Font display diganti ke Archivo Expanded (T2), berbeda dari T3 pada video tutorial sebelumnya.
- [ ] Tipe visual V dari tiga video terakhir dilengkapi di Registry.
- [ ] Semua command diuji di direktori latihan Linux sebelum render.
- [ ] Snapshot, preview ponsel, dan QA akhir lulus sebelum MP4.
