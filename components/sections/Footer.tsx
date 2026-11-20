import Link from "next/link";
import { ArrowUpIcon } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";

export default function Footer({ backTo = "#hero" }: { backTo?: string }) {
  const socials = Object.entries(site.social).filter(([, url]) => url);
  return (
    <footer className="studio-footer" data-header="dark">
      <div className="edition-wrap">
        <div className="footer-nav">
          <div>
            <p className="edition-label">{site.descriptor}</p>
            <p>{site.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <Link href="/work">Work</Link>
            <Link href="/services">Services</Link>
            <Link href="/start-a-project">Start a project</Link>
            {socials.map(([name, url]) => <a key={name} href={url} target="_blank" rel="noopener" className="capitalize">{name}</a>)}
          </nav>
        </div>
        <div className="footer-signature">
          <p aria-label={`${site.brand} Studio`}>{site.brand}</p>
          <a href={backTo} aria-label="Back to top"><ArrowUpIcon aria-hidden /></a>
        </div>
        <div className="footer-imprint">
          <p>© {new Date().getFullYear()} {site.brand} Studio</p>
          <nav aria-label="Legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/brand">Brand colours</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
