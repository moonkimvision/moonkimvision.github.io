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

  // ── 홈 캐릭터 무대: [data-stage] 안의 .cast[data-cast] (그룹마다 하나) + 에피소드 바 [data-ep-set] .ep-chip[data-ep]
  //    대본은 #stage-episodes JSON ({그룹 id: [episodes[].scene, ...]}). 화살표·스와이프로 그룹을 넘긴다.
  var stage = document.querySelector('[data-stage]');
  if (stage) {
    var scripts = {};
    try { scripts = JSON.parse(document.getElementById('stage-episodes').textContent); } catch (e) {}
    var casts = [].slice.call(stage.querySelectorAll('[data-cast]'));
    var sets = [].slice.call(document.querySelectorAll('[data-ep-set]'));
    var copies = [].slice.call(document.querySelectorAll('[data-copy]'));  // 히어로 왼쪽 글 (그룹마다)
    var caption = stage.querySelector('[data-caption]');
    var cur = 0, timer = null, playing = null, autoTimer = null;

    var say = function (el, line) {
      el.querySelector('.lang-ko').textContent = line.ko;
      el.querySelector('.lang-en').textContent = line.en || line.ko;
      el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
    };
    // 한 줄이 떠 있는 시간: 글자 수에 비례 (짧은 "…" 한마디도 읽을 틈은 준다)
    var holdFor = function (line) {
      if (line.pause) return line.pause;
      var t = 900 + (line.ko || '').length * 110 + (line.who === 'narr' ? 500 : 0);
      return Math.min(Math.max(t, 1100), 3600);
    };
    // 말 꺼내기 전 틈: 동생·노 책임처럼 "…"로 시작하는 대사는 반 박자 늦게
    var leadFor = function (line) { return /^…/.test(line.ko || '') ? 550 : 180; };

    var chipsOf = function (i) { return [].slice.call(sets[i].querySelectorAll('.ep-chip')); };
    var stop = function () {
      clearTimeout(timer); clearTimeout(autoTimer);
      if (playing) {
        playing.chip.classList.remove('is-playing');
        playing.chip.style.removeProperty('--p');
      }
      playing = null;
      stage.classList.remove('is-playing');
    };
    var finish = function () {
      var chip = playing.chip;
      stop();
      chip.classList.add('is-seen');
      caption.hidden = true;
      casts[cur].querySelectorAll('.bubble').forEach(function (b) { b.classList.remove('is-dim'); });
    };
    var step = function () {
      var p = playing, line = p.scene[p.i];
      if (!line) { timer = setTimeout(finish, 1400); return; }
      timer = setTimeout(function () {
        var cast = casts[cur];
        if (line.who === 'narr') {
          say(caption, line);
          caption.hidden = false;
          cast.querySelectorAll('.bubble').forEach(function (b) { b.classList.add('is-dim'); });
        } else if (line.who) {
          caption.hidden = true;
          cast.querySelectorAll('.bubble').forEach(function (b) {
            var me = b.getAttribute('data-bubble-for') === line.who;
            b.classList.toggle('is-dim', !me);
            if (me) { b.classList.remove('is-empty'); say(b, line); }
          });
          var who = cast.querySelector('[data-member="' + line.who + '"]');
          if (who) { who.classList.remove('is-talking'); void who.offsetWidth; who.classList.add('is-talking'); }
        }
        p.i += 1;
        p.chip.style.setProperty('--p', p.i / p.scene.length);
        timer = setTimeout(step, holdFor(line));
      }, line.pause ? 0 : leadFor(line));
    };
    var play = function (chip) {
      stop();
      var scene = (scripts[casts[cur].getAttribute('data-cast')] || [])[+chip.getAttribute('data-ep')];
      if (!scene || !scene.length) return;
      playing = { chip: chip, scene: scene, i: 0 };
      chip.classList.add('is-playing');
      stage.classList.add('is-playing');
      caption.hidden = true;
      casts[cur].querySelectorAll('.bubble').forEach(function (b) { b.classList.add('is-empty'); b.classList.remove('is-dim'); });
      step();
    };
    // 아직 안 본 다음 회차 (다 봤으면 처음부터)
    var nextChip = function () {
      var chips = chipsOf(cur);
      return chips.filter(function (c) { return !c.classList.contains('is-seen'); })[0] || chips[0];
    };
    var show = function (i, dir) {
      stop();
      cur = (i + casts.length) % casts.length;
      casts.forEach(function (c, k) {
        c.hidden = k !== cur;
        c.classList.remove('enter-next', 'enter-prev');
      });
      sets.forEach(function (s, k) { s.hidden = k !== cur; });
      copies.forEach(function (c, k) {
        c.hidden = k !== cur;
        c.classList.remove('enter-next', 'enter-prev');
        if (k === cur && dir) { void c.offsetWidth; c.classList.add(dir > 0 ? 'enter-next' : 'enter-prev'); }
      });
      caption.hidden = true;
      if (dir) { void casts[cur].offsetWidth; casts[cur].classList.add(dir > 0 ? 'enter-next' : 'enter-prev'); }
      var chip = nextChip();
      if (chip) autoTimer = setTimeout(function () { play(chip); }, 700);
    };

    document.querySelectorAll('[data-ep-set] .ep-chip').forEach(function (chip) {
      chip.addEventListener('click', function () { play(chip); });
    });
    // 캐릭터를 누르면: 재생 중이면 다음 줄로 넘기고, 아니면 다음 회차 재생
    stage.querySelectorAll('[data-member]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (playing) { clearTimeout(timer); step(); return; }
        var chip = nextChip();
        if (chip) play(chip);
      });
    });
    stage.querySelectorAll('[data-cast-step]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var d = +btn.getAttribute('data-cast-step');
        show(cur + d, d);
      });
    });
    var x0 = null, y0 = 0;
    stage.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (x0 === null || casts.length < 2) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    });

    // 처음 들어오면 첫 회차를 한 번 틀어 준다
    var first = nextChip();
    if (first) autoTimer = setTimeout(function () { play(first); }, 1200);
  }

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
