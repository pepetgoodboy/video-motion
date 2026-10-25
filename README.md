# Video Motion — HyperFrames

Pipeline video pendek (9:16) dari brief markdown → MP4. Tanpa voice: teks di layar + musik + SFX.

## Cara pakai

Kirim prompt:

```
Bang buatkan video reels <durasi> detik terkait <topik>.
Ini brief nya: D:\Project\video-motion\source\brief-<nama>.md
```

Saya yang jalankan sisanya: baca brief → scaffold → ambil BGM/SFX → tulis komposisi →
lint → check → render → verifikasi frame dari MP4.

## Struktur & biaya disk

```
video-motion/
├── source/              # brief .md (input)                    ~30 KB/brief
├── shared/              # aset lintas video (font + SFX)       ~700 KB total
└── videos/<slug>/       # satu project per video
    ├── index.html + compositions/   # ~90 KB — teks, tidak pakai disk
    ├── assets/bgm/track.mp3         # ~2.3 MB (dikompres 192k)
    └── renders/<slug>.mp4           # ~10 MB
```

**Tidak ada duplikasi tooling.** CLI HyperFrames tidak di-install per folder — `npx hyperframes@0.8.169`
mengambil dari cache npm global (`~/AppData/Local/npm-cache`, sudah 2.1 GB dan dipakai bersama).
Tidak ada `node_modules` di project mana pun. Skills ada di `~/.agents/skills` (5.7 MB) sekali saja.

Jadi biaya riil per video baru ≈ **13 MB** (BGM 2.3 + render 10 + teks 0.1), bukan ratusan MB.
Yang bisa dihapus kapan saja tanpa merusak project: `renders/*.mp4` (bisa render ulang),
`.hyperframes/artifacts/` (snapshot/check), `.waveform-cache/`, `.thumbnails/`.

## Perintah

```bash
cd videos/<slug>

npx hyperframes@0.8.169 lint
npx hyperframes@0.8.169 check
npx hyperframes@0.8.169 snapshot --at 1,5,10
npx hyperframes@0.8.169 preview --background
npx hyperframes@0.8.169 render --quality looks --video-bitrate 6M -o renders/<slug>.mp4
```

`--video-bitrate 6M` penting: tanpa itu encoder jatuh ke ~290 kbps dan gerakan terlihat patah.
Dengan 6M hasilnya ~1.2 Mbps untuk konten grafis gelap seperti ini.

## Aturan komposisi (yang bikin gagal kalau dilanggar)

| Aturan | Kenapa |
|---|---|
| Root `data-composition-id` = key `window.__timelines[id]` = host `data-composition-id` | Mismatch → render diam 45s lalu frame statis |
| `<style>`/`<script>` di **dalam** `<template>` untuk sub-composition | `<head>` dibuang saat mount |
| Root sub-comp di-style via `#root`, bukan class | lint error |
| **Jangan pakai mask `overflow:hidden` untuk reveal teks besar** | Font display punya descender; mask memotongnya jadi teks tampak "lag"/patah di tengah animasi |
| Pakai `gsap.set(...)` baseline + `fromTo(..., immediateRender: false)` | Tanpa ini state akhir muncul di t=0 |
| `data-track-index` unik per audio | Overlap → audio bertumpuk |
| Font wajib `@font-face` lokal | `font_family_without_font_face` |
| Tidak ada `Math.random`/`Date.now`/`repeat:-1` | Render tidak deterministik |
| Grain: `opacity ≤ 0.03`, `baseFrequency ≤ 0.45` | Noise per-piksel mahal di encoder → bitrate jatuh → gerakan patah |
| Teks minimum 32px, area konten x 72–952, y 240–1460 | Terbaca di HP, tidak ketutup UI Reels |
| **Selector CSS: `#id .class` menargetkan TURUNAN, bukan elemen itu sendiri** | Kalau `<span id="salah" class="bric2">`, maka `#salah .bric2` tidak match — teks jatuh ke ukuran default. Pakai `.bric2` langsung |
| **Animasi ketik: capture nilai di dalam loop build** | `tl.call(() => el.textContent = acc + ch)` membaca `acc` saat callback jalan (sudah final) → teks tampil penuh + 1 karakter acak. Simpan `const snapshot = acc + ch` dulu |
| **Easing flat = frame beku** | `expo.inOut` hampir tidak berubah di awal/akhir → beberapa frame identik. Pakai `power2.inOut` |
| **Scene statis >0.5s terasa patah** | Diagram/tabel yang tidak berubah = dead air. Isi dengan aliran request berulang, scan sweep, atau pulse elemen |
| **Cek frame hitam total** | Transisi scene sering menyisakan 0.5-0.7s layar kosong. Ukur: decode grayscale, hitung frame dengan max brightness <40. Target: 0 |
| **Scene tiling tanpa celah** | `data-start` + `data-duration` tiap scene harus tepat menyambung ke scene berikutnya. Celah = layar hitam |
| **Render dengan `PRODUCER_LOW_MEMORY_MODE=false`** | RAM 8 GB memicu low-memory mode → software GPU + forceScreenshot. Matikan agar pakai GPU hardware |
| **Encode ulang dengan B-frame + faststart** | HyperFrames keluarkan 0 B-frame, GOP 7s. Re-encode: `-bf 3 -g 30 -movflags +faststart` untuk playback mulus di HP |

