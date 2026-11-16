"""Item: copy marketing-studio's colour site copies into assets/images/twins/.

Done when
- every listed file is byte-identical to the same-named file in
  ../marketing-studio/projects/twins/marketing/assets/site/,
- size and mode match the original file at bb74c20,
- no *_mono file exists in the repository.
Run: python _tests/test_copy_site_assets.py
"""
import hashlib
import os
import subprocess
import sys
import unittest

sys.dont_write_bytecode = True
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import imgcheck  # noqa: E402

NAMES = (["sister-34", "brother-34", "sister-face", "brother-face",
          "sister-peek", "brother-peek"]
         + [f"stamp-{i}" for i in range(1, 7)] + ["stamp-tile"])
DEST = "assets/images/twins"


def sha(path):
    with open(path, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()


class TestCopySiteAssets(unittest.TestCase):
    def test_source_folder_has_every_file(self):
        missing = [n for n in NAMES
                   if not os.path.isfile(os.path.join(imgcheck.SITE_SRC, n + ".webp"))]
        self.assertEqual(missing, [], f"missing in {imgcheck.SITE_SRC}")

    def test_bytes_equal_marketing_copy(self):
        diff = []
        for n in NAMES:
            dst = imgcheck.repo_path(f"{DEST}/{n}.webp")
            src = os.path.join(imgcheck.SITE_SRC, n + ".webp")
            if not os.path.isfile(dst) or sha(dst) != sha(src):
                diff.append(n)
        self.assertEqual(diff, [], "not byte-identical to marketing-studio site copy")

    def test_not_the_mono_copy(self):
        # Guard against copying the *_mono variant under the plain name.
        same_as_mono = []
        for n in NAMES:
            mono = os.path.join(imgcheck.SITE_SRC, n + "_mono.webp")
            dst = imgcheck.repo_path(f"{DEST}/{n}.webp")
            if os.path.isfile(mono) and os.path.isfile(dst) and sha(mono) == sha(dst):
                same_as_mono.append(n)
        self.assertEqual(same_as_mono, [], "the _mono variant was copied")

    def test_changed_from_base(self):
        unchanged = [n for n in NAMES
                     if imgcheck.original_bytes(f"{DEST}/{n}.webp")
                     == open(imgcheck.repo_path(f"{DEST}/{n}.webp"), "rb").read()]
        self.assertEqual(unchanged, [], "still the bb74c20 (mono) file")

    def test_size_and_mode_match_base(self):
        bad = []
        for n in NAMES:
            ok, msg = imgcheck.same_size_mode(f"{DEST}/{n}.webp")
            if not ok:
                bad.append(msg)
        self.assertEqual(bad, [])

    def test_more_colourful_than_base(self):
        dull = []
        for n in NAMES:
            rel = f"{DEST}/{n}.webp"
            old = imgcheck.colourfulness(imgcheck.original(rel))
            new = imgcheck.colourfulness(imgcheck.current(rel))
            if new < old + 0.05:
                dull.append(f"{n}: {old:.3f} -> {new:.3f}")
        self.assertEqual(dull, [], "copy is not visibly more colourful")

    def test_no_mono_files_in_repo(self):
        tracked = subprocess.run(["git", "ls-files"], cwd=imgcheck.REPO,
                                 capture_output=True, text=True, check=True).stdout.split("\n")
        on_disk = []
        for root, dirs, files in os.walk(imgcheck.repo_path("assets")):
            on_disk += [os.path.join(root, f) for f in files if "_mono" in f]
        self.assertEqual([t for t in tracked if "_mono" in t] + on_disk, [])


class TestImgcheckHelpers(unittest.TestCase):
    def test_colourfulness_bounds(self):
        from PIL import Image
        grey = Image.new("RGBA", (8, 8), (120, 120, 120, 255))
        orange = Image.new("RGBA", (8, 8), (0xF5, 0x7C, 0x00, 255))
        pink = Image.new("RGBA", (8, 8), (0xFF, 0x6F, 0x91, 255))
        clear = Image.new("RGBA", (8, 8), (0xFF, 0x6F, 0x91, 0))
        self.assertEqual(imgcheck.colourfulness(grey), 0.0)
        self.assertEqual(imgcheck.colourfulness(orange), 0.0)
        self.assertEqual(imgcheck.colourfulness(pink), 1.0)
        self.assertEqual(imgcheck.colourfulness(clear), 0.0)

    def test_original_missing_path_raises(self):
        with self.assertRaises(subprocess.CalledProcessError):
            imgcheck.original("assets/images/twins/does-not-exist.webp")


if __name__ == "__main__":
    unittest.main(verbosity=1)
