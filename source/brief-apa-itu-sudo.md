# BRIEF.md — Apa Itu `sudo` dan Kenapa Jangan Asal Pakai `root`?

> **Status:** Draft produksi berbasis dokumentasi resmi yang diperiksa pada 7 November 2026. Fakta umum Linux dipisahkan dari perilaku default Ubuntu/Debian.  
> **Format:** Reels/TikTok · 60 detik · 9:16 · 1080×1920 · 60fps final  
> **Engine:** HyperFrames (HTML + CSS + GSAP paused timeline, deterministik)  
> **Bahasa:** Indonesia santai-teknis · voice over  
> **Lingkungan render:** CPU tanpa GPU; hindari WebGL dan efek blur berat.

---

## 0. Cara Pakai File

1. Baca seluruh brief sebelum membuat komposisi.
2. Ikuti pesan inti, copy, koordinat, warna, font, kode gerak, dan Event Map; jangan mengimprovisasi fakta atau command.
3. Periksa bagian 8 untuk sumber dan batas klaim. Jangan menambah command di luar daftar yang diizinkan.
4. Jalankan lint, snapshot, preview ponsel, dan Boredom Audit sebelum render MP4.

---

## 1. Konsep

### Pesan inti

`sudo` memberi pengguna yang diizinkan hak administratif untuk menjalankan perintah tertentu; akun `root` memiliki hak istimewa luas secara permanen selama sesi root. Gunakan hak tertinggi hanya ketika memang diperlukan, pahami perintahnya, dan hindari bekerja sehari-hari sebagai root.

### Concept Lab

Skor 1–5 untuk Literal, Akurat, Gerak, Kebaruan, Feasibility.

| Kandidat | Metafora / dunia visual | Protagonis | Momen wow | Open loop | Skor |
|---|---|---|---|---|---:|
| A — Ruang kontrol akses | Pusat kendali gedung dengan pintu berlapis; kartu akses biasa meminta otorisasi untuk satu panel, sementara kartu root membuka banyak panel | Kartu akses pengguna | Kartu biasa berubah menjadi akses administratif hanya saat satu perintah dijalankan; pintu lain tetap terkunci | Mengapa akses penuh sebaiknya tidak terus aktif? | **24/25** |
| B — Bengkel dengan kunci master | Teknisi memakai kunci kerja untuk tugas rutin; kunci master membuka semua lemari | Kunci mekanik | Lemari sistem terbuka serentak saat kunci master dipakai | Apa risiko jika kunci master selalu dipegang? | 22/25 |
| C — Ruang server dan panel sakelar | Operator meminta izin untuk menekan satu sakelar; root menjadi panel override | Sakelar bercahaya | Satu sakelar berubah status, lalu kamera menunjukkan cakupan sistem yang lebih luas | Mengapa satu salah tekan berdampak besar? | 21/25 |

**Pilihan:** A. Paling mudah menunjukkan perbedaan akses perintah `sudo` dan sesi root tanpa menyamakan keduanya. Pintu yang tetap terkunci menegaskan bahwa peningkatan hak dapat dibatasi pada satu tindakan.

### Dunia visual dan protagonis

- **Dunia:** ruang kontrol gedung modern, dengan panel akses, pintu, log aktivitas, dan konsol operator.
- **Protagonis:** kartu akses biru bertuliskan `USER`. Kartu ini bergerak dari panel pengguna ke pemindai `sudo`, mendapat izin untuk satu tindakan, lalu kembali ke status biasa.
- **Representasi root:** kartu master merah `UID 0` yang dapat membuka hampir semua panel. Jangan gambarkan sebagai kekuatan tanpa batas mutlak; kontrol keamanan tambahan seperti SELinux/AppArmor dapat membatasi proses tertentu.
- **Metafora:** pintu = resource sistem; pemindai = kebijakan `sudo`; kartu user = identitas pemanggil; kartu root = hak superuser; buku log = catatan aktivitas jika logging diaktifkan.

### Hook Lab

| Opsi | Jenis | Teks / VO pembuka |
|---|---|---|
| H1 | Kontradiksi | “Perintahnya cuma satu kata tambahan. Dampaknya bisa ke seluruh sistem.” |
| H2 | Taruhan | “Salah pakai `root`, file sistem bisa ikut berubah.” |
| H3 | Pertanyaan yang salah | “Kalau ada `sudo`, kenapa masih ada akun `root`?” |
| H4 | Cold open hasil akhir | Tampilkan terminal `whoami` → `sudo whoami`, hasil berubah menjadi `root`. |
| H5 | Konsekuensi | “Jangan biasakan terminal selalu punya akses tertinggi.” |

**Hook terpilih: H4.** Hasilnya konkret dan bisa dibuktikan dengan command read-only. Teks layar maksimal 7 kata: `SIAPA YANG PUNYA AKSES?`

### Open loop dan payoff

- **Dibuka (0–4s):** `whoami` menghasilkan identitas user; `sudo whoami` menghasilkan `root`.
- **Pertanyaan:** apakah `sudo` membuat seluruh sesi terminal menjadi root?
- **Payoff (45–50s; 75–83%):** tidak. Pada penggunaan biasa `sudo command`, hak istimewa dipakai untuk command tersebut; setelah command selesai, prompt shell kembali berjalan sebagai user awal. Shell root interaktif adalah skenario berbeda dan tidak didemonstrasikan.

### Tension map

| Scene | Fungsi | Tegangan (1–5) | Energi musik |
|---|---|---:|---|
| S1 | Hasil akhir / hook | 4 | bass tertahan, pulse |
| S2 | Definisi root | 3 | groove rendah |
| S3 | Definisi sudo | 3 | mulai terbuka |
| S4 | Perbandingan cara kerja | 4 | build dan ticking |
| S5 | Risiko salah pakai | 5 | dropout lalu impact |
| S6 | Cara pakai yang disiplin | 4 | stabil, jelas |
| S7 | Payoff dan rangkuman | 2 | resolve hangat |

### Struktur retensi

