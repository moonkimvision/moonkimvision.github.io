"""Item: recolour the twins OG image (assets/images/twins/og-twins.jpg) to the kids palette.

Done when
- the file is still a JPEG in RGB mode,
- its size matches the bb74c20 original (1200x630),
- it is more colourful than the original and colourfulness >= 5%,
- the sister's pink sweatshirt (#FF6F91) and the brother's sky hoodie (#3FA9F5)
  are visible (the mono original has neither: both < 0.1%),
- the left panel keeps its cream (#FFF6E5) background,
- work PNGs / candidates live only outside the repo (TEMP), never in it.

Note: the mono base already scores ~0.22 on imgcheck.colourfulness because its
blue-black hair counts as saturated, so the garment checks are what prove the
recolour actually happened.
Run: python _tests/test_recolor_og_twins.py
"""
import colorsys
import os
import subprocess
import sys
import unittest

sys.dont_write_bytecode = True
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import imgcheck  # noqa: E402

REL = "assets/images/twins/og-twins.jpg"
BASE_SIZE = (1200, 630)
MIN_COLOUR = 0.05      # completion criterion: colourfulness >= 5%
MIN_SHARE = 0.03       # each garment colour must cover >= 3% of the picture
BASE_MAX_SHARE = 0.01  # sanity: the mono base must stay below this


def hue_share(img, lo, hi, sat_min=0.30, val_min=0.0, val_max=1.0, max_side=256):
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


def pink_share(img):
    # pink #FF6F91 (hue ~346) and its shadow; bright, so dark reds are excluded
    return hue_share(img, 325, 10, sat_min=0.30, val_min=0.55)


def sky_share(img):
    # sky #3FA9F5 (hue ~205) and shadow; bright, so blue-black hair is excluded
    return hue_share(img, 188, 218, sat_min=0.30, val_min=0.70)


class TestRecolorOgTwins(unittest.TestCase):
    def test_file_exists(self):
        self.assertTrue(os.path.isfile(imgcheck.repo_path(REL)))

    def test_changed_from_base(self):
        with open(imgcheck.repo_path(REL), "rb") as f:
            now = f.read()
        self.assertNotEqual(imgcheck.original_bytes(REL), now,
                            "still the bb74c20 (mono) file")

    def test_is_jpeg_rgb(self):
        # finish writes RGBA; the result must be converted back to an RGB JPEG
        img = imgcheck.current(REL)
        self.assertEqual(img.format, "JPEG")
        self.assertEqual(img.mode, "RGB")

    def test_size_matches_base(self):
        old, new = imgcheck.original(REL), imgcheck.current(REL)
        self.assertEqual(new.size, old.size)
        self.assertEqual(new.size, BASE_SIZE)

    def test_size_and_mode_match_base(self):
        ok, msg = imgcheck.same_size_mode(REL)
        self.assertTrue(ok, msg)

    def test_more_colourful_than_base(self):
        old = imgcheck.colourfulness(imgcheck.original(REL))
        new = imgcheck.colourfulness(imgcheck.current(REL))
        self.assertGreater(new, old, f"{old:.3f} -> {new:.3f}")
        self.assertGreaterEqual(new, MIN_COLOUR, f"{new:.3f} < {MIN_COLOUR}")

    def test_sister_pink_present(self):
        share = pink_share(imgcheck.current(REL))
        self.assertGreaterEqual(share, MIN_SHARE, f"pink sweatshirt {share:.3f}")

    def test_brother_sky_present(self):
        share = sky_share(imgcheck.current(REL))
        self.assertGreaterEqual(share, MIN_SHARE, f"sky hoodie {share:.3f}")

    def test_cream_background_kept(self):
        # Left panel sits on cream: its top-left and bottom-left corners must stay
        # light and warm-neutral (no dark/colour fringe from recolour or snap).
        img = imgcheck.current(REL).convert("RGB")
        _w, h = img.size
        bad = []
        for xy in [(2, 2), (2, h - 3)]:
            r, g, b = img.getpixel(xy)
            if min(r, g, b) < 200 or max(r, g, b) - min(r, g, b) > 40:
                bad.append(f"{xy}: {(r, g, b)}")
        self.assertEqual(bad, [], "left panel corners are not cream")

    def test_no_work_files_in_repo(self):
        out = subprocess.run(
            ["git", "status", "--porcelain", "--untracked-files=all", "--ignored"],
            cwd=imgcheck.REPO, capture_output=True, text=True, check=True).stdout
        stray = [line for line in out.splitlines()
                 if "og" in line.lower().rsplit("/", 1)[-1]
                 and line.lower().rstrip('"').endswith((".png", ".webp", ".jpg", ".jpeg"))
                 and line[3:].strip().strip('"') != REL
                 and "og-gongdong" not in line]
        self.assertEqual(stray, [], "work PNG / candidate left inside the repo")


class TestHelpers(unittest.TestCase):
    def test_hue_share_bounds(self):
        Image = imgcheck.Image

        def solid(rgb, a=255):
            return Image.new("RGBA", (4, 4), rgb + (a,))

        pink, sky = solid((0xFF, 0x6F, 0x91)), solid((0x3F, 0xA9, 0xF5))
        navy, cream = solid((0x34, 0x40, 0x7A)), solid((0xFF, 0xF6, 0xE5))
        hair, grey = solid((20, 24, 40)), solid((128, 128, 128))
        tang = solid((0xF5, 0x7C, 0x00))
        self.assertEqual(pink_share(pink), 1.0)
        self.assertEqual(sky_share(sky), 1.0)
        for other in (sky, navy, cream, hair, grey, tang):
            self.assertEqual(pink_share(other), 0.0)
        for other in (pink, navy, cream, hair, grey, tang):
            self.assertEqual(sky_share(other), 0.0)

    def test_colour_threshold_edge(self):
        # 12 of 256 pixels (4.7%) is below MIN_COLOUR, 13 of 256 (5.1%) passes.
        Image = imgcheck.Image
        img = Image.new("RGB", (16, 16), (0xFF, 0xF6, 0xE5))
        for x in range(12):
            img.putpixel((x, 0), (0x3F, 0xA9, 0xF5))
        self.assertLess(imgcheck.colourfulness(img), MIN_COLOUR)
        img.putpixel((12, 0), (0x3F, 0xA9, 0xF5))
        self.assertGreaterEqual(imgcheck.colourfulness(img), MIN_COLOUR)

    def test_base_lacks_garment_colours(self):
        # The mono original must fail the garment checks, else they prove nothing.
        old = imgcheck.original(REL)
        self.assertEqual((old.format, old.mode, old.size), ("JPEG", "RGB", BASE_SIZE))
        self.assertLess(pink_share(old), BASE_MAX_SHARE)
        self.assertLess(sky_share(old), BASE_MAX_SHARE)


if __name__ == "__main__":
    unittest.main(verbosity=1)
