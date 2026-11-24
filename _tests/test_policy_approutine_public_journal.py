"""AppRoutine privacy policy: 'Public Journal (optional)' section (app 1.9.0 / 39).

Checks both policy pages (privacy/apptimeline.md = store URL,
privacy/approutine.md = URL linked from terms) in both language blocks.
Run: python _tests/test_policy_approutine_public_journal.py
"""
import os
import re
import sys
import unittest

for _s in (sys.stdout, sys.stderr):
    try:
        _s.reconfigure(encoding="utf-8")
    except Exception:
        pass

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILES = {
    "apptimeline": os.path.join(REPO, "privacy", "apptimeline.md"),
    "approutine": os.path.join(REPO, "privacy", "approutine.md"),
}
PERMALINKS = {
    "apptimeline": "/privacy/apptimeline/",
    "approutine": "/privacy/approutine/",
}
HEAD = {"ko": "**공개 일기(선택)**", "en": "**Public Journal (optional)**"}
COMMUNITY = {"ko": "**커뮤니티(선택)**", "en": "**Community (optional)**"}


def read(name):
    with open(FILES[name], encoding="utf-8") as f:
        return f.read().replace("\r\n", "\n")


def split_front(text):
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
    assert m, "front matter missing"
    return m.group(1), m.group(2)


def lang_block(text, lang):
    start = text.index(f'<div class="lang-{lang}"')
    if lang == "ko":
        end = text.index('<div class="lang-en"')
    else:
        end = len(text)
    return text[start:end]


def section(block, num):
    """Text of '### <num>.' up to the next '### ' heading."""
    m = re.search(rf"^### {num}\..*?(?=^### |\Z)", block, re.S | re.M)
    assert m, f"section {num} missing"
    return m.group(0)


def bold_block(block, head):
    """From a bold heading line to the next bold heading line / --- / ###."""
    lines = block.split("\n")
    idx = [i for i, l in enumerate(lines) if l.rstrip() == head]
    assert len(idx) == 1, f"{head} should appear exactly once as a heading line, got {len(idx)}"
    i = idx[0]
    out = [lines[i]]
    for l in lines[i + 1:]:
        if re.match(r"^\*\*[^*]+\*\*  $", l):
            break
        if l.startswith("---") or l.startswith("### "):
            break
        out.append(l)
    return "\n".join(out), i


