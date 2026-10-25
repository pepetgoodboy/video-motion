# Setup Termux → Video Motion

Panduan lengkap dari HP kosong sampai bisa render video Reels 9:16.

> **Perkiraan waktu:** 40–60 menit (tergantung kecepatan internet).
> **Perkiraan ruang:** ~3 GB (Ubuntu + Node + Chromium + FFmpeg).

---

## 0. Sebelum mulai

**Yang dibutuhkan:**
- Android 8+ dengan RAM **minimal 6 GB** (8 GB lebih aman)
- Ruang penyimpanan kosong **minimal 5 GB**
- Koneksi internet stabil (setup mengunduh ~1.5 GB)
- Akun Claude (untuk Claude Code)
- Akun Cartesia (untuk VO bahasa Indonesia)

**Yang perlu diketahui sejak awal:**
Render 1080×1920@60fps di HP butuh **20–40 menit per video** (desktop butuh ~3 menit).
Jalankan render saat HP dicas dan tidak dipakai.

---

## 1. Install Termux

**Jangan install dari Play Store** — versinya usang dan tidak bisa `pkg upgrade`.

Unduh dari **F-Droid**: https://f-droid.org/packages/com.termux/

Setelah terpasang, buka Termux dan jalankan:

```bash
pkg update -y && pkg upgrade -y
```

