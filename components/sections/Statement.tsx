"use client";

import { cubicBezier, motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/Reveal";

const TEXT =
  "Jewellery is the hardest thing to photograph. Metal mirrors everything, stones hide their colour, and a phone camera flattens all of it. So we built a studio that does only this, so what your customer sees on a screen is what they fall for in the store.";
const ACCENT = new Set(["hardest", "only", "fall"]);

// Each word lights up from ~30% to full as it crosses the trigger line, on the base curve.
const EASE = cubicBezier(0.22, 1, 0.36, 1);

function Word({ word, i, total, progress }: { word: string; i: number; total: number; progress: MotionValue<number> }) {
  const start = i / total;
  const opacity = useTransform(progress, [start, start + 2 / total], [0.3, 1], { ease: EASE });
  const bare = word.replace(/[^a-z]/gi, "").toLowerCase();
  return (
    <motion.span style={{ opacity }} className={ACCENT.has(bare) ? "text-taupe italic" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = TEXT.split(" ");
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return (
    <section data-header="light" className="section">
      <div className="container-x flex flex-col items-center text-center">
        <SectionLabel no="01">The studio</SectionLabel>
        <p ref={ref} className="display display-lg mt-10 max-w-5xl leading-[1.08]">
          {reduced
            ? words.map((w, i) => {
                const bare = w.replace(/[^a-z]/gi, "").toLowerCase();
                return (
                  <span key={i} className={ACCENT.has(bare) ? "text-taupe italic" : undefined}>
                    {w}{" "}
                  </span>
                );
              })
            : words.map((w, i) => <Word key={i} word={w} i={i} total={words.length} progress={scrollYProgress} />)}
        </p>
      </div>
    </section>
  );
}
