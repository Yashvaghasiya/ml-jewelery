import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "@/app/landing.css";
import "@/app/study.css";

export default function StudioPage({ children }: { children: ReactNode }) {
  return <>
    <Header innerPage />
    <main className="studio-home studio-inner" id="main">{children}</main>
    <Footer backTo="#main" />
  </>;
}
