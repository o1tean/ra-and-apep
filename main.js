(() => {
  'use strict';

  const root = document.documentElement;
  const motionButton = document.querySelector('.motion');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const parameters = new URLSearchParams(location.search);
  const skipSmoothing = parameters.has('still');

  // Fiecare scenă are propriul progres: 0 la început, 1 la sfârșit.
  const scenes = [...document.querySelectorAll('[data-scene]')].map((element) => ({
    element,
    isPinned: element.dataset.scene === 'pin',
    stage: element.querySelector('.stage'),
    top: 0,
    height: 0,
    stageHeight: 0,
    progress: 0,
    displayedProgress: -1,
    isNearby: true,
  }));

  const chapters = [...document.querySelectorAll('[data-hours]')].map((element) => {
    const [startHour, endHour] = element.dataset.hours.split('-').map(Number);
    return {
      element,
      startHour,
      endHour,
      phase: element.dataset.phase,
      top: 0,
      height: 0,
    };
  });

  const ritualSteps = [...document.querySelectorAll('.act')].map((element) => ({
    element,
    top: 0,
    isLit: false,
  }));

  let viewportHeight = 0;
  let maxScroll = 1;
  let animationFrameId = 0;
  let previousFrameTime = 0;
  let savedMotion = null;

  try {
    savedMotion = localStorage.getItem('motion');
  } catch {
    // Unele browsere blochează stocarea locală. Butonul funcționează și fără ea.
  }

  // Calcule pentru poziția în pagină
  function clampProgress(value) {
    return Math.min(1, Math.max(0, value));
  }

  function getScrollProgress(top, height, scrollY, viewHeight, isPinned) {
    const distance = scrollY - top;

    if (isPinned) {
      // Scena rămâne lipită de ecran cât timp parcurgem secțiunea ei.
      const travelDistance = Math.max(1, height - viewHeight);
      return clampProgress(distance / travelDistance);
    }

    // Pentru o secțiune obișnuită, numărăm de la intrarea până la ieșirea din ecran.
    return clampProgress((distance + viewHeight) / (height + viewHeight));
  }

  function getSceneProgress(scene, scrollY) {
    const viewHeight = scene.isPinned ? scene.stageHeight : viewportHeight;
    return getScrollProgress(scene.top, scene.height, scrollY, viewHeight, scene.isPinned);
  }

  function animationsEnabled() {
    return root.classList.contains('fx');
  }

  function measureLayout(snapToScroll) {
    const scrollY = window.scrollY;
    // clientHeight corespunde înălțimii folosite de CSS, inclusiv în simularea unui telefon.
    viewportHeight = root.clientHeight;
    maxScroll = Math.max(1, root.scrollHeight - viewportHeight);

    for (const item of [...scenes, ...chapters, ...ritualSteps]) {
      const bounds = item.element.getBoundingClientRect();
      item.top = bounds.top + scrollY;
      item.height = bounds.height;
    }

    for (const scene of scenes) {
      scene.stageHeight = scene.stage ? scene.stage.offsetHeight : viewportHeight;
      if (snapToScroll) {
        // La încărcare sau la schimbarea modului, pornim direct din poziția cititorului.
        scene.progress = getSceneProgress(scene, scrollY);
      }
    }
  }

  function getChapterAt(position) {
    let currentChapter = chapters[0];

    // Capitolele sunt deja în ordinea din HTML.
    for (const chapter of chapters) {
      if (chapter.top <= position) {
        currentChapter = chapter;
      }
    }
    return currentChapter;
  }

  // Actualizarea animațiilor și a ceasului din marginea paginii
  function renderFrame(now) {
    animationFrameId = 0;
    const elapsed = Math.min(64, now - previousFrameTime || 16);
    // Apropiem treptat animația de poziția derulării, ca mișcarea să nu fie bruscă.
    const smoothing = skipSmoothing ? 1 : 1 - Math.exp(-elapsed / 110);
    previousFrameTime = now;
    const scrollY = window.scrollY;
    const motionEnabled = animationsEnabled();
    let needsAnotherFrame = false;

    if (motionEnabled) {
      for (const scene of scenes) {
        if (!scene.isNearby) continue;

        const targetProgress = getSceneProgress(scene, scrollY);
        scene.progress += (targetProgress - scene.progress) * smoothing;

        if (Math.abs(targetProgress - scene.progress) < 0.0004) {
          scene.progress = targetProgress;
        } else {
          needsAnotherFrame = true;
        }

        if (scene.progress !== scene.displayedProgress) {
          // CSS-ul folosește această valoare pentru poziții, opacitate și mărime.
          scene.element.style.setProperty('--progress', scene.progress.toFixed(4));
          scene.displayedProgress = scene.progress;
        }
      }
    }

    const screenMiddle = scrollY + viewportHeight / 2;
    const chapter = getChapterAt(screenMiddle);
    const chapterProgress = clampProgress((screenMiddle - chapter.top) / chapter.height);
    const currentHour = chapter.startHour + (chapter.endHour - chapter.startHour) * chapterProgress;

    root.style.setProperty('--hour', currentHour.toFixed(3));
    root.style.setProperty('--scrolled', clampProgress(scrollY / maxScroll).toFixed(4));
    if (root.dataset.phase !== chapter.phase) {
      root.dataset.phase = chapter.phase;
    }

    // Pe fundalul luminos, ceasul trece la text închis. În modul static, zorii sunt deja luminoși.
    const isBrightDawn = chapter.phase === 'dawn' && (chapterProgress > 0.6 || !motionEnabled);
    const inkColor = chapter.phase === 'day' || isBrightDawn ? 'dark' : 'light';
    if (root.dataset.ink !== inkColor) {
      root.dataset.ink = inkColor;
    }

    const sunPosition = chapter !== chapters[0] || chapterProgress > 0.78 ? 'down' : 'up';
    if (root.dataset.sun !== sunPosition) {
      root.dataset.sun = sunPosition;
    }

    // Pașii ritualului se aprind o singură dată, când ajung spre mijlocul ecranului.
    for (const step of ritualSteps) {
      if (!step.isLit && step.top < scrollY + viewportHeight * 0.56) {
        step.isLit = true;
        step.element.classList.add('is-lit');
      }
    }

    if (needsAnotherFrame) {
      requestRender();
    }
  }

  function requestRender() {
    // Mai multe evenimente de scroll pot apărea înainte de desenarea unui singur cadru.
    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(renderFrame);
    }
  }

  // Butonul Animat / Static și preferința salvată
  function updateMotionButton() {
    const enabled = animationsEnabled();
    motionButton.setAttribute('aria-pressed', String(enabled));
    motionButton.textContent = enabled ? motionButton.dataset.on : motionButton.dataset.off;
  }

  function setAnimations(enabled, rememberChoice) {
    // Modul static scurtează pagina. Reținem locul din capitol înainte să schimbăm înălțimile.
    const screenMiddle = window.scrollY + viewportHeight / 2;
    const chapter = getChapterAt(screenMiddle);
    const chapterProgress = (screenMiddle - chapter.top) / Math.max(1, chapter.height);

    root.classList.toggle('fx', enabled);
    updateMotionButton();

    if (rememberChoice) {
      savedMotion = enabled ? 'on' : 'off';
      try {
        localStorage.setItem('motion', savedMotion);
      } catch {
        // Alegerea rămâne valabilă pe pagina curentă, chiar dacă nu o putem salva.
      }
    }

    if (!enabled) {
      for (const scene of scenes) {
        scene.element.style.removeProperty('--progress');
        scene.displayedProgress = -1;
      }
    }

    measureLayout(false);
    if (chapter !== chapters[0]) {
      window.scrollTo({
        top: chapter.top + chapterProgress * chapter.height - viewportHeight / 2,
        behavior: 'instant',
      });
    }
    measureLayout(true);
    requestRender();
  }

  // Urmărim doar scenele apropiate de ecran, ca să nu animăm toată pagina deodată.
  const sceneObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const scene = scenes.find((scene) => scene.element === entry.target);
        scene.isNearby = entry.isIntersecting;
        if (entry.isIntersecting) {
          requestRender();
        }
      }
    },
    { rootMargin: '60% 0px' },
  );

  for (const scene of scenes) {
    sceneObserver.observe(scene.element);
  }

  // Titlurile apar o singură dată; după aceea nu mai trebuie urmărite.
  const headingObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          headingObserver.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.4 },
  );

  for (const heading of document.querySelectorAll('[data-reveal]')) {
    headingObserver.observe(heading);
  }

  // Evenimentele paginii
  motionButton.hidden = false;
  motionButton.addEventListener('click', () => {
    setAnimations(!animationsEnabled(), true);
  });

  reducedMotion.addEventListener('change', (event) => {
    // Respectăm setarea sistemului doar dacă cititorul nu a ales deja un mod.
    if (!savedMotion) {
      setAnimations(!event.matches, false);
    }
  });

  document.querySelector('.restart__btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: animationsEnabled() ? 'smooth' : 'instant' });
  });

  function refreshLayout() {
    measureLayout(false);
    requestRender();
  }

  window.addEventListener('scroll', requestRender, { passive: true });
  window.addEventListener('resize', refreshLayout);
  window.addEventListener('load', refreshLayout);
  if (document.fonts) {
    document.fonts.ready.then(refreshLayout);
  }

  // Pornirea paginii
  updateMotionButton();
  measureLayout(true);
  root.classList.add('ready');
  requestRender();

  // Verificare rapidă: deschide index.html?selfcheck și uită-te în consola browserului.
  // Cu ?still, animațiile urmăresc exact derularea, fără întârzierea de netezire.
  if (parameters.has('selfcheck')) {
    const checks = [
      // Scenă fixată: început, mijloc, sfârșit și poziții din afara secțiunii.
      [getScrollProgress(1000, 3000, 1000, 800, true), 0],
      [getScrollProgress(1000, 3000, 2100, 800, true), 0.5],
      [getScrollProgress(1000, 3000, 3200, 800, true), 1],
      [getScrollProgress(1000, 3000, 0, 800, true), 0],
      [getScrollProgress(1000, 3000, 9000, 800, true), 1],
      // Când scena încape în ecran, calculul trebuie să evite împărțirea la zero.
      [getScrollProgress(1000, 800, 1000, 800, true), 0],
      [getScrollProgress(1000, 800, 1500, 800, true), 1],
      // Secțiune obișnuită: aceleași poziții de referință.
      [getScrollProgress(1000, 600, 200, 800, false), 0],
      [getScrollProgress(1000, 600, 900, 800, false), 0.5],
      [getScrollProgress(1000, 600, 1600, 800, false), 1],
      [getScrollProgress(1000, 600, 0, 800, false), 0],
      [getScrollProgress(1000, 600, 9000, 800, false), 1],
    ];

    for (const [actual, expected] of checks) {
      if (Math.abs(actual - expected) > 1e-9 || !Number.isFinite(actual)) {
        throw new Error(`Progres incorect: ${actual}; valoarea așteptată: ${expected}`);
      }
    }
    console.log(`selfcheck ok: ${checks.length} calcule verificate`);
  }
})();
