import Image from "next/image";
import { ArrowDownIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { heroPendant } from "@/lib/site";
import { MaskLines } from "@/components/ui/Reveal";

export default function Hero() {
  return (
    <section id="hero" data-header="dark" className="studio-hero">
      <div className="studio-cover container-x">
        <div className="studio-intro">
          <p className="label">Verdane Studio · Mumbai</p>
          <h1 className="display"><MaskLines animateOnMount lines={["Made to be", <em key="desired">desired.</em>]} /></h1>
          <p className="studio-deck">Exceptional jewellery deserves more than a product shot. We create the imagery, films and campaigns that make people stop. And look again.</p>
          <a className="studio-cta" href="/start-a-project">Start a project <ArrowUpRightIcon size={18} aria-hidden /></a>
        </div>
        <figure className="studio-plate">
          <div className="studio-photo">
            <Image src={heroPendant.src} alt={heroPendant.alt} fill priority sizes="(min-width: 800px) 49vw, 90vw" className="object-cover" />
          </div>
          <figcaption>A study in light, metal &amp; desire</figcaption>
        </figure>
      </div>
      <div className="studio-foot container-x">
        <span>Photography / Film / Brand presence</span>
        <a href="#work">Selected work <ArrowDownIcon size={16} aria-hidden /></a>
      </div>
    </section>
  );
}
