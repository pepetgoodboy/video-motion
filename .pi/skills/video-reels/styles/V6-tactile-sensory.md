# V6 — Tactile / sensory

Benda terasa bisa disentuh: lembut, kenyal, licin. Gerak punya massa dan memantul kembali.
Yang dijual adalah **sensasi permukaan**, bukan informasi.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Squash & stretch** + overshoot. `back.out(2.2)` untuk popul, `elastic` **sangat hemat** (maks 2× per video, bagian 5.6). |
| Fps rasa | Mulus; kekayaan datang dari deformasi, bukan dari jumlah kejadian. |
| Tekstur | Permukaan dijelaskan dengan **highlight statis + core shadow** (dua gradient radial). Tidak ada noise. Tidak ada grain. |
| Kedalaman | 3–4 lapis dengan **bayangan kontak** (bukan bayangan kertas V2 — ini bayangan lembut, `blur` kecil dan statis). |
| Kamera | `C1` sangat dekat (mulai 1.15–1.3), lalu `C2` pull-back di akhir untuk memperlihatkan skala. |
| Tipografi | Bulat dan tebal; huruf ikut memantul dengan benda. Tidak ada huruf raksasa di latar. |
| Transisi | Benda menutup frame (menekan layar), bukan wipe. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V6 |
|---|---|
| #7 ambient | Ambient = **napas benda** (scale ±1.5%, 3–4s), bukan grain. |
| #2 teknik teks | ≥ 3 cukup. |
| Kontras | Highlight tidak boleh menghapus tepi benda — uji siluet di latar terang dan gelap. |
| Blur | ≤ 2 elemen ber-`filter: blur` bersamaan (bagian 11). |

## Resep HyperFrames

- `spring-pop-entrance` untuk kemunculan benda.
- `press-release-spring` dan `physics-press-reaction` untuk deformasi saat ditekan/bertabrakan.
- `ambient-glow-bloom` **hanya** untuk highlight, dengan opasitas rendah.
- Bentuk: satu `border-radius` ekstrem + gradient radial (bukan ilustrasi detail). Lebih sedikit
  detail = lebih terasa "bahan", bukan "gambar".

## Batas render

Murah kalau memakai gradient CSS. Mahal kalau memaksa bayangan lembut pada banyak elemen
— pilih maksimal **3 objek hero** per scene.

## Dilarang

- `feTurbulence`/grain (V6 bukan V4).
- `elastic` di lebih dari 2 tempat.
- Ilustrasi detail bergaris — itu V5.
- Bayangan ber-blur pada > 3 elemen bersamaan.