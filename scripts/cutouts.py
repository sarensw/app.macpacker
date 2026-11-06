"""Cut the home page's images out of the app screenshots.

    python3 -I scripts/cutouts.py      (needs Pillow; writes public/img/en/)

The sources are window captures in press-kit/assets/screenshots/en/ (Cmd-Shift-4,
Space, click the window: a Retina PNG with a transparent background and the
window's shadow), 2655 x 1783 px. Re-run after replacing them.

The page shows every tile at exactly half its pixel size, so one capture pixel is
one screen pixel on a Retina display and the UI stays sharp at its real size.
That is why the boxes are sized to the tiles (a single tile shows ~640 px of a
capture, a wide one ~1370 px) and cut only where they are clean:

- "window" cuts start at a real window or panel corner, and the page rounds the
  image to that corner's radius;
- "white" cuts are composited onto white first, for captures whose edge would
  otherwise cut through a shadow (the Finder menu starts mid-menu, the nested
  shot's callout hangs below the window);
- "free" cuts keep the transparent background and the window's own shadow, with
  the whole shadow inside the box, so nothing is cut but the far right edge.

Give an output a new name when its picture changes: optimised images are cached
by file name. The Chinese pages show these too until Chinese captures exist.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "press-kit" / "assets" / "screenshots" / "en"
OUT = ROOT / "public" / "img" / "en"

CUTS = {
    # name: (capture, how, box as (left, top, right, bottom); None = the window itself)
    "stage-window": ("01-browse.png", "window", None),                     # the hero stage
    "tile-browse": ("01-browse.png", "window", (159, 108, 859, 1201)),     # the window's top-left corner
    "tile-nested": ("02-nested.png", "white", (158, 537, 1588, 1630)),     # magnifier and breadcrumb
    "tile-preview": ("04-preview.png", "window", (648, 788, 1348, 1783)),  # the Quick Look panel's corner
    "tile-finder": ("05-finder.png", "white", (332, 373, 1762, 1380)),     # Finder's menu and MacPacker's
    "tile-extract": ("03-extract.png", "window", (1260, 540, 1960, 1400)),  # the PDF on its way out
    "tile-compress": ("06-compress.png", "free", (259, 261, 1679, 1121)),  # the compress window, whole
}

OUT.mkdir(parents=True, exist_ok=True)
for name, (src, how, box) in CUTS.items():
    shot = Image.open(SRC / src).convert("RGBA")
    if box is None:
        # the window alone: crop to it and drop the capture's shadow, the page adds one
        shot = shot.crop(shot.getchannel("A").point(lambda v: 255 if v > 250 else 0).getbbox())
        shot.putalpha(shot.getchannel("A").point(lambda v: v if v > 200 else 0))
    else:
        if how == "white":
            white = Image.new("RGBA", shot.size, (255, 255, 255, 255))
            white.alpha_composite(shot)
            shot = white
        shot = shot.crop(box)
    out = OUT / f"{name}.webp"
    shot.save(out, "WEBP", quality=94, method=6)
    print(f"{out.relative_to(ROOT)}  {shot.width} x {shot.height}  {out.stat().st_size // 1024} KB")
