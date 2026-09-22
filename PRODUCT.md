# Product

Ra & Apep — a single-page, scroll-driven telling of the ancient Egyptian myth of the sun god's nightly voyage through the underworld and his battle with the chaos serpent Apep.

## Platform

web

## Stack

Plain static site: `index.html`, `tokens.css`, `styles.css`, `main.js`. No framework, no build step, no runtime dependencies. Fonts from Google Fonts. Opens from the file system or any static host.

## Users

Curious adults with no background in Egyptology: someone who half-remembers "Ra is the sun god" and wants the real story. They arrive on a laptop or phone, usually in the evening, and give it a few unhurried minutes.

## Product Purpose

Explain the myth accurately and make it felt. A visitor should leave able to retell it: why the sun goes under, who Apep is, what happens in the seventh hour, what the priests did about it, and why the serpent can never die.

## Positioning

Most pages on this myth are an encyclopedia entry or a listicle with clip-art. This one is a film you scroll: the page is the night, from sunset at the top to sunrise at the bottom.

## Operating Context

Read once, top to bottom, at the reader's own pace. No accounts, no forms, no data. Must remain a complete, readable article with JavaScript off or motion reduced.

## Capabilities and Constraints

- At least 1,000 words of visible narrative copy (user requirement), in each edition: English at `/`, Romanian at `/ro/`.
- Cinematic, Apple-grade scroll animation and layered parallax (user requirement).
- Illustrations are AI-generated: the Duat and battle plates and transparent cut-outs by OpenAI (`image_gen`), the other full-bleed plates by Google Antigravity (Gemini). Prompts exclude writing; authentic hieroglyphs are rendered as text.
- Native scrolling is never hijacked; pinned scenes use `position: sticky`.

## Brand Commitments

- Accuracy over spectacle: every claim is attested in Egyptian sources (Amduat, Book of Gates, Book of the Dead 17, Papyrus Bremner-Rhind) or hedged.
- The only hieroglyphs on the page are real ones, set as live Unicode text with scholarly transliteration.
- Illustrations are labelled as AI interpretations, never presented as artefacts.
- No "mysteries of the pharaohs" kitsch: no papyrus-scroll fonts, no ankh clip-art, no curse jokes.

## Evidence on Hand

Primary sources named in the copy; a fact-check pass against reference pages; image prompts recorded in `assets/img/PROVENANCE.md`.

## Product Principles

1. The scroll is the voyage — position on the page always means an hour of the night.
2. Spectacle, then stillness — every set piece is followed by a calm passage you can actually read.
3. The sun is the protagonist — one light source, followed from dusk to dawn.

## Accessibility & Inclusion

WCAG 2.2 AA contrast for all text, including text over imagery. Full keyboard operation with visible focus. Honours `prefers-reduced-motion` and offers an on-page motion switch; with motion off every scene rests in its final readable state. Decorative layers are hidden from assistive technology; meaningful images carry alt text. Content is visible without JavaScript.
