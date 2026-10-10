---
layout: page
title: "개인정보처리방침"
eyebrow: "Privacy Policies"
permalink: /privacy/
lang: ko
---

moonkimvision에서 서비스하는 앱의 개인정보처리방침 목록입니다. 각 문서는 한국어/English 전환을 지원합니다.

<ul class="policy-list">
{%- for app in site.data.apps %}
  <li>
    <a href="{{ app.privacy | relative_url }}">
      <img src="{{ app.icon | relative_url }}" alt="" width="40" height="40">
      <span><strong>{{ app.name }}</strong><small>Privacy Policy · 개인정보처리방침</small></span>
    </a>
  </li>
{%- endfor %}
</ul>

<div class="chat chat-sm">
{% include bubble.html who="brother" text="…앱 사용 기록이랑 녹화 영상은 폰 안에만 남아." %}
</div>
