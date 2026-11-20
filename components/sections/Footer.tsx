"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/lib/site";
import { EASE_LUXE, Reveal } from "@/components/ui/Reveal";

export default function Footer() {
  const year = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);
  // The giant wordmark drifts sideways as the footer scrolls through the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const columns = (
    <div className="grid gap-10 text-sm sm:grid-cols-2 md:grid-cols-12">
      <p className="max-w-xs text-ink md:col-span-4">{site.tagline}</p>
      <nav aria-label="Footer" className="md:col-span-2 md:col-start-7">
        <p className="label text-ink">Studio</p>
        <ul className="mt-4 space-y-2">
          {[
            ["/services", "Services"],
            ["/work", "Work"],
            ["/start-a-project", "Start a project"],
          ].map(([href, l]) => (
            <li key={href}>
              <Link href={href} className="hover:text-ink">
                {l}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Only social profiles that are filled in are shown, so there are no dead links */}
      {Object.values(site.social).some(Boolean) && (
        <div className="md:col-span-2">
          <p className="label text-ink">Follow</p>
          <ul className="mt-4 space-y-2">
            {Object.entries(site.social)
              .filter(([, href]) => href)
              .map(([k, href]) => (
                <li key={k}>
                  <a href={href} className="capitalize hover:text-ink" target="_blank" rel="noopener">
                    {k}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}
      <div className="md:col-span-2">
        <p className="label text-ink">Say hello</p>
        <ul className="mt-4 space-y-2">
          <li>
            <a href={`mailto:${site.email}`} className="break-all hover:text-ink">
              {site.email}
            </a>
          </li>
          <li>{site.phone}</li>
        </ul>
      </div>
    </div>
  );
  return (
    <footer ref={ref} data-header="light" className="relative overflow-hidden border-t border-line-light pt-20 pb-8 text-taupe">
      <div className="container-x">
        <Reveal>{columns}</Reveal>
      </div>

      <motion.p
        aria-hidden
        style={{ x }}
        className="display pointer-events-none mt-12 text-center text-[13vw] leading-[0.85] text-ink select-none"
      >
        {site.brand}
      </motion.p>

      <div className="container-x mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line-light pt-6 text-xs">
        <p suppressHydrationWarning>
          © {year} {site.brand} Studio. All rights reserved.
        </p>
        <nav aria-label="Legal" className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-ink">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-ink">
            Terms
          </Link>
          <Link href="/brand" className="hover:text-ink">
            Brand colours
          </Link>
          <a href="#hero" className="hover:text-ink">
            Back to top
          </a>
        </nav>
      </div>
    </footer>
  );
}
