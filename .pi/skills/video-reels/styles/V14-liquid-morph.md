# V14 — Liquid morph

Bentuk organik yang melebur dan berubah wujud. **Bahasa materialnya adalah cairan**: tepi
selalu melengkung, tidak ada sudut tajam, dan perubahan wujud terjadi tanpa cut.

## Aturan gerbang

| Situasi | Keputusan |
|---|---|
| Perubahan wujud **punya arti** (A jadi B karena sebab) | **Boleh** |
| Morph cuma "biar organic" | **Jangan.** Turunkan ke V9 atau V6 |
| Butuh metaball bertemu-pisah | **Hitung bezier**, jangan pakai filter goo |
| Topik butuh presisi teknis di dalam bentuk | **Jangan.** Teks di dalam cairan tidak terbaca |

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Morph kontinu.** Satu bentuk mengalir ke bentuk berikutnya. `power2.inOut` untuk morph; `back.out(1.4)` hemat untuk "meletup" sesaat. |
| Fps rasa | Mulus total. Tidak ada `steps()`. |
| Tekstur | Netral: satu warna solid + satu gradient lembut. Bukan halftone, bukan grain. |
| Kedalaman | 2–3 lapis: bentuk utama, bentuk bayangan (lebih gelap, offset), highlight statis. |
| Kamera | `C1` push-in lambat; `C8 zoom-through` saat bentuk "menelan" kamera untuk transisi. |
| Tipografi | Rata kiri, di luar bentuk. Kata kunci boleh sesaat **di dalam** bentuk (maks 2 kata). |
| Transisi | X2: bentuk scene A menjadi bentuk scene B **tanpa cut**. Ini tulang punggung tipe ini. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V14 |
|---|---|
| #3 transisi | Minimal **2 morph X2** wajib, bukan opsional. |
| #2 teknik teks | 2–3 cukup; teks bukan materi utama. |
| Kedalaman #5 | 2 lapis sah. |
| Determinisme | Semua titik dari tabel/seed tetap. |

## Resep HyperFrames

Biaya terukur: tween `attr:{d}` native = 50–78 ms/frame, **sama dengan komposisi DOM biasa**.
Hampir gratis.

**Morph path native — terverifikasi bekerja:**

```js
tl.to("#blob", {
  duration: 1.2, ease: "power2.inOut",
  attr: { d: "M540,600 C680,600 ... Z" },   // jumlah titik & jenis perintah SAMA
}, 0);
```

Syarat: dua path harus punya **jumlah anchor dan urutan perintah identik** (`M … C … C … Z`).
Kalau beda, GSAP tetap jalan tapi bentuk akan melompat di tengah. Siapkan pasangan path dengan
struktur sama — ini pekerjaan desain, bukan pekerjaan kode.

**Interpolasi manual** (kalau butuh wobble tambahan) juga bisa lewat `onUpdate`; renderer
memakai `seek(t, false)` sehingga callback jalan. Hati-hati hanya bila kamu menulis preview
sendiri.

**Leher metaball tanpa filter goo:** dua lingkaran yang hampir bersentuhan disambung dengan
satu kurva bezier yang titik kontrolnya dihitung dari jarak antar pusat. Hasilnya lebih ringan
dan lebih rapi daripada feGaussianBlur.

## Batas render

- ≤ 2 morph besar per video, path ≤ 120 titik.
- Filter goo **dilarang**: (~1,5–2× baseline) bahkan untuk satu grup kecil.
- Jangan morph dua path ber-anchor > 200 titik bersamaan.

## Dilarang

- Filter goo sebagai jalan pintas.
- Morph tanpa alasan yang bisa dijelaskan dalam satu kalimat.
- Ganti bahasa material di tengah video (kalau sudah cair, tetap cair).
- Teks panjang di dalam bentuk yang bergerak.
