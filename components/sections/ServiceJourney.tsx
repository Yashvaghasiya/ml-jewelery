"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { services } from "@/lib/site";
import { MaskLines, SectionLabel } from "@/components/ui/Reveal";

export default function ServiceJourney() {
  const list = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.discipline));
      }
    }, { rootMargin: "-45% 0px -45% 0px" });
    list.current?.querySelectorAll("[data-discipline]").forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" data-header="dark" className="disciplines section">
      <div className="container-x">
        <SectionLabel no="04" dark>Our disciplines</SectionLabel>
        <h2 className="display display-xl mt-8"><MaskLines lines={["One studio.", <em key="possibility">Every possibility.</em>]} /></h2>
        <div className="discipline-spread">
          <div className="discipline-projection" aria-hidden>
            {services.map((service, i) => <div key={service.no} data-current={i === active}>
              <Image src={service.shots[0].src} alt="" fill sizes="48vw" className="object-cover" />
            </div>)}
            <span>{services[active].no} / {services[active].title}</span>
          </div>
          <div ref={list}>
            {services.map((service, i) => {
              const shot = service.shots[0];
              return (
                <article key={service.no} data-discipline={i} className="discipline">
                  <div className="discipline-mobile"><Image src={shot.src} alt={shot.alt ?? service.title} fill sizes="90vw" className="object-cover" /></div>
                  <p className="label">Discipline / {service.no}</p>
                  <h3 className="display display-lg mt-4">{service.title}</h3>
                  <p className="mt-5 max-w-md">{service.line}</p>
                  <ul className="mt-6">{service.points.map(point => <li key={point}>{point}</li>)}</ul>
                  <a className="editorial-link mt-5" href={`/start-a-project?service=${encodeURIComponent(service.title)}`}>
                    Start with {service.title.toLowerCase().split(" &")[0]} <ArrowUpRightIcon size={18} aria-hidden />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
