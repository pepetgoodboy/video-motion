# BRIEF: Cara Coba Linux Tanpa Hapus Windows (WSL atau VirtualBox)

| Item | Isi |
|---|---|
| Judul | Cara Coba Linux Tanpa Hapus Windows (WSL atau VirtualBox) |
| Format | Reels/TikTok 9:16, 1080×1920, 60 fps (render 120 fps lalu blend ke 60) |
| Durasi | **85 detik, 9 scene** (dipilih dari topik: dua mini-tutorial, satu wow, satu adu keputusan; batas maksimal 120 detik) |
| Engine | HyperFrames (HTML + CSS + GSAP timeline `paused`, deterministik) |
| Bahasa | Indonesia santai-teknis, dengan voice over |
| Status fakta | **29 Okt 2026.** Versi, syarat sistem, dan perintah bisa berubah; lihat daftar "cek ulang" di bagian 8 |
| Lingkungan render | CPU tanpa GPU (default). Batas di bagian 7 |
| Asumsi | (1) Penonton pengguna Windows pemula sampai menengah yang ingin mencoba Linux. (2) Hanya host Windows; Mac dan Linux tidak dibahas. (3) Distro contoh Ubuntu (default WSL; Ubuntu 26.04 LTS untuk VirtualBox). (4) Dual boot dan Live USB hanya disebut sebagai alasan ragu, tidak diajarkan. (5) Tanpa logo resmi merek apa pun, hanya label teks. |

---

## 0. Cara pakai file

1. Simpan sebagai `BRIEF.md` di folder proyek HyperFrames.
2. Jalankan Claude Code, lalu tempel prompt di bagian 9.
3. Tinjau snapshot per scene dan hasil Boredom Audit (bagian 12) sebelum render.
4. Render MP4, lalu cek daftar "cek ulang" (bagian 8) sebelum posting.

---

## 1. Konsep

**Pesan inti:** Kamu bisa coba Linux tanpa menghapus Windows: pakai WSL kalau cukup terminal, pakai VirtualBox kalau mau desktop Linux penuh.

### 1.1 Concept Lab

| Kandidat | Dunia dan metafora literal | Protagonis | Momen wow | Open loop | L | A | G | K | F | Total |
|---|---|---|---|---|---|---|---|---|---|---|
| **A. Dapur restoran (DIPILIH)** | Windows = dapur utama; WSL = stasiun masak tambahan yang dibangun dan dikelola pemilik restoran; VirtualBox = food truck rakitan sendiri | Tiket pesanan "LINUX" | Zoom masuk ke stasiun WSL: ternyata ada food truck mini di dalamnya (WSL 2 juga mesin virtual, dikelola Windows) | "Dua cara, satu rahasia. Mana yang pas buatmu?" | 5 | 4 | 5 | 4 | 4 | **22/25** |
| B. Peta kereta bawah tanah | Windows = kota di permukaan; WSL = tangga ke jalur Linux; VirtualBox = kota bawah tanah terpisah | Titik penumpang | Kamera jatuh ke bawah tanah | "Ke mana jalurmu?" | 4 | 3 | 5 | 3 | 4 | 19/25 |
| C. Ruang uji berkaca | VirtualBox = ruang kaca yang bisa dibatalkan; WSL = pintu penghubung ke lab sebelah | Sampel tabung | Kaca pecah lalu pulih (snapshot) | "Bisa dibatalkan?" | 4 | 3 | 3 | 4 | 4 | 18/25 |

L = Literal, A = Akurat, G = Gerak, K = Kebaruan, F = Feasibility.

- **Ditolak B:** metafora "bawah tanah" menyiratkan Linux berada di bawah Windows (hierarki keliru), dan WSL tidak punya padanan "tangga" yang akurat.
- **Ditolak C:** hanya pas untuk VirtualBox (sandbox); WSL tidak punya padanan wajar, dan geraknya cenderung statis.
- **Catatan akurasi A (4/5):** WSL 2 sendiri memakai VM ringan yang dikelola Windows. Metafora tidak menyembunyikannya, justru dijadikan wow (S5). Semua diagram ditandai "ilustrasi konseptual".

### 1.2 Hook Lab (5 opsi)

| # | Jenis | Hook (≤ 7 kata) | Catatan |
|---|---|---|---|
| 1 | Kontradiksi | PASANG LINUX. WINDOWS TETAP UTUH. | Aman, tapi terdengar seperti janji iklan |
| 2 | Angka mengejutkan | 1 PERINTAH. 0 PARTISI DIUBAH. | "1 perintah" hanya benar untuk WSL, menyesatkan untuk VirtualBox |
| 3 | Pertanyaan yang salah | BUKAN WINDOWS ATAU LINUX. | Intelektual, tapi kurang visual di detik pertama |
| 4 | **Cold open hasil akhir (DIPILIH)** | **LINUX. DI DALAM WINDOWS.** | Hasil ditunjukkan dulu (terminal Linux di jendela Windows) |
| 5 | Taruhan | SALAH KLIK, WINDOWS BISA HILANG. | Menakut-nakuti; tidak menggambarkan dua jalur yang dibahas |

**Alasan memilih #4:** frame t=0 langsung layak jadi cover, ada gerak sejak frame pertama, dan janjinya (Linux tanpa menghapus Windows) benar untuk kedua jalur sehingga bisa ditepati.

### 1.3 Dunia visual dan protagonis

- **Dunia visual:** denah dapur restoran dilihat dari atas. Tiga zona: **Dapur Utama** (Windows, host), **Stasiun Tambahan** menempel di dinding dapur (WSL), **Food Truck** di halaman parkir (VirtualBox). Kamera menyusuri denah ini.
- **Protagonis visual:** **tiket pesanan "LINUX"** yang menggantung di rel tiket. Nasibnya: dipesan (S1 hasil jadi), ragu (S2), dimasak di dua tempat (S3-S7), lalu dibatalkan tanpa merusak dapur utama (S8).