| Waktu | Fungsi | Isi |
|---|---|---|
| 0–5s | Hook | Perbandingan `whoami` dan `sudo whoami` |
| 5–13s | Definisi | Root = akun UID 0 dengan hak istimewa luas |
| 13–21s | Definisi | sudo = jalankan command sebagai superuser/pengguna lain sesuai policy |
| 21–30s | Perbandingan | Satu command dengan privilege vs sesi root yang terus aktif |
| 30–40s | Wow / risiko | Satu command salah dapat mengubah file sistem atau layanan |
| 40–51s | Praktik | Periksa command, target, dan kebutuhan privilege |
| 51–60s | Payoff | Hak elevated bukan mode kerja harian; kembali ke user biasa |

### Motif visual

1. Kartu `USER` selalu kembali ke warna biru setelah satu akses selesai.
2. Kartu `ROOT / UID 0` merah dan lebih besar; hanya muncul ketika menjelaskan hak istimewa penuh.
3. Log aktivitas muncul sebagai baris kecil; beri label “tergantung konfigurasi logging”.

**Tone:** tegas, edukatif, tidak menakut-nakuti. Hindari klaim bahwa semua distro Linux mengatur root sama seperti Ubuntu.

---

## 2. Aturan Anti-Slop

### Dilarang

- Jangan menyebut `sudo` sebagai sandbox atau jaminan keamanan.
- Jangan menyatakan semua command `sudo` selalu meminta password. Kebijakan dapat mengatur autentikasi dan `NOPASSWD`.
- Jangan menyatakan akun root selalu dinonaktifkan. Ubuntu desktop/server umumnya mengunci login langsung root secara default; distro lain dapat mengatur berbeda.
- Jangan menyatakan root benar-benar tidak bisa dibatasi. Kontrol MAC seperti SELinux/AppArmor dapat tetap membatasi proses.
- Jangan mengajarkan `sudo -i`, `sudo su`, `su -`, `sudoers`, mengubah password root, atau memberi hak sudo ke user lain pada video pemula ini.
- Jangan memakai command destruktif, wildcard, path sistem, atau command yang mengubah permission/ownership.
- Jangan membuat log seolah-olah `sudo` selalu mencatat semua hal. Logging dan audit bergantung konfigurasi.

### Wajib

- Bedakan **akun root** (UID 0) dari **program `sudo`** (mekanisme menjalankan command dengan identitas/privilege sesuai kebijakan).
- Jelaskan bahwa `sudo` umumnya dipakai untuk satu command; jangan menyederhanakan menjadi “selalu sementara” tanpa menyebut bahwa ada mode shell root yang berbeda.
- Gunakan prinsip least privilege: jalankan tanpa privilege tinggi kecuali memang dibutuhkan.
- Jelaskan bahwa command yang tidak dipahami tetap berbahaya walau diawali `sudo`.
- Bedakan perilaku umum Linux dari contoh default Ubuntu/Debian.
- Setiap terminal yang ditampilkan adalah mock UI, bukan klaim terminal live.

---

## 3. Design Tokens

### Tipe visual dan format narasi

- **Tipe utama: V10 — UI / Product Motion.** Mock UI nyata: terminal, pemindai akses, panel izin, log, dan kartu identitas. Kamera C3/C4, kursor sebagai protagonis pendamping.
- **Format:** tutorial explainer 60 detik.
- **Alasan rotasi:** brief terakhir yang tercatat di Registry memakai V2+V1. V10 berbeda dari V2. Tiga video lebih lama belum memiliki kode V, sehingga rotasi terhadap baris lama tidak dapat dipastikan; jangan mengklaim audit rotasi penuh telah lulus.
- **Tanda tangan material:** UI panel metal matte, garis tegas, label mono, indikator status LED statis. Tidak ada glassmorphism atau blur dekoratif.

### Palet P8 — Concrete + Signal

| Token | Warna | Makna |
|---|---|---|
| Background utama | `#141414` | ruang kontrol / latar gelap |
| Panel beton | `#B9B6AE` | panel sistem dan permukaan meja |
| Signal orange | `#FF5A1F` | permintaan privilege / perhatian |
| Putih | `#F5F5F2` | teks utama |
| Merah peringatan | `#C83D32` | risiko / root card |

Tidak memakai gradient sebagai latar penuh. Warna merah bukan berarti root jahat; hanya menandai privilege tinggi.

### Tipografi T4

- Display: **Familjen Grotesk** Bold/ExtraBold.
- Aksen: **Instrument Serif** Italic.
- Mono: **Martian Mono**.
- Self-host font; fallback display `Arial`, mono `monospace` dengan penanda `⟦SETUP: FONT⟧` bila tidak tersedia.

### Canvas dan safe zone

- 1080×1920, 9:16.
- Safe zone konten: x=72–952, y=240–1460.
- Margin horizontal minimum 72px.
- Teks terkecil 32px; label terminal minimal 34px.
- Lebar satu baris maksimal 880px.
- Rasio elemen terbesar:terkecil minimal 6:1 di tiap scene. Gunakan angka latar 220–240px dan label 32–36px.

### Teknik teks

| Kode | Teknik | Pemakaian |
|---|---|---|
| M3 | Cut + type terminal | command dan output |
| M4 | Stamp | label `AUTHORIZED`, `ROOT`, `REVIEW` |
| M5 | Slide-snap | perpindahan panel dan tahap akses |
| M8 | Variable-font morph | `USER` menegang menjadi `ROOT` hanya pada payoff |
| M9 | Split-flap / counter | UID 0 dan indikator 1 command |
| M10 | Slice | pemisahan `sudo` dan command |
| M11 | Outline → fill sweep | headline dan prinsip least privilege |

Minimal empat teknik berbeda; tidak memakai teknik sama di dua scene berurutan.

### Kamera

| Kode | Parameter | Tujuan |
|---|---|---|
| C1 | push-in 1.00→1.07 | penjelasan |
| C2 | pull-back 1.18→1.00 | reveal konteks |
| C3 | pan mengikuti kartu | perpindahan akses |
| C4 | rack focus ringan, blur hanya satu elemen bila perlu | fokus pada UID/panel |
| C6 | parallax shift | kedalaman UI |
| C7 | offset tetap ±5px | impact risiko |

### Transisi

| Kode | Bentuk | Makna |
|---|---|---|
| X1 | panel wipe | pergantian babak |
| X2 | match-cut/morph kartu menjadi prompt terminal | identitas menjadi command |
| X4 | iris ke UID 0 | fokus pada root |
| X5 | push/cover | urutan akses |
| X7 | flip kartu dua sisi | USER vs ROOT |
| X9 | scale-fill panel | risiko meluas ke sistem |

