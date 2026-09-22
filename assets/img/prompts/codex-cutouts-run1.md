# Task: generate six transparent cut-out illustrations (images only)

You are the illustrator for a cinematic scrolling website that retells the ancient Egyptian myth of Ra and Apep (the sun god's nightly voyage through the underworld and his battle with the chaos serpent). Another illustrator is painting the full-bleed background plates. **Your job is the isolated cut-out elements that float over those plates as parallax layers.**

Use your `imagegen` skill with the **built-in `image_gen` tool** (not the CLI fallback). One call per asset. Every asset must have a **genuinely transparent background with a real alpha channel**.

Do **not** write any HTML, CSS, JS or other files. Only produce the six PNG files listed below.

## Where to save

Copy each final image into this workspace at exactly these paths (the folder already exists):

- `assets/img/raw/horizon.png`
- `assets/img/raw/barque.png`
- `assets/img/raw/reeds.png`
- `assets/img/raw/ra.png`
- `assets/img/raw/apep-head.png`
- `assets/img/raw/khepri.png`

## Style bible — apply to every asset so the whole set feels like frames from one film

- Medium: cinematic concept-art matte painting with painterly realism; the look of a prestige film title sequence. Not a cartoon, not a video-game splash screen, not clip-art, not a museum photograph.
- Subject accuracy: ancient Egyptian New Kingdom iconography rendered with archaeological plausibility (tomb-painting motifs brought to life), never fantasy kitsch.
- Palette (strict): near-black and deep lapis-lazuli indigo shadows; molten gold and amber highlights; carnelian red-orange reserved for the serpent and the sun disk; small touches of turquoise faience. No purple, no neon, no green tint.
- Light: strong warm gold rim/back light as if the sun were behind or beside the subject; deep clean shadows; subtle film grain.
- Absolutely no text of any kind: no hieroglyphs, no letters, no numbers, no watermark, no signature, no border, no frame.
- Cut-out rules: isolated subject on a fully transparent background. No backdrop, no ground plane, no cast shadow on any surface, no glow halo or vignette baked around the subject. Clean anti-aliased edges. Unless a bleed edge is specified, the whole subject sits inside the frame with roughly 6% padding.

## The six assets

### 1. `horizon.png` — landscape 3:2
A wide panoramic strip of landscape, used as the horizon layer of a parallax sunset: the western desert cliffs of Thebes at dusk (layered limestone escarpments with a pyramid-shaped peak a little left of centre) sloping down to a band of date palms and the near bank of the Nile, with a strip of calm dark river water along the bottom edge carrying a faint gold reflection. The landscape occupies only the **bottom ~45%** of the image and runs edge to edge (bleeds off the left, right and bottom edges). **Everything above the skyline is fully transparent.** Back-lit: the cliffs are dark indigo silhouettes with a thin molten-gold rim light along their ridgelines; the palms are pure silhouette.

### 2. `barque.png` — landscape 3:2
The night boat of the Egyptian sun god (the Mesektet), exact side view, **prow pointing right**: a long, slender golden papyrus-shaped boat with a high up-curved lotus-blossom prow and stern and a pair of large steering oars at the stern. Amidships a small open shrine in which stands ram-headed Ra (a man's body with a ram's head with long horizontal wavy horns and a sun disk above the horns); a great protective serpent (Mehen) arches in coils over and around the shrine. A few small standing crew deities fore and aft, the one at the prow holding a spear. The hull is cut along the bottom by a clean horizontal waterline (no water drawn). It glows as if lit from within by warm gold light, with deep shadow on the far side.

### 3. `reeds.png` — landscape 3:2
Foreground layer for parallax: dense clusters of tall papyrus plants (feathery umbrella-shaped umbels on long stalks) and a few reeds rising from the bottom edge — tallest at the far left and far right, low in the centre, forming a shallow U-shaped frame. Near-black indigo silhouettes with faint gold rim light on some umbels. Bleeds off the bottom, left and right edges; everything else transparent (the centre and top of the image are empty).

### 4. `ra.png` — portrait 2:3
Ra, the Egyptian sun god in his daytime form: head-and-torso portrait, three-quarter view **facing left**. A falcon head with the dark facial markings of the Horus falcon, a striped tripartite wig in lapis blue and gold, a broad collar of gold, lapis, carnelian and turquoise, gold armbands on bare shoulders. Above his head a large red-gold sun disk encircled by a rearing cobra. Regal, calm, immensely powerful. Warm gold key light from the upper right, cool lapis fill. The torso bleeds off the bottom edge.

### 5. `apep-head.png` — landscape 3:2
The head and neck of Apep, the colossal chaos serpent, **lunging in from the right edge toward the left**: jaws wide open, long curved fangs, forked tongue, a burning carnelian-red eye, a red glow deep in the throat; scales like knapped black flint and obsidian with dull bronze edges. The thick neck bleeds off the right edge. Side / three-quarter view. Menacing, ancient, enormous.

### 6. `khepri.png` — square 1:1
Khepri, the Egyptian scarab god of the rising sun, as a winged scarab in the manner of Tutankhamun's pectoral jewellery brought to life: top view, perfectly symmetrical. A lapis-blue scarab body with gold detailing; broad outstretched wings curving upward, feathered in inlaid bands of lapis, turquoise and carnelian with gold cell walls; its forelegs hold up a glowing red-gold sun disk above its head. Luminous, precise, jewel-like, yet painterly to match the rest of the set.

## Quality gate (do this before finishing)

For each file, confirm it exists at the path above, and check that it really has an alpha channel with transparent pixels (for example `sips -g hasAlpha -g pixelWidth -g pixelHeight <file>`). If an asset clearly failed the spec (opaque background, text in the image, wrong facing direction, subject cropped where it should not be), regenerate it **once**. Do not overwrite a good file with a worse one.

## Final report

End with a short table: file | pixel size | has alpha (yes/no) | one-line note on anything that deviates from the spec. State that the built-in `image_gen` tool was used.
