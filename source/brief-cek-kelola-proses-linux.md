# BRIEF: Cek dan Kelola Proses di Linux — ps, top, htop, kill

- **Format:** Reels/TikTok 9:16, 1080×1920, 60 fps (render 120 fps lalu blend ke 60), **75 detik**, Bahasa Indonesia santai-teknis, dengan voice over, musik, dan SFX.
- **Engine:** HyperFrames (HTML + CSS + GSAP timeline `paused`, deterministik).
- **Status fakta:** 9 Nov 2026. Topik stabil (procps-ng, htop, signal(7)); tidak ada klaim yang bergantung pada waktu. Daftar "cek ulang" ada di bagian 8.
- **Lingkungan render:** CPU tanpa GPU (default).
- **Sumber brief:** MASTER-PROMPT v2.2. `STYLE-LEDGER.md` tidak bisa diakses dari chat, jadi Registry memakai **snapshot di bagian 12 master prompt ditambah baris #8 dari brief hak-akses-file (belum tentu sudah dirender/dicatat). Snapshot mungkin basi; ledger menang.** Cocokkan sebelum render.
- **Asumsi:** durasi 75 detik (empat alat + sinyal + dua jebakan tidak muat di 60 detik; aturan durasi: menyesuaikan topik, maks 120 detik); penonton = pemula yang baru pegang server/VPS; distro berbasis procps-ng + bash; PID, nama proses, dan angka di layar adalah **contoh fiktif**.

---

## 0. Cara pakai file

1. Simpan sebagai `BRIEF.md` di folder video, mis. `videos/cek-kelola-proses-linux/BRIEF.md`.
2. Salin prompt di bagian 9 ke Claude Code (skill HyperFrames).
3. Biarkan agent menjalankan lint → snapshot → preview. Periksa QA bagian 7 dan Boredom Audit bagian 12.
4. Render MP4 hanya setelah checklist lulus. Setelah render, tempel baris Registry (akhir file) ke `STYLE-LEDGER.md`.

---

## 1. Konsep

**Pesan inti:** `ps` memotret proses, `top`/`htop` memantaunya langsung, dan `kill` hanya **mengirim sinyal**; matikan dengan sopan dulu (TERM), baru paksa (KILL) kalau perlu.

### Concept Lab

| Kandidat | Metafora | Literal | Akurat | Gerak | Kebaruan | Feasibility | Total |
|---|---|---|---|---|---|---|---|
| **A (terpilih): Akuarium Proses** | Proses = ikan ASCII, CPU = ukuran dan kerakusan, induk-anak = ikan beranak, sinyal = surat yang dikirim ke ikan | 5 | 4 | 5 | 4 | 5 | **23** |
| B (ditolak) | Papan keberangkatan terminal bus | 4 | 3 | 3 | 3 | 4 | 17 |
| C (ditolak) | Dapur restoran (koki = CPU, pesanan = proses) | 5 | 4 | 3 | 1 | 4 | 17 |

