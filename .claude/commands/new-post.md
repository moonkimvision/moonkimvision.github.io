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
   - permalink 는 `_config.yml` 이 `/posts/<슬러그>/` 로 만든다. front matter 에 따로 쓰지 않는다.

4. 파일명: `_posts/YYYY-MM-DD-<슬러그>.md`

5. 특정 앱에 관한 글이면 `_data/apps.yml` 의 `id` 를 `app:` 에 넣는다.
   포스트 상단 띠가 앱 색으로 바뀌고, 하단에 앱 카드(스토어·정책 링크)가 붙는다.
   그 앱의 소개 글이면 `_data/apps.yml` 의 `post:` 도 이 글 URL 로 맞춘다.

6. 아래 템플릿으로 파일을 생성한다.

```markdown
---
title: "<제목>"
subtitle: "<한 줄 부제 (선택)>"
date: YYYY-MM-DD
app: <앱 id (선택)>
tags: []
description: "<목록 카드·검색 결과에 나오는 1~2문장 요약>"
---

<div class="chat">
{% include bubble.html who="sister" text="<누나 대사>" %}
{% include bubble.html who="brother" text="<동생 대사>" %}
</div>

(내용을 여기에 작성하세요)
```

7. 쌍둥이 대화 규칙 (설정: `_data/twins.yml`, 원본 `../marketing-studio/projects/twins/marketing/character/CHARACTER.md`)
   - 누나: 길게 떠들고 자기 말을 끊는다("아 잠깐", "있잖아"). 동생: 느리고 짧게, `…`로 시작해 정곡을 찌른다.
   - 훈계·비하 금지. 앱에 없는 기능을 말하게 하지 않는다 (출시 전 기능은 "준비 중"으로 따로 쓴다).
   - 말풍선 줄은 `<div class="chat">` 안에, 앞뒤 빈 줄 없이 한 줄씩. 대사 안에 큰따옴표(`"`)는 쓰지 않는다 (include 인자가 깨진다).

8. 생성 완료 후 다음을 출력한다.

```
✅ 생성 완료: _posts/YYYY-MM-DD-<슬러그>.md
🔗 배포 후 URL: https://moonkimvision.com/posts/<슬러그>/
```
