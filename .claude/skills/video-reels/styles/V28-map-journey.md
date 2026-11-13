# V28 — Peta / perjalanan

Cerita sebagai **perjalanan di atas peta**: garis rute tergambar, pin jatuh, kamera terbang dari
satu titik ke titik lain, label tempat bergaya kartografi. Untuk sejarah, kisah perjalanan
(hijrah, ekspedisi), "bagaimana paket data sampai ke server", jalur distribusi.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Rute menggambar diri** (`stroke-dashoffset`, `power1.inOut`, kecepatan konstan seolah perjalanan), protagonis kecil (kapal/kafilah/paket) mengikuti ujung garis dan berputar sesuai arah. Pin jatuh `back.out(2)` + cincin kejut. |
| Fps rasa | Mulus. |
| Tekstur | Kertas peta pra-render (PNG: warna P17 + noise lembut + lipatan statis). Garis pantai tinta tipis, laut berpola garis kontur statis. |
| Kedalaman | 3 lapis: peta · rute & pin · awan/kabut tipis di depan (PNG, parallax 1,4×) saat kamera terbang. |
| Kamera | `C3` pan + `C1`/`C2` zoom antar lokasi (satu `.world` di-transform, `viewport-change`). Zoom maksimum 4× — di atas itu ganti ke **inset** (kotak detail). |
| Tipografi | T11 Cormorant (nama tempat, kapital berjarak) + mono kecil untuk koordinat/tahun. |
| Transisi | Kamera terbang ke lokasi berikutnya; zoom ke pin lalu `X9` pin membesar jadi scene detail. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V28 |
|---|---|
| Akurasi | Posisi relatif tempat benar (utara-selatan, urutan). Peta **konseptual** wajib diberi label "ilustrasi" bila disederhanakan. |
| Protagonis | Penanda perjalanan ada di ≥ 70% scene. |
| Batas wilayah | Hindari menggambar batas negara yang disengketakan; kalau perlu, pakai garis pantai saja. |

## Resep HyperFrames

- Geometri: garis pantai disederhanakan dari data terbuka (Natural Earth, domain publik) →
  path SVG ≤ 400 titik per wilayah, **dibangun sekali** dan disimpan di `assets/`. Atau peta
  ilustrasi digambar sendiri (lebih mudah, cukup untuk kisah).
- Catalog: `world-map` (choropleth + globe inset), `nyc-paris-flight` (pola pesawat + pin +
  label), `us-map-flow` (pola busur asal-tujuan). Semua 1920×1080 → ambil polanya, susun
  ulang portrait.
- Rules: `svg-path-draw`, `coordinate-target-zoom`, `viewport-change`, `multi-phase-camera`.
- Blueprint: `camera-journey`, `spatial-pan-stations`.

## Batas render

≤ 3 wilayah ber-path detail per scene; rute ≤ 6 segmen. Tanpa tile peta online (render
offline + lisensi).

## Dilarang

- Tile Google/Apple/Mapbox (lisensi + network).
- Animasi garis rute dengan `steps()` (terlihat macet).
- Label tempat < 32px.
