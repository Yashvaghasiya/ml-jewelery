"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { EASE_LUXE, MaskLines } from "@/components/ui/Reveal";
import PendantRing, { workItems, type RingItem } from "./hero/PendantRing";
import WorkViewer from "./WorkViewer";

/** The two sets the side tabs switch between. Only the work set opens the viewer. */
const SETS: { id: "work" | "social"; label: string; items: RingItem[] }[] = [
  { id: "work", label: "Work", items: workItems },
  { id: "social", label: "Social", items: images.services.social.slice(0, 8) },
];

/**
 * A quiet cream atelier: a modest headline on the left, the real pendant hanging
 * from the top of the screen inside a slowly turning ring of photos, small tabs
 * on the right that switch the ring between sets, and the pitch at the foot.
 */
export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const [viewer, setViewer] = useState<number | null>(null);
  const [set, setSet] = useState<(typeof SETS)[number]["id"]>("work");
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  // Scrolling away adds a quarter turn to the ring and lifts the words a little.
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const scrollTurn = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -48]);
  const current = SETS.find((s) => s.id === set)!;
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE_LUXE, delay },
  });

  return (
    <section ref={section} id="top" data-header="light" className="relative overflow-hidden text-ink">
      <div className="container-x relative flex min-h-svh flex-col pt-28 pb-10 lg:grid lg:grid-cols-12 lg:grid-rows-[1fr_auto] lg:gap-x-8 lg:pt-24 lg:pb-12">
        {/* Headline, vertically centred on the left */}
        <motion.div className="relative z-10 max-lg:order-1 lg:col-span-4 lg:row-start-1 lg:self-center" style={{ y: copyY }}>
          <motion.p className="label text-taupe" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            {site.descriptor} · {site.city}
          </motion.p>
          <h1 className="display display-hero mt-6">
            <MaskLines
              animateOnMount
              delay={0.3}
              lines={[
                "We shoot",
                "jewellery",
                <>
                  that <em className="text-taupe">sells.</em>
                </>,
              ]}
            />
          </h1>
        </motion.div>

        {/* The pendant and its ring */}
        <div className="relative mx-auto mt-12 w-full max-w-[340px] max-lg:order-3 sm:max-w-[460px] lg:col-span-5 lg:col-start-5 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:max-w-[min(76svh,620px)] lg:self-center">
          <PendantRing
            scrollTurn={scrollTurn}
            reduced={reduced}
            items={current.items}
            onOpen={set === "work" ? setViewer : undefined}
          />
        </div>

        {/* Side tabs: switch what turns around the pendant */}
        <motion.div
          className="mt-8 flex justify-center gap-2 max-lg:order-4 lg:col-span-2 lg:col-start-11 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-end lg:self-center"
          role="group"
          aria-label="Photos in the ring"
          {...fadeUp(1.1)}
        >
          {SETS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSet(s.id)}
              aria-pressed={set === s.id}
              className={`min-h-11 rounded-xl border px-4 text-sm font-medium transition-colors duration-300 ${
                set === s.id ? "border-ink text-ink" : "border-line-light text-taupe hover:border-ink/40 hover:text-ink"
              }`}
            >
              {s.label}
            </button>
          ))}
        </motion.div>

        {/* The pitch and the one action, at the foot */}
        <motion.div className="relative z-10 mt-8 max-lg:order-2 lg:col-span-4 lg:row-start-2 lg:mt-0 lg:self-end" {...fadeUp(0.9)}>
          <p className="max-w-sm text-base text-taupe">
            Photography, reels, social and performance ads for jewellery brands. Lit so metal glows and every stone keeps its true colour.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="#contact" className="btn btn-primary">
              Start a project
              <ArrowRightIcon weight="bold" className="h-4 w-4" aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => setViewer(0)}
              className="group inline-flex min-h-12 items-center gap-2 text-base font-semibold underline decoration-ink/25 underline-offset-8 transition-colors hover:decoration-ink"
            >
              See the work
              <ArrowUpRightIcon weight="bold" className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </button>
          </div>
        </motion.div>

        <motion.p className="mt-6 text-center text-xs text-taupe max-lg:order-5 lg:col-span-3 lg:col-start-10 lg:row-start-2 lg:mt-0 lg:self-end lg:text-right" {...fadeUp(1.3)}>
          {set === "work" ? "Tap a photo to open the project." : "A feed we keep looking like a magazine."}
        </motion.p>
      </div>

      <WorkViewer index={viewer} onIndex={setViewer} onClose={() => setViewer(null)} />
    </section>
  );
}
