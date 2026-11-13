# V27 — Infografis / data story

Angka dan perbandingan yang **diceritakan**, bukan ditampilkan: satu grafik dibangun di depan
mata, satu angka raksasa yang berarti sesuatu, ikon yang menumpuk jadi jumlah. Untuk uang,
statistik, kesehatan, "seberapa besar X".

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Membangun dari data**: bar tumbuh, garis menggambar, angka berhitung (`power2.out`), lalu **satu** nilai disorot (yang lain redup 0,35). `back.out(1.4)` hanya untuk label nilai yang mendarat. |
| Fps rasa | Mulus; angka berhitung boleh `steps` (digit berganti ≥ 0,034 s). |
| Tekstur | Nol. Grid sumbu tipis 1px, garis dasar tegas. Bersih = kredibel. |
| Kedalaman | 2 lapis: grafik + anotasi. Kedalaman dari **redup vs terang**, bukan parallax. |
| Kamera | `C1` ke nilai yang disorot; `C3` menyusuri grafik panjang (timeline). Tanpa tilt 3D (angka harus lurus terbaca). |
| Tipografi | T13 Instrument Sans tabular (`font-variant-numeric: tabular-nums`) untuk angka; angka hero 220–360px. |
| Transisi | Bar/garis grafik A **menjadi** elemen grafik B (`X2` match-cut, mis. satu bar membesar jadi latar scene berikutnya `X9`). |

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V27 |
|---|---|
| Fakta | **Setiap** angka di layar ada di `research.md` + sumbernya tampil sebagai tag kecil (≥ 32px) di scene itu. |
| Skala grafik | Sumbu mulai dari 0 untuk bar; kalau tidak, tulis jelas. Tanpa grafik 3D. |
| Satu ide | ≤ 1 grafik per scene; ≤ 5 kategori per grafik. |
| Ikon | Isotype (ikon berulang = jumlah) boleh; 1 ikon = 1 satuan yang dinyatakan. |

## Resep HyperFrames

- Catalog: `chart-story` (bar/line/donut/progress dari data, mendarat di nilai persis),
  `data-chart`, `mk-line-graph`, `animated-bar-chart`, `bar-chart-race` (deret waktu),
  `decline-chart`, `slot-machine-roll`, `grid-card-assemble`. Blok 1920×1080 → atur ulang
  vertikal (bar horizontal ditumpuk lebih terbaca di 9:16).
- Rules: `stat-bars-and-fills`, `counting-dynamic-scale`, `chart-scrub-readout`.
- Blueprint: `dataviz-countup`, `comparison-split`.

## Batas render

≤ 60 elemen grafik per scene. Label tidak boleh tumpang tindih — hitung lebar teks (MASTER-PROMPT §15 #1).

## Dilarang

- Angka dikarang / dibulatkan sampai menyesatkan.
- Pie chart > 4 irisan; grafik 3D; dua sumbu Y.
- Infografis berisi teks paragraf (itu K0).
