# moonkimvision.github.io

Jekyll 기반 GitHub Pages 블로그.  
앱 스토어(Google Play 등) 제출 시 필요한 **개인정보처리방침**, **이용약관** 등 정책 페이지와 일반 블로그 포스트를 호스팅한다.

---

## 기술 스택

| 항목 | 내용 |
|------|------|
| 빌드 | Jekyll (GitHub Pages 네이티브 지원) |
| 호스팅 | GitHub Pages — `main` 브랜치 push 시 자동 배포 |
| 도메인 | `https://moonkimvision.github.io` |

---

## 디렉토리 구조

```
/
├── _config.yml          # Jekyll 전역 설정
├── _data/
│   ├── twins.yml        # 쌍둥이 캐릭터 프로필·능력치·에피소드
│   ├── apps.yml         # 앱 목록 (홈·앱 페이지·포스트 하단 카드가 읽음)
│   └── sns.yml          # 유튜브·인스타그램·틱톡 채널 (_config.yml social.links 와 같은 주소)
├── _posts/              # 블로그 포스트 (YYYY-MM-DD-slug.md)
├── privacy/             # 앱별 개인정보처리방침
├── twins/               # 쌍둥이 소개(/twins/) + 프로필(sister, brother)
├── apps/                # 앱 목록(/apps/)
├── 404.html             # 없는 주소 안내 (쌍둥이)
├── _layouts/            # default · home · page · post · character · policy-bilingual
├── _includes/           # header · footer · bubble(말풍선) · app-card · twin-card · post-card
├── assets/
│   ├── css/main.css     # 쌍둥이 테마 (크림 + 먹색 + 주황 한 점)
│   ├── js/site.js       # 언어 토글·캐릭터 대사·포즈 전환 (언어 첫 적용만 head 인라인)
│   └── images/
│       ├── twins/       # 캐릭터 WebP(컷아웃·얼굴·스탬프·푸터 빼꼼), OG jpg, 파비콘
│       └── apps/        # 앱 아이콘
├── BACKLOG.md
└── ralph-core/          # ralph 자동화 엔진 (submodule)
```

---

## 쌍둥이 캐릭터 (사이트 마스코트)

- 원본 설정: `../marketing-studio/projects/twins/marketing/character/CHARACTER.md` — 누나(§8)·동생(§9). 사이트용 요약은 `_data/twins.yml`.
- 디자인 규칙: 흑백 + 크림 배경 `#FFF6E5` + 유일한 색 주황 `#F57C00`(손목 밴드). 누나 말풍선 흰색, 동생 말풍선 연주황.
- 말투: 누나 = 수다·허세, 자기 말 끊기("아 잠깐"). 동생 = 느리고 짧은 한마디("…"로 시작). 훈계·비하 금지.
- 포스트 안 대화: `<div class="chat">` 안에 `{% include bubble.html who="sister|brother" text="..." %}` 를 줄마다.
- 언어: `bilingual: true` 페이지(또는 layout)만 헤더에 한국어/EN 토글이 나오고, 나머지는 `lang` 으로 고정된다. 양쪽 문구는 `.lang-ko` / `.lang-en`.

---

## 로컬 개발

```bash
# 의존성 설치 (최초 1회)
bundle install

# 개발 서버 실행 (http://localhost:4000)
bundle exec jekyll serve --livereload

# 빌드만
bundle exec jekyll build
```

---

## 페이지 규칙

### 정책 페이지 (개인정보처리방침 등)
- 경로: `privacy/<앱-슬러그>.md`
- permalink: `/privacy/<앱-슬러그>/`
- Google Play 등록 URL 예시: `https://moonkimvision.github.io/privacy/my-app/`
- layout: `policy-bilingual` (한/영 토글, `title_ko`·`title_en`) 또는 `page`
- 정책 페이지 URL 은 스토어에 등록돼 있으므로 바꾸지 않는다.

### 앱 추가
- `_data/apps.yml` 에 항목 추가 (아이콘 `assets/images/apps/<id>-icon.png`, 스토어·정책·소개 글 링크, 쌍둥이 한마디)
- 소개 포스트에 `app: <id>` 를 넣으면 포스트 상단 색과 하단 앱 카드가 붙는다.

### 블로그 포스트
- 경로: `_posts/YYYY-MM-DD-slug.md`
- permalink: `/posts/<slug>/`
- layout: `post` (기본값으로 설정됨), 목록 카드 요약은 front matter `description`

### Front matter 필수 항목
```yaml
---
layout: page          # 또는 post
title: "페이지 제목"
permalink: /경로/
lang: ko              # ko | en
date: YYYY-MM-DD      # 포스트만
---
```

---

## 배포

`main` 브랜치에 push하면 GitHub Pages가 자동으로 Jekyll 빌드 후 배포한다.  
별도 CI/CD 설정 불필요.

---

## ralph 자동화

`ralph-core/ralph.py`를 통해 BACKLOG.md 항목을 자동 처리한다.  
실행: `python ralph-core/ralph.py`

ralph는 프로젝트 루트(이 디렉토리)를 작업 기준으로 삼는다.
