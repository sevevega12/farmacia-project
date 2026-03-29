(function () {
  // If consent already stored, skip
  if (localStorage.getItem('cookie_consent')) return;

  function createBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML =
      '<div class="cb-content">' +
        '<div class="cb-icon"><i class="fas fa-cookie-bite"></i></div>' +
        '<div class="cb-text">' +
          '<strong>Utilizamos cookies</strong>' +
          '<p>Usamos cookies técnicas y analíticas para mejorar tu experiencia de navegación. ' +
          'Puedes aceptarlas todas o continuar solo con las esenciales. ' +
          '<a href="politica-de-cookies.html">Más información</a></p>' +
        '</div>' +
        '<div class="cb-actions">' +
          '<button id="cb-accept" class="cb-btn cb-btn-primary">Aceptar todas</button>' +
          '<button id="cb-reject" class="cb-btn cb-btn-secondary">Solo esenciales</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);

    // Animate in (double rAF ensures transition fires)
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        banner.classList.add('cb-visible');
      });
    });

    function dismiss(choice) {
      localStorage.setItem('cookie_consent', choice);
      banner.classList.remove('cb-visible');
      setTimeout(function () {
        if (banner.parentNode) banner.parentNode.removeChild(banner);
      }, 420);
    }

    document.getElementById('cb-accept').addEventListener('click', function () {
      dismiss('accepted');
    });
    document.getElementById('cb-reject').addEventListener('click', function () {
      dismiss('essential');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBanner);
  } else {
    createBanner();
  }
})();