Minimal empat jenis; sekurangnya dua match-cut/morph.

### Ambient dan bahasa gerak

- A3 grid panel bergerak pelan; A4 scanline tipis; A5 napas panel ±1%; A6 caret blink; A7 log redup bergeser.
- Primer: kartu, prompt, status izin.
- Sekunder: pintu bereaksi, panel memantul, log menambah satu baris.
- Ambient: indikator panel, grid, caret; jangan pernah membekukan layar.
- Easing: masuk `power4.out`; keluar `power2.in`; kamera `sine.inOut`; impact `back.out(1.5)`.
- Maksimal tiga jenis easing per scene.

### Elemen persisten

- Header kecil `LINUX ACCESS CONTROL` di pojok kiri atas.
- Kartu `USER` biru muncul di semua scene.
- UID 0 hanya tampil ketika menjelaskan root atau hasil `sudo whoami`.
- Prompt terminal selalu memakai `$` untuk user biasa; jangan menampilkan prompt `#` kecuali sebagai simbol root pada panel penjelasan yang diberi label.

---

## 4. Event Map dan Peta Scene

| Scene | Waktu absolut | Durasi | Nama | Latar | Layout dominan | Kamera | Transisi masuk | Wow / interrupt | Kejadian |
|---|---:|---:|---|---|---|---|---|---|---:|
| S1 | 0–6s | 6s | Siapa yang berjalan? | A | cold-open terminal | C1 | X2 | output berubah | 6 |
| S2 | 6–14s | 8s | Root / UID 0 | B | angka raksasa + panel | C4/C2 | X4 | panel sistem terbuka | 7 |
| S3 | 14–22s | 8s | Sudo memberi izin | C | diagram alur vertikal | C3 | X2 | kartu kembali ke user | 7 |
| S4 | 22–31s | 9s | Satu command vs sesi root | D | split kiri/kanan | C6 | X7 | perbandingan state | 8 |
| S5 | 31–40s | 9s | Risiko salah command | E | macro/micro UI | C7/C2 | X9 | **wow moment 40–60%** | 8 |
| S6 | 40–51s | 11s | Cek sebelum Enter | F | checklist terminal | C3/C1 | X1 | review command/target | 9 |
| S7 | 51–60s | 9s | Kembali ke user biasa | A | cold-open reprise | C2 | X2 | payoff 75–83% | 7 |

### Kurva energi musik

- 0–14s: low-pass, pulse pelan, rasa ingin tahu.
- 14–31s: beat terbuka, tick mengikuti kartu akses.
- 31–40s: riser 1.5s, dropout 0.2s, impact saat pintu sistem terbuka.
- 40–60s: beat lebih stabil, lalu resolve hangat.

---

## 5. Detail Scene

Semua koordinat dalam piksel dari kiri-atas. Tiap Event Map memakai waktu relatif terhadap awal scene. Celah antar kejadian maksimal 1.5 detik. Teks yang sedang dibaca berhenti bergerak; kamera dan ambient tetap halus.

### S1 · SIAPA YANG PUNYA AKSES? (0–6s) · latar A

**Tujuan:** menunjukkan perbedaan identitas user dan hasil command yang dijalankan dengan privilege.

**VO:** “Perhatikan. `whoami` menampilkan user aktif. `sudo whoami` menampilkan `root`. Apakah seluruh terminal berubah jadi root?”

**Dunia visual / protagonis:** kartu `USER` mendekati konsol. Setelah command kedua, output `root` muncul sebagai stempel sementara; kartu tetap biru dan belum berubah permanen.

**Lapisan:** latar dinding panel (0.2×); tengah konsol terminal (0.6×); depan kartu user dan cursor (1.25×); overlay header dan caret (0×).

**Kamera:** C1 push-in 1.00→1.08 selama 5.5s; pan mikro ke output di 3.5s.

**Layout:** headline x=80 y=260 w=900 h=150, 92px; terminal x=90 y=570 w=900 h=360; kartu x=130 y=1080 w=360 h=180; output x=560 y=1080 w=360 h=180. Rasio 240px:32px = 7.5:1.

**Gerak:** Primer: dua command muncul berurutan. Sekunder: kartu bergeser mendekati pemindai dan output memantul ringan. Ambient: A3 + A6 + A7.

**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Tengah | Headline `SIAPA YANG PUNYA AKSES?` masuk | M11 | power4.out | 0.5s | low hit |
| 0.7 | Tengah | `$ whoami` diketik | M3 | steps | 0.7s | keyboard |
| 1.5 | Overlay | Output `user` muncul | M4 | back.out(1.5) | 0.3s | click |
| 2.0 | Depan | Kartu USER meluncur ke pemindai | C3 | power2.out | 0.6s | card slide |
| 2.8 | Tengah | `$ sudo whoami` diketik | M3 | steps | 0.8s | keyboard |
| 3.8 | Tengah | Output `root` muncul; label `UID 0` menyusul | M9 | steps | 0.5s | double tick |
| 4.8 | Kamera | Push-in ke output `root` | C4 | sine.inOut | 0.6s | short whoosh |

**Catalog block:** cek registry untuk terminal type-on dan status stamp; retint ke P8.

**Impact:** output `root` (visual) + camera kick 3% (kamera) + double tick (SFX) + beat hit (musik), sinkron dalam satu frame.

**Match cut:** angka UID 0 membesar menjadi pintu ruang kontrol di S2.

### S2 · ROOT ADALAH AKSES TERTINGGI (6–14s) · latar B

**Tujuan:** mendefinisikan root secara akurat dan menjelaskan luasnya hak.

**VO:** “Root adalah akun superuser dengan UID nol. Haknya luas: mengubah file sistem, permission, akun, dan layanan. Salah langkah bisa berdampak besar.”

**Dunia visual / protagonis:** angka `0` menjadi kartu master merah. Pintu panel file, permission, dan user terbuka; beberapa panel diberi garis batas tipis untuk menunjukkan kontrol keamanan tambahan dapat membatasi akses tertentu.

**Lapisan:** latar koridor panel (0.2×); tengah tiga pintu sistem (0.65×); depan kartu ROOT dan angka 0 (1.3×); overlay label `UID` (0×).

