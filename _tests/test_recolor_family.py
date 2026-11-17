"""Item: recolour the characters group photo (assets/images/characters/family.webp).

Done when
- the image keeps the size and mode of the bb74c20 original (1600x900 RGB WebP),
- colourfulness >= 8% AND clearly above the base (the mono base already scores
  ~8.3% from blush/skin, so the 8% bar alone proves nothing),
- each person's garment shows its PALETTE.md colour in their own area:
  sister pink sweatshirt #FF6F91, dad lemon tee #FFD23F, brother sky hoodie
  #3FA9F5, coworker mint knit vest #2ED3A8 (the base has grey/white clothes),
- cream background kept, no other image in characters/ touched (scarecrow is
  out of scope), work PNGs / candidates never land in the repo.
Run: python _tests/test_recolor_family.py
"""
import colorsys
import os
import subprocess
import sys
import unittest

sys.dont_write_bytecode = True
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import imgcheck  # noqa: E402

REL = "assets/images/characters/family.webp"
MIN_COLOUR = 0.08
MIN_GAIN = 0.05        # base ~0.083; four recoloured outfits add far more
MIN_SHARE = 0.10       # garment colour must cover >= 10% of its torso box
BASE_MAX_SHARE = 0.03  # sanity: the mono base must stay below this

# Torso boxes as fractions (x0, y0, x1, y1) of the 16:9 frame, left to right:
# sister | dad | brother | coworker. Generous so a slightly shifted edit still fits.
BOXES = {
    "sister": (0.18, 0.55, 0.33, 0.82),
    "dad": (0.36, 0.40, 0.52, 0.80),
    "brother": (0.53, 0.58, 0.66, 0.85),
    "coworker": (0.70, 0.52, 0.80, 0.78),
}


def crop(img, box):
    w, h = img.size
    x0, y0, x1, y1 = box
    return img.crop((int(x0 * w), int(y0 * h), int(x1 * w), int(y1 * h)))


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
    # pink #FF6F91 (hue ~346); blush is pale (s < 0.35) and must not count
    return hue_share(img, 325, 10, sat_min=0.40, val_min=0.60)


def lemon_share(img):
    # lemon #FFD23F (hue ~46); tangerine (~30) and cream (s ~0.10) excluded
    return hue_share(img, 40, 62, sat_min=0.45, val_min=0.70)


def sky_share(img):
    # sky #3FA9F5 (hue ~205, bright); navy (dark) excluded
    return hue_share(img, 188, 218, sat_min=0.30, val_min=0.70)


def mint_share(img):
    # mint #2ED3A8 (hue ~164)
    return hue_share(img, 148, 182, sat_min=0.40, val_min=0.50)


GARMENT = {
    "sister": pink_share,
    "dad": lemon_share,
    "brother": sky_share,
    "coworker": mint_share,
}


