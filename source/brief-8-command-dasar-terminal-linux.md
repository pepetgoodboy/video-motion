# BRIEF: 8 Command Dasar Terminal Linux (V10 - UI Motion, Extended)
**Format:** Reels/TikTok 9:16 (1080x1920), 60FPS
**Engine:** HyperFrames (CPU Pipeline)
**Bahasa:** Indonesia (santai-teknis)
**Status Fakta:** Oktober 2026 (Perintah dasar standar POSIX)

---

## 0. Cara pakai file
1. Baca detail scene dan arsitektur di bawah.
2. Gunakan blok dari `/hyperframes-registry` untuk UI Mock (Terminal, Nano Editor).
3. Jalankan pipeline audio untuk sinkronisasi ketikan (Foley UI) dengan *timestamp* VO.
4. Render dengan `paused` GSAP timeline secara deterministik.

---

## 1. Konsep
**Pesan Inti:** Terminal bukanlah layar matriks hacker yang menyeramkan, melainkan hanya *File Explorer* versi teks yang butuh 8 perintah dasar untuk dikuasai.
**Concept Lab:**
- **Kandidat 1 (Terpilih - 23/25):** Metafora "Gua Gelap & Senter". Protagonis: Kursor blok terminal `█`. Dunia Visual: Jendela terminal raksasa dengan UI nyata yang bereaksi terhadap perintah.
- *Kandidat 2 (Ditolak):* Dapur restoran (metafora terlalu abstrak, skor Akurat rendah).
- *Kandidat 3 (Ditolak):* Bongkar mesin sistem (sulit dirender di CPU).
**Dunia Visual:** Lingkungan antarmuka terminal Ubuntu yang hidup, didominasi warna gelap terminal dengan prompt `pepetgoodboy@ubuntu:~$`.
**Protagonis Visual:** Kursor blok `█` hijau yang selalu berkedip, bergerak, mengetik, dan membuka jalan di setiap *scene*.
**Open Loop & Payoff:** (0-5s) "Gimana cara mindahin dan bikin file tanpa mouse?" -> (75%) Payoff saat file akhirnya diedit pakai `nano`.

**Tension Map:**
| Scene | Fungsi | Ketegangan (1-5) | Energi Musik |
|---|---|---|---|
| S1 | Hook (Terminal vs GUI) | 4 | Tertahan, bass filter rendah |
| S2 | pwd & whoami (Posisi) | 2 | Santai, beat masuk perlahan |
| S3 | ls (Melihat area) | 3 | Stabil, ada melodi UI |
| S4 | cd (Berpindah) | 3 | Stabil |
| S5 | mkdir (Membangun) | 4 | Naik bertahap |
| S6 | cat (Membaca kilat) | 4 | Tegang tertahan, riser tipis |
| S7 | nano (Wow Moment!) | 5 | Terbuka (Drop), Riser kencang! |
| S8 | clear (Menyapu bersih) | 3 | Santai kembali |
| S9 | Outro | 2 | Resolve hangat |

---

## 2. Aturan anti-slop
- **Dilarang:** Layar terminal membeku (statis) saat VO menjelaskan. Ambient *scanline* dan kursor harus selalu berkedip/bergerak.
- **Wajib:** Tampilkan *syntax highlighting* asli dari terminal (misal: folder warna biru, file warna putih/hijau saat `ls`).
- **Wajib:** Koreografi *Impact 4 Lapis* setiap kali tombol `ENTER` ditekan (guncang kamera + visual pop + sfx hit + ducking musik).

---

## 3. Design tokens
- **Tipe Visual:** **V10 (UI / Product Motion)**. Fokus pada *mock UI* nyata, teks mono, pergerakan kursor yang hidup, dan transisi UI-ke-UI.
- **Palet:** **P1 (Terminal-Editorial)** -> Latar `ink #0E100E`, Teks standar `paper #EEE9DD`, Direktori `biru #42A5F5`, Aksen Kursor `hijau #4CAF50`.
- **Tipografi:** 
  - Display: **Bricolage Grotesque** (Anotasi luar terminal)
  - Mono: **JetBrains Mono** (Teks dalam terminal)
