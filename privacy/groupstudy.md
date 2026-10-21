---
layout: policy-bilingual
title_ko: "그룹스터디도우미 개인정보처리방침"
title_en: "Study Group Helper Privacy Policy"
title: "Study Group Helper Privacy Policy"
permalink: /privacy/groupstudy/
date: 2026-10-21
lang: ko
---

<div class="lang-ko" markdown="1">

moonkimvision("회사", "저희")은 스터디 과제 공유 앱 그룹스터디도우미(이하 "서비스")를 무료로 제공합니다.

본 페이지는 서비스 이용 시 개인정보의 수집·이용·공개에 관한 정책을 안내합니다.  
서비스를 이용함으로써 본 정책에 동의하는 것으로 간주됩니다.

---

### 1. 수집하는 정보

서비스는 스터디원끼리 과제를 함께 올리고 확인하는 앱이라, 사용자가 올린 정보는 서버에 저장되어 **같은 스터디 그룹의 구성원에게 보입니다.**

**Google 로그인 (Firebase Authentication)**  
Google 계정으로 로그인합니다. Google로부터 계정 식별자(UID), 이름, 이메일 주소를 받으며, 이름은 그룹 프로필 별명의 처음 값으로만 씁니다. 이메일과 프로필 사진은 저희 데이터베이스(Firestore)에 저장하지 않습니다. 로그인 계정 정보 자체는 Firebase Authentication이 보관합니다.

**서버(Google Cloud Firestore · Cloud Storage)에 저장되는 정보**

- 스터디 그룹: 그룹 이름, 방장과 구성원의 계정 식별자(UID), 초대 코드(6자리, 7일 유효)
- 그룹 프로필: 사용자가 정한 별명, 이니셜, 색, 들어온 날짜
- 과제: 과제명, 내용, 일정, 등록한 사람
- 과제 완료 기록: 완료한 날짜·시각, 메모, 사용자가 올린 **사진과 영상**

**다른 구성원에게 보이는 정보**  
같은 그룹의 구성원은 서로의 별명·이니셜·색, 과제 완료 날짜·시각, 메모, 사진·영상을 볼 수 있습니다. 사진·영상은 그룹 구성원만 받을 수 있는 주소로 저장되며, 이 주소는 앱 안에서만 쓰입니다.

**사진·영상 (카메라, 사진 선택)**  
사진·영상은 기기의 카메라 앱이나 Android 사진 선택 도구로 사용자가 직접 고른 것만 받습니다. 카메라·저장소 권한은 요청하지 않습니다. 올리기 전에 기기 안에서 크기를 줄입니다(사진 긴 변 1920px, 영상 720p).

**알림 (POST_NOTIFICATIONS)**  
새 과제가 올라왔을 때와 마감 3일 전부터의 알림에 사용합니다. 앱이 약 15분마다 서버에서 새 과제를 확인해 기기 안에서 알림을 만듭니다.

**인터넷 (INTERNET)**  
서버와 데이터를 주고받는 데 사용합니다.

위치·연락처·마이크 권한은 사용하지 않습니다.

---

### 2. 이용 목적

수집한 정보는 스터디 그룹 운영(초대, 과제 등록, 완료 확인, 달력·과제열람 표시, 알림)에만 사용합니다.

---

### 3. 보관 기간과 삭제

- **체크 취소**: 과제 체크를 취소하면 그 완료 기록과 사진·영상이 서버에서 삭제됩니다.
- **과제 삭제**: 과제를 등록한 사람이나 방장이 과제를 지우면, 모든 구성원의 그 과제 완료 기록과 사진·영상이 함께 삭제됩니다.
- **그룹 나가기·내보내기**: 그룹에서 나가거나 방장이 내보내면, 그 사람이 그 그룹에 올린 완료 기록, 사진·영상, 그룹 프로필이 삭제됩니다.
- **그룹 삭제**: 방장이 그룹을 지우면 그 그룹의 모든 과제, 완료 기록, 사진·영상이 삭제됩니다.
- **계정 삭제**: 설정 > "계정 삭제"에서 언제든지 삭제할 수 있습니다. 모든 그룹에서 나가며 내가 올린 완료 기록과 사진·영상, 그룹 프로필, Firebase 로그인 계정이 삭제됩니다. 혼자인 그룹은 삭제되고, 방장인 그룹은 다른 구성원에게 방장이 넘어갑니다. 내가 등록한 과제는 그룹의 다른 구성원을 위해 남습니다.
- 위와 같이 삭제하기 전까지 서버 정보는 보관됩니다.
- 앱을 설치하지 않고도 계정과 데이터 삭제를 요청할 수 있습니다. 아래 이메일로 로그인에 쓴 Google 계정 이메일을 보내 주시면 확인 후 삭제합니다.

---

### 4. 제3자 서비스와 제공

