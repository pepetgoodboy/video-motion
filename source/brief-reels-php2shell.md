# Brief Produksi: PHP2Shell (CVE-2026-109618 & CVE-2026-109619)

**Format:** Reels / TikTok, 9:16, 1080×1920, 60 detik, 30 fps
**Engine:** HyperFrames (HTML + CSS + GSAP timeline `paused`, deterministik)
**Bahasa:** Indonesia santai-teknis. Istilah teknis tetap Inggris.
**Status fakta:** per **24 Oktober 2026**. Topik ini bergerak cepat. Baca bagian 8 sebelum posting.

---

## 0. Cara pakai file ini

1. Simpan di root project HyperFrames sebagai `BRIEF.md`.
2. Salin blok **Design Tokens** (bagian 3) ke `DESIGN.md` / `frame.md`.
3. Di Claude Code, jalankan prompt di bagian 9 dengan merujuk `@BRIEF.md`.
4. Sebelum render, cocokkan semua angka dan versi di layar dengan tabel fakta (bagian 8). Kalau ada yang berubah, ubah brief-nya dulu, jangan edit hasil render.

---

## 1. Konsep

### Pesan inti (satu kalimat)
> Celahnya ada di mesin PHP-nya sendiri, bukan di kode aplikasimu. Jadi aplikasi yang bersih pun ikut terdampak sampai PHP-nya di-patch.

### Big idea
Video dibuka dengan kontradiksi: `composer audit` bilang aman, tapi server tetap berpotensi jebol. Kontradiksi itu dijelaskan lewat satu analogi (**kunci kamar hotel yang masih nyala setelah tamunya check-out**), lalu ditutup dengan tindakan yang spesifik: versi mana, cara cek yang benar, dan apa yang dilakukan kalau belum bisa update.

### Metafora
| Konsep teknis | Metafora | Dipakai di |
|---|---|---|
| Memori dibebaskan, penunjuk (pointer) masih hidup | Tamu sudah check-out, kunci kamar masih nyala | S3 |
| Bug terjadi sebelum kode aplikasi jalan | Satpam di pintu depan sudah kebobolan sebelum resepsionis bertugas | S4 (diagram berlapis) |

### Motif visual yang berulang (jangan tambah motif lain)
- **Bar-wipe:** blok warna solid menyapu dan menutup teks, lalu lewat dan membuka teks. Dipakai untuk semua headline.
- **Grid kotak:** sel memori (S3) dan kotak versi (S6) memakai bahasa visual yang sama: kotak tajam, tanpa sudut membulat.
- **Warna punya makna tetap:** kuning = PHP / peringatan, merah = serangan atau bahaya aktif, mint = sudah di-patch, bone = netral.

### Tone
Tenang dan serius, tidak panik, tidak clickbait. Ini berita keamanan: spesifik, hati-hati dengan klaim, jangan melebih-lebihkan. Pakai kata **"berpotensi", "bisa", "tercatat"**. Jangan pakai "pasti kena", "semua server diretas", "kiamat".

### Struktur retensi
| Detik | Fungsi |
|---|---|
| 0-4.5 | Hook: kontradiksi "kode bersih, server tetap bisa jebol" |
| 4.5-10 | Fakta keras: skor, dua CVE, umur 14 tahun |
| 10-21 | Penjelasan mekanisme lewat satu analogi |
| 21-30 | Kenapa ini beda: bug muncul sebelum kode aplikasi jalan |
| 30-39 | Status serangan yang jujur: banyak percobaan, belum jelas berapa yang berhasil |
| 39-51 | Tindakan: versi patch + cara cek yang benar |
| 51-60 | Kalau belum bisa update + CTA + loop ke hook |

---

## 2. Aturan Anti-Slop

### Dilarang
- Gradient ungu-biru, blob, orb glow, mesh gradient, "hacker hijau Matrix", tengkorak, kunci gembok neon, siluet hacker berhoodie.
- Kartu membulat + shadow + border tipis (glassmorphism).
- Emoji atau ikon stok sebagai pengganti desain.
- Font: Inter, Poppins, Roboto, Space Grotesk, Montserrat.
- Semua elemen masuk dengan `opacity 0→1, y 40→0` lalu stagger.
- Semua teks center-aligned di tengah layar.
- Bullet 3 poin dengan ikon di kiri.
- Pembuka: "Di era digital ini", "Hai guys", "Tahukah kamu", "Breaking!".
- Kata sifat kosong: "mengerikan", "dahsyat", "gawat banget", "parah banget".
- Efek glitch / RGB split sebagai dekorasi.
- Lebih dari 12 kata per momen di layar.
- Lebih dari 2 jenis easing dalam satu scene.

### Wajib
- **Satu ide per scene.** Layout tiap scene berbeda dari scene sebelumnya.
- **Angka sebagai gambar.** "9.2" dan "14 TAHUN" adalah elemen terbesar di layar pada scene-nya.
- **Spesifik:** nomor CVE asli, nomor versi asli, tanggal asli, perintah asli (`composer audit`, `php -v`, `zgrep`).
- **Ada momen diam.** Minimal 3 jeda 0.4-0.6 detik tanpa gerakan.
- **Variasi latar:** ink → kuning penuh → ink → ink → bone (terang) → ink → kuning penuh. Kuning di awal dan akhir bertindak sebagai pembuka dan penutup "peringatan".
- **Tekstur statis:** grain dari SVG `feTurbulence` dengan seed tetap, tidak dianimasikan.

---

