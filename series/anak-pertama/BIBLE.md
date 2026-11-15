# Series Bible — ANAK PERTAMA

> Dinda, 25, anak sulung perantau di Jakarta: satu gaji, banyak yang menunggu.

Serial micro drama 9:16, **90–120 detik per episode**, gaya **3D kartun** (V7 lewat three.js, tokoh manusia; pilot 2D V23 diarsipkan),
dramedi hangat-getir. Tiap episode **tuntas** (penonton baru langsung paham), tokoh tetap, ada benang
merah tipis antar-episode. Data mesin: `series.json` (sumber kebenaran untuk gaya, palet, suara).

## 1. Kenapa konsep ini
- Tema generasi sandwich / anak pertama terbukti punya pasar (film *Home Sweet Loan*, 2024) dan
  memancing tag ("anak pertama mana suaranya?").
- Micro drama sedang naik di Indonesia (IMGR/IDN 2026; YouTube +40%/tahun). Penonton mencari
  kepuasan emosional singkat.
- Suara Cartesia Indonesia tenang, tanpa kontrol emosi, dan pria tinggal satu (Galang) → nada **hangat-getir** + **monolog batin**
  adalah format yang cocok, bukan sinetron teriak-teriak.

## 2. Tokoh

| Tokoh | Umur | Peran | Watak | Ingin / takut | Ciri visual | Suara |
|---|---|---|---|---|---|---|
| **Dinda** | 25 | anak sulung, staf admin kantor | tangguh di luar, rapuh di batin; lucu kering | ingin keluarganya cukup / takut jadi beban & lupa diri sendiri | rambut bob hitam belah samping, blus teal, celana navy, **tas selempang kuning** (ikon serial) | Citra 1,0 (batin 0,96 + efek) |
| **Ibu** | 52 | ibu di kampung, janda | lembut, menyembunyikan susah | ingin anaknya bahagia / takut merepotkan | hijab terakota, baju motif titik mustard | Ratna 0,94, −1 st |
| **Raka** | 19 | adik, mahasiswa | cuek tapi diam-diam peduli | ingin mandiri / takut mengecewakan kakak | rambut acak, hoodie hijau sage, headphone di leher | Galang 1,06 +2 st |
| **Mega** | 25 | sahabat sekamar kos | ceria, blak-blakan, setia | ingin Dinda bahagia / takut kehilangan teman | hijab merah muda pastel, kacamata bulat, kardigan lilac | Siti 1,04 |
| **Pak Hendra** | 45 | atasan Dinda | tegas, kaku, ternyata juga anak pertama | — | rambut beruban di pelipis, kacamata kotak, kumis, batik biru | Galang 0,96 −2 st |
| **Tante Rini** | 50 | tante (episode arisan) | julid, sebenarnya kesepian | — | (dirancang saat episodenya) | Safira 1,02, −1 st |

Latar belakang: **Bapak meninggal 3 tahun lalu** — alasan Dinda menanggung keluarga. Disebut lembut,
tidak pernah diperlihatkan sebagai adegan duka berat sebelum finale musim.

Aturan suara: suara pria Indonesia di Cartesia **tinggal Galang** (Andi dihapus dari katalog, dicek 14 Nov 2026).
Raka = Galang +2 st, Pak Hendra = Galang −2 st — **tidak pernah satu adegan** (Raka di dunia keluarga, Hendra
di kantor). Ibu diturunkan 1 semitone supaya terdengar lebih tua. Kandidat pengganti: voice Melayu Farhan/Faiz
berbahasa Indonesia (menunggu penilaian telinga). Monolog batin Dinda = suara yang sama + efek "batin" (ruang
tipis) supaya beda dari ucapannya.

## 3. Dunia
| Lokasi | Pemakaian | Visual |
|---|---|---|
| Kamar kos Dinda & Mega (Jakarta) | lokasi utama | kasur susun, jendela senja, gantungan tas kuning |
| Kantor | konflik kerja | meja, monitor, papan pengumuman |
| Rumah Ibu (kampung) | lewat **layar video call / telepon** | dapur, rice cooker, foto Bapak di dinding |
| Warung bakso depan gang | adegan Mega | gerobak, kursi plastik |
| Bus malam | perjalanan pulang (episode tertentu) | jendela, lampu jalan |

## 4. Identitas visual (dikunci)
- **Gaya:** V7 3D kartun — tokoh seperti mainan (kepala besar ±40% tinggi), material lembut, bayangan
  asli, satu set 3D per lokasi. Teks, caption, kartu HP tetap 2D di atas kanvas 3D (Fredoka/Nunito).
  Ekspresi harus terbaca di HP: kamera medium/close-up, wajah tidak tertutup kartu.