> Kalau muncul pertanyaan soal config file, pilih **Y** (keep maintainer's version) atau
> **N** lalu install ulang paketnya. Yang penting tidak berhenti di tengah.

---

## 2. Izinkan akses penyimpanan

```bash
termux-setup-storage
```

Ketuk **Allow** di dialog Android. Ini membuat `~/storage/shared` menunjuk ke penyimpanan HP
(berguna untuk memindahkan brief hasil download).

---

## 3. Install Ubuntu via proot-distro

```bash
pkg install -y proot-distro
proot-distro install ubuntu
proot-distro login ubuntu
```

Setelah masuk Ubuntu, prompt berubah jadi `root@localhost:~#`.

---

## 4. Buat user baru (WAJIB)

`claude --dangerously-skip-permissions` **menolak jalan sebagai root**. Jadi buat user biasa:

```bash
apt update && apt upgrade -y
apt install -y sudo curl git nano

adduser --gecos "" dev
usermod -aG sudo dev
```

Masukkan password dua kali saat diminta. Lalu:

```bash
su - dev
```

Sekarang prompt jadi `dev@localhost:~$`. **Semua langkah berikutnya dijalankan sebagai `dev`.**

> **Penting:** kalau kamu install Node/Claude sebagai root dulu, `~/.claude` akan jadi milik root
> dan `dev` tidak bisa menulis ke sana. Urutan ini harus benar.

---

## 5. Install Node.js 22+

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # harus v22.x atau lebih
```

---

## 6. Install Claude Code

```bash
sudo npm install -g @anthropic-ai/claude-code
claude --version
```

Login:

```bash
claude
```

Ikuti instruksi login di layar (buka URL di browser HP, salin kode).

---

## 7. Install FFmpeg + Chromium

HyperFrames butuh FFmpeg dan Chrome untuk render.

```bash
sudo apt install -y ffmpeg chromium-browser fonts-dejavu-core
ffmpeg -version | head -1
```

Kalau `chromium-browser` tidak tersedia, coba:

```bash
sudo apt install -y chromium
```

> Puppeteer (dipakai HyperFrames) akan mencari Chrome di path standar. Kalau render gagal dengan
> error "Chrome not found", jalankan `export PUPPETEER_EXECUTABLE_PATH=$(which chromium)`.

---

## 8. Daftar Cartesia dan simpan API key

1. Buka https://play.cartesia.ai/keys
2. Daftar (gratis, ada kredit awal)
3. Buat API key baru, salin (formatnya `sk_car_...`)

Simpan di Termux **sebelum** clone repo:

```bash
echo 'export CARTESIA_API_KEY="sk_car_xxxxx"' >> ~/.bashrc
source ~/.bashrc
echo $CARTESIA_API_KEY   # pastikan muncul
```

---

## 9. Setup Git

```bash
git config --global user.name "Nama Kamu"
git config --global user.email "email@kamu.com"
```

Kalau repo di GitHub dan butuh autentikasi, install `gh`:

```bash
(type -p wget >/dev/null || sudo apt install wget -y) \
  && sudo mkdir -p -m 755 /etc/apt/keyrings \
  && wget -qO- https://cli.github.com/packages/githubcli-archive-keyring.gpg \
     | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg >/dev/null \
  && sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
     | sudo tee /etc/apt/sources.list.d/github-cli.list >/dev/null \
  && sudo apt update && sudo apt install gh -y

gh auth login
```

---

## 10. Clone repo

```bash
cd ~
git clone https://github.com/<username>/video-motion.git
cd video-motion
```

Repo berisi `CLAUDE.md`, `.claude/skills/video-reels/`, `MASTER-PROMPT.md`, `source/`, `shared/`,
`tools/`. Folder `videos/` sengaja tidak di-commit (render besar).

---

## 11. Pasang skill media-use (untuk BGM/SFX)

```bash
npx -y hyperframes@latest skills update media-use
```

---

## 12. Buat brief di Claude web

1. Buka https://claude.ai
2. Mulai chat baru, tempel isi `MASTER-PROMPT.md`
3. Ketik: *"Pahami MASTER-BRIEF.md ini, kemudian jawab 'Paham' jika sudah paham."*
4. Setelah Claude jawab "Paham", ketik topiknya:
   *"Tolong buat brief video reels 60 detik soal serangan supply chain di npm yang lagi ramai
   belakangan ini. Cari info dari beberapa sumber dulu."*
5. Periksa hasilnya. Kalau sudah sesuai, unduh file `.md`.

Pindahkan ke Termux:

```bash
mkdir -p ~/video-motion/source
cp ~/storage/shared/Download/brief-*.md ~/video-motion/source/
ls ~/video-motion/source/
```

---

## 13. Jalankan

```bash
cd ~/video-motion
claude --dangerously-skip-permissions
```

Lalu di dalam Claude Code:

```
/video-reels source/brief-nama-file.md
```

Tunggu. Prosesnya: scaffold → font → audio → komposisi → lint → check → render → verifikasi.

**Render 20–40 menit.** Jangan tutup Termux; aktifkan "Acquire wakelock" di menu notifikasi Termux
supaya Android tidak mematikan prosesnya.

Hasil ada di:

```
~/video-motion/videos/<slug>/renders/<slug>.mp4
```

Pindahkan ke penyimpanan HP:

```bash
cp ~/video-motion/videos/<slug>/renders/*.mp4 ~/storage/shared/Movies/
```

---

## Troubleshooting

| Gejala | Penyebab | Perbaikan |
|---|---|---|
| `--dangerously-skip-permissions` ditolak | Masih jalan sebagai root | `su - dev` dulu |
| `Chrome not found` saat render | Chromium tidak di path standar | `export PUPPETEER_EXECUTABLE_PATH=$(which chromium)` |
| Render berhenti sendiri | Android mematikan proses | Aktifkan wakelock Termux |
| `ENOSPC` | Penyimpanan penuh | Hapus `videos/*/renders/*.mp4` yang lama |
| Video terasa "patah" | Player, bukan file | Coba **VLC** atau Chrome. Windows Media Player tersendat di 60fps |
| VO terlalu panjang | Naskah kepadatan | Padatkan naskah di brief, atau naikkan `speed` maks 1.15 |
| Lint error `font_family_without_font_face` | Font belum di-embed | Pastikan `@font-face` ada di **setiap** file scene |

---

## Struktur akhir

```
~/video-motion/
├── CLAUDE.md              # aturan project (otomatis dibaca Claude Code)
├── MASTER-PROMPT.md       # untuk Claude web, bukan Claude Code
├── .claude/skills/video-reels/SKILL.md
├── source/                # brief .md hasil Claude web
├── shared/                # font + SFX lintas video
├── tools/                 # cartesia-vo.mjs, diagnose-motion.mjs
└── videos/<slug>/         # dibuat otomatis per video (tidak di-commit)
    ├── index.html
    ├── compositions/frames/
    ├── assets/{fonts,bgm,sfx,vo}/
    └── renders/<slug>.mp4
```
