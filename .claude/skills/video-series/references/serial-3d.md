# Serial 3D — three.js di dalam HyperFrames

Berlaku untuk serial yang `series.json → lock.style.main = "V7"` (saat ini: **Anak Pertama**).
Dipakai oleh skill `/video-series` (`../SKILL.md`). Aturan komposisi & audio umum tetap di `.claude/skills/video-reels/SKILL.md`.
**Gaya terkunci saat ini (Eps 1 v4, 15 Nov 2026): arah ref3** — tokoh balok + wajah dilukis + matahari + post,
Dinda bercerita sendiri, caption 2–3 kata kapital, ditutup BERSAMBUNG (`series.json → format`, `lock.style.look`).
**Template episode (ter-commit): `series/anak-pertama/template/build-episode.mjs`** — salinan build v4 yang lolos QA.
`videos/` tidak di-commit, jadi jangan menjadikan build di sana satu-satunya contoh.

## 1. Arsitektur

```
index.html (root "main", 90 s)
├── <canvas id="gl" class="clip">  track 0, sepanjang video   ← semua 3D digambar di sini
├── host sub-composition per scene  (overlay 2D TRANSPARAN: caption, kartu HP, judul, gelembung)
└── <audio> VO 200+ · SFX 300+ · BGM 40
script: gsap → three.min.js → char3d.js → blok.js → post.js → plan.js (window.EP_PLAN) → [root] → world.js → timeline main
        gsap.timeline({ paused: true, onUpdate: () => WORLD.render(tl.time()) })
```

- `WORLD.render(t)` = fungsi murni waktu: tiap frame menghitung ulang seluruh state dari `t`
  (aman untuk seek, deterministik). Jangan simpan state antar-frame.
- Semua set ada di satu scene three.js, digeser di sumbu x (`offsets`, kelipatan 40). Hanya set
  yang sedang dipakai viewport yang `visible`; lampu dipindah ke set itu (`LIGHT[set]`).
- Tokoh yang tidak ada di `chars` scene aktif otomatis disembunyikan.
- **Kanvas ada di BAWAH overlay HTML.** Elemen HTML yang opak menutupi 3D (lihat §5).
- Render tanpa GPU: SwiftShader otomatis. **30 fps**, tanpa blend 120→60.

| File | Isi |
|---|---|
| `series/<seri>/3d/vendor/three.min.js` | three r149 UMD (MIT, LICENSE di folder yang sama) |
| `series/<seri>/3d/char3d.js` | `makeChar(key)`, set (`makeKos/Kitchen/Office/RakaRoom/Warung/Title`), `EXPR`, `SPEC` |
| `series/<seri>/3d/blok.js` | tokoh balok `makeCharBlok` + wajah dilukis + `outline` + ruang bermatahari `makeRoomSun` (gaya ref3) |
| `series/<seri>/3d/post.js` | `makePost`: glow, blur kedalaman, grading hangat, vignette, ACES, FXAA |
| `series/<seri>/3d/world.js` | mesin: pose, jalan, ekspresi, mulut, kedip, lirikan, kamera, viewport, matahari, post |
| `series/<seri>/3d/poc-blok.html?mode=lineup\|shot` | uji cepat tokoh balok/cahaya/post tanpa HyperFrames (Chrome headless, ±30 s) |
| `series/<seri>/template/build-episode.mjs` | template build episode (salin ke `videos/<slug>/build.mjs`) |
| `videos/<slug>/build.mjs` | salin vendor → `plan.js` + overlay `compositions/frames/s*.html` + `index.html` (+ `PATCH`) |

## 2. Urutan kerja episode baru (terbukti di Eps 1 v4)

Semua perintah dari root repo kecuali disebut lain. Folder episode: `videos/<slug>/`.

1. **Arahan + scaffold**
   ```bash
   node tools/pick-direction.mjs --series series/anak-pertama --episode <n> --slug anak-pertama-eps<n> --topic "<judul>" --write
   npx -y hyperframes@0.8.169 init "videos/<slug>" --non-interactive --example=blank --skill=general-video --resolution=portrait
   ```
   Salin font (`nunito`, `fredoka`, `archivo`), SFX, `gsap.min.js`, BGM dari episode sebelumnya.
