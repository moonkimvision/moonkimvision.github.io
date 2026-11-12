---
layout: policy-bilingual
title_ko: "Block Lumen 개인정보처리방침"
title_en: "Block Lumen Privacy Policy"
title: "Block Lumen Privacy Policy"
permalink: /privacy/block-lumen/
date: 2026-11-10
lang: ko
---

<div class="lang-ko" markdown="1">

moonkimvision("회사", "저희")은 블록 퍼즐 게임 Block Lumen(이하 "서비스")을 제공합니다. 기본 기능은 무료이며, 앱 안에서 '광고 제거'를 한 번 구매할 수 있습니다.

본 페이지는 서비스 이용 시 개인정보의 수집·이용·공개에 관한 정책을 안내합니다.  
서비스를 이용함으로써 본 정책에 동의하는 것으로 간주됩니다.

---

### 1. 수집하는 정보

**서비스에는 회원가입이 없고, 이름을 입력하는 칸도 없습니다.** 게임 진행은 기기 안에만 저장됩니다. 기기 밖으로 나가는 정보는 시즌 랭킹 기록(2항), 사용자가 직접 보내는 의견(이 항의 "의견 보내기"), 광고와 이용 통계를 위해 Google이 처리하는 정보(5항)입니다. '광고 제거' 구매는 Google Play 결제 시스템이 처리합니다(5항).

**기기 안에만 저장되는 정보**  
아래 정보는 **기기 내부 저장소에만 저장**되며, 서비스 기능을 제공하는 데만 쓰입니다.

- 점수와 최고 기록, 진행 중인 판, 레벨 진행 상황, 오늘의 도전 기록
- 게임 안에서 모은 별가루, 아이템, 테마, 임무·과제·출석 기록
- 소리·진동 설정
- '광고 제거' 구매 여부 (배너·전면 광고를 보일지 정하는 데만 씁니다)
- 자동으로 만들어진 닉네임 번호 (랭킹에 참여하면 2항과 같이 서버에도 저장됩니다)

**인터넷 (INTERNET, ACCESS_NETWORK_STATE), 광고 ID (AD_ID)**  
시즌 랭킹(2항), 광고와 이용 통계(5항), '광고 제거' 구매와 구매 내역 확인(5항), 사용자가 직접 보내는 의견에 사용합니다. Google SDK가 광고와 이용 통계를 처리하기 위해 함께 선언하는 권한(ACCESS_ADSERVICES_AD_ID·ATTRIBUTION·TOPICS, WAKE_LOCK, FOREGROUND_SERVICE, 설치 경로 확인, Google 서비스 설정 읽기)도 포함되어 있습니다.

**위치·연락처·사진·카메라·마이크 권한은 사용하지 않으며, 이 정보들을 수집하지 않습니다.** 알림도 보내지 않습니다.

**의견 보내기**  
설정의 "의견 보내기"에서 사용자가 보내기를 누를 때만 쓴 내용, 고른 종류, 선택해서 적은 이메일 주소, 앱 버전, 기기 모델, OS 버전, 언어 설정이 Google Firebase(Firestore) 서버로 전송되어 문의 확인과 답변, 앱 개선에만 쓰입니다. 기기나 사람을 알아볼 수 있는 식별자는 보내지 않습니다. 앱 개선 일감으로 삼을지 검토할 때는 쓴 내용이 AI 도구(Anthropic Claude)로 전달될 수 있습니다. 이때 이메일 주소와 전화번호는 가리고 보냅니다. 처리한 뒤 1년 안에 지웁니다. 메일로 보내기를 고르면 앱 버전과 기기 정보가 미리 적힌 메일이 사용자의 메일 앱에서 열리고, 사용자가 직접 보냅니다.

**점수 공유**  
점수를 공유하면 점수와 등급이 담긴 글이 사용자가 고른 앱(메신저 등)으로 전달됩니다. 이 글은 저희 서버로 오지 않습니다.

---

### 2. 시즌 랭킹

서비스에는 2주마다 새로 시작하는 시즌 순위표가 있습니다. 이번 시즌 점수가 생기면 기록이 **자동으로** 순위표에 올라가며, 시즌 화면을 열 때도 순위표를 불러옵니다. 랭킹 참여를 끄는 설정은 없습니다.

