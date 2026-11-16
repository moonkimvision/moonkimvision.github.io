"""Shared image checks for the colour-art migration tests.

- original(path): the image as it was at commit BASE (bb74c20), read via `git show`.
- same_size_mode(path): compare current file's size/mode with the BASE version.
- colourfulness(img): share of opaque pixels whose saturation >= 0.25 and whose
  hue is NOT in the tangerine band 20..40 deg (the only colour of the mono art).
"""
import colorsys
import io
import os
import subprocess

from PIL import Image

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "bb74c20"
SITE_SRC = os.path.normpath(
    os.path.join(REPO, "..", "marketing-studio", "projects", "twins",
                 "marketing", "assets", "site"))


def repo_path(rel):
    return os.path.join(REPO, *rel.split("/"))


def original_bytes(rel, rev=BASE):
    out = subprocess.run(["git", "show", f"{rev}:{rel}"], cwd=REPO,
                         capture_output=True, check=True)
    return out.stdout


def original(rel, rev=BASE):
    img = Image.open(io.BytesIO(original_bytes(rel, rev)))
    img.load()
    return img


def current(rel):
    img = Image.open(repo_path(rel))
    img.load()
    return img


def same_size_mode(rel, rev=BASE):
    """Return (ok, message) comparing current file to the BASE version."""
    old, new = original(rel, rev), current(rel)
    if (old.size, old.mode) == (new.size, new.mode):
        return True, ""
    return False, (f"{rel}: was {old.size} {old.mode}, "
                   f"now {new.size} {new.mode}")


def colourfulness(img, sat_min=0.25, hue_skip=(20.0, 40.0), alpha_min=128,
                  max_side=256):
    """Fraction of opaque pixels that are saturated and not tangerine."""
    img = img.convert("RGBA")
    if max(img.size) > max_side:
        img = img.copy()
        img.thumbnail((max_side, max_side), Image.NEAREST)
    total = hits = 0
    for r, g, b, a in img.getdata():
        if a < alpha_min:
            continue
        total += 1
        h, _l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
        # HLS saturation is unstable near white/black; use HSV-like chroma.
        mx, mn = max(r, g, b), min(r, g, b)
        s = 0.0 if mx == 0 else (mx - mn) / mx
        hue = h * 360.0
        if s >= sat_min and not (hue_skip[0] <= hue <= hue_skip[1]):
            hits += 1
    return hits / total if total else 0.0
