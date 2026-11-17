"""Item: recolour brother-front / brother-side to the kids colour palette.

Done when
- both images keep the size and mode of the bb74c20 original,
- they are more colourful than the original and at least 8% colourful
  (sky hoodie #3FA9F5, navy trousers #34407A per PALETTE.md),
- work PNGs / candidates live only outside the repo (TEMP), never in it.
Run: python _tests/test_recolor_brother.py
"""
import colorsys
import os
import subprocess
import sys
import unittest

sys.dont_write_bytecode = True
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import imgcheck  # noqa: E402

NAMES = ["brother-front", "brother-side"]
DEST = "assets/images/twins"
MIN_COLOUR = 0.08
MIN_GAIN = 0.03
MIN_SHARE = 0.01  # each garment colour must cover >= 1% of opaque pixels


def rel(n):
    return f"{DEST}/{n}.webp"


def hue_share(img, lo, hi, sat_min=0.35, val_max=1.0, val_min=0.0, max_side=256):
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


def sky_share(img):
    # sky #3FA9F5 is hue ~205, bright; navy (#34407A, hue ~230, dark) must not count
    return hue_share(img, 188, 218, sat_min=0.30, val_min=0.70)


def navy_share(img):
    # navy #34407A has v ~0.48; the mono art's blue-black hair/trousers (v < 0.3)
    # must not count, so a lower brightness bound is required.
    return hue_share(img, 215, 250, sat_min=0.30, val_max=0.65, val_min=0.30)


class TestRecolorBrother(unittest.TestCase):
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

    def test_more_colourful_than_base_and_at_least_8pct(self):
        bad = []
        for n in NAMES:
            old = imgcheck.colourfulness(imgcheck.original(rel(n)))
            new = imgcheck.colourfulness(imgcheck.current(rel(n)))
            if new < MIN_COLOUR or new < old + MIN_GAIN:
                bad.append(f"{n}: {old:.3f} -> {new:.3f}")
        self.assertEqual(bad, [], f"need >= {MIN_COLOUR} and > base + {MIN_GAIN}")

    def test_sky_hoodie_present(self):
        low = [f"{n}: {sky_share(imgcheck.current(rel(n))):.3f}" for n in NAMES
               if sky_share(imgcheck.current(rel(n))) < MIN_SHARE]
        self.assertEqual(low, [], "sky hoodie colour missing")

    def test_navy_trousers_present(self):
        low = [f"{n}: {navy_share(imgcheck.current(rel(n))):.3f}" for n in NAMES
               if navy_share(imgcheck.current(rel(n))) < MIN_SHARE]
        self.assertEqual(low, [], "navy trousers colour missing")

    def test_transparent_background_kept(self):
        # Cutouts: corners must stay transparent (no cream box left by recolour).
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
                 if "brother" in line.lower()
                 and line.lower().rstrip('"').endswith((".png", ".webp", ".jpg", ".jpeg"))
                 and not line[3:].strip().strip('"') in [rel(n) for n in NAMES]]
        self.assertEqual(stray, [], "work PNG / candidate left inside the repo")


class TestHelpers(unittest.TestCase):
    def test_hue_share_bounds(self):
        Image = imgcheck.Image
        pink = Image.new("RGBA", (4, 4), (0xFF, 0x6F, 0x91, 255))
        navy = Image.new("RGBA", (4, 4), (0x34, 0x40, 0x7A, 255))
        sky = Image.new("RGBA", (4, 4), (0x3F, 0xA9, 0xF5, 255))
        grey = Image.new("RGBA", (4, 4), (90, 90, 90, 255))
        self.assertEqual(sky_share(sky), 1.0)
        self.assertEqual(sky_share(navy), 0.0)  # too dark for sky
        self.assertEqual(sky_share(pink), 0.0)
        self.assertEqual(sky_share(grey), 0.0)
        self.assertEqual(navy_share(navy), 1.0)
        self.assertEqual(navy_share(sky), 0.0)  # too bright for navy
        self.assertEqual(navy_share(grey), 0.0)
        blue_black = Image.new("RGBA", (4, 4), (20, 24, 40, 255))
        self.assertEqual(navy_share(blue_black), 0.0)  # mono hair, not navy
        self.assertEqual(sky_share(Image.new("RGBA", (4, 4), (0x3F, 0xA9, 0xF5, 0))), 0.0)

    def test_base_is_not_sky_navy(self):
        # The mono originals must fail the garment checks, else they prove nothing.
        for n in NAMES:
            old = imgcheck.original(rel(n))
            self.assertLess(min(sky_share(old), navy_share(old)), MIN_SHARE, n)


if __name__ == "__main__":
    unittest.main(verbosity=1)
