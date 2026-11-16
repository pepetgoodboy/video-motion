# Analisa referensi presenter — ref-presenter-1.MP4 (15 Nov 2026)

Disalin dari `referensi/persib/_analisa/` (folder itu di-ignore git: video & frame kreator lain). Yang diambil = **konsep desain**, bukan isi/aset.
Isi referensi: potongan podcast/wawancara (tokoh publik) disunting ulang jadi short 39 s, 9:16 576×1024.

## Angka
- 39,4 s · 8 potongan · frame diam 19% (gerak tinggi 4,4) · kecerahan 103 (gelap-sedang).
- Talking head penuh ±40% durasi (0–3,4 s, 21–25 s, 31–39 s); sisanya sisipan kolase sementara suara jalan terus.
- Suara = suara narasumber sendiri sepanjang video (tanpa narator lain), bicara spontan.

## Bahasa desain (yang membuatnya "jalan")
1. **Talking head asli** sebagai jangkar, duduk santai, kamera statis + zoom pelan.
2. **Caption satu kata** di tengah-bawah (putih, sans tebal kecil), ganti per kata.
3. **Judul hook di atas** di detik 0: label kecil (nama) + 2 baris besar kuning/putih, satu kata diberi plat merah.
4. **Sisipan kolase** di kata kunci: foto **hitam-putih dipotong** (gedung, tokoh), di depan **lingkaran sinar merah**
   (sunburst neon), **latar grid gelap**, **logo kuning muncul (pop)**, **teks kuning bercahaya** dengan huruf
   bergoyang masuk, **koran sobek**, **tangan halftone merah memegang uang**, **plat sensor merah** di mata, uang dikipas.
5. Variasi latar sisipan: grid gelap, ungu dengan judul serif putih, foto kerumunan merah di bawah.
6. Kutipan orang lain (narasumber kedua) disisipkan dengan teks besar buram + ikon "?".
7. Hampir tidak ada momen diam: setiap 2–4 s ada potongan baru atau elemen masuk.

## Peta ke repo
- Gaya: kartu **V3 Mixed media collage** sudah ada → varian "kolase editorial gelap" (grid gelap, foto B/W,
  sunburst merah, judul kuning bercahaya).
- Potong latar foto/video: `npx hyperframes remove-background` (lokal, CPU).
- Caption per kata dari rekaman: `npx hyperframes transcribe` (Whisper lokal, kata + waktu).
- Suara = rekaman presenter (aturan skill presenter: jangan ditimpa TTS).
- Beda dengan `/video-reels-presenter`: format **komentar** (talking head dominan ±40%, sisipan di kata kunci),
  bukan edukasi berbasis brief dengan P1 ≤ 25%.
