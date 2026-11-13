# V18 — Isometric

Objek pseudo-3D bersudut 30°, blok dan balok, dilihat dari satu sudut tetap. Ini bahasa
material **arsitektur/diagram**, bukan 3D mainan (itu V7).

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Blok bergeser dan terangkat.** Tiap blok masuk dengan stagger, naik `translateY` di ruang isometrik, mendarat dengan overshoot kecil. `power3.out` + `back.out(1.3)`. |
| Fps rasa | Tegas, bukan kenyal. Blok adalah benda berat. |
| Tekstur | Flat shading: 3 poligon per blok (atas terang, kiri sedang, kanan gelap). Nol gradient, nol grain. |
| Kedalaman | Nyata lewat sumbu isometrik + 2 lapis parallax (blok depan lebih cepat). |
| Kamera | `C3 pan` menyusuri grid, atau `C2 pull-back` mengungkap keseluruhan. |
| Tipografi | Label monospace kecil di titik-titik. Judul besar di luar grid. |
| Transisi | Kamera menembus satu blok (`X8 zoom-through`), atau blok memanjang jadi dinding scene berikutnya (`X2`). |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V18 |
|---|---|
| #5 lapisan | 3 lapis: grid lantai, blok, label. Parallax antar lapis. |
| #7 ambient | Grid lantai bergeser halus memenuhi ambient. |
| #2 teknik teks | 3–4, mayoritas label (`M3 cut+type`, `M4 stamp`). |
| Kamera | Wajib `C3` atau `C2` — bukan push-in biasa. |

## Resep HyperFrames

Biaya: SVG atau transform CSS biasa, setara baseline. Tidak ada filter mahal.

**Blok isometrik:** 3 poligon per blok.

```css
/* ruang isometrik: sumbu 30°, tanpa rotasi 3D bebas */
#world { transform: rotateX(60deg) rotateZ(-45deg) scale(1.2); transform-style: preserve-3d; }
```

Atau lebih aman dan deterministik: **SVG statis** dengan koordinat isometrik yang sudah
dihitung, lalu setiap sisi diberi `transform: translate()` saat dianimasikan. SVG menghindari
masalah `preserve-3d` yang tidak seragam antar renderer.

- Sumbu isometrik: `dx = (x - y) * cos(30°)`, `dy = (x + y) * sin(30°) - z`.
- 3 poligon: atas (terang), kiri (sedang), kanan (gelap). Nilai tetap per palet.
- Elevasi (`z`) dianimasikan lewat `translateY` **saja** — jangan mengubah koordinat poligon.

## Batas render

- ≤ 60 blok per scene. Di atas itu, satu kanvas SVG dengan path gabungan lebih murah.
- Jangan rotasi 3D bebas (`rotateY` pada grup besar) — itu jalur V7 dan mahal.

## Dilarang

- Rotasi bebas di ruang 3D (rusak di sebagian renderer, dan salah tipe).
- Gradient pada sisi blok — isometrik hidup dari flat shading 3 nada.
- Bayangan beranimasi (`filter: drop-shadow`) di banyak blok.
- Mengklaim isometrik padahal cuma miring 45°.
