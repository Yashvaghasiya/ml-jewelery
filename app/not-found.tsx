import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { MaskLines, Reveal } from "@/components/ui/Reveal";

export default function NotFound() {
  return <main id="main" className="grain relative min-h-svh bg-ivory text-ink"><div className="container-x py-12"><Link href="/" className="display inline-flex min-h-11 items-center text-3xl">{site.brand} Studio</Link><div className="editorial-grid mt-16 border-t border-line-light py-16 md:mt-24"><div className="col-span-4 md:col-span-3"><p className="label text-taupe">A little off course</p><p className="display display-xl mt-5 text-taupe">404</p></div><div className="col-span-4 md:col-span-9"><h1 className="display display-xl max-w-[13ch]"><MaskLines animateOnMount lines={["Out of frame.", <em key="lost">Not out of reach.</em>]} /></h1><Reveal><p className="mt-8 max-w-md text-lg text-taupe">This link may be old or mistyped. Head back to the studio to explore the work or start a conversation.</p><Link href="/" className="editorial-link mt-8"><ArrowLeftIcon size={20} aria-hidden />Back to the studio</Link></Reveal></div></div></div></main>;
}
