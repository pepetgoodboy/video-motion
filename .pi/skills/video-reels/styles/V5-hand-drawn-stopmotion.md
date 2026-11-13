# V5 — Hand-drawn / stop-motion feel

Tangan yang menggambar. Garis punya tekanan, anotasi muncul di samping objek, dan semuanya
terasa digambar ulang per frame (walaupun sebenarnya digambar sekali lalu digoyang).

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Garis menggambar diri** (`stroke-dashoffset` dari panjang penuh ke 0) adalah gerak utama. Elemen yang sudah ada digoyang ±1–2px pada 8–12 fps rasa. |
| Fps rasa | 8–12 fps rasa untuk goyangan; garis sendiri digambar mulus (`power2.inOut`) supaya terbaca. |
| Tekstur | Kertas berbutir halus, tinta tidak rata (dua stroke bertumpuk dengan opasitas 0.7 dan offset 1px). **Tanpa vignette film.** |
| Kedalaman | 2–3 lapis. Kedalaman datang dari **urutan gambar** (yang digambar terakhir, ada di depan). |
| Kamera | `C4 rack focus` untuk memindahkan perhatian antar anotasi; `C6` untuk menggeser kertas. Tidak ada push-in dramatis. |
| Tipografi | Tulisan tangan untuk anotasi (font script), mono untuk label. **Tidak ada huruf raksasa** — V5 bersuara pelan. |
| Transisi | Kertas digeser, atau halaman dibalik. Bukan cut keras. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V5 |
|---|---|
| #2 teknik teks | ≥ 3 cukup (bukan 4). Anotasi garis dihitung sebagai teknik. |
| #6 kontras skala | ≥ 4:1 cukup (bukan 6:1) — V5 tidak boleh punya huruf raksasa. |
| #4 gerak kamera | ≥ 70% scene (bukan 100%). |
| Ambigu | Setiap goyangan wajib dari **tabel offset tetap**, bukan `Math.random`. |

## Resep HyperFrames

- `svg-path-draw` untuk semua garis dan panah.
- `css-marker-patterns` untuk anotasi bulat, garis bawah, dan centang.
- `nudge-curve` untuk goyangan kecil yang masih terasa alami.
- `coordinate-target-zoom` kalau harus masuk ke satu detail tanpa memindahkan kamera.
- SVG: `stroke-linecap: round`, `stroke-linejoin: round`, lebar 3–5px, `vector-effect: non-scaling-stroke`.

## Batas render

Path SVG kompleks = banyak titik. Batasi tiap path ≤ 200 titik; sederhanakan (kurangi bezier)
sebelum dipakai. Jangan animasikan `stroke-dashoffset` pada > 25 path serentak.

## Dilarang

- Huruf display raksasa (itu V1/V9/V11).
- Goyangan dari `Math.random` — harus tabel.
- Garis yang sempurna geometris.
- Menambah grain film — V5 memakai butir kertas, bukan noise film (itu V4).