**익명 인증 (Firebase Authentication)**  
순위표에 기록을 올리거나 불러올 때 이메일이나 이름 없이 익명 계정이 자동으로 만들어지고, 무작위 익명 식별자(uid)가 부여됩니다. 안전한 운영을 위해 Firebase가 이 과정에서 IP 주소 등을 처리할 수 있습니다.

**서버(Google Cloud Firestore)에 저장되는 정보**

- 익명 식별자(uid)
- 닉네임 번호 (자동으로 만들어진 형용사·명사·숫자 번호. 예: "반짝이는 고래 #0123")
- 시즌 점수
- 기록 시각

**닉네임은 정해진 단어 목록에서 자동으로 만들어지며, 사용자가 이름을 자유롭게 입력할 수 없습니다.** 시즌 화면에서 다른 단어 조합으로 바꿀 수만 있습니다.

**다른 이용자에게 보이는 정보**  
같은 시즌의 상위 100위 순위표에 닉네임, 점수, 순위가 표시됩니다. 게임 진행 내용과 그 밖의 정보는 순위표에 나오지 않습니다.

---

### 3. 보관 기간과 삭제

- **게임 진행**: 앱을 삭제하면 기기에 저장된 데이터도 함께 삭제됩니다.
- **랭킹 기록**: 앱 안에는 계정이나 랭킹 기록을 삭제하는 기능이 없습니다. 앱을 삭제하거나 시즌이 끝나도 서버의 랭킹 기록은 자동으로 지워지지 않고, 삭제를 요청할 때까지 보관됩니다.
- **삭제 요청 방법**: 앱이 없어도 아래 9항의 이메일로 랭킹 기록과 데이터 삭제를 요청할 수 있습니다. 시즌 화면에 보이는 닉네임(예: "반짝이는 고래 #0123")과 기록이 있는 시즌이나 대략적인 시기, 점수를 함께 보내 주시면 확인 후 익명 계정과 해당 랭킹 기록을 삭제합니다.
- **의견 보내기**로 보낸 내용은 처리한 뒤 1년 안에 지우며, 그 전에 삭제를 원하시면 9항의 이메일로 요청할 수 있습니다.

---

### 4. 백업

**Android 자동 백업**  
기기에서 Google 백업이 켜져 있으면 Android 운영체제가 앱 데이터(게임 진행 포함)를 사용자의 Google 계정에 백업합니다. 이 백업은 Google이 관리하며 저희는 접근할 수 없습니다. 기기 설정에서 백업을 끌 수 있습니다.

---

### 5. 제3자 서비스와 제공