### 1.4 Tabel metafora

| Konsep teknis | Metafora | Gerak yang membawa maknanya |
|---|---|---|
| Windows (host) | Dapur utama | Lantai ubin beton, tetap utuh dari awal sampai akhir |
| Dual boot | Membongkar lantai dapur utama (partisi) | Garis potong merekah, guncang (S2) |
| WSL 2 | Stasiun masak tambahan yang dibangun dan dikelola pemilik restoran, memakai jalur gas yang sama | Katup gas membuka dan menutup sendiri |
| Kernel Linux asli di WSL 2 | Food truck mini tersembunyi di dalam stasiun | Zoom masuk (macro), lalu keluar (micro) di S5 |
| VirtualBox | Food truck rakitan sendiri di halaman | Truk menggambar diri, jendela layanan menampilkan desktop |
| Jatah RAM dan disk | Tangki gas dan bak penyimpanan truk | Meter terisi, pipa mengalirkan partikel dari dapur utama |
| Snapshot | Foto polaroid kondisi truk | Flash putih lalu foto mendarat di daftar langkah |
| Hapus distro atau VM | Tiket dibatalkan, dapur utama tidak tersentuh | Garis menghapus diri mundur, lantai utuh (S8) |

### 1.5 Open loop dan payoff

- **Loop utama:** dibuka S1 pada **3.5 s** ("2 CARA · 1 RAHASIA"; VO: "Ada dua cara, dan satu rahasia"). Dibayar S7: jawaban "WSL" pada **64.5 s (75.9%)** dan "VirtualBox" pada **68.4 s (80.5%)**.
- **Mini-loop "rahasia":** dibuka S1 (3.5 s) dan diperkuat S4 pada 30.5 s ("TAPI ADA RAHASIA"). Dibayar S5 pada **36.0 s (42.4%)**: WSL 2 ternyata juga mesin virtual.
- Dilarang clickbait. Kedua janji ditepati dengan isi nyata.

### 1.6 Tension map dan struktur retensi

| Scene | Waktu | Fungsi | Ketegangan (1-5) | Energi musik | Pengait retensi |
|---|---|---|---|---|---|
| S1 | 0.0-6.0 | Hook (cold open) | 4 | E1 tertahan, bass rendah | Hasil dulu, open loop |
| S2 | 6.0-13.0 | Masalah (takut Windows hilang) | 3 | E1 | Retak lantai (impact) |
| S3 | 13.0-20.0 | Kenalkan dua pilihan | 2 | E1 | Peta dapur, tiket bepergian |
| S4 | 20.0-32.0 | Tutorial WSL | 3 | E1 | Layar restart (interrupt), "tapi ada rahasia" |
| S5 | 32.0-42.0 | **Wow**: WSL juga VM | 4 | riser lalu **E2 terbuka** | Macro/micro, flash invert |
| S6 | 42.0-59.0 | Tutorial VirtualBox | 3 | E2 | Tilt 3D, counter RAM dan disk |
| S7 | 59.0-73.0 | **Adu dan keputusan (puncak)** | 5 | **E3 ketat, berdenyut** | Dua stempel jawaban |
| S8 | 73.0-80.0 | Resolve: aman, bisa dibatalkan | 2 | **E4 resolve hangat** | Lantai utuh |
| S9 | 80.0-85.0 | CTA dan loop ke frame awal | 2 | E4 menyambung ke nada E1 | Tulis di komentar, loop |

Kurva: 4, 3, 2, 3, 4, 3, **5**, 2, 2 (naik, turun, naik, turun, puncak di 69-86% durasi, resolve).

### 1.7 Motif visual (maks 3) dan tone

- **Motif:** (1) rel tiket di atas dengan titik progres, (2) pipa gas dengan partikel mengalir, (3) ubin lantai 120 px dan garis denah.
- **Tone:** tenang, ramah, sedikit bercanda. Bukan fanboy: kelemahan WSL dan VirtualBox disebut jujur.

---

## 2. Aturan anti-slop

**Dilarang:**
- Logo atau ikon resmi Windows, Ubuntu, Linux (penguin), Oracle, VirtualBox. Pakai label teks.
- Gradient ungu-biru, glassmorphism, `backdrop-filter`, bingkai HP dengan notch generik, emoji di video.
- Diagram kotak-garis generik tanpa makna gerak (semua gerak mengikuti tabel semantik di bagian 3).
- Klaim performa berangka ("2× lebih cepat") tanpa sumber; kata "tercepat", "terbaik" untuk satu opsi.
- Perintah, label UI, atau angka yang tidak ada di bagian 8.
- Teks di bawah 32 px; baris lebih dari 880 px; konten di luar safe zone.
- Glitch (X10), karena topik ini bukan serangan atau error.

**Wajib:**
- Setiap angka, versi, dan perintah di layar sama persis dengan bagian 8.
- Kelemahan masing-masing opsi disebut (S7).
- UI mock berisi konten asli (perintah asli, label asli). Label UI yang belum terverifikasi ditandai ⟦CEK⟧ dan memakai label generik bila tidak bisa dicek.
- Semua diagram mekanisme diberi tag "ilustrasi konseptual".
- Mode tanpa suara: teks di layar tetap membawa pesan inti.

---

## 3. Design tokens

### 3.1 CSS (jadikan DESIGN.md)

