#!/usr/bin/env python3
"""Turn the generator output in assets/img/raw/ into the web assets in assets/img/.

Safe to re-run: it processes whatever raw files exist and overwrites its own output.
Needs Pillow (the macOS system python3 has it).

  python3 tools/build-images.py
"""
from pathlib import Path

from PIL import Image, ImageFilter

RAW = Path(__file__).resolve().parent.parent / "assets" / "img" / "raw"
OUT = RAW.parent

PLATES = ["sky-dusk", "duat", "apep", "battle", "ritual", "sky-dawn"]  # opaque, Antigravity
CUTOUTS = ["horizon", "barque", "reeds", "ra", "apep-head", "khepri"]  # alpha, Codex
FULL_PLATES = ["duat-v2", "battle-v2"]  # full-frame Codex paintings, no letterbox crop


def content_rows(im):
    """Gemini baked black letterbox bars into some plates; find the rows that hold picture."""
    grey = im.convert("L")
    w, h = grey.size
    px = grey.load()
    lit = [max(px[x, y] for x in range(0, w, 4)) > 14 for y in range(h)]
    top = lit.index(True)
    bottom = h - 1 - lit[::-1].index(True)
    return top + 2, bottom - 1  # small inset: the bar edge is soft


def build_plate(name):
    im = Image.open(RAW / f"{name}.jpg").convert("RGB")
    top, bottom = content_rows(im)
    im = im.crop((0, top, im.width, bottom))
    q = 90 if name.startswith("sky") else 80  # smooth sky gradients band at lower quality
    im.save(OUT / f"{name}-1376.webp", quality=q, method=6)
    # Lanczos + a light unsharp reads crisper on large screens than the browser's own upscale.
    big = im.resize((2048, round(im.height * 2048 / im.width)), Image.LANCZOS)
    big = big.filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
    big.save(OUT / f"{name}-2048.webp", quality=q - 2, method=6)
    return im.size, big.size


def build_cutout(name):
    im = Image.open(RAW / f"{name}.png").convert("RGBA")
    # Drop near-invisible haze so the bounding box is honest, then trim to the subject.
    alpha = im.getchannel("A").point(lambda v: 0 if v < 10 else v)
    im.putalpha(alpha)
    box = alpha.point(lambda v: 255 if v > 24 else 0).getbbox()
    im = im.crop(box)
    quality, alpha_quality = 86, 100
    if name == "reeds":  # shown blurred and darkened as a foreground silhouette: needs far fewer bytes
        im = im.resize((1024, round(im.height * 1024 / im.width)), Image.LANCZOS)
        quality, alpha_quality = 60, 60
    im.save(OUT / f"{name}.webp", quality=quality, alpha_quality=alpha_quality, method=6)
    return im.size


def build_full_plate(name, out=OUT):
    im = Image.open(RAW / f"{name}.png").convert("RGB")
    for width, quality in ((960, 85), (1672, 87)):
        scaled = im.copy()
        scaled.thumbnail((width, im.height), Image.LANCZOS)
        scaled.save(out / f"{name}-{width}.webp", quality=quality, method=6)


if __name__ == "__main__":
    for name in PLATES:
        if (RAW / f"{name}.jpg").exists():
            small, big = build_plate(name)
            kb = (OUT / f"{name}-2048.webp").stat().st_size // 1024
            print(f"plate   {name:10s} {small[0]}x{small[1]}  and  {big[0]}x{big[1]} ({kb} KB)")
    for name in CUTOUTS:
        if (RAW / f"{name}.png").exists():
            size = build_cutout(name)
            kb = (OUT / f"{name}.webp").stat().st_size // 1024
            print(f"cutout  {name:10s} {size[0]}x{size[1]} ({kb} KB)")
        else:
            print(f"cutout  {name:10s} MISSING in raw/")
    for name in FULL_PLATES:
        if (RAW / f"{name}.png").exists():
            build_full_plate(name)
            print(f"plate   {name:10s} full frame, 960 px and 1672 px maximum widths")
