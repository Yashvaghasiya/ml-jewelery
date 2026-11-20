"use client";

import Image from "next/image";
import { ArrowDownIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Hero() {
  const reel = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: reel, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 1.25]);
  const portraitScale = useTransform(scrollYProgress, [0.28, 1], [1.14, 1]);
  const shutter = useTransform(scrollYProgress, [0.2, 0.8], [
    "polygon(115% 0, 115% 0, 100% 100%, 100% 100%)",
    "polygon(0% 0, 115% 0, 100% 100%, -15% 100%)",
  ]);
  const first = useTransform(scrollYProgress, [0.22, 0.44], [1, 0]);
  const second = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const lift = useTransform(scrollYProgress, [0, 0.44], ["0%", "-16%"]);
  const rise = useTransform(scrollYProgress, [0.5, 0.8], ["16%", "0%"]);

  return (
    <section ref={reel} id="hero" data-header="dark" className="reel">
      <div className="reel-stage">
        <div className="reel-shot">
          <motion.div className="reel-negative" style={{ scale }}>
            <Image src="/images/portfolio/01.webp" alt="Round solitaire in a gold setting against velvet" fill priority sizes="(min-width: 760px) 74vw, 100vw" />
          </motion.div>
        </div>
        <motion.div aria-hidden className="reel-shot reel-portrait" style={{ clipPath: shutter }}>
          <motion.div className="reel-negative" style={{ scale: portraitScale }}>
            <Image src="/images/portfolio/04.webp" alt="" fill sizes="(min-width: 760px) 74vw, 100vw" />
          </motion.div>
        </motion.div>
        <div className="reel-wash" />
        <div className="reel-copy">
          <p className="reel-kicker"><i /> Jewellery image studio <span>/ Mumbai</span></p>
          <div className="reel-titles">
            <motion.h1 className="display reel-title" style={{ opacity: first, y: lift }}>Made to be<br /><em>desired.</em></motion.h1>
            <motion.p className="display reel-title reel-after" style={{ opacity: second, y: rise }}>Into the<br /><em>light.</em></motion.p>
          </div>
          <a href="/start-a-project" className="reel-link">Start a project <ArrowUpRightIcon size={18} aria-hidden /></a>
        </div>
        <footer className="reel-base">
          <div className="reel-index" aria-hidden>
            <span>Study</span>
            <span className="reel-counter"><motion.b style={{ opacity: first }}>01</motion.b><motion.b style={{ opacity: second }}>02</motion.b></span>
            <span>/ 02</span>
          </div>
          <a href="#work">Selected work <ArrowDownIcon size={16} aria-hidden /></a>
        </footer>
      </div>
    </section>
  );
}
