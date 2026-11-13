# V11 — Grunge / street

Kasar, cepat, tidak sopan. Tekstur nyata dari permukaan kotor, huruf bertumpuk, potongan
keras. Ini tipe paling mudah jatuh jadi "berisik tanpa isi" — karena itu batas bawahnya
dijaga.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Potongan cepat**: masuk 0.15–0.25s, `expo.out`, kadang `steps(5)` dengan interval ≥ 0.034s. Guncang `C7` dari tabel offset. |
| Fps rasa | Keras. Satu-dua elemen boleh benar-benar cut tanpa tween. |
| Tekstur | **≥ 2 tekstur nyata**: kotoran/scratch, tape, photocopy, semprotan. Plus satu lapisan "kertas murah" yang kelihatan lipatannya. |
| Kedalaman | 3–4 lapis, huruf bertumpuk dengan offset 4–12px, beberapa keluar frame. |
| Kamera | `C7 guncang` saat impact + `C6 parallax` kecil. Tidak ada push-in lambat yang mendominasi. |
| Tipografi | Berat, rapat, kadang terpotong. Boleh outline + fill bertumpuk. Satu kata boleh rusak (tidak rata). |
| Transisi | `X1` potongan, `X3` wipe kasar, atau cut langsung. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V11 |
|---|---|
| Kontras | **≥ 4.5:1 wajib** — grunge paling sering gagal di sini. Teks di atas tekstur wajib punya plat. |
| #9 pattern interrupt | Boleh lebih rapat: ≤ 6 detik tanpa perubahan besar (lebih ketat dari 10). |
| #2 teknik teks | ≥ 4, dan minimal 2 harus kasar (cut, slam, tumpuk). |
| Durasi teks panjang | Jangan > 2 scene berurutan dengan teks panjang (batas dari V11 di brief). |

## Resep HyperFrames

- `chromatic-glitch` untuk satu-dua momen, bukan terus-menerus.
- `scale-swap-transition` untuk potongan di tempat.
- `motion-blur-streak` untuk masuk cepat.
- Tekstur: gambar statis (hasil scan/foto sendiri), bukan noise animatif.

## Batas render

Tekstur besar + banyak lapisan. Batasi **latar bertekstur = 1 gambar** per scene, dan
**≤ 3 lapisan huruf** bertumpuk.

## Dilarang

- Glitch lebih dari 3× per video.
- Teks panjang (> 12 kata) di atas tekstur sibuk.
- Menurunkan kontras demi "kasar".
- Tekstur hasil generate AI yang tidak konsisten antar scene.