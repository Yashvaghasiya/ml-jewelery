"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { site, stats } from "@/lib/site";

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
    const c = animate(0, to, { duration: 0.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => (el.textContent = v.toFixed(decimals)) });
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
    <section className="studio-ledger" aria-labelledby="results-title">
      <p className="edition-label">Studio figures</p>
      <h2 id="results-title" className="edition-title">In <em>numbers.</em></h2>
      {site.sampleContent && <p className="ledger-note">Illustrative figures · sample results</p>}
      <dl>
        {stats.map(stat => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd><Count to={stat.value} decimals={stat.decimals} suffix={stat.suffix} /></dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
