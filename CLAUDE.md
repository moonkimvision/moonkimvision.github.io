# moonkimvision.github.io

Jekyll 기반 GitHub Pages 블로그.  
앱 스토어(Google Play 등) 제출 시 필요한 **개인정보처리방침**, **이용약관** 등 정책 페이지와 일반 블로그 포스트를 호스팅한다.

---

## 기술 스택

| 항목 | 내용 |
|------|------|
| 빌드 | Jekyll (GitHub Pages 네이티브 지원) |
| 호스팅 | GitHub Pages — `main` 브랜치 push 시 자동 배포 |
| 도메인 | `https://moonkimvision.com` (가비아 구매, 루트 `CNAME` 파일로 연결. 옛 `moonkimvision.github.io` 주소는 자동 리다이렉트) |

---

## 디렉토리 구조

```
/
├── CNAME                # 사용자 도메인 (moonkimvision.com)
├── _config.yml          # Jekyll 전역 설정
├── _data/
│   ├── characters.yml   # 캐릭터 그룹 목록 (상단 메뉴 '캐릭터' /characters/, 프로필 레이아웃·카드·말풍선이 읽음)
│   ├── twins.yml        # 쌍둥이 캐릭터 프로필·능력치·에피소드 (characters.yml 의 twins 그룹 data)
│   ├── gongdong.yml     # 공동책임(아빠 유 책임 + 회사 동기 노 책임) 프로필·능력치 (gongdong 그룹 data)
│   ├── apps.yml         # 앱 목록 (홈·앱 페이지·포스트 하단 카드가 읽음)
│   ├── games.yml        # 웹게임 목록 (/apps/ 의 '웹에서 바로' 구역이 읽음)
│   └── sns.yml          # 유튜브·인스타그램·틱톡 채널 (_config.yml social.links 와 같은 주소)
├── _posts/              # 블로그 포스트 (YYYY-MM-DD-slug.md)
├── privacy/             # 앱별 개인정보처리방침 (링크로만 접근 — 목록 페이지·사이트 내 링크 없음)
├── characters/          # 캐릭터 목록(/characters/) — 그룹 카드 + '새 친구 준비 중' 카드
├── twins/               # 쌍둥이 소개(/twins/) + 프로필(sister, brother) — 첫 캐릭터 그룹 (주소는 SNS 공유돼 있어 유지)
├── gongdong/            # 공동책임 소개(/gongdong/) + 프로필(dad, coworker). bear.html 은 옛 주소 → coworker 이동
├── apps/                # 앱(/apps/) — 모바일 앱(#mobile) + 웹게임(#web) 두 구역
├── games/               # /games/ 는 /apps/#web 로 이동만. 게임별 폴더(games/<id>/ — 게임 저장소 Actions 가 복사, 직접 수정 금지)
├── 404.html             # 없는 주소 안내 (쌍둥이)
├── _layouts/            # default · home · page · post · character · policy-bilingual
├── _includes/           # header · footer · bubble(말풍선, group 인자) · app-card · game-card · twin-card(멤버 카드, group 인자) · post-card
├── assets/
│   ├── css/main.css     # 쌍둥이 테마 (크림 + 먹색 + 주황 한 점)
│   ├── js/site.js       # 언어 토글·캐릭터 대사·포즈 전환 (언어 첫 적용만 head 인라인)
│   └── images/
│       ├── twins/       # 캐릭터 WebP(컷아웃·얼굴·스탬프·푸터 빼꼼), OG jpg, 파비콘
│       ├── gongdong/    # 공동책임 WebP (컷아웃·얼굴은 marketing-studio 마스터 시트에서 잘라 냄, 듀오 셀카는 output/2026-10-15/site_gongdong_duo_v1_3)
│       ├── characters/  # 캐릭터 페이지 단체 사진 family.webp (output/2026-10-15/site_family_v1_1)
│       ├── apps/        # 앱 아이콘
│       └── games/       # 게임 썸네일 WebP (16:9)
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
- 쌍둥이는 사이트 전체 마스코트로 남는다 (헤더 로고 얼굴, 푸터 빼꼼, 404, 홈 히어로). 다른 캐릭터는 '캐릭터' 메뉴 아래에 그룹으로 추가된다.

---

## 캐릭터 추가 (쌍둥이 외 새 그룹, 2026-10-12~)

상단 메뉴는 `홈 · 캐릭터 · 앱 · 블로그` (앱 안에 모바일 앱·웹게임, 사업자 정보는 푸터). '캐릭터'(/characters/)는 `_data/characters.yml` 의 그룹을 카드로 보여 주고, 그룹 주소 아래 어느 페이지에서든 메뉴가 켜진다.

1. `_data/characters.yml` 에 그룹 한 항목: `id`, `status`(active | soon — soon 이면 링크 없이 '곧 공개' 카드), `url`(`/<id>/`, 기존 폴더 apps·games·twins·privacy·posts 와 겹치지 않게), `data`(멤버 데이터 파일 이름), `members`, `name_ko/en`, `tagline_ko/en`, `image`(그룹 대표 이미지, 16:10 으로 잘림), `color`, 선택 `formula`(프로필 아래 '공식' 띠)·`profile_eyebrow_ko/en`.
2. `_data/<data>.yml`: 멤버마다 `twins.yml` 과 같은 구조 (id, url, name/role/oneliner/intro, images.front·three_quarter·side·face, profile, quotes, stats) + `stat_labels`. 짝이 있으면 `other` (능력치 비교 눈금·짝 프로필 링크), 없으면 생략.
3. `/<id>/index.html`(그룹 소개, `twins/index.html` 참고) + 멤버 프로필 `/<id>/<member>.html`: front matter `layout: character`, `group: <id>`, `character: <member>`.
4. 이미지: `assets/images/<id>/` (WebP). 카드·말풍선은 그룹을 넘긴다 — `{% include twin-card.html group="<id>" id="<member>" %}`, `{% include bubble.html group="<id>" who="<member>" ... %}`. 말풍선 색은 `main.css` 의 `.chat-<member>` 를 추가 (없으면 기본 흰 말풍선).
5. 새 캐릭터가 공개 전이면 `status: soon` 으로 먼저 카드만 (티저).
6. 홈 히어로 무대: active 그룹은 자동으로 좌우 화살표 캐러셀에 들어간다. `_data/<data>.yml` 의 `episodes[].scene`(`{ who: <멤버>|narr, ko, en }`, 정적은 `{ pause: ms }`)이 히어로 아래 에피소드 바에서 재생된다. 무대 위 키·위치는 `main.css` 의 `.cast-<멤버>`, 이미지 가로 크기는 `index.html` 의 `case m`.

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
- Google Play 등록 URL 예시: `https://moonkimvision.com/privacy/my-app/`
- layout: `policy-bilingual` (한/영 토글, `title_ko`·`title_en`) 또는 `page`
- 정책 페이지 URL 은 스토어에 등록돼 있으므로 바꾸지 않는다.
- **정책 페이지는 링크로만 연다.** 사이트 어디에도(푸터·앱 카드·포스트·404) 링크하지 않고, `/privacy/` 목록 페이지도 두지 않는다. `_config.yml` defaults 가 `privacy/` 아래에 `noindex`(robots meta)·`sitemap: false` 를 건다.

