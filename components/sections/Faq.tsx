import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { faq } from "@/lib/site";
import { MaskLines, Reveal, SectionLabel } from "@/components/ui/Reveal";

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
    <section id="faq" data-header="light" className="section border-t border-line-light">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
          <SectionLabel no="06">FAQ</SectionLabel>
          <h2 className="display display-lg mt-6">
            <MaskLines lines={["Questions brands", "ask us first."]} />
          </h2>
          <Reveal>
            <p className="mt-6 max-w-sm text-base text-taupe">
              Something else on your mind? Ask it in the brief below and we answer within one working day.
            </p>
          </Reveal>
          </div>
        </div>

        <Reveal className="md:col-span-7 md:col-start-6">
          <div className="border-t border-line-light">
            {faq.map((f) => (
              <details key={f.q} className="group border-b border-line-light">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium transition-colors hover:text-taupe [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-light transition-[transform,background-color,border-color] duration-500 group-open:rotate-45 group-open:border-ink group-open:bg-ink group-open:text-ivory" aria-hidden>
                    <PlusIcon className="h-4 w-4" />
                  </span>
                </summary>
                <p className="faq-answer max-w-2xl pb-6 text-base text-taupe">
                  <Answer text={f.a} />
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
      {complete && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
    </section>
  );
}
