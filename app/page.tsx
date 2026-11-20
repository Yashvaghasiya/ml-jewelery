import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import Atelier from "@/components/sections/Atelier";
import SelectedWork from "@/components/sections/SelectedWork";
import ServiceJourney from "@/components/sections/ServiceJourney";
import Results from "@/components/sections/Results";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

import "./landing.css";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="studio-home">
        <Hero />
        <Statement />
        <SelectedWork />
        <Atelier />
        <ServiceJourney />
        <Process />
        <div className="studio-record" data-header="light">
          <div className="edition-wrap record-spread">
            <Results />
            <Testimonials />
          </div>
        </div>
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
