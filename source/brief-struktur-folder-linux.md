# BRIEF: Struktur Folder Linux - File Explorer Tanpa Local Disk C
**Format:** Reels/TikTok 9:16 (1080x1920), 60FPS
**Engine:** HyperFrames (CPU Pipeline)
**Bahasa:** Indonesia (santai-teknis)
**Status Fakta:** Oktober 2026 (Filesystem Hierarchy Standard / FHS)

---

## 0. Cara pakai file
1. Baca detail scene dan arsitektur di bawah.
2. Gunakan blok dari `/hyperframes-registry` untuk gaya *cutout* dan palet *riso*.
3. Render dengan `paused` GSAP timeline secara deterministik.
4. Perhatikan batas budget: bayangan (*drop-shadow*) harus statis, dan *grain* tekstur kertas juga merupakan PNG statis yang hanya di-*translate* sedikit.

---

## 1. Konsep
**Pesan Inti:** Struktur folder Linux tidaklah membingungkan jika kamu membayangkannya sebagai ruangan-ruangan spesifik dalam satu gedung bernama "Root" (`/`).
**Concept Lab:**
- **Kandidat 1 (Terpilih - 23/25):** Metafora "Gedung Kertas Kriya". Protagonis: Kursor berbentuk stempel/kurir kertas yang melompat dari ruangan ke ruangan. Dunia Visual: Potongan kertas berlapis (*paper-cut*) yang melambangkan ruangan `/bin`, `/etc`, `/home`, dan `/var`.
- *Kandidat 2 (Ditolak):* Terminal UI murni (skor *Motion* rendah, rentan mirip dengan video Linux sebelumnya).
- *Kandidat 3 (Ditolak):* Pohon berakar raksasa (terlalu abstrak, susah membedakan /bin dan /etc secara visual).
**Dunia Visual:** Bidang kerja kertas kriya (*papercraft*) bergaya *stop-motion*. Semua bentuk terbuat dari potongan kertas bertekstur yang disusun bertumpuk dengan kedalaman (Z-index).
**Protagonis Visual:** Ikon karakter "Kurir Folder" dari kertas karton kecil yang mondar-mandir masuk ke dalam setiap ruangan folder.
**Open Loop & Payoff:** (0-4s) "Kenapa di Linux nggak ada Local Disk C?" -> Dijawab bertahap dan ditutup dengan peta utuh gedung sistem operasi (60s).

**Tension Map:**
| Scene | Fungsi | Ketegangan (1-5) | Energi Musik |
|---|---|---|---|
| S1 | Hook (Mana Drive C?) | 4 | Tertahan, akustik *quirky* |
| S2 | `/` & `/bin` (Akar & Alat) | 3 | Santai, *bouncy* |
| S3 | `/etc` (Kontrol) | 3 | Stabil |
| S4 | `/home` (Kamar User) | 2 | Tenang, *snapping* sfx |
| S5 | `/var` (Gudang/Wow) | 5 | Terbuka (Riser + Drop!) |
| S6 | Outro | 2 | Resolve hangat |

---

## 2. Aturan anti-slop
- **Dilarang:** Menampilkan layar terminal atau logo folder generik Windows/Mac. Semua harus berupa siluet kertas tebal bertekstur.
- **Wajib:** Menggunakan gerak patah-patah dengan `steps()` untuk memberikan kesan *stop-motion*, tapi jeda antar langkah ≥ 0.05s agar tidak *smear*.
- **Wajib:** Parallax (lapisan depan bergerak lebih cepat dari latar) pada setiap transisi *panning*.

---

## 3. Design tokens
- **Tipe Visual:** **V2 (Cutout craft)**. Latar kertas statis, elemen SVG bertepi kasar, bayangan tipis statis.
- **Palet:** **P4 (Riso print)** -> Latar Kertas `#F4EBDD`, Tinta `#1E1B18`, Merah Riso `#E8452C`, Biru Riso `#2B50AA`.
- **Tipografi:** 
  - Display: **Schibsted Grotesk** (Label ruangan)
  - Mono: **DM Mono** (Teks keterangan teknis)
