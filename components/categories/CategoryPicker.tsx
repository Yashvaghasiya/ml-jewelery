"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { EASE_LUXE } from "@/components/ui/Reveal";
import type { Category, CategoryImage } from "@/lib/categories";

type Tile =
  | { kind: "photo"; img: CategoryImage; feature: boolean }
  | { kind: "brand" };

/**
 * Editorial grid rhythm for a 9-photo set, exactly 16 cells on the 4-column
 * desktop grid (2 columns on phone): four openers, two interleaved 2×2
 * features, closing pairs and an onyx brand tile — the professional
 * "color + placement + creativity + content" grid formula.
 */
function buildTiles(images: CategoryImage[]): Tile[] {
  const photo = (i: number, feature = false): Tile => ({ kind: "photo", img: images[i], feature });
  const tiles: Tile[] = [];
  const push = (from: number, to: number) => {
    for (let i = from; i < Math.min(to, images.length); i++) tiles.push(photo(i));
  };
  push(0, 4);
  if (images.length > 4) tiles.push(photo(4, true));
  push(5, 7);
  if (images.length > 7) tiles.push(photo(7, true));
  push(8, images.length);
  tiles.push({ kind: "brand" });
  return tiles;
}

/**
 * Category options as pills; choosing one shows only that category's photos,
 * laid out as a curated Instagram-style grid (color, placement, feature and
 * brand tiles, hover captions).
 */
export default function CategoryPicker({ categories }: { categories: Category[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const galleryRef = useRef<HTMLDivElement>(null);
  const active = categories.find((c) => c.slug === activeSlug) ?? null;

  // Deep link: /categories?c=<slug> opens that category's gallery directly.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("c");
    if (slug && categories.some((c) => c.slug === slug)) setActiveSlug(slug);
  }, []);

  const choose = (slug: string) => {
    const next = activeSlug === slug ? null : slug;
    setActiveSlug(next);
    const url = new URL(window.location.href);
    if (next) url.searchParams.set("c", next);
    else url.searchParams.delete("c");
    history.replaceState(null, "", url);
    if (next && !reduced) {
      requestAnimationFrame(() => galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };

  return (
    <div>
      <p className="label text-taupe" aria-live="polite">
        {active ? (
          <>
            Viewing <span className="text-gold-text">{active.name}</span> — switch below
          </>
        ) : (
          "Select a category ↓"
        )}
      </p>
      <nav aria-label="Categories" className="mt-4 flex flex-wrap gap-2">
        {categories.map((c) => {
          const selected = c.slug === activeSlug;
          return (
            <button
              key={c.slug}
              type="button"
              onClick={() => choose(c.slug)}
              aria-pressed={selected}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-text ${
                selected
                  ? "border-champagne bg-champagne/20 text-ink"
                  : "border-line-light text-ink hover:border-champagne hover:bg-champagne/10"
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </nav>

      <div ref={galleryRef}>
      <AnimatePresence mode="wait">
        {active ? (
          <motion.section
            key={active.slug}
            aria-labelledby={`${active.slug}-title`}
            initial={reduced ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE_LUXE }}
            className="mt-12 md:mt-16"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line-light pb-6">
              <h2 id={`${active.slug}-title`} className="display display-xl">
                {active.name}
              </h2>
              <p className="label text-taupe">
                <span className="tabular-nums">{active.images.length}</span> photos
              </p>
            </div>
            <p className="mt-6 max-w-2xl text-sm text-taupe">{active.blurb}</p>
            <ul className="grid auto-rows-[minmax(0,1fr)] grid-cols-2 gap-1 [grid-auto-flow:dense] md:gap-2 md:grid-cols-4">
              {buildTiles(active.images).map((tile, i) => (
                <motion.li
                  key={tile.kind === "photo" ? tile.img.src : `${active.slug}-brand`}
                  className={`group relative ${tile.kind === "photo" && tile.feature ? "col-span-2 row-span-2" : ""}`}
                  initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: EASE_LUXE, delay: reduced ? 0 : Math.min(i * 0.045, 0.35) }}
                >
                  {tile.kind === "photo" ? (
                    <figure className="photo-frame aspect-square h-full w-full" tabIndex={0}>
                      <Image
                        src={tile.img.src}
                        alt={tile.img.alt}
                        fill
                        sizes={tile.feature ? "(min-width: 768px) 60vw, 66vw" : "(min-width: 768px) 30vw, 33vw"}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04] group-focus-within:scale-[1.04]"
                      />
                      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-onyx/80 via-onyx/40 to-transparent p-3 pt-8 text-[11px] leading-snug text-ivory opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                        {tile.img.alt} <span className="whitespace-nowrap text-ivory/70">· {tile.img.credit.split(" · ")[1] ?? ""}</span>
                      </figcaption>
                    </figure>
                  ) : (
                    <div aria-hidden="true" className="flex aspect-square h-full w-full flex-col items-center justify-center gap-2 bg-onyx p-4 text-center">
                      <span className="label text-champagne">Verdane Studio</span>
                      <span className="display text-xl leading-tight text-ivory md:text-2xl">
                        {active.name.split(" ")[0]} <em className="text-champagne">{active.name.split(" ").slice(1).join(" ")}</em>
                      </span>
                      <span className="text-[11px] text-ivory/60 tabular-nums">{active.images.length} shots · one story</span>
                    </div>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.section>
        ) : null}
      </AnimatePresence>
      </div>
    </div>
  );
}
