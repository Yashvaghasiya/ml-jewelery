"use client";

import { services, site, waLink } from "@/lib/site";
import { MaskLines, Reveal, SectionLabel } from "@/components/ui/Reveal";
import ProjectForm from "@/components/sections/ProjectForm";

export default function Contact() {
  return (
    <section id="contact" data-header="light" className="section relative border-t border-line-light text-ink">
      <div className="container-x">
        <SectionLabel no="09">Your next chapter</SectionLabel>
        <h2 className="display display-hero mt-8 mb-16 max-w-[14ch]"><MaskLines lines={["Let’s make", <em key="e" className="text-taupe">something matter.</em>]} /></h2>
      </div>
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="max-w-sm text-lg text-taupe">A collection to launch. A brand to reimagine. Tell us what you have in mind — we’ll find the right way to bring it into focus.</p>
          <Reveal>
            <dl className="mt-12 grid gap-6 text-base sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <dt className="label text-taupe">WhatsApp / call</dt>
                <dd className="mt-2">
                  <a className="underline decoration-taupe/50 underline-offset-4 hover:text-taupe" href={waLink("Hi! I'd like to discuss a project.")} target="_blank" rel="noopener">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label text-taupe">Email</dt>
                <dd className="mt-2">
                  <a className="underline decoration-taupe/50 underline-offset-4 hover:text-taupe" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label text-taupe">Studio</dt>
                <dd className="mt-2 text-ink">
                  {site.address[0]}
                  <br />
                  {site.address[1]}
                </dd>
              </div>
            </dl>
          </Reveal>
          <p className="mt-10 max-w-sm text-sm text-taupe">Prefer a full brief? <a href="/start-a-project" className="underline decoration-taupe/50 underline-offset-4 hover:text-taupe">Open the project brief page</a> — it saves your answers as a ready-to-send WhatsApp message.</p>
        </div>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
          <ProjectForm />
        </Reveal>
      </div>
    </section>
  );
}
