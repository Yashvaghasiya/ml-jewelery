# Verdane Studio: jewellery marketing website

A Next.js site for a jewellery marketing studio, in a Pantone-matched ivory, champagne and black palette.

The landing page opens with a scroll-driven jewellery cover, followed by the Kundan study, work index, atelier, services and the project brief. The featured study has its own page at `/work/kundan-in-window-light`.

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

Studio information and portfolio records live in **`lib/site.ts`**.

| What | Where in `lib/site.ts` |
|---|---|
| Brand name, phone, WhatsApp number, email, address, socials | `site` |
| Titles, clients and results of the 8 portfolio items | `works` |
| Hero, portfolio and service photos | **`lib/images.ts`** + files in `public/images/`; see *Changing photos* |
| Services journey (scroll section): name, pitch, key points, result and the work shown beside each service | `services` (`shots` = the images; `layout` = gallery, reels, phone feed, ads or browser) |
| Numbers section | `stats` (**samples: replace with real results**) |
| FAQ questions and answers | `faq` |
| Publish client figures and quotes on the landing page | `site.sampleContent` (set to `false` once every figure and quote is real) |
| Live domain for share previews | `site.url` |
| Process steps | `process` |
| Client quotes | `testimonials` (**samples: replace with real quotes**) |

### Changing photos (no coding needed)
For **Kundan, in window light**, upload your files as they are ready. See the [photo names and cropping guide](public/images/studies/kundan/README.md). One upload updates that photograph across the homepage and portfolio after deployment.

For the other sections, use the files in `public/images/` and the descriptions in `lib/images.ts`.

| File | Where it shows |
|---|---|
| `public/images/hero/pendant.webp` | The pendant in the alternate exhibit. Use a square photo. |
| `public/images/portfolio/01.webp` … `08.webp` | Portfolio studies and viewer. The landing cover pairs 01 (solitaire) with 04 (portrait). |
| `public/images/services/photography-1…3.webp` | Jewellery photography stop |
| `public/images/services/reels-1…3.webp` | Reels stop (phone screens) |
| `public/images/services/social-1…9.webp` | Social media stop (the phone feed) |
| `public/images/services/ads-1…2.webp` | Performance ads stop |
| `public/images/services/website-1…2.webp` | Websites stop (1 = browser, 2 = phone) |

**To replace a photo:** upload your photo with the **same file name**, for example on GitHub: open the folder, then *Add file → Upload files*. That's it.
- Use the actual image format. If the extension changes, update the corresponding path.
- Update the photo's `alt` text in `lib/images.ts` (a short description, read by Google and screen readers).
- About 1600–2000px on the long side is plenty. For reels, set `media: { type: "video", … }` on that work item in `lib/site.ts`.
- Titles, clients and results for the 8 portfolio items are in `lib/site.ts` → `works`. Once a photo is yours, delete that item's `credit` line.

The current photos are free-licence placeholders from [Pexels](https://www.pexels.com/license/). **Replace them before launch**, because a portfolio has to show *your* work. If a photo ever fails to load, a calm placeholder is shown instead of a broken image.

`scripts/fetch-work.mjs` can download Pexels photos as WebP into `public/images/new/` (run it with `NODE_USE_ENV_PROXY=1` behind a proxy). Copy the result over the slot you want.

### Before launch
- Fill in the outstanding details in `app/privacy` and `app/terms` and have the legal pages reviewed.
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
- **Atelier:** the image selector supports touch and arrow keys.
- **Work viewer:** a proper dialog. It moves focus to Close, Esc closes it, focus returns to the photo you opened, and arrow keys and swipe change the project.
- **Reduced motion:** visitors can read the landing page and select its atelier frames without a pinned scroll sequence.

## Enquiries
The form downloads a text brief while studio contact details are empty. Set `site.whatsapp` (international digits) or `site.email` in `lib/site.ts` to open a draft using that channel. WhatsApp takes priority if both are filled in.
