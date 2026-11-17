"""Item: recolour gongdong coworker-34 / -face / -front / -side to the kids palette.

Done when
- all four images keep the size and mode of the bb74c20 original,
- they are more colourful than the original (body shots by >= 2 points),
- body shots wear a mint knit vest (#2ED3A8 / shadow #1BAE89) per palette.json
  "coworker", while the white shirt stays white (not repainted mint/lemon),
- cutouts stay transparent, work PNGs / candidates never land in the repo.
Run: python _tests/test_recolor_coworker.py
"""
import colorsys
import os
import subprocess
import sys
import unittest

sys.dont_write_bytecode = True
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import imgcheck  # noqa: E402

NAMES = ["coworker-34", "coworker-face", "coworker-front", "coworker-side"]
BODY = ["coworker-34", "coworker-front", "coworker-side"]  # face crop: no vest
DEST = "assets/images/gongdong"
MIN_GAIN = 0.02         # body shots: base already scores 16-18% (bluish greys)
MIN_FACE_GAIN = 0.003   # face crop: must still be measurably more colourful
MIN_MINT = 0.03         # vest is a clear area on every body shot (base: 0%)
WHITE_KEEP = 0.5        # white shirt: keep >= half of the base white share
MIN_WHITE = 0.05        # ... and never drop below 5% of the figure


def rel(n):
    return f"{DEST}/{n}.webp"


def share(img, pred, max_side=256):
    """Share of opaque pixels (alpha >= 128) for which pred(r, g, b) is true."""
    img = img.convert("RGBA")
    if max(img.size) > max_side:
        img = img.copy()
        img.thumbnail((max_side, max_side), imgcheck.Image.NEAREST)
    total = hits = 0
    for r, g, b, a in img.getdata():
        if a < 128:
            continue
        total += 1
        if pred(r, g, b):
            hits += 1
    return hits / total if total else 0.0


def is_mint(r, g, b):
    # mint #2ED3A8 / shadow #1BAE89 sit at hue ~164; leaf #59C27A (~138),
    # sky #3FA9F5 (~205) and pastel_mint #DCF6EC (s 0.1) are excluded.
    h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
    return 150 <= h * 360 <= 180 and s >= 0.5 and v >= 0.5


def is_white(r, g, b):
    # shirt white #FFFFFF and the cream/skin near it; no tint allowed
    return min(r, g, b) >= 235 and max(r, g, b) - min(r, g, b) <= 14


def mint_share(img):
    return share(img, is_mint)


def white_share(img):
    return share(img, is_white)


class TestRecolorCoworker(unittest.TestCase):
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
            if new < old + MIN_GAIN:
                bad.append(f"{n}: {old:.3f} -> {new:.3f}")
        self.assertEqual(bad, [], f"need > base + {MIN_GAIN}")

    def test_face_more_colourful_than_base(self):
        n = "coworker-face"
        old = imgcheck.colourfulness(imgcheck.original(rel(n)))
        new = imgcheck.colourfulness(imgcheck.current(rel(n)))
        self.assertGreaterEqual(new, old + MIN_FACE_GAIN, f"{n}: {old:.3f} -> {new:.3f}")

    def test_mint_vest_present(self):
        low = []
        for n in BODY:
            v = mint_share(imgcheck.current(rel(n)))
            if v < MIN_MINT:
                low.append(f"{n}: {v:.3f}")
        self.assertEqual(low, [], "mint knit vest missing (grey vest left?)")

    def test_white_shirt_kept(self):
        bad = []
        for n in BODY:
            old = white_share(imgcheck.original(rel(n)))
            new = white_share(imgcheck.current(rel(n)))
            if new < max(MIN_WHITE, old * WHITE_KEEP):
                bad.append(f"{n}: {old:.3f} -> {new:.3f}")
        self.assertEqual(bad, [], "white shirt was repainted")

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
                 if "coworker" in line.lower()
                 and line.lower().rstrip('"').endswith((".png", ".webp", ".jpg", ".jpeg"))
                 and not line[3:].strip().strip('"') in [rel(n) for n in NAMES]]
        self.assertEqual(stray, [], "work PNG / candidate left inside the repo")


class TestHelpers(unittest.TestCase):
    def solid(self, rgb, a=255):
        return imgcheck.Image.new("RGBA", (4, 4), rgb + (a,))

    def test_mint_bounds(self):
        s = self.solid
        self.assertEqual(mint_share(s((0x2E, 0xD3, 0xA8))), 1.0)
        self.assertEqual(mint_share(s((0x1B, 0xAE, 0x89))), 1.0)
        for other in [(0x59, 0xC2, 0x7A), (0x3F, 0xA9, 0xF5), (0xDC, 0xF6, 0xEC),
                      (0xB6, 0xE7, 0xD4), (255, 255, 255), (120, 130, 128),
                      (0xF5, 0x7C, 0x00), (0xFF, 0xD2, 0x3F)]:
            self.assertEqual(mint_share(s(other)), 0.0, other)
        self.assertEqual(mint_share(s((0x2E, 0xD3, 0xA8), a=0)), 0.0)

    def test_white_bounds(self):
        s = self.solid
        self.assertEqual(white_share(s((255, 255, 255))), 1.0)
        self.assertEqual(white_share(s((235, 240, 249))), 1.0)  # edge: spread 14
        self.assertEqual(white_share(s((235, 240, 250))), 0.0)  # spread 15
        self.assertEqual(white_share(s((234, 240, 240))), 0.0)  # too dark
        for other in [(0xDC, 0xF6, 0xEC), (0xFF, 0xF3, 0xC4), (0x2E, 0xD3, 0xA8)]:
            self.assertEqual(white_share(s(other)), 0.0, other)

    def test_base_has_no_mint_but_has_white(self):
        # The mono originals must fail the vest check and pass the shirt check,
        # else the tests prove nothing.
        for n in BODY:
            base = imgcheck.original(rel(n))
            self.assertLess(mint_share(base), MIN_MINT, n)
            self.assertGreaterEqual(white_share(base), MIN_WHITE, n)


if __name__ == "__main__":
    unittest.main(verbosity=1)