## 3. Design Tokens (salin ke `DESIGN.md` / `frame.md`)

```css
:root {
  /* Warna */
  --ink:        #0B0B0A;   /* latar utama gelap */
  --ink-2:      #151513;   /* panel / kotak */
  --bone:       #F1EFE8;   /* teks utama & latar terang (S5) */
  --bone-dim:   rgba(241, 239, 232, 0.58);
  --hairline:   rgba(241, 239, 232, 0.14);
  --caution:    #F5C400;   /* = PHP / peringatan / sistem rentan */
  --alert:      #E63946;   /* = serangan / bahaya aktif */
  --patched:    #5EE0A0;   /* = sudah di-patch (di latar gelap) */
  --patched-ink:#118A55;   /* = sudah di-patch (di latar terang) */

  /* Font (self-host woff2 di /fonts, jangan andalkan CDN) */
  --f-display: "Archivo", sans-serif;          /* wght 800, wdth 100-118 (variable) */
  --f-accent:  "Newsreader", serif;            /* italic 500 saja */
  --f-mono:    "IBM Plex Mono", monospace;     /* wght 500-600 */

  /* Canvas & safe zone (px, 1080×1920) */
  --safe-left: 72px;
  --safe-right: 128px;     /* tombol like/share */
  --safe-top: 240px;
  --safe-bottom: 460px;    /* konten berhenti di y=1460 */
  /* Area konten efektif: x 72→952 (880 lebar), y 240→1460 (1220 tinggi) */
}
```

### Skala tipografi
| Peran | Font | Ukuran | Catatan |
|---|---|---|---|
| Angka raksasa | Archivo 800, wdth 118 | 380px ("9.2") | satu per video |
| Headline | Archivo 800, wdth 100-112 | 84-150px | line-height 0.95, letter-spacing -0.02em |
| Aksen manusiawi | Newsreader *italic* | 48-64px | kalimat pendek, catatan, kesimpulan |
| Label teknis / terminal | IBM Plex Mono 500-600 | 32-44px | **minimum 32px** |

### Bahasa gerak (motion language)
| Nama | Teknik / Easing GSAP | Durasi | Dipakai untuk |
|---|---|---|---|
| `bar-wipe` | blok solid `scaleX 0→1→0` (origin kiri lalu kanan), teks muncul saat blok menutup penuh | 0.35s | semua headline dan kalimat aksen |
| `slam` | `scale 1.12→1`, `expo.out`; opacity langsung 1 | 0.25s | HANYA angka besar dan nomor versi |
| `cut` | perubahan instan, tanpa easing | 0s | output terminal, pergantian state |
| `draw` | `power2.inOut` pada `stroke-dashoffset` | 0.5-1.4s | garis, bar timeline, centang |
| `glide` | `expo.inOut` | 0.3-0.5s | transisi antar scene (panel warna menyapu) |
| `type` | `steps(n)` | sesuai karakter | ketikan terminal |

Teks **tidak** masuk lewat fade+translate. Teks masuk lewat `bar-wipe`, `cut`, atau `type`.

### Elemen persisten
- Header berjalan di `x=72, y=250`: `CVE-2026-109618 · 109619`, mono 32px, `--bone-dim` (di S2 dan S7 pakai `--ink` 60%, di S5 pakai `--ink` 55%).
- Tampil di S2-S6. **Tidak ada** di S1 (sebelum t=2.6) dan S7.
- Tidak ada logo, watermark, atau lower-third lain.

---

## 4. Peta Scene

| # | Waktu (abs) | Durasi | Nama | Latar | Layout |
|---|---|---|---|---|---|
| S1 | 0.0-4.5 | 4.5s | Hook | Ink | Terminal + judul rata kiri |
| S2 | 4.5-10.0 | 5.5s | Fakta keras | **Kuning penuh** | Angka raksasa + bar 14 tahun |
| S3 | 10.0-21.0 | 11s | Kunci hotel (mekanisme) | Ink | Grid memori 6×4 |
| S4 | 21.0-30.0 | 9s | Sebelum kode kamu jalan | Ink | Pipeline berlapis vertikal |
| S5 | 30.0-39.0 | 9s | Status serangan | **Bone (terang)** | Timeline vertikal gaya dokumen |
| S6 | 39.0-51.0 | 12s | Patch + cara cek | Ink | Grid versi 2×2 + panel terminal |
| S7 | 51.0-60.0 | 9s | Belum bisa update + CTA | **Kuning penuh** | Headline besar + dua baris + CTA |

**Grid ketukan:** 120 BPM (1 beat = 0.5s). Semua batas scene jatuh di kelipatan 0.5s.

**Struktur HyperFrames:** satu sub-composition per scene dengan `data-start` dan `data-duration` sesuai tabel. Panel transisi (warna yang menyapu) milik scene yang **datang**, bukan yang pergi, supaya tidak ada gap hitam.

---

## 5. Detail Scene

> Waktu `t` relatif terhadap awal scene. Koordinat dalam px, origin kiri-atas, canvas 1080×1920.

### S1 · HOOK (0.0-4.5s)

**Tujuan:** Kontradiksi dalam 3 detik. Developer langsung mengenali `composer audit` dan `php -v`.

**VO:** "Kode aplikasi kamu bersih. Tapi server PHP-nya tetap bisa kebobolan. Namanya PHP2Shell."

