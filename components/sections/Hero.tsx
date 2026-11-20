"use client";

import { ArrowDownIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { heroPendant, works, workStill } from "@/lib/site";
import EditorialImage from "@/components/ui/EditorialImage";
import { MaskLines, Reveal } from "@/components/ui/Reveal";

export default function Hero() {
  return (
    <section id="hero" data-header="light" className="relative overflow-hidden pt-28 pb-10 md:pt-40 md:pb-20">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line-light pt-5">
          <p className="label text-taupe">Verdane Studio — Jewellery, in focus.</p>
          <p className="label hidden text-taupe sm:block">Independent creative studio / Mumbai</p>
        </div>
        <h1 className="display display-hero mt-6 max-w-[14ch] md:mt-12">
          <MaskLines animateOnMount lines={["Made to be", <span key="seen" className="md:pl-[14%]"><em className="text-taupe">desired.</em></span>]} />
        </h1>
        <div className="editorial-grid mt-6 items-end md:-mt-6">
          <Reveal className="col-span-4 pb-4 md:col-span-4 md:pb-12">
            <p className="max-w-sm text-lg leading-relaxed text-taupe">Exceptional jewellery deserves more than a product shot. We create the imagery, films and campaigns that make people stop. And look again.</p>
            <a href="/start-a-project" className="editorial-link mt-6">Start a project <ArrowUpRightIcon size={20} aria-hidden /></a>
          </Reveal>
          <Reveal className="group col-span-4 md:col-span-7 md:col-start-6" delay={0.12}>
            <EditorialImage src={heroPendant.src} alt={heroPendant.alt} className="aspect-[4/3] md:aspect-[16/11]" sizes="(min-width: 768px) 60vw, 100vw" priority />
            <div className="mt-4 flex items-center justify-between gap-4 text-xs text-taupe"><span>A study in light, metal & desire</span><span>01 / STUDIO NOTES</span></div>
          </Reveal>
        </div>
        <div className="editorial-grid mt-6 items-end md:mt-[-6%]">
          <div className="col-span-2 hidden md:col-span-2 md:col-start-3 md:block">
            <EditorialImage src={workStill(works[3])} alt={works[3].alt} className="aspect-[3/4]" sizes="18vw" />
            <p className="mt-3 text-xs text-taupe">Campaign study · Placeholder photo</p>
          </div>
          <div className="col-span-4 flex items-center justify-between border-b border-line-light pb-6 md:col-span-6 md:col-start-7">
            <p className="text-xs leading-relaxed text-taupe">Photography / Film / Brand presence<br />For the details that make the difference.</p>
            <a href="#work" aria-label="Explore selected work" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 transition-colors hover:bg-champagne active:bg-cream"><ArrowDownIcon size={20} aria-hidden /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
