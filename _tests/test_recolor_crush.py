"""Item: recolour crush-34 / crush-face / crush-front / crush-side to the kids palette.

Done when
- all four images keep the size and mode of the bb74c20 original,
- they are more colourful than the original (body shots: ash hair, grape
  cardigan #9B7BFF, navy skirt #34407A per palette.json),
- tangerine (#F57C00) pixels are <= 0.5% of opaque pixels (crush has no tangerine),
- work PNGs / candidates live only outside the repo (TEMP), never in it.
Run: python _tests/test_recolor_crush.py
"""
import colorsys
import os
import subprocess
import sys
import unittest

sys.dont_write_bytecode = True
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import imgcheck  # noqa: E402

NAMES = ["crush-34", "crush-face", "crush-front", "crush-side"]
BODY = ["crush-34", "crush-front", "crush-side"]  # face crop may not show clothes
DEST = "assets/images/twins"
MIN_COLOUR = 0.06       # body shots: share of saturated non-tangerine pixels
MIN_GAIN = 0.03         # body shots: must beat the mono base by this much
MIN_FACE_GAIN = 0.003   # face crop: must still be measurably more colourful
MIN_SHARE = 0.01        # each garment colour must cover >= 1% of opaque pixels
MAX_TANGERINE = 0.005


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


def grape_share(img):
    # grape #9B7BFF / shadow #7A5BE0 sit at hue ~254
    return hue_share(img, 245, 290, sat_min=0.30)


def navy_share(img):
    # navy #34407A / shadow #242E5E sit at hue ~229, dark
    return hue_share(img, 215, 244, sat_min=0.30, val_max=0.65)


def tangerine_share(img):
    # tangerine #F57C00 / shadow #D06400 (hue ~29); skin #FFF3EC and wood
    # #F3C994 are excluded by the saturation floor.
    return hue_share(img, 18, 40, sat_min=0.55, val_min=0.5)


class TestRecolorCrush(unittest.TestCase):
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
        n = "crush-face"
        old = imgcheck.colourfulness(imgcheck.original(rel(n)))
        new = imgcheck.colourfulness(imgcheck.current(rel(n)))
        self.assertGreaterEqual(new, old + MIN_FACE_GAIN, f"{n}: {old:.3f} -> {new:.3f}")

    def test_grape_cardigan_present(self):
        low = [f"{n}: {grape_share(imgcheck.current(rel(n))):.3f}" for n in BODY
               if grape_share(imgcheck.current(rel(n))) < MIN_SHARE]
        self.assertEqual(low, [], "grape (purple) cardigan colour missing")

    def test_navy_skirt_present(self):
        low = [f"{n}: {navy_share(imgcheck.current(rel(n))):.3f}" for n in BODY
               if navy_share(imgcheck.current(rel(n))) < MIN_SHARE]
        self.assertEqual(low, [], "navy skirt colour missing")

    def test_no_tangerine(self):
        bad = [f"{n}: {tangerine_share(imgcheck.current(rel(n))):.4f}" for n in NAMES
               if tangerine_share(imgcheck.current(rel(n))) > MAX_TANGERINE]
        self.assertEqual(bad, [], f"tangerine above {MAX_TANGERINE} of opaque pixels")

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
                 if "crush" in line.lower()
                 and line.lower().rstrip('"').endswith((".png", ".webp", ".jpg", ".jpeg"))
                 and not line[3:].strip().strip('"') in [rel(n) for n in NAMES]]
        self.assertEqual(stray, [], "work PNG / candidate left inside the repo")


class TestHelpers(unittest.TestCase):
    def test_hue_share_bounds(self):
        Image = imgcheck.Image

        def solid(rgb, a=255):
            return Image.new("RGBA", (4, 4), rgb + (a,))

        grape, grape_sh = solid((0x9B, 0x7B, 0xFF)), solid((0x7A, 0x5B, 0xE0))
        navy, navy_sh = solid((0x34, 0x40, 0x7A)), solid((0x24, 0x2E, 0x5E))
        tang, tang_sh = solid((0xF5, 0x7C, 0x00)), solid((0xD0, 0x64, 0x00))
        skin, wood = solid((0xFF, 0xF3, 0xEC)), solid((0xF3, 0xC9, 0x94))
        sky, grey = solid((0x3F, 0xA9, 0xF5)), solid((90, 90, 90))
        self.assertEqual(grape_share(grape), 1.0)
        self.assertEqual(grape_share(grape_sh), 1.0)
        self.assertEqual(grape_share(navy), 0.0)
        self.assertEqual(navy_share(navy), 1.0)
        self.assertEqual(navy_share(navy_sh), 1.0)
        self.assertEqual(navy_share(grape), 0.0)
        self.assertEqual(navy_share(sky), 0.0)  # too bright for navy
        self.assertEqual(navy_share(grey), 0.0)
        self.assertEqual(tangerine_share(tang), 1.0)
        self.assertEqual(tangerine_share(tang_sh), 1.0)
        self.assertEqual(tangerine_share(skin), 0.0)
        self.assertEqual(tangerine_share(wood), 0.0)
        self.assertEqual(tangerine_share(solid((0xF5, 0x7C, 0x00), a=0)), 0.0)

    def test_tangerine_threshold_edge(self):
        # 1 tangerine pixel in 256 opaque (0.39%) passes; 2 in 256 (0.78%) fails.
        Image = imgcheck.Image
        img = Image.new("RGBA", (16, 16), (0x34, 0x40, 0x7A, 255))
        img.putpixel((0, 0), (0xF5, 0x7C, 0x00, 255))
        self.assertLessEqual(tangerine_share(img), MAX_TANGERINE)
        img.putpixel((1, 0), (0xF5, 0x7C, 0x00, 255))
        self.assertGreater(tangerine_share(img), MAX_TANGERINE)

    def test_base_is_not_grape_navy(self):
        # The mono originals must fail the garment checks, else they prove nothing.
        for n in BODY:
            old = imgcheck.original(rel(n))
            self.assertLess(min(grape_share(old), navy_share(old)), MIN_SHARE, n)


if __name__ == "__main__":
    unittest.main(verbosity=1)
