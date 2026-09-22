# Design Brief: Ra & Apep

Process note: the user's instruction was to make the site, so the interview phases of the design flow (grill-me, design-brief, information-architecture) and the confirmation checkpoints of impeccable and web-design-engineer were run unattended. Each question below was resolved with the recommended answer. Everything here is open to revision.

## Decisions resolved in the grill

| Branch | Decision | Why |
| --- | --- | --- |
| Who is it for? | A curious adult with no Egyptology, evening, laptop or phone | The request says "explaining", not "cataloguing" |
| One page or several? | One page | The myth is one journey; navigation would break it |
| Stack | Plain HTML, CSS, JS. No framework, no build, no animation library | Empty project; nothing here needs more. Native `position: sticky` pins scenes, about 60 lines of JS feed scroll progress to CSS |
| Length | 1,000 words minimum (user requirement); target about 1,300 | Enough to actually explain, short enough to finish |
| Light or dark? | Forced by the subject: the page is the night. It starts at dusk, goes dark, and ends in daylight | The physical scene decides, not category habit |
| Image roles | Antigravity (Gemini) paints opaque scene plates; Codex (`image_gen`) makes transparent cut-outs | Gemini has no alpha channel; Codex does. Parallax needs separable layers |
| Hieroglyphs in images? | None. Generated hieroglyphs are gibberish | The page sets real ones as live Unicode text instead |
| Illustration style | Painterly cinematic matte painting, not photoreal, not tomb-painting pastiche | Forgiving across two generators; reads as a film |
| How many pinned scenes? | Three: dusk, the seventh hour, dawn | UI/UX Pro Max motion guidance: pinning fights native scroll if overused |

## Design Read (web-design-engineer)

```yaml
Design Read:
  artifact: single-page scroll narrative (Experience mode, with Read passages)
  audience: curious general adult, evening, laptop or phone
  visual-language: film title sequence x Egyptian tomb ceiling x 19th-century "Egyptian" slab typography
  mode: greenfield
  visual-variance: 7
  motion-intensity: 9
  information-density: 3
  asset-dependence: 9
  brand-fidelity: 2
```

Positioning: narrative role alternates hero set piece / reading passage; viewing distance 50 cm laptop and 30 cm phone; temperature somber turning triumphant; capacity about 1,300 words across nine sections.

## Problem

People know the name Ra and nothing else. The real myth, that the sun has to fight its way through the underworld every single night and that the Egyptians believed they had to help, is buried in encyclopedia prose and clip-art listicles. It is one of the best stories in any mythology and almost nobody has been told it properly.

## Solution

A film you scroll. The page is the night: it opens on a sunset, carries the reader down through the twelve hours of the underworld, stages the battle in the seventh hour, shows the priests fighting the same battle on earth, and ends at sunrise. Spectacle carries the feeling; calm reading passages between the set pieces carry the explanation.

## Experience Principles

1. **The scroll is the voyage** -- position on the page always means an hour of the night. The hour rail, the colour of the ground and the height of the sun all answer "where am I?" with a time, not a percentage.
2. **Spectacle, then stillness** -- every set piece is followed by a quiet passage in a readable measure. Motion never touches body text.
3. **One light** -- the sun is the protagonist and the only warm light source. It sets, travels the rail as a small disc, flares in battle, and rises. Gold is never decoration.

## Aesthetic Direction

- **Philosophy**: Art Deco / Geometric from the frontend-design list, taken back to its source, the Egyptian Revival, and crossed with Editorial for the reading passages: symmetry, a strong vertical axis, parallax depth, staggered reveals, precise geometric ornament.
- **Tone**: solemn, vast, then triumphant.
- **Reference points**: Apple product pages for scroll-scrubbed, sticky, layered motion that never hijacks the scrollbar; film title sequences for small, widely tracked type over enormous images; the astronomical ceilings of New Kingdom tombs (deep blue ground, rows of gold five-armed stars).
- **Anti-references**: "mysteries of the pharaohs" documentaries; papyrus-scroll fonts; Trajan or Cinzel inscriptional caps; black-and-gold luxury templates with glowing edges; hieroglyph clip-art; museum-website beige.
- **Colour strategy**: drenched, by chapter. Each chapter owns a colour field from the four materials of Egyptian jewellery: gold, lapis lazuli, carnelian, turquoise faience. Night ground is lapis, never neutral black. Dawn ground is limestone.
- **Typography**: display in an "Egyptian", the 19th-century name for the slab serif, coined in the Egyptomania that followed Napoleon's campaign. Hepta Slab (variable, 1 to 900), used light and large. Body in Gentium Book Plus, the working face of philology, because it carries the Egyptological transliteration letters (ꜣ ꜥ ḥ ḫ). Hieroglyphs in Noto Sans Egyptian Hieroglyphs, subset to the glyphs used.
- **Database note**: UI/UX Pro Max matched the pattern (Scroll-Triggered Storytelling) and the style (Parallax Storytelling); its palette and font results did not fit this subject, so colour and type are derived from the subject instead.

