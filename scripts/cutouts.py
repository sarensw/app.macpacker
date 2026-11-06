"""Export the home page's images from the app screenshots.

    python3 -I scripts/cutouts.py      (needs Pillow; writes public/img/en/)

The sources are window captures in press-kit/assets/screenshots/en/ (Cmd-Shift-4,
Space, click the window: a Retina PNG with a transparent background and the
window's own shadow), 2655 x 1783 px. Re-run after replacing them.

Nothing is cropped for the feature tiles: each capture is exported whole, and the
page positions it inside its tile (app/site.css, "feature screenshots") so the
tile's edge does the cutting, the way a window slides in from off screen. The
page reads the window's place from the capture's own pixel coordinates, so keep
new captures the same size, or update the coordinates there.

Only the hero stage is cut: to the window itself, without the capture's shadow,
because the stage draws its own.

Give an output a new name when its picture changes: optimised images are cached
by file name. The Chinese pages show these too until Chinese captures exist.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "press-kit" / "assets" / "screenshots" / "en"
OUT = ROOT / "public" / "img" / "en"

WHOLE = {
    # name: capture, exported as it is
    "shot-browse": "01-browse.png",
    "shot-nested": "02-nested.png",
    "shot-extract": "03-extract.png",
    "shot-preview": "04-preview.png",
    "shot-finder": "05-finder.png",
    "shot-compress": "06-compress.png",
}

OUT.mkdir(parents=True, exist_ok=True)
for name, src in WHOLE.items():
    shot = Image.open(SRC / src).convert("RGBA")
    out = OUT / f"{name}.webp"
    shot.save(out, "WEBP", quality=94, method=6)
    print(f"{out.relative_to(ROOT)}  {shot.width} x {shot.height}  {out.stat().st_size // 1024} KB")

# the hero stage: the window alone, without the capture's shadow
window = Image.open(SRC / "01-browse.png").convert("RGBA")
window = window.crop(window.getchannel("A").point(lambda v: 255 if v > 250 else 0).getbbox())
window.putalpha(window.getchannel("A").point(lambda v: v if v > 200 else 0))
out = OUT / "stage-window.webp"
window.save(out, "WEBP", quality=94, method=6)
print(f"{out.relative_to(ROOT)}  {window.width} x {window.height}  {out.stat().st_size // 1024} KB")