2. **Naskah** `vo-script.json` (format cast): Dinda bercerita sendiri (`speaker: "dinda"`, Citra), kutipan emosional
   Ibu `speaker: "ibu"`. 1 kalimat = 1 shot, ±100 kata/menit… target 90–100 s, ditutup cliffhanger. Ide episode:
   `BIBLE.md` §6. Gate: `node ../../tools/naskah-check.mjs vo-script.json --duration 95` (wajib bukan FAIL).
3. **Suara** (dari folder episode):
   ```bash
   node --env-file=../../.env ../../tools/cartesia-vo.mjs --script vo-script.json --out assets/vo --review   # kuota habis? + --key-env CARTESIA_API_KEY_3
   node ../../tools/vo-timing.mjs --lead 0.2 --gap 0.22 --tail 0.35 --last-tail 2.2                          # → timing.json
   node ../../tools/word-timing.mjs                                                                          # → word-timing.json (caption)
   ```
   BGM dipotong ke `total` dengan fade-out 2,5 s.
4. **Build**: `cp ../../series/anak-pertama/template/build-episode.mjs build.mjs`, ganti bagian per episode
   (lihat header template + §3), `node build.mjs && npx --yes hyperframes@0.8.169 lint`.
5. **Cek pra-render**: `snapshot --at <tengah tiap shot> --no-end` → `tools/contact-sheet.sh` → perbaiki → ulang.
   Lalu `python3 tools/qa-variety.py videos/<slug>/qc/snap --project videos/<slug>` (FAIL = perbaiki).
   Cek khusus: alis sedih (bukan marah), adegan malam benar-benar gelap, tidak ada tokoh "pose phone" tanpa HP.
6. **Render penuh** (background, ±80 menit / 94 s):
   `PRODUCER_LOW_MEMORY_MODE=false npx --yes hyperframes@0.8.169 render --quality looks --fps 30 --video-bitrate 14M -o renders/<slug>.mp4`
7. **Final**: ukur loudness render mentah (biasanya −8…−11 LUFS), encode dengan `volume=<−15 − I>dB`
   (`libx264 -crf 19 -maxrate 8M -r 30`), lalu `node tools/qa-video.mjs <final> --fps 30` dan
   `python3 tools/qa-variety.py <final> --project videos/<slug>`; ambil frame dari MP4 dan lihat.
8. **Revisi** = tambalan, bukan render penuh: `node tools/patch-splice.mjs videos/<slug> S3 --with S2 --gain <dB>`
   (selalu sebut tambalan lama di `--with`).
9. **Catat**: `BIBLE.md` §9 (log), baris baru `STYLE-LEDGER.md`, naskah di `series/anak-pertama/naskah/eps<n>.md`.
   Versi lama episode yang sama → file `videos/<versi-lama>/SUPERSEDED`.
10. **Posting**: caption 3 varian + hashtag + komentar pin + cover (`../SKILL.md` Langkah 10).

Edit 3D selalu di `series/<seri>/3d/`, **bukan** di `assets/vendor/` (ditimpa tiap build).

## 3. Menulis rencana scene (`S` di build.mjs)

Waktu = detik lokal scene. Pakai `AT.lXX` / `END.lXX` dari `timing.json`, bukan angka tebakan.

