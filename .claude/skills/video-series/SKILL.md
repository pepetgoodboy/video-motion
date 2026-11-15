---
name: video-series
description: Buat episode VIDEO SERIAL 3D 9:16 (drama bersambung, tokoh tetap) dari folder series/<nama>/ — mis. "/video-series anak-pertama 2", "buat Anak Pertama Eps 2 HP Baru Raka", "lanjut episode berikutnya", atau merintis serial baru. Gaya, format, dan suara DIKUNCI di series.json + BIBLE.md (Anak Pertama saat ini = arah ref3 — tokoh balok, wajah dilukis, matahari lewat jendela, glow + blur, tokoh utama bercerita sendiri "aku", caption 2–3 kata kapital, ditutup BERSAMBUNG). Pipeline - naskah → VO Cartesia → timing per kata → build dari template three.js → snapshot + gate → render 30 fps → final + QA MP4 → tambalan per scene → catat log. Bukan untuk video topik/edukasi sekali jadi (itu video-reels).
---

# /video-series — episode serial 3D → MP4

Skill ini **bukan pengganti** `/video-reels`. Aturan komposisi HyperFrames, audio (Cartesia, BGM, SFX), dan
QA MP4 tetap dari `.claude/skills/video-reels/SKILL.md` + `CLAUDE.md`. Di sini hanya yang khas serial 3D.
Mesin, framing, overlay, dan jebakan: **`references/serial-3d.md`** (baca sebelum menulis apa pun).

## Kapan dipakai

| Permintaan | Skill |
|---|---|
| Topik/brief sekali jadi (edukasi, tips, kisah satu kali) | `/video-reels` |
| Episode serial dengan tokoh tetap (folder `series/<nama>/` ada) | **`/video-series`** |
| Serial baru, foldernya belum ada | **`/video-series`** §5 (rintis dulu, butuh keputusan user) |

## Input

- `/video-series <seri> <n>` → episode ke-n; judul & premis dari `BIBLE.md` §6.
- `/video-series <seri> "<judul/premis>"` → nomor = episode terakhir di `BIBLE.md` §9 + 1.
- Bahasa bebas ("buat Anak Pertama Eps 2", "lanjut episode berikutnya") → seri = satu-satunya folder di
  `series/`; kalau lebih dari satu, tanya.

## Langkah 0 — baca dulu (wajib)

1. `series/<seri>/series.json` — `lock` (gaya + `look`), `format`, `cast` (suara), `episode_beats`, `content_rules`.
2. `series/<seri>/BIBLE.md` — tokoh, dunia, gaya aktif (Anak Pertama: §4c), ide episode (§6), log (§9).
3. Naskah episode sebelumnya di `series/<seri>/naskah/` — kontinuitas: cliffhanger terakhir = hook episode ini.
4. `references/serial-3d.md` — urutan kerja (§2), framing (§4), overlay (§5), jebakan (§8).

**Jangan memilih gaya, suara, atau format sendiri.** Semua dari lock. Mau beda → tanya user dulu.

## Langkah 1–9 — produksi episode

Ikuti `references/serial-3d.md` §2 apa adanya (berisi perintah lengkap). Ringkasan:

| # | Hasil | Catatan |
|---|---|---|
| 1 | `videos/<seri>-eps<n>/` + `direction.json` | `tools/pick-direction.mjs --series`, `hyperframes@0.8.169 init` |
| 2 | `vo-script.json` + `series/<seri>/naskah/eps<n>.md` | aturan naskah di bawah; `naskah-check.mjs` bukan FAIL |
| 3 | VO + `timing.json` + `word-timing.json` | kuota Cartesia habis → `--key-env CARTESIA_API_KEY_n`; **jangan** tambah kredit tanpa izin |
| 4 | `build.mjs` dari `series/<seri>/template/build-episode.mjs` | ganti SETS / LIGHT / CHARS / SPEAK / S / SPK / sisipan |
| 5 | snapshot tengah tiap shot + `qa-variety.py` pra-render | perbaiki sampai bersih (snapshot ±1 menit, render ±80) |
| 6 | render penuh 30 fps di background | cek log + mtime, bukan exit code |
| 7 | final: loudness → −15 LUFS, `qa-video.mjs --fps 30`, `qa-variety.py`, frame dari MP4 | FAIL = perbaiki, bukan lapor |
| 8 | revisi lewat `tools/patch-splice.mjs` (+ `--with` tambalan lama) | bukan render penuh |
| 9 | `BIBLE.md` §9, `STYLE-LEDGER.md`, file `SUPERSEDED` di versi lama | |
| 10 | caption + hashtag + komentar pin + cover | aturan di bawah; tulis ke `series/<seri>/naskah/eps<n>.md` bagian "Posting" |

