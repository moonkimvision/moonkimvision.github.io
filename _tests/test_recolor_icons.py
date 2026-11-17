"""Item: recolour the site icons (favicon.png, apple-touch-icon.png) to the kids palette.

Done when
- both icons keep the size and mode of the bb74c20 original
  (favicon 64x64 RGBA round cut-out, apple-touch-icon 180x180 RGB opaque),
- both are more colourful than the original,
- favicon (sister face in a circle): clearly more colourful (+0.05 over the mono
  base, which scores ~0.08) and the transparent corners / opaque centre survive,
- apple-touch-icon (twins duo): the sister's pink sweatshirt (#FF6F91) and the
  brother's sky hoodie (#3FA9F5) are both visible (the mono original has neither),
  and the corners stay light cream,
- work PNGs / candidates live only outside the repo (TEMP), never in it.

Note: the mono apple-touch-icon already scores ~0.32 on imgcheck.colourfulness
because its blue-black hair counts as saturated, so the garment checks are what
prove the recolour actually happened.
Run: python _tests/test_recolor_icons.py
"""
import os
import subprocess
import sys
import unittest

sys.dont_write_bytecode = True
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import imgcheck  # noqa: E402
from test_recolor_twins_duo import pink_share, sky_share  # noqa: E402

FAVICON = "assets/images/twins/favicon.png"
APPLE = "assets/images/twins/apple-touch-icon.png"
ICONS = (FAVICON, APPLE)
FAVICON_MARGIN = 0.05   # favicon must gain at least this much colourfulness
MIN_SHARE = 0.03        # each duo garment colour must cover >= 3% of the icon
BASE_MAX_SHARE = 0.02   # sanity: the mono base must stay below this


class TestRecolorIcons(unittest.TestCase):
    def test_files_exist(self):
        for rel in ICONS:
            self.assertTrue(os.path.isfile(imgcheck.repo_path(rel)), rel)

    def test_changed_from_base(self):
        for rel in ICONS:
            with open(imgcheck.repo_path(rel), "rb") as f:
                now = f.read()
            self.assertFalse(imgcheck.original_bytes(rel) == now,
                             f"{rel} is still the bb74c20 (mono) file")

    def test_size_and_mode_match_base(self):
        for rel in ICONS:
            ok, msg = imgcheck.same_size_mode(rel)
            self.assertTrue(ok, msg)

    def test_still_png(self):
        for rel in ICONS:
            self.assertEqual(imgcheck.current(rel).format, "PNG", rel)

    def test_more_colourful_than_base(self):
        for rel in ICONS:
            old = imgcheck.colourfulness(imgcheck.original(rel))
            new = imgcheck.colourfulness(imgcheck.current(rel))
            self.assertGreater(new, old, f"{rel}: {old:.3f} -> {new:.3f}")

    def test_favicon_clearly_coloured(self):
        old = imgcheck.colourfulness(imgcheck.original(FAVICON))
        new = imgcheck.colourfulness(imgcheck.current(FAVICON))
        self.assertGreaterEqual(new, old + FAVICON_MARGIN,
                                f"favicon {old:.3f} -> {new:.3f}")

    def test_favicon_round_cutout_kept(self):
        # Corners transparent (circle cut-out), centre fully opaque.
        img = imgcheck.current(FAVICON).convert("RGBA")
        w, h = img.size
        for xy in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
            self.assertLess(img.getpixel(xy)[3], 32, f"corner {xy} not transparent")
        self.assertEqual(img.getpixel((w // 2, h // 2))[3], 255, "centre not opaque")

    def test_apple_sister_pink_present(self):
        share = pink_share(imgcheck.current(APPLE))
        self.assertGreaterEqual(share, MIN_SHARE, f"pink sweatshirt {share:.3f}")

    def test_apple_brother_sky_present(self):
        share = sky_share(imgcheck.current(APPLE))
        self.assertGreaterEqual(share, MIN_SHARE, f"sky hoodie {share:.3f}")

    def test_apple_cream_corners_kept(self):
        # Opaque icon on cream: top corners must stay light and near-neutral.
        img = imgcheck.current(APPLE).convert("RGB")
        w, _h = img.size
        bad = []
        for xy in [(1, 1), (w - 2, 1)]:
            r, g, b = img.getpixel(xy)
            if min(r, g, b) < 200 or max(r, g, b) - min(r, g, b) > 40:
                bad.append(f"{xy}: {(r, g, b)}")
        self.assertEqual(bad, [], "top corners are not cream")

    def test_no_work_files_in_repo(self):
        out = subprocess.run(
            ["git", "status", "--porcelain", "--untracked-files=all", "--ignored"],
            cwd=imgcheck.REPO, capture_output=True, text=True, check=True).stdout
        stray = [line for line in out.splitlines()
                 if ("favicon" in line.lower() or "apple-touch" in line.lower()
                     or "icon" in line.lower())
                 and line.lower().rstrip('"').endswith((".png", ".webp", ".jpg", ".jpeg"))
                 and line[3:].strip().strip('"') not in ICONS
                 and "assets/images/apps/" not in line]
        self.assertEqual(stray, [], "work PNG / candidate left inside the repo")


class TestIconBase(unittest.TestCase):
    def test_base_shapes(self):
        fav, apple = imgcheck.original(FAVICON), imgcheck.original(APPLE)
        self.assertEqual((fav.size, fav.mode), ((64, 64), "RGBA"))
        self.assertEqual((apple.size, apple.mode), ((180, 180), "RGB"))

    def test_base_lacks_garment_colours(self):
        # The mono original must fail the garment checks, else they prove nothing.
        old = imgcheck.original(APPLE)
        self.assertLess(pink_share(old), BASE_MAX_SHARE)
        self.assertLess(sky_share(old), BASE_MAX_SHARE)

    def test_favicon_margin_is_meaningful(self):
        # The base favicon itself must fail the margin check.
        old = imgcheck.colourfulness(imgcheck.original(FAVICON))
        self.assertLess(old, 0.15, f"mono favicon unexpectedly colourful {old:.3f}")


if __name__ == "__main__":
    unittest.main(verbosity=1)
