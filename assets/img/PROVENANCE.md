# Image provenance

Every raster on the site is AI-generated for this project on 2026-09-21 or 2026-09-22. Nothing here is a photograph, a museum object or a scan. The page says so in its "About the pictures" note.

The exact prompts, including the shared style bible, are kept beside the images in `prompts/`. The originals as delivered by each generator are in `raw/`; `tools/build-images.py` turns them into the shipped WebP files and is safe to re-run. Legacy plates use a letterbox crop and upscale to 2048 px; the refreshed plates retain their full frame and native resolution.

## Refreshed plates: OpenAI built-in `image_gen`, 2026-09-22

Used by both language editions. Prompt set: `prompts/codex-plates-v2.md`. The generator returned 1672 × 941 px; the site serves that native size or a 960 × 540 px WebP, with no upscaling. The earlier images remain available beside them.

| Shipped files | Raw | Notes |
| --- | --- | --- |
| `duat-v2-960.webp`, `duat-v2-1672.webp` | `raw/duat-v2.png` | Sandstone gates, cobra guardians, blue cavern haze and a golden prow; clearer depth and stone texture |
| `battle-v2-960.webp`, `battle-v2-1672.webp` | `raw/battle-v2.png` | Seth's Set-animal head and continuous spear; Apep confronts the barque over a dry riverbed, matching the story |

## Plates: Google Antigravity CLI (`agy` 1.2.7), built-in image generation tool

The original Duat and battle plates below are retained for reference; the site now uses the refreshed versions above.

Dispatched through the `agy-delegate` relay. The run painted all six plates and then lost its connection before writing its final report, so the image model's exact label was never recorded; the files were recovered from Antigravity's own artifact folder. Prompt: `prompts/antigravity-plates.txt`.

| Shipped file | Raw | Prompt section | Notes |
| --- | --- | --- | --- |
| `sky-dusk-1376.webp`, `sky-dusk-2048.webp` | `raw/sky-dusk.jpg` | PLATE 1, sky_dusk | Full 16:9 frame |
| `duat-*.webp` | `raw/duat.jpg` | PLATE 2, duat | Delivered with black letterbox bars baked in (rows 0-91, 677-767); cropped to 2.35:1 |
| `apep-*.webp` | `raw/apep.jpg` | PLATE 3, apep | Letterbox cropped |
| `battle-*.webp` | `raw/battle.jpg` | PLATE 4, battle | Letterbox cropped. Set has the Set-animal head, as asked, not a jackal's |
| `ritual-*.webp` | `raw/ritual.jpg` | PLATE 5, ritual | Letterbox cropped. The column reliefs are indistinct pseudo-carving, not writing |
| `sky-dawn-*.webp` | `raw/sky-dawn.jpg` | PLATE 6, sky_dawn | Full 16:9 frame |

## Cut-outs: OpenAI Codex CLI (`codex` 0.155.1), built-in `image_gen` tool

Run in a `workspace-write` sandbox. Native transparent PNGs; no chroma-keying. The first run finished two assets before a network failure; the second run finished the other four with the first two attached as style references. Prompts: `prompts/codex-cutouts-run1.md`, `prompts/codex-cutouts-run2.md`.

| Shipped file | Raw | Run | Notes from Codex's report |
| --- | --- | --- | --- |
| `horizon.webp` | `raw/horizon.png` | 1 | Used twice: as drawn for dusk, mirrored for dawn |
| `barque.webp` | `raw/barque.png` | 1 | Prow figure reads as a falcon-headed god with a spear, not Set |
| `apep-head.webp` | `raw/apep-head.png` | 2 | Tongue margin tighter than the 6% asked for |
| `ra.webp` | `raw/ra.png` | 2 | Lower-left arm reaches the side edge after one retry |
| `khepri.webp` | `raw/khepri.png` | 2 | Minor left/right asymmetries |
| `reeds.webp` | `raw/reeds.png` | 2 | Shipped at 1024 px and lower quality: it is shown blurred and darkened |

## Not images

The sun discs, the five-armed star field, the hour rail and the scroll arrow are CSS and inline SVG geometry, not generated art. The hieroglyphs are Unicode text in Noto Sans Egyptian Hieroglyphs, produced from Gardiner sign codes by Unicode name.
