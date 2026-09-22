// Ra & Apep — the scroll engine. No dependencies.
// Every [data-scene] gets --p, a 0..1 progress eased toward the scroll position; CSS does the rest.
// ponytail: one easing constant and CSS sub-ranges instead of timelines. If a scene ever needs
// keyframed choreography that calc() cannot express, that is the moment for GSAP ScrollTrigger.
(() => {
  'use strict';

  const root = document.documentElement;
  const clamp01 = (v) => Math.min(1, Math.max(0, v));

  /** Pinned: how far the sticky stage has travelled down its track.
   *  Through: 0 as the top edge enters the viewport, 1 as the bottom edge leaves it. */
  function progress(top, height, scrollY, view, pinned) {
    const y = scrollY - top;
    return pinned ? clamp01(y / Math.max(1, height - view)) : clamp01((y + view) / (height + view));
  }

  const params = new URLSearchParams(location.search);
  const still = params.has('still'); // testing aid: snap to the scroll position instead of easing toward it

  if (params.has('selfcheck')) {
    const near = (a, b) => Math.abs(a - b) < 1e-9;
    const cases = [
      [progress(1000, 3000, 1000, 800, true), 0], [progress(1000, 3000, 2100, 800, true), 0.5],
      [progress(1000, 3000, 3200, 800, true), 1], [progress(1000, 3000, 0, 800, true), 0],
      [progress(1000, 3000, 9000, 800, true), 1], [progress(1000, 800, 1500, 800, true), 1],
      [progress(1000, 600, 200, 800, false), 0], [progress(1000, 600, 900, 800, false), 0.5],
      [progress(1000, 600, 1600, 800, false), 1],
    ];
    const bad = cases.filter(([got, want]) => !near(got, want));
    console[bad.length ? 'error' : 'log'](bad.length ? `selfcheck FAILED ${JSON.stringify(bad)}` : 'selfcheck ok');
  }

  const scenes = [...document.querySelectorAll('[data-scene]')].map((el) => ({
    el,
    pin: el.dataset.scene === 'pin',
    stage: el.querySelector('.stage'),
    top: 0, height: 0, view: 0, p: 0, shown: -1, live: true,
  }));
  const chapters = [...document.querySelectorAll('[data-hours]')].map((el) => {
    const [a, b] = el.dataset.hours.split('-').map(Number);
    return { el, a, b, phase: el.dataset.phase, top: 0, height: 0 };
  });

  const acts = [...document.querySelectorAll('.act')].map((el) => ({ el, top: 0, lit: false }));

  const fx = () => root.classList.contains('fx');
  let vh = 0, maxScroll = 1, raf = 0, last = 0;

  function target(s, y) {
    return progress(s.top, s.height, y, s.pin ? s.view : vh, s.pin);
  }

  function measure(snap) {
    const y = window.scrollY;
    vh = root.clientHeight; // the layout viewport CSS sees; innerHeight can disagree under device emulation
    maxScroll = Math.max(1, root.scrollHeight - vh);
    for (const item of [...scenes, ...chapters, ...acts]) {
      const r = item.el.getBoundingClientRect();
      item.top = r.top + y;
      item.height = r.height;
    }
    for (const s of scenes) {
      s.view = s.stage ? s.stage.offsetHeight : vh;
      if (snap) s.p = target(s, y); // arrive in place; never glide in from zero
    }
  }

  function chapterAt(mid) {
    let c = chapters[0];
    for (const ch of chapters) if (ch.top <= mid) c = ch; // document order
    return c;
  }

  function frame(now) {
    raf = 0;
    const k = still ? 1 : 1 - Math.exp(-Math.min(64, now - last || 16) / 110); // ~110 ms to catch the scrollbar
    last = now;
    const y = window.scrollY;
    let moving = false;

    if (fx()) {
      for (const s of scenes) {
        if (!s.live) continue;
        const t = target(s, y);
        s.p += (t - s.p) * k;
        if (Math.abs(t - s.p) < 0.0004) s.p = t; else moving = true;
        if (s.p !== s.shown) { s.el.style.setProperty('--p', s.p.toFixed(4)); s.shown = s.p; }
      }
    }

    // Where in the night are we? Drives the rail's sun, the chrome colour and the star drift.
    const mid = y + vh / 2;
    const c = chapterAt(mid);
    const t = clamp01((mid - c.top) / c.height);
    root.style.setProperty('--hour', (c.a + (c.b - c.a) * t).toFixed(3));
    root.style.setProperty('--scrolled', clamp01(y / maxScroll).toFixed(4));
    if (root.dataset.phase !== c.phase) root.dataset.phase = c.phase;
    // The chrome turns from sand to ink once the sky behind it is bright.
    // (With motion off the dawn rests fully risen, so it is bright from its first pixel.)
    const ink = c.phase === 'day' || (c.phase === 'dawn' && (t > 0.6 || !fx())) ? 'dark' : 'light';
    if (root.dataset.ink !== ink) root.dataset.ink = ink;
    const sun = c !== chapters[0] || t > 0.78 ? 'down' : 'up';
    if (root.dataset.sun !== sun) root.dataset.sun = sun;
    // The ritual acts ignite as they pass the middle of the screen and stay lit, jump or scroll.
    for (const a of acts) if (!a.lit && a.top < y + vh * 0.56) { a.lit = true; a.el.classList.add('is-lit'); }

    if (moving) raf = requestAnimationFrame(frame);
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

  // ---- Motion switch: mirrors the system setting, overrides it, remembers the choice.
  const button = document.querySelector('.motion');
  // Each language edition carries its own labels on the button; English is the fallback.
  const label = (on) => button.dataset[on ? 'on' : 'off'] || (on ? 'Motion on' : 'Motion off');
  let saved = null;
  try { saved = localStorage.getItem('motion'); } catch {}

  function setFx(on, remember) {
    // Layout height changes when scenes pin or unpin, so keep the reader in the same chapter.
    const mid = window.scrollY + vh / 2;
    const c = chapterAt(mid);
    const t = (mid - c.top) / Math.max(1, c.height);

    root.classList.toggle('fx', on);
    button.setAttribute('aria-pressed', String(on));
    button.textContent = label(on);
    if (remember) { saved = on ? 'on' : 'off'; try { localStorage.setItem('motion', saved); } catch {} }
    if (!on) for (const s of scenes) { s.el.style.removeProperty('--p'); s.shown = -1; }

    measure(false);
    if (chapters.length && c !== chapters[0]) window.scrollTo({ top: c.top + t * c.height - vh / 2, behavior: 'instant' });
    measure(true);
    kick();
  }
  button.hidden = false;
  button.addEventListener('click', () => setFx(!fx(), true));
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => { if (!saved) setFx(!e.matches, false); });

  // ---- Observers: only nearby scenes are driven; headings wipe in once.
  const watch = (nodes, options, hit) => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => hit(e, io)), options);
    nodes.forEach((n) => io.observe(n));
  };
  watch(scenes.map((s) => s.el), { rootMargin: '60% 0px' }, (e) => {
    scenes.find((s) => s.el === e.target).live = e.isIntersecting;
    if (e.isIntersecting) kick();
  });
  watch(document.querySelectorAll('[data-reveal]'), { threshold: 0.4 }, (e, io) => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  });

  document.querySelector('.restart__btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: fx() ? 'smooth' : 'instant' });
  });

  const remeasure = () => { measure(false); kick(); };
  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', remeasure);
  addEventListener('load', remeasure);
  if (document.fonts) document.fonts.ready.then(remeasure);

  button.setAttribute('aria-pressed', String(fx()));
  button.textContent = label(fx());
  measure(true);
  root.classList.add('ready');
  kick();
})();
