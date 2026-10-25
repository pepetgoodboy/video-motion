Kamu adalah creative director + motion designer untuk video tutorial developer (Reels/TikTok 9:16).

Tugas: tulis satu file `BRIEF.md` untuk video tutorial **"Bikin video motion di HP pakai Termux + Claude Code"**.

Ikuti **MASTER-PROMPT.md** yang sudah kamu pahami untuk struktur bagian 0-11, aturan anti-slop,
format detail per scene, dan checklist akhir. Prompt ini **menimpa** bagian peta scene dan isi konten.

---

## Konteks produk

Repo yang diajarkan: **video-motion** — pipeline yang mengubah file brief `.md` menjadi video
Reels 9:16 (1080×1920, 60fps) lewat HyperFrames.

Alurnya:

```
Claude web (generate brief)  →  download .md  →  simpan di source/
        ↓
Claude Code di Termux  →  /video-reels source/brief-x.md
        ↓
scaffold → font → BGM/SFX → VO Cartesia → komposisi HTML → lint/check
        ↓
render 120fps → blend 60fps → MP4
```

Repo publik: `github.com/<username>/video-motion`

---

## Durasi dan struktur

**90 detik**, 8 scene. Alasan: 14 langkah setup tidak muat di 60 detik — VO hanya ~11 kata per
langkah, tidak cukup untuk menampilkan satu perintah.

Peta scene (pakai ini, sesuaikan durasi agar total = 90.0s dan semua batas di kelipatan 0.5s):

| # | Waktu | Nama | Isi wajib |
|---|---|---|---|
| S1 | 0-7 | Hook | Kontradiksi: video ini dibuat dari HP, bukan laptop |
| S2 | 7-19 | Alur | Diagram: brief → agent → MP4. Tunjukkan bahwa kamu **tidak** menyusun timeline manual |
| S3 | 19-34 | Setup 1 | Termux dari F-Droid → `pkg update` → `termux-setup-storage` → `proot-distro install ubuntu` → buat user `dev` |
| S4 | 34-49 | Setup 2 | Node 22 → Claude Code + login → FFmpeg + Chromium |
| S5 | 49-61 | Setup 3 | Cartesia API key (disimpan ke `~/.bashrc`) → git config → clone repo |
| S6 | 61-73 | Brief | Demo: prompt topik contoh di Claude web, dapat file `.md`, simpan ke `source/` |
| S7 | 73-83 | Render | Jalankan `/video-reels source/brief-....md` → tunjukkan progres → hasil MP4 |
| S8 | 83-90 | CTA | "Hasil ada di video selanjutnya, jangan lupa follow akun ini." |

---

## Isi wajib (jangan dilewat)

### Urutan setup yang benar — ini yang membedakan video ini dari tutorial sembarangan

Sebutkan **kenapa** urutannya begitu, bukan cuma daftar perintah:

1. Termux **dari F-Droid**, bukan Play Store (versi Play Store usang, `pkg upgrade` gagal)
2. `termux-setup-storage` — untuk memindahkan brief hasil download
3. `proot-distro install ubuntu`
4. **Buat user `dev` SEBELUM install Node** — `--dangerously-skip-permissions` menolak jalan sebagai
   root; kalau Node diinstall sebagai root, `~/.claude` jadi milik root dan tetap ditolak
5. Node.js 22+ (Claude Code tidak jalan di bawah itu)
6. FFmpeg + Chromium (HyperFrames render lewat Chrome, encode lewat FFmpeg)
7. API key Cartesia disimpan ke `~/.bashrc` **sebelum** clone repo
8. Clone repo, lalu `npx hyperframes skills update media-use`

### Topik contoh (dipakai apa adanya di S6)

```
Tolong buat video reels 60 detik tips: kenapa jangan simpan .env di git,
plus cara benerinnya kalau sudah terlanjur.
```

Tunjukkan bahwa topik ini cuma **contoh** — hasil videonya akan muncul di video berikutnya.

### CTA penutup (S8, teks persis)

```
Hasil ada di video selanjutnya, jangan lupa follow akun ini.
```

---

## Batasan keras

1. **JANGAN tampilkan API key asli.** Saat scene Cartesia, tampilkan `sk_car_••••••••` atau
   `export CARTESIA_API_KEY="..."` dengan bagian rahasianya disensor.
2. **Jangan klaim render cepat di HP.** Jujur: 20–40 menit per video di Android kelas menengah.
   Sebut ini sekali, singkat, tanpa menakut-nakuti.
3. **Perintah harus asli**, bukan pseudo-code. Ambil dari `SETUP-TERMUX.md` di repo.
4. **Jangan pakai kata hype**: "revolusioner", "game changer", "gampang banget", "canggih".
5. **Satu ide per scene**, layout berbeda tiap scene, minimal tiga perlakuan latar.

---

## Identitas visual

Video ini **tutorial**, bukan berita keamanan dan bukan perbandingan. Pilih identitas **baru** dari
Library di MASTER-PROMPT bagian 8, berbeda dari dua video sebelumnya:

| Video sebelumnya | Palet | Tipografi | Teknik teks |
|---|---|---|---|
| Cloudflare vs Nginx | P1 Terminal-editorial | T1 Bricolage + Instrument Serif + JetBrains | M1 Mask reveal |
| PHP2Shell | P2 Hazard bulletin | T2 Archivo + Newsreader + IBM Plex Mono | M2 Bar-wipe |

Aturan anti-tabrakan: minimal 3 dari 5 kolom berbeda, display font **tidak boleh sama**.
Untuk tutorial, pertimbangkan palet terang (P4 Riso print) karena isinya langkah-langkah yang harus
mudah dibaca di HP, dan teknik teks **M3 Cut + type** karena ada terminal asli.

---

## Tone

Tenang, praktis, seperti teman yang sudah pernah setup dan memberi tahu jebakannya.
Bukan iklan. Bukan "akhirnya ada solusi". Fokus: **ini caranya, ini yang sering bikin gagal**.

---

## Yang harus ada di bagian 8 (fakta dan sumber)

Ini tutorial tool, jadi bagian 8 berisi:

- Tabel: perintah → fungsinya (dari `SETUP-TERMUX.md`)
- Tabel troubleshooting: gejala → penyebab → perbaikan (7 baris dari `SETUP-TERMUX.md`)
- Catatan akurasi: versi Node minimum, ukuran unduhan setup, waktu render
- Daftar "cek ulang sebelum posting": URL F-Droid, URL repo, harga/limit Cartesia

---

## Output

Tulis `BRIEF.md` lengkap dengan struktur bagian 0-11 dari MASTER-PROMPT, lalu:

1. Perbarui Registry (bagian 9) dengan video ketiga ini.
2. Balas di chat dengan ringkasan: pesan inti, 3 hal yang perlu dicek ulang, dan asumsi durasi.
   Jangan ulangi isi brief.