**Teks di layar**
- `$ composer audit`
- `✓ No security vulnerability` / `advisories found.` (output, dua baris)
- `$ php -v`
- `PHP 8.3.30 (cli)` dengan `8.3.30` di-highlight, label `← contoh versi sebelum patch`
- Judul: **PHP2Shell** dan *bukan bug di kodemu.*

**Layout:** rata kiri `x=72`. Terminal mulai `y=560`: baris 1 di 560, output 2 baris di 620 dan 668, baris `php -v` di 760, output di 820, label di 880. Judul `PHP2Shell` di `y=1000-1150`, sub di `y=1190`.

**Visual**
- Latar ink + grain. Mono 40px (`--bone-dim` untuk perintah, `--patched` untuk output composer).
- `8.3.30` memakai `--caution`, diberi kotak stroke 3px `--alert`.
- `PHP2Shell`: Archivo 800 wdth 118, 144px, `--caution`. Cek lebar ≤ 880px.
- Sub: Newsreader italic 64px `--bone`.

**Animasi**
| t | Aksi | Easing | Durasi |
|---|---|---|---|
| 0.2 | Caret blok muncul, berkedip tiap 0.5s (finite) | `cut` | - |
| 0.2 | `$ composer audit` diketik | `type` | 0.7s |
| 1.0 | Output composer muncul **instan** dengan centang | `cut` | 0 |
| 1.6 | `$ php -v` diketik | `type` | 0.3s |
| 2.0 | Output `PHP 8.3.30 (cli)` muncul instan | `cut` | 0 |
| 2.1 | Kotak merah digambar mengelilingi `8.3.30`; label contoh muncul | `draw` | 0.35s |
| 2.6 | Terminal turun ke opacity 0.25. `PHP2Shell` bar-wipe, lalu sub-judul 0.2s kemudian | `bar-wipe` | 0.35s |
| 3.6 | **Diam** | - | 0.4s |
| 4.0 | Blok kuning menyapu dari kanan ke kiri menutup layar (jadi latar S2) | `glide` | 0.4s |

**Suara:** klik keyboard di t=0.2-0.9 dan 1.6-1.9; "ting" kecil di output composer; satu nada rendah (impact) di t=2.6 saat judul muncul.

---

### S2 · FAKTA KERAS (4.5-10.0s)

**Tujuan:** Tiga angka yang membuat penonton paham skalanya: dua CVE, skor 9.2, umur 14 tahun.

**VO:** "Dua celah di inti PHP, bukan di framework atau plugin. Skor 9,2. Umurnya sejak 2012."

**Latar:** `--caution` penuh. Semua teks `--ink`.

**Layout (rata kiri, `x=72`)**
| Elemen | Posisi | Spesifikasi |
|---|---|---|
| Dua tag CVE | y=300 dan y=350 | `CVE-2026-109618` dan `CVE-2026-109619`, mono 34px, batang kiri 4px `--ink` |
| Angka `9.2` | y=470-840 | Archivo 800 wdth 118, 380px |
| Label `CVSS 4.0` | di kanan angka, y≈520 | mono 36px |
| `kritis` | di bawah label, y≈590 | Newsreader italic 64px |
| `14 TAHUN` | y=880-1000 | Archivo 800 wdth 112, 120px |
| Bar 14 tahun | y=1060, x 72→952 | garis 6px `--ink`, 14 tick tiap ±62.8px |
| Label bar | y=1100 | kiri `2012 · PHP 5.4`, kanan (rata kanan) `2026 · PHP 8.5`, mono 34px |

**Animasi**
| t | Aksi | Easing | Durasi |
|---|---|---|---|
| 0.1 | Dua tag CVE bar-wipe, stagger 0.12s | `bar-wipe` | 0.3s |
| 0.5 | `9.2` muncul | `slam` | 0.25s |
| 1.0 | `CVSS 4.0` lalu `kritis` | `bar-wipe` | 0.3s |
| 2.2 | `14 TAHUN` | `slam` | 0.25s |
| 2.6 | Bar digambar kiri ke kanan; tiap tick muncul berurutan (0.05s antar tick) | `draw` | 1.4s |
| 4.0 | Label bar kiri lalu kanan | `bar-wipe` | 0.25s |
| 4.6 | **Diam** | - | 0.4s |
| 5.1 | Panel ink naik dari bawah menutup layar (jadi latar S3) | `glide` | 0.3s |

**Suara:** impact berat di t=0.5 (angka `9.2`); tick halus per tick bar; whoosh pendek di transisi.

---

### S3 · KUNCI HOTEL (10.0-21.0s)

**Tujuan:** Penonton paham *use-after-free* tanpa istilahnya, lewat analogi. Diagram bersifat konseptual.

**VO:** "Kalau PHP kehabisan memori di momen yang salah, dia berhenti mendadak, tapi nggak semuanya dibereskan. Memorinya sudah dibebaskan, penunjuknya masih hidup. Kayak kunci hotel yang masih nyala setelah tamunya check-out."

**Zona layout**
| Zona | Area | Isi |
|---|---|---|
| A | y 270-490 | Label + headline |
| B | y 560-1160 | Grid memori |
| C | y 1190-1420 | Caption langkah (satu aktif pada satu waktu) |

**Zona A:** mono 34px `--bone-dim`: `CARA KERJANYA, VERSI SINGKAT`. Headline Archivo 800 wdth 100, ±84px, `--bone`: **Kunci hotel** / **yang masih nyala.** (cek lebar ≤ 880px).

