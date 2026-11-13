# V21 — Split-flap

Papan Solari: huruf dan angka berputar sampai mencapai target. Suara klik mekanis itu bagian
dari bahasanya, bukan tempelan.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Siklus karakter berhenti satu per satu.** Tiap sel melewati deretan karakter lalu mengunci ke target. Jeda per langkah **≥ 0,05s** (di atas lantai blend 0,034s). Stagger antar sel 0,04–0,08s. |
| Fps rasa | Mekanis, patah per langkah. Ini tipe yang paling benar-benar "steps". |
| Tekstur | Panel gelap, garis pemisah tipis, sedikit vignette di tiap sel. Nol grain besar. |
| Kedalaman | 1–2 lapis. Kedalaman datang dari shading sel, bukan parallax. |
| Kamera | Diam atau `C1` sangat kecil. Kamera bergerak merusak kesan papan diam. |
| Tipografi | Mono tebal, huruf kapital, lebar sel tetap. Bukan huruf display. |
| Transisi | Semua sel berputar bersamaan lalu mengunci (sweep), atau papan diganti panel baru. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V21 |
|---|---|
| #4 kamera | Kamera diam **LULUS**. |
| #2 teknik teks | 2–3 cukup — ini tipe material, bukan tipe tipografi. |
| #1 celah kejadian | Diisi oleh langkah flip tiap sel. Mudah memenuhi ≤ 1,5s. |
| Jumlah elemen | Hitung: **≈ 2 elemen per huruf** untuk varian sederhana, **≈ 4** untuk Solari penuh. |

## Resep HyperFrames

Biaya terukur: **48,9 ms/frame** — praktis sama dengan layar diam, karena yang berubah hanya
isi teks. Render MP4 nyata memutar huruf dengan benar (diverifikasi di frame 84 dan 180).

**Varian murah (2 elemen/huruf) — disarankan untuk video 60 detik:**

```js
const SUN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
letters.forEach((L, i) => {
  const steps = 10 + (i % 6);
  for (let s = 0; s <= steps; s++) {
    const t = i * 0.06 + s * 0.06;
    const ch = s === steps ? L.target : SUN[(i * 7 + s * 3) % SUN.length];
    tl.call(() => { L.el.textContent = ch; }, null, t);
  }
});
```

**Penting:** pola `tl.call()` ini **terverifikasi bekerja** lewat render HyperFrames nyata —
huruf berputar di frame 84 dan mengunci ke target di frame 180. `onUpdate` juga jalan di render
(renderer memakai `seek(t, false)`), tapi `tl.call()` lebih mudah dibaca untuk pergantian
karakter diskret dan tidak butuh pembanding waktu sendiri.

**Varian Solari penuh (4 elemen/huruf):** separuh atas statis, separuh bawah statis, dua
separuh yang melipat `rotateX` dengan `transform-origin` di tengah. Lebih meyakinkan, tapi
40 huruf = 160 elemen. Masih di bawah batas 400.

## Batas render

- Varian murah: ≤ 60 huruf.
- Solari penuh: ≤ 40 huruf (≈160 elemen).
- Jeda per langkah ≥ 0,05s. Di bawah itu, blend 120→60 menghapus flip jadi smear.

## Dilarang

- `setInterval` / `setTimeout` untuk siklus karakter — harus dari timeline.
- Jeda < 0,05s per langkah.
- Huruf display berjarak lebar (bukan mono) — sel tidak akan rata.
- Paragraf teks dengan split-flap (melanggar batas kata dan tidak terbaca).
