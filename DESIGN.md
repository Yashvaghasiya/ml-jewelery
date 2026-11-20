# Design guidelines

The site follows the **landing-page-design** skill (`.claude/skills/landing-page-design`, MIT, from elayadesign/ai-design-skills), applied selectively. Its rules for copy, type scale, spacing, motion curve, states, navigation and ship requirements apply. The brand exceptions below (serif display font, Pantone-matched palette, lighting gradients) are deliberate owner decisions, and `CLAUDE.md` lists them.

These rules keep the site looking deliberate and premium rather than templated. Follow them when you add or change anything.

## 1. Colour: ivory, champagne and black (Pantone-matched)

**Theory:** this is a near-achromatic palette with a single warm metallic accent, the way fine jewellery is shown in a vitrine. The neutrals stay quiet so the photography carries the colour: gold, stones and skin tones never compete with a coloured background. Every neutral is tinted warm, toward champagne, so the surfaces read as one family. Champagne is the only hue, and it echoes the product itself.

**Palette.** The Pantone code is the reference. HEX values are screen approximations (Pantone publishes no official HEX), so check print work against a physical Pantone guide. The same data drives the site tokens in `app/globals.css`, `lib/brand.ts` and the `/brand` page.

| Token | Name | Pantone | HEX (screen) | Role |
|---|---|---|---|---|
| `ivory` | Ivory | 11-0602 TCX Snow White | #F2F0EB | Page background |
| `cream` | Cream | 11-0507 TCX Winter White | #F5ECD2 | Soft fills behind photos and small surfaces |
| `onyx` | Onyx | Black C | #2D2926 | Dark surfaces: work viewer, device mockups |
| `ink` | Ink | Neutral Black C | #222223 | All text on ivory, primary buttons |
| `champagne` | Champagne | 7502 C | #CEB888 | Accent: CTAs, labels, one highlighted word |
| `champagne-deep` | Deep champagne | 7503 C | #A89968 | Decorative detail; text on dark only |
| `taupe` | Taupe | Warm Gray 11 C | #6E6259 | Secondary text and labels on light |
| `greige` | Greige | Warm Gray 2 C | #CBC4BC | Secondary text on dark |
| `gold-text` | Accessible gold | HCT T40 of 7502 C | #6D5C34 | Champagne-hued small text, labels and focus rings on light; 5.7:1 on ivory |
| `gold-line` | Gold hairline | HCT T30 of 7502 C | #54451F | Warm hairlines and progress indicators on light; 8.2:1 on ivory |
| `champagne-tint` | Champagne tint | HCT T90 of 7502 C | #F8E0AD | Soft champagne tint for text and detail on dark; 11.2:1 on onyx |

**Proportion (60 · 30 · 10):** 60% ivory and cream, 30% ink and onyx, 10% champagne. The whole landing page sits on ivory with a faint paper grain, like the hero. Ink carries the type and primary buttons, and thin hairlines (`line-light`) separate the sections instead of colour blocks. Onyx is kept for dark surfaces such as the work viewer.

**Contrast (WCAG 2.1, every pair used for text):**

| Text on background | Ratio | Passes |
|---|---|---|
| ink on ivory | 14.0 : 1 | AAA |
| taupe on ivory | 5.2 : 1 | AA |
| ivory on onyx | 12.7 : 1 | AAA |
| champagne on onyx | 7.4 : 1 | AAA |
| greige on onyx | 8.3 : 1 | AAA |
| deep champagne on onyx | 5.1 : 1 | AA |
| onyx on champagne (buttons) | 7.4 : 1 | AAA |
| accessible gold on ivory | 5.7 : 1 | AA |
| gold hairline on ivory | 8.2 : 1 | AAA |
| champagne tint on onyx | 11.2 : 1 | AAA |

**Rules:**
- Never put `champagne` or `champagne-deep` text on a light background (2.5 : 1). Use `taupe`, `ink`, or the derived `gold-text` when the champagne hue must survive.
- Champagne is for things that matter: CTAs, labels and one highlighted word. If it's everywhere, it stops meaning anything.
- No background gradients and no background grids. The page is flat ivory with a faint paper grain. The only gradient is the metal of the pendant frame.
- Form errors use a deep red (`#9E2F3B`, 6.3 : 1 on ivory). This is a functional colour, not part of the brand palette.
- Focus rings are ink (2px), clearly visible on ivory.