시즌 랭킹은 Google의 Firebase Authentication과 Cloud Firestore를, 의견 보내기는 Cloud Firestore를 사용합니다. 전송되는 데이터는 암호화(HTTPS)되며, Google의 데이터 처리 방식은 [Google 개인정보처리방침](https://policies.google.com/privacy)과 [Firebase 개인정보 보호](https://firebase.google.com/support/privacy)를 참고하십시오.

**광고 (Google AdMob)**  
서비스는 처음 화면과 시즌 화면 아래쪽의 배너 광고, 판과 판 사이의 전면 광고, 사용자가 골라서 보는 보상형 광고를 위해 Google AdMob을 사용합니다. Google은 광고 게재·성과 측정·부정 행위 방지를 위해 다음 정보를 수집·처리할 수 있습니다.

- 광고 ID 등 기기 식별자
- IP 주소와 이를 통한 대략적인 위치
- 기기·앱 정보, 광고 노출·클릭 기록, 앱 실행 시간 등 진단 정보

**닉네임과 시즌 점수, 게임 진행 내용, 의견 보내기로 보낸 내용은 광고 요청에 사용되지 않으며 Google AdMob에 전달되지 않습니다.**

동의가 필요한 지역(유럽경제지역·영국·스위스 등)의 사용자에게는 처음 실행할 때 Google UMP 광고 개인정보 동의 화면이 표시되어 맞춤 광고 여부를 선택할 수 있습니다. 이 지역의 사용자는 설정의 "광고 개인정보 설정"에서 언제든지 선택을 바꿀 수 있습니다. 기기 설정에서 광고 ID를 재설정하거나 맞춤 광고를 끌 수도 있습니다. 자세한 내용은 [Google 파트너 사이트·앱 데이터 사용 방식](https://policies.google.com/technologies/partner-sites)을 참고하십시오.

**결제 (Google Play 결제)**  
일회성 인앱 구매 '광고 제거'는 Google Play 결제 시스템으로 처리됩니다. 카드 번호 등 결제 수단 정보는 Google이 처리하며 저희는 받지 않습니다. 앱은 구매 여부(광고 제거 적용 여부)만 기기 안에 저장해 배너 광고와 판 사이 전면 광고를 보일지 정합니다. 보상형 광고는 사용자가 골라서 보는 것이라 구매 뒤에도 남아 있습니다. 앱을 켤 때 Google Play 구매 내역과 맞춰 보며, 환불된 구매는 광고 제거를 풀고 다시 광고를 보여 줍니다. 앱을 다시 설치해도 구매 복원으로 광고 제거가 돌아옵니다. 구매 정보는 저희 서버로 보내지 않고 이용 통계에도 넣지 않습니다. Google의 처리 방식은 [Google 개인정보처리방침](https://policies.google.com/privacy)을 참고하십시오.

**이용 통계 (Google Firebase Analytics)**  
앱이 어떻게 쓰이는지 파악하고 개선하기 위해 Google Firebase Analytics를 사용합니다. 다음 정보가 Google로 전송됩니다.

- 앱 인스턴스 ID, 광고 ID 등 기기 식별자
- 앱 실행, 사용 시간 같은 앱 사용 기록과 주요 기능을 사용했다는 사실(예: 판 끝내기, 레벨 깨기, 오늘의 도전 성공, 아이템 사용, 보상형 광고 시청, 점수 공유). 기능 이름만 보냅니다.
- 기기 모델, 운영체제 버전, 언어, 앱 버전, IP 주소로 추정한 국가·지역

**닉네임과 점수, 의견 보내기로 보낸 내용은 이용 통계에 들어가지 않으며 Google Analytics에 전달되지 않습니다.** 수집한 통계는 서비스 개선에만 쓰며 개인을 식별하는 데 쓰지 않습니다. Google의 처리 방식은 [Firebase 개인정보 보호 안내](https://firebase.google.com/support/privacy)를 참고하십시오.

저희는 사용자의 정보를 판매하지 않으며, 위의 광고·결제(Google Play)·이용 통계를 제외하면 제3자에게 제공하지 않습니다. 광고와 이용 통계 외의 분석·추적 도구는 사용하지 않습니다. 다만 의견 보내기로 보낸 내용은 1항에서 설명한 대로 Google Firebase에 저장되고 AI 도구(Anthropic Claude)로 전달될 수 있습니다.

---

### 6. 이용자의 권리 (GDPR · CCPA)

- 게임 진행은 앱을 삭제하면 기기에서 함께 삭제됩니다.
- 서버에 저장된 랭킹 기록과 의견의 열람·정정·삭제는 3항의 방법으로 9항의 이메일에 요청할 수 있습니다.
- Google 계정에 저장된 백업은 Google 계정 설정에서 삭제할 수 있습니다.
- 광고 관련 데이터는 5항의 방법으로 동의를 바꾸거나 광고 ID를 재설정해 관리할 수 있습니다.
- 구매 내역과 환불은 Google Play 계정의 주문 내역에서 확인하고 요청할 수 있습니다.

**저희는 개인정보를 판매하지 않습니다.**

---

### 7. 아동 개인정보 보호

본 서비스는 만 13세 미만 아동을 대상으로 하지 않습니다. 궁금한 점이 있는 보호자는 아래 이메일로 연락해 주십시오.

---

### 8. 개인정보처리방침 변경

본 방침은 수시로 업데이트될 수 있습니다. 변경 사항은 이 페이지에 게시합니다.

---

### 9. 문의

개인정보처리방침과 랭킹 기록·데이터 삭제에 관한 문의 사항은 아래로 연락해 주십시오.

**moonkimvision@gmail.com**

</div>

<div class="lang-en" markdown="1">

moonkimvision ("we," "us," or "our") provides Block Lumen, a block puzzle game (the "Service"). The basic features are free, and a one-time "Remove Ads" purchase is available in the app.

This page explains our policies on the collection, use, and disclosure of personal information when you use the Service.  
By using the Service, you agree to this policy.

---

### 1. Information Collection and Use

**The Service has no sign-up and no field for entering your name.** Your game progress is stored only on your device. The only information that leaves your device is your season ranking record (Section 2), feedback you choose to send ("Send Feedback" in this section), and the information Google processes for advertising and usage statistics (Section 5). The one-time "Remove Ads" purchase is processed by Google Play's billing system (Section 5).

**Stored only on your device**  
The following information is **stored only on your device** and is used only to provide the Service's features:

- Scores and best records, the game in progress, level progress, and daily challenge records
- Stardust, items, and themes earned in the game, and quest, achievement, and check-in records
- Sound and vibration settings
- Whether you have purchased Remove Ads (used only to decide whether to show banner and full-screen ads)
- Your automatically generated nickname numbers (also stored on the server when you join the ranking, as described in Section 2)

**Internet (INTERNET, ACCESS_NETWORK_STATE), advertising ID (AD_ID)**  
Used for the season ranking (Section 2), advertising and usage statistics (Section 5), the Remove Ads purchase and checking your purchase history (Section 5), and feedback you choose to send. The app also includes permissions that Google's SDKs declare to process advertising and usage statistics (ACCESS_ADSERVICES_AD_ID, ATTRIBUTION, and TOPICS; WAKE_LOCK; FOREGROUND_SERVICE; install referrer; and reading Google services settings).

**The Service does not use location, contacts, photos, camera, or microphone permissions and does not collect that information.** It does not send notifications.

**Send Feedback**  
Only when you tap send under "의견 보내기" (Send Feedback) in Settings, what you write, the type you choose, the email address you choose to enter, the app version, device model, OS version, and language setting are sent to Google Firebase (Firestore) servers and are used only to review and respond to your inquiry and to improve the app. We do not send any identifier that could recognize your device or you. When we review whether to make your feedback an app improvement task, what you write may be sent to an AI tool (Anthropic Claude). Email addresses and phone numbers are masked before it is sent. We delete this information within one year after handling it. If you choose to send it by email, your email app opens a message pre-filled with the app version and device information, and you send it yourself.

**Sharing your score**  
When you share your score, a message with your score and tier is handed to the app you pick (such as a messenger). This message does not come to our servers.

---

### 2. Season Ranking

The Service has a season leaderboard that restarts every two weeks. Once you have a score for the current season, your record is posted to the leaderboard **automatically**, and the leaderboard is also loaded when you open the season screen. There is no setting to turn off taking part in the ranking.

**Anonymous sign-in (Firebase Authentication)**  
When your record is posted or the leaderboard is loaded, an anonymous account is created automatically, without an email or name, and is given a random anonymous identifier (uid). Firebase may process your IP address and similar information during this process to keep the service secure.

**Stored on the server (Google Cloud Firestore)**

- Anonymous identifier (uid)
- Nickname numbers (automatically generated numbers for an adjective, a noun, and a number; for example, "반짝이는 고래 #0123")
- Season score
- Time of the record

**Nicknames are generated automatically from a fixed word list, and you cannot type your own name.** You can only switch to another word combination on the season screen.

**Visible to other users**  
The top 100 leaderboard for a season shows nicknames, scores, and ranks. Your game progress and other information do not appear on the leaderboard.

---

### 3. Retention and Deletion

- **Game progress**: Uninstalling the app also deletes the data stored on your device.
- **Ranking records**: The app has no feature for deleting an account or a ranking record. Ranking records on the server are not deleted automatically when you uninstall the app or when a season ends, and they are kept until you request deletion.
- **How to request deletion**: You can request deletion of your ranking records and data by emailing the address in Section 9, even without the app installed. Include the nickname shown on the season screen (for example, "반짝이는 고래 #0123") and the season or approximate time and score of your record, and we will delete your anonymous account and that ranking record after verification.
- **Feedback** you send is deleted within one year after handling. To have it deleted sooner, email the address in Section 9.

---

### 4. Backups

**Android Auto Backup**  
If Google backup is enabled on your device, Android backs up the app's data (including game progress) to your Google account. Google manages this backup and we cannot access it. You can turn backup off in your device settings.

---

### 5. Third-Party Services and Sharing

The season ranking uses Google's Firebase Authentication and Cloud Firestore, and feedback uses Cloud Firestore. Data in transit is encrypted (HTTPS). For how Google handles this data, see the [Google Privacy Policy](https://policies.google.com/privacy) and [Privacy and Security in Firebase](https://firebase.google.com/support/privacy).

**Advertising (Google AdMob)**  
The Service uses Google AdMob for banner ads at the bottom of the home and season screens, full-screen ads between games, and rewarded ads that you choose to watch. Google may collect and process the following to serve and measure ads and to prevent fraud:

- Device identifiers such as the advertising ID
- IP address and approximate location derived from it
- Device and app information, ad impressions and clicks, and diagnostics such as app launch time

**Your nickname, season score, game progress, and feedback are never used in ad requests and are never sent to Google AdMob.**

Users in regions where consent is required (such as the European Economic Area, the UK, and Switzerland) are shown a Google UMP ad privacy consent message on first launch and can choose whether to receive personalized ads. These users can change their choice at any time under "광고 개인정보 설정" (Ad privacy settings) in Settings. You can also reset your advertising ID or opt out of personalized ads in your device settings. See [How Google uses information from sites or apps that use our services](https://policies.google.com/technologies/partner-sites) for details.

**Purchases (Google Play Billing)**  
The one-time in-app purchase "Remove Ads" is processed through Google Play's billing system. Payment information such as your card number is handled by Google and we do not receive it. The app stores only whether you have made the purchase (whether Remove Ads is applied) on your device, and uses it to decide whether to show banner ads and full-screen ads between games. Rewarded ads, which you choose to watch, remain available after the purchase. Each time the app starts, it checks your Google Play purchase history; if the purchase has been refunded, Remove Ads is turned off and ads are shown again. If you reinstall the app, Remove Ads comes back when your purchase is restored. Purchase information is not sent to our servers and is not included in usage statistics. For how Google handles this data, see the [Google Privacy Policy](https://policies.google.com/privacy).

**Usage Statistics (Google Firebase Analytics)**  
We use Google Firebase Analytics to understand how the app is used and to improve it. The following is sent to Google:

- Device identifiers such as the app instance ID and the advertising ID
- App usage such as app opens and time spent, and the fact that a main feature was used (for example, finishing a game, clearing a level, completing the daily challenge, using an item, watching a rewarded ad, or sharing a score). Only the feature name is sent.
- Device model, operating system version, language, app version, and country or region estimated from the IP address

**Your nickname, scores, and feedback are never included in usage statistics and are never sent to Google Analytics.** We use these statistics only to improve the Service and not to identify you. For how Google handles this data, see [Privacy and Security in Firebase](https://firebase.google.com/support/privacy).

We do not sell your information, and apart from the advertising, purchases (Google Play), and usage statistics above, we do not share it with third parties. We use no analytics or tracking tools other than advertising and usage statistics. However, feedback you send is stored on Google Firebase and may be passed to an AI tool (Anthropic Claude), as described in Section 1.

---

### 6. Your Rights (GDPR · CCPA)

- Uninstalling the app also deletes the game progress stored on your device.
- You can access, correct, or delete ranking records and feedback stored on the server by emailing the address in Section 9, as described in Section 3.
- Backups stored in your Google account can be deleted in your Google account settings.
- Advertising-related data can be managed by changing your consent or resetting your advertising ID as described in Section 5.
- You can view your purchase history and request refunds from your Google Play account's order history.

**We do not sell personal information.**

---

### 7. Children's Privacy

The Service is not directed at children under 13. Parents or guardians with questions may contact us at the email below.

---

### 8. Changes to This Privacy Policy

We may update this policy from time to time. Any changes will be posted on this page.

---

### 9. Contact Us

If you have any questions about this Privacy Policy or want to request deletion of your ranking records or data, please contact us at:

**moonkimvision@gmail.com**

</div>
