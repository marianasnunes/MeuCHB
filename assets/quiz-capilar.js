(function () {
  'use strict';

  var QUESTIONS = [
    {
      title: 'Como está o seu cabelo no dia seguinte à lavagem?',
      help: 'Pense no aspecto geral, sem nenhum produto de finalização.',
      options: [
        { tag:'seco',       label:'Fica opaco e ressecado',              desc:'Embaraça fácil, parece áspero ao toque',            score:{hidratacao:3} },
        { tag:'oleoso',     label:'Fica oleoso na raiz',                 desc:'Parece sujo mesmo tendo lavado no dia anterior',    score:{nutricao:2} },
        { tag:'frizz',      label:'Fica frisado e volumoso',             desc:'A umidade ou o tempo seco muda tudo no visual',     score:{hidratacao:2} },
        { tag:'opaco',      label:'Fica normal, mas sem brilho',         desc:'Sem queixas extremas, mas falta aquela vitalidade', score:{hidratacao:2} },
        { tag:'quebradico', label:'Fica quebradiço, com pontas abertas', desc:'Percebo fios partindo com facilidade',              score:{reconstrucao:3} }
      ]
    },
    {
      title: 'Qual é a estrutura natural do seu fio?',
      help: 'Como o seu cabelo se comporta na maior parte do tempo.',
      options: [
        { tag:'liso',     label:'Liso',     desc:'Praticamente sem ondulação natural', score:{nutricao:1} },
        { tag:'ondulado', label:'Ondulado', desc:'Ondas suaves em formato de S',       score:{} },
        { tag:'cacheado', label:'Cacheado', desc:'Cachos definidos e marcados',        score:{hidratacao:1} },
        { tag:'crespo',   label:'Crespo',   desc:'Curvatura fechada e bastante volume',score:{hidratacao:1} }
      ]
    },
    {
      title: 'Você faz algum procedimento químico no cabelo?',
      help: 'Pode marcar mais de uma opção, se for o seu caso.',
      multi: true,
      options: [
        { tag:'coloracao',   label:'Coloração ou luzes',         desc:'Tintura, mechas ou descoloração',       score:{reconstrucao:3} },
        { tag:'progressiva', label:'Progressiva ou alisamento',  desc:'Redução de volume com química',         score:{reconstrucao:2} },
        { tag:'relaxamento', label:'Relaxamento ou permanente',  desc:'Alteração da curvatura natural do fio', score:{reconstrucao:3} },
        { tag:'nenhum',      label:'Nenhum procedimento',        desc:'Cabelo 100% natural, sem química',      score:{} }
      ]
    },
    {
      title: 'Qual é o principal problema do seu dia a dia?',
      help: 'Aquilo que mais te incomoda quando pensa no seu cabelo.',
      options: [
        { tag:'frizz',  label:'Frizz e volume',                 desc:'Difícil de controlar no dia a dia',      score:{hidratacao:3} },
        { tag:'seco',   label:'Ressecamento e falta de brilho', desc:'Fios opacos e sem vida',                 score:{hidratacao:3} },
        { tag:'quebra', label:'Quebra e pontas abertas',        desc:'O fio parte e parece não crescer',       score:{reconstrucao:3} },
        { tag:'couro',  label:'Couro oleoso ou caspa',          desc:'Raiz pesada, oleosa ou com descamação',  score:{nutricao:2} }
      ]
    },
    {
      title: 'Como é a sua rotina capilar atual?',
      help: 'O que você costuma fazer hoje pelo seu cabelo.',
      options: [
        { tag:'basica',   label:'Só shampoo e condicionador',         desc:'O básico do básico',                         score:{hidratacao:1,reconstrucao:1} },
        { tag:'media',    label:'Shampoo, condicionador e máscara',   desc:'Uma máscara de hidratação de vez em quando', score:{} },
        { tag:'avancada', label:'Cronograma capilar completo',        desc:'Hidratação, nutrição e reconstrução',        score:{} },
        { tag:'nenhuma',  label:'Não tenho rotina definida',          desc:'Vou usando o que tiver em casa',             score:{hidratacao:1,reconstrucao:1} }
      ]
    },
    {
      title: 'Com que frequência você lava o cabelo?',
      help: 'Essa informação nos ajuda a ajustar a sua rotina.',
      options: [
        { tag:'diario',      label:'Diariamente',             desc:'Todos os dias ou quase',      score:{} },
        { tag:'bissemanal',  label:'2 a 3 vezes por semana',  desc:'Em dias alternados',          score:{} },
        { tag:'semanal',     label:'1 vez por semana',        desc:'Uma única lavagem semanal',   score:{} },
        { tag:'quinzenal',   label:'A cada 10 dias ou mais',  desc:'Espaço bastante as lavagens', score:{} }
      ]
    },
    {
      title: 'Você usa calor no cabelo?',
      help: 'Secador, chapinha, babyliss e ferramentas térmicas.',
      options: [
        { tag:'calor_alto', label:'Quase todo dia',         desc:'Faz parte da minha rotina',    score:{reconstrucao:2} },
        { tag:'calor_med',  label:'2 a 3 vezes por semana', desc:'Em ocasiões mais específicas', score:{reconstrucao:1} },
        { tag:'calor_nao',  label:'Raramente ou nunca',     desc:'Deixo secar de forma natural', score:{} }
      ]
    }
  ];

  var RESULTS = {
    reconstrucao: {
      kit: 'Kit Reconstrução',
      tagline: 'Força · Queratina · Fim da quebra',
      pills: ['RECONSTRUÇÃO', 'FORÇA', 'QUÍMICA'],
      desc: 'Seu cabelo está pedindo massa e resistência. Procedimentos químicos, calor e quebra deixam o fio poroso e fragilizado. O Kit Reconstrução do Método CH repõe queratina e aminoácidos na fibra capilar, devolvendo força, elasticidade e selando as pontas para frear a quebra.',
      cards: [
        { icon: '🧱', label: 'FOCO',      value: 'Reposição de massa' },
        { icon: '💪', label: 'AÇÃO',      value: 'Queratina + aminoácidos' },
        { icon: '🛡️', label: 'RESULTADO', value: 'Fios mais resistentes' }
      ],
      tipLead: 'Dica do Método CH:',
      tipText: 'Use a reconstrução no máximo 1x por semana e sempre intercalada com hidratação — excesso de proteína pode deixar o fio rígido e quebradiço.',
      cta: 'Quero o Kit Reconstrução'
    },
    hidratacao: {
      kit: 'Kit Hidratação',
      tagline: 'Maciez · Brilho · Controle do frizz',
      pills: ['HIDRATAÇÃO', 'BRILHO', 'FRIZZ'],
      desc: 'Falta água na fibra capilar. Fios opacos, ressecados e com frizz são sinais clássicos de desidratação. O Kit Hidratação do Método CH repõe água e ativos umectantes que selam a cutícula, controlam o volume indesejado e devolvem maciez e brilho ao cabelo.',
      cards: [
        { icon: '💧', label: 'FOCO',      value: 'Reposição de água' },
        { icon: '🌿', label: 'AÇÃO',      value: 'Ativos umectantes' },
        { icon: '✨', label: 'RESULTADO', value: 'Maciez e brilho' }
      ],
      tipLead: 'Dica do Método CH:',
      tipText: 'Aplique a máscara no cabelo úmido, do comprimento às pontas, e deixe agir de 5 a 10 minutos antes de enxaguar para potencializar a hidratação.',
      cta: 'Quero o Kit Hidratação'
    },
    nutricao: {
      kit: 'Kit Nutrição',
      tagline: 'Nutrição · Lipídios · Couro equilibrado',
      pills: ['NUTRIÇÃO', 'MACIEZ', 'LIPÍDIOS'],
      desc: 'Seu fio precisa repor lipídios e óleos naturais. Cabelos com tendência à oleosidade na raiz e ressecamento no comprimento pedem nutrição. O Kit Nutrição do Método CH repõe óleos vegetais que selam a cutícula, equilibram o couro e devolvem nutrição sem pesar nos fios.',
      cards: [
        { icon: '🥑', label: 'FOCO',      value: 'Reposição de lipídios' },
        { icon: '🫧', label: 'AÇÃO',      value: 'Óleos vegetais' },
        { icon: '✨', label: 'RESULTADO', value: 'Fios nutridos' }
      ],
      tipLead: 'Dica do Método CH:',
      tipText: 'Intercale a nutrição com a hidratação ao longo da semana e evite aplicar óleos diretamente na raiz se o seu couro tende à oleosidade.',
      cta: 'Quero o Kit Nutrição'
    },
    cronograma: {
      kit: 'Kit Cronograma Completo',
      tagline: 'Reconstrução · Hidratação · Nutrição',
      pills: ['RECONSTRUÇÃO', 'HIDRATAÇÃO', 'NUTRIÇÃO'],
      desc: 'Seu cabelo apresenta mais de uma necessidade em equilíbrio. Em vez de focar em um só pilar, o Kit Cronograma Completo do Método CH organiza reconstrução, hidratação e nutrição em uma rotina semanal, tratando o fio de forma completa para recuperar saúde, força e brilho ao mesmo tempo.',
      cards: [
        { icon: '🔄', label: 'FOCO',      value: 'Equilíbrio dos 3 pilares' },
        { icon: '📅', label: 'AÇÃO',      value: 'Cronograma capilar' },
        { icon: '✨', label: 'RESULTADO', value: 'Cabelo equilibrado' }
      ],
      tipLead: 'Dica do Método CH:',
      tipText: 'Monte a semana intercalando os três tratamentos — por exemplo hidratação, nutrição e reconstrução — sempre respeitando um dia de intervalo entre eles.',
      cta: 'Quero o Cronograma Completo'
    }
  };

  var TREATMENTS = {
    vitaminas: { name: 'Choque de Vitaminas',   pillar: 'Hidratação',   color: '#2f7d7a', bg: '#e6f1f0' },
    balm:      { name: 'Balm Antiporosidade',   pillar: 'Nutrição',     color: '#a9713f', bg: '#f5ebe1' },
    amino:     { name: 'Choque de Aminoácidos', pillar: 'Reconstrução', color: '#7c5a86', bg: '#efe8f2' },
    rotativo:  { name: 'Tratamento Rotativo (Vitaminas · Antiporosidade · Aminoácidos)', pillar: 'Cronograma', color: '#a4884d', bg: '#f4ecdb' }
  };

  var ROUTINES = {
    hidratacao: {
      profile: 'Hidratação',
      intro: 'Montamos um cronograma de 6 meses focado em repor água na fibra, controlar o frizz e devolver brilho — com pontos de nutrição e força para manter o equilíbrio.',
      base: 'Shampoo · Condicionador · Diamond',
      months: [
        { focus: 'Hidratação intensiva',    treat: 'vitaminas' },
        { focus: 'Hidratação & brilho',     treat: 'vitaminas' },
        { focus: 'Equilíbrio com nutrição', treat: 'balm' },
        { focus: 'Hidratação profunda',     treat: 'vitaminas' },
        { focus: 'Força e resistência',     treat: 'amino' },
        { focus: 'Selagem & manutenção',    treat: 'vitaminas' }
      ],
      boxTreat: 'vitaminas'
    },
    nutricao: {
      profile: 'Nutrição',
      intro: 'Seu cronograma de 6 meses repõe lipídios e óleos naturais para selar a cutícula e equilibrar o couro — com hidratação e força intercaladas.',
      base: 'Shampoo · Condicionador · Diamond',
      months: [
        { focus: 'Nutrição intensiva',        treat: 'balm' },
        { focus: 'Nutrição & maciez',         treat: 'balm' },
        { focus: 'Equilíbrio com hidratação', treat: 'vitaminas' },
        { focus: 'Nutrição profunda',         treat: 'balm' },
        { focus: 'Força e resistência',       treat: 'amino' },
        { focus: 'Selagem & manutenção',      treat: 'balm' }
      ],
      boxTreat: 'balm'
    },
    reconstrucao: {
      profile: 'Reconstrução',
      intro: 'Seu cronograma de 6 meses repõe massa e queratina para frear a quebra — sempre intercalando hidratação para não deixar o fio rígido.',
      base: 'Shampoo · Condicionador · Diamond',
      months: [
        { focus: 'Reconstrução & força',    treat: 'amino' },
        { focus: 'Hidratação (reposição)',  treat: 'vitaminas' },
        { focus: 'Reconstrução profunda',   treat: 'amino' },
        { focus: 'Equilíbrio com nutrição', treat: 'balm' },
        { focus: 'Reconstrução & selagem',  treat: 'amino' },
        { focus: 'Hidratação & manutenção', treat: 'vitaminas' }
      ],
      boxTreat: 'amino'
    },
    cronograma: {
      profile: 'Cronograma Completo',
      intro: 'Seu cronograma de 6 meses equilibra os três pilares — hidratação, nutrição e reconstrução — alternando os tratamentos a cada mês para um fio completo.',
      base: 'Shampoo · Condicionador · Diamond',
      months: [
        { focus: 'Hidratação',   treat: 'vitaminas' },
        { focus: 'Nutrição',     treat: 'balm' },
        { focus: 'Reconstrução', treat: 'amino' },
        { focus: 'Hidratação',   treat: 'vitaminas' },
        { focus: 'Nutrição',     treat: 'balm' },
        { focus: 'Reconstrução', treat: 'amino' }
      ],
      boxTreat: 'rotativo'
    }
  };

  function compute(answers) {
    var sc = { reconstrucao: 0, hidratacao: 0, nutricao: 0 };
    QUESTIONS.forEach(function (q, i) {
      var a = answers[i];
      if (a == null) return;
      var tags = Array.isArray(a) ? a : [a];
      tags.forEach(function (tag) {
        var opt = q.options.find(function (o) { return o.tag === tag; });
        if (opt && opt.score) {
          for (var k in opt.score) sc[k] += opt.score[k];
        }
      });
    });
    var trio = [
      ['reconstrucao', sc.reconstrucao],
      ['hidratacao',   sc.hidratacao],
      ['nutricao',     sc.nutricao]
    ].sort(function (a, b) { return b[1] - a[1]; });
    if (trio[0][1] >= 5 && trio[1][1] >= 4) return 'cronograma';
    return trio[0][0];
  }

  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    for (var k in (attrs || {})) {
      if (k === 'style' && typeof attrs[k] === 'object') {
        Object.assign(e.style, attrs[k]);
      } else if (k.startsWith('on')) {
        e.addEventListener(k.slice(2), attrs[k]);
      } else {
        e.setAttribute(k, attrs[k]);
      }
    }
    (children || []).forEach(function (c) {
      if (typeof c === 'string') e.insertAdjacentHTML('beforeend', c);
      else if (c) e.appendChild(c);
    });
    return e;
  }

  function initQuiz(root, opts) {
    if (!root || root.dataset.quizDcInitialized) return;
    root.dataset.quizDcInitialized = 'true';

    opts = opts || {};
    var ctaUrls = opts.ctaUrls || {};

    var state = { screen: 'intro', qIndex: 0, answers: {}, resultKey: null };

    var screens = {
      intro:    root.querySelector('[data-screen="intro"]'),
      question: root.querySelector('[data-screen="question"]'),
      result:   root.querySelector('[data-screen="result"]'),
      plan:     root.querySelector('[data-screen="plan"]')
    };

    var startBtn     = root.querySelector('.quiz-dc-start');
    var restartEl    = root.querySelector('.quiz-dc-restart');
    var continueBtn  = root.querySelector('.quiz-dc-continue');
    var optionsWrap  = root.querySelector('.quiz-dc-options');
    var qLabelEl     = root.querySelector('.quiz-dc-qlabel');
    var qLabelSmEl   = root.querySelector('.quiz-dc-qlabel-sm');
    var qTitleEl     = root.querySelector('.quiz-dc-qtitle');
    var qHelpEl      = root.querySelector('.quiz-dc-qhelp');
    var progressFill = root.querySelector('.quiz-dc-progress-fill');
    var percentEl    = root.querySelector('.quiz-dc-percent');
    var resultKitEl  = root.querySelector('.quiz-dc-result-kit em');
    var taglineEl    = root.querySelector('.quiz-dc-result-tagline');
    var pillsEl      = root.querySelector('.quiz-dc-pills');
    var descEl       = root.querySelector('.quiz-dc-result-desc');
    var cardsEl      = root.querySelector('.quiz-dc-result-cards');
    var tipEl        = root.querySelector('.quiz-dc-tip');
    var mesesTextEl  = root.querySelector('.quiz-dc-2meses-text');
    var ctaEl        = root.querySelector('.quiz-dc-cta');
    var planBtn      = root.querySelector('.quiz-dc-plan-btn');
    var backBtn      = root.querySelector('.quiz-dc-back');
    var planIntroEl  = root.querySelector('.quiz-dc-plan-intro');
    var planProfileEl= root.querySelector('.quiz-dc-plan-profile');
    var planKitEl    = root.querySelector('.quiz-dc-plan-kit');
    var monthsEl     = root.querySelector('.quiz-dc-months');
    var boxItemsEl   = root.querySelector('.quiz-dc-box-items');
    var boxProfileEl = root.querySelector('.quiz-dc-box-profile');
    var assinBtn     = root.querySelector('.quiz-dc-assin-btn');

    function showScreen(name) {
      for (var k in screens) {
        if (screens[k]) screens[k].hidden = (k !== name);
      }
      window.scrollTo(0, 0);
    }

    function renderQuestion() {
      var q = QUESTIONS[state.qIndex];
      var total = QUESTIONS.length;
      var pct = Math.round(((state.qIndex + 1) / total) * 100);
      var label = 'PERGUNTA ' + (state.qIndex + 1) + ' DE ' + total;

      if (qLabelEl)   qLabelEl.textContent   = label;
      if (qLabelSmEl) qLabelSmEl.textContent = label;
      if (qTitleEl)   qTitleEl.textContent   = q.title;
      if (qHelpEl)    qHelpEl.textContent    = q.help;
      if (percentEl)  percentEl.textContent  = pct + '%';
      if (progressFill) progressFill.style.width = pct + '%';

      if (optionsWrap) {
        optionsWrap.innerHTML = '';
        var letters = ['A', 'B', 'C', 'D', 'E'];
        q.options.forEach(function (opt, idx) {
          var ans = state.answers[state.qIndex];
          var isMulti = !!q.multi;
          var selected = isMulti
            ? (Array.isArray(ans) && ans.includes(opt.tag))
            : (ans === opt.tag);

          var optEl = document.createElement('div');
          optEl.className = 'quiz-dc-option' + (selected ? ' quiz-dc-option--selected' : '');
          optEl.setAttribute('role', 'button');
          optEl.setAttribute('tabindex', '0');
          optEl.innerHTML =
            '<span class="quiz-dc-opt-letter">' + letters[idx] + '</span>' +
            '<span class="quiz-dc-opt-body">' +
              '<span class="quiz-dc-opt-label">' + opt.label + '</span>' +
              '<span class="quiz-dc-opt-desc">' + opt.desc + '</span>' +
            '</span>';

          function doSelect() {
            var currentAns = state.answers[state.qIndex];
            if (isMulti) {
              var arr = Array.isArray(currentAns) ? currentAns.slice() : [];
              if (opt.tag === 'nenhum') {
                arr = arr.includes('nenhum') ? [] : ['nenhum'];
              } else {
                arr = arr.filter(function (t) { return t !== 'nenhum'; });
                if (arr.includes(opt.tag)) arr = arr.filter(function (t) { return t !== opt.tag; });
                else arr.push(opt.tag);
              }
              state.answers[state.qIndex] = arr;
            } else {
              state.answers[state.qIndex] = opt.tag;
            }
            renderQuestion();
            updateContinue();
          }

          optEl.addEventListener('click', doSelect);
          optEl.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); doSelect(); }
          });
          optionsWrap.appendChild(optEl);
        });
      }
    }

    function updateContinue() {
      var ans = state.answers[state.qIndex];
      var q = QUESTIONS[state.qIndex];
      var valid = q.multi
        ? (Array.isArray(ans) && ans.length > 0)
        : (ans != null);
      if (continueBtn) {
        continueBtn.disabled = !valid;
        var isLast = state.qIndex >= QUESTIONS.length - 1;
        continueBtn.textContent = isLast ? 'Ver meu resultado' : 'Continuar';
      }
    }

    function renderResult() {
      var key = compute(state.answers);
      state.resultKey = key;
      var r = RESULTS[key];

      if (resultKitEl) resultKitEl.textContent = r.kit;
      if (taglineEl)   taglineEl.textContent   = r.tagline;
      if (descEl)      descEl.textContent      = r.desc;

      if (pillsEl) {
        pillsEl.innerHTML = '';
        r.pills.forEach(function (p, i) {
          var span = document.createElement('span');
          span.className = 'quiz-dc-pill' + (i === 0 ? ' quiz-dc-pill--active' : '');
          span.textContent = p;
          pillsEl.appendChild(span);
        });
      }

      if (cardsEl) {
        cardsEl.innerHTML = '';
        r.cards.forEach(function (c) {
          var div = document.createElement('div');
          div.className = 'quiz-dc-result-card';
          div.innerHTML =
            '<div class="quiz-dc-rc-icon">' + c.icon + '</div>' +
            '<div class="quiz-dc-rc-label">' + c.label + '</div>' +
            '<div class="quiz-dc-rc-value">' + c.value + '</div>';
          cardsEl.appendChild(div);
        });
      }

      if (tipEl) {
        tipEl.innerHTML = '💡 <strong>' + r.tipLead + '</strong> ' + r.tipText;
      }

      if (mesesTextEl) {
        mesesTextEl.innerHTML = 'Use o <strong>' + r.kit + '</strong> por <strong>2 meses</strong> para sentir o resultado completo. Ao final desse período, <strong>refaça este diagnóstico</strong> — o cabelo muda, e o quiz revela a sua necessidade capilar atual para o próximo ciclo.';
      }

      if (ctaEl) {
        ctaEl.textContent = r.cta;
        // CTA goes to plan screen; product link is on the assin button in plan screen
        ctaEl.onclick = function(e) {
          e.preventDefault();
          renderPlan();
          showScreen('plan');
        };
      }
    }

    function renderPlan() {
      var key = state.resultKey || compute(state.answers);
      var r   = RESULTS[key];
      var ro  = ROUTINES[key];

      if (planIntroEl)  planIntroEl.textContent  = ro.intro;
      if (planProfileEl) {
        planProfileEl.innerHTML = 'Seu perfil: <strong>' + ro.profile + '</strong> · ' + r.kit;
      }

      if (monthsEl) {
        monthsEl.innerHTML = '';
        ro.months.forEach(function (m, i) {
          var tr = TREATMENTS[m.treat];
          var div = document.createElement('div');
          div.className = 'quiz-dc-month-card';
          div.innerHTML =
            '<div class="quiz-dc-month-num">MÊS ' + (i + 1) + '</div>' +
            '<div class="quiz-dc-month-focus">' + m.focus + '</div>' +
            '<div class="quiz-dc-month-base">' + ro.base + '</div>' +
            '<span class="quiz-dc-month-chip" style="background:' + tr.bg + ';color:' + tr.color + '">+ ' + tr.name + '</span>';
          monthsEl.appendChild(div);
        });
      }

      var boxTr = TREATMENTS[ro.boxTreat];
      if (boxItemsEl) {
        boxItemsEl.innerHTML = '';
        ['Shampoo', 'Condicionador', 'Diamond', boxTr.name].forEach(function (item) {
          var span = document.createElement('span');
          span.className = 'quiz-dc-box-item';
          span.textContent = item;
          boxItemsEl.appendChild(span);
        });
      }
      if (boxProfileEl) boxProfileEl.textContent = ro.profile;

      if (assinBtn) {
        assinBtn.setAttribute('href', ctaUrls[key] || '/collections/all');
      }
    }

    // ---- Event listeners ----
    if (startBtn) {
      startBtn.addEventListener('click', function () {
        state = { screen: 'question', qIndex: 0, answers: {}, resultKey: null };
        renderQuestion();
        updateContinue();
        showScreen('question');
      });
    }

    if (continueBtn) {
      continueBtn.addEventListener('click', function () {
        if (continueBtn.disabled) return;
        if (state.qIndex >= QUESTIONS.length - 1) {
          renderResult();
          showScreen('result');
        } else {
          state.qIndex++;
          renderQuestion();
          updateContinue();
        }
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', function () {
        showScreen('result');
      });
    }

    if (restartEl) {
      restartEl.addEventListener('click', function () {
        state = { screen: 'intro', qIndex: 0, answers: {}, resultKey: null };
        showScreen('intro');
      });
      restartEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); restartEl.click(); }
      });
    }

    try {
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'quiz_diagnostico_capilar_start' });
      }
    } catch (e) {}

    showScreen('intro');
  }

  window.QuizCapilarInit = initQuiz;
})();
