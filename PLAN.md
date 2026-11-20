# Verdane — "Exhibit" redesign (Cabinet of Curiosities)

## Goal and users
A second, independent design version of the Verdane site at a separate route
(`/exhibit`). Same content (`lib/site.ts`, `lib/images.ts`), same brand identity,
completely new visual design inspired by the VULK showcase library. Audience:
high-intent jewellery brand owners who fall in love with craftsmanship before
enquiring. Working = the original site untouched at `/`, and `/exhibit` renders
the same content in a dark museum narrative with advanced interactions.

## Scope
In scope: `/exhibit` route + `components/exhibit/*` + `exhibit.css` tokens.
Out of scope: any change to existing pages, components or tokens.

## Reference analysis (13 VULK showcase projects studied)
Fetched and read the actual landing pages of: Inchwise, Moss Field, Keeplight,
Hum, Weftline, Longtide, Freefall, Lowmist, Cadence, Tapline, Trailhead,
Creasefold, Gridlark (live at *.vulk-immersive-projects.pages.dev).

Key approaches found:
- **Trailhead** (Sierra jacket): numbered chapter nav ("01 ↗ … 05 ↗"), hero with
  focus viewer + inspect tools, curved drag gallery, tone-switching story
  sections (data-ui-tone light/dark), loading as narrative ("Cutting the
  panels"). → strongest: chaptered scroll + exhibit naming.
- **Keeplight** (home battery): pinned `stage` product viewer, part-by-part
  placards beside the piece, outage told hour-by-hour, review distribution bars
  (4.8, 1,787 reviews, 83% five stars). → strongest: placard beside object,
  numbers as instrument panels.
- **Hum** (bees): full-bleed "chapters" each with its own scene + per-chapter
  ink/sky tone. → strongest: full-bleed chapter rhythm.
- **Freefall** (studio): "acts" — scroll acts with split headings, one studio
  page as a narrative performance. → strongest: act-based storytelling for a
  studio's services.
- **Longtide** (residences): "stops" room navigation, private-viewing closing
  CTA. → strongest: memorable single-action closing.
- **Weftline**: mono/ink palette discipline, `--ease: cubic-bezier(.22,1,.36,1)`,
  hard 1px rules. → strongest: edges/rules aesthetic.
- **Lowmist**: slow, half-light luxury, curtain loader.
- Others confirm constraints: no card grids, no repeated split sections.

## Inspiration mapping (reference → Verdane adaptation)
- **Hero ← Trailhead**: full-viewport dark exhibit hall; pendant photo as the
  lit object; numbered chapter index (01–07) on the right; persistent gilded
  "Commission a Piece" action. Distinctive: museum chapter nav instead of hero
  buttons.
- **Point of View ← Weftline rules discipline**: full-width statement typography
  between hairline rules, eyebrow "VERDANE STUDIO — STATEMENT", no imagery.
- **Portfolio ← Trailhead curved gallery**: horizontal drag/scroll exhibit
  gallery of the 8 works, each a numbered exhibit with a brass plate (title,
  client, service, year, result). Keyboard arrows supported.
- **Inside the Atelier ← Keeplight stage**: sticky viewer; atelier stages
  (Macro/On model/Campaign/Feed) swap the image as you scroll placards.
- **Services ← Freefall acts + Moss Field index**: interactive index rows
  (not cards); hover/focus previews that discipline's photos on the right.
- **Results ← Keeplight instrument numbers**: engraved number plates, animated
  counters, hairline rules, tabular numerals.
- **Process ← Hum chapters**: four full-bleed numbered chapters, alternating
  alignment, progress line down the left.
- **Testimonials ← Longtide/Freefall editorial**: one large serif pull quote at
  a time with footnote attribution and a quote selector.
- **Final CTA ← Longtide closing**: near-black closing hall, giant serif line,
  single gilded action to WhatsApp, address as a colophon.

## Architecture
- Route: `app/exhibit/page.tsx` (server component; client leaves marked).
- Components: `components/exhibit/{ExhibitHero,Statement,ExhibitGallery,AtelierViewer,ServiceIndex,ResultsPlates,ProcessChapters,QuoteEditorial,ClosingCTA}.tsx` + small shared `Placard`/`useInView`.
- Styles: `app/exhibit.css` — own token scope (`.vx-*`), dark bg #0E1412, ivory
  #F2EDE2, gold #B8975A, Instrument Serif + Manrope (same fonts), radius 2.
- Content: imported from `lib/site.ts` / `lib/images.ts` only. Sample tags kept.
- Interactions: scroll-driven with IntersectionObserver + CSS transitions;
  motion/cubic-bezier(.22,1,.36,1); `prefers-reduced-motion` honoured.
- No new dependencies.

## Risks and assumptions
- Existing site must remain byte-identical; all new files are additive.
- Sample content stays visibly marked (owner's standing rule).

## Phases
## Phase 1: The Exhibit route
Goal: complete `/exhibit` one-page experience with all nine sections.
- [ ] Tokens (`app/exhibit.css`) and route shell with own metadata
- [ ] Hero with chapter index + persistent gilded CTA
- [ ] Statement, exhibit gallery (drag/scroll), atelier sticky viewer
- [ ] Service index with hover preview, results counter plates
- [ ] Process chapters, editorial quotes, closing CTA
- [ ] Link from original footer nav is NOT added (original untouched); open `/exhibit` directly
- Acceptance: `npm run build` passes; `/exhibit` renders all sections with the
  same content at 390 and 1280 px, no overflow, no console errors.
