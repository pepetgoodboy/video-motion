# V13 — Particles

Titik-titik kecil yang berkumpul membentuk sesuatu, lalu larut. Materi video ini adalah
**butir**, bukan bentuk. Kalau bentuknya solid dan partikelnya cuma hiasan, ini bukan V13.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Konvergensi**: partikel bergerak dari sebaran acak (ber-seed) ke target, atau sebaliknya. Easing `power2.out` untuk berkumpul, `power2.in` untuk larut. Jangan `steps()` — partikel + stepped = berkedip. |
| Fps rasa | Mulus. Partikel yang patah-patah terbaca sebagai bug render. |
| Tekstur | Nol grain tambahan. Partikelnya sendiri adalah tekstur. Latar seringkali hitam/gelap supaya butir terbaca. |
| Kedalaman | 2–3 lapis: partikel besar-tajam (depan), sedang, kecil-buram (belakang). Bukan parallax CSS — beda ukuran + opasitas. |
| Kamera | `C1` push-in atau `C2` pull-back. **Jangan** `C7` guncang: guncang + 2.000 partikel = noise visual. |
| Tipografi | Sedikit. Teks muncul **setelah** partikel membentuk, bukan bersamaan. |
| Transisi | Partikel mengembang memenuhi frame (`X9 scale-fill`), atau larut jadi butir scene berikutnya (`X2`). |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V13 |
|---|---|
| #5 lapisan | 2–3 lapis sah. Kedalaman dari ukuran, bukan parallax. |
| #7 ambient | Partikel **harus** bergerak terus walau fase utama selesai — ambient jadi otomatis LULUS. |
| Jumlah partikel | **Canvas: sampai ±5.000** (terukur). **DOM: ≤ 120** (batas A2). |
| Determinisme | Posisi awal & target dari PRNG ber-seed, dihitung **sebelum** timeline dibuat. |

## Resep HyperFrames

Biaya terukur: canvas 2.600 partikel digambar ulang tiap frame berada **di sekitar baseline**
(61–77 ms vs 59–98 ms untuk komposisi DOM beranimasi biasa). Murah. DOM 120 partikel ≈ baseline.

**Canvas (disarankan untuk > 120 partikel):**

```js
// posisi awal & target dihitung sekali, di luar timeline
const pts = seededPositions(N, seed);
const tl = gsap.timeline({ paused: true });
const s = { t: 0 };
tl.to(s, { t: 1, duration: 2.4, ease: "power2.out",
           onUpdate: () => draw(s.t) }, 0);
```

> Renderer HyperFrames memanggil `timeline.seek(t, false)`, jadi `onUpdate` **jalan** waktu
> render. Kalau kamu menulis alat ukur/preview sendiri, pakai `seek(t, false)` — `seek(t)`
> polos membuang `onUpdate` dan partikel akan terlihat diam. Terverifikasi: render MP4 dua
> kali menghasilkan frame identik dan partikel benar-benar bergerak (`FEASIBILITY.md`).

Alternatif yang lebih tahan banting: gambar canvas lewat `tl.call()` pada grid 30fps
(`0.034s`), bukan tiap frame. Hasilnya sama halus setelah blend.

**DOM (≤ 120 partikel):** satu `<div>` per partikel, `transform` saja, stagger masuk.
Jangan `filter: blur` per partikel.

## Batas render

- Canvas: ≤ 5.000 butir, radius ≤ 3px. Di atas itu ukur ulang dengan
  `tools/measure-frame-cost.mjs`.
- DOM: ≤ 120 elemen (batas A2 tetap berlaku).
- Tidak ada `shadowBlur` pada canvas — itu jalur glow dan mahal.

## Dilarang

- Partikel dari `Math.random()` per frame. Seed tetap, dihitung di muka.
- Partikel + `mix-blend-mode` (blend sendirian sudah ~1,5× baseline).
- Canvas di dalam scene yang juga memakai filter goo atau 3 blend mode.
- Lebih dari satu canvas aktif per scene.
