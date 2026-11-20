import type { Metadata } from "next";
import { site } from "@/lib/site";
import ExhibitPage from "@/components/exhibit/ExhibitPage";
import "../exhibit.css";

export const metadata: Metadata = {
  title: `${site.brand} — The Exhibit | ${site.descriptor}`,
  description: `${site.tagline} Photography, reels, social and performance ads for jewellery brands, staged like museum pieces.`,
};

export default function Page() {
  return <ExhibitPage />;
}
