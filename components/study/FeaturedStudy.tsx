import Link from "next/link";
import { studyPath, type KundanStudy } from "@/lib/kundan-study";
import StudyFigure from "./StudyFigure";
import LoupePrint from "./LoupePrint";

export default function FeaturedStudy({ study, portfolio = false }: { study: KundanStudy; portfolio?: boolean }) {
  const Heading = portfolio ? "h1" : "h2";
  return (
    <section className="featured-study" id="work" data-header="light" aria-labelledby="featured-title">
      <div className="edition-wrap">
        <header className="feature-heading">
          <div>
            <p className="edition-label">{portfolio ? "Portfolio / Featured study" : "Featured studio study"}</p>
            <Heading className="edition-title" id="featured-title">Kundan, in <em>window light.</em></Heading>
          </div>
          <div className="feature-deck">
            <p>A close look at how soft light reads across a gold setting, from the edge of a stone to a piece worn on skin.</p>
            <Link href={studyPath} className="edition-link">View the study</Link>
          </div>
        </header>
        <div className="feature-plates">
          <StudyFigure frame={study.portrait} className="feature-portrait" sizes="(min-width: 800px) 30vw, 82vw" preload={portfolio} />
          <LoupePrint frame={study.detail} />
        </div>
      </div>
    </section>
  );
}
