"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { atelier } from "@/lib/site";
import { EASE_LUXE, MaskLines } from "@/components/ui/Reveal";

const N = atelier.length;
const FADE = 0.05; // share of the scroll used to crossfade between stages

/**
 * The atelier: a quiet cream stage that stays in place while one frame turns
 * through the stages of the work. The frame makes one full turn across the
 * section: it is a square while a stage is shown and a diamond while the photo
 * changes. The photo inside always stays upright. Photography only, no 3D.
 */
function StagePhoto({ i, progress, upright }: { i: number; progress: MotionValue<number>; upright: MotionValue<number> }) {
  const a = i / N;
  const b = (i + 1) / N;
  const input = i === 0 ? [0, b - FADE, b + FADE] : i === N - 1 ? [a - FADE, a + FADE, 1] : [a - FADE, a + FADE, b - FADE, b + FADE];
  const output = i === 0 ? [1, 1, 0] : i === N - 1 ? [0, 1, 1] : [0, 1, 1, 0];
  const opacity = useTransform(progress, input, output);
  const { image } = atelier[i];
  return (
    <motion.div className="absolute -inset-[21%]" style={{ opacity, rotate: upright }}>
      <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 80vw" className="object-cover" />
    </motion.div>
  );
}

export default function Atelier() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Square at the middle of each stage, diamond at each change: -45° → 315° (one full turn).
  const turn = useTransform(progress, [0, 1], reduced ? [0, 0] : [-45, 90 * N - 45]);
  const upright = useTransform(turn, (t) => -t);
  const fill = useTransform(progress, [0, 1], [0, 1]);
  useMotionValueEvent(progress, "change", (v) => setActive(Math.min(N - 1, Math.max(0, Math.floor(v * N)))));

  // Jump to the middle of a stage (where the frame is square).
  const go = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const y = el.offsetTop + ((i + 0.5) / N) * (el.offsetHeight - window.innerHeight);
    if (lenis) lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section ref={ref} id="atelier" data-header="light" aria-label="The atelier" className="relative h-[320svh] border-t border-line-light">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="container-x grid h-full content-center gap-6 pt-20 pb-8 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-0 lg:pb-0">
          {/* Words */}
          <div className="lg:col-span-4">
            <p className="label text-taupe">The atelier</p>
            <h2 className="display display-lg mt-4 lg:mt-6">
              <MaskLines lines={["Lit by hand,", <>one piece at a <em key="t" className="text-taupe">time.</em></>]} />
            </h2>
            <div className="mt-4 hidden min-h-14 lg:mt-8 lg:block">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  className="max-w-xs text-lg text-taupe"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: EASE_LUXE }}
                >
                  {atelier[active].line}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* The turning frame */}
          <div className="relative mx-auto aspect-square w-[min(68vw,40svh)] lg:col-span-4 lg:col-start-5 lg:w-full lg:max-w-[min(62svh,520px)]">
            <motion.div className="absolute inset-[9%] overflow-hidden rounded-[26%] bg-greige/25" style={{ rotate: turn }}>
              {atelier.map((s, i) => (
                <StagePhoto key={s.label} i={i} progress={progress} upright={upright} />
              ))}
            </motion.div>
          </div>

          {/* Stages, like the tabs beside the hero ring */}
          <div className="lg:col-span-3 lg:col-start-10 lg:justify-self-end">
            <p className="label hidden text-taupe tabular-nums lg:block">
              {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
            </p>
            <ol className="flex flex-wrap justify-center gap-2 lg:mt-6 lg:flex-col lg:items-end">
              {atelier.map((s, i) => (
                <li key={s.label}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={active === i ? "step" : undefined}
                    className={`min-h-11 rounded-xl border px-4 text-sm font-medium transition-colors duration-300 ${
                      active === i ? "border-ink text-ink" : "border-line-light text-taupe hover:border-ink/40 hover:text-ink"
                    }`}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ol>
            <span className="relative mt-6 hidden h-px w-40 overflow-hidden bg-line-light lg:ml-auto lg:block" aria-hidden>
              <motion.span className="absolute inset-0 origin-left bg-ink" style={{ scaleX: fill }} />
            </span>
            <p className="mt-4 text-center text-base text-taupe lg:hidden">{atelier[active].line}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
