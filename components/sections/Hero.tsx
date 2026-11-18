"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { EASE_LUXE, MaskLines } from "@/components/ui/Reveal";
import PendantRing from "./hero/PendantRing";
import WorkViewer from "./WorkViewer";

/**
 * Hero, shown like a product on a gallery wall (Apple) in a warm editorial voice (Oura):
 * a large serif headline, one pill CTA, and the real pendant hanging inside a slowly
 * turning ring of work. Any photo in the ring opens the work viewer.
 */
export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const [viewer, setViewer] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  // Scrolling away adds a quarter turn to the ring and lifts the copy a little.
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const scrollTurn = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -48]);
  const years = new Date().getFullYear() - site.since;

  return (
    <section ref={section} id="top" data-header="light" className="relative overflow-hidden text-ink">
      <div className="container-x relative grid min-h-svh items-center gap-12 pt-32 pb-16 lg:grid-cols-12 lg:gap-8 lg:pt-24">
        <motion.div className="relative z-10 lg:col-span-5" style={{ y: copyY }}>
          <motion.p className="label text-taupe" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            {site.descriptor} · {site.city}
          </motion.p>
          <h1 className="display display-hero mt-6 max-w-[680px]">
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

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE_LUXE, delay: 0.9 }}>
            <p className="mt-8 max-w-md text-lg text-taupe">
              Photography, reels, social and performance ads for jewellery brands. Lit so metal glows and every stone keeps its true colour.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
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
            <p className="mt-12 flex items-center gap-4 text-sm text-taupe">
              <span className="h-px w-8 bg-taupe/40" aria-hidden />
              {years} years photographing bridal, diamond and family jewellers
            </p>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[360px] sm:max-w-[480px] lg:col-span-7 lg:max-w-[680px]">
          <PendantRing scrollTurn={scrollTurn} reduced={reduced} onOpen={setViewer} />
          <p className="mt-6 text-center text-xs text-taupe">Tap any photo in the ring to open it.</p>
        </div>
      </div>

      <WorkViewer index={viewer} onIndex={setViewer} onClose={() => setViewer(null)} />
    </section>
  );
}
