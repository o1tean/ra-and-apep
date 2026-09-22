#!/usr/bin/env python3
"""Check v2 exports without overwriting shipped assets: python3 tools/check-image-sizes.py."""
from pathlib import Path
from runpy import run_path
from tempfile import TemporaryDirectory

from PIL import Image

build = run_path(str(Path(__file__).with_name("build-images.py")))
with TemporaryDirectory() as directory:
    out = Path(directory)
    for name in build["FULL_PLATES"]:
        with Image.open(build["RAW"] / f"{name}.png") as source:
            assert source.size == (1672, 941), (name, source.size)
        build["build_full_plate"](name, out)
        for width, height in ((960, 540), (1672, 941)):
            with Image.open(out / f"{name}-{width}.webp") as image:
                assert image.size == (width, height), (name, image.size)
                assert image.format == "WEBP", (name, image.format)
print("V2 WebP dimensions and full-size frames passed.")
