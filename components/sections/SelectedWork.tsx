"use client";

import { useState } from "react";
import { ArrowsOutSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { site, works, workStill, type Work } from "@/lib/site";
import WorkViewer from "./WorkViewer";

const selected = [works[2], works[3], works[0]];
const filters = ["All", "Photography", "Film & campaigns"];

function discipline(work: Work) {
  return ["Product photography", "Ecommerce shoot"].includes(work.service) ? "Photography" : "Film & campaigns";
}

export default function SelectedWork({ full = false }: { full?: boolean }) {
  const [filter, setFilter] = useState(filters[0]);
  const [opened, setOpened] = useState<number | null>(null);
  const selection = (full ? works : selected).filter(work => filter === "All" || discipline(work) === filter);

  return (
    <section id="work-index" data-header="light" className="work-register" aria-labelledby="index-title">
      <div className="edition-wrap">
        <header className="archive-masthead">
          <h2 id="index-title" className="edition-title">The work <em>index.</em></h2>
          {!full && <Link href="/work#work-index" className="edition-link">Browse all studies</Link>}
        </header>
        <div className="archive-toolbar">
          <div className="archive-filters" role="group" aria-label="Filter visual studies">
            {filters.map(label => <button type="button" key={label} aria-pressed={filter === label} onClick={() => setFilter(label)}>{label}</button>)}
          </div>
          <p role="status">{selection.length} {selection.length === 1 ? "study" : "studies"}</p>
        </div>
        <ul className="work-rows">
          {selection.map((work, i) => (
            <li key={work.slug}>
              <button type="button" className="work-row" aria-label={`View ${work.title}`} aria-haspopup="dialog" onClick={() => setOpened(i)}>
                <span className="work-mini"><Image src={workStill(work)} alt="" fill sizes="(min-width: 800px) 120px, 70px" className="object-cover" /></span>
                <span className="work-row-title"><strong>{work.title}</strong><small>{work.service}</small></span>
                <small className="work-row-meta">{work.service}</small>
                <ArrowsOutSimpleIcon aria-hidden />
              </button>
            </li>
          ))}
        </ul>
        {selection.some(work => work.credit) && <div className="archive-end"><p>{site.sampleContent ? "Concept studies with reference photography. Photo credits are in the viewer." : "Photography credits are in the viewer."}</p></div>}
      </div>
      <WorkViewer items={selection} index={opened} onIndex={setOpened} onClose={() => setOpened(null)} />
    </section>
  );
}
