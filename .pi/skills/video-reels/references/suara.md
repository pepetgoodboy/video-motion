# Suara — narator & cast tokoh (Cartesia)

Data suara + preset cast: `tools/direction-map.json → voices / casts`. Generator:
`tools/cartesia-vo.mjs` (format cast + pitch + cache hash + `--review`).

## Kapan lebih dari satu suara

| Kategori | Suara |
|---|---|
| semua `kisah-*`, `pelajaran-hidup`, atau format F2/F9/F12/F13/F14 | **narator + 1–4 tokoh** (wajib) |
| `kisah-inspiratif` (orang nyata) | narator + **pembaca kutipan** (label "dibacakan"; tidak meniru suara tokoh) |
| `hubungan-sosial`, `parenting`, `bahasa-asing` | narator + tokoh contoh dialog / contoh pelafalan |
| Semua yang lain | satu narator (preset kategori) |

Preset per kategori: `node tools/pick-direction.mjs --table` (kolom Suara). Narator sengaja
disebar ke beberapa suara (Galang tech/dokumenter/santai, Intan berita, Siti ceria, Ratna
renungan/parenting, Anisa guru/tenang) supaya kanal tidak terdengar satu suara terus.

## Kuota habis (`402 quota_exceeded`)

`.env` bisa berisi beberapa key (`CARTESIA_API_KEY`, `_2`, `_3`). Kalau satu habis, pakai key lain tanpa mencetak
nilainya: `node --env-file=../../.env ../../tools/cartesia-vo.mjs --script vo-script.json --out assets/vo --key-env CARTESIA_API_KEY_3`.
Baris yang sudah jadi otomatis dilewati ("sama dengan sebelumnya, skip"). Jangan menambah kredit/overage tanpa izin user.

## 8 suara Indonesia yang tersedia (Cartesia, `language=id`, dicek ulang 14 Nov 2026)

**Andi dihapus dari katalog Cartesia** (`voice_not_found`, tidak ada di 913 voice per 14 Nov 2026).
Suara pria Indonesia tinggal **Galang** → tokoh pria muda/anak = Galang +2/+3 st, pria tua = Galang −2 st,
dan dua tokoh pria berbasis Galang **jangan satu adegan**. Kandidat pria lain: voice Melayu `Farhan`
(`2c6adcf6-1ff1-42c6-8162-26861f65853a`) dan `Faiz` (`8281db18-6ac5-47bb-91a8-ce23a1f1d951`) dengan
`"language": "id"` — aksen belum dinilai telinga manusia.

| Nama | Gender | Karakter | Cocok untuk |
|---|---|---|---|
| Galang | m | tenang, jelas | narator tech/dokumenter, ayah |
| Safira | f | profesional, ramah | narator kisah keluarga |
| Siti | f | ceria, bercerita | narator anak/sains |
| Ratna | f | hangat, empatik | ibu |
| Risa | f | lembut | nenek (−pitch), tokoh lembut |
| Citra | f | ramah | anak perempuan (+pitch), tokoh hewan kecil |
| Intan | f | tenang, meyakinkan | narator berita (`narator-berita`) |
| Anisa | f | tenang, jernih | narator alternatif |

Hanya 2 suara laki-laki. Tokoh laki-laki ketiga dibedakan dengan **pitch + speed**
(kakek = Galang −2 st, 0,9×). Script memperingatkan kalau dua tokoh punya suara+pitch identik.

## Kecepatan nyata (ukur, jangan tebak)

Terukur 10 Nov 2026 (`install-aplikasi-linux-apt-dnf`): **Galang speed 1,05 = 1,95 kata/detik
ucapan**; tiap file Cartesia membawa ±0,13–0,23 s hening di awal dan ±0,05–0,23 s di akhir.
Potong hening itu sebelum menyusun timing (jeda antar baris lalu diatur sendiri 0,15–0,3 s),
kalau tidak, 29 baris = ±9 s hening yang tidak direncanakan. Output Cartesia juga pelan
(±−26,7 LUFS terukur). Keduanya ditangani `node ../../tools/vo-timing.mjs` (gain +10,5 dB →
±−16 LUFS/baris, limiter, `timing.json`).

