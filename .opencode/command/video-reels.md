---
description: Buat video Reels/TikTok 9:16 dari topik ("apa itu docker?") atau brief markdown (HyperFrames pipeline)
---
Load and follow the `video-reels` skill.

User input: $ARGUMENTS

If the input is a path to a `.md` brief, read it fully first (source of truth) and start at Langkah 0.
Otherwise treat the input as a TOPIC: run Fase A (`references/topik-ke-brief.md`: research → naskah bahasa bayi → `tools/pick-direction.mjs` → `BRIEF.md`) and continue to the MP4 without stopping.
