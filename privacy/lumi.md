---
layout: policy-bilingual
title_ko: "루미 개인정보처리방침"
title_en: "Lumi Privacy Policy"
title: "Lumi Privacy Policy"
permalink: /privacy/lumi/
date: 2026-11-07
lang: ko
---

<div class="lang-ko" markdown="1">

moonkimvision("회사", "저희")은 생리 주기 관리 앱 루미(이하 "서비스")를 무료로 제공합니다.

본 페이지는 서비스 이용 시 개인정보의 수집·이용·공개에 관한 정책을 안내합니다.  
서비스를 이용함으로써 본 정책에 동의하는 것으로 간주됩니다.

---

### 1. 수집하는 정보

**저희는 의견 보내기에 직접 적은 이메일 주소를 빼면 이름·이메일·전화번호 같은 개인정보를 받지 않으며, 사용자가 입력한 건강 기록을 서버로 보내지 않습니다.** 서비스에는 회원가입·로그인이 없습니다.

**기기 안에만 저장되는 정보**  
사용자가 입력한 아래 정보는 **기기 내부 저장소에만 저장**되며, 예측 계산·리포트·알림 등 서비스 기능을 제공하는 데만 쓰입니다.

- 생리 시작일·종료일, 생리 양
- 기분, 몸 상태(증상), 사랑일(피임 여부), 약 복용 여부
- 체중, 기초체온, 메모
- 설정(주기 길이, 알림, 테마, 언어, 임신 모드와 마지막 생리 시작일)
- PIN 잠금을 켠 경우 PIN의 해시값 (PIN 원문은 저장하지 않습니다)

**알림 (POST_NOTIFICATIONS), 진동 (VIBRATE)**  
생리 예정일, 가임기, 배란일, 약 복용 알림을 보내는 데 사용합니다.

**재부팅 후 복구 (RECEIVE_BOOT_COMPLETED)**  
기기를 다시 켠 뒤 예약된 알림을 되살리는 데 사용합니다.

**인터넷 (INTERNET), 광고 ID (AD_ID)**  
화면 하단 광고를 불러오고 이용 통계를 보내는 데(3항), 사용자가 직접 의견을 보내는 데만 사용합니다.

위치·연락처·사진·카메라·마이크 권한은 사용하지 않습니다.

**의견 보내기**  
앱 안에서 의견을 보내면 쓴 내용, 선택해서 적은 이메일 주소, 앱 버전, 기기 모델, OS 버전, 언어 설정이 Google Firebase(Firestore) 서버로 전송되어 문의 확인과 답변, 앱 개선에만 쓰입니다. 기기나 사람을 알아볼 수 있는 식별자는 보내지 않습니다. 앱 개선 일감으로 삼을지 검토할 때는 쓴 내용이 AI 도구(Anthropic Claude)로 전달될 수 있습니다. 이때 이메일 주소와 전화번호는 가리고 보냅니다. 처리한 뒤 1년 안에 지웁니다. 앱에 저장한 건강 기록은 의견에 자동으로 들어가지 않으니, 의견에 건강 정보를 적지 마십시오.

---

### 2. 백업

**Android 자동 백업**  
기기에서 Google 백업이 켜져 있으면 Android 운영체제가 앱 데이터를 사용자의 Google 계정에 백업합니다. 이 백업은 Google이 관리하며 저희는 접근할 수 없습니다. 기기 설정에서 백업을 끌 수 있습니다.

**백업 파일 내보내기**  
사용자가 직접 "백업 파일 내보내기"를 실행하면 기록이 담긴 파일이 만들어지고, 사용자가 고른 앱(메일, 드라이브, 파일 등)으로 전달됩니다. 백업 파일에는 PIN이 포함되지 않습니다.

---

### 3. 광고와 이용 통계 (Google AdMob · Firebase Analytics)

서비스는 화면 하단 배너 광고를 위해 Google AdMob을 사용합니다. Google은 광고 게재·성과 측정·부정 행위 방지를 위해 다음 정보를 수집·처리할 수 있습니다.

- 광고 ID 등 기기 식별자
- IP 주소와 이를 통한 대략적인 위치
- 기기·앱 정보, 광고 노출·클릭 기록, 비정상 종료 등 진단 정보

**생리·증상·사랑일·체중·체온·메모 등 건강 기록은 광고 요청에 사용되지 않으며 Google에 전달되지 않습니다.**