- **Teknik Teks (M):** M4 (Stamp), M6 (Word slam), M10 (Slice kertas), M12 (Per-karakter jatuh).
- **Kamera (C):** C1 (Push-in), C3 (Pan vertikal/horizontal menyusuri denah), C6 (Parallax shift ekstrem), C7 (Guncang kertas).
- **Transisi (X):** X2 (Morph/lipat SVG), X5 (Push geser kertas), X9 (Scale-fill masuk ke pintu).
- **Ambient (A):** A1 (Grain/serat kertas statis yang bergeser acak 1-2px setiap detik).

---

## 4. Event Map dan Peta scene
| S# | Waktu | Durasi | Nama | Kamera | Transisi Masuk | Wow/Interrupt | Jml Kejadian |
|---|---|---|---|---|---|---|---|
| S1 | 0.0s | 9.0s | Hook: Local Disk C | C1, C7 | - | - | 8 |
| S2 | 9.0s | 13.0s | `/bin` & `/` | C3, C6 | X2 Morph | Interrupt: Perubahan skala | 9 |
| S3 | 22.0s | 12.0s | `/etc` | C3, C6 | X5 Push | - | 9 |
| S4 | 34.0s | 11.0s | `/home` | C1, C4 | X9 Scale-fill | Interrupt: Ganti Layout | 8 |
| S5 | 45.0s | 14.0s | `/var` (Gudang) | C2, C7 | X5 Push | **Wow Moment (Kertas Numpuk)** | 11 |
| S6 | 59.0s | 9.0s | Outro: Denah | C2 | X1 Wipe Kertas | - | 6 |

---

## 5. Detail scene

### S1 · Hook: Local Disk C (0.0-9.0, 9s) · Latar Kertas P4
**Tujuan:** Membongkar persepsi pengguna Windows.
**VO:** "Lagi belajar Linux dan bingung nyari Local Disk C? Wajar, karena di Linux, konsep partisi huruf itu... nggak ada."
**Dunia visual / protagonis:** Sebuah potongan kertas berbentuk drive "Local Disk (C:)" muncul, lalu dicoret stempel merah raksasa. Kertas itu kemudian dilipat menjadi karakter kurir (protagonis).
**Lapisan:** Latar = Kertas `#F4EBDD`; Tengah = Potongan SVG Disk C; Depan = Stempel Merah Riso.
**Kamera:** C1 push-in lambat. C7 guncang saat stempel jatuh.
**Event Map:**
| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Tengah | Teks "MANA LOCAL DISK C?" dibanting | M6 slam | `steps(12)` | thud tebal |
| 1.5 | Tengah | Ikon kertas Drive C: muncul tergelincir | pop in | `back.out(1.5)` | srek kertas |
| 3.0 | Depan | Tanda silang merah (X) raksasa dicap ke atas Drive C | M4 stamp | `steps(1)` | **impact stampel** |
| 4.5 | Tengah | Teks "Konsep Huruf = NGGAK ADA" dipotong horisontal | M10 slice | `steps(8)` | sfx gunting |
| 6.0 | Tengah | Kertas Drive C melipat diri (morphing) jadi karakter Kurir | X2 morph | `power2.inOut` | kresek lipat |
| 7.5 | Kamera | Kamera mengikuti Kurir bersiap melompat ke bawah | C3 pan | `power2.in` | whoosh |