## Aturan naskah (format `narator-aku`, Anak Pertama)

- Tokoh utama bercerita sendiri ("aku", suara dari `cast`), mulai detik 0; suara mengisi ±85–95% durasi,
  ±110 kata/menit, total 90–100 s.
- Kalimat pertama = hook berisi angka/benda/konflik. Satu kalimat = satu shot. Benda konkret membawa cerita.
- Kutipan tokoh lain dibacakan narator dengan caption berlabel nama + warna; hanya 1–2 kutipan emosional
  memakai suara tokohnya sendiri (mis. Ibu).
- Penutup: pertanyaan ke penonton (ajak komentar) → cliffhanger episode berikutnya → kartu "BERSAMBUNG…".
- Patuhi `content_rules` (Anak Pertama: soal uang = pilihan tokoh, bukan saran keuangan).

## Langkah 10 — caption & hashtag (posting)

Platform & tag tetap dari `series.json → posting` (Anak Pertama: Facebook Reels). Muat skill `m-copy` untuk pola hook.

- **3 varian caption** dengan pola hook berbeda (angka/pain, panggil penonton, pengakuan tokoh) untuk uji A/B.
- **Baris pertama** = hook pendek (±90 karakter) dari kalimat pertama naskah, karena hanya awal caption yang
  terlihat sebelum dipotong. Lalu 1–2 kalimat konteks **tanpa membocorkan twist**.
- **Pertanyaan ke penonton** = pertanyaan yang sama dengan di video. Lalu baris seri
  `ANAK PERTAMA · Eps n: Judul` + ajakan ikuti untuk episode berikutnya (judul dari `BIBLE.md` §6).
- **Hashtag 3–5 di caption** (bukan di komentar): tag tetap seri + maks 1 tag khas episode. Tanpa #fyp/#viral.
- **Komentar pin**: pertanyaan pilihan ganda yang memancing jawaban.
- **Cover**: frame judul episode → `ffmpeg -ss <t judul> -i <final> -frames:v 1 -q:v 2 renders/cover-eps<n>.jpg`, lalu lihat.
- Bahasa penonton, tanpa klaim/angka karangan; patuhi `content_rules`.

## Gerbang sebelum bilang "selesai"

- 0 frame hitam, 0 blok beku ≥ 0,5 s (`qa-video.mjs --fps 30`), loudness −14…−16 LUFS, `qa-variety` tanpa FAIL.
- Frame dari MP4 dilihat: alis sedih tidak tampak marah, adegan malam benar-benar gelap, wajah tidak tertutup
  kartu/caption, tokoh berpose "phone" memegang HP, lingkaran 3D (pikiran/video call/avatar) berisi wajah.
- Laporan ke user: path final + cover, caption varian A siap tempel (B/C di file naskah), durasi, hasil gate,
  waktu render, bug yang ditemukan + diperbaiki, yang belum di-commit.

## §5 Merintis serial baru

Butuh keputusan user — **tanya, jangan tebak**: konsep/logline, 3–6 tokoh (usia, peran, ciri visual),
suara per tokoh (`video-reels/references/suara.md`), gaya (default: mesin balok ala ref3), format narator, durasi.

1. `series/<baru>/BIBLE.md` + `series.json` — salin struktur dari `series/anak-pertama/`.
2. Mesin 3D masih di `series/anak-pertama/3d/`. Serial kedua = saatnya pindah ke `shared/3d/`
   (`serial-3d.md` §9). Tokoh baru = entri `SPEC` di `blok.js`; uji di `poc-blok.html?mode=lineup` dan
   **tunjukkan lineup ke user** sebelum episode 1.
3. Template episode: salin `series/anak-pertama/template/build-episode.mjs` lalu sesuaikan.
4. Pilot: uji 1 shot (still) → user setuju → episode penuh.

## Referensi

- `references/serial-3d.md` — mesin, urutan kerja, framing, overlay, tambah tokoh/set, jebakan.
- `.claude/skills/video-reels/SKILL.md` — aturan komposisi & audio umum; `references/suara.md` — cast & kuota.
- Tools: `patch-splice.mjs`, `word-timing.mjs`, `qa-video.mjs`, `qa-variety.py`, `contact-sheet.sh`,
  `pick-direction.mjs --series`, `cartesia-vo.mjs --key-env`.
