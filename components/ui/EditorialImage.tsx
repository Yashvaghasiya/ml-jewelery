"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { EASE_LUXE } from "@/components/ui/Reveal";
import { useRef } from "react";

export default function EditorialImage({ src, alt, className = "aspect-[4/5]", sizes = "(min-width: 768px) 50vw, 100vw", priority = false }: { src: string; alt: string; className?: string; sizes?: string; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  return (
    <div ref={ref} className={`photo-frame ${className}`}>
      <motion.div className="absolute -inset-y-[6%] inset-x-0" style={{ y: reduced ? 0 : y }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-400 group-hover:scale-[1.025]" />
      </motion.div>
      <motion.div
        aria-hidden
        className="absolute inset-0 z-10 bg-cream origin-top"
        initial={reduced ? false : { scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: EASE_LUXE }}
      />
    </div>
  );
}