유럽경제지역(EEA)·영국·스위스 사용자에게는 처음 실행할 때 광고 개인정보 동의 화면이 표시되며, 설정의 "광고 개인정보 옵션"에서 언제든지 선택을 바꿀 수 있습니다. 기기 설정에서 광고 ID를 재설정하거나 맞춤 광고를 끌 수도 있습니다.

Google의 데이터 처리 방식은 [Google 개인정보처리방침](https://policies.google.com/privacy)과 [Google 파트너 사이트·앱 데이터 사용 방식](https://policies.google.com/technologies/partner-sites)을 참고하십시오.

**이용 통계 (Google Firebase Analytics)**  
앱이 어떻게 쓰이는지 파악하고 개선하기 위해 Google Firebase Analytics를 사용합니다. 다음 정보가 Google로 전송됩니다.

- 앱 인스턴스 ID, 광고 ID 등 기기 식별자
- 앱 실행, 화면 이동, 사용 시간 같은 앱 사용 기록과 주요 기능을 사용했다는 사실(예: 생리 시작 기록, 하루 기록 저장). 기능 이름만 보내고 내용은 보내지 않습니다.
- 기기 모델, 운영체제 버전, 언어, 앱 버전, IP 주소로 추정한 국가·지역

**생리일·증상·사랑일·체중·체온·메모 같은 기록 내용과 날짜는 이용 통계에 들어가지 않으며 Google에 전달되지 않습니다.** 수집한 통계는 서비스 개선에만 쓰며 개인을 식별하는 데 쓰지 않습니다. Google의 처리 방식은 [Firebase 개인정보 보호 안내](https://firebase.google.com/support/privacy)를 참고하십시오. 기기 설정에서 광고 ID를 재설정하거나 삭제할 수 있습니다.

---

### 4. 제3자 제공

저희는 사용자의 정보를 판매하거나 제3자에게 제공하지 않습니다. 3항의 광고와 이용 통계(Google)를 제외하면 서비스에는 다른 분석·추적 도구가 포함되어 있지 않습니다. 다만 의견 보내기로 보낸 내용은 1항에서 설명한 대로 Google Firebase에 저장되고 AI 도구(Anthropic Claude)로 전달될 수 있습니다.

---

### 5. 건강 정보에 관한 안내

서비스의 생리 예정일·배란일·가임기 예측과 임신 가능성은 사용자의 기록을 바탕으로 한 추정치입니다. 의료적 진단이나 조언을 대신하지 않으며, 피임 수단으로 사용해서는 안 됩니다.

---

### 6. 이용자의 권리와 삭제 (GDPR · CCPA)

- 모든 기록은 앱의 설정 > 주기 > "기록 관리" 또는 설정 > 데이터 > "모든 데이터 삭제"로 언제든지 고치거나 삭제할 수 있으며, 앱을 삭제하면 기기에 저장된 데이터도 함께 삭제됩니다.
- Google 계정에 저장된 백업은 Google 계정 설정에서 삭제할 수 있습니다.
- 광고 관련 데이터는 3항의 방법으로 동의를 바꾸거나 광고 ID를 재설정해 관리할 수 있습니다.

**저희는 개인정보를 판매하지 않습니다.**

---

### 7. 아동 개인정보 보호

본 서비스는 만 13세 미만 아동을 대상으로 하지 않습니다. 궁금한 점이 있는 보호자는 아래 이메일로 연락해 주십시오.

---

### 8. 개인정보처리방침 변경

본 방침은 수시로 업데이트될 수 있습니다. 변경 사항은 이 페이지에 게시합니다.

---

### 9. 문의

개인정보처리방침에 관한 문의 사항은 아래로 연락해 주십시오.

**moonkimvision@gmail.com**

</div>

<div class="lang-en" style="display:none" markdown="1">

moonkimvision ("we," "us," or "our") provides Lumi, a period and cycle tracking app (the "Service"), free of charge.

This page explains our policies on the collection, use, and disclosure of personal information when you use the Service.  
By using the Service, you agree to this policy.

---

### 1. Information Collection and Use

**Apart from an email address you choose to enter when sending feedback, we do not ask for personal information such as your name, email, or phone number, and we never send the health records you enter to any server.** The Service has no sign-up or login.

**Stored only on your device**  
The information you enter is **stored only on your device** and is used only to provide features such as predictions, insights, and reminders:

- Period start and end dates, flow
- Moods, symptoms, intimacy (with or without protection), pill intake
- Weight, basal body temperature, notes
- Settings (cycle length, reminders, theme, language, pregnancy mode and last period date)
- If PIN lock is on, a hash of your PIN (the PIN itself is never stored)

**Notifications (POST_NOTIFICATIONS), vibration (VIBRATE)**  
Used to send period, fertile window, ovulation, and pill reminders.

**Restore after reboot (RECEIVE_BOOT_COMPLETED)**  
Used to restore scheduled reminders after your device restarts.

**Internet (INTERNET), advertising ID (AD_ID)**  
Used only to load the banner ad at the bottom of the screen, send usage statistics (Section 3), and send feedback when you choose to.

The Service does not use location, contacts, photos, camera, or microphone permissions.

**Send Feedback**  
When you send feedback in the app, what you write, the email address you choose to enter, the app version, device model, OS version, and language setting are sent to Google Firebase (Firestore) servers and are used only to review and respond to your inquiry and to improve the app. We do not send any identifier that could recognize your device or you. When we review whether to make your feedback an app improvement task, what you write may be sent to an AI tool (Anthropic Claude). Email addresses and phone numbers are masked before it is sent. We delete this information within one year after handling it. Health records saved in the app are not included automatically, so please do not write health information in your feedback.

---

### 2. Backups

**Android Auto Backup**  
If Google backup is enabled on your device, Android backs up the app's data to your Google account. Google manages this backup and we cannot access it. You can turn backup off in your device settings.

**Exported backup files**  
When you choose "Export backup file," a file containing your logs is created and handed to the app you pick (email, Drive, files, etc.). Backup files never include your PIN.

---

### 3. Advertising and Analytics (Google AdMob · Firebase Analytics)

The Service uses Google AdMob to show a banner at the bottom of the screen. Google may collect and process the following to serve and measure ads and to prevent fraud:

- Device identifiers such as the advertising ID
- IP address and approximate location derived from it
- Device and app information, ad impressions and clicks, and diagnostics such as crash logs

**Your health records — periods, symptoms, intimacy, weight, temperature, notes — are never used in ad requests and are never sent to Google.**

Users in the European Economic Area, the UK, and Switzerland are shown an ad privacy consent message on first launch and can change their choice at any time under "Ad privacy options" in Settings. You can also reset your advertising ID or opt out of personalized ads in your device settings.

For how Google handles this data, see the [Google Privacy Policy](https://policies.google.com/privacy) and [How Google uses information from sites or apps that use our services](https://policies.google.com/technologies/partner-sites).

**Usage Statistics (Google Firebase Analytics)**  
We use Google Firebase Analytics to understand how the app is used and to improve it. The following is sent to Google:

- Device identifiers such as the app instance ID and the advertising ID
- App usage such as app opens, screen views, and time spent, and the fact that a main feature was used (for example, logging a period start or saving a day's log). Only the feature name is sent, never the content.
- Device model, operating system version, language, app version, and country or region estimated from the IP address

**The content and dates of your logs, such as periods, symptoms, intimacy, weight, temperature, and notes are never included in usage statistics and are never sent to Google.** We use these statistics only to improve the Service and not to identify you. For how Google handles this data, see [Privacy and Security in Firebase](https://firebase.google.com/support/privacy). You can reset or delete your advertising ID in your device settings.

---

### 4. Sharing

We do not sell or share your information with third parties. Apart from the advertising and usage statistics (Google) in Section 3, the Service contains no other analytics or tracking tools. However, feedback you send is stored on Google Firebase and may be passed to an AI tool (Anthropic Claude), as described in Section 1.

---

### 5. Health Information

The Service's period, ovulation, and fertile window predictions and pregnancy chances are estimates based on your logs. They are not medical advice or diagnosis and must not be used as a method of contraception.

---

### 6. Your Rights and Deletion (GDPR · CCPA)

- You can edit or delete any record at any time in Settings > Cycle > "Manage records" or Settings > Data > "Delete all data." Uninstalling the app also deletes the data stored on your device.
- Backups stored in your Google account can be deleted in your Google account settings.
- Advertising-related data can be managed by changing your consent or resetting your advertising ID as described in Section 3.

**We do not sell personal information.**

---

### 7. Children's Privacy

The Service is not directed at children under 13. Parents or guardians with questions may contact us at the email below.

---

### 8. Changes to This Privacy Policy

We may update this policy from time to time. Any changes will be posted on this page.

---

### 9. Contact Us

If you have any questions about this Privacy Policy, please contact us at:

**moonkimvision@gmail.com**

</div>
