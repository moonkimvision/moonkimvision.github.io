"""Item: recolour gongdong dad-34 / dad-face / dad-front / dad-side to the kids palette.

Done when
- all four images keep the size and mode of the bb74c20 original,
- they are more colourful than the original; the three body shots (all but the
  face crop) reach colourfulness >= 8%,
- body shots wear a lemon T-shirt (#FFD23F / shadow #EDB51C) and navy
  sweatpants (#34407A / shadow #242E5E) per palette.json "dad",
- cutouts stay transparent, work PNGs / candidates never land in the repo.
Run: python _tests/test_recolor_dad.py
"""
import colorsys
import os
import subprocess
import sys
import unittest

sys.dont_write_bytecode = True
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import imgcheck  # noqa: E402

NAMES = ["dad-34", "dad-face", "dad-front", "dad-side"]
BODY = ["dad-34", "dad-front", "dad-side"]  # face crop may not show clothes
DEST = "assets/images/gongdong"
MIN_COLOUR = 0.08       # body shots: completion criterion
MIN_GAIN = 0.03         # body shots: base already scores 5-10% (bluish greys)
MIN_FACE_GAIN = 0.003   # face crop: must still be measurably more colourful
MIN_LEMON = 0.03        # T-shirt is a large area on every body shot
MIN_NAVY_GAIN = 0.03    # base already has 1-5% dark bluish grey pixels


def rel(n):
    return f"{DEST}/{n}.webp"


def hue_share(img, lo, hi, sat_min=0.35, val_min=0.0, val_max=1.0, max_side=256):
    """Share of opaque pixels whose hue is in [lo, hi] (wraps if lo > hi)."""
    img = img.convert("RGBA")
    if max(img.size) > max_side:
        img = img.copy()
        img.thumbnail((max_side, max_side), imgcheck.Image.NEAREST)
    total = hits = 0
    for r, g, b, a in img.getdata():
        if a < 128:
            continue
        total += 1
        h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
        h *= 360
        inside = (lo <= h <= hi) if lo <= hi else (h >= lo or h <= hi)
        if inside and s >= sat_min and val_min <= v <= val_max:
            hits += 1
    return hits / total if total else 0.0


def lemon_share(img):
    # lemon #FFD23F (hue ~46) / shadow #EDB51C (hue ~43); bright and saturated.
    # Tangerine (~30), wood #F3C994 (s 0.39) and skin are excluded.
    return hue_share(img, 40, 62, sat_min=0.5, val_min=0.75)


def navy_share(img):
    # navy #34407A / shadow #242E5E sit at hue ~229, dark
    return hue_share(img, 215, 244, sat_min=0.30, val_max=0.65)