```js
const CHARS = { dO: { key: "dinda", set: "office" }, hd: { key: "hendra", set: "office" } }; // 1 instance per (tokoh, set)
const SPEAK = { l14: "hd", l15: "dO" };                                                       // baris VO → mulut siapa
S6: {
  views: [{ set: "office", fov: [[0, 40]],
            pos:  [[0, [0.82, 2.7, 10.2]], [END.l15 + 0.4, [0.82, 2.7, 10.2]], [AT.l16 + 0.9, [0.25, 2.5, 7.4]]],
            look: [[0, [0.82, 1.8, 0]],    [END.l15 + 0.4, [0.82, 1.8, 0]],    [AT.l16 + 0.9, [0.15, 1.75, 0]]] }],
  chars: {
    dO: { pos: [[0, [-0.3, 0, -0.65]]], rotY: [[0, 0.12]],
          poses: [[0, "idle"], [AT.l15, "salute"], [AT.l15 + 0.9, "idle"]],
          expr:  [[0, "netral"], [AT.l15 - 0.05, "senang"], [AT.l16, "pasrah"]],
          head:  [[0, [0, 0, 0]], [AT.l14 + 0.6, [0, 0.35, 0]]] },
    hd: { pos: [[0, [5.6, 0, 1.1]], [1.2, [1.75, 0, 1.1]]], rotY: [[0, -1.3], [1.35, -0.45]], walk: [[0, 1.2]] },
  },
},
```

| Kunci | Arti |
|---|---|
| track `[[t, nilai], …]` | interpolasi smoothstep antar-kunci. **Menahan** = ulang nilai yang sama di kunci berikutnya |
| `views[]` | satu atau lebih kamera. `rect: [x, y, w, h]` px untuk split-screen/stiker; `from`/`to` (detik lokal) untuk muncul/hilang |
| `pos` / `look` / `fov` | kamera relatif ke set. `fov` vertikal, **default 40** |
| `poses` | `[t, "nama" atau "a+b", blend?]`. Preset: `idle phone phoneLow shrug salute wave handNo open hands chin sit`. `wave`/`handNo` bergoyang sendiri. `phone` memunculkan HP di tangan Dinda |
| `walk` | `[[a, b]]` rentang jalan: 2 siklus langkah/detik ≈ 3 unit/detik. Jarak/durasi jauh dari itu = kaki meluncur |
| `expr` | `netral senang sedih kaget pasrah haru` |
| `head` | `[x, y, z]` rad: angguk (x), menoleh (y; + = ke kiri tokoh = kanan layar), miring (z) |
| `rotY` | arah badan. 0 = menghadap kamera, −π/2 = menghadap −x |
| `shake` | `[[a, b]]` HP bergetar |
| level scene | `clear` (warna di luar viewport), `wallet`, `moth`, `lamp` (khusus set kantor/kos senja) |

Mulut otomatis dari amplop VO (`tools/vo-envelope.mjs`, 12 Hz) untuk baris di `SPEAK`.
Kedip otomatis (tabel deterministik). Napas otomatis.

## 4. Kamera dan framing

Satuan dunia: tokoh ±3 unit, kepala lebar ±1,4, pusat kepala y ≈ 2,5 (berdiri). Dengan `fov` 40:

```
setengah tinggi terlihat = d × 0,364      setengah lebar = d × 0,205      (d = jarak kamera → tokoh)
x_px = 540 + (X − lookX) / (d × 0,205) × 540
y_px = 960 − (Y − lookY) / (d × 0,364) × 960
```

| Shot | d | Catatan |
|---|---|---|
| close-up wajah | 4–4,5 | kepala ±650 px; overlay jangan di tengah |
| medium (kepala + badan) | 6,5–7,5 | sisakan y 250–370 untuk caption atas |
| dua tokoh berdiri | 10–11 | jarak antar-tokoh ≤ 1,7 unit; `look.x` = titik tengah keduanya |
| set lebar / tiga tokoh | 12+ | atau sudut tinggi (kamera y 4–4,5) supaya meja/lantai tidak mendominasi |

Hitung `x_px` tiap tokoh **sebelum** snapshot: di 9:16, dua kepala selebar 1,4 unit mudah kepotong.
`fov` 30 terlalu sempit untuk potret (kepala kepotong di Eps 1).

## 5. Overlay 2D di atas 3D

- Caption/kartu jangan menutupi wajah: hitung `y_px` wajah dengan §4.
- **Lubang untuk viewport 3D** (voice note, stiker bulat): latar kartu
  `radial-gradient(circle at <cx>px <cy>px, transparent <R>px, <warna> <R+0.5>px)`, viewport = diameter
  lingkaran. Stiker berdiri sendiri: bungkus persegi berlatar gradient **warna `clear`** di luar lingkaran
  supaya sudut viewport persegi tertutup, cincin putih/ink sebagai anak.
