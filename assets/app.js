/* ============ Study Grove · app ============ */
(function () {
  const D = window.LEARN_DATA, I = window.I18N;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const DAY = 864e5, MIN = 6e4;
  const STEPS = [10 * MIN, DAY, 2 * DAY, 4 * DAY, 7 * DAY, 15 * DAY, 30 * DAY]; // 艾宾浩斯式间隔
  const MAX_NEW_PER_ROUND = 10;
  const STORE = 'study-grove-v1';

  /* ---------------- state ---------------- */
  const blank = () => ({
    lang: 'zh', pinnedSeason: null, partner: null,
    srs: {}, today: { date: '', cards: 0 }, streak: { days: 0, last: '' },
    mails: 0, seenQuotes: [], pets: { cat: 0, dog: 0, parrot: 0 }
  });
  let S = (() => {
    try { return Object.assign(blank(), JSON.parse(localStorage.getItem(STORE)) || {}); }
    catch (e) { return blank(); }
  })();
  S.srs = S.srs || {};
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) { /* 隐私模式/配额满：本次会话不持久化 */ } };
  const todayKey = () => new Date().toISOString().slice(0, 10);
  const isSmallScreen = () => window.innerWidth <= 720;
  const hasFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'toast'; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 400); }, 1900);
  }

  /* ---------------- clock + seasons ---------------- */
  const seasonOfMonth = (m) => (m >= 2 && m <= 4 ? 'spring' : m >= 5 && m <= 7 ? 'summer' : m >= 8 && m <= 10 ? 'autumn' : 'winter');
  const todOfDay = (h) => (h >= 5 && h < 10 ? 'morning' : h >= 10 && h < 17 ? 'day' : h >= 17 && h < 20 ? 'dusk' : 'night');
  let particleSeason = null;

  function buildTicks() {
    const g = $('#clockTicks');
    g.innerHTML = Array.from({ length: 12 }, (_, i) => {
      const a = i * 30 * Math.PI / 180, big = i % 3 === 0;
      const r1 = big ? 33 : 36, r2 = 39;
      return `<line class="clock-tick${big ? ' big' : ''}" x1="${50 + r1 * Math.sin(a)}" y1="${50 - r1 * Math.cos(a)}" x2="${50 + r2 * Math.sin(a)}" y2="${50 - r2 * Math.cos(a)}"></line>`;
    }).join('');
  }

  function tickClock() {
    const d = new Date();
    const auto = seasonOfMonth(d.getMonth());
    const season = S.pinnedSeason || auto;
    const html = document.documentElement;
    html.dataset.season = season;
    html.dataset.tod = todOfDay(d.getHours());
    $('#seasonName').textContent = I.t('seasonFull')[season];
    $('#unpinSeason').hidden = !S.pinnedSeason;
    $('#dateLine').textContent = I.t('dateLine')(d);
    $('#digitalTime').textContent = d.toTimeString().slice(0, 8);
    const h = d.getHours() % 12, m = d.getMinutes(), sec = d.getSeconds();
    $('#handH').setAttribute('transform', `rotate(${h * 30 + m * 0.5})`);
    $('#handM').setAttribute('transform', `rotate(${m * 6 + sec * 0.1})`);
    $('#handS').setAttribute('transform', `rotate(${sec * 6})`);
    $$('[data-season-btn]').forEach(b => b.classList.toggle('active', b.dataset.seasonBtn === season));
    if (particleSeason !== season) { particleSeason = season; spawnParticles(season); }
  }

  const PARTICLES = {
    spring: { chars: ['❀', '✿', '•'], colors: ['#f3a8c4', '#e9c46a', '#fff'], drift: 60 },
    summer: { chars: ['✦', '·', '✧'], colors: ['#fff6c9', '#bfe8ff', '#ffd27a'], drift: 22 },
    autumn: { chars: ['🍁', '🍂', '•'], colors: ['#d98a3c', '#b4622a', '#e6c48a'], drift: 55 },
    winter: { chars: ['❄', '❅', '·'], colors: ['#fff', '#dbe9ff', '#eff6ff'], drift: 30 }
  };
  function spawnParticles(season) {
    const host = $('#particles'), cfg = PARTICLES[season];
    host.innerHTML = '';
    for (let i = 0, n = isSmallScreen() ? 8 : 16; i < n; i++) {
      const p = document.createElement('span');
      p.className = 'p';
      p.textContent = cfg.chars[i % cfg.chars.length];
      p.style.left = (Math.random() * 98) + '%';
      p.style.color = cfg.colors[i % cfg.colors.length];
      p.style.fontSize = (8 + Math.random() * 10) + 'px';
      p.style.animationDuration = (5 + Math.random() * 7) + 's';
      p.style.animationDelay = (-Math.random() * 8) + 's';
      p.style.setProperty('--drift', (Math.random() * cfg.drift - cfg.drift / 2) + 'px');
      host.appendChild(p);
    }
  }

  /* ---------------- SRS core ---------------- */
  const srsKey = (it) => it.id;
  const rec = (it) => S.srs[srsKey(it)];
  const isDue = (it) => { const r = rec(it); return !!r && r.due <= Date.now(); };
  const isNew = (it) => !rec(it);
  const isMastered = (it) => { const r = rec(it); return !!r && r.stage >= STEPS.length - 2; };

  function grade(it, level) {
    const now = Date.now();
    let r = rec(it) || { stage: -1, due: now, right: 0, wrong: 0 };
    if (level === 'again') { r.stage = 0; r.due = now + STEPS[0]; r.wrong++; }
    else if (level === 'hard') { r.stage = Math.max(0, r.stage); r.due = now + STEPS[Math.min(r.stage, STEPS.length - 1)] * 0.8; r.right++; }
    else { r.stage = Math.min(STEPS.length - 1, r.stage + 1); r.due = now + STEPS[r.stage]; r.right++; }
    r.seen = true;
    S.srs[srsKey(it)] = r;

    if (S.today.date !== todayKey()) { S.today = { date: todayKey(), cards: 0 }; }
    S.today.cards++;
    const last = S.streak.last;
    if (last !== todayKey()) {
      const yest = new Date(Date.now() - DAY).toISOString().slice(0, 10);
      S.streak = { days: last === yest ? S.streak.days + 1 : 1, last: todayKey() };
    }
    save(); refreshStats();
    return r;
  }

  function soonText(ms) {
    if (ms < 2 * 36e5) return I.t('soon10min');
    if (ms < 3 * DAY) return I.t('soonHours')(Math.round(ms / 36e5));
    return I.t('soonDays')(Math.round(ms / DAY));
  }

  /* ---------------- HUD stats ---------------- */
  let sectionFilter = 'all';

  function itemsOf(kind) { return kind === 'w' ? D.WORDS : D.QUESTIONS; }
  function dueCount(kind) { return itemsOf(kind).filter(isDue).length; }
  function newCount(kind) { return itemsOf(kind).filter(isNew).length; }

  function masteryPct() {
    const all = D.QUESTIONS.concat(D.WORDS);
    let s = 0;
    all.forEach(it => { const r = rec(it); if (r) s += Math.min(1, (r.stage + 1) / STEPS.length); });
    return Math.round(s / all.length * 100);
  }

  function refreshStats() {
    const q = D.QUESTIONS, pool = sectionFilter === 'all' ? q : q.filter(x => x.section === sectionFilter);
    $('#dueNow').textContent = pool.filter(isDue).length;
    $('#newLeft').textContent = pool.filter(isNew).length;
    $('#masteryPct').textContent = masteryPct() + '%';
    $('#todayCards').textContent = S.today.date === todayKey() ? S.today.cards : 0;
    $('#streakLine').textContent = S.streak.days > 0 ? I.t('streakLine')(S.streak.days) : I.t('streakZero');
    const dw = dueCount('w');
    $('#badgeWords').textContent = dw;
    $('#badgeWords').style.background = dw ? '' : '#8b8894';
    $('#mailCount').textContent = S.mails ? I.t('mailOpened')(S.mails) : I.t('mailZero');
    $('#badgeMail').hidden = S.mails > 0;
    $('#btnStartQuiz').disabled = pool.filter(isDue).length === 0 && pool.filter(isNew).length === 0;
  }

  function buildFilter() {
    const host = $('#sectionFilter');
    const secs = ['all', 'vocab', 'grammar', 'reading', 'translation', 'writing'];
    host.innerHTML = secs.map(s => {
      const label = s === 'all' ? I.t('secAll') : I.t('sections')[s];
      return `<button class="chip${s === sectionFilter ? ' active' : ''}" data-sec="${s}">${label}</button>`;
    }).join('');
    host.querySelectorAll('[data-sec]').forEach(b => b.onclick = () => { sectionFilter = b.dataset.sec; buildFilter(); refreshStats(); });
  }

  /* ---------------- quiz engine ---------------- */
  let run = null; // {queue, idx, kind, answered, start}

  function makeQueue(kind) {
    let pool = itemsOf(kind);
    if (kind === 'q' && sectionFilter !== 'all') pool = pool.filter(x => x.section === sectionFilter);
    const due = pool.filter(isDue);
    const fresh = pool.filter(isNew).slice(0, MAX_NEW_PER_ROUND);
    const q = due.concat(fresh);
    if (!q.length && due.length === 0 && fresh.length === 0 && pool.length) {
      // 全部学过且未到复习点：允许"提前练习"，取最近要到期的几张
      return pool.slice().sort((a, b) => rec(a).due - rec(b).due).slice(0, 5);
    }
    return q;
  }

  function startRun(kind) {
    const queue = makeQueue(kind);
    if (!queue.length) { toast(I.t(kind === 'w' ? 'wordNone' : 'quizEmptyAll')); return; }
    run = { kind, queue, idx: 0, answered: false, done: 0, start: Date.now() };
    openModal('modalQuiz');
    $('#quizTitle').textContent = I.t(kind === 'w' ? 'wordQuizTitle' : 'quizTitle');
    renderCard();
  }

  function cardHead(it) {
    const r = rec(it);
    const tag = !r ? I.t('tagNew') : I.t('tagReview')(r.stage + 1);
    const sec = run.kind === 'w' ? I.t('bookTitle') : I.t('sections')[it.section];
    return `<span class="q-tag">${sec}</span><span class="q-tag" style="background:var(--accent)">${tag}</span>
      <p class="q-why">${I.t('qIndex')(run.idx + 1, run.queue.length)}</p>`;
  }

  function renderCard() {
    const host = $('#quizBody');
    if (run.idx >= run.queue.length) return renderDone();
    const it = run.queue[run.idx];
    $('#quizProgress').textContent = `${run.idx + 1} / ${run.queue.length}`;
    run.answered = false;

    if (run.kind === 'w') {
      host.innerHTML = `${cardHead(it)}
        <p class="q-stem"><b class="w-name">${it.w}</b> <span class="w-ipa">${it.ipa}</span> <span class="w-pos">${it.pos}</span></p>
        <p class="muted">${I.t('gradeLabel')}</p>
        <div class="ref-answer" data-reveal hidden>
          <p><b>${it.cn}</b></p><p class="muted">${it.en}</p>
          <p class="w-ex">${it.ex}<br>${it.excn}</p>
        </div>
        <div class="grade-row">
          <button class="ghost-btn" data-reveal-btn>${I.t('showAnswer')}</button>
        </div>`;
      host.querySelector('[data-reveal-btn]').onclick = () => {
        host.querySelector('[data-reveal]').hidden = false;
        host.querySelector('[data-reveal-btn]').hidden = true;
        host.querySelector('.grade-row').insertAdjacentHTML('beforeend', gradeButtons());
        bindGrades(it);
      };
      return;
    }

    if (it.type === 'mc') {
      const p = it.passage ? D.PASSAGES[it.passage] : null;
      const passage = p ? `<div class="q-passage"><b>${p.title}</b><br>${p.en}` +
        (I.lang === 'zh' ? `<br><span class="muted">${p.zh}</span>` : '') + '</div>' : '';
      host.innerHTML = `${cardHead(it)}${passage}
        <p class="q-stem">${hl(it.stem)}</p>
        <p class="muted">${it.stemZh}</p>
        <div class="opts">${it.options.map((o, i) => `<button class="opt" data-i="${i}"><span class="opt-key">${'ABCD'[i]}</span>${o}</button>`).join('')}</div>
        <div class="feedback" hidden></div><div class="grade-row"></div>`;
      host.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        const pick = +b.dataset.i, ok = pick === it.answer;
        host.querySelectorAll('.opt').forEach((x, i) => {
          x.disabled = true;
          if (i === it.answer) x.classList.add('correct');
          if (i === pick && !ok) x.classList.add('wrong');
        });
        const f = host.querySelector('.feedback');
        f.hidden = false; f.className = 'feedback ' + (ok ? 'ok' : 'no');
        f.innerHTML = `<h4>${ok ? I.t('qCorrect') : I.t('qWrong')}</h4>
          <p>${I.lang === 'zh' ? it.explainZh : it.explainEn}</p>`;
        revealAnswer(it, ok);
      });
    } else {
      host.innerHTML = `${cardHead(it)}
        <p class="q-stem">${hl(it.stem)}</p>
        <p class="muted">${it.stemZh}</p>
        <textarea class="answer" placeholder="${I.lang === 'zh' ? '在这里作答…' : 'Write your answer here…'}"></textarea>
        <div class="ref-answer" hidden><h4 style="margin:0 0 6px;font-size:13px">${I.t('refAnswer')}</h4>${nl2br(it.ref)}
          <p class="muted" style="margin-top:8px">${I.lang === 'zh' ? it.explainZh : it.explainEn}</p></div>
        <div class="grade-row"><button class="ghost-btn" data-reveal-btn>${I.t('showAnswer')}</button></div>`;
      const ta = host.querySelector('textarea.answer');
      // 触屏不自动聚焦：软键盘会顶走下方的参考答案与评分区
      if (hasFinePointer()) ta.focus();
      host.querySelector('[data-reveal-btn]').onclick = () => {
        host.querySelector('.ref-answer').hidden = false;
        host.querySelector('[data-reveal-btn]').hidden = true;
        revealAnswer(it, null);
      };
    }
  }

  function hl(stem) { return stem.replace(/___/g, '<span class="q-blank">____</span>'); }
  function nl2br(s) { return s.replace(/\n/g, '<br>'); }

  function gradeButtons() {
    return `<span class="lbl">${I.t('gradeLabel')}</span>
      <button class="grade again" data-g="again" title="${I.t('gHintAgain')}">${I.t('gAgain')}</button>
      <button class="grade hard" data-g="hard" title="${I.t('gHintHard')}">${I.t('gHard')}</button>
      <button class="grade good" data-g="good" title="${I.t('gHintGood')}">${I.t('gGood')}</button>
      <button class="primary-btn small" data-next hidden>${I.t('nextBtn')}</button>`;
  }

  function revealAnswer(it, ok) {
    run.answered = true;
    const row = $('#quizBody .grade-row');
    row.innerHTML = gradeButtons();
    bindGrades(it);
    if (ok === true) petReact('cheer');
    if (ok === false) petReact('soothe');
  }

  function bindGrades(it) {
    $$('#quizBody .grade').forEach(b => b.onclick = () => {
      const r = grade(it, b.dataset.g);
      $$('#quizBody .grade').forEach(x => x.disabled = true);
      b.style.outline = '2px solid var(--accent)';
      const gap = r.due - Date.now();
      const nextBtn = $('#quizBody [data-next]');
      const row = $('#quizBody .grade-row');
      nextBtn.hidden = false;
      nextBtn.textContent = run.idx + 1 >= run.queue.length ? I.t('finishBtn') : I.t('nextBtn');
      row.insertAdjacentHTML('beforeend', `<span class="lbl">${I.t('quizNextDue')(soonText(gap))}</span>`);
      nextBtn.onclick = () => { run.idx++; renderCard(); };
      run.done++;
      bumpMood();
    });
  }

  function renderDone() {
    const mins = Math.round((Date.now() - run.start) / MIN) || 1;
    $('#quizProgress').textContent = '';
    $('#quizBody').innerHTML = `<div class="quiz-empty">
      <div class="big">🌱</div>
      <h3>${I.t('quizDoneTitle')}</h3>
      <p>${I.t('quizDoneBody')(run.done)}</p>
      <p class="muted">${I.t('timerLabel')} ${mins} min</p>
      <button class="primary-btn" id="btnCloseDone">${I.t('backToRoom')}</button>
    </div>`;
    $('#btnCloseDone').onclick = () => closeModal('modalQuiz');
    petReact('cheer');
  }

  /* ---------------- word library ---------------- */
  let wordFilter = 'all', wordQuery = '';

  function renderWords() {
    const host = $('#wordList');
    const q = wordQuery.trim().toLowerCase();
    let list = D.WORDS.filter(w => {
      if (wordFilter === 'new') return isNew(w);
      if (wordFilter === 'due') return isDue(w);
      if (wordFilter === 'mastered') return isMastered(w);
      if (wordFilter === 'learning') return !isNew(w) && !isMastered(w);
      return true;
    }).filter(w => !q || (w.w + w.cn + w.en + w.ex).toLowerCase().includes(q));

    $('#wordStats').innerHTML = [
      I.t('wordStatTotal')(D.WORDS.length), I.t('wordStatDue')(dueCount('w')),
      I.t('wordStatMastered')(D.WORDS.filter(isMastered).length), I.t('wordStatNew')(newCount('w'))
    ].map(s => `<span>${s}</span>`).join('');

    host.innerHTML = list.length ? list.map(w => {
      const r = rec(w);
      const dots = Array.from({ length: STEPS.length }, (_, i) => `<i class="${r && i <= r.stage ? 'on' : ''}"></i>`).join('');
      const dueTxt = r ? (r.due > Date.now() ? I.t('wDueOn')(soonText(r.due - Date.now())) : I.t('filterDue')) : I.t('filterNew');
      return `<li class="word-item${isDue(w) ? ' due' : ''}${isMastered(w) ? ' mastered' : ''}">
        <div class="w-top"><span class="w-name">${w.w}</span><span class="w-ipa">${w.ipa}</span><span class="w-pos">${w.pos}</span></div>
        <span class="w-cn">${w.cn}</span>
        <span class="w-en">${w.en}</span>
        <span class="w-ex">${w.ex}<br>${I.lang === 'zh' ? w.excn : ''}</span>
        <div class="w-foot"><span class="srs-dots">${dots}</span><span class="w-stage">${dueTxt}</span>
          <button class="mini-btn" data-say="${w.w}">${I.t('hearWord')}</button>
          ${!isMastered(w) ? `<button class="mini-btn" jn="master" data-id="${w.id}">${I.t('markMastered')}</button>` : `<span class="w-stage">✓ ${I.t('wMastered')}</span>`}
        </div></li>`;
    }).join('') : `<li class="muted">${I.t('wordNone')}</li>`;

    host.querySelectorAll('[data-say]').forEach(b => b.onclick = () => say(b.dataset.say));
    host.querySelectorAll('[jn="master"]').forEach(b => b.onclick = () => {
      const w = D.WORDS.find(x => x.id === b.dataset.id);
      S.srs[w.id] = { stage: STEPS.length - 1, due: Date.now() + 30 * DAY, right: (rec(w) || { right: 0 }).right + 1, wrong: 0, seen: true };
      save(); renderWords(); refreshStats();
    });
  }

  function say(text) {
    if (!('speechSynthesis' in window)) { toast(I.t('ttsUnavailable')); return; }
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.9;
      const v = speechSynthesis.getVoices().find(x => /^en[-_]GB/i.test(x.lang))
             || speechSynthesis.getVoices().find(x => /^en/i.test(x.lang));
      if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = 'en-GB'; }
      speechSynthesis.cancel();
      // iOS 上 cancel() 与 speak() 同帧调用常发不出声
      setTimeout(() => speechSynthesis.speak(u), 60);
    } catch (e) { toast(I.t('ttsUnavailable')); }
  }

  /* ---------------- mailbox ---------------- */
  function openLetter() {
    let pool = D.QUOTES.filter((_, i) => !S.seenQuotes.includes(i));
    if (!pool.length) { S.seenQuotes = []; pool = D.QUOTES.slice(); }
    const idx = D.QUOTES.indexOf(pool[Math.floor(Math.random() * pool.length)]);
    S.seenQuotes.push(idx); S.mails++; save(); refreshStats();
    const q = D.QUOTES[idx];
    $('#letterQuote').textContent = q.zh;
    $('#letterQuoteEn').textContent = q.en;
    $('#letterAuthor').textContent = '— ' + q.author;
    $('#letterNote').innerHTML = `<b>${q.cn}</b><br>${I.t('letterNote')(q.tag)}`;
    $('#btnCopyLetter').onclick = async () => {
      const txt = `${q.zh}\n${q.en}\n— ${q.author}`;
      try { await navigator.clipboard.writeText(txt); toast(I.t('copied')); }
      catch (e) { toast(I.t('copyFailed')); }
    };
    openModal('modalLetter');
  }

  /* ---------------- pets ---------------- */
  const PETS = [
    {
      id: 'cat', x: 8,
      lines: {
        zh: ['我在窗台趴着，你写你的，需要时叫我。', '做不完也没关系，先把眼前这一张做完。', '肩膀放下来一点，呼吸慢一格。', '刚才那题错了？错在提取的时候最便宜。', '如果心慌，先给这种感觉起个名字，再回到题目。', '我可以陪你安静五分钟，然后你只需做一题。'],
        en: ['I will sit by the window while you work. Call me if you need me.', 'You cannot finish everything. Finish this one card.', 'Drop your shoulders. Slow the breath by one notch.', 'Missed it? Errors are cheapest when they happen during retrieval.', 'Feeling nervous? Name that feeling first, then return to the card.', 'Let us sit quietly for five minutes, then you do exactly one card.']
      },
      cheer: { zh: ['嗯，你做到了。（抬眼看一下你）', '很好。继续保持这个节奏。'], en: ['Mm, you did it. (*glances up*)', 'Good. Keep this rhythm.'] },
      soothe: { zh: ['没关系，忘了很正常。', '这一题十分钟后还会回来。'], en: ['It is fine. Forgetting is normal.', 'This card will come back in ten minutes.'] },
      rest: { zh: ['你已经坐了挺久了，去窗边看一眼远处。', '休息是训练的一部分，不是偷懒。'], en: ['You have been sitting a while. Look out the window.', 'Rest is part of training, not a break from it.'] }
    },
    {
      id: 'dog', x: 42,
      lines: {
        zh: ['汪汪！今天也要一起刷题吗？', '走神很正常，走神之后回来就是练习。', '你昨天复习过，所以今天会，这不是运气。', '我闻到了"已完成"的味道，最喜欢那个味道了。', '先做最小的那一题，我会坐在这里看你做完。'],
        en: ['Woof! Revision together again today?', 'Mind-wandering is normal. Coming back IS the practice.', 'You knew it because you reviewed yesterday. That is not luck.', 'I can smell a finished task. Favourite smell.', 'Do the tiniest card first. I will watch you finish it.']
      },
      cheer: { zh: ['对！你自己想出来的！我看见了！', '连对了！这是练习的成果，不是天赋。', '太棒了，我们跳一下！'], en: ['Yes! You pulled that out yourself!', 'Correct again! That is practice, not talent.', 'Great — little jump of joy!'] },
      soothe: { zh: ['错一题不算什么，我陪你再来一次。', '下次见到它，你会更快想起来。'], en: ['One miss is nothing. Let us try it again.', 'Next time you see it, recall will be faster.'] },
      rest: { zh: ['我们出去走两分钟吧，回来脑子更清楚。', '喝水！然后休息五分钟。'], en: ['Two minute walk? The brain gets clearer.', 'Water first! Then five real minutes.'] }
    },
    {
      id: 'parrot', x: 74,
      lines: {
        zh: ['Retrieve！提取！先别看答案，想十秒。', '重复是记忆的妈妈，间隔是记忆的爸爸。', '跟我念：al-le-vi-ate，缓解。造句了吗？没造句就还没学会。', '今天你提取了几次？次数比时长更重要。', '我来说英文，你来说中文，快！'],
        en: ['Retrieve! Do not peek — think for ten seconds.', 'Repetition is the mother, spacing is the father.', 'Say it with me: al-le-vi-ate. Did you make a sentence? No? Then not learned yet.', 'How many retrievals today? Count beats duration.', 'I say English, you say Chinese. Quick!']
      },
      cheer: { zh: ['正确！啾！这个词现在属于你了。', '听，你自己说出来了，不是我说的。'], en: ['Correct! chirp! That word is yours now.', 'You said it, not me. Notice the difference.'] },
      soothe: { zh: ['想不起来？很好，这正是起效的地方。', '再问一次，明天这个时候我还会问你。'], en: ['Could not recall? That is where learning starts.', 'I will ask again — same time tomorrow.'] },
      rest: { zh: ['闭眼，听十秒窗外的声音。', '睡够了才记得住，这不是谣言。'], en: ['Eyes shut, listen to the window for ten seconds.', 'Sleep first, remember later. Not a rumour.'] }
    }
  ];
  const svgOf = {
    cat: `<svg viewBox="0 0 100 100"><g class="tail"><path d="M24 76 Q6 78 10 58" stroke="#7f7488" stroke-width="8" fill="none" stroke-linecap="round"/></g>
      <ellipse cx="52" cy="70" rx="30" ry="18" fill="#9c91a6"/><circle cx="70" cy="46" r="17" fill="#a89db1"/>
      <path d="M58 35 L53 21 L66 29 Z" fill="#7f7488"/><path d="M82 35 L88 21 L74 29 Z" fill="#7f7488"/>
      <ellipse class="eye" cx="65" cy="45" rx="2.6" ry="3.6" fill="#2f2b36"/><ellipse class="eye" cx="77" cy="45" rx="2.6" ry="3.6" fill="#2f2b36"/>
      <path d="M71 51 l-3 3 M71 51 l3 3" stroke="#5c5466" stroke-width="1.6" fill="none"/>
      <path d="M46 68 q-5 9 3 12 M60 70 q5 8 -3 12" stroke="#7f7488" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`,
    dog: `<svg viewBox="0 0 100 100"><g class="tail"><path d="M26 70 Q8 62 12 46" stroke="#b9834f" stroke-width="8" fill="none" stroke-linecap="round"/></g>
      <ellipse cx="54" cy="70" rx="30" ry="18" fill="#cf9b62"/><circle cx="72" cy="48" r="17" fill="#dcae76"/>
      <path d="M60 36 q-10 6 -6 22 q8 -2 10 -14 Z" fill="#a5703f"/><path d="M86 36 q8 8 2 22 q-8 -2 -8 -14 Z" fill="#a5703f"/>
      <ellipse class="eye" cx="68" cy="46" rx="2.6" ry="3" fill="#2f2b36"/><ellipse class="eye" cx="79" cy="46" rx="2.6" ry="3" fill="#2f2b36"/>
      <ellipse cx="74" cy="55" rx="4" ry="3" fill="#4b3625"/><path d="M74 58 v4" stroke="#4b3625" stroke-width="1.6"/>
      <path d="M70 65 q4 6 8 0 q-4 3 -8 0" fill="#e4737a"/><ellipse cx="42" cy="86" rx="6" ry="4" fill="#b9834f"/><ellipse cx="64" cy="86" rx="6" ry="4" fill="#b9834f"/></svg>`,
    parrot: `<svg viewBox="0 0 100 100"><path d="M40 84 h34" stroke="#8b6a4c" stroke-width="6" stroke-linecap="round"/>
      <ellipse cx="52" cy="62" rx="20" ry="26" fill="#3fa97a"/><g class="wing"><path d="M40 52 q-14 14 -2 30 q12 -4 14 -18 Z" fill="#2e8b62"/></g>
      <circle cx="56" cy="34" r="14" fill="#4cb98a"/><path d="M47 22 q-6 -10 4 -12 q0 8 6 10 Z" fill="#e8b23a"/>
      <path d="M66 32 q14 2 8 14 q-8 2 -12 -6 Z" fill="#f2a13c"/><ellipse class="eye" cx="60" cy="31" rx="2.6" ry="3" fill="#2f2b36"/>
      <path d="M52 80 q-2 8 2 12 M60 80 q2 8 -2 12" stroke="#c8892f" stroke-width="3" fill="none"/></svg>`
  };
  let petEls = {}, petIdx = { cat: 0, dog: 0, parrot: 0 }, revealed = {};

  function buildPets() {
    const host = $('#petZone');
    host.innerHTML = '';
    PETS.forEach(p => {
      const b = document.createElement('button');
      const label = 'pet' + p.id[0].toUpperCase() + p.id.slice(1);
      b.className = 'pet' + (S.partner === p.id ? ' selected' : '');
      b.style.left = p.x + '%';
      if (p.id === 'parrot') b.style.bottom = '54px';
      b.title = I.t(label + 'Name') + ' · ' + I.t(label + 'Role');
      b.setAttribute('aria-label', b.title);
      b.innerHTML = svgOf[p.id] + `<span class="pet-name">${I.t(label + 'Name')}</span>`;
      b.onclick = () => talkTo(p);
      host.appendChild(b);
      petEls[p.id] = b;
    });
  }

  function petLine(p, ctx) {
    const bank = p[ctx] || p.lines;
    const arr = bank[I.lang] || bank.zh;
    const i = (petIdx[p.id]++ ) % arr.length;
    return arr[i];
  }

  function talkTo(p) {
    S.partner = p.id; save();
    Object.values(petEls).forEach(e => e.classList.remove('selected'));
    petEls[p.id].classList.add('selected');
    const due = dueCount('q') + dueCount('w');
    const ctx = due > 6 && Math.random() < .5 ? 'rest' : (S.today.cards > 12 && Math.random() < .4 ? 'rest' : 'lines');
    let text = petLine(p, ctx);
    if (p.id === 'parrot' && !revealed.parrot) {
      const w = D.WORDS[Math.floor(Math.random() * D.WORDS.length)];
      text = I.lang === 'zh'
        ? `抽查！「${w.w}」是什么意思？（再点我就公布答案）<br><b>${I.t('partnerSet')(I.t('petParrotName'))}</b>`
        : `Pop quiz! What does "${w.w}" mean? (click me for the answer)<br><b>${I.t('partnerSet')(I.t('petParrotName'))}</b>`;
      revealed.parrot = w;
    } else if (p.id === 'parrot' && revealed.parrot) {
      const w = revealed.parrot; revealed.parrot = null;
      text = I.lang === 'zh' ? `${w.w} → <b>${w.cn}</b><br>${w.ex}` : `${w.w} → <b>${w.cn}</b><br>${w.ex}`;
    } else {
      text += `<br><span class="muted">${I.t('partnerSet')(I.t('pet' + p.id[0].toUpperCase() + p.id.slice(1) + 'Name'))}</span>`;
    }
    bubble(p, text);
  }

  function petReact(kind) {
    const p = PETS.find(x => x.id === (S.partner || 'dog')) || PETS[1];
    const el = petEls[p.id];
    if (kind === 'cheer' && el) { el.classList.remove('cheer'); void el.offsetWidth; el.classList.add('cheer'); }
    if (Math.random() < (kind === 'cheer' ? .8 : .5)) bubble(p, petLine(p, kind === 'cheer' ? 'cheer' : kind === 'soothe' ? 'soothe' : 'rest'));
  }

  function bubble(p, html) {
    const layer = $('#bubbleLayer'), pet = petEls[p.id];
    if (!pet) return;
    const old = layer.querySelector('.bubble'); if (old) old.remove();
    const b = document.createElement('div');
    b.className = 'bubble'; b.innerHTML = html;
    layer.appendChild(b);
    const lr = layer.getBoundingClientRect(), pr = pet.getBoundingClientRect();
    const bw = b.offsetWidth, bh = b.offsetHeight;
    b.style.left = Math.max(8, Math.min(lr.width - bw - 8, pr.left - lr.left + pr.width / 2 - 40)) + 'px';
    b.style.top = Math.max(8, (pr.top - lr.top) - bh - 14) + 'px';
    clearTimeout(bubble._t);
    bubble._t = setTimeout(() => { b.style.transition = 'opacity .5s'; b.style.opacity = '0'; setTimeout(() => b.remove(), 520); }, 5200);
  }

  function wander() {
    // 小屏随机游走会让三只宠物挤在一起误触，改成等距固定槽位
    const slots = isSmallScreen() ? [2, 34, 66] : null;
    PETS.forEach((p, i) => {
      if (!petEls[p.id]) return;
      const x = slots ? slots[i] : 4 + Math.random() * 82;
      petEls[p.id].style.left = x + '%';
      p.x = x;
    });
  }

  function bumpMood() {
    if (Math.random() < .35) petReact('cheer');
    if (S.today.cards > 0 && S.today.cards % 15 === 0) {
      const p = PETS.find(x => x.id === 'cat');
      bubble(p, petLine(p, 'rest'));
    }
  }

  /* ---------------- help ---------------- */
  function renderHelp() {
    $('#helpBody').innerHTML = D.HELP.map(h =>
      `<div class="card"><h3>${h.title[I.lang]}</h3><p style="margin:0">${h.body[I.lang]}</p></div>`
    ).join('') + `<div class="card"><p style="margin:0" class="muted">${I.t('petIntro')}</p></div>`;
  }

  /* ---------------- modal plumbing ---------------- */
  const openModal = (id) => { $('#' + id).hidden = false; };
  const closeModal = (id) => { $('#' + id).hidden = true; };
  document.addEventListener('click', (e) => {
    const c = e.target.closest('[data-close]');
    if (c) closeModal(c.dataset.close);
    if (e.target.classList.contains('modal')) e.target.hidden = true;
    if (e.target.closest('#openShelf')) { openModal('modalBook'); renderWords(); }
    if (e.target.closest('#mailboxBtn')) openLetter();
    if (e.target.closest('#btnNextLetter')) openLetter();
    if (e.target.closest('#btnStartQuiz')) startRun('q');
    if (e.target.closest('#btnWordDrill')) startRun('w');
    if (e.target.closest('#btnHelp')) { renderHelp(); openModal('modalHelp'); }
    if (e.target.closest('#unpinSeason')) { S.pinnedSeason = null; save(); tickClock(); }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $$('.modal').forEach(m => m.hidden = true); });

  /* ---------------- language ---------------- */
  function setLang(l) {
    S.lang = l; I.setLang(l); save();
    $('#btnZh').classList.toggle('active', l === 'zh');
    $('#btnEn').classList.toggle('active', l === 'en');
    I.apply();
    buildFilter(); refreshStats(); renderWords();
    if (!$('#modalQuiz').hidden) { run ? renderCard() : null; }
    tickClock();
    if (hasFinePointer()) $('#btnStartQuiz').scrollIntoView({ block: 'nearest' });
  }

  /* ---------------- init ---------------- */
  function init() {
    I.setLang(S.lang || 'zh');
    $('#btnZh').classList.toggle('active', I.lang === 'zh');
    $('#btnEn').classList.toggle('active', I.lang === 'en');
    $('#btnZh').onclick = () => setLang('zh');
    $('#btnEn').onclick = () => setLang('en');
    $$('[data-season-btn]').forEach(b => b.onclick = () => {
      S.pinnedSeason = b.dataset.seasonBtn; save(); tickClock();
      toast(I.t('seasonHint'));
    });
    $('#wordSearch').oninput = (e) => { wordQuery = e.target.value; renderWords(); };
    $('#wordFilter').onchange = (e) => { wordFilter = e.target.value; renderWords(); };
    $('#btnReset').onclick = () => {
      if (confirm(I.t('resetConfirm'))) { localStorage.removeItem(STORE); location.reload(); }
    };
    $('#mailboxBtn').onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLetter(); }
    };

    I.apply();
    buildTicks(); buildPets(); buildFilter(); renderWords(); refreshStats();
    tickClock();
    let clockTimer = setInterval(tickClock, 1000);
    // 手机切后台时停掉每秒的 DOM 写入，回到前台再续上
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { clearInterval(clockTimer); clockTimer = null; }
      else if (!clockTimer) { tickClock(); clockTimer = setInterval(tickClock, 1000); }
    });
    wander(); setInterval(wander, 6500);
    setTimeout(() => bubble(PETS[1], `${I.t('petPick')}<br><b>${I.t('petDogName')}</b>`), 1200);
  }

  /* ---------------- service worker ----------------
     file:// 双击打开（以及局域网 http://）时浏览器会拒绝注册 SW，
     这里按协议判断直接跳过，任何失败都静默，不影响页面正常使用。 */
  function registerSW() {
    if (!('serviceWorker' in navigator)) return;
    const secure = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    if (!secure) return;
    let hadController = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (hadController) { toast(I.t('swUpdated')); return; }
      hadController = true; // 首次接管，不打扰
    });
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }

  document.addEventListener('DOMContentLoaded', init);
  window.addEventListener('load', registerSW);
})();