### 앱 추가
- `_data/apps.yml` 에 항목 추가 (아이콘 `assets/images/apps/<id>-icon.png`, 스토어·소개 글 링크, 정책 주소(기록용, 화면엔 안 나옴), 쌍둥이 한마디)
- 소개 포스트에 `app: <id>` 를 넣으면 포스트 상단 색과 하단 앱 카드가 붙는다.

### 게임 추가
- 게임은 각자 비공개 저장소(예: `moonkimvision/yutnori`)에 두고, `main` push 시 GitHub Actions 가 이 저장소의 `games/<id>/` 로 복사·커밋한다 → `https://moonkimvision.com/games/<id>/`.
- 게임 저장소에 `.github/workflows/deploy.yml`(yutnori 저장소 것 복사, 경로만 바꿈)과 Secret `SITE_DEPLOY_KEY`(이 저장소 Deploy key 의 짝, 쓰기 허용)를 둔다. 배포 키는 저장소마다 따로 만든다.
- `_data/games.yml` 에 항목 추가 (썸네일 `assets/images/games/<id>.webp`, 쌍둥이 한마디). 목록은 `/apps/#web` 에 나온다.

### 블로그 포스트
- 경로: `_posts/YYYY-MM-DD-slug.md`
- permalink: `/posts/<slug>/`
- layout: `post` (기본값으로 설정됨), 목록 카드 요약은 front matter `description`
- 카드 제목은 ` — ` 앞부분만, 뒷부분은 부제로 나온다. 본문 강조 형광펜은 `<mark>` 또는 `**…**{:.hl}` 에만 (일반 `**굵게**` 는 굵기만).
- `app: <id>` 포스트는 상단(제목 아래) Play 버튼 + 하단 앱 카드(Play 주 버튼)가 자동으로 붙는다. Play 링크는 `_includes/play-link.html` 로만 (utm referrer·클릭 측정 포함).
- 클릭 측정(GoatCounter 이벤트, `data-goatcounter-click`): `play-<앱>-<hero|bottom|list|apps|home>`, `sns-<채널>-<post|list|footer|buttons>`, `postcard-<list|home|related>-<slug>`, `nav-prev|next`. 대시보드에서 이벤트 수 ÷ 페이지뷰로 본다.

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
