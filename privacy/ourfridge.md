---
layout: policy-bilingual
title_ko: "우리집 냉장고 개인정보처리방침"
title_en: "Our Fridge Privacy Policy"
title: "Our Fridge Privacy Policy"
permalink: /privacy/ourfridge/
date: 2026-11-07
lang: ko
---

<div class="lang-ko" markdown="1">

moonkimvision("회사", "저희")은 냉장고 관리 앱 우리집 냉장고(이하 "서비스")를 무료로 제공합니다.

본 페이지는 서비스 이용 시 개인정보의 수집·이용·공개에 관한 정책을 안내합니다.  
서비스를 이용함으로써 본 정책에 동의하는 것으로 간주됩니다.

---

### 1. 수집하는 정보

**혼자 쓰는 경우 모든 기록은 기기 안에만 저장되며, 회원가입·로그인이 필요 없습니다.** 기록을 서버로 보내는 것은 사용자가 직접 "냉장고 함께 쓰기"를 켰을 때뿐입니다 (2항). 화면 하단 광고와 이용 통계를 위해 Google AdMob·Firebase Analytics가 기기 정보를 처리합니다 (5항).

**기기 안에만 저장되는 정보**  
아래 정보는 **기기 내부 저장소에만 저장**되며, 서비스 기능을 제공하는 데만 쓰입니다.

- 식품·생활용품 기록 (이름, 분류, 보관 위치, 수량, 넣은 날짜, 유통기한, 메모, 사용·폐기 기록)
- 사진 (사용자가 촬영하거나 고른 식품·레시피 사진)
- 장보기 목록, 식단 계획, 레시피
- 설정 (정렬 방식, 보관 위치 순서 등)

**사진**  
사진은 기기의 카메라 앱이나 Android 사진 선택 도구를 통해 사용자가 고른 것만 받습니다. 카메라·저장소 권한은 요청하지 않으며, **사진은 서버로 올리지 않습니다.**

**인터넷 (INTERNET, ACCESS_NETWORK_STATE), 광고 ID (AD_ID)**  
"냉장고 함께 쓰기"의 로그인·동기화, 화면 하단 광고와 이용 통계(5항), 사용자가 직접 보내는 의견에 사용합니다.

위치·연락처·마이크 권한은 사용하지 않으며, 알림을 보내지 않습니다.

**의견 보내기**  
앱 안에서 의견을 보내면 쓴 내용, 선택해서 적은 이메일 주소, 앱 버전, 기기 모델, OS 버전, 언어 설정이 Google Firebase(Firestore) 서버로 전송되어 문의 확인과 답변, 앱 개선에만 쓰입니다. 기기나 사람을 알아볼 수 있는 식별자는 보내지 않습니다. 앱 개선 일감으로 삼을지 검토할 때는 쓴 내용이 AI 도구(Anthropic Claude)로 전달될 수 있습니다. 이때 이메일 주소와 전화번호는 가리고 보냅니다. 처리한 뒤 1년 안에 지웁니다.

---

### 2. 냉장고 함께 쓰기 (선택 기능)

가족 등 최대 5명이 냉장고 하나를 함께 관리하는 선택 기능입니다. 사용자가 이 기능을 켤 때만 아래 정보가 처리됩니다.

**Google 로그인 (Firebase Authentication)**  
함께 쓰기를 시작하거나 참여하려면 Google 계정으로 로그인합니다. Google로부터 계정 식별자(UID), 이름, 이메일, 프로필 사진 주소를 받으며, **이 중 이름만** 누가 무엇을 바꿨는지 보여 주는 데 사용합니다 (이름이 없으면 이메일의 @ 앞부분). 이메일과 프로필 사진 주소는 저희 서버(Firestore)에 저장하지 않습니다. 로그인 계정 정보 자체는 Firebase Authentication이 보관합니다.

**서버(Google Cloud Firestore)에 저장되는 정보**

- 공유 냉장고 정보: 만든 사람과 구성원의 계정 식별자(UID), 구성원 이름
- 식품 기록: 이름, 분류, 보관 위치, 수량·단위, 넣은 날짜, 유통기한, 메모, 상태, 마지막으로 바꾼 사람의 UID·이름
- 사용 기록: 추가·사용·폐기·이동 내역, 날짜, 수량 변화, 한 사람의 UID·이름
- 초대 코드: 6자리 코드, 공유 냉장고 ID, 만든 사람의 UID, 만료 시각 (만든 뒤 48시간 동안만 참여에 쓸 수 있음)

함께 쓰기를 시작하거나 참여하면 **그 기기에 있던 식품·사용 기록이 공유 냉장고로 올라갑니다** (참여 전 확인을 받습니다). 사진, 장보기 목록, 식단 계획, 레시피, 설정은 올라가지 않습니다.