**Zona B: grid memori.** 6 kolom × 4 baris, sel 120×120, jarak 16px, mulai `x=72, y=620` (lebar total 800). Sel kosong = outline 3px `--hairline`. Sel terisi = fill `--bone`. Sel "setengah terinisialisasi" = hatch diagonal `--bone`. Sel dibebaskan = outline putus-putus `--caution`. Sel data lain = fill `--alert`.
**Penunjuk (`ptr`):** tag kotak kecil (mono 32px, fill `--caution`, teks `--ink`) dengan garis 3px `--caution` ke sel target: baris 2, kolom 3.

**Zona C:** mono 36px `--bone` untuk nomor langkah, Newsreader italic 52px untuk kalimat.

**Animasi**
| t | Aksi | Easing | Durasi |
|---|---|---|---|
| 0.0 | Label dan headline | `bar-wipe` | 0.35s |
| 1.0 | Grid dingambar: 24 sel muncul bergelombang, stagger 0.02s | `draw` | 0.5s |
| 1.6 | **Langkah 1.** 8 sel terisi (baris 1-2, kolom 1-4). Tag `ptr` dan garis ke sel (2,3) | `cut` / `draw` | 0.3s |
| 1.6 | Caption: `① request ambil memori` | `cut` | 0 |
| 3.2 | **Langkah 2.** Garis merah 6px menyapu menembus grid, label `bailout` (mono 32px, `--alert`). Beberapa sel jadi hatch (setengah jadi) | `draw` | 0.4s |
| 3.2 | Caption: `② memori habis di momen yang salah, proses berhenti mendadak` (dua baris) | `cut` | 0 |
| 5.2 | **Langkah 3.** Sel (2,3) jadi outline putus-putus kuning. Garis `ptr` **tetap menempel** | `cut` | 0 |
| 5.2 | Caption: `③ memori dibebaskan, penunjuk masih hidup` | `cut` | 0 |
| 6.8 | Tag `ptr` berubah label jadi *kunci kamar 12* (Newsreader italic); sel putus-putus diberi label *tamu check-out* | `bar-wipe` | 0.3s |
| 7.6 | **Langkah 4.** Sel (2,3) terisi `--alert`; label *tamu baru* | `slam` | 0.25s |
| 7.6 | Caption (Newsreader italic 52px): *penunjuk lama membaca tempat yang bukan miliknya.* | `bar-wipe` | 0.35s |
| 9.6 | **Diam** | - | 0.6s |
| 10.2 | Sel runtuh: `scaleX→0`, stagger dari kiri 0.02s | `glide` | 0.4s |

**Suara:** tick kecil per langkah; di langkah 2, audio **dipotong total 0.2 detik** (sound dropout) sebagai tanda bailout; klik logam (kunci) di t=6.8; thud rendah di langkah 4.

---

### S4 · SEBELUM KODE KAMU JALAN (21.0-30.0s)

**Tujuan:** Jelaskan kenapa ini berbeda dari bug aplikasi biasa: celahnya terjadi di tahap awal pemrosesan request.

**VO:** "Yang bikin serem: bug-nya kena saat PHP memproses request, sebelum kode aplikasi kamu jalan. Jadi Laravel, WordPress, atau Magento ikut terdampak, selama PHP-nya belum di-patch."

**Layout: pipeline vertikal (empat lapis, semua 880px lebar)**
| Lapis | y | Teks (Archivo 800 44px) | Gaya |
|---|---|---|---|
| 1 | 320-470 | `REQUEST MASUK` | outline 3px `--bone` |
| 2 | 520-670 | `PHP MEMPROSES REQUEST` | fill `--caution`, teks `--ink`; tag `BUG DI SINI` (mono 32px, `--alert`) di sisi kanan |
| 3 | 720-870 | `EKSTENSI DIINISIALISASI` | outline `--hairline`, teks `--bone-dim` |
| 4 | 920-1070 | `KODE APLIKASI KAMU` | outline `--hairline`, teks `--bone-dim`; sub mono 32px `Laravel · WordPress · Magento` |

Panah vertikal 4px `--bone` antar lapis. Di lapis 3 dan 4 tag kecil `belum jalan` (mono 32px, `--bone-dim`).

**Baris tag SAPI (y=1150 dan y=1230, mono 32px, kotak outline 2px):** `mod_php` (diberi `paling berisiko`), `PHP-FPM`, `php-cgi`, `FrankenPHP`, `LiteSpeed`.

**Animasi**
| t | Aksi | Easing | Durasi |
|---|---|---|---|
| 0.0 | Judul kecil `URUTAN PROSES` (mono 34px) di y=270 | `bar-wipe` | 0.3s |
| 0.4 / 0.9 / 1.4 / 1.9 | Lapis 1-4 muncul berurutan | `cut` + `bar-wipe` pada teks | 0.25s |
| 3.0 | Garis scan merah 4px turun dari lapis 1 dan **berhenti di lapis 2**; lapis 2 berkedip merah satu kali | `power2.in` | 0.5s |
| 3.6 | Tag `BUG DI SINI` muncul. Tag `belum jalan` muncul di lapis 3-4 | `cut` | 0 |
| 5.8 | Tag SAPI diketik satu per satu | `type` | 0.2s per tag |
| 6.8 | Kotak `mod_php` berubah border `--alert`, label `paling berisiko` muncul | `cut` | 0 |
| 8.2 | **Diam** | - | 0.3s |
| 8.5 | Panel bone menyapu dari kiri ke kanan (jadi latar S5) | `glide` | 0.5s |

