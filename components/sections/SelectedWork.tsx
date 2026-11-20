"use client";

import { useState } from "react";
import { ArrowUpRightIcon, ArrowsOutSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { works, workStill } from "@/lib/site";
import WorkViewer from "./WorkViewer";

const prints = [works[2], works[3], works[4], works[0]];
const filters = ["All studies", "Photography", "Campaigns"];

export default function SelectedWork() {
  const [filter, setFilter] = useState(filters[0]);
  const [opened, setOpened] = useState<number | null>(null);
  const selection = prints.filter(work => {
    if (filter === "All studies") return true;
    return work.service.includes("Campaign") === (filter === "Campaigns");
  });

  return (
    <section id="work" data-header="light" className="print-archive" aria-labelledby="work-title">
      <div className="edition-wrap">
        <header className="archive-masthead">
          <div>
            <p className="edition-label">Portfolio</p>
            <h2 id="work-title" className="edition-title">Selected <em>work.</em></h2>
          </div>
          <a href="/work" className="edition-link">Full portfolio <ArrowUpRightIcon aria-hidden /></a>
        </header>
        <div className="archive-toolbar">
          <div className="archive-filters" role="group" aria-label="Filter visual studies">
            {filters.map(label => (
              <button type="button" key={label} aria-pressed={filter === label} onClick={() => setFilter(label)}>{label}</button>
            ))}
          </div>
          <p role="status">{selection.length} {selection.length === 1 ? "concept study" : "concept studies"}</p>
        </div>
        <div className="print-wall">
          {selection.map((work, i) => (
            <figure key={work.slug} className="archive-print">
              <button
                className="print-window"
                type="button"
                aria-label={`View ${work.title}`}
                aria-haspopup="dialog"
                onClick={() => setOpened(i)}
              >
                <Image src={workStill(work)} alt={work.alt} fill sizes="(min-width: 800px) 50vw, 92vw" className="object-cover" />
                <span className="print-expand"><ArrowsOutSimpleIcon size={18} aria-hidden /></span>
              </button>
              <figcaption>
                <div className="print-meta"><span>{work.service}</span><span>{work.year}</span></div>
                <h3>{work.title}</h3>
                {work.credit && <p>Stock photograph · {work.credit}</p>}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="archive-end">
          <p>Portfolio concepts shown with reference photography.</p>
          <a href="/start-a-project" className="edition-link">Start a project <ArrowUpRightIcon aria-hidden /></a>
        </div>
      </div>
      <WorkViewer items={selection} index={opened} onIndex={setOpened} onClose={() => setOpened(null)} />
    </section>
  );
}
