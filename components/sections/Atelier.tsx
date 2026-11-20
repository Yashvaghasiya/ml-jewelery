"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { atelier } from "@/lib/site";
import { EASE_LUXE, MaskLines, Reveal, SectionLabel } from "@/components/ui/Reveal";

export default function Atelier() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  return (
    <section id="atelier" data-header="light" className="section border-y border-line-light bg-cream/40">
      <div className="container-x editorial-grid items-center">
        <div className="col-span-4 md:col-span-5">
          <SectionLabel no="03">Inside the atelier</SectionLabel>
          <h2 className="display display-xl mt-8"><MaskLines lines={["The art of", <em key="closer">looking closer.</em>]} /></h2>
          <p className="mt-8 max-w-sm text-lg text-taupe">A change of light. A different angle. A story waiting in the smallest detail.</p>
          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Atelier stages">{atelier.map((stage, i) => <button key={stage.label} id={`stage-tab-${i}`} role="tab" aria-selected={active === i} aria-controls="stage-panel" tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={(e) => { const next = e.key === "ArrowRight" ? (i + 1) % atelier.length : e.key === "ArrowLeft" ? (i - 1 + atelier.length) % atelier.length : e.key === "Home" ? 0 : e.key === "End" ? atelier.length - 1 : -1; if (next >= 0) { e.preventDefault(); setActive(next); document.getElementById(`stage-tab-${next}`)?.focus(); } }} className="chip active:scale-[0.98]">{stage.label}</button>)}</div>
          <p className="mt-5 text-xs text-taupe">Select a stage to explore the process.</p>
        </div>
        <Reveal className="col-span-4 mt-8 md:col-span-6 md:col-start-7 md:mt-0">
          <div id="stage-panel" role="tabpanel" aria-labelledby={`stage-tab-${active}`} tabIndex={0}>
            <div className="photo-frame aspect-[4/5]">
              <AnimatePresence initial={false}><motion.div key={active} className="absolute inset-0" initial={{ opacity: 0, scale: reduced ? 1 : 1.035 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.4, ease: EASE_LUXE }}><Image src={atelier[active].image.src} alt={atelier[active].image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></motion.div></AnimatePresence>
            </div>
            <div className="mt-5 flex gap-6 border-b border-line-light pb-6"><span className="text-sm text-taupe tabular-nums">0{active + 1} / 0{atelier.length}</span><p className="flex-1 text-base" aria-live="polite">{atelier[active].line}</p></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