**Kamera:** C4 rack focus dari UID ke pintu; C2 pull-back 1.18→1.00 pada akhir.

**Layout:** angka 0 x=100 y=370 w=500 h=430, 240px; kartu ROOT x=610 y=470 w=350 h=190; tiga pintu x=90/390/690 y=980 w=270 h=260. Label 32px. Rasio 240:32 = 7.5:1.

**Gerak:** Primer: pintu terbuka berurutan. Sekunder: kartu master bergetar kecil setelah tiap pintu terbuka. Ambient: A3 + A4 + A5.

**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Tengah | UID `0` masuk dari match-cut | M9 | back.out(1.4) | 0.5s | metal click |
| 0.9 | Depan | Kartu `ROOT` berputar ke depan | X7 | power2.inOut | 0.6s | card flip |
| 1.8 | Tengah | Pintu `FILES` terbuka | M5 | power3.out | 0.5s | latch |
| 2.8 | Tengah | Pintu `PERMISSIONS` terbuka | M5 | power3.out | 0.5s | latch |
| 3.8 | Tengah | Pintu `USERS` terbuka | M5 | power3.out | 0.5s | latch |
| 4.8 | Overlay | Label `HAK LUAS` distempel | M4 | back.out(1.5) | 0.4s | stamp |
| 6.0 | Kamera | Pull-back menunjukkan panel tambahan dengan garis batas | C2 | sine.inOut | 0.8s | airy whoosh |

**Catalog block:** cek registry untuk 3D card flip CSS dan panel door reveal.

**Impact:** tiga pintu membuka (visual) + pull-back (kamera) + tiga latch (SFX) + riser resolve (musik).

**Match cut:** tiga pintu menyusut menjadi tiga tahap alur `sudo` di S3.

### S3 · `sudo` MEMBERI IZIN UNTUK COMMAND (14–22s) · latar C

**Tujuan:** menjelaskan fungsi sudo sebagai mekanisme menjalankan command dengan privilege sesuai kebijakan.

**VO:** “`sudo` menjalankan command sebagai root atau user lain sesuai kebijakan. Jika diminta, masukkan password akunmu sendiri, bukan password root.”

**Dunia visual / protagonis:** kartu USER melewati pemindai sudo, mendapat token izin untuk satu command, lalu bergerak kembali ke jalur user. Pemindai dapat menolak kartu tanpa hak sudo.

**Lapisan:** latar jalur kabel (0.2×); tengah pemindai dan gerbang policy (0.65×); depan kartu USER dan token satu command (1.25×); overlay label (0×).

**Kamera:** C3 pan vertikal mengikuti kartu; C1 push-in 1.00→1.06.

**Layout:** headline x=80 y=260 w=900 h=120, 88px; pemindai x=330 y=540 w=420 h=300; token `ONE COMMAND` x=280 y=980 w=520 h=150, 64px; label password x=100 y=1240 w=880 h=70, 34px. Rasio 220:32 = 6.9:1.

**Gerak:** Primer: kartu bergerak melewati policy gate dan mengaktifkan token. Sekunder: gate menyala orange, lalu token lepas. Ambient: A3 + A5 + A6.

**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Tengah | Headline `SUDO = IZIN TERKONTROL` masuk | M10 | power4.out | 0.5s | slice |
| 0.8 | Depan | Kartu USER bergerak ke policy gate | C3 | power2.inOut | 0.7s | card slide |
| 1.8 | Tengah | Label `CHECK POLICY` muncul | M4 | back.out(1.4) | 0.3s | scan tick |
| 2.6 | Tengah | Token `ONE COMMAND` tercetak | M9 | steps | 0.6s | counter tick |
| 3.6 | Depan | Token mengikuti satu command keluar gate | X2 | power2.inOut | 0.8s | pass beep |
| 4.8 | Overlay | Catatan `jika diminta oleh policy` muncul | M1 | power2.out | 0.7s | soft click |
| 6.2 | Depan | Kartu kembali ke jalur USER | C3 | power2.inOut | 0.8s | return slide |

**Catalog block:** cek registry untuk gate scan dan token path reveal.

**Impact:** token izin terbentuk (visual) + camera push (kamera) + pass beep (SFX) + beat membuka (musik).

**Match cut:** token satu command terbelah menjadi dua panel perbandingan S4.

### S4 · SATU COMMAND VS SESI ROOT (22–31s) · latar D

**Tujuan:** membedakan penggunaan sudo untuk satu command dengan sesi shell root yang terus berjalan.

**VO:** “Dengan `sudo command`, privilege hanya untuk command itu. Setelah selesai, shell kembali sebagai user awal. Shell root berbeda: command berikutnya berjalan sebagai root sampai keluar.”

**Dunia visual / protagonis:** sisi kiri menunjukkan satu token izin dipakai sekali, lalu kartu USER kembali aktif. Sisi kanan menunjukkan pintu shell root tetap terbuka dan kartu ROOT berada di depan konsol. Jangan tampilkan command untuk membuka shell root.

**Lapisan:** latar garis pemisah (0.2×); tengah dua panel (0.65×); depan token dan kartu (1.25×); overlay label `COMMAND` / `SHELL` (0×).

**Kamera:** C6 parallax kiri-kanan; C1 push-in tipis ke perbandingan.

**Layout:** panel kiri x=80 y=420 w=430 h=760; panel kanan x=570 y=420 w=430 h=760; judul 80px; label 34px; angka `1` latar 220px. Rasio 220:34 = 6.5:1.

**Gerak:** Primer: kiri token habis setelah satu command; kanan pintu root tetap terbuka. Sekunder: panel kiri meredup dan kartu USER kembali ke slot awal. Ambient: A3 + A4 + A7.

**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Tengah | Split panel masuk dengan label `COMMAND` dan `SHELL` | X7 | power2.inOut | 0.6s | split thump |
| 0.8 | Kiri | Token `sudo command` menyala | M3 | steps | 0.5s | keyboard |
| 1.6 | Kiri | Token habis; kartu USER kembali | X2 | power2.inOut | 0.7s | return click |
| 2.6 | Kanan | Pintu shell ROOT tetap terbuka | M5 | power3.out | 0.6s | door hold |
| 3.6 | Tengah | Label `HANYA COMMAND INI` vs `SHELL ROOT` | M11 | power4.out | 0.6s | reveal |
| 4.8 | Overlay | Teks kecil `keluar dari shell untuk kembali` | M1 | power2.out | 0.7s | soft tick |
| 6.2 | Kamera | Pan kiri ke kanan, tunjukkan perbedaan durasi akses | C6 | sine.inOut | 0.8s | stereo whoosh |
| 7.6 | Tengah | Divider mengunci dua keadaan | M4 | back.out(1.3) | 0.4s | stamp |

