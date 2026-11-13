# BRIEF: Hak Akses File di Linux — Arti rwx dan chmod yang Bikin Bingung Pemula

- **Format:** Reels/TikTok 9:16, 1080×1920, 60 fps (render 120 fps lalu blend ke 60), **60 detik**, Bahasa Indonesia santai-teknis, dengan voice over, musik, dan SFX.
- **Engine:** HyperFrames (HTML + CSS + GSAP timeline `paused`, deterministik).
- **Status fakta:** 6 Nov 2026. Topik stabil (POSIX, GNU coreutils, Linux man-pages), tidak ada klaim yang bergantung pada waktu. Daftar "cek ulang" tetap ada di bagian 8.
- **Lingkungan render:** CPU tanpa GPU (default).
- **Sumber brief:** MASTER-PROMPT v2.2. `STYLE-LEDGER.md` tidak bisa diakses dari chat, jadi Registry memakai **snapshot di bagian 12 master prompt; snapshot mungkin basi, ledger menang**. Cocokkan dulu dengan ledger sebelum render.
- **Asumsi:** durasi default 60 detik; penonton = pemula yang pernah kena "Permission denied"; contoh memakai shell **bash**; umask contoh 022 (file baru `-rw-r--r--`); nama pengguna dan grup di contoh (`budi`, `dev`) fiktif.

---

## 0. Cara pakai file

1. Taruh file ini di folder video, mis. `videos/hak-akses-file-linux-rwx-chmod/BRIEF.md`.
2. Salin prompt di bagian 9 ke Claude Code (skill HyperFrames).
3. Biarkan agent menjalankan lint → snapshot → preview. Periksa QA bagian 7 dan Boredom Audit bagian 12.
4. Render MP4 hanya setelah checklist lulus. Setelah render, tempel baris Registry (akhir file) ke `STYLE-LEDGER.md`.

---

## 1. Konsep

**Pesan inti:** Izin file Linux itu cuma 9 saklar (3 kelas pengguna × r, w, x). `chmod` hanya memutar saklar itu, dan `chmod 777` bukan obat karena membuka semua saklar untuk semua akun di mesin.

### Concept Lab

| Kandidat | Metafora | Literal | Akurat | Gerak | Kebaruan | Feasibility | Total |
|---|---|---|---|---|---|---|---|
| **A (terpilih): Pos Kendali Akses** | Meja panel isometrik berisi 9 tuas (3 modul × r/w/x); file = blok `deploy.sh` | 5 | 5 | 4 | 4 | 4 | **22** |
| B (ditolak) | Kos-kosan: pemilik, anak kos, tamu | 4 | 3 | 3 | 2 | 4 | 16 |
| C (ditolak) | Kartu akses/kunci hotel | 4 | 3 | 4 | 1 | 4 | 16 |

