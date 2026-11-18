import { PlayIcon, TrendUpIcon } from "@phosphor-icons/react/dist/ssr";
import { services, type ServiceLayout, type Shot } from "@/lib/site";
import { Reveal, SectionLabel } from "@/components/ui/Reveal";
import { SampleTag } from "@/components/ui/Sample";
import WorkImage from "@/components/ui/WorkImage";

/**
 * Services as editorial chapters. Each one pairs a short, readable pitch with the
 * kind of work it delivers, shown as photography on a gallery wall (Apple) in soft
 * rounded frames on warm paper (Oura). Every chapter is linkable from the pill tabs.
 */

function Photo({ shot, ratio, sizes, className = "" }: { shot: Shot; ratio: string; sizes: string; className?: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl bg-cream ${ratio} ${className}`}>
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]">
        <WorkImage src={shot.src} alt={shot.alt ?? shot.label ?? ""} sizes={sizes} />
      </div>
    </div>
  );
}

const Caption = ({ children }: { children: React.ReactNode }) => (
  <figcaption className="mt-3 flex items-center gap-2 text-xs text-taupe">{children}</figcaption>
);

function Gallery({ layout, shots }: { layout: ServiceLayout; shots: Shot[] }) {
  switch (layout) {
    case "gallery":
      return (
        <div className="grid grid-cols-2 gap-4">
          {shots.map((s, i) => (
            <figure key={s.src} className={i === 0 ? "col-span-2" : ""}>
              <Photo shot={s} ratio={i === 0 ? "aspect-[16/10]" : "aspect-[4/5]"} sizes={i === 0 ? "(min-width: 1024px) 55vw, 92vw" : "(min-width: 1024px) 27vw, 46vw"} />
              {s.label && <Caption>{s.label}</Caption>}
            </figure>
          ))}
        </div>
      );
    case "reels":
      return (
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {shots.map((s) => (
            <figure key={s.src}>
              <div className="relative">
                <Photo shot={s} ratio="aspect-[9/16]" sizes="(min-width: 1024px) 18vw, 30vw" />
                <span className="pointer-events-none absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory/70 text-ink backdrop-blur-md" aria-hidden>
                  <PlayIcon weight="fill" className="ml-0.5 h-4 w-4" />
                </span>
              </div>
              {s.label && (
                <Caption>
                  {s.label}
                  <SampleTag />
                </Caption>
              )}
            </figure>
          ))}
        </div>
      );
    case "phone":
      // A brand feed: nine posts edge to edge, like a profile grid.
      return (
        <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-3xl">
          {shots.map((s) => (
            <div key={s.src} className="relative aspect-square bg-cream">
              <WorkImage src={s.src} alt={s.alt ?? s.label ?? ""} sizes="(min-width: 1024px) 18vw, 30vw" />
            </div>
          ))}
        </div>
      );
    case "ads":
    case "browser":
      return (
        <div className="grid grid-cols-2 gap-4">
          {shots.map((s) => (
            <figure key={s.src}>
              <Photo shot={s} ratio="aspect-[4/5]" sizes="(min-width: 1024px) 27vw, 46vw" />
              {s.label && <Caption>{s.label}</Caption>}
            </figure>
          ))}
        </div>
      );
  }
}

export default function ServiceJourney() {
  const total = String(services.length).padStart(2, "0");
  return (
    <section id="services" data-header="light" className="section border-t border-line-light text-ink">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel no="02">Services &amp; work</SectionLabel>
            <h2 className="display display-xl mt-6">
              Everything a jewellery brand needs to be <em className="text-taupe">seen.</em>
            </h2>
          </div>
          <p className="max-w-sm text-lg text-taupe lg:col-span-4 lg:col-start-9">
            Five services, one studio. Each comes with the kind of work it delivers.
          </p>
        </div>

        <nav aria-label="Services" className="mt-12 flex flex-wrap gap-2">
          {services.map((svc) => (
            <a key={svc.no} href={`#service-${svc.no}`} className="chip">
              <span className="text-xs text-taupe tabular-nums">{svc.no}</span>
              {svc.title}
            </a>
          ))}
        </nav>

        <div className="mt-16">
          {services.map((svc) => (
            <article
              key={svc.no}
              id={`service-${svc.no}`}
              className="grid scroll-mt-28 gap-10 border-t border-line-light py-16 lg:grid-cols-12 lg:gap-8 lg:py-24"
            >
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <p className="label text-taupe tabular-nums">
                    {svc.no} / {total}
                  </p>
                  <h3 className="display display-md mt-4">{svc.title}</h3>
                  <p className="mt-6 max-w-sm text-base text-taupe">{svc.line}</p>
                  <ul className="mt-8 space-y-3 text-sm">
                    {svc.points.map((p) => (
                      <li key={p} className="flex items-center gap-3">
                        <span className="h-px w-4 bg-champagne-deep" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 inline-flex flex-wrap items-center gap-2 rounded-full border border-line-light py-2 pr-2 pl-4 text-sm font-semibold">
                    <TrendUpIcon weight="bold" className="h-4 w-4 text-taupe" aria-hidden />
                    {svc.result}
                    <SampleTag />
                  </p>
                </div>
              </div>

              <Reveal className="lg:col-span-7 lg:col-start-6">
                <Gallery layout={svc.layout} shots={svc.shots} />
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
