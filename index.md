---
layout: default
title: 홈
---

<div class="home-hero">
  <h1>MoonKimVision</h1>
  <p>앱 개인정보처리방침 및 개발 블로그</p>
</div>

## 최근 포스트

{% assign posts = site.posts | limit: 5 %}
{% if posts.size > 0 %}
<ul class="post-list">
  {% for post in posts %}
  <li>
    <div class="post-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></div>
    <div class="post-date">{{ post.date | date: "%Y년 %m월 %d일" }}</div>
  </li>
  {% endfor %}
</ul>
{% else %}
<p style="color:#6b7280">아직 포스트가 없습니다.</p>
{% endif %}

## 앱 정책 문서

{% assign privacy_pages = site.pages | where_exp: "p", "p.url contains '/privacy/'" | where_exp: "p", "p.url != '/privacy/'" %}
{% if privacy_pages.size > 0 %}
<ul class="policy-list">
  {% for p in privacy_pages %}
  <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
  {% endfor %}
</ul>
{% else %}
<p style="color:#6b7280">등록된 정책 문서가 없습니다.</p>
{% endif %}
