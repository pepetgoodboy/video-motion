# V2 — Cutout craft (paper-cut)

Dunia terbuat dari **kertas bergunting**. Setiap elemen punya tepi, dan setiap tepi punya
bayangan. Gerak terasa dirakit tangan, bukan dijalankan mesin.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Patah ala stop-motion.** Tween utama pakai `ease: "steps(n)"` dengan **interval ≥ 0.034s** (lihat README — jangan lebih rapat, blend 120→60 akan menghapusnya). Easing halus hanya untuk kamera. |
| Fps rasa | 12–20 fps rasa. Contoh: `duration 0.42` + `steps(12)` = 0.035s/step. |
| Tekstur | Kertas: noise statis halus + **serat** (garis 1px acak-tetap, bukan `Math.random`). Warna kertas sedikit berbeda per lapisan. |
| Kedalaman | **≥ 4 lapis**, tiap lapis punya bayangan offset sendiri (`box-shadow: 2px 3px 0 rgba(0,0,0,.18)`) yang **statis** — bayangan bergerak hanya saat elemennya diangkat/dipindah. |
| Kamera | `C6 parallax shift` dan `C1 push-in` lambat. Kamera halus, elemen yang patah — kontras ini yang menjual "kertas". |
| Tipografi | Huruf diperlakukan sebagai **objek kertas**: punya tepi, bayangan, boleh dirotasi −4°..+4°, boleh ditumpuk. Bukan teks kinetik. |
| Transisi | Elemen kertas **bertumpuk** menutup layar (slide berlapis), atau potongan masuk dari luar frame dengan sedikit rotasi. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V2 |
|---|---|
| #2 teknik teks | Boleh **rendah** (0–2). Teks bukan kendaraan utama; yang utama gerak objek. |
| #4 gerak kamera | 100% scene, tapi **hanya C1/C6** dengan amplitudo kecil (≤ 6%). |
| #7 ambient | Wajib, tapi ambient-nya = **napas kertas** (satu lapisan bergeser 2–3px dengan `steps()`), bukan drift mulus. |
| #5 lapisan | ≥ 4 lapis di ≥ 80% scene (naik dari 70%). |

## Resep HyperFrames

- `depth-scatter-assemble` untuk masuknya elemen dari luar frame ke posisi akhir, dengan stagger yang dibatasi `items × stagger ≤ 0.5s`.
- `viewport-change` untuk kamera (satu `.world` ditransform, bukan per-elemen).
- `waterfall-entry` untuk barisan elemen turun bertingkat.
- Bentuk: **SVG path dengan tepi kasar** atau PNG bertepi sobek. Buat sekali, pakai berkali-kali dengan skala/rotasi berbeda.
- Bayangan: `box-shadow` statis atau gambar bayangan pra-render. **Bukan** `filter: drop-shadow`.

## Batas render

≤ 400 elemen beranimasi → praktisnya **≤ 60 objek kertas** besar + label. Setiap objek punya
bayangan; bayangan itu lapisan tambahan yang ikut ditransform.

## Dilarang

- `steps()` lebih rapat dari 0.034s — akan rata jadi smear.
- Tepi lurus sempurna (itu V9, bukan V2).
- Bayangan ber-blur (`blur-radius` besar) — bayangan kertas itu keras dan dekat.
- Lebih dari 2 ukuran bayangan dalam satu video (konsistensi material).
