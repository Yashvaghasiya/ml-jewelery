"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { services } from "@/lib/site";
import { SectionLabel } from "@/components/ui/Reveal";
import { SampleTag } from "@/components/ui/Sample";
import { TrendUpIcon } from "@phosphor-icons/react/dist/ssr";

/** An editorial portfolio: every service stays readable and directly linkable.
 * No pinned scroll track, off-screen text, or perspective-dependent content.
 */
export default function ServiceJourney() {
  const reduced = useReducedMotion();
  return (
    <section id="services" data-header="light" className="atelier-services text-ink">
      <div className="container-x">
        <SectionLabel no="02">Services &amp; work</SectionLabel>
        <h2 className="display mt-6 max-w-4xl text-[clamp(2.6rem,6vw,6rem)]">
          Everything a jewellery brand needs to be seen.
        </h2>
        <p className="mt-6 max-w-lg text-base text-taupe">
          Scroll through what we do. Each service comes with the kind of work it delivers.
        </p>
        <nav aria-label="Services" className="atelier-index">
          {services.map((svc) => (
            <a key={svc.no} href={`#service-${svc.no}`} aria-label={svc.title} title={svc.title}>{svc.no}</a>
          ))}
        </nav>
        <div>
          {services.map((svc) => (
            <article key={svc.no} id={`service-${svc.no}`} className="atelier-service">
              <div className="atelier-service-copy">
                <p className="label text-taupe">{svc.no} / {String(services.length).padStart(2, "0")} <span className="ml-4">Service</span></p>
                <h3 className="display mt-4">{svc.title}</h3>
                <p className="mt-6 text-base text-taupe">{svc.line}</p>
                <ul className="atelier-points">{svc.points.map((p) => <li key={p}>{p}</li>)}</ul>
                <p className="mt-6 flex flex-wrap items-center gap-2 text-sm font-semibold">
                  <TrendUpIcon weight="bold" className="h-4 w-4 text-taupe" aria-hidden />
                  {svc.result}<SampleTag />
                </p>
              </div>
              <motion.div className={`atelier-gallery ${svc.shots.length > 5 ? "atelier-gallery-contact" : ""}`}
                initial={false}
                whileInView={reduced ? { opacity: 1 } : { y: [16, 0], opacity: [0.7, 1] }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                {svc.shots.map((shot, i) => (
                  <figure key={`${shot.src}-${i}`}>
                    <Image src={shot.src} alt={shot.alt ?? shot.label ?? svc.title} width={900} height={1100}
                      sizes="(min-width: 1024px) 40vw, 90vw" loading="lazy" />
                    {shot.label && <figcaption>{shot.label}</figcaption>}
                  </figure>
                ))}
              </motion.div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