**다른 구성원과의 공유**  
같은 공유 냉장고의 구성원은 서로의 이름과 공유 냉장고의 식품·사용 기록(메모 포함)을 보고 고칠 수 있습니다. 초대 코드는 사용자가 고른 앱(메신저 등)으로 직접 전달되며, 코드를 아는 사람만 48시간 안에 참여할 수 있습니다.

---

### 3. 보관 기간과 삭제

- **계정 삭제**: 함께 쓰기 화면의 "계정 삭제"에서 언제든지 삭제할 수 있습니다. 삭제하면 Firebase 로그인 계정과 사용자 정보가 지워집니다. 사용자가 만든 공유 냉장고는 닫히며, 서버의 식품·사용 기록이 모두 삭제됩니다. 다른 사람의 공유 냉장고에 참여 중이었다면 구성원에서 빠집니다. 기기 안의 기록은 그대로 남습니다.
- **나가기·함께 쓰기 그만하기**: 구성원은 언제든지 나갈 수 있고, 만든 사람은 함께 쓰기를 그만두어 서버의 공유 냉장고 데이터를 삭제할 수 있습니다. 각 기기에는 기록이 그대로 남습니다.
- 구성원이 나가거나 계정을 삭제해도, 그 사람이 공유 냉장고에 올린 식품·사용 기록(이름 포함)은 다른 구성원을 위해 공유 냉장고가 닫힐 때까지 남습니다.
- 함께 쓰기의 서버 정보는 공유 냉장고가 닫히거나 계정이 삭제될 때까지 보관됩니다. 의견 보내기로 보낸 내용은 처리한 뒤 1년 안에 지웁니다.
- 앱을 설치하지 않고도 계정과 데이터 삭제를 요청할 수 있습니다. 아래 이메일로 로그인에 쓴 Google 계정 이메일을 보내 주시면 확인 후 삭제합니다.

---

### 4. 백업

**Android 자동 백업**  
기기에서 Google 백업이 켜져 있으면 Android 운영체제가 앱 데이터(기록·사진 포함)를 사용자의 Google 계정에 백업합니다. 이 백업은 Google이 관리하며 저희는 접근할 수 없습니다. 기기 설정에서 백업을 끌 수 있습니다.

---

### 5. 제3자 서비스와 제공