class TestRecolorFamily(unittest.TestCase):
    def test_file_exists(self):
        self.assertTrue(os.path.isfile(imgcheck.repo_path(REL)))

    def test_changed_from_base(self):
        with open(imgcheck.repo_path(REL), "rb") as f:
            now = f.read()
        self.assertFalse(imgcheck.original_bytes(REL) == now,
                         "still the bb74c20 (mono) file")

    def test_size_and_mode_match_base(self):
        ok, msg = imgcheck.same_size_mode(REL)
        self.assertTrue(ok, msg)

    def test_still_webp(self):
        self.assertEqual(imgcheck.current(REL).format, "WEBP")

    def test_colourful_at_least_8pct_and_above_base(self):
        old = imgcheck.colourfulness(imgcheck.original(REL))
        new = imgcheck.colourfulness(imgcheck.current(REL))
        self.assertGreaterEqual(new, MIN_COLOUR, f"{new:.3f} < {MIN_COLOUR}")
        self.assertGreaterEqual(new, old + MIN_GAIN,
                                f"{old:.3f} -> {new:.3f}, need +{MIN_GAIN}")

    def test_each_garment_colour_in_its_place(self):
        img = imgcheck.current(REL)
        low = []
        for who, fn in GARMENT.items():
            share = fn(crop(img, BOXES[who]))
            if share < MIN_SHARE:
                low.append(f"{who}: {share:.3f}")
        self.assertEqual(low, [], f"garment colour < {MIN_SHARE} in torso box")

    def test_cream_background_kept(self):
        # Top corners are background: must stay near cream #FFF6E5.
        img = imgcheck.current(REL).convert("RGB")
        w, h = img.size
        bad = []
        for xy in [(8, 8), (w - 9, 8)]:
            r, g, b = img.getpixel(xy)
            if abs(r - 0xFF) > 14 or abs(g - 0xF6) > 14 or abs(b - 0xE5) > 18:
                bad.append(f"{xy}: {(r, g, b)}")
        self.assertEqual(bad, [], "background is no longer cream")

    def test_other_character_images_untouched(self):
        # Only family.webp may change in characters/ (scarecrow etc. stay as is).
        out = subprocess.run(
            ["git", "diff", "--name-only", imgcheck.BASE, "--",
             "assets/images/characters"],
            cwd=imgcheck.REPO, capture_output=True, text=True, check=True).stdout
        out += subprocess.run(
            ["git", "status", "--porcelain", "--untracked-files=all",
             "--", "assets/images/characters"],
            cwd=imgcheck.REPO, capture_output=True, text=True, check=True).stdout
        others = sorted({line.strip().split()[-1].strip('"')
                         for line in out.splitlines() if line.strip()} - {REL})
        self.assertEqual(others, [], "other images in characters/ changed")

    def test_no_scarecrow_image_touched(self):
        out = subprocess.run(
            ["git", "diff", "--name-only", imgcheck.BASE, "--", "assets/images"],
            cwd=imgcheck.REPO, capture_output=True, text=True, check=True).stdout
        out += subprocess.run(
            ["git", "status", "--porcelain", "--untracked-files=all", "--",
             "assets/images"],
            cwd=imgcheck.REPO, capture_output=True, text=True, check=True).stdout
        hits = [l for l in out.splitlines()
                if "scarecrow" in l.lower() or "허수" in l]
        self.assertEqual(hits, [], "scarecrow image must not be recoloured")

    def test_no_work_files_in_repo(self):
        out = subprocess.run(
            ["git", "status", "--porcelain", "--untracked-files=all", "--ignored"],
            cwd=imgcheck.REPO, capture_output=True, text=True, check=True).stdout
        stray = [line for line in out.splitlines()
                 if "family" in line.lower()
                 and line.lower().rstrip('"').endswith((".png", ".webp", ".jpg", ".jpeg"))
                 and line[3:].strip().strip('"') != REL]
        self.assertEqual(stray, [], "work PNG / candidate left inside the repo")


class TestHelpers(unittest.TestCase):
    def test_share_functions_pick_only_their_colour(self):
        Image = imgcheck.Image

        def solid(rgb):
            return Image.new("RGBA", (4, 4), rgb + (255,))

        colours = {
            "sister": solid((0xFF, 0x6F, 0x91)),
            "dad": solid((0xFF, 0xD2, 0x3F)),
            "brother": solid((0x3F, 0xA9, 0xF5)),
            "coworker": solid((0x2E, 0xD3, 0xA8)),
        }
        for who, fn in GARMENT.items():
            for other, img in colours.items():
                self.assertEqual(fn(img), 1.0 if who == other else 0.0,
                                 f"{who} share on {other} colour")
        for neutral in [(0xFF, 0xF6, 0xE5), (0xF5, 0x7C, 0x00), (0x34, 0x40, 0x7A),
                        (128, 128, 128), (255, 255, 255), (0xF8, 0xC8, 0xC8)]:
            for who, fn in GARMENT.items():
                self.assertEqual(fn(solid(neutral)), 0.0, f"{who} on {neutral}")

    def test_base_fails_garment_checks(self):
        # The mono original must fail every garment check, else they prove nothing.
        old = imgcheck.original(REL)
        for who, fn in GARMENT.items():
            self.assertLess(fn(crop(old, BOXES[who])), BASE_MAX_SHARE, who)


if __name__ == "__main__":
    unittest.main(verbosity=1)
