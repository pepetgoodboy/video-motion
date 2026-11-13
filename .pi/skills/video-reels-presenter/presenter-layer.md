# Lapisan Presenter — kontrak teknis

Card ini mengatur **orang nyata** di dalam komposisi HyperFrames. Lapisan presenter adalah
**sumbu ke-7** di samping enam sumbu card V (bahasa gerak, tekstur, kedalaman, kamera, tipografi,
transisi). Card V tetap berlaku untuk dunia di belakang presenter; card ini hanya mengatur bagaimana
manusia itu diletakkan, dipotong, dan dihidupkan.

> **Kenapa bukan kode V.** V mengunci bahasa material seluruh video. Presenter keputusan **konten**,
> bukan gaya. Kalau presenter diberi kode V, tiap video presenter memakan slot rotasi V di
> `STYLE-LEDGER.md` dan menghalangi tipe visual yang seharusnya bebas.
>
> **Jangan membuat kode V baru untuk presenter.** Pool V resmi adalah **V1–V21** (lihat
> `../video-reels/styles/`); semuanya sudah terpakai untuk tipe visual nyata. Presenter tetap
> sumbu ke-7, tidak pernah mendapat kode.

## Geometri (kanvas 1080×1920)

| Parameter | Nilai | Catatan |
|---|---|---|
| Sumber shot | **1080×1920** (atau 9:16 dengan lebar ≥1080) | Aspect beda → orang ter-stretch. Burn-in, jangan diakali CSS |
| Mata | y **520–620** | Lebih tinggi = kelihatan melayang; lebih rendah = horizon miring |
| Dagu | y **1100–1250** | Lebih rendah = badan terlalu dominan, teks tidak dapat ruang |
| Lebar bahu | 420–620 px | Di bawah 420 orang terasa jauh dan lepas dari penonton |
| Safe zone teks | **x 72–952, y 240–1460** | Aturan project tidak berubah; presenter yang menyesuaikan, bukan teks |
| Shutter | 1/60 s (24–30 fps) atau 1/120 s (60 fps) | Motion blur bawaan mengurangi getaran |

**Kamera: jangan di-zoom.** Shot harus sudah benar di kamera. Push-in digital pada footage 1080p
= upscale + blur. Kalau butuh variasi, rekam dua jarak (medium + close).

## Tiga penempatan

| Penempatan | Ukuran | Kapan dipakai | Harga |
|---|---|---|---|
| **P1 — Full frame** | presenter sendiri satu scene penuh | reveal, hook, punchline, penutup | Kamu kehilangan satu scene untuk visual lain |
| **P2 — Cutout penuh** | orang terpotong, latar HyperFrames | presenter + diagram/teks di belakangnya | Perlu `remove-background`; teks boleh lewat di belakang badan |
| **P3 — Bubble** | skala 0.28–0.34, jangkar bawah kiri/kanan di dalam safe zone | presenter menarasikan scene yang isinya visual | Paling hemat; teks tetap punya area penuh |

Aturan pembagian yang dipakai project ini: **P1 ≤ 25% durasi**, sisanya P2/P3. Video yang 100%
full-frame orang = vlog, dan seluruh kekayaan pipeline (V-code, 3 lapis gerak, blend) jadi tidak
terpakai.

### Posisi bubble yang aman

| Jangkar | Letak | Catatan |
|---|---|---|
| bawah-kiri | x 72, kaki di y 1460 | menutup konten kiri-bawah; taruh konten utama di kanan |
| bawah-kanan | x 952 − lebar, kaki di y 1460 | menutup caption kanan |
| atas-kanan | x 952 − lebar, kepala di y 240 | hanya bila teks utama ada di bawah |

Bubble **tidak boleh keluar** x 72–952 / y 240–1460. Di Reels, area di luar itu tertutup UI.

## Lapisan z dan track

```html
<!-- dalam scene sub-composition: waktu LOKAL, bukan global -->
<div id="cut" style="position:absolute; inset:0; z-index:30">
  <video
    id="pres-s3"
    src="./assets/presenter/s3.webm"
    data-start="0"
    data-duration="7.5"
    data-media-start="2.4"
    data-track-index="31"
    muted
    playsinline
  ></video>
</div>
```

