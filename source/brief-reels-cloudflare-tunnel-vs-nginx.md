# Brief Produksi: Cloudflare Tunnel vs Nginx

**Format:** Reels / TikTok, 9:16, 1080×1920, 60 detik, 30 fps
**Engine:** HyperFrames (HTML + CSS + GSAP timeline `paused`, deterministik)
**Bahasa:** Indonesia santai-teknis. Istilah teknis tetap Inggris.

---

## 0. Cara pakai file ini

1. Simpan file ini di root project HyperFrames, misalnya `BRIEF.md`.
2. Salin blok **Design Tokens** (bagian 3) ke `DESIGN.md` / `frame.md` project.
3. Kasih ke agent dengan prompt di bagian 9. Agent **tidak boleh improvisasi desain**. Kerjanya mengeksekusi brief ini.
4. Kalau hasil masih terasa generik, jangan ganti prompt-nya. Perbaiki brief di scene yang bermasalah, lalu render ulang scene itu saja.

---

## 1. Konsep

### Pesan inti (satu kalimat)
> Nginx mengatur **apa yang terjadi setelah** request sampai. Cloudflare Tunnel mengatur **bagaimana request bisa sampai**. Mereka beda layer, bukan lawan.

### Big idea
Video ini dibuka dengan rasa tidak nyaman (port 443 terbuka) lalu **membalik** sudut pandang penonton. Dari "pilih A atau B" menjadi "ini dua layer yang beda". Elemen visual kuncinya adalah **arah panah**. Nginx menerima dari luar. Tunnel menelepon keluar. Karena itu transisi S3 ke S4 harus terasa **kebalik** secara literal.

### Metafora
| Konsep | Metafora | Dipakai di |
|---|---|---|
| Nginx | Resepsionis di lobby yang memutuskan tamu ke mana | S3 |
| Tunnel | Server yang menelepon keluar, tidak punya pintu depan | S4 |
| Keduanya | Telepon (Tunnel) tersambung ke resepsionis (Nginx) | S8 |

### Motif visual yang berulang (jangan tambah motif lain)
- **Garis horizontal tunggal**: lahir di akhir S1, jadi coretan di S2, jadi dinding/pintu di S3-S4, jadi garis tunnel di S8.
- **Warna punya makna**: hijau = Nginx, oranye = Cloudflare, merah = bahaya/terbuka, paper = netral.
- **Kotak bersudut tajam** (radius 0). Tidak ada kartu membulat, shadow, atau glassmorphism.

### Tone
Ngobrol dengan teman sesama engineer. Spesifik, sedikit sinis, tidak hype. Tidak ada kata "powerful", "seamless", "game changer", "revolusioner".

### Struktur retensi
| Detik | Fungsi |
|---|---|
| 0-4.5 | Hook: rasa tidak nyaman, ada angka/command nyata |
| 4.5-10 | Pattern interrupt: "salah pertanyaan" |
| 10-32 | Dua penjelasan visual, masing-masing satu diagram |
| 32-42 | Payoff: perbandingan + insight inti |
| 42-54 | Kapan pakai apa (dua gaya visual berbeda biar tidak monoton) |
| 54-60 | Twist (dua-duanya) + CTA + loop ke hook |

---

## 2. Aturan Anti-Slop

### Dilarang
- Gradient ungu-biru, blob, orb glow, mesh gradient.
- Kartu membulat + shadow + border tipis (glassmorphism).
- Emoji atau ikon stok sebagai pengganti desain.
- Font: Inter, Poppins, Roboto, Space Grotesk, Montserrat.
- Semua elemen masuk dengan `opacity 0→1, y 40→0` lalu stagger. Ini tanda AI paling jelas.
- Semua teks center-aligned di tengah layar.
- Bullet 3 poin dengan ikon di kiri.
- Pembuka: "Di era digital ini", "Hai guys", "Tahukah kamu", "Yuk kita bahas".
- Kata sifat kosong: "powerful", "canggih", "mudah banget", "terbaik".
- Lebih dari 2 jenis easing dalam satu scene.
- Teks di layar lebih dari 12 kata per momen.
- Efek glitch/RGB split sebagai dekorasi.

### Wajib
- **Satu ide per scene.** Tiap scene punya layout yang berbeda dari scene sebelumnya.
- **Tipografi adalah gambar.** Kata kunci boleh jadi elemen terbesar di layar.
- **Spesifik.** Command asli (`ss -tlnp`), port asli (`:443`), config asli (`ingress:`), IP dokumentasi (`203.0.113.10`).
- **Ada momen diam.** Minimal 3 jeda 0.4-0.6 detik tanpa gerakan, supaya mata sempat membaca.
- **Gerak punya alasan.** Gerak menunjukkan arah, sebab-akibat, atau hirarki. Tidak ada gerak dekoratif.
- **Variasi ritme.** Durasi scene sengaja tidak seragam (4.5 / 5.5 / 11 / 11 / 10 / 6 / 6 / 6).
- **Variasi latar.** Ink (gelap) → oranye penuh → paper (terang) → ink. Tiga latar membuat ritme terasa.
- **Tekstur statis.** Grain kertas dari SVG `feTurbulence` dengan seed tetap, tidak dianimasikan.

