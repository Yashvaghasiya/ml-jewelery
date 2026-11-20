import type { Metadata } from "next";
import Link from "next/link";
import { getKundanStudy } from "@/lib/kundan-study";
import StudioPage from "@/components/sections/StudioPage";
import LightingNotes from "@/components/study/LightingNotes";
import LoupePrint from "@/components/study/LoupePrint";
import StudyFigure from "@/components/study/StudyFigure";

export const metadata: Metadata = {
  title: "Kundan, in window light | Verdane Studio",
  description: "An editorial jewellery study in three frames. Explore the creative brief, lighting plan and Kundan settings under the loupe.",
};

export default function KundanInWindowLight() {
  const study = getKundanStudy();
  const references = [study.detail, study.portrait, study.still].filter(frame => frame.reference);
  return (
    <StudioPage>
      <section className="case-lead" data-header="light" aria-labelledby="study-title">
        <div className="edition-wrap case-spread">
          <div className="case-intro">
            <nav aria-label="Breadcrumb" className="case-breadcrumb"><Link href="/work">Work</Link><span aria-hidden>/</span><span>Studio study</span></nav>
            <h1 id="study-title" className="edition-title">Kundan, in <em>window light.</em></h1>
            <div className="case-brief">
              <h2 className="edition-label">The brief</h2>
              <p>Show how a Kundan piece sits against skin, then move close enough to see the gold around each stone. Finish with a still life that gives the eye the whole silhouette.</p>
            </div>
          </div>
          <StudyFigure frame={study.portrait} className="case-cover" sizes="(min-width: 800px) 38vw, 85vw" preload />
        </div>
      </section>
      <LightingNotes setup={study.setup} inStudy />
      <section id="frames" className="case-frames" data-header="light" aria-labelledby="frames-title">
        <div className="edition-wrap">
          <p className="edition-label">The edit</p>
          <h2 id="frames-title" className="edition-title">Up close, <em>in full.</em></h2>
          <div className="case-pair">
            <LoupePrint frame={study.detail} />
            <StudyFigure frame={study.still} className="case-still" sizes="(min-width: 800px) 34vw, 85vw" />
          </div>
        </div>
      </section>
      <section className="study-colophon" data-header="light" aria-labelledby="colophon-title">
        <div className="edition-wrap">
          <h2 id="colophon-title" className="edition-label">Study details</h2>
          <dl>
            <div><dt>Subject</dt><dd>Kundan jewellery</dd></div>
            <div><dt>Format</dt><dd>Portrait, macro and still life</dd></div>
            {references.length > 0 && <div><dt>Reference photography</dt><dd>Pexels · {references.map(f => f.label.toLowerCase()).join(", ")}</dd></div>}
          </dl>
          <nav aria-label="More from the studio">
            <Link className="edition-link" href="/work#work-index">Browse the work index</Link>
            <Link className="edition-link" href="/start-a-project?service=Jewellery%20photography">Start a photography brief</Link>
          </nav>
        </div>
      </section>
    </StudioPage>
  );
}
