---
layout: home
title: Home
---

<section class="hero">
  <div class="hero-inner">
    <p class="hero-eyebrow">Mobile App Development</p>
    <h1 class="hero-title">moonkimvision</h1>
    <p class="hero-tagline lang-ko">모바일 앱 개발 및 서비스 운영</p>
    <p class="hero-tagline lang-en">Mobile App Development &amp; Services</p>
    <div class="hero-cta">
      <a href="/privacy/" class="btn btn-primary">
        <span class="lang-ko">정책 문서</span>
        <span class="lang-en">Policies</span>
      </a>
      <a href="/posts/" class="btn btn-secondary">
        <span class="lang-ko">블로그</span>
        <span class="lang-en">Blog</span>
      </a>
    </div>
  </div>
</section>

<section class="section">
  <div class="section-inner">
    <h2 class="section-title">
      <span class="lang-ko">서비스</span>
      <span class="lang-en">Services</span>
    </h2>
    <div class="card-grid">
      <div class="card">
        <div class="card-icon">📱</div>
        <h3 class="lang-ko">모바일 앱 개발</h3>
        <h3 class="lang-en">Mobile App Development</h3>
        <p class="lang-ko">iOS · Android 네이티브 및 크로스플랫폼 앱을 개발합니다.</p>
        <p class="lang-en">Building native and cross-platform apps for iOS &amp; Android.</p>
      </div>
      <div class="card">
        <div class="card-icon">🔒</div>
        <h3 class="lang-ko">정책 문서 관리</h3>
        <h3 class="lang-en">Policy Document Management</h3>
        <p class="lang-ko">앱 스토어 제출에 필요한 개인정보처리방침 및 이용약관을 관리합니다.</p>
        <p class="lang-en">Managing privacy policies and terms of service for app store submissions.</p>
      </div>
      <div class="card">
        <div class="card-icon">✍️</div>
        <h3 class="lang-ko">개발 블로그</h3>
        <h3 class="lang-en">Developer Blog</h3>
        <p class="lang-ko">개발 경험과 기술 노하우를 공유합니다.</p>
        <p class="lang-en">Sharing development experience and technical insights.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="section-inner">
    <h2 class="section-title">
      <span class="lang-ko">앱 정책 문서</span>
      <span class="lang-en">App Policy Documents</span>
    </h2>
    {% assign policy_docs = site.policies %}
    {% if policy_docs.size > 0 %}
    <ul class="policy-list">
      {% for p in policy_docs %}
      <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
      {% endfor %}
    </ul>
    {% else %}
    <p class="empty-msg lang-ko">등록된 정책 문서가 없습니다.</p>
    <p class="empty-msg lang-en">No policy documents registered yet.</p>
    {% endif %}
    <div style="margin-top:24px">
      <a href="/privacy/" class="link-more">
        <span class="lang-ko">전체 목록 보기 →</span>
        <span class="lang-en">View All →</span>
      </a>
    </div>
  </div>
</section>

<section class="section">
  <div class="section-inner">
    <h2 class="section-title">
      <span class="lang-ko">최근 포스트</span>
      <span class="lang-en">Recent Posts</span>
    </h2>
    {% assign posts = site.posts | limit: 3 %}
    {% if posts.size > 0 %}
    <ul class="post-list">
      {% for post in posts %}
      <li>
        <div class="post-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></div>
        <div class="post-date lang-ko">{{ post.date | date: "%Y년 %m월 %d일" }}</div>
        <div class="post-date lang-en">{{ post.date | date: "%B %-d, %Y" }}</div>
      </li>
      {% endfor %}
    </ul>
    {% else %}
    <p class="empty-msg lang-ko">아직 포스트가 없습니다.</p>
    <p class="empty-msg lang-en">No posts yet.</p>
    {% endif %}
    <div style="margin-top:24px">
      <a href="/posts/" class="link-more">
        <span class="lang-ko">모든 포스트 보기 →</span>
        <span class="lang-en">View All Posts →</span>
      </a>
    </div>
  </div>
</section>
