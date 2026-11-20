import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { faq } from "@/lib/site";
import Image from "next/image";
import { images } from "@/lib/images";

const SPLIT = /(\{\{.*?\}\})/; // capture group keeps the placeholders in the split result
const IS_PLACEHOLDER = /^\{\{.*\}\}$/;

/** Renders an answer, highlighting {{placeholders}} the owner still has to fill in. */
function Answer({ text }: { text: string }) {
  return (
    <>
      {text.split(SPLIT).map((part, i) =>
        IS_PLACEHOLDER.test(part) ? (
          <mark key={i} title="Fill this in before launch" className="rounded-sm border border-dashed border-taupe/50 bg-champagne/15 px-1 text-ink">
            {part.slice(2, -2)}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export default function Faq() {
  const complete = faq.every((f) => !f.a.includes("{{"));
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <section id="faq" data-header="light" className="studio-faq" aria-labelledby="faq-title">
      <div className="edition-wrap faq-spread">
        <div className="faq-intro">
          <p className="edition-label">Questions &amp; answers</p>
          <h2 className="edition-title" id="faq-title">Before <br /><em>the shoot.</em></h2>
          <div className="faq-still">
            <Image src={images.services.ads[0].src} alt={images.services.social[7].alt} fill sizes="(min-width: 800px) 19vw, 0px" className="object-cover" />
          </div>
          <a className="edition-link" href="#contact">Ask the studio <span aria-hidden>↓</span></a>
        </div>
        <div className="faq-index">
          {faq.map(f => (
            <details key={f.q}>
              <summary>{f.q}<PlusIcon size={19} aria-hidden /></summary>
              <p className="faq-answer"><Answer text={f.a} /></p>
            </details>
          ))}
        </div>
      </div>
      {complete && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
    </section>
  );
}