class PolicyPublicJournal(unittest.TestCase):

    def check_all(self, pattern_lists, text, label):
        for pats in pattern_lists:
            if isinstance(pats, str):
                pats = [pats]
            self.assertTrue(any(re.search(p, text, re.I) for p in pats),
                            f"{label}: none of {pats} found")

    # --- the block itself -------------------------------------------------
    def test_block_format_and_position(self):
        for name in FILES:
            text = read(name)
            for lang in ("ko", "en"):
                with self.subTest(file=name, lang=lang):
                    block = lang_block(text, lang)
                    s1 = section(block, 1)
                    lines = s1.split("\n")
                    # heading line uses markdown hard break like the community one
                    self.assertIn(HEAD[lang] + "  ", lines,
                                  "heading must be its own line ending with two spaces")
                    self.assertIn(COMMUNITY[lang] + "  ", lines,
                                  "existing community heading must stay")
                    self.assertLess(lines.index(COMMUNITY[lang] + "  "),
                                    lines.index(HEAD[lang] + "  "),
                                    "public journal must come after community")
                    body, _ = bold_block(s1, HEAD[lang])
                    self.assertGreaterEqual(
                        len([l for l in body.split("\n") if l.startswith("- ")]), 4,
                        "block needs a bullet list of sent fields")
                    self.assertNotIn(COMMUNITY[lang], body)

    def test_block_contents_ko(self):
        for name in FILES:
            with self.subTest(file=name):
                s1 = section(lang_block(read(name), "ko"), 1)
                body, _ = bold_block(s1, HEAD["ko"])
                self.check_all([
                    "모두에게 공개", "기본", ["꺼", "끔"],
                    "별명", "형용사", "동물", "4자리",
                    "기분", r"1\s*[~～∼\-–]\s*5",
                    "메모", "200자",
                    "사용 시간", "어제", "목표", "날짜",
                    "앱 이름", "계정", "기기 식별자",
                    "Firestore",
                    "모두의 일기", ["모든 사람", "모든 사용자"],
                    "7일", ["자동으로 삭제", "자동 삭제"],
                    ["숨김", "숨겨"], ["비워", "비우", "비움"], ["끄거나", "끄면", "끈"], "지우",
                    "신고", "3건",
                    "이 사람 글 숨기기", "기기에만",
                    "콘솔",
                    "동의", ["처음", "첫"],
                ], body, f"{name} ko block")

    def test_block_contents_en(self):
        for name in FILES:
            with self.subTest(file=name):
                s1 = section(lang_block(read(name), "en"), 1)
                body, _ = bold_block(s1, HEAD["en"])
                self.check_all([
                    "Share with everyone", "off by default",
                    "nickname", "adjective", "animal", "4-digit",
                    "mood", [r"1\s*[-–~]\s*5", r"1 to 5"],
                    ["memo", "note"], "up to 200 characters",
                    "usage", "yesterday", "goals", "date",
                    "app names", "accounts", "device identifiers",
                    "Firestore",
                    "Everyone's Journals", ["everyone who uses", "all users", "anyone who uses"],
                    "7 days", "automatically",
                    "hidden", ["cleared", "emptied", "erased"], ["turn off", "turning off", "switch off"],
                    "delete",
                    "report", ["three reports", "3 reports"],
                    "Hide this person", "only on (your|their) device",
                    "console",
                    "consent", "first",
                ], body, f"{name} en block")

    # --- other sections ---------------------------------------------------
    def test_section1_intro_and_internet(self):
        for name in FILES:
            text = read(name)
            for lang, word, inet in (("ko", "공개 일기", "인터넷"),
                                     ("en", "Public Journal", "Internet")):
                with self.subTest(file=name, lang=lang):
                    s1 = section(lang_block(text, lang), 1)
                    paras = [p for p in s1.split("\n\n") if p.strip()]
                    intro = paras[1]  # first paragraph after the heading
                    self.assertIn(word, intro, "first sentence of section 1 must mention it")
                    lines = s1.split("\n")
                    k = next(i for i, l in enumerate(lines) if l.startswith("**" + inet))
                    self.assertRegex(lines[k + 1], "일기" if lang == "ko" else "(?i)journal",
                                     "internet permission use must mention public journal")

    def test_section4_sharing(self):
        for name in FILES:
            text = read(name)
            with self.subTest(file=name, lang="ko"):
                s4 = section(lang_block(text, "ko"), 4)
                self.check_all(["공개", "일기", ["모든 사용자", "모든 사람"], "별명", "신고"],
                               s4, f"{name} ko s4")
                self.assertIn("커뮤니티", s4)
            with self.subTest(file=name, lang="en"):
                s4 = section(lang_block(text, "en"), 4)
                self.check_all(["journal", ["all users", "everyone"], "nickname", "report"],
                               s4, f"{name} en s4")
                self.assertIn("Community", s4)

    def test_section5_retention(self):
        for name in FILES:
            text = read(name)
            with self.subTest(file=name, lang="ko"):
                s5 = section(lang_block(text, "ko"), 5)
                line = next((l for l in s5.split("\n") if "일기" in l), "")
                self.check_all(["7일", "자동", ["숨김", "숨겨"], ["비워", "비우", "비움"],
                                "별명", "날짜", "이메일"], line, f"{name} ko s5")
                self.assertIn("커뮤니티 게시물은 7일 뒤", s5)
            with self.subTest(file=name, lang="en"):
                s5 = section(lang_block(text, "en"), 5)
                line = next((l for l in s5.split("\n") if re.search("(?i)journal", l)), "")
                self.check_all(["7 days", "automatically", "hidden",
                                ["cleared", "emptied", "erased"], "nickname", "date", "email"],
                               line, f"{name} en s5")
                self.assertIn("Community posts are deleted automatically after 7 days", s5)

    # --- dates, sync, URLs ------------------------------------------------
    def test_revision_date(self):
        for name in FILES:
            with self.subTest(file=name):
                text = read(name)
                front, _ = split_front(text)
                self.assertIn("date: 2026-11-24", front.split("\n"))
                self.assertIn("최종 개정일: 2026년 11월 24일", text)
                self.assertIn("Last updated: November 24, 2026", text)
                self.assertNotIn("최종 개정일: 2026년 11월 20일", text)
                self.assertNotIn("Last updated: November 20, 2026", text)

    def test_approutine_matches_apptimeline(self):
        fa, ba = split_front(read("apptimeline"))
        fb, bb = split_front(read("approutine"))
        self.assertEqual(bb, ba, "approutine.md body must equal apptimeline.md body")
        strip = lambda f: [l for l in f.split("\n") if not l.startswith("permalink:")]
        self.assertEqual(strip(fb), strip(fa), "front matter may differ only in permalink")
        self.assertIn("**의견 보내기**  ", bb.split("\n"))

    def test_permalinks_unchanged(self):
        for name, link in PERMALINKS.items():
            with self.subTest(file=name):
                front, _ = split_front(read(name))
                self.assertIn(f"permalink: {link}", front.split("\n"))

    def test_internal_collection_name_not_exposed(self):
        for name in FILES:
            with self.subTest(file=name):
                self.assertNotIn("approutine_journals", read(name))


if __name__ == "__main__":
    unittest.main(verbosity=1)
