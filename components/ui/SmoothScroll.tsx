"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, motion, useScroll } from "motion/react";
import { useEffect, useState } from "react";

/** A champagne hairline across the top edge that fills as the page is read. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-champagne" style={{ scaleX: scrollYProgress }} />;
}

/** Lenis smooth scrolling + global motion settings. Both step aside for reduced-motion users. */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  const content = (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      {children}
    </MotionConfig>
  );
  if (!enabled) return content;
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true, anchors: true }}>
      {content}
    </ReactLenis>
  );
}