## 2. Typography
- **Display:** Instrument Serif, used for headlines, numbers and quotes. Tight leading (0.92) and slight negative tracking, set large (`clamp()` up to about 9.5rem). Italic is reserved for one emphasised word per headline.
- **Text/UI:** Manrope. Body text is 15–17px with 1.6 line-height, and line length stays under about 65 characters.
- **Labels:** 11px uppercase with 0.24em tracking, opening each section with a number (`01 — The studio`).
- **Scale:** headlines use `clamp()` so they grow smoothly from 375px to 1440px with no breakpoint jumps.

## 3. Layout and spacing
- A 12-column grid with asymmetric splits (5/7, 7/4, 4/7). Statement moments (the tagline, the numbers, the client quote) are centred, like a single piece on a gallery wall; everything else is left aligned.
- Section padding is the `.section` class: `clamp(96px, 12vw, 176px)`. Empty ivory is structure, so sections get long, calm gaps. Gutters are `clamp(16px, 4vw, 56px)`.
- Sections are separated by a full-width hairline (`line-light`), never by a colour band.
- **Radius scale:** photos `rounded-3xl` (24px); large cards (process steps, the enquiry form) `rounded-4xl` (32px); buttons, chips and number badges fully round. Hero ring tiles keep their own 24% radius.
- **Buttons:** one pill grammar. `.btn .btn-primary` (ink fill) is the single action per view; secondary actions are an underlined text link or `.btn-secondary` (outline). Section navigation uses `.chip` pill tabs.
- **Shadow:** exactly one, `.product-shadow`, under the hero pendant. Cards, buttons and photos are flat.
- Touch targets are at least 44 × 44px, and there's no horizontal scroll at 390px.

## 4. Motion
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease-luxe` and `EASE_LUXE`). Shared reveals rise 24px over 400ms; stagger is capped at 200ms.
- Scroll imagery translates within oversized crop bounds; masked headlines and the statement create the reading rhythm. No timed decorative loop is mounted on the landing page.
- Shared reveals, image parallax and atelier transitions explicitly respect reduced motion; Lenis is disabled by the shared provider.

## 5. Composition system
- All-ivory editorial direction, with the existing Pantone palette and Instrument Serif / Manrope pairing. No dark theme, 3D or background grid.
- `--page-gutter`, `--grid-gap`, `--section-space`, `--type-hero`, `--type-xl`, `--type-lg`, `--type-md`, `--radius-photo`, and `--radius-control` live in `app/globals.css`.
- Four mobile columns become twelve at 768px; max canvas width is 1680px. Hairlines organize chapters without visible background gridlines.
- `EditorialImage` takes src, alt, className (aspect ratio), sizes and optional priority. Two-pixel photo frames replace rounded portfolio cards.
- `Reveal` and `MaskLines` remain the common scroll-entry primitives. Atelier tabs support arrows, Home and End.

## 6. Sections
- **Hero:** oversized two-line masthead, asymmetric pendant photograph, supporting campaign crop, project link and work anchor. The earlier rotating ring remains unmounted.
- **Point of view:** offset serif statement with scroll-linked opacity and two supporting copy columns.
- **Visual edit:** filterable asymmetric photography grid; concept work and stock photography remain labelled.
- **Atelier:** portrait image and keyboard-accessible stages, rather than a long pinned scroll trap.
- **Services:** alternating image/copy chapters using each service's existing shot and points.
- **In numbers:** open typographic columns above rules; sample status remains visible.
- **Process:** vertical numbered timeline beside sticky introductory copy.
- **Clients:** quote carousel with controls and sample-content disclosure.
- **FAQ:** two-column questions and disclosures. **Contact:** oversized masthead above contact details and an open ruled form; validation and WhatsApp fallback retained.
- **Footer:** oversized high-contrast wordmark.
- **Legal pages:** oversized title, sticky contents navigation and numbered reading column. Legal templates remain marked.
- **Brand page:** oversized editorial introduction and type specimen, followed by the existing palette and contrast reference.

## 7. References
Layout, spacing, photo presentation, buttons and motion draw on two analyses from [awesome-design-md](https://github.com/VoltAgent/awesome-design-md), saved in `docs/design-references/`:
- **Apple:** photography first, lots of air, one pill action, one shadow for the product, press state `scale(0.98)`.
- **Oura:** warm paper canvas, large serif display with a quiet sans, rounded cards, pill tabs, round stat badges.

Not taken from them: their fonts, their blue action colour, Apple's dark tiles and Oura's dark footer. Verdane keeps Instrument Serif + Manrope, the Pantone palette and the all-ivory page.

## 8. Things to avoid (they make a site look generic or AI-made)
Glassmorphism cards, purple/blue gradient blobs, emoji icons, centred text everywhere, stock "rocket" illustrations, more than one accent colour per section, and drop shadows on everything.
