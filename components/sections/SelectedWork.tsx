"use client";

import { useState } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { works, workStill } from "@/lib/site";
import EditorialImage from "@/components/ui/EditorialImage";
import { MaskLines, SectionLabel } from "@/components/ui/Reveal";

const filters = ["All studies", "Photography", "Campaigns"];

export default function SelectedWork() {
  const [filter, setFilter] = useState(0);
  const selection = [works[0], works[3], works[4], works[2]].filter((work) => filter === 0 || (filter === 2 ? work.service.includes("Campaign") : !work.service.includes("Campaign")));
  return (
    <section id="work" className="section" data-header="light">
      <div className="container-x">
        <div className="chapter-rule editorial-grid items-end">
          <div className="col-span-4 md:col-span-8"><SectionLabel no="02">The visual edit</SectionLabel><h2 className="display display-xl mt-8"><MaskLines lines={["Small details.", <em key="impressions">Lasting impressions.</em>]} /></h2></div>
          <p className="col-span-4 max-w-sm text-base text-taupe md:col-start-10 md:col-span-3">A selection of visual studies. Different collections, one considered eye.</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-2" aria-label="Filter visual studies">{filters.map((label, i) => <button key={label} type="button" className="chip active:scale-[0.98]" aria-pressed={filter === i} onClick={() => setFilter(i)}>{label}</button>)}</div>
        <p className="mt-4 text-xs text-taupe">Portfolio concepts · Placeholder photography, not commissioned client work.</p>
        <div className="work-plates" aria-live="polite">
          {selection.map((work) => (
            <article className="work-plate" key={work.slug}>
              <div className="work-mount group">
                <EditorialImage src={workStill(work)} alt={work.alt} className="work-still" sizes="(min-width: 800px) 58vw, 90vw" />
              </div>
              <div className="work-caption">
                <p className="label">{work.service}</p>
                <h3 className="display">{work.title}</h3>
                <p className="text-xs">Placeholder photo · {work.credit}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
          <a href="/work" className="editorial-link">See all selected work <ArrowUpRightIcon size={20} aria-hidden /></a>
          <a href="/start-a-project" className="editorial-link">Start a project <ArrowUpRightIcon size={20} aria-hidden /></a>
        </div>
      </div>
    </section>
  );
}