```css
:root {
  /* Warna (maks 5, makna tetap) */
  --beton:  #B9B6AE; /* dapur utama / host Windows. Latar netral. */
  --ink:    #141414; /* terminal, dunia Linux. Teks di atas terang. */
  --putih:  #F5F5F2; /* kartu, UI, teks di atas gelap */
  --sinyal: #FF5A1F; /* tiket, sorotan, perhatian, kelemahan */
  --aman:   #2FBF71; /* aman, berhasil, jalan terus */

  /* Font (self-host, Google Fonts) */
  --f-display: "Familjen Grotesk", sans-serif;      /* variable, axis wght (cek) */
  --f-accent:  "Instrument Serif", serif;           /* italic */
  --f-mono:    "Martian Mono", monospace;           /* lebih lebar: pakai faktor 0.7 */

  /* Canvas */
  --w: 1080px; --h: 1920px;
  --safe-x1: 72px; --safe-x2: 952px;   /* lebar baris maks 880px */
  --safe-y1: 240px; --safe-y2: 1460px;
}
```

**Aturan kontras (dihitung):** teks `--sinyal` hanya di atas `--ink` (5.9:1). Fill `--sinyal` atau `--aman` selalu dengan teks `--ink` (5.9:1 dan 7.7:1). Teks `--ink` di atas `--beton` 9.1:1 dan di atas `--putih` lebih dari 16:1. Teks `--putih` atau `--beton` di atas `--ink` 16.8:1 dan 9.1:1. **Dilarang:** teks `--sinyal` di atas `--beton` atau `--putih` (di bawah 3:1); teks `--aman` di atas `--beton`.

**Warna per babak (makna warna tetap, dominasi berpindah):** S1 ink, S2 beton, S3 putih, S4 ink, S5 ink lalu **flash invert** ke beton saat wow, S6 putih lalu beton, S7 beton (atas) dan ink (bawah), S8 aman penuh, S9 ink.

### 3.2 Lapisan, kamera, dan HUD

- **L0 latar** (warna + ubin + grain statis, parallax 0.2×). **L1 tengah** (denah, UI mock, objek). **L2 depan** (tiket, ikon, label; parallax 1.3× pada objek). **L3 overlay** (vignette tipis, flash).
- **Aturan HUD (menjaga safe zone):** kamera `#cam` hanya menskalakan L0, L1, dan objek L2 (tiket, ikon). **Semua teks ≥ 48 px, chip, label, dan ledger berada di HUD** di luar `#cam` (hanya geser parallax ≤ 16 px). Teks kecil di dalam UI mock (terminal, jendela PowerShell) ikut kamera dan sudah diberi inset: untuk skala ≤ 1.08, teks UI mock harus berada di x 108→921 dan y 293→1423.

### 3.3 Skala tipografi

| Peran | Font | Ukuran (px) |
|---|---|---|
| Ghost numeral / kata raksasa | Display bold | 520, 480, 360, 240, 220, 200 |
| Headline | Display bold | 120, 110, 96, 84, 80, 76, 72, 64 |
| Aksen (sub-label) | Instrument Serif italic | 48 |
| Perintah dan chip | Martian Mono | 56, 40 |
| Label terkecil | Martian Mono | **32 (minimum)** |

Lebar teks: display ≈ 0.68 × jumlah karakter × ukuran (huruf kapital), mono (Martian Mono) ≈ 0.7 × karakter × ukuran. Semua baris sudah dihitung ≤ 880 px.

### 3.4 Teknik teks yang dipakai (kode M)

| Kode | Dipakai di | Catatan parameter |
|---|---|---|
| M1 Mask reveal | S2, S3, S9 | Label kalem |
| M2 Bar-wipe | S6 (judul) | Satu kali |
| M3 Cut + type | S4, S6 | `steps(n)` per karakter, tanpa timer nyata |
| M4 Stamp | S1, S2, S6, S7 | Maks 3 per scene |
| M5 Slide-snap | S1, S4, S7, S2, S6 | Panel dan teks bergerak bersama |
| M6 Word slam | S1, S4, S5, S7, S9 | Mulai scale 1.12 (bukan 1.4) agar frame awal tetap terbaca |
| M8 Variable-font morph | S5, S8 | `wght` 400→700 pada Familjen Grotesk. **Cek axis;** bila tidak ada, ganti M12 |
| M9 Split-flap / counter | S1, S4, S6 | Angka |
| M10 Slice | S2, S5, S7, S8 | Pergantian pernyataan |
| M11 Outline → fill sweep | S3, S5 | Hanya teks > 40 px |
| M12 Per-karakter drop | S3, S9 | Kata pendek |

**Teknik utama per scene (tidak ada yang sama di dua scene berurutan):** S1 M6, S2 M10, S3 M12, S4 M3, S5 M11, S6 M9, S7 M4, S8 M8, S9 M6.

### 3.5 Preset kamera (kode C)

| Kode | Dipakai di | Parameter |
|---|---|---|
| C1 Push-in | S1 (1.00→1.06), S2 (1.00→1.05), S3 (1.00→1.04), S5 (1.40→1.52 sebelum wow), S6 (1.00→1.08), S7 (1.00→1.04) | `sine.inOut` |
| C2 Pull-back | S5 (1.52→1.00), S6 (1.08→1.00), S8 (1.25→1.00), S9 (→1.00) | `sine.inOut` |
| C3 Pan vertikal | S3 (0→-200 px, 3.0 s) | `sine.inOut` |
| C4 Rack focus | S4 (blur 5 px, maks 3 elemen) | `power2.inOut` |
| C5 Tilt 3D | S6 (rotateX ≤ 8°, perspective 1600 px) | Hanya kartu truk |
| C6 Parallax shift | S3, S7 | Tanpa 3D |
| C7 Guncang tabel tetap | S1 (kick +3%), S2 (retak), S5 (wow) | S2: `[+10,-8,+6,-4,+2,0]` px; S5: `[+12,-9,+6,-4,+2,0]` px; langkah 0.03 s |
| C8 Zoom-through | S4 akhir (1.0→2.6) menuju S5 | `power2.in` |

