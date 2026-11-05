# Tes Kelayakan V13–V21 — hasil terukur

Diukur **5 Nov 2026** di `hyperframes@0.8.169`, Chrome headless-shell 152.0.7977.30,
software rasterizer (SwiftShader), kanvas 1080×1920, 120fps.

Alat ukur: `tools/measure-suite.mjs` (biaya, terinterleasi) + `tools/measure-frame-cost.mjs`
(satu probe) + `tools/verify-probes.mjs` (kebenaran). Probe dibangkitkan oleh
`tools/make-feasibility-probes.mjs`.

> **Kenapa bukan wall-clock `hyperframes render`.** Percobaan pertama memakai durasi render
> end-to-end. Hasilnya tidak bisa dipakai: kontrol statis (tanpa animasi sama sekali) butuh
> 62,5s capture, sedangkan komposisi blend butuh 76–87s — selisihnya di dalam varians mesin.
> Wall-clock per frame didominasi transport CDP/screenshot (±70ms konstan), yang menutupi
> biaya raster yang sebenarnya.
>
> Metrik yang dipakai: **CPU time proses Chrome** dibagi jumlah frame, diukur lewat
> `tools/measure-suite.mjs` yang menjalankan semua probe **bergiliran dalam satu sesi**
> (rasio dihitung terhadap kontrol di sesi yang sama). Ini menghapus sebagian besar noise
> antar-sesi, tapi tidak semuanya — lihat catatan di bawah tabel.

## Biaya raster per frame

**Catatan kejujuran pengukuran.** Mesin uji ini 4 core dengan beban latar 6,6 (browser lain
aktif), jadi angka absolut bergeser sampai ±30% antar sesi. Yang **stabil di semua run adalah
urutannya** dan pemisahan tier-nya. Jadi tabel ini memakai tier, bukan persentase presisi;
rentang bawah–atas berasal dari 4 putaran terinterleasi (setelah pemanasan).

| Tier | Probe | Rentang CPU ms/frame | Arti |
|---|---|---|---|
| **Lantai** | b9-static | 47–75 | layar diam; biaya dasar capture |
| | b10-splitflap | 49–68 | ganti karakter via `tl.call()` hampir gratis |
| | b11-neon-good | 54–76 | halo pra-render + flicker opasitas |
| | b5-oklch | 54–84 | `oklch()`, gradient `in oklch`, `color-mix` |
| | b6-pathd | 50–78 | tween `attr:{d}` native |
| **Kontrol** | b0-baseline | 59–98 | 90 blok DOM beranimasi |
| **+1 tier** | b1-canvas | 61–77 | 2.600 partikel canvas digambar tiap frame |
| | b2-ascii | 61–82 | 64×100 sel dibangun ulang tiap frame |
| | b11-neon-bad | 71–110 | `text-shadow` 4 lapis dianimasikan tiap frame |
| **+2 tier** | b8-dom400 | 70–96 | 400 elemen DOM beranimasi (batas budget) |
| | b4-blend1 | 78–105 | 1 elemen `mix-blend-mode` |
| **Jauh di atas** | b3-blend3 | 107–187 | 3 elemen `mix-blend-mode` |
| | b7-goo | 109–183 | filter goo (`feGaussianBlur` + `feColorMatrix`), 1 grup 4 blob |

Kesimpulan yang **tahan terhadap noise**:

1. **Canvas, ASCII, OKLCH, dan morph `attr:{d}` ada di sekitar baseline.** Tidak ada alasan
   menghindarinya. Split-flap dan glow-halo justru paling murah dari semuanya.
2. **Blend mode dan goo memisahkan diri dengan jarak besar** — di semua putaran, keduanya
   ±1,5–2× baseline, tanpa pernah tumpang tindih dengan kelompok murah. Ini bukan noise.
3. **`text-shadow` beranimasi konsisten lebih mahal daripada halo pra-render**, tapi jaraknya
   lebih kecil dari dugaan awal (bukan 5×; sekitar 1,2–1,4×). Larangan di MASTER-PROMPT tetap
   benar, tapi alasan utamanya adalah **komposisi berlapis** (4 shadow × banyak elemen), bukan
   biaya per elemen.
4. **Kontrol statis bisa lebih murah dari baseline** — artinya biaya capture dasar mendominasi
   pada komposisi ringan, dan selisih antar gaya murah sering berada di bawah noise.

Kalau butuh angka persis untuk komposisi nyata: render video itu sendiri dan bandingkan waktu
render dengan kontrol, jangan mengandalkan tabel ini.

## Kebenaran (bukan cuma biaya)

| Item | Hasil | Bukti |
|---|---|---|
| `oklch()` didukung | **ya** | `CSS.supports` true untuk warna, gradient `in oklch`, dan `color-mix`; swatch `oklch(70% 0.18 150)` tampil sama dengan hex `#35c46a` |
| Tween `attr:{d}` SVG | **ya, native** | GSAP menginterpolasi atribut `d`; path tetap valid (`getTotalLength() > 0`) di t=0 / 1,5 / 3 |
| Interpolasi path manual | **ya** | Halus dan valid; tidak butuh perlakuan khusus di komposisi |
| Canvas 2D deterministik | **ya** | Dua render → hash identik (`a6d32698…`) |
| Canvas 2D di renderer nyata | **ya** | Render MP4 dua kali → frame 10/180/330 identik; partikel bergerak |
| ASCII per sel deterministik | **ya** | Dua render → hash identik (`4bd9561a…`); render MP4 berdenyut |
| Split-flap deterministik | **ya** | Hash identik; render MP4 nyata juga memutar huruf (frame 84 = putaran, frame 180 = target) |
| 400 elemen DOM deterministik | **ya** | Hash identik (`bd5f092b…`) |
| Goo filter tampil | **ya** | Metaball melebur terlihat pada screenshot (setelah blob dibuat bertumpuk) |

