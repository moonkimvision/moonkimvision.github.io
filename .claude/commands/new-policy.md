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
   - `privacy` → `privacy/<슬러그>.md` / permalink: `/privacy/<슬러그>/`
   - `terms`   → `terms/<슬러그>.md`   / permalink: `/terms/<슬러그>/`
   - ⚠️ `_pages/`, `_policies/` 처럼 `_`로 시작하는 폴더에 두지 않는다. Jekyll 이 빌드하지 않아 **스토어에 등록한 URL 이 404** 가 된다.

3. 디렉토리가 없으면 생성한다.

4. 아래 템플릿으로 파일을 생성한다. 기존 정책(`privacy/cropscreenrecorder.md`)처럼 한국어/영어를 같은 페이지에 두고
   `<div class="lang-ko" markdown="1">` / `<div class="lang-en" markdown="1">` 로 나눈다 (헤더의 한국어/EN 토글이 전환한다).
   실제 권한·SDK(광고, Firebase 등)는 앱 소스의 `AndroidManifest.xml`·`pubspec.yaml` 을 읽어 채운다.

### privacy 템플릿

```markdown
---
layout: policy-bilingual
title_ko: "<앱명> 개인정보처리방침"
title_en: "<앱명> Privacy Policy"
title: "<앱명> Privacy Policy"
permalink: /privacy/<슬러그>/
date: YYYY-MM-DD
lang: ko
---

<div class="lang-ko" markdown="1">

moonkimvision("회사", "저희")은 <앱명> 앱(이하 "서비스")을 제공합니다.

---

### 1. 수집하는 정보

- (권한·수집 항목과 기기 내 처리 여부)

### 2. 제3자 서비스

- (Google Play 서비스, AdMob 등 실제 사용하는 SDK)

### 3. 문의

이메일: moonkimvision@gmail.com

</div>

<div class="lang-en" markdown="1">

moonkimvision ("we", "us") provides the <App name> app (the "Service").

---

### 1. Information Collection and Use

- (permissions and data, on-device processing)

### 2. Third-Party Services

- (SDKs actually used)

### 3. Contact

Email: moonkimvision@gmail.com

</div>
```

### terms 템플릿

```markdown
---
layout: policy-bilingual
title_ko: "<앱명> 이용약관"
title_en: "<앱명> Terms of Service"
title: "<앱명> Terms of Service"
permalink: /terms/<슬러그>/
date: YYYY-MM-DD
lang: ko
---

<div class="lang-ko" markdown="1">

### 제1조 (목적)

본 약관은 **<앱명>** 서비스 이용에 관한 조건 및 절차를 규정합니다.

### 제2조 (서비스 이용)

- (내용 작성)

### 제3조 (면책 조항)

(내용 작성)

### 제4조 (문의)

이메일: moonkimvision@gmail.com

</div>

<div class="lang-en" markdown="1">

### 1. Purpose

These terms govern the use of **<App name>**.

### 2. Contact

Email: moonkimvision@gmail.com

</div>
```

5. `privacy` 이고 `_data/apps.yml` 에 해당 앱이 있으면 그 항목의 `privacy:` 를 새 permalink 로 맞춘다.
   앱이 아직 없으면 [CLAUDE.md](../../CLAUDE.md) "앱 추가" 규칙대로 항목을 추가할지 사용자에게 묻는다
   (`/privacy/` 목록은 `_data/apps.yml` 에서 만들어진다).

6. 생성 완료 후 다음을 출력한다.

```
✅ 생성 완료: <종류>/<슬러그>.md
🔗 배포 후 URL: https://moonkimvision.com/<종류>/<슬러그>/
📋 Google Play 등록용 URL: https://moonkimvision.com/<종류>/<슬러그>/
```
