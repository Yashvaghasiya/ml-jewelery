import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { faq } from "@/lib/site";
import Image from "next/image";
import { images } from "@/lib/images";

export default function Faq() {
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
            <Image src={images.services.ads[0].src} alt={images.services.ads[0].alt} fill sizes="(min-width: 800px) 19vw, 0px" className="object-cover" />
          </div>
          <a className="edition-link" href="#contact">Prepare a brief <span aria-hidden>↓</span></a>
        </div>
        <div className="faq-index">
          {faq.map(f => (
            <details key={f.q}>
              <summary>{f.q}<PlusIcon size={19} aria-hidden /></summary>
              <p className="faq-answer">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}