---

## 3. Design Tokens (salin ke `DESIGN.md` / `frame.md`)

```css
:root {
  /* Warna */
  --ink:        #0E100E;   /* latar utama gelap */
  --ink-2:      #181B18;   /* panel / kotak */
  --paper:      #EEE9DD;   /* teks utama & latar terang (S7) */
  --paper-dim:  rgba(238, 233, 221, 0.58);
  --hairline:   rgba(238, 233, 221, 0.14);
  --cf-orange:  #F6821F;   /* = Cloudflare / Tunnel */
  --nginx-green:#35B967;   /* = Nginx */
  --alert:      #FF4D3D;   /* = port terbuka / bahaya / salah */

  /* Font (self-host woff2 di /fonts, jangan andalkan CDN) */
  --f-display: "Bricolage Grotesque", sans-serif;   /* wght 700-800, wdth 85 */
  --f-accent:  "Instrument Serif", serif;           /* italic saja */
  --f-mono:    "JetBrains Mono", monospace;         /* wght 500-700 */

  /* Canvas & safe zone (px, 1080×1920) */
  --safe-left: 72px;
  --safe-right: 128px;     /* tombol like/share TikTok/Reels */
  --safe-top: 240px;       /* status bar + judul reels */
  --safe-bottom: 460px;    /* caption + UI bawah; konten berhenti di y=1460 */
  /* Area konten efektif: x 72→952 (880 lebar), y 240→1460 (1220 tinggi) */
}
```

### Skala tipografi
| Peran | Font | Ukuran | Catatan |
|---|---|---|---|
| Hook / headline besar | Bricolage 800, wdth 85 | 112-170px | line-height 0.95, letter-spacing -0.02em |
| Aksen emosional | Instrument Serif *italic* | 56-140px | hanya 1-2 kata per scene |
| Nilai tabel / list | Bricolage 700 | 54-84px | |
| Label teknis / terminal | JetBrains Mono 500 | 32-44px | **minimum 32px** (terbaca di HP) |
| Tag kecil | JetBrains Mono 700, UPPERCASE | 32px | letter-spacing 0.06em |

### Bahasa gerak (motion language)
| Nama | Easing GSAP | Durasi | Dipakai untuk |
|---|---|---|---|
| `snap` | `power4.out` | 0.35-0.5s | teks masuk (mask reveal dari baseline) |
| `draw` | `power2.inOut` | 0.5-0.9s | garis/stroke (`stroke-dashoffset`) |
| `glide` | `expo.inOut` | 0.6-0.8s | transisi antar scene |
| `stamp` | `back.out(2)` | 0.3s | HANYA untuk label HIT / 429 / stempel |
| `type` | `steps(n)` | sesuai jumlah karakter | efek ketik terminal |

**Aturan masuk teks:** teks masuk lewat **mask** (wrapper `overflow:hidden`, isi bergeser dari `yPercent:100` ke `0`). Bukan fade+translate.

### Elemen persisten
- Garis tipis progress di `y=232`, tinggi 2px, warna `--hairline`, mengisi dari kiri ke kanan selama 60 detik (satu tween `linear`).
- Tidak ada logo, watermark, atau lower-third di luar yang tertulis di brief ini.

---

## 4. Peta Scene

| # | Waktu (abs) | Durasi | Nama | Latar | Layout |
|---|---|---|---|---|---|
| S1 | 0.0-4.5 | 4.5s | Hook | Ink | Terminal + headline rata kiri |
| S2 | 4.5-10.0 | 5.5s | Salah pertanyaan | Ink | Tipografi besar + coretan diagonal |
| S3 | 10.0-21.0 | 11s | Nginx | Ink | Diagram vertikal (aliran request turun) |
| S4 | 21.0-32.0 | 11s | Cloudflare Tunnel | Ink | Diagram vertikal (aliran **terbalik**) |
| S5 | 32.0-42.0 | 10s | Perbandingan + insight | Ink | Tabel ledger, lalu pernyataan |
| S6 | 42.0-48.0 | 6s | Kapan pakai Tunnel | **Oranye penuh** | Daftar bernomor |
| S7 | 48.0-54.0 | 6s | Kapan pakai Nginx | **Paper (terang)** | Satu kalimat kinetik + highlighter |
| S8 | 54.0-60.0 | 6s | Dua-duanya + CTA | Ink | Stack arsitektur + snippet config |

**Grid ketukan:** BPM 120 (1 beat = 0.5s). Semua batas scene jatuh di kelipatan 0.5s, jadi cut, SFX, dan musik selalu sinkron.

**Catatan struktur HyperFrames:** S3 dan S4 sebaiknya satu sub-composition (`flow`, 10→32s) supaya elemen diagram bisa dipakai ulang dan berubah kontinu. Scene lain: satu sub-composition per scene dengan `data-start` dan `data-duration` sesuai tabel.

