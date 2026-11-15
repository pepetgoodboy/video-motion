#!/usr/bin/env python3
# SFX 8-bit sintetis (gelombang kotak + noise) untuk gaya V26 / game.
# Pakai: python3 -I tools/sfx-chip.py <folder-output>   → px-coin, px-jump, px-blip, px-power, px-hit,
#        px-clear, px-step, px-door, px-unlock, px-wipe, px-type (.mp3). Butuh numpy + ffmpeg.
# Dibuat 13 Nov 2026 (video #18) karena katalog HeyGen kosong untuk bunyi game; lisensi = MIT repo ini.
import numpy as np, subprocess, sys, os
SR = 44100
out = sys.argv[1]
rng = np.random.default_rng(7)
def t(d): return np.arange(int(SR * d)) / SR
def sq(freq, d):
    tt = t(d); f = np.broadcast_to(freq(tt) if callable(freq) else freq, tt.shape)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sign(np.sin(ph))
def env(x, k): return x * np.exp(-k * t(len(x) / SR))
def seq(notes, d, k=0):  # notes: list of freqs, each d seconds; last note decays
    parts = [sq(n, d) for n in notes[:-1]] + [env(sq(notes[-1], d * 3), k)]
    return np.concatenate(parts)
def noise(d): return rng.uniform(-1, 1, int(SR * d))
S = {
  "px-coin":   seq([988, 1319], 0.07, 6) * 0.3,
  "px-jump":   env(sq(lambda tt: 300 + 2600 * tt, 0.24), 5) * 0.26,
  "px-blip":   env(sq(880, 0.07), 30) * 0.24,
  "px-power":  seq([523, 659, 784, 1047], 0.07, 4) * 0.26,
  "px-hit":    env(0.6 * sq(lambda tt: 160 - 260 * tt, 0.3) + 0.4 * noise(0.3), 10) * 0.34,
  "px-clear":  seq([784, 1047, 1319, 1568], 0.1, 2) * 0.24,
  "px-step":   env(noise(0.05), 70) * 0.25,
  "px-door":   sq(lambda tt: 70 + 20 * np.floor(tt * 12), 0.7) * np.linspace(1, 0, int(SR * 0.7)) * 0.3,
  "px-unlock": seq([660, 990], 0.06, 7) * 0.28,
  "px-wipe":   noise(0.35) * np.sin(np.pi * t(0.35) / 0.35) * 0.18,
  "px-type":   env(sq(1200, 0.04), 50) * 0.16,
}
for name, x in S.items():
    x = x.astype(np.float32)
    fade = min(len(x), int(SR * 0.012)); x[-fade:] *= np.linspace(1, 0, fade)
    p = subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-",
                        "-c:a", "libmp3lame", "-b:a", "160k", os.path.join(out, name + ".mp3")], input=x.tobytes())
    print(name, round(len(x) / SR, 3), "ok" if p.returncode == 0 else "FAIL")