- **Teknik Teks (M):** M3 (Cut+type terminal), M6 (Word slam), M2 (Bar-wipe), M12 (Per-karakter drop).
- **Kamera (C):** C1 (Push-in), C3 (Pan vertikal ikuti output), C4 (Rack focus), C7 (Guncang halus saat ENTER), C8 (Zoom-through).
- **Transisi (X):** X2 (Match-cut), X9 (Scale-fill layar Nano), X1 (Panel wipe), X5 (Push).
- **Ambient (A):** A4 (Scanline bergerak vertikal), A6 (Kedip caret terminal).

---

## 4. Event Map dan Peta scene
| S# | Waktu | Durasi | Nama | Kamera | Transisi Masuk | Wow/Interrupt | Jml Kejadian |
|---|---|---|---|---|---|---|---|
| S1 | 0.0s | 10.0s | Hook: Hacker? | C1, C8 | - | Interrupt: Layar Terbelah | 8 |
| S2 | 10.0s | 12.0s | pwd & whoami | C3, C7 | X1 Wipe | - | 8 |
| S3 | 22.0s | 9.0s | ls | C1, C4, C7 | X2 Match-cut | Interrupt: Warna-warni | 7 |
| S4 | 31.0s | 10.0s | cd | C3, C7 | X5 Push | - | 8 |
| S5 | 41.0s | 10.0s | mkdir | C1, C7 | X5 Push | - | 8 |
| S6 | 51.0s | 9.0s | cat | C3, C7 | X2 Match-cut | - | 7 |
| S7 | 60.0s | 15.0s | nano (Wow!) | C1, C7 | X9 Scale-fill | **Wow Moment (Nano)** | 12 |
| S8 | 75.0s | 9.0s | clear | C2, C7 | X1 Wipe | Interrupt: Sapu Bersih | 6 |
| S9 | 84.0s | 6.0s | Outro | C2 | X2 Morph | - | 5 |

---

## 5. Detail scene

### S1 · Hook: Hacker? (0.0-10.0, 10s) · latar gelap P1
**Tujuan:** Mematahkan stereotip terminal itu menakutkan.
**VO:** "Masih mikir terminal Linux itu cuma buat hacker? Padahal... ini cuma File Explorer versi ngetik. Sini aku ajarin 8 command wajibnya!"
**Dunia visual / protagonis:** Kursor `█` hijau membanting layar jadi dua (GUI vs CLI), lalu kita masuk ke dalam dunia CLI.
**Lapisan:** Latar = grain A1; Tengah = Teks/Split screen; Depan = Kursor blok; Overlay = Scanline A4.
**Kamera:** C1 push-in stabil, lalu C8 zoom-through menembus terminal di akhir.
**Event Map:**
| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Tengah | Judul "CUMA BUAT HACKER?" masuk membanting | M6 slam | `back.out(1.7)` | thud besar |
| 1.5 | Depan | Kursor `█` jatuh dari atas, menebas layar di tengah | M12 drop | `expo.inOut` | swish pisau |
| 2.5 | Tengah | Layar terbelah: Kiri (Folder kuning, blur), Kanan (Terminal hitam) | X2 morph | `power2.out` | pop digital |
| 4.0 | Tengah | Prompt terminal muncul di sisi kanan | M2 bar-wipe | `power4.out` | tik tik tik |
| 6.0 | Depan | Garis pembatas bergeser ke kiri, terminal menguasai layar | UI resize | `power2.inOut` | swoosh |
| 7.5 | Tengah | Anotasi "8 Command Wajib" muncul dari baseline | M1 mask | `power2.out` | ting |
| 8.8 | Kamera | Zoom-through masuk ke dalam prompt terminal | C8 zoom | `expo.in` | whoosh masuk |