**Catalog block:** cek registry untuk split comparison panel dan CSS flip.

**Impact:** token kiri habis dan pintu kanan menetap (visual) + pan (kamera) + click vs latch (SFX) + beat kontras (musik).

**Match cut:** pintu root kanan melebar menjadi koridor sistem S5.

### S5 · KENAPA JANGAN ASAL ROOT? (31–40s) · latar E

**Tujuan:** memperlihatkan risiko kesalahan ketika command berjalan dengan hak administratif luas.

**VO:** “Root melewati banyak pembatas biasa. Salah target atau skrip tak tepercaya bisa mengubah file sistem, permission, atau layanan. `sudo` bukan sandbox.”

**Dunia visual / protagonis:** satu command abstrak mendekati tiga panel sistem. Panel berubah merah ketika command salah diarahkan. Jangan tampilkan command destruktif atau contoh payload. Kartu USER di belakang garis pengaman; kartu ROOT berada di depan panel.

**Lapisan:** latar koridor server (0.2×); tengah panel file/config/service (0.65×); depan kartu ROOT dan pointer command (1.3×); overlay warning (0×).

**Kamera:** C7 offset tetap ±5px pada impact; C2 pull-back 1.20→1.00 setelahnya.

**Layout:** headline x=80 y=260 w=900 h=150, 96px; tiga panel x=90/390/690 y=800 w=270 h=300; warning x=100 y=1210 w=880 h=100, 40px. Rasio 240:32 = 7.5:1.

**Gerak:** Primer: pointer menyentuh panel, panel menjadi merah dan jalur melebar. Sekunder: log bertambah tiga baris generik `FILE CHANGE`, `PERMISSION CHANGE`, `SERVICE CHANGE`. Ambient: A4 + A7; A5 menegang sebelum impact.

**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Tengah | Headline `HAK TINGGI = DAMPAK BESAR` masuk | M6 | back.out(1.5) | 0.5s | low hit |
| 0.8 | Depan | Pointer command bergerak menuju panel | C3 | power2.inOut | 0.6s | cursor glide |
| 1.6 | Tengah | Panel FILE menyala merah | X9 | expo.out | 0.5s | warning tick |
| 2.4 | Tengah | Panel PERMISSION menyusul | M5 | power3.out | 0.5s | warning tick |
| 2.8 | Overlay | Log generik bertambah tiga baris | M3 | steps | 0.7s | log ticks |
| 3.2 | Tengah | Panel SERVICE menyusul | M5 | power3.out | 0.5s | warning tick |
| 3.5 | Semua | **WOW:** tiga panel sistem menyala serentak, koridor melebar | X9 + C7 | expo.out | 0.5s | **dropout 0.2s + impact** |
| 4.5 | Kamera | Pull-back memperlihatkan cakupan perubahan | C2 | sine.inOut | 0.8s | deep whoosh |
| 6.0 | Overlay | Stempel `SUDO BUKAN SANDBOX` | M4 | back.out(1.5) | 0.4s | stamp |
| 7.5 | Tengah | Log generik berhenti; panel kembali stabil | M4 | power2.out | 0.4s | resolve tick |

**Catalog block:** cek registry untuk warning panel reveal; CSS only.

**Impact 4 lapis:** panel merah serentak (visual) + camera kick 3% dan offset tetap (kamera) + low thud (SFX) + drop lalu bass hit (musik). Puncak terjadi pada 35.0s = 58.3% durasi, sesuai target 40–60%.

**Match cut:** tiga panel merah menjadi tiga checklist yang netral di S6.

### S6 · CEK SEBELUM MENGETIK `sudo` (40–51s) · latar F

**Tujuan:** memberi prosedur aman yang sederhana dan dapat diingat pemula.

**VO:** “Sebelum Enter, periksa tiga hal: command, target, dan alasan butuh admin. Jangan salin command internet begitu saja. Pahami dulu efeknya. Jangan menebak.”

**Dunia visual / protagonis:** kartu USER berdiri di depan checklist tiga tingkat. Kartu ROOT tetap di balik panel dan hanya dipanggil saat ada alasan administratif yang jelas.

**Lapisan:** latar meja checklist (0.2×); tengah tiga baris pemeriksaan (0.65×); depan kartu USER dan pointer (1.25×); overlay status (0×).

**Kamera:** C3 pan mengikuti tiga item; C1 push-in 1.00→1.06.

**Layout:** headline x=80 y=250 w=900 h=130, 88px; checklist x=110 y=520 w=860 h=650; tiap item 58px; footer x=100 y=1260 w=880 h=90, 36px. Rasio 220:32 = 6.9:1.

**Gerak:** Primer: tiga item dicentang satu per satu. Sekunder: kartu USER bergerak mengikuti tiap item. Ambient: A3 + A5 + A6.

**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Tengah | Headline `CEK SEBELUM ENTER` masuk | M11 | power4.out | 0.5s | paper snap |
| 0.8 | Tengah | Item `COMMAND` muncul | M5 | power3.out | 0.4s | tick |
| 1.8 | Depan | Kartu USER bergerak ke item pertama | C3 | power2.out | 0.4s | card tap |
| 2.8 | Tengah | Item `TARGET` muncul | M5 | power3.out | 0.4s | tick |
| 3.8 | Depan | Kartu bergerak ke item kedua | C3 | power2.out | 0.4s | card tap |
| 4.8 | Tengah | Item `BUTUH ADMIN?` muncul | M5 | power3.out | 0.4s | tick |
| 5.8 | Depan | Kartu bergerak ke item ketiga | C3 | power2.out | 0.4s | card tap |
| 7.0 | Overlay | Footer `PAHAMI DULU, BARU JALANKAN` muncul | M4 | back.out(1.4) | 0.5s | stamp |
| 8.6 | Kamera | Pull-back menunjukkan checklist utuh | C2 | sine.inOut | 0.8s | resolve whoosh |

