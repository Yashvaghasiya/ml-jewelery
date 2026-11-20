import Image from "next/image";
import Link from "next/link";
import { studyPath } from "@/lib/kundan-study";

function LightingPlate({ setup }: { setup: string | null }) {
  return (
    <figure className="lighting-plate">
      {setup ? (
        <div className="setup-photo"><Image src={setup} alt="The lighting setup for the Kundan study" fill sizes="(min-width: 800px) 46vw, 90vw" className="object-cover" /></div>
      ) : (
        <div className="light-plan" role="img" aria-label="Overhead lighting plan. Window light enters from the left through a diffusion sheet. The jewellery sits in the middle, with a white bounce card to its right and the camera in front.">
          <div className="plan-grid" aria-hidden>
            <div className="plan-beam" />
            <span className="plan-window" /><span className="plan-silk" />
            <span className="plan-jewel" /><span className="plan-mark" /><span className="plan-bounce" />
            <span className="plan-camera" />
            <span className="plan-name plan-name--window">Window</span>
            <span className="plan-name plan-name--silk">Diffusion</span>
            <span className="plan-name plan-name--jewel">Jewellery</span>
            <span className="plan-name plan-name--bounce">Bounce</span>
            <span className="plan-name plan-name--camera">Camera</span>
          </div>
        </div>
      )}
      <figcaption><span>{setup ? "Behind the scenes" : "Proposed light plot"}</span><span>{setup ? "Kundan study" : "Overhead view"}</span></figcaption>
    </figure>
  );
}

export default function LightingNotes({ setup, inStudy = false }: { setup: string | null; inStudy?: boolean }) {
  return (
    <section className="lighting-notes" id="lighting" data-header="light" aria-labelledby="lighting-title">
      <div className="edition-wrap notes-spread">
        <div className="notes-copy">
          <p className="edition-label">Lighting notes</p>
          <h2 className="edition-title" id="lighting-title">One window.<br /><em>Two edges.</em></h2>
          <p className="edition-body">Diffuse the window on the left to draw a long highlight along the gold. A white card on the right lifts the shadow just enough to keep the setting legible.</p>
          {!inStudy && <Link className="edition-link" href={studyPath + "#frames"}>See the macro and still life</Link>}
        </div>
        <LightingPlate setup={setup} />
      </div>
    </section>
  );
}