---

## 5. Detail Scene

> Semua waktu `t` di bawah adalah **relatif terhadap awal scene**. Koordinat dalam px, origin kiri-atas, canvas 1080×1920.

### S1 · HOOK (0.0-4.5s)

**Tujuan:** Rasa tidak nyaman dalam 2 detik. Penonton developer langsung mengenali command-nya.

**VO:** "Server production kamu lagi buka pintu... ke seluruh internet."

**Teks di layar**
- Terminal: `$ ss -tlnp | grep :443`
- Output: `LISTEN  0.0.0.0:443  nginx`
- Headline: **Server kamu** / **lagi buka pintu** / *ke seluruh* / *internet.*

**Layout:** rata kiri di `x=72`. Terminal di `y=700` (baris 1) dan `y=770` (baris 2). Headline mulai `y=900`.

**Visual**
- Latar ink + grain statis. Hairline progress di y=232.
- Baris terminal: mono 40px, `--paper-dim`. Di output, teks `0.0.0.0:443` berwarna `--alert`.
- Headline: baris 1-2 Bricolage 800 (120px dan 112px, cek lebar ≤ 880). Baris 3-4 Instrument Serif italic 128px warna `--alert`.

**Animasi**
| t | Aksi | Easing | Durasi |
|---|---|---|---|
| 0.2 | Caret blok muncul, berkedip tiap 0.5s (finite, bukan infinite) | steps(1) | - |
| 0.3 | Command diketik 22 karakter | `type` | 1.0s |
| 1.5 | Baris output muncul **instan** (output terminal tidak di-fade) | - | 0 |
| 1.6 | Kotak stroke 3px `--alert` digambar mengelilingi `0.0.0.0:443` | `draw` | 0.4s |
| 2.2 | Grup terminal naik `y:-120`, opacity 0.3 | `snap` | 0.5s |
| 2.3 | Headline 4 baris mask-reveal, stagger 0.12s | `snap` | 0.5s |
| 3.4 | **Diam** (hold) | - | 0.6s |
| 4.0 | Headline mask keluar ke atas (stagger 0.05s) | `snap` | 0.3s |
| 4.2 | Garis horizontal `--alert` setinggi 3px digambar penuh di `y=960` (ini lahirnya motif garis) | `draw` | 0.3s |

**Suara:** klik keyboard mekanik pendek di t=0.3-1.3; "thunk" rendah di t=1.6 (saat kotak merah selesai).

**Transisi keluar:** garis merah bertahan di `y=960` dan menjadi coretan di S2.

---

### S2 · SALAH PERTANYAAN (4.5-10.0s)

**Tujuan:** Pattern interrupt. Bongkar framing "A atau B" sebelum penonton memihak.

**VO:** "Cloudflare Tunnel versus Nginx? Banyak yang kira ini pilihan A atau B. *(jeda)* Salah pertanyaan."

**Teks di layar**
- Blok 1 (dicoret): **Tunnel** / *atau* / **Nginx?**
- Blok 2: **Salah** / **pertanyaan.**

**Layout:** blok 1 rata kiri, tiga baris, vertikal terpusat di `y=960`. Blok 2 di posisi yang sama setelah blok 1 meredup.

**Visual**
- "Tunnel" `--cf-orange`, "Nginx?" `--nginx-green` (Bricolage 800, 150px). "atau" Instrument Serif italic 90px `--paper-dim`.
- Coretan: garis diagonal 6px `--alert` dari pojok kiri-atas blok ke kanan-bawah, memanjang sedikit di luar teks.
- Blok 2: "Salah" Bricolage 800 150px `--paper`; "pertanyaan." Instrument Serif italic 150px `--alert`. Cek lebar ≤ 880px.

**Animasi**
| t | Aksi | Easing | Durasi |
|---|---|---|---|
| 0.0 | Garis merah dari S1 naik/turun ke `y=960` lalu menghilang di belakang teks | `glide` | 0.4s |
| 0.1 / 0.35 / 0.6 | "Tunnel", "atau", "Nginx?" mask-reveal | `snap` | 0.4s |
| 2.0 | Coretan diagonal digambar | `power3.in` | 0.35s |
| 2.4 | Blok 1 turun ke opacity 0.12 | `snap` | 0.3s |
| 2.6 | "Salah", lalu "pertanyaan." mask-reveal (jeda 0.25s) | `snap` | 0.5s |
| 4.2 | **Diam** | - | 0.8s |
| 5.0 | Semua bergeser `x:-1080` | `glide` | 0.5s |

**Suara:** whoosh pendek di coretan (t=2.0); jeda hening 0.3s sebelum "Salah pertanyaan" (musik dipotong sesaat).

---

### S3 · NGINX (10.0-21.0s)

**Tujuan:** Penonton paham Nginx = resepsionis yang memutuskan request ke mana, dan **pintunya terbuka**.

**VO:** "Nginx itu resepsionis. Request masuk lewat port 443, dia yang mutusin ke mana: routing, cache, rate limit. Kontrol penuh. Tapi pintunya kebuka, TLS kamu yang urus."

