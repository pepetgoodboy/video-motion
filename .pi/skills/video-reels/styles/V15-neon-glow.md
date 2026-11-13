# V15 — Neon glow

Garis dan huruf bercahaya di latar gelap. **Cahayanya harus terasa seperti sumber cahaya**,
bukan seperti teks yang diberi bayangan. Ini yang membedakannya dari V9 dengan warna terang.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Nyalakan dan padamkan.** Tabung menyala (opasitas naik cepat), kedip 2–4 kali, lalu stabil. `steps(1)` untuk kedip; `power2.out` untuk menyala. |
| Fps rasa | Sedikit patah pada kedipan (itu tabung), mulus pada gerak lain. |
| Tekstur | Latar gelap + satu lapisan haze/halo. **Nol grain** — grain di latar gelap terbaca sebagai noise kamera, bukan gaya. |
| Kedalaman | 2–3 lapis: halo (belakang), tabung/teks (tengah), pantulan tipis di lantai gelap (depan). |
| Kamera | `C1` push-in sangat lambat. Kamera bergerak cepat merusak kesan tabung diam. |
| Tipografi | Huruf tebal/rounded, satu atau dua kata besar. Huruf tipis tidak terbaca sebagai neon. |
| Transisi | Nyalakan/matikan (flash ke hitam), atau `X6 light leak` yang diwarnai ke palet. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V15 |
|---|---|
| Kontras | **≥ 4.5:1 wajib diukur pada inti teks**, bukan pada halo. Halo sering menipu. |
| #7 ambient | Halo "bernapas" (opasitas 0,85→1, 3–4 detik) memenuhi ambient. |
| #2 teknik teks | 3 cukup — variasi datang dari warna dan kedip, bukan dari bentuk huruf. |
| Kedalaman #5 | 2 lapis sah. |

## Resep HyperFrames

Biaya terukur: **halo pra-render + flicker opasitas = 54–76 ms/frame** (paling murah dari semua
probe). `text-shadow` 4 lapis yang dianimasikan = **71–110 ms/frame** — konsisten lebih mahal,
selisih ~1,2–1,4×. Yang membuat larangan ini penting bukan biaya satu elemen, tapi
**komposisi**: 4 lapis shadow × banyak elemen beranimasi sekaligus.

**Yang benar:**

```css
/* halo statis: radial-gradient, PNG, atau SVG — TIDAK dianimasikan radiusnya */
#halo { background: radial-gradient(ellipse at center,
        rgba(127,227,210,.55) 0%, rgba(127,227,210,.22) 38%, rgba(127,227,210,0) 70%); }
#tube { color: #f4fff9; }           /* inti terang, kontras tinggi */
```

```js
// kedip dari tabel offset TETAP, bukan dari Math.random
const flick = [1, .72, 1, .55, 1, .86, 1, .62, 1];
flick.forEach((v, i) => tl.to("#tube", { opacity: v, duration: 0.034, ease: "steps(1)" },
                                 0.4 + i * 0.05));
```

`text-shadow` / `box-shadow` **statis** boleh dipakai secukupnya (satu-dua lapis, tidak
dianimasikan). Yang dilarang adalah mengubah radiusnya per frame.

## Batas render

- Halo = satu gambar/gradient statis per elemen bercahaya.
- Maksimal 3 elemen bercahaya bersamaan.
- `filter: blur` beranimasi: dilarang, tanpa pengecualian.

## Dilarang

- Menganimasikan `text-shadow`/`box-shadow`/`filter: blur`.
- `mix-blend-mode` untuk halo (blend sendirian ~1,5× baseline).
- Latar terang — neon butuh gelap.
- Kontras teks diturunkan demi "glow yang lebih terasa".
