"use client";

import Image from "next/image";
import { MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from "@phosphor-icons/react/dist/ssr";
import { motion, useScroll, useTransform, type MotionStyle } from "motion/react";
import { useRef, useState, type PointerEvent } from "react";
import type { StudyFrame } from "@/lib/kundan-study";

export default function LoupePrint({ frame }: { frame: StudyFrame }) {
  const plate = useRef<HTMLElement>(null);
  const [magnified, setMagnified] = useState(true);
  const { scrollYProgress } = useScroll({ target: plate, offset: ["start end", "end start"] });
  const scanX = useTransform(scrollYProgress, [.15, .85], ["36%", "62%"]);
  const scanY = useTransform(scrollYProgress, [.15, .85], ["47%", "58%"]);
  const sizes = "(min-width: 1640px) 850px, (min-width: 800px) 57vw, 90vw";

  function inspect(event: PointerEvent<HTMLDivElement>) {
    if (!magnified) return;
    const el = event.currentTarget;
    const box = el.getBoundingClientRect();
    el.style.setProperty("--pointer-x", `${100 * (event.clientX - box.left) / box.width}%`);
    el.style.setProperty("--pointer-y", `${100 * (event.clientY - box.top) / box.height}%`);
  }
  function release(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--pointer-x");
    event.currentTarget.style.removeProperty("--pointer-y");
  }

  return (
    <motion.figure ref={plate} className="study-loupe loupe-print"
      style={{ "--scan-x": scanX, "--scan-y": scanY } as MotionStyle}>
      <div className="loupe-plate" data-magnified={magnified} data-reference={frame.reference}
        onPointerDown={inspect} onPointerMove={inspect} onPointerLeave={release} onPointerCancel={release}>
        <div className="loupe-exposure">
          <Image src={frame.src} alt={frame.alt} fill sizes={sizes} className="object-cover" style={{ objectPosition: frame.position }} />
        </div>
        {magnified && <>
          <div className="loupe-detail" aria-hidden>
            <div className="loupe-zoom">
              <div className="loupe-exposure">
                <Image src={frame.src} alt="" fill sizes="(min-width: 800px) 120vw, 180vw" className="object-cover" style={{ objectPosition: frame.position }} />
              </div>
            </div>
          </div>
          <div className="loupe-rim" aria-hidden />
        </>}
      </div>
      <figcaption className="study-caption">
        <span>{frame.label}{frame.reference && <small>Reference · Pexels</small>}</span>
        <button type="button" aria-pressed={magnified} onClick={() => setMagnified(!magnified)}>
          {magnified ? <MagnifyingGlassMinusIcon aria-hidden /> : <MagnifyingGlassPlusIcon aria-hidden />} Loupe
        </button>
      </figcaption>
    </motion.figure>
  );
}
