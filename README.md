# Verdane Studio: jewellery marketing website

A Next.js site for a jewellery marketing studio, in a Pantone-matched ivory, champagne and black palette.

**Hero:** a real pendant photo hangs on a beaded chain in a light "atelier", inside a slowly turning ring of eight work photos. Each photo's frame faces the centre, so frames are square at the top, bottom and sides and diamond-shaped on the diagonals, while the photo inside stays upright.
- Scrolling adds a quarter turn.
- Hovering or focusing a photo pauses the ring.
- Clicking a photo, or "See our work", opens a full-screen viewer of the work.

**Below the hero:**
- a scroll-driven services journey;
- results, process, testimonials and FAQ sections;
- a contact form that sends the brief to WhatsApp.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lenis · Phosphor icons.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
npm run lint       # type check
```

To deploy, push to GitHub and import the repo in [Vercel](https://vercel.com/new). No environment variables are needed.

## Make it yours

Everything client-specific lives in **`lib/site.ts`**:

| What | Where in `lib/site.ts` |
|---|---|
| Brand name, phone, WhatsApp number, email, address, socials | `site` |
| Titles, clients and results of the 8 portfolio items | `works` (order = order around the pendant) |
| **All photos** (hero, portfolio, services) | **`lib/images.ts`** + files in `public/images/`; see *Changing photos* |
| Services journey (scroll section): name, pitch, key points, result and the work shown beside each service | `services` (`shots` = the images; `layout` = gallery, reels, phone feed, ads or browser) |
| Numbers section | `stats` (**samples: replace with real results**) |
| FAQ questions and answers | `faq` (anything in `{{double braces}}` is a fact only you can supply; it shows highlighted until replaced) |
| "Sample" tags on stats, quotes and results | `site.sampleContent` (set to `false` once every figure and quote is real) |
| Live domain for share previews | `site.url` |
| Process steps | `process` |
| Client quotes | `testimonials` (**samples: replace with real quotes**) |

### Changing photos (no coding needed)
Every image on the site is a file in **`public/images/`**, and **`lib/images.ts`** lists them all in one place.

| File | Where it shows |
|---|---|
| `public/images/hero/pendant.webp` | The round photo in the middle of the hero. Use a **square** photo with the piece in the centre. |
| `public/images/portfolio/01.webp` … `08.webp` | The 8 photos turning around the pendant (01 at the top, then clockwise), and the full-screen work viewer |
| `public/images/services/photography-1…3.webp` | Jewellery photography stop |
| `public/images/services/reels-1…3.webp` | Reels stop (phone screens) |
| `public/images/services/social-1…9.webp` | Social media stop (the phone feed) |
| `public/images/services/ads-1…2.webp` | Performance ads stop |
| `public/images/services/website-1…2.webp` | Websites stop (1 = browser, 2 = phone) |

**To replace a photo:** upload your photo with the **same file name**, for example on GitHub: open the folder, then *Add file → Upload files*. That's it.
- If your photo is `.jpg` or `.png`, either rename it to the slot's name, or change the extension on that line in `lib/images.ts`.
- Update the photo's `alt` text in `lib/images.ts` (a short description, read by Google and screen readers).
- About 1600–2000px on the long side is plenty. For reels, set `media: { type: "video", … }` on that work item in `lib/site.ts`.
- Titles, clients and results for the 8 portfolio items are in `lib/site.ts` → `works`. Once a photo is yours, delete that item's `credit` line.

The current photos are free-licence placeholders from [Pexels](https://www.pexels.com/license/). **Replace them before launch**, because a portfolio has to show *your* work. If a photo ever fails to load, a calm placeholder is shown instead of a broken image.

`scripts/fetch-work.mjs` can download Pexels photos as WebP into `public/images/new/` (run it with `NODE_USE_ENV_PROXY=1` behind a proxy). Copy the result over the slot you want.

### Before launch
- Replace every `{{placeholder}}` in `lib/site.ts` (FAQ) and in `app/privacy` and `app/terms`, and have the legal pages reviewed.
- Replace sample stats, quotes and results, then set `site.sampleContent = false`.
- Fill in `site.social` (empty links are hidden) and `site.url`.
- Replace the placeholder photos with your own work.

### Colours, fonts, spacing
The palette is **ivory, champagne and black, matched to Pantone**.
- **Tokens:** at the top of `app/globals.css`.
- **Pantone codes:** the same values live in `lib/brand.ts`.
- **`/brand` page:** shows each colour with its Pantone code, HEX, RGB, role and contrast. It's linked as "Brand colours" in the footer.
- **`DESIGN.md`:** explains the colour theory, type scale and motion rules.

Keep all three in sync when changing a colour. Design work follows the `landing-page-design` skill in `.claude/skills`, with the brand exceptions listed in `CLAUDE.md`.

### Regenerating the share image
`app/opengraph-image.jpg` is a screenshot of the internal page `/studio/og`, which shows the hero's pendant and ring held still. After changing the brand name, headline or ring photos, open that page at 1200×630 and save a new screenshot as `app/opengraph-image.jpg`.

## Accessibility
- **Hero ring:** every photo is a button with a label.
- **Work viewer:** a proper dialog. It moves focus to Close, Esc closes it, focus returns to the photo you opened, and arrow keys and swipe change the project.
- **Reduced motion:** visitors who prefer it get a still ring and no smooth scrolling, and the headline reveal shows at full colour.

## Enquiries
The contact form validates the name and phone number, then opens WhatsApp with a pre-filled brief, so no backend is needed. To send leads to a CRM or Google Sheet instead, replace the `window.open(...)` call in `components/sections/Contact.tsx` with a `fetch()` to your endpoint.