**Zona layout**
| Zona | Area | Isi |
|---|---|---|
| A | y 250-470 | Judul |
| B | y 520-1340 | Diagram |
| C | y 1370-1450 | Slot tag (satu tag aktif pada satu waktu) |

**Zona A:** "NGINX" Bricolage 800 170px `--nginx-green`, `x=72`. Di bawahnya "resepsionis server kamu" Instrument Serif italic 56px `--paper-dim`.

**Zona B: diagram (atas ke bawah)**
1. Label `INTERNET` mono 32px di `y=540`, dengan 7 kotak request 24×24px `--paper` di bawahnya.
2. **Pintu**: garis hairline `--paper` di `y=700`, ada celah 300px di tengah (`x 390-690`). Ujung celah diberi tanda `--alert`. Label `PORT 443` mono 32px `--alert` di kanan.
3. **Kotak NGINX**: outline 4px `--nginx-green`, `x 72-952`, `y 780-960`. Teks `nginx` mono 44px di dalamnya.
4. **Cabang**: garis siku dari dasar kotak (`y=960`) ke tiga kotak upstream.
5. **Upstream** (`y 1180-1300`, outline 3px `--paper`): `/api → :3000` (x 72-352), `/static → disk` (x 400-680), `/ws → :8080` (x 728-948). Mono 32px.

**Zona C: tag bergantian** (mono 34px `--nginx-green`): `▸ routing` → `▸ cache` → `▸ rate limit` → `▸ load balancing`.

**Animasi**
| t | Aksi | Easing | Durasi |
|---|---|---|---|
| 0.0 | "NGINX" mask-reveal; sub-judul t=0.5 | `snap` | 0.5s |
| 0.8-1.6 | Skeleton digambar berurutan (pintu, kotak, cabang, upstream), stagger 0.12s | `draw` | 0.5s |
| 1.8 | Batch 7 request jatuh. Delay tetap `[0, .18, .31, .55, .62, .9, 1.1]` (tanpa random). Tujuan: `api, api, static, api, ws, static, api` | `power1.in` | 0.9s per request |
| 3.0 | Tag `routing` masuk (swap, tag lama keluar ke atas) | `snap` | 0.3s |
| 4.5 | Tag `cache`. Satu request memantul balik naik dari atas kotak Nginx, label `HIT` hijau muncul | `stamp` | 0.3s |
| 6.0 | Tag `rate limit`. Satu request berhenti di atas kotak, berubah jadi `429` merah, lalu mengecil | `stamp` | 0.3s |
| 7.5 | Tag `load balancing`. Dua request bergantian ke kotak `/api` | `snap` | 0.3s |
| 8.5 | Di kanan pintu muncul diketik: `port 443 = kebuka` (`--alert`, mono 34px) | `type` | 0.8s |
| 9.3 | Di bawahnya diketik: `TLS = kamu urus` | `type` | 0.7s |
| 10.2 | **Transisi "kebalik"** → lihat S4 | `glide` | 0.8s |

**Suara:** tick kecil tiap tag masuk; "pop" kering di `HIT`; bunyi tumpul di `429`.

**Transisi keluar ("kebalik"):** celah di garis pintu menutup (jadi dinding solid). Kotak hijau berubah jadi oranye lalu naik menjadi "CLOUDFLARE EDGE". Semua panah berputar 180°. Ini menandai bahwa arah koneksinya berbalik.

---

### S4 · CLOUDFLARE TUNNEL (21.0-32.0s)

**Tujuan:** Penonton paham: server menelepon **keluar**, tidak ada port masuk, IP asli tersembunyi. Visual harus terasa sebagai kebalikan S3.

**VO:** "Cloudflare Tunnel kebalik. Server kamu yang nyambung keluar ke Cloudflare. Nggak ada port masuk yang dibuka. Pengunjung ketemunya Cloudflare, bukan server kamu. IP asli? Nggak kelihatan."

**Zona A (y 250-470):** "CLOUDFLARE" / "TUNNEL" Bricolage 800 120px `--cf-orange`. Sub: "server yang menelepon keluar" Instrument Serif italic 56px `--paper-dim`.

**Zona B: diagram (atas ke bawah)**
1. `INTERNET` mono 32px + kotak request di `y=540`.
2. **CLOUDFLARE EDGE**: outline 4px `--cf-orange`, `x 72-952`, `y 640-800`. Label mono 40px `--cf-orange`; sub `TLS berhenti di sini` mono 32px.
3. **Dinding**: garis tebal 14px `--paper` di `y=1000`, dengan pola hatch. Gembok kecil (SVG sederhana) di tengah. Label `INBOUND: DENY ALL` mono 34px.
4. **Server**: outline 4px `--paper`, `x 72-952`, `y 1120-1320`, label `server kamu`. Di dalamnya kotak `cloudflared` (fill `--cf-orange`, teks `--ink`).
5. **Garis tunnel**: garis oranye 6px dari `cloudflared` **naik menembus dinding** ke Edge, ujung panah **ke atas**. Label `outbound` mono 34px `--cf-orange`.
6. **Chip IP** di kanan server: `203.0.113.10` mono 34px.