### 3.6 Daftar transisi (kode X)

| Dari → ke | Kode | Makna |
|---|---|---|
| S1 → S2 | **X2 match-cut** | Taskbar Windows mengerut jadi garis partisi lantai: "hasil" berubah jadi "ketakutan" |
| S2 → S3 | X4 iris | Fokus ke tiket yang mulai bepergian |
| S3 → S4 | X5 push/cover | Urutan: pilihan lalu langkah |
| S4 → S5 | X8 zoom-through | Masuk ke dalam stasiun WSL |
| S5 → S6 | **X2 morph** | Food truck mini (di dalam WSL) mengembang jadi food truck VirtualBox |
| S6 → S7 | X7 flip 3D | Dua sisi satu hal |
| S7 → S8 | X9 scale-fill | Stempel "COCOK" hijau mengembang jadi latar aman |
| S8 → S9 | X1 panel wipe | Ganti mode ke ajakan |
| Dalam S5 | X6 flash invert | Hanya di momen wow |

Total **8 jenis** (X1, X2, X4, X5, X6, X7, X8, X9), **2 match-cut/morph**. Transisi shader: 0.

### 3.7 Ambient (kode A) dan easing

| Kode | Scene |
|---|---|
| A1 grain bergeser | Semua |
| A2 partikel (gas, debu) | S3 (≤ 40), S4 (≤ 20), S5 (≤ 30), S6 (≤ 50) |
| A3 grid/ubin parallax drift | S1, S2, S3, S4, S7, S8, S9 |
| A5 napas (scale ±1%, 3.5 s) | S2, S5, S8 |
| A6 kedip caret (pengulangan terbatas, bukan `repeat: -1`) | S1, S4, S9 |
| A8 shimmer sedang | S2, S6, S7 |

**Easing (maks 3 jenis per scene):** masuk `power4.out` atau `expo.out`; keluar `power2.in`; kamera `sine.inOut` atau `power2.inOut`; impact `back.out(1.7)`; ketik, cap, langkah `steps(n)`; garis menggambar diri `power2.inOut`.

### 3.8 Elemen persisten

**Rel tiket:** garis 6 px di y=296 dari x=72 sampai x=952, dengan 9 titik (satu per scene). Tiket mini 64×88 meluncur ke titik scene aktif sebagai penanda progres (disembunyikan di S1 dan di akhir S9). Warna garis mengikuti latar (beton di atas ink, ink di atas terang).

---

## 4. Event Map dan Peta Scene

| Scene | Waktu | Durasi | Nama | Latar | Kamera | Transisi Masuk | Wow/Interrupt | Kejadian | Energi Musik |
|---|---|---|---|---|---|---|---|---|---|
| S1 | 0.0 | 6.0 | Hook | Ink | C1 push-in | - | - | 8 | E1 (tertahan, bass) |
| S2 | 6.0 | 7.0 | Ketakutan | Beton | C1 push-in | X2 match-cut | Retak & guncang | 7 | E1 |
| S3 | 13.0 | 7.0 | Dua Jalur | Putih | C3 pan vert. | X4 iris | - | 7 | E1 |
| S4 | 20.0 | 12.0 | Tutorial WSL | Ink | C4 rack focus | X5 push | Layar restart | 12 | E1, riser di akhir |
| S5 | 32.0 | 10.0 | **Wow: WSL itu VM** | Beton | C8 → C2 | X8 zoom-through | **Flash invert (36.0)** | 11 | **E2 (terbuka)** |
| S6 | 42.0 | 17.0 | Tutorial VBox | Putih | C5 tilt 3D | X2 morph | - | 15 | E2 |
| S7 | 59.0 | 14.0 | Keputusan | Belah | C1 push-in | X7 flip 3D | Stempel besar | 14 | **E3 (ketat, denyut)** |
| S8 | 73.0 | 7.0 | Aman Batal | Aman | C2 pull-back | X9 scale-fill | - | 7 | **E4 (resolve)** |
| S9 | 80.0 | 5.0 | Loop CTA | Ink | C2 pull-back | X1 panel wipe | - | 6 | E4 nyambung ke E1 |

---

## 5. Detail Scene

### S1 · Hook (0.0-6.0, 6.0 s) · latar Ink

**Tujuan:** Cold open menunjukkan hasil akhir yang mustahil (Linux di dalam Windows) untuk memancing penasaran.
**VO:** "Pengen belajar Linux tapi takut Windows kamu rusak? (0.5s) Linux, di dalam Windows. (0.3s) Ada dua cara, dan satu rahasia."
**Dunia visual / protagonis:** Protagonis belum muncul, hanya terminal melayang di atas desktop Windows.
**Lapisan:** L0 latar = terminal ink blur; L1 tengah = jendela Windows (taskbar bawah); L2 depan = teks kinetik; L3 = vignette. Parallax: L1 (1.0x), L2 (1.3x).
**Kamera:** C1 push-in ringan 1.00→1.06; C7 kick saat terminal muncul.
**Layout:**
- Jendela: x 140, y 600, w 800, h 600, putih.
- Headline `LINUX. DI DALAM WINDOWS.`: x 72, y 400, f-display 84px, sinyal (Skala 84:32 = 2.6:1).
**Gerak:** Primer = terminal pop-up; Sekunder = pantulan taskbar; Ambient = A1 grain, A6 kedip caret (0.5s siklus).
**Event Map:**
| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Tengah | Taskbar Windows masuk dari bawah | slide | `power2.out` | klik halus |
| 0.5 | Semua | Jendela terminal pop-up + kamera kick | scale + C7 | `back.out(1.7)` | thud/pop |
| 1.3 | Depan | Teks "LINUX. DI DALAM WINDOWS." masuk per kata | M6 word slam | `back.out(1.7)` | 4x hit ringan |
| 2.8 | Latar | Terminal ketik perintah `uname -a` | M3 cut+type | `steps(8)` | keyboard mekanik |
| 3.8 | Depan | Angka "2 CARA" stamp dari atas | M4 stamp | `back.out(2)` | cap logam |
| 4.6 | Depan | Angka "1 RAHASIA" menyapu baris | M5 slide-snap | `expo.out` | swish |
| 5.8 | Semua | **Match cut:** Jendela taskbar mengecil tajam jadi garis | X2 match-cut | `expo.inOut` | whoosh turun |

