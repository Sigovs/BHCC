/* ============================================================
   BHCC — homepage behaviour
   Progressive enhancement only. Nothing here is required to read the page:
   without JS the carousel stacks, the footer accordions render open, and
   both forms still submit (see .no-js in sections.css).
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- §01 sticky header: shadow + shrink on scroll ------------
     Brief: "Subtle bottom border or drop shadow on scroll only."
     rAF-throttled; 8px threshold so a 1px scroll does not flicker it. */
  var header = document.getElementById('header');
  if (header) {
    var ticking = false;
    var setStuck = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(setStuck); ticking = true; }
    }, { passive: true });
    setStuck();
  }

  /* ---------- §02 hero: respect reduced-motion ------------------------ */
  if (reduce) {
    document.querySelectorAll('video.hero-media').forEach(function (v) {
      v.removeAttribute('autoplay');
      v.pause();
    });
  }

  /* ---------- §07 quote carousel dots --------------------------------
     Built from the slides so the count can never drift out of sync when
     the WordPress backend supplies a different number of quotes. */
  var carouselEl = document.getElementById('quoteCarousel');
  var dotsEl = document.getElementById('quoteDots');

  if (carouselEl && dotsEl && window.bootstrap) {
    var items = carouselEl.querySelectorAll('.carousel-item');
    var instance = bootstrap.Carousel.getOrCreateInstance(carouselEl, {
      interval: reduce ? false : 7000,
      ride: reduce ? false : 'carousel',
      pause: 'hover',
      wrap: true
    });

    items.forEach(function (_, i) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Quote ' + (i + 1) + ' of ' + items.length);
      b.setAttribute('aria-current', i === 0 ? 'true' : 'false');
      b.addEventListener('click', function () { instance.to(i); });
      li.appendChild(b);
      dotsEl.appendChild(li);
    });

    carouselEl.addEventListener('slid.bs.carousel', function (e) {
      var buttons = dotsEl.querySelectorAll('button');
      buttons.forEach(function (b, i) {
        b.setAttribute('aria-current', i === e.to ? 'true' : 'false');
      });
    });
  }

  /* ---------- §09 footer accordions (mobile only) ---------------------
     Explore + Company only. The brand and Connect columns are never
     collapsed — the brief requires social and the language switcher to
     stay visible at mobile. */
  var mqMobile = window.matchMedia('(max-width: 767.98px)');

  document.querySelectorAll('.foot-acc__btn').forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;

    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.classList.toggle('is-open', !open);
    });
  });

  /* Desktop must never inherit a collapsed panel left over from mobile. */
  var syncAccordions = function () {
    document.querySelectorAll('.foot-acc__btn').forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      if (!mqMobile.matches) {
        panel.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  };
  (mqMobile.addEventListener ? mqMobile.addEventListener('change', syncAccordions)
                             : mqMobile.addListener(syncAccordions));
  syncAccordions();

  /* ---------- §09 email signup: real validation states ---------------- */
  var form = document.getElementById('signupForm');
  var input = document.getElementById('signupEmail');
  var msg = document.getElementById('signupMsg');

  if (form && input && msg) {
    var setState = function (state, text) {
      msg.setAttribute('data-state', state);
      msg.textContent = text;
      input.setAttribute('aria-invalid', state === 'error' ? 'true' : 'false');
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var value = input.value.trim();

      if (!value) { setState('error', 'Please enter your email address.'); input.focus(); return; }
      if (!input.checkValidity()) { setState('error', 'That email address does not look right.'); input.focus(); return; }

      /* No endpoint is wired in the comp — the WP theme posts this. */
      setState('success', 'Thank you — you are on the list.');
      form.reset();
    });

    input.addEventListener('input', function () {
      if (msg.getAttribute('data-state') === 'error') setState('', '');
    });
  }

  /* ---------- footer year ------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