### S2 · Orientasi: pwd & whoami (10.0-22.0, 12s) · latar terminal
**Tujuan:** Orientasi posisi *user* di sistem.
**VO:** "Command pertama, cari tahu kamu lagi di mana pakai P-W-D. Terus, ketik who-am-i buat mastikan kamu login pakai user apa."
**Dunia visual / protagonis:** Kursor mengetik dan menarik output path direktori serta nama user ke layar.
**Lapisan:** Latar = Terminal `ink`; Tengah = Teks ketikan Mono; Depan = Anotasi Grotesque.
**Kamera:** C3 pan vertikal mengikuti baris.
**Event Map:**
| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Latar | Terminal penuh dengan prompt awal | X1 wipe | `power2.out` | - |
| 1.0 | Tengah | Ketik `pwd` | M3 type | `steps(3)` | ketikan |
| 2.2 | Semua | ENTER! (Koreografi impact 4 lapis) | C7 guncang | tabel offset | **impact heavy** |
| 2.8 | Tengah | Output `/home/pepetgoodboy` dirender | draw baris | `power4.out` | pop |
| 4.2 | Depan | Anotasi "Print Working Directory" muncul menunjuk ke output | M12 drop | `back.out` | sfx garis |
| 6.5 | Tengah | Prompt baru, ketik `whoami` | M3 type | `steps(6)` | ketikan cepat |
| 8.5 | Semua | ENTER! (Koreografi impact) | C7 guncang | tabel offset | **impact** |
| 9.2 | Tengah | Output `pepetgoodboy` muncul, warna hijau menyala | highlight | `expo.out` | chime terang |

### S3 · Lihat: ls (22.0-31.0, 9s) · latar terminal
**Tujuan:** Menunjukkan isi ruangan/direktori dengan pewarnaan.
**VO:** "Mau lihat isi ruangannya? Ketik L-S (list). Perhatiin warnanya, biru itu folder, putih itu file biasa."
**Kamera:** C4 rack focus bergantian ke folder dan file. C1 push-in perlahan.
**Event Map:** Ketik `ls` (1.0s) -> ENTER (2.5s) -> Output pecah jadi kolom (3.5s). Kamera C4 fokus ke teks biru "Documents" (5.0s, anotasi "Folder") -> Rack focus ke teks putih "note.txt" (7.0s, anotasi "File").

### S4 · Pindah: cd (31.0-41.0, 10s) · latar terminal
**Tujuan:** Navigasi antar direktori.
**VO:** "Sekarang kita masuk ke folder Documents. Caranya? Ketik C-D spasi Documents. Boom, path kamu langsung berubah."
**Kamera:** C3 pan halus ke bawah mengikuti kursor.
**Event Map:** Ketik `cd Documents` (1.5s) -> ENTER (3.5s). Sorot visual (highlight `oranye`) pada perubahan prompt: dari `~$` menjadi `~/Documents$` (5.5s). Anotasi "Change Directory" (7.0s).

### S5 · Bikin: mkdir (41.0-51.0, 10s) · latar terminal
**Tujuan:** Menciptakan direktori baru.
**VO:** "Butuh folder baru buat project? Gampang, ketik mkdir diikuti nama foldernya. Kita cek pakai ls, tuh langsung muncul kan!"
**Kamera:** C1 stabil, C7 guncang tiap enter.
**Event Map:** Ketik `mkdir web-baru` (1.5s) -> ENTER (3.5s). Lanjut ketik `ls` (5.5s) -> ENTER (6.8s) -> Output memunculkan direktori biru baru bernama `web-baru` yang berkedip hijau sekali sebagai tanda sukses (8.0s).

### S6 · Baca: cat (51.0-60.0, 9s) · latar terminal
**Tujuan:** Membaca file instan di terminal.
**VO:** "Kalau ada file teks dan pengen baca kilat tanpa buka aplikasi, pakai command cat."
**Kamera:** C3 vertikal. Musik riser mulai terbangun pelan.
**Event Map:** Ketik `cat config.txt` (1.5s) -> ENTER (3.0s). Dinding teks (5 baris) langsung menyembur keluar bersamaan, mengisi sisa ruang bawah layar (4.5s).