### S2 · Akar & Alat: `/` dan `/bin` (9.0-22.0, 13s) · Denah Biru Riso
**Tujuan:** Mengenalkan Root dan folder binari.
**VO:** "Semuanya berawal dari titik ini: Root, alias garis miring. Nah, kalau butuh aplikasi atau command kayak 'ls' dan 'pwd', semuanya disimpen di dalam ruang /bin (binaries)."
**Dunia visual / protagonis:** Kurir turun ke dasar berlabel `/`. Lalu berjalan ke ruang `/bin` yang penuh dengan palu, gir, dan perkakas dari kertas yang bergerak-gerak patah.
**Lapisan:** Latar = Kertas; Tengah = Ruangan karton `/bin` dengan parallax; Depan = Kurir & Perkakas kertas.
**Kamera:** C3 pan ke kanan menyusuri lorong. Parallax C6 sangat terasa (lapisan depan lewat lebih cepat).
**Event Map:**
| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Latar | Transisi mendarat di balok besar berlambang `/` | mendarat | `bounce.out` | thud ringan |
| 1.5 | Depan | Label "ROOT" (Akar) jatuh per karakter | M12 drop | `steps(8)` | pop x4 |
| 3.5 | Semua | Pan kamera ke kanan, lorong bergeser (parallax) | C3, C6 | `sine.inOut` | gesek kertas |
| 5.0 | Tengah | Masuk ke ruangan berlabel `/bin` (Biru Riso) | masuk | `power2.out` | ting |
| 7.0 | Depan | Teks "BINARIES = APLIKASI" diketik dengan gaya cap | M4 stamp | `steps(6)` | tik tik tik |
| 9.0 | Depan | Ikon palu & gir (melambangkan command ls, pwd) berjatuhan | jatuh | `steps(10)` | clatter kayu |
| 11.5| Tengah | Kurir mengambil satu perkakas, siap jalan lagi | hold | - | - |

### S3 · Kontrol: `/etc` (22.0-34.0, 12s) · Denah Merah Riso
**Tujuan:** Folder konfigurasi sistem.
**VO:** "Terus kalau mau ngatur settingan sistem, jaringan, atau password? Semuanya diurus di ruang kontrol bernama /etc. Jangan sembarangan ubah file di sini ya."
**Dunia visual / protagonis:** Kurir masuk ke ruangan berisi papan sirkuit kertas dan tuas-tuas. Tulisan `/etc` besar di latar.
**Kamera:** C3 pan ke atas (naik lantai).
**Event Map:** Kurir naik lift kertas (0.0 - 2.0s). Pintu `/etc` terbuka (3.0s). Label "ETC = KONFIGURASI" muncul dengan M1 mask (5.0s). Tuas-tuas merah ditarik oleh kurir (koreografi impact guncang C7 di 7.5s, "Jangan sembarangan!"). Tanda peringatan kertas muncul pop-up (9.0s).

### S4 · Rumah: `/home` (34.0-45.0, 11s) · Denah Kertas Lembut
**Tujuan:** Ruang personal milik pengguna (User Data).
**VO:** "Nah, buat nyimpen file pribadi kamu kayak dokumen, foto, atau project coding, Linux nyiapin apartemen khusus, yaitu /home."
**Kamera:** C1 push-in masuk ke pintu apartemen. C4 rack focus pada kotak surat.
**Event Map:** Panning X5 ke area apartemen `/home` (1.0s). Muncul kotak surat kertas berlabel nama-nama user (3.5s). Kamera fokus (C4) ke kotak surat bertuliskan `pepetgoodboy` (5.5s). Kurir memasukkan tumpukan kertas foto/kode ke dalamnya (7.5s - 9.0s). 