| Aturan | Kalau dilanggar |
|---|---|
| `data-start`+`data-duration` di `<video>` **atau** wrapper, **jangan dua-duanya** | lint `video_nested_in_timed_element`: frame salah + clip hilang di tengah slot |
| `muted` untuk footage tanpa suara; `data-has-audio="true"` tanpa `muted` bila suaranya dipakai | lint `video_missing_muted`; atau audio terbuang |
| Jangan pernah tambah `crossorigin` | lint `media_crossorigin_breaks_preview` |
| `data-track-index` unik antar semua media | lane kacau di Studio |
| Jangan tween `opacity`/`autoAlpha`/`visibility` pada elemen yang punya `data-start` | framework memaksa `opacity:1` pada clip aktif — animasi hilang diam-diam |
| Gerakkan **wrapper** (tanpa `data-*`) untuk scale/translate | — |
| Timeline sub-comp hanya menjangkau subtree-nya | taruh `<video>` **di dalam** scene file, bukan di `index.html` |

**Presisi trim.** `data-media-start` = offset ke dalam file sumber (detik). `data-duration` = panjang
di timeline. Mulai frame sumber di detik 2.4, tampil 7.5 detik:
`data-media-start="2.4" data-duration="7.5"`. Jangan hitung konversi fps sendiri — runtime yang
menyesuaikan.

**Pemakaian ulang satu file.** Satu file WebM boleh muncul di beberapa scene dengan `data-media-start`
berbeda dan `id` berbeda. Tidak perlu memotong file fisik.

## Gerak (yang membedakan presenter dari selebaran)

| Elemen | Gerak yang benar | Gerak yang salah |
|---|---|---|
| Badan/orang | skala `1.00 → 1.03` sepanjang slot, `sine.inOut` | parallax besar, rotasi, bounce |
| Posisi | drift `≤ 8px` | berayun mengikuti musik |
| Cut antar shot | **hard cut** | crossfade orang (ghost/dua wajah) |
| Mask/tepi cutout | diam | tepi berdenyut |
| Latar HyperFrames | parallax penuh seperti biasa | ikut turun — orangnya terasa ditempel |

Realisme datang dari orangnya, bukan animasi. Semakin banyak animasi pada tubuh, semakin palsu.
Kamera HyperFrames tetap bergerak; **orangnya nyaris diam**. Kontras itu yang menjual komposit.

## Teks di belakang orang (P2)

`check` mengukur oklusi teks di bawah `<video>` cutout **per kata terhadap alpha frame**: tertutup
sebagian = info, satu kata **80% tertutup** atau dua kata bersebelahan masing-masing setengah
tertutup = **error**. Ini ter-gate otomatis, bukan soal selera.

Penempatan yang lolos: teks utama di **sisi berlawanan** dari badan. Kalau orang di kanan, teks PK
di 520px pertama. Jangan menaruh kalimat panjang melintang dada.

## Verifikasi alpha (wajib — dan cara ceknya tidak intuitif)

**Terukur di mesin ini (1 Nov 2026), dua jebakan yang membuat pemeriksaan naif memberi hasil salah:**

| Yang dilakukan | Hasil | Kenapa menyesatkan |
|---|---|---|
| `ffprobe ... pix_fmt` | `yuv420p` | **Normal.** VP9 menyimpan alpha sebagai *side stream*, bukan di `pix_fmt`. Clip yang alpha-nya sempurna pun melaporkan `yuv420p`. Jangan jadikan ini penentu. |
| `ffmpeg -vf format=rgba` lalu baca byte ke-4 | alpha **255 semua** | Decoder default **mengabaikan** side-stream alpha. Terlihat seperti "alpha hilang" padahal ada. |
| `ffprobe ... stream_tags=ALPHA_MODE` | `1` | **Ini penandanya.** `ALPHA_MODE=1` = alpha ada. |
| `ffmpeg -c:v libvpx-vp9 -vf alphaextract` | alpha benar (0…255) | Decoder yang menghormati alpha. Ini cara ukur yang sah. |

Cek yang benar:

```bash
# 1. penanda alpha
ffprobe -v error -select_streams v:0 -show_entries stream_tags=ALPHA_MODE -of csv=p=0 assets/presenter/s3.webm
# → 1 = ada alpha. kosong/0 = alpha hilang: jangan render, ulangi dengan --quality best

# 2. ukur alpha sebenarnya (WAJIB -c:v libvpx-vp9)
ffmpeg -v error -c:v libvpx-vp9 -ss 1 -i assets/presenter/s3.webm -frames:v 1 \
  -vf "alphaextract,format=gray" -f rawvideo -y /tmp/alpha.raw
node -e '
const b=require("fs").readFileSync("/tmp/alpha.raw");
let amin=255,amax=0,vis=0;
for(const a of b){if(a<amin)amin=a;if(a>amax)amax=a;if(a>200)vis++;}
console.log("alpha min:",amin,"max:",amax,"subjek-solid:",(100*vis/b.length).toFixed(1)+"%");'
```