## Yang ternyata penting (temuan di luar dugaan)

1. **`seek(t)` vs `seek(t, false)` — jebakan di alat ukur, bukan di renderer.** GSAP melewati
   `onUpdate`/`onProgress` saat `suppressEvents` aktif (default `seek(t)`). Renderer
   HyperFrames **sudah benar**: sumber `0.8.169` (`createGSAPFrameAdapter.seekFrame`) memanggil
   `timeline.seek(targetSeconds, false)`, jadi callback jalan normal waktu render. Yang salah
   adalah harness ukur pertama saya (`measure-frame-cost.mjs`) yang memakai `seek(t)` polos —
   akibatnya animasi canvas/ASCII terlihat kosong dan saya sempat menyimpulkan "callback tidak
   jalan di render". **Sudah dibuktikan terbalik:** render MP4 nyata memperlihatkan partikel
   bergerak (frame 10 → 180 → 330 berbeda) dan ASCII berdenyut, dan dua render terpisah
   menghasilkan frame identik.

   Aturan yang benar: **tulis komposisi seperti biasa** (`onUpdate` boleh). Hanya kalau kamu
   membuat alat ukur/preview sendiri, pakai `seek(t, false)` supaya hasilnya setara renderer.
2. **`.call()` juga jalan** — diuji lewat render MP4 nyata pada split-flap (V21): huruf berputar
   di frame 84 dan mengunci ke target di frame 180.
3. **Glow.** `text-shadow` beranimasi konsisten lebih mahal daripada halo pra-render, tapi
   selisihnya **1,2–1,4×**, bukan 5× seperti dugaan awal saya. Larangan MASTER-PROMPT tetap
   benar — alasannya komposisi berlapis (4 shadow × banyak elemen beranimasi), bukan biaya
   satu elemen.
4. **Goo dan blend mode memisahkan diri dengan jarak besar** (1,5–2× baseline, tanpa pernah
   tumpang tindih dengan kelompok murah). Biayanya hampir tidak bergantung pada luas area:
   satu grup kecil 600×600 px sama mahalnya dengan 3 kartu besar. Karena itu larangan goo dan
   batas ≤ 3 blend mode sebaiknya diperketat jadi **≤ 1 elemen blend aktif** untuk render CPU.
5. **Wall-clock `hyperframes render` tidak bisa dipakai sebagai metrik.** Kontrol statis bisa
   lebih lambat dari komposisi berat; varians mesin menutupi selisihnya. Pakai CPU time +
   tier, dan ukur ulang di mesin yang idle kalau butuh angka presisi.

## Determinitas lewat renderer nyata (bukan cuma screenshot)

| Uji | Hasil |
|---|---|
| Canvas V13 — render MP4 dua kali | frame 10, 180, 330 → **identik** antar render |
| Canvas V13 — gerak | partikel menyebar → mengelompok → menyebar, terlihat di MP4 |
| ASCII V19 — gerak | cincin berdenyut terlihat di MP4 |
| Split-flap V21 — `tl.call()` | huruf berputar lalu mengunci, terlihat di MP4 |

## Keputusan yang mengikuti hasil ini

| Tipe | Keputusan |
|---|---|
| V13 Particles | **Boleh** canvas 2D sampai ribuan titik — biayanya hanya +16 %. Batas ≤ 120 partikel DOM tidak perlu dipertahankan bila memakai canvas. |
| V14 Liquid morph | **Boleh** tween `attr:{d}` native. Goo filter tetap dilarang; pakai "leher" bezier yang dihitung. |
| V15 Neon glow | **Boleh**, wajib halo pra-render. `text-shadow` beranimasi dilarang (angkanya +71 %). |
| V16 Y2K chrome | Tidak diuji khusus; memakai gradient + `background-clip: text` yang biayanya setara oklch (+8 %). |
| V17 Holographic | `oklch`/`color-mix` aman, tapi `mix-blend-mode` **mahal**. Batas diturunkan ke **1 elemen blend** aktif per saat. |
| V18 Isometric | Tidak diuji khusus (SVG/CSS transform biasa, setara baseline). |
| V19 ASCII art | **Boleh** dibangun ulang per frame (64×100) — +20 %, masih murah. Grid lebih besar perlu diukur ulang. |
| V20 Comic book | Tidak diuji khusus (halftone statis = gambar). |
| V21 Split-flap | **Boleh**, dan `tl.call()` terverifikasi bekerja lewat render nyata. Jaga jeda ≥ 0,05s. |

## Cara menjalankan ulang

```bash
# 1. bangkitkan ulang semua probe (idempoten, aman dihapus kapan saja)
node tools/make-feasibility-probes.mjs

# 2. biaya — semua probe bergiliran, 3 putaran (paling bisa dipercaya)
node tools/measure-suite.mjs --rounds 3 --frames 40

#    atau satu probe saja (lebih cepat, kurang bisa dibandingkan)
node tools/measure-frame-cost.mjs --probe videos/_stylefeasibility/probes/b1-canvas --frames 60

# 3. kebenaran (tulis screenshot ke qc/probes/)
node tools/verify-probes.mjs
```

Kalau CLI HyperFrames di-upgrade, jalankan ulang keduanya dan perbarui tabel di atas — angka
ini terikat ke 0.8.169 + Chrome 152.

**Jangan menambah probe lepas.** Semua probe dibangkitkan oleh
`tools/make-feasibility-probes.mjs`; tambahkan entri baru di sana supaya bisa direproduksi.
Probe tidak di-commit (`videos/` ada di `.gitignore`), jadi script generator itu satu-satunya
sumber.
