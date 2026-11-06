# Lisensi pihak ketiga

Repo ini sendiri dirilis dengan **MIT** (lihat [`LICENSE`](LICENSE)). File di bawah ini
**bukan** MIT dan tetap tunduk pada lisensi masing-masing. Kalau kamu memakai, memodifikasi,
atau mendistribusikan ulang repo ini, baca bagian ini.

## GSAP 3.14.2

- File: `shared/vendor/gsap.min.js`
- Lisensi: **GreenSock Standard License** — https://gsap.com/standard-license
- Hak cipta: GreenSock / Webflow
- Boleh dipakai **gratis untuk proyek komersial**, termasuk video yang kamu jual.
- **Tidak boleh** dijual ulang, di-sublicense, atau didistribusikan sebagai library berdiri sendiri.
- Jangan hapus header lisensi di dalam file.

Kalau kebutuhanmu tidak tercakup lisensi standar (mis. membundel GSAP ke produk SaaS yang dijual),
cek opsi lisensi komersial GreenSock.

## Font — `shared/fonts/`

Semua file adalah subset latin dari Google Fonts, berlisensi **SIL Open Font License 1.1 (OFL-1.1)**.

| File | Keluarga |
|---|---|
| `archivo-var-latin.woff2` | Archivo (variable) |
| `bricolage-latin.woff2` | Bricolage Grotesque |
| `familjen-grotesk-latin.woff2` | Familjen Grotesk |
| `schibsted-grotesk-latin.woff2` | Schibsted Grotesk |
| `instrument-serif-regular-latin.woff2` | Instrument Serif |
| `instrument-serif-italic-latin.woff2` | Instrument Serif Italic |
| `newsreader-italic-var-latin.woff2` | Newsreader (italic, variable) |
| `dm-mono-400-latin.woff2`, `dm-mono-500-latin.woff2` | DM Mono |
| `ibm-plex-mono-400-latin.woff2`, `ibm-plex-mono-500-latin.woff2` | IBM Plex Mono |
| `jetbrains-mono-latin.woff2` | JetBrains Mono |
| `martian-mono-latin.woff2` | Martian Mono |

OFL mengizinkan penggunaan dan redistribusi font, termasuk di dalam video komersial.
Kalau kamu mendistribusikan ulang file font-nya, sertakan teks lisensi OFL dari masing-masing
keluarga font.

> `shared/fonts/fonts.css` hanya **referensi** (URL-nya masih gstatic). Jangan dipakai apa adanya —
> setiap scene wajib menulis `@font-face` lokal, sesuai aturan di `CLAUDE.md`.

## SFX — `shared/sfx/`

14 file efek suara. **Sumber lisensi tiap file belum terdokumentasi di repo ini.**
`audio_meta.json` pada tiap video bisa berisi field `license` dan `credit`; kalau kosong, asal
file tidak tercatat.

Sebelum mempublikasikan repo ini lebih jauh, lakukan salah satu:

1. **Telusuri dan catat** asal tiap file di tabel di bawah (nama file, sumber, lisensi, URL).
2. **Ganti** file yang lisensinya tidak jelas dengan yang jelas bebas (Openverse CC0, Freesound CC0,
   atau rekaman sendiri).

| File | Sumber | Lisensi | Credit |
|---|---|---|---|
| `bass-rumble.mp3` | _belum dicatat_ | _?_ | _?_ |
| `chime-soft.mp3` | _belum dicatat_ | _?_ | _?_ |
| `error-thud.mp3` | _belum dicatat_ | _?_ | _?_ |
| `gas-hiss.mp3` | _belum dicatat_ | _?_ | _?_ |
| `impact-boom.mp3` | _belum dicatat_ | _?_ | _?_ |
| `keyboard-typing.mp3` | _belum dicatat_ | _?_ | _?_ |
| `lock-click.mp3` | _belum dicatat_ | _?_ | _?_ |
| `paper.mp3` | _belum dicatat_ | _?_ | _?_ |
| `pop.mp3` | _belum dicatat_ | _?_ | _?_ |
| `riser.mp3` | _belum dicatat_ | _?_ | _?_ |
| `swipe.mp3` | _belum dicatat_ | _?_ | _?_ |
| `thunk.mp3` | _belum dicatat_ | _?_ | _?_ |
| `tick.mp3` | _belum dicatat_ | _?_ | _?_ |
| `whoosh.mp3` | _belum dicatat_ | _?_ | _?_ |

SFX yang diambil otomatis lewat `media-use` (Openverse / katalog HeyGen) **tidak** masuk repo —
file-nya ada di `videos/<slug>/assets/sfx/` yang di-`.gitignore`. Lisensinya tercatat per video di
`audio_meta.json`; kalau CC BY, atribusinya wajib di caption video.

## HyperFrames & skill `media-use`

CLI `hyperframes` dan skill `media-use` **tidak ikut di repo ini** — keduanya diambil lewat
`npx hyperframes@0.8.169` dan `hyperframes skills update`. Lisensinya mengikuti proyek
HyperFrames/HeyGen masing-masing.

## Brief di `source/`

Brief contoh ikut di-commit sebagai titik awal dan dirilis di bawah MIT, sama seperti kode.
Klaim faktual di dalam brief tetap tanggung jawab pembuat brief: verifikasi ulang sebelum
dipublikasikan sebagai video.
