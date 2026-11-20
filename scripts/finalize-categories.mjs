/**
 * Promotes the curated candidate picks into the site:
 *   /tmp/cand/picks.json  =  { "<slug>": [<candidate n>, ...] }   (up to 9 each)
 * Copies the picked webp files into public/images/categories/<slug>/,
 * removes stale files and rewrites lib/categories-data.json.
 *
 * Run: node scripts/finalize-categories.mjs
 */
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { copyFile } from "node:fs/promises";

const CAND = "/tmp/cand";
const OUT_DIR = "public/images/categories";
const PER = 9;

const metaAll = JSON.parse(await readFile("lib/categories-data.json", "utf8"));
const picks = JSON.parse(await readFile(`${CAND}/picks.json`, "utf8"));

const data = [];
for (const cat of metaAll) {
  const meta = JSON.parse(await readFile(`${CAND}/${cat.slug}/meta.json`, "utf8"));
  const byN = Object.fromEntries(meta.map((m) => [String(Number(m.n)), m]));
  const list = picks[cat.slug] ?? [];
  if (!list.length) throw new Error(`no picks for ${cat.slug}`);
  const dir = `${OUT_DIR}/${cat.slug}`;
  await rm(dir, { recursive: true, force: true });
  await mkdir(dir, { recursive: true });
  const images = [];
  for (let i = 0; i < Math.min(list.length, PER); i++) {
    const m = byN[String(list[i])];
    if (!m) throw new Error(`${cat.slug}: pick ${list[i]} not in meta`);
    const nn = String(i + 1).padStart(2, "0");
    const webp = `${dir}/${cat.slug}-${nn}.webp`;
    await copyFile(m.src, webp);
    images.push({ src: `/${webp.replace(/^public\//, "")}`, alt: m.alt, credit: m.credit });
  }
  data.push({ slug: cat.slug, name: cat.name, blurb: cat.blurb, images });
  console.log(`${cat.slug}: ${images.length} curated`);
}
await writeFile("lib/categories-data.json", JSON.stringify(data, null, 2) + "\n");
console.log(`Done. ${data.reduce((a, c) => a + c.images.length, 0)} curated images.`);
