/** One-off: better pearl candidates (avoid "Girl with a Pearl Earring" pollution). */
const UA = "VerdaneCuration/1.0 (contact: studio@verdane.example)";
const queries = ["South Sea pearl strand necklace", "pearl bracelet gold jewel", "natural pearl brooch", "Basra pearls jewel", "Akoya pearl strand", "pearl earrings gold macro"];

function stripTags(html) { return String(html ?? "").replace(/<[^>]*>/g, "").trim(); }
async function search(q) {
  const url = "https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2&generator=search&gsrnamespace=6&gsrlimit=30" +
    `&gsrsearch=${encodeURIComponent(q + " filetype:bitmap")}&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=1200&iiextmetadatafilter=Artist|LicenseShortName|ObjectName`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const json = await res.json();
  return (json?.query?.pages ?? []).map((p) => ({ title: p.title ?? "", info: p.imageinfo?.[0] }))
    .filter((p) => p.info && /image\/(jpeg|png)/.test(p.info.mime ?? "") && p.info.width >= 900 && p.info.thumburl);
}
const { mkdir, writeFile } = await import("node:fs/promises");
const { execFile } = await import("node:child_process");
const run = (a, b) => new Promise((r, j) => execFile(a, b, (e) => (e ? j(e) : r())));
await mkdir("/tmp/cand/pearls", { recursive: true });
const seen = new Set();
const results = [];
for (const q of queries) { try { for (const r of await search(q)) { if (!seen.has(r.title)) { seen.add(r.title); results.push(r); } } } catch {} }
const picked = [];
for (const r of results) {
  if (picked.length >= 20) break;
  if (/paint|portrait|vermeer|girl with/i.test(r.title)) continue;
  const n = String(picked.length + 1).padStart(2, "0");
  const tmp = `/tmp/cand/pearls/.t${n}`;
  const webp = `/tmp/cand/pearls/cand-${n}.webp`;
  try {
    const img = await fetch(r.info.thumburl, { headers: { "User-Agent": UA } });
    if (!img.ok) continue;
    const buf = Buffer.from(await img.arrayBuffer());
    if (buf.length < 30_000) continue;
    await writeFile(tmp, buf);
    await run("magick", [tmp, "-resize", "1200x1200>", "-quality", "80", webp]);
    const artist = stripTags(r.info.extmetadata?.Artist?.value) || "Wikimedia Commons contributor";
    const license = stripTags(r.info.extmetadata?.LicenseShortName?.value) || "CC";
    const name = stripTags(r.info.extmetadata?.ObjectName?.value) || r.title.replace(/^File:/, "").replace(/\.(jpe?g|png)$/i, "");
    picked.push({ n, src: webp, alt: name.slice(0, 120), credit: `${artist.slice(0, 60)} · ${license} · ${r.info.descriptionurl ?? "https://commons.wikimedia.org"}` });
  } catch {}
}
await writeFile("/tmp/cand/pearls/meta.json", JSON.stringify(picked, null, 1));
await run("magick", ["montage", "/tmp/cand/pearls/cand-*.webp", "-tile", "6x4", "-geometry", "220x220+4+4", "/tmp/cand/pearls/sheet.jpg"]);
console.log(`pearls: ${picked.length}`);