함께 쓰기 기능은 Google의 Firebase Authentication과 Cloud Firestore를, 의견 보내기는 Cloud Firestore를 사용합니다. 전송되는 데이터는 암호화(HTTPS)되며, Google의 데이터 처리 방식은 [Google 개인정보처리방침](https://policies.google.com/privacy)과 [Firebase 개인정보 보호](https://firebase.google.com/support/privacy)를 참고하십시오.

**광고 (Google AdMob)**  
서비스는 하단 탭이 있는 화면 아래쪽 배너 광고를 위해 Google AdMob을 사용합니다. Google은 광고 게재·성과 측정·부정 행위 방지를 위해 다음 정보를 수집·처리할 수 있습니다.

- 광고 ID 등 기기 식별자
- IP 주소와 이를 통한 대략적인 위치
- 기기·앱 정보, 광고 노출·클릭 기록, 비정상 종료 등 진단 정보

**식품·장보기·식단·레시피 기록과 사진, 함께 쓰기 정보는 광고 요청에 사용되지 않으며 Google AdMob에 전달되지 않습니다.**

유럽경제지역(EEA)·영국·스위스 사용자에게는 처음 실행할 때 광고 개인정보 동의 화면이 표시되며, 설정의 "광고 개인정보 옵션"에서 언제든지 선택을 바꿀 수 있습니다. 기기 설정에서 광고 ID를 재설정하거나 맞춤 광고를 끌 수도 있습니다. 자세한 내용은 [Google 파트너 사이트·앱 데이터 사용 방식](https://policies.google.com/technologies/partner-sites)을 참고하십시오.

**이용 통계 (Google Firebase Analytics)**  
앱이 어떻게 쓰이는지 파악하고 개선하기 위해 Google Firebase Analytics를 사용합니다. 다음 정보가 Google로 전송됩니다.

- 앱 인스턴스 ID, 광고 ID 등 기기 식별자
- 앱 실행, 화면 이동, 사용 시간 같은 앱 사용 기록과 주요 기능을 사용했다는 사실(예: 식품 추가, 식품 사용·폐기). 기능 이름만 보내고 내용은 보내지 않습니다.
- 기기 모델, 운영체제 버전, 언어, 앱 버전, IP 주소로 추정한 국가·지역

**식품 이름·메모 등 식품·장보기·식단·레시피 기록과 사진, 함께 쓰기 정보은 이용 통계에 들어가지 않으며 Google에 전달되지 않습니다.** 수집한 통계는 서비스 개선에만 쓰며 개인을 식별하는 데 쓰지 않습니다. Google의 처리 방식은 [Firebase 개인정보 보호 안내](https://firebase.google.com/support/privacy)를 참고하십시오.

저희는 사용자의 정보를 판매하지 않으며, 위의 광고와 이용 통계를 제외하면 제3자에게 제공하지 않습니다. 광고와 이용 통계 외의 분석·추적 도구는 사용하지 않습니다. 다만 의견 보내기로 보낸 내용은 1항에서 설명한 대로 Google Firebase에 저장되고 AI 도구(Anthropic Claude)로 전달될 수 있습니다.

---

### 6. 이용자의 권리 (GDPR · CCPA)

- 모든 기록은 앱 안에서 언제든지 고치거나 삭제할 수 있으며, 앱을 삭제하면 기기에 저장된 데이터도 함께 삭제됩니다.
- 서버에 저장된 정보의 열람·정정·삭제는 3항의 방법이나 아래 이메일로 요청할 수 있습니다.
- Google 계정에 저장된 백업은 Google 계정 설정에서 삭제할 수 있습니다.
- 광고 관련 데이터는 5항의 방법으로 동의를 바꾸거나 광고 ID를 재설정해 관리할 수 있습니다.

**저희는 개인정보를 판매하지 않습니다.**

---

### 7. 아동 개인정보 보호

본 서비스는 만 13세 미만 아동을 대상으로 하지 않습니다. 궁금한 점이 있는 보호자는 아래 이메일로 연락해 주십시오.

---

### 8. 개인정보처리방침 변경

본 방침은 수시로 업데이트될 수 있습니다. 변경 사항은 이 페이지에 게시합니다.

---

### 9. 문의

개인정보처리방침과 계정·데이터 삭제에 관한 문의 사항은 아래로 연락해 주십시오.

**moonkimvision@gmail.com**

</div>

<div class="lang-en" markdown="1">

moonkimvision ("we," "us," or "our") provides Our Fridge, a fridge and pantry management app (the "Service"), free of charge.

This page explains our policies on the collection, use, and disclosure of personal information when you use the Service.  
By using the Service, you agree to this policy.

---

### 1. Information Collection and Use

**If you use the Service on your own, all your records stay on your device and no sign-up or login is needed.** Your records are sent to a server only when you turn on "Share your fridge" (Section 2). Google AdMob and Firebase Analytics process device information for the banner ad at the bottom of the screen and for usage statistics (Section 5).

**Stored only on your device**  
The following information is **stored only on your device** and is used only to provide the Service's features:

- Food and household item records (name, category, storage location, quantity, date added, expiry date, notes, use and discard history)
- Photos you take or choose of items and recipes
- Shopping list, meal plans, recipes
- Settings (sort order, storage location order, etc.)

**Photos**  
Photos come only from your device's camera app or the Android photo picker, as chosen by you. The Service does not request camera or storage permissions, and **photos are never uploaded to a server.**

**Internet (INTERNET, ACCESS_NETWORK_STATE), advertising ID (AD_ID)**  
Used for sign-in and sync in "Share your fridge", the banner ad at the bottom of the screen, usage statistics (Section 5), and feedback you choose to send.

The Service does not use location, contacts, or microphone permissions, and it does not send notifications.

**Send Feedback**  
When you send feedback in the app, what you write, the email address you choose to enter, the app version, device model, OS version, and language setting are sent to Google Firebase (Firestore) servers and are used only to review and respond to your inquiry and to improve the app. We do not send any identifier that could recognize your device or you. When we review whether to make your feedback an app improvement task, what you write may be sent to an AI tool (Anthropic Claude). Email addresses and phone numbers are masked before it is sent. We delete this information within one year after handling it.

---

### 2. Share Your Fridge (Optional)

This optional feature lets up to 5 people, such as family members, manage one fridge together. The information below is processed only when you turn it on.

**Google Sign-In (Firebase Authentication)**  
To start or join a shared fridge, you sign in with your Google account. We receive your account identifier (UID), name, email, and profile photo URL from Google, and **use only your name** to show who changed what (or the part of your email before the @ if no name is set). Your email and profile photo URL are not stored in our database (Firestore). Firebase Authentication itself keeps your sign-in account record.

**Stored on the server (Google Cloud Firestore)**

- Shared fridge: account identifiers (UIDs) of the owner and members, and members' names
- Item records: name, category, storage location, quantity and unit, date added, expiry date, notes, status, and the UID and name of whoever last changed it
- History: added, used, discarded, and moved events, dates, quantity changes, and the UID and name of who did it
- Invite codes: the 6-character code, shared fridge ID, creator's UID, and expiry time (usable to join for 48 hours after creation)

When you start or join a shared fridge, **the item records and history already on that device are uploaded to the shared fridge** (you are asked to confirm before joining). Photos, shopping lists, meal plans, recipes, and settings are not uploaded.

**Sharing with other members**  
Members of the same shared fridge can see each other's names and can view and edit the shared fridge's item records and history, including notes. You send the invite code yourself through the app you choose (such as a messenger), and only people who know the code can join within 48 hours.

---

### 3. Retention and Deletion

- **Delete account**: You can delete your account at any time with "Delete account" on the sharing screen. This deletes your Firebase sign-in account and user record. A shared fridge you own is closed and all of its item records and history are deleted from the server. If you were a member of someone else's shared fridge, you are removed from it. Records on your device are kept.
- **Leave or stop sharing**: Members can leave at any time, and the owner can stop sharing, which deletes the shared fridge's data from the server. Each device keeps its own copy of the records.
- When a member leaves or deletes their account, the item records and history they added to a shared fridge (including their name) remain for the other members until that shared fridge is closed.
- "Share your fridge" server data is kept until the shared fridge is closed or the account is deleted. Feedback you send is deleted within one year after handling.
- You can also request deletion of your account and data without installing the app. Email us at the address below from, or including, the Google account email you signed in with, and we will delete it after verification.

---

### 4. Backups

**Android Auto Backup**  
If Google backup is enabled on your device, Android backs up the app's data (including records and photos) to your Google account. Google manages this backup and we cannot access it. You can turn backup off in your device settings.

---

### 5. Third-Party Services and Sharing

"Share your fridge" uses Google's Firebase Authentication and Cloud Firestore, and feedback uses Cloud Firestore. Data in transit is encrypted (HTTPS). For how Google handles this data, see the [Google Privacy Policy](https://policies.google.com/privacy) and [Privacy and Security in Firebase](https://firebase.google.com/support/privacy).

**Advertising (Google AdMob)**  
The Service uses Google AdMob to show a banner at the bottom of the screens with the bottom tab bar. Google may collect and process the following to serve and measure ads and to prevent fraud:

- Device identifiers such as the advertising ID
- IP address and approximate location derived from it
- Device and app information, ad impressions and clicks, and diagnostics such as crash logs

**Your item, shopping, meal plan, and recipe records, your photos, and your sharing information are never used in ad requests and are never sent to Google AdMob.**

Users in the European Economic Area, the UK, and Switzerland are shown an ad privacy consent message on first launch and can change their choice at any time under "Ad privacy options" in Settings. You can also reset your advertising ID or opt out of personalized ads in your device settings. See [How Google uses information from sites or apps that use our services](https://policies.google.com/technologies/partner-sites) for details.

**Usage Statistics (Google Firebase Analytics)**  
We use Google Firebase Analytics to understand how the app is used and to improve it. The following is sent to Google:

- Device identifiers such as the app instance ID and the advertising ID
- App usage such as app opens, screen views, and time spent, and the fact that a main feature was used (for example, adding an item, or using or discarding one). Only the feature name is sent, never the content.
- Device model, operating system version, language, app version, and country or region estimated from the IP address

**Your item names, notes, and other item, shopping, meal plan, and recipe records, your photos, and your sharing information are never included in usage statistics and are never sent to Google.** We use these statistics only to improve the Service and not to identify you. For how Google handles this data, see [Privacy and Security in Firebase](https://firebase.google.com/support/privacy).

We do not sell your information, and apart from the advertising and usage statistics above, we do not share it with third parties. We use no analytics or tracking tools other than advertising and usage statistics. However, feedback you send is stored on Google Firebase and may be passed to an AI tool (Anthropic Claude), as described in Section 1.

---

### 6. Your Rights (GDPR · CCPA)

- You can edit or delete any record at any time in the app. Uninstalling the app also deletes the data stored on your device.
- You can access, correct, or delete information stored on the server as described in Section 3 or by emailing us.
- Backups stored in your Google account can be deleted in your Google account settings.
- Advertising-related data can be managed by changing your consent or resetting your advertising ID as described in Section 5.

**We do not sell personal information.**

---

### 7. Children's Privacy

The Service is not directed at children under 13. Parents or guardians with questions may contact us at the email below.

---

### 8. Changes to This Privacy Policy

We may update this policy from time to time. Any changes will be posted on this page.

---

### 9. Contact Us

If you have any questions about this Privacy Policy or want to request account or data deletion, please contact us at:

**moonkimvision@gmail.com**

</div>
