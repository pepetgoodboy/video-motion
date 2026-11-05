# V1 — Kinetic typography

Teks adalah **satu-satunya** materi. Tidak ada objek, tidak ada diagram, tidak ada mock UI.
Kalau ada elemen selain huruf, video ini bukan V1.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | Perkusi. Kejadian = **satu kata/frasa per beat**. Easing: `power4.out`, `expo.out`, `back.out(2)`. Dilarang `sine.inOut` (itu bahasa V9/V2). |
| Fps rasa | Mulus per-gerakan, tapi **beat-nya tajam** (jarak antar kejadian = ketukan, bukan durasi). |
| Tekstur | **Nol grain.** Nol vignette. Latar warna datar. Tekstur satu-satunya = huruf itu sendiri. |
| Kedalaman | **1 lapis** (kesampingkan aturan 3 lapis). Kalau butuh kedalaman: lapisan duplikat huruf dengan offset, bukan parallax latar. |
| Kamera | **Mati.** Kamera tidak bergerak sama sekali. Gerak 100% dari huruf masuk/keluar/berubah. |
| Tipografi | Ukuran raksasa (≥ 200px, sampai 520px), 1–4 kata per layar, kontras ukuran antar baris ≥ 8:1. Boleh morph `wght`/`wdth` bila font variabel. |
| Transisi | Hard cut antar beat, atau satu huruf raksasa jadi masker (`scale-fill`) untuk scene berikutnya. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V1 |
|---|---|
| #4 gerak kamera | **0% scene** (kamera mati). Diaudit sebagai LULUS. |
| #7 gerak ambient | Tidak wajib. LULUS bila teks tidak pernah diam > 0.4s. |
| #2 teknik teks | ≥ 6 teknik (bukan 4) — ini satu-satunya dimensi kekayaan V1. |
| #5 lapisan | 1–2 lapis. Bukan pelanggaran. |

## Resep HyperFrames

- `kinetic-beat-slam` (rules) untuk frasa berketukan; satu array beat dibagi semua frasa, **entrance tiap frasa harus beda** (slam / snap samping / rise-rotate).
- `dynamic-content-sequencing` untuk menghitung jendela tiap frasa dari `chars × charSpeed + hold` — jangan hardcode offset.
- `discrete-text-sequence` untuk salah-ganti-mundur (koreksi kata) — sekali saja per video, jangan tiap scene.
- `3d-text-depth-layers` bila butuh ekstrusi: N div offset `(i*dx, i*dy)` dengan alpha menurun.
- Registrasi: satu timeline `paused` di `window.__timelines[<comp-id>]`; semua tween `fromTo` dengan from-state eksplisit.

## Batas render

≤ 400 elemen — mudah, karena cuma huruf. Justru hati-hati pada **jumlah kata**: > 12 kata per momen
melanggar bagian 3 dan terbaca sebagai dinding teks.

## Dilarang

- Menambah grain/vignette "biar tidak kosong".
- Kamera drift "karena audit minta".
- Latar bertekstur, ikon, atau ilustrasi — semua itu milik V2/V3/V5.
- Lebih dari satu teknik entrance per beat (beat harus terbaca sebagai satu pukulan).