**Suara:** "tick" mekanis per lapis; satu "zap" kering saat garis scan mengenai lapis 2.

---

### S5 · STATUS SERANGAN (30.0-39.0s)

**Tujuan:** Informasi jujur: serangan nyata, tapi belum jelas berapa yang berhasil. Tidak menakut-nakuti, tidak meremehkan.

**VO:** "Percobaan serangan pertama tercatat 17 Oktober, empat hari sebelum patch. Sekarang jutaan, kata Cloudflare. Tapi belum jelas berapa yang berhasil."

**Latar:** `--bone` (terang) dengan grain. Teks `--ink`. Suasana "dokumen laporan".

**Layout**
- Header: `STATUS PER 24 OKT 2026`, mono 34px 600, `y=260`.
- Garis timeline vertikal 4px `--ink` di `x=140`, dari `y=340` ke `y=1100`.
- Empat node (kotak 28×28px di garis), tiap entri: tanggal mono 34px 600 di `x=200`, keterangan Archivo 700 48px di bawahnya.

| Node | Tanggal | Keterangan | Warna node |
|---|---|---|---|
| 1 | `1 AGU` | Calif menemukan celah | `--ink` |
| 2 | `17 OKT` | Percobaan serangan pertama tercatat | `--alert` |
| 3 | `21 OKT · 14:00 UTC` | Patch dirilis | `--patched-ink` |
| 4 | `21-22 OKT` | Jutaan percobaan (kata Cloudflare) | `--alert`, kotak lebih besar (44px) |

- Penutup (y=1180-1330): Newsreader italic 56px `--ink`: *Banyak percobaan ≠ banyak yang berhasil.* Di bawahnya mono 32px `--ink` 60%: `PoC publik umumnya butuh kondisi khusus di server target.`

**Animasi**
| t | Aksi | Easing | Durasi |
|---|---|---|---|
| 0.0 | Header | `bar-wipe` | 0.3s |
| 0.4 | Garis timeline digambar dari atas ke bawah | `draw` | 3.0s |
| 0.8 / 1.8 / 2.8 / 3.8 | Node muncul tepat saat garis melewati, lalu tanggal dan keterangan | `cut` + `bar-wipe` | 0.3s |
| 3.8 | Kata `jutaan` di node 4 diberi `slam` | `slam` | 0.25s |
| 5.6 | **Diam** | - | 0.4s |
| 6.0 | Kalimat penutup | `bar-wipe` | 0.35s |
| 6.8 | Catatan PoC (mono) | `bar-wipe` | 0.3s |
| 8.4 | Panel ink naik dari bawah (jadi latar S6) | `glide` | 0.4s |

**Suara:** tick kertas di tiap node; satu nada rendah menggantung di node 4; di akhir ada jeda hening 0.3s sebelum transisi.

---

### S6 · PATCH + CARA CEK (39.0-51.0s)

**Tujuan:** Tindakan konkret. Versi yang benar, dan jebakan `php -v` pada paket distro.

**VO:** "Update ke PHP 8.5.12, 8.4.27, 8.3.36, atau 8.2.35. Di Debian, Ubuntu, atau RHEL, versinya bisa tetap sama setelah di-patch, jadi cek CVE-nya di changelog, bukan cuma php -v. Terus restart PHP-FPM atau Apache."

**Zona layout**
| Zona | Area | Isi |
|---|---|---|
| A | y 270-300 | Label mono `VERSI YANG SUDAH DIPERBAIKI` |
| B | y 330-870 | Grid versi 2×2 |
| C | y 910-1060 | Catatan EOL |
| D | y 1110-1440 | Panel terminal cek changelog |

**Zona B:** kotak 430×260, jarak 20px. Posisi: (72,330), (522,330), (72,610), (522,610). Outline 3px `--patched`. Isi: label seri mono 32px `--bone-dim` kiri-atas (`seri 8.5`, `8.4`, `8.3`, `8.2`), nomor versi Archivo 800 wdth 112, ±100px `--bone` (`8.5.12`, `8.4.27`, `8.3.36`, `8.2.35`), centang SVG stroke 4px `--patched` kanan-atas.

**Zona C:** Newsreader italic 48px `--bone-dim`: *8.1 ke bawah: tidak ada rilis resmi.* Di bawahnya mono 34px `--caution`: `→ patch lewat vendor / distro`.

**Zona D:** panel `--ink-2`, `x 72-952`. Di atas (Newsreader italic 48px `--bone`): *php -v bisa tetap "8.1.34" setelah patch.* Di dalam panel (mono 32px):
```
$ zgrep CVE-2026-109618 \
  /usr/share/doc/php8.1-common/\
  changelog.Debian.gz
```
Setelah perintah: Newsreader italic 48px `--patched`: *ketemu = sudah di-backport.* Footer mono 34px `--patched` di y=1400: `lalu restart PHP-FPM / Apache`.

**Animasi**
| t | Aksi | Easing | Durasi |
|---|---|---|---|
| 0.0 | Label zona A | `bar-wipe` | 0.3s |
| 0.5 / 1.0 / 1.5 / 2.0 | Kotak versi 1-4: kotak muncul, nomor `slam`, centang digambar | `slam` + `draw` | 0.25s + 0.3s |
| 3.2 | Catatan EOL | `bar-wipe` | 0.35s |
| 5.0 | Kalimat "php -v bisa tetap..." | `bar-wipe` | 0.35s |
| 5.8 | Panel muncul; perintah diketik tiga baris | `type` | 0.5s per baris |
| 8.6 | Kalimat hasil "ketemu = sudah di-backport" | `bar-wipe` | 0.35s |
| 10.0 | Footer restart | `bar-wipe` | 0.3s |
| 11.2 | **Diam** | - | 0.3s |
| 11.5 | Blok kuning menyapu dari kanan (jadi latar S7) | `glide` | 0.5s |

