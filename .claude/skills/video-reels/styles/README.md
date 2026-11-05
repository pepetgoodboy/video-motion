# Style Cards — kontrak eksekusi Tipe Visual (V1–V21)

Brief menentukan **kode V** (MASTER-PROMPT bagian 12.1). Folder ini menerjemahkan kode itu
jadi resep HyperFrames yang bisa langsung dieksekusi. Tanpa card ini, "V2 cutout craft" cuma
satu baris prosa dan agent akan jatuh kembali ke look default.

## Cara pakai

1. Baca kode V dari brief (`Tipe visual (V)`).
2. Baca `styles/V<n>.md` — **seluruhnya**, sebelum menulis scene pertama.
3. Tulis `STYLE.md` di folder video: salin tabel "Parameter wajib" + "Nilai audit" dari card,
   isi kolom aktual. Setiap scene merujuk `STYLE.md`, bukan ingatan.
4. Kalau brief hibrida (`V2+V1`): card utama mengatur material + gerak + kamera; card aksen
   hanya boleh menyumbang **tipografi dan/atau transisi**, ≤ 30% durasi.
5. Untuk **V13–V21**, baca juga `FEASIBILITY.md` — biaya terukur tiap teknik (canvas, blend,
   goo, path morph, glow) beserta syarat determinisme yang sudah diverifikasi.

## Kenapa ini ada

Video yang gagal terasa beda bukan karena palet/font sama — palet dan font sudah diganti tiap
video dan tetap terasa sama. Yang tidak pernah berubah adalah **enam sumbu di bawah**. Card
mengunci keenamnya.

| Sumbu | Default yang harus dilawan |
|---|---|
| Bahasa gerak (easing + fps rasa) | `power2/back/sine` di semua tween = mulus seragam |
| Tekstur | `feTurbulence` statis `opacity 0.028` di semua scene |
| Kedalaman | 3–4 lapis parallax di semua scene |
| Kamera | push-in `1.00→1.04..1.08` di semua scene |
| Tipografi | font beda, perlakuan sama (kata muncul, naik, scale) |
| Transisi | X-code yang itu-itu juga |

## Batas pipeline yang membentuk semua resep

Render selalu **120fps → blend ke 60fps** (`blend=all_mode=average`). Blend merata-ratakan
pasangan frame, jadi:

- **Gerak bertingkat (steps) hanya bertahan kalau tiap hold ≥ 4 frame @120fps.**
  Artinya interval step **≥ 0.034s**. Contoh: `duration 0.4s` + `ease: "steps(11)"` = 0.036s/step.
  `steps(24)` pada 0.4s = 0.017s/step → **musnah jadi smear**, hasilnya balik mulus.
- Di dalam hold berdurasi ≥ 4 frame, tidak ada penyusutan (frame identik dirata-ratakan dengan
  dirinya sendiri). Hanya frame batas step yang kena blur ringan — itu justru bagus untuk
  potongan kertas.
- Konsekuensinya: gaya "patah" **tidak boleh** diakali dengan `steps()` rapat. Perbesar hold.

Kalau butuh chunk yang benar-benar keras tanpa blur sama sekali, render langsung 60fps
(`--fps 60`, tanpa blend) — cara ini dilarang oleh `CLAUDE.md` untuk gerak halus, tapi sah
untuk V9/V11 yang memang menginginkan snap. Catat pilihan ini di `STYLE.md`; jangan diam-diam.
V21 (split-flap) **wajib** di atas lantai 0,05s per langkah kalau tetap memakai blend.

## Dilarang di semua card

- `backdrop-filter` (bagian 11 MASTER-PROMPT).
- `feTurbulence` **animatif** — grain harus statis, digeser sebagai gambar (`background-position`).
- `filter: drop-shadow` pada banyak elemen beranimasi — pakai `box-shadow` statis atau
  bayangan pra-render.
- `Math.random()` / `Date.now()` / `repeat: -1` tanpa batas `data-duration`.
- Tween `width`/`height`/`top`/`left` — pakai proxy `scale`/`translate`.
- CSS `transition` pada elemen beranimasi (interpolasi di luar seek → kedip saat render).

## Peta card → rules/blueprints HyperFrames

Jangan bangun dari nol kalau ada rule yang persis. Muat rule-nya, restyle ke palet brief.

