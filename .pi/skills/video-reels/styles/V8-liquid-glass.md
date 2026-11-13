# V8 — Liquid glass (tiruan)

Panel transparan, tepi berkilau, cahaya yang lewat. **Tiruan** — refraksi asli tidak mungkin
tanpa `backdrop-filter` (dilarang) atau shader (mahal). Semua di card ini adalah teknik
meyakinkan mata dengan biaya rendah.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | Melayang. Panel masuk dengan `power3.out` + sedikit rotasi; selalu ada **sweep cahaya** lambat. |
| Fps rasa | Mulus. Tidak ada step. |
| Tekstur | Latar **blur pra-render** (gambar statis yang sudah dibuahi). Panel: `rgba` rendah + border highlight 1px atas-kiri + gradient diagonal tipis. |
| Kedalaman | Panel mengambang **di atas** latar; parallax 2 lapis (latar lambat, panel cepat). |
| Kamera | `C1` sangat lambat (≤ 4%). Kilau bergerak lebih penting dari kamera. |
| Tipografi | Rapat, bersih, ukuran sedang; kontras tinggi di atas panel (panel selalu diberi lapisan gelap/terang 40–60% di belakang teks). |
| Transisi | Panel meluncur menutupi frame, atau `scale-swap` antar panel. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V8 |
|---|---|
| Kontras | Teks di atas panel **wajib** diuji; panel semi-transparan sering menjatuhkan kontras. Plat warna 40–60% di belakang teks wajib. |
| #14 budget | `backdrop-filter` = **0**. Latar blur = gambar statis. |
| #7 ambient | Ambient = sweep cahaya (A8) + drift panel 2–3px. |

## Resep HyperFrames

- `ambient-glow-bloom` untuk kilau tepi.
- `spring-pop-entrance` untuk panel masuk.
- `card-morph-anchor` untuk panel yang berubah ukuran/posisi jadi panel lain.
- Latar blur: ambil satu screenshot/gradient, blur sekali (di luar render), simpan PNG.
  Jangan blur live di dalam komposisi.
- Border highlight: `box-shadow: inset 1px 1px 0 rgba(255,255,255,.5), inset -1px -1px 0 rgba(0,0,0,.08)`.

## Batas render

Murah — asal tidak ada `filter: blur` live dan tidak ada `backdrop-filter`. Panel berbayang
lembut dibatasi 3 per scene.

## Dilarang

- `backdrop-filter` dalam bentuk apa pun.
- Mengklaim "glassmorphism asli" atau "refraksi".
- Lebih dari 3 panel bersamaan.
- Sweep cahaya lebih cepat dari 1.5s (jadi kedip, bukan kilau).