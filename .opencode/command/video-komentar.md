---
description: Video komentar 9:16 — rekaman bicara bebas + sisipan kolase + caption satu kata
---
Load and follow the `video-komentar` skill.

User input: $ARGUMENTS

Parse as `<kanal> <folder-rekaman> ["topik"]`. Do Langkah 0 first (kanal.json, reference analysis, V3 card, assets). The voice is the user's own recording (no TTS). If the recording folder is empty, stop and give the recording checklist (§1).
