"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { stats } from "@/lib/site";
import { Reveal, SectionLabel } from "@/components/ui/Reveal";
import { SampleNote } from "@/components/ui/Sample";

function Count({ to, decimals = 0, suffix }: { to: number; decimals?: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.textContent = to.toFixed(decimals);
      return;
    }
    const c = animate(0, to, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => (el.textContent = v.toFixed(decimals)) });
    return () => c.stop();
  }, [inView, to, decimals]);
  return (
    <span className="tabular-nums">
      <span ref={ref}>{to.toFixed(decimals)}</span>
      <span className="text-taupe">{suffix}</span>
    </span>
  );
}

export default function Results() {
  return (
    <section data-header="light" className="section border-t border-line-light">
      <div className="container-x">
        <div className="flex flex-col items-center text-center">
          <SectionLabel no="03">In numbers</SectionLabel>
          <h2 className="display display-lg mt-6 max-w-3xl">
            What the work does <em className="text-taupe">after</em> the shoot.
          </h2>
        </div>
        <dl className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="flex aspect-square flex-col-reverse items-center justify-center rounded-full border border-line-light p-4 text-center">
              <dt className="mt-2 max-w-[12ch] text-sm text-taupe sm:mt-4">{s.label}</dt>
              <dd className="display text-5xl leading-none sm:text-7xl">
                <Count to={s.value} decimals={s.decimals} suffix={s.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
        <div className="flex justify-center">
          <SampleNote>These figures are samples. Replace them with your real results before launch.</SampleNote>
        </div>
      </div>
    </section>
  );
}
