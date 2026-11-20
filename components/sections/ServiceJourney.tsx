import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { services } from "@/lib/site";
import EditorialImage from "@/components/ui/EditorialImage";
import { MaskLines, Reveal, SectionLabel } from "@/components/ui/Reveal";

export default function ServiceJourney() {
  return (
    <section id="services" data-header="light" className="section">
      <div className="container-x">
        <div className="editorial-grid chapter-rule items-end">
          <div className="col-span-4 md:col-span-8"><SectionLabel no="04">Our disciplines</SectionLabel><h2 className="display display-xl mt-8"><MaskLines lines={["One studio.", <em key="possibility">Every possibility.</em>]} /></h2></div>
          <p className="col-span-4 max-w-xs text-base text-taupe md:col-span-3 md:col-start-10">From the first product portrait to the campaign that introduces your next collection.</p>
        </div>
        <div className="mt-20 space-y-24 md:space-y-36">
          {services.map((service, i) => <div key={service.no} className="editorial-grid items-center">
            <Reveal className={`group col-span-4 ${i % 2 ? "md:order-2 md:col-span-6 md:col-start-7" : "md:col-span-6"}`}><EditorialImage src={service.shots[0].src} alt={service.shots[0].alt ?? service.shots[0].label ?? service.title} className={i % 2 ? "aspect-[5/4]" : "aspect-square"} /></Reveal>
            <Reveal className={`col-span-4 pt-6 ${i % 2 ? "md:order-1 md:col-span-5 md:col-start-1" : "md:col-span-4 md:col-start-8"}`}>
              <p className="label text-taupe">Discipline / {service.no}</p><h3 className="display display-lg mt-5">{service.title}</h3><p className="mt-6 max-w-md text-lg text-taupe">{service.line}</p>
              <ul className="mt-7 border-t border-line-light">{service.points.map((item) => <li key={item} className="border-b border-line-light py-3 text-sm text-taupe">{item}</li>)}</ul>
              <a href={`/start-a-project?service=${encodeURIComponent(service.title)}`} className="editorial-link mt-7">Start with {service.title.toLowerCase().split(" &")[0]} <ArrowUpRightIcon size={20} aria-hidden /></a>
            </Reveal>
          </div>)}
        </div>
      </div>
    </section>
  );
}
