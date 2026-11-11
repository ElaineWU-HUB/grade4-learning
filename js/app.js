/* ============================================================
   四年级学习小站 · 应用引擎
   页面渲染 / 测验判分 / 学习进度(本地存储) / 趣味功能
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 基础工具 ---------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  /* ---------- 科目注册表 ---------- */
  var SUBJECTS = {
    chinese: window.CHINESE_DATA,
    math: window.MATH_DATA,
    english: window.ENGLISH_DATA,
    history: window.HISTORY_DATA,
    geography: window.GEOGRAPHY_DATA,
    humanities: window.HUMANITIES_DATA,
    science: window.SCIENCE_DATA
  };
  var ORDER = ['chinese', 'math', 'english', 'history', 'geography', 'humanities', 'science'];

  /* ---------- 学习进度(本地存储) ---------- */
  var MEMORY = {};                 // localStorage 不可用时的后备
  var LS_KEY = 'wxy_progress_v1';
  function loadProgress() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* 忽略 */ }
    return {};
  }
  function saveProgress(p) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(p)); } catch (e) { MEMORY = p; }
  }
  function unitId(subjId, semIdx, unitIdx) { return subjId + '-s' + semIdx + '-u' + unitIdx; }
  function getUnitState(subjId, semIdx, unitIdx) {
    var p = loadProgress();
    return p[unitId(subjId, semIdx, unitIdx)] || { done: false, best: null };
  }
  function setUnitState(subjId, semIdx, unitIdx, state) {
    var p = loadProgress();
    p[unitId(subjId, semIdx, unitIdx)] = state;
    saveProgress(p);
  }
  /** 星星数:打卡1星;测验≥60%再+1星;满分再+1星(最多3星) */
  function starsFor(state) {
    var s = state && state.done ? 1 : 0;
    if (state && state.best != null) {
      if (state.best >= 1) s = 3;
      else if (state.best >= 0.6) s = Math.max(s, 2);
    }
    return s;
  }
  function starsHTML(n) {
    var out = '';
    for (var i = 1; i <= 3; i++) out += i <= n
      ? '<span class="star-pop" style="animation-delay:' + (i * 0.12) + 's">⭐</span>'
      : '<span class="off">☆</span>';
    return '<span class="stars">' + out + '</span>';
  }

  /* ---------- 每日一句 ---------- */
  var QUOTES = [
    ['天行健,君子以自强不息。', '《周易》'],
    ['好问则裕,自用则小。', '《尚书》'],
    ['博学之,审问之,慎思之,明辨之,笃行之。', '《礼记》'],
    ['人非生而知之者,孰能无惑?', '韩愈'],
    ['莫愁前路无知己,天下谁人不识君。', '高适'],
    ['不识庐山真面目,只缘身在此山中。', '苏轼'],
    ['梅须逊雪三分白,雪却输梅一段香。', '卢钺'],
    ['生当作人杰,死亦为鬼雄。', '李清照'],
    ['少年不知勤学苦,老来方知读书迟。', '谚语'],
    ['书山有路勤为径,学海无涯苦作舟。', '谚语'],
    ['机不可失,时不再来。', '谚语'],
    ['尺有所短,寸有所长。', '谚语'],
    ['温故而知新,可以为师矣。', '《论语》'],
    ['三人行,必有我师焉。', '《论语》'],
    ['敏而好学,不耻下问。', '《论语》'],
    ['胜人者有力,自胜者强。', '《老子》'],
    ['千里之行,始于足下。', '《老子》']
  ];
  function initDailyQuote() {
    var box = document.getElementById('dailyQuote');
    if (!box) return;
    var q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    box.innerHTML = '<div class="qt">“' + esc(q[0]) + '”</div><div class="ql">—— ' + esc(q[1]) + '</div>';
  }

  /* ---------- 撒花 ---------- */
  function confetti() {
    var colors = ['#f5b301', '#e8590c', '#1971c2', '#2f9e44', '#d6336c', '#9775fa', '#22b8cf'];
    for (var i = 0; i < 70; i++) {
      var p = document.createElement('div');
      p.className = 'confetti-piece';
      p.style.left = (Math.random() * 100) + 'vw';
      p.style.background = colors[i % colors.length];
      p.style.animationDuration = (2 + Math.random() * 2.5) + 's';
      p.style.animationDelay = (Math.random() * 0.8) + 's';
      p.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
      document.body.appendChild(p);
      (function (node) { setTimeout(function () { node.remove(); }, 5500); })(p);
    }
  }
  var PRAISES = ['太棒了!你真是小学霸!🏆', '满分!继续保持!🌟', '厉害!全对啦!🎉', '完美!给你点一百个赞!👍', '哇!你是今天的闯关王!👑'];
  function praise() { return PRAISES[Math.floor(Math.random() * PRAISES.length)]; }

  /* ============================================================
     首页
     ============================================================ */
  function subjectCardsHTML() {
    var p = loadProgress();
    var html = '';
    ORDER.forEach(function (id) {
      var s = SUBJECTS[id];
      var total = 0, done = 0, stars = 0;
      s.semesters.forEach(function (sem, si) {
        sem.units.forEach(function (u, ui) {
          total++;
          var st = p[unitId(id, si, ui)] || { done: false, best: null };
          if (st.done) done++;
          stars += starsFor(st);
        });
      });
      var pct = total ? Math.round(done / total * 100) : 0;
      html +=
        '<a class="subject-card" style="--sc:' + s.color + '" href="learn.html#/' + id + '">' +
          '<div class="emoji">' + s.emoji + '</div>' +
          '<h2>' + esc(s.name) + '</h2>' +
          '<div class="desc">' + esc(s.desc) + '</div>' +
          '<div class="progress-track"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
          '<div class="meta"><span>已完成 ' + done + '/' + total + ' 单元</span>' +
          '<span>' + starsHTML(stars) + '</span></div>' +
        '</a>';
    });
    return html;
  }
  function initHome() {
    initDailyQuote();
    initMascot();
    var grid = document.getElementById('subjectCards');
    if (grid) grid.innerHTML = subjectCardsHTML();
    var tc = document.getElementById('todayCard');
    if (tc) tc.innerHTML = todayCardHTML();
  }

  /* ---------- 今日闯关推荐(首页):自动找到下一个未完成的单元 ---------- */
  function todayCardHTML() {
    for (var oi = 0; oi < ORDER.length; oi++) {
      var s = SUBJECTS[ORDER[oi]];
      for (var si = 0; si < s.semesters.length; si++) {
        for (var ui = 0; ui < s.semesters[si].units.length; ui++) {
          if (!getUnitState(s.id, si, ui).done) {
            var u = s.semesters[si].units[ui];
            return '<a class="today-card" href="learn.html#/' + s.id + '/s' + si + '/u' + ui + '">' +
              '<div class="t-emoji">' + ((window.UNIT_EMOJI || {})[unitId(s.id, si, ui)] || '⭐') + '</div>' +
              '<div class="t-mid"><div class="t-title">🌟 今日闯关推荐</div>' +
              '<div class="t-desc">' + s.emoji + ' ' + esc(s.semesters[si].name) + ' · ' + esc(u.name) +
              ' —— 点击开始今天的学习!</div></div>' +
              '<div class="t-go">GO ›</div></a>';
          }
        }
      }
    }
    return '';
  }

  /* ---------- 猫头鹰老师吉祥物:轮换学习小贴士 ---------- */
  var MASCOT_TIPS = [
    '每天进步一点点,星星就会连成片 ⭐',
    '写字要"三个一":眼离书本一尺,胸离桌边一拳,手离笔尖一寸 ✍️',
    '学完当天复习一遍,记忆会更牢哦 🧠',
    '读书有三到:心到、眼到、口到 📖',
    '数学要多动笔,算一算比看一看管用 ✏️',
    '英语大声读出来,记得又快又准 🗣️',
    '遇到难题先自己想一想,实在不会再来找老师 🤔',
    '做完题记得检查一遍,就能少出错 ✅',
    '跳绳、跑步也能让大脑更聪明 🏃',
    '早睡早起,学习更有精神 🌞'
  ];
  function initMascot() {
    var tip = document.getElementById('mascotTip');
    if (!tip) return;
    var i = Math.floor(Math.random() * MASCOT_TIPS.length);
    tip.textContent = MASCOT_TIPS[i];
    setInterval(function () {
      i = (i + 1) % MASCOT_TIPS.length;
      tip.classList.add('fade');
      setTimeout(function () {
        tip.textContent = MASCOT_TIPS[i];
        tip.classList.remove('fade');
      }, 350);
    }, 7000);
  }

  /* ============================================================
     学习页路由
     ============================================================ */
  function startLearn() {
    buildSidebar();
    var tog = document.getElementById('sideToggle');
    if (tog) tog.addEventListener('click', function () {
      document.body.classList.toggle('side-open');
    });
    window.addEventListener('hashchange', function () {
      document.body.classList.remove('side-open');
      route();
    });
    // 点侧栏以外的地方(遮罩)收起抽屉
    document.addEventListener('click', function (e) {
      if (document.body.classList.contains('side-open') &&
          !e.target.closest('#sidebar') && !e.target.closest('#sideToggle')) {
        document.body.classList.remove('side-open');
      }
    });
    route();
  }

  /* ---------- 左侧书签导航栏 ---------- */
  function buildSidebar() {
    var nav = document.getElementById('sideNav');
    if (!nav) return;
    var html = '<div class="side-head">📚 学习目录</div>' +
      '<a class="side-link side-home" href="index.html"><span class="sl-ico">🏠</span><span>回到首页</span></a>';
    ORDER.forEach(function (id) {
      var s = SUBJECTS[id];
      var total = 0, done = 0;
      s.semesters.forEach(function (sem, si) {
        sem.units.forEach(function (u, ui) {
          total++;
          if (getUnitState(id, si, ui).done) done++;
        });
      });
      html += '<div class="side-group" style="--sc:' + s.color + ';--scs:' + s.soft + '">' +
        '<button class="side-grp" type="button">' +
          '<span class="grp-ico">' + s.emoji + '</span>' +
          '<span class="grp-name">' + esc(s.name) + '</span>' +
          '<span class="grp-prog">' + done + '/' + total + '</span>' +
          '<span class="caret">▾</span>' +
        '</button>' +
        '<div class="side-sub">';
      s.semesters.forEach(function (sem, si) {
        html += '<div class="side-sem-group">' +
          '<button class="side-sem" type="button">📗 ' + esc(sem.name) + '<span class="caret">▸</span></button>' +
          '<div class="side-units">';
        sem.units.forEach(function (u, ui) {
          var uid2 = unitId(id, si, ui);
          html += '<a class="side-unit" href="#/' + id + '/s' + si + '/u' + ui + '">' +
            '<span class="u-ico">' + ((window.UNIT_EMOJI || {})[uid2] || '📖') + '</span>' +
            '<span class="u-name">' + esc(u.name) + '</span>' +
            (getUnitState(id, si, ui).done ? '<span class="u-done">✓</span>' : '') +
            '</a>';
        });
        html += '</div></div>';
      });
      var topics = s.topics.concat((window.EXTRA_TOPICS || {})[id] || []);
      if (topics.length) {
        html += '<div class="side-sem-group">' +
          '<button class="side-sem" type="button">🧩 专题复习<span class="caret">▸</span></button>' +
          '<div class="side-units">';
        topics.forEach(function (t, ti) {
          html += '<a class="side-unit" href="#/' + id + '/t' + ti + '">' +
            '<span class="u-ico">' + (t.icon || '🧩') + '</span><span class="u-name">' + esc(t.name) + '</span></a>';
        });
        html += '</div></div>';
      }
      html += '</div></div>';
    });
    html += '<a class="side-link" id="sideRead" href="#/chinese/reading"><span class="sl-ico">📖</span><span>每日一读</span></a>' +
      '<a class="side-link" id="sideCalc" href="#/math/calc"><span class="sl-ico">🧮</span><span>每日计算</span></a>' +
      '<a class="side-link" id="sideListen" href="#/english/listening"><span class="sl-ico">🎧</span><span>每日听力</span></a>' +
      '<a class="side-link" href="#/scores"><span class="sl-ico">⭐</span><span>我的成绩</span></a>' +
      '<a class="side-link" href="#/math/game"><span class="sl-ico">🏎️</span><span>口算大挑战</span></a>';
    nav.innerHTML = html;

    nav.addEventListener('click', function (e) {
      var grpBtn = e.target.closest('.side-grp');
      if (grpBtn) { grpBtn.parentElement.classList.toggle('open'); return; }
      var semBtn = e.target.closest('.side-sem');
      if (semBtn) { semBtn.closest('.side-sem-group').classList.toggle('open'); return; }
      if (e.target.closest('.side-unit')) document.body.classList.remove('side-open');
    });
  }

  function updateSidebar(r) {
    var outline = document.getElementById('sideOutline');
    document.querySelectorAll('#sideNav .side-unit').forEach(function (a) { a.classList.remove('on'); });
    document.querySelectorAll('#sideNav .side-link').forEach(function (a) { a.classList.remove('on'); });
    if (r.view === 'unit') {
      var sel = '#sideNav a[href="#/' + r.subj + '/s' + r.sem + '/u' + r.unit + '"]';
      var link = document.querySelector(sel);
      if (link) {
        link.classList.add('on');
        var grp = link.closest('.side-group');
        if (grp) grp.classList.add('open');
        var semBox = link.closest('.side-sem-group');
        if (semBox) semBox.classList.add('open');
      }
    } else {
      var dailyId = { reading: 'sideRead', calc: 'sideCalc', listening: 'sideListen' }[r.view];
      if (dailyId) {
        var dl = document.getElementById(dailyId);
        if (dl) dl.classList.add('on');
      }
    }

    // 本页书签:任何页面只要有 h2.section-title 就生成
    var app = document.getElementById('app');
    if (outline && app) {
      var titles = app.querySelectorAll('h2.section-title');
      var html = '<div class="outline-t">📑 本页书签</div>';
      titles.forEach(function (h, i) {
        h.id = 'sec' + i;
        html += '<a class="outline-item" data-target="sec' + i + '">' +
          '<span class="o-n">' + (i + 1) + '</span><span class="o-t">' + esc(h.textContent) + '</span></a>';
      });
      outline.innerHTML = titles.length ? html : '';
      outline.querySelectorAll('.outline-item').forEach(function (a) {
        a.addEventListener('click', function () {
          var el = document.getElementById(a.getAttribute('data-target'));
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          document.body.classList.remove('side-open');
        });
      });
    }
  }

  function parseHash() {
    // #/subject[/sN[/uN]]  #/subject/tN  #/scores  #/math/game
    // #/chinese/reading  #/math/calc  #/english/listening
    var h = location.hash.replace(/^#\/?/, '');
    var parts = h.split('/').filter(Boolean);
    if (!parts.length) return { view: 'home' };
    if (parts[0] === 'scores') return { view: 'scores' };
    var subj = parts[0];
    if (SUBJECTS[subj]) {
      if (parts[1] === 'game' && subj === 'math') return { view: 'game', subj: subj };
      if (parts[1] === 'reading' && subj === 'chinese') return { view: 'reading', subj: subj };
      if (parts[1] === 'calc' && subj === 'math') return { view: 'calc', subj: subj };
      if (parts[1] === 'listening' && subj === 'english') return { view: 'listening', subj: subj };
      if (parts[1] && parts[1][0] === 't') return { view: 'topic', subj: subj, topic: +parts[1].slice(1) };
      if (parts[1] && parts[1][0] === 's') {
        var sem = +parts[1].slice(1);
        if (parts[2] && parts[2][0] === 'u') {
          return { view: 'unit', subj: subj, sem: sem, unit: +parts[2].slice(1) };
        }
        return { view: 'semester', subj: subj, sem: sem };
      }
      return { view: 'subject', subj: subj };
    }
    return { view: 'home' };
  }

  function route() {
    var r = parseHash();
    var app = document.getElementById('app');
    if (!app) return;

    // 导航高亮 + 主题色
    document.body.removeAttribute('data-subject');
    var navLinks = qs('#mainNav') ? qs('#mainNav').querySelectorAll('a') : [];
    navLinks.forEach(function (a) { a.classList.remove('active'); });
    if (r.subj && SUBJECTS[r.subj]) {
      var s = SUBJECTS[r.subj];
      document.body.setAttribute('data-subject', r.subj);
      document.body.style.setProperty('--subj', s.color);
      document.body.style.setProperty('--subj-soft', s.soft);
      navLinks.forEach(function (a) {
        if (a.getAttribute('href') === '#/' + r.subj) a.classList.add('active');
      });
    } else if (r.view === 'scores') {
      navLinks.forEach(function (a) {
        if (a.getAttribute('href') === '#/scores') a.classList.add('active');
      });
    }

    switch (r.view) {
      case 'home': renderHome(app); break;
      case 'scores': renderScores(app); break;
      case 'game': renderGame(app, r.subj); break;
      case 'subject': renderSubject(app, r.subj); break;
      case 'semester': renderSemester(app, r.subj, r.sem); break;
      case 'unit': renderUnit(app, r.subj, r.sem, r.unit); break;
      case 'topic': renderTopic(app, r.subj, r.topic); break;
      case 'reading': renderDailyReading(app); break;
      case 'calc': renderDailyCalc(app); break;
      case 'listening': renderDailyListening(app); break;
    }
    updateSidebar(r);
    window.scrollTo(0, 0);
  }

  /* ============================================================
     科目主页 / 学期页(单元闯关地图)
     ============================================================ */
  function renderHome(app) {
    app.innerHTML =
      '<div class="breadcrumb"><a href="index.html">首页</a><span class="sep">›</span>学习地图</div>' +
      '<h1 class="page-title">🗺️ 学习地图</h1>' +
      '<p class="page-sub">选择一个科目,开始今天的闯关吧!</p>' +
      '<div class="subject-grid">' + subjectCardsHTML() + '</div>';
  }

  function subjectShell(app, subj, breadcrumbHTML, titleHTML, innerHTML) {
    app.innerHTML =
      '<div class="breadcrumb">' + breadcrumbHTML + '</div>' +
      '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">' + titleHTML + '</div>' +
      innerHTML;
  }

  function unitListHTML(subjId, semIdx) {
    var s = SUBJECTS[subjId];
    var sem = s.semesters[semIdx];
    var out = '<div class="unit-list">';
    sem.units.forEach(function (u, ui) {
      var st = getUnitState(subjId, semIdx, ui);
      var stars = starsFor(st);
      var emoji = (window.UNIT_EMOJI || {})[unitId(subjId, semIdx, ui)] || (ui + 1);
      var stateHTML = st.done
        ? '<span class="state"><span class="done">✅ 已闯关</span> ' + starsHTML(stars) + '</span>'
        : '<span class="state">🌟 待闯关</span>';
      out +=
        '<a class="unit-card' + (st.done ? ' is-done' : '') + '" href="#/' + subjId + '/s' + semIdx + '/u' + ui + '">' +
          '<span class="no">' + emoji + '</span>' +
          '<span class="info"><b>' + esc(u.name) + '</b><span>' + esc(u.goal || u.tagline || '') + '</span></span>' +
          stateHTML +
        '</a>';
    });
    out += '</div>';
    return out;
  }

  function renderSubject(app, subjId) {
    var s = SUBJECTS[subjId];
    // 默认进入第一个还有未完成单元的学期
    var semIdx = 0;
    for (var si = 0; si < s.semesters.length; si++) {
      var anyIncomplete = s.semesters[si].units.some(function (u, ui) {
        return !getUnitState(subjId, si, ui).done;
      });
      if (anyIncomplete) { semIdx = si; break; }
    }
    renderSemester(app, subjId, semIdx, true);
  }

  function renderSemester(app, subjId, semIdx, keepHash) {
    var s = SUBJECTS[subjId];
    if (!s.semesters[semIdx]) semIdx = 0;
    var sem = s.semesters[semIdx];
    document.body.style.setProperty('--subj', s.color);
    document.body.style.setProperty('--subj-soft', s.soft);

    var tabs = s.semesters.map(function (sm, i) {
      var active = i === semIdx;
      if (active && keepHash) return '<button class="tab active" disabled>' + esc(sm.name) + '</button>';
      return '<a class="tab' + (active ? ' active' : '') + '" href="#/' + subjId + '/s' + i + '">' + esc(sm.name) + '</a>';
    }).join('');

    var topics = s.topics.concat((window.EXTRA_TOPICS || {})[subjId] || []);
    var topicCards = topics.map(function (t, ti) {
      return '<a class="unit-card" href="#/' + subjId + '/t' + ti + '">' +
        '<span class="no">' + (t.icon || '🧩') + '</span>' +
        '<span class="info"><b>' + esc(t.name) + '</b><span>' + esc(t.intro || '') + '</span></span>' +
        '<span class="state">查看 ›</span></a>';
    }).join('');

    var gameHTML = subjId === 'math'
      ? '<h2 class="section-title">⚡ 趣味闯关</h2>' +
        '<a class="unit-card" href="#/math/game">' +
        '<span class="no">🏎️</span>' +
        '<span class="info"><b>口算大挑战</b><span>60 秒倒计时,看看你能算对几道题!</span></span>' +
        '<span class="state">开始 ›</span></a>'
      : '';

    var dailyHTML = subjId === 'chinese'
      ? '<h2 class="section-title">📅 每日积累</h2>' +
        '<a class="unit-card" href="#/chinese/reading">' +
        '<span class="no">📖</span>' +
        '<span class="info"><b>每日一读</b><span>每天一篇经典散文或小古文,积累语感!</span></span>' +
        '<span class="state">去读 ›</span></a>'
      : subjId === 'math'
      ? '<h2 class="section-title">📅 每日练习</h2>' +
        '<a class="unit-card" href="#/math/calc">' +
        '<span class="no">🧮</span>' +
        '<span class="info"><b>每日计算 20 题</b><span>每天一页口算练习,夯实计算基本功!</span></span>' +
        '<span class="state">去算 ›</span></a>'
      : subjId === 'english'
      ? '<h2 class="section-title">📅 每日听说</h2>' +
        '<a class="unit-card" href="#/english/listening">' +
        '<span class="no">🎧</span>' +
        '<span class="info"><b>每日听力</b><span>每天一篇英语短文,人声朗读,边听边读!</span></span>' +
        '<span class="state">去听 ›</span></a>'
      : '';

    var reading = (window.READING || {})[subjId] || [];
    var readingHTML = reading.length
      ? '<h2 class="section-title">📚 课外阅读推荐</h2>' +
        '<div class="reading-grid">' +
        reading.map(function (r) {
          return '<div class="reading-card"><div class="rname">' + esc(r.name) + '</div>' +
            '<div class="rnote">' + esc(r.note) + '</div></div>';
        }).join('') +
        '</div>'
      : '';

    subjectShell(app, subjId,
      '<a href="index.html">首页</a><span class="sep">›</span>' + esc(s.name),
      '<h1 class="page-title">' + s.emoji + ' ' + esc(s.name) + '</h1>' +
        '<p class="page-sub" style="margin:0;">' + esc(s.desc) + '</p>',
      '<div class="tabs">' + tabs + '</div>' +
      '<h2 class="section-title">🗺️ ' + esc(sem.name) + ' 闯关地图</h2>' +
      unitListHTML(subjId, semIdx) +
      '<h2 class="section-title">🧩 专题复习(体系化知识)</h2>' +
      '<div class="unit-list">' + topicCards + '</div>' +
      dailyHTML +
      gameHTML +
      readingHTML
    );
  }

  /* ============================================================
     单元详情页
     ============================================================ */
  function renderUnit(app, subjId, semIdx, unitIdx) {
    var s = SUBJECTS[subjId];
    var sem = s.semesters[semIdx];
    var u = sem.units[unitIdx];
    if (!u) { renderSubject(app, subjId); return; }
    document.body.style.setProperty('--subj', s.color);
    document.body.style.setProperty('--subj-soft', s.soft);

    var st = getUnitState(subjId, semIdx, unitIdx);
    var uid = unitId(subjId, semIdx, unitIdx);
    var uemoji = (window.UNIT_EMOJI || {})[uid] || '';
    var html =
      '<div class="breadcrumb">' +
        '<a href="index.html">首页</a><span class="sep">›</span>' +
        '<a href="#/' + subjId + '">' + esc(s.name) + '</a><span class="sep">›</span>' +
        '<a href="#/' + subjId + '/s' + semIdx + '">' + esc(sem.name) + '</a><span class="sep">›</span>' +
        esc(u.name) +
      '</div>' +
      '<div class="unit-head">' +
        '<div>' + ((window.UNIT_SCENE || {})[uid] ? '<div class="scene">' + (window.UNIT_SCENE || {})[uid] + '</div>' : '') +
        '<h1 class="page-title">' + uemoji + ' ' + esc(u.name) + '</h1>' +
        (u.goal ? '<div class="unit-goal">🎯 <b>闯关任务:</b>' + esc(u.goal) + '</div>' : '') +
        '</div>' +
        '<div class="no-print" style="text-align:center;">' +
          starsHTML(starsFor(st)) +
          '<div style="margin-top:6px;"><button class="btn btn-small ' + (st.done ? 'btn-primary' : 'btn-ghost') + '" id="btnDone">' +
          (st.done ? '✅ 已学会,取消打卡' : '✅ 我学会了,打卡!') + '</button></div>' +
        '</div>' +
      '</div>';

    // 课文 / 知识点 / 词汇句型
    if (u.texts) html += renderTexts(u.texts, subjId);
    if (u.poems) html += renderPoems(u.poems);
    if (u.points) html += renderPoints(u.points);
    if (u.words || u.sentences) html += renderEnglishParts(u);
    if (u.garden) html += renderGarden(u.garden);
    if (u.writing) html += renderWriting(u.writing);

    // 课外小拓展(教材之外的趣味补充知识)
    var extras = (window.EXTRAS || {})[uid];
    if (extras && extras.length) html += renderExtras(extras);

    // 配套视频讲解(来自B站,联网观看)
    var videos = (window.UNIT_VIDEOS || {})[uid];
    if (videos && videos.length) html += renderVideos(videos);

    // 奥数思维挑战(数学单元专属:课本知识的升级版,不计入星星)
    var olyQs = (window.OLYMPIAD || {})[uid];
    if (olyQs && olyQs.length) {
      html +=
        '<h2 class="section-title">🏆 奥数思维挑战</h2>' +
        '<div class="oly-note">🧠 这里是「' + esc(u.name) + '」知识的升级挑战题,全部用四年级学过的办法就能解出来!' +
        '不用着急,慢慢想,画一画、列一列都是好办法。挑战成绩不记入星星,敢挑战就是胜利!</div>' +
        '<div class="quiz-actions no-print">' +
          '<button class="btn btn-primary" id="btnOlyPractice">🧠 尝试挑战(可看思路)</button>' +
          '<button class="btn btn-ghost" id="btnOlyTest">🏆 挑战评测</button>' +
        '</div>' +
        '<div id="olympiadArea"></div>';
    }

    // 练习与测验(课本练习题 + 增补题)
    var practice = u.practice.concat((window.EXTRA_QUESTIONS || {})[uid] || []);
    if (practice && practice.length) {
      html +=
        '<h2 class="section-title">📝 练习与测验</h2>' +
        '<div class="quiz-actions no-print" id="quizActions">' +
          '<button class="btn btn-primary" id="btnPractice">📝 练习模式(可看答案)</button>' +
          '<button class="btn btn-ghost" id="btnTest">🏆 测验模式(自动判分)</button>' +
          '<button class="btn btn-ghost" id="btnPrint">🖨️ 打印练习卷</button>' +
          '<button class="btn btn-ghost" id="btnPrintA">🖨️ 打印(含答案)</button>' +
        '</div>' +
        '<div id="quizArea"></div>';
    }

    app.innerHTML = html;

    // 视频播放按钮(点击后内嵌B站播放器)
    app.querySelectorAll('[data-bvid]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.closest('.video-card');
        var frame = card ? card.querySelector('.video-frame') : null;
        if (!frame) return;
        btn.remove();
        frame.innerHTML =
          '<iframe src="https://player.bilibili.com/player.html?bvid=' +
          encodeURIComponent(btn.getAttribute('data-bvid')) +
          '&page=1&high_quality=1&danmaku=0" scrolling="no" allowfullscreen="true"></iframe>';
      });
    });

    // 打卡按钮
    var btnDone = document.getElementById('btnDone');
    if (btnDone) btnDone.addEventListener('click', function () {
      var st2 = getUnitState(subjId, semIdx, unitIdx);
      st2.done = !st2.done;
      setUnitState(subjId, semIdx, unitIdx, st2);
      if (st2.done) confetti();
      renderUnit(app, subjId, semIdx, unitIdx);
    });

    // 测验区域
    var area = document.getElementById('quizArea');
    if (area) {
      initQuizArea(area, practice, subjId, semIdx, unitIdx);
      document.getElementById('btnPractice').addEventListener('click', function () {
        initQuizArea(area, practice, subjId, semIdx, unitIdx, 'practice');
      });
      document.getElementById('btnTest').addEventListener('click', function () {
        initQuizArea(area, practice, subjId, semIdx, unitIdx, 'test');
      });
    }

    // 奥数挑战区域(独立引擎实例,成绩存 'xxx-olym' 键,不影响单元星星)
    var olyArea = document.getElementById('olympiadArea');
    if (olyArea && olyQs && olyQs.length) {
      initQuizArea(olyArea, olyQs, subjId, semIdx, unitIdx, 'practice', 'olympiad');
      document.getElementById('btnOlyPractice').addEventListener('click', function () {
        initQuizArea(olyArea, olyQs, subjId, semIdx, unitIdx, 'practice', 'olympiad');
      });
      document.getElementById('btnOlyTest').addEventListener('click', function () {
        initQuizArea(olyArea, olyQs, subjId, semIdx, unitIdx, 'test', 'olympiad');
      });
    }

    window.scrollTo(0, 0);
  }

  /* ---------- 语文:课文卡 ---------- */
  function renderTexts(texts, subjId) {
    var out = '<h2 class="section-title">📖 课文学习</h2>';
    var stickers = ['🌟', '📚', '🖍️', '🎈', '🏅', '🍀'];
    texts.forEach(function (t, ti) {
      out += '<div class="card text-card">' +
        '<span class="sticker">' + stickers[ti % stickers.length] + '</span>' +
        '<h3>' + esc(t.title) + '</h3>' +
        (t.sub ? '<div class="sub">' + esc(t.sub) + '</div>' : '') +
        (t.summary ? '<p><b>内容大意:</b>' + esc(t.summary) + '</p>' : '') +
        (t.structure ? '<p><b>结构梳理:</b>' + esc(t.structure) + '</p>' : '') +
        (t.words && t.words.length ? '<b>重点字词:</b><div class="word-tags">' +
          t.words.map(function (w) {
            if (typeof w === 'string') return '<span class="word-tag">' + esc(w) + '</span>';
            return '<span class="word-tag"><b>' + esc(w.w) + '</b>' + (w.n ? ' <span style="color:var(--ink-2);font-size:13px;">' + esc(w.n) + '</span>' : '') + '</span>';
          }).join('') + '</div>' : '') +
        (t.points && t.points.length ? '<b>学习要点:</b><ul>' +
          t.points.map(function (p) { return '<li>' + (p.t ? '<b>' + esc(p.t) + '</b>:' : '') + esc(p.d) + '</li>'; }).join('') + '</ul>' : '') +
        (t.idea ? '<p><b>中心思想:</b>' + esc(t.idea) + '</p>' : '') +
        (t.pitfall ? '<div class="pitfall">⚠️ <b>易错提醒:</b>' + esc(t.pitfall) + '</div>' : '') +
        '</div>';
    });
    return out;
  }

  /* ---------- 语文:古诗卡(原文+注释+译文) ---------- */
  function renderPoems(poems) {
    var out = '<h2 class="section-title">🖋️ 古诗文必背</h2>';
    poems.forEach(function (p) {
      out += '<div class="card poem">' +
        '<h3>' + esc(p.title) + '</h3>' +
        '<div class="dynasty">[' + esc(p.dynasty) + '] ' + esc(p.author) + (p.source ? ' · 选自' + esc(p.source) : '') + '</div>' +
        '<div class="poem-text">' + esc(p.text).replace(/\n/g, '<br>') + '</div>' +
        '<div class="blocks">' +
        (p.notes && p.notes.length ? '<div class="b"><b>重点注释</b><br>' +
          p.notes.map(function (n) { return '· ' + esc(n.w) + ':' + esc(n.d); }).join('<br>') + '</div>' : '') +
        (p.trans ? '<div class="b"><b>译文</b><br>' + esc(p.trans) + '</div>' : '') +
        (p.theme ? '<div class="b"><b>主旨</b><br>' + esc(p.theme) + '</div>' : '') +
        (p.tip ? '<div class="tip">🦉 猫头鹰老师:<br>' + esc(p.tip) + '</div>' : '') +
        '</div></div>';
    });
    return out;
  }

  /* ---------- 数学:知识点卡 ---------- */
  function renderPoints(points) {
    var out = '<h2 class="section-title">💡 知识点讲解</h2>';
    points.forEach(function (p, pi) {
      out += '<div class="card"><div class="point-card">' +
        '<span class="step-num">' + (pi + 1) + '</span>' +
        '<div class="pt">' + esc(p.t) + '</div>' +
        (p.d ? '<div class="def">' + esc(p.d) + '</div>' : '') +
        (p.ex ? '<div class="example"><b>例题:</b> ' + esc(p.ex.q) + (p.ex.s ? '<br><b>解答:</b> ' + esc(p.ex.s) : '') + '</div>' : '') +
        (p.pit ? '<div class="pitfall">⚠️ <b>易错点:</b>' + esc(p.pit) + '</div>' : '') +
        (p.tip ? '<div class="tip">🦉 猫头鹰老师:' + esc(p.tip) + '</div>' : '') +
        '</div></div>';
    });
    return out;
  }

  /* ---------- 英语:词汇/句型/语音/语法 ---------- */
  function renderEnglishParts(u) {
    var out = '';
    if (u.words && u.words.length) {
      out += '<h2 class="section-title">🔤 核心词汇</h2><div class="word-grid">';
      u.words.forEach(function (w, wi) {
        out += '<div class="word-chip' + (wi % 2 ? ' alt' : '') + '">' +
          '<div class="w-en">' + esc(w.en) + '</div>' +
          '<div class="w-cn">' + esc(w.cn) + '</div>' +
          (w.n ? '<div class="w-n">💬 ' + esc(w.n) + '</div>' : '') +
          '</div>';
      });
      out += '</div>';
    }
    if (u.sentences && u.sentences.length) {
      out += '<h2 class="section-title">💬 重点句型</h2>';
      u.sentences.forEach(function (snt) {
        out += '<div class="card" style="padding:12px 18px;margin-bottom:10px;">' +
          '<div style="font-weight:700;">' + esc(snt.en) + '</div>' +
          '<div style="color:var(--ink-2);font-size:15px;">' + esc(snt.cn) + '</div>' +
          (snt.n ? '<div class="tip" style="margin:8px 0 0;">🦉 ' + esc(snt.n) + '</div>' : '') +
          '</div>';
      });
    }
    if (u.phonics) {
      out += '<h2 class="section-title">🎵 语音(自然拼读)</h2><div class="card"><div class="point-card">' +
        '<div class="pt">' + esc(u.phonics.t) + '</div><div class="def">' + esc(u.phonics.d) + '</div></div></div>';
    }
    if (u.grammar) {
      out += '<h2 class="section-title">🧱 语法小课堂</h2><div class="card"><div class="point-card">' +
        '<div class="pt">' + esc(u.grammar.t) + '</div><div class="def">' + esc(u.grammar.d) + '</div></div></div>';
    }
    return out;
  }

  /* ---------- 语文园地 / 习作 ---------- */
  function renderGarden(g) {
    var out = '<h2 class="section-title">🪧 ' + esc(g.title || '语文园地') + '</h2>';
    (g.blocks || []).forEach(function (b) {
      out += '<div class="card"><div class="point-card">' +
        '<div class="pt">' + esc(b.t) + '</div>' +
        (b.d ? '<div class="def">' + esc(b.d).replace(/\n/g, '<br>') + '</div>' : '') +
        (b.items && b.items.length ? '<ul style="margin:6px 0;">' +
          b.items.map(function (it) { return '<li>' + esc(it) + '</li>'; }).join('') + '</ul>' : '') +
        '</div></div>';
    });
    return out;
  }
  function renderWriting(w) {
    var out = '<h2 class="section-title">✍️ ' + esc(w.title) + '</h2><div class="card">' +
      (w.steps && w.steps.length ? '<b>写作指导:</b><ul>' +
        w.steps.map(function (s2) { return '<li>' + esc(s2) + '</li>'; }).join('') + '</ul>' : '') +
      (w.sample ? '<div class="example"><b>好句示范:</b><br>' + esc(w.sample) + '</div>' : '') +
      '</div>';
    return out;
  }

  /* ---------- 课外小拓展 ---------- */
  function renderExtras(extras) {
    var out = '<h2 class="section-title">🌟 课外小拓展</h2>';
    extras.forEach(function (x) {
      out += '<div class="card extra-block">' +
        '<div class="ex-t">' + esc(x.t) + '</div>' +
        '<div class="ex-d">' + esc(x.d) + '</div>' +
        '</div>';
    });
    return out;
  }

  /* ---------- 视频讲解(B站内嵌,懒加载) ---------- */
  function renderVideos(videos) {
    var out = '<div class="no-print">' +
      '<h2 class="section-title">🎬 视频讲解</h2>' +
      '<p class="video-note">视频来自哔哩哔哩,是公开的课堂教学/微课资源。点击"播放"即可在本页观看;建议家长陪同,个别视频如下架请以课本为准。</p>' +
      '<div class="video-grid">';
    videos.forEach(function (v) {
      out += '<div class="video-card">' +
        '<div class="v-title">🎥 ' + esc(v.title) + '</div>' +
        (v.author ? '<div class="v-author">UP主:' + esc(v.author) + '</div>' : '') +
        '<button class="btn btn-small btn-primary" data-bvid="' + esc(v.bvid) + '">▶ 播放视频</button>' +
        '<div class="video-frame"></div>' +
        '</div>';
    });
    out += '</div></div>';
    return out;
  }

  /* ============================================================
     练习与测验引擎
     ============================================================ */
  function initQuizArea(area, questions, subjId, semIdx, unitIdx, mode, saveTo) {
    mode = mode || 'practice';
    var isOly = saveTo === 'olympiad';
    var answers = new Array(questions.length).fill(null);   // 用户作答
    var state = new Array(questions.length).fill(false);     // 是否已判分/显示

    area.innerHTML = '<div class="no-print" style="font-size:14.5px;color:var(--ink-2);margin-bottom:8px;">' +
      (mode === 'practice'
        ? (isOly
          ? '🧠 挑战模式:先自己想一想,做不出来可以点「看思路」,看看解析是怎么想的。'
          : '💡 练习模式:每道题做完可以点「对答案」,看看自己掌握得怎么样。')
        : (isOly
          ? '🏆 挑战评测:全部做完后点「提交批改」,看看你的奥数战绩!(挑战不记入单元星星)'
          : '🏆 测验模式:全部做完后点「提交批改」,自动判分赢星星!(建议独立完成,不要偷看答案哦)')) +
      '</div>' +
      '<div class="qList"></div>' +
      '<div class="quiz-actions no-print qaBtns"></div>' +
      '<div class="qaResult"></div>';

    var list = area.querySelector('.qList');
    var btns = area.querySelector('.qaBtns');
    var resultBox = area.querySelector('.qaResult');

    questions.forEach(function (q, i) {
      var card = el('div', 'question', '');
      card.innerHTML =
        '<div class="qtext"><span class="qtag">第 ' + (i + 1) + ' 题</span>' + esc(q.q) + '</div>';
      if (q.t === 'choice') {
        var opts = (q.o || []).map(function (o, oi) {
          return '<label class="opt" data-q="' + i + '" data-o="' + oi + '">' +
            '<span class="letter">' + 'ABCD'[oi] + '</span><span>' + esc(o) + '</span></label>';
        }).join('');
        card.innerHTML += '<div class="options">' + opts + '</div>';
      } else if (q.t === 'judge') {
        card.innerHTML += '<div class="options">' +
          '<label class="opt" data-q="' + i + '" data-o="1"><span class="letter">✓</span><span>对</span></label>' +
          '<label class="opt" data-q="' + i + '" data-o="0"><span class="letter">✗</span><span>错</span></label>' +
          '</div>';
      } else {
        card.innerHTML += '<input class="fill-input" data-q="' + i + '" type="text" placeholder="在这里填写答案">';
      }
      card.innerHTML += '<div class="explain"><b>解析:</b>' + esc(q.e || '') + '</div>';
      if (mode === 'practice') {
        card.innerHTML += '<div class="no-print" style="margin-top:10px;">' +
          '<button class="btn btn-small" data-check="' + i + '">' + (isOly ? '看思路' : '对答案') + '</button></div>';
      }
      list.appendChild(card);
    });

    // 选择交互
    list.querySelectorAll('.opt').forEach(function (label) {
      label.addEventListener('click', function () {
        var qi = +label.dataset.q;
        var val = label.dataset.o;
        var q = questions[qi];
        answers[qi] = q.t === 'judge' ? (val === '1') : +val;
        list.querySelectorAll('.opt[data-q="' + qi + '"]').forEach(function (o) { o.classList.remove('selected'); });
        label.classList.add('selected');
        // 练习模式下立即判断
        if (mode === 'practice') judgeOne(list, questions, answers, qi, true);
      });
    });
    list.querySelectorAll('.fill-input').forEach(function (inp) {
      inp.addEventListener('input', function () {
        answers[+inp.dataset.q] = inp.value;
      });
      if (mode === 'practice') {
        inp.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') judgeOne(list, questions, answers, +inp.dataset.q, true);
        });
      }
    });

    // 打印按钮(仅常规测验区;两种模式共用,用 onclick 避免重复绑定)
    var btnP = document.getElementById('btnPrint');
    var btnPA = document.getElementById('btnPrintA');
    if (!isOly && btnP) btnP.onclick = function () { resetMarks(list); window.print(); };
    if (!isOly && btnPA) btnPA.onclick = function () {
      questions.forEach(function (q, i) { judgeOne(list, questions, answers, i, false); });
      window.print();
    };

    // 练习模式按钮
    if (mode === 'practice') {
      list.querySelectorAll('[data-check]').forEach(function (b) {
        b.addEventListener('click', function () { judgeOne(list, questions, answers, +b.dataset.check, true); });
      });
      btns.innerHTML =
        '<button class="btn btn-ghost btnShowAll">' + (isOly ? '显示全部思路' : '显示全部答案') + '</button>' +
        '<button class="btn btn-ghost btnHideAll">' + (isOly ? '收起思路' : '隐藏答案') + '</button>';
      btns.querySelector('.btnShowAll').addEventListener('click', function () {
        questions.forEach(function (q, i) { judgeOne(list, questions, answers, i, false); });
      });
      btns.querySelector('.btnHideAll').addEventListener('click', function () {
        resetMarks(list);
      });
      return;
    }

    // 测验模式按钮
    btns.innerHTML =
      '<button class="btn btn-primary btnGrade">提交批改</button>' +
      '<button class="btn btn-ghost btnReset">重新测验</button>';
    btns.querySelector('.btnGrade').addEventListener('click', function () {
      var correct = 0;
      questions.forEach(function (q, i) {
        if (judgeOne(list, questions, answers, i, false)) correct++;
      });
      var best = correct / questions.length;

      var gradeHTML;
      if (isOly) {
        // 奥数成绩独立保存到 'xxx-olym' 键,不影响单元星星
        var p = loadProgress();
        var okey = unitId(subjId, semIdx, unitIdx) + '-olym';
        var ost = p[okey] || {};
        ost.best = ost.best == null ? best : Math.max(ost.best, best);
        p[okey] = ost;
        saveProgress(p);
        if (best >= 0.6) {
          gradeHTML = '<div class="quiz-score">🏆 ' + praise() + '<br>' +
            '<div class="big">' + correct + ' / ' + questions.length + '</div>' +
            '答对了 ' + correct + ' 道挑战题,奥数小勇士,思维又变强啦!</div>';
        } else {
          gradeHTML = '<div class="quiz-score">💪 别灰心!答对了 ' + correct + ' / ' + questions.length + '<br>' +
            '<span style="font-size:15.5px;color:var(--ink-2);">奥数题本来就难,看看下面的思路,弄明白再挑战一次吧!</span>' +
            '<div style="margin-top:10px;"><button class="btn btn-primary btnRetryWrong">错题重练</button></div></div>';
        }
      } else {
        // 保存成绩
        var st = getUnitState(subjId, semIdx, unitIdx);
        st.done = st.done || best >= 0.6;
        st.best = st.best == null ? best : Math.max(st.best, best);
        setUnitState(subjId, semIdx, unitIdx, st);
        var stars = starsFor(st);
        if (best >= 0.6) {
          gradeHTML = '<div class="quiz-score">🎉 ' + praise() + '<br>' +
            '<div class="big">' + correct + ' / ' + questions.length + '</div>' +
            '答对了 ' + correct + ' 道题,获得 ' + starsHTML(stars) + '</div>';
          if (best >= 1) confetti();
        } else {
          gradeHTML = '<div class="quiz-score">💪 别灰心!答对了 ' + correct + ' / ' + questions.length + '<br>' +
            '<span style="font-size:15.5px;color:var(--ink-2);">看看下面的解析,把错题弄明白,再挑战一次吧!</span>' +
            '<div style="margin-top:10px;"><button class="btn btn-primary btnRetryWrong">错题重练</button></div></div>';
        }
      }
      if (best >= 0.6 && best < 1) {
        gradeHTML += '<div style="text-align:center;margin-top:6px;" class="no-print"><button class="btn btn-ghost btnRetryWrong">错题重练</button></div>';
      }
      resultBox.innerHTML = gradeHTML;
      resultBox.scrollIntoView({ behavior: 'smooth' });

      var rb = resultBox.querySelector('.btnRetryWrong');
      if (rb) rb.addEventListener('click', function () {
        var wrong = questions.filter(function (q, i) { return !isCorrect(q, answers[i]); });
        if (!wrong.length) { alert('太棒了,没有错题!🎉'); return; }
        initQuizArea(area, wrong, subjId, semIdx, unitIdx, 'test', saveTo);
      });
      btns.querySelector('.btnGrade').disabled = true;
    });
    btns.querySelector('.btnReset').addEventListener('click', function () {
      initQuizArea(area, questions, subjId, semIdx, unitIdx, 'test', saveTo);
    });
  }

  /** 判断第 i 题,mark 为 true 时高亮正误。返回是否正确 */
  function isCorrect(q, ans) {
    if (q.t === 'fill') {
      var accept = Array.isArray(q.a) ? q.a : [q.a];
      var v = String(ans == null ? '' : ans).trim().toLowerCase();
      return accept.some(function (a2) { return String(a2).trim().toLowerCase() === v; });
    }
    if (q.t === 'judge') return (ans === true) === (q.a === true);
    return ans === q.a;
  }
  function judgeOne(list, questions, answers, i, revealAll) {
    var q = questions[i];
    var ok = isCorrect(q, answers[i]);
    var card = list.children[i];
    card.querySelectorAll('.opt').forEach(function (o) {
      var oi = +o.dataset.o;
      var correctIdx = q.t === 'judge' ? (q.a === true ? 1 : 0) : q.a;
      o.classList.remove('correct', 'wrong');
      if (revealAll || answers[i] != null) {
        if (oi === correctIdx) o.classList.add('correct');
        else if (oi === answers[i]) o.classList.add('wrong');
      }
    });
    var inp = card.querySelector('.fill-input');
    if (inp) {
      inp.classList.remove('correct', 'wrong');
      if (revealAll || answers[i] != null) inp.classList.add(ok ? 'correct' : 'wrong');
    }
    var ex = card.querySelector('.explain');
    if (ex && (revealAll || answers[i] != null)) ex.classList.add('show');
    var badge = card.querySelector('.result-badge');
    if (!badge && (revealAll || answers[i] != null)) {
      var b = document.createElement('span');
      b.className = 'result-badge ' + (ok ? 'ok' : 'no');
      b.textContent = ok ? '✓ 答对了' : '✗ 答错了';
      card.querySelector('.qtext').appendChild(b);
    }
    return ok;
  }
  function resetMarks(list) {
    list.querySelectorAll('.opt').forEach(function (o) { o.classList.remove('correct', 'wrong'); });
    list.querySelectorAll('.fill-input').forEach(function (i2) { i2.classList.remove('correct', 'wrong'); });
    list.querySelectorAll('.explain').forEach(function (e) { e.classList.remove('show'); });
    list.querySelectorAll('.result-badge').forEach(function (b) { b.remove(); });
  }

  /* ============================================================
     每日一读 / 每日计算 / 每日听力
     ============================================================ */
  function dayNumber() {
    var n = new Date();
    return n.getFullYear() * 372 + (n.getMonth() + 1) * 31 + n.getDate();
  }
  function todayKey() {
    var n = new Date();
    return n.getFullYear() + '-' + (n.getMonth() + 1) + '-' + n.getDate();
  }
  function todayStr() {
    var n = new Date();
    var wd = ['日', '一', '二', '三', '四', '五', '六'][n.getDay()];
    return n.getFullYear() + '年' + (n.getMonth() + 1) + '月' + n.getDate() + '日 星期' + wd;
  }

  /* ---------- 📖 每日一读 ---------- */
  function renderDailyReading(app) {
    var s = SUBJECTS.chinese;
    document.body.style.setProperty('--subj', s.color);
    document.body.style.setProperty('--subj-soft', s.soft);
    var list = window.DAILY_READING || [];
    if (!list.length) { app.innerHTML = '<p>内容加载中…</p>'; return; }
    var idx = dayNumber() % list.length;
    var p = loadProgress();
    var log = p['reading-log'] || {};
    var key = todayKey();
    var checked = log[key] === idx;

    function articleHTML(it, i, showCheck) {
      var out = '<div class="rd-head">' +
        '<div class="rd-title">' + esc(it.title) + '</div>' +
        '<div class="rd-author">✍️ ' + esc(it.author) + '(' + esc(it.years) + ')　·　出自 ' + esc(it.from) + '</div>' +
        '<span class="rd-tag">' + esc(it.tag) + '</span>' +
        '</div>';
      it.paras.forEach(function (para) {
        out += '<p class="rd-text">' + esc(para) + '</p>';
      });
      if (it.yi) out += '<div class="rd-yi"><b>📜 白话译文</b>' + (Array.isArray(it.yi) ? it.yi.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') : esc(it.yi)) + '</div>';
      out += '<div class="rd-guide"><b>🧭 导读</b>' + esc(it.guide) + '</div>';
      if (it.qs && it.qs.length) {
        out += '<div class="think-box"><b>💭 今日思考</b>';
        it.qs.forEach(function (qq, qi) {
          out += '<div class="think-q"><span class="tq-n">' + (qi + 1) + '</span>' +
            '<span class="tq-t">' + esc(qq.q) + '</span>' +
            '<button class="tq-hint" type="button" data-hint="' + esc(qq.hint) + '">💡 提示</button></div>';
        });
        out += '</div>';
      }
      return out;
    }

    var html =
      '<div class="breadcrumb"><a href="index.html">首页</a><span class="sep">›</span>' +
      '<a href="#/chinese">语文</a><span class="sep">›</span>每日一读</div>' +
      '<h1 class="page-title">📖 每日一读</h1>' +
      '<p class="page-sub">每天一篇经典散文或小古文,读一读、想一想,语感就是这样积累起来的!</p>' +
      '<div class="oly-note" style="margin-bottom:16px;">🛡️ 选文说明:全部选自已进入<b>公有领域</b>的名家名篇(作者逝世均超过50年)或古代作品,均为<b>全文</b>、非节选;原文已逐句核对通行版本,出处见每篇署名,可对照原书阅读。</div>' +
      '<h2 class="section-title">🌟 今日推荐 · ' + todayStr() + '</h2>' +
      '<div class="daily-card" id="todayArticle">' + articleHTML(list[idx], idx, true) +
        '<div class="daily-actions no-print">' +
          '<button class="btn btn-primary" id="btnReadDone">' + (checked ? '✅ 今日已打卡' : '✅ 读完了,打卡!') + '</button>' +
          '<span class="daily-stat" id="readStat">累计打卡 ' + Object.keys(log).length + ' 天</span>' +
        '</div>' +
      '</div>' +
      '<h2 class="section-title">📚 全部篇目(' + list.length + ' 篇)</h2>' +
      '<div class="acc-list">' +
      list.map(function (it, i) {
        return '<div class="acc-item' + (i === idx ? ' is-today' : '') + '">' +
          '<button class="acc-head" type="button" data-i="' + i + '">' +
            '<span class="acc-ico">' + (i === idx ? '⭐' : '📄') + '</span>' +
            '<span class="acc-name">' + esc(it.title.replace(/\([^)]*\)/g, '')) + '</span>' +
            '<span class="acc-meta">' + esc(it.author) + ' · ' + esc(it.tag) + '</span>' +
            '<span class="caret">▾</span>' +
          '</button>' +
          '<div class="acc-body">' + articleHTML(it, i, false) + '</div>' +
        '</div>';
      }).join('') +
      '</div>';

    app.innerHTML = html;

    // 打卡
    var btnDone = document.getElementById('btnReadDone');
    if (btnDone) btnDone.addEventListener('click', function () {
      var p2 = loadProgress();
      var log2 = p2['reading-log'] || {};
      log2[key] = idx;
      p2['reading-log'] = log2;
      saveProgress(p2);
      btnDone.textContent = '✅ 今日已打卡';
      btnDone.disabled = true;
      var st = document.getElementById('readStat');
      if (st) st.textContent = '累计打卡 ' + Object.keys(log2).length + ' 天';
    });
    // 思考提示
    app.querySelectorAll('.tq-hint').forEach(function (b) {
      b.addEventListener('click', function () {
        var hint = b.getAttribute('data-hint');
        b.classList.add('showed');
        b.textContent = '💡 ' + hint;
        b.disabled = true;
      });
    });
    // 全部篇目手风琴
    app.querySelectorAll('.acc-head').forEach(function (h) {
      h.addEventListener('click', function () {
        h.parentElement.classList.toggle('open');
      });
    });
  }

  /* ---------- 🧮 每日计算 ---------- */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function makeCalcProblems(seed) {
    var rnd = mulberry32(seed);
    var rint = function (lo, hi) { return lo + Math.floor(rnd() * (hi - lo + 1)); };
    var probs = [];
    var i, a, b, t;
    for (i = 0; i < 5; i++) { // 万以内加法
      a = rint(1000, 9999); b = rint(100, 9999 - a);
      probs.push({ q: a + ' + ' + b + ' =', a: String(a + b) });
    }
    for (i = 0; i < 3; i++) { // 万以内减法
      a = rint(1000, 9999); b = rint(100, a - 1);
      probs.push({ q: a + ' − ' + b + ' =', a: String(a - b) });
    }
    for (i = 0; i < 4; i++) { // 两位数 × 一位数
      a = rint(12, 99); b = rint(3, 9);
      probs.push({ q: a + ' × ' + b + ' =', a: String(a * b) });
    }
    for (i = 0; i < 3; i++) { // 三位数 ÷ 一位数(保证整除)
      b = rint(3, 9); a = rint(100, 999) * b;
      probs.push({ q: a + ' ÷ ' + b + ' =', a: String(a / b) });
    }
    for (i = 0; i < 2; i++) { // 两位数 × 整十
      a = rint(12, 99); b = rint(2, 9) * 10;
      probs.push({ q: a + ' × ' + b + ' =', a: String(a * b) });
    }
    b = rint(2, 9) * 10; a = rint(3, 9) * b * 10; // 整百 ÷ 整十
    probs.push({ q: a + ' ÷ ' + b + ' =', a: String(a / b) });
    for (i = 0; i < 2; i++) { // 一位小数加减
      var x1 = rint(10, 99) / 10, x2 = rint(10, 99) / 10;
      if (i === 1) {
        if (x2 > x1) { t = x1; x1 = x2; x2 = t; }
        probs.push({ q: x1.toFixed(1) + ' − ' + x2.toFixed(1) + ' =', a: (x1 - x2).toFixed(1) });
      } else {
        probs.push({ q: x1.toFixed(1) + ' + ' + x2.toFixed(1) + ' =', a: (x1 + x2).toFixed(1) });
      }
    }
    return probs; // 共 20 题
  }

  function renderDailyCalc(app) {
    var s = SUBJECTS.math;
    document.body.style.setProperty('--subj', s.color);
    document.body.style.setProperty('--subj-soft', s.soft);
    var seed = dayNumber();
    var p = loadProgress();
    var bestKey = 'calc-' + seed;
    var best = p[bestKey];
    var startTime = Date.now();
    var probs = makeCalcProblems(seed);
    var isDaily = true;

    function gridHTML(ps) {
      return '<div class="calc-grid" id="calcGrid">' +
        ps.map(function (pr, i) {
          return '<div class="calc-item" data-i="' + i + '">' +
            '<span class="c-q">' + (i + 1) + '. ' + esc(pr.q) + '</span>' +
            '<input class="c-in" type="text" inputmode="decimal" placeholder="?" autocomplete="off"></div>';
        }).join('') +
        '</div>';
    }

    function grade() {
      var grid = document.getElementById('calcGrid');
      if (!grid) return;
      grid.querySelectorAll('.c-a').forEach(function (x) { x.remove(); });
      var correct = 0;
      grid.querySelectorAll('.calc-item').forEach(function (item, i) {
        var inp = item.querySelector('.c-in');
        var ok = inp.value.trim() !== '' && Number(inp.value.trim()) === Number(probs[i].a);
        item.classList.remove('ok', 'no');
        item.classList.add(ok ? 'ok' : 'no');
        if (!ok) {
          var ans = document.createElement('span');
          ans.className = 'c-a';
          ans.textContent = '✓ ' + probs[i].a;
          item.appendChild(ans);
        } else correct++;
      });
      var secs = Math.round((Date.now() - startTime) / 1000);
      var res = document.getElementById('calcResult');
      if (isDaily) {
        var better = !best || correct > best.score || (correct === best.score && secs < best.time);
        if (better) { p[bestKey] = { score: correct, time: secs }; saveProgress(p); best = p[bestKey]; }
        var gradeHTML = '<div class="quiz-score">' +
          (correct === probs.length ? '🎉 全部答对,计算小达人!' : correct >= 12 ? '👍 不错哦!' : '💪 加油,多多练习!') + '<br>' +
          '<div class="big">' + correct + ' / ' + probs.length + '</div>' +
          '用时 ' + secs + ' 秒' +
          (better ? ' · 🏅 刷新今日最佳!' : (best ? ' · 今日最佳 ' + best.score + '/' + probs.length + '(' + best.time + '秒)' : '')) +
          '</div>';
        if (correct === probs.length) confetti();
        res.innerHTML = gradeHTML;
      } else {
        res.innerHTML = '<div class="quiz-score">自由练习:答对 ' + correct + ' / ' + probs.length + '(不计入今日成绩)</div>';
      }
      res.scrollIntoView({ behavior: 'smooth' });
    }

    var html =
      '<div class="breadcrumb"><a href="index.html">首页</a><span class="sep">›</span>' +
      '<a href="#/math">数学</a><span class="sep">›</span>每日计算</div>' +
      '<h1 class="page-title">🧮 每日计算</h1>' +
      '<p class="page-sub">每天 20 道口算题:万以内加减、乘除法、整十整百、小数加减。限时挑战,刷新每日最佳!</p>' +
      '<div class="daily-actions no-print" style="margin-bottom:12px;">' +
        '<button class="btn btn-primary" id="btnCalcGrade">📝 提交批改</button>' +
        '<button class="btn btn-ghost" id="btnCalcReset">🔄 重新做一遍</button>' +
        '<button class="btn btn-ghost" id="btnCalcNew">🎲 换一批题</button>' +
        '<button class="btn btn-ghost" id="btnCalcPrint">🖨️ 打印</button>' +
        '<span class="daily-stat" id="calcStat">' +
          (best ? '🏅 今日最佳:' + best.score + '/20(' + best.time + '秒)' : '🏅 今日还没挑战') +
          ' · ' + todayStr() + '</span>' +
      '</div>' +
      gridHTML(probs) +
      '<div id="calcResult"></div>';

    app.innerHTML = html;

    document.getElementById('btnCalcGrade').addEventListener('click', grade);
    document.getElementById('btnCalcReset').addEventListener('click', function () {
      startTime = Date.now();
      document.querySelectorAll('#calcGrid .c-in').forEach(function (inp) { inp.value = ''; });
      document.querySelectorAll('#calcGrid .calc-item').forEach(function (it) { it.classList.remove('ok', 'no'); });
      document.querySelectorAll('#calcGrid .c-a').forEach(function (x) { x.remove(); });
      document.getElementById('calcResult').innerHTML = '';
    });
    document.getElementById('btnCalcNew').addEventListener('click', function () {
      startTime = Date.now();
      isDaily = false;
      probs = makeCalcProblems(Date.now() % 2147483647);
      document.getElementById('calcGrid').outerHTML = gridHTML(probs);
      document.getElementById('calcResult').innerHTML = '';
      document.getElementById('calcStat').textContent = '🎲 自由练习(不计入今日成绩) · ' + todayStr();
    });
    document.getElementById('btnCalcPrint').addEventListener('click', function () { window.print(); });
    document.querySelectorAll('#calcGrid .c-in').forEach(function (inp) {
      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          var items = document.querySelectorAll('#calcGrid .calc-item');
          var cur = +inp.closest('.calc-item').dataset.i;
          var next = items[cur + 1];
          if (next) next.querySelector('.c-in').focus();
          else grade();
        }
      });
    });
  }

  /* ---------- 🎧 每日听力 ---------- */
  var voicesCache = null;
  if (window.speechSynthesis && window.speechSynthesis.getVoices) {
    voicesCache = window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = function () {
      voicesCache = window.speechSynthesis.getVoices();
    };
  }
  function pickEnglishVoice() {
    var vs = voicesCache || [];
    var en = vs.filter(function (v) { return v.lang && v.lang.toLowerCase().indexOf('en') === 0; });
    if (!en.length) return null;
    return en.find(function (v) { return /Samantha|Google US English|Ava|Allison|Zira|Female|Siri/i.test(v.name); }) || en[0];
  }
  function speakText(text, rate) {
    if (!window.speechSynthesis) {
      alert('这个浏览器不支持语音朗读,请换 Safari 或 Chrome 试试。');
      return false;
    }
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = rate || 0.85;
    var v = pickEnglishVoice();
    if (v) u.voice = v;
    window.speechSynthesis.speak(u);
    return true;
  }

  function renderDailyListening(app) {
    var s = SUBJECTS.english;
    document.body.style.setProperty('--subj', s.color);
    document.body.style.setProperty('--subj-soft', s.soft);
    var list = window.DAILY_LISTENING || [];
    if (!list.length) { app.innerHTML = '<p>内容加载中…</p>'; return; }
    var idx = dayNumber() % list.length;
    var item = list[idx];
    var p = loadProgress();
    var log = p['listen-log'] || {};
    var key = todayKey();
    var checked = log[key] === idx;
    var rate = 0.85;

    var html =
      '<div class="breadcrumb"><a href="index.html">首页</a><span class="sep">›</span>' +
      '<a href="#/english">英语</a><span class="sep">›</span>每日听力</div>' +
      '<h1 class="page-title">🎧 每日听力</h1>' +
      '<p class="page-sub">每天一篇英语短文,点按钮听人声朗读;先听一遍,再跟读一遍,耳朵和嘴巴一起练!</p>' +
      '<div class="ls-toolbar no-print">' +
        '<button class="btn btn-primary" id="btnSpeakAll">🔊 朗读全文</button>' +
        '<button class="btn btn-ghost" id="btnStop">⏹ 停止</button>' +
        '<button class="btn btn-ghost" id="btnSlow">🐢 慢速</button>' +
        '<button class="btn btn-ghost" id="btnNormal">🐇 常速</button>' +
        '<button class="btn btn-ghost" id="btnShowZh">📖 中文译文</button>' +
      '</div>' +
      '<h2 class="section-title">🌟 今日短文 · ' + todayStr() + '</h2>' +
      '<div class="daily-card">' +
        '<div class="rd-head">' +
          '<div class="rd-title">' + esc(item.title) + '</div>' +
          '<span class="rd-tag" style="background:var(--subj-soft,#ebfbee);color:var(--subj,#2f9e44);">' + esc(item.tag) + '</span>' +
        '</div>' +
        '<div class="listen-text">' +
          item.text.map(function (para) {
            return '<p class="ls-para" data-t="' + esc(para) + '" title="点击朗读这一句">' + esc(para) + '</p>';
          }).join('') +
        '</div>' +
        '<div class="ls-zh" id="lsZh"><b>📖 中文译文</b>' + esc(item.zh) + '</div>' +
        (item.words && item.words.length
          ? '<div class="word-chips">' + item.words.map(function (w) {
              return '<span class="wc"><b>' + esc(w.w) + '</b> ' + esc(w.m) + '</span>';
            }).join('') + '</div>'
          : '') +
        '<h3 class="ls-sub">📝 听力小检测</h3>' +
        '<div id="listenQuiz"></div>' +
        '<div class="daily-actions no-print">' +
          '<button class="btn btn-primary" id="btnListenDone">' + (checked ? '✅ 今日已打卡' : '✅ 听完了,打卡!') + '</button>' +
          '<span class="daily-stat" id="listenStat">累计打卡 ' + Object.keys(log).length + ' 天</span>' +
        '</div>' +
      '</div>' +
      '<h2 class="section-title">📚 全部短文(' + list.length + ' 篇)</h2>' +
      '<div class="acc-list">' +
      list.map(function (it, i) {
        return '<div class="acc-item' + (i === idx ? ' is-today' : '') + '">' +
          '<button class="acc-head" type="button" data-i="' + i + '">' +
            '<span class="acc-ico">' + (i === idx ? '⭐' : '🎧') + '</span>' +
            '<span class="acc-name">' + esc(it.title) + '</span>' +
            '<span class="acc-meta">' + esc(it.tag) + '</span>' +
            '<span class="caret">▾</span>' +
          '</button>' +
          '<div class="acc-body">' +
            '<button class="btn btn-small btn-ghost acc-play" data-t="' + esc(it.text.join(' ')) + '">🔊 朗读</button>' +
            '<div class="listen-text">' + it.text.map(function (para) {
              return '<p class="ls-para" data-t="' + esc(para) + '" title="点击朗读这一句">' + esc(para) + '</p>';
            }).join('') + '</div>' +
            '<div class="ls-zh"><b>📖 中文译文</b>' + esc(it.zh) + '</div>' +
          '</div>' +
        '</div>';
      }).join('') +
      '</div>';

    app.innerHTML = html;

    // 语音
    document.getElementById('btnSpeakAll').addEventListener('click', function () {
      speakText(item.text.join(' '), rate);
    });
    document.getElementById('btnStop').addEventListener('click', function () {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    });
    document.getElementById('btnSlow').addEventListener('click', function () {
      rate = 0.7;
      alert('已切换慢速(0.7倍),适合跟读。');
    });
    document.getElementById('btnNormal').addEventListener('click', function () {
      rate = 0.9;
      alert('已切换常速。');
    });
    document.getElementById('btnShowZh').addEventListener('click', function () {
      document.getElementById('lsZh').classList.toggle('show');
    });
    app.querySelectorAll('.ls-para').forEach(function (para) {
      para.addEventListener('click', function () {
        speakText(para.getAttribute('data-t'), rate);
      });
    });
    app.querySelectorAll('.acc-play').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        speakText(b.getAttribute('data-t'), rate);
      });
    });

    // 听力小检测(练习模式,逐题对答案,不计分不存档)
    var quizArea = document.getElementById('listenQuiz');
    if (quizArea && item.quiz && item.quiz.length) {
      initQuizArea(quizArea, item.quiz, 'english', 0, 0, 'practice');
    }

    // 打卡
    document.getElementById('btnListenDone').addEventListener('click', function () {
      var p2 = loadProgress();
      var log2 = p2['listen-log'] || {};
      log2[key] = idx;
      p2['listen-log'] = log2;
      saveProgress(p2);
      var b = document.getElementById('btnListenDone');
      b.textContent = '✅ 今日已打卡';
      b.disabled = true;
      var st = document.getElementById('listenStat');
      if (st) st.textContent = '累计打卡 ' + Object.keys(log2).length + ' 天';
    });

    // 手风琴
    app.querySelectorAll('.acc-head').forEach(function (h) {
      h.addEventListener('click', function () {
        h.parentElement.classList.toggle('open');
      });
    });
  }

  /* ============================================================
     专题复习页
     ============================================================ */
  function renderTopic(app, subjId, topicIdx) {
    var s = SUBJECTS[subjId];
    var topics = s.topics.concat((window.EXTRA_TOPICS || {})[subjId] || []);
    var t = topics[topicIdx];
    if (!t) { renderSubject(app, subjId); return; }
    document.body.style.setProperty('--subj', s.color);
    document.body.style.setProperty('--subj-soft', s.soft);

    var html =
      '<div class="breadcrumb">' +
        '<a href="index.html">首页</a><span class="sep">›</span>' +
        '<a href="#/' + subjId + '">' + esc(s.name) + '</a><span class="sep">›</span>' +
        '专题复习<span class="sep">›</span>' + esc(t.name) +
      '</div>' +
      '<h1 class="page-title">' + (t.icon || '🧩') + ' ' + esc(t.name) + '</h1>' +
      (t.intro ? '<p class="page-sub">' + esc(t.intro) + '</p>' : '');

    (t.sections || []).forEach(function (sec) {
      html += '<div class="card"><div class="point-card">' +
        '<div class="pt">' + esc(sec.t) + '</div>' +
        (sec.d ? '<div class="def">' + esc(sec.d).replace(/\n/g, '<br>') + '</div>' : '') +
        (sec.items && sec.items.length ? '<ul style="margin:8px 0 0;">' +
          sec.items.map(function (it) { return '<li>' + esc(it) + '</li>'; }).join('') + '</ul>' : '') +
        '</div></div>';
    });

    app.innerHTML = html;
    window.scrollTo(0, 0);
  }

  /* ============================================================
     我的成绩页
     ============================================================ */
  function renderScores(app) {
    var p = loadProgress();
    var html =
      '<div class="breadcrumb"><a href="index.html">首页</a><span class="sep">›</span>我的成绩</div>' +
      '<h1 class="page-title">⭐ 我的成绩</h1>' +
      '<p class="page-sub">看看这一年你攒了多少颗星星!数据只保存在这台电脑上。</p>';

    var grandTotal = 0, grandDone = 0, grandStars = 0, grandMax = 0;
    ORDER.forEach(function (id) {
      var s = SUBJECTS[id];
      var total = 0, done = 0, stars = 0;
      s.semesters.forEach(function (sem, si) {
        sem.units.forEach(function (u, ui) {
          total++;
          var st = p[unitId(id, si, ui)] || { done: false, best: null };
          if (st.done) done++;
          stars += starsFor(st);
        });
      });
      grandTotal += total; grandDone += done; grandStars += stars; grandMax += total * 3;
      var pct = total ? Math.round(done / total * 100) : 0;
      html += '<div class="card" style="--subj:' + s.color + '">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">' +
        '<b style="font-size:18px;">' + s.emoji + ' ' + esc(s.name) + '</b>' +
        '<span>已完成 ' + done + '/' + total + ' 单元 · ' + starsHTML(stars) + '</span></div>' +
        '<div class="progress-track"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
        '<div style="font-size:13.5px;color:#9a948a;">本学科学年进度 ' + pct + '%</div>' +
        '</div>';
    });

    var allPct = grandTotal ? Math.round(grandDone / grandTotal * 100) : 0;
    html += '<div class="card" style="text-align:center;">' +
      '<div style="font-size:15.5px;color:var(--ink-2);">全站总进度 ' + allPct + '% · 共获得</div>' +
      '<div style="font-size:20px;font-weight:800;">' + starsHTML(grandStars) + '</div>' +
      '<div style="font-size:13.5px;color:#9a948a;">满分可得 ' + grandMax + ' 颗星星</div>' +
      '<div style="margin-top:10px;"><button class="btn btn-small btn-ghost" id="btnClear">清除全部记录</button></div>' +
      '</div>';

    app.innerHTML = html;
    var btn = document.getElementById('btnClear');
    if (btn) btn.addEventListener('click', function () {
      if (confirm('确定要清除全部学习记录吗?星星会全部消失哦!')) {
        saveProgress({});
        renderScores(app);
      }
    });
  }

  /* ============================================================
     口算大挑战(数学趣味闯关)
     ============================================================ */
  function renderGame(app, subjId) {
    var s = SUBJECTS[subjId];
    document.body.style.setProperty('--subj', s.color);
    document.body.style.setProperty('--subj-soft', s.soft);
    app.innerHTML =
      '<div class="breadcrumb"><a href="index.html">首页</a><span class="sep">›</span>' +
      '<a href="#/math">🧮 数学</a><span class="sep">›</span>口算大挑战</div>' +
      '<h1 class="page-title">🏎️ 口算大挑战</h1>' +
      '<p class="page-sub">60 秒倒计时,答得又快又对才是口算小达人!按回车键确认答案。</p>' +
      '<div class="card mg-box">' +
        '<div class="mg-levels no-print">' +
          '<button class="tab active" data-lv="1">🌟 简单</button>' +
          '<button class="tab" data-lv="2">🔥 中等</button>' +
          '<button class="tab" data-lv="3">🚀 挑战</button>' +
        '</div>' +
        '<div class="mg-hud"><span>⏱️ <span class="t" id="mgTimer">60</span> 秒</span>' +
        '<span>✅ <span id="mgScore">0</span> 道</span>' +
        '<span>🏆 最佳:<span id="mgBest">0</span></span></div>' +
        '<div id="mgMain"><button class="btn btn-primary" id="mgStart">开始挑战!</button></div>' +
      '</div>';

    var level = 1, running = false, score = 0, timeLeft = 60, timerId = null;
    var best = 0;
    try { best = +localStorage.getItem('wxy_mathgame_best') || 0; } catch (e) {}
    document.getElementById('mgBest').textContent = best;

    function rand(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
    function makeQuestion() {
      var a, b, op, ans;
      if (level === 1) {
        op = rand(0, 2);
        if (op === 0) { a = rand(1, 19); b = rand(1, 20 - a); ans = a + b; op = '+'; }
        else if (op === 1) { a = rand(2, 20); b = rand(1, a); ans = a - b; op = '−'; }
        else { a = rand(2, 9); b = rand(2, 9); ans = a * b; op = '×'; }
      } else if (level === 2) {
        op = rand(0, 3);
        if (op === 0) { a = rand(10, 90); b = rand(10, 100 - a); ans = a + b; op = '+'; }
        else if (op === 1) { a = rand(20, 100); b = rand(10, a); ans = a - b; op = '−'; }
        else if (op === 2) { a = rand(2, 9); b = rand(2, 9); ans = a * b; op = '×'; }
        else { b = rand(2, 9); ans = rand(2, 9); a = b * ans; op = '÷'; }
      } else {
        op = rand(0, 3);
        if (op === 0) { a = rand(20, 99); b = rand(10, 100 - a); ans = a + b; op = '+'; }
        else if (op === 1) { a = rand(30, 99); b = rand(10, a); ans = a - b; op = '−'; }
        else if (op === 2) { a = rand(2, 9); b = rand(11, 99); ans = a * b; op = '×'; }
        else { b = rand(2, 9); ans = rand(3, 12); a = b * ans; op = '÷'; }
      }
      return { text: a + ' ' + op + ' ' + b + ' = ?', ans: ans };
    }

    var main = document.getElementById('mgMain');
    function showQuestion() {
      var q = makeQuestion();
      main.innerHTML =
        '<div class="mg-question">' + q.text + '</div>' +
        '<input class="mg-input" id="mgInput" type="number" inputmode="numeric" autocomplete="off">' +
        '<div style="color:var(--ink-2);font-size:14px;margin-top:10px;">输入答案后按 回车(Enter)</div>';
      var inp = document.getElementById('mgInput');
      inp.focus();
      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          if (+inp.value === q.ans) {
            score++;
            document.getElementById('mgScore').textContent = score;
            inp.classList.remove('wrong');
            showQuestion();
          } else {
            inp.classList.add('wrong');
            inp.select();
          }
        }
      });
    }
    function endGame() {
      running = false;
      clearInterval(timerId);
      main.innerHTML =
        '<div class="mg-question" style="font-size:28px;">⏰ 时间到!</div>' +
        '<div style="font-size:22px;font-weight:800;">你答对了 ' + score + ' 道题</div>' +
        '<div style="margin-top:14px;">' + (score >= best && score > 0 ? '🎉 刷新纪录啦!' : '继续加油,再挑战一次!') + '</div>' +
        '<div style="margin-top:14px;"><button class="btn btn-primary" id="mgAgain">再来一次!</button></div>';
      if (score > best) {
        best = score;
        try { localStorage.setItem('wxy_mathgame_best', String(best)); } catch (e) {}
        document.getElementById('mgBest').textContent = best;
        confetti();
      }
      document.getElementById('mgAgain').addEventListener('click', start);
    }
    function start() {
      if (running) return;
      running = true; score = 0; timeLeft = 60;
      document.getElementById('mgScore').textContent = '0';
      document.getElementById('mgTimer').textContent = '60';
      showQuestion();
      timerId = setInterval(function () {
        timeLeft--;
        document.getElementById('mgTimer').textContent = timeLeft;
        if (timeLeft <= 0) endGame();
      }, 1000);
    }

    document.getElementById('mgStart').addEventListener('click', start);
    document.querySelectorAll('.mg-levels .tab').forEach(function (b) {
      b.addEventListener('click', function () {
        level = +b.dataset.lv;
        document.querySelectorAll('.mg-levels .tab').forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
      });
    });
  }

  /* ---------- 导出 ---------- */
  window.App = {
    initHome: initHome,
    startLearn: startLearn,
    _subjects: SUBJECTS
  };
})();
