"""Cut the home page's images out of the app screenshots.

    python3 -I scripts/cutouts.py      (needs Pillow; writes public/img/en/)

The sources are window captures in press-kit/assets/screenshots/en/ (Cmd-Shift-4,
Space, click the window: a Retina PNG with a transparent background and the
window's shadow). Re-run after replacing them, and give an output a new name when its picture
changes: optimised images are cached by file name. Boxes are in the captures' pixels
(2655 x 1783); the Chinese pages show these too until Chinese screenshots exist.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "press-kit" / "assets" / "screenshots" / "en"
OUT = ROOT / "public" / "img" / "en"

CUTS = {
    # name: (screenshot, box as (left, top, right, bottom), or None for the whole window)
    "stage-window": ("01-browse.png", None),                       # the hero stage
    "tile-browse": ("04-preview.png", (175, 124, 1360, 745)),      # title bar, folders, files
    "tile-preview": ("04-preview.png", (650, 790, 2655, 1783)),    # the Quick Look panel
    "tile-nested": ("02-nested.png", (130, 538, 1460, 1620)),      # the breadcrumb, magnified
    "tile-extract": ("03-extract.png", (700, 520, 1880, 1110)),    # a PDF on its way out
    "tile-finder": ("05-finder.png", (1180, 640, 2416, 1328)),     # the MacPacker submenu, out of its row
    "tile-compress": ("06-compress.png", (330, 310, 1700, 1010)),  # the quick compress window
}

OUT.mkdir(parents=True, exist_ok=True)
for name, (src, box) in CUTS.items():
    shot = Image.open(SRC / src).convert("RGBA")
    if box is None:
        # the window alone: crop to it and drop the capture's own shadow, the page adds one
        alpha = shot.getchannel("A")
        shot = shot.crop(alpha.point(lambda v: 255 if v > 250 else 0).getbbox())
        shot.putalpha(shot.getchannel("A").point(lambda v: v if v > 200 else 0))
    else:
        shot = shot.crop(box)
    out = OUT / f"{name}.webp"
    shot.save(out, "WEBP", quality=86, method=6)
    print(f"{out.relative_to(ROOT)}  {shot.width} x {shot.height}  {out.stat().st_size // 1024} KB")