- **Palet "Senja hangat":** paper `#FBF3E4` · ink `#3B2F2A` · teal `#2F7F86` · mustard `#F2B32E` ·
  coral `#E07A5F` · rose `#E9A6B5` · sky `#9CC9D9` · leaf `#7DB46C`.
- **Font:** Fredoka (judul, gelembung) + Nunito (teks kecil). Gelembung dialog bertepi ink.
- **Kartu judul (1 s):** "ANAK PERTAMA · Eps n" + ikon tas kuning.
- **Ekspresi standar** tiap tokoh: netral · senang · sedih · kaget · pasrah (alis + mata + mulut).
- **Musik:** gitar akustik + piano lembut, penuh harap.

## 4b. Format & tampilan Eps 1 v3 (15 Nov 2026) — ARSIP, digantikan §4c
Hasil analisa 3 video referensi (`referensi/_analisa/ANALISA.md`, folder tidak di-commit):
- **Narator orang ketiga** (Anisa) membawakan hampir seluruh episode; kutipan tokoh dibacakan narator dengan
  gelembung berlabel nama. Hanya 1–2 kutipan emosional per episode memakai suara tokohnya (mis. Ibu).
- **1 shot per kalimat** + sisipan benda/grafis; caption karaoke (kata aktif kuning).
- **Tampilan arah ref1:** ruang minimal gelap-hangat, lampu gantung bersinar, jendela fajar/malam, mata putih
  ber-pupil yang melirik, tokoh setinggi dada di tengah-bawah dengan ruang di atas kepala untuk gelembung.
- Contoh lengkap: `videos/anak-pertama-eps1-v3/build.mjs`; naskah `naskah/eps1-v3.md`.

## 4c. Arah ref3 sejak Eps 1 v4 (15 Nov 2026, menggantikan 4b)
User paling suka ref3 → semua ikut ref3:
- **Dinda bercerita sendiri** ("aku", suara Citra). Kutipan tokoh lain dibacakan Dinda dengan caption berlabel
  nama + warna; hanya kutipan emosional Ibu memakai suara Ibu.
- **Tokoh balok** ala mainan: kepala "tahu" membulat, rambut blok, wajah DILUKIS (8 ekspresi + bicara + kedip +
  lirikan), garis tepi tipis. Rig: `3d/blok.js`.
- **Cahaya:** matahari lewat jendela berlubang (petak cahaya, bayangan tegas), malam = satu bohlam hangat.
  Post: glow, latar depan/belakang blur, grading hangat (`3d/post.js`).
- **Caption** 2–3 kata kapital (Archivo ramping), **ditutup "BERSAMBUNG…"** + judul episode berikutnya.
- Template build ter-commit: `template/build-episode.mjs` (salinan v4); urutan kerja: `serial-3d.md` §2.

## 5. Pola episode (90–120 s)
1. **Hook 0–3 s** — kalimat yang menusuk + teks layar ≤ 7 kata (sering close-up Dinda / notifikasi HP).
2. **Kartu judul 1 s.**
3. **Dilema** — masalah hari ini.
4. **Pilihan / konflik memuncak.**
5. **Pembalikan di 70–85%** — sisi lain tokoh yang tidak terduga.
6. **Penutup hangat + pertanyaan pilihan** ("Kalau kamu jadi Dinda, pilih A atau B?").
7. **Teaser 1–2 s** episode berikutnya (opsional).

Teknik retensi: tiap 8–10 detik ada perubahan (lokasi, ekspresi, objek). Monolog batin mengisi jeda.

## 6. Musim 1 — 10 ide episode

| Eps | Judul | Hook | Dilema | Pembalikan | Pertanyaan |
|---|---|---|---|---|---|
| 1 | Gaji Jam 9 | "Gajiku masuk jam sembilan. Jam sembilan lewat lima, sudah habis." | transfer Ibu, kuliah Raka, kos → saldo tipis; Mega ajak makan bakso | Ibu diam-diam transfer balik Rp50 ribu: "buat bakso, Nak" | Berapa yang kamu sisakan buat dirimu sendiri? |
| 2 | HP Baru Raka | "Kak, teman-temanku udah pada ganti HP." | Dinda kesal dalam hati | HP untuk kerja foto produk toko online, demi bantu kakak | Tim kasih langsung atau tanya dulu? |
| 3 | Kapan Pulang? | "Kamu kapan pulang? Ibu cuma… kangen." | cuti tidak bisa, tiket mahal | Ibu kirim paket rendang + surat kecil | Kapan terakhir kamu telepon ibumu? |
| 4 | Cuti ke Bali | "Cuti tiga hari ke Bali, ikut?" | menolak demi uang | Mega sudah bayar tiket sebagai kado ulang tahun | Susah nerima kebaikan orang? |
| 5 | Arisan Keluarga | "Umur segini belum nikah?" | Tante Rini julid | Ibu membela Dinda di depan semua orang | Jawaban terbaikmu untuk "kapan nikah"? |
| 6 | Lembur | "Dinda, malam ini lembur ya." | malam ulang tahun Ibu | Pak Hendra ternyata anak pertama juga, menyuruh pulang | Atasan terbaik yang pernah kamu punya? |
| 7 | Dana Darurat | layar HP retak | tak ada tabungan darurat | Raka dan Mega patungan diam-diam | Punya dana darurat? (pilihan tokoh, bukan saran) |
| 8 | Raka Bolos | "Raka nggak masuk kuliah dua minggu." | Dinda marah | Raka kerja sambilan supaya kakak tidak menanggung sendiri | Adik yang diam-diam dewasa? |
| 9 | THR | "THR cair. Daftar yang menunggu lebih panjang." | bagi-bagi THR | Dinda belajar menyisakan satu amplop untuk dirinya | Amplop pertama THR buat siapa? |
| 10 | Surat untuk Bapak | "Pak, aku capek. Tapi aku nggak menyerah." | puncak emosi musim | Ibu, Raka, Mega membaca surat itu → Dinda tidak sendirian | (penutup musim) |