**Catalog block:** cek registry untuk checklist stagger dan status stamp.

**Impact:** checklist penuh (visual) + pull-back (kamera) + tiga tick terakhir (SFX) + beat stabil (musik).

**Match cut:** checklist menjadi baris ringkas rangkuman di S7.

### S7 · GUNAKAN PRIVILEGE SEPERLUNYA (51–60s) · latar A

**Tujuan:** menutup pertanyaan awal dan mengunci prinsip least privilege.

**VO:** “Jadi, `sudo` tidak otomatis mengubah seluruh terminal jadi root. Pakai privilege hanya saat perlu, lalu lanjutkan bekerja sebagai user biasa.”

**Dunia visual / protagonis:** token satu command padam; kartu USER kembali ke slot awal. Kartu ROOT tetap di lemari terkunci bertanda `ADMIN ONLY`.

**Lapisan:** latar panel awal (0.2×); tengah terminal dan slot kartu (0.65×); depan kartu USER (1.25×); overlay headline (0×).

**Kamera:** C2 pull-back 1.12→1.00, lalu C1 push-in 1.00→1.04 pada kata akhir.

**Layout:** headline x=80 y=260 w=900 h=150, 92px; terminal mini x=100 y=600 w=880 h=250; kartu x=350 y=1030 w=380 h=190; footer x=100 y=1300 w=880 h=70, 34px. Rasio 240:32 = 7.5:1.

**Gerak:** Primer: kartu USER kembali ke slot; token akses menghilang. Sekunder: lemari ROOT tertutup dan indikator `READY` menyala. Ambient: A3 + A5 + A6.

**Event Map:**

| t | Lapisan | Aksi | Teknik | Easing | Durasi | SFX |
|---:|---|---|---|---|---:|---|
| 0.0 | Tengah | Headline `PRIVILEGE SEPERLUNYA` masuk | M8 | power4.out | 0.5s | soft hit |
| 0.8 | Depan | Token satu command padam | X2 | power2.in | 0.4s | soft click |
| 1.8 | Depan | Kartu USER kembali ke slot | C3 | power2.inOut | 0.7s | card return |
| 2.8 | Tengah | Lemari ROOT tertutup | X5 | power2.inOut | 0.5s | latch |
| 3.8 | Overlay | Label `LEAST PRIVILEGE` distempel | M4 | back.out(1.4) | 0.4s | stamp |
| 5.0 | Tengah | Rangkuman `sudo = izin untuk command` | M1 | power2.out | 0.7s | click |
| 6.2 | Kamera | Pull-back memperlihatkan ruang kontrol kembali tenang | C2 | sine.inOut | 0.8s | warm resolve |
| 7.4 | Overlay | Frame awal muncul kembali untuk loop | X2 | power2.inOut | 0.5s | soft tick |

**Catalog block:** cek registry untuk final lock-up and loop match-cut.

**Impact:** kartu USER terkunci di slot (visual) + pull-back (kamera) + latch (SFX) + resolve musik.

**Match cut:** frame akhir identik dengan frame awal S1; loop kembali ke pertanyaan `SIAPA YANG PUNYA AKSES?`.

---

## 6. Audio

- **VO:** Bahasa Indonesia jelas, ±145 kata/menit. Jangan mempercepat istilah teknis sampai tidak terbaca.
- **Pelafalan:** `sudo` = “su-do”; `root` = “ruut”; `whoami` = “hu-am-ai”; `UID` = “yu-ai-di”.
- **Musik:** 120 BPM; tiga fase energi sesuai bagian 4.
- **SFX:** keyboard ringan untuk terminal; scan beep untuk policy gate; latch untuk pintu; low thud untuk risiko; stamp untuk prinsip akhir.
- **Ducking:** musik dan SFX di bawah VO. Dropout 0.2s hanya sebelum wow moment.
- **Tanpa suara:** command, output, definisi, dan checklist tetap terbaca di layar.

---

## 7. Aturan Teknis HyperFrames

### Determinisme

- Semua GSAP timeline `paused: true`, didaftarkan pada `window.__timelines`.
- Dilarang `Math.random()`, `Date.now()`, `setInterval`, dan infinite repeat.
- Camera shake memakai tabel offset tetap; ambient menggunakan posisi statis atau PRNG ber-seed yang dihitung sebelum timeline.
- Semua scene dibungkus `#cam`; minimal tiga layer z dengan parallax berbeda.
- Terminal adalah mock UI. Jangan mengklaim output live.

### Budget render

- DOM beranimasi ≤ 400 elemen per scene.
- Partikel ambient ≤ 120.
- `filter: blur` bersamaan ≤ 3, hanya untuk rack focus dan maksimal 0.6s.
- `backdrop-filter` dilarang.
- Tidak menggunakan WebGL, Three.js, canvas 2D, atau shader; semua panel berupa HTML/CSS/SVG ringan.
- Shadow statis; tidak memakai blur/glow animatif.
- Elemen opsional: scanline A4 dan log latar A7. Hapus keduanya lebih dulu bila render berat.

### Batas konten / keselamatan

- Hanya contoh command read-only di bagian 8.
- Jangan menampilkan `sudo rm`, `rm -rf`, wildcard delete, perubahan ownership/permission, modifikasi `/etc/sudoers`, aktivasi akun root, atau shell root interaktif.
- Jangan menampilkan kredensial, password, username personal, hostname, alamat IP, atau path personal.
- Jangan menyarankan menjalankan skrip dari sumber tidak tepercaya dengan privilege tinggi.
- Jangan menyebut logging, password prompt, atau status root default sebagai perilaku universal semua distro.

### QA

1. Jalankan lint/validate/inspect yang tersedia.
2. Snapshot awal, tengah, akhir tiap scene; setiap transisi; dan wow moment.
3. Pastikan `whoami` dan `sudo whoami` ditulis persis; hasil contoh `root` diberi label ilustratif.
4. Periksa semua teks di safe zone dan minimal 32px.
5. Pastikan tidak ada command destruktif yang masuk ke komposisi.
6. Pastikan timing wow final berada pada 40–60% durasi (24–36s); jika event map bergeser, perbarui semua timestamp.
7. Preview pada layar ponsel, lalu jalankan Boredom Audit.
8. Render MP4 hanya setelah checklist lulus.

