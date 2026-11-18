"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { testimonials } from "@/lib/site";
import { EASE_LUXE, SectionLabel } from "@/components/ui/Reveal";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { SampleTag } from "@/components/ui/Sample";

const arrow =
  "grid h-12 w-12 place-items-center rounded-full border border-line-light transition-[border-color,background-color,transform] duration-300 hover:border-ink hover:bg-ink/5 active:scale-[0.98]";

/** One quote at a time, centred like a statement on a gallery wall. */
export default function Testimonials() {
  const [i, setI] = useState(0);
  const n = testimonials.length;
  const t = testimonials[i];
  const go = (d: number) => setI((k) => (k + d + n) % n);

  return (
    <section data-header="light" className="section border-t border-line-light" aria-roledescription="carousel" aria-label="Client quotes">
      <div className="container-x flex flex-col items-center text-center">
        <SectionLabel no="05">Clients</SectionLabel>
        <figure className="mt-10 grid min-h-[22rem] w-full max-w-5xl place-items-center sm:min-h-[20rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: EASE_LUXE }}
              aria-live="polite"
            >
              <blockquote className="display display-lg leading-[1.08]">“{t.quote}”</blockquote>
              <figcaption className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm">
                <strong className="font-semibold">{t.name}</strong>
                <span className="text-taupe">{t.detail}</span>
                <SampleTag />
              </figcaption>
            </motion.div>
          </AnimatePresence>
        </figure>

        <div className="mt-12 flex items-center gap-4">
          <button type="button" onClick={() => go(-1)} aria-label="Previous quote" className={arrow}>
            <ArrowLeftIcon className="h-4 w-4" aria-hidden />
          </button>
          <div className="flex gap-2" role="group" aria-label="Choose a quote">
            {testimonials.map((_, k) => (
              <button
                key={k}
                type="button"
                onClick={() => setI(k)}
                aria-label={`Quote ${k + 1} of ${n}`}
                aria-pressed={k === i}
                className="grid h-11 w-11 place-items-center"
              >
                <span className={`block h-2 rounded-full w-6 transition-[transform,background-color] duration-500 ${k === i ? "scale-x-100 bg-ink" : "scale-x-[0.34] bg-ink/25"}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Next quote" className={arrow}>
            <ArrowRightIcon className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
