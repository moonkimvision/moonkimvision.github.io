"""Item: recolour the gongdong OG image (assets/images/gongdong/og-gongdong.jpg)
to the kids palette if the bb74c20 original is mono.

Done when
- the file is still a JPEG in RGB mode,
- its size matches the bb74c20 original (1200x630),
- colourfulness >= 5% (and higher than the original),
- the dad's lemon tee (#FFD23F, was white) and the coworker's mint knit vest
  (#2ED3A8, was dark grey) are visible (the mono original has neither: 0%),
- the cream (#FFF6E5) background is kept in all four corners,
- work PNGs / candidates live only outside the repo (TEMP), never in it.

If the original were already colour (colourfulness >= 5%), the file may stay as
it is: the "must change" checks are skipped then. At bb74c20 it measures ~2.8%,
so the recolour is required.
Run: python _tests/test_recolor_og_gongdong.py
"""
import colorsys
import os
import subprocess
import sys
import unittest

sys.dont_write_bytecode = True
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import imgcheck  # noqa: E402

REL = "assets/images/gongdong/og-gongdong.jpg"
BASE_SIZE = (1200, 630)
MIN_COLOUR = 0.05      # completion criterion: colourfulness >= 5%
MIN_SHARE = 0.03       # each garment colour must cover >= 3% of the picture
BASE_MAX_SHARE = 0.01  # sanity: the mono base must stay below this


def base_is_colour():
    return imgcheck.colourfulness(imgcheck.original(REL)) >= MIN_COLOUR


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


def lemon_share(img):
    # lemon #FFD23F (hue ~46) and shadow #EDB51C (hue ~44); tangerine watch /
    # lanyard (hue ~30) and cream background (s ~0.10) must not count
    return hue_share(img, 40, 62, sat_min=0.45, val_min=0.70)


def mint_share(img):
    # mint #2ED3A8 (hue ~164) and shadow #1BAE89 (hue ~165)
    return hue_share(img, 148, 182, sat_min=0.40, val_min=0.50)


class TestRecolorOgGongdong(unittest.TestCase):
    def test_file_exists(self):
        self.assertTrue(os.path.isfile(imgcheck.repo_path(REL)))

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

    def test_colourful_enough(self):
        new = imgcheck.colourfulness(imgcheck.current(REL))
        self.assertGreaterEqual(new, MIN_COLOUR, f"{new:.3f} < {MIN_COLOUR}")

    def test_changed_if_base_mono(self):
        if base_is_colour():
            self.skipTest("bb74c20 original is already colour; may stay as is")
        with open(imgcheck.repo_path(REL), "rb") as f:
            now = f.read()
        self.assertNotEqual(imgcheck.original_bytes(REL), now,
                            "still the bb74c20 (mono) file")

    def test_more_colourful_than_base(self):
        if base_is_colour():
            self.skipTest("bb74c20 original is already colour; may stay as is")
        old = imgcheck.colourfulness(imgcheck.original(REL))
        new = imgcheck.colourfulness(imgcheck.current(REL))
        self.assertGreater(new, old, f"{old:.3f} -> {new:.3f}")

    def test_dad_lemon_tee_present(self):
        if base_is_colour():
            self.skipTest("bb74c20 original is already colour; may stay as is")
        share = lemon_share(imgcheck.current(REL))
        self.assertGreaterEqual(share, MIN_SHARE, f"lemon tee {share:.3f}")

    def test_coworker_mint_vest_present(self):
        if base_is_colour():
            self.skipTest("bb74c20 original is already colour; may stay as is")
        share = mint_share(imgcheck.current(REL))
        self.assertGreaterEqual(share, MIN_SHARE, f"mint vest {share:.3f}")

    def test_cream_background_kept(self):
        # The picture sits on cream on both sides: all four corners must stay
        # light and warm-neutral (no dark/colour fringe from recolour or snap).
        img = imgcheck.current(REL).convert("RGB")
        w, h = img.size
        bad = []
        for xy in [(2, 2), (2, h - 3), (w - 3, 2), (w - 3, h - 3)]:
            r, g, b = img.getpixel(xy)
            if min(r, g, b) < 200 or max(r, g, b) - min(r, g, b) > 40:
                bad.append(f"{xy}: {(r, g, b)}")
        self.assertEqual(bad, [], "corners are not cream")

    def test_no_work_files_in_repo(self):
        out = subprocess.run(
            ["git", "status", "--porcelain", "--untracked-files=all", "--ignored"],
            cwd=imgcheck.REPO, capture_output=True, text=True, check=True).stdout
        stray = [line for line in out.splitlines()
                 if "og" in line.lower().rsplit("/", 1)[-1]
                 and line.lower().rstrip('"').endswith((".png", ".webp", ".jpg", ".jpeg"))
                 and line[3:].strip().strip('"') != REL
                 and "og-twins" not in line]
        self.assertEqual(stray, [], "work PNG / candidate left inside the repo")


class TestHelpers(unittest.TestCase):
    def test_hue_share_bounds(self):
        Image = imgcheck.Image

        def solid(rgb, a=255):
            return Image.new("RGBA", (4, 4), rgb + (a,))

        lemon, lemon_sh = solid((0xFF, 0xD2, 0x3F)), solid((0xED, 0xB5, 0x1C))
        mint, mint_sh = solid((0x2E, 0xD3, 0xA8)), solid((0x1B, 0xAE, 0x89))
        tang, cream = solid((0xF5, 0x7C, 0x00)), solid((0xFF, 0xF6, 0xE5))
        white, grey = solid((255, 255, 255)), solid((60, 60, 66))
        navy, skin = solid((0x34, 0x40, 0x7A)), solid((0xFF, 0xF3, 0xEC))
        self.assertEqual(lemon_share(lemon), 1.0)
        self.assertEqual(lemon_share(lemon_sh), 1.0)
        self.assertEqual(mint_share(mint), 1.0)
        self.assertEqual(mint_share(mint_sh), 1.0)
        for other in (mint, tang, cream, white, grey, navy, skin):
            self.assertEqual(lemon_share(other), 0.0)
        for other in (lemon, tang, cream, white, grey, navy, skin):
            self.assertEqual(mint_share(other), 0.0)
        # transparent pixels are ignored
        self.assertEqual(lemon_share(solid((0xFF, 0xD2, 0x3F), a=0)), 0.0)

    def test_colour_threshold_edge(self):
        # 12 of 256 pixels (4.7%) is below MIN_COLOUR, 13 of 256 (5.1%) passes.
        Image = imgcheck.Image
        img = Image.new("RGB", (16, 16), (0xFF, 0xF6, 0xE5))
        for x in range(12):
            img.putpixel((x, 0), (0x2E, 0xD3, 0xA8))
        self.assertLess(imgcheck.colourfulness(img), MIN_COLOUR)
        img.putpixel((12, 0), (0x2E, 0xD3, 0xA8))
        self.assertGreaterEqual(imgcheck.colourfulness(img), MIN_COLOUR)

    def test_base_is_mono_original(self):
        # The bb74c20 original is the mono selfie: garment checks must fail on it,
        # otherwise they prove nothing.
        old = imgcheck.original(REL)
        self.assertEqual((old.format, old.mode, old.size), ("JPEG", "RGB", BASE_SIZE))
        self.assertFalse(base_is_colour())
        self.assertLess(lemon_share(old), BASE_MAX_SHARE)
        self.assertLess(mint_share(old), BASE_MAX_SHARE)


if __name__ == "__main__":
    unittest.main(verbosity=1)
