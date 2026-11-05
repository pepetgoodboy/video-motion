# V12 — Surreal / absurd

Aturan fisika dilanggar, dan pelanggaran itu **punya arti**. Bukan acak. Kalau sebuah objek
berubah wujud tanpa alasan yang bisa dijelaskan dalam satu kalimat, ini bukan V12 — ini
improvisasi yang harus dihapus.

## Aturan gerbang

| Situasi | Keputusan |
|---|---|
| Bisa dijelaskan dalam 1 kalimat kenapa objek berubah | **Boleh.** |
| Hanya "biar keren" | **Jangan.** Turunkan ke V9 atau V3. |
| Butuh video AI untuk wujud akhir | Boleh pakai aset media-use (video/gambar), tapi **≤ 2 shot** dan dicatat di `STYLE.md`. |
| Topik keamanan / tutorial berisi perintah | **Jangan.** Akurasi kalah oleh absurditas. |

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Morph** sebagai gerak utama: satu bentuk menjadi bentuk lain secara terus-menerus. Easing `power2.inOut` untuk morph; tween lain minimal. |
| Fps rasa | Mulus. Keanehan datang dari bentuk, bukan dari patahan. |
| Tekstur | Netral. Satu material saja sepanjang video (jangan campur, itu V3). |
| Kedalaman | 3–4 lapis, tapi **depth-nya tidak logis** — objek depan bisa terlihat lebih kecil. Itu bagian dari premis. |
| Kamera | `C8 zoom-through` untuk melewati objek, `C2` untuk mengungkap skala yang mustahil. |
| Tipografi | Sedikit. Satu kalimat penjelas muncul setelah keanehan, bukan sebelum. |
| Transisi | Morph langsung (X2) — bentuk A menjadi bentuk B tanpa cut. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V12 |
|---|---|
| #13 metafora | ≥ 80% scene (lebih ketat) — kalau tidak, surreal-nya cuma hiasan. |
| Akurasi | Skor *Akurat* di Concept Lab wajib ≥ 4/5, atau beri label "ilustrasi konseptual". |
| #2 teknik teks | ≥ 2 cukup. |
| Determinisme | Semua posisi/rotasi mustahil dari tabel tetap, bukan random. |

## Resep HyperFrames

- `card-morph-anchor` untuk morph yang mempertahankan titik jangkar.
- `theme-crossfade-morph` untuk perubahan material/warna saat bentuk berubah.
- `center-outward-expansion` untuk efek "meledak jadi banyak".
- `svg-path-draw` untuk morph path (dua path dengan jumlah titik sama — wajib disiapkan).

## Batas render

Morph SVG berat kalau path kompleks. **≤ 2 morph besar per video**, path ≤ 120 titik,
dan siapkan pasangan path dengan jumlah titik identik (kalau tidak, morph akan melompat).

## Dilarang

- Absurditas yang tidak bisa dijelaskan.
- Lebih dari 2 shot berbasis video AI.
- Morph pada topik yang butuh akurasi teknis tanpa label "ilustrasi konseptual".
- Ganti material di tengah video.