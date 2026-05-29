---
layout: page
title: "개인정보처리방침"
permalink: /privacy/
lang: ko
---

## 앱별 개인정보처리방침

moonkimvision에서 서비스하는 앱의 개인정보처리방침 목록입니다.

{% assign policy_docs = site.policies %}
{% if policy_docs.size > 0 %}
<ul class="policy-list">
  {% for p in policy_docs %}
  <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
  {% endfor %}
</ul>
{% else %}
<p style="color:#6b7280">등록된 정책 문서가 없습니다.</p>
{% endif %}