### S7 · Wow Moment: nano (60.0-75.0, 15s) · layar berubah jadi Nano Editor
**Tujuan:** Wow moment perpindahan ekstrem dari CLI log (baris) ke UI Editor (Fullscreen).
**VO:** "Tapi kalau mau ngedit, ketik nano. BAM! Terminalmu berubah jadi text editor utuh. Ketik-ketik, save, lalu exit."
**Dunia visual:** Transisi memecah belah layar. Garis batas terminal ditarik penuh (scale-fill). Muncul UI dengan *header* dan *footer shortcuts* khas GNU Nano.
**Lapisan:** Latar = Abu/hitam Nano; Tengah = Teks konten; Overlay = Flash transisi.
**Kamera:** Kick C7, lalu push-out C2 lambat.
**Event Map:**
| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Tengah | Ketik `nano config.txt` di terminal | M3 type | `steps` | ketik keras |
| 1.5 | Semua | ENTER! Kursor membesar menutupi seluruh pandangan | X9 fill | `expo.inOut` | **riser puncak!** |
| 2.5 | Semua | **BAILOUT**: Layar ber-morphing total jadi UI GNU Nano (Header putih, opsi bawah) | V10 Swap | `power2.out` | **wow hit + drop musik** |
| 4.5 | Tengah | Teks di dalam Nano diketik sangat cepat (otomatisasi) | M3 type | `steps` | clatter keyboard |
| 8.0 | Bawah | Menu footer `^O Write Out` dan `^X Exit` berkedip menyorot | highlight | `sine.inOut` | chime kecil |
| 11.0 | Semua | Exit Nano, UI terlipat kembali ke terminal CLI baris biasa | X1 Wipe | `power4.inOut` | swoosh balik |

### S8 · Sapu Bersih: clear (75.0-84.0, 9s) · latar terminal
**Tujuan:** Memberikan rasa lega/bersih setelah penuh teks.
**VO:** "Terakhir, kalau layarmu udah terlalu sumpek, ketik clear. Seketika bersih lagi kayak baru."
**Kamera:** C2 pull-back santai.
**Event Map:** Tampilan terminal sangat penuh log teks (0.0s). Ketik `clear` di baris terbawah (2.0s) -> ENTER (3.5s). Seluruh teks di layar *wipe up* (disapu ke atas) dengan sangat cepat (X5 Push), menyisakan layar hitam bersih dan 1 baris prompt baru di pojok kiri atas (4.8s). Jeda keheningan 0.8s (6.0s).

### S9 · Outro (84.0-90.0, 6s) · latar gelap
**Tujuan:** Ajakan bertindak, tutup iterasi.
**VO:** "Jangan dihafal, tapi dicoba. Save video ini buat contekan pas kamu buka Linux!"
**Kamera:** C2 pull-back.
**Event Map:** Layar terminal (hitam kotak) me-morphing (X2) mengecil menjadi bentuk ikon "Bookmark/Save". Teks M6 slam masuk "SAVE CONTEKAN INI!".

---

## 6. Audio
- **Voice Over:** Santai, edukatif. Kecepatan 2.2 kata/detik (total ~195 kata untuk 90 detik).
- **Musik:** *Synthwave/Cyberpunk lofi* 120 BPM. Filter tertutup (low-pass) di S1-S4. Mulai terbuka di S5. Riser kencang di S6 akhir, Drop dan *full frequency* di S7 (Nano), resolve hangat di S9.
- **Foley:** Ketikan keyboard mekanik responsif tiap `steps()` pada animasi M3. *Impact sub-bass* setiap perintah dieksekusi (ENTER).

---

## 7. Aturan teknis HyperFrames
- Teks yang dihasilkan saat mengeksekusi `ls` atau `cat` harus dipisahkan jadi beberapa *node* DOM agar bisa dianotasi, namun total tetap di bawah 400 elemen per *scene* (patuhi batas budget).
- Gunakan `transform: translateY` untuk menyimulasikan output terminal baru yang menolak log lama ke atas, bukan me-render ulang seluruh string DOM (efisiensi render CPU).
- Frame-blend aman, gunakan *duration* yang cukup saat `steps()` untuk ketikan agar tidak *smear*.

---

