# V24 — Buku cerita (storybook)

Video terasa seperti **buku bergambar yang dibacakan**: ilustrasi lembut bertekstur cat air /
krayon, tepi bentuk sedikit tidak rata, cahaya hangat. Halaman dibalik, kamera menyusuri satu
ilustrasi lebar. Untuk kisah keluarga, kisah islami anak, dongeng, dan sains untuk anak.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Pelan dan bernapas.** `sine.inOut` / `power1.inOut`, durasi panjang (1,2–3 s). Tokoh bergerak sedikit (napas, menoleh, langkah kecil); dunia yang hidup (daun, awan, air) bergerak terus. Tanpa `back.out` keras. |
| Fps rasa | Mulus. Boleh "boil" garis tinta 8 Hz (`hw-boil`) untuk tokoh. |
| Tekstur | **Kertas cat air pra-render** (PNG 1080×1920, dibangkitkan sekali dengan PIL + seed tetap: noise lembut + bercak pigmen tepi) + isian bentuk dengan gradient lembut 2 warna + garis tinta coklat tua tipis (2–3px) tidak penuh. |
| Kedalaman | 4 lapis parallax: langit (0,15×) · bukit jauh (0,4×) · panggung tokoh (1×) · depan (rumput/daun 1,5×). |
| Kamera | `C3` pan lebar menyusuri ilustrasi panjang (dunia 2–3× lebar layar); `C2` pull-back membuka halaman; tanpa guncang. |
| Tipografi | T10 Fraunces SOFT/WONK untuk judul (seperti sampul buku), Nunito untuk teks. Teks di **bidang kertas** (halaman), bukan melayang. |
| Transisi | **Halaman dibalik** (`rotateY` 0→−180° dengan bayangan lipatan statis), atau kabut/cat menyapu (gradient diam yang digeser). |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V24 |
|---|---|
| Kepadatan kejadian | ≤ 2,0 s cukup (bukan 1,5) — tempo buku cerita; ambient tetap wajib. |
| #6 kontras skala | ≥ 4:1 cukup. |
| Pattern interrupt | Pergantian waktu (pagi → sore → malam) / cuaca dihitung sebagai interrupt. |
| Suasana | Waktu dalam satu cerita bergerak **satu arah** (pagi → senja), lokasi tetap konsisten (pelajaran dari `islamic-story-engine/lib/rig/variation.mjs`). |

## Resep HyperFrames

- Tekstur: script Python sekali per video (contoh pola: `tools/gen-tex-copier.py` — numpy +
  PIL, seed tetap) → `assets/tex/paper.png`, `assets/tex/wash-*.png`.
- Bentuk: SVG path halus dengan sedikit ketidakteraturan (titik digeser ±3px dari PRNG ber-seed
  saat build, bukan per frame).
- Catalog: `starfield`, `snow` (retint, cuaca/malam), `hw-boil`, `scroll-camera-story`
  (pan panjang), `paper-collage-reveal` (sampul).
- Rules: `viewport-change`, `sine-wave-loop` (daun/air), `depth-scatter-assemble` (judul).
- Tokoh: rig seperti V23 tetapi proporsi buku cerita (kepala besar, tanpa outline tebal).

## Batas render

Tekstur = PNG statis, maks 3 per scene. Tanpa `filter: blur` (kabut = PNG gradient).
≤ 80 elemen beranimasi per scene.

## Dilarang

- Warna jenuh neon; hitam pekat (ganti tinta coklat tua).
- Transisi glitch/whip — merusak suasana dibacakan.
- Menggambar Nabi/sahabat dalam kisah islami (adab, `peta-gaya.md` §8).
- Tekstur `feTurbulence` hidup.