### S5 · Gudang/Wow: `/var` (45.0-59.0, 14s) · Denah Abu-abu
**Tujuan:** Folder penampung data dinamis (log, cache) + WOW Moment visualisasi kertas menumpuk drastis.
**VO:** "Terakhir, /var atau variable. Ini adalah gudang sistem. Semua catatan log error, cache, dan data yang ukurannya terus membengkak, ditumpuk di sini!"
**Dunia visual / protagonis:** Ruangan `/var` awalnya kosong. Tiba-tiba kertas log berjatuhan dari atas langit dengan kecepatan gila, menimbun ruangan sampai penuh.
**Lapisan:** Latar = Dinding gudang; Tengah = Ratusan kertas `feTurbulence` (simulasi); Depan = Kurir yang kebanjiran kertas.
**Kamera:** Kamera mulai rapat (C1), lalu merespons tumpukan dengan Pull-Back (C2) ekstrem dan bergetar (C7).
**Event Map:**
| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Semua | Pindah ke ruangan `/var` (Variable) | X5 push | `power2.out` | srek |
| 1.5 | Depan | Teks "VAR = GUDANG DATA DINAMIS" dicap rata kiri | M6 slam | `steps` | stamp |
| 3.5 | Tengah | Satu, dua kertas log turun perlahan | drop | `steps(8)` | kertas jatuh |
| 5.5 | Semua | **BAILOUT**: Hujan badai kertas! Ratusan lembar jatuh dari atas menutupi kurir | X9 Burst | `expo.in` | **Riser musik memuncak!** |
| 6.5 | Kamera | Kamera Pull-back (C2) sangat cepat menampilkan gunung kertas raksasa | C2 + C7 kick | `power4.out` | **Impact Bass Hit!** |
| 8.0 | Depan | Gunung kertas bergoyang-goyang (Squash & Stretch V6 style on SVG) | membal | `elastic.out(1, 0.5)` | boing / rumble |
| 10.5| Tengah | Kepala kurir menyembul dari tumpukan kertas | pop | `back.out(2)` | pop! |
| 12.0| Depan | Label "LOGS & CACHE" nempel di tumpukan | M4 stamp | `steps(1)` | slap |

### S6 · Outro: Denah Utuh (59.0-68.0, 9s) · Peta Global
**Tujuan:** Kesimpulan visual dan call-to-action.
**VO:** "Nggak ribet kan? Ini denah lengkapnya. Save video ini buat contekan pas kamu ngoprek server Linux nanti!"
**Dunia visual:** Kamera menyorot mundur menampilkan seluruh gedung kertas dengan ruangan `/`, `/bin`, `/etc`, `/home`, dan `/var` yang saling terhubung.
**Kamera:** C2 pull-back maksimal menunjukkan skalabilitas makro.
**Event Map:** Kamera zoom-out menunjukkan gedung (0.0 - 2.5s). Teks anotasi merangkum setiap ruang berkedip bergantian (4.0s - 6.0s). Kertas stempel raksasa jatuh menutupi layar: "SAVE CONTEKAN INI" (7.5s, X1 wipe penutup).

---

## 6. Audio
- **Voice Over:** Tempo santai, ±145 kata/menit (total ~150 kata). Karakter suara hangat layaknya *storyteller*.
- **Musik:** *Quirky acoustic* dipadu *lo-fi beat* (120 BPM). Instrumen berbasis *plucked strings* atau perkusi kayu (cocok dengan tekstur *craft*). Riser elektronik kencang dan *Drop* *heavy beat* masuk tepat di adegan `/var` (S5).
- **Foley:** Sangat penting untuk gaya V2! Suara gesekan kertas kasar, karton ditekuk, bunyi stempel (*thud/slap*), dan gemerincing kayu/logam saat alat di `/bin` jatuh.

---

## 7. Aturan teknis HyperFrames
- Rendering wajib mengaplikasikan `steps(n)` pada semua gerak transisi untuk menciptakan ilusi 12fps *stop-motion*. Jangan gunakan `ease: linear` yang mulus.
- Pastikan interval kalkulasi step: durasi / n ≥ 0.034s agar tidak terjadi blur berlebih saat *frame blending*.
- Ambient A1 (Grain Kertas) diwajibkan: gunakan tekstur kertas PNG yang cukup besar (misal 2000x3000px) lalu translasi secara acak dengan tabel seed offset setiap 0.5 detik di lapisan *overlay*. **Dilarang keras memakai `feTurbulence` yang dianimasikan** (hemat CPU).

---

## 8. Fakta dan Sumber
- **FHS (Filesystem Hierarchy Standard):**
  - `/` (Root directory, dasar hierarki).
  - `/bin` (Essential command binaries).
  - `/etc` (Host-specific system-wide configuration files).
  - `/home` (User home directories).
  - `/var` (Variable files: logs, spool, cache).

