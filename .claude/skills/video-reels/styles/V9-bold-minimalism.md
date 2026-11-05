# V9 — Bold minimalism

Satu layar, satu ide. Tidak ada hiasan, tidak ada tekstur, tidak ada ambient. Yang tersisa cuma
**komposisi dan cut**. Ini tipe yang paling disepelekan dan paling sering dirusak oleh "tambah
sedikit biar tidak kosong".

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Snap dan cut.** Masuk `expo.out` (0.2–0.35s), keluar keras. Tidak ada overshoot kecuali satu kali di seluruh video. |
| Fps rasa | Keras. Kalau butuh benar-benar tanpa blur, render 60fps langsung dan catat di `STYLE.md`. |
| Tekstur | **Nol.** Tidak ada grain, tidak ada vignette, tidak ada noise. Warna datar sempurna. |
| Kedalaman | **1–2 lapis.** Tidak ada parallax. |
| Kamera | **Mati.** Kalau ada gerak kamera, itu bukan V9. |
| Tipografi | Raksasa (sering > 300px), 1–5 kata, kontras ukuran ≥ 10:1, penempatan tegas (rata kiri keras atau tengah mati). |
| Transisi | **Hard cut** antar layar. Maksimal satu transisi lain di seluruh video. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V9 |
|---|---|
| #4 gerak kamera | **0% — LULUS.** |
| #7 gerak ambient | **Tidak wajib — LULUS** bila tidak ada layar diam > 0.5s. |
| #5 lapisan | **1–2 lapis — LULUS.** |
| #2 teknik teks | ≥ 4, tapi semuanya harus **berbasis posisi/potong**, bukan efek (tanpa glow, blur, shimmer). |
| #1 celah kejadian | ≤ 1.5s tetap berlaku — digerakkan oleh pergantian layar, bukan ambient. |

## Resep HyperFrames

- `scale-swap-transition` untuk pergantian layar di tempat yang sama.
- `spring-pop-entrance` **sekali saja** sebagai satu-satunya "kelembutan".
- `kinetic-beat-slam` untuk frasa berturut-turut, tapi tanpa chrome/metronom.
- Struktur: satu `<div>` per layar, `data-start`/`data-duration` di layar, bukan di elemen
  individual. Lebih sedikit elemen = lebih sedikit ruang untuk salah.

## Batas render

Paling murah dari semua V. Justru paling sulit secara desain: tidak ada tempat bersembunyi.

## Dilarang

- Grain, vignette, texture, glow, shimmer — semua itu merusak premis.
- Kamera drift "supaya tidak statis".
- Lebih dari 3 warna di seluruh video.
- Animasi masuk yang tidak selesai dalam 0.35s.
- Menambah elemen karena layar "terlalu kosong" — kekosongan itu isinya.