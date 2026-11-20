/**
 * Fetches free-licence jewellery photos per category from Wikimedia Commons
 * (api.php, keyless, no rate-limit challenge at this volume), converts them to
 * webp with ImageMagick and writes lib/categories-data.json.
 *
 * Run: node scripts/fetch-categories.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
const run = promisify(execFile);

const COUNT = 15;
const OUT_DIR = "public/images/categories";

const CATEGORIES = [
  { slug: "rings", name: "Rings", blurb: "Solitaires, bands and statement rings, shot macro-first.", query: "gold ring jewellery" },
  { slug: "necklaces", name: "Necklaces", blurb: "Chokers, collars and rani haars with true metal tones.", query: "gold necklace jewellery" },
  { slug: "earrings", name: "Earrings", blurb: "Studs, jhumkas and hoops that hold their shape on every placement.", query: "earrings jewellery" },
  { slug: "bangles", name: "Bangles & Bracelets", blurb: "Kadas, bangles and cuffs, on wrist and on set.", query: "gold bangles bracelet" },
  { slug: "bridal", name: "Bridal Sets", blurb: "Full bridal stories — necklace, tikka, nath and all.", query: "indian bridal jewellery" },
  { slug: "chains", name: "Chains", blurb: "Chains and links catalogued at scale, every clasp in focus.", query: "gold chain necklace" },
  { slug: "pendants", name: "Pendants", blurb: "Pendants and lockets lifted by controlled highlights.", query: "pendant jewelry" },
  { slug: "pearls", name: "Pearls", blurb: "Pearl strands graded clean, no false colour.", query: "pearl necklace" },
  { slug: "kundan", name: "Kundan & Polki", blurb: "Heritage kundan and polki pieces, lit like the vitrine.", query: "kundan jewellery" },
  { slug: "mangalsutra", name: "Mangalsutra", blurb: "Mangalsutras styled for catalogue and for campaign.", query: "mangalsutra" },
  { slug: "anklets", name: "Anklets & Toe Rings", blurb: "Payal and jhumkas for the feet, on model and on white.", query: "anklet payal" },
  { slug: "nosepins", name: "Nose Pins & Studs", blurb: "Naths and nose pins that read clearly at thumbnail size.", query: "nose pin nath jewellery" },
];

function stripTags(html) {
  return String(html ?? "").replace(/<[^>]*>/g, "").trim();
}

async function search(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2" +
    "&generator=search&gsrnamespace=6&gsrlimit=60" +
    `&gsrsearch=${encodeURIComponent(query)}` +
    "&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=1200&iiextmetadatafilter=Artist|LicenseShortName|ObjectName|ImageDescription";
  const res = await fetch(url, { headers: { "User-Agent": "VerdaneSiteBuilder/1.0 (contact: studio@verdane.example)" } });
  if (!res.ok) throw new Error(`Commons ${res.status} for "${query}"`);
  const json = await res.json();
  const pages = json?.query?.pages ?? [];
  return pages
    .map((p) => ({ title: p.title ?? "", info: p.imageinfo?.[0] }))
    .filter((p) => p.info && /image\/(jpeg|png)/.test(p.info.mime ?? "") && p.info.width >= 800 && p.info.thumburl);
}

let i = 0;
for (const cat of CATEGORIES) {
  i += 1;
  const dir = `${OUT_DIR}/${cat.slug}`;
  await mkdir(dir, { recursive: true });
  const results = await search(cat.query);
  const picked = [];
  for (const r of results) {
    if (picked.length >= COUNT) break;
    const n = String(picked.length + 1).padStart(2, "0");
    const webp = `${dir}/${cat.slug}-${n}.webp`;
    const tmp = `${dir}/.tmp-${n}`;
    try {
      const imgRes = await fetch(r.info.thumburl, { headers: { "User-Agent": "VerdaneSiteBuilder/1.0 (contact: studio@verdane.example)" } });
      if (!imgRes.ok) continue;
      const buf = Buffer.from(await imgRes.arrayBuffer());
      if (buf.length < 25_000) continue;
      await writeFile(tmp, buf);
      await run("magick", [tmp, "-resize", "1200x1200>", "-quality", "80", webp]);
      const src = `/${webp.replace(/^public\//, "")}`;
      const artist = stripTags(r.info.extmetadata?.Artist?.value) || "Wikimedia Commons contributor";
      const license = stripTags(r.info.extmetadata?.LicenseShortName?.value) || "CC";
      const name = stripTags(r.info.extmetadata?.ObjectName?.value) || r.title.replace(/^File:/, "").replace(/\.(jpe?g|png)$/i, "");
      picked.push({
        src,
        alt: name.slice(0, 120),
        credit: `${artist.slice(0, 60)} · ${license} · ${r.info.descriptionurl ?? "https://commons.wikimedia.org"}`,
      });
    } catch (e) {
      console.log(`  skip ${cat.slug} ${n}: ${e.message}`);
    }
  }
  console.log(`[${i}/${CATEGORIES.length}] ${cat.slug}: ${picked.length} images`);
  cat.images = picked;
}

const data = CATEGORIES.map(({ slug, name, blurb, images }) => ({ slug, name, blurb, images }));
await writeFile("lib/categories-data.json", JSON.stringify(data, null, 2) + "\n");
const short = data.filter((c) => c.images.length < 12);
console.log(`Done. ${data.length} categories, ${data.reduce((a, c) => a + c.images.length, 0)} images. Below 12: ${short.map((f) => `${f.slug}=${f.images.length}`).join(", ") || "none"}`);
