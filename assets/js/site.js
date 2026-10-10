// moonkimvision 사이트 스크립트 (defer 로 로드)
// 언어의 첫 적용은 head 의 인라인 스크립트가 깜빡임 없이 처리한다. 여기서는 토글·인터랙션만.
(function () {
  var root = document.documentElement;

  // ── 언어 토글: <button data-set-lang="ko|en">
  function setLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    try { localStorage.setItem('site-lang', lang); } catch (e) {}
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      var on = b.getAttribute('data-set-lang') === lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }
  document.querySelectorAll('[data-set-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-set-lang')); });
  });
  if (!root.hasAttribute('data-lang-fixed')) setLang(root.getAttribute('data-lang') || 'ko');
  window.setLang = setLang;

  // ── 캐릭터를 누르면 대사가 바뀐다: <button data-lines-ko="a|b" data-lines-en="a|b" data-bubble="#id">
  document.querySelectorAll('[data-lines-ko]').forEach(function (el) {
    var i = 0;
    var bubble = document.querySelector(el.getAttribute('data-bubble'));
    if (!bubble) return;
    el.addEventListener('click', function () {
      var ko = el.getAttribute('data-lines-ko').split('|');
      var en = (el.getAttribute('data-lines-en') || '').split('|');
      i = (i + 1) % ko.length;
      var k = bubble.querySelector('.lang-ko'), e = bubble.querySelector('.lang-en');
      if (k) k.textContent = ko[i];
      if (e) e.textContent = en[i] || ko[i];
      bubble.classList.remove('pop'); void bubble.offsetWidth; bubble.classList.add('pop');
    });
  });

  // ── 프로필 정면/3/4/옆 전환: [data-turnaround] 안의 .pose[data-pose] + [data-pose-btn]
  var box = document.querySelector('[data-turnaround]');
  if (box) {
    var btns = document.querySelectorAll('[data-pose-btn]');
    var show = function (key) {
      box.querySelectorAll('.pose').forEach(function (p) {
        var on = p.getAttribute('data-pose') === key;
        p.classList.toggle('is-on', on);
        if (on) p.removeAttribute('aria-hidden'); else p.setAttribute('aria-hidden', 'true');
      });
      btns.forEach(function (b) {
        var on = b.getAttribute('data-pose-btn') === key;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', String(on));
      });
    };
    btns.forEach(function (b) {
      b.addEventListener('click', function () { show(b.getAttribute('data-pose-btn')); });
    });
  }
})();