### S2 · Ketakutan (6.0-13.0, 7.0 s) · latar Beton

**Tujuan:** Menggambarkan rasa takut dual boot (bongkar partisi).
**VO:** "Nggak perlu lagi yang namanya dual boot bikin partisi ruwet. Kalau salah klik, Windows bisa lenyap."
**Dunia visual / protagonis:** Lantai dapur beton (Windows host) terancam retak, tapi akhirnya pulih kembali.
**Lapisan:** L0 latar = ubin beton A3; L1 tengah = garis partisi; L2 depan = tiket pesanan "LINUX".
**Kamera:** C1 push-in 1.00→1.05; C7 guncang saat retak.
**Layout:** Garis partisi di tengah layar (y=960). Label `DUAL BOOT` 110px. (Skala 110:32 = 3.4:1, ditambah ubin 120px redup).
**Gerak:** Primer = retak lantai; Sekunder = tiket bergetar; Ambient = A5 napas merah redup di retakan.
**Event Map:**
| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Latar | Garis X2 membelah ubin beton 120px jadi dua blok | draw | `power2.out` | gesekan batu |
| 1.0 | Depan | Teks "DUAL BOOT" patah jadi dua (slice) | M10 slice | `expo.in` | crack! |
| 2.0 | Kamera | Lantai merekah merah, kamera guncang kuat | C7 guncang | tabel offset | **gemuruh bass** |
| 3.2 | Depan | Tiket "LINUX" muncul panik (squash/stretch) | scale | `back.out(2)` | tik/kertas |
| 4.5 | Latar | Garis retak ditarik balik, merah menghilang (aman) | shrink | `power4.out` | swoosh reverse |
| 5.8 | Tengah | Label "TANPA BONGKAR PARTISI" muncul kalem | M1 mask reveal | `power2.out` | klik |

### S3 · Dua Jalur (13.0-20.0, 7.0 s) · latar Putih