**Zona C (y 1370-1450):** `▸ 0 port terbuka` → `▸ tanpa IP publik` → `▸ WAF + DDoS dari edge`.

**Animasi**
| t | Aksi | Easing | Durasi |
|---|---|---|---|
| 0.0-0.8 | Transisi "kebalik" selesai (dari S3). Judul oranye mask-reveal | `glide` / `snap` | 0.8s |
| 1.2 | Dinding digambar kiri ke kanan, gembok "klik" tertutup. Label `DENY ALL` mask-reveal | `draw` | 0.6s |
| 2.4 | Kotak `cloudflared` menyala (fill oranye) | `snap` | 0.3s |
| 2.8 | **Garis tunnel digambar dari bawah ke atas**, menembus dinding, ujung panah ke atas. Label `outbound` muncul di sampingnya | `draw` | 1.0s |
| 4.5 | Request pengunjung jatuh ke Edge, masuk ke garis tunnel, turun ke `cloudflared` (delay tetap) | `power1.in` | 0.8s |
| 4.0 | Tag `0 port terbuka` masuk | `snap` | 0.3s |
| 6.5 | Chip IP `203.0.113.10` muncul. Bar hitam (`--ink`, 100% menutup) **menggeser menutupi** chip dari kiri ke kanan (efek redaksi) | `power3.inOut` | 0.4s |
| 6.9 | Teks "IP asli tersembunyi" Instrument Serif italic 44px muncul di bawah chip | `snap` | 0.4s |
| 7.5 | Tag `tanpa IP publik` | `snap` | 0.3s |
| 9.0 | Tag `WAF + DDoS dari edge` | `snap` | 0.3s |
| 10.3 | Semua elemen diagram bergeser keluar `y:-200` + opacity 0 | `glide` | 0.5s |

**Suara:** "klik" gembok di t=1.2-1.8; sweep halus saat garis tunnel naik (pitch naik); "tick" saat redaksi selesai.

**Catatan akurasi:** "IP asli tersembunyi" hanya benar bila IP origin tidak bocor dari tempat lain (record DNS lama, email server, subdomain yang tidak lewat tunnel). Letakkan catatan ini di caption postingan.

---

### S5 · PERBANDINGAN + INSIGHT (32.0-42.0s)

**Tujuan:** Rangkum perbedaan konkret, lalu beri "aha": mereka beda layer.

**VO:** "Hasilnya: beda di port, IP, TLS, dan titik gagal. *(jeda)* Tapi intinya satu. Nginx ngatur apa yang terjadi *setelah* request sampai. Tunnel ngatur gimana request *bisa* sampai."

**Layout:** tabel ledger. Per baris: label di atas, dua nilai bersebelahan di bawahnya. Kolom kiri `x=72` (Nginx, penanda batang vertikal 8px hijau), kolom kanan `x=520` (Tunnel, penanda oranye). Tinggi baris 190px. Header kolom di `y=250`: `NGINX` (hijau) dan `TUNNEL` (oranye), mono 34px.

| Baris | Label (mono 32px, `--paper-dim`) | Nginx (Bricolage 700 54px) | Tunnel |
|---|---|---|---|
| 1 | PORT TERBUKA | 80, 443 | 0 |
| 2 | IP PUBLIK | perlu | tidak perlu |
| 3 | TLS | kamu urus | di edge CF |
| 4 | ROUTING | regex, rewrite, cache | hostname & path |
| 5 | TITIK GAGAL | server kamu | CF + cloudflared |

Baris ke-1 mulai di `y=310`, jarak antar baris 190px.

**Pernyataan insight (menimpa tabel):** di tengah layar, Bricolage 700 70px.
- Baris A: `Nginx →` (hijau) "apa yang terjadi" *SETELAH* (Instrument Serif italic, garis bawah digambar) "request sampai."
- Baris B: `Tunnel →` (oranye) "gimana request" *BISA* (italic, garis bawah) "sampai."

**Animasi**
| t | Aksi | Easing | Durasi |
|---|---|---|---|
| 0.0 | Header kolom mask-reveal | `snap` | 0.4s |
| 0.4 / 1.3 / 2.2 / 3.1 / 4.0 | Baris 1-5: hairline digambar → label → nilai kiri → nilai kanan (jeda 0.12s antar elemen) | `draw` + `snap` | 0.45s |
| 5.2 | **Diam** | - | 0.6s |
| 5.8 | Tabel turun ke opacity 0.12 | `snap` | 0.4s |
| 6.2 | Pernyataan A masuk; garis bawah `SETELAH` digambar di t=7.0 | `snap` / `draw` | 0.5s |
| 7.6 | Pernyataan B masuk; garis bawah `BISA` digambar di t=8.4 | `snap` / `draw` | 0.5s |
| 9.2 | **Diam** | - | 0.4s |
| 9.5 | Kotak oranye menyapu dari bawah ke atas, menutup layar penuh (jadi latar S6) | `glide` | 0.5s |

