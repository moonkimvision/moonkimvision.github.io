# ruby-dev

Jekyll/Ruby 개발 환경 안내 및 자주 쓰는 명령어를 제공합니다.

## 사용법

```
/ruby-dev
```

## 실행 절차

아래 내용을 사용자에게 안내한다.

---

## 환경 설정 (최초 1회)

```bash
# Ruby 버전 확인 (2.7 이상 권장)
ruby -v

# Bundler 설치
gem install bundler

# 의존성 설치
bundle install
```

---

## 로컬 개발 서버

```bash
# LiveReload 포함 서버 실행 (권장)
bundle exec jekyll serve --livereload

# 초안 포스트 포함
bundle exec jekyll serve --livereload --drafts

# 포트 변경
bundle exec jekyll serve --livereload --port 4001
```

접속: http://localhost:4000

---

## 빌드

```bash
# 정적 파일 빌드 (_site/ 생성)
bundle exec jekyll build

# 프로덕션 환경으로 빌드
JEKYLL_ENV=production bundle exec jekyll build
```

---

## 의존성 관리

```bash
# Gemfile.lock 업데이트
bundle update

# 특정 gem만 업데이트
bundle update jekyll

# 설치된 gem 목록 확인
bundle list
```

---

## 자주 발생하는 문제

| 문제 | 원인 | 해결 |
|------|------|------|
| `bundle: command not found` | Bundler 미설치 | `gem install bundler` |
| `Could not find gem` | 의존성 누락 | `bundle install` |
| 포트 4000 이미 사용 중 | 이전 서버 프로세스 | `--port 4001` 옵션 사용 |
| 마크다운이 렌더링 안 됨 | `<div>` 안에 마크다운 작성 | `<div markdown="1">` 속성 추가 |
| 컬렉션 페이지 404 | Jekyll 컬렉션 빌드 문제 | 파일을 일반 디렉토리로 이동 |

---

## GitHub Pages 배포

`main` 브랜치 push 시 자동 빌드·배포 (별도 CI 불필요).

```bash
git add .
git commit -m "변경 내용"
git push origin main
```

빌드 상태: https://github.com/moonkimvision/moonkimvision.github.io/actions
