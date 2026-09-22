# Build Tasks: Ra & Apep

Generated from: .design/ra-and-apep/DESIGN_BRIEF.md (with INFORMATION_ARCHITECTURE.md and `tokens.css`)
Date: 2026-09-21

Nothing exists yet, so every component is new. No tests exist and none are added beyond one runnable check of the scroll-progress maths. Dependencies installed: none, and none are added.

## Foundation
- [x] **Base and browser surfaces**: page shell in the Art Deco / Egyptian Revival direction from the brief — night ground, type scale, selection, scrollbar, focus rings, links, the fixed star ceiling. Done when an unstyled-looking element is impossible to find. _New. Reuses: `tokens.css`._
- [x] **Scroll progress engine**: every `[data-scene]` gets an eased `--p` from 0 to 1 (pinned or through), written only while near the viewport; motion switch and `prefers-reduced-motion` rest every scene at its composed state. Done when the self-check passes and a scene can be driven from CSS alone. _New. Highest risk, so first._

## Core UI
- [x] **Dusk**: pinned first viewport — sky plate, sun, cliffs, boat, papyrus, title, premise, scroll cue; the sun sets and the sky goes to night as `--p` runs. Done when the first viewport matches the brief's FIRST VIEWPORT block. _Depends on: scroll progress engine._
- [x] **Passage and The Traveller**: the reading column with heading, paragraphs, an inline term (hieroglyphs + transliteration) and the Ra cut-out drifting beside it. Done when the measure is 62 to 70 characters at every width.
- [x] **The Duat**: through scene with the gate plate approaching, then its passage. _Reuses: passage._
- [x] **Midnight**: type-only hour VI on the bare star ceiling. Done when it reads as the quietest point of the page.
- [x] **Apep**: through scene — serpent plate, the head cut-out entering from the dark, then its passage. _Reuses: passage._
- [x] **The Seventh Hour**: pinned battle plate; the five defenders arrive one at a time; the outcome line lands last. _Depends on: scroll progress engine._
- [x] **On Earth**: ritual plate and passage; the six acts ignite in order as they cross the viewport. _Reuses: passage._
- [x] **Dawn**: pinned sunrise — dawn sky, rising sun, Khepri, mirrored cliffs; the ground turns from night to day. _Depends on: scroll progress engine._
- [x] **After**: what the myth means, glossary with hieroglyphs, sources, image credits, restart. Day palette.

## Interactions & States
- [x] **Hour rail**: twelve ticks, sun marker tracking the current hour, chapter links, appears once the sun is down, switches to day colours at dawn. Covers: default, hover, focus-visible, current, hidden.
- [x] **Motion switch**: button mirroring the system setting, overriding it, remembered between visits. Covers: on, off, hover, focus-visible, pressed.

## Responsive & Polish
- [x] **Small screens**: 375 and 768 — centre crops, two layers instead of four, shorter pins, horizontal rail in the safe area, 44 px targets. Breakpoints: 375, 768, 1024, 1280.
- [x] **Image pipeline**: crop baked-in letterboxes, convert to WebP, set intrinsic sizes, lazy-load everything below the first scene, write `assets/img/PROVENANCE.md`.
- [x] **Accessibility pass**: 4.5:1 over imagery via scrims, heading order, alt text, `lang` on hieroglyphs, keyboard path, works without JavaScript.
- [x] **Copy**: at least 1,000 visible words, every claim checked against the fact-check report.

## Review
- [ ] **Design review**: run /design-review against the brief, in the browser at 1280 and 375. _Not run: the design flow makes this phase on-request only. What was done instead, in the build thread: two inspection rounds in the browser at 1440x900 and 375x812, with motion on and off, plus scripted checks (progress self-check, 1,553 narrative words, one h1 and ordered headings, alt text on every image, no broken images, keyboard order, clean console)._

## Found and fixed during inspection
- The set sun shone through the faded water under the boat: it is now clipped inside the opaque part of the cliffs.
- Chapter headings never revealed: Chrome's IntersectionObserver honours the target's own `clip-path`, so the wipe is now a mask sweep.
- The Apep plate cropped out the serpent's head and eye: taller plate, higher focal point.
- Battle text was not reliably legible: local scrim, quicker cross-fades, a compact layout for short viewports, and on phones a camera pan from Set to the serpent instead of a dead crop.
- The ritual plate's column cropped the priests; the acts stayed unlit after a jump: wider column, position-based lighting.
- During sunrise the pale chrome scrim sat over a still-blue sky: the rail turns to ink first, the top chrome only in full daylight.
- Asset weight: reeds 480 KB to 111 KB; sky gradients re-encoded at higher quality against banding.
