"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/Reveal";

const words = "Not just seen. Felt. Remembered. Desired.".split(" ");
function Word({ word, index, progress, reduced }: { word: string; index: number; progress: MotionValue<number>; reduced: boolean | null }) {
  const opacity = useTransform(progress, [index / words.length, (index + 1) / words.length], [0.22, 1]);
  const y = useTransform(progress, [index / words.length, (index + 1) / words.length], [8, 0]);
  return <motion.span style={{ opacity: reduced ? 1 : opacity, y: reduced ? 0 : y }} className={`inline-block ${index >= 3 ? "italic" : ""}`}>{word}&nbsp;</motion.span>;
}
export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 70%"] });
  const strip = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stripProgress } = useScroll({ target: strip, offset: ["start end", "end start"] });
  const x = useTransform(stripProgress, [0, 1], ["0%", "-18%"]);
  return <section ref={ref} className="section" data-header="light"><div className="container-x editorial-grid chapter-rule"><div className="col-span-4 md:col-span-3"><SectionLabel no="01">Our point of view</SectionLabel></div><div className="col-span-4 md:col-span-9"><h2 className="display display-xl max-w-[15ch]">{words.map((word, index) => <Word key={index} word={word} index={index} progress={scrollYProgress} reduced={reduced} />)}</h2><div className="mt-10 grid gap-6 md:grid-cols-2"><p className="max-w-md text-lg text-taupe">The weight of gold. The way a diamond catches the light. The feeling of finding something that is unmistakably yours.</p><p className="max-w-md text-base text-taupe">We translate those details into a visual world for your brand — with considered photography, storytelling and a consistent presence across every touchpoint.</p></div></div></div>
    <div ref={strip} className="study-strip" aria-hidden>
      <motion.div className="study-strand" style={{ x: reduced ? 0 : x }}>
        {["03", "01", "06", "04", "08"].map(id => (
          <div className="study-frame" key={id}>
            <Image src={`/images/portfolio/${id}.webp`} alt="" fill sizes="(min-width: 800px) 26vw, 45vw" className="object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  </section>;
}