---

## 8. Fakta dan Sumber

### Command final yang boleh muncul di layar

```bash
whoami
sudo whoami
```

**Output ilustratif:**

```text
user
root
```

Catatan: `user` adalah placeholder generik, bukan nama akun nyata. `sudo whoami` menghasilkan `root` pada konfigurasi umum ketika user diizinkan menjalankan command sebagai root. Kebijakan sudo dapat mengubah identitas tujuan atau membatasi command.

### Klaim dan batas akurasi

| Klaim | Penjelasan akurat | Sumber |
|---|---|---|
| Root adalah superuser | Pada Linux, root adalah akun dengan UID 0. Ia umumnya dapat membaca/menulis/menghapus banyak file sistem, mengubah permission/ownership, dan mengelola akun. Kontrol MAC seperti SELinux/AppArmor dapat membatasi proses root. | Debian Wiki: Root; Debian Reference |
| sudo menjalankan command sebagai user lain | `sudo` menjalankan command sebagai superuser atau pengguna lain sesuai kebijakan keamanan. Kebijakan default umumnya `sudoers`. | Debian manpages `sudo(8)` |
| sudo tidak otomatis memberi semua orang akses | Hanya user yang diizinkan oleh policy yang dapat menjalankan perintah melalui sudo; policy dapat membatasi command dan autentikasi. | Debian manpages `sudo(8)`; Ubuntu Server docs |
| Password yang diminta pada Ubuntu umum adalah password user pemanggil | Ubuntu mendokumentasikan bahwa user authorized memakai password miliknya, bukan password root. Ini bukan aturan universal untuk semua konfigurasi. | Ubuntu Server docs |
| Root tidak selalu bisa login langsung di Ubuntu | Ubuntu mengunci akun root secara default pada instalasi standar; akun root tetap ada. Distro lain dapat memilih konfigurasi berbeda. | Ubuntu Server docs |
| Least privilege mengurangi risiko | Gunakan privilege tertinggi hanya saat diperlukan; bekerja sebagai root terus-menerus memperbesar dampak kesalahan atau kompromi proses. | Debian Wiki: sudo; Ubuntu Security FAQ |
| Logging dapat membantu audit | sudo mendukung plugin logging/auditing, tetapi cakupan dan penyimpanannya bergantung konfigurasi. | Debian manpages `sudo(8)`; Debian Wiki: sudo |

### Sumber primer / resmi

1. Debian manpages — `sudo(8)`: https://manpages.debian.org/trixie/sudo/sudo.8.en.html
2. Ubuntu Server Documentation — User management: https://ubuntu.com/server/docs/security-users/
3. Debian Wiki — sudo: https://wiki.debian.org/sudo
4. Debian Wiki — Root: https://wiki.debian.org/Root
5. Debian Reference — GNU/Linux tutorials, root account: https://www.debian.org/doc/manuals/debian-reference/ch01.en.html
6. Ubuntu Security Team FAQ — sudo: https://wiki.ubuntu.com/SecurityTeam/FAQ
7. Ubuntu Desktop Help — How do administrative privileges work?: https://help.ubuntu.com/stable/ubuntu-help/user-admin-explain.html

### Konflik / batas sumber

- Ubuntu mengunci login root secara default, tetapi Debian dan distribusi lain dapat mengaktifkan password root atau menggunakan pola administrasi berbeda. Narasi harus menyebut Ubuntu sebagai contoh, bukan generalisasi Linux.
- `sudo` dapat menjalankan command sebagai superuser atau user lain; jangan menyatakan semua konfigurasi selalu menjalankan command sebagai root.
- Prompt password dan timeout ditentukan kebijakan sudoers; jangan menyebut angka timeout sebagai nilai universal.
- Logging/audit didukung, tetapi tidak boleh diklaim selalu aktif atau selalu mencatat semua output.
- Root memiliki hak sangat luas, tetapi Mandatory Access Control dapat membatasi operasi tertentu.

### Cek ulang sebelum posting

- Buka kembali dokumentasi `sudo(8)` dan Ubuntu Server User Management.
- Pastikan contoh `whoami` dan `sudo whoami` konsisten dengan output ilustratif.
- Pastikan semua kalimat yang menyebut default root diberi konteks Ubuntu.
- Pastikan tidak ada command untuk membuka root shell atau mengubah konfigurasi sudoers.
- Pastikan visual log diberi keterangan “tergantung konfigurasi logging”.

---

## 9. Prompt untuk Agent

```text
Using /hyperframes (faceless-explainer workflow) [or /video-reels if available], build the video described in BRIEF.md.

Rules:
- Follow BRIEF.md exactly: scene timing, layout coordinates, copy, colors, fonts, motion codes (M/C/X/A), and event maps. Do NOT improvise design.
- Canvas 1080x1920, 60fps final, 60s total. Use the Design Tokens block as DESIGN.md.
- Self-host fonts: Familjen Grotesk, Instrument Serif, Martian Mono. If unavailable, use fallbacks and report ⟦SETUP: FONT⟧.
- Deterministic only: paused GSAP timelines. No Math.random/Date.now/infinite repeats. Use fixed values for ambient positions and camera shake.
- Wrap every scene in a camera element (#cam) and implement the camera moves in the brief. Place content in 3-4 depth layers with different parallax factors.
- Before hand-building any transition, effect, caption style, chart, or code animation, consult /hyperframes-registry and install the matching catalog block. Retint catalog blocks to P8. Do not invent catalog IDs.
- Implement every impact as four synchronized layers (visual, camera, SFX, music) within one frame at 60fps.
- Implement Visual Type V10 consistently: realistic UI mockups, terminal, access panel, cursor, and card-based motion. Do not switch material language mid-video.
- Respect CPU render budget in section 7. Drop optional scanline A4 and background log A7 first if render is heavy.
- Generate VO, music, and SFX via the project pipeline. Sync kinetic text to word-level VO timestamps.
- SECURITY / PRIVILEGE SAFETY: obey the “Batas konten / keselamatan” section. Never add destructive commands, root-shell commands, sudoers edits, or privilege-granting instructions.
- Every command and output shown on screen must match section 8 exactly. The output is illustrative, not claimed as live output.
- Run lint/validate/inspect (if available), then snapshot key frames (start, middle, end of every scene, every transition, and wow moment). Check against QA and Boredom Audit.
- Render MP4 only after the checklist passes.
```

