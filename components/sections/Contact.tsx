import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { site, waLink } from "@/lib/site";
import { images } from "@/lib/images";
import ProjectForm from "./ProjectForm";

export default function Contact() {
  return (
    <section id="contact" className="commission" data-header="dark" aria-labelledby="contact-title">
      <div className="edition-wrap commission-spread">
        <div className="commission-intro">
          <p className="edition-label">Project enquiries</p>
          <h2 className="edition-title" id="contact-title">Your next<br /><em>collection.</em></h2>
          <p className="edition-body">Tell us about the pieces, the launch date and the images you have in mind.</p>
          <a className="edition-link" href="/start-a-project">Open the full project brief <ArrowUpRightIcon aria-hidden /></a>
          <div className="studio-address">
            <div className="address-print">
              <Image src={images.services.social[4].src} alt={images.services.social[4].alt} fill sizes="144px" className="object-cover" />
            </div>
            <address>
              <strong>{site.city} studio</strong>
              <span>{site.address.join(", ")}</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={waLink("Hi! I'd like to discuss a project.")} target="_blank" rel="noopener">{site.phone}</a>
            </address>
          </div>
        </div>
        <div className="brief-paper">
          <h3>Project brief</h3>
          <ProjectForm />
        </div>
      </div>
    </section>
  );
}