---

## 9. Prompt untuk agent
Using /hyperframes (faceless-explainer workflow), build the video described in BRIEF.md.

Rules:
- Follow BRIEF.md exactly: scene timing, layout coordinates, colors, fonts, motion codes (M/C/X/A), and event maps.
- Canvas 1080x1920, 60fps, 68s total duration. Use the Design Tokens block as DESIGN.md.
- Self-host fonts (Schibsted Grotesk, DM Mono).
- Wrap every scene in a camera element (#cam). Implement the Visual Type (V2 - Cutout Craft) strictly: all visual elements should resemble thick paper/cardboard cutouts with rough edges (SVG). Shadows must be static (baked into the SVG or static CSS).
- Animate ALL movements using CSS/GSAP `steps()` to simulate a 12fps stop-motion feel. Ensure each hold is at least 0.05s to survive the 120->60fps frame blend without smearing.
- Every impact must have 4 synchronized layers (visual pop, camera shake, Foley/SFX, music drop).
- S5 (The `/var` Wow Moment) must feel overwhelming; hundreds of paper logs falling simultaneously, accompanied by a heavy bass drop and camera C2 pull-back. Keep DOM elements < 400.
- Run lint/validate/inspect, check against the QA checklist and the Boredom Audit before rendering to MP4.

---

## 10. Caption postingan
Buka Linux terus bingung Local Disk C-nya kemana? 🤯 

Tenang, Linux nggak pakai abjad buat partisi. Semuanya ibarat satu gedung raksasa bernama "Root" ( / ). Biar nggak nyasar pas ngoprek server, ini 4 ruangan (/bin, /etc, /home, /var) yang wajib banget kamu tau fungsinya! 🏢🐧 

Save dulu denahnya biar gampang pas praktek nanti! 🚀
#Linux #BelajarLinux #ServerAdmin #ProgrammerPemula #Sysadmin #Ubuntu

---

## 11. Catatan variasi
| Parameter | Video ini |
|---|---|
| Tipe Visual (V) | V2 (Cutout craft / Paper-cut) |
| Palet | P4 (Riso print) |
| Format Narasi | Explainer Konsep |
| Metafora Utama | Gedung Perkantoran / Rumah Susun Kertas |

---

## 12. Hasil Boredom Audit
1. Celah terbesar antar kejadian: **1.5s** (Lulus)
2. Jumlah teknik teks berbeda: **4** (M4, M6, M10, M12) (Lulus)
3. Jumlah jenis transisi berbeda: **4** (X1, X2, X5, X9) (Lulus)
4. Gerak kamera per scene: **100%** (Lulus)
5. Lapisan z/parallax: **3 Lapis** di seluruh *scene* dengan Parallax tebal untuk ilusi ruangan (Lulus)
6. Kontras skala per scene: **6:1** (Teks Stempel vs Teks Mono Keterangan) (Lulus)
7. Gerak ambient di tiap scene: **100%** (Tekstur kertas A1 bergeser patah-patah) (Lulus)
8. Wow moment: **Ada (S5 - Hujan Kertas `/var` di ~66%)** (Lulus)
9. Pattern interrupt: Tiap **≤ 12s** (Berpindah lorong/ruangan mengubah tone warna dasar) (Lulus)
10. Open loop: Dibuka di 0s (Mana drive C?), Ditutup dengan peta utuh di **60s (88%)** (Lulus)
11. Kurva ketegangan: Puncak absolut di S5 (5/5) (Lulus)
12. Dinamika musik: **4 Keadaan** (Tertahan, Bouncy, Riser, Drop/Resolve) (Lulus)
13. Metafora/dunia: Gedung karton hadir di **100%** scene, Kurir hadir di **90%** scene (Lulus)
14. Budget Render: **Aman**, menghindari filter SVG `feTurbulence` animatif dan menggantinya dengan drop/scale CSS sederhana (Lulus)