- Viewport muncul setelah animasi pop hampir selesai (`from = t_pop + 0,3`).
- Aturan teks umum tetap: ≥ 32 px, area aman x 72–952, y 240–1460.

## 6. Menambah tokoh atau set

- **Tokoh**: entri `SPEC` di `char3d.js`: `skin`, `top`, `shoes`, lalu `hair` + `style` (`bob` / `spiky` /
  `short`) **atau** `hijab`; `pants` **atau** `dress` (+ `dots`); aksesori `glasses` (`round`/`rect`),
  `mustache`, `phones` (headphone), `bag`. Uji di `lineup.html` sebelum dipakai di episode:
  ```bash
  cd series/<seri>/3d && google-chrome --headless=new --use-angle=swiftshader --enable-unsafe-swiftshader \
    --hide-scrollbars --allow-file-access-from-files --window-size=1920,1080 --virtual-time-budget=20000 \
    --screenshot=$PWD/lineup.png lineup.html
  ```
  Belum ada model: **Tante Rini** (Anak Pertama). Buat dulu sebelum episode yang memakainya.
- **Set**: `makeX()` → `Group`; lantai + dinding belakang di z −2,6, furnitur di z > −2. Bagian bergerak
  disimpan di `g.userData` (`anim: [(t) => …]` dipanggil tiap frame). Daftarkan di `world.js` (`mk`, `LIGHT`)
  dan `offsets` di `build.mjs`.
- **Skala furnitur**: meja 1,1–1,2 (meja 1,55 = hanya kepala yang terlihat), kursi ±0,9, tokoh di belakang
  meja di z −0,6.
- **Tekstur**: `canvasTex(w, h, draw)`. Uap/asap/partikel = tekstur radial ber-alpha, bukan plane polos.
- **Ekspresi**: `brow: [naik, putar]`; putar **> 0 = ujung dalam naik (sedih/cemas)**, < 0 = marah.

## 7. Alur kerja dan biaya

1. `node build.mjs` → `npx --yes hyperframes@0.8.169 lint` → `snapshot --at <8–14 titik> --no-end` →
   `tools/contact-sheet.sh` → perbaiki → ulang. Snapshot murah (±1 menit), render mahal.
   Titik wajib: tengah tiap scene, tiap ganti ekspresi penting, tiap viewport `from`.
2. Render penuh di background:
   `PRODUCER_LOW_MEMORY_MODE=false npx --yes hyperframes@0.8.169 render --quality looks --fps 30 --video-bitrate 14M -o renders/<slug>.mp4`
   (±70 menit per 90 s di 4 core). Cek log + mtime, bukan exit code.
3. Final + QA: encode `libx264 -crf 19 -maxrate 8M` (+ `volume` kalau loudness > −14) →
   `node tools/qa-video.mjs <final> --fps 30` → ambil frame **dari MP4**: satu adegan jalan, satu ekspresi.
4. Revisi = **tambalan**, bukan render penuh:
   ```bash
   node tools/patch-splice.mjs videos/<slug> S4,S8 --gain -2.6               # revisi pertama
   node tools/patch-splice.mjs videos/<slug> S1 --with S4,S8 --gain -2.6     # revisi berikutnya: sebut tambalan lama!
   ```
   Script: render scene → cek jumlah frame → sambung di `start × 30` → cek 2.700 frame + PSNR sambungan
   → loudness → `qa-video --fps 30`. Tambalan harus mengubah scene itu saja; perubahan `char3d.js` yang
   kena scene lain = render penuh.

## 7b. Format narator + tampilan ref1 (Eps 1 v3, 15 Nov 2026) — arsip, gaya aktif = §7c

Contoh lengkap: `videos/anak-pertama-eps1-v3/build.mjs`. Semua opsi di bawah opsional (episode lama tetap jalan).

