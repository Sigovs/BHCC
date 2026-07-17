/* ============================================================
   BHCC — design system spec page
   Two jobs only:
   1. Build the spacing ruler from the real tokens (no hardcoded bars).
   2. Read back the LIVE computed px of every fluid step, so the spec
      always tells the truth at the current viewport instead of quoting
      the clamp() we hope is correct.
   No dependencies. Degrades to a static page without JS.
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;
  var readVar = function (name) {
    return getComputedStyle(root).getPropertyValue(name).trim();
  };

  /* ---- 1. Spacing ruler, generated from --sp-1..--sp-9 ---- */
  var ruler = document.getElementById('sp-ruler');
  if (ruler) {
    var html = '';
    for (var i = 1; i <= 9; i++) {
      var val = readVar('--sp-' + i);
      var px = parseFloat(val);
      if (!px) continue;
      // Bootstrap $spacers equivalence, where one exists
      var bs = { 8: '', 16: 'p-3 / m-3', 24: 'p-4 / m-4', 48: 'p-5 / m-5',
                 64: 'p-6 *', 96: 'p-7 *', 128: 'p-8 *', 160: 'p-9 *' }[px];
      html += '<div class="sp-row">' +
                '<div class="sp-bar" style="width:' + Math.min(px, 320) + 'px"></div>' +
                '<div class="sp-lbl"><b>--sp-' + i + '</b> ' + px + 'px' +
                  (bs ? ' &nbsp;·&nbsp; ' + bs : '') +
                '</div>' +
              '</div>';
    }
    ruler.innerHTML = html;
  }

  /* ---- 2. Live computed sizes for the fluid scale ---- */
  var SPECIMENS = {
    display: '.t-display',
    h1: '.t-h1',
    h2: '.t-h2',
    h3: '.t-h3',
    h4: '.t-h4',
    quote: '.t-quote',
    lead: '.t-lead',
    body: '.t-body',
    sm: '.t-sm',
    eyebrow: '.t-eyebrow'
  };

  function refresh() {
    var vw = Math.round(window.innerWidth);
    Object.keys(SPECIMENS).forEach(function (key) {
      var target = document.querySelector('[data-live="' + key + '"]');
      var sample = document.querySelector(SPECIMENS[key]);
      if (!target || !sample) return;
      var cs = getComputedStyle(sample);
      var size = Math.round(parseFloat(cs.fontSize) * 10) / 10;
      var lh = parseFloat(cs.lineHeight);
      var lhOut = isNaN(lh) ? cs.lineHeight : Math.round(lh * 10) / 10 + 'px';
      target.textContent = '→ live @' + vw + 'px: ' + size + 'px / ' + lhOut;
    });
  }

  refresh();
  var t;
  window.addEventListener('resize', function () {
    clearTimeout(t);
    t = setTimeout(refresh, 100);
  }, { passive: true });

  /* Make sure the readout reflects the real font, not a fallback,
     since Gloock's metrics differ enough to change the numbers. */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(refresh);
  }
}());
