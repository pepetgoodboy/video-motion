# V19 — ASCII art

Visual tersusun dari karakter. Kerapatan karakter **menggantikan kecerahan** — itu satu-satunya
aturan yang tidak boleh dilanggar.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Pemetaan ulang karakter** sebagai gerak: grid dibangun ulang per frame dari fungsi (x, y, t). Gerak primer = perubahan kerapatan, bukan pergeseran objek. |
| Fps rasa | Bisa patah (retro terminal) — tapi patah dari perubahan karakter, bukan dari `steps()` pada tween. |
| Tekstur | Karakternya sendiri. Latar solid gelap. Nol grain. |
| Kedalaman | 1–2 lapis. ASCII tidak punya perspektif; kedalaman datang dari kerapatan. |
| Kamera | `C1` scale kecil, atau diam. Pan hanya bila grid lebih besar dari frame. |
| Tipografi | **Mono ketat**, line-height = ukuran font (tanpa gap), `letter-spacing: 0`. Font non-mono merusak grid. |
| Transisi | Grid menyapu penuh (`X1` dengan blok karakter), atau kerapatan naik sampai putih lalu cut ke scene berikutnya. |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V19 |
|---|---|
| #4 kamera | Kamera diam **LULUS** untuk tipe ini (seperti V1/V9). |
| #2 teknik teks | 3 cukup — karakter bukan teks yang dibaca. |
| Keterbacaan teks utama | **Penting:** teks utama tetap HTML biasa di atas grid. Jangan membuat teks utama dari ASCII. |
| Gedung #5 lapisan | 1–2 lapis sah. |

## Resep HyperFrames

Biaya terukur: grid 64×100 (6.400 sel) dibangun ulang tiap frame = 61–82 ms/frame, **di sekitar
baseline**. Murah. Grid 2× lipat perlu diukur ulang.

```js
const RAMP = " .:-=+*#%@";           // jarang → padat
function build(t) {
  let out = "";
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
    const v = field(x, y, t);        // fungsi murni, tanpa Math.random
    out += RAMP[Math.round(v * (RAMP.length - 1))];
  }
  return out;
}
```

- Satu `<pre>` per medan, `white-space: pre`, `font-variant-ligatures: none`.
- `textContent` diganti per frame dari timeline. Renderer memakai `seek(t, false)`, jadi
  `onUpdate` jalan normal. Terverifikasi deterministik: dua render menghasilkan hash identik,
  dan render MP4 memperlihatkan cincin berdenyut.
- Bentuk (lingkaran, gelombang, siluet) dirasterisasi ke grid **sekali** di awal, lalu
  dipetakan ke ramp. Jangan rasterisasi per frame.

## Batas render

- Grid ≤ 64×100 per `<pre>`. Maksimal 1 `<pre>` aktif per scene.
- `canvas fillText` per sel: **belum perlu** — `<pre>` sudah cukup dan terukur murah.
- Jangan `text-shadow` pada grid (ribuan elemen berbayang).

## Dilarang

- Teks utama (yang harus dibaca) dibuat dari ASCII.
- Font non-monospace.
- `Math.random()` di dalam fungsi field — pakai noise ber-seed atau sinus.
- ASCII + `mix-blend-mode` (blend ~1,5× baseline).
- Grid lebih padat dari line-height font (baris akan bertumpuk dan blur saat blend).
