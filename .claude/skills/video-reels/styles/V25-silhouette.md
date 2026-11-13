# V25 — Siluet / kelir wayang

Figur hitam pekat di depan **kelir bercahaya** (layar wayang kulit / teater bayangan). Semua
cerita disampaikan lewat **bentuk tepi**: profil, gestur, benda. Tradisi: wayang kulit, Lotte
Reiniger (1926). Kuat untuk sejarah, legenda, kisah keluarga yang dramatis.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Boneka bersendi**: anggota badan berputar di titik sendi (`transform-origin` di sendi), gerak lengan lebar & lambat seperti dalang. `power2.inOut`; aksen `back.out(1.3)` untuk gestur keras. Badan jarang berpindah; lengan yang bercerita. |
| Fps rasa | Mulus, sedikit "goyang tangkai" (rotasi ±0,6° dari tabel tetap, 3 Hz) supaya terasa dipegang dalang. |
| Tekstur | Kelir = radial-gradient **pra-render** (PNG) amber ke coklat di tepi + serat kain statis. Siluet = hitam `#121010`, **detail tatahan** (lubang pola) pada figur utama sebagai potongan path. |
| Kedalaman | 3 lapis: kelir · figur (tajam) · benda depan dekat lampu (lebih besar, opacity 0,85, tepi sedikit lebih lunak — PNG pra-render, bukan blur). |
| Kamera | Hampir diam. `C1` sangat pelan; perpindahan adegan = **lampu meredup/menyala** atau figur keluar kelir. |
| Tipografi | T11 Cormorant Garamond tebal ≥ 72px untuk judul babak; teks sedikit, warna krem di pita gelap bawah. |
| Transisi | Kelir gelap (lampu padam 0,4 s) lalu menyala di adegan baru; atau gunungan/pohon hayat (siluet besar) menutup lalu membuka layar. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V25 |
|---|---|
| #4 gerak kamera | ≥ 50% scene cukup — teater bayangan berkamera diam. |
| #2 teknik teks | ≥ 2 cukup; teks bukan kendaraan. |
| Kepadatan kejadian | gestur lengan dihitung kejadian; celah ≤ 1,5 s tetap berlaku. |

## Resep HyperFrames

- Figur: SVG path hitam per bagian (kepala-badan, lengan atas, lengan bawah, tangkai), sendi =
  `transform-origin` piksel absolut. Satu rig per tokoh, dipakai ulang.
- Rules: `nudge-curve` (goyang tangkai), `scale-swap-transition` (gunungan), `viewport-change`.
- Kelir: 1 PNG per babak; flicker lampu = opacity overlay 0,92–1,0 dari tabel tetap (≤ 4 Hz).

## Batas render

≤ 6 figur di layar; tiap figur ≤ 10 bagian. Pola tatahan ≤ 300 titik per figur.

## Dilarang

- **Siluet Nabi, sahabat, malaikat** — termasuk "bayangan yang dimaksudkan sebagai beliau".
  V25 dalam `kisah-islami` hanya untuk hewan, tokoh biasa, atau benda.
- Meniru tokoh wayang tertentu yang punya pakem (Arjuna, Semar, dll.) tanpa konteks — buat
  figur orisinal bergaya kelir.
- Wajah berdetail (mata/mulut digambar di siluet).
- Warna selain kelir + hitam di figur.
