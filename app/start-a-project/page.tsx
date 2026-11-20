import type { Metadata } from "next";
import { site, process } from "@/lib/site";
import { SectionLabel, Reveal } from "@/components/ui/Reveal";
import ProjectForm from "@/components/sections/ProjectForm";
import { MapPinIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: `Start a project | ${site.brand} Studio`,
  description: `Send a brief to ${site.brand} Studio — jewellery photography, reels, social, ads and ecommerce. We reply within one working day.`,
};

export default function StartAProject() {
  return (
    <section className="section pt-36 text-ink md:pt-44">
      <div className="container-x">
        <SectionLabel no="01">Start a project</SectionLabel>
        <h1 className="display display-hero mt-8 max-w-[16ch]">
          Tell us what you <em className="text-taupe">are launching.</em>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-taupe">
          Fill this once and your brief opens ready to send on WhatsApp — no account, no waiting. We reply within one working day with a moodboard plan and an itemised quote.
        </p>
      </div>

      <div className="container-x mt-16 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="label text-taupe">What happens next</h2>
          <Reveal>
            <ol className="mt-6 grid gap-8">
              {process.map((p) => (
                <li key={p.no} className="grid grid-cols-[auto_1fr] gap-5">
                  <span className="font-serif text-2xl text-taupe/60">{p.no}</span>
                  <span>
                    <span className="text-base font-semibold">{p.title}</span>
                    <span className="mt-1 block text-sm text-taupe">{p.line}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 grid gap-4 text-base">
              <a className="flex min-h-11 items-center gap-3 underline decoration-taupe/50 underline-offset-4 hover:text-taupe" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                <PhoneIcon className="h-4 w-4 text-taupe" aria-hidden /> {site.phone}
              </a>
              <p className="flex min-h-11 items-center gap-3 text-taupe">
                <MapPinIcon className="h-4 w-4" aria-hidden /> {site.address.join(", ")} — visits by appointment
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ProjectForm />
        </div>
      </div>
    </section>
  );
}