**Suara:** tick tipis tiap baris; satu nada rendah naik saat pernyataan A dan B masuk (insight moment).

---

### S6 · KAPAN PAKAI TUNNEL (42.0-48.0s)

**Tujuan:** Daftar keputusan yang cepat dipindai. Latar oranye penuh sebagai "ganti suasana".

**VO:** "Pakai Tunnel kalau server kamu di belakang NAT, nggak punya IP publik, mau cepat dapet WAF, atau expose tools internal."

**Latar:** `--cf-orange` penuh. Semua teks `--ink`. Grain tetap ada.

**Layout:** header di `y=260`: `PAKAI TUNNEL KALAU` mono 40px 700. Daftar mulai `y=380`; tiap item 250px tinggi. Kolom nomor `x 72-200` (Instrument Serif italic 120px). Kolom teks `x 220-952` (Bricolage 800 76px, maks 2 baris).

| # | Teks |
|---|---|
| 1 | Di balik NAT / CGNAT |
| 2 | Tanpa IP publik |
| 3 | Mau WAF + DDoS instan |
| 4 | Tools internal + Access |

**Animasi**
| t | Aksi | Easing | Durasi |
|---|---|---|---|
| 0.0 | Header mask-reveal | `snap` | 0.4s |
| 1.0 | Item 1: wipe `clip-path` dari **kiri ke kanan** | `snap` | 0.5s |
| 2.2 | Item 2: wipe dari **kanan ke kiri** | `snap` | 0.5s |
| 3.4 | Item 3: wipe dari kiri | `snap` | 0.5s |
| 4.6 | Item 4: wipe dari kanan | `snap` | 0.5s |
| 5.5 | **Diam** | - | 0.2s |
| 5.7 | Lembar paper menyapu dari kanan ke kiri (jadi latar S7) | `glide` | 0.3s |

Arah wipe selang-seling agar tidak terasa seperti template slide.

**Suara:** satu tick per item; musik naik 2 dB di sepanjang scene ini.

---

### S7 · KAPAN PAKAI NGINX (48.0-54.0s)

**Tujuan:** Scene terang, satu kalimat besar. Gaya berbeda dari S6 (bukan daftar).

**VO:** "Pakai Nginx kalau butuh cache, load balancing, routing detail, atau nggak mau bergantung ke satu vendor."

**Latar:** `--paper`. Teks `--ink`. Highlighter `--nginx-green`.

**Layout:** satu paragraf rata kiri di `x=72`, mulai `y=380`, lebar 880px. Bricolage 700 84px, line-height 1.08.

> Pakai Nginx kalau butuh **cache**, **load balancing**, **routing detail**, atau nggak mau bergantung ke **satu vendor**.

Kata tebal di atas adalah kata yang di-highlight (batang hijau di belakang teks).

**Di bawah paragraf (y≈1250):** Instrument Serif italic 64px `--ink`: "Tunnel: praktis. Nginx: kontrol."

**Animasi**
| t | Aksi | Easing | Durasi |
|---|---|---|---|
| 0.0 | Paragraf masuk per baris (mask-reveal, stagger 0.12s) | `snap` | 0.5s |
| sesuai VO | Highlighter tiap kata kunci: `scaleX 0→1`, `transform-origin: left`, mulai tepat saat kata itu diucapkan | `power2.out` | 0.25s |
| 4.4 | Kalimat penutup mask-reveal | `snap` | 0.5s |
| 5.5 | **Diam** | - | 0.3s |
| 5.7 | Layar menggelap cepat ke `--ink` untuk S8 | `glide` | 0.3s |

**Sinkronisasi:** ambil timestamp per kata dari transkripsi audio VO (`/media-use` punya transkripsi). Jangan hardcode tebakan.

**Suara:** "swipe" marker pendek di tiap highlight (pitch sedikit naik per kata).

---

### S8 · DUA-DUANYA + CTA (54.0-60.0s)

**Tujuan:** Twist yang memenuhi janji di S2. Arsitektur nyata yang dipakai di production. CTA tanpa terdengar jualan. Akhir video menyambung ke awal (loop).

**VO:** "Di production, sering kali dua-duanya. Tunnel di depan, Nginx di belakang. Simpan buat checklist deploy kamu."

**Zona layout**
| Zona | Area | Isi |
|---|---|---|
| Headline | y 250-480 | **Seringnya:** / ***dua-duanya.*** |
| Diagram | y 520-1100 | Stack arsitektur |
| Snippet | y 1130-1290 | Config `cloudflared` |
| CTA | y 1340-1460 | Teks ajakan simpan |

**Headline:** "Seringnya:" Bricolage 800 110px `--paper`; "dua-duanya." Instrument Serif italic 120px `--paper`.