class TestRecolorDad(unittest.TestCase):
    def test_files_exist(self):
        missing = [n for n in NAMES if not os.path.isfile(imgcheck.repo_path(rel(n)))]
        self.assertEqual(missing, [])

    def test_changed_from_base(self):
        same = [n for n in NAMES
                if imgcheck.original_bytes(rel(n))
                == open(imgcheck.repo_path(rel(n)), "rb").read()]
        self.assertEqual(same, [], "still the bb74c20 (mono) file")

    def test_size_and_mode_match_base(self):
        bad = []
        for n in NAMES:
            ok, msg = imgcheck.same_size_mode(rel(n))
            if not ok:
                bad.append(msg)
        self.assertEqual(bad, [])

    def test_body_more_colourful_than_base(self):
        bad = []
        for n in BODY:
            old = imgcheck.colourfulness(imgcheck.original(rel(n)))
            new = imgcheck.colourfulness(imgcheck.current(rel(n)))
            if new < MIN_COLOUR or new < old + MIN_GAIN:
                bad.append(f"{n}: {old:.3f} -> {new:.3f}")
        self.assertEqual(bad, [], f"need >= {MIN_COLOUR} and > base + {MIN_GAIN}")

    def test_face_more_colourful_than_base(self):
        n = "dad-face"
        old = imgcheck.colourfulness(imgcheck.original(rel(n)))
        new = imgcheck.colourfulness(imgcheck.current(rel(n)))
        self.assertGreaterEqual(new, old + MIN_FACE_GAIN, f"{n}: {old:.3f} -> {new:.3f}")

    def test_lemon_tshirt_present(self):
        low = [f"{n}: {lemon_share(imgcheck.current(rel(n))):.3f}" for n in BODY
               if lemon_share(imgcheck.current(rel(n))) < MIN_LEMON]
        self.assertEqual(low, [], "lemon T-shirt colour missing (white tee left?)")

    def test_navy_pants_present(self):
        low = []
        for n in BODY:
            old = navy_share(imgcheck.original(rel(n)))
            new = navy_share(imgcheck.current(rel(n)))
            if new < old + MIN_NAVY_GAIN:
                low.append(f"{n}: {old:.3f} -> {new:.3f}")
        self.assertEqual(low, [], f"navy pants must add >= {MIN_NAVY_GAIN} over base")

    def test_transparent_background_kept(self):
        # Cutouts: top corners must stay transparent (no cream box left by recolour).
        bad = []
        for n in NAMES:
            img = imgcheck.current(rel(n)).convert("RGBA")
            w, h = img.size
            for xy in [(0, 0), (w - 1, 0)]:
                if img.getpixel(xy)[3] > 16:
                    bad.append(f"{n} {xy}")
        self.assertEqual(bad, [], "background not transparent at top corners")

    def test_no_work_files_in_repo(self):
        out = subprocess.run(
            ["git", "status", "--porcelain", "--untracked-files=all", "--ignored"],
            cwd=imgcheck.REPO, capture_output=True, text=True, check=True).stdout
        stray = [line for line in out.splitlines()
                 if "dad" in line.lower()
                 and line.lower().rstrip('"').endswith((".png", ".webp", ".jpg", ".jpeg"))
                 and not line[3:].strip().strip('"') in [rel(n) for n in NAMES]]
        self.assertEqual(stray, [], "work PNG / candidate left inside the repo")


class TestHelpers(unittest.TestCase):
    def test_hue_share_bounds(self):
        Image = imgcheck.Image

        def solid(rgb, a=255):
            return Image.new("RGBA", (4, 4), rgb + (a,))

        lemon, lemon_sh = solid((0xFF, 0xD2, 0x3F)), solid((0xED, 0xB5, 0x1C))
        navy, navy_sh = solid((0x34, 0x40, 0x7A)), solid((0x24, 0x2E, 0x5E))
        tang, skin = solid((0xF5, 0x7C, 0x00)), solid((0xFF, 0xF3, 0xEC))
        wood, white = solid((0xF3, 0xC9, 0x94)), solid((255, 255, 255))
        pastel_lemon = solid((0xFF, 0xF3, 0xC4))
        sky, grey = solid((0x3F, 0xA9, 0xF5)), solid((90, 90, 90))
        self.assertEqual(lemon_share(lemon), 1.0)
        self.assertEqual(lemon_share(lemon_sh), 1.0)
        for other in (tang, skin, wood, white, pastel_lemon, navy, grey):
            self.assertEqual(lemon_share(other), 0.0)
        self.assertEqual(lemon_share(solid((0xFF, 0xD2, 0x3F), a=0)), 0.0)
        self.assertEqual(navy_share(navy), 1.0)
        self.assertEqual(navy_share(navy_sh), 1.0)
        self.assertEqual(navy_share(sky), 0.0)  # too bright for navy
        self.assertEqual(navy_share(grey), 0.0)
        self.assertEqual(navy_share(lemon), 0.0)

    def test_colour_threshold_edge(self):
        # colourfulness counts lemon/navy; 8% boundary: 20/256 fails, 21/256 passes.
        Image = imgcheck.Image
        img = Image.new("RGBA", (16, 16), (255, 255, 255, 255))
        for i in range(20):
            img.putpixel((i % 16, i // 16), (0xFF, 0xD2, 0x3F, 255))
        self.assertLess(imgcheck.colourfulness(img), MIN_COLOUR)
        img.putpixel((4, 1), (0x34, 0x40, 0x7A, 255))
        self.assertGreaterEqual(imgcheck.colourfulness(img), MIN_COLOUR)

    def test_base_has_no_lemon(self):
        # The mono originals must fail the T-shirt check, else it proves nothing.
        for n in BODY:
            self.assertLess(lemon_share(imgcheck.original(rel(n))), MIN_LEMON, n)


if __name__ == "__main__":
    unittest.main(verbosity=1)