## 7. Aturan konten
- Fiksi orisinal; nama tidak merujuk orang nyata; tidak menyindir daerah/suku.
- Uang = pilihan tokoh, bukan saran keuangan.
- Duka dan kesehatan mental ditulis lembut; tanpa adegan menyakiti diri. Bila tema berat, tutup dengan
  harapan, bukan keputusasaan.

## 8. Produksi
- Tokoh & set 3D dibuat **sekali** di `3d/char3d.js` (`makeChar`, `makeKos/Kitchen/Office/RakaRoom/Warung/Title`),
  mesin adegan di `3d/world.js` (pose, jalan, duduk, ekspresi, lip-sync dari amplop VO, kedip, kamera per
  scene, viewport split/stiker). Rig 2D `chars.mjs` = arsip pilot.
- Render 3D = **30 fps** (SwiftShader/CPU, ±70 menit per 90 s di 4 core), tanpa blend 120→60.
  Gate: `node tools/qa-video.mjs <mp4> --fps 30`.
- Revisi kecil: jangan render ulang penuh → `node tools/patch-splice.mjs videos/<slug> S4,S8 --gain -2.6`
  (revisi berikutnya: `S1 --with S4,S8`). Panduan lengkap 3D: `.claude/skills/video-series/references/serial-3d.md`.
- Mode serial: gaya/palet/font/suara diambil dari `series.json`; per episode hanya layout K, lokasi, dan
  kamera yang berganti. Rotasi anti-monoton berlaku antar-serial.
- Target ritme: 3–4 episode/minggu.

## 9. Log episode
| Eps | Slug | Tanggal | Durasi | Catatan produksi |
|---|---|---|---|---|
| 1 | `anak-pertama-eps1` | 14 Nov 2026 | 90 s | pilot 2D (arsip); mode `--series`; rig `chars.mjs`; render 17m48s; 0 frame hitam; Pak Hendra = Faiz (cek aksen) |
| 1 (3D) | `anak-pertama-eps1-3d` | 14 Nov 2026 | 90 s | digantikan v3; 3D three.js, 30 fps; render 70 m + tambalan S4/S8 24 m; 0 frame hitam/beku; -15,0 LUFS; file `renders/anak-pertama-eps1-3d-final.mp4` |
| 1 (v3) | `anak-pertama-eps1-v3` | 15 Nov 2026 | 102,5 s | digantikan v4; narator Anisa + arah ref1; 3D 30 fps, 24 shot; render 73 m + tambalan S7 14 m (`patch-splice`); 0 frame hitam/beku; −15,0 LUFS; file `renders/anak-pertama-eps1-v3-final.mp4` |
| 1 (v4) | `anak-pertama-eps1-v4` | 15 Nov 2026 | 94 s | **versi tayang**; arah ref3 (tokoh balok, wajah dilukis, matahari, post), Dinda bercerita sendiri (Citra) + BERSAMBUNG; render 81 m + tambalan S2/S3/S5/S6 (±45 m); 0 frame hitam, 0 blok beku ≥ 0,5 s (gate fps diperbaiki); −15,0 LUFS; file `renders/anak-pertama-eps1-v4-final.mp4` |

Produksi episode berikutnya:
```bash
node tools/pick-direction.mjs --series series/anak-pertama --episode 2 --slug anak-pertama-eps2 --topic "Anak Pertama Eps 2: HP Baru Raka" --write
```
Cukup minta `/video-series anak-pertama <n>`; skill itu mengikuti `.claude/skills/video-series/references/serial-3d.md` §2 dengan template
`series/anak-pertama/template/build-episode.mjs` (gaya ref3, §4c). Simpan naskah di `naskah/eps<n>.md`.
