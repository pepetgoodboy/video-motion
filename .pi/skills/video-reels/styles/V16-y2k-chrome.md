# V16 — Y2K chrome

Logam cair, permukaan perak, huruf tebal atau bubble, kilau yang melintas. Nostalgia 2000-an
yang dibuat **sengaja**, bukan retro umum (itu V4).

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Kilau melintas** sebagai gerak utama: `background-position` bergeser melintasi teks. Masuk huruf: `back.out(1.8)` atau pop 1.3→1. Tidak ada morph. |
| Fps rasa | Berkilau: gerak terus-menerus tapi halus. Puncak boleh snap. |
| Tekstur | Chrome itu sendiri = teksturnya. Boleh satu lapisan orb/bubble dengan highlight statis. Nol grain. |
| Kedalaman | 2–3 lapis: gradient perak (dasar), pita highlight putih keras (tengah), lens flare/kilau statis (depan). |
| Kamera | `C1` atau `C2`. Kamera diam juga sah — fokus pada kilau. |
| Tipografi | **Berat, tebal, atau bubble.** Huruf tipis langsung membunuh tipe ini. Boleh outline + isi gradient. |
| Transisi | `X6 flash` (kilau penuh satu frame), atau `X9 scale-fill` oleh orb. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V16 |
|---|---|
| Kontras | **≥ 4.5:1 wajib** — gradient perak paling sering jatuh ke abu-abu rendah kontras. Beri outline gelap di belakang huruf. |
| #2 teknik teks | 3 cukup. Variasi dari material, bukan dari teknik huruf. |
| #7 ambient | Kilau yang terus bergeser memenuhi ambient. |
| Kedalaman #5 | 2–3 lapis sah. |

## Resep HyperFrames

Biaya: gradient + `background-clip: text` setara dengan oklch (54–84 ms/frame). Aman.

```css
#chrome {
  font-weight: 900;
  background: linear-gradient(180deg,
    #f2f2f2 0%, #c9c9c9 32%, #ffffff 47%, #8f8f8f 53%, #d9d9d9 68%, #6e6e6e 100%);
  background-size: 100% 220%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-stroke: 3px #141414;   /* wajib: penjaga kontras */
}
```

- Pita highlight putih **keras** di sekitar 47–53 % — inilah yang membuatnya terasa logam.
  Gradient halus tanpa pita keras terbaca sebagai abu-abu biasa.
- Kilau melintas = animasikan `background-position` (bukan `background-image`).
- Orb/bubble: `radial-gradient` + satu highlight statis + bayangan kontak lembut.

## Batas render

- Satu elemen chrome besar per scene. Banyak elemen ber-gradient bersamaan = raster mahal.
- Lens flare = PNG/SVG statis, bukan blur beranimasi.
- Jangan `mix-blend-mode` untuk efek logam (blend ~1,5× baseline).

## Dilarang

- Gradient tanpa pita highlight keras (hasilnya abu-abu, bukan chrome).
- Huruf tipis (< 600) dengan gradient perak.
- `backdrop-filter` untuk kaca tiruan.
- Menumpuk > 4 stop gradient sampai permukaan keruh.
