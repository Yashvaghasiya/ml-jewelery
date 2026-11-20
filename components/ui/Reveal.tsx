"use client";

import { motion, useReducedMotion } from "motion/react";

export const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, y = 24, className, as = "div" }: { children: React.ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "p" | "span" }) {
  const reduced = useReducedMotion();
  const M = motion[as];
  return <M className={className} initial={reduced ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, ease: EASE_LUXE, delay: reduced ? 0 : Math.min(delay, 0.2) }}>{children}</M>;
}

export function MaskLines({ lines, className, lineClassName, delay = 0, animateOnMount = false }: { lines: React.ReactNode[]; className?: string; lineClassName?: string; delay?: number; animateOnMount?: boolean }) {
  const reduced = useReducedMotion();
  const line = { hidden: { y: "105%", opacity: 0 }, show: (i: number) => ({ y: "0%", opacity: 1, transition: { duration: reduced ? 0 : 0.4, ease: EASE_LUXE, delay: reduced ? 0 : Math.min(delay + i * 0.06, 0.2) } }) };
  return (
    <motion.span className={`block ${className ?? ""}`} initial={reduced ? false : "hidden"} {...(animateOnMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.08 } })}>
      {lines.map((l, i) => <span key={i} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]"><motion.span className={`block ${lineClassName ?? ""}`} variants={line} custom={i}>{l}</motion.span></span>)}
    </motion.span>
  );
}

export function SectionLabel({ no, children, dark = false }: { no: string; children: React.ReactNode; dark?: boolean }) {
  const reduced = useReducedMotion();
  return <div className={`label flex items-center gap-4 ${dark ? "text-champagne" : "text-taupe"}`}><span className="tabular-nums">{no}</span><motion.span aria-hidden className={`h-px w-10 origin-left ${dark ? "bg-champagne/50" : "bg-taupe/40"}`} initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, ease: EASE_LUXE }} /><span>{children}</span></div>;
}
