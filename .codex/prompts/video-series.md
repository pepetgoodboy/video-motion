---
description: Episode video serial 3D 9:16 (drama bersambung, tokoh tetap) dari series/<nama>/
argument-hint: <seri> <nomor-episode | "judul/premis">
---

# /video-series

Jalankan skill `.claude/skills/video-series/SKILL.md` untuk:

- seri: `$1` (mis. `anak-pertama`; kosong → satu-satunya folder di `series/`, kalau lebih dari satu tanya)
- episode: `$2` (nomor → premis dari `BIBLE.md` §6; teks → judul/premis, nomor = episode terakhir §9 + 1)

Wajib Langkah 0 dulu: baca `series.json`, `BIBLE.md`, naskah episode sebelumnya, dan
`references/serial-3d.md`. Gaya, suara, dan format diambil dari lock serial — jangan dipilih sendiri.
Langkah umum (aturan komposisi HyperFrames, audio) rujuk `.claude/skills/video-reels/SKILL.md`.
Serial belum ada → §5 skill (rintis, tanya keputusan user dulu).
