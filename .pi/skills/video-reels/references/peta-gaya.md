# Peta Gaya — taksonomi animasi → arahan video

Dibaca di **Fase A3** (pilih arahan). Data mesin (kandidat per kategori, palet, tipografi,
cast suara) ada di `tools/direction-map.json` — itu SSOT. File ini menjelaskan *kenapa*.

## 1. Diagnosis: kenapa 12 video pertama terasa sama

Diperiksa 10 Nov 2026 dari MP4 (contact sheet 8 frame/video + `tools/qa-variety.py`):

| Gejala | Bukti |
|---|---|
| Satu tata bahasa layout di semua video | 5 dari 8 video yang diperiksa didominasi **K0 "slide"**: judul tebal pojok kiri-atas + kotak/panel kecil di tengah + label mono kecil |
| Layar kosong | median occupancy video "slide" **0,05–0,18** (sudo 0,17 · baca-cari 0,15 · cek-kelola 0,12 · 8-command 0,05). Video yang terasa kaya: docker 0,45 · struktur-folder 0,35 · cara-coba 0,35 |
| Teks jadi protagonis | Tidak ada karakter, tidak ada dunia/latar ilustrasi; visual = kotak + teks |
| Suara sama | Galang speed 1,15 di semua video yang tercatat |
| Rotasi bocor | #13 memakai V19 tepat setelah #11 (V19) karena ledger dibaca manual |

**Kesimpulan:** kode V (material) sudah berganti tiap video, tapi enam sumbu lain tidak pernah
dipaksa berubah. Rasa monoton datang terutama dari **layout (K)** dan **format narasi (F)**,
bukan dari tekstur/palet.

## 2. Tujuh sumbu arahan

Semua dipilih `tools/pick-direction.mjs` dari kategori topik + `STYLE-LEDGER.md`.

| Sumbu | Kode | Isi | Rotasi |
|---|---|---|---|
| Format narasi | F1–F10 | struktur cerita (analogi, kisah, duel, POV objek…) | tidak boleh sama 2× beruntun |
| Tipe visual | V1–V29 | material & cara dunia digambar | ≠ 3 video terakhir |
| Keluarga gaya | `family` di JSON | kelompok V yang terlihat mirip (mis. V2/V24 = kertas) | ≠ video terakhir |
| Layout | K0–K15 | tata letak per scene | dominan ≠ video terakhir; aturan dalam video di §5 |
| Palet | P1–P19 | 4–5 warna bermakna tetap | ≠ 2 video terakhir |
| Tipografi | T1–T13 | display + aksen + mono | ≠ 2 video terakhir |
| Suara | cast di JSON | narator / tokoh (+ pitch) | lihat `suara.md` |

## 3. Taksonomi gaya animasi (riset 10 Nov 2026)

