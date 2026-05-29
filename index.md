---
layout: default
title: 홈
---

<section class="hero">
  <div class="hero-inner">
    <p class="hero-eyebrow">Mobile App Development</p>
    <h1 class="hero-title">moonkimvision</h1>
    <p class="hero-tagline">모바일 앱 개발 및 서비스 운영</p>
    <div class="hero-cta">
      <a href="/privacy/" class="btn btn-primary">정책 문서</a>
      <a href="/posts/" class="btn btn-secondary">블로그</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="section-inner">
    <h2 class="section-title">서비스</h2>
    <div class="card-grid">
      <div class="card">
        <div class="card-icon">📱</div>
        <h3>모바일 앱 개발</h3>
        <p>iOS · Android 네이티브 및 크로스플랫폼 앱을 개발합니다.</p>
      </div>
      <div class="card">
        <div class="card-icon">🔒</div>
        <h3>정책 문서 관리</h3>
        <p>앱 스토어 제출에 필요한 개인정보처리방침 및 이용약관을 관리합니다.</p>
      </div>
      <div class="card">
        <div class="card-icon">✍️</div>
        <h3>개발 블로그</h3>
        <p>개발 경험과 기술 노하우를 공유합니다.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="section-inner">
    <h2 class="section-title">앱 정책 문서</h2>
    {% assign policy_docs = site.policies %}
    {% assign privacy_pages = site.pages | where_exp: "p", "p.url contains '/privacy/'" | where_exp: "p", "p.url != '/privacy/'" %}
    {% if policy_docs.size > 0 %}
    <ul class="policy-list">
      {% for p in policy_docs %}
      <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
      {% endfor %}
    </ul>
    {% else %}
    <p class="empty-msg">등록된 정책 문서가 없습니다.</p>
    {% endif %}
    <div style="margin-top:24px">
      <a href="/privacy/" class="link-more">전체 목록 보기 →</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="section-inner">
    <h2 class="section-title">최근 포스트</h2>
    {% assign posts = site.posts | limit: 3 %}
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
    <p class="empty-msg">아직 포스트가 없습니다.</p>
    {% endif %}
    <div style="margin-top:24px">
      <a href="/posts/" class="link-more">모든 포스트 보기 →</a>
    </div>
  </div>
</section>
