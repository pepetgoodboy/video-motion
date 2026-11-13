# V26 — Pixel art 8-bit

Dunia game lawas: sprite dari kotak piksel, palet terbatas, gerak bertahap, HUD, angka skor.
Konsep teknis jadi **level game** (request = karakter yang melompati rintangan, RAM = inventori,
proses = musuh yang di-kill). Bahasa yang langsung dipahami penonton muda.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Bertahap seperti game**: posisi sprite di-snap ke grid piksel (kelipatan ukuran piksel, mis. 12px) dan frame animasi sprite berganti 8–10 Hz (`tl.set`). Lompat = parabola terkuantisasi `steps()` dengan interval ≥ 0,034 s. |
| Fps rasa | 10–12 fps untuk sprite; kamera/scroll latar boleh mulus. |
| Tekstur | Nol grain. Opsional scanline statis tipis (opacity ≤ 0,06) — bukan CRT berat. |
| Kedalaman | Parallax 3 lapis gaya platformer (langit 0,2× · gunung 0,5× · tanah 1×). |
| Kamera | Side-scroll `C3` mengikuti protagonis; `C7` guncang **berpola piksel** (offset kelipatan 12px) saat "hit". Tanpa rotasi, tanpa zoom pecahan (zoom hanya 1×, 2×, 3×). |
| Tipografi | T9: Press Start 2P untuk judul/HUD (≥ 40px; huruf lebar — hitung lebar baris!), VT323 untuk kalimat (≥ 44px). |
| Transisi | Wipe kotak-kotak (`grid-pixelate-wipe`), layar "LEVEL 2", atau masuk pipa/pintu. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V26 |
|---|---|
| Easing | `steps()` dan `none` dominan; `back.out` dilarang pada sprite (sub-piksel merusak ilusi). |
| #6 kontras skala | sprite kecil vs angka skor raksasa ≥ 6:1. |
| Grid piksel | 100% elemen sprite di koordinat kelipatan ukuran piksel. |

## Resep HyperFrames

- Sprite: `<div>` grid atau SVG `<rect>` per piksel **digenerate saat build** dari array string
  (`"..##..", ".####."`), dirender sebagai satu SVG per frame sprite (2–4 frame per aksi).
  `image-rendering: pixelated` untuk PNG; `shape-rendering: crispEdges` untuk SVG.
- Catalog: `grid-pixelate-wipe`, `slot-machine-roll` (skor), `split-flap-board` (HUD skor,
  retint), `stop-motion-cadence` (kuantisasi waktu).
- Rules: `discrete-text-sequence`, `counting-dynamic-scale`, `particle-burst` (koin/ledakan
  kotak, partikel = kotak).

## Batas render

Sprite ≤ 48×48 piksel logis; ≤ 12 sprite aktif. Satu SVG per frame sprite (bukan ribuan div).

## Dilarang

- Sprite/karakter game berhak cipta (Mario, Pac-Man, dll.) dan font/logo game asli.
- Anti-aliasing, blur, gradient halus pada sprite.
- Zoom non-integer pada sprite.
- `steps()` < 0,034 s per langkah (musnah oleh blend 120→60).
