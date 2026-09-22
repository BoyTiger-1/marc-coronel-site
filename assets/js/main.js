/* ═══════════════════════════════════════════════════════════════════════
   Marc Coronel — interaction layer
   One rAF loop, one scroll listener, zero dependencies.
   Every effect is input-driven and bails out when nothing has changed.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var lerp  = function (a, b, t) { return a + (b - a) * t; };

  var fine   = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var calm   = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var narrow = matchMedia('(max-width: 900px)');

  var body = document.body;

  /* ── boot: title card out, hero lines in ──────────────────────────── */
  (function boot() {
    var go = function () { body.classList.add('is-ready'); };
    if (calm) { go(); return; }
    body.classList.add('is-locked');
    setTimeout(function () {
      go();
      setTimeout(function () { body.classList.remove('is-locked'); }, 400);
    }, 2150);
    // never trap anyone behind the title card
    addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { go(); body.classList.remove('is-locked'); }
    });
    $('#curtain').addEventListener('click', function () { go(); body.classList.remove('is-locked'); });
  }());

  $('#yr').textContent = new Date().getFullYear();

  /* ── custom cursor ────────────────────────────────────────────────── */
  var cur = { x: innerWidth / 2, y: innerHeight / 2, tx: innerWidth / 2, ty: innerHeight / 2, on: false };
  var cursorEl = $('#cursor'), cursorLabel = $('#cursorLabel');

  var LABELS = {
    book: 'Book', scroll: 'Read', jump: 'Skip', hold: 'Hold', drag: 'Scroll',
    copy: 'Copy', send: 'Send', top: 'Top', link: 'Open'
  };

  if (fine && !calm) {
    body.classList.add('cursor-on');
    addEventListener('pointermove', function (e) {
      cur.tx = e.clientX; cur.ty = e.clientY;
      if (!cur.on) { cur.on = true; cur.x = e.clientX; cur.y = e.clientY; cursorEl.classList.add('is-on'); }
    }, { passive: true });
    addEventListener('pointerdown', function () { cursorEl.classList.add('is-down'); });
    addEventListener('pointerup',   function () { cursorEl.classList.remove('is-down'); });
    addEventListener('pointerleave', function () { cursorEl.classList.remove('is-on'); cur.on = false; });

    // hover intent: one delegated listener, no per-node bindings
    addEventListener('pointerover', function (e) {
      var t = e.target.closest('[data-cursor], a, button');
      if (!t) { cursorEl.classList.remove('is-active'); cursorLabel.textContent = ''; return; }
      var key = t.getAttribute('data-cursor');
      var label = key ? LABELS[key] : (t.tagName === 'A' && t.target === '_blank' ? LABELS.link : '');
      if (label) { cursorLabel.textContent = label; cursorEl.classList.add('is-active'); }
      else { cursorEl.classList.remove('is-active'); cursorLabel.textContent = ''; }
    }, { passive: true });
  }

  /* ── cursor-driven reveal mask ────────────────────────────────────── */
  var revealEl = $('#reveal');
  var layers = {};
  $$('.reveal__layer', revealEl).forEach(function (l) { layers[l.dataset.reveal] = l; });

  var mask = { x: innerWidth / 2, y: innerHeight * 0.45, tx: innerWidth / 2, ty: innerHeight * 0.45, r: 0, tr: 0 };
  var baseR = 0, heldR = 0, held = false, revealAllowed = false, pointerSeen = false;

  function sizeMask() {
    var m = Math.min(innerWidth, innerHeight);
    baseR = m * 0.20;
    heldR = m * 0.62;
  }
  sizeMask();

  if (fine && !calm) {
    addEventListener('pointermove', function (e) {
      mask.tx = e.clientX; mask.ty = e.clientY;
      // the frame stays closed until the visitor actually moves — no stray
      // smudge sitting in the middle of the hero on load
      if (!pointerSeen) { pointerSeen = true; mask.x = e.clientX; mask.y = e.clientY; }
    }, { passive: true });
    addEventListener('pointerdown', function (e) {
      if (e.target.closest('a, button, input, textarea, select')) return;
      held = true; revealEl.classList.add('is-held');
    });
    ['pointerup', 'pointercancel', 'blur'].forEach(function (ev) {
      addEventListener(ev, function () { held = false; revealEl.classList.remove('is-held'); });
    });
  } else if (!calm) {
    // touch / coarse pointer: show the art as a soft static bloom instead
    revealEl.style.setProperty('--mx', '50%');
    revealEl.style.setProperty('--my', '42%');
    revealEl.style.setProperty('--mr', '78vmax');
    revealEl.style.opacity = '';
  }

  var currentArt = 'ring';
  function setArt(name) {
    if (!name || name === currentArt || !layers[name]) return;
    if (layers[currentArt]) layers[currentArt].classList.remove('is-on');
    layers[name].classList.add('is-on');
    currentArt = name;
  }

  /* ── section tracking: rail ticks + whether the reveal is live ────── */
  var REVEAL_SECTIONS = { hero: 1, identity: 1, story: 1, hinge: 1 };
  var ticks = {};
  $$('.rail__ticks a').forEach(function (a) { ticks[a.dataset.tick] = a; });

  var secObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var name = en.target.dataset.section;
      Object.keys(ticks).forEach(function (k) { ticks[k].classList.toggle('is-here', k === name); });
      revealAllowed = !!REVEAL_SECTIONS[name];
      revealEl.classList.toggle('is-live', revealAllowed && !calm);
      if (name !== 'story' && en.target.dataset.revealArt) setArt(en.target.dataset.revealArt);
      body.dataset.phase = name;
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  $$('[data-section]').forEach(function (s) { secObserver.observe(s); });

  /* ── scroll reveals ───────────────────────────────────────────────── */
  var rvObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('is-in'); rvObserver.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  $$('.rv').forEach(function (n) { rvObserver.observe(n); });

  /* ── metric count-up ──────────────────────────────────────────────── */
  var numObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      numObserver.unobserve(en.target);
      var el = en.target, end = parseInt(el.dataset.count, 10), t0 = performance.now(), dur = 900;
      if (calm) { el.textContent = end; return; }
      (function step(t) {
        var p = clamp((t - t0) / dur, 0, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    });
  }, { threshold: 0.5 });
  $$('[data-count]').forEach(function (n) { numObserver.observe(n); });

  /* ── horizontal chapter track ─────────────────────────────────────── */
  var story    = $('#story');
  var storyRail = $('#storyRail');
  var storyBar = $('#storyBar');
  var chaps    = $$('.chap', storyRail);
  var indexLis = $$('#storyIndex li');
  var travel = 0, centers = [], activeChap = -1, horizontal = false;

  function measureStory() {
    horizontal = !narrow.matches;
    if (!horizontal) {
      story.style.height = '';
      storyRail.style.transform = '';
      chaps.forEach(function (c) { c.classList.remove('is-active', 'is-near'); });
      travel = 0;
      return;
    }
    storyRail.style.transform = 'translate3d(0,0,0)';
    travel = Math.max(0, storyRail.scrollWidth - innerWidth);
    story.style.height = (innerHeight + travel) + 'px';
    centers = chaps.map(function (c) { return c.offsetLeft + c.offsetWidth / 2; });
  }

  function paintStory() {
    if (!horizontal || !travel) return;
    var top = story.getBoundingClientRect().top;
    var p = clamp(-top / travel, 0, 1);
    storyRail.style.transform = 'translate3d(' + (-p * travel).toFixed(2) + 'px,0,0)';
    if (storyBar) storyBar.style.width = (p * 100).toFixed(2) + '%';

    var focus = p * travel + innerWidth * 0.42;
    var best = 0, bestD = Infinity;
    for (var i = 0; i < centers.length; i++) {
      var d = Math.abs(centers[i] - focus);
      if (d < bestD) { bestD = d; best = i; }
    }
    if (best !== activeChap) {
      activeChap = best;
      chaps.forEach(function (c, i) {
        c.classList.toggle('is-active', i === best);
        c.classList.toggle('is-near', Math.abs(i - best) === 1);
      });
      indexLis.forEach(function (li, i) { li.classList.toggle('is-active', i === best); });
      setArt(chaps[best].dataset.revealArt);
      // keep the active tab in view WITHOUT touching document scroll
      var idx = $('#storyIndex'), ab = indexLis[best] && indexLis[best].querySelector('button');
      if (idx && ab && idx.scrollWidth > idx.clientWidth) {
        var want = ab.offsetLeft - (idx.clientWidth - ab.offsetWidth) / 2;
        idx.scrollLeft = clamp(want, 0, idx.scrollWidth - idx.clientWidth);
      }
    }
  }

  function gotoChap(i) {
    if (!horizontal) {
      chaps[i].scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'center' });
      return;
    }
    var target = clamp(centers[i] - innerWidth * 0.42, 0, travel);
    var top = story.offsetTop + target;
    scrollTo({ top: top, behavior: calm ? 'auto' : 'smooth' });
  }

  $$('#storyIndex button').forEach(function (b) {
    b.addEventListener('click', function () { gotoChap(+b.dataset.goto); });
  });

  addEventListener('keydown', function (e) {
    if (body.dataset.phase !== 'story') return;
    if (e.key === 'ArrowRight') { e.preventDefault(); gotoChap(Math.min(chaps.length - 1, activeChap + 1)); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); gotoChap(Math.max(0, activeChap - 1)); }
  });

  /* ── page progress rail ───────────────────────────────────────────── */
  var railFill = $('#railFill');
  function paintRail() {
    var max = document.documentElement.scrollHeight - innerHeight;
    var p = max > 0 ? clamp(scrollY / max, 0, 1) : 0;
    railFill.style.height = (p * 100).toFixed(2) + '%';
    body.classList.toggle('is-scrolled', scrollY > 40);
  }

  /* ── hero parallax ────────────────────────────────────────────────── */
  var paraNodes = calm ? [] : $$('[data-parallax]');
  function paintParallax() {
    for (var i = 0; i < paraNodes.length; i++) {
      var n = paraNodes[i];
      var r = n.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) continue;
      var off = (r.top + r.height / 2 - innerHeight / 2) * -parseFloat(n.dataset.parallax);
      n.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0)';
    }
  }

  /* ── single loop ──────────────────────────────────────────────────── */
  var dirty = true;
  addEventListener('scroll', function () { dirty = true; }, { passive: true });

  var rz;
  addEventListener('resize', function () {
    clearTimeout(rz);
    rz = setTimeout(function () { sizeMask(); measureStory(); dirty = true; }, 140);
  });

  function frame() {
    if (dirty) {
      paintRail();
      paintStory();
      paintParallax();
      dirty = false;
    }

    if (fine && !calm) {
      // cursor
      if (Math.abs(cur.tx - cur.x) > 0.05 || Math.abs(cur.ty - cur.y) > 0.05) {
        cur.x = lerp(cur.x, cur.tx, 0.2);
        cur.y = lerp(cur.y, cur.ty, 0.2);
        cursorEl.style.transform = 'translate3d(' + cur.x.toFixed(1) + 'px,' + cur.y.toFixed(1) + 'px,0)';
      }
      // mask — only repaint when it actually moved, and only where it shows
      if (revealAllowed || mask.r > 1) {
        mask.tr = !pointerSeen || !revealAllowed ? 0 : (held ? heldR : baseR);
        var moved = Math.abs(mask.tx - mask.x) > 0.4 || Math.abs(mask.ty - mask.y) > 0.4 || Math.abs(mask.tr - mask.r) > 0.4;
        if (moved) {
          mask.x = lerp(mask.x, mask.tx, 0.14);
          mask.y = lerp(mask.y, mask.ty, 0.14);
          mask.r = lerp(mask.r, mask.tr, 0.09);
          revealEl.style.setProperty('--mx', mask.x.toFixed(0) + 'px');
          revealEl.style.setProperty('--my', mask.y.toFixed(0) + 'px');
          revealEl.style.setProperty('--mr', mask.r.toFixed(0) + 'px');
        }
      }
    }
    requestAnimationFrame(frame);
  }

  /* ── service-lane CTAs prefill the form ───────────────────────────── */
  $$('[data-intent]').forEach(function (a) {
    a.addEventListener('click', function () {
      var sel = $('#f-intent');
      if (!sel) return;
      var want = a.dataset.intent;
      $$('option', sel).forEach(function (o) { if (o.value === want || o.textContent === want) sel.value = o.value || o.textContent; });
      setTimeout(function () { $('#f-msg').focus({ preventScroll: true }); }, 900);
    });
  });

  /* ── booking form ─────────────────────────────────────────────────── */
  var form = $('#bookForm'), status = $('#formStatus');
  form.addEventListener('submit', function (e) {
    var bad = $$('[required]', form).filter(function (f) { return !f.value.trim() || (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value)); });
    $$('[required]', form).forEach(function (f) { f.classList.remove('is-bad'); });
    if (bad.length) {
      e.preventDefault();
      bad.forEach(function (f) { f.classList.add('is-bad'); });
      status.textContent = 'Needs a name, a valid email and a short note.';
      bad[0].focus();
      return;
    }
    var action = form.getAttribute('action');
    if (!action || action === '#') {
      // no endpoint wired yet — hand off to the visitor's mail client so the
      // form still works on day one. Swap `action` for a real endpoint: README.
      e.preventDefault();
      var d = new FormData(form), lines = [];
      d.forEach(function (v, k) { if (v) lines.push(k.replace(/^\w/, function (c) { return c.toUpperCase(); }) + ': ' + v); });
      var to = ($('.contact__direct a[href^="mailto:"]') || {}).href || 'mailto:hello@marccoronel.com';
      location.href = to.replace('mailto:', 'mailto:') +
        '?subject=' + encodeURIComponent('Booking request — ' + (d.get('intent') || 'Enquiry')) +
        '&body=' + encodeURIComponent(lines.join('\n'));
      status.textContent = 'Opening your email client…';
    } else {
      status.textContent = 'Sending…';
    }
  });

  /* ── go ───────────────────────────────────────────────────────────── */
  measureStory();
  narrow.addEventListener('change', function () { measureStory(); dirty = true; });
  addEventListener('load', function () { measureStory(); dirty = true; });
  requestAnimationFrame(frame);
}());
