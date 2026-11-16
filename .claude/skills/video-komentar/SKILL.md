---
name: video-komentar
description: Buat video komentar 9:16 — presenter (user sendiri) bicara BEBAS di depan kamera HP, lalu disunting jadi short dengan sisipan KOLASE di kata kunci (foto hitam-putih bertepi sobek, lingkaran sinar, grid gelap, logo pop, judul kuning bercahaya, halftone, cap merah) + caption satu kata + suara dibersihkan dari noise. Dipakai saat user menaruh rekaman dirinya di footage/<kanal>/ dan minta "video komentar", "bahas Persib", "video presenter kolase", "bersihkan suaranya". Profil kanal (warna, aset, hashtag) di kanal/<nama>/kanal.json. Bukan untuk edukasi berbasis brief dengan presenter (video-reels-presenter) atau serial 3D (video-series).
---

# /video-komentar — rekaman bicara bebas + kolase → MP4

Teruji end-to-end (tes 11 s kanal persib, 15 Nov 2026), dua mode tata letak — contoh build yang lolos QA:
`kanal/persib/contoh/build-test-01.mjs` (sisipan penuh) dan `kanal/persib/contoh/build-test-01-overlay.mjs` (overlay). Aturan komposisi & audio umum: `.claude/skills/video-reels/SKILL.md`.
Probe footage & cek lip-sync: `.claude/skills/video-reels-presenter/SKILL.md` (rujuk, jangan salin).

## Kapan

| Permintaan | Skill |
|---|---|
| User bicara bebas di kamera, disunting jadi komentar + kolase | **`/video-komentar`** |
| Edukasi berbasis brief, presenter di sebagian scene | `/video-reels-presenter` |
| Tanpa orang di frame | `/video-reels` · serial 3D: `/video-series` |

Input: `/video-komentar <kanal> <folder-rekaman> ["topik"]`. Rekaman kosong → berhenti, beri checklist §1.

## Prinsip

1. **Suara = rekaman user**, dibersihkan tapi tidak diganti TTS. Kata tidak ditambah/diubah; boleh memotong jeda.
2. **Talking head = jangkar ±40% durasi**; sisanya sisipan kolase sementara suara jalan terus; tidak ada momen diam > 3 s.
3. **Fakta di layar** hanya dari kata user. Angka/nama tambahan wajib dicek ≥ 2 sumber; ragu → jangan tampilkan.
4. Gaya & warna dari `kanal/<k>/kanal.json`; aset (logo, foto) dari `kanal/<k>/aset/` (disiapkan user, di-ignore git).

## §1 Checklist rekam

HP tegak 9:16 di tripod setinggi mata, ±1 m; kepala–perut dengan ±15% ruang di atas kepala; cahaya dari depan/samping;
ruangan tenang; diam 1 s di awal & akhir (dipakai untuk mengukur noise); kalimat pertama = yang paling "nendang".
Simpan ke `footage/<k>/<tanggal-topik>/`.

## Langkah 1 — scaffold, video, suara bersih

```bash
npx -y hyperframes@0.8.169 init videos/<slug> --non-interactive --example=blank --skill=general-video --resolution=portrait
# video HP (sering HEVC .MOV) → H.264 tanpa audio; suara diproses terpisah
ffmpeg -i <rekaman> -an -c:v libx264 -preset slow -crf 16 -pix_fmt yuv420p -r 30 -movflags +faststart assets/presenter/pv.mp4
ffmpeg -i <rekaman> -vn -ac 1 -ar 48000 assets/audio/raw.wav
```

**Bersihkan noise** (rekaman HP tanpa mic; noise biasanya dengung rendah < 500 Hz):
```bash
ffmpeg -i assets/audio/raw.wav -af "highpass=f=95:poles=2,highpass=f=95:poles=2,afftdn=nr=18:nf=-46:tn=1,equalizer=f=300:t=q:w=1.2:g=-2.5,equalizer=f=3200:t=q:w=1.0:g=2.5,agate=threshold=0.006:ratio=3:attack=5:release=160:range=0.3" qc/proc.wav
# lalu loudnorm DUA PASS mode linear ke -16 LUFS (ukur → terapkan measured_* + linear=true)
```
- Ukur noise di bagian **benar-benar hening** (detik pertama), bukan persentil (rekaman bicara terus = persentil
  menangkap suara pelan). Tes: hening −51 → −58,8 dB, jarak suara–noise 28,6 → 42,5 dB.
- **Jangan** kompresor + loudnorm dinamis setelah denoise: menaikkan noise di sela kata (jarak malah turun ke 17 dB).
- Buat file A/B (mentah lalu bersih) untuk didengar user: transkrip Whisper **bukan** ukuran kejelasan yang andal.

## Langkah 2 — transkrip per kata + koreksi

`npx --yes hyperframes@0.8.169 transcribe <rekaman> -d qc/tr -e whisper -m small -l id` → `qc/tr/transcript.json`.
Whisper salah di nama/istilah bola (tes: "persih persocian" = Persib vs Shan, "Shopikak" = Shopee Cup, "Amis" = Kamis).
**Koreksi ejaan manual**, waktu tetap dari Whisper; kata gabungan dipecah dengan perkiraan waktu di dalam rentangnya.

## Langkah 3 — pilih mode, lalu rencana sisipan

