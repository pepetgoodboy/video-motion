---
description: Video Reels 9:16 dengan presenter (footage sendiri) + scene HyperFrames
argument-hint: <path-brief.md> <folder-footage>
---

# /video-reels-presenter

Jalankan skill `.claude/skills/video-reels-presenter/SKILL.md` untuk:

- brief: `$1`
- footage: `$2`

Kalau `$1` kosong → cari `.md` terbaru di `source/`, konfirmasi sekali.
Kalau `$2` kosong → **berhenti**, tanya folder footage. Tanpa footage skill ini tidak bisa jalan
(tidak ada yang bisa dikarang).

Langkah umum (scaffold, font, BGM/SFX, render 120fps, blend 60fps, QA MP4) **rujuk** ke
`.claude/skills/video-reels/SKILL.md` — jangan duplikat di sini.

Wajib dilaporkan sebelum render:
- peta presenter (scene → P1/P2/P3, shot, rentang sumber, durasi)
- V-code + hasil cek rotasi `STYLE-LEDGER.md`
- estimasi waktu cutout bila ada scene P2 (≈1,2–1,5 detik/frame di mesin ini — biaya per-frame
  tetap, jadi yang menentukan adalah fps × durasi, bukan resolusi)

Wajib lulus sebelum bilang "selesai":
- alpha cutout terverifikasi dari pixel (`ALPHA_MODE=1` + `alphaextract`, bukan `pix_fmt`)
- lip-sync ≤1 frame di setiap scene presenter
- frame hitam = 0, frame beku minimal, loudness -14..-23 LUFS
- `STYLE-LEDGER.md` diperbarui termasuk kolom Presenter + Mode