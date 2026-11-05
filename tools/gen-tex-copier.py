#!/usr/bin/env python3
# Deterministik: seed tetap, tidak bergantung waktu.
import numpy as np
from PIL import Image, ImageDraw
import math

rng = np.random.default_rng(20261105)
OUT = "/home/pepetgoodboy/Data/Project/video-motion/videos/bikin-salin-pindah-hapus-file-di-linux/assets"

# ---------- 1. TEKSTUR FOTOKOPI (kasar, bercak toner) ----------
W, H = 1080, 1920
base = np.full((H, W), 244, dtype=np.float32)
# bercak halus multi-skala
for scale, amp in ((8, 9.0), (26, 7.0), (70, 5.0)):
    small = rng.normal(0, 1, (H // scale + 2, W // scale + 2)).astype(np.float32)
    img = Image.fromarray(((small - small.min()) / (small.ptp() + 1e-6) * 255).astype(np.uint8))
    up = np.array(img.resize((W, H), Image.BICUBIC), dtype=np.float32)
    up = (up - up.mean()) / (up.std() + 1e-6)
    base += up * amp
# butir toner titik-titik
speck = rng.normal(0, 1, (H, W)).astype(np.float32)
base += np.clip(speck, -2.2, 2.2) * 4.5
# garis bekas drum printer (vertikal tipis)
for x in (137, 402, 688, 921):
    base[:, x:x + 1] -= 5.5
copier = np.clip(base, 176, 255).astype(np.uint8)
Image.fromarray(copier).convert("L").save(f"{OUT}/tex-copier.png")

# ---------- 2. TEKSTUR HALFTONE (titik riso besar, dua ukuran offset) ----------
S = 14
hw, hh = W + S * 2, H + S * 2
ht = Image.new("L", (hw, hh), 255)
d = ImageDraw.Draw(ht)
yy = 0
row = 0
while yy < hh:
    xx = 0 if row % 2 == 0 else S // 2
    while xx < hw:
        d.ellipse((xx - 3, yy - 3, xx + 3, yy + 3), fill=214)
        xx += S
    yy += S
    row += 1
ht.crop((S, S, S + W, S + H)).save(f"{OUT}/tex-halftone.png")

# ---------- 3. TEKSTUR KERTAS (serat halus, dipakai sebagai grain) ----------
paper = np.full((H, W), 250, dtype=np.float32)
for scale, amp in ((3, 5.0), (11, 4.0)):
    small = rng.normal(0, 1, (H // scale + 2, W // scale + 2)).astype(np.float32)
    img = Image.fromarray(((small - small.min()) / (small.ptp() + 1e-6) * 255).astype(np.uint8))
    up = np.array(img.resize((W, H), Image.BICUBIC), dtype=np.float32)
    up = (up - up.mean()) / (up.std() + 1e-6)
    paper += up * amp
# serat horizontal memanjang
for i in range(90):
    y = int(rng.integers(0, H))
    x0 = int(rng.integers(0, W - 200))
    ln = int(rng.integers(90, 420))
    paper[y:y + 1, x0:x0 + ln] -= 3.0
tex = np.clip(paper, 228, 255).astype(np.uint8)
Image.fromarray(tex).convert("L").save(f"{OUT}/tex-paper.png")

print("ok")
