# V3 — Mixed media collage

Bukan satu gaya, tapi **tabrakan gaya yang disengaja**: foto + ilustrasi + tekstur + tipografi
dalam satu komposisi, jelas bahwa tiap potongan datang dari tempat berbeda.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | Elemen **ditempel**, bukan muncul. Masuk dengan sedikit rotasi + overshoot kecil (`back.out(1.4)`), lalu mengendap. Beberapa potongan masuk dengan `steps()` untuk rasa gunting. |
| Fps rasa | Campuran. Satu-dua elemen patah, sisanya mulus — ketidaksamaan itu yang terasa kolase. |
| Tekstur | **≥ 3 tekstur berbeda** dalam satu video: fotokopi kasar, halftone, kertas, tinta. Ini satu-satunya tipe V yang wajib multi-tekstur. |
| Kedalaman | 5+ lapisan bertumpuk, tiap potongan rotasi −6°..+6° (dinamis, tapi dari tabel tetap). |
| Kamera | `C6 parallax` (lapisan bergerak beda kecepatan) + `C2 pull-back` di akhir. |
| Tipografi | **Campur bobot dan gaya dalam satu headline** (satu kata sans tebal, satu kata serif italic, satu kata mono). Label bergaya potongan majalah. |
| Transisi | Sobekan kertas / selotip menutup frame; atau `scale-swap` di mana satu potongan menggantikan yang lain. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V3 |
|---|---|
| #5 lapisan | ≥ 5 lapis di ≥ 70% scene. |
| #13 metafora | Wajib ≥ 70% (naik dari 60%) — kolase tanpa konsep jadi sampah acak. |
| #2 teknik teks | ≥ 5, dan harus **beda-beda gaya**, bukan satu teknik diulang. |
| Kontras | Setiap teks di atas foto wajib punya plat warna padat di belakangnya. |

## Resep HyperFrames

- `depth-scatter-assemble` untuk penempelan bertahap; stagger ketat.
- `split-tilt-cards` untuk dua potongan yang datang dari sisi berlawanan.
- `scale-swap-transition` untuk pergantian potongan di satu tempat.
- Aset: **wajib milik sendiri atau berlisensi.** Screenshot produk sendiri, tekstur hasil
  scan/foto sendiri, atau ilustrasi buatan sendiri. Catat sumber tiap aset di `STYLE.md`.
- Tekstur halftone/riso: SVG pattern statis, di-`background-position`-geser seperti grain.

## Batas render

Paling berat dari semua tipe V karena tiap lapisan punya tekstur + rotasi + bayangan.
Praktisnya **≤ 40 potongan** per scene, dan latar bertekstur harus **satu gambar**, bukan
tumpukan div.

## Dilarang

- Potongan yang semuanya lurus/rapi (itu bukan kolase).
- Memakai logo/aset merek pihak ketiga sebagai hiasan.
- Lebih dari 3 ukuran rotasi berbeda.
- Tekstur hasil generate AI yang jelas-jelas tidak konsisten antar potongan.
