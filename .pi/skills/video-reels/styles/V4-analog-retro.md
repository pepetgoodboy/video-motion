# V4 — Analog / retro

Rekaman yang **sudah tua**: grain terlihat, warna pudar, kadang bergeser. Bukan filter yang
ditempel di atas desain modern — seluruh bahasa gambarnya ikut menua.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Drift dan jitter.** Pergerakan kecil terus-menerus dengan offset dari tabel tetap. Easing halus; `steps()` hanya untuk goresan/teks yang "berkedip". |
| Fps rasa | Tidak ada snap keras. Jitter 2–4px pada 8–12 fps rasa. |
| Tekstur | Grain **wajib dan lebih kuat** dari default: `opacity 0.03` adalah **batas atas** (bukan target). Warna pudar (kurangi saturasi palet 10–20%), vignette, goresan statis 2–4 gambar. |
| Kedalaman | 2–3 lapis (paling datar setelah V1/V9). Di era analog, kedalaman berasal dari **noise**, bukan parallax. |
| Kamera | Hampir mati; hanya `C1` sangat lambat (≤ 3%) + guncang kecil saat impact. |
| Tipografi | Mono/terminal dominan, huruf bertepi lembut, boleh ada **chromatic offset** 1–2px pada teks besar. |
| Transisi | Flash frame (1–2 frame putih/hitam), roll vertikal, atau horizontal tear. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V4 |
|---|---|
| #4 gerak kamera | Boleh rendah: cukup C1 di ≥ 60% scene. |
| #7 ambient | **100% scene wajib** — tapi ambient = grain bergeser + jitter, bukan `scale` napas. |
| Kontras | Warna pudar **tidak boleh** menjatuhkan kontras di bawah 4.5:1. Uji ulang setelah desaturasi. |
| #14 budget | Grain di-translate lewat `background-position` (gambar statis), bukan `feTurbulence` animatif. |

## Resep HyperFrames

- `chromatic-glitch` — tapi **hanya** radial/slice kecil; dipakai sebagai karakter material,
  bukan untuk menandai error. Kalau topiknya bukan error, klaimnya harus jelas di brief.
- `motion-blur-streak` untuk transisi dan gerak cepat.
- `sine-wave-loop` untuk goresan/hairline yang bergerak halus.
- Grain: satu PNG/SVG noise statis, digeser `background-position` dengan `ease: "none"`;
  berbeda offset per scene supaya tidak terlihat "stempel".
- Goresan film: 2–4 gambar statis, masing-masing muncul 0.3–1.2s dari tabel tetap.

## Batas render

Murah. Risiko utamanya bukan render, tapi **bitrate turun** karena noise tiap frame —
naikkan `--video-bitrate` bila hasil terlihat blocky di area gelap.

## Dilarang

- Mengklaim "VHS" tapi hanya memasang grain 0.028 (itu default lama, bukan V4).
- Glitch berulang sebagai hiasan — glitch = kejadian, maksimal 3× per video.
- Menurunkan kontras teks demi "vibe pudar".
- `feTurbulence` animatif.