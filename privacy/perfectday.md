---
layout: policy-bilingual
title_ko: "오늘챙김 개인정보처리방침"
title_en: "Today Care Privacy Policy"
title: "Today Care Privacy Policy"
permalink: /privacy/perfectday/
date: 2026-10-20
lang: ko
---

<div class="lang-ko" markdown="1">

moonkimvision("회사", "저희")은 할 일·습관 플래너 앱 오늘챙김(이하 "서비스")을 무료로 제공합니다.

본 페이지는 서비스 이용 시 개인정보의 수집·이용·공개에 관한 정책을 안내합니다.  
서비스를 이용함으로써 본 정책에 동의하는 것으로 간주됩니다.

---

### 1. 수집하는 정보

**저희는 이름·이메일·전화번호 같은 개인정보를 받지 않습니다.** 서비스에는 회원가입·로그인 화면이 없습니다. 화면 하단 광고를 위해 Google AdMob이 기기 정보를 처리합니다 (4항).

**기기 안에만 저장되는 정보**  
아래 정보는 **기기 내부 저장소에만 저장**되며, 서비스 기능을 제공하는 데만 쓰입니다.

- 할 일 (제목, 메모, 반복 일정, 알림 시각, 아이콘·색상, 그룹)
- 완료 기록과 통계
- 친구 목록 (친구 코드, 사용자가 붙인 별명)
- 친구에게 보이는 이름, 화면·정렬 설정

**알림 (POST_NOTIFICATIONS)**  
할 일 알림과 친구 소식(친구가 함께하는 할 일을 완료했을 때 등)을 보내는 데 사용합니다. 할 일에 알림을 켤 때 요청합니다.

**정확한 알람 (SCHEDULE_EXACT_ALARM), 재부팅 후 복구 (RECEIVE_BOOT_COMPLETED)**  
사용자가 정한 시각에 알림을 보내고, 기기를 다시 켜거나 시간대가 바뀐 뒤 예약된 알림을 되살리는 데 사용합니다.

**인터넷 (INTERNET, ACCESS_NETWORK_STATE), 광고 ID (AD_ID)**  
친구와 함께하기 기능(2항)과 화면 하단 광고를 불러오는 데(4항) 사용합니다.

위치·연락처·캘린더·사진·카메라·마이크 권한은 사용하지 않습니다.

---

### 2. 친구와 함께하기 (Firebase)

친구와 할 일을 함께 챙기는 기능을 위해 Google의 Firebase Authentication과 Cloud Firestore를 사용합니다.

**익명 계정과 친구 코드**  
앱을 실행하면 Firebase 익명 계정이 자동으로 만들어집니다. 익명 계정은 무작위 식별자(UID)일 뿐이며 이메일·이름 등 개인정보와 연결되지 않습니다. 기기에서 무작위로 만든 6자리 친구 코드와 이 UID의 연결이 서버에 저장되며, 코드를 아는 사람만 조회할 수 있습니다.

**친구에게 전달되는 정보**  
아래 정보는 사용자가 친구 코드로 친구를 맺고, 할 일을 직접 함께하기로 했을 때만 Firestore를 거쳐 해당 친구에게 전달됩니다.

- 친구 맺기: 친구 코드, 친구에게 보이는 이름(직접 입력한 경우)
- 함께하는 할 일: 제목, 메모, 반복 일정, 시작·종료일, 아이콘·색상
- 함께하는 할 일의 완료 기록: 최근 14일의 완료 날짜와 시각

함께하지 않는 할 일, 알림 시각, 그룹, 통계는 전송되지 않습니다. 전달용 메시지는 받는 사람의 앱이 처리한 뒤 서버에서 삭제됩니다. 서비스는 네트워크가 연결되어 있을 때 약 15분마다 새 메시지를 확인합니다.

초대 문구(이름과 친구 코드)는 사용자가 고른 앱(메신저 등)으로 직접 전달되며 저희에게 보내지지 않습니다.

---

### 3. 백업

**Android 자동 백업**  
기기에서 Google 백업이 켜져 있으면 Android 운영체제가 앱 데이터를 사용자의 Google 계정에 백업합니다. 이 백업은 Google이 관리하며 저희는 접근할 수 없습니다. 기기 설정에서 백업을 끌 수 있습니다.