**Diagram (ringkas, atas ke bawah)**
- `INTERNET` mono 32px (y 520) → kotak `CLOUDFLARE EDGE` outline oranye (y 590-680).
- Dinding tipis dengan gembok (y 730).
- Kotak "server kamu" (outline paper, y 780-1100) berisi **rantai horizontal tiga kotak** di y 850-990: `cloudflared` (oranye) → `nginx` (hijau) → `app` (paper). Tiap kotak 250px lebar, jarak 65px (total 880px). Panah kecil di antara kotak.
- Garis tunnel oranye naik dari `cloudflared` menembus dinding ke Edge.

**Snippet (mono 34px, `--paper`; komentar `--nginx-green`):**
```yaml
ingress:
  - hostname: app.example.com
    service: http://localhost:80   # ← nginx
```

**CTA:** "Simpan buat checklist deploy." Bricolage 800 64px `--paper`, dengan ikon bookmark digambar sederhana (SVG stroke) di sebelah kiri.

**Animasi**
| t | Aksi | Easing | Durasi |
|---|---|---|---|
| 0.0 | Headline mask-reveal (baris 2 delay 0.15s) | `snap` | 0.5s |
| 0.6 | Diagram skeleton digambar berurutan (Edge, dinding, server, 3 kotak) | `draw` | 0.5s |
| 1.2 | Garis tunnel oranye naik dari `cloudflared` ke Edge | `draw` | 0.5s |
| 1.8 | Satu request mengalir: Edge → tunnel → `cloudflared` → `nginx` → `app` (kotak `app` menyala hijau saat tiba) | `power1.inOut` | 0.9s |
| 2.4 | Snippet muncul baris per baris (diketik, 3 baris) | `type` | 0.3s per baris |
| 3.6 | CTA mask-reveal, bookmark digambar | `snap` / `draw` | 0.5s |
| 4.6 | **Diam** | - | 0.9s |
| 5.5 | Semua turun ke opacity 0.1, muncul lagi baris `$ ss -tlnp | grep :443` mono 40px di posisi yang **sama persis** dengan S1 (trik loop) | `snap` | 0.4s |

**Suara:** musik resolve (satu akor panjang) di t=1.8 saat request sampai; semua suara dipotong bersih di t=5.9 supaya loop tidak terdengar bergetar.

---

## 6. Audio

| Elemen | Spesifikasi |
|---|---|
| Voice over | Santai, seperti ngobrol, ~150 kata/menit. Jeda nyata di titik "jeda" pada script. Tanpa intonasi presenter. |
| Musik | Minimal, 120 BPM, tanpa melodi dominan, tekstur hangat. Level -22 dB di bawah VO. |
| Ducking | Musik turun otomatis di bawah VO (carve di band suara, lewat `/hyperframes-audio`). |
| SFX | Keyboard, thunk, gembok klik, tick, whoosh pendek, marker swipe. Level di bawah VO. Cari/generate lewat `/media-use`. |
| Mode tanpa suara | Video harus tetap bisa dipahami tanpa audio karena teks di layar sudah membawa pesan. Tidak ada caption generik tambahan di bawah layar. |

---

## 7. Aturan Teknis HyperFrames

1. **Deterministik.** Tidak ada `Math.random()`, `Date.now()`, `setInterval`, `requestAnimationFrame` liar, atau animasi CSS berbasis jam dinding. Semua gerak ada di GSAP timeline `paused: true` yang didaftarkan ke `window.__timelines`.
2. **Tidak ada `repeat: -1`.** Kedip caret dan loop lainnya dibuat berulang dalam jumlah terbatas yang cukup untuk durasi scene.
3. **Efek ketik** dibuat dengan memecah teks jadi `<span>` per karakter lalu stagger `visibility`/`opacity` (atau `steps(n)` pada lebar). Hindari library ketik berbasis waktu nyata.
4. **Font self-host.** Taruh woff2 di folder project dan panggil lewat `@font-face`. Pastikan font selesai dimuat sebelum render (cek lewat snapshot).
5. **Grain/tekstur** dari SVG statis (`feTurbulence`, `seed` tetap). Jangan dianimasikan.
6. **Aset** (SFX, musik, VO) dihasilkan/dibekukan lewat `/media-use` sehingga file lokal tetap sama di tiap render.
7. **Struktur:** root composition `1080×1920` (`data-width` / `data-height`), satu sub-composition per scene sesuai tabel bagian 4 (S3+S4 digabung sebagai `flow`).
8. **Alur kerja:** tulis HTML → `npx hyperframes lint` → `snapshot` frame kunci → `preview` → `render`. Perbaiki sampai lint bersih dan semua snapshot lolos checklist di bawah.

### Checklist QA sebelum render final
- [ ] Tidak ada teks di luar safe zone (x 72→952, y 240→1460).
- [ ] Tidak ada baris teks yang lebih lebar dari 880px.
- [ ] Teks terkecil ≥ 32px.
- [ ] Kontras teks terhadap latar terbaca di layar HP dengan brightness rendah.
- [ ] Tiap scene punya layout berbeda dari scene sebelumnya.
- [ ] Tidak ada scene yang memakai fade+translate generik untuk semua elemen.
- [ ] Tidak lebih dari 2 jenis easing per scene.
- [ ] Hijau selalu Nginx, oranye selalu Cloudflare, merah selalu bahaya. Tidak ada pengecualian.
- [ ] Frame pertama (t=0) sudah menarik sebagai thumbnail/cover tanpa harus menunggu animasi.
- [ ] Akhir video (S8, t=5.5) cocok disambung ke awal (S1, t=0.3) saat loop.