## Direction contract

THESIS: the page is the night; scrolling moves the sun. It refuses the category default of a dark hero with gold serif caps over a stock pyramid, followed by cards.

OWN-WORLD: lapis ground with a tomb-ceiling field of gold five-armed stars; one warm light; light slab-serif capitals, widely tracked; hairline gold rules; painted plates that fade into the ground rather than sitting in frames; an hour rail whose marker is a small sun.

STORY: the visitor understands that sunrise was not guaranteed; believes the Egyptians meant it; and leaves able to retell the seventh hour.

FIRST VIEWPORT: full-bleed dusk sky; a large sun low at centre; the Theban cliffs across the lower third; the golden boat on the river left of centre, sailing right; papyrus in the near corners; title centred in the upper third with one line beneath it; a scroll cue at the bottom edge. No nav bar.

FORM: pinned cinematic scenes alternating with reading passages, bracketed by sunset and sunrise. Code-led build (no comp round); no concept-seed roll was run because impeccable's engine binary was not executed.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Motion thesis (impeccable animate)

- **Focal moment**: the sun's passage. It sets behind the cliffs in the first scene, becomes the marker on the hour rail, and rises to flood the page with daylight in the last.
- **Continuity**: the ground colour moves dusk, lapis, carnelian, ember, limestone as the hours pass.
- **Feedback**: rail ticks, the motion switch, links and the restart control acknowledge hover, focus and press.
- **Budget**: transforms and opacity on at most four layers per scene; one blur (the near papyrus); progress is written only for scenes near the viewport.
- Each scene has its own idea rather than one shared entrance: the sun sinks; the gate approaches; the serpent's head enters from the dark; the defenders arrive one by one; the six acts ignite in order; the ground turns to day.

## Existing Patterns

None. The project was empty. Tokens are new: `tokens.css`.

## Component Inventory

| Component | Status | Notes |
| --- | --- | --- |
| Scene (pinned) | New | `position: sticky` stage inside a tall track; exposes `--p` from 0 to 1 |
| Scene (through) | New | Un-pinned parallax; `--p` runs from entering to leaving the viewport |
| Layer | New | Decorative image or shape moved by `--p`; `aria-hidden` |
| Passage | New | Reading column, 62 to 70 characters, on the night ground |
| Hour rail | New | Fixed nav; twelve ticks; sun marker; links to chapters |
| Star ceiling | New | Fixed SVG-pattern field of five-armed stars behind night sections |
| Defender list | New | Five defenders of the boat; revealed in sequence inside the pinned battle |
| Ritual acts | New | Ordered list of the six acts; each ignites as it passes |
| Glossary | New | Term, hieroglyphs, transliteration, meaning |
| Motion switch | New | Button; mirrors and overrides `prefers-reduced-motion` |
| Restart control | New | "Begin the night again"; `window.scrollTo`, never `scrollIntoView` |

## Key Interactions

- Scrolling is native throughout. Pinned scenes hold the stage while `--p` drives layers; nothing snaps.
- Progress values are eased toward their targets each frame, so layers glide rather than step with the wheel.
- The hour rail shows the current hour and jumps to chapters on click or Enter.
- Motion off (system setting or the switch): pinned scenes unpin, layers rest in their final composed state, reveals are instant, the star field stops drifting. Nothing is hidden.
- Without JavaScript the page is a complete illustrated article.

## Responsive Behavior

Mobile first at 375 px: single column, plates cropped to their centre (every plate keeps its subject in the middle half), two parallax layers instead of four, shorter pin distances, the hour rail becomes a slim bar along the bottom edge inside the safe area. From 768 px: side margins and the vertical rail on the right. From 1280 px: reading passages shift off-axis beside their plates. Touch targets at least 44 px. Body copy never below 17 px.

## Accessibility Requirements

WCAG 2.2 AA. Text contrast at least 4.5:1, including over imagery, guaranteed by scrims rather than by luck. Visible focus rings in gold on night and lapis on day. Logical heading order, one `h1`. Decorative layers `aria-hidden`; the six plates have alt text. Hieroglyph spans carry `lang="egy"` and a text alternative. `prefers-reduced-motion` honoured and a manual switch provided. No autoplaying loops beyond a slow star drift that stops when motion is off.

## Out of Scope

Other myths and other gods beyond what this story needs; a pantheon index; audio or narration; a CMS; languages beyond English and Romanian (the Romanian edition at `/ro/` was added on request after the first build); image-generation variants; analytics; a dark/light toggle for the reader (the narrative owns the ground colour).
