import PageBar from "./PageBar";
import { MaskLines, Reveal } from "@/components/ui/Reveal";

export type LegalSection = { heading: string; body: string };

const SPLIT = /(\{\{.*?\}\})/;
const IS_PLACEHOLDER = /^\{\{.*\}\}$/;

function Text({ text }: { text: string }) {
  return (
    <>
      {text.split(SPLIT).map((part, i) =>
        IS_PLACEHOLDER.test(part) ? (
          <mark key={i} title="Fill this in" className="rounded-sm border border-dashed border-taupe/50 bg-champagne/15 px-1 text-ink">
            {part.slice(2, -2)}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export default function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: LegalSection[] }) {
  return (
    <div className="min-h-svh bg-ivory text-ink">
      <PageBar />
      <main id="main" className="container-x pb-24">
        <header className="subpage-heading">
          <p className="label text-taupe">Verdane Studio / Legal notes</p>
          <h1 className="display display-hero mt-8 max-w-[12ch]"><MaskLines lines={[title]} /></h1>
          <p className="mt-8 text-sm text-taupe">Last updated: <Text text={updated} /></p>
        </header>
        <div className="editorial-grid mt-12 md:mt-20">
          <aside className="col-span-4 md:col-span-4">
            <div className="md:sticky md:top-12">
              <p className="label text-taupe">On this page</p>
              <nav aria-label={`${title} contents`} className="mt-5 flex flex-col">{sections.map((s, i) => <a key={s.heading} href={`#legal-${i}`} className="flex min-h-11 items-center gap-4 border-b border-line-light py-3 text-sm hover:text-taupe active:opacity-70"><span className="text-xs text-taupe tabular-nums">{String(i + 1).padStart(2, "0")}</span>{s.heading}</a>)}</nav>
              <p className="mt-8 border-l-2 border-champagne pl-4 text-sm text-taupe">This is a starting template. Highlighted parts need your details, and the whole page should be reviewed by someone qualified before launch.</p>
            </div>
          </aside>
          <div className="col-span-4 mt-8 md:col-span-7 md:col-start-6 md:mt-0">
            {sections.map((s, i) => <Reveal key={s.heading}><section id={`legal-${i}`} className="scroll-mt-10 border-t border-line-light pb-12 pt-6"><p className="label text-taupe">{String(i + 1).padStart(2, "0")}</p><h2 className="display display-md mt-4">{s.heading}</h2><p className="mt-6 max-w-[65ch] text-base leading-relaxed text-taupe"><Text text={s.body} /></p></section></Reveal>)}
          </div>
        </div>
      </main>
    </div>
  );
}
