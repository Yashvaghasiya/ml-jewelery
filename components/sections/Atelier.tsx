"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useLenis } from "lenis/react";
import type { StudyFrame } from "@/lib/kundan-study";

const scrollLayout = "(min-width: 900px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)";

function ProofPrint({ frame, total, index, active, scrollable, progress }: {
  frame: StudyFrame;
  total: number;
  index: number;
  active: number;
  scrollable: boolean;
  progress: MotionValue<number>;
}) {
  const tilt = index % 2 === 0 ? -2 : 2;
  // Hold each print for reading, then lift it off to expose the next print underneath.
  const turn = useTransform(progress, value => Math.min(1, Math.max(0, (value * (total - 1) - index - 0.23) / 0.63)));
  const rotate = useTransform(turn, [0, 1], [tilt, tilt + 13]);
  const x = useTransform(turn, [0, 1], ["0%", "104%"]);
  const y = useTransform(turn, [0, 1], ["0%", "-14%"]);
  const opacity = useTransform(turn, [0, 0.78, 1], [1, 1, 0]);
  return (
    <motion.figure
      className="proof-print"
      aria-hidden={index !== active}
      style={{
        zIndex: total - index,
        rotate: scrollable ? rotate : tilt,
        x: scrollable ? x : 0,
        y: scrollable ? y : 0,
        opacity: scrollable ? opacity : Number(index >= active),
      }}
    >
      <div className="proof-negative">
        <Image src={frame.src} alt={frame.alt} fill sizes="(min-width: 800px) 49vw, 88vw" className="object-cover" style={{ objectPosition: frame.position }} />
      </div>
      <figcaption>
        <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <p>{frame.label}{frame.reference && <small>Reference · Pexels</small>}</p>
      </figcaption>
    </motion.figure>
  );
}

export default function Atelier({ frames }: { frames: StudyFrame[] }) {
  const [active, setActive] = useState(0);
  const [scrollable, setScrollable] = useState(false);
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });

  useEffect(() => {
    const media = window.matchMedia(scrollLayout);
    const update = () => {
      setScrollable(media.matches);
      if (media.matches) setActive(Math.round(scrollYProgress.get() * (frames.length - 1)));
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [scrollYProgress, frames.length]);

  useMotionValueEvent(scrollYProgress, "change", value => {
    if (scrollable) setActive(Math.round(value * (frames.length - 1)));
  });

  function select(index: number) {
    setActive(index);
    if (!scrollable || !section.current || !stage.current) return;
    const range = section.current.offsetHeight - stage.current.offsetHeight;
    const top = section.current.getBoundingClientRect().top + window.scrollY;
    const target = top + range * index / (frames.length - 1);
    if (lenis) lenis.scrollTo(target, { immediate: true });
    else window.scrollTo({ top: target, behavior: "instant" });
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % frames.length; break;
      case "ArrowLeft": next = (index - 1 + frames.length) % frames.length; break;
      case "Home": next = 0; break;
      case "End": next = frames.length - 1; break;
      default: return;
    }
    event.preventDefault();
    select(next);
    tabs.current[next]?.focus({ preventScroll: true });
  }

  return (
    <section ref={section} id="atelier" data-header="light" className="light-table" aria-labelledby="atelier-title">
      <div ref={stage} className="table-stage">
        <div className="edition-wrap table-spread">
          <div className="table-intro">
            <p className="edition-label">Inside the atelier</p>
            <h2 className="edition-title" id="atelier-title">Through<br /><em>the lens.</em></h2>
            <p className="edition-body">Turn through the Kundan edit, from the edge of a setting to the silhouette of the whole piece.</p>
            <div role="tablist" aria-label="Atelier stages" className="table-tabs">
              {frames.map((item, i) => (
                <button
                  key={item.label}
                  ref={el => { tabs.current[i] = el; }}
                  id={`stage-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-controls="stage-panel"
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={event => navigate(event, i)}
                >
                  <span className="table-thumb"><Image src={item.src} alt="" fill sizes="92px" className="object-cover" /></span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div id="stage-panel" className="proof-stack" role="tabpanel" aria-labelledby={`stage-tab-${active}`} tabIndex={0}>
            {frames.map((item, index) => <ProofPrint key={item.label} frame={item} total={frames.length} index={index} active={active} scrollable={scrollable} progress={scrollYProgress} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
