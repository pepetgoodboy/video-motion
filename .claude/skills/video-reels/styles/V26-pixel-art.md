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

## Teruji di render (#18 `bikin-script-bash-linux-pertamamu`)

Resep jalan; contoh lengkap `videos/bikin-script-bash-linux-pertamamu/build.mjs` (sprite dari array
string → SVG `<rect>` per run horizontal, `shape-rendering:crispEdges`, frame = `<div>` bertumpuk yang
di-`tl.set` opacity). Pelajaran:

- **Wipe/transisi penutup layar jangan warna gelap.** Blok `#0D1028` → 70 frame terhitung hitam.
  Pakai plum/plumD (kecerahan > 40).
- **Frame ditahan = "frame beku" di `qa-video`.** Per scene 58–78% frame identik — itu sifat gaya
  (override audit generik, seperti kamera mati V1/V9). Yang wajib nol hanya **blok diam ≥ 0,5 s**:
  isi dengan kursor berkedip 4 Hz, idle sprite 4 Hz, ikon memantul 12 px.
- **Translasi sprite** tetap memakai langkah ≤ 0,05 s (aturan anti patah-patah); frame kaki/wajah
  boleh 4–8 Hz.
- Press Start 2P lebar 1 em/huruf → hitung lebar tiap judul; VT323 0,4 em. Tilde VT323 kecil
  terlihat seperti `≈` di ukuran ≤ 48 px.
- Angka skor: `textContent` diawali `\u200B` (GSAP mengubah "000100" jadi 100).
- **Biaya terukur:** 120 s @120 fps → render 27–29 menit (software GPU), raw 39 MB, final 14 MB
  (bidang datar = bitrate rendah). Dirender 3× (frame hitam wipe, lalu jeda diam).

## Batas render

Sprite ≤ 48×48 piksel logis; ≤ 12 sprite aktif. Satu SVG per frame sprite (bukan ribuan div).

## Dilarang

- Sprite/karakter game berhak cipta (Mario, Pac-Man, dll.) dan font/logo game asli.
- Anti-aliasing, blur, gradient halus pada sprite.
- Zoom non-integer pada sprite.
- `steps()` < 0,034 s per langkah (musnah oleh blend 120→60).