## Pitch (anak / lansia)

Cartesia tidak punya kontrol pitch; `cartesia-vo.mjs` menggeser pitch lokal dengan ffmpeg
`rubberband` (`formant=shifted`) setelah TTS. Batas aman: **−3 … +3 semitone**. Di atas itu
terdengar seperti chipmunk/robot. Hasil +3 st pada Galang **belum pernah didengar manusia** saat
preset ini ditulis — dengarkan `_review.mp3` pada video kisah pertama dan turunkan ke +2 bila
aneh, lalu perbarui preset di JSON.

## Bahasa per baris

`language` per tokoh/baris (default `id`). Contoh pelafalan bahasa Inggris memakai suara
bilingual **Siti** (`id-ID,en-US`) dengan `"language": "en"` — diuji 10 Nov 2026.
Bahasa lain (Arab, Jepang): cek dulu suaranya dengan
`--list-voices --language ar` / `ja`; jangan memaksa suara Indonesia mengucapkan bahasa lain.

## Emosi

`generation_config.emotion` menurut dokumentasi Cartesia
([volume-speed-emotion](https://docs.cartesia.ai/build-with-cartesia/sonic-3/volume-speed-emotion))
hanya didukung untuk **bahasa Inggris**. Untuk bahasa Indonesia, ekspresi datang dari
**naskah** (tanda baca, kalimat pendek, seruan) dan **speed** per baris (sedih 0,92; kaget
1,1) — bukan dari parameter emotion.

## Format vo-script.json (cast)

```json
{
  "meta": { "duration": 100, "istilah": [] },
  "cast": {
    "narator":   { "voice": "Safira", "speed": 1.0 },
    "ayah":      { "voice": "Galang", "speed": 1.0 },
    "anak-laki": { "voice": "Galang", "speed": 1.06, "pitch": 3 }
  },
  "lines": [
    { "id": "s1a", "scene": "S1", "speaker": "narator",   "text": "Sore itu, Raka menatap sepeda tua di garasi." },
    { "id": "s1b", "scene": "S1", "speaker": "anak-laki", "text": "Yah, sepeda ini boleh aku pakai?" },
    { "id": "s1c", "scene": "S1", "speaker": "ayah",      "text": "Boleh, Nak. Tapi rantainya kita betulkan dulu, ya.", "speed": 0.96 }
  ]
}
```

Salin hanya peran yang muncul di naskah dari preset `direction.json → voice.cast`.
Format lama (array tanpa cast + `--voice`) tetap jalan.

## Perintah

```bash
cd videos/<slug>
node ../../tools/naskah-check.mjs vo-script.json --duration <detik>            # dulu, gratis
node --env-file=../../.env ../../tools/cartesia-vo.mjs --script vo-script.json --out assets/vo --dry-run
node --env-file=../../.env ../../tools/cartesia-vo.mjs --script vo-script.json --out assets/vo --review
```

`manifest.json` berisi `speaker`, `voice`, `speed`, `pitch`, `hash`, dan `duration` per baris —
pakai `duration` untuk timing scene (Langkah 4), tidak perlu loop `ffprobe` lagi.
Rerun hanya menggenerate baris yang teks/suara/speed/pitch-nya berubah.

## Penempatan di komposisi

- Satu `<audio>` per baris VO, `data-track-index` unik. Dialog berurutan disambung dengan
  jeda 0,15–0,3 s; potong napas di awal/akhir file bila perlu (`silenceremove`).
- Tokoh yang bicara **harus kelihatan bereaksi** di frame (mulut/kepala/gelembung K12/K15).
  Mulut sederhana dari amplop VO, dihitung sebelum timeline dibuat — tidak perlu lip-sync fonem:
  `node ../../tools/vo-envelope.mjs assets/vo/s1b.mp3 --hz 12 --levels 3` → array `mouth`
  (0 tutup, 1 setengah, 2 lebar) yang ditempel ke scene dan dipasang dengan `tl.set()` per
  1/12 s mulai `data-start` baris itu.
- Tokoh yang tidak boleh digambar (adab) → bila berbicara, narator yang mengutip.