서비스는 Google의 Firebase Authentication, Cloud Firestore, Cloud Storage를 사용합니다. 전송되는 데이터는 암호화(HTTPS)되며, Google은 서비스 제공을 위해 IP 주소 등 기술 정보를 처리할 수 있습니다. 자세한 내용은 [Google 개인정보처리방침](https://policies.google.com/privacy)과 [Firebase 개인정보 보호](https://firebase.google.com/support/privacy)를 참고하십시오.

저희는 사용자의 정보를 판매하지 않으며, 1항의 같은 그룹 구성원 외의 제3자에게 제공하지 않습니다. 서비스에는 광고, 분석, 추적 도구가 포함되어 있지 않습니다.

---

### 5. 이용자의 권리 (GDPR · CCPA)

- 그룹 프로필, 과제, 완료 기록, 사진·영상은 앱 안에서 언제든지 고치거나 삭제할 수 있습니다.
- 서버에 저장된 정보의 열람·정정·삭제는 3항의 방법이나 아래 이메일로 요청할 수 있습니다.

**저희는 개인정보를 판매하지 않습니다.**

---

### 6. 아동 개인정보 보호

본 서비스는 만 13세 미만 아동을 대상으로 하지 않습니다. 궁금한 점이 있는 보호자는 아래 이메일로 연락해 주십시오.

---

### 7. 개인정보처리방침 변경

본 방침은 수시로 업데이트될 수 있습니다. 변경 사항은 이 페이지에 게시합니다.

---

### 8. 문의

개인정보처리방침과 계정·데이터 삭제에 관한 문의 사항은 아래로 연락해 주십시오.

**moonkimvision@gmail.com**

</div>

<div class="lang-en" style="display:none" markdown="1">

moonkimvision ("we," "us," or "our") provides Study Group Helper, an app for sharing study assignments (the "Service"), free of charge.

This page explains our policies on the collection, use, and disclosure of personal information when you use the Service.  
By using the Service, you agree to this policy.

---

### 1. Information Collection and Use

The Service lets study group members post and check assignments together, so what you upload is stored on a server and **is visible to members of the same study group.**

**Google Sign-In (Firebase Authentication)**  
You sign in with your Google account. We receive your account identifier (UID), name, and email address from Google, and use your name only as the initial value of your nickname in a group. Your email and profile photo are not stored in our database (Firestore). Firebase Authentication itself keeps your sign-in account record.

**Stored on the server (Google Cloud Firestore and Cloud Storage)**

- Study groups: group name, account identifiers (UIDs) of the host and members, invite code (6 characters, valid for 7 days)
- Group profile: the nickname, initial, and color you choose, and the date you joined
- Assignments: title, details, schedule, and who created it
- Completion records: date and time completed, notes, and the **photos and videos** you upload

**Visible to other members**  
Members of the same group can see each other's nicknames, initials, colors, completion dates and times, notes, photos, and videos. Photos and videos are stored at addresses that only group members receive, and these addresses are used only inside the app.

**Photos and videos (camera, photo picker)**  
Photos and videos come only from your device's camera app or the Android photo picker, as chosen by you. The Service does not request camera or storage permissions. They are resized on your device before upload (photos to 1920 px on the long side, videos to 720p).

**Notifications (POST_NOTIFICATIONS)**  
Used for new assignment alerts and deadline reminders starting 3 days before. The app checks the server for new assignments about every 15 minutes and creates notifications on your device.

**Internet (INTERNET)**  
Used to exchange data with the server.

The Service does not use location, contacts, or microphone permissions.

---

### 2. Purpose of Use

The information is used only to run your study groups: invitations, assignments, completion checks, the calendar and browse views, and notifications.

---

### 3. Retention and Deletion

- **Uncheck**: Unchecking an assignment deletes that completion record and its photos and videos from the server.
- **Delete an assignment**: When the person who created an assignment, or the host, deletes it, every member's completion records, photos, and videos for it are deleted too.
- **Leave or removal**: When you leave a group or the host removes you, your completion records, photos, videos, and group profile in that group are deleted.
- **Delete a group**: When the host deletes a group, all of its assignments, completion records, photos, and videos are deleted.
- **Delete account**: You can delete your account at any time in Settings > "Delete account." You leave all groups, and your completion records, photos, videos, group profiles, and Firebase sign-in account are deleted. Groups where you are the only member are deleted, and in groups you host, another member becomes the host. Assignments you created remain for the other members of the group.
- Server data is kept until it is deleted as described above.
- You can also request deletion of your account and data without installing the app. Email us at the address below from, or including, the Google account email you signed in with, and we will delete it after verification.

---

### 4. Third-Party Services and Sharing

The Service uses Google's Firebase Authentication, Cloud Firestore, and Cloud Storage. Data in transit is encrypted (HTTPS), and Google may process technical information such as IP addresses to provide its services. For details, see the [Google Privacy Policy](https://policies.google.com/privacy) and [Privacy and Security in Firebase](https://firebase.google.com/support/privacy).

We do not sell your information, and we do not share it with anyone other than the members of the same group described in Section 1. The Service contains no ads, analytics, or tracking tools.

---

### 5. Your Rights (GDPR · CCPA)

- You can edit or delete your group profile, assignments, completion records, photos, and videos at any time in the app.
- You can access, correct, or delete information stored on the server as described in Section 3 or by emailing us.

**We do not sell personal information.**

---

### 6. Children's Privacy

The Service is not directed at children under 13. Parents or guardians with questions may contact us at the email below.

---

### 7. Changes to This Privacy Policy

We may update this policy from time to time. Any changes will be posted on this page.

---

### 8. Contact Us

If you have any questions about this Privacy Policy or want to request account or data deletion, please contact us at:

**moonkimvision@gmail.com**

</div>
