import type { Metadata } from "next";
import { getKundanStudy } from "@/lib/kundan-study";
import StudioPage from "@/components/sections/StudioPage";
import SelectedWork from "@/components/sections/SelectedWork";
import FeaturedStudy from "@/components/study/FeaturedStudy";

export const metadata: Metadata = {
  title: "Work | Verdane Studio",
  description: "Browse the Kundan editorial study and an index of visual directions for jewellery photography, films and campaigns.",
};

export default function Work() {
  return (
    <StudioPage>
      <FeaturedStudy study={getKundanStudy()} portfolio />
      <SelectedWork full />
    </StudioPage>
  );
}
