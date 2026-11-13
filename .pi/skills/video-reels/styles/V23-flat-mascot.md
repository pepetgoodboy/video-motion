# V23 — Flat vector + maskot

Explainer bertokoh: **satu maskot sederhana** yang mengalami konsepnya. Konsep abstrak jadi
kejadian yang menimpa karakter (Docker → maskot kerepotan pindah rumah membawa barang, lalu
menemukan kotak bekal ajaib). Visual vektor datar, bentuk bulat, warna blok, bayangan tipis
satu tingkat. Untuk "bahasa bayi" ini tipe paling kuat: penonton mengikuti **perasaan**
karakter, bukan diagram.

## Parameter wajib

| Sumbu | Nilai |
|---|---|
| Bahasa gerak | **Akting karakter**: antisipasi → aksi → follow-through → settle. `back.out(1.4–1.8)` untuk pose, `power2.inOut` untuk perpindahan, squash-stretch 0,92/1,08 saat mendarat. Kepala memimpin, badan & tangan menyusul 0,06–0,12 s (offset, jangan serentak). |
| Fps rasa | Mulus untuk tubuh; **mulut & kedip** bertahap 12 Hz (`tl.set`, dari `tools/vo-envelope.mjs`). |
| Tekstur | Nol grain. Bidang warna datar + **satu** bayangan bentuk (warna lebih gelap 12%, offset 0, bukan blur). |
| Kedalaman | 3 lapis: latar dunia (bentuk besar sederhana) · maskot + prop · depan (daun/benda melintas, parallax 1,3×). |
| Kamera | `C1`/`C2` lembut; `C3` mengikuti maskot berjalan; `C4` diganti **perubahan skala** (maskot membesar ke K15 close-up saat emosi). |
| Tipografi | T12 Fredoka bulat untuk judul pendek; teks di **gelembung** atau papan nama di dunia, jarang di udara kosong. |
| Transisi | Maskot berjalan keluar frame → masuk scene berikutnya (`X2` kontinuitas), atau objek di tangan maskot membesar jadi latar (`X9`). |

## Rig maskot (wajib, satu rig dipakai semua scene)

- SVG dengan grup terpisah: `#body`, `#head`, `#eyeL/#eyeR` (scaleY untuk kedip),
  `#mouth` (3 bentuk path: tutup/setengah/lebar), `#armL/#armR` (`transform-origin` di bahu),
  `#legL/#legR`. Tinggi rig 520–720px di K15, 260–380px di K1.
- Keadaan emosi = set pose bernama (`netral`, `bingung`, `kaget`, `senang`, `capek`):
  alis + mulut + posisi tangan. Ganti emosi lewat **take** (antisipasi kecil → pose baru →
  settle), tidak pernah lompat.
- Kedip tiap 2,5–4 s dari **tabel tetap**; napas `scaleY 1→1.015` 3 s `sine.inOut`.
- Bicara: mulut dari array `mouth` hasil `vo-envelope.mjs`, hanya saat baris VO tokoh itu.
- Maskot **bukan** karakter berhak cipta/brand. Bentuk orisinal: badan kapsul/kotak/tetes,
  2 mata titik, tanpa hidung. Satu warna badan dari palet + satu aksen.

## Nilai audit (mengganti audit generik)

| Audit | Nilai untuk V23 |
|---|---|
| Protagonis | Maskot ada di ≥ 80% scene (naik dari 70%). |
| K15 close-up | ≥ 1 scene; K0 dilarang total (maskot butuh panggung). |
| #2 teknik teks | ≥ 3 cukup; gelembung dihitung sebagai teknik. |
| Akting | Tiap scene ≥ 1 perubahan emosi maskot yang terlihat. |

## Resep HyperFrames

- Catalog: `lottie-character-walk` (contoh rig berjalan + menunjuk; Lottie — **belum diuji
  render di repo ini**, uji 3 detik dulu), `chat-message`/`hw-text-cloud` (gelembung),
  `parallax-zoom`, `type-match-cut`.
- Rules: `spring-pop-entrance`, `press-release-spring`, `physics-press-reaction`,
  `card-morph-anchor`, `nudge-curve`.
- Referensi akting: `~/.claude/skills/hyperframes/references/types/character.md`.
- Pola rig deterministik yang sudah jalan di HyperFrames: `~/Data/Project/islamic-story-engine/lib/rig/figure.mjs`
  & `bird.mjs` (napas, menoleh, kepak bersendi).

## Batas render

Rig ≤ 40 elemen; ≤ 3 karakter di layar. Prop ≤ 30 elemen per scene.

## Dilarang

- Gerak semua bagian badan serentak dengan easing sama (terlihat seperti stiker digeser).
- Mata/mulut berubah tanpa transisi.
- Karakter mirip maskot terkenal (gaya Kurzgesagt, Duolingo, dll.) — buat bentuk sendiri.
- Teks panjang di samping karakter yang diam (itu K0 dengan hiasan).