Lulus bila `max` ≈ 255 (orang solid) **dan** `subjek-solid` **1–70%**. Semua 255 = alpha hilang;
`subjek-solid` 0% = mask kosong (cutout tak terlihat — kegagalan senyap yang paling sering lolos).
Subjek kepala+dada di 9:16 biasanya 15–40%.

### `check` tidak menangkap cutout kosong

Diuji pada cutout dengan `subjek-solid` 0.00% di semua frame: `lint` 0 error, `check` →
**`Check passed`**, layout 0 issue. Jadi `check` **bukan** bukti cutout benar. Wajib tambah satu
bukti visual: render satu frame cutout (`-vf format=rgba -frames:v 1`) dan lihat dengan Read.
Kalau transparan semua, atau sosoknya terpotong separuh, ulangi.

### Bukti bahwa pipeline MP4 menghormati alpha (terverifikasi 2 Nov 2026)

Diuji dengan klip yang **separuh solid, separuh transparan** (alpha 255 di x<540, 0 di x≥540) di
atas latar biru pekat, dirender ke MP4:

| Area | Hasil piksel | Arti |
|---|---|---|
| x < 540 (klip alpha 255) | `[0,251,0]` hijau | piksel klip tampil |
| x ≥ 540 (klip alpha 0) | `[0,0,253]` biru | **latar tembus** |

Kesimpulan: HyperFrames merender `<video>` WebM ber-alpha ke MP4 dengan alpha dihormati. **Dan tes
ini sengaja dipilih setengah-transparan** supaya tiga kegagalan bisa dibedakan:

| Gejala | Penyebab |
|---|---|
| kiri hijau, kanan biru | benar (alpha dihormati) |
| kiri **dan** kanan biru | klip tidak ter-render / path salah / mask kosong |
| kiri **dan** kanan hijau | alpha diabaikan (mis. dikonversi ke `yuv420p` di tengah jalan) |

Kalau memverifikasi cutout asli, ingat konsekuensinya: cutout yang mask-nya kosong menghasilkan
"biru semua" — sama seperti klip hilang. Karena itu `subjek-solid` di atas wajib diukur, bukan
hanya dilihat.

## Biaya waktu (terukur)

`remove-background` berjalan **CPU-only** di laptop ini (`remove-background --info` → provider `cpu`,
peak RAM ~1.5 GB, `onnxruntime-node` + model `u2net_human_seg` diunduh sekali di run pertama).

**Pengukuran nyata (2 Nov 2026)** — tiga klip isi sama, **96 frame identik** @24fps:

| Resolusi | Waktu | Per frame |
|---|---|---|
| 270×480 | 115 s | 1,20 s |
| 540×960 | 117 s | 1,22 s |
| 1080×1920 | 143 s | 1,49 s |

**Biayanya per-frame tetap, bukan per-piksel.** 540p (seperempat piksel) hanya ~18% lebih cepat dari
1080p. Satu-satunya tuas yang berarti adalah **jumlah frame = fps × durasi**.

| Footage | Frame | Perkiraan |
|---|---|---|
| 8 s @ 24fps | 192 | ~4 menit |
| 30 s @ 24fps | 720 | ~15–18 menit |
| 60 s @ 24fps | 1440 | ~30–35 menit |

Aturannya:

- Cutout hanya untuk shot yang **memang** butuh (P2). P1 dan P3 pakai footage apa adanya — gratis.
- **Turunkan FPS, bukan resolusi.** 30→24fps hemat 20%; →15fps hemat 50%. Untuk P2 full-frame
  pertahankan 1080p — 18% tidak sebanding dengan kehilangan detail.
- Resolusi kecil hanya sah untuk **P3 bubble**, karena di sana tujuannya memang kecil.
  Setelah blend 60fps, bedanya nyaris tak terlihat pada bubble.
- Jalankan di background dan beri tahu user estimasinya. Jangan biarkan sesi diam lama tanpa kabar.
- Jangan jalankan removal dan render 120fps bersamaan (RAM 8 GB).

## Kebersihan piksel

`check` menolak teks di dalam footage (`text_below_floor`, `line_unread`, kontras). Jadi:

- Tidak ada caption bakar di footage. Caption digambar HyperFrames.
- Tidak ada logo pihak ketiga, watermark, atau UI OS di frame.
- Latar asli (kalau P1) harus sudah disiapkan saat rekam: bukan kamar berantakan.

Kalau footage P1 memang ingin dipakai apa adanya dan ada teks di dalamnya, tutup dengan
`media-use` treatment — jangan mengandalkan CSS untuk menyembunyikan.