**Tujuan:** Memperkenalkan konsep stasiun masak (WSL) dan truk (VirtualBox).
**VO:** "Cukup jadikan Windows sebagai dapur utama, dan tambah stasiun masaknya."
**Dunia visual / protagonis:** Kamera memantau denah restoran dari atas, tiket "LINUX" mulai meluncur ke stasiun 1.
**Lapisan:** L0 = kertas putih + grid denah (A3 parallax 0.2x); L1 = blok denah (Dapur Utama, Stasiun Tambahan); L2 = tiket protagonis + pipa gas (A2).
**Kamera:** C3 pan vertikal -200px perlahan.
**Layout:** Dapur utama di bawah (y 1000-1400), Stasiun di atas (y 500-800). Teks besar `DAPUR UTAMA` 96px outline.
**Event Map:**
| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Tengah | Garis cetak biru menggambar kotak Dapur Utama (Windows) | draw | `power2.inOut` | coret pensil |
| 1.0 | Tengah | Kotak Stasiun Tambahan (WSL) terbangun di sisi atas | scale up | `back.out(1.5)` | pop kayu |
| 2.2 | Latar | Teks raksasa "DAPUR UTAMA" mengisi outline | M11 outline→fill | `power4.out` | swish basah |
| 3.2 | Depan | Pipa gas menyambung dua blok; A2 partikel mengalir | draw + ambient | linier | desis gas |
| 4.4 | Depan | Teks "STASIUN TAMBAHAN" jatuh per huruf | M12 per-karakter | `steps(8)` | ketik cepat |
| 5.5 | HUD | Tiket "LINUX" meluncur di rel dari x=72 ke x=200 | translate | `power2.inOut` | zip logam |
| 6.5 | Depan | Lingkaran iris menutupi layar, fokus ke stasiun | X4 iris | `expo.in | whoosh |

### S4 · Tutorial WSL (20.0-32.0, 12.0 s) · latar Ink

**Tujuan:** Menunjukkan instalasi WSL sangat mudah (1 perintah).
**VO:** "Cara pertama dan paling gampang: WSL. Buka PowerShell sebagai admin, ketik wsl --install, enter. Restart, beres. Kamu dapet terminal Ubuntu."
**Kamera:** C4 rack focus (blur jendela saat restart).
**Event Map:**
| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Tengah | Jendela PowerShell terbuka | slide-up | `power2.out` | klik jendela |
| 1.0 | Depan | Teks "CARA 1: WSL" menyapu | M5 slide-snap | `expo.out` | swish |
| 2.2 | Latar | Perintah `wsl --install` diketik | M3 cut+type | `steps` | keyboard mekanik |
| 3.6 | Tengah | Progress bar `[=======>  ]` berjalan cepat | M9 counter | linier | ticker cepat |
| 5.0 | Latar | Teks merah "RESTART" banting | M6 slam | `back.out(2)` | hit keras |
| 6.2 | Kamera| Layar berkedip hitam (restart), jendela PowerShell di-blur | C4 rack focus | `expo.inOut` | **power down/up** |
| 7.5 | Tengah | Jendela terminal Ubuntu muncul bersih tajam | fade+scale | `power2.out` | chord sukses |
| 9.0 | Depan | Label "Terminal Ubuntu Siap" | M1 mask | `power2.out` | pop |
| 10.5| Kamera| Push-in drastis ke dalam logo terminal | C8 zoom-through | `power2.in` | riser mulai (naik) |

### S5 · Wow: WSL itu VM (32.0-42.0, 10.0 s) · latar Beton (setelah flash)

**Tujuan:** Wow moment. Mengungkap bahwa WSL 2 sebenarnya adalah VM yang tersembunyi.
**VO:** "Tapi ada rahasia. Meski rasanya nyatu sama Windows, (0.8s jeda) WSL 2 itu sebenarnya jalan di dalam mesin virtual ringan."
**Kamera:** C8 lanjut dari S4 (macro scale 1.52) → C7 guncang (wow) → C2 pull-back ke micro (1.00).
**Event Map:**
| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Latar | Teks "TAPI ADA RAHASIA" masuk vertikal (slice) | M10 slice | `expo.out` | swish berat |
| 1.5 | Depan | Teks "WSL 2 = NYATU?" dengan font menebal | M8 wght 400→700 | `sine.inOut` | string tegang |
| 2.8 | Kamera| Pull-back C2 mulai jalan mengungkap bentuk asli stasiun | C2 | `sine.inOut` | jeda sepi |
| 4.0 | Semua | **WOW: FLASH INVERT warna (Ink → Beton), Guncang** | X6 + C7 | tabel offset | **IMPACT + Drop Bass (E2)** |
| 4.4 | Tengah | Dinding stasiun WSL transparan: ada food truck VM di dalamnya | opacity | `expo.out` | sci-fi hum |
| 5.8 | Depan | Teks raksasa "MESIN VIRTUAL" | M6 slam | `back.out(1.7)` | thud tebal |
| 7.2 | Tengah | Pipa gas (RAM/Disk) tersambung dari Windows ke VM ini | garis draw | `power2.out` | lock mekanik |
| 8.5 | Latar | "dikelola langsung oleh Windows" | M11 outline→fill | `power2.out` | swoosh |
| 9.6 | Tengah | **Morph:** Food truck mini ini membesar keluar dari stasiun | X2 morph | `expo.inOut` | engine rev |

### S6 · Tutorial VirtualBox (42.0-59.0, 17.0 s) · latar Putih

**Tujuan:** Menjelaskan VirtualBox sebagai ruang isolasi penuh (GUI).
**VO:** "Cara kedua: VirtualBox. Ini ibarat bikin food truck sendiri di halaman parkir. Cocok kalau kamu butuh desktop GUI Linux yang utuh. Tinggal install aplikasinya, buat mesin baru, dan alokasikan RAM serta disk storage."
**Kamera:** C5 tilt 3D (rotateX 8 deg).
**Event Map:**
| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Tengah | Truk S5 berubah utuh jadi truk VirtualBox di grid parkir | Morph landing | `back.out(1.5)` | logam berat (thud) |
| 1.0 | Depan | Teks "CARA 2: VIRTUALBOX" menyapu penuh (bar-wipe) | M2 bar-wipe | `power4.out` | swish ganda |
| 2.5 | Latar | Latar parkiran dengan A3 grid bergeser + A2 debu | drift | linier | angin luar |
| 4.0 | Depan | Stempel "FULL DESKTOP GUI" mendarat miring | M4 stamp | `back.out(2)` | cap tebal |
| 5.5 | Tengah | Jendela distro "Ubuntu 26.04 LTS" pop-up di badan truk | C5 tilt | `power2.out` | pop |
| 7.0 | Depan | Tiket "LINUX" masuk ke dalam jendela ini | translate | `power2.in` | zip |
| 8.5 | Latar | UI alokasi "RAM: 4096 MB" diketik | M3 type | `steps` | ketik cepat |
| 10.0| Tengah | Meteran tangki RAM mengisi cepat 0% → 50% | M9 counter | `power2.out` | cairan ngisi |
| 11.5| Latar | UI alokasi "DISK: 40 GB" | M3 type | `steps` | ketik |
| 13.0| Tengah | Meteran tangki disk mengisi | M9 counter | `power2.out` | kruk gear |
| 14.5| Depan | Teks peringatan "JATAH FIX DARI WINDOWS" | M5 slide-snap | `expo.out` | klik peringatan |
| 16.0| Kamera| Kartu truk terbalik 180 derajat (flip 3D) menuju aduan | X7 flip 3D | `expo.inOut` | whoosh besar |

### S7 · Keputusan (59.0-73.0, 14.0 s) · latar Belah (Beton & Ink)

**Tujuan:** Membandingkan kelebihan/kekurangan dan menentukan pilihan.
**VO:** "Jadi pilih mana? (0.5s) Kalau cuma butuh terminal buat ngoding dan pengen enteng, WSL jawabannya. Tapi kalau mau ngoprek desktop Linux dari nol tanpa takut merusaknya, pakai VirtualBox."
**Lapisan:** Layar belah horizontal (y=960). Atas = WSL (Beton), Bawah = VBox (Ink). (Skala Font 96px).
**Event Map:**
| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Latar | Layar terbelah rapi | slice | `expo.out` | sword schwing |
| 1.0 | Depan | Teks "PILIH MANA?" di tengah garis belah | M6 slam | `back.out(1.5)` | 2x hit (E3 mulai) |
| 2.5 | Atas | WSL nyala. Kata kunci: "Terminal, Ngoding, Enteng" | M10 slice | `power2.out` | pop |
| 4.0 | Atas | Stempel raksasa "WSL" di area atas | M4 stamp | `back.out(2)` | thud keras |
| 5.5 | Atas | (Kelemahan) Chip merah "GUI rumit" muncul di sudut atas | drop | `back.out(1.5)` | klak |
| 7.0 | Bawah | VBox nyala. Kata kunci: "Desktop Utuh, Ngoprek" | M10 slice | `power2.out` | pop |
| 8.5 | Bawah | Stempel raksasa "VIRTUALBOX" di area bawah | M4 stamp | `back.out(2)` | thud keras |
| 10.0| Bawah | (Kelemahan) Chip merah "Berat (RAM tetap)" muncul di bawah | drop | `back.out(1.5)` | klak |
| 11.5| Tengah | Kursor memilih kotak bawah (karena aman ngoprek) | gerak kursor | `power2.inOut` | mouse click |
| 13.0| Semua | Stempel "COCOK" hijau mengembang (scale-fill) jadi latar | X9 scale-fill | `expo.inOut` | riser transisi |

### S8 · Aman (73.0-80.0, 7.0 s) · latar Aman (Hijau/Putih)

**Tujuan:** Payoff terakhir: meyakinkan bahwa apapun pilihannya, Windows tidak akan hancur.
**VO:** "Asyiknya, kalau kamu salah setting, tinggal hapus VM atau distronya. Windows kamu tetap aman seratus persen."
**Kamera:** C2 pull-back santai mengungkap dapur utama yang rapi.
**Event Map:**
| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Latar | Lantai dapur Windows kembali utuh, bersih, grid hijau (aman) | A5 napas kalem| `sine.inOut` | tone hangat (E4) |
| 1.5 | Tengah | Tiket "LINUX" terbakar/dihapus perlahan (opsi batal) | dissolve | `power2.out` | kertas diremas |
| 3.0 | Depan | Teks "HAPUS VM / DISTRO" | M10 slice | `power4.out` | swish |
| 4.5 | Latar | Dapur utama tidak bergeming | diam/drift | linier | - |
| 5.8 | Depan | Font tulisan "WINDOWS AMAN 100%" menebal perlahan | M8 wght morph | `power2.inOut` | chord major |

### S9 · Loop (80.0-85.0, 5.0 s) · latar Ink

**Tujuan:** Call to action yang terhubung sempurna dengan awal video (loop).
**VO:** "Udah nyoba yang mana? Tulis di komen."
**Event Map:**
| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Latar | X1 Panel wipe menyapu latar kembali jadi terminal (Ink) | X1 wipe | `expo.inOut` | whoosh |
| 1.5 | Depan | "UDAH NYOBA YANG MANA?" | M6 slam | `back.out(1.7)` | thud |
| 3.0 | Latar | Kursor terminal berkedip lambat di bawah perintah | A6 caret | `steps` | - |
| 4.0 | Depan | "TULIS DI KOMEN!" turun per kata | M12 per-karakter | `power2.out` | pop halus |
| 5.0 | Semua | Layar diam dalam posisi yang persis sama dengan S1 t=0 | hold | - | musik loop ke S1 |

---

## 6. Audio

- **VO:** Tenang, ramah, sekitar 140 wpm (Total VO: ~77 kata / 85 detik = ~0.9 kata/detik, sangat leluasa, jeda terbaca jelas). Sinkronisasi Word-level kinetik di momen M6 dan M12.
- **Musik:** 120 BPM synth-wave edukatif.
  - **E1 (0-31s):** Bassline rendah, low-pass filter menyaring melodi tinggi. Misterius namun teknis.
  - **E2 (32-58s):** Filter terbuka saat wow moment (36s) bersamaan impact bass. Beat lebih kental.
  - **E3 (59-72s):** Ketukan hi-hat lebih rapat (ketat) saat komparasi layar belah, seakan berpacu dengan waktu mengambil keputusan.
  - **E4 (73-85s):** Pad synth hangat (resolve), beat turun, diakhiri dengan chord yang kunci nadanya bergantung pada not pertama E1 (loop mulus).
- **SFX Khusus:** *Audio dropout* singkat (-inf dB) selama 0.1s tepat sebelum wow di S5 t=3.9, lalu hit impact tebal.

---

## 7. Aturan teknis HyperFrames

- **Deterministik:** Semua animasi di S1-S9 didaftarkan di timeline GSAP `paused: true`.
- **PRNG:** Gunakan fungsi Mulberry32 dengan *fixed seed* (misal: `1337`) untuk semua A2 (partikel gas, debu) dan guncangan (bila tidak pakai tabel offset absolut). Jangan ada `Math.random()`.
- **Font:** Pastikan "Familjen Grotesk" varian Variable WOFF2 di-load agar animasi `wght` (M8) di S5 dan S8 bisa berjalan.
- **Budget Render / Fallback (Render CPU):**
  - Jika S5 terlalu berat, ubah A2 partikel gas menjadi garis SVG putus-putus bergeser (`stroke-dashoffset`).
  - Efek blur (C4) di S4 harus dibuang (`filter: none`) jika FPS render anjlok, diganti dengan penurunan `opacity` jendela PowerShell menjadi 0.4.

---

## 8. Fakta dan sumber

| Klaim | Sumber (Kondisi 29 Okt 2026) | Cek ulang sblm post |
|---|---|---|
| Perintah instalasi WSL | `wsl --install` menginstal Ubuntu default (Microsoft Docs) | Apakah Microsoft mengganti flag default instalasi? |
| WSL 2 adalah VM | Arsitektur WSL 2 menggunakan Lightweight utility VM (Hyper-V subset) | Tetap valid |
| Nama Distro VM di S6 | Ubuntu 26.04 LTS (Rilis April 2026) | Apakah nomor versi LTS benar ditulis "26.04"? |

**Batas Konten (Keamanan & Pemula):**
- **Dilarang keras** menuliskan tata cara shrink volume disk (`diskmgmt.msc`) atau setting partisi UEFI/GRUB (dual boot asli) karena berisiko dipraktikkan penonton dan menghapus Windows mereka. Video ini murni promosi WSL/VM sebagai jalur aman.
- Mockup UI (S4, S6) tidak boleh menampilkan nama *user account* asli; gunakan nama profil generik `PS C:\Users\Dev>`.

---

## 9. Prompt untuk Agent

```text
Using /hyperframes (faceless-explainer workflow), build the video described in BRIEF.md.

