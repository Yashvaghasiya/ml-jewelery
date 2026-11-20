import type { Metadata } from "next";
import Link from "next/link";
import { services, site, waLink } from "@/lib/site";
import { SectionLabel, Reveal } from "@/components/ui/Reveal";
import EditorialImage from "@/components/ui/EditorialImage";
import { SampleTag } from "@/components/ui/Sample";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: `Services | ${site.brand} Studio`,
  description: `Jewellery photography, reels and campaign films, social media, performance ads and ecommerce — ${site.brand} Studio, ${site.city}.`,
};

const layoutLabel: Record<string, string> = {
  gallery: "gallery",
  reels: "reels wall",
  phone: "feed grid",
  ads: "ad tiles",
  browser: "storefront",
};

export default function Services() {
  return (
    <section className="section pt-36 text-ink md:pt-44">
      <div className="container-x">
        <SectionLabel no="01">Services</SectionLabel>
        <h1 className="display display-hero mt-8 max-w-[15ch]">
          Five ways we put your <em className="text-taupe">jewellery in focus.</em>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-taupe">
          Book one discipline or hand us the whole launch. Every engagement starts with a 30 minute call and a moodboard you approve before anything is shot.
        </p>
      </div>

      <div className="container-x mt-20 grid gap-24">
        {services.map((s, i) => (
          <Reveal key={s.no}>
            <article id={s.title.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "")} className="grid items-start gap-10 border-t border-line-light pt-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="label text-taupe">{s.no} · {layoutLabel[s.layout]}</p>
                <h2 className="display mt-4 text-4xl md:text-5xl">{s.title}</h2>
                <p className="mt-5 max-w-sm text-base text-taupe">{s.line}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <li key={p} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink/80">
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-taupe">
                  Typical result: <span className="text-ink">{s.result}</span> <SampleTag />
                </p>                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href={`/start-a-project?service=${encodeURIComponent(s.title)}`} className="btn btn-primary">
                    Start with {s.title.toLowerCase().startsWith("websites") ? "a site" : s.title.toLowerCase().split(" &")[0]}
                    <ArrowUpRightIcon weight="bold" className="h-4 w-4" aria-hidden />
                  </Link>
                  <a className="btn btn-ghost" href={waLink(`Hi! I have a question about ${s.title}.`)} target="_blank" rel="noopener">
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
              <div className={`grid gap-3 lg:col-span-6 lg:col-start-7 ${i % 2 ? "lg:order-first lg:col-start-1" : ""}`}>
                {s.shots.slice(0, 3).map((shot, j) => (
                  <EditorialImage key={j} src={shot.src} alt={shot.alt ?? shot.label ?? s.title} className={`w-full object-cover ${j === 0 ? "aspect-[4/3]" : "aspect-[16/9]"}`} sizes="(min-width: 1024px) 50vw, 100vw" />
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="container-x mt-24 border-t border-ink pt-10 pb-4">
        <p className="max-w-xl text-lg">Not sure which one you need? <Link href="/start-a-project" className="underline underline-offset-4 hover:text-taupe">Send a brief</Link> — we will tell you honestly, even if it is just one shoot day.</p>
      </div>
    </section>
  );
}