## Kalau video terasa patah

**Cek player dulu.** Windows Media Player tersendat memutar 1080×1920@60fps dan terlihat seperti patah.
Pakai **VLC** atau **Chrome** — video yang sama lancar di sana.

Kalau masih patah di VLC, baru periksa file:

```bash
# hitung frame beku (diff antar frame < 0.02) — target sedikit mungkin
ffmpeg -v error -i out.mp4 -vf "scale=270:480,format=gray" -f rawvideo -y raw.raw
```

Penyebab paling umum: scene tidak punya elemen bergerak di 0.5–2 detik pertama atau 0.2 detik terakhir.

## Render 60fps + motion blur

HyperFrames di Windows hanya punya capture `screenshot` (mode `beginframe` hanya Linux).
Untuk hasil mulus: render 120fps, lalu blend pasangan frame jadi 60fps.

```bash
PRODUCER_LOW_MEMORY_MODE=false npx hyperframes@0.8.169 render --quality looks --video-bitrate 14M --fps 120 -o renders/raw120.mp4

ffmpeg -i renders/raw120.mp4 -filter_complex "[0:v]split[a][b];[a]select='not(mod(n,2))',setpts=N/60/TB[a1];[b]select='mod(n,2)',setpts=N/60/TB[b1];[a1][b1]blend=all_mode=average[out]" -map "[out]" -map 0:a -c:v libx264 -preset slow -crf 19 -maxrate 8M -bufsize 16M -bf 3 -profile:v high -level 5.1 -pix_fmt yuv420p -g 60 -keyint_min 60 -movflags +faststart -r 60 -c:a copy -y renders/final.mp4
```

## Audio

- BGM: `node ~/.agents/skills/media-use/audio/scripts/audio.mjs --request <req> --only bgm`
- Kompres BGM setelah ambil: `ffmpeg -i track.mp3 -c:a libmp3lame -b:a 192k out.mp3`
- SFX: `searchSounds()` + `downloadTo()` dari `~/.agents/skills/media-use/audio/scripts/lib/heygen.mjs`
- Master limiter: `data-fx-chain` `truepeak` di root, `ceiling: -2`
- Tanpa voice → **tidak ada** voiceover carve

## Verifikasi (wajib)

Snapshot bawaan bisa menampilkan frame yang sudah termount walau render asli berbeda — **MP4 adalah kebenaran**:

```bash
ffmpeg -v error -ss <t> -i renders/<slug>.mp4 -frames:v 1 -y frame.png
```

Cek juga: `ffprobe` durasi = target, `ffmpeg -af ebur128` loudness ≈ -14..-23 LUFS, peak < -1 dB.

## Credential

`~/.heygen/credentials` (OAuth, plan free). Kalau expired:

```bash
wsl -d Ubuntu -- bash -c 'export PATH="$HOME/.local/bin:$PATH"; heygen auth login --oauth'
```

lalu copy `~/.heygen/credentials` WSL ke `C:\Users\<user>\.heygen\credentials`.
