"""Cut the app window, and details of it, out of the press-kit screenshots for
the home page: wallpaper removed, rounded corners transparent, so the page sets
them on its own background.

    python3 -I scripts/cutouts.py      (needs Pillow; writes public/img/{en,zh}/)

Re-run after replacing press-kit/assets/screenshots/. Bounds and corner radii
were measured on 1800 px (browse) and 1240 px (the others) wide copies of the
shots; EN and ZH share the geometry. SCALE renders at twice that, so the crops
stay sharp on Retina screens (next/image serves smaller sizes where they fit).
"""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "press-kit" / "assets" / "screenshots"
OUT = ROOT / "public" / "img"
SCALE = 2
SS = 4  # supersampling for a smooth corner edge

ALL, TOP = (True, True, True, True), (True, True, False, False)  # corners: tl, tr, br, bl
WORK = {"01-browse.jpg": (1800, 1208)}  # measuring width per shot; the rest are 1240 x 832
WINDOW_01 = (111, 76, 1689, 1062)  # corner radius 50
WINDOW_02 = (77, 51, 1163, 731)    # corner radius 34

CUTS = {
    # name: (source, outline box, corner radius, rounded corners, detail box inside the outline or None)
    "window-browse": ("01-browse.jpg", WINDOW_01, 50, ALL, None),
    "detail-list": ("02-nested.jpg", WINDOW_02, 34, ALL, (0, 0, 590, 246)),      # title bar + three files
    "detail-drag": ("03-extract.jpg", WINDOW_02, 34, ALL, (0, 140, 590, 400)),   # rows + dragged PDF
    "detail-preview": ("04-preview.jpg", (352, 290, 1215, 832), 18, TOP, None),  # Quick Look panel
}


def scaled(box):
    return tuple(v * SCALE for v in box)


for lang in ("en", "zh"):
    (OUT / lang).mkdir(parents=True, exist_ok=True)
    for name, (src, box, radius, corners, detail) in CUTS.items():
        work = scaled(WORK.get(src, (1240, 832)))
        cut = Image.open(SRC / lang / src).convert("RGB").resize(work, Image.LANCZOS).crop(scaled(box))
        w, h = cut.size
        mask = Image.new("L", (w * SS, h * SS), 0)
        ImageDraw.Draw(mask).rounded_rectangle(
            (0, 0, w * SS - 1, h * SS - 1), radius * SCALE * SS, fill=255, corners=corners
        )
        cut.putalpha(mask.resize((w, h), Image.LANCZOS))
        if detail:
            cut = cut.crop(scaled(detail))
        out = OUT / lang / f"{name}.webp"
        cut.save(out, "WEBP", quality=86, method=6)
        print(out.relative_to(ROOT), cut.size, out.stat().st_size // 1024, "KB")
