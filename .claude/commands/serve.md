# serve

Jekyll 로컬 개발 서버를 실행합니다.

## 사용법

```
/serve
```

## 실행 절차

1. 프로젝트 루트에 `Gemfile`이 있는지 확인한다.
   - 없으면: Jekyll 초기 설정이 필요하다고 안내하고 종료.

2. `bundle exec jekyll serve --livereload` 를 실행한다.

3. 서버가 뜨면 다음을 안내한다.

```
🌐 로컬 서버: http://localhost:4000
🔄 LiveReload 활성화 — 파일 변경 시 자동 새로고침
⏹  종료: Ctrl+C
```
