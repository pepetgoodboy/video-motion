---
description: Video komentar 9:16 — rekaman bicara bebas + sisipan kolase + caption satu kata
argument-hint: <kanal> <folder-rekaman> ["topik singkat"]
---

# /video-komentar

Jalankan skill `.claude/skills/video-komentar/SKILL.md` untuk:

- kanal: `$1` (mis. `persib`; kosong → satu-satunya folder di `kanal/`)
- rekaman: `$2` (folder di `footage/<kanal>/…`; kosong → berhenti, beri checklist rekam §1)
- topik: `$3` (opsional)

Langkah 0 dulu: baca `kanal/<k>/kanal.json`, analisa referensi kanal, kartu V3, dan isi `kanal/<k>/aset/`.
Suara = rekaman user (tanpa TTS); gaya dari profil kanal. Langkah umum rujuk skill presenter & video-reels.
