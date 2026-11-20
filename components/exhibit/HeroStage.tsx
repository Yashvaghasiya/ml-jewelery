"use client";

/* "Midnight Runway" hero — full-viewport dark stage, one jewel centre-frame
   under a spotlight, staggered three-line headline, gold scroll cue.
   Entrances are pure CSS animations; the exit is scroll-driven: every layer
   (spotlight, jewel, headline, lede, actions, cue) transforms with scroll
   progress via motion/react, and a thin gold line at the hero's bottom edge
   fills as the first chapter approaches. */
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { site, waLink, heroPendant } from "@/lib/site";

type Chapter = { no: string; label: string; href: string };

/* Each headline line rises away at its own rate as the hero scrolls out. */
function HeadlineLine({ children, i, progress }: { children: React.ReactNode; i: number; progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [0, -90 - i * 45]);
  const opacity = useTransform(progress, [0, 0.7], [1, 0]);
  return (
    <motion.span className="mr-line" style={{ ["--mr-i" as string]: i, y, opacity }}>
      {children}
    </motion.span>
  );
}

export default function HeroStage({ chapters }: { chapters: Chapter[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const staticStyle = { opacity: 1, y: 0, scale: 1 };
  const spot = { opacity: useTransform(scrollYProgress, [0, 0.8], reduce ? [1, 1] : [1, 0.15]), scale: useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.3]) };
  const jewel = reduce ? staticStyle : { scale: useTransform(scrollYProgress, [0, 1], [1, 0.72]), y: useTransform(scrollYProgress, [0, 1], [0, -70]), opacity: useTransform(scrollYProgress, [0, 0.85], [1, 0]) };
  const lede = reduce ? staticStyle : { opacity: useTransform(scrollYProgress, [0, 0.4], [1, 0]), y: useTransform(scrollYProgress, [0, 0.5], [0, 40]) };
  const actions = reduce ? staticStyle : { opacity: useTransform(scrollYProgress, [0, 0.4], [1, 0]), y: useTransform(scrollYProgress, [0, 0.5], [0, 55]) };
  const cue = reduce ? staticStyle : { opacity: useTransform(scrollYProgress, [0, 0.25], [1, 0]) };
  const eyebrow = reduce ? staticStyle : { opacity: useTransform(scrollYProgress, [0, 0.35], [1, 0]) };

  const lines = ["One piece.", "One stage.", <>All eyes on <em>it.</em></>];

  return (
    <header className="mr-hero" id="top" ref={ref}>
      <motion.div className="mr-spot" aria-hidden="true" style={spot} />
      <motion.p className="mr-eyebrow" style={eyebrow}>Verdane — Commission No. 001</motion.p>

      <div className="mr-stage">
        <motion.div className="mr-jewel" style={jewel}>
          <img src={heroPendant.src} alt={heroPendant.alt} width={640} height={640} loading="eager" fetchPriority="high" />
        </motion.div>
        <h1 className="mr-headline">
          {lines.map((line, i) => (
            <HeadlineLine key={i} i={i} progress={scrollYProgress}>
              {line}
            </HeadlineLine>
          ))}
        </h1>
      </div>

      <motion.p className="mr-lede" style={lede}>
        Photography, reels, social and performance ads for jewellery brands — every
        piece of work staged as an exhibit, every result engraved on a plate.
      </motion.p>

      <motion.div className="mr-actions" style={actions}>
        <a className="mr-cta" href={waLink("Hello Verdane — I saw the exhibit. I'd like to commission a piece of work.")} target="_blank" rel="noopener noreferrer">
          Commission a Piece
        </a>
        <nav className="mr-chapters" aria-label="Exhibit chapters">
          {chapters.map((c) => (
            <a key={c.no} href={c.href}>
              <span className="no">{c.no}</span> {c.label}
            </a>
          ))}
        </nav>
      </motion.div>

      <motion.div className="mr-cue" aria-hidden="true" style={cue}>
        <span>Scroll</span>
        <i />
      </motion.div>

      {/* Thin gold progress line filling left to right as the hero scrolls away */}
      <motion.div className="mr-progress" aria-hidden="true" style={{ scaleX: reduce ? 0 : scrollYProgress }} />

      <span className="sr-only">{site.brand} — {site.tagline}</span>
    </header>
  );
}
