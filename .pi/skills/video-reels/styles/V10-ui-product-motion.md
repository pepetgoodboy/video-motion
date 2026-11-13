# V10 — UI / product motion

Mock UI yang **nyata** jadi panggung. Kursor, klik, kartu yang berubah state, zoom ke detail.
Teks di layar adalah konten aplikasi, bukan headline.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Aksi dulu, animasi kemudian.** Tiap perubahan state dipicu oleh aksi nyata (kursor sampai, klik, ketik), bukan tween yang muncul sendiri. |
| Fps rasa | Mulus, 1:1 seperti aplikasi sungguhan. Tidak ada `steps()`. |
| Tekstur | Cincin fokus tipis, grid 4px halus, bayangan kartu lembut. **Tanpa grain film.** |
| Kedalaman | UI di depart; latar = desaturasi + sedikit blur pra-render (bukan live blur). |
| Kamera | `C3 pan` dan `C4 rack focus` mengikuti alur kerja. Kamera dipicu kursor, bukan timer bebas. |
| Tipografi | Hierarki UI asli: judul 40–56px, body 28–32px, label mono ≥ 26px. Huruf raksasa headline hanya di luar mock. |
| Transisi | State berpindah di tempat (modal membuka, panel bergeser), bukan wipe layar penuh. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V10 |
|---|---|
| Konten | **Wajib asli dan terverifikasi.** Perintah asli, label asli. Label belum terverifikasi ditandai `⟦CEK⟧` di brief dan memakai label generik saat render. |
| Kredensial | Nol kredensial asli; semua placeholder diganti. |
| #2 teknik teks | ≥ 3 cukup — kekayaan V10 datang dari state, bukan dari teknik huruf. |
| Kursor | Posisi kursor wajib dari tabel waktu tetap (deterministik), bukan easing bebas. |

## Resep HyperFrames

- `cursor-click-ripple` untuk klik.
- `cursor-drag` untuk drag (slider, jendela).
- `control-target-sync` untuk kontrol + hasil yang berubah serempak.
- `ai-tracking-box` untuk sorotan area/elemen.
- `3d-page-scroll` kalau perlu memperlihatkan halaman panjang.
- Prompt/terminal: pakai `discrete-text-sequence` supaya ketikan bisa di-seek.

## Batas render

Mock UI = banyak elemen kecil. Batasi **≤ 120 elemen per scene**; konten di dalam mock boleh
lebih kecil dari 32px **hanya jika** berada di dalam bingkai yang ikut kamera dan diberi inset
(x 108→921, y 293→1423), sesuai catatan UI mock di brief.

## Dilarang

- Mock yang berisi data karangan yang terlihat seperti data asli klien.
- Klik yang tidak punya konsekuensi visual.
- Kursor bergerak tanpa henti (harus berhenti di target).
- `backdrop-filter` untuk efek jendela kaca.