| V | Rule/blueprint yang dimuat |
|---|---|
| V1 | `kinetic-beat-slam`, `dynamic-content-sequencing`, `discrete-text-sequence`, `3d-text-depth-layers` |
| V2 | `depth-scatter-assemble`, `viewport-change`, `waterfall-entry` |
| V3 | `depth-scatter-assemble`, `split-tilt-cards`, `scale-swap-transition` |
| V4 | `chromatic-glitch`, `motion-blur-streak`, `sine-wave-loop` |
| V5 | `svg-path-draw`, `css-marker-patterns`, `nudge-curve`, `coordinate-target-zoom` |
| V6 | `spring-pop-entrance`, `press-release-spring`, `physics-press-reaction` |
| V7 | `orbit-3d-entry`, `3d-camera-flight`, `3d-text-depth-layers` |
| V8 | `ambient-glow-bloom`, `spring-pop-entrance`, `card-morph-anchor` |
| V9 | `scale-swap-transition`, `spring-pop-entrance`, `kinetic-beat-slam` |
| V10 | `cursor-click-ripple`, `cursor-drag`, `control-target-sync`, `ai-tracking-box` |
| V11 | `chromatic-glitch`, `scale-swap-transition`, `motion-blur-streak` |
| V12 | `card-morph-anchor`, `theme-crossfade-morph`, `center-outward-expansion` |
| V13 | `center-outward-expansion`, `depth-scatter-assemble`, `sine-wave-loop` |
| V14 | `card-morph-anchor`, `theme-crossfade-morph`, `svg-path-draw` |
| V15 | `ambient-glow-bloom`, `scale-swap-transition`, `chromatic-glitch` (hanya makna error) |
| V16 | `3d-text-depth-layers`, `motion-blur-streak`, `spring-pop-entrance` |
| V17 | `theme-crossfade-morph`, `ambient-glow-bloom`, `split-tilt-cards` |
| V18 | `3d-camera-flight` (≤ 6 detik), `coordinate-target-zoom`, `depth-scatter-assemble` |
| V19 | `discrete-text-sequence`, `dynamic-content-sequencing` |
| V20 | `kinetic-beat-slam`, `split-tilt-cards`, `scale-swap-transition` |
| V21 | `kinetic-beat-slam`, `discrete-text-sequence` |

> Peta di atas adalah **titik awal**, bukan jaminan. Blok catalog yang dimuat wajib di-retint
> ke palet brief, dan untuk V13–V21 wajib dicek terhadap batas budget di `FEASIBILITY.md` —
> beberapa blok menggunakan blur/blend yang mahal.

## Tipe berbasis canvas / pergantian karakter

Tiga tipe menggerakkan isi lewat JavaScript per frame, bukan tween properti. Semua **jalan
normal** di renderer HyperFrames (0.8.169 memanggil `timeline.seek(t, false)` di
`createGSAPFrameAdapter.seekFrame`), dan sudah diverifikasi lewat render MP4 nyata.

| Tipe | Pola |
|---|---|
| V13 canvas | Tween objek angka + gambar di `onUpdate`. Alternatif: gambar lewat `tl.call()` di grid 30fps. |
| V19 ASCII | `textContent` di `onUpdate`, atau `tl.call()` per 0,034s. |
| V21 split-flap | Pakai `tl.call()` — paling mudah dibaca untuk pergantian karakter diskret. |

> **Jebakan yang hanya mengenai alat ukur sendiri:** GSAP membuang `onUpdate` saat
> `seek(t)` tanpa argumen kedua. Script preview/measure buatan sendiri **wajib**
> `seek(t, false)`; komposisi tidak perlu diubah.

## Rotasi

Aturan di brief (MASTER-PROMPT 12.1) tetap berlaku: tipe V tidak boleh sama dengan **3 video
terakhir**. Catat di `STYLE-LEDGER.md` (root repo) setiap selesai render — kolom: tanggal, slug,
V utama, V aksen, bahasa gerak, tekstur, apakah pipeline blend dipakai.

**Varian dihitung tipe yang sama** (MASTER-PROMPT §12.1 tabel varian): Retro VHS = V4,
Kinetic Type = V1, Paper Cutout = V2, Hand-Drawn = V5, Clay 3D = V7. Jangan membuat kode V baru
untuk varian.

Pool yang tersedia setelah card ini lengkap: **V1–V21**. Sembilan tipe terakhir (V13–V21)
resepnya sudah diukur — lihat `FEASIBILITY.md` untuk angka biaya dan hasil verifikasi
determinisme.