| Fitur | Cara pakai |
|---|---|
| Set dari `PLAN.sets` | `{ kosP: { type: "room", o: { wall, window: "dawn"/"night", bed, frame } } }`; `type` = `room` (ruang minimal ref1), `kitchen` (`o.planks`, `o.pendant`), `office`/`raka` (`o.wall`, `o.floor`), `warung` |
| Cahaya per episode | `PLAN.light[set] = { bg, hemi, key, keyPos, camFill, camFillColor, rim }`. `camFill` = cahaya isi lembut dari arah kamera (wajah rata ala ref1) |
| Tokoh | `PLAN.charOpt = { eyes: "sclera" }` (mata putih + pupil, datar/unlit), `PLAN.matte = 0.82` (kulit tidak mengilap), `PLAN.phoneGlow` (cahaya layar HP) |
| Lirikan | track `gaze: [[t, [x, y]]]`, ±0,03 (`[0.012, -0.024]` = melihat HP) |
| Pose | `forward` = lengan bawah menjulur ke kamera (khas ref1) |
| Potongan cepat | beberapa `views` layar penuh dengan `from`/`to` di dalam satu scene (1 shot per kalimat) |
| Lingkaran 3D (pikiran, video call, avatar chat) | viewport persegi `rect` + overlay berlubang `radial-gradient`. **Pusat `rect` = pusat lubang** (koordinat padding-box elemen + left/top-nya); kamera `face(cx, cz)` = `p [cx, 2.62, cz+3.1]`, `look [cx, 2.55, cz]`, fov 34 |
| Caption karaoke | `node ../../tools/word-timing.mjs` → `word-timing.json` (energi audio + tanda baca, tanpa API); fungsi `karaoke()` di build memotong per frasa ≤ 6 kata |

Framing standar (fov 40, tokoh di z): `med` = kamera `[x, 2.6, z+6.2]` lihat `[x, 2.41, z−0.3]` (kepala y≈900,
caption 1300 di dada); `cu` = `[x, 2.5, z+4.4]` lihat `[x, 2.3, z−0.3]` (kepala y≈820). Tokoh di sepertiga kiri/kanan:
geser `look.x` ±0,33.

Narator: suara mengisi ±89% durasi (`vo-timing.mjs --lead 0.2 --gap 0.22 --tail 0.35`); Whisper menaruh awal kata
setelah jeda terlalu cepat (jeda masuk ke kata sebelumnya) — `word-timing.mjs` lebih tepat di batas jeda (diukur).

## 7c. Gaya ref3 — tokoh balok + post-processing (Eps 1 v4, 15 Nov 2026)

Contoh lengkap: `videos/anak-pertama-eps1-v4/build.mjs`. Uji cepat tanpa HyperFrames: `3d/poc-blok.html?mode=lineup|shot`.

| Fitur | Cara pakai |
|---|---|
| Tokoh balok | `PLAN.charMaker = "blok"` → `AP3D.makeCharBlok` (`3d/blok.js`), API sama dengan `makeChar`. Kepala ×1,12 (pusat y≈2,58) |
| Wajah dilukis | ekspresi `netral senang sedih kaget pasrah haru cemas licik` digambar di kanvas 516×480 di bidang depan kepala; bicara/kedip/lirikan digambar ulang hanya kalau keadaan berubah (`updateFace`) |
| Garis tepi | `AP3D.outline(group, w, skip)` — salinan sisi-belakang diperbesar; set `warungBlok` = warung + garis tepi |
| Ruang bermatahari | `type: "roomSun"`, `o: { wall, winX, night, lampPower, tilesWall, curtains, props: [bed, desk, wardrobe, frame, counter, table, blinds, plant, officeDesk] }` |
| Matahari | `LIGHT[set] = { sun: true, sunPos, sunTarget, … }`; `sunTo(jendela, kepala)` di build menaruh matahari di garis jendela→kepala tokoh, jadi berkasnya mengenai wajah |
| Post | `PLAN.post = { bloom, threshold, dof, range, warm, vig, exposure }`, override per set `LIGHT[set].post` dan per shot `vp.post`. Fokus otomatis = jarak kamera→`look` |
| Caption ref3 | fungsi `captions()` di build: 2–3 kata kapital, `SPK = { lineId: [kataAwal, "LABEL", warna] }` untuk kutipan |