Sumber: daftar gaya explainer & 2D dari [Vidico](https://vidico.com/news/2d-animation-styles/),
[Creamy Animation](https://creamyanimation.com/animation-styles/),
[Pixune](https://pixune.com/blog/types-of-2d-animation),
[Champlain College](https://www.champlain.edu/blog/stories/animation-art-styles/),
[Pexo](https://pexo.ai/blog/explainer-video-styles-3897),
[Anijam](https://www.anijam.ai/blog/types-of-animation/); tren 2026 dari
[GraphicDesignJunction](https://graphicdesignjunction.com/2026/01/video-and-motion-creative-trends-2026/),
[Designity](https://designity.com/blog/2d-animation-trends-2026),
[Videobolt](https://blog.videobolt.net/post/top-motion-graphics-trends-2026),
[AutoAE](https://autoae.online/blog/motion-graphics-trends-2026).
Sebagian besar sumber adalah blog studio/vendor — dipakai sebagai **daftar gaya yang dikenal
industri**, bukan bukti gaya mana yang paling banyak ditonton. Satu-satunya pola yang konsisten
antar sumber: kinetic type kuat karena banyak Shorts ditonton tanpa suara, dan 2D yang terasa
"buatan tangan" (tekstur, timing, ketidaksempurnaan) dinilai menonjol di tengah banjir konten AI.

| Gaya yang dikenal industri | Ciri | Di pipeline ini | Status |
|---|---|---|---|
| Kinetic typography | teks = visual utama, ikut ritme VO | **V1** | ada |
| Bold minimalism / Swiss / Bauhaus | bidang warna, geometri, satu ide per layar | **V9** (varian Swiss/Bauhaus) | ada |
| Memphis / playful geometric | pola squiggle, konfeti, warna cerah | V9 + pola statis | varian |
| Motion graphics / flat vector | ikon & bentuk vektor, transisi bentuk | V23 tanpa maskot, V27 | ada |
| Explainer bertokoh / maskot | karakter sederhana berakting | **V23** | **baru** |
| Whiteboard animation | tangan/pena menggambar di papan putih | **V22** | **baru** |
| Chalkboard | kapur di papan hijau/gelap | V22 (palet P12) | **baru**, varian |
| Hand-drawn / doodle / sketch | garis tangan, anotasi, boil | **V5** | ada |
| Line art / mono-line | satu garis bersih, ikon tipis | V22 varian "tanpa tangan" | varian |
| Cutout / papercraft / origami | lapisan kertas bergunting | **V2** (origami = varian) | ada |
| Storybook / picture book / cat air | ilustrasi lembut, tekstur cat, buku dibalik | **V24** | **baru** |
| Siluet / shadow puppet (Lotte Reiniger, wayang kulit) | figur hitam di kelir bercahaya | **V25** | **baru** |
| Mixed media / collage / scrapbook / zine | potongan bertumpuk kontras | **V3** | ada |
| Comic / halftone / pop art | panel, balon, onomatopoeia | **V20** | ada |
| Grunge / street / punk | tekstur kasar, tape, potongan cepat | **V11** | ada |
| Risograph / newsprint | tinta 2 warna, halftone | V3 / V20 + P4/P6 | varian |
| Retro VHS / film / analog | grain, scanline, jitter | **V4** | ada |
| Synthwave / vaporwave | grid neon 80-an, matahari bergaris | V15 + V4 | varian |
| Neon glow | garis bercahaya di gelap | **V15** | ada |
| Y2K chrome | logam cair, bubble, kilau | **V16** | ada |
| Holographic / iridescent | foil berubah warna | **V17** | ada |
| Liquid glass / glassmorphism | panel kaca, kilau tepi | **V8** | ada |
| UI / product / screencast | mock UI nyata, kursor | **V10** | ada |
| ASCII / terminal art | gambar dari karakter | **V19** | ada |
| Split-flap / Solari | papan huruf berputar | **V21** | ada |
| Pixel art / 8-bit | sprite, grid piksel, gerak bertahap | **V26** | **baru** |
| Infografis / data viz | grafik, angka, ikon statistik | **V27** | **baru** |
| Peta / travel map | rute, pin, kamera menyusuri peta | **V28** | **baru** |
| Isometric | blok 30°, diagram sistem | **V18** | ada |
| Low-poly / faceted | poligon segitiga, shading datar | **V29** | **baru** |
| 3D stylised / clay / toy | bentuk bulat mengilap | **V7** (clay = varian) | ada |
| Tactile / soft body | squash-stretch, permukaan lembut | **V6** | ada |
| Particles | butir berkumpul/larut | **V13** | ada |
| Liquid / blob morph | bentuk organik melebur | **V14** | ada |
| Surreal / absurd | fisika dilanggar, morph ekstrem | **V12** | ada |
| Cel animation tradisional | digambar per frame | — | **di luar pipeline**: butuh ilustrasi per frame; diganti V5 boil + V23 rig |
| Rotoscope | menjiplak footage | — | **di luar pipeline**: butuh footage + tracing per frame |
| 3D realistis / CGI | render PBR | — | **di luar pipeline**: CPU render; V7 ≤ 6 detik Three.js sudah batasnya |
| Dokumenter foto (Ken Burns) | foto arsip + pan/zoom | — | **bukan default**: butuh foto berlisensi. Boleh bila user memberi aset |
| Live action / AI video | footage nyata / generatif | — | mode presenter (`/video-reels-presenter`); AI video tidak dipakai default |

**Lapisan kultural** (batik, wayang, peta Nusantara, ornamen geometri Islam, aksara) boleh
ditambahkan di atas V mana pun; bukan tipe tersendiri.

## 4. Kategori topik → kandidat

Agent mengklasifikasi topik ke satu kategori. Kandidat diurutkan menurut kecocokan; picker
menambah bobot "paling lama tidak dipakai" dan memblokir yang terkunci rotasi.

Snapshot 10 Nov 2026 (42 kategori, dibangkitkan dari JSON) — versi terkini:
`node tools/pick-direction.mjs --table`. Kolom "Aturan" = flag konten → §8.

| Kelompok | Kategori | Contoh topik | Format | Tipe V (urut cocok) | Suara | Aturan |
|---|---|---|---|---|---|---|
| Teknologi | `tech-berita` | rilis produk, kabar AI, gadget baru (bukan keamanan) | F11, F3, F5 | V10, V8, V16, V17, V21, V1, V27 | narator=Intan | time_sensitive |
| Teknologi | `tech-keamanan` | serangan, kerentanan, berita keamanan | F7, F10, F5 | V4, V11, V15, V19, V27, V28, V1, V3, V20 | narator=Galang | batas_konten |
| Teknologi | `tech-konsep` | apa itu X, kenapa X, cara kerja X (Docker, API, DNS, RAM) | F1, F8, F7 | V23, V22, V18, V2, V7, V13, V14, V29, V26, V6, V5, V9, V12 | narator=Galang | — |
| Teknologi | `tech-perbandingan` | A vs B, pilih yang mana | F3, F5 | V3, V20, V9, V27, V21, V10, V8, V4 | narator=Galang | — |
| Teknologi | `tech-tutorial` | cara melakukan X, command, langkah | F4, F6, F1 | V10, V19, V22, V26, V5, V9, V21, V8, V18 | narator=Galang | — |
| Edukasi | `bahasa-asing` | kosakata, idiom, salah kaprah bahasa Inggris/Arab/Jepang | F6, F5, F9 | V1, V21, V9, V22, V20, V3 | narator=Safira, contoh-inggris=Siti | — |
| Edukasi | `edukasi-sekolah` | matematika, fisika, kimia, biologi, bahasa Indonesia, PPKn | F1, F4, F6 | V22, V27, V18, V26, V5, V13, V29, V23 | narator=Anisa | — |
| Edukasi | `hukum-sehari-hari` | hak konsumen, aturan lalu lintas, cara lapor, dokumen | F1, F5, F4 | V22, V27, V9, V10, V3, V21 | narator=Intan | legal, time_sensitive |
| Edukasi | `lingkungan-iklim` | sampah, iklim, energi, alam rusak & pulih | F7, F1, F11 | V13, V14, V27, V29, V24, V28 | narator=Galang | — |
| Edukasi | `sains-alam` | kenapa langit biru, cara kerja tubuh, alam | F1, F8, F7 | V24, V13, V14, V22, V29, V7, V28, V18, V5 | narator=Siti | — |
| Edukasi | `sejarah` | sejarah tokoh, tempat, teknologi | F10, F2, F8 | V25, V2, V4, V28, V3, V20, V24 | narator=Galang | — |
| Pengembangan diri | `hubungan-sosial` | pertemanan, pasangan, komunikasi, etika bergaul | F9, F6, F5 | V23, V24, V5, V3, V20, V6 | narator=Safira, tokoh-1=Andi, tokoh-2=Citra | — |
| Pengembangan diri | `motivasi-tips` | tips cepat, opini, kebiasaan | F6, F5, F1 | V1, V9, V11, V16, V20, V21, V3 | narator=Galang | — |
| Pengembangan diri | `parenting` | tips orang tua, tumbuh kembang anak | F6, F1, F9 | V24, V23, V6, V22, V27, V5 | narator=Ratna, orang-tua=Galang, anak=Citra | health_claims |
| Pengembangan diri | `pelajaran-hidup` | hikmah, renungan, perumpamaan, filsafat ringan (stoik), kisah bermakna | F12, F2, F6 | V24, V25, V5, V14, V12, V2, V29, V1, V9 | narator=Ratna, tokoh-1=Galang, tokoh-2=Citra | — |
| Pengembangan diri | `psikologi-perilaku` | bias pikiran, kebiasaan, emosi, kesehatan mental ringan | F1, F7, F5 | V23, V14, V12, V22, V13, V5, V9 | narator=Anisa | mental_health |
| Uang & kerja | `bisnis-uang` | uang, bisnis, ekonomi | F3, F6, F1, F7 | V27, V9, V21, V8, V3, V18, V23 | narator=Galang | — |
| Uang & kerja | `karier-kerja` | CV, wawancara, kerja tim, freelance, produktivitas kerja | F6, F4, F3, F9 | V10, V27, V9, V23, V1, V21, V3 | narator=Andi | — |
| Uang & kerja | `keuangan-pribadi` | anggaran, menabung, utang, investasi dasar | F6, F7, F1, F3 | V27, V21, V9, V23, V6, V3 | narator=Anisa | finance_disclaimer, time_sensitive |
| Kisah | `kisah-anak` | dongeng, fabel, cerita anak non-religi | F2, F9 | V24, V23, V2, V6, V7, V5, V26 | narator=Siti, tokoh-1=Citra, tokoh-2=Andi, tokoh-3=Galang | fiksi |
| Kisah | `kisah-drama` | fiksi dewasa: perjuangan hidup, persahabatan, cinta, kantor, perantauan | F2, F9 | V24, V25, V5, V3, V2, V4, V12 | narator=Intan, tokoh-pria=Galang, tokoh-wanita=Ratna, tokoh-muda=Andi, tokoh-muda-wanita=Citra | fiksi |
| Kisah | `kisah-inspiratif` | kisah nyata tokoh/biografi singkat, perjuangan orang sukses | F10, F2 | V28, V2, V3, V4, V27, V21, V9 | narator=Galang, pembaca-kutipan=Safira | real_persons |
| Kisah | `kisah-keluarga` | kisah keluarga, kehidupan sehari-hari, moral, persahabatan | F2, F9 | V24, V25, V5, V2, V23, V6, V7 | narator=Safira, ayah=Galang, ibu=Ratna, anak-laki=Andi, anak-perempuan=Citra, kakek=Galang, nenek=Risa, teman=Andi | fiksi |
| Kisah | `kisah-komedi` | sketsa lucu sehari-hari, salah paham, dialog | F13, F9, F2 | V20, V23, V12, V26, V6, V11 | narator=Siti, tokoh-1=Andi, tokoh-2=Galang, tokoh-3=Citra | fiksi |
| Kisah | `kisah-seram` | cerita seram, urban legend, cerita rakyat mistis (tanpa gore) | F14, F2 | V25, V4, V15, V19, V12, V5 | narator=Galang, tokoh-1=Citra, tokoh-2=Andi, suara-misterius=Risa | fiksi, horror_safe |
| Agama | `agama-ibadah` | tata cara ibadah, doa, makna ayat/hadis (bukan kisah) | F4, F1, F6 | V24, V22, V5, V27, V9, V2 | narator=Galang | adab |
| Agama | `kisah-islami` | kisah nabi, sahabat, hikmah Al-Quran (anak & umum) | F2, F8 | V24, V5, V2, V28, V6, V25 | narator=Galang, tokoh-1=Citra, tokoh-2=Andi, tokoh-3=Ratna | adab |
| Berita | `berita-hiburan` | berita artis, selebriti, musik, film, viral | F11, F10, F5 | V1, V21, V3, V27, V9, V16, V11, V4 | narator=Intan | real_persons, time_sensitive |
| Berita | `berita-umum` | peristiwa terkini non-tech: kebijakan, bencana, ekonomi harian | F11, F7, F10 | V27, V28, V1, V9, V21, V3, V4 | narator=Intan | real_persons, time_sensitive |
| Berita | `olahraga` | pertandingan, atlet, aturan main, rekor | F11, F6, F3, F10 | V27, V21, V11, V1, V9, V18, V26 | narator=Andi | real_persons, time_sensitive |
| Gaya hidup | `dunia-hewan` | fakta hewan, perilaku, merawat hewan peliharaan | F1, F8, F6 | V23, V24, V7, V6, V29, V2, V26 | narator=Siti | — |
| Gaya hidup | `fashion-kecantikan` | padu padan, perawatan kulit, salah kaprah kecantikan | F6, F5, F4 | V8, V17, V16, V9, V3, V1 | narator=Siti | health_claims |
| Gaya hidup | `kesehatan-hidup` | kesehatan, gaya hidup, psikologi ringan | F1, F5, F6 | V23, V24, V6, V22, V27, V14 | narator=Siti | health_claims |
| Gaya hidup | `kuliner-resep` | resep, asal makanan, kenapa makanan X begitu | F4, F6, F1 | V6, V24, V2, V5, V7, V22, V3 | narator=Siti | — |
| Gaya hidup | `otomotif` | cara kerja mesin, perawatan motor/mobil, perbandingan | F1, F4, F3 | V18, V7, V27, V10, V26, V29 | narator=Andi | — |
| Gaya hidup | `pertanian-peternakan` | bertani, beternak, kebun rumah, ikan | F4, F1, F6 | V24, V2, V18, V27, V29, V6 | narator=Galang | — |
| Gaya hidup | `rumah-diy` | tips rumah, bersih-bersih, perbaikan kecil, life hack | F4, F6 | V6, V2, V22, V7, V5, V18 | narator=Siti | safety |
| Gaya hidup | `travel-budaya` | tempat, budaya daerah, tradisi, asal-usul nama | F10, F8, F6 | V28, V24, V2, V25, V3, V29 | narator=Galang | — |
| Hiburan | `gaming` | budaya game, tips, sejarah game (tanpa aset game berhak cipta) | F6, F5, F3, F11 | V26, V15, V16, V19, V11, V21 | narator=Andi | copyright |
| Hiburan | `misteri-fakta-unik` | fakta aneh, misteri, 'kenapa bisa begitu' | F6, F7, F10 | V4, V15, V12, V25, V19, V13, V20 | narator=Galang | — |
| Hiburan | `ulasan-film-buku` | ulasan/ringkasan film, buku, game (tanpa cuplikan berhak cipta) | F5, F6, F3 | V3, V20, V1, V4, V9, V11 | narator=Andi | — |
| Cadangan | `umum` | CADANGAN: topik yang tidak cocok kategori mana pun | F1, F6, F7, F5 | V23, V22, V3, V27, V9, V1, V24, V2, V5, V13 | narator=Galang | — |

Tipe figuratif (V23 maskot, V25 siluet, V20 komik) tidak pernah dipilih sebagai aksen di
kategori `real_persons`.

Topik campuran: pilih kategori dari **tujuan penonton** ("paham konsep" → konsep; "bisa
melakukan" → tutorial; "memilih" → perbandingan; "tersentuh / merenung" → kisah atau
`pelajaran-hidup`). Bedakan yang sering tertukar:

| Kalau topiknya… | Kategori |
|---|---|
| hikmah/renungan dengan perumpamaan ("pelajaran dari secangkir kopi") | `pelajaran-hidup` |
| daftar tips kebiasaan ("5 kebiasaan pagi") | `motivasi-tips` |
| cerita keluarga fiksi dengan tokoh | `kisah-keluarga` |
| cerita fiksi dewasa (cinta, perantauan, kantor) | `kisah-drama` |
| kisah nyata orang terkenal | `kisah-inspiratif` (orang nyata: aturan §8) |
| kisah nabi/sahabat | `kisah-islami` · tata cara ibadah/doa → `agama-ibadah` |
| kenapa kita menunda / overthinking | `psikologi-perilaku` |
| tidak cocok satu pun | `umum` |

## 5. Tata bahasa layout (K) — aturan dalam satu video

| Kode | Layout |
|---|---|
| K0 | **Slide** — judul pojok + panel + label. ANTI-POLA: maks **1 scene** per video |
| K1 | Panggung penuh — dunia ilustrasi full-bleed, protagonis di dalamnya, teks = caption |
| K2 | Objek pahlawan — satu objek ≥ 55% lebar, teks menempel ke objek |
| K3 | Poster tipografi — kata raksasa ≥ 70% lebar |
| K4 | Belah atas-bawah — A vs B ditumpuk vertikal |
| K5 | Alur vertikal — diagram mengalir, kamera menyusur (C3) |
| K6 | Peta / denah — kamera menyusuri lokasi |
| K7 | Macro → micro — masuk ke dalam komponen lalu keluar |
| K8 | Layar penuh perangkat — terminal/chat/HP memenuhi frame |
| K9 | Grid / bento — 4–9 item, satu menyala bergantian |
| K10 | Timeline vertikal |
| K11 | Angka raksasa + data |
| K12 | Percakapan — gelembung dialog tokoh |
| K13 | POV — dari mata protagonis |
| K14 | Cold open hasil akhir |
| K15 | Close-up karakter — maskot setengah badan bereaksi |

**Aturan (dicek di Boredom Audit brief + `qa-variety.py`):**

1. ≥ **4 kode K berbeda** per video; tidak ada K yang sama di dua scene berurutan.
2. **K0 ≤ 1 scene.** Judul di pojok kiri-atas tidak boleh jadi kebiasaan: posisi teks utama
   memakai ≥ **3 zona** berbeda per video (atas, tengah, bawah-tengah, menempel ke objek,
   di dalam gelembung).
3. Visual utama (bukan teks) selebar ≥ **55% area aman** di ≥ 50% scene.
4. Median occupancy MP4 ≥ **0,20** (FAIL) / 0,28 (WARN) — card boleh menurunkan lewat
   `min_occ` (V15 neon, V22 whiteboard = 0,12) karena garisnya tipis.
5. Tidak ada dua scene berurutan dengan peta isi yang hampir identik (`qa-variety` sim > 0,72).
6. Layout dominan (K pertama di `direction.json`) ≠ video sebelumnya.

## 6. Format narasi (F)

Beat tiap format ada di `direction-map.json → formats.<F>.beats`. Ringkas:

| F | Nama | Kapan | Suara |
|---|---|---|---|
| F1 | Analogi bahasa bayi | konsep abstrak → dunia sehari-hari | 1 |
| F2 | Kisah bertokoh | keluarga, kehidupan, kisah islami, dongeng | **≥ 2** |
| F3 | Duel A vs B | perbandingan | 1 |
| F4 | Tutorial langkah | cara melakukan | 1 |
| F5 | Mitos vs fakta | salah kaprah populer | 1 |
| F6 | Daftar / hitung mundur | tips, n hal | 1 |
| F7 | Sebab-akibat | "apa yang terjadi kalau…", insiden | 1 |
| F8 | POV objek | "aku adalah paket data" — konsep jadi perjalanan | 1 |
| F9 | Tanya-jawab dua tokoh | kisah anak/keluarga yang menjelaskan sesuatu | **2** |
| F10 | Timeline / dokumenter | sejarah | 1 |
| F11 | Kabar kilat | berita artis/umum/olahraga: apa → siapa → kronologi → **status konfirmasi** → kenapa penting | 1 |
| F12 | Perumpamaan / renungan | pelajaran hidup: kejadian kecil → dialog singkat → pembalikan makna → cermin ke penonton | **≥ 2** |
| F13 | Sketsa komedi | setup → salah paham → eskalasi → punchline → tag | **≥ 2** |
| F14 | Cerita seram | suasana normal → tanda aneh → eskalasi → puncak tanpa gore → penutup menggantung | **≥ 2** |

Aturan user: **kisah keluarga / kehidupan / kisah islami / dongeng = lebih dari satu suara.**
Itu mencakup semua `kisah-*`, `pelajaran-hidup` (F12), dan kategori yang contohnya berupa dialog
(`hubungan-sosial`, `parenting`, `bahasa-asing`). Kisah nyata (`kisah-inspiratif`) memakai
narator + **pembaca kutipan** (label "dibacakan" di layar) — tidak pernah meniru suara tokohnya.
Topik lain tetap satu narator kecuali user minta.

## 7. Mesin render: HyperFrames tetap, Remotion tidak dipasang (keputusan 10 Nov 2026)

Dicek: HyperFrames `0.8.169` (terpasang, pipeline + QA + memori kegagalan sudah matang di repo
ini), Remotion `4.0.542` (terpasang di project lain `~/Data/Project/motion-video`), dan
perbandingan publik ([HyperFrames docs](https://hyperframes.heygen.com/guides/hyperframes-vs-remotion),
[AutoAE](https://autoae.online/blog/hyperframes-vs-remotion-developer-verdict),
[Wireflow](https://www.wireflow.ai/blog/hyperframes-vs-remotion)).

**Remotion tidak menyelesaikan masalah yang ada.** Keduanya merender HTML di headless Chrome
frame-per-frame dan sama-sama deterministik; monoton di §1 adalah masalah *arahan*, bukan
mesin. Semua gaya V1–V29 bisa dibuat dengan primitif yang sudah ada di HyperFrames:

| Kebutuhan gaya baru | Di HyperFrames | Status |
|---|---|---|
| Karakter / maskot (V23) | rig SVG + GSAP; blok `lottie-character-walk`; adapter Lottie (`window.__hfLottie`) | rig SVG = primitif terverifikasi; Lottie **belum diuji render di repo ini** |
| Whiteboard / tulisan tangan (V22) | blok `whiteboard-ink`, `hw-*` (13 item), `cursor-annotate` | catalog ada |
| Peta (V28) | `world-map`, `nyc-paris-flight`, `us-map-flow` (pola) | catalog ada |
| Data (V27) | `chart-story`, `data-chart`, `bar-chart-race`, `mk-line-graph` | catalog ada |
| Low-poly (V29) | `facet-morph` | catalog ada |
| 3D (V7) | adapter Three.js, `product-turntable` | ≤ 6 detik (budget CPU) |

Catatan: `hyperframes catalog --json` **jalan** (448 item, pencarian lokal). Catatan ledger #11
"Registry tidak tersedia" keliru — perintahnya `catalog`, bukan `registry`.

Biaya kalau menggabungkan dua mesin: dua jalur render, dua set aturan determinisme, dua QA, dan
klip Remotion harus dirender 120fps + di-embed sebagai `<video>` supaya blend 120→60 konsisten.
Satu-satunya sinyal pro-Remotion yang ditemukan adalah anekdot komunitas ("HyperFrames kurang
berhasil di desain") — tidak cukup untuk menanggung biaya itu.

**Jalur darurat (bila suatu scene terbukti tidak bisa dibuat di HyperFrames):** render scene
itu di `~/Data/Project/motion-video` (sudah ada Remotion) ke MP4/WebM 1080×1920 @120fps,
salin ke `videos/<slug>/assets/clips/`, embed sebagai `<video>` seperti footage presenter
(`video-reels-presenter/presenter-layer.md`). Catat di `STYLE.md` + ledger. Jalur ini **belum
pernah dijalankan** — uji dulu dengan klip 3 detik sebelum dipakai di video penuh.

## 8. Konten sensitif

- **Kisah islami (`adab`):** Nabi, sahabat, malaikat **tidak digambarkan** — tidak ada wajah,
  tubuh, siluet, bayangan, atau avatar yang dimaksudkan sebagai beliau (aturan sama dengan
  `~/Data/Project/islamic-story-engine/lib/adab-guard.mjs`). Hadirkan lewat cahaya, lanskap,
  jejak, benda, kaligrafi nama, atau sudut pandang hewan/alam. Ucapan Nabi **tidak** diberi
  suara tokoh — narator yang mengutip. Ayat dikutip utuh dengan rujukan QS surah:ayat dari
  terjemahan resmi; riwayat di luar Al-Quran/hadis sahih diberi label "riwayat" atau dibuang.
  V25 (siluet) hanya untuk tokoh biasa/hewan, tidak pernah untuk Nabi.
- **Keamanan (`batas_konten`):** ikuti bagian "Batas konten" (tanpa payload, PoC, langkah
  eksploitasi, detail internal) — sama seperti `CLAUDE.md`.
- **Anak:** tidak ada adegan menakutkan/kekerasan; konflik kecil dan selesai baik.
- **Orang nyata (`real_persons`: berita artis/umum, olahraga):**
  - Fakta hanya dari **pernyataan resmi** (akun resmi, rilis, putusan pengadilan) atau
    **≥ 2 media kredibel** yang saling independen. Rumor/gosip yang belum dikonfirmasi **tidak
    dipakai** — bukan dibingkai "katanya".
  - Bahasa netral: "dilaporkan", "menurut <sumber>", "dalam unggahannya". Status hukum persis
    sesuai sumber (terlapor/tersangka/terdakwa/terpidana); tidak menyebut seseorang bersalah
    sebelum putusan. Ini soal risiko pencemaran nama baik (UU ITE), bukan cuma etika.
  - Tidak masuk ke urusan pribadi di luar yang sudah dinyatakan sendiri secara resmi (kesehatan,
    hubungan, alamat, keuangan pribadi). **Anak artis tidak pernah dibahas.**
  - **Tidak menggambarkan orangnya:** tanpa foto/cuplikan (hak cipta), tanpa karikatur, maskot,
    atau siluet yang dimaksudkan sebagai dia, tanpa meniru suaranya. Nama boleh tampil sebagai
    teks. Peristiwa divisualkan lewat tipografi, timeline, angka, benda, ikon, peta.
  - Tanpa logo media/brand dan tanpa tangkapan layar postingan asli; kutipan ditulis ulang
    sebagai teks + atribusi.
- **Peka waktu (`time_sensitive`):** tanggal status fakta tampil di layar ("per 10 Nov 2026"),
  ≥ 3 sumber, daftar "cek ulang sebelum posting" wajib. Kalau peristiwanya masih berkembang,
  scene penutup menyebut "masih berkembang", bukan kesimpulan.
- **Politik:** berimbang, tanpa ajakan memilih/menolak; klaim tokoh politik dikutip dengan
  atribusi, bukan dinyatakan sebagai fakta.
- **Ulasan film/buku/game:** tanpa cuplikan, poster, karakter, atau musik berhak cipta;
  spoiler diberi peringatan di layar.
- **Ibadah/fiqih (`agama-ibadah`):** dalil dari Al-Quran/hadis sahih dengan rujukan; perbedaan
  mazhab disebut, bukan dipilihkan satu sebagai satu-satunya yang benar; tanpa fatwa karangan.
- **`fiksi`** (kisah keluarga/anak/drama/komedi/seram): label "fiksi" kecil di scene penutup;
  nama tokoh rekaan; tidak memakai nama/kemiripan orang nyata; humor tidak merendahkan suku,
  agama, ras, disabilitas, atau fisik.
- **`horror_safe`** (kisah seram): tanpa darah/gore/bunuh diri; legenda/cerita rakyat diberi
  label "cerita rakyat" atau "konon", bukan fakta; tidak mengolok kepercayaan/ritual agama;
  tidak memakai tragedi nyata yang korbannya bisa dikenali; jumpscare suara ≤ −6 dBFS di atas VO.
- **`mental_health`** (psikologi): bukan diagnosis ("kalau ini terasa berat terus, ngobrol
  dengan psikolog"); tanpa label gangguan untuk orang tertentu. Topik yang menyentuh bunuh diri
  atau melukai diri: tanpa metode/detail, dan scene penutup mencantumkan layanan bantuan resmi
  yang **masih aktif — cek saat riset** (mis. layanan SEJIWA 119 ext 8).
- **`health_claims`** (kesehatan, parenting, kecantikan): klaim hanya dari lembaga (WHO,
  Kemenkes, IDAI, BPOM) atau penelitian yang dirujuk; tanpa dosis obat; tanpa merek; "konsultasi
  ke dokter/bidan" bila menyangkut gejala.
- **`finance_disclaimer`** (keuangan pribadi): edukasi, bukan ajakan beli; tanpa "pasti untung",
  tanpa rekomendasi saham/koin tertentu; produk keuangan disebut hanya bila terdaftar/diawasi OJK;
  angka bunga/inflasi bertanggal.
- **`legal`** (hukum sehari-hari): sebut UU/peraturan + pasal + tahun dari sumber resmi
  (peraturan.go.id, JDIH); "informasi umum, bukan nasihat hukum".
- **`copyright`** (gaming): tanpa aset, logo, karakter, musik, atau tangkapan layar game; game
  digambarkan lewat gaya V26/V15 orisinal.
- **`safety`** (rumah/DIY): peringatan nyata di layar untuk listrik, gas, bahan kimia; tidak
  pernah menyarankan mencampur bahan pembersih (pemutih + amonia/asam).
