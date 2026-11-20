"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { services } from "@/lib/site";

function ServicePrint({ service }: { service: (typeof services)[number] }) {
  // A portrait strip for film, a square grid for social, paired exposures for the other disciplines.
  const count = service.layout === "phone" ? 4 : service.layout === "reels" ? 3 : 2;
  const shots = service.layout === "gallery" ? service.shots.slice(1) : service.shots.slice(0, count);
  return (
    <div className={`service-print service-print--${service.layout}`} aria-hidden>
      {shots.map(shot => (
        <div key={shot.src}><Image src={shot.src} alt="" fill sizes="(min-width: 800px) 35vw, 65vw" className="object-cover" /></div>
      ))}
    </div>
  );
}

export default function ServiceJourney() {
  const steps = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.discipline));
      }
    }, { rootMargin: "-48% 0px -48% 0px" });
    steps.current?.querySelectorAll("[data-discipline]").forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" data-header="dark" className="service-edition" aria-labelledby="services-title">
      <div className="edition-wrap">
        <header className="services-heading">
          <div>
            <p className="edition-label">Our disciplines</p>
            <h2 id="services-title" className="edition-title">From stills <em>to screen.</em></h2>
          </div>
          <p className="edition-body">From the first product portrait to the campaign that introduces your next collection.</p>
        </header>
        <div className="service-spread">
          <div className="service-easel">
            <ServicePrint key={active} service={services[active]} />
            <nav aria-label="Jump to a discipline" className="service-index">
              {services.map((service, i) => (
                <a key={service.no} href={`#discipline-${service.no}`} aria-label={service.title} aria-current={active === i ? "location" : undefined}>
                  {service.no}
                </a>
              ))}
            </nav>
          </div>
          <div ref={steps}>
            {services.map((service, i) => (
              <article key={service.no} id={`discipline-${service.no}`} data-discipline={i} className="service-entry">
                <div className="service-mobile-art"><ServicePrint service={service} /></div>
                <p className="service-folio"><span>{service.no}</span> / {String(services.length).padStart(2, "0")}</p>
                <h3>{service.title}</h3>
                <p className="edition-body">{service.line}</p>
                <ul>{service.points.map(point => <li key={point}>{point}</li>)}</ul>
                <a className="edition-link" href={`/start-a-project?service=${encodeURIComponent(service.title)}`}>Enquire about this service <ArrowUpRightIcon aria-hidden /></a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
