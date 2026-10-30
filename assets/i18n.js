/* ============ i18n 词典 ============ */
(function (global) {
  const zh = {
    appTitle: '六级学习小屋',
    appSub: '虚拟学习空间 · 间隔复习',
    helpBtn: '学习原理',
    resetBtn: '重置进度',
    resetConfirm: '确定清空全部学习进度吗？这个操作无法撤销。',

    seasonSpring: '春', seasonSummer: '夏', seasonAutumn: '秋', seasonWinter: '冬',
    seasonFull: { spring: '春天', summer: '夏天', autumn: '秋天', winter: '冬天' },
    seasonHint: '按月份自动切换，点按钮可手动固定',
    todMorning: '清晨', todDay: '白天', todDusk: '黄昏', todNight: '夜晚',
    weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    dateLine: (d) => `${d.getMonth() + 1}月${d.getDate()}日 ${zh.weekdays[d.getDay()]}`,
    autoSeason: '自动', pinnedSeason: '手动',

    posterTitle: '今日专注', cardsUnit: '张卡',
    streakZero: '还没有连续记录',
    streakLine: (n) => `已连续学习 ${n} 天`,

    /* 窗口一 书架 */
    shelfLabel: '书架 · 单词库',
    bookTitle: '单词库',
    searchWord: '搜索单词 / 释义',
    filterAll: '全部', filterNew: '没学过', filterLearning: '学习中', filterDue: '今天要复习', filterMastered: '已掌握',
    wordDrill: '单词复习',
    wordStatTotal: (n) => `共 ${n} 个词`,
    wordStatDue: (n) => `待复习 ${n}`,
    wordStatMastered: (n) => `已掌握 ${n}`,
    wordStatNew: (n) => `未学 ${n}`,
    wordNone: '这个筛选下暂时没有单词',
    wStage: (s) => s === 0 ? '未安排' : `第 ${s} 个记忆点`,
    wDueOn: (d) => `${d} 后复习`,
    wMastered: '已掌握',
    markMastered: '标记掌握',
    hearWord: '朗读',

    /* 窗口二 题库 */
    window2Title: '窗口二 · 六级题库',
    window2Sub: '按遗忘曲线安排复习',
    dueNow: '到期复习', newLeft: '未学新题', mastery: '掌握度',
    startQuiz: '开始测试',
    quizNote: '答完自动排入下一个复习点',
    quizTitle: '六级测试',
    wordQuizTitle: '单词复习',
    secAll: '全部题型',
    sections: { vocab: '词汇', grammar: '语法', reading: '阅读', translation: '翻译', writing: '写作' },
    tagNew: '新学', tagReview: (s) => `复习 · 第 ${s} 点`,
    qIndex: (i, n) => `第 ${i} / ${n} 题`,
    qCorrect: '答对了！', qWrong: '再想一想',
    qExplain: '解析',
    gradeLabel: '这次记得怎么样？（自评会决定下一次复习时间）',
    gAgain: '完全忘了', gHard: '有点模糊', gGood: '记得很清楚',
    gHintAgain: '10 分钟后再来', gHintHard: '保持在当前记忆点', gHintGood: '跳到下一个记忆点',
    showAnswer: '看看参考答案', refAnswer: '参考答案',
    nextBtn: '下一题', finishBtn: '结束本轮',
    quizDoneTitle: '这一轮完成啦',
    backToRoom: '返回小屋',
    quizDoneBody: (n) => `本轮处理了 <b>${n}</b> 张卡片。间隔复习的关键不是今天就记住，而是让遗忘发生在被提醒之前。`,
    quizEmptyAll: '今天没有到期的卡片，也没有新题',
    quizEmptyFiltered: '这个题型下没有可练习的卡片',
    quizNextDue: (t) => `下一张卡片排在 ${t} 后`,
    soon10min: '约 10 分钟', soonHours: (h) => `约 ${h} 小时`, soonDays: (d) => `约 ${d} 天`,
    essayPrompt: '请按六级作文要求写一段（建议 150–200 词）：',
    transPrompt: '请把下面段落翻译成英文（六级段落翻译）：',
    timerLabel: '用时',

    /* 窗口三 信箱 */
    window3Title: '窗口三 · 灵感信箱',
    window3Sub: '点一下，收一封短信',
    letterHi: '亲爱的同学：',
    nextLetter: '再拆一封', copyLetter: '复制',
    copied: '已复制到剪贴板', copyFailed: '复制失败，请手动选择文字',
    ttsUnavailable: '这台设备没有可用的英文朗读', swUpdated: '小屋已更新到最新版本',
    mailZero: '还没开过信',
    mailOpened: (n) => `已拆开 ${n} 封信`,
    letterNote: (k) => {
      const map = { habit: '把行为变小，比把决心变大更可靠。', self: '自我同情不是找借口，而是让自己跌落后还能爬起来。',
        growth: '能力是被使用出来的，不是天生就有的。', focus: '注意力是你唯一真正稀缺的资源。',
        memory: '遗忘是正常过程，重复提取才是解药。', rest: '休息是训练的一部分，不是偷懒。',
        anxiety: '给情绪命名，情绪的影响力就会下降。', meaning: '找到意义感，坚持就不再靠意志力硬撑。' };
      return '心理学家提醒：' + (map[k] || '');
    },

    /* 宠物 */
    petCatName: '墨墨', petDogName: '旺财', petParrotName: '啾啾',
    petCatRole: '安静陪伴 · 减压', petDogRole: '即时鼓励 · 强化', petParrotRole: '抽查单词 · 输出练习',
    petPick: '点一只宠物聊聊，再点一次取消',
    petTalkBtn: '和它聊聊',
    choosePetHint: '选一只宠物作为今天的学习伙伴',
    partnerSet: (n) => `今天的学习伙伴是 <b>${n}</b>`,

    /* help */
    helpTitle: '这个空间怎么帮你记住',
    petIntro: '三只宠物的对话参考了心理学中的正向强化、自我决定理论与情绪命名练习。',

    /* toast */
    savedProgress: '进度已保存在本地浏览器'
  };

  const en = {
    appTitle: 'Study Grove · CET-6',
    appSub: 'Virtual study space · spaced review',
    helpBtn: 'How it works',
    resetBtn: 'Reset',
    resetConfirm: 'Clear all study progress? This cannot be undone.',

    seasonSpring: 'Spr', seasonSummer: 'Sum', seasonAutumn: 'Aut', seasonWinter: 'Win',
    seasonFull: { spring: 'Spring', summer: 'Summer', autumn: 'Autumn', winter: 'Winter' },
    seasonHint: 'Follows the month automatically; click a button to pin one',
    todMorning: 'Morning', todDay: 'Daytime', todDusk: 'Dusk', todNight: 'Night',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dateLine: (d) => `${en.weekdays[d.getDay()]}, ${d.getMonth() + 1}/${d.getDate()}`,
    autoSeason: 'Auto', pinnedSeason: 'Pinned',

    posterTitle: 'TODAY', cardsUnit: 'cards',
    streakZero: 'No streak yet',
    streakLine: (n) => `${n}-day streak`,

    shelfLabel: 'Bookshelf · Words',
    bookTitle: 'Word Library',
    searchWord: 'Search word / meaning',
    filterAll: 'All', filterNew: 'Unseen', filterLearning: 'Learning', filterDue: 'Due today', filterMastered: 'Mastered',
    wordDrill: 'Drill words',
    wordStatTotal: (n) => `${n} words`,
    wordStatDue: (n) => `${n} due`,
    wordStatMastered: (n) => `${n} mastered`,
    wordStatNew: (n) => `${n} unseen`,
    wordNone: 'No words in this filter',
    wStage: (s) => s === 0 ? 'Not scheduled' : `Step ${s}`,
    wDueOn: (d) => `Review in ${d}`,
    wMastered: 'Mastered',
    markMastered: 'Mark mastered',
    hearWord: 'Say it',

    window2Title: 'Window 2 · CET-6 Bank',
    window2Sub: 'Scheduled by the forgetting curve',
    dueNow: 'Due now', newLeft: 'New cards', mastery: 'Mastery',
    startQuiz: 'Start session',
    quizNote: 'Every answer schedules the next review',
    quizTitle: 'CET-6 Session',
    wordQuizTitle: 'Word drill',
    secAll: 'All types',
    sections: { vocab: 'Vocab', grammar: 'Grammar', reading: 'Reading', translation: 'Translate', writing: 'Writing' },
    tagNew: 'New', tagReview: (s) => `Review · step ${s}`,
    qIndex: (i, n) => `Card ${i} of ${n}`,
    qCorrect: 'Correct!', qWrong: 'Not quite',
    qExplain: 'Why',
    gradeLabel: 'How well did you recall it? (your rating sets the next interval)',
    gAgain: 'Forgot it', gHard: 'Fuzzy', gGood: 'Clear',
    gHintAgain: 'Back in ~10 min', gHintHard: 'Stay on this step', gHintGood: 'Move to next step',
    showAnswer: 'Show reference', refAnswer: 'Reference answer',
    nextBtn: 'Next card', finishBtn: 'Finish round',
    quizDoneTitle: 'Round complete',
    backToRoom: 'Back to the room',
    quizDoneBody: (n) => `You handled <b>${n}</b> cards. The goal is not to remember everything today — it is to review just before you forget.`,
    quizEmptyAll: 'Nothing is due and no new cards left',
    quizEmptyFiltered: 'No cards in this section',
    quizNextDue: (t) => `Next card in ${t}`,
    soon10min: 'about 10 min', soonHours: (h) => `about ${h} h`, soonDays: (d) => `about ${d} days`,
    essayPrompt: 'Write a CET-6 style essay (150–200 words):',
    transPrompt: 'Translate the paragraph into English (CET-6 paragraph translation):',
    timerLabel: 'Time',

    window3Title: 'Window 3 · Quote Mailbox',
    window3Sub: 'Click once, open a note',
    letterHi: 'Dear learner,',
    nextLetter: 'Another one', copyLetter: 'Copy',
    copied: 'Copied to clipboard', copyFailed: 'Copy failed, select the text manually',
    ttsUnavailable: 'No English voice is available on this device', swUpdated: 'Study Grove updated to the latest version',
    mailZero: 'No letters opened yet',
    mailOpened: (n) => `${n} letters opened`,
    letterNote: (k) => {
      const map = { habit: 'Shrink the behaviour before you enlarge your willpower.',
        self: 'Self-compassion is not an excuse — it is what lets you get up again.',
        growth: 'Ability is built by being used, not given at birth.',
        focus: 'Attention is the only resource you truly lack.',
        memory: 'Forgetting is normal; effortful retrieval is the antidote.',
        rest: 'Rest is part of training, not a break from it.',
        anxiety: 'Name the feeling and it loses some power.',
        meaning: 'Find the meaning and persistence stops depending on grit.' };
      return 'Psychology note: ' + (map[k] || '');
    },

    petCatName: 'Ink', petDogName: 'Peanut', petParrotName: 'Pip',
    petCatRole: 'Quiet company · calm', petDogRole: 'Instant praise · reinforcement', petParrotRole: 'Pop quizzes · output practice',
    petPick: 'Click a pet to talk, click again to cancel',
    petTalkBtn: 'Chat with me',
    choosePetHint: 'Pick today\'s study partner',
    partnerSet: (n) => `Today\'s partner is <b>${n}</b>`,

    helpTitle: 'Why this room helps you remember',
    petIntro: 'The three pets speak from positive reinforcement, self-determination theory and affect labelling.',

    savedProgress: 'Progress is saved in your browser only'
  };

  const dict = { zh, en };
  let lang = 'zh';

  const I18N = {
    get lang() { return lang; },
    setLang(l) { lang = dict[l] ? l : 'zh'; document.documentElement.dataset.lang = lang; document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'; },
    t(key, vars) {
      const v = (dict[lang] && dict[lang][key] !== undefined) ? dict[lang][key] : dict.zh[key];
      if (typeof v === 'function') return v;
      if (typeof v === 'string' && vars) return v.replace(/\{(\w+)\}/g, (_, k) => vars[k]);
      return v;
    },
    apply(root) {
      (root || document).querySelectorAll('[data-i18n]').forEach(el => {
        const v = I18N.t(el.dataset.i18n);
        if (typeof v === 'string') el.textContent = v;
      });
      (root || document).querySelectorAll('[data-i18n-ph]').forEach(el => {
        const v = I18N.t(el.dataset.i18nPh);
        if (typeof v === 'string') el.placeholder = v;
      });
    }
  };

  global.I18N = I18N;
})(window);