---

## 8. Fakta Teknis yang Dipakai (cek ulang sebelum posting)

| Klaim di video | Status |
|---|---|
| `cloudflared` membuat koneksi **outbound** ke edge Cloudflare, tidak perlu port inbound | Benar (arsitektur dasar Cloudflare Tunnel) |
| Server tidak butuh IP publik | Benar |
| TLS ke pengunjung berhenti di edge Cloudflare | Benar untuk traffic yang di-proxy |
| Nginx butuh port 80/443 terbuka dan TLS dikelola sendiri (mis. certbot) | Benar untuk setup umum |
| Routing Nginx lebih granular (regex, rewrite, cache, rate limit) daripada ingress Tunnel (hostname/path) | Benar secara konfigurasi dasar |
| Tunnel menambah titik gagal (Cloudflare + proses `cloudflared`) | Benar; bisa dikurangi dengan menjalankan beberapa replika `cloudflared` |
| IP origin tersembunyi | Benar **dengan syarat** tidak bocor dari sumber lain |
| `203.0.113.10` | Alamat dokumentasi (RFC 5737), aman dipakai sebagai contoh |

Sebelum posting, cek kembali batasan dan fitur plan Cloudflare yang kamu pakai (misalnya limit ukuran upload dan fitur load balancer). Itu berubah dari waktu ke waktu dan sengaja tidak dimasukkan ke video.

**Caption postingan yang disarankan:**
> Bukan Tunnel vs Nginx. Satu ngatur cara request sampai, satu ngatur apa yang terjadi setelah sampai. Di production, sering dua-duanya. Simpan buat checklist deploy. #devops #cloudflare #nginx #backend #webdev

---

## 9. Prompt Siap Pakai untuk Agent

```text
Using /hyperframes (faceless-explainer workflow), build the video described in BRIEF.md.

Rules:
- Follow BRIEF.md exactly: scene timing, layout coordinates, copy, colors, fonts, easing names, and animation timelines. Do NOT improvise design.
- Canvas 1080x1920, 30fps, 60s total. Use the Design Tokens block as DESIGN.md.
- Self-host fonts (Bricolage Grotesque, Instrument Serif italic, JetBrains Mono).
- Deterministic only: paused GSAP timelines, no random/Date.now/infinite repeats.
- S3 and S4 are one sub-composition ("flow") so the diagram can invert continuously.
- Generate VO (casual Indonesian), music, and SFX via /media-use. Sync S7 highlights to word-level timestamps from the VO transcript.
- Run lint, then snapshot key frames at: 0.3, 2.5, 4.3, 7, 12, 16, 22, 27, 35, 40, 44, 50, 56, 59.5 seconds. Check against the QA checklist in BRIEF.md and fix before rendering.
- Render to MP4 only after the checklist passes.
```

---

## 10. Template Brief untuk Topik Lain

Kalau mau bikin video lain dengan kualitas yang sama, isi dulu data ini, lalu minta LLM menyusun brief dengan struktur yang sama persis seperti file ini.

```text
Kamu adalah creative director + motion designer untuk video pendek developer (9:16, HyperFrames).
Tugas: tulis BRIEF.md dengan struktur yang SAMA seperti contoh yang saya lampirkan:
0 Cara pakai, 1 Konsep, 2 Anti-slop, 3 Design tokens, 4 Peta scene,
5 Detail scene, 6 Audio, 7 Aturan teknis, 8 Fakta teknis, 9 Prompt agent.

INPUT
- Topik:
- Durasi:
- Audiens:
- Satu kalimat pesan inti (yang harus diingat penonton):
- Fakta/angka/command nyata yang boleh dipakai:
- Tone:

ATURAN
1. Cari satu metafora visual yang literal, lalu jadikan itu tulang punggung video.
2. Tiap warna punya makna tetap. Maksimal 5 warna.
3. Pilih 3 font (display, aksen, mono). Jangan Inter/Poppins/Roboto/Space Grotesk.
4. Tiap scene: tujuan, VO, teks di layar, layout dengan koordinat px, visual, tabel animasi
   (waktu relatif, aksi, easing, durasi), suara, transisi keluar.
5. Variasikan layout dan latar antar scene. Dilarang pola "judul + 3 bullet" berulang.
6. Sisipkan minimal 3 momen diam dan satu detail visual yang spesifik/tidak generik.
7. Copy: maksimal 12 kata per momen, spesifik, tanpa kata hype, mulai dari konflik atau fakta mengejutkan.
8. Semua batas scene jatuh pada grid beat (BPM yang dipilih).
9. Akhiri dengan fakta yang perlu dicek ulang sebelum posting.
```