---

## 10. Caption Postingan

Apa bedanya `sudo` dan `root` di Linux?

- `root` adalah akun superuser dengan UID 0 dan hak administratif sangat luas.
- `sudo` menjalankan command dengan privilege sesuai kebijakan sistem.
- Jangan asal menambahkan `sudo`. Periksa command, target, dan alasan kenapa butuh akses admin.

Gunakan prinsip **least privilege**: hak tertinggi hanya saat diperlukan.

#Linux #BelajarLinux #LinuxPemula #Sudo #Root #LinuxTerminal #CyberSecurity

---

## 11. Catatan Variasi

| Dimensi | Video terakhir tercatat (Video 4) | Brief ini | Status |
|---|---|---|---|
| Tipe visual | V2 + aksen V1 | V10 | Berbeda dari tipe utama terakhir |
| Palet | P4 Riso print | P8 Concrete + Signal | Berbeda |
| Tipografi | T2 Archivo / Newsreader / IBM Plex Mono | T4 Familjen Grotesk / Instrument Serif / Martian Mono | Berbeda |
| Teknik teks utama | M6 + M2 | M3 + M4 + M5 + M8 + M9 + M10 + M11 | Berbeda |
| Metafora / dunia | Bengkel arsip / kartu file | Ruang kontrol akses / kartu administrator | Berbeda |
| Layout dominan | Terminal + rak, split source/destination | UI panel, access gate, split command-vs-shell | Berbeda |

**Catatan Registry:** Video 1–3 masih belum memiliki kode visual V. Video 4 adalah V2+V1. V10 dipilih karena berbeda dari satu tipe utama yang tercatat dan sesuai kandidat format tutorial. Karena kode V pada tiga video lama belum tercatat, status rotasi penuh terhadap seluruh tiga video terakhir tetap **belum terverifikasi**. Jangan mengarang tipe visual untuk mengisi Registry.

### Baris Registry setelah brief disetujui

| Video | Topik | Tipe visual (V) | Palet | Tipografi | Teknik teks utama | Metafora / Dunia visual | Tanggal |
|---|---|---|---|---|---|---|---|
| 5 | Apa itu sudo dan kenapa jangan asal pakai root? | V10 | P8 | T4 | M3 + M4 + M9 | Ruang kontrol akses / kartu administrator | 7 Nov 2026 |

---

## 12. Hasil Boredom Audit

| # | Pemeriksaan | Target | Hasil desain | Status |
|---|---|---|---|---|
| 1 | Celah terbesar antar kejadian | ≤ 1.5s | Event Map disusun dengan interval 0.8–1.4s; perlu verifikasi timeline final | Lulus desain |
| 2 | Teknik teks berbeda | ≥ 4; tidak berturut-turut | 7 teknik: M1, M3, M4, M5, M8, M9, M10, M11 | Lulus desain |
| 3 | Jenis transisi | ≥ 4; ≥ 2 match-cut/morph | X1, X2, X4, X5, X7, X9; X2/X9 match-cut/morph | Lulus desain |
| 4 | Kamera per scene | 100% | 7/7 scene memiliki kamera | Lulus desain |
| 5 | Lapisan z/parallax | ≥ 3 layer di ≥ 70% scene | 7/7 scene memiliki 4 layer | Lulus desain |
| 6 | Kontras skala | ≥ 6:1 per scene | Rasio rancangan 6.5:1–7.5:1 | Lulus desain; cek lebar teks saat preview |
| 7 | Ambient per scene | 100% | A3/A4/A5/A6/A7 dialokasikan di semua scene | Lulus desain |
| 8 | Wow moment | 40–60% durasi, 4 lapisan sinkron | Dipatok pada 35s = 58.3%; visual + kamera + SFX + musik | Lulus setelah timestamp event diselaraskan |
| 9 | Pattern interrupt | Tidak ada rentang >10s | Pergantian panel/scale/mode pada setiap scene; interval 6–9s | Lulus desain |
| 10 | Open loop | Dibuka ≤5s; ditutup 70–85% | Dibuka 0s; payoff 45–50s = 75–83% | Lulus desain |
| 11 | Kurva ketegangan | Puncak 70–85% | Tension map naik ke risiko, resolve pada akhir; puncak naratif 45–50s | Lulus desain |
| 12 | Dinamika musik | ≥3 keadaan energi | Tertahan, build/drop-impact, resolve | Lulus desain |
| 13 | Metafora dan protagonis | ≥60% scene; protagonis ≥70% | Ruang kontrol 7/7; kartu akses 7/7 | Lulus desain |
| 14 | Budget render | Sesuai bagian 11 | DOM UI 2D; tanpa WebGL, canvas, blur berat; ambient opsional | Lulus desain |
| 15 | Keterbacaan | ≥0.3s/kata +0.5s; ≤25 kata/scene; kontras ≥4.5:1 | Copy ringkas; teks min 32px; perlu preview ponsel | Lulus desain |
| 16 | Tipe visual | Berbeda dari 3 video terakhir | V10 berbeda dari V2 terakhir yang tercatat; 3 kode V lama belum tersedia | Perlu verifikasi Registry |

### Checklist akhir

- [x] Struktur bagian 0–12 lengkap dan berurutan.
- [x] Concept Lab dan Hook Lab memiliki kandidat, skor, dan alasan.
- [x] Pesan inti satu kalimat; seluruh scene mendukung pesan.
- [x] Durasi total 60 detik; batas scene kelipatan 0.5 detik.
- [x] Command dibatasi pada dua command read-only.
- [x] Perbedaan sudo/root dan caveat distro dijelaskan.
- [x] Sumber primer dan dokumentasi resmi dicantumkan.
- [x] Batas konten untuk tutorial privilege ditulis eksplisit.
- [ ] Tiga kode V video terdahulu yang belum tercatat perlu diperbarui di Registry.
- [ ] Uji command dan output pada distro target sebelum produksi.
- [ ] Preview ponsel, snapshot transisi, dan QA akhir lulus sebelum render MP4.

**Catatan timing:** wow event final berada pada t=3.5s relatif S5 (35s absolut). Tidak ada wow event kedua. Semua timestamp relatif S5 berada di rentang 0–9s.
