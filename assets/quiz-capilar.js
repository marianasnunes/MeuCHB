(function () {
  'use strict';

  var QUESTIONS = [
    {
      title: 'Como está o seu cabelo no dia seguinte à lavagem?',
      help: 'Pense no aspecto geral, sem nenhum produto de finalização.',
      options: [
        { tag: 'seco', label: 'Fica opaco e ressecado', desc: 'Embaraça fácil, parece áspero ao toque', score: { hidratacao: 3 } },
        { tag: 'oleoso', label: 'Fica oleoso na raiz', desc: 'Parece sujo mesmo tendo lavado no dia anterior', score: { nutricao: 2 } },
        { tag: 'frizz', label: 'Fica frisado e volumoso', desc: 'A umidade ou o tempo seco muda tudo no visual', score: { hidratacao: 2 } },
        { tag: 'opaco', label: 'Fica normal, mas sem brilho', desc: 'Sem queixas extremas, mas falta aquela vitalidade', score: { hidratacao: 2 } },
        { tag: 'quebradico', label: 'Fica quebradiço, com pontas abertas', desc: 'Percebo fios partindo com facilidade', score: { reconstrucao: 3 } }
      ]
    },
    {
      title: 'Qual é a estrutura natural do seu fio?',
      help: 'Como o seu cabelo se comporta na maior parte do tempo.',
      options: [
        { tag: 'liso', label: 'Liso', desc: 'Praticamente sem ondulação natural', score: { nutricao: 1 } },
        { tag: 'ondulado', label: 'Ondulado', desc: 'Ondas suaves em formato de S', score: {} },
        { tag: 'cacheado', label: 'Cacheado', desc: 'Cachos definidos e marcados', score: { hidratacao: 1 } },
        { tag: 'crespo', label: 'Crespo', desc: 'Curvatura fechada e bastante volume', score: { hidratacao: 1 } }
      ]
    },
    {
      title: 'Você faz algum procedimento químico no cabelo?',
      help: 'Pode marcar mais de uma opção, se for o seu caso.',
      multi: true,
      options: [
        { tag: 'coloracao', label: 'Coloração ou luzes', desc: 'Tintura, mechas ou descoloração', score: { reconstrucao: 3 } },
        { tag: 'progressiva', label: 'Progressiva ou alisamento', desc: 'Redução de volume com química', score: { reconstrucao: 2 } },
        { tag: 'relaxamento', label: 'Relaxamento ou permanente', desc: 'Alteração da curvatura natural do fio', score: { reconstrucao: 3 } },
        { tag: 'nenhum', label: 'Nenhum procedimento', desc: 'Cabelo 100% natural, sem química', score: {} }
      ]
    },
    {
      title: 'Como está a intensidade da queda hoje?',
      help: 'Pense na quantidade de fios que você costuma perder por dia.',
      options: [
        { tag: 'queda_alta', label: 'Intensa e preocupante', desc: 'Vejo fios no ralo, na escova e na fronha', score: { queda: 5 } },
        { tag: 'queda_mod', label: 'Moderada', desc: 'Um pouco mais do que eu gostaria', score: { queda: 2 } },
        { tag: 'queda_nao', label: 'Normal ou mínima', desc: 'Dentro do que considero saudável', score: {} }
      ]
    },
    {
      title: 'Qual é o principal problema do seu dia a dia?',
      help: 'Aquilo que mais te incomoda quando pensa no seu cabelo.',
      options: [
        { tag: 'frizz', label: 'Frizz e volume', desc: 'Difícil de controlar no dia a dia', score: { hidratacao: 3 } },
        { tag: 'seco', label: 'Ressecamento e falta de brilho', desc: 'Fios opacos e sem vida', score: { hidratacao: 3 } },
        { tag: 'quebra', label: 'Quebra e pontas abertas', desc: 'O fio parte e parece não crescer', score: { reconstrucao: 3 } },
        { tag: 'couro', label: 'Couro oleoso ou caspa', desc: 'Raiz pesada, oleosa ou com descamação', score: { nutricao: 2 } },
        { tag: 'queda', label: 'Queda excessiva', desc: 'Perda de fios acima do normal', score: { queda: 5 } }
      ]
    },
    {
      title: 'Como é a sua rotina capilar atual?',
      help: 'O que você costuma fazer hoje pelo seu cabelo.',
      options: [
        { tag: 'basica', label: 'Só shampoo e condicionador', desc: 'O básico do básico', score: { hidratacao: 1, reconstrucao: 1 } },
        { tag: 'media', label: 'Shampoo, condicionador e máscara', desc: 'Uma máscara de hidratação de vez em quando', score: {} },
        { tag: 'avancada', label: 'Cronograma capilar completo', desc: 'Hidratação, nutrição e reconstrução', score: {} },
        { tag: 'nenhuma', label: 'Não tenho rotina definida', desc: 'Vou usando o que tiver em casa', score: { hidratacao: 1, reconstrucao: 1 } }
      ]
    },
    {
      title: 'Com que frequência você lava o cabelo?',
      help: 'Essa informação nos ajuda a ajustar a sua rotina.',
      options: [
        { tag: 'diario', label: 'Diariamente', desc: 'Todos os dias ou quase', score: {} },
        { tag: 'bissemanal', label: '2 a 3 vezes por semana', desc: 'Em dias alternados', score: {} },
        { tag: 'semanal', label: '1 vez por semana', desc: 'Uma única lavagem semanal', score: {} },
        { tag: 'quinzenal', label: 'A cada 10 dias ou mais', desc: 'Espaço bastante as lavagens', score: {} }
      ]
    },
    {
      title: 'Você usa calor no cabelo?',
      help: 'Secador, chapinha, babyliss e ferramentas térmicas.',
      options: [
        { tag: 'calor_alto', label: 'Quase todo dia', desc: 'Faz parte da minha rotina', score: { reconstrucao: 2 } },
        { tag: 'calor_med', label: '2 a 3 vezes por semana', desc: 'Em ocasiões mais específicas', score: { reconstrucao: 1 } },
        { tag: 'calor_nao', label: 'Raramente ou nunca', desc: 'Deixo secar de forma natural', score: {} }
      ]
    }
  ];

  var RESULTS = {
    queda: {
      kit: 'Kit Anti-Queda',
      tagline: 'Estimulação · Crescimento · Couro saudável',
      pills: ['QUEDA', 'CRESCIMENTO', 'COURO'],
      desc: 'A queda está sendo a sua maior preocupação agora. O Kit Anti-Queda do Método CH atua diretamente no couro cabeludo com ativos que estimulam o folículo piloso, reduzem a queda e favorecem o crescimento de novos fios. Pensado para quem percebe fios no ralo, na escova ou na fronha com mais frequência do que gostaria.',
      cards: [
        { icon: '🌱', label: 'FOCO', value: 'Estimulação do folículo' },
        { icon: '🔬', label: 'AÇÃO', value: 'Ativos anti-queda' },
        { icon: '✨', label: 'RESULTADO', value: 'Crescimento acelerado' }
      ],
      tipLead: 'Dica do Método CH:',
      tipText: 'Aplique o sérum no couro cabeludo seco ou levemente úmido, com massagem circular por 3 a 5 minutos antes da lavagem ou à noite.',
      cta: 'Quero o Kit Anti-Queda'
    },
    reconstrucao: {
      kit: 'Kit Reconstrução',
      tagline: 'Força · Queratina · Fim da quebra',
      pills: ['RECONSTRUÇÃO', 'FORÇA', 'QUÍMICA'],
      desc: 'Seu cabelo está pedindo massa e resistência. Procedimentos químicos, calor e quebra deixam o fio poroso e fragilizado. O Kit Reconstrução do Método CH repõe queratina e aminoácidos na fibra capilar, devolvendo força, elasticidade e selando as pontas para frear a quebra.',
      cards: [
        { icon: '🧱', label: 'FOCO', value: 'Reposição de massa' },
        { icon: '💪', label: 'AÇÃO', value: 'Queratina + aminoácidos' },
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
        { icon: '💧', label: 'FOCO', value: 'Reposição de água' },
        { icon: '🌿', label: 'AÇÃO', value: 'Ativos umectantes' },
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
        { icon: '🥑', label: 'FOCO', value: 'Reposição de lipídios' },
        { icon: '🫧', label: 'AÇÃO', value: 'Óleos vegetais' },
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
        { icon: '🔄', label: 'FOCO', value: 'Equilíbrio dos 3 pilares' },
        { icon: '📅', label: 'AÇÃO', value: 'Cronograma capilar' },
        { icon: '✨', label: 'RESULTADO', value: 'Cabelo equilibrado' }
      ],
      tipLead: 'Dica do Método CH:',
      tipText: 'Monte a semana intercalando os três tratamentos — por exemplo hidratação, nutrição e reconstrução — sempre respeitando um dia de intervalo entre eles.',
      cta: 'Quero o Cronograma Completo'
    }
  };

  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

  function computeResult(answers) {
    var sc = { reconstrucao: 0, hidratacao: 0, nutricao: 0, queda: 0 };
    QUESTIONS.forEach(function (q, i) {
      var a = answers[i];
      if (a == null) return;
      var tags = Array.isArray(a) ? a : [a];
      tags.forEach(function (tag) {
        var opt = null;
        for (var k = 0; k < q.options.length; k++) {
          if (q.options[k].tag === tag) { opt = q.options[k]; break; }
        }
        if (opt && opt.score) {
          for (var key in opt.score) {
            if (Object.prototype.hasOwnProperty.call(opt.score, key)) {
              sc[key] += opt.score[key];
            }
          }
        }
      });
    });
    if (sc.queda >= 5) return 'queda';
    var trio = [
      ['reconstrucao', sc.reconstrucao],
      ['hidratacao', sc.hidratacao],
      ['nutricao', sc.nutricao]
    ].sort(function (a, b) { return b[1] - a[1]; });
    if (trio[0][1] >= 5 && trio[1][1] >= 4) return 'cronograma';
    return trio[0][0];
  }

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function initQuiz(root, opts) {
    if (!root || root.dataset.quizDcInitialized) return;
    root.dataset.quizDcInitialized = 'true';

    opts = opts || {};
    var ctaUrls = opts.ctaUrls || {};

    var state = { screen: 'intro', qIndex: 0, answers: {} };

    var screens = {
      intro: root.querySelector('[data-screen="intro"]'),
      question: root.querySelector('[data-screen="question"]'),
      result: root.querySelector('[data-screen="result"]')
    };

    var startBtn = root.querySelector('.quiz-dc-start');
    var restartEl = root.querySelector('.quiz-dc-restart');
    var continueBtn = root.querySelector('.quiz-dc-continue');
    var optionsWrap = root.querySelector('.quiz-dc-options');
    var qLabelEl = root.querySelector('.quiz-dc-qlabel');
    var qLabelSmEl = root.querySelector('.quiz-dc-qlabel-sm');
    var qTitleEl = root.querySelector('.quiz-dc-qtitle');
    var qHelpEl = root.querySelector('.quiz-dc-qhelp');
    var percentEl = root.querySelector('.quiz-dc-percent');
    var progressFill = root.querySelector('.quiz-dc-progress-fill');

    var resultKitEm = root.querySelector('.quiz-dc-result-kit em');
    var resultTaglineEl = root.querySelector('.quiz-dc-result-tagline');
    var pillsWrap = root.querySelector('.quiz-dc-pills');
    var resultDescEl = root.querySelector('.quiz-dc-result-desc');
    var resultCardsWrap = root.querySelector('.quiz-dc-result-cards');
    var tipEl = root.querySelector('.quiz-dc-tip');
    var mesesTextEl = root.querySelector('.quiz-dc-2meses-text');
    var ctaEl = root.querySelector('.quiz-dc-cta');

    function showScreen(name) {
      Object.keys(screens).forEach(function (key) {
        if (!screens[key]) return;
        screens[key].hidden = key !== name;
      });
    }

    function renderQuestion() {
      var q = QUESTIONS[state.qIndex];
      var ans = state.answers[state.qIndex];
      var multi = !!q.multi;
      var percent = Math.round(((state.qIndex + 1) / QUESTIONS.length) * 100);

      qLabelEl.textContent = 'PERGUNTA ' + (state.qIndex + 1) + ' DE ' + QUESTIONS.length;
      qLabelSmEl.textContent = 'PERGUNTA ' + (state.qIndex + 1) + ' DE ' + QUESTIONS.length;
      qTitleEl.textContent = q.title;
      qHelpEl.textContent = q.help;
      percentEl.textContent = percent + '%';
      progressFill.style.width = percent + '%';

      optionsWrap.innerHTML = '';
      q.options.forEach(function (o, idx) {
        var selected = multi
          ? (Array.isArray(ans) && ans.indexOf(o.tag) !== -1)
          : ans === o.tag;

        var row = el('div', 'quiz-dc-opt' + (selected ? ' is-selected' : ''));
        row.appendChild(el('div', 'quiz-dc-opt-letter', LETTERS[idx]));
        var textWrap = el('div');
        textWrap.appendChild(el('div', 'quiz-dc-opt-label', o.label));
        textWrap.appendChild(el('div', 'quiz-dc-opt-desc', o.desc));
        row.appendChild(textWrap);

        row.addEventListener('click', function () {
          selectOption(state.qIndex, o.tag, multi);
        });

        optionsWrap.appendChild(row);
      });

      var canContinue = multi
        ? (Array.isArray(ans) && ans.length > 0)
        : (ans != null);
      var isLast = state.qIndex === QUESTIONS.length - 1;

      continueBtn.textContent = isLast ? 'Ver meu resultado' : 'Continuar';
      continueBtn.disabled = !canContinue;
    }

    function renderResult() {
      var key = computeResult(state.answers);
      var r = RESULTS[key];

      resultKitEm.textContent = r.kit;
      resultTaglineEl.textContent = r.tagline;
      resultDescEl.textContent = r.desc;

      pillsWrap.innerHTML = '';
      r.pills.forEach(function (p, i) {
        var pill = el('span', 'quiz-dc-pill' + (i === 0 ? ' is-active' : ''), p);
        pillsWrap.appendChild(pill);
      });

      resultCardsWrap.innerHTML = '';
      r.cards.forEach(function (c) {
        var card = el('div', 'quiz-dc-result-card');
        card.appendChild(el('div', 'quiz-dc-result-card-icon', c.icon));
        card.appendChild(el('div', 'quiz-dc-result-card-label', c.label));
        card.appendChild(el('div', 'quiz-dc-result-card-value', c.value));
        resultCardsWrap.appendChild(card);
      });

      tipEl.innerHTML = '💡 <strong>' + r.tipLead + '</strong> ' + r.tipText;

      if (mesesTextEl) {
        mesesTextEl.innerHTML = 'Use o <strong>' + r.kit + '</strong> por <strong>2 meses</strong> para sentir o resultado completo. Ao final desse período, <strong>refaça este diagnóstico</strong> — o cabelo muda, e o quiz revela a sua necessidade capilar atual para o próximo ciclo.';
      }

      ctaEl.textContent = r.cta;
      ctaEl.setAttribute('href', ctaUrls[key] || '/collections/all');

      try {
        if (window.dataLayer) {
          window.dataLayer.push({ event: 'quiz_diagnostico_capilar_resultado', resultado: key });
        }
      } catch (e) {}
    }

    function render() {
      if (state.screen === 'intro') {
        showScreen('intro');
      } else if (state.screen === 'question') {
        renderQuestion();
        showScreen('question');
      } else if (state.screen === 'result') {
        renderResult();
        showScreen('result');
      }
    }

    function start() {
      state = { screen: 'question', qIndex: 0, answers: {} };
      render();
      try {
        if (window.dataLayer) window.dataLayer.push({ event: 'quiz_diagnostico_capilar_inicio' });
      } catch (e) {}
    }

    function restart() {
      state = { screen: 'intro', qIndex: 0, answers: {} };
      render();
    }

    function goNext() {
      if (state.qIndex >= QUESTIONS.length - 1) {
        state.screen = 'result';
      } else {
        state.qIndex += 1;
      }
      render();
    }

    function selectOption(qIndex, tag, multi) {
      var answers = state.answers;
      if (multi) {
        var arr = Array.isArray(answers[qIndex]) ? answers[qIndex].slice() : [];
        if (tag === 'nenhum') {
          arr = arr.indexOf('nenhum') !== -1 ? [] : ['nenhum'];
        } else {
          arr = arr.filter(function (t) { return t !== 'nenhum'; });
          var pos = arr.indexOf(tag);
          if (pos !== -1) arr.splice(pos, 1);
          else arr.push(tag);
        }
        answers[qIndex] = arr;
      } else {
        answers[qIndex] = tag;
      }
      renderQuestion();
    }

    if (startBtn) startBtn.addEventListener('click', start);
    if (restartEl) {
      restartEl.addEventListener('click', restart);
      restartEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') restart();
      });
    }
    if (continueBtn) continueBtn.addEventListener('click', goNext);

    render();
  }

  window.QuizCapilarInit = function (root, opts) {
    initQuiz(root, opts);
  };
})();