- B ditolak: `x` tidak punya padanan literal di kos-kosan, dan metafora ini klise.
- C ditolak: bertabrakan dengan metafora "kunci kamar hotel" (Registry #2, PHP2Shell).

### Hook Lab (5 opsi)

| # | Jenis | Draf |
|---|---|---|
| 1 | Kontradiksi | "File-nya kamu yang bikin, tapi ditolak: permission denied." |
| 2 | Angka mengejutkan | "Semua izin file Linux cuma 9 saklar." |
| 3 | Pertanyaan yang salah | "Bukan 'kenapa error', tapi 'siapa boleh ngapain'." |
| 4 | Cold open hasil akhir | Tunjukkan `755` menyala lebih dulu, lalu bongkar. |
| 5 | Taruhan/konsekuensi | "Satu perintah yang bikin semua akun bisa ubah file-mu." |

**Dipilih: #1.** Alasan: paling dekat dengan pengalaman pemula, layar langsung bergerak (blok jatuh, error terketik), dan bisa dipasangi taruhan #5 sebagai open loop ("kenapa 777 bukan obatnya").

### Dunia visual dan protagonis

- **Dunia visual: Pos Kendali Akses**, ruang kendali isometrik (sudut 30°) dengan **meja panel 9 tuas** dan **ruang arsip** (folder). Konsisten di semua scene.
- **Protagonis visual: blok `deploy.sh`**, kubus isometrik kecil. Nasibnya: ditolak (S1), dipelajari (S2-S4), masuk ruang arsip (S5), berhasil jalan (S6), diserbu akun lain (S7), selamat dengan izin seperlunya (S8).
- Dunia visual muncul di 8/8 scene; protagonis di 8/8 (S2 sebagai ikon kecil di sudut).

### Tabel metafora

| Konsep teknis | Wujud di dunia | Gerak |
|---|---|---|
| Pemilik / grup / lainnya | Tiga modul panel (P, G, L) | Terbentuk dari tiga blok huruf (match-cut S2→S3) |
| `r` | Tuas berikon mata | Menyala mint = aktif |
| `w` | Tuas berikon pena | Menyala mint |
| `x` | Tuas berikon segitiga "play" | Menyala mint; mati = garis putus |
| `-` | Tuas turun, garis putus | Tidak menyala |
| Nilai 4-2-1 | Angka kuning melayang di atas tuas; sel split-flap | Flap berputar sampai target |
| Folder: `x` | Pintu ruang arsip | Terbuka/terkunci |
| Folder: `r` | Jendela dengan papan daftar nama | Daftar menyala |
| Folder: `w` | Lubang surat di atap | File masuk/keluar |
| `chmod 777` | Sembilan tuas merah naik semua | Tiga "akun lain" masuk |

> Folder di S5 disederhanakan ke satu kelas (pemilik). Beri label kecil "konseptual".

### Open loop dan payoff

- **Dibuka (≤ 5s):** "Kenapa ditolak? Dan kenapa 777 bukan obatnya?" (VO 4.5-5.8s di S1, chip `chmod 777 ?` di layar).
- **Mini-loop:** "kenapa ditolak" dijawab di S3 (tidak ada `x`) dan diperbaiki di S4/S6.
- **Payoff (76-90% durasi, abs 46-54s):** S7, semua akun di mesin boleh mengubah dan menjalankan file-mu.

### Tension map

| Scene | Fungsi | Ketegangan (1-5) | Energi musik |
|---|---|---|---|
| S1 | Hook | 4 | tertahan, bass rendah |
| S2 | Bedah `ls -l` | 2 | tertahan, low-pass |
| S3 | Arti r/w/x | 3 | tertahan, pulse bertambah |
| S4 | Angka 4-2-1 + **wow** | 4 | riser → terbuka |
| S5 | Folder | 2 | sedang, tanpa kick |
| S6 | Perbaikan `u+x` | 3 | naik pelan |
| S7 | Jebakan 777 (**puncak**) | 5 | tegang, drop + hit |
| S8 | Resolve | 1 | resolve hangat |

### Motif visual (maks 3)

1. Tuas isometrik yang menyala (mint) atau mati (garis putus).
2. Blok protagonis `deploy.sh`.
3. Angka kuning 4-2-1 dan sel split-flap.

**Tone:** tenang, ramah pemula, sedikit jenaka, tidak menggurui, tidak menakut-nakuti.

### Struktur retensi

| Waktu | Fungsi |
|---|---|
| 0-6s | Hook kontradiksi + open loop |
| 6-23s | Bongkar `ls -l` dan arti r/w/x |
| 23-33s | Angka 4-2-1, **wow di 29.2s (48.7%)** |
| 33-41s | Folder beda arti (mini-jebakan) |
| 41-46s | Perbaikan cepat (mini-loop ditutup) |
| 46-54s | **Payoff + puncak** (777) |
| 54-60s | Resolve, pegangan cepat, sambung ke frame awal (loop) |

---

## 2. Aturan anti-slop

**Dilarang**
- Diagram kotak-dan-garis generik; `r w x` hanya sebagai teks tanpa saklar.
- Menyarankan `chmod 777` sebagai solusi. Menampilkan perintah destruktif seperti `chmod -R 777 /`.
- Metafora hotel/kunci kamar (sudah dipakai). Klaim "seperti kunci" untuk `x` pada file.
- Bingkai HP dengan notch generik; kotak terminal palsu tanpa isi nyata.
- `backdrop-filter`, `filter: blur` beranimasi untuk glow, filter goo, `feTurbulence` animatif.
- Glitch (X10) sebagai dekorasi (tidak dipakai di video ini).
- Teks < 32px; baris > 880px; konten di luar safe zone.
- Menyebut setuid, setgid, sticky bit, atau pengecualian root tanpa verifikasi (di luar cakupan video).

**Wajib**
- **Akurat sampai level bit:** sembilan tuas di panel selalu sama dengan string izin yang tampil (lihat tabel state panel di bagian 5/S4).
- Makna warna tetap (bagian 3). Setiap izin punya ikon (mata, pena, play), bukan hanya huruf.
- Semua perintah dan output nyata (lihat bagian 8); bagian yang disederhanakan diberi catatan "disingkat" atau "konseptual".
- Terminal dengan prompt dan kursor, bukan gambar.

---

## 3. Design tokens

### Tipe visual (V) dan format narasi

- **Format narasi:** konsep/explainer teknis + tutorial ringan.
- **Tipe utama: V18 Isometric** (≥ 70% durasi). **Aksen: V21 Split-flap** (hanya S4, ±10s = 16.7%). Dicatat di Registry sebagai `V18+V21`.
- **Cek rotasi (snapshot):** 3 video terakhir memakai V2, V10, V2, jadi V2 dan V10 dicoret. Dua kandidat dari tabel format narasi (konsep/tutorial): V18 dan V19 (ASCII). Keduanya belum pernah dipakai; **V18 dipilih** karena sistem 9 tuas cocok dengan geometri isometrik. V21 ditambahkan sebagai aksen karena angka oktal cocok dengan split-flap.
- **Resep material (satu "tanda tangan" di semua scene):** objek = 3 poligon (atas, kiri, kanan) dengan shading tetap; garis tepi 3px `--line`; bayangan statis; kamera dan parallax menggeser lapisan.

### Blok CSS

```css
:root{
  --bg:#0D2B52;        /* biru blueprint, datar tanpa gradient */
  --line:#CFE3FF;      /* garis dan teks */
  --amber:#FFB703;     /* nilai/angka, kursor, penekanan */
  --red:#FF5D5D;       /* ditolak, bahaya */
  --mint:#5BE3A3;      /* izin aktif, sukses (warna ke-5; modifikasi P3) */
  /* shading isometrik: turunan --bg, bukan warna dasar baru */
  --iso-top:#3B6FB6; --iso-left:#245089; --iso-right:#173A68;
  --term:#0A2243;      /* isi jendela terminal */
  --font-display:'Unbounded', sans-serif;
  --font-accent:'Newsreader', serif;       /* italic */
  --font-mono:'Geist Mono', ui-monospace, monospace;
  --safe-x1:72px; --safe-x2:952px; --safe-y1:240px; --safe-y2:1460px;
}
/* S8 saja (flash color, invert): --bg:#CFE3FF; --line:#0D2B52; */
```

- Kontras terhadap `--bg` (perkiraan): `--line` ≈ 10.8:1, `--amber` ≈ 8.1:1, `--mint` ≈ 8.7:1, `--red` ≈ 4.7:1 (pakai untuk teks ≥ 34px atau bentuk). Hitung ulang saat implementasi.
- Canvas 1080×1920; semua konten di dalam safe zone x 72→952, y 240→1460.

### Makna warna (tetap)

| Warna | Arti |
|---|---|
| `--mint` | izin aktif, berhasil |
| garis putus `--line` 35% | izin mati (`-`) |
| `--red` | ditolak, bahaya |
| `--amber` | nilai/angka (4, 2, 1, 755), kursor, penekanan |

### Matematika isometrik

`proj(x, y, z) = (ox + (x − y)·0.866·u, oy + (x + y)·0.5·u − z·u)`, dengan unit `u = 120px`. Kubus sisi `s` terproyeksi selebar `1.732·s` dan setinggi `2·s`. Kubus protagonis `s = 140px` ≈ 243×280px.

### Tipografi

| Peran | Font | Ukuran |
|---|---|---|
| Display (judul, angka raksasa) | Unbounded (T5, hemat, hanya judul/angka) | 88-320px |
| Aksen | Newsreader italic | 48-56px |
| Mono (terminal, string izin, flap) | Geist Mono | 32-240px |

- Lebar teks: Unbounded ≈ 0.7-0.75 × ukuran × jumlah karakter; mono ≈ 0.6.
- Teks terkecil 32px. Semua baris ≤ 880px.
- **M8 tidak dipakai** (axis Unbounded/Geist Mono belum terverifikasi, tandai ⟦SETUP⟧). Bila nanti ingin dipakai, cek axis dulu.

### Teknik teks yang dipakai (kode M)

| Teknik | Dipakai di |
|---|---|
| M1 Mask reveal | S2, S5, S8 |
| M2 Bar-wipe | S6 |
| M3 Cut + type | S1, S4, S6 |
| M4 Stamp | S1, S4, S8 |
| M6 Word slam | S1, S7 |
| M9 Split-flap/counter | S4 |
| M10 Slice | S2, S5 |
| M11 Outline → fill sweep | S7 |
| M12 Per-karakter drop | S3 |

Tidak ada teknik primer yang sama di dua scene berurutan: S1 {M6, M3, M4} → S2 {M1, M10} → S3 {M12} → S4 {M4, M9, M3} → S5 {M10, M1} → S6 {M3, M2} → S7 {M6, M11} → S8 {M4, M1}. Antar scene bersebelahan tidak ada kode yang sama.

### Preset kamera (kode C)

| Kode | Dipakai |
|---|---|
| C1 push-in 1.00→1.06 | S1, S2 |
| C2 pull-back | S4 (1.30→1.00), S5 (1.15→1.00), S7 (1.15→1.00) |
| C3 pan menyusuri panel | S3 |
| C4 rack focus (≤ 3 elemen di-blur 4px; fallback: turunkan opasitas) | S2, S3 |
| C6 parallax shift | S5, S6, S8 |
| C7 guncang halus (tabel offset tetap) | S1, S7 |

### Transisi (kode X) — semua CSS, 0 shader

| Dari→ke | Kode | Makna |
|---|---|---|
| S1→S2 | X1 panel wipe kuning | Ganti mode: error → bedah |
| S2→S3 | **X2 match-cut** | Tiga grup huruf menjadi tiga modul panel |
| S3→S4 | **X2 match-cut** | Kolom r/w/x menjadi sel angka |
| S4→S5 | X7 3D flip | File ↔ folder (dua sisi satu hal) |
| S5→S6 | X5 push | Urutan langkah: pintu menutup, terminal naik |
| S6→S7 | X4 iris | Fokus ke `777` |
| S7→S8 | X9 scale-fill | Lampu mengembang jadi latar terang (flash color) |
| S8→S1 (loop) | **X2 morph** | Layout S8 menjadi frame awal S1 |

### Ambient (kode A)

A1 grain statis (di-translate bertahap), A3 grid titik dengan parallax drift, A5 "napas" ±1% (lampu panel), A6 kedip caret (pengulangan terbatas, bukan `repeat:-1`), A8 shimmer (S4 saja, opsional). Partikel: 0 (kecuali ≤ 20 elemen "poof" di S5).

### Bahasa gerak dan easing (maks 3 per scene)

| Scene | Easing |
|---|---|
| S1 | `back.out(1.7)`, `steps(n)`, `sine.inOut` |
| S2 | `power4.out`, `power2.inOut`, `steps(n)` |
| S3 | `back.out(1.7)`, `power2.inOut`, `sine.inOut` |
| S4 | `expo.out`, `steps(n)`, `power2.inOut` |
| S5 | `power4.out`, `power2.inOut`, `back.out(1.7)` |
| S6 | `steps(n)`, `power2.inOut`, `power4.out` |
| S7 | `back.out(1.7)`, `expo.out`, `power2.inOut` |
| S8 | `expo.out`, `power4.out`, `power2.inOut` |

Guncang C7 dari **tabel offset tetap** (bukan random), mis. `[0,+14,-12,+9,-7,+4,-2,0]` px per frame-langkah @ 60fps.

### Elemen persisten

- **Blok protagonis** `deploy.sh` (kubus iso `s=140`; ikon `s=60` di S2).
- **HUD izin** pojok kiri atas (x 72, y 252, mono 32px): string izin + angka, mis. `rw-r--r-- 644`. Tampil di S3, S4, S6, S7; selalu sama dengan state panel.

---

## 4. Event Map dan Peta scene

| # | Waktu abs | Durasi | Nama | Latar | Layout | Kamera | Transisi masuk | Wow/interrupt | Jml kejadian |
|---|---|---|---|---|---|---|---|---|---|
| S1 | 0.0-6.0 | 6.0 | Hook: Permission denied | `--bg` + grid | Terminal atas, kata raksasa, blok iso | C1 + C7 | – (frame awal/loop) | Impact "denied" 3.0s | 10 |
| S2 | 6.0-14.0 | 8.0 | Bedah `ls -l` | `--bg` + angka `10` raksasa dim | String izin 100px tengah | C1 + C4 | X1 | Perubahan mode: terminal → bedah | 12 |
| S3 | 14.0-23.0 | 9.0 | Arti r, w, x | Panel iso 3 modul | 9 tuas + glyph | C3 + C4 | X2 (match-cut) | Perubahan mode: panel hidup | 11 |
| S4 | 23.0-33.0 | 10.0 | Angka 4-2-1 | Panel + 3 sel flap | Flap 240px atas, panel bawah | C2 | X2 (match-cut) | **WOW 29.2s** + flash color | 15 |
| S5 | 33.0-41.0 | 8.0 | Folder ≠ file | Ruang arsip iso | Ruang arsip tengah | C2 + C6 | X7 | Perubahan skala/objek (file → folder) | 11 |
| S6 | 41.0-46.0 | 5.0 | Perbaikan `u+x` | Terminal + panel | Terminal atas, chip, panel kecil | C6 | X5 | Rewind panel | 8 |
| S7 | 46.0-54.0 | 8.0 | Jebakan 777 | Panel merah + ruang arsip terbuka | `777` raksasa, panel | C7 + C2 | X4 | **Impact 47.2s**, puncak | 10 |
| S8 | 54.0-60.0 | 6.0 | Pegangan cepat | Latar terang (invert) | Tiga kartu stamp | C6 | X9 | Flash color + loop morph | 7 |

Total 60.0s; semua batas di kelipatan 0.5s. Total kejadian 84 (rata-rata satu per 0.71s).

**Kurva energi musik:** tertahan (0-23s) → riser (26.5-29.2) → terbuka (29.2-33) → sedang (33-41) → tegang (41-54, drop di 47.2) → resolve hangat (54-60).

---

## 5. Detail scene

> Semua waktu di Event Map **relatif ke awal scene**. Koordinat = pojok kiri-atas elemen kecuali ditulis "tengah". Kamera membungkus isi scene dalam `#cam`.

### Tabel state panel (acuan bit-accurate)

| Momen | String | Angka | Tuas aktif (P / G / L) |
|---|---|---|---|
| S2-S3 awal | `rw-r--r--` | 644 | rw- / r-- / r-- (4 menyala) |
| S4 sebelum wow | `rw-r--r--` | 644 | sama |
| S4 sesudah wow | `rwxr-xr-x` | 755 | rwx / r-x / r-x (7 menyala; `w` di G dan L mati) |
| S6 setelah reset + `u+x` | `rwxr--r--` | 744 | rwx / r-- / r-- |
| S7 | `rwxrwxrwx` | 777 | 9 menyala (merah) |

---

### S1 · HOOK: PERMISSION DENIED (0.0-6.0, 6.0s) · latar `--bg`

**Tujuan:** pemula langsung melihat masalahnya dan terpancing dua pertanyaan.
**VO (14 kata):** "File-nya kamu yang bikin, tapi ditolak: permission denied. Kenapa? Dan kenapa 777 bukan obatnya?"
**Dunia visual / protagonis:** blok `deploy.sh` jatuh ke ubin isometrik, ditolak, menggeleng.
**Lapisan:** latar = grid titik `--line` 15% (parallax 0.2×) + grain A1; tengah = terminal + judul; depan = blok protagonis dan chip (parallax 1.3×); overlay = vignette tipis + flash merah saat impact.
**Kamera:** C1 push-in 1.00→1.06 (0-6s, `sine.inOut`); kick +3% (0.2s) saat impact; C7 guncang dari tabel offset.

| Elemen | x, y | Ukuran | Font | Warna |
|---|---|---|---|---|
| Terminal (bingkai) | 72, 260 | 880×360 | – | isi `--term`, tepi 3px `--line` |
| `$ ./deploy.sh` | 112, 310 | 40px | Geist Mono | `$` `--amber`, sisanya `--line` |
| `bash: ./deploy.sh: Permission denied` | 112, 400 | 34px (≈775px) | Geist Mono | `--red` |
| "Permission" | tengah, y 690 | 120px (≈840px) | Unbounded | `--line` |
| "denied" | tengah, y 800-1000 | 200px (≈840px) | Unbounded | `--red` |
| Blok `deploy.sh` (iso, s=140) | tengah (540, 1180) | 243×280 | label 32px Geist Mono di y 1340 | shading iso |
| Chip `chmod 777 ?` | tengah, y 1400 | 48px | Geist Mono | `--amber` |

Rasio skala: 200 : 32 = **6.25 : 1**. Frame t=0 sudah layak jadi cover (terminal + prompt + blok melayang).

**Gerak:** Primer = error terketik lalu "denied" menghantam. Sekunder = blok menggeleng, chip menyusul. Ambient = grid drift A3, grain A1, caret A6 (≤ 4 kedipan), blok bernapas A5.

**Event Map**

| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Kamera, latar | Push-in dimulai; grid drift; blok melayang bernapas | C1, A3, A5 | `sine.inOut` | pad rendah masuk |
| 0.0 | Tengah | Terminal sudah terbuka, prompt `$ ./deploy.sh` terpasang, caret berkedip | A6 | `steps` | – |
| 0.3 | Depan | Blok jatuh 160px ke ubin, squash 1.0→0.88→1.0 | drop + squash | `back.out(1.7)` | thud ringan (VO mulai) |
| 1.2 | Tengah | Enter: baris prompt menyala `--amber` 2 frame | highlight | `steps` | klik |
| 1.8 | Tengah | Baris error terketik merah (0.7s) | M3 | `steps` | ketik cepat |
| 2.5 | Tengah | "Permission" menghantam (scale 1.4→1) | M6 | `back.out(1.7)` | thud |
| 3.0 | Semua | **"denied" menghantam 200px = IMPACT** (lihat bawah) | M6 + impact | `back.out(1.7)` | **impact** + hit musik |
| 3.6 | Depan | Blok menggeleng (offset ±14px ×3) + tanda ✕ merah distempel | M4 | `back.out(1.7)` | buzzer pendek |
| 4.5 | Depan | Chip `chmod 777 ?` distempel di atas blok | M4 | `back.out(1.7)` | klik cap |
| 5.4 | Semua | Wipe kuning dari kiri menutup scene (0.6s) | X1 | `sine.inOut` | whoosh |

Celah terbesar: 0.9s.
**Catalog block:** cek registry untuk: terminal typing, grain overlay, panel wipe.
**Impact (3.0s):** visual = "denied" 1.4→1 (0.25s) + flash merah 2 frame; kamera = kick +3% lalu C7; SFX = thud + buzzer di frame pertama; musik = hit + low-pass terbuka sesaat. Elemen sekunder (blok, chip) bereaksi 0.1-0.2s setelahnya.
**Match cut:** tidak ada (X1 wipe).

---

### S2 · BEDAH ls -l (6.0-14.0, 8.0s) · latar `--bg` + angka `10`

**Tujuan:** mengajari membaca string 10 karakter: 1 jenis + 3 blok × 3 huruf.
**VO (19 kata):** "Ketik ls -l. Sepuluh karakter di depan itu kuncinya. Satu untuk jenis file, sisanya tiga blok: pemilik, grup, lainnya."
**Dunia visual / protagonis:** layar monitor ruang kendali menampilkan hasil `ls -l`; ikon kecil blok `deploy.sh` di pojok.
**Lapisan:** latar = angka `10` dim (parallax 0.2×) + grain; tengah = string izin; depan = label dan garis hubung (parallax 1.3×); overlay = vignette.
**Kamera:** C1 push-in 1.06→1.12 sepanjang scene; C4 rack focus ke string izin (1.4-2.0s; baris lain di-blur 4px, maks 3 elemen).

| Elemen | x, y | Ukuran | Font | Warna |
|---|---|---|---|---|
| Angka `10` (latar) | tengah, y 560-880 | 320px | Unbounded | `--line` 10% |
| Prompt `$ ls -l deploy.sh` | 112, 280 | 40px | Geist Mono | `$` `--amber` |
| String `-` / `rw-` / `r--` / `r--` | x 186 / 282 / 498 / 714, y 640 | 100px (60px per karakter, celah 36px) | Geist Mono | `--line`; huruf `r`, `w` aktif `--mint` |
| Label PEMILIK / GRUP / LAINNYA | di bawah grup, y 790 | 40px (≈168px) | Geist Mono | `--amber` |
| Sisa baris `1 budi dev 482 Nov 6 deploy.sh` (disingkat) | 252, 940 | 32px (≈576px) | Geist Mono | `--line` 70%; `budi`, `dev` `--amber` |
| Tooltip `- file · d folder` | tengah, y 740 | 32px | Geist Mono | `--line` |
| Ikon blok kecil (s=60) | 840, 1180 | ≈104×120 | label 32px | shading iso |

Rasio skala: 320 : 32 = **10 : 1**.

**Gerak:** Primer = string terbelah jadi 4 grup. Sekunder = garis hubung `budi`→PEMILIK, `dev`→GRUP. Ambient = grid drift, grain, napas lampu.

**Event Map**

| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Tengah | Wipe kuning selesai; prompt `$ ls -l deploy.sh` muncul dari baseline | M1 | `power4.out` | klik |
| 0.9 | Tengah | Output `-rw-r--r-- 1 budi dev 482 Nov 6 deploy.sh` masuk sekali potong | cut | `steps` | tick |
| 1.4 | Kamera | Rack focus ke string izin, push-in lanjut | C4 | `power2.inOut` | whoosh |
| 2.0 | Latar | Angka `10` muncul dim; 10 karakter menyala berurutan (stagger 0.1s) | stagger | `power4.out` | tick ×10 |
| 2.9 | Depan | Kurung `1 + 9` digambar di atas string | draw | `power2.inOut` | zip |
| 3.6 | Tengah | Karakter `-` terpisah ke kiri, tooltip `- file · d folder` | M1 | `power4.out` | klik |
| 4.6 | Tengah | Celah antar grup melebar (36px → 48px) | layout shift | `power2.inOut` | swish kecil |
| 5.1 | Depan | Label PEMILIK terpotong lalu menyatu | M10 | `power4.out` | tick |
| 5.7 | Depan | Label GRUP | M10 | `power4.out` | tick |
| 6.3 | Depan | Label LAINNYA | M10 | `power4.out` | tick |
| 6.9 | Depan | Garis hubung `budi`→PEMILIK dan `dev`→GRUP digambar | draw | `power2.inOut` | zip ×2 |
| 7.4 | Semua | Tiga grup terangkat dan membesar jadi tiga modul panel (X2) | X2 | `power2.inOut` | swish |

Celah terbesar: 1.0s.
**Catalog block:** cek registry untuk: match-cut/morph, text slice.
**Impact:** tidak ada beat besar di scene ini (tension 2). Beat kecil di 2.0s: tick berurutan + kamera kick 1%.
**Match cut ke S3:** tiga grup huruf (`rw-`, `r--`, `r--`) → tiga modul panel isometrik P, G, L.

---

### S3 · ARTI r, w, x (14.0-23.0, 9.0s) · latar panel iso

**Tujuan:** menjelaskan `r` baca, `w` ubah, `x` jalankan, dan kenapa skrip ditolak (tidak ada `x`).
**VO (22 kata):** "Tiga hurufnya: r boleh baca, w boleh ubah, x boleh jalankan. Skrip kamu belum punya x, jadi ditolak. Strip berarti tidak ada."
**Dunia visual / protagonis:** meja panel dengan tiga modul; blok `deploy.sh` mencoba "dijalankan" di modul PEMILIK.
**Lapisan:** latar = grid titik (0.2×) + glyph `rwx` raksasa dim; tengah = tiga modul + 9 tuas; depan = ikon, glyph, blok protagonis (1.3×); overlay = grain + vignette.
**Kamera:** C3 pan horizontal pelan (translateX +40→-40px, 0.9-8.4s); C4 rack focus saat blok mencoba jalan (4.6s).

| Elemen | x, y | Ukuran | Font | Warna |
|---|---|---|---|---|
| Modul P / G / L (slab iso, s=110) | pusat (310,1000) / (540,1130) / (770,1260) | 190 lebar × 150 tinggi tiap modul | – | shading iso |
| Tuas r, w, x (3 per modul) | sepanjang sumbu x iso modul, jarak 45px | tiang 24×60 + ikon 36px | – | aktif `--mint`, mati garis putus `--line` 35% |
| Glyph `r` / `w` / `x` | tengah, y 560 | 160px | Geist Mono | `--line`; saat aktif `--mint` |
| Glyph latar `rwx` | tengah, y 400-700 | 240px (≈432px) | Geist Mono | `--line` 8% |
| Label `PEMILIK GRUP LAINNYA` | di atas modul, y −70 dari modul | 32px | Geist Mono | `--amber` |
| Teks `x mati → ditolak` | tengah, y 760 | 48px (≈490px) | Geist Mono | `--red` |
| Tooltip `strip = tidak ada` | tengah, y 840 | 32px | Geist Mono | `--line` |
| HUD `rw-r--r-- 644` | 72, 252 | 32px | Geist Mono | `--line` |

Rasio skala: 240 : 32 = **7.5 : 1**.

**Gerak:** Primer = r, w, x muncul satu per satu. Sekunder = tuas bereaksi (overshoot), lampu merah berkedip saat ditolak. Ambient = lampu bernapas A5, grid drift, grain.

**Event Map**

| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Tengah | Modul terbentuk; 9 tuas jatuh ke posisi (stagger 0.08s) | stagger drop | `back.out(1.7)` | tick ×9 |
| 0.9 | Kamera | Pan C3 dimulai; lampu panel bernapas | C3, A5 | `sine.inOut` | hum rendah |
| 1.1 | Depan | `r` menyala (tuas P-r, mata terbuka); glyph `r` jatuh per karakter | M12 | `back.out(1.7)` | ding |
| 2.2 | Depan | `w` menyala (pena); glyph `w` | M12 | `back.out(1.7)` | ding |
| 3.3 | Depan | Glyph `x`; tuas P-x terlihat **mati** (garis putus) | M12 | `back.out(1.7)` | ding rendah |
| 4.6 | Depan | Blok bergeser ke P, mencoba jalan; lampu merah berkedip; rack focus ke tuas x | C4 | `power2.inOut` | buzzer lembut |
| 5.4 | Tengah | Tuas x di G dan L juga tampil mati (stagger 0.15s) | stagger | `sine.inOut` | tick ×2 |
| 6.3 | Tengah | `x mati → ditolak` jatuh per karakter | M12 | `back.out(1.7)` | thud kecil |
| 7.3 | Depan | Strip pada modul disorot; tooltip `strip = tidak ada` | M12 | `back.out(1.7)` | klik |
| 8.0 | Depan | Nilai kuning 4, 2, 1 menempel di atas tuas r, w, x (pratinjau) | stagger | `power2.inOut` | tick ×3 |
| 8.4 | Semua | Kolom tuas memadat jadi tiga sel angka (X2) | X2 | `power2.inOut` | swish |

Celah terbesar: 1.3s.
**Catalog block:** cek registry untuk: match-cut/morph.
**Impact:** beat kecil 4.6s (ditolak): lampu merah + kamera kick 2% + buzzer + dip musik.
**Match cut ke S4:** tiga kolom tuas (r/w/x) dengan nilai 4-2-1 → tiga sel split-flap.

---

### S4 · ANGKA 4-2-1 + WOW (23.0-33.0, 10.0s) · latar panel + flap

**Tujuan:** menunjukkan cara menjumlahkan jadi satu digit per kelas; wow saat `644` berubah jadi `755`.
**VO (21 kata):** "Biar cepat, tiap huruf punya nilai. r empat, w dua, x satu. Jumlahkan per blok. Tujuh, lima, lima. Itu chmod 755."
**Dunia visual / protagonis:** tiga sel split-flap di atas panel; blok `deploy.sh` menyala di tengah saat wow.
**Lapisan:** latar = grid (0.2×) + angka `755` raksasa dim; tengah = flap + panel iso; depan = nilai kuning, ring kejut (1.3×); overlay = grain + flash color.
**Kamera:** C2 pull-back 1.30→1.00 (0-2s); C1 sangat pelan 1.00→1.03 di jeda berisi; kick +4% saat wow; C2 final 1.03→1.00 (9.0s).

| Elemen | x, y | Ukuran | Font | Warna |
|---|---|---|---|---|
| Sel flap (3) | x 200 / 440 / 680, y 520 | 200×280 tiap sel, celah 40px | Geist Mono 240px (digit) | sel `--term`, digit `--amber`, garis lipatan `--line` |
| Caption flap `4+2` / `4` / `4` | di bawah sel, y 830 | 32px | Geist Mono | `--line` |
| Nilai stamp `4` `2` `1` | di atas tuas r, w, x kolom P | 56px | Geist Mono | `--amber` |
| Panel iso (modul P, G, L) | pusat (310,1130) / (540,1260) / (770,1390) | dikecilkan 0.8× dari S3 | – | state 644 → 755 |
| Teks `+1 tiap x` | tengah, y 930 | 40px | Geist Mono | `--line` |
| String `rwxr-xr-x` | tengah, y 980 | 64px (≈346px) | Geist Mono | `--mint` |
| `chmod 755 deploy.sh` | tengah, y 1060 | 40px (≈480px) | Geist Mono | `--line`; `755` 96px `--amber` |
| Angka `755` (latar) | tengah, y 400-700 | 240px | Unbounded | `--line` 8% |

Rasio skala: 240 : 32 = **7.5 : 1**. Elemen DOM flap: 3 sel × 4 = 12.

**Gerak:** Primer = flap berputar sampai target. Sekunder = tuas x berputar ON, lampu menyala berurutan, ring kejut. Ambient = shimmer A8 (opsional), lampu bernapas, grid drift.

**Event Map**

| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Kamera, tengah | Sel flap kosong terbentuk dari kolom; pull-back | C2, X2 settle | `power2.inOut` | swish |
| 1.2 | Tengah | `huruf = angka` terketik | M3 | `steps` | klik |
| 2.4 | Depan | Stamp `4` di tuas r | M4 | `expo.out` | ding (nada 1) |
| 3.0 | Depan | Stamp `2` di tuas w | M4 | `expo.out` | ding (nada 2) |
| 3.6 | Depan | Stamp `1` di tuas x | M4 | `expo.out` | ding (nada 3) |
| 4.4 | Tengah | Flap PEMILIK 0→6 (6 langkah × 0.1s); caption `4+2` | M9 | `steps` | klak ×6 |
| 4.6 | Tengah | Flap GRUP 0→4; caption `4` | M9 | `steps` | klak ×4 |
| 4.8 | Tengah | Flap LAINNYA 0→4; caption `4`; layar menampilkan `644` | M9 | `steps` | klak ×4 |
| 5.5 | Semua | **Jeda berisi 0.6s:** audio hening, kamera drift pelan, lampu bernapas; riser mencapai puncak | C1, A5 | `power2.inOut` | hening (0.6s) |
| 6.2 | Semua | **WOW** (lihat bawah): tiga tuas `x` ON serentak, flap 6→7, 4→5, 4→5 | M9 + impact | `expo.out` | **impact** + hit musik |
| 6.9 | Depan | Lampu menyala berurutan sampai 7 aktif (stagger 0.07s) | stagger | `expo.out` | tick ×7 |
| 7.4 | Depan | String `rwxr-xr-x` terketik | M3 | `steps` | ketik |
| 8.0 | Tengah | `chmod 755 deploy.sh` terketik; `755` membesar ke 96px | M3 | `steps` | klik |
| 9.0 | Kamera, overlay | Pull-back akhir; shimmer melintas | C2, A8 | `power2.inOut` | whoosh turun |
| 9.5 | Semua | Blok file berputar 3D jadi blok folder (0.5s) | X7 | `power2.inOut` | swish |

Celah terbesar: 1.2s.
**Catalog block:** cek registry untuk: split-flap/counter, light-leak/flash (retint ke palet).
**Impact / WOW (6.2s = abs 29.2s, 48.7% durasi):** visual = tiga tuas `x` berputar ON + flap berganti + **flash color** (invert palet 3 frame) + ring kejut isometrik mengembang; kamera = kick +4% (0.2s); SFX = impact + klak flap di frame pertama; musik = drop ke keadaan "terbuka" (riser 4.6-6.2 berhenti, hening 5.6-6.2, lalu hit). Semua empat lapisan dalam ±1 frame @ 60fps.
**Match cut ke S5:** blok file `deploy.sh` → blok folder `proyek/` (X7 flip).

---

### S5 · FOLDER ≠ FILE (33.0-41.0, 8.0s) · latar ruang arsip iso

**Tujuan:** di folder, `x` = boleh masuk, `r` = boleh lihat daftar, `w` = boleh tambah/hapus (asal ada `x`).
**VO (20 kata):** "Di folder artinya beda. x boleh masuk. r boleh lihat daftar. w boleh tambah atau hapus file, asal ada x."
**Dunia visual / protagonis:** ruang arsip isometrik; blok `deploy.sh` masuk lewat pintu.
**Lapisan:** latar = grid (0.2×) + teks `proyek/` raksasa dim; tengah = ruang arsip; depan = file dan blok protagonis (1.3×); overlay = grain.
**Kamera:** C2 pull-back 1.15→1.00; C6 parallax shift.

| Elemen | x, y | Ukuran | Font | Warna |
|---|---|---|---|---|
| Ruang arsip (kubus iso s=240) | pusat (540, 1000) | 416×480 | label `proyek/` 40px | shading iso |
| `proyek/` (latar) | tengah, y 480-680 | 200px (≈720px) | Geist Mono | `--line` 8% |
| Judul `Folder ≠ File` | tengah, y 300 | 88px (≈800px) | Unbounded | `--line` |
| Pintu (sisi kanan), jendela (kiri), lubang surat (atap) | pada ruang arsip | pintu 70×110, jendela 80×60 | – | aktif `--mint` |
| Daftar di jendela `a.txt` `b.sh` `notes` | di jendela | 32px | Geist Mono | `--line` |
| Tag `x = masuk` / `r = daftar` / `w = tambah/hapus` | di atas elemen, 40px | 40px | Geist Mono | `--amber` |
| Tag `hapus = izin folder, bukan file` | tengah, y 1330 | 34px (≈612px) | Geist Mono | `--line` |
| Tag merah `w tanpa x = tidak bisa` | tengah, y 1330 | 40px (≈528px) | Geist Mono | `--red` |

Rasio skala: 200 : 32 = **6.25 : 1**. Label kecil "konseptual: satu kelas (pemilik)" 32px di pojok bawah.

**Gerak:** Primer = pintu, jendela, lubang surat menyala bergantian. Sekunder = file masuk dan keluar, daftar bergulir. Ambient = grid drift, grain, napas lampu.

**Event Map**

| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Kamera, tengah | Flip selesai; ruang arsip tampil; pull-back | C2 | `power2.inOut` | swish selesai |
| 0.4 | Depan | Judul `Folder ≠ File` terpotong lalu menyatu | M10 | `power4.out` | tick |
| 1.2 | Latar | Teks `proyek/` dim muncul; grid drift | A3 | `power2.inOut` | hum |
| 1.9 | Depan | Tag `x = masuk`; pintu terbuka; blok masuk | M1 | `power4.out` | klik pintu |
| 3.2 | Tengah | Jendela menyala; tag `r = daftar`; papan nama tampil | M1 | `power4.out` | ding |
| 4.0 | Tengah | Daftar nama bergulir 1 baris | scroll | `power2.inOut` | tick |
| 4.7 | Depan | Lubang surat menyala; `baru.txt` jatuh masuk | drop | `back.out(1.7)` | thud kecil |
| 5.6 | Depan | `lama.log` keluar (≤ 20 partikel poof); tag `hapus = izin folder, bukan file` | M1 | `power4.out` | poof |
| 6.4 | Depan | Pintu terkunci (x mati); lubang surat macet bergetar; tag merah | M10 | `power4.out` | buzzer lembut |
| 7.2 | Tengah | Pintu kembali terbuka (x ON) | – | `power2.inOut` | klik |
| 7.5 | Semua | Pintu menutup, terminal naik dari bawah (push) | X5 | `power2.inOut` | whoosh |

Celah terbesar: 1.3s.
**Catalog block:** cek registry untuk: push/cover transition, particle poof (opsional).
**Impact:** beat kecil di 6.4s (terkunci): lampu merah + kick 2% + buzzer.
**Match cut ke S6:** tidak ada (X5 push).

---

### S6 · PERBAIKAN u+x (41.0-46.0, 5.0s) · latar terminal + panel

**Tujuan:** menutup mini-loop "kenapa ditolak": cukup tambah `x` untuk pemilik.
**VO (10 kata):** "Atau pakai huruf: chmod u plus x. Cuma pemilik. Jalan."
**Dunia visual / protagonis:** panel di-reset ke 644, tuas `x` pemilik naik, blok `deploy.sh` melaju.
**Lapisan:** latar = grid (0.2×) + `u+x` raksasa dim; tengah = terminal + chip; depan = panel kecil + blok protagonis (1.3×); overlay = grain.
**Kamera:** C6 parallax shift pelan (translateX 0→-30px).

| Elemen | x, y | Ukuran | Font | Warna |
|---|---|---|---|---|
| Terminal | 72, 260 | 880×300 | – | isi `--term` |
| `$ chmod u+x deploy.sh` | 112, 310 | 40px (≈456px) | Geist Mono | `$` `--amber` |
| `$ ./deploy.sh` lalu `deploy selesai` (contoh) | 112, 380 / 440 | 40px | Geist Mono | `--line`; keluaran `--mint` |
| Chip `u` `g` `o` `a` | y 700, x 112 + 90·i | 64px | Geist Mono | `--amber` |
| Chip `+` `−` `=` | y 800 | 64px | Geist Mono | `--line` |
| Panel kecil (3 modul 0.6×) | pusat (540, 1150) | ±360 lebar | – | state 644 → 744 |
| `u+x` (latar) | tengah, y 460-680 | 220px | Geist Mono | `--line` 8% |
| HUD `rwxr--r-- 744` | 72, 252 | 32px | Geist Mono | `--line` |

Rasio skala: 220 : 32 = **6.9 : 1**.

**Event Map**

| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Depan | Rewind: panel kembali ke 644 (0.4s); HUD ke `rw-r--r-- 644` | rewind | `power2.inOut` | whoosh terbalik |
| 0.5 | Tengah | Chip `u g o a` dan `+ − =` menyapu masuk (stagger) | M2 | `power4.out` | tick ×7 |
| 1.0 | Tengah | `chmod u+x deploy.sh` terketik | M3 | `steps` | ketik |
| 2.0 | Depan | Chip `u`, `+`, `x` menyala; garis ke tuas x PEMILIK; tuas naik ON; HUD → `rwxr--r-- 744` | draw | `power2.inOut` | ding |
| 2.7 | Tengah | `./deploy.sh` terketik, Enter | M3 | `steps` | ketik + klik |
| 3.4 | Tengah | Keluaran `deploy selesai` (contoh) muncul; centang mint digambar | draw | `power2.inOut` | ding sukses |
| 3.9 | Depan | Blok protagonis melaju ke depan 120px, lampu hijau | slide | `power4.out` | whoosh kecil |
| 4.5 | Semua | Iris menutup pada area `u+x` | X4 | `power2.inOut` | whoosh |

Celah terbesar: 1.0s.
**Catalog block:** cek registry untuk: iris transition, typing.
**Impact:** beat kecil 3.4s (sukses): centang + musik resolve singkat (satu nada naik).
**Match cut ke S7:** iris menutup lalu membuka di `777` (X4).

---

### S7 · JEBAKAN 777 (46.0-54.0, 8.0s) · latar panel merah + ruang arsip terbuka

**Tujuan:** payoff open loop: `777` = semua akun boleh baca, ubah, dan jalankan; bukan solusi.
**VO (20 kata):** "Tapi jangan panik lalu chmod 777. Itu artinya semua akun di mesin itu boleh mengubah dan menjalankan file-mu. Bukan solusi."
**Dunia visual / protagonis:** semua tuas naik merah; tiga kubus kecil "akun lain" masuk ruang arsip; blok `deploy.sh` terancam.
**Lapisan:** latar = grid merah redup (0.2×); tengah = panel + ruang arsip; depan = avatar kecil, `777` raksasa (1.3×); overlay = vignette merah + flash.
**Kamera:** C7 guncang halus (4.6s); C2 pull-back 1.15→1.00 (5.3s).

| Elemen | x, y | Ukuran | Font | Warna |
|---|---|---|---|---|
| `777` raksasa | tengah, y 300-560 | 300px (≈675px) | Unbounded | outline `--red` → isi `--red` |
| `$ chmod 777 deploy.sh` | 112, 640 | 40px | Geist Mono | `--line`; `777` `--red` |
| Panel iso (9 tuas merah) | pusat (310,1000) / (540,1130) / (770,1260) | sama S3 | – | semua ON, `--red` |
| Ruang arsip (s=140) | pusat (540, 1200) | 243×280 | – | shading iso |
| Tiga avatar kubus (s=50) label `akun lain` | x 200/420/640, y 1330 | 32px label | Geist Mono | `--line` |
| `semua akun` | tengah, y 780 | 96px (≈ 770px) | Unbounded | `--line` |
| `777 ≠ solusi` | tengah, y 780 | 96px (≈ 830px) | Unbounded | `--red` |
| HUD `rwxrwxrwx 777` | 72, 252 | 32px | Geist Mono | `--red` |

Rasio skala: 300 : 32 = **9.4 : 1**.
**Catatan akurasi:** "semua akun di mesin" (bukan "semua orang di internet"). `777` tidak membuka akses jaringan sendiri; yang berubah: kelas "lainnya" (semua akun yang bukan pemilik/anggota grup) dapat r/w/x.

**Event Map**

| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Depan | Iris membuka; `777` outline → isi merah | M11 | `power2.inOut` | whoosh terbuka |
| 0.8 | Tengah | Baris `$ chmod 777 deploy.sh` muncul (potong); caret | cut | `steps` | klik |
| 1.2 | Semua | **IMPACT:** sembilan tuas naik serentak, merah; flash merah; kick | impact | `expo.out` | **impact** + drop musik |
| 2.4 | Tengah | `semua akun` menghantam | M6 | `back.out(1.7)` | thud |
| 3.0 | Depan | Pintu ruang arsip terbuka lebar; tiga avatar `akun lain` masuk (stagger) | stagger | `back.out(1.7)` | langkah ×3 |
| 3.8 | Tengah | Avatar 2 menulis: blok protagonis dicoret merah, stempel `diubah` | M6 kecil | `back.out(1.7)` | goresan |
| 4.6 | Depan | Avatar 3 menjalankan: lampu merah berkedip; guncang C7 | C7 | tabel offset | alarm rendah |
| 5.3 | Kamera | Pull-back memperlihatkan panel dan ruang penuh merah | C2 | `power2.inOut` | whoosh |
| 6.4 | Semua | `777 ≠ solusi` menghantam; kick kecil | M6 | `back.out(1.7)` | thud + hit |
| 7.2 | Depan | Tuas merah turun satu per satu (stagger 0.1s) | stagger | `power2.inOut` | tick ×9 turun |
| 7.6 | Semua | Lampu mint mengembang jadi latar terang (S8) | X9 | `power2.inOut` | riser pendek |

Celah terbesar: 1.2s.
**Catalog block:** cek registry untuk: iris transition, scale-fill transition.
**Impact (1.2s = abs 47.2s, 78.7%):** visual = 9 tuas snap ON + flash merah 3 frame; kamera = kick +3% + C7 pendek; SFX = impact; musik = drop ke keadaan "tegang" (hit di frame yang sama). Beat kedua 6.4s lebih kecil.
**Match cut ke S8:** lampu mint pada tuas mengembang menjadi latar terang S8 (X9).

---

### S8 · PEGANGAN CEPAT (54.0-60.0, 6.0s) · latar terang (invert)

**Tujuan:** resolve: tiga angka pegangan dan prinsip "seperlunya"; sambung loop ke S1.
**VO (13 kata):** "Pegangan gampangnya: skrip 755, file biasa 644, file rahasia 600. Kasih izin seperlunya."
**Dunia visual / protagonis:** blok `deploy.sh` kecil duduk aman di sudut; tiga kartu isometrik kecil.
**Lapisan:** latar = grid tinta redup (0.2×) + grain; tengah = tiga kartu; depan = stamp dan blok protagonis (1.3×); overlay = grain tipis.
**Kamera:** C6 parallax shift pelan; morph loop di 5.2s.

| Elemen | x, y | Ukuran | Font | Warna |
|---|---|---|---|---|
| Judul `Pegangan cepat` | tengah, y 280 | 48px | Newsreader italic | `--line` (= biru tua) |
| Kartu 1: `755` + `skrip & folder` | angka x 96, y 360; teks x 600, y 440 | 200px (≈450px) / 40px | Unbounded / Geist Mono | `--line` |
| Kartu 2: `644` + `file biasa` | y 600 | idem | idem | idem |
| Kartu 3: `600` + `kunci SSH, .env` | y 840 | idem | idem | idem |
| Ikon kubus iso (s=60) per kartu | x 880, tiap kartu | 104×120 | – | shading iso |
| Catatan `pegangan umum, bukan aturan mutlak` | tengah, y 1090 | 32px | Geist Mono | `--line` 70% |
| `Seperlunya.` | tengah, y 1180 | 104px (≈ 800px) | Unbounded | `--line` |
| Blok protagonis (s=70) | pusat (880, 1350) | 121×140 | – | shading iso |

Rasio skala: 200 : 32 = **6.25 : 1**. Latar `--bg:#CFE3FF`, teks `#0D2B52`. `--amber` dan `--mint` hanya untuk bentuk, bukan teks (kontras rendah di latar terang).

**Event Map**

| t | Lapisan | Aksi | Teknik | Easing | SFX |
|---|---|---|---|---|---|
| 0.0 | Latar | X9 selesai; latar terang penuh; grid tinta drift | A3 | `power2.inOut` | pad hangat masuk |
| 0.2 | Tengah | Judul `Pegangan cepat` muncul dari baseline | M1 | `power4.out` | klik |
| 0.8 | Tengah | Kartu 1: `755` distempel | M4 | `expo.out` | cap + thud kecil |
| 2.0 | Tengah | Kartu 2: `644` distempel | M4 | `expo.out` | cap |
| 3.0 | Tengah | Kartu 3: `600` distempel | M4 | `expo.out` | cap |
| 4.3 | Tengah | `Seperlunya.` muncul dari baseline; blok protagonis melompat kecil | M1 | `power4.out` | ding resolve |
| 5.2 | Semua | Loop morph: palet kembali gelap, layout menyusut jadi frame S1 t=0 (terminal + prompt + blok melayang) | X2 | `power2.inOut` | whoosh |

Celah terbesar: 1.3s.
**Catalog block:** cek registry untuk: match-cut/morph.
**Impact:** beat resolve di 4.3s (musik hangat + kamera kick 1%).
**Match cut ke S1 (loop):** posisi blok, terminal, prompt `$ ./deploy.sh`, dan grid identik dengan S1 t=0.

---

## 6. Audio

| Elemen | Spesifikasi |
|---|---|
| Voice over | ±145 kata/menit, tenang; total 139 kata = 2.32 kata/detik (batas 2.0-2.8). Sinkron kata-per-kata dengan timestamp transkrip VO. |
| Pengucapan (uji di pipeline, ⟦SETUP⟧) | `ls -l` → "el-es strip el"; `chmod` → "ceng-mod"; `rwx` → "er-we-ex"; `755` → "tujuh lima lima"; `777` → "tujuh tujuh tujuh"; `u+x` → "u plus x". |
| Musik | 120 BPM (batas scene di kelipatan 0.5s). Empat keadaan energi: (1) tertahan/low-pass 0-23s, (2) terbuka saat wow 29.2s, (3) tegang 41-54s dengan drop di 47.2s, (4) resolve hangat 54-60s. Riser 26.5-29.2s sebelum wow. |
| Impact | Tiga beat besar: 3.0s, 29.2s, 47.2s (hit musik + SFX + kamera kick). Beat kecil: 18.6s (ditolak, S3), 39.4s (terkunci, S5), 44.4s (sukses, S6), 52.4s (`777 ≠ solusi`, S7). |
| Whoosh | Tiap transisi dan gerak kamera besar (6.0, 14.0, 23.0, 33.0, 41.0, 46.0, 54.0, 60.0). |
| Foley UI | Klik, ketik, tick, klak split-flap, ding tuas, cap stempel. Level di bawah VO. |
| Keheningan | Satu momen hening **0.6s** di 28.6-29.2s (sebelum wow). |
| Ducking | Musik turun otomatis di bawah VO (sidechain). |
| Mode tanpa suara | Visual dan teks tetap membawa pesan inti (judul, HUD izin, tag, stamp). |
| Sumber | VO, musik, dan SFX lewat `/media-use` atau pipeline repo (mis. Cartesia). |

---

## 7. Aturan teknis HyperFrames

### Dasar
- Deterministik: GSAP timeline `paused`; tanpa `Math.random()`, `Date.now()`, `setInterval`, `repeat: -1`. Posisi acak (avatar, poof) dari PRNG ber-seed tetap (`mulberry32(seed)`) dihitung sebelum timeline dibuat. Guncang dari tabel offset tetap. Kedip caret = pengulangan terbatas.
- Font self-host: Unbounded, Newsreader (italic), Geist Mono. ⟦SETUP⟧ pastikan ketiganya tersedia dan cek axis bila memakai M8.
- Efek ketik per karakter (tanpa timer nyata). Pergantian karakter flap lewat `tl.call()` dari waktu timeline.
- Alur: **lint → snapshot → preview → render**. Snapshot: awal, tengah, dan akhir tiap scene, tiap transisi, dan wow (29.2s) serta impact 47.2s.
- Script ukur/preview buatan sendiri memakai `seek(t, false)`.

### Budget render (batas bagian 11 master prompt)

| Batas | Rencana video ini |
|---|---|
| DOM beranimasi ≤ ±400 per scene | Perkiraan ≤ 150 per scene (S4 ≈ 90: flap 12 + panel ±60 + label) |
| Partikel ambient ≤ 120 | 0; hanya ≤ 20 elemen poof di S5 (opsional) |
| `filter: blur` bersamaan ≤ 3 | Hanya C4 di S2 dan S3 (≤ 3 elemen); fallback opasitas |
| `backdrop-filter` | Tidak dipakai |
| Transisi shader ≤ 2 | 0 (semua CSS) |
| Three.js/WebGL | 0 detik |
| `feTurbulence` animatif | Tidak dipakai; grain statis |
| Glow (lampu menyala) | Halo pra-render (radial-gradient statis) + animasi opasitas; bukan `filter: blur` beranimasi |
| `mix-blend-mode` | Tidak dipakai (flash color = invert palet dengan overlay opasitas) |
| Filter goo | Tidak dipakai |
| Canvas 2D | Tidak dipakai |

### Elemen opsional (korbankan lebih dulu sesuai fallback ladder)

| Scene | Opsional |
|---|---|
| S1 | A5 napas blok; tanda ✕ |
| S2 | C4 rack focus; angka `10` latar; kurung `1 + 9` |
| S3 | C4; glyph latar `rwxr`; pratinjau nilai 4-2-1 (8.0s) |
| S4 | A8 shimmer; angka `755` latar; ring kejut |
| S5 | Partikel poof; tag `hapus = izin folder, bukan file` (isi penting, pertahankan jika bisa) |
| S6 | Blok melaju; `u+x` latar |
| S7 | Avatar ke-3; C7 pada 4.6s |
| S8 | Blok protagonis melompat; catatan kecil `pegangan umum` (isi penting, pertahankan) |

**Fallback ladder:** (1) kurangi ambient berat (A8), (2) transisi shader → CSS (sudah), (3) hilangkan blur (C4 → turunkan opasitas), (4) 3D flip X7 → crossfade, (5) pertahankan selalu: gerak primer, kamera C1/C6 sederhana, impact 4 lapisan.

### Batas konten (WAJIB)
Topik ini edukasi dasar. Agent **tidak boleh** menambahkan:
- perintah `chmod -R 777 /`, `chmod -R` pada direktori sistem, atau saran memakai `777` sebagai perbaikan;
- setuid/setgid/sticky bit, `chmod 4755`, eskalasi hak akses, atau cara menyalahgunakan izin;
- nama akun, IP, path, atau kredensial asli (contoh `budi`, `dev`, `deploy.sh`, `proyek/` fiktif);
- klaim yang tidak ada di bagian 8 (mis. perilaku root, ACL, umask) tanpa verifikasi dan penandaan ⟦SETUP⟧.

### QA checklist
- [ ] Semua teks ≥ 32px, semua baris ≤ 880px, tidak ada konten di luar safe zone (x 72→952, y 240→1460).
- [ ] String izin, HUD, dan sembilan tuas selalu sama (tabel state panel).
- [ ] Angka `755`, `644`, `744`, `777`, `600` dan semua perintah sama persis dengan bagian 8.
- [ ] Tidak ada celah antar kejadian > 1.5s; jeda berisi ≤ 0.8s.
- [ ] Wow di 29.2s dan impact 47.2s sinkron 4 lapisan.
- [ ] Mode tanpa suara tetap menyampaikan pesan inti.
- [ ] Frame akhir identik dengan frame t=0 (loop).
- [ ] Contoh `deploy selesai` diberi label "contoh".

---

## 8. Fakta dan sumber

| # | Klaim yang tampil di video | Sumber |
|---|---|---|
| 1 | `chmod` mengubah *file mode bits*; mode bisa simbolik atau angka oktal | GNU coreutils, man chmod (https://man.cs50.io/1/chmod; dokumentasi lengkap: https://www.gnu.org/software/coreutils/chmod) |
| 2 | Mode simbolik berbentuk `[ugoa][+-=][rwxXst]`; `u` pemilik, `g` grup, `o` lainnya | GNU coreutils man chmod (tautan di atas); POSIX: https://man.archlinux.org/man/core/man-pages/chmod.1p.en |
| 3 | Angka oktal 1-4 digit = jumlah nilai 4 (r), 2 (w), 1 (x) per kelas; digit yang dihilangkan dianggap 0 di depan | GNU coreutils man chmod; https://man7.org/linux/man-pages/man7/inode.7.html (bit `S_IRUSR` 00400 dst.) |
| 4 | Kelas `o` = pengguna yang bukan pemilik dan bukan anggota grup file | GNU coreutils man chmod |
| 5 | Pada direktori, `x` berarti "search": entri di dalam direktori bisa diakses | https://man7.org/linux/man-pages/man2/fchmodat.2.html (chmod(2)); https://docs.redhat.com/de/documentation/red_hat_enterprise_linux/8/html/configuring_basic_system_settings/managing-file-system-permissions_configuring-basic-system-settings |
| 6 | Membuat atau menghapus file di direktori butuh izin tulis dan search pada **direktori** (bukan pada file) | IBM Support: https://www.ibm.com/support/pages/node/669287 |
| 7 | Contoh membaca string `ls -l`: tipe, tiga blok izin, pemilik, grup | Red Hat docs (tautan #5) |
| 8 | `chmod u+x` = tambah `x` hanya untuk pemilik; hasilnya `644` → `744` | Turunan dari klaim #2 dan #3 (hitung ulang di mesin Linux) |
| 9 | `chmod 777` = `rwxrwxrwx` untuk pemilik, grup, dan lainnya | Turunan dari klaim #3 |
| 10 | `chmod 755` = `rwxr-xr-x` dan `644` = `rw-r--r--` | Turunan dari klaim #3 |

**Konflik/catatan antar sumber:** tidak ada konflik pada klaim di atas. Catatan: nilai umask bawaan berbeda antar distro (Red Hat docs menyebut 0002 untuk pengguna biasa), sehingga file baru bisa `-rw-rw-r--`. Contoh video memakai `-rw-r--r--` (umask 022); inti pesan (file baru tanpa `x`) tidak berubah.

### Cek ulang sebelum render/posting
1. Jalankan di mesin Linux/WSL dengan bash: buat file `deploy.sh`, `ls -l`, `./deploy.sh` (harus menghasilkan `bash: ./deploy.sh: Permission denied`; di zsh teksnya berbeda), `chmod u+x`, `ls -l` (harus `-rwxr--r--`).
2. Verifikasi `600` untuk contoh `.env`/kunci SSH sebagai pegangan umum (kartu 3), bukan aturan mutlak.
3. Verifikasi ketersediaan Unbounded dan Geist Mono dan axis-nya (⟦SETUP⟧).
4. Uji pengucapan "ceng-mod" dan "er-we-ex" di TTS.
5. Cocokkan Registry snapshot dengan `STYLE-LEDGER.md` (ledger menang).
6. Pengecualian root (superuser tidak terikat pemeriksaan izin biasa) tidak ditampilkan di video; bila ingin ditambahkan, verifikasi ke dokumentasi capabilities dulu.

---

## 9. Prompt untuk agent

```text
Using /hyperframes (faceless-explainer workflow) [or /video-reels if available], build the video described in BRIEF.md.

Rules:
- Follow BRIEF.md exactly: scene timing, layout coordinates, copy, colors, fonts, motion codes (M/C/X/A), and event maps. Do NOT improvise design.
- Canvas 1080x1920, 60fps (render at 120fps then blend to 60), 60s total. Use the Design Tokens block as DESIGN.md.
- Self-host fonts (Unbounded, Newsreader italic, Geist Mono). Do not use variable-font animation (M8) unless the axes are verified; mark unverified assumptions with ⟦SETUP⟧.
- Deterministic only: paused GSAP timelines. No Math.random/Date.now/infinite repeats. Use a fixed-seed PRNG for ambient positions and fixed offset tables for camera shake.
- Wrap every scene in a camera element (#cam) and implement the camera moves in the brief. Place content in 3-4 depth layers with different parallax factors.
- Before hand-building any transition, effect, caption style, chart, or code animation, consult /hyperframes-registry and install the matching catalog block. Retint catalog blocks to the palette in DESIGN.md.
- Implement every impact as four synchronized layers (visual, camera, SFX, music) within one frame at 60fps.
- Implement the Visual Type recipe from the brief consistently: V18 Isometric (main, 3-polygon objects with fixed shading, 30° projection) with V21 Split-flap as an accent in S4 only. Do not switch to a different look mid-video. If a recipe element is too heavy, follow the fallback ladder in section 7, do not substitute another style.
- Budget (section 7): glow via pre-rendered halo only (no animated blur), no backdrop-filter, no mix-blend-mode, no goo filter, no canvas, no shader transitions. Drop elements marked "opsional" first, following the fallback ladder.
- The nine levers on the panel, the HUD, and every permission string must always match the "Tabel state panel" in section 5 (bit-accurate).
- Generate VO (calm Indonesian, ~145 wpm, casual-technical), music (120 BPM, four energy states), and SFX via the pipeline. Sync kinetic text to word-level timestamps from the VO transcript.
- STRICT: obey the "Batas konten" section (no chmod -R 777 /, no setuid/setgid/sticky, no real accounts/IPs/credentials, no unverified claims).
- Every number, command, and string on screen (755, 644, 744, 777, 600, chmod u+x, ls -l output) must match section 8 exactly. Verify commands in a real Linux/WSL bash shell before writing the composition.
- Run lint/validate/inspect (if available), then snapshot key frames (start, middle, and end of every scene, plus every transition, the wow moment at 29.2s, and the impact at 47.2s). Check against the QA checklist and the Boredom Audit, and fix before rendering.
- Render to MP4 only after the checklist passes.
```

---

## 10. Caption postingan

> "Permission denied" padahal file-nya buatan sendiri? Bukan Linux-nya yang jahat, rwx-nya aja yang belum kebaca. Sembilan saklar, tiga angka (755, 644, 600), dan kenapa chmod 777 itu bukan obat. Simpan buat nanti pas bingung lagi.
>
> #linux #chmod #belajarlinux #devops #sysadmin #programmer #tipsdeveloper

---

## 11. Catatan variasi (vs video sebelumnya di snapshot)

| Kolom | Video sebelumnya (#7 struktur-folder-linux) | Video ini | Beda? |
|---|---|---|---|
| Tipe visual (V) | V2 | **V18 + V21** (V2 dan V10 terkunci oleh aturan rotasi) | Ya |
| Palet | P4 (riso) | **P3 (+mint)** (blueprint) | Ya |
| Tipografi | T3 (Schibsted + DM Mono) | **T5 (Unbounded + Newsreader + Geist Mono)** | Ya |
| Metafora/dunia | Gedung Kertas Kriya | **Pos Kendali Akses** (panel 9 tuas) | Ya |
| Teknik teks utama | tidak tercatat di snapshot | M3/M4/M6/M9/M12 | tidak bisa diverifikasi |
| Arketipe layout dominan | tidak tercatat | Peta/denah dunia visual + macro/micro (arketipe 12, 14) | tidak bisa diverifikasi |

Beda pada 4 dari 6 kolom (target ≥ 3). Display font berbeda, metafora tidak dipakai video mana pun. Set pendukung teknik teks perlu dibandingkan dengan ledger.

---

## 12. Hasil Boredom Audit

| # | Pemeriksaan | Hasil (angka nyata) | Lulus? |
|---|---|---|---|
| 1 | Celah terbesar antar kejadian | 1.3s (S3 3.3→4.6, S5 1.9→3.2, S8 3.0→4.3); jeda berisi S4 = 0.6s | Ya |
| 2 | Jumlah teknik teks berbeda | 9 (M1, M2, M3, M4, M6, M9, M10, M11, M12); tidak ada yang berturut-turut | Ya |
| 3 | Jumlah jenis transisi | 6 jenis (X1, X2, X4, X5, X7, X9) dalam 8 sambungan; match-cut/morph (X2) = 3 (S2→S3, S3→S4, S8→S1) | Ya |
| 4 | Gerak kamera per scene | 8/8 | Ya |
| 5 | Lapisan z/parallax | 4 lapisan di 8/8 scene | Ya |
| 6 | Kontras skala per scene | S1 6.25, S2 10, S3 7.5, S4 7.5, S5 6.25, S6 6.9, S7 9.4, S8 6.25 (semua ≥ 6) | Ya |
| 7 | Gerak ambient per scene | 8/8 (grid drift, grain, napas lampu, caret) | Ya |
| 8 | Wow moment | 29.2s = 48.7% durasi; 4 lapisan sinkron (visual, kamera, SFX, musik) | Ya |
| 9 | Pattern interrupt | Tiap 6.0, 14.0, 23.0, 29.2, 33.0, 41.0, 46.0, 54.0; rentang terpanjang 9.0s | Ya |
| 10 | Open loop | Dibuka di 4.5s (chip `chmod 777 ?` + VO "dan kenapa 777 bukan obatnya?"); payoff mulai 46.0s (76.7%), beat utama 47.2s (78.7%), selesai 54s | Ya |
| 11 | Kurva ketegangan | 4,2,3,4,2,3,5,1; puncak S7 (76.7-90%) | Ya |
| 12 | Dinamika musik | 4 keadaan energi | Ya |
| 13 | Metafora/dunia visual | Dunia 8/8 scene (100%); protagonis 8/8 (100%) | Ya |
| 14 | Budget render | Semua batas bagian 7 terpenuhi; opsional ditandai per scene | Ya |
| 15 | Keterbacaan | VO 139 kata = 2.32 kata/detik; teks layar ≤ 12 kata per momen, ≤ 25 kata per scene; kontras ≥ 4.5:1 (merah ≈ 4.7:1, dipakai untuk teks ≥ 34px) | Ya |
| 16 | Tipe visual (V) | V18+V21 berbeda dari V2/V10/V2 (3 video terakhir menurut snapshot); satu material konsisten | Ya |

---

## Baris Registry siap-tempel

| # | Tanggal | Slug / topik | V utama | V aksen | Palet | Tipografi | Metafora / Dunia visual |
|---|---|---|---|---|---|---|---|
| 8 | 6 Nov 2026 | `hak-akses-file-linux-rwx-chmod` | V18 | V21 | P3 (+mint) | T5 (Unbounded + Newsreader + Geist Mono) | Pos Kendali Akses: meja panel 9 tuas + blok `deploy.sh` |
