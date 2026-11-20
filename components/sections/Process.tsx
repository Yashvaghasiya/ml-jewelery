import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { images } from "@/lib/images";
import { process } from "@/lib/site";

const frames = [
  images.portfolio[7],
  images.portfolio[5],
  images.services.photography[1],
  images.portfolio[6],
];

export default function Process() {
  return (
    <section id="process" data-header="light" className="storyboard" aria-labelledby="process-title">
      <div className="edition-wrap">
        <header className="storyboard-head">
          <div>
            <p className="edition-label">The process</p>
            <h2 id="process-title" className="edition-title">On the <em>shoot list.</em></h2>
          </div>
          <a href="/start-a-project" className="edition-link">Discuss your brief <ArrowUpRightIcon aria-hidden /></a>
        </header>
        <ol className="storyboard-frames">
          {process.map((step, i) => (
            <li key={step.no}>
              <div className="story-still">
                <Image src={frames[i].src} alt={frames[i].alt} fill sizes="(min-width: 800px) 23vw, 40vw" className="object-cover" />
              </div>
              <div className="story-caption">
                <span className="story-number" aria-hidden>{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.line}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
