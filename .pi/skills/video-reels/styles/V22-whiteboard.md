# V22 — Whiteboard / papan kapur

Papan putih (atau papan kapur hijau) tempat **pena menggambar penjelasan langkah demi langkah**.
Penonton melihat gambar *terbentuk*, bukan muncul. Bedanya dengan V5: V5 = coretan bergoyang di
kertas (boil, anotasi di samping objek); V22 = **satu papan bersih yang terisi gambar besar**,
pena/kapur terlihat, gambar sebelumnya tetap ada sampai papan dihapus.

Varian: **chalkboard** (palet P12, garis kapur kasar), **line art bersih** (tanpa pena, garis
tunggal tipis — untuk topik kalem).

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Garis menggambar diri** (`stroke-dashoffset`, `power1.inOut`) dengan **ujung pena mengikuti** titik ujung garis. Isian warna (marker blok) masuk *setelah* garis selesai, sapuan diagonal `steps(6–8)` ≥ 0,04 s. |
| Fps rasa | Garis mulus; pena boleh "lompat" antar goresan (angkat pena = cut 1 frame). |
| Tekstur | Papan: putih hangat + bayangan sudut statis; kapur: noise statis PNG (opacity ≤ 0,08). Bekas hapusan samar dari gambar sebelumnya (opacity 0,06) — ini yang membuat papan terasa nyata. |
| Kedalaman | 2 lapis: papan + gambar. Kedalaman lewat **ukuran** dan urutan gambar, bukan parallax. |
| Kamera | `C1` push-in pelan ke bagian yang sedang digambar, `C3` pan ke area kosong papan berikutnya. **Papan memanjang ke bawah** (2–3× tinggi layar) dan kamera turun — ini yang mengganti scene, bukan cut. |
| Tipografi | Tulisan tangan (T8 Caveat) untuk label; ditulis **per huruf** dengan `hw-write-title`. Judul besar boleh huruf blok spidol. |
| Transisi | Penghapus menyapu (`hw-scribble-transition` di-retint jadi sapuan penghapus), atau kamera pan ke papan kosong. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V22 |
|---|---|
| #5 lapisan | 2 lapis sah. |
| #6 kontras skala | ≥ 4:1 cukup; gambar besar vs label tulisan tangan. |
| Occupancy (`qa-variety --min-occ 0.12`) | Garis tipis = occupancy rendah. Wajib: tiap scene punya ≥ 1 gambar dengan **isian warna** ≥ 25% area aman. |
| Gambar | Gambar **besar** (≥ 60% lebar area aman). Ikon kecil berderet = K0, dilarang. |

## Resep HyperFrames

- Catalog: `whiteboard-ink` (pena mengikuti goresan), `hw-write-title`, `hw-arrow`,
  `hw-box-label`, `hw-callout-circle`, `hw-underline`, `hw-pipeline`, `hw-text-cloud`,
  `hw-scribble-transition`, `marker-highlight`, `vox-annotate`. Blok `hw-*` 1920×1080 →
  ambil logika goresannya, susun ulang ke 1080×1920.
- Rules: `svg-path-draw`, `css-marker-patterns`, `viewport-change` (kamera di papan panjang).
- Pena: SVG/PNG ujung spidol 120–160px, posisi = titik `getPointAtLength` dari path aktif,
  dihitung di `onUpdate` dari progres tween (deterministik).
- Papan panjang: satu `.board` 1080×4800, kamera `#cam` translateY bertahap per beat.

## Teruji di render (#15 `cek-dan-kelola-proses-di-linux`, varian chalkboard P12)

Resep berikut jalan di render pertama (contoh lengkap: `videos/cek-dan-kelola-proses-di-linux/build.mjs`):

- **Kapur mengikuti ujung garis:** semua path ditulis dalam **koordinat absolut** (transform grup
  diterapkan saat build, bukan `transform=` di SVG) supaya `getPointAtLength` tidak perlu `getCTM`.
  Sampel 50/detik pada progres yang sudah di-ease (`gsap.parseEase(e)(u) * L`), tiap sampel satu
  `tl.to(CH,{x,y,ease:'none'})`. Kapur di SVG overlay 1:1 di dalam pembungkus kamera.
- **Angkat kapur** antar goresan dijadwalkan setelah goresan sebelumnya selesai (variabel `chF`);
  kalau tumpang-tindih, `check` memberi `gsap_tween_tail` dan kapur meloncat balik.
- **Tulisan tangan:** Caveat per huruf (`<i>` opacity 0 → 1), posisi kapur dari metrik font
  (`fontTools` → `caveat-metrics.json`), bukan pengukuran DOM saat init (font belum tentu termuat).
  Tambah `data-layout-allow-overlap` — huruf Caveat yang bersebelahan memang bertumpuk.
- **Isian** = arsiran silang (zigzag polyline ≤ 100 titik) di dalam `clipPath`, digambar draw-on +
  kapur ikut. Panel besar = `repeating-linear-gradient(-55deg)` masuk `steps(7)`.
- **Occupancy:** panel arsir 0,08 terlalu tipis (scene FAIL 0,09); 0,13–0,17 cukup tanpa mengganggu.
- **Biaya terukur:** 97,5 s, 120 fps → render 33 m 44 s (software GPU), raw 170 MB, final 38 MB
  (garis kapur + arsiran lebih mahal di bitrate daripada V23 bidang datar: 23 MB untuk 102 s).

## Batas render

≤ 25 path digambar serentak; tiap path ≤ 200 titik. Pena = 1 elemen. Hapusan lama = 1 PNG
statis per papan, bukan path redup.

## Dilarang

- Tangan foto/realistis (aset berlisensi, uncanny). Cukup ujung pena.
- Gambar muncul fade-in — di papan, semuanya **digambar**.
- Lebih dari 1 warna marker isian per objek.
- Teks diketik mesin (font sans) sebagai teks utama — itu V10.
