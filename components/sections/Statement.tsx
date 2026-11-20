"use client";

import Image from "next/image";
import { MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from "@phosphor-icons/react/dist/ssr";
import { motion, useScroll, useTransform, type MotionStyle } from "motion/react";
import { useRef, useState, type PointerEvent } from "react";
import { images } from "@/lib/images";

const still = images.services.social[1];
const sizes = "(min-width: 800px) 43vw, 90vw";

export default function Statement() {
  const section = useRef<HTMLElement>(null);
  const [magnified, setMagnified] = useState(true);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const scanX = useTransform(scrollYProgress, [0.15, 0.85], ["31%", "66%"]);
  const scanY = useTransform(scrollYProgress, [0.15, 0.85], ["46%", "59%"]);

  function inspect(event: PointerEvent<HTMLDivElement>) {
    if (!magnified) return;
    const plate = event.currentTarget;
    const box = plate.getBoundingClientRect();
    plate.style.setProperty("--pointer-x", `${100 * (event.clientX - box.left) / box.width}%`);
    plate.style.setProperty("--pointer-y", `${100 * (event.clientY - box.top) / box.height}%`);
  }

  function resumeScan(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--pointer-x");
    event.currentTarget.style.removeProperty("--pointer-y");
  }

  return (
    <section ref={section} data-header="light" aria-labelledby="point-of-view" className="perspective">
      <div className="edition-wrap perspective-spread">
        <div className="perspective-copy">
          <p className="edition-label">Our point of view</p>
          <h2 id="point-of-view" className="edition-title">The weight <br /><em>of gold.</em></h2>
          <p className="edition-body">A curve of polished metal. A stone catching the light. Those are the details we look for when we photograph a collection.</p>
          <a href="#work" className="edition-link">Explore selected work <span aria-hidden>↓</span></a>
        </div>
        <motion.figure
          className="loupe-print"
          style={{ "--scan-x": scanX, "--scan-y": scanY } as MotionStyle}
        >
          <div
            className="loupe-plate"
            data-magnified={magnified}
            onPointerDown={inspect}
            onPointerMove={inspect}
            onPointerLeave={resumeScan}
            onPointerCancel={resumeScan}
          >
            <Image src={still.src} alt={still.alt} fill sizes={sizes} className="object-cover" />
            {magnified && (
              <>
                <div aria-hidden className="loupe-detail">
                  <Image src={still.src} alt="" fill sizes={sizes} className="object-cover" />
                </div>
                <div className="loupe-rim" aria-hidden />
              </>
            )}
          </div>
          <figcaption>
            <span>Gold hoops on paper</span>
            <button type="button" aria-pressed={magnified} onClick={() => setMagnified(!magnified)}>
              {magnified ? <MagnifyingGlassMinusIcon aria-hidden /> : <MagnifyingGlassPlusIcon aria-hidden />}
              Loupe
            </button>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
