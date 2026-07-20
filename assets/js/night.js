/* BHCC — Night Drive (index2) interactions.
   Progressive enhancement only: the page is fully readable with JS off. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- scroll reveals ---------- */
  var reveals = [].slice.call(document.querySelectorAll('[data-reveal]'));
  if (reveals.length && 'IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    var close = menu.querySelector('.mobile-menu__close');
    function setMenu(open) {
      menu.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    toggle.addEventListener('click', function () { setMenu(!menu.classList.contains('is-open')); });
    if (close) close.addEventListener('click', function () { setMenu(false); });
    menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---------- testimonials rotator ---------- */
  var stage = document.querySelector('.quotes__stage');
  if (stage) {
    var slides = [].slice.call(stage.querySelectorAll('.quote'));
    var dotWrap = document.querySelector('.quotes__dots');
    var dots = dotWrap ? [].slice.call(dotWrap.querySelectorAll('.quotes__dot')) : [];
    var idx = 0, timer = null;
    function show(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('is-active', i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); d.setAttribute('aria-selected', i === idx ? 'true' : 'false'); });
    }
    function start() { if (reduce) return; stop(); timer = setInterval(function () { show(idx + 1); }, 6000); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    dots.forEach(function (d, i) { d.addEventListener('click', function () { show(i); start(); }); });
    stage.addEventListener('mouseenter', stop);
    stage.addEventListener('mouseleave', start);
    show(0); start();
  }

  /* ---------- newsletter (no backend) ---------- */
  var news = document.querySelector('.news-form');
  if (news) {
    news.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = news.querySelector('input');
      var btn = news.querySelector('button');
      if (input && input.value.trim() && /.+@.+\..+/.test(input.value)) {
        news.classList.add('is-done');
        btn.textContent = 'Thank you';
        input.value = '';
        input.placeholder = 'You are on the list';
      } else if (input) {
        input.focus();
      }
    });
  }
})();
