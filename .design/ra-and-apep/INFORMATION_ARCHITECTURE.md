# Information Architecture: Ra & Apep

Structural questions resolved unattended, with the recommended answer each time: the one thing a visitor does is read the story top to bottom; navigation depth is one level (chapters of a single page); nothing grows over time; there is one kind of visitor; all of the time is spent on the single page.

## Site Map

- Ra & Apep `/` (`index.html`)
  - Dusk `#dusk` — sunset, the title, the premise
  - The Traveller `#traveller` — who Ra is; the three forms; the two boats
  - The Duat `#duat` — hours I to V; twelve gates; the ram-headed "Flesh"; Mehen
  - Midnight `#midnight` — hour VI; the sun meets Osiris; quiet, type only
  - Apep `#apep` — the serpent; isfet; the roar, the stare, the swallowed river
  - The Seventh Hour `#seventh-hour` — the battle and the five defenders
  - On Earth `#ritual` — hours VIII to XI; the Book of Overthrowing Apep; the six acts
  - Dawn `#dawn` — hour XII; the last serpent; Khepri; sunrise
  - After `#after` — what the myth means; glossary; sources; image credits; restart
- Ra & Apep, Romanian edition `/ro/` (`ro/index.html`) — the same nine chapters and anchors, translated; shares `tokens.css`, `styles.css`, `main.js` and every image with the English page. Each edition links to the other from the top bar (`RO` / `EN`) and declares both as `hreflang` alternates.

## Navigation Model

- **Primary navigation**: the hour rail. Twelve ticks, I to XII, fixed to the right edge. Its marker is a small sun whose position is the current hour. Eight of the ticks are links to the chapters above; the rest are decorative. It appears once the sun has set in the first scene, because before that the sun is still in the sky.
- **Secondary navigation**: none.
- **Utility navigation**: a wordmark (top left, returns to the top) and the motion switch (top right). Both sit over the scenes without a bar behind them.
- **Mobile navigation**: the rail turns horizontal and sits along the bottom edge above the safe-area inset, with the current hour named beside it. No hamburger; there is nothing to put in one.
- **Skip link**: "Skip to the story" jumps past the first pinned scene to `#traveller`.

## Content Hierarchy

### Dusk
1. The sun, low and enormous — the protagonist, before a word is read
2. Title — what this is
3. One line of premise — why to keep scrolling
4. Scroll cue

### Reading passages (Traveller, Duat, Apep, Ritual, After)
1. Heading that names the hour or the actor
2. Two to four short paragraphs in one measure
3. One detail set apart: a term with hieroglyphs, or a pull line
4. The plate for that chapter, entering or leaving beside the text

### The Seventh Hour
1. The plate: Set and the serpent
2. The stakes in one sentence
3. The five defenders, one at a time
4. The outcome, and the catch: he cannot die

### Dawn
1. The rising sun and Khepri
2. The last serpent, tail to mouth
3. The turn from night ground to day ground

### After
1. What the myth is saying (ma'at and isfet)
2. Glossary
3. Sources
4. How the images were made
5. Restart

## User Flows

### Read the story
1. Visitor lands on Dusk and sees the sun above the cliffs
2. Scrolls; the sun sets; the rail appears
3. Reads the passages; holds through the three pinned scenes
4. Reaches Dawn; the page turns to daylight
5. Reads After
   - If curious -> follows a source link (new tab)
   - If done -> "Begin the night again" returns to the top

### Jump to a chapter
1. Visitor clicks or focuses a linked tick on the rail
2. Page scrolls to that chapter's anchor
3. Rail marker follows

### Calm the page
1. Visitor activates the motion switch (or arrives with reduced motion set)
2. Pinned scenes unpin; layers rest; reveals are instant
3. Reading continues from the same place

## Naming Conventions

| Concept | Label in UI | Notes |
| --- | --- | --- |
| The sun god | Ra | Not Re; the familiar English form |
| The serpent | Apep | "Apophis" given once as the Greek form |
| The underworld | the Duat | Always with the article |
| The boats | the day boat, the night boat | Egyptian names (Mandjet, Mesektet) given once each, in italics |
| The vessel generally | boat | Not barque, bark or ship, except in image credits |
| Order / chaos | ma'at / isfet | Lower case italics after first use |
| Divisions of the night | hours | Roman numerals on the rail; words in headings ("The Seventh Hour") |
| The ritual text | The Book of Overthrowing Apep | Title case; the papyrus named once |
| Motion control | Motion on / Motion off | States, not "Reduce motion" |

## Component Reuse Map

| Component | Used on | Behavior differences |
| --- | --- | --- |
| Pinned scene | Dusk, Seventh Hour, Dawn | Different layers and track lengths; same progress contract |
| Through scene | Duat, Apep, Ritual | Plate side alternates; Apep adds the entering head cut-out |
| Passage | Traveller, Duat, Apep, Ritual, After | After uses the day palette |
| Term (hieroglyph + transliteration) | Passages, Glossary | Inline in passages, tabular in the glossary |
| Hour rail | Global | Hidden during Dusk until the sun is down; day colours at Dawn |

## Content Growth Plan

None. The page is a finished piece. If more myths were ever added they would be sibling pages with the same scene and passage components and a plain index; nothing in this structure prevents that.

## URL Strategy

- Pattern: a single document with fragment anchors, `/#seventh-hour`
- Dynamic segments: none
- Query parameters: none