- B ditolak: `kill` tidak punya padanan alami di papan keberangkatan, dan gerak-nya monoton.
- C ditolak: bertabrakan dengan "Denah dapur + truk" (Registry #4).
- Catatan akurat pada A: padanan D (tersangkut jaring) dan Z (kerangka) bersifat konseptual; beri label "konseptual".

### Hook Lab (5 opsi)

| # | Jenis | Draf |
|---|---|---|
| 1 | Kontradiksi | "Server kelihatan santai, tapi CPU-nya penuh. Siapa pelakunya?" |
| 2 | Angka mengejutkan | "Satu proses makan 98% CPU." |
| 3 | Pertanyaan yang salah | "Bukan 'restart server', tapi 'proses mana yang nyangkut'." |
| 4 | Cold open hasil akhir | Tunjukkan CPU turun setelah ikan rakus dijaring, lalu bongkar caranya. |
| 5 | Taruhan/konsekuensi | "kill -9 bukan tombol pertama." |

**Dipilih: #2.** Alasan: angka `98%` raksasa langsung terbaca di cover, memberi gerak sejak frame pertama, dan #5 dipakai sebagai open loop (chip `kill -9 ?`). Berbeda dari hook #1 (kontradiksi) di video sebelumnya.

### Dunia visual dan protagonis

- **Dunia visual: Akuarium Proses**, tangki ASCII berisi ikan. Semua dibangun dari karakter (V19).
- **Protagonis visual: ikan rakus `PID 4821`** (`node worker.js`, fiktif). Nasibnya: terdeteksi (S1-S3), dilacak di pohon induk-anak (S4), diminta pergi sopan lalu ngeyel (S5), dijaring paksa (S6), jadi contoh jebakan (S7), dan kembali tenang (S8).
- Dunia visual muncul di 8/8 scene; protagonis di 8/8 (S8 sebagai ikan kecil yang melompat).

### Tabel metafora

| Konsep teknis | Wujud di dunia | Gerak |
|---|---|---|
| Proses | Ikan (glyph `><>`), PID = tag angka | Berenang |
| `%CPU` | Ukuran ikan + bar `[####----]` | Ikan membesar saat rakus |
| `ps` | Foto: tangki membeku di bingkai viewfinder | Flash shutter, gelembung berhenti |
| `top` / `htop` | Papan live: ikan berbaris, bar naik-turun | Angka berfluktuasi |
| Induk-anak (`F5`) | Pohon silsilah ikan | Ikan terbang menyusun pohon |
| Sinyal | Amplop `[TERM]` | Terbang ke ikan |
| TERM (15) | Permintaan sopan | Ikan menoleh, bisa mengabaikan |
| KILL (9) | Jaring | Menutup tanpa bisa ditolak |
| STAT D | Ikan tersangkut rumput `~~#~~` | Bergoyang, tidak bisa keluar |
| STAT Z | Kerangka ikan `<defunct>` | Menunggu induk "mengambil" |

### Open loop dan payoff

- **Dibuka (4.7s):** VO "Siapa dia, dan bagaimana mematikannya dengan benar?" + chip `kill -9 ?`.
- **Mini-loop:** "siapa dia" dijawab S2-S4 (ketemu PID 4821).
- **Payoff (54.9s = 73.2% durasi):** S6, urutan benar: TERM dulu, tunggu, baru KILL.

### Tension map

| Scene | Fungsi | Ketegangan (1-5) | Energi musik |
|---|---|---|---|
| S1 | Hook | 4 | tertahan, kick tipis |
| S2 | `ps` | 2 | ritme dasar, tick |
| S3 | `top` | 3 | ritme naik pelan |
| S4 | `htop` + **wow** | 4 | riser → terbuka |
| S5 | `kill` dasar | 2 | turun, sedang |
| S6 | TERM vs KILL (**puncak**) | 5 | tegang → drop 54.9s |
| S7 | Jebakan D/Z | 3 | hampa, bass rendah |
| S8 | Resolve | 1 | resolve hangat |

### Motif visual (maks 3)

1. Ikan ASCII dengan ukuran ∝ CPU.
2. Tag `PID 4821` dan bar `[####----]`.
3. Amplop sinyal `[TERM]` / jaring KILL.

**Tone:** tenang, jenaka, ramah pemula; tidak menakut-nakuti; tidak mengajarkan hal destruktif.

### Struktur retensi

| Waktu | Fungsi |
|---|---|
| 0-6s | Hook `98%` + open loop |
| 6-25s | `ps` (foto) lalu `top` (live) |
| 25-35s | `htop`, **wow di 30.8s (41.1%)** |
| 35-46s | `kill` = kirim sinyal; TERM bisa diabaikan |
| 46-58s | **Payoff + puncak** (TERM → tunggu → KILL) di 54.9s (73.2%) |
| 58-68s | Jebakan: D dan Z |
| 68-75s | Resolve + sambung ke frame awal (loop) |

---

## 2. Aturan anti-slop

**Dilarang**
- Daftar proses sebagai kotak-dan-garis generik; ASCII hanya sebagai dekorasi tanpa fungsi (setiap karakter harus bagian dari ikan, bar, tangki, atau tabel).
- Menyuruh `kill -9` sebagai langkah pertama. Menampilkan `kill -9 -1`, `kill -9 1`, `killall` sebagai root, atau pola `pkill` yang luas.
- Metafora dapur/kuman/hotel/panel saklar (sudah dipakai).
- Glow beranimasi, `backdrop-filter`, `feTurbulence` animatif, filter goo.
- Teks < 32px; baris > 880px; konten di luar safe zone.
- Menampilkan nama akun/IP/host nyata.

**Wajib**
- Setiap ikan merepresentasikan satu baris proses; ukuran dan bar sama dengan angka %CPU yang tampil.
- Makna warna tetap (bagian 3). Semua perintah dan tombol sesuai bagian 8; yang disingkat diberi label "disingkat" atau "contoh".
- Label "konseptual" untuk padanan ikan pada D dan Z.

---

## 3. Design tokens

### Tipe visual (V) dan format narasi

- **Format narasi:** tutorial + konsep (alat dan sinyal).
- **Tipe utama: V19 ASCII art** (S1-S5, S7 = 56s = 74.7% durasi). **Aksen: V9 Bold minimalism** (S6, S8 = 19s = 25.3%). Dicatat sebagai `V19+V9`.
- **Cek rotasi (snapshot + baris #8):** 3 video terakhir memakai V10, V2, V18 (V21 hanya aksen), jadi **V10, V2, V18 dicoret**. Kandidat dari tabel "Tutorial" tanpa V10: V5, V9, V8, V19; dua kandidat: **V19** dan V5. Keduanya belum pernah dipakai; **V19 dipilih** karena proses/terminal cocok dengan karakter dan resepnya sudah lolos tes kelayakan (≤ 64×100 sel ≈ baseline). V9 jadi aksen untuk momen "satu ide per layar" (TERM vs KILL, resolve).
- **Resep material V19 (satu "tanda tangan" di semua scene ASCII):**
  - Satu `<pre>` per **lapisan warna** (paper redup, acid, merah, tinta); tiap `<pre>` hanya berisi karakter berwarnanya (sisanya spasi). Tidak ada `<span>` per karakter.
  - Isi dihitung sebagai fungsi `f(x, y, t)` dari sprite, bar, dan noise ber-seed (`mulberry32(seed)`) **sebelum timeline dibuat**, lalu di-**quantize 12 fps** (`t' = floor(t·12)/12`, jeda 0.083s ≥ 0.05s).
  - Ramp kerapatan: ` .:-=+*#%@` (jarang → padat). Garis tangki memakai `+`, `-`, `|` ASCII polos.
  - Metrik: IBM Plex Mono 32px = **19.2px per sel**, tinggi baris **36px**. Grid maks **45 kolom × 33 baris** (≈1485 sel, batas ≤ 64×100 per `<pre>`).
  - Sumbu: field ASCII mulai x 80 (45 kolom = 864px → x 80-944).
- **Resep V9 (aksen):** bidang warna penuh, satu ide per layar, angka/kata raksasa dari Archivo expanded, tanpa tekstur selain grain statis.

### Blok CSS

```css
:root{
  --ink:#0B0C0A;      /* latar utama */
  --paper:#F2F2EC;    /* teks, garis */
  --acid:#C6FF3D;     /* aktif/sehat, PID, sorotan, latar aksen V9 */
  --red:#FF4D3D;      /* bahaya, KILL, rakus */
  --dim:#6B6F66;      /* turunan (shading), bukan warna dasar */
  --font-display:'Archivo', sans-serif;       /* variable wght+wdth; dipakai wdth 125 */
  --font-accent:'Newsreader', serif;          /* italic */
  --font-mono:'IBM Plex Mono', ui-monospace, monospace;
  --safe-x1:72px; --safe-x2:952px; --safe-y1:240px; --safe-y2:1460px; /* pusat horizontal safe zone: x = 512 */
}
/* S8 (flash color): --ink dan --paper ditukar (latar paper, teks ink). */
/* S6: latar --acid, teks --ink. Merah hanya untuk bentuk di atas acid/paper (kontras rendah). */
```

- Kontras (perkiraan) terhadap `--ink`: `--paper` ≈ 17:1, `--acid` ≈ 16:1, `--red` ≈ 6.0:1. Teks ink di atas `--acid` ≈ 15:1; di atas `--paper` ≈ 17:1. Merah **tidak** dipakai sebagai teks di atas acid/paper.
- Canvas 1080×1920; semua konten di safe zone x 72→952, y 240→1460. **"Tengah" = x 512** (tengah safe zone), bukan 540.

### Makna warna (tetap)

| Warna | Arti |
|---|---|
| `--acid` | proses aktif/sehat, PID, kolom yang disorot, tombol ditekan |
| `--red` | KILL, bahaya, proses rakus (bar penuh) |
| `--paper` | teks umum, tangki, ikan biasa |
| paper 35% | tidur/tidak aktif (S), pinggiran |

### Tipografi

| Peran | Font | Ukuran |
|---|---|---|
| Display (angka/kata raksasa) | Archivo expanded (T2), wght 800, wdth 125 | 96-400px |
| Aksen | Newsreader italic | 48-56px |
| Mono (terminal, ASCII, tabel) | IBM Plex Mono | 32-64px |

- Lebar teks: Archivo expanded ≈ 0.72 × ukuran × karakter; mono 0.6.
- Teks terkecil 32px; baris ≤ 880px.
- M8 (variable-font morph) **tidak dipakai**; bila mau, cek axis `wdth` dulu (⟦SETUP⟧).

### Teknik teks yang dipakai (kode M)

| Teknik | Dipakai di |
|---|---|
| M1 Mask reveal | S5, S8 |
| M3 Cut + type | S2, S5 |
| M4 Stamp | S1, S4, S7 |
| M6 Word slam | S6 |
| M7 Scramble/decode (ber-seed) | S1, S8 |
| M9 Counter | S3 |
| M10 Slice | S2, S7 |
| M11 Outline → fill sweep | S6 |
| M12 Per-karakter drop | S4 |
| M13 Ticker (latar) | S3 |

Set per scene (tidak ada kode yang sama di dua scene berurutan): S1 {M7, M4} → S2 {M3, M10} → S3 {M9, M13} → S4 {M12, M4} → S5 {M3, M1} → S6 {M11, M6} → S7 {M10, M4} → S8 {M7, M1}. (S4 dan S5 tidak berbagi kode; S6 dan S7 juga tidak.)

### Preset kamera (kode C)

| Kode | Dipakai |
|---|---|
| C1 push-in | S1 (1.00→1.06), S3 (1.00→1.06), S4 (1.00→1.04), S6 (1.00→1.15) |
| C2 pull-back | S4 akhir (1.04→1.00), S8 (1.08→1.00) |
| C3 pan menyusuri baris | S2 |
| C4 rack focus (≤ 3 elemen blur 4px; fallback opasitas) | S5, S7 |
| C6 parallax shift | S5, S7, S3 |
| C7 guncang halus (tabel offset tetap) | S1, S4 (wow) |

### Transisi (kode X) — semua CSS, 0 shader

| Dari→ke | Kode | Makna |
|---|---|---|
| S1→S2 | **X2 match-cut** | Ikan rakus mengerut jadi baris teratas daftar (PID jadi kolom PID) |
| S2→S3 | X5 push | Urutan: foto → pantauan live |
| S3→S4 | **X2 match-cut** | Header dan bar `top` tumbuh jadi bar berwarna `htop` |
| S4→S5 | X4 iris | Fokus ke satu proses (PID 4821) |
| S5→S6 | X1 panel wipe acid | Ganti mode (ke aksen V9) |
| S6→S7 | X9 scale-fill | Angka `9` mengembang jadi latar tangki ink |
| S7→S8 | X1 panel wipe paper | Resolve (flash color) |
| S8→S1 (loop) | **X2 morph** | Layout S8 menyusut jadi frame S1 t=0 |

### Ambient (kode A)

A1 grain statis (di-translate bertahap); A2 gelembung ASCII (≤ 20 karakter per scene, di dalam `<pre>` yang sama); A3 titik grid dengan parallax drift; A5 "napas" ±1%; A6 caret (pengulangan terbatas, bukan `repeat:-1`); A7 log latar (di S3 sebagai M13). Partikel DOM: 0.

### Bahasa gerak dan easing (maks 3 per scene)

| Scene | Easing |
|---|---|
| S1 | `steps(n)`, `expo.out`, `sine.inOut` |
| S2 | `steps(n)`, `power4.out`, `power2.inOut` |
| S3 | `steps(n)`, `power4.out`, `power2.inOut` |
| S4 | `expo.out`, `steps(n)`, `power2.inOut` |
| S5 | `power4.out`, `steps(n)`, `power2.inOut` |
| S6 | `expo.out`, `power2.inOut`, `steps(n)` |
| S7 | `power4.out`, `expo.out`, `power2.inOut` (baris "cut" tanpa tween) |
| S8 | `steps(n)`, `power4.out`, `power2.inOut` |

Guncang C7 dari **tabel offset tetap**, mis. `[0,+12,-10,+8,-6,+3,-1,0]` px per langkah (bukan random).

### Elemen persisten

- **Ikan protagonis `PID 4821`** dan tag `PID 4821` (mono 32px, acid; ink di S6) di x 80, y 252 pada S2-S7.
- Semua teks bertahan di layar sampai scene berakhir, kecuali ditulis keluar, dan tidak boleh kurang dari 0.3s/kata + 0.5s.

### Sprite ikan (acuan; boleh dirapikan, harus terbaca sebagai ikan, ≤ 19×5 sel)

```
   ,--.____
 ,'  o     `.__/|
<   ::::::     >|
 `.__      ___/|
     `----'
```

Ikan kecil: `><>` dan `<><` (3 sel). Bar CPU: `[##########]` (10 sel; `-` untuk kosong).

---

## 4. Event Map dan Peta scene

| # | Waktu abs | Durasi | Nama | Latar | Layout | Kamera | Transisi masuk | Wow/interrupt | Jml kejadian |
|---|---|---|---|---|---|---|---|---|---|
| S1 | 0.0-6.0 | 6.0 | Hook 98% | ink + tangki | `98%` 360px atas, tangki bawah | C1 + C7 | – (loop) | Impact 3.4s | 10 |
| S2 | 6.0-16.0 | 10.0 | `ps` = foto | ink | Foto tangki + tabel | C3 | X2 | Mode: tangki → terminal | 11 |
| S3 | 16.0-25.0 | 9.0 | `top` live | ink | Header + ikan-baris | C1 + C6 | X5 | Mode: foto → live | 11 |
| S4 | 25.0-35.0 | 10.0 | `htop` + pohon | ink | Bar + tabel → pohon | C1 + C2 + C7 | X2 | **WOW 30.8s** | 14 |
| S5 | 35.0-46.0 | 11.0 | `kill` = sinyal | ink + tangki | Judul, terminal → tangki penuh | C6 + C4 | X4 | Interrupt 40.5s (skala/mode) | 13 |
| S6 | 46.0-58.0 | 12.0 | TERM vs KILL | **acid (V9)** | Angka raksasa, jaring, tangga | C1 + (kick) | X1 | **Impact payoff 54.9s** | 14 |
| S7 | 58.0-68.0 | 10.0 | Jebakan D dan Z | ink + tangki | Tangki + tabel mini | C6 + C4 | X9 | Interrupt 63.3s | 12 |
| S8 | 68.0-75.0 | 7.0 | Alur aman | **paper (V9)** | Lima langkah raksasa | C2 | X1 | Flash color + loop morph | 9 |

Total 75.0s; semua batas di kelipatan 0.5s. Total kejadian 94 (rata-rata satu per 0.80s).

**Kurva energi musik:** tertahan (0-25s) → riser 29.0-30.8s → terbuka (30.8-35s) → sedang (35-46s) → tegang (46-54.9s, drop di 54.9s) → hampa (58-68s) → resolve hangat (68-75s).

---

## 5. Detail scene

> Waktu di Event Map **relatif ke awal scene**. Koordinat = pojok kiri-atas kecuali tertulis "tengah" (x 512). Kamera membungkus isi scene dalam `#cam`. Perintah panjang yang memuat tanda `|` ditulis di luar tabel dan dirujuk sebagai **CMD-PS**.

**CMD-PS:** `$ ps aux --sort=-%cpu | head -5` (header + 4 proses).

---

### S1 · HOOK 98% (0.0-6.0, 6.0s) · latar ink + tangki

**Tujuan:** angka raksasa, ikan rakus, dan open loop `kill -9 ?`.
**VO (15 kata):** "Satu proses makan sembilan puluh delapan persen CPU. Siapa dia, dan bagaimana mematikannya dengan benar?"
**Dunia visual / protagonis:** tangki berisi ikan kecil; ikan besar acid (PID 4821) menelan makanan dan ikan kecil menyingkir.
**Lapisan:** latar = titik grid redup (parallax 0.2×) + gelembung; tengah = `<pre>` tangki (paper redup + acid); depan = `98%`, tag, chip (parallax 1.3×); overlay = grain + vignette + flash.
**Kamera:** C1 push-in 1.00→1.06 (0-6s, `sine.inOut`); kick +3% saat impact; C7 dari tabel offset.

| Elemen | x, y | Ukuran | Font | Warna |
|---|---|---|---|---|
| `98%` | tengah, y 250-610 | 360px (≈777px) | Archivo expanded 800 | `--acid` |
| Tangki (`<pre>`, 45×16) | 80, 660 | 864×576 | IBM Plex Mono 32px | tepi/ikan kecil paper; ikan besar acid |
| Tag `PID 4821` | tengah, y 1260 | 32px | IBM Plex Mono | `--acid` |
| Label `node worker.js` | tengah, y 1296 | 32px | IBM Plex Mono | `--paper` |
| Chip `kill -9 ?` | tengah, y 1350 | 56px (≈336px) | IBM Plex Mono | `--red` |

Rasio skala: 360 : 32 = **11.25 : 1**. Frame t=0 = cover: `98%` terbaca penuh, ikan besar di tengah tangki, bar CPU penuh.

**Gerak:** Primer = `98%` dan ikan besar menelan. Sekunder = ikan kecil menyingkir, bar CPU melintas. Ambient = gelembung A2, grain A1, grid drift A3.

**Event Map**

| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Kamera, latar | Push-in dimulai; gelembung naik; ikan kecil berenang (12 fps) | C1, A2, A3 | `sine.inOut` | blub lembut, pad rendah |
| 0.0 | Tengah | Ikan besar di tengah, mulut membuka-menutup (2 sprite, ≤ 6 siklus) | sprite loop | `steps` | – |
| 0.3 | Depan | `98%` di-decode ulang (acak ber-seed → menetap, 0.7s) | M7 | `steps` | tick acak cepat |
| 1.2 | Tengah | Titik makanan `.` mengalir ke ikan besar; sprite membesar level 1→2 | sprite swap | `steps` | blub |
| 1.9 | Tengah | Bar `[##########]` penuh melintas di dasar; ikan kecil menyingkir (offset) | slide | `expo.out` | whoosh kecil |
| 2.6 | Depan | Tag `PID 4821` distempel di atas ikan besar | M4 | `expo.out` | cap |
| 3.4 | Semua | **IMPACT:** ikan besar menelan kawanan (6 → 3 ikan kecil), sprite level 3; flash acid 2 frame; kick; C7 | impact | `expo.out` | **impact** + hit musik |
| 4.2 | Tengah | Ikan kecil sisanya mengerumun di pojok (sekunder) | slide | `expo.out` | blub ×2 |
| 4.7 | Depan | Chip `kill -9 ?` distempel merah (bertahan sampai 6.0s) | M4 | `expo.out` | klik cap |
| 5.4 | Semua | Ikan besar mengerut jadi satu baris `4821 98.7 node worker.js` (X2) | X2 | `sine.inOut` | swish |

Celah terbesar: 0.9s.
**Catalog block:** cek registry untuk: scramble/decode text, grain overlay, match-cut/morph.
**Impact (3.4s):** visual = sprite level 3 + flash acid 2 frame; kamera = kick +3% + C7; SFX = impact + gulp di frame pertama; musik = hit + low-pass terbuka sesaat.
**Match cut ke S2:** ikan besar → baris teratas daftar; tag `4821` → kolom PID.

---

### S2 · ps = FOTO (6.0-16.0, 10.0s) · latar ink

**Tujuan:** `ps` memotret proses saat ini; kolom PID, %CPU, STAT; urutkan dan ambil teratas.
**VO (23 kata):** "Pertama, ps. Dia foto: daftar proses pada detik ini. Ketik ps aux, lihat kolom PID, persen CPU, dan STAT. Urutkan, ambil lima teratas."
**Dunia visual / protagonis:** tangki membeku dalam bingkai viewfinder; baris 4821 menyala.
**Lapisan:** latar = `ps` raksasa dim + grid (0.2×); tengah = foto tangki + tabel; depan = sorotan kolom, label (1.3×); overlay = grain + flash shutter.
**Kamera:** C3 pan turun menyusuri baris (translateY 0→-60px, 4.4-8.5s, `power2.inOut`).

| Elemen | x, y | Ukuran | Font | Warna |
|---|---|---|---|---|
| `ps` raksasa (latar) | tengah, y 520-840 | 320px (≈460px) | Archivo expanded 800 | `--paper` 8% |
| Foto tangki (`<pre>` 45×8) + viewfinder `[ ]` | 80, 270 | 864×288 | IBM Plex Mono 32px | paper/acid |
| Prompt CMD-PS | 80, 600 | 40px (≈744px) | IBM Plex Mono | `$` acid, sisanya paper |
| Tabel (header + 4 baris, pitch 44) | 80, 680 | 32px (≤ 40 kolom) | IBM Plex Mono | paper; kolom PID dan %CPU acid |
| Legenda `R = berenang` / `S = diam di dasar` | 80, 960 / 1004 | 32px | IBM Plex Mono | paper |
| Label `kolom lain disingkat · data contoh` | 80, 1400 | 32px | IBM Plex Mono | paper 50% |
| Tag `PID 4821` | 80, 252 | 32px | IBM Plex Mono | `--acid` |

Isi tabel (monospace, "contoh"):

```
USER   PID %CPU %MEM STAT COMMAND
budi  4821 98.7  3.2 R    node worker.js
db    1203  1.4  0.8 Ssl  postgres
www    988  0.6  0.4 Ss   nginx
root   311  0.3  0.1 Ss   sshd
```

Rasio skala: 320 : 32 = **10 : 1**.

**Gerak:** Primer = tabel masuk dan kolom disorot. Sekunder = tangki membeku, panah ke ikan besar. Ambient = grid drift, grain, gelembung berhenti saat "foto".

**Event Map**

| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Tengah | Prompt CMD-PS terketik | M3 | `steps` | ketik |
| 1.4 | Semua | **Shutter:** flash putih 2 frame; tangki membeku; viewfinder muncul; gelembung berhenti | cut | `steps` | klik kamera |
| 2.0 | Depan | Teks `ps = foto` terpotong lalu menyatu (Newsreader italic 56px, y 560) | M10 | `power4.out` | tick |
| 3.2 | Tengah | Header + 4 baris tabel masuk berurutan (stagger 0.12s) | cut stagger | `steps` | tick ×5 |
| 4.4 | Kamera | Pan C3 menyusuri baris | C3 | `power2.inOut` | hum |
| 5.0 | Depan | Kolom PID disorot (bar acid di belakang) | highlight | `power4.out` | ding |
| 5.8 | Depan | Kolom %CPU disorot; baris 4821 membesar 1.00→1.05; panah ke ikan beku besar | draw | `power4.out` | ding |
| 6.6 | Depan | Kolom STAT disorot; label `R = berenang` dan `S = diam di dasar` terpotong menyatu | M10 | `power4.out` | tick ×2 |
| 7.6 | Tengah | Label `kolom lain disingkat · data contoh` muncul (cut) | cut | `steps` | – |
| 8.1 | Depan | Garis bawah menggambar pada `--sort=-%cpu` dan `head -5` | draw | `power2.inOut` | zip |
| 9.0 | Semua | Daftar menggulir naik keluar, layar top naik dari bawah | X5 | `power2.inOut` | whoosh |

Celah terbesar: 1.4s.
**Catalog block:** cek registry untuk: push/cover transition, typing terminal.
**Impact:** beat kecil di 1.4s (shutter): flash + kamera kick 1% + klik.
**Match cut ke S3:** tidak ada (X5 push).

---

### S3 · top LIVE (16.0-25.0, 9.0s) · latar ink

**Tujuan:** `top` menyegar sendiri; sorot si rakus; tombol P, M, q.
**VO (20 kata):** "Mau yang hidup? top. Layarnya menyegar sendiri, si rakus naik ke atas. P urut CPU, M urut memori, q keluar."
**Dunia visual / protagonis:** papan ikan: tiap baris = satu ikan dengan ukuran dan bar ∝ %CPU; 4821 di paling atas.
**Lapisan:** latar = `top` raksasa dim + log bergulir redup (0.2×); tengah = header + baris ikan; depan = keycap, badge, panah (1.3×); overlay = grain.
**Kamera:** C1 push-in 1.00→1.06; C6 parallax shift pelan.

| Elemen | x, y | Ukuran | Font | Warna |
|---|---|---|---|---|
| `top` raksasa (latar) | tengah, y 560-900 | 340px (≈734px) | Archivo expanded 800 | `--paper` 8% |
| Header 3 baris (`load average`, `Tasks`, `%Cpu(s)`; disingkat) | 80, 280 (pitch 44) | 32px | IBM Plex Mono | paper |
| Baris ikan ×5 (pitch 72) | 80, 520 | 32px (≈33 kolom) | IBM Plex Mono | ikan 4821 acid/merah (bar penuh); lain paper |
| Badge `LIVE` | 800, 252 | 40px (≈96px) | IBM Plex Mono | `--acid` |
| Keycap `[ P ]` `[ M ]` `[ q ]` | tengah, y 1000 | 64px (≈192px) | IBM Plex Mono | paper di kotak acid |
| Log latar (3 baris dim) | 80, 1300 | 32px | IBM Plex Mono | paper 20% |

Format baris ikan: `<=======><  4821 98.7 [#########-]` (ikan makin panjang bila CPU makin besar).

Rasio skala: 340 : 32 = **10.6 : 1**.

**Gerak:** Primer = angka %CPU dan bar berfluktuasi. Sekunder = ikan berganti panjang, baris reorder. Ambient = log bergulir A7, grain, napas lampu.

**Event Map**

| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Tengah | Layar top naik; header terbentuk | X5 settle | `power2.inOut` | whoosh |
| 0.2 | Latar | Log bergulir (A7); push-in dimulai | M13 + C1 | `power2.inOut` | hum |
| 0.8 | Tengah | 5 baris ikan muncul (stagger 0.1s) | cut stagger | `steps` | tick ×5 |
| 1.8 | Tengah | %CPU baris 4821 berfluktuasi (97.9 → 99.1 → 98.4 dari tabel tetap, tiap 0.2s) | M9 | `steps` | tick cepat |
| 2.6 | Depan | Badge `LIVE` menyala (kedip 3×) | A6 | `steps` | blip |
| 3.7 | Depan | Panah acid menunjuk baris 4821 ("paling atas"); ikan menggoyang ekor | draw | `power4.out` | ding |
| 4.5 | Tengah | Ikan lain mengecil/membesar bergantian (sekunder) | stagger | `power2.inOut` | blub |
| 5.3 | Depan | Keycap `[ P ]` masuk; baris tetap urut CPU | slide | `power4.out` | klik |
| 6.4 | Tengah | Keycap `[ M ]`; baris reorder (postgres naik, 4821 turun ke posisi 2) | reorder | `power2.inOut` | whoosh |
| 7.6 | Depan | Keycap `[ q ]`; layar menurun | cut | `steps` | klik |
| 8.3 | Semua | Header dan bar `top` tumbuh jadi bar berwarna `htop` (X2) | X2 | `power2.inOut` | swish |

Celah terbesar: 1.2s.
**Catalog block:** cek registry untuk: counter/number ticker, match-cut/morph.
**Impact:** beat kecil di 3.7s (panah ke si rakus): ding + kamera kick 1%.
**Match cut ke S4:** header `top` (Tasks/CPU) → bar CPU `htop`.

---

### S4 · htop + POHON INDUK-ANAK (25.0-35.0, 10.0s) · latar ink

**Tujuan:** `htop` lebih ramah; `F6` urut, `F5` pohon (wow), `F9` kill.
**VO (20 kata):** "htop lebih ramah: berwarna, bisa discroll, ada menu bawah. F6 urutkan, F5 tampilkan pohon induk dan anak, F9 untuk kill."
**Dunia visual / protagonis:** baris-baris ikan terbang menyusun pohon silsilah; 4821 di ujung cabang.
**Lapisan:** latar = `htop` raksasa dim + grid (0.2×); tengah = bar + tabel/pohon; depan = keycap, label (1.3×); overlay = grain + flash color.
**Kamera:** C1 push-in 1.00→1.04 (0.2-5.8s); kick +4% + C7 pendek saat wow; C2 pull-back 1.04→1.00 (9.0s).

| Elemen | x, y | Ukuran | Font | Warna |
|---|---|---|---|---|
| `htop` raksasa (latar) | tengah, y 880-1160 | 280px (≈806px) | Archivo expanded 800 | `--paper` 8% |
| Bar CPU ×4 (format: nomor inti, `[`, 16 batang tegak + 4 spasi, `]`, persen, mis. 98.0%; "konseptual") | 80, 300 (pitch 44) | 32px (≈30 kolom) | IBM Plex Mono | acid (bar), angka paper |
| Tabel proses (5 baris) | 80, 520 (pitch 44) | 32px | IBM Plex Mono | paper; 4821 acid |
| Pohon (12 baris, indent 2 kolom) | 80, 520 (pitch 44) | 32px (≤ 34 kolom) | IBM Plex Mono | paper; jalur ke 4821 acid |
| Footer `F5Tree F6Sort F9Kill F10Quit` (disingkat) | 80, 1400 | 32px (≈29 kolom) | IBM Plex Mono | paper di kotak acid 20% |
| Keycap `F6`, `F5`, `F9` | tengah, y 1180 | 64px | IBM Plex Mono | acid; `F9` merah |

Isi pohon (ASCII polos, "contoh"):

```
1 systemd
|- 311 sshd
|  `- 2290 sshd: budi
|     `- 2291 bash
|        `- 4821 node worker.js
|- 988 nginx
`- 1203 postgres
```

Rasio skala: 280 : 32 = **8.75 : 1**.

**Gerak:** Primer = baris terbang menyusun pohon. Sekunder = konektor digambar, jalur acid menyala. Ambient = grid drift, napas lampu, grain.

**Event Map**

| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Tengah | Bar CPU `htop` tumbuh dari header `top` (selesaikan X2) | X2 settle | `power2.inOut` | swish |
| 0.2 | Kamera | Push-in lambat dimulai | C1 | `power2.inOut` | hum |
| 0.8 | Tengah | Tabel proses berwarna muncul (stagger 0.1s) | cut stagger | `steps` | tick ×5 |
| 1.7 | Depan | Kata `berwarna` jatuh per karakter | M12 | `expo.out` | tick |
| 2.6 | Depan | Kata `bisa discroll` | M12 | `expo.out` | tick |
| 3.4 | Tengah | Footer `F5Tree F6Sort F9Kill F10Quit` naik dari bawah; kata `menu bawah` jatuh | M12 | `expo.out` | klik |
| 4.2 | Depan | Keycap `F6` distempel; kolom `CPU%` tersorot; baris reorder | M4 | `expo.out` | klik |
| 5.2 | Semua | **Jeda berisi 0.6s:** musik hening, riser memuncak; baris bergetar halus; keycap `F5` menyala | A5 | – | hening |
| 5.8 | Semua | **WOW:** `F5` ditekan; baris ikan terbang ke posisi pohon (stagger per kedalaman); flash color (ink↔acid 3 frame); kick | M12 + impact | `expo.out` | **impact** + hit musik |
| 6.6 | Tengah | Konektor pohon (garis tegak dan cabang, seperti blok kode di atas) digambar tiap cabang | draw | `power2.inOut` | tick ×6 |
| 7.4 | Depan | Stamp `induk` di PID 1 dan `anak` di 4821; jalur ke 4821 menyala acid | M4 | `expo.out` | ding |
| 8.2 | Depan | Keycap `F9` distempel merah; teks `kirim sinyal` muncul | M4 | `expo.out` | klik |
| 9.0 | Kamera | Pull-back akhir | C2 | `power2.inOut` | whoosh turun |
| 9.5 | Semua | Iris menutup pada baris 4821 | X4 | `power2.inOut` | whoosh |

Celah terbesar: 1.0s.
**Catalog block:** cek registry untuk: iris transition, light-leak/flash (retint ke palet), match-cut/morph.
**Impact / WOW (5.8s = abs 30.8s, 41.1% durasi):** visual = baris terbang menyusun pohon + flash color 3 frame; kamera = kick +4% (0.2s) + C7; SFX = impact + "whoosh" tersusun di frame pertama; musik = drop ke keadaan "terbuka" (riser 4.0-5.8 memuncak, hening 5.2-5.8, lalu hit). Empat lapisan dalam ±1 frame @ 60fps.
**Match cut ke S5:** iris menutup pada baris 4821 → membuka di tangki berisi ikan 4821.

---

### S5 · kill = KIRIM SINYAL (35.0-46.0, 11.0s) · latar ink + tangki

**Tujuan:** `kill` mengirim sinyal; default TERM, bisa diabaikan; cari PID dengan `pgrep`.
**VO (26 kata):** "Kill sebenarnya mengirim sinyal, bukan langsung membunuh. Cari PID-nya, lalu kill PID. Tanpa tambahan, yang terkirim TERM: permintaan sopan agar berhenti. Tahu nama saja? pgrep dulu."
**Dunia visual / protagonis:** amplop `[TERM]` terbang ke ikan 4821; ikan menoleh lalu ngeyel.
**Lapisan:** latar = `kill` raksasa dim + grid (0.2×); tengah = judul, terminal, tangki; depan = amplop, balon label (1.3×); overlay = grain.
**Kamera:** C6 parallax shift (translateX 0→-30px); C4 rack focus ke tangki (2.8s; judul di-blur 4px, fallback opasitas); interrupt 5.5s: tangki membesar.

| Elemen | x, y | Ukuran | Font | Warna |
|---|---|---|---|---|
| `kill` raksasa (latar) | tengah, y 560-860 | 300px (≈864px) | Archivo expanded 800 | `--paper` 8% |
| Judul `kill =` / `kirim sinyal` | 80, 280 / 400 | 96px (≈830px) | Archivo expanded 800 | `--paper`; `sinyal` acid |
| Terminal (`$ kill 4821`, `$ pgrep -af worker`, output `4821 node worker.js`) | 80, 560 (pitch 56) | 40px | IBM Plex Mono | paper; PID acid |
| Tangki (`<pre>`) | 80, 700 → membesar ke 80, 300 (45×28) | 32px | IBM Plex Mono | paper + acid |
| Amplop `[TERM]` | melayang di atas tangki | 32px (≈6 kolom) | IBM Plex Mono | `--acid` |
| Balon `15 = TERM: permintaan sopan` | tengah, y 1290 | 32px (≈28 kolom) | IBM Plex Mono | paper |
| Label `bisa diabaikan` | tengah, y 1340 | 40px (≈336px) | IBM Plex Mono | `--red` |

Rasio skala: 300 : 32 = **9.4 : 1**.

**Gerak:** Primer = amplop terbang ke ikan. Sekunder = ikan menoleh, balon muncul. Ambient = gelembung, grid drift, grain.

**Event Map**

| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Latar | Iris membuka di tangki; C6 dimulai | X4 settle | `power2.inOut` | whoosh |
| 0.3 | Tengah | Judul `kill =` / `kirim sinyal` muncul dari baseline | M1 | `power4.out` | tick |
| 1.0 | Latar | Gelembung naik cepat sesaat; ikan kecil menoleh ke judul | stagger | `power4.out` | blub ×3 |
| 1.8 | Depan | Amplop `[TERM]` melayang (bobbing) di atas tangki | slide | `power4.out` | pop |
| 2.8 | Kamera | Rack focus: tangki tajam, judul blur/redup | C4 | `power2.inOut` | whoosh |
| 3.5 | Tengah | Tag 4821 menyala acid; `$ kill 4821` terketik | M3 | `steps` | ketik |
| 4.6 | Depan | Kotak ASCII membingkai `kill PID`; panah ke tag | draw | `power2.inOut` | zip |
| 5.5 | Semua | **Interrupt:** judul dan terminal keluar; tangki membesar 0.6→1.0 memenuhi layar; amplop lepas dan terbang ke ikan (0.8s) | slide | `power2.inOut` | whoosh |
| 6.4 | Tengah | Ikan berhenti, menoleh; balon `15 = TERM: permintaan sopan` | M1 | `power4.out` | ding lembut |
| 7.5 | Tengah | Ikan berenang lagi; label merah `bisa diabaikan` | M1 | `power4.out` | tick |
| 8.4 | Tengah | `$ pgrep -af worker` terketik; output `4821 node worker.js` | M3 | `steps` | ketik |
| 9.6 | Depan | Panah `nama → PID` digambar | draw | `power2.inOut` | zip |
| 10.4 | Semua | Wipe acid dari kanan menutup scene | X1 | `power2.inOut` | whoosh |

Celah terbesar: 1.4s.
**Catalog block:** cek registry untuk: typing terminal, panel wipe.
**Impact:** beat kecil di 6.4s (amplop sampai): ding + kamera kick 1%.
**Match cut ke S6:** tidak ada (X1 wipe).

---

### S6 · TERM vs KILL (46.0-58.0, 12.0s) · latar acid (V9)

**Tujuan:** payoff open loop: KILL tidak bisa ditolak tapi tanpa beres-beres; urutan benar TERM → tunggu → KILL.
**VO (28 kata):** "Kalau ngeyel, baru kill -9: sinyal KILL. Dia tidak bisa ditolak, tapi proses tak sempat beres-beres: file setengah tertulis, koneksi menggantung. Makanya urutannya: TERM dulu, tunggu, baru KILL."
**Dunia visual / protagonis:** ikan 4821 (ink) ditangkap jaring; isi "kopernya" tumpah.
**Lapisan:** latar = bidang acid penuh + grain statis (0.2×); tengah = angka raksasa/ikan/jaring; depan = label dan tangga (1.3×); overlay = flash invert.
**Kamera:** C1 push-in 1.00→1.15 (0-12s); kick +2% (3.4s) dan +4% (8.9s).

| Elemen | x, y | Ukuran | Font | Warna |
|---|---|---|---|---|
| `15` → `9` | tengah, y 330-730 | 400px (`15` ≈576px) | Archivo expanded 800 | `--ink` |
| `TERM` / `KILL` | tengah, y 760 | 120px (≈346px) | Archivo expanded 800 | `--ink`; garis bawah `KILL` merah (bentuk) |
| `sopan` | tengah, y 920 | 56px | Newsreader italic | `--ink` |
| Ikan ink (sprite) | 80, 1100 | 19×5 sel | IBM Plex Mono 32px | `--ink` |
| Jaring (`<pre>` 45×12) | 80, 1000 | 864×432 | IBM Plex Mono 32px | `--ink`; benang merah (bentuk) |
| Teks `tak sempat beres-beres` | tengah, y 1010 | 56px (≈616px) | Newsreader italic | `--ink` |
| Label `contoh: file setengah tertulis` / `koneksi menggantung` | 80, 1280 / 1330 | 32px | IBM Plex Mono | `--ink` |
| Tangga `1 TERM` / `2 TUNGGU` / `3 KILL` | x 80/200/320, y 420/620/820 | 96px (≈553px untuk `2 TUNGGU`) | Archivo expanded 800 | `--ink`; `3 KILL` garis bawah merah |

Rasio skala: 400 : 32 = **12.5 : 1**. Teks per scene ≈ 22 kata (≤ 25).

**Gerak:** Primer = angka dan jaring. Sekunder = isi koper tumpah, tangga muncul bertahap. Ambient = grain statis, push-in.

**Event Map**

| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Tengah | Wipe acid selesai; `15` outline → isi (0.8s); label `TERM` | M11 | `power2.inOut` | whoosh |
| 0.2 | Kamera | Push-in lambat dimulai | C1 | `power2.inOut` | pad masuk |
| 1.2 | Tengah | Ikan ink kecil berenang di pojok; teks `sopan` muncul (cut) | sprite | `steps` | blub |
| 2.6 | Tengah | `15` keluar ke kiri, `9` masuk dari kanan | slide | `power2.inOut` | whoosh |
| 3.4 | Tengah | `KILL` menghantam 1.4→1; kick 2%; thud | M6 | `expo.out` | thud |
| 4.4 | Tengah | Jaring turun menangkap ikan (sprite, 6 langkah) | sprite | `expo.out` | swish + thud |
| 5.4 | Tengah | Teks `tak sempat beres-beres` (cut) | cut | `steps` | tick |
| 6.2 | Depan | Isi koper ikan tumpah (`fi`, `le.t`, `...`); label `contoh: file setengah tertulis` | stagger | `expo.out` | berserak |
| 7.6 | Depan | Label `koneksi menggantung` + garis putus `-- --` (bertahan sampai 8.9s) | cut | `steps` | tick |
| 8.4 | Semua | Riser; musik di-duck 80% selama 0.5s; kamera drift (jeda berisi) | – | – | riser |
| 8.9 | Semua | **IMPACT (payoff):** tangga `1 TERM` → `2 TUNGGU` → `3 KILL` muncul stagger 0.15s; flash invert 3 frame; kick +4% | M6 + impact | `expo.out` | **impact** + drop musik |
| 9.8 | Tengah | `1 TERM` disorot; jam ASCII berputar (4 frame, pengulangan terbatas) di `2 TUNGGU` | draw | `power2.inOut` | tik-tok |
| 10.6 | Depan | Label `jalan terakhir` di `3 KILL` | cut | `steps` | cap |
| 11.2 | Semua | Angka `9` pada tangga mengembang jadi latar ink (0.8s) | X9 | `power2.inOut` | riser → swoosh |

Celah terbesar: 1.4s.
**Catalog block:** cek registry untuk: outline-to-fill text, scale-fill transition.
**Impact (8.9s = abs 54.9s, 73.2%):** visual = tangga 3 anak tangga + flash invert 3 frame; kamera = kick +4% (0.2s); SFX = impact; musik = drop ke "tegang" (riser 7.0-8.9, duck 8.4-8.9). Beat kedua 3.4s (`KILL`) lebih kecil.
**Match cut ke S7:** `9` pada tangga → latar tangki ink S7 (X9).

---

### S7 · JEBAKAN D DAN Z (58.0-68.0, 10.0s) · latar ink + tangki

**Tujuan:** tidak semua proses menurut: STAT D menunggu I/O, STAT Z zombie diurus induknya; peringatan `pkill`.
**VO (23 kata):** "Tapi ada yang tak mau mati. STAT D menunggu I/O, kill belum tentu mempan. STAT Z zombie sudah mati; induknya yang harus mengurus."
**Dunia visual / protagonis:** ikan tersangkut rumput (D) dan kerangka ikan (Z); ikan 4821 sudah tenang di latar.
**Lapisan:** latar = `D`/`Z` raksasa dim + grid (0.2×); tengah = tangki + tabel mini; depan = stempel, label (1.3×); overlay = grain.
**Kamera:** C6 geser kanan (translateX 0→-60px); C4 rack focus ke ikan D (1.4s); interrupt 5.3s: pindah ke kerangka Z.

| Elemen | x, y | Ukuran | Font | Warna |
|---|---|---|---|---|
| `D` / `Z` raksasa (latar, bergantian) | tengah, y 420-800 | 420px | Archivo expanded 800 | `--paper` 8% |
| Tangki (`<pre>` 45×14) | 80, 300 | 864×504 | IBM Plex Mono 32px | paper; ikan D paper dengan `~~#~~`; kerangka Z paper 60% |
| Stamp `D` / `Z` | tengah, y 840 | 96px | Archivo expanded 800 | `--acid` (D), `--red` (Z) |
| Label `tak mau mati` | 80, 860 | 56px | Newsreader italic | `--paper` |
| Tabel mini (header + 2 baris) | 80, 1000 (pitch 44) | 32px | IBM Plex Mono | paper |
| Label `kill belum tentu mempan` / `sudah mati, tinggal catatan` | 80, 1130 / 1180 | 32px | IBM Plex Mono | paper |
| Tag `pkill? intip dulu: pgrep -af` | 80, 1400 | 32px (≈29 kolom) | IBM Plex Mono | paper di kotak acid 20% |

Isi tabel mini ("contoh"):

```
 PID STAT COMMAND
5120 D    backup.sh
5301 Z    [worker] <defunct>
```

Rasio skala: 420 : 32 = **13.1 : 1**. Label "konseptual" kecil (32px, pojok kanan bawah): `padanan ikan: konseptual`.

**Gerak:** Primer = stempel D dan Z. Sekunder = rumput bergoyang, benang ke induk, poof. Ambient = gelembung, grid drift, grain.

**Event Map**

| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Latar | `9` mengembang jadi latar ink; tangki terbentuk dari karakter (X9 settle) | X9 | `power2.inOut` | swoosh |
| 0.2 | Tengah | Ikan 4821 berenang tenang; `tak mau mati` terpotong menyatu | M10 | `power4.out` | tick |
| 1.4 | Depan | Rack focus ke ikan kecil tersangkut rumput; stamp `D` | M4 | `expo.out` | thunk |
| 2.1 | Tengah | Label `menunggu I/O`; rumput `~~#~~` bergoyang | M10 | `power4.out` | tick |
| 3.4 | Tengah | Baris `5120 D backup.sh` muncul (cut) | cut | – | ketik |
| 4.4 | Depan | Amplop `[TERM]` menempel di jaring dan bergetar; label `kill belum tentu mempan` | slide | `power2.inOut` | thud lembut |
| 5.3 | Tengah | **Interrupt:** kamera geser ke kanan; kerangka ikan `Z` muncul; stamp `Z` | M4 | `expo.out` | thunk |
| 6.3 | Tengah | Benang `. . .` dari kerangka ke ikan induk; label `induk` | draw | `power2.inOut` | zip |
| 7.2 | Tengah | Baris `5301 Z [worker] <defunct>` (cut); label `sudah mati, tinggal catatan` | cut | – | ketik |
| 8.2 | Depan | Induk "mengambil" kerangka; kerangka lenyap (poof ≤ 20 karakter) | stagger | `expo.out` | poof |
| 9.0 | Depan | Tag `pkill? intip dulu: pgrep -af` terpotong menyatu | M10 | `power4.out` | tick |
| 9.5 | Semua | Wipe paper dari kiri menutup scene | X1 | `power2.inOut` | whoosh |

Celah terbesar: 1.3s.
**Catalog block:** cek registry untuk: panel wipe, scale-fill transition.
**Impact:** beat kecil 1.4s dan 5.3s (stamp D dan Z): thunk + kick 2%.
**Match cut ke S8:** tidak ada (X1 wipe).

---

### S8 · ALUR AMAN (68.0-75.0, 7.0s) · latar paper (V9)

**Tujuan:** resolve: lima langkah berurutan; sambung ke frame awal.
**VO (18 kata):** "Lihat pakai ps atau top, cari PID, kill TERM, tunggu, baru kill -9. Bertahap, bukan langsung sembilan."
**Dunia visual / protagonis:** lima langkah raksasa; ikan kecil ink melompat di pojok (4821 yang sudah tenang).
**Lapisan:** latar = bidang paper + grain statis (0.2×); tengah = lima baris; depan = garis penghubung, tag (1.3×); overlay = flash color (invert).
**Kamera:** C2 pull-back 1.08→1.00.

| Elemen | x, y | Ukuran | Font | Warna |
|---|---|---|---|---|
| Judul `Alur aman` | 80, 250 | 56px | Newsreader italic | `--ink` |
| Angka langkah `1`-`5` | x 80, y 300 + 230·(n-1) | 200px (≈144px) | Archivo expanded 800 | `--ink` di lingkaran acid (bentuk) |
| Teks langkah (`lihat ps · top`, `cari PID · pgrep -af`, `kill PID (TERM)`, `tunggu`, `kill -9 · terakhir`) | x 300, sejajar angka | 64px (display) + 32px (mono kecil) | Archivo / IBM Plex Mono | `--ink` |
| Garis bawah langkah 5 | x 300, sejajar | tebal 8px | – | `--red` (bentuk) |
| Teks `bukan langsung -9` | 80, 1420 | 40px (≈384px) | IBM Plex Mono | `--ink` |
| Ikan kecil ink (`><>`) | 900, 1380 | 3 sel | IBM Plex Mono 32px | `--ink` |

Rasio skala: 200 : 32 = **6.25 : 1**. Teks per scene ≈ 20 kata (≤ 25).

**Gerak:** Primer = tiap langkah muncul sesuai VO. Sekunder = garis penghubung menggambar; ikan melompat. Ambient = grain statis, pull-back pelan.

**Event Map**

| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Latar | Wipe paper selesai; judul `Alur aman` muncul dari baseline | M1 | `power4.out` | klik, pad hangat masuk |
| 0.2 | Tengah | Langkah 1: `1` di-decode + `lihat ps · top` | M7 | `steps` | tick decode |
| 1.0 | Depan | Garis penghubung turun menggambar | draw | `power2.inOut` | zip |
| 1.9 | Tengah | Langkah 2: `2` + `cari PID · pgrep -af` | M7 | `steps` | tick decode |
| 2.7 | Tengah | Langkah 3: `3` + `kill PID (TERM)` | M7 | `steps` | tick decode |
| 3.6 | Tengah | Langkah 4: `4` + `tunggu` | M7 | `steps` | tick decode |
| 4.3 | Tengah | Langkah 5: `5` + `kill -9 · terakhir`; garis merah menggambar | M7 | `steps` | thud kecil |
| 5.4 | Depan | `bukan langsung -9` muncul dari baseline; ikan kecil melompat | M1 | `power4.out` | ding resolve |
| 6.2 | Semua | Loop morph: palet kembali gelap; layout menyusut jadi frame S1 t=0 (tangki + `98%`) | X2 | `power2.inOut` | whoosh |

Celah terbesar: 1.1s.
**Catalog block:** cek registry untuk: scramble/decode text, match-cut/morph.
**Impact:** beat resolve di 5.4s (musik hangat + kamera kick 1%).
**Match cut ke S1 (loop):** posisi tangki, ikan besar, `98%`, dan grid identik dengan S1 t=0.

---

## 6. Audio

| Elemen | Spesifikasi |
|---|---|
| Voice over | ±145 kata/menit, tenang; total **173 kata = 2.31 kata/detik** (batas 2.0-2.8). Sinkron kata-per-kata dengan timestamp transkrip VO. |
| Pengucapan (uji TTS, ⟦SETUP⟧) | `ps` → "pe-es"; `htop` → "etch-top"; `PID` → "pe-i-de"; `pgrep` → "pe-grep"; `pkill` → "pe-kil"; `-9` → "min sembilan"; `I/O` → "ai-o"; `TERM` → "term"; `STAT` → "stat". |
| Musik | 120 BPM (batas scene di kelipatan 0.5s). Lima keadaan energi: (1) tertahan 0-25s, (2) terbuka 30.8-35s, (3) sedang 35-46s, (4) tegang 46-54.9s dengan drop di 54.9s, (5) hampa 58-68s lalu resolve hangat 68-75s. Riser 29.0-30.8s sebelum wow. |
| Impact | Beat besar: 3.4s, **30.8s (wow)**, **54.9s (payoff)**. Beat kecil: 7.4s (shutter), 19.7s (panah top), 41.4s (amplop sampai), 49.4s (`KILL`), 59.4s (stamp D), 63.3s (stamp Z), 73.4s (resolve). |
| Whoosh | Tiap transisi dan gerak kamera besar (6.0, 16.0, 25.0, 35.0, 46.0, 58.0, 68.0, 75.0). |
| Foley | Klik, ketik, tick, gelembung ("blub"), shutter, jaring, poof. Level di bawah VO. |
| Keheningan | Satu momen hening **0.6s** di 30.2-30.8s (sebelum wow). Sebelum payoff 54.9s dipakai duck musik 80% (bukan hening). |
| Ducking | Musik turun otomatis di bawah VO (sidechain). |
| Mode tanpa suara | Visual dan teks tetap membawa pesan inti (angka, tag, stamp, tangga). |
| Sumber | VO, musik, dan SFX lewat `/media-use` atau pipeline repo (mis. Cartesia). |

---

## 7. Aturan teknis HyperFrames

### Dasar
- Deterministik: GSAP timeline `paused`; tanpa `Math.random()`, `Date.now()`, `setInterval`, `repeat: -1`. Semua posisi acak (ikan, gelembung, noise) dari `mulberry32(seed)` yang dihitung **sebelum** timeline dibuat. Guncang dari tabel offset tetap. Kedip caret = pengulangan terbatas.
- ASCII: konten `<pre>` dihitung dari fungsi waktu yang di-quantize 12 fps lalu dipasang lewat `tl.call()` atau `onUpdate` (renderer memakai `seek(t, false)`, terbukti jalan; script preview/ukur sendiri wajib `seek(t, false)`).
- Font self-host: Archivo (variable woff2, wght + wdth), Newsreader (italic), IBM Plex Mono. ⟦SETUP⟧ pastikan ketiganya tersedia dan cek axis `wdth` Archivo.
- Alur: **lint → snapshot → preview → render**. Snapshot: awal, tengah, dan akhir tiap scene, tiap transisi, wow (30.8s) dan payoff (54.9s).

### Budget render (batas bagian 11 master prompt)

| Batas | Rencana video ini |
|---|---|
| DOM beranimasi ≤ ±400 per scene | Perkiraan ≤ 120 (S4 ≈ 90: 3-4 `<pre>` + keycap + label) |
| Partikel ambient ≤ 120 | 0 elemen DOM; gelembung/poof ≤ 20 karakter di dalam `<pre>` |
| `filter: blur` bersamaan ≤ 3 | Hanya C4 di S5 dan S7 (≤ 3 elemen); fallback opasitas |
| `backdrop-filter` | Tidak dipakai |
| Transisi shader ≤ 2 | 0 (semua CSS) |
| Three.js/WebGL | 0 detik |
| `feTurbulence` animatif | Tidak dipakai; grain statis |
| Glow | Tidak dipakai; sorotan = bidang acid datar |
| `mix-blend-mode` | Tidak dipakai (flash color = overlay opasitas) |
| Filter goo | Tidak dipakai |
| Canvas 2D / ASCII | ASCII `<pre>` ≤ 45×33 sel per field (batas ≤ 64×100, terukur ≈ baseline); canvas tidak dipakai |

### Elemen opsional (korbankan lebih dulu sesuai fallback ladder)

| Scene | Opsional |
|---|---|
| S1 | Mulut membuka-menutup; gelembung; ikan kecil menyingkir |
| S2 | `ps` raksasa; legenda `S = diam di dasar` |
| S3 | Log latar (A7); ikan lain membesar-mengecil |
| S4 | Kata `bisa discroll`; bar CPU ke-3 dan ke-4 |
| S5 | Gelembung cepat (1.0s); kotak ASCII `kill PID`; panah `nama → PID` |
| S6 | Jam ASCII; teks `sopan`; isi koper tumpah |
| S7 | `tak mau mati`; poof; benang ke induk (isi `induk` penting, pertahankan) |
| S8 | Ikan melompat; judul `Alur aman` |

**Fallback ladder:** (1) kurangi ambient (gelembung, log), (2) transisi shader → CSS (sudah), (3) hilangkan blur (C4 → turunkan opasitas), (4) tidak ada 3D di video ini, (5) pertahankan selalu: gerak primer, kamera C1/C6 sederhana, impact 4 lapisan.

### Batas konten (WAJIB)
Agent **tidak boleh** menambahkan:
- `kill -9 -1`, `kill -9 1`, `killall` sebagai root, `pkill` dengan pola luas (mis. `pkill python`), atau `sudo kill -9` pada layanan sistem sebagai saran;
- cara menyembunyikan proses, mematikan antivirus/EDR/logging/layanan keamanan, atau menghindari deteksi;
- nama akun, IP, host, atau PID nyata (semua contoh fiktif; beri label "contoh");
- klaim yang tidak ada di bagian 8 (mis. perilaku OOM-killer, cgroup, systemd, perbedaan antar-distro) tanpa verifikasi dan penandaan ⟦SETUP⟧.

### QA checklist
- [ ] Teks ≥ 32px, baris ≤ 880px, tidak ada konten di luar safe zone (x 72→952, y 240→1460; pusat x 512).
- [ ] Ukuran ikan, bar, dan angka %CPU selalu konsisten (4821 selalu paling tinggi di S1-S3; menurun di S3 saat urut memori).
- [ ] Perintah, tombol, dan angka sama persis dengan bagian 8; semua data bertanda "contoh/disingkat".
- [ ] Tidak ada celah antar kejadian > 1.5s; jeda berisi ≤ 0.8s.
- [ ] Wow di 30.8s dan payoff di 54.9s sinkron 4 lapisan.
- [ ] Mode tanpa suara tetap menyampaikan pesan inti.
- [ ] Frame akhir identik dengan frame t=0 (loop).
- [ ] Tidak ada merah sebagai teks di atas acid/paper.

---

## 8. Fakta dan sumber

| # | Klaim yang tampil di video | Sumber |
|---|---|---|
| 1 | `ps` memberi snapshot proses saat ini; untuk pembaruan berkala pakai `top` | man ps: https://www.petefreitag.com/tools/man-pages/ps |
| 2 | `ps aux` (BSD) dan `ps -ef` (standar) adalah dua cara umum melihat semua proses; gaya BSD menambah kolom STAT | man ps (Linux): https://dengking.github.io/Linux-OS/Multitasking/Tools/procps/ps/man-1-ps |
| 3 | Kode STAT: R runnable, S sleeping, D uninterruptible sleep (biasanya I/O), T stopped, Z zombie | man ps: https://zoo.cs.yale.edu/classes/cs470/materials/hws/aima/aima-data/MAN/ps.txt |
| 4 | Zombie = sudah selesai, tetapi induk belum mengambil exit status; tampil `<defunct>`; bila induk mengabaikan SIGCHLD, induk yang perlu di-restart | https://linuxblog.io/linux-process-states-explained |
| 5 | `ps aux --sort=-%cpu` untuk mengurutkan berdasarkan CPU | https://kx.cloudingenium.com/linux-process-management-ps-top-htop |
| 6 | `top`: tampilan real-time; `k` kill (minta PID dan sinyal; default 15/TERM), `q` keluar, `P` urut CPU (default), `M` urut memori | https://chuck.stanford.edu/planetccrma/man/man1/top.1.html; https://adhdecode-misc.pages.dev/cheatsheets/top/ |
| 7 | `htop`: penampil proses interaktif ncurses; bisa di-scroll vertikal/horizontal; `F5`/`t` tree, `F6` pilih kolom urut, `F9`/`k` kill (kirim sinyal dari menu), `F10`/`q` keluar | https://linux.die.net/man/1/htop; https://www.unix.com/man-page/linux/1/htop/; https://www.mankier.com/1/htop |
| 8 | Sinyal default `kill` adalah TERM; `kill -l` mendaftar sinyal | https://dokk.org/manpages/debian/13/procps/kill.1.en |
| 9 | SIGTERM = 15 (terminate), SIGKILL = 9; SIGKILL dan SIGSTOP tidak bisa ditangkap, diblokir, atau diabaikan (sinyal lain bisa) | signal(7): https://manpath.be/f31/man-pages/5.02-1.fc31.noarch/7/signal; https://manpages.karlosoft.com/2.46/man7/SIGNAL/ |
| 10 | Banyak proses perlu beres-beres sebelum keluar; sebaiknya SIGKILL baru dipakai bila sinyal lain tidak direspons | signal(7) (NetBSD, prinsip umum): https://www.daemon-systems.org/man/signal.7.html |
| 11 | `pgrep` mendaftar PID yang cocok; `pkill` mengirim sinyal (default SIGTERM) ke yang cocok; preview dengan `pgrep -af`, pakai `-x` untuk nama persis | https://mail.man.he.net/man1/pkill; https://www.golinuxcloud.com/kill-pkill-command-in-linux/ |
| 12 | `head -5` pada keluaran `ps aux` menampilkan header + 4 proses | Turunan dari klaim #5 (verifikasi di mesin Linux) |

**Konflik/catatan antar sumber:** tidak ada konflik pada klaim di atas. Catatan: sumber #10 adalah dokumen NetBSD, dipakai sebagai prinsip umum (bukan klaim khusus Linux). Beberapa sumber (#5, #6 cheatsheet) adalah situs sekunder; kunci klaim ada di man page.

### Cek ulang sebelum render/posting
1. Jalankan di mesin Linux/WSL (bash): buat proses beban (mis. `yes > /dev/null &`), lalu `ps aux --sort=-%cpu | head -5`, `top` (`P`, `M`, `q`), `htop` (`F6`, `F5`, `F9`), `kill PID`, `pgrep -af`. Pastikan kolom, tombol, dan urutan sama dengan layar.
2. `%CPU` pada `ps` = rata-rata sejak proses mulai, sedangkan `top` menampilkan nilai terkini; verifikasi di `man ps` dan bila perlu ubah label S2/S3 ("ps: rata-rata, top: terkini").
3. Verifikasi isi menu `F9` di `htop` (daftar sinyal dan sinyal terpilih bawaan) sebelum menampilkannya; di brief hanya keycap `F9` dan teks "kirim sinyal".
4. Verifikasi `htop` terpasang atau tidak bawaan di distro target; jangan menyebut "bawaan" tanpa dicek.
5. Cocokkan Registry snapshot (termasuk baris #8) dengan `STYLE-LEDGER.md` (ledger menang).
6. Uji pengucapan TTS (bagian 6) dan tes quantize ASCII 12 fps di render CPU.
7. Verifikasi axis `wdth` Archivo dan ketersediaan IBM Plex Mono (⟦SETUP⟧).

---

## 9. Prompt untuk agent

```text
Using /hyperframes (faceless-explainer workflow) [or /video-reels if available], build the video described in BRIEF.md.

Rules:
- Follow BRIEF.md exactly: scene timing, layout coordinates, copy, colors, fonts, motion codes (M/C/X/A), and event maps. Do NOT improvise design.
- Canvas 1080x1920, 60fps (render at 120fps then blend to 60), 75s total. Use the Design Tokens block as DESIGN.md. Horizontal center of the safe zone is x=512 (safe zone x 72-952, y 240-1460).
- Self-host fonts (Archivo variable wght+wdth, Newsreader italic, IBM Plex Mono). Do not use variable-font animation (M8). Mark unverified assumptions with ⟦SETUP⟧.
- Deterministic only: paused GSAP timelines. No Math.random/Date.now/infinite repeats. Use a fixed-seed PRNG (mulberry32) for ambient positions and fixed offset tables for camera shake.
- Wrap every scene in a camera element (#cam) and implement the camera moves in the brief. Place content in 3-4 depth layers with different parallax factors.
- Before hand-building any transition, effect, caption style, counter, or code animation, consult /hyperframes-registry and install the matching catalog block. Retint catalog blocks to the palette in DESIGN.md.
- Implement every impact as four synchronized layers (visual, camera, SFX, music) within one frame at 60fps.
- Implement the Visual Type recipe consistently: V19 ASCII art (main, scenes S1-S5 and S7) with V9 bold minimalism as an accent (S6 and S8 only). V19: one <pre> per color layer (paper, acid, red, ink), IBM Plex Mono 32px (19.2px cell, 36px line), grid at most 45x33 cells, content computed as a function of time with a fixed-seed PRNG BEFORE building the timeline and quantized to 12fps, applied via tl.call()/onUpdate. No per-character <span>s. Do not switch to a different look mid-video. If a recipe element is too heavy, follow the fallback ladder in section 7, do not substitute another style.
- Budget (section 7): no animated blur glow, no backdrop-filter, no mix-blend-mode, no goo filter, no canvas, no shader transitions. Drop elements marked "opsional" first, following the fallback ladder.
- The size of each fish, its bar, and the %CPU numbers must always be consistent (see S1-S3 and S4 table/tree). Never use red as text on the acid or paper backgrounds.
- Generate VO (calm Indonesian, ~145 wpm, casual-technical), music (120 BPM, five energy states), and SFX via the pipeline. Sync kinetic text to word-level timestamps from the VO transcript.
- STRICT: obey the "Batas konten" section (no kill -9 -1 / kill -9 1 / root killall / broad pkill patterns, no process-hiding or security-tool-disabling content, no real accounts/IPs/hosts/PIDs).
- Every number, command, key, and string on screen must match section 8 exactly; label fictional data "contoh" and abbreviated columns "disingkat". Verify the commands and key bindings in a real Linux/WSL shell before writing the composition.
- Run lint/validate/inspect (if available), then snapshot key frames (start, middle, and end of every scene, plus every transition, the wow moment at 30.8s, and the payoff impact at 54.9s). Check against the QA checklist and the Boredom Audit, and fix before rendering.
- Render to MP4 only after the checklist passes.
```

---

## 10. Caption postingan

> Satu proses bisa makan CPU sampai 98%. Tinggal tahu cara lihat dan matikannya: ps buat "foto", top dan htop buat pantau langsung, kill buat kirim sinyal. Urutannya: TERM dulu, tunggu, baru kill -9. Simpan buat nanti pas server ngadat.
>
> #linux #ps #top #htop #kill #devops #sysadmin #belajarlinux #tipsdeveloper

---

## 11. Catatan variasi (vs video sebelumnya di snapshot)

| Kolom | Video sebelumnya (#8 hak-akses-file; bila belum tercatat: #7 struktur-folder-linux) | Video ini | Beda? |
|---|---|---|---|
| Tipe visual (V) | V18+V21 (#7: V2) | **V19+V9** (V10, V2, V18 terkunci) | Ya |
| Palet | P3 (+mint) (#7: P4) | **P5 (+merah)** | Ya |
| Tipografi | T5 Unbounded + Newsreader + Geist Mono (#7: T3) | **T2 Archivo + Newsreader + IBM Plex Mono** | Ya |
| Metafora/dunia | Pos Kendali Akses (#7: Gedung Kertas) | **Akuarium Proses** | Ya |
| Teknik teks utama | M9/M12/M6 | M7/M4/M10/M12 (+M3, M1) | Ya (set pendukung ≥ 2 kode berbeda; verifikasi di ledger) |
| Arketipe layout dominan | Panel + string | Peta/denah dunia visual (tangki) + macro/micro (arketipe 12, 14) | tidak bisa diverifikasi |

Beda pada ≥ 4 dari 6 kolom (target ≥ 3). Display font berbeda (Archivo vs Unbounded); metafora tidak dipakai video mana pun.

---

## 12. Hasil Boredom Audit

| # | Pemeriksaan | Hasil (angka nyata) | Lulus? |
|---|---|---|---|
| 1 | Celah terbesar antar kejadian | 1.4s (S2 0.0→1.4; S6 1.2→2.6 dan 6.2→7.6); jeda berisi S4 = 0.6s | Ya |
| 2 | Jumlah teknik teks berbeda | 10 (M1, M3, M4, M6, M7, M9, M10, M11, M12, M13); tidak ada kode yang sama di scene berurutan | Ya |
| 3 | Jumlah jenis transisi | 5 jenis (X1, X2, X4, X5, X9) dalam 8 sambungan; match-cut/morph (X2) = 3 (S1→S2, S3→S4, S8→S1) | Ya |
| 4 | Gerak kamera per scene | 8/8 | Ya |
| 5 | Lapisan z/parallax | 4 lapisan di 8/8 scene | Ya |
| 6 | Kontras skala per scene | S1 11.25, S2 10, S3 10.6, S4 8.75, S5 9.4, S6 12.5, S7 13.1, S8 6.25 (semua ≥ 6) | Ya |
| 7 | Gerak ambient per scene | 8/8 (gelembung, grid drift, grain, napas, push-in) | Ya |
| 8 | Wow moment | 30.8s = 41.1% durasi; 4 lapisan sinkron (visual, kamera, SFX, musik) | Ya |
| 9 | Pattern interrupt | Pada 6.0, 16.0, 25.0, 30.8, 35.0, 40.5, 46.0, 54.9, 58.0, 63.3, 68.0; rentang terpanjang 10.0s (6→16) | Ya |
| 10 | Open loop | Dibuka 4.7s (chip `kill -9 ?` + VO); payoff 54.9s = 73.2% (dalam 70-85%) | Ya |
| 11 | Kurva ketegangan | 4,2,3,4,2,5,3,1; puncak S6 (impact 54.9s = 73.2%) | Ya |
| 12 | Dinamika musik | 5 keadaan energi | Ya |
| 13 | Metafora/dunia visual | Dunia 8/8 scene (100%); protagonis 8/8 (100%) | Ya |
| 14 | Budget render | Semua batas bagian 7 terpenuhi; opsional ditandai per scene | Ya |
| 15 | Keterbacaan | VO 173 kata = 2.31 kata/detik; teks layar ≤ 12 kata per momen, ≤ 25 kata per scene (S6 ≈ 22, S8 ≈ 20); kontras ≥ 4.5:1 (merah ≈ 6.0:1 hanya di atas ink) | Ya |
| 16 | Tipe visual (V) | V19+V9 berbeda dari V10/V2/V18 (3 video terakhir menurut snapshot + baris #8); V19 56s = 74.7% (≥ 70%), V9 19s = 25.3% (≤ 30%) | Ya |

---

## Baris Registry siap-tempel

| # | Tanggal | Slug / topik | V utama | V aksen | Palet | Tipografi | Metafora / Dunia visual |
|---|---|---|---|---|---|---|---|
| 9 | 9 Nov 2026 | `cek-kelola-proses-linux-ps-top-htop-kill` | V19 | V9 | P5 (+merah) | T2 (Archivo + Newsreader + IBM Plex Mono) | Akuarium Proses: ikan ASCII, protagonis PID 4821 |
