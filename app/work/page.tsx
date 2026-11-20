import type { Metadata } from "next";
import Link from "next/link";
import { site, works, stats, testimonials } from "@/lib/site";
import { SectionLabel, Reveal } from "@/components/ui/Reveal";
import EditorialImage from "@/components/ui/EditorialImage";
import { SampleTag, SampleNote } from "@/components/ui/Sample";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: `Work | ${site.brand} Studio`,
  description: `Selected jewellery photography, reels and campaigns by ${site.brand} Studio — and the results they moved.`,
};

export default function Work() {
  return (
    <section className="section pt-36 text-ink md:pt-44">
      <div className="container-x">
        <SectionLabel no="01">Selected work</SectionLabel>
        <h1 className="display display-hero mt-8 max-w-[16ch]">
          Work that moved the <em className="text-taupe">counter.</em>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-taupe">
          Every project below is a launch, a shoot or a season we ran end to end — with the number it changed.
        </p>
      </div>

      <div className="container-x mt-20 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((w, i) => (
          <Reveal key={w.slug} delay={(i % 3) * 0.06}>
            <article className="group border border-line-light bg-ivory/40 p-5 transition-colors hover:border-ink/30">
              <EditorialImage src={workStill(w)} alt={w.alt} className="aspect-[4/5]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              <p className="label mt-5 text-taupe">{w.service} · {w.year}</p>
              <h2 className="font-serif mt-2 text-2xl">{w.title}</h2>
              <p className="mt-1 text-sm text-taupe">for {w.client}</p>
              <p className="mt-4 border-t border-line-light pt-4 text-sm">
                <span className="font-semibold">{w.result}</span> <SampleTag />
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Proof band: studio numbers and what clients say. All sample-marked until real. */}
      <div className="container-x mt-28">
        <Reveal>
          <dl className="grid grid-cols-2 gap-10 border-y border-ink py-12 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="display text-5xl md:text-6xl">
                  {s.value.toLocaleString("en-IN", { minimumFractionDigits: s.decimals ?? 0, maximumFractionDigits: s.decimals ?? 0 })}
                  {s.suffix}
                </dd>
                <dt className="label mt-3 text-taupe">{s.label}</dt>
              </div>
            ))}
          </dl>
          <SampleNote>These studio numbers are placeholders until real results replace them.</SampleNote>
        </Reveal>

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {testimonials.map((t) => (
            <Reveal key={t.quote.slice(0, 24)}>
              <figure className="border-t border-ink pt-6">
                <blockquote className="font-serif text-xl leading-snug">“{t.quote}”</blockquote>
                <figcaption className="label mt-5 text-taupe">
                  {t.name} · {t.detail} <SampleTag />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="container-x mt-24 border-t border-ink pt-10 pb-4">
        <p className="max-w-xl text-lg">Your collection could be next. <Link href="/start-a-project" className="underline underline-offset-4 hover:text-taupe">Send a brief</Link> and we will reply within one working day.</p>
      </div>
    </section>
  );
}

function workStill(w: (typeof works)[number]) {
  return w.media.type === "video" ? (w.media.poster ?? "") : w.media.src;
}