**백업 파일 내보내기**  
사용자가 설정 > 백업에서 직접 내보내기를 실행하면 기록이 담긴 파일이 사용자가 고른 위치(드라이브, 파일 등)에 저장됩니다.

---

### 4. 제3자 서비스와 제공

Firebase를 통해 전송되는 데이터는 암호화(HTTPS)되며, Google은 서비스 제공을 위해 IP 주소 등 기술 정보를 처리할 수 있습니다. 자세한 내용은 [Google 개인정보처리방침](https://policies.google.com/privacy)과 [Firebase 개인정보 보호](https://firebase.google.com/support/privacy)를 참고하십시오.

**광고 (Google AdMob)**  
서비스는 하단 탭이 있는 화면 아래쪽 배너 광고를 위해 Google AdMob을 사용합니다. Google은 광고 게재·성과 측정·부정 행위 방지를 위해 다음 정보를 수집·처리할 수 있습니다.

- 광고 ID 등 기기 식별자
- IP 주소와 이를 통한 대략적인 위치
- 기기·앱 정보, 광고 노출·클릭 기록, 비정상 종료 등 진단 정보

**할 일·메모·완료 기록, 친구 정보는 광고 요청에 사용되지 않으며 Google AdMob에 전달되지 않습니다.**

유럽경제지역(EEA)·영국·스위스 사용자에게는 처음 실행할 때 광고 개인정보 동의 화면이 표시되며, 설정의 "광고 개인정보 설정"에서 언제든지 선택을 바꿀 수 있습니다. 기기 설정에서 광고 ID를 재설정하거나 맞춤 광고를 끌 수도 있습니다. 자세한 내용은 [Google 파트너 사이트·앱 데이터 사용 방식](https://policies.google.com/technologies/partner-sites)을 참고하십시오.

저희는 사용자의 정보를 판매하지 않으며, 2항의 친구와 위의 광고를 제외하면 제3자에게 제공하지 않습니다. 서비스에는 분석·추적 도구가 포함되어 있지 않습니다.

---

### 5. 이용자의 권리와 삭제 (GDPR · CCPA)

- 할 일과 친구는 앱 안에서 언제든지 고치거나 삭제할 수 있으며, 앱을 삭제하면 기기에 저장된 데이터도 함께 삭제됩니다.
- 함께하는 할 일을 삭제하면 친구의 기기에서도 함께하기가 해제됩니다. 이미 친구에게 전달된 정보는 친구의 기기에 남을 수 있습니다.
- 서버에 남은 익명 계정과 친구 코드의 삭제는 아래 이메일로 요청할 수 있습니다. 앱의 친구 화면에 표시되는 내 친구 코드를 함께 보내 주시면 확인 후 삭제합니다.
- Google 계정에 저장된 백업은 Google 계정 설정에서 삭제할 수 있습니다.
- 광고 관련 데이터는 4항의 방법으로 동의를 바꾸거나 광고 ID를 재설정해 관리할 수 있습니다.

**저희는 개인정보를 판매하지 않습니다.**

---

### 6. 아동 개인정보 보호

본 서비스는 만 13세 미만 아동을 대상으로 하지 않습니다. 궁금한 점이 있는 보호자는 아래 이메일로 연락해 주십시오.

---

### 7. 개인정보처리방침 변경

본 방침은 수시로 업데이트될 수 있습니다. 변경 사항은 이 페이지에 게시합니다.

---

### 8. 문의

개인정보처리방침과 데이터 삭제에 관한 문의 사항은 아래로 연락해 주십시오.

**fisherman.moon@gmail.com**

</div>

<div class="lang-en" style="display:none" markdown="1">

moonkimvision ("we," "us," or "our") provides Today Care, a to-do and habit planner app (the "Service"), free of charge.

This page explains our policies on the collection, use, and disclosure of personal information when you use the Service.  
By using the Service, you agree to this policy.

---

### 1. Information Collection and Use

**We do not ask for personal information such as your name, email, or phone number.** The Service has no sign-up or login screen. Google AdMob processes device information to show the banner ad at the bottom of the screen (Section 4).

**Stored only on your device**  
The following information is **stored only on your device** and is used only to provide the Service's features:

- Tasks (title, notes, repeat schedule, reminder times, icon and color, groups)
- Completion history and statistics
- Friends list (friend codes and the nicknames you give them)
- The name shown to friends, display and sort settings

**Notifications (POST_NOTIFICATIONS)**  
Used to send task reminders and friend updates (for example, when a friend completes a task you share). Requested when you turn on a reminder for a task.

**Exact alarms (SCHEDULE_EXACT_ALARM), restore after reboot (RECEIVE_BOOT_COMPLETED)**  
Used to send reminders at the times you set and to restore scheduled reminders after your device restarts or the time zone changes.

**Internet (INTERNET, ACCESS_NETWORK_STATE), advertising ID (AD_ID)**  
Used for doing tasks together with friends (Section 2) and to load the banner ad at the bottom of the screen (Section 4).

The Service does not use location, contacts, calendar, photos, camera, or microphone permissions.

---

### 2. Doing Tasks Together with Friends (Firebase)

To let you keep up with tasks together with friends, the Service uses Google's Firebase Authentication and Cloud Firestore.

**Anonymous account and friend code**  
When you open the app, a Firebase anonymous account is created automatically. It is only a random identifier (UID) and is not linked to your email, name, or other personal information. The link between this UID and a random 6-character friend code generated on your device is stored on the server, and can be looked up only by someone who knows the code.

**Information delivered to friends**  
The following is delivered through Firestore to a friend only when you connect with them by friend code and choose to share a task with them:

- Connecting: your friend code and the name shown to friends (if you entered one)
- Shared tasks: title, notes, repeat schedule, start and end dates, icon and color
- Completion history for shared tasks: completion dates and times for the last 14 days

Tasks you do not share, reminder times, groups, and statistics are never sent. Delivery messages are deleted from the server after the recipient's app processes them. While connected to a network, the Service checks for new messages about every 15 minutes.

Invite text (your name and friend code) is sent by you through the app you choose (such as a messenger) and is never sent to us.

---

### 3. Backups

**Android Auto Backup**  
If Google backup is enabled on your device, Android backs up the app's data to your Google account. Google manages this backup and we cannot access it. You can turn backup off in your device settings.

**Exported backup files**  
When you choose to export in Settings > Backup, a file containing your records is saved to a location you pick (Drive, files, etc.).

---

### 4. Third-Party Services and Sharing

Data sent through Firebase is encrypted in transit (HTTPS), and Google may process technical information such as IP addresses to provide its services. For details, see the [Google Privacy Policy](https://policies.google.com/privacy) and [Privacy and Security in Firebase](https://firebase.google.com/support/privacy).

**Advertising (Google AdMob)**  
The Service uses Google AdMob to show a banner at the bottom of the screens with the bottom tab bar. Google may collect and process the following to serve and measure ads and to prevent fraud:

- Device identifiers such as the advertising ID
- IP address and approximate location derived from it
- Device and app information, ad impressions and clicks, and diagnostics such as crash logs

**Your tasks, notes, completion history, and friend information are never used in ad requests and are never sent to Google AdMob.**

Users in the European Economic Area, the UK, and Switzerland are shown an ad privacy consent message on first launch and can change their choice at any time under "Ad privacy settings" in Settings. You can also reset your advertising ID or opt out of personalized ads in your device settings. See [How Google uses information from sites or apps that use our services](https://policies.google.com/technologies/partner-sites) for details.

We do not sell your information, and apart from the friends described in Section 2 and the advertising above, we do not share it with third parties. The Service contains no analytics or tracking tools.

---

### 5. Your Rights and Deletion (GDPR · CCPA)

- You can edit or delete tasks and friends at any time in the app. Uninstalling the app also deletes the data stored on your device.
- Deleting a shared task also stops sharing it on your friends' devices. Information already delivered to a friend may remain on their device.
- You can request deletion of your anonymous account and friend code from the server by emailing us at the address below. Please include your friend code, shown on the Friends screen, and we will delete them after verification.
- Backups stored in your Google account can be deleted in your Google account settings.
- Advertising-related data can be managed by changing your consent or resetting your advertising ID as described in Section 4.

**We do not sell personal information.**

---

### 6. Children's Privacy

The Service is not directed at children under 13. Parents or guardians with questions may contact us at the email below.

---

### 7. Changes to This Privacy Policy

We may update this policy from time to time. Any changes will be posted on this page.

---

### 8. Contact Us

If you have any questions about this Privacy Policy or want to request data deletion, please contact us at:

**fisherman.moon@gmail.com**

</div>
