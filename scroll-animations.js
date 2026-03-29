(function () {
  // Elements to animate on scroll
  var ANIMATE_SELECTORS = [
    '.flip-card', '.miembro-card', '.servicio-card', '.consejo-card',
    '.mv-card', '.v-stat', '.stat-box', '.extra-card',
    '.horario-block', '.mapa-block',
    '.quienes-text', '.quienes-visual',
    '.chat-window', '.chat-disclaimer',
    '.equipo-hero-img', '.valores-sub',
    '.servicios-intro', '.consejos-intro', '.equipo-intro-wrap'
  ].join(', ');

  // Elements that get a stagger delay based on their index among siblings
  var STAGGER_SELECTORS = [
    '.flip-card', '.servicio-card', '.consejo-card',
    '.miembro-card', '.v-stat', '.stat-box', '.extra-card'
  ];

  function init() {
    if (!window.IntersectionObserver) return; // graceful fallback

    var els = Array.from(document.querySelectorAll(ANIMATE_SELECTORS));
    if (!els.length) return;

    // Apply stagger delay via CSS custom property
    STAGGER_SELECTORS.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        var siblings = Array.from(el.parentElement.children);
        var idx = siblings.indexOf(el);
        el.style.setProperty('--stagger', idx);
      });
    });

    // Mark elements as hidden
    els.forEach(function (el) { el.classList.add('sa-hidden'); });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('sa-hidden');
          entry.target.classList.add('sa-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -20px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
