# V7 — Stylised 3D

Objek bulat, mengilap, seperti mainan atau tanah liat. **Ini tipe paling mahal dan paling
mudah gagal** kalau dipaksa dengan CSS murah.

## Aturan gerbang (wajib dibaca dulu)

| Situasi | Keputusan |
|---|---|
| Satu objek hero, ≤ 6 detik, sisanya 2D | **Boleh**, 3D semu CSS (lihat resep). |
| Sepanjang video, banyak objek | **Jangan.** Turunkan ke V9 atau V6, dan catat alasan di `STYLE.md`. |
| Butuh bayangan asli, pantulan, refraksi | **Jangan** diklaim 3D. Itu V8 (tiruan) atau ganti tipe. |
| Ada GPU dan berani render lama | Three.js ≤ 6 detik total (bagian 11), bukan lebih. |

Kalau keputusan = "jangan", brief wajib diperbaiki, bukan card ini yang dilanggar.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | Rotasi lambat + overshoot saat berhenti. Easing `power2.inOut` untuk rotasi, `back.out(1.6)` untuk masuk. |
| Fps rasa | Mulus total. Tidak ada `steps()`. |
| Tekstur | **Tidak ada grain.** Highlight dan core shadow melakukan semua pekerjaan material. |
| Kedalaman | Perspektif nyata: `perspective: 1400–1800px` di stage, `preserve-3d` pada `.world`. |
| Kamera | `C5 tilt 3D` (rotateX ≤ 10°) + `C1` perlahan. Kamera ikut perspektif objek. |
| Tipografi | 2D, di luar stage 3D. Jangan memutar huruf di ruang 3D (kecuali satu kata, maksimal). |
| Transisi | Objek berputar keluar frame; atau `scale-fill` oleh objek. |

## Resep HyperFrames

- `orbit-3d-entry` untuk objek masuk sambil berputar ke posisi akhir.
- `3d-camera-flight` bila butuh kamera benar-benar terbang (paling mahal; ≤ 6 detik).
- `3d-text-depth-layers` untuk teks berlapis, kalau perlu.
- **3D semu CSS**: 6–10 lapisan div berbentuk sama, masing-masing `translateZ(i * 6px)`
  dan warna sedikit lebih gelap — menghasilkan siluet berketebalan. Murah dan deterministik.

## Batas render

Three.js ≤ 6 detik × 120fps. Blok catalog 3D tercatat ±108ms/frame di CPU (bagian 11);
6 detik = ±78 detik render tambahan. **Ukur sekali** sebelum komit ke seluruh video.

## Dilarang

- Mengklaim "3D" padahal cuma gradient radial (itu V6).
- `backdrop-filter` untuk kesan kaca (itu V8, dan tetap dilarang).
- Rotasi lebih dari 180° per objek per second (patah di 120fps).
- Huruf di dalam ruang 3D lebih dari satu kata.