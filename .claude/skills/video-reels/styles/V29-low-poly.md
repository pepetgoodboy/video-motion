# V29 — Low-poly / faset

Dunia dari **segitiga datar**: gunung, pohon, hewan, objek teknologi tersusun dari faset dengan
shading tetap per sisi. Terlihat 3D tanpa mesin 3D. Untuk sains, alam, konsep yang butuh
"objek" kokoh, transformasi bentuk (faset tersusun ulang dari A ke B).

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Faset merakit & bertransformasi**: segitiga terbang dari sebaran ber-seed ke posisi (`power3.out`, stagger dari jarak ke pusat), lalu seluruh bentuk morph ke bentuk lain dengan jumlah segitiga sama (`attr:{points}`). |
| Fps rasa | Mulus. |
| Tekstur | Nol. Tekstur = shading faset (3–5 tingkat terang dari satu warna dasar, arah cahaya tetap kiri-atas). |
| Kedalaman | 3 lapis: langit gradient faset besar · objek utama · faset kecil melayang (≤ 40) di depan. |
| Kamera | `C1`, `C2`, `C5` tilt ringan ≤ 6° (faset tetap terbaca). |
| Tipografi | T5 Unbounded untuk judul (geometris, cocok dengan faset), T12 untuk teks. |
| Transisi | Objek pecah jadi faset → faset menyusun objek scene berikutnya (`X2`). |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V29 |
|---|---|
| #5 lapisan | 3 lapis cukup. |
| Cahaya | Arah cahaya sama di semua scene (konsistensi material). |
| Determinisme | Triangulasi & sebaran dihitung saat build dari PRNG ber-seed. |

## Resep HyperFrames

- Bentuk: titik kontrol ditulis tangan per objek (20–80 segitiga) → `<polygon>`; warna faset =
  warna dasar × faktor terang dari normal sisi (dihitung saat build).
- Catalog: `facet-morph` (36 segitiga morph antar 3 siluet — titik awal yang bagus),
  `particle-text-dissolve` (judul dari faset/partikel).
- Rules: `depth-scatter-assemble`, `center-outward-expansion`, `card-morph-anchor`.

## Batas render

≤ 300 polygon beranimasi per scene (di bawah batas 400 elemen). Morph hanya antar bentuk
dengan jumlah segitiga sama.

## Dilarang

- Gradient di dalam faset (merusak kesan low-poly).
- Outline pada faset.
- Rotasi 3D bebas (`rotateY` > 6°) — ilusi pecah.
