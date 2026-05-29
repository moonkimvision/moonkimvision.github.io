# new-policy

앱의 정책 페이지(개인정보처리방침, 이용약관 등)를 생성합니다.

## 사용법

```
/new-policy <앱-슬러그> [정책-종류]
```

- `<앱-슬러그>`: URL에 사용할 영문 소문자 슬러그 (예: `my-app`, `todo-list`)
- `[정책-종류]`: `privacy`(기본값) 또는 `terms`

## 실행 절차

1. `$ARGUMENTS`에서 슬러그와 정책 종류를 파싱한다.
   - 첫 번째 토큰 = 앱 슬러그
   - 두 번째 토큰 = 정책 종류 (없으면 `privacy`)

2. 정책 종류에 따라 파일 경로와 permalink를 결정한다.
   - `privacy` → `_pages/privacy/<슬러그>.md` / permalink: `/privacy/<슬러그>/`
   - `terms`   → `_pages/terms/<슬러그>.md`   / permalink: `/terms/<슬러그>/`

3. 디렉토리가 없으면 생성한다.

4. 아래 템플릿으로 파일을 생성한다.

### privacy 템플릿

```markdown
---
layout: page
title: "<앱명> 개인정보처리방침"
permalink: /privacy/<슬러그>/
lang: ko
date: YYYY-MM-DD
---

# 개인정보처리방침

**시행일**: YYYY년 MM월 DD일

**<앱명>**(이하 "앱")은 사용자의 개인정보를 중요하게 생각하며, 관련 법령을 준수합니다.

## 1. 수집하는 개인정보

본 앱은 다음 정보를 수집할 수 있습니다.

- (수집 항목 작성)

## 2. 수집 목적

수집된 정보는 다음 목적에만 사용됩니다.

- (목적 작성)

## 3. 보유 및 이용 기간

개인정보는 서비스 이용 기간 동안 보유하며, 탈퇴 또는 목적 달성 즉시 파기합니다.

## 4. 제3자 제공

수집된 정보는 원칙적으로 제3자에게 제공하지 않습니다.

## 5. 문의

개인정보 관련 문의사항은 아래로 연락주세요.  
이메일: moonkimvision@gmail.com
```

### terms 템플릿

```markdown
---
layout: page
title: "<앱명> 이용약관"
permalink: /terms/<슬러그>/
lang: ko
date: YYYY-MM-DD
---

# 이용약관

**시행일**: YYYY년 MM월 DD일

## 제1조 (목적)

본 약관은 **<앱명>** 서비스 이용에 관한 조건 및 절차를 규정합니다.

## 제2조 (서비스 이용)

- (내용 작성)

## 제3조 (금지 행위)

사용자는 다음 행위를 해서는 안 됩니다.

- (내용 작성)

## 제4조 (면책 조항)

(내용 작성)

## 제5조 (문의)

이메일: moonkimvision@gmail.com
```

5. 생성 완료 후 다음을 출력한다.

```
✅ 생성 완료: _pages/<종류>/<슬러그>.md
🔗 배포 후 URL: https://moonkimvision.github.io/<종류>/<슬러그>/
📋 Google Play 등록용 URL: https://moonkimvision.github.io/<종류>/<슬러그>/
```
