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
├── _posts/              # 블로그 포스트 (YYYY-MM-DD-slug.md)
├── _pages/              # 고정 페이지 (정책 문서 등)
│   └── privacy/         # 앱별 개인정보처리방침
├── _layouts/            # HTML 레이아웃 템플릿
├── _includes/           # 재사용 HTML 조각
├── assets/
│   ├── css/
│   └── images/
├── BACKLOG.md
└── ralph-core/          # ralph 자동화 엔진 (submodule)
```

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
- 경로: `_pages/privacy/<앱-슬러그>.md`
- permalink: `/privacy/<앱-슬러그>/`
- Google Play 등록 URL 예시: `https://moonkimvision.github.io/privacy/my-app/`
- layout: `page`

### 블로그 포스트
- 경로: `_posts/YYYY-MM-DD-slug.md`
- permalink: `/posts/<slug>/`
- layout: `post`

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