**Suara:** musik "resolve" (satu akor hangat) saat kotak versi ke-4 muncul; klik mekanis per ketikan; satu tick lembut saat centang selesai.

**Catatan:** contoh perintah memakai `php8.1-common` sebagai ilustrasi dari sumber (Sansec). Jangan menambahkan perintah lain yang tidak ada di tabel fakta.

---

### S7 · BELUM BISA UPDATE + CTA (51.0-60.0s)

**Tujuan:** Beri opsi sementara dengan label yang jelas ("cuma menahan"), CTA yang spesifik, dan akhir yang menyambung ke hook.

**VO:** "Belum bisa update? Blokir upload multipart atau pasang WAF dulu, tapi itu cuma menahan. Cek server PHP kamu hari ini."

**Latar:** `--caution` penuh. Teks `--ink`.

**Layout (rata kiri, `x=72`)**
| Elemen | Posisi | Spesifikasi |
|---|---|---|
| Headline | y 280-560 | **Belum bisa** / **update?** Archivo 800 wdth 112, 120px |
| Baris A | y 620-700 | `▸ blokir multipart/form-data` (mono 36px); di bawahnya Newsreader italic 40px: *upload akan rusak* |
| Baris B | y 740-820 | `▸ WAF (rule Cloudflare, free)` mono 36px |
| Stempel | y 880-980 | **CUMA MENAHAN.** Archivo 800 wdth 112, 84px, garis bawah 6px `--ink` |
| CTA | y 1120-1300 | **Cek PHP server kamu** / **hari ini.** Archivo 800 wdth 100, 78px |
| Ajakan | y 1350 | `→ kirim ke yang masih pegang server PHP`, mono 34px |

**Animasi**
| t | Aksi | Easing | Durasi |
|---|---|---|---|
| 0.0 | Headline dua baris | `bar-wipe` | 0.35s |
| 1.2 | Baris A lalu catatan italic | `bar-wipe` | 0.3s |
| 2.2 | Baris B | `bar-wipe` | 0.3s |
| 3.2 | `CUMA MENAHAN.` | `slam` | 0.25s |
| 3.5 | Garis bawah digambar | `draw` | 0.3s |
| 4.6 | Baris A, B, dan stempel turun ke opacity 0.15 | `cut` | 0 |
| 4.8 | CTA dua baris | `bar-wipe` | 0.35s |
| 5.6 | Ajakan (mono) diketik | `type` | 0.6s |
| 7.4 | **Diam** | - | 0.6s |
| 8.2 | Panel ink menutup layar; caret berkedip di posisi persis baris pertama S1 (trik loop) | `glide` | 0.3s |
| 8.5 | `$ composer audit` muncul sebagian (`$ ` saja) lalu video loop | `cut` | 0 |

**Suara:** musik berhenti bersih di t=7.4; hening sampai akhir supaya loop tidak terdengar bergetar.

---

## 6. Audio

| Elemen | Spesifikasi |
|---|---|
| Voice over | Tenang, jelas, ~145 kata/menit. Tanpa intonasi presenter berita yang dramatis. Jeda nyata pada titik-titik kalimat. |
| Musik | 120 BPM, bass rendah berdenyut, tanpa melodi, tegang tapi terkontrol. Resolve hangat satu akor di S6. Level -22 dB di bawah VO. |
| Ducking | Musik turun otomatis di bawah VO (carve di band suara, lewat `/hyperframes-audio`). |
| SFX | Keyboard, impact berat (hanya S1 dan S2), tick, sound dropout 0.2s (S3 langkah 2), klik logam (S3), zap kering (S4), paper tick (S5), akor resolve (S6). Cari/generate lewat `/media-use`. |
| Mode tanpa suara | Teks di layar membawa pesan inti. Tidak ada caption generik tambahan di bawah layar. |

---

## 7. Aturan Teknis HyperFrames

1. **Deterministik.** Tidak ada `Math.random()`, `Date.now()`, `setInterval`, atau animasi CSS berbasis jam dinding. Semua gerak ada di GSAP timeline `paused: true` yang didaftarkan ke `window.__timelines`.
2. **Tidak ada `repeat: -1`.** Kedip caret dibuat berulang dalam jumlah terbatas.
3. **Efek ketik:** pecah teks jadi `<span>` per karakter lalu stagger `visibility`. Hindari library ketik berbasis waktu nyata.
4. **`bar-wipe`:** blok pembungkus `overflow: hidden`, elemen blok solid dianimasikan `scaleX` dengan `transform-origin` yang berubah (kiri → kanan). Teks di baliknya di-set `opacity: 1` tepat saat blok menutup penuh.
5. **Font self-host.** Taruh woff2 di folder project dan panggil lewat `@font-face`. Pastikan font termuat sebelum render (cek lewat snapshot). Untuk Archivo, gunakan varian variable dengan axis `wdth` dan `wght`.
6. **Grain** dari SVG statis (`feTurbulence`, `seed` tetap), tidak dianimasikan.
7. **Aset** (VO, musik, SFX) dihasilkan dan dibekukan lewat `/media-use` sehingga file lokal tetap sama di tiap render.
8. **Alur kerja:** tulis HTML → `npx hyperframes lint` → `snapshot` frame kunci → `preview` → `render`.