| Mode | Presenter | Grafis | Kapan |
|---|---|---|---|
| **Sisipan penuh** | ±40% durasi | sisipan layar penuh (grid gelap) menggantikan presenter 2–4 s | paling mirip referensi, kolase dominan |
| **Overlay** | **100% durasi** | stiker di zona aman: atas kepala (y 240–520) + kiri/kanan kepala; pita gelap di atas saat ada stiker | user ingin "selalu muncul" |
| **Koran** | **100% durasi** | halaman surat kabar: kertas krem bertekstur, masthead serif, headline + kicker, foto dibingkai kertas sobek, cap merah miring, ticker berjalan di bawah | variasi editorial; teks koran harus diberi alas kertas agar terbaca di atas video |

Tanyakan mode bila user belum memilih. Zona aman dihitung dari frame rekaman: **jangan menutup wajah**.
Ukur: puncak kepala & lebar kepala dari frame (ambang gelap), lalu taruh stiker di atas puncak kepala atau di luar lebar kepala.
Contoh koran: `kanal/persib/contoh/build-test-01-koran.mjs`; tekstur kertas dibuat deterministik (PIL, seed tetap).

Per kalimat/kata kunci: talking head atau sisipan (2–4 s). Kalimat pertama → **judul hook** di atas (label kecil +
2 baris, satu kata di plat merah). Sisipan di nama klub/lawan, tempat, kompetisi, hari/skor. **Semua elemen sebuah
sisipan harus jatuh di dalam jendela sisipannya** (tes: cap "KAMIS" di 8,41 s hilang karena sisipan berakhir 8,40 s).

## Langkah 4 — aset & perlakuan foto

- Logo PNG transparan dipakai apa adanya (tidak digambar ulang). Pakai **file terpisah** bila logo yang sama muncul 2×
  (lint `duplicate_media_discovery_risk`).
- **Foto (hitam-putih, halftone): PANGGANG perlakuannya jadi gambar diam** lewat shader resmi:
  komposisi 1 gambar seukuran target → `npx --yes hyperframes@0.8.169 media-treatment --selector "#img" --grading '<json>' --apply`
  → `snapshot --at 0.5` → PNG itu yang dipakai di video. Di 0.8.169, perlakuan runtime pada `<img>` di dalam sisipan
  tampil di snapshot tapi **tidak ikut di MP4** (diuji). Nilai teruji: hitam-putih `{"adjust":{"saturation":-1,"contrast":0.3,"blacks":-0.12,"whites":0.06}}`,
  halftone = resep `Editorial Halftone` (`halftone 0.94, halftoneSize 0.36`). Baca `/media-use` → `media-treatments.md`.
- `clip-path` di atas media berperlakuan mematikan perlakuan → **tepi sobek di lapisan kertas terpisah di belakang foto**.

## Langkah 5 — komposisi

- Video: `<div id="thw"><video id="pv" class="clip" src="assets/presenter/pv.mp4" data-start="0" data-duration="D" muted playsinline></video></div>`
  — video ber-waktu sendiri (frame diekstrak renderer = sinkron), wrapper **tanpa** `data-start`; punch-in lewat wrapper,
  **maks 1,08** (lebih dari itu 1080p buram). Suara bersih = `<audio>` terpisah mulai 0.
- Sisipan: latar grid gelap, lingkaran sinar (`repeating-conic-gradient` + mask cincin), logo `back.out(1.8)`,
  judul kuning bercahaya per huruf, foto di atas kertas sobek, cap merah. Caption satu kata (Archivo ramping, y ±1360).
- **Mode koran**: header bertumpuk wajib dihitung tinggi barisnya (masthead → kicker → headline → garis); caption koran
  dan label foto butuh alas kertas (teks di atas video tidak terbaca). Tickertape: dua salinan teks, `x` linear dari waktu.
- **Mode overlay**: logo di atas alas lingkaran krem + cincin putih (gaya stiker, tanpa filter CSS); foto & guntingan
  koran halftone di atas kepala; caption di atas **alas gelap semi-transparan** (rekaman sering punya tulisan kaos di
  posisi caption); zoom wrapper bergantian per segmen (1,00–1,08) = rasa jump-cut tanpa memotong.
- Lint `nested_structure_needs_subcomposition` = peringatan struktur Studio, render aman; untuk video 45–60 s pecah
  tiap sisipan jadi sub-composition.

## Langkah 6 — render, QA, posting

1. Snapshot banyak titik bisa menangkap frame sebelum gambar siap → cek ulang titik mencurigakan satu per satu.
2. Render 2D standar: `--fps 120` → blend 60 (`CLAUDE.md`). Terukur: 11 s = 7 menit (±40 s render per detik video).
3. Final: SFX menaikkan loudness (tes −12,9) → `volume` ke −15 LUFS saat blend. `qa-video.mjs`, `qa-variety.py`.
4. **Lip-sync**: bandingkan frame MP4 dengan frame sumber (zoom yang sama) untuk geseran −2…+2 frame; terbaik = 0.
5. Cek frame MP4: foto benar hitam-putih/halftone, caption tidak menutup mulut, judul tidak menutup kepala, ejaan nama.
6. Posting Facebook: 3 varian caption + 3–5 hashtag dari `kanal.json → posting` + komentar pin + cover (pola `/video-series` Langkah 10).

## Catatan hak cipta (ingatkan sekali, keputusan user)

Cuplikan siaran pertandingan berisiko terdeteksi otomatis di Facebook. Logo resmi & foto disiapkan user.
