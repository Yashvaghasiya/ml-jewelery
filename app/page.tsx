import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Atelier from "@/components/sections/Atelier";
import SelectedWork from "@/components/sections/SelectedWork";
import ServiceJourney from "@/components/sections/ServiceJourney";
import Results from "@/components/sections/Results";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import FeaturedStudy from "@/components/study/FeaturedStudy";
import LightingNotes from "@/components/study/LightingNotes";
import { getKundanStudy } from "@/lib/kundan-study";
import { site } from "@/lib/site";
import "./landing.css";
import "./study.css";

export default function Home() {
  const study = getKundanStudy();
  return (
    <>
      <Header />
      <main id="main" className="studio-home">
        <Hero />
        <FeaturedStudy study={study} />
        <SelectedWork />
        <Atelier frames={[study.detail, study.portrait, study.still]} />
        <ServiceJourney />
        <Process />
        <LightingNotes setup={study.setup} />
        {!site.sampleContent && (
          <div className="studio-record" data-header="light">
            <div className="edition-wrap record-spread"><Results /><Testimonials /></div>
          </div>
        )}
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