### Batas konten (WAJIB, berlaku untuk agent)
Video ini bertujuan **edukasi dan kewaspadaan bagi admin dan developer**. Agent **tidak boleh** menambahkan hal berikut ke layar, narasi, kode, atau aset:
- Payload, contoh request, nama parameter pemicu, atau langkah eksploitasi.
- Tautan atau potongan kode proof-of-concept.
- Detail struktur internal PHP (nama fungsi internal, offset, layout memori nyata).
- Daftar IP atau user-agent penyerang.

Diagram memori di S3 bersifat **konseptual** (analogi). Jangan membuatnya lebih teknis dari yang tertulis di brief ini. Jangan memakai `memory_limit = -1` atau pengaturan PHP lain sebagai saran di video (berisiko menimbulkan masalah lain).

### Checklist QA sebelum render final
- [ ] Tidak ada teks di luar safe zone (x 72→952, y 240→1460).
- [ ] Tidak ada baris teks yang lebih lebar dari 880px.
- [ ] Teks terkecil ≥ 32px.
- [ ] Tiap scene punya layout berbeda dari scene sebelumnya.
- [ ] Tidak ada scene yang memakai fade+translate generik untuk semua elemen.
- [ ] Tidak lebih dari 2 jenis easing per scene.
- [ ] Kuning = PHP/peringatan, merah = serangan, mint = patch. Tanpa pengecualian.
- [ ] Semua nomor versi, CVE, dan tanggal di layar **identik** dengan tabel fakta (bagian 8).
- [ ] Kata "berpotensi / bisa / tercatat" dipakai pada klaim yang masih diperdebatkan. Tidak ada "pasti".
- [ ] Frame t=0 menarik sebagai cover.
- [ ] Akhir S7 (t=8.5) cocok disambung ke S1 (t=0.2) saat loop.
- [ ] Tidak ada konten yang melanggar bagian "Batas konten".

---

## 8. Fakta, Sumber, dan Yang Perlu Dicek Ulang

### Tabel fakta (status 24 Okt 2026)
| Klaim di video | Sumber |
|---|---|
| Dua CVE: CVE-2026-109618 (RCE lewat korupsi akibat OOM) dan CVE-2026-109619 (RCE lewat state global basi) | Help Net Security; Sansec |
| CVSS v4.0 = 9.2 untuk keduanya | Qualys; Sansec; Wikipedia |
| Vektor CVSS 4.0 memuat `AC:H` dan `AT:P` (kompleksitas serangan tinggi, ada syarat tertentu). Ini selaras dengan catatan "butuh kondisi khusus" | Wikipedia (vektor) |
| Terdampak: PHP 5.4 sampai 8.5. Kode rentan sejak PHP 5.4.0 (rilis 2012) | Wikipedia; Sansec |
| Versi diperbaiki: **8.5.12, 8.4.27, 8.3.36, 8.2.35** | Help Net Security; Sansec |
| PHP 8.1 dan lebih lama (EOL): tidak ada rilis resmi; ada backport source untuk 7.4/8.0/8.1 dari tim keamanan PHP, serta paket dari distro/vendor | Sansec; Help Net Security |
| Paket distro yang sudah di-patch **mempertahankan nomor versi** (mis. 8.1.34) dan hanya berganti rilis paket. Cara cek: cari CVE di changelog paket | Sansec |
| Celah ada di mesin PHP; kode aplikasi bersih tetap terdampak; terjadi saat PHP memproses request, sebelum ekstensi diinisialisasi dan kode aplikasi dikompilasi | CrowdStrike; Sansec |
| SAPI terdampak: PHP-FPM, Apache mod_php, php-cgi, FrankenPHP, LiteSpeed; mod_php paling berisiko | Help Net Security |
| Peneliti Calif melaporkan jalur eksekusi kode (tanpa login) pada WordPress, Drupal, Laravel, Magento, dan lainnya | Sansec (mengutip Calif) |
| Ditemukan Ryan Austin (Calif) dan Wiz Research; OpenAI juga terkait. Calif menemukan 1 Agu 2026 | Sansec; Wikipedia |
| Percobaan eksploitasi pertama: 17 Okt 2026 (Amazon MadPot), empat hari sebelum patch | Amazon Threat Intelligence |
| Patch dirilis 21 Okt 2026, 14:00 UTC | Sansec |
| Cloudflare: ribuan percobaan dalam 10 jam sebelum pengumuman, lalu puluhan ribu, ratusan ribu, kini jutaan (menurut CEO Cloudflare) | The Register |
| Belum jelas berapa percobaan yang berhasil (Amazon). PoC publik umumnya tidak jalan di instalasi PHP default dan butuh kondisi khusus (Sansec) | Tenable (mengutip Amazon); Sansec |
| Mitigasi sementara dari Sansec: blokir `multipart/form-data` di web server (merusak upload). Cloudflare memasang rule WAF untuk vektor yang diketahui, termasuk di plan gratis | Sansec; Help Net Security |

