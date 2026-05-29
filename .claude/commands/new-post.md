# new-post

새 블로그 포스트를 생성합니다.

## 사용법

```
/new-post <제목>
```

- `<제목>`: 포스트 제목 (한글 가능)

## 실행 절차

1. `$ARGUMENTS`에서 제목을 읽는다.

2. 오늘 날짜를 `YYYY-MM-DD` 형식으로 구한다.

3. 제목을 URL 슬러그로 변환한다.
   - 한글 → 영문 의미 번역 또는 음역 (짧고 명확하게)
   - 공백 → `-`, 소문자
   - 예: "Jekyll 시작하기" → `getting-started-with-jekyll`

4. 파일명: `_posts/YYYY-MM-DD-<슬러그>.md`

5. 아래 템플릿으로 파일을 생성한다.

```markdown
---
layout: post
title: "<제목>"
date: YYYY-MM-DD
permalink: /posts/<슬러그>/
tags: []
---

(내용을 여기에 작성하세요)
```

6. 생성 완료 후 다음을 출력한다.

```
✅ 생성 완료: _posts/YYYY-MM-DD-<슬러그>.md
🔗 배포 후 URL: https://moonkimvision.github.io/posts/<슬러그>/
```
