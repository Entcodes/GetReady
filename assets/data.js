/* ============ 学习数据（自建示例题库，可继续扩充） ============ */
(function (global) {

  /* -------- 单词库：六级高频词 -------- */
  const WORDS = [
    { w: 'abandon', ipa: '/əˈbændən/', pos: 'v.', cn: '放弃；抛弃', en: 'to give up or leave behind', ex: 'He abandoned the plan after the third failure.', excn: '第三次失败后他放弃了这个计划。' },
    { w: 'abundant', ipa: '/əˈbʌndənt/', pos: 'adj.', cn: '丰富的，充裕的', en: 'existing in large quantities', ex: 'The region has abundant water resources.', excn: '该地区水资源丰富。' },
    { w: 'acknowledge', ipa: '/əkˈnɒlɪdʒ/', pos: 'v.', cn: '承认；答谢', en: 'to accept or admit that something is true', ex: 'She acknowledged that the deadline was unrealistic.', excn: '她承认截止日期不现实。' },
    { w: 'accumulate', ipa: '/əˈkjuːmjəleɪt/', pos: 'v.', cn: '积累，积聚', en: 'to gather together over time', ex: 'Dust accumulates if you never clean the shelf.', excn: '不清扫的话，架子上会积灰。' },
    { w: 'adapt', ipa: '/əˈdæpt/', pos: 'v.', cn: '适应；改编', en: 'to change so as to suit new conditions', ex: 'It took a term to adapt to campus life.', excn: '他花了一学期才适应校园生活。' },
    { w: 'advocate', ipa: '/ˈædvəkeɪt/', pos: 'v./n.', cn: '提倡；拥护者', en: 'to publicly support an idea or policy', ex: 'Many scholars advocate smaller class sizes.', excn: '许多学者提倡更小的班级规模。' },
    { w: 'alleviate', ipa: '/əˈliːvieɪt/', pos: 'v.', cn: '减轻，缓解', en: 'to make suffering less severe', ex: 'Short naps can alleviate exam anxiety.', excn: '短时小睡能缓解考试焦虑。' },
    { w: 'ambiguous', ipa: '/æmˈbɪɡjuəs/', pos: 'adj.', cn: '模棱两可的', en: 'having more than one possible meaning', ex: 'The instructions were ambiguous and caused errors.', excn: '说明书含混不清，导致了错误。' },
    { w: 'analyze', ipa: '/ˈænəlaɪz/', pos: 'v.', cn: '分析', en: 'to examine something in detail', ex: 'We analyzed the data from 300 questionnaires.', excn: '我们分析了300份问卷的数据。' },
    { w: 'anticipate', ipa: '/ænˈtɪsɪpeɪt/', pos: 'v.', cn: '预期，预料', en: 'to expect and prepare for something', ex: 'We anticipate a rise in enrolment next year.', excn: '我们预计明年招生人数会增加。' },
    { w: 'authentic', ipa: '/ɔːˈθentɪk/', pos: 'adj.', cn: '真实的，可信的', en: 'genuine; of known origin', ex: 'Find authentic sources before quoting figures.', excn: '引用数字前先找到可靠来源。' },
    { w: 'boost', ipa: '/buːst/', pos: 'v./n.', cn: '提高，促进', en: 'to increase or improve something', ex: 'Reviewing before bed can boost retention.', excn: '睡前复习能提高记忆保持。' },
    { w: 'barrier', ipa: '/ˈbæriə/', pos: 'n.', cn: '障碍，屏障', en: 'something that blocks progress', ex: 'Language is often a barrier to teamwork.', excn: '语言常常是协作的障碍。' },
    { w: 'calculate', ipa: '/ˈkælkjuleɪt/', pos: 'v.', cn: '计算；估计', en: 'to find an amount by mathematical methods', ex: 'Calculate the cost per credit hour first.', excn: '先算出每学分的费用。' },
    { w: 'capable', ipa: '/ˈkeɪpəbl/', pos: 'adj.', cn: '有能力的', en: 'able to do things effectively', ex: 'She is capable of running the whole project.', excn: '她有能力负责整个项目。' },
    { w: 'challenge', ipa: '/ˈtʃælɪndʒ/', pos: 'n./v.', cn: '挑战；质疑', en: 'a difficult task; to dispute something', ex: 'The main challenge is time management.', excn: '最大的挑战是时间管理。' },
    { w: 'circumstance', ipa: '/ˈsɜːkəmstəns/', pos: 'n.', cn: '情况，环境', en: 'a condition that affects a situation', ex: 'Under no circumstances should you skip the review.', excn: '任何情况下你都不应跳过复习。' },
    { w: 'coerce', ipa: '/kwəʊˈɜːs/', pos: 'v.', cn: '强迫', en: 'to force someone to do something', ex: 'Nobody coerced you into choosing this major.', excn: '没人强迫你选这个专业。' },
    { w: 'cognitive', ipa: '/ˈkɒɡnətɪv/', pos: 'adj.', cn: '认知的', en: 'related to thinking and learning', ex: 'Cognitive load rises when notes are messy.', excn: '笔记杂乱时认知负担会上升。' },
    { w: 'comprehensive', ipa: '/ˌkɒmprɪˈhensɪv/', pos: 'adj.', cn: '综合的，全面的', en: 'including all or nearly all elements', ex: 'The report gives a comprehensive overview.', excn: '这份报告给出了全面的概述。' },
    { w: 'consequence', ipa: '/ˈkɒnsɪkwəns/', pos: 'n.', cn: '结果，后果', en: 'a result or effect of an action', ex: 'Skipping sleep has serious consequences for memory.', excn: '缺觉对记忆有严重后果。' },
    { w: 'contribute', ipa: '/kənˈtrɪbjuːt/', pos: 'v.', cn: '贡献；促成', en: 'to help cause or add to something', ex: 'Daily reading contributes to a larger vocabulary.', excn: '每天阅读有助于扩大词汇量。' },
    { w: 'contemporary', ipa: '/kənˈtemprəri/', pos: 'adj.', cn: '当代的；同时代的', en: 'of the present time', ex: 'The course covers contemporary Chinese literature.', excn: '这门课涉及中国当代文学。' },
    { w: 'crucial', ipa: '/ˈkruːʃl/', pos: 'adj.', cn: '至关重要的', en: 'extremely important', ex: 'Sleep is crucial for consolidating memories.', excn: '睡眠对记忆固化至关重要。' },
    { w: 'declare', ipa: '/dɪˈkleə/', pos: 'v.', cn: '宣布，声明', en: 'to state formally', ex: 'They declared the experiment a success.', excn: '他们宣布实验成功。' },
    { w: 'deliberate', ipa: '/dɪˈlɪbərət/', pos: 'adj.', cn: '故意的；深思熟虑的', en: 'done on purpose; carefully considered', ex: 'Practice requires deliberate, not mindless, repetition.', excn: '练习需要刻意重复，而非机械刷题。' },
    { w: 'demonstrate', ipa: '/ˈdemənstreɪt/', pos: 'v.', cn: '证明；演示', en: 'to show clearly by evidence or action', ex: 'The data demonstrate a strong link between sleep and recall.', excn: '数据证明睡眠与回忆密切相关。' },
    { w: 'derive', ipa: '/dɪˈraɪv/', pos: 'v.', cn: '得到；源于', en: 'to obtain from a source', ex: 'Many English words derive from Latin.', excn: '许多英语单词源自拉丁语。' },
    { w: 'dilemma', ipa: '/dɪˈlemə/', pos: 'n.', cn: '困境，进退两难', en: 'a situation with two difficult choices', ex: 'He faced the dilemma of working or studying abroad.', excn: '他面临工作还是出国深造的两难。' },
    { w: 'diminish', ipa: '/dɪˈmɪnɪʃ/', pos: 'v.', cn: '减少，削弱', en: 'to make or become smaller', ex: 'Interest in the topic did not diminish over time.', excn: '对这个话题的兴趣并未随时间减退。' },
    { w: 'distinct', ipa: '/dɪˈstɪŋkt/', pos: 'adj.', cn: '明显的；不同的', en: 'clearly different; unmistakable', ex: 'The two theories lead to distinct predictions.', excn: '两种理论得出不同的预测。' },
    { w: 'diverse', ipa: '/daɪˈvɜːs/', pos: 'adj.', cn: '多样的', en: 'showing much variety', ex: 'The library serves a diverse student community.', excn: '图书馆服务于多元化的学生群体。' },
    { w: 'dominant', ipa: '/ˈdɒmɪnənt/', pos: 'adj.', cn: '占主导的', en: 'more powerful or common than others', ex: 'Mobile apps are now the dominant way to read news.', excn: '移动应用已是主要的新闻阅读方式。' },
    { w: 'eliminate', ipa: '/ɪˈlɪmɪneɪt/', pos: 'v.', cn: '消除，排除', en: 'to remove completely', ex: 'Eliminate one distraction and focus improves.', excn: '消除一个干扰源，专注度就会提升。' },
    { w: 'emphasize', ipa: '/ˈemfəsaɪz/', pos: 'v.', cn: '强调', en: 'to give special importance to', ex: 'The lecture emphasized active recall over rereading.', excn: '讲座强调主动回忆比重读更有效。' },
    { w: 'enhance', ipa: '/ɪnˈhɑːns/', pos: 'v.', cn: '提高，增强', en: 'to improve quality or value', ex: 'Spacing study days enhances long-term memory.', excn: '拉开学习日间隔能增强长时记忆。' },
    { w: 'evaluate', ipa: '/ɪˈvæljueɪt/', pos: 'v.', cn: '评估', en: 'to judge value or quality', ex: 'Teachers evaluate progress, not only accuracy.', excn: '老师评估的不仅是正确率，还有进步。' },
    { w: 'evidence', ipa: '/ˈevɪdəns/', pos: 'n.', cn: '证据', en: 'facts that support a belief', ex: 'There is strong evidence for spaced practice.', excn: '有充分证据支持间隔练习。' },
    { w: 'facilitate', ipa: '/fəˈsɪlɪteɪt/', pos: 'v.', cn: '促进，使便利', en: 'to make an action easier', ex: 'A quiet desk facilitates deep reading.', excn: '安静的书桌有助于深度阅读。' },
    { w: 'fundamental', ipa: '/ˌfʌndəˈmentl/', pos: 'adj.', cn: '基本的，根本的', en: 'forming a necessary base', ex: 'Vocabulary is fundamental to reading speed.', excn: '词汇是阅读速度的基础。' },
    { w: 'generate', ipa: '/ˈdʒenəreɪt/', pos: 'v.', cn: '产生，生成', en: 'to cause something to arise', ex: 'Testing yourself generates stronger memory than highlighting.', excn: '自测比重记笔记产生更强的记忆。' },
    { w: 'hypothesis', ipa: '/haɪˈpɒθəsɪs/', pos: 'n.', cn: '假说', en: 'an idea tested by research', ex: 'Their hypothesis about forgetting matched the data.', excn: '他们关于遗忘的假说与数据吻合。' },
    { w: 'implement', ipa: '/ˈɪmplɪment/', pos: 'v.', cn: '实施，执行', en: 'to put a plan into action', ex: 'The school implemented a new reading program.', excn: '学校实施了一项新的阅读计划。' },
    { w: 'incentive', ipa: '/ɪnˈsentɪv/', pos: 'n.', cn: '刺激，动机', en: 'something that encourages action', ex: 'A pet that cheers you is a small but real incentive.', excn: '会为你欢呼的宠物是虽小却真实的激励。' },
    { w: 'indicate', ipa: '/ˈɪndɪkeɪt/', pos: 'v.', cn: '表明；指示', en: 'to point out or show', ex: 'The score indicates steady improvement.', excn: '这个分数表明在稳步提升。' },
    { w: 'inevitable', ipa: '/ɪnˈevɪtəbl/', pos: 'adj.', cn: '不可避免的', en: 'certain to happen', ex: 'Forgetting is inevitable; review is the response.', excn: '遗忘不可避免，复习才是应对方式。' },
    { w: 'justify', ipa: '/ˈdʒʌstɪfaɪ/', pos: 'v.', cn: '证明…正当', en: 'to show something is reasonable', ex: 'Three hours of reading justify the time spent.', excn: '三小时的阅读足以证明付出的时间值得。' },
    { w: 'legitimate', ipa: '/lɪˈdʒɪtɪmət/', pos: 'adj.', cn: '合法的；合理的', en: 'lawful or reasonable', ex: 'Rest days are a legitimate part of study plans.', excn: '休息日是学习计划中合理的一部分。' },
    { w: 'motivate', ipa: '/ˈməʊtɪveɪt/', pos: 'v.', cn: '激励', en: 'to give someone a reason to act', ex: 'Choice in what to study motivates learners.', excn: '能自选学习内容会激发学习者动力。' },
    { w: 'notion', ipa: '/ˈnəʊʃn/', pos: 'n.', cn: '观念，概念', en: 'an idea or belief', ex: 'The notion that cramming works has weak support.', excn: '“临时抱佛脚有效”这一观念缺乏依据。' },
    { w: 'obstacle', ipa: '/ˈɒbstəkl/', pos: 'n.', cn: '障碍', en: 'something that blocks progress', ex: 'Procrastination is the biggest obstacle this term.', excn: '拖延是这学期最大的障碍。' },
    { w: 'perspective', ipa: '/pəˈspektɪv/', pos: 'n.', cn: '视角，观点', en: 'a way of thinking about something', ex: 'Try the problem from another perspective.', excn: '换个角度看这道题。' },
    { w: 'phenomenon', ipa: '/fəˈnɒmɪnən/', pos: 'n.', cn: '现象', en: 'an observable event or fact', ex: 'The forgetting curve is a well-studied phenomenon.', excn: '遗忘曲线是被充分研究的现象。' },
    { w: 'portray', ipa: '/pɔːˈtreɪ/', pos: 'v.', cn: '描绘；刻画', en: 'to describe or show in a picture or text', ex: 'The essay portrays campus life with humour.', excn: '这篇文章幽默地描绘了校园生活。' },
    { w: 'prior', ipa: '/ˈpraɪə/', pos: 'adj.', cn: '先前的；优先的', en: 'coming earlier in time or importance', ex: 'Finish the prior review before adding new cards.', excn: '加新卡前先完成到期的复习。' },
    { w: 'prohibit', ipa: '/prəˈhɪbɪt/', pos: 'v.', cn: '禁止', en: 'to formally forbid by rule', ex: 'The rules prohibit phones during the reading block.', excn: '规则规定阅读时段不得使用手机。' },
    { w: 'prominent', ipa: '/ˈprɒmɪnənt/', pos: 'adj.', cn: '著名的；突出的', en: 'important, well known, or noticeable', ex: 'A prominent researcher visited our campus.', excn: '一位著名研究者来访我们的校园。' },
    { w: 'regarding', ipa: '/rɪˈɡɑːdɪŋ/', pos: 'prep.', cn: '关于', en: 'concerning; in relation to', ex: 'I have questions regarding the timetable.', excn: '我有关于课程表的问题。' },
    { w: 'significant', ipa: '/sɪɡˈnɪfɪkənt/', pos: 'adj.', cn: '重要的；显著的', en: 'worth noticing; large enough to matter', ex: 'The difference was small but significant.', excn: '差异虽小却意义显著。' },
    { w: 'sufficient', ipa: '/səˈfɪʃnt/', pos: 'adj.', cn: '足够的', en: 'enough for a need', ex: 'Two passes are sufficient for this word list.', excn: '这份词表过两遍就够了。' },
    { w: 'subsequent', ipa: '/ˈsʌbsɪkwənt/', pos: 'adj.', cn: '随后的', en: 'coming after in time', ex: 'Subsequent tests confirmed the first result.', excn: '后续测试证实了最初的结果。' },
    { w: 'sustain', ipa: '/səˈsteɪn/', pos: 'v.', cn: '维持，支撑', en: 'to keep something going over time', ex: 'Interest sustains study better than pressure does.', excn: '兴趣比压力更能维持学习。' },
    { w: 'tendency', ipa: '/ˈtendənsi/', pos: 'n.', cn: '倾向', en: 'a likely habit or direction', ex: 'We have a tendency to overestimate cramming.', excn: '我们往往高估临时突击的效果。' },
    { w: 'transform', ipa: '/trænsˈfɔːm/', pos: 'v.', cn: '转变，改造', en: 'to change completely in form', ex: 'Habit can transform effort into ease.', excn: '习惯能把费力变成自然。' },
    { w: 'typical', ipa: '/ˈtɪpɪkl/', pos: 'adj.', cn: '典型的', en: 'showing the usual characteristics', ex: 'A typical CET-6 passage runs about 400 words.', excn: '典型的六级阅读篇章约400词。' },
    { w: 'ultimate', ipa: '/ˈʌltɪmət/', pos: 'adj.', cn: '最终的', en: 'last or final', ex: 'Our ultimate goal is real communication, not only the score.', excn: '我们的最终目标是真实交流，而不只是分数。' },
    { w: 'virtually', ipa: '/ˈvɜːtʃuəli/', pos: 'adv.', cn: '几乎；虚拟地', en: 'almost; in effect', ex: 'The exam is virtually impossible to guess.', excn: '这次考试几乎无法靠猜。' },
    { w: 'witness', ipa: '/ˈwɪtnəs/', pos: 'v./n.', cn: '目睹；证人', en: 'to see something happen; a person who saw it', ex: 'This generation has witnessed rapid change.', excn: '这一代见证了快速的变化。' }
  ].map((x, i) => Object.assign({ id: 'w' + (i + 1) }, x));

  /* -------- 阅读篇章 -------- */
  const PASSAGES = {
    p1: {
      title: 'Spaced practice',
      en: 'Students often believe that a long night before the exam is the surest route to a good grade. Research on memory suggests the opposite. When a learner spreads the same amount of study across several days, each session begins while some of the earlier material has already faded. Recovering that material is harder, and it is precisely the effort of recovery that strengthens the trace. Ebbinghaus first measured this fading at the end of the nineteenth century, describing a curve in which forgetting is fastest in the hours after learning and slower thereafter. Modern classrooms put the finding to work by scheduling short reviews at widening intervals: one day, three days, a week. The point is not to avoid forgetting but to meet it at the right moment, when a little effort still brings it back.',
      zh: '学生常以为考前通宵是拿高分最稳的路。记忆研究给出的却是相反的结论：把同样的学习量分散到几天里，每次开始时先前的材料已经部分消退。重新提取会更难，而正是这种提取的努力强化了记忆痕迹。艾宾浩斯在十九世纪末首次测量了这种消退，指出遗忘在学习后的几小时内最快，此后逐渐变慢。今天的课堂把这一发现用于实践：按逐渐拉大的间隔安排短复习——一天、三天、一周。要点不是避免遗忘，而是在恰当的时刻与遗忘相遇，此时只需一点努力就能把它找回。'
    },
    p2: {
      title: 'The cost of the phone',
      en: 'A phone face-down on the desk is not neutral. In one experiment, participants who simply had their own device within sight performed worse on a working-memory task than those who left it in another room, even though nobody was interrupted. The authors called this "brain drain": the mere presence of a highly rewarding object consumes some of the capacity that would otherwise go to the task. The effect was largest for people who reported strong habits of checking. Critics note that the sample was small and the task artificial, and that a silent, timed notification badge may behave differently from a ringing call. Still, the practical advice is cheap: put the phone out of sight, and give attention back to the page.',
      zh: '桌上扣着的手机并非中性存在。在一项实验中，只是把手机放在视线范围内的参与者在记忆任务上的表现，比把手机留在另一个房间的人更差——尽管其间无人被打断。作者称此为"脑力流失"：一个高回报物体的单纯存在，就消耗了本可用于任务的容量。自评查看习惯越强的人，效应越明显。批评者指出样本很小、任务也较人为，静音的计时提醒与来电铃声可能表现不同。不过实用建议成本极低：把手机移出视线，把注意力还给书页。'
    },
    p3: {
      title: 'Reading on screens',
      en: 'Meta-analyses comparing paper and screen reading find a small but reliable advantage for paper when the goal is to build a mental model of a long, expository text. The advantage grows with time pressure and disappears when questions only ask for a single fact. Two explanations compete. One is physical: paper gives a stable sense of where information sits, which supports reconstruction. The other is behavioural: readers slow down and check themselves more carefully when they hold a bound object. Neither explanation makes screens useless. For short passages and quick lookups, screen reading is as good and far more convenient. What matters is knowing which task you are doing and choosing the medium that fits it.',
      zh: '对比纸质与屏幕阅读的元分析发现，当目标是为一篇较长的说明性文本建立心理模型时，纸质有微小但稳定的优势。这一优势随时间压力增大而消失，当题目只询问单个事实时尤其如此。有两种解释在竞争：一种是身体性的——纸质提供了信息位置感，支持重建；另一种是行为性的——读者手持一本书时读得更慢、检查更勤。两者都不意味着屏幕无用。对短文本和快速查找，屏幕阅读同样好，且方便得多。真正重要的是知道自己正在做哪种任务，并选择匹配的媒介。'
    },
    p4: {
      title: 'Motivation at a desk',
      en: 'Self-determination theory proposes that durable motivation rests on three needs: feeling competent, feeling the author of one\'s own choices, and feeling connected to others. A study room built around these needs looks different from one built around pressure. Tasks are chosen rather than imposed, so autonomy survives; difficulty is set so that success is possible but not automatic, so competence grows; and the work is shared with companions who notice progress, so relatedness is fed. The familiar reward sticker, by contrast, can backfire when it makes an interesting activity feel like paid labour. Praise that is specific and about effort rather than talent keeps the message honest without stealing the authorship.',
      zh: '自我决定理论认为，持久的动机建立在三种需要之上：感到胜任、感到自己是选择的主人、感到与他人相连。围绕这三种需要布置的学习空间，与围绕压力布置的很不一样。任务是自选而非强加的，自主感因此留存；难度设置在"可能成功但不会自动成功"的水平，胜任感因此增长；学习过程有会注意到进步的同伴参与，归属感因此得到滋养。相比之下，常见的奖励贴纸可能适得其反，因为它让一件有趣的事变成了计件劳动。而具体、针对努力而非天赋的表扬，既能让信息保持真诚，又不会夺走主体感。'
    }
  };

  /* -------- 题库 -------- */
  const Q = [];
  function mc(section, stem, stemZh, options, answer, explainZh, explainEn, passage) {
    Q.push({ id: 'q' + (Q.length + 1), type: 'mc', section, stem, stemZh, options, answer, explainZh, explainEn, passage });
  }
  function free(section, stem, stemZh, ref, explainZh, explainEn) {
    Q.push({ id: 'q' + (Q.length + 1), type: 'free', section, stem, stemZh, ref, explainZh, explainEn });
  }

  /* 词汇 */
  const VOCAB = [
    ['The new policy is expected to ___ the gap between urban and rural schools.', '新政策预计将___城乡学校之间的差距。',
      ['narrow', 'narrowed', 'narrowing', 'narrowly'], 0,
      'be expected to 后接动词原形；narrow 作动词意为"缩小"。', 'After "to" we need the base form; "narrow" works as a verb meaning to reduce.'],
    ['The evidence does not ___ the conclusion that sleep improves memory.', '这些证据并不能___“睡眠改善记忆”这一结论。',
      ['support', 'supports', 'supported', 'supportive'], 0,
      'does not 后接动词原形；support the conclusion 表"支持该结论"。', 'After "does not", use the base verb.'],
    ['Her explanation was so ___ that half the class asked for it again.', '她的解释过于___，以致一半同学要求再讲一遍。',
      ['ambiguous', 'abundant', 'authentic', 'accelerated'], 0,
      '语义题：要求重讲说明内容"含混"，ambiguous 模棱两可的。', "If people ask again, the wording was unclear — ambiguous."],
    ['Short, frequent reviews ___ the effect of a single long cramming session.', '短时高频的复习能___一次长时间突击的效果。',
      ['outperform', 'outperforms', 'outperforming', 'outperformed'], 0,
      '主语 reviews 为复数，谓语用原形 outperform"胜过"。', 'Plural subject takes the bare verb; outperform = do better than.'],
    ['The library remained ___ even during the busiest week of the term.', '即使在学期最忙的一周，图书馆仍然是___的。',
      ['accessible', 'accessibly', 'access', 'accession'], 0,
      '系动词 remained 后需形容词；accessible"可进入的、可使用的"。', 'After a linking verb we need an adjective.'],
    ['Any student who ___ the rules will be asked to leave the reading room.', '任何___规定的学生都会被请出阅览室。',
      ['violates', 'violate', 'violation', 'violently'], 0,
      '先行词 student 为单数，定语从句谓语用 violates。', 'The relative clause refers to a singular noun, so the verb takes -s.'],
    ['Researchers have ___ that spacing study days strengthens long-term recall.', '研究者已___，把学习的日子拉开间隔有助于长时记忆。',
      ['demonstrated', 'demonstrate', 'demonstrative', 'demonstrating'], 0,
      'have + 过去分词构成现在完成时。', '"Have" plus a past participle forms the present perfect.'],
    ['The results were ___ similar across three independent experiments.', '三次独立实验的结果___相似。',
      ['strikingly', 'striking', 'strike', 'struck'], 0,
      '修饰形容词 similar 需副词 strikingly"显著地"。', 'Adverbs modify adjectives.'],
    ['He has a ___ tendency to reread notes instead of testing himself.', '他有一个___倾向：重读笔记而不自测。',
      ['common', 'commonly', 'commence', 'communion'], 0,
      '名词 tendency 前需形容词 common。', 'An adjective is required before the noun.'],
    ['Being ___ with the format of the exam reduces anxiety on the day.', '___考试形式能降低考试当天的焦虑。',
      ['familiar', 'familiarity', 'famously', 'famine'], 0,
      'be familiar with"熟悉"。固定搭配。', 'The fixed phrase is be familiar with.'],
    ['The committee will ___ proposals until the end of May.', '委员会将___提案直到五月底。',
      ['consider', 'considerate', 'considering', 'considered'], 0,
      'will + 动词原形；consider"考虑"。', 'Modal "will" takes the base verb.'],
    ['There is no ___ evidence that cold weather causes the common cold.', '没有___证据表明寒冷天气会导致感冒。',
      ['conclusive', 'conclusion', 'conclude', 'conclusively'], 0,
      '修饰名词 evidence 需形容词 conclusive"确凿的"。', 'Adjective modifies the noun "evidence".'],
    ['She struggled to ___ between what she wanted and what she should do.', '她难以在她想要的和应该做的之间___。',
      ['distinguish', 'distant', 'distress', 'distort'], 0,
      'distinguish between A and B"区分"。', 'distinguish between ... and ...'],
    ['The programme aims to ___ participation from students who usually stay silent.', '该项目旨在___通常保持沉默的学生的参与度。',
      ['boost', 'boast', 'bounce', 'bound'], 0,
      'boost"提升"；boast 是"自夸"，形近干扰。', 'boost = increase; boast = brag. Watch the near-miss.'],
    ['His argument is logical, but it tells us nothing that is ___.', '他的论证合乎逻辑，却没有告诉我们任何___的东西。',
      ['useful', 'useless', 'usefully', 'used'], 0,
      '语义题：nothing + 形容词；由转折可知应填 useful。', 'A postpositive adjective after "nothing"; the contrast requires "useful".'],
    ['With enough practice, even difficult passages become ___ over time.', '练习足够后，即使难的篇章随时间也会变得___。',
      ['manageable', 'management', 'manifest', 'manly'], 0,
      'become + 形容词；manageable"可应付的"。', 'After "become" use an adjective.'],
    ['The study followed 300 participants over five years, which is ___ long for this field.', '该研究追踪了300名参与者共五年，对该领域而言___长。',
      ['unusually', 'unusual', 'unite', 'update'], 0,
      '副词修饰形容词 long；unusually"异常地"。', 'An adverb modifies the adjective.'],
    ['Please ___ your answer if any of the information has changed.', '如果信息有任何变化，请___你的答案。',
      ['revise', 'reverse', 'reviewed', 'reveal'], 0,
      'revise"修改"；reverse"颠倒"，形近干扰。', 'revise = change; reverse = turn back.'],
    ['Not only ___ the experiment succeed, but it also raised new questions.', '实验___成功了，还提出了新问题。',
      ['did', 'do', 'does', 'done'], 0,
      'Not only 位于句首引起部分倒装，助动词 did 提前。', 'Fronted "not only" triggers inversion.'],
    ['The more actively you retrieve a word, ___ likely you are to keep it.', '你越主动提取一个单词，就越___记住它。',
      ['the more', 'the most', 'more', 'most'], 0,
      'the + 比较级 ..., the + 比较级... 结构"越…越…"。', 'The comparative correlative: "the more X, the more Y".'],
    ['It is high time that we ___ a serious attitude toward revision.', '我们___对复习持认真态度了。',
      ['adopted', 'adopt', 'adopting', 'adopts'], 0,
      'It is (high) time that + 过去时，虚拟语气。', '"It is high time that" takes a past-tense subjunctive.']
  ];
  VOCAB.forEach(v => mc('vocab', v[0], v[1], v[2], v[3], v[4], v[5]));

  /* 语法与结构 */
  const GRAMMAR = [
    ['Hardly ___ the lecture begun when the lights went out.', '演讲___开始，灯就灭了。',
      ['had', 'has', 'have', 'was'], 0, 'Hardly ... when 结构用过去完成时并倒装。', '"Hardly had ... when ..." uses the past perfect with inversion.'],
    ['The report, together with two appendices, ___ submitted on Friday.', '报告连同两份附录于周五___。',
      ['was', 'were', 'have been', 'are'], 0, '主语是 the report，together with 短语不影响数。', 'With "together with", the verb agrees with the first subject only.'],
    ['___ more practice, the team would not have won.', '___更多训练，队伍不会赢。',
      ['But for', 'In case', 'Despite', 'Except'], 0, 'But for"要不是"引导含蓄虚拟。', '"But for" = "if it were not for", used in unreal conditions.'],
    ['I would rather you ___ the review session tomorrow morning.', '我宁愿你___明天上午的复习。',
      ['attend', 'attended', 'attending', 'will attend'], 1, 'would rather + 从句用过去时表将来意愿。', '"Would rather" + past tense for a present/future wish.'],
    ['___ with a difficult vocabulary, many readers give up in the first paragraph.', '___生词，许多读者第一段就放弃了。',
      ['Confronted', 'Confront', 'Confronting', 'To confront'], 0, '分词作状语，逻辑主语 readers 与 confront 是被动关系。', 'Past participle clause; readers are confronted BY the vocabulary.'],
    ['No sooner had she opened the book ___ the power failed.', '她刚打开书，电就断了。',
      ['than', 'when', 'that', 'then'], 0, 'No sooner ... than 固定搭配。', '"No sooner ... than" is a fixed correlative pair.'],
    ['The number of volunteers ___ sharply since last term.', '志愿者人数自上学期以来___。',
      ['has risen', 'have risen', 'rise', 'are rising'], 0, 'the number of + 复数名词，谓语用单数；since 用完成时。', '"The number of" takes a singular verb; "since" requires present perfect.'],
    ['It was in the quiet corner of the library ___ the idea finally came.', '正是在图书馆安静的角落，这个想法最终出现了。',
      ['that', 'which', 'where', 'when'], 0, '强调句型 It was ... that ...', 'Cleft sentence: It was X THAT ...'],
    ['Not until the deadline passed ___ how much work remained.', '直到截止日期过去，他___还剩多少工作。',
      ['did he realise', 'he realised', 'he did realise', 'that he realised'], 0, 'Not until 位于句首，主句部分倒装。', 'Fronted "not until" forces inversion in the main clause.'],
    ['She spoke as if she ___ everything about the experiment.', '她说得好像她___实验的一切。',
      ['knew', 'know', 'has known', 'will know'], 0, 'as if 从句对现在的虚拟用过去时。', '"As if" + past tense for an unreal present.'],
    ['___ the weather permitting, the opening ceremony will be held outdoors.', '___天气允许，开幕式将在户外举行。',
      ['Provided', 'Providing that', 'Provide', 'Both A and B'], 1, 'providing that 引导条件状语从句。', '"Providing that" introduces a condition.'],
    ['He wrote two papers, both of ___ are now cited widely.', '他写了两篇论文，___现在都被广泛引用。',
      ['which', 'them', 'that', 'whom'], 0, '非限制性定语从句用 both of which。', 'Non-restrictive relative clause: both of WHICH.'],
    ['The new syllabus is said ___ twice before it was approved.', '据说新大纲在批准前___两次。',
      ['to have been revised', 'to revise', 'revising', 'to be revised'], 0, 'be said to have done 表"据说已…"，且为被动。', '"Is said to have been + past participle" for an earlier passive action.'],
    ['___ for the scholarship interview, she would have taken that internship.', '___奖学金面试，她本会去接那个实习。',
      ['Had it not been', 'If it was not', 'Were it not', 'Had it not'], 0, '与过去事实相反的虚拟省略 if 的倒装：Had it not been for。', 'Inverted third conditional: "Had it not been for ...".'],
    ['There is no point ___ the same mistake over and over.', '反复犯同样的错误___。',
      ['in worrying about', 'to worry about', 'worry about', 'for worry'], 0, 'There is no point in doing sth 固定结构。', '"There is no point in + gerund".'],
    ['Less than twenty minutes ___ left before the listening section.', '听力开始前___不到二十分钟。',
      ['is', 'are', 'have been', 'were'], 0, '表时间、距离的复数数量常作整体，谓语用单数。', 'Periods of time usually take a singular verb.']
  ];
  GRAMMAR.forEach(g => mc('grammar', g[0], g[1], g[2], g[3], g[4], g[5]));

  /* 阅读 */
  function r(passage, stem, stemZh, options, answer, explainZh, explainEn) {
    mc('reading', stem, stemZh, options, answer, explainZh, explainEn, passage);
  }
  r('p1', 'According to the passage, spreading study across days works mainly because ___.', '文章认为把复习分散到多天之所以有效，主要因为___。',
    ['each session forces effortful recovery of partly faded material', 'it reduces the total amount of time spent reading', 'teachers can check attendance more easily', 'it removes the need to forget anything'], 0,
    '第一段：更难的重建过程正是强化记忆痕迹的原因。', 'The passage says the effort of recovery is what strengthens the trace.', null, null);
  r('p1', 'The word "thereafter" in paragraph 1 is closest in meaning to ___.', '第一段中 "thereafter" 最接近的意思是___。',
    ['after that', 'at first', 'in turn', 'by chance'], 0,
    '词义题：thereafter = 此后。', 'thereafter = after that time.', null, null);
  r('p1', 'What is the author\'s attitude to last-minute cramming?', '作者对考前突击的态度是？',
    ['Sceptical', 'Enthusiastic', 'Neutral', 'Unaware'], 0,
    '开篇指出学生相信突击、研究"建议相反"，态度是怀疑的。', 'The research "suggests the opposite" shows scepticism.', null, null);

  r('p2', 'The "brain drain" effect in the experiment was strongest among participants who ___.', '实验中"脑力流失"效应在___的参与者身上最强。',
    ['reported strong habits of checking their phone', 'owned the newest device', 'were interrupted by a call', 'left the room early'], 0,
    '细节题：原文"largest for people who reported strong habits of checking"。', 'Stated directly in the passage.', null, null);
  r('p2', 'Why does the author call the advice "cheap"?', '作者为何称这个建议"成本极低"？',
    ['Because putting the phone away requires almost no effort or cost', 'Because phones have become inexpensive', 'Because the experiment was low-budget', 'Because critics are easily ignored'], 0,
    '推断题：cheap 指做起来容易、几乎无代价。', 'In context, "cheap" means low-cost to act on.', null, null);
  r('p2', 'Which of the following would critics of the study most likely stress?', '批评者最可能强调什么？',
    ['The sample was small and the task artificial', 'The phone was not truly silent', 'Memory tasks are useless', 'Participants were dishonest'], 0,
    '细节题：批评指出样本小、任务人为。', 'The passage records these exact limitations.', null, null);

  r('p3', 'Paper shows an advantage over screens mainly when the reader must ___.', '当读者需要___时，纸质相对屏幕的优势最明显。',
    ['build a mental model of a long expository text', 'look up a single fact quickly', 'read before bed', 'share the text with others'], 0,
    '细节题：优势出现在需要建立长文心理模型时。', 'Stated in the first sentence.', null, null);
  r('p3', 'The two explanations offered for the paper advantage are ___.', '文中关于纸质优势的两种解释是___。',
    ['physical and behavioural', 'economic and cultural', 'historical and technical', 'linguistic and visual'], 0,
    '结构题：作者明确区分"一种是身体性的…另一种是行为性的"。', 'The text labels them physical and behavioural.', null, null);
  r('p3', 'What conclusion does the author finally draw?', '作者最终的结论是什么？',
    ['Choose the medium that fits the task', 'Return to paper for all study', 'Screens should be banned in libraries', 'Reading speed matters most'], 0,
    '主旨题：末句点明"知道自己做哪种任务并选择匹配的媒介"。', 'The last sentence states the practical conclusion.', null, null);

  r('p4', 'According to self-determination theory, durable motivation needs ___.', '根据自我决定理论，持久动机需要___。',
    ['competence, autonomy and connection', 'reward, punishment and routine', 'talent, luck and time', 'silence, solitude and sleep'], 0,
    '细节题：三需要为胜任、自主、归属。', 'The passage lists the three needs.', null, null);
  r('p4', 'Why can reward stickers backfire?', '奖励贴纸为什么会适得其反？',
    ['They can make an interesting activity feel like paid labour', 'They are too expensive to print', 'They are unfair to slow learners', 'They reduce teacher workload'], 0,
    '细节题：把有趣活动变成计件劳动。', 'The text gives this exact reason.', null, null);
  r('p4', 'Praise is described as healthier when it focuses on ___.', '表扬更健康的做法是聚焦于___。',
    ['specific effort rather than talent', 'rank rather than effort', 'results rather than process', 'speed rather than accuracy'], 0,
    '细节题：具体、针对努力而非天赋。', 'Final sentence of the passage.', null, null);

  /* 翻译（段落翻译，自评） */
  const TRANS = [
    ['中国把"碳达峰、碳中和"目标纳入生态文明建设整体布局，推动能源结构从化石燃料为主转向以可再生能源为主。',
      'China has included the carbon peak and carbon neutrality goals in the overall plan for ecological progress, shifting its energy structure from mainly fossil fuels to mainly renewable sources.',
      '考点：碳达峰 carbon peak、碳中和 carbon neutrality、生态文明 ecological progress。',
      'Key terms: carbon peak, carbon neutrality, ecological progress.'],
    ['过去五年里，网络课程的学习者数量增长了两倍，其中许多人是在职员工，利用晚上的时间充电。',
      'Over the past five years, the number of learners taking online courses has grown threefold, and many of them are working employees who use their evenings to upgrade their skills.',
      '中文"增长了两倍"＝变成原来的三倍，英文常说 grown threefold / increased by a factor of three。', 'Careful with multiples in English: threefold = 变成三倍.'],
    ['图书馆不仅藏有纸质图书，还提供数字资源和研讨空间，已经成为校园里最重要的学习场所之一。',
      'The library not only houses paper books but also provides digital resources and seminar rooms, and has become one of the most important places for study on campus.',
      'not only ... but also 与现在完成时是常见得分点。', 'not only ... but also; present perfect.'],
    ['随着人工智能进入课堂，教师的角色正在从知识的传递者转变为学习的设计者和引导者。',
      'As artificial intelligence enters the classroom, the teacher\'s role is shifting from a transmitter of knowledge to a designer and guide of learning.',
      'from ... to ... 的并列要对称。', 'Keep the two nouns after "from/to" parallel.'],
    ['这项调查显示，约六成受访者认为睡眠不足会直接影响第二天的注意力和记忆力。',
      'The survey shows that about sixty per cent of respondents believe lack of sleep directly affects attention and memory the next day.',
      'respondent、sleep deprivation/lack of sleep 是六级常用词。', 'respondents; sleep deprivation.'],
    ['中国传统节日往往与家庭团聚、祭祖和对自然的敬意联系在一起。',
      'Traditional Chinese festivals are often tied to family reunion, respect for ancestors and reverence for nature.',
      'be tied to / be associated with 处理"与…联系在一起"。', '"be associated with" for 与…联系在一起.']
  ];
  TRANS.forEach(t => free('translation', t[0], '请将下列中文段落译为英文。', t[1], t[2], t[3]));

  /* 写作 */
  const ESSAY = [
    ['Directions: For this part, you are allowed 30 minutes to write an essay on the topic "Why rereading notes feels easier than it helps". You should write at least 150 words but no more than 200 words.',
      '评阅要点：现象（重读笔记的"流利错觉"）→ 原因（提取才是强化路径）→ 做法（自测、间隔）。',
      '要点建议：开头描述重读为何"感觉有效"；中段用 retrieval practice 解释；结尾给出可操作的复习安排。',
      'Cover the fluency illusion, retrieval practice, and a concrete plan.'],
    ['Directions: Write an essay on "The value of a study partner". You should explain how a companion changes motivation and give at least two concrete examples. 150-200 words.',
      '评阅要点：归属感（relatedness）如何支撑动机；两个具体场景；结论避免空喊口号。',
      '要点建议：用自我决定理论的"归属感"解释；写自习打卡与互相提问两个场景。',
      'Use relatedness; two concrete scenes; avoid slogans.'],
    ['Directions: For this part, write an essay commenting on the remark "We suffer more often in imagination than in reality". You can cite examples. 150-200 words.',
      '评阅要点：先释义（预期焦虑大于现实痛苦）→ 举例（考前担忧、演讲恐惧）→ 办法（把担心写下来并核对结果）。',
      '要点建议：结合情绪命名与预期校准，写出可验证的做法。',
      'Define it, give examples, offer a checkable method.'],
    ['Directions: Write a short essay on "How to spend a rest day well". 150-200 words.',
      '评阅要点：区分"刷手机的假休息"与"恢复性休息"；说明睡眠、散步、社交的作用；结尾承认休息是训练的一部分。',
      '要点建议：以恢复为导向，写清注意力恢复理论的日常应用。',
      'Contrast fake rest with restorative rest; mention attention restoration.'],
    ['Directions: For this part, you are asked to write an essay on "Learning a language is learning a way of thinking". 150-200 words.',
      '评阅要点：语言与文化概念的关系；具体例子（时态、敬语、成语）；落到"如何学"。',
      '要点建议：用一两个中文与英文表达差异的实例支撑观点。',
      'Give real cross-linguistic examples and a practical conclusion.']
  ];
  ESSAY.forEach(e => free('writing', e[0], '按题目要求写作，写完后对照要点自评。', e[1], e[2], e[3]));

  /* -------- 信箱：名言（含心理学期刊关键词分类） -------- */
  const QUOTES = [
    { zh: '温故而知新，可以为师矣。', en: 'If a learner renews what has been learned and thereby discovers something new, that person may teach others.', cn: '如果能在复习旧知时有新的体会，就可以做别人的老师。', author: '孔子 ·《论语》', tag: 'memory' },
    { zh: '学而不思则罔，思而不学则殆。', en: 'Learning without thought leads to confusion; thought without learning leads to peril.', cn: '只读书不思考会迷惘，只空想不读书会危险。', author: '孔子 ·《论语》', tag: 'focus' },
    { zh: '不积跬步，无以至千里。', en: 'Without accumulating small steps, one cannot reach a thousand miles.', cn: '千里之路是一步一步走出来的，任何大目标都由微小单位组成。', author: '荀子 ·《劝学》', tag: 'habit' },
    { zh: '合抱之木，生于毫末；九层之台，起于累土；千里之行，始于足下。', en: 'A journey of a thousand miles begins with a single step.', cn: '巨大的事物都从极小的开端长出来。', author: '老子 ·《道德经》', tag: 'habit' },
    { zh: '路漫漫其修远兮，吾将上下而求索。', en: 'The road ahead is long and far; I shall search high and low.', cn: '把过程本身当作目的，是坚持者的心态。', author: '屈原 ·《离骚》', tag: 'meaning' },
    { zh: '知之者不如好之者，好之者不如乐之者。', en: 'Those who know it are not equal to those who love it; those who love it are not equal to those who enjoy it.', cn: '兴趣比义务更能维持长期行为。', author: '孔子 ·《论语》', tag: 'meaning' },
    { zh: '学问勤中得，萤窗万卷书。', en: 'Learning is gained through diligence.', cn: '把勤奋看成方法而不是道德要求，它才可复制。', author: '汪洙 ·《神童诗》', tag: 'habit' },
    { zh: '纸上得来终觉浅，绝知此事要躬行。', en: 'What we get from paper feels shallow; to truly know a thing, one must do it.', cn: '输出练习（说、写、考）比输入更接近理解。', author: '陆游 ·《冬夜读书示子聿》', tag: 'memory' },
    { zh: '它看起来不可能，直到被完成。', en: 'It always seems impossible until it is done.', cn: '难度感常常是进度感的一部分，而不是能力的判决书。', author: '纳尔逊·曼德拉', tag: 'growth' },
    { zh: '知识就是力量。', en: 'Knowledge is power.', cn: '真正的力量来自把知识用出来的那一刻。', author: '弗朗西斯·培根', tag: 'meaning' },
    { zh: '对学习的投资，回报最高。', en: 'An investment in knowledge pays the best interest.', cn: '把时间看作投资，而不是消耗。', author: '本杰明·富兰克林', tag: 'habit' },
    { zh: '愉快的学习，永不遗忘。', en: 'What we learn with pleasure we never forget.', cn: '情绪是记忆的粘合剂：越放松越容易记住。', author: '阿尔丰斯·卡尔', tag: 'self' },
    { zh: '一生中没有什么值得恐惧，只有值得理解的东西。', en: 'Nothing in life is to be feared, it is only to be understood.', cn: '把考试从威胁重新定义为信息。', author: '玛丽·居里', tag: 'anxiety' },
    { zh: '我们在想象中受的苦，比在现实中更多。', en: 'We suffer more often in imagination than in reality.', cn: '预期焦虑往往大于实际困难，考前尤其如此。', author: '塞涅卡 ·《致路奇里的信》', tag: 'anxiety' },
    { zh: '你拥有对自己思想的权力，而不是对外部事件的控制。认识到这一点，你就会找到力量。', en: 'You have power over your mind, not outside events. Realize this, and you will find strength.', cn: '把注意力从"结果"移回"可控的行为"。', author: '马可·奥勒留 ·《沉思录》', tag: 'anxiety' },
    { zh: '学习从不使心灵疲惫。', en: 'Learning never exhausts the mind.', cn: '让人疲惫的多半是压力与自我批评，而不是学习本身。', author: '列奥纳多·达·芬奇', tag: 'rest' },
    { zh: '重要的不是走得慢，而是不要停下来。', en: 'It does not matter how slowly you go, as long as you do not stop.', cn: '连续性比强度更重要。', author: '西方谚语', tag: 'habit' },
    { zh: '任何领域的专家，都曾是初学者。', en: 'The expert in anything was once a beginner.', cn: '所有高手都留下了笨拙的早期记录。', author: '传 · 海伦·海斯', tag: 'growth' },
    { zh: '成功是每天微小努力的总和。', en: 'Success is the sum of small efforts, repeated day in and day out.', cn: '把目标拆成"今天能做的一件小事"。', author: '传 · 罗伯特·科利尔', tag: 'habit' },
    { zh: '世上许多重要的事业，都由那些看似毫无希望却仍然坚持的人完成。', en: 'Most of the important things in the world have been accomplished by people who had kept on hoping when there seemed to be no hope.', cn: '坚持感是可再生的资源。', author: '戴尔·卡耐基', tag: 'meaning' },
    { zh: '教育的真谛是：当一个人把学到的东西都忘掉之后，剩下的东西。', en: 'Education is what remains after one has forgotten what one has learned in school.', cn: '忘掉细节没关系，留下的是思维方式。', author: '相传 · 爱因斯坦', tag: 'memory' },
    { zh: '你不能教会一个人任何事，只能帮助他发现自己内心的答案。', en: 'You cannot teach a man anything; you can only help him find it within himself.', cn: '这也就是为什么自测比被讲解更重要。', author: '相传 · 伽利略', tag: 'growth' },
    { zh: '我听到的会忘记，我看到的会记住，我做的会理解。', en: 'I hear and I forget. I see and I remember. I do and I understand.', cn: '产出型学习的心理学依据。', author: '相传 · 孔子', tag: 'memory' },
    { zh: '自我同情，就是像善待好朋友那样善待自己。', en: 'Self-compassion means treating yourself with the same kindness you would show a good friend.', cn: '考砸那次对自己的态度，决定了你会不会打开下一次复习。', author: '克里斯汀·内夫 · 自我同情研究', tag: 'self' },
    { zh: '未经审视的人生不值得过。', en: 'The unexamined life is not worth living.', cn: '每周做一次学习复盘，就是最省事的审视。', author: '苏格拉底', tag: 'focus' },
    { zh: '千淘万漉虽辛苦，吹尽狂沙始到金。', en: 'After a thousand washes through the sand, at last the grains of gold remain.', cn: '反复筛洗很苦，但留下来的才是真金——练习也是这道工序。', author: '刘禹锡 ·《浪淘沙》', tag: 'growth' },
    { zh: '真正的智慧在于知道自己的无知。', en: 'Real knowledge is to know the extent of one\'s ignorance.', cn: '元认知：估准自己不会什么，是高效复习的前提。', author: '相传 · 苏格拉底', tag: 'focus' },
    { zh: '完美不在于无可添加，而在于无可删减。', en: 'Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.', cn: '写作与复习同理：减法是高级的整理。', author: '安托万·德·圣-埃克苏佩里', tag: 'focus' },
    { zh: '休息不是停下来，而是重新校准注意力。', en: 'Rest is not idleness; it is the recalibration of attention.', cn: '恢复性休息是训练的一部分。', author: '约翰·拉斯金（意译）', tag: 'rest' },
    { zh: '当你给情绪起名字，它就开始变小。', en: 'When you name a feeling, it starts to loosen its grip.', cn: '情绪命名（affect labelling）是已被验证的稳定技术。', author: '现代情绪心理学 · 综述意译', tag: 'anxiety' }
  ];

  /* -------- 心理学习原理说明 -------- */
  const HELP = [
    { title: { zh: '① 艾宾浩斯遗忘曲线', en: '1. The forgetting curve' },
      body: { zh: '遗忘在学习后最快。本工具把每张卡片排在 10 分钟、1 天、2 天、4 天、7 天、15 天、30 天 之后复习，让你正好在快要忘记时遇见它。',
        en: 'Forgetting is fastest right after learning. Every card is scheduled at 10 minutes, then 1, 2, 4, 7, 15 and 30 days, so review arrives just before you lose it.' },
      link: 'memory' },
    { title: { zh: '② 提取练习 > 重读', en: '2. Retrieval beats rereading' },
      body: { zh: '做题时"想不起来"的那几秒正是记忆被强化的时刻。所以先作答、再看解析，不要反过来。',
        en: 'The seconds when you cannot recall are the seconds that strengthen memory. Answer first, read the explanation second.' },
      link: 'memory' },
    { title: { zh: '③ 即时正向强化', en: '3. Immediate reinforcement' },
      body: { zh: '旺财会在你完成一组时立刻庆祝。反馈越接近行为、越具体，行为越容易被重复；表扬针对努力而不是天赋。',
        en: 'Peanut cheers the moment you finish a set. Feedback works best when it is immediate, specific and about effort rather than talent.' },
      link: 'growth' },
    { title: { zh: '④ 自主 · 胜任 · 归属', en: '4. Autonomy, competence, relatedness' },
      body: { zh: '你可以自选复习哪个题型（自主），看见掌握度增长（胜任），并与三只宠物一起学（归属）。这三样支撑内在动机。',
        en: 'You choose which section to review (autonomy), watch mastery grow (competence), and study with companions (relatedness).' },
      link: 'meaning' },
    { title: { zh: '⑤ 休息与情绪命名', en: '5. Rest and naming feelings' },
      body: { zh: '墨墨会提醒你用 25 分钟专注 + 5 分钟离开座位的节奏。如果考前心慌，先把情绪写成一个词，再回到题目。',
        en: 'Ink nudges you into 25-minute focus blocks with real breaks. If exam anxiety appears, name the feeling in one word, then return to the card.' },
      link: 'rest' }
  ];

  global.LEARN_DATA = { WORDS, PASSAGES, QUESTIONS: Q, QUOTES, HELP };
})(window);
