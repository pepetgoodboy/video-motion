# V20 — Comic book

Halftone, garis tebal, panel, balon bicara, onomatopoeia. Bahasa material **cetak komik**,
bukan ilustrasi vektor bersih.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Potongan panel + pop.** Panel masuk `slide-snap` (M5), elemen "ledakan" dengan `back.out(2)`. Tidak ada gerak ambient yang halus — komik itu diam sampai panel berganti. |
| Fps rasa | Keras. Snap lebih benar daripada mulus. |
| Tekstur | **Halftone statis** (pola titik) + garis tepi tebal 4–8px. Nol gradient halus. |
| Kedalaman | 2–3 lapis: latar halftone, panel utama, balon/teks di depan. |
| Kamera | `C7 guncang` saat impact, atau `C2` saat panel besar terungkap. |
| Tipografi | Display tebal untuk onomatopoeia; teks narasi di kotak caption kuning. Huruf miring untuk suara. |
| Transisi | `X1 panel wipe`, atau `X4 iris` ke detail. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V20 |
|---|---|
| #2 teknik teks | ≥ 4, minimal 2 harus **kasar** (slam, stamp, potong). |
| **Jumlah kata** | Onomatopoeia **dihitung sebagai kata**. Batas 25 kata/scene tetap. |
| Kontras | ≥ 4.5:1. Teks di atas halftone wajib diberi plat putih/solid. |
| #9 pattern interrupt | ≤ 8 detik (lebih ketat dari 10) — panel harus berganti. |

## Resep HyperFrames

Biaya: halftone dari `radial-gradient` **statis** atau SVG pattern. Murah.

```css
/* halftone statis — jangan dianimasikan */
#halftone {
  background-image: radial-gradient(circle, #141414 2.4px, transparent 2.6px);
  background-size: 12px 12px;
}
```

- Outline tebal: `-webkit-text-stroke` atau SVG stroke. Bukan `filter: drop-shadow`.
- Balon bicara & ledakan: **SVG statis** (path), digambar sekali.
- Panel = grid layout; masuk dengan `translate` + `clip-path` step.
- Onomatopoeia: satu per momen, ukuran raksasa, outline tebal, rotasi −6° sampai +6° dari
  tabel tetap (bukan random).

Sumber hak cipta: **jangan** meniru karakter, logo, atau gaya khas penerbit nyata. Bahasa
material boleh, identitas tidak.

## Batas render

- ≤ 3 tekstur statis per scene (halftone, garis, plat).
- ≤ 1 elemen dengan `clip-path` beranimasi bersamaan.
- Jangan `filter: blur` untuk gerak cepat — itu bahasa V4, bukan V20.

## Dilarang

- Karakter atau IP berhak cipta.
- Gradient halus di dalam panel (merusak kesan cetak).
- Onomatopoeia lebih dari 2 per scene (jadi berisik dan melanggar batas kata).
- Halftone dari `feTurbulence` animatif.