Rules:
- Follow BRIEF.md exactly: scene timing, layout coordinates, copy, colors, fonts, motion codes (M/C/X/A), and event maps. Do NOT improvise design.
- Canvas 1080x1920, 60fps, 85s total. Use the Design Tokens block as DESIGN.md.
- Self-host fonts (Familjen Grotesk var, Instrument Serif, Martian Mono). For variable-font animation (M8), load the variable woff2.
- Deterministic only: paused GSAP timelines. No Math.random/Date.now/infinite repeats. Use a fixed-seed PRNG for ambient positions and fixed offset tables for camera shake.
- Wrap every scene in a camera element (#cam) and implement the camera moves in the brief. Place content in 3 depth layers with different parallax factors.
- Before hand-building any transition, effect, caption style, chart, or code animation, consult /hyperframes-registry and install the matching catalog block. Retint catalog blocks to the palette in DESIGN.md.
- Implement every impact as four synchronized layers (visual, camera, SFX, music) within one frame at 60fps.
- Respect the render budget in section 7 of the brief. Drop elements marked "opsional" first if rendering is heavy.
- Generate VO (Tenang, ramah, edukatif), music, and SFX via the pipeline. Sync kinetic text to word-level timestamps from the VO transcript.
- NEVER show dual-boot partition tutorials. Use generic user profiles in mocked terminals (e.g. C:\Users\Dev>).
- Every command (wsl --install) and version (Ubuntu 26.04 LTS) on screen must match section 8 exactly.
- Run lint/validate/inspect, then snapshot key frames. Check against the QA checklist and the Boredom Audit, and fix before rendering.
- Render to MP4 only after the checklist passes.
```

---

## 10. Caption Postingan

Pengen banget nyoba Linux tapi takut salah klik dan Windows kesayangan hancur? 🥶 Tenang, lu nggak perlu dual-boot atau repot bongkar partisi. Ini 2 cara paling aman buat run Linux DI DALAM Windows lu, plus satu "rahasia" soal cara kerja WSL. Lu tim terminal (WSL) atau tim desktop utuh (VirtualBox)? Tulis di komen! 👇

#Linux #Windows #WSL #VirtualBox #CodingTips #BelajarProgramming #DeveloperIndonesia

---

## 11. Catatan Variasi (Registry Anti-Tabrakan)

| Elemen | Video Ini | Video Sebelumnya (PHP2Shell) | Status |
|---|---|---|---|
| Palet Warna | P8 Beton + Sinyal Oranye | P2 Hazard (Kuning/Merah) | Berbeda |
| Tipografi | Familjen (Display), Martian (Mono) | Archivo, IBM Plex | Berbeda |
| Teknik Teks Dominan | M3, M6, M9, M10 | M2, M8 | Berbeda |
| Dunia / Metafora | Denah Dapur + Truk | Kamar Hotel | Berbeda |
| Arketipe Layout | Terminal dingin + Top-down Grid | Grid memori 6x4 | Berbeda |

*(Video ini lolos standar pembedaan, berbeda di semua 5 pilar visual utama)*

---

## 12. Hasil Boredom Audit

| # | Pemeriksaan | Hasil (Nilai) | Status |
|---|---|---|---|
| 1 | Celah terbesar antar kejadian visual | Maksimal 1.5 detik (S2 t=4.5 ke t=5.8 jeda 1.3s) | LULUS |
| 2 | Jumlah teknik teks berbeda | 9 teknik (M1, M2, M3, M4, M5, M6, M8, M9, M10, M11, M12 dipakai) | LULUS |
| 3 | Jumlah jenis transisi berbeda | 8 jenis (2 di antaranya Morph/Match-cut X2 di S1→S2 dan S5→S6) | LULUS |
| 4 | Gerak kamera per scene | 9 dari 9 scene memiliki C1-C8 yang aktif. | LULUS |
| 5 | Lapisan z/parallax | 3-4 lapis di 100% scene dengan pergerakan objek L2 lebih cepat. | LULUS |
| 6 | Kontras skala per scene | Skala > 2.6:1 tercapai (bahkan label besar 110px vs label 32px mencapai 3.4:1). | LULUS |
| 7 | Gerak ambient di tiap scene | Grain, drift denah, partikel ada di sepanjang S1-S9. | LULUS |
| 8 | Wow moment | Ada (S5 di detik 36, durasi total 85s = wow di 42%, 4 lapis sinkron) | LULUS |
| 9 | Pattern interrupt | Interrupt per <= 10s: S2 retak (6s), S4 layar mati (26s), S5 flash (36s), S7 split screen (59s) | LULUS |
| 10 | Open loop | Dibuka S1 (3.5s), dijawab S7 (64.5s & 68.4s -> 75% & 80%) | LULUS |
| 11 | Kurva ketegangan | Puncak di S7 (14 detik terakhir). | LULUS |
| 12 | Dinamika musik | 4 keadaan energi (E1, E2, E3, E4) | LULUS |
| 13 | Metafora/dunia visual | Dapur/Stasiun dipertahankan dari S3 hingga S8 (6 scene berturut-turut, ~66%) | LULUS |
| 14 | Budget render | `backdrop-filter` nol, transisi shader WebGL nol, opsi ringan (opacity/garis SVG) dilampirkan. | LULUS |
| 15 | Keterbacaan | 77 kata total untuk 85 detik. Kalimat rata-rata bertahan > 3 detik di layar. | LULUS |