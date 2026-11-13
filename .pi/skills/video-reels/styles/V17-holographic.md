# V17 — Holographic

Permukaan foil yang berubah warna mengikuti sudut cahaya. Iridescent, premium, bergeser.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Geser sudut/hue** lambat pada satu permukaan. `sine.inOut`, durasi panjang (2–4s). Masuk elemen: `power3.out`. |
| Fps rasa | Mulus. Tidak ada kedip — foil tidak berkedip. |
| Tekstur | Tidak ada grain. Foil adalah tekstur. |
| Kedalaman | 2 lapis: gradient foil (utama) + sapuan highlight diagonal (depan). |
| Kamera | `C1`/`C6` kecil. Kamera diam sah. |
| Tipografi | Huruf gelap di atas foil (foil jadi latar), atau huruf ber-foil dengan outline gelap. |
| Transisi | Sapuan highlight melintas (`X9`), atau ganti sudut foil drastis (`X7 flip`). |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V17 |
|---|---|
| **Blend mode** | **Maksimal 1 elemen ber-`mix-blend-mode` aktif pada satu waktu** (batas MASTER-PROMPT ≤ 3, tapi terukur mahal — lihat di bawah). |
| Kontras | Tetap ≥ 4.5:1 pada teks. Foil mudah membuat teks hilang. |
| #2 teknik teks | 3 cukup. |
| Kedalaman #5 | 2 lapis sah. |

## Resep HyperFrames

Biaya terukur (FEASIBILITY.md):
- `oklch()`, `linear-gradient(in oklch …)`, `color-mix(in oklch …)` → 54–84 ms/frame, setara
  komposisi biasa. Semuanya **didukung** Chrome 152.
- 1 elemen `mix-blend-mode` → 78–105 ms/frame.
- 3 elemen `mix-blend-mode` → 107–187 ms/frame, tanpa pernah tumpang tindih dengan kelompok murah.

Karena itu **V17 direkomendasikan tanpa blend mode sama sekali**: gradient berlapis + posisi
`background-position` yang digeser menghasilkan efek iridescent yang sama tanpa biaya blend.
Blend dipakai hanya untuk satu momen hero, bukan sepanjang video.

**Tanpa blend (disarankan):**

```css
#foil {
  background:
    conic-gradient(from var(--ang, 40deg) at 30% 40%, #7fe3d2, #d8b4fe, #f0abfc, #22d3ee, #7fe3d2),
    linear-gradient(200deg, #0b0b0a, #1a5f5a);
  /* animasikan --ang lewat variabel CSS yang di-set dari timeline */
}
```

**Dengan oklch (aman, terverifikasi):**

```css
#foil { background: linear-gradient(in oklch 90deg, #2b50aa, #d8b4fe, #e8452c); }
```

Perhatikan: gradient `in oklch` **tidak** menghasilkan pelangi yang sama dengan gradient sRGB —
transisinya lebih vivid di tengah (terlihat di screenshot tes). Itu efek yang diinginkan;
jangan dikira bug.

## Batas render

- ≤ 1 elemen blend aktif per saat; total ≤ 3 elemen blend per video.
- Jangan blend pada latar layar penuh.
- Beri warna fallback hex; oklch aman di Chrome 152 tapi belum tentu di player lain.

## Dilarang

- `mix-blend-mode` pada latar layar penuh sepanjang video.
- Menumpuk 3 elemen blend sekaligus (1,5–2× baseline, setara mahalnya dengan filter goo).
- Mengklaim "refraksi asli" — itu tidak mungkin di DOM.
