# Design

The durable visual decisions of Ra & Apep, written from the built site. Product truth lives in `PRODUCT.md`; the reasoning and the direction contract live in `.design/ra-and-apep/DESIGN_BRIEF.md`; the values live in `tokens.css`.

## The world in one paragraph

The page is the night. It opens on a sunset, goes down through the twelve hours of the Duat, and ends in daylight. The ground at night is lapis, never neutral black, under a field of gold five-armed stars taken from the astronomical ceilings of New Kingdom tombs. There is one warm light, the sun, and gold means that light and nothing else. Painted plates melt into the ground through masks instead of sitting in frames.

## Colour

Four materials of Egyptian jewellery plus limestone, as OKLCH primitives in `tokens.css`: lapis (ground and night), gold (the sun, headings on night, focus), carnelian (Apep, danger, fire), faience (reserved; status only), limestone with lapis ink (daylight). Strategy: drenched by chapter. `data-theme="dark"` on `<html>` is the night; the closing section opts into `data-theme="light"`. The reader never chooses the theme; the story does.

Text pairs used, all at or above 4.5:1: sand-100, sand-300 and sand-500 on lapis-950; gold-400 and carnelian-400 on lapis-950; ink-900, ink-600 and ink-500 on limestone-50; lapis-600 on limestone-50. Text over plates always sits on a scrim of `--night-scrim`.

## Type

- Display: Hepta Slab, variable, used at 200 to 250 for headings and 500 for small labels. Uppercase with 0.06 to 0.1em tracking. A slab serif on purpose: "Egyptian" is the nineteenth-century name for the genre.
- Body: Gentium Book Plus, 17 to 20 px fluid, line height 1.7, measure capped at 40rem. Chosen because it carries the Egyptological transliteration letters.
- Hieroglyphs: Noto Sans Egyptian Hieroglyphs, subset by `text=` to the 23 signs used, written in the HTML as numeric character references.
- Ceiling: display type never exceeds 6rem. No gradient text, no eyebrow labels above headings.

## Layout

One column of reading, 40rem, between full-bleed scenes. Spacing is the 8 px scale in `tokens.css`, with `--space-12` and `--space-13` between chapters. From 64rem some passages move off-axis beside a sticky figure (Ra, the ritual plate) or leave room for a cut-out (Apep's head). Mobile first; the base styles are the 375 px layout.

## Motion

- Two layers. Base CSS is a complete static article. `html.fx` (JavaScript running and motion allowed) adds the film.
- `main.js` writes one number per scene, `--p` from 0 to 1, eased toward the scroll position with a 110 ms time constant. All choreography is CSS `calc()` on `--p`; sub-ranges are `clamp()` expressions. Pinning is `position: sticky`; scrolling is never hijacked.
- Three pinned scenes only: dusk (track 300svh), the seventh hour (620svh), dawn (300svh). Everything else is un-pinned parallax on decorative layers. Body text never moves.
- Each scene has its own idea: the sun sinks behind the cliffs; the gate approaches; the serpent's head comes out of the dark; the defenders arrive one at a time (on phones the camera pans along the spear); the six acts ignite in order; the sun rises and the ground turns to day.
- Headings reveal with a feathered mask sweep, not `clip-path`: Chrome's IntersectionObserver honours the target's own clip-path.
- Rest states: without `.fx` each scene rests at the `--p` declared in CSS (dusk 0, battle 1, dawn 1, through scenes 0.5). The motion switch mirrors `prefers-reduced-motion`, overrides it, and is remembered in `localStorage["motion"]`.
- Testing aids: `?selfcheck` asserts the progress maths in the console; `?still` snaps instead of easing, for deterministic screenshots.

## Components

Pinned scene, through scene, layer, passage, plate, term (hieroglyphs with transliteration), beats (the five defenders), acts (the six ritual chapters), hour rail (twelve ticks, sun marker, five chapter links; a bottom bar below 48rem), wordmark, motion switch, glossary, sources, restart.

## Languages

English at `/`, Romanian at `/ro/`. One stylesheet, one script, one set of images; an edition is a single HTML file. Nothing visible is hard-coded in CSS or JS: the motion switch reads its two labels from `data-on` and `data-off` on the button (English is the fallback). A new edition must survive its own longest strings: headings break words rather than overflow, the hero premise is measured to two balanced lines so it never runs onto the sun, the scroll cue wraps, and the top bar has to fit wordmark, language link and the longer motion label inside 320 px (Romanian uses „Animat” / „Static” for that reason). Romanian is typeset with comma-below ș and ț, „low-high” quotation marks and spaced en dashes. Egyptian names follow Romanian usage (Seth, Serket, Amon-Ra, Tutmes); the bibliography stays in its original English.

## Browser surfaces

Selection, caret, scrollbar, focus rings and link underlines are themed from the palette, and change with the phase of the night.

## Rules for anything added later

1. Position on the page must keep meaning an hour. New chapters take a `data-hours` range.
2. No new warm light sources. If it glows gold, it is the sun or something the sun is lighting.
3. No writing inside generated images. Hieroglyphs are text or they are absent.
4. No fourth pinned scene.
5. Every new raster gets a row in `assets/img/PROVENANCE.md` and its prompt in `assets/img/prompts/`.
