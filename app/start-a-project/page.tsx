import type { Metadata } from "next";
import Link from "next/link";
import { briefChannel, site } from "@/lib/site";
import StudioPage from "@/components/sections/StudioPage";
import ProjectForm from "@/components/sections/ProjectForm";

export const metadata: Metadata = {
  title: `Start a project | ${site.brand} Studio`,
  description: "Prepare a project brief for a jewellery shoot, campaign, social launch or ecommerce store.",
};

export default function StartAProject() {
  return (
    <StudioPage>
      <section data-header="light" className="brief-page">
        <div className="edition-wrap commission-spread">
          <div className="brief-intro">
            <p className="edition-label">Start a project</p>
            <h1 className="edition-title">Your next <em>collection.</em></h1>
            <p className="edition-body">Which pieces are you launching, where will the images live, and when do you need them?</p>
            <p className="brief-method">{briefChannel === "download"
              ? "Build your brief here and save a copy to share with your team."
              : `The form opens a draft in ${briefChannel} for you to review and send.`}</p>
            {site.phone && <a className="edition-link" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>}
            {site.email && <a className="edition-link" href={`mailto:${site.email}`}>{site.email}</a>}
            <Link href="/work" className="edition-link">Explore studio work</Link>
          </div>
          <div className="brief-paper">
            <h2 className="brief-heading">Project brief</h2>
            <ProjectForm />
          </div>
        </div>
      </section>
    </StudioPage>
  );
}
