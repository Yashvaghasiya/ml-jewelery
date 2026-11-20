/**
 * Fetches CANDIDATE jewellery photos per category (top 24) from Wikimedia
 * Commons using several refined, quality-biased queries, saves them to
 * /tmp/cand/<slug>/ plus meta.json and a review contact sheet.
 *
 * Run: node scripts/fetch-candidates.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
const run = promisify(execFile);

const OUT = "/tmp/cand";
const UA = "VerdaneCuration/1.0 (contact: studio@verdane.example)";

const CATEGORIES = [
  { slug: "rings", queries: ["Mauro Cateb ring", "engagement ring diamond macro", "gold ring jewel white background", "wedding ring macro"] },
  { slug: "necklaces", queries: ["Mauro Cateb necklace", "gold necklace jewel macro", "diamond necklace", "pearl necklace jewel"] },
  { slug: "earrings", queries: ["Mauro Cateb earrings", "gold earrings macro", "diamond earrings", "jhumka earrings"] },
  { slug: "bangles", queries: ["gold bangles", "silver bracelet macro", "gold bracelet jewel", "bangle wrist"] },
  { slug: "bridal", queries: ["indian bridal jewellery", "bridal necklace set", "indian bride jewellery", "maang tikka"] },
  { slug: "chains", queries: ["gold chain macro", "silver chain necklace", "chain link gold", "rope chain"] },
  { slug: "pendants", queries: ["Mauro Cateb pendant", "pendant necklace gold", "locket jewel", "gemstone pendant"] },
  { slug: "pearls", queries: ["pearl necklace macro", "pearls strand", "pearl earrings", "pearl jewel"] },
  { slug: "kundan", queries: ["kundan jewellery", "polki jewellery", "kundan necklace", "rajasthan jewellery gold"] },
  { slug: "mangalsutra", queries: ["mangalsutra", "mangalyam", "thali necklace", "wedding necklace india"] },
  { slug: "anklets", queries: ["anklet silver", "payal", "anklets feet jewellery", "toe ring silver"] },
  { slug: "nosepins", queries: ["nose stud", "nath nose ring", "nose pin gold", "nostril jewel"] },
];

const BAD = /drawing|sketch|painting|statue|sculpture|museum label|display case|shop|store|sign|map|logo|chart|book|page|stamp|coin|pottery|text|advertis|portrait of|paint/i;

function stripTags(html) {
  return String(html ?? "").replace(/<[^>]*>/g, "").trim();
}

async function search(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2" +
    "&generator=search&gsrnamespace=6&gsrlimit=30" +
    `&gsrsearch=${encodeURIComponent(query + " filetype:bitmap")}` +
    "&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=1200&iiextmetadatafilter=Artist|LicenseShortName|ObjectName|ImageDescription";
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Commons ${res.status} for "${query}"`);
  const json = await res.json();
  return (json?.query?.pages ?? [])
    .map((p) => ({ title: p.title ?? "", info: p.imageinfo?.[0] }))
    .filter((p) => p.info && /image\/(jpeg|png)/.test(p.info.mime ?? "") && p.info.width >= 900 && p.info.width / p.info.height < 2.2 && p.info.height / p.info.width < 2.2 && p.info.thumburl)
    .map((p) => ({ ...p, query }));
}

let i = 0;
for (const cat of CATEGORIES) {
  i += 1;
  const dir = `${OUT}/${cat.slug}`;
  await mkdir(dir, { recursive: true });
  const seen = new Set();
  const results = [];
  for (const q of cat.queries) {
    try {
      for (const r of await search(q)) {
        if (seen.has(r.title)) continue;
        seen.add(r.title);
        results.push(r);
      }
    } catch (e) {
      console.log(`  ${cat.slug} query "${q}": ${e.message}`);
    }
  }
  // Score: penalise museum/document shots; prefer titles matching jewel words.
  const GOOD = /ring|necklace|earring|bangle|bracelet|chain|pendant|locket|pearl|kundan|polki|mangalsutra|anklet|payal|nose|jewel|jewell|gold|silver|diamond|gem|carat|karat/i;
  results.sort((a, b) => {
    const score = (r) => (GOOD.test(r.title) ? 0 : 2) + (BAD.test(r.title) ? 4 : 0);
    return score(a) - score(b);
  });
  const picked = [];
  for (const r of results) {
    if (picked.length >= 24) break;
    if (BAD.test(r.title)) continue;
    const n = String(picked.length + 1).padStart(2, "0");
    const tmp = `${dir}/.tmp-${n}`;
    const webp = `${dir}/cand-${n}.webp`;
    try {
      const imgRes = await fetch(r.info.thumburl, { headers: { "User-Agent": UA } });
      if (!imgRes.ok) continue;
      const buf = Buffer.from(await imgRes.arrayBuffer());
      if (buf.length < 30_000) continue;
      await writeFile(tmp, buf);
      await run("magick", [tmp, "-resize", "1200x1200>", "-quality", "80", webp]);
      const artist = stripTags(r.info.extmetadata?.Artist?.value) || "Wikimedia Commons contributor";
      const license = stripTags(r.info.extmetadata?.LicenseShortName?.value) || "CC";
      const name = stripTags(r.info.extmetadata?.ObjectName?.value) || r.title.replace(/^File:/, "").replace(/\.(jpe?g|png)$/i, "");
      picked.push({ n, src: webp, alt: name.slice(0, 120), credit: `${artist.slice(0, 60)} · ${license} · ${r.info.descriptionurl ?? "https://commons.wikimedia.org"}`, from: r.query, title: r.title });
    } catch (e) {
      console.log(`  skip ${cat.slug} ${n}: ${e.message}`);
    }
  }
  await writeFile(`${dir}/meta.json`, JSON.stringify(picked, null, 1));
  await run("magick", ["montage", `${dir}/cand-*.webp`, "-tile", "6x4", "-geometry", "220x220+4+4", `${dir}/sheet.jpg`]);
  console.log(`[${i}/${CATEGORIES.length}] ${cat.slug}: ${picked.length} candidates`);
}
console.log("Done.");