### Sumber (baca sebelum memperbarui brief)
- Sansec: https://sansec.io/research/php2shell
- Help Net Security: https://www.helpnetsecurity.com/2026/10/21/php2shell-php-vulnerabilities-patched-cve-2026-109618-cve-2026-109619/
- CrowdStrike: https://www.crowdstrike.com/en-us/blog/crowdstrike-protects-customers-from-php-rce-zero-days/
- Qualys: https://blog.qualys.com/vulnerabilities-threat-research/2026/10/20/php-announces-critical-security-release-for-two-vulnerabilities
- Amazon Threat Intelligence: https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/
- The Register: https://www.theregister.com/cyber-crime/2026/10/22/hackers-pile-on-php2shell-as-aws-reveals-attacks-began-before-disclosure/5304749
- Wikipedia: https://en.wikipedia.org/wiki/PHP2Shell
- watchTowr: https://watchtowr.com/intelligence/php-cve-2026-109618-faq/
- Tenable: https://www.tenable.com/blog/php2shell-cve-2026-109618-cve-2026-109619-frequently-asked-questions-about-critical-php-remote

### Perbedaan antar sumber (sudah dipertimbangkan di brief)
Sumber tidak sepakat soal **seberapa mudah** serangannya. CrowdStrike memverifikasi bahwa satu request tanpa autentikasi bisa memicu eksekusi perintah di Apache mod_php. Sansec menemukan PoC publik tidak jalan di instalasi default dan sering butuh kondisi tambahan. Karena itu video memakai "berpotensi" dan "bisa", dan S5 menyampaikan kedua sisi: banyak percobaan, belum jelas berapa yang berhasil.

### Cek ulang sebelum posting (bisa berubah dalam hitungan jam)
- [ ] Apakah CVE ini sudah masuk **CISA KEV**? (per 22 Okt belum.) Kalau sudah, tambahkan di S5.
- [ ] Apakah ada angka percobaan atau eksploitasi yang berhasil yang lebih baru dari "jutaan percobaan"?
- [ ] Apakah ada nomor versi patch baru, atau perubahan di tabel versi?
- [ ] Apakah saran mitigasi (blokir multipart, WAF) masih sama?
- [ ] Apakah vendor appliance (mis. Palo Alto PAN-OS dikonfirmasi terdampak, belum ada rilis perbaikan per 22 Okt) sudah mengeluarkan patch? Tidak dimasukkan ke video, tetapi bisa jadi bahan caption atau video lanjutan.
- [ ] Catatan: NCSC Inggris menyarankan mempertimbangkan mematikan sistem yang tidak bisa segera di-patch. Sansec menyatakan toko tidak perlu offline. Video tidak mengambil sikap ini, jadi jangan menambahkan klaim "matikan server".

### Bahan cadangan (tidak dipakai di 60 detik)
Wiz menyebut model AI frontier menurunkan hambatan dari "celah lama" menjadi "exploit yang bisa dipakai". Ini cocok untuk video lanjutan atau caption, dengan atribusi ke Wiz.

---

## 9. Prompt Siap Pakai untuk Agent

```text
Using /hyperframes (faceless-explainer workflow), build the video described in BRIEF.md.

Rules:
- Follow BRIEF.md exactly: scene timing, layout coordinates, copy, colors, fonts, motion names, and animation timelines. Do NOT improvise design.
- Canvas 1080x1920, 30fps, 60s total. Use the Design Tokens block as DESIGN.md.
- Self-host fonts (Archivo variable with wdth+wght, Newsreader italic, IBM Plex Mono).
- Deterministic only: paused GSAP timelines, no random/Date.now/infinite repeats.
- Implement "bar-wipe" as a solid block that scales in from the left and out to the right; the text beneath becomes visible when the block fully covers it.
- Generate VO (calm Indonesian), music, and SFX via /media-use.
- STRICT: obey the "Batas konten" section. Do not add payloads, request examples, PoC code/links, internal PHP structures, or attacker IPs. The memory diagram in S3 stays conceptual.
- Every number, version, CVE ID, and date on screen must match section 8 exactly.
- Run lint, then snapshot key frames at: 0.3, 2.3, 4.2, 6, 9.5, 12, 15, 18, 20.8, 23, 26, 29.5, 31, 34, 37, 38.8, 41, 45, 49, 52, 55, 58, 59.7 seconds. Check against the QA checklist in BRIEF.md and fix before rendering.
- Render to MP4 only after the checklist passes.
```

---

## 10. Caption Postingan (saran)

> Kode aplikasimu bersih, tapi PHP-nya belum di-patch? PHP2Shell (CVE-2026-109618 & CVE-2026-109619) berpotensi kena PHP 5.4-8.5. Update ke 8.5.12 / 8.4.27 / 8.3.36 / 8.2.35, atau paket distro yang sudah di-backport. Cek CVE di changelog paket, bukan cuma `php -v`. Status per 24 Okt 2026. #php #security #devops #laravel #wordpress #cve

---

## 11. Catatan Variasi dari Brief Sebelumnya

Supaya video-video di akun yang sama tidak terasa seperti satu template yang diganti topiknya, brief ini sengaja berbeda dari brief Cloudflare Tunnel vs Nginx:

| Aspek | Brief Cloudflare vs Nginx | Brief PHP2Shell |
|---|---|---|
| Palet | Ink + paper + oranye + hijau | Ink + bone + kuning peringatan + merah + mint |
| Display font | Bricolage Grotesque (condensed) | Archivo (expanded) |
| Aksen | Instrument Serif | Newsreader |
| Mono | JetBrains Mono | IBM Plex Mono |
| Teks masuk | Mask reveal dari baseline | Bar-wipe |
| Metafora | Resepsionis dan telepon keluar | Kunci kamar hotel |
| Tone | Edukasi perbandingan, santai | Berita keamanan, tenang dan hati-hati |