Waktu render: lihat log episode (`BIBLE.md` §9).

## 8. Jebakan yang sudah terjadi (Eps 1)

| Gejala | Sebab | Cegah |
|---|---|---|
| Kepala kepotong, tokoh terlalu besar | `fov` 30 + kamera dekat | `fov` 40 + hitung §4 |
| Tokoh scene lain ikut tampil | instance di set yang sama | sudah otomatis disembunyikan (`world.js`) |
| Alis sedih tampak marah | tanda `brow[1]` | > 0 = ujung dalam naik; cek close-up di snapshot |
| Hanya kepala di balik meja | meja 1,55 | meja 1,1–1,2 |
| Uap bakso jadi kotak putih | plane tanpa tekstur | tekstur radial alpha |
| Stiker/voice note bulat bocor kotak, atau kosong | viewport persegi / kartu opak | §5 |
| Kamera mendekat sebelum tokoh keluar | kunci kamera diinterpolasi dari t=0 | tahan kunci sampai `END` baris |
| Final 2.699 frame | filter `fps` saat sambung | sambung tanpa `fps`; script cek jumlah frame |
| Wajah gelap di set malam | key light biru lemah | key hangat ±1,2 dari arah sumber cahaya |
| Peringatan `'r' is not a property` di log | helper `mat` meneruskan opsi | tidak berdampak, abaikan |
| Semua shot kantor kosong (v3) | mesin mencari set bernama `office`, set diberi nama lain | sudah: dicari lewat `userData.walletLid` |
| Lingkaran video call berisi dinding, wajah di bawah | pusat `rect` viewport ≠ pusat lubang overlay | hitung pusat lubang dari CSS, samakan |
| Lingkaran avatar kosong setelah cut | shot layar penuh berikutnya digambar setelah viewport kecil | sudah: `world.js` menggambar `rect` terakhir |
| Alis sedih tampak marah LAGI (painter blok) | tanda `brow[1]` diulang salah saat menulis ekspresi baru | `FACE` di `blok.js`: > 0 = ujung dalam naik; cek close-up sedih di snapshot |
| Adegan malam terlihat siang | dinding krem + bohlam 2,6 + exposure normal | set malam: dinding lebih gelap, `lampPower` 1,6, `post.exposure` ±0,72 |
| Tokoh berpose "phone" tanpa HP | HP hanya dipasang ke Dinda | mode blok: semua tokoh dapat HP (tersembunyi kecuali pose `phone`) |
| Shot terakhir tiap adegan nyaris diam (blok beku 0,5–1,1 s) | `to: 99` = "sampai akhir", kunci kamera ikut di t=99 → dorongan dibagi 99 s | build v4 memotong `to` & kunci track ke durasi adegan (blok "to: 99" setelah `PLAN`); salin ke episode baru |
| Gate beku lolos padahal ada blok 0,5–1 s (video 30 fps) | `qa-video.mjs` dulu mengunci 60 fps untuk waktu & ambang | sudah: pakai fps asli. Hasil gate 30 fps sebelum 15 Nov 2026 tidak bisa dipercaya untuk blok < 1 s |
| Gate variasi FAIL "look" vs versi lama episode yang sama | versi lama ikut jadi pembanding | taruh file `SUPERSEDED` di folder video versi lama (dilewati `qa-variety.py`) |
| Insert grafis tanpa 3D diam setelah semua elemen muncul | tidak ada yang bergerak sampai akhir adegan | beri drift pelan pada wadah (mis. `y` + `scale` sampai akhir adegan) |
| Tas di dinding "melayang" di atas kepala | properti dinding sejajar kepala di shot setinggi dada | properti dinding jauh dari x tokoh atau dibuang |

## 9. Batas saat ini

Mulut hanya buka-tutup (belum ada viseme), tangan bulat tanpa jari, alis Dinda tertutup poni
(emosi lewat mata + mulut), tidak ada simulasi kain/rambut. Mesin 3D masih milik satu serial; pindahkan
ke `shared/3d/` baru saat ada serial 3D kedua.