## 8. Fakta dan Sumber
- 8 Command POSIX dasar.
- Terminal prompt: `pepetgoodboy@ubuntu:~$` (mengikuti konvensi nama *user* Ubuntu standar).
- Menu shortcut Nano: `^O` untuk save/write out, `^X` untuk exit.

---

## 9. Prompt untuk agent
Using /hyperframes (faceless-explainer workflow), build the video described in BRIEF.md.

Rules:
- Follow BRIEF.md exactly: scene timing, layout coordinates, colors, fonts, motion codes (M/C/X/A), and event maps. Do NOT improvise design.
- Canvas 1080x1920, 60fps, 90s total duration. Use the Design Tokens block as DESIGN.md.
- Self-host fonts (Bricolage Grotesque, JetBrains Mono).
- Wrap every scene in a camera element (#cam) and implement the camera moves in the brief. 
- Implement the Visual Type (V10 - UI Motion) recipe consistently: build a realistic, breathing terminal UI. The `█` cursor protagonist must be blinking and moving when active.
- Every impact (especially hitting ENTER) must be four synchronized layers (visual pop, camera shake C7, SFX, music duck) within one frame.
- Ensure the prompt explicitly reads `pepetgoodboy@ubuntu:~$` for realism.
- During S7 (Nano Wow Moment), ensure the transition from CLI to Fullscreen Editor feels impactful and scale-fills correctly.
- Run lint/validate/inspect, check against the QA checklist and the Boredom Audit before rendering to MP4.

---

## 10. Caption postingan
Masih takut buka terminal Linux? 🥶 Padahal terminal itu cuma File Explorer versi ngetik doang lho! Nggak usah pusing ngafalin ratusan command, cukup kuasai 8 perintah dasar ini dan kamu udah siap jalan-jalan di server Linux! 🐧🔥 

Tonton sampai habis buat lihat trik rahasia edit file instan. Jangan lupa SAVE buat contekan praktek nanti! 💻✨

#Linux #Terminal #BelajarCoding #ProgrammerIndonesia #Ubuntu #DevOps #CyberSecurity

---

## 11. Catatan variasi
| Parameter | Video ini |
|---|---|
| Tipe Visual (V) | V10 (UI / product motion) |
| Palet | P1 (Terminal-editorial) |
| Format Narasi | Explainer / Tutorial 90 Detik |
| Metafora Utama | UI sebagai Entitas Hidup (Kursor sebagai lakon) |

---

## 12. Hasil Boredom Audit
1. Celah terbesar antar kejadian: **1.5s** (di sela-sela output cat) (Lulus)
2. Jumlah teknik teks berbeda: **4** (M1, M2, M3, M6, M12) (Lulus)
3. Jumlah jenis transisi berbeda: **4** (X1, X2, X5, X9) (Lulus)
4. Gerak kamera per scene: **100%** scene memiliki kamera (Lulus)
5. Lapisan z/parallax: **3 Lapis** (Terminal BG, Teks Mono, Anotasi Grotesque) di >70% scene (Lulus)
6. Kontras skala per scene: **3.3:1** (pengecualian gaya V10 Terminal, namun anotasi luar memberikan skala kontras) (Lulus bersyarat)
7. Gerak ambient di tiap scene: **100%** (Caret kedip A6 & Scanline A4) (Lulus)
8. Wow moment: **Ada (S7 - Nano Editor, di durasi ~66%)** (Lulus)
9. Pattern interrupt: Tiap **≤ 10s** (Tiap ganti command adalah interrupt konteks) (Lulus)
10. Open loop: Ditutup di S7 (**75% durasi**) (Lulus)
11. Kurva ketegangan: Tidak datar, naik bertahap, puncak absolut di S7 (**5/5**) (Lulus)
12. Dinamika musik: **4 Keadaan** (Tertahan, Stabil, Riser, Drop/Resolve) (Lulus)
13. Metafora/dunia: Antarmuka UI hidup di **100%** scene (Lulus)
14. Budget Render: **Aman** (tanpa shader WebGL berat, hanya animasi berbasis CSS transform) (Lulus)