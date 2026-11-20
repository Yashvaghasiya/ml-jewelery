import type { Metadata } from "next";
import Link from "next/link";
import PageBar from "@/components/legal/PageBar";
import { MaskLines } from "@/components/ui/Reveal";
import CategoryPicker from "@/components/categories/CategoryPicker";
import { categories } from "@/lib/categories";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Jewellery categories we shoot | ${site.brand} Studio`,
  description: `Rings, necklaces, bridal sets, kundan, pearls and more — ${categories.length} jewellery categories, each with a full shot library from ${site.brand} Studio.`,
  alternates: { canonical: "/categories" },
  openGraph: {
    title: `Jewellery categories we shoot | ${site.brand} Studio`,
    description: "Every jewellery category we photograph, with a full shot library per category.",
    type: "website",
  },
};

export default function Categories() {
  return (
    <div className="min-h-svh bg-ivory text-ink">
      <PageBar />
      <main id="main" className="container-x pb-16 md:pb-24">
        <header className="chapter-rule py-16 md:py-24">
          <p className="label text-taupe">Verdane Studio / Shot libraries</p>
          <h1 className="display display-hero mt-8 max-w-[14ch]">
            <MaskLines
              lines={[
                "Every category,",
                <span key="sell">
                  shot <em className="text-taupe">to sell.</em>
                </span>,
              ]}
            />
          </h1>
          <div className="mt-10">
            <CategoryPicker categories={categories} />
          </div>
          <p className="mt-8 max-w-2xl text-base text-taupe">
            {categories.length} jewellery categories, {categories.reduce((a, c) => a + c.images.length, 0)} photographs — macro detail, on-model and catalogue framing for each. Photos are free-licence placeholders until your own shoot replaces them.
          </p>
        </header>

        <section className="border-t border-line-light py-16 text-center md:py-24">
          <h2 className="display display-xl max-w-[16ch] mx-auto">
            Your category not here? <em className="text-taupe">We shoot it.</em>
          </h2>
          <Link href="/#contact" className="mt-8 inline-block rounded-full bg-onyx px-7 py-3.5 text-sm font-semibold text-ivory transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne active:scale-[0.98]">
            Start a shoot
          </Link>
        </section>
      </main>
    </div>
  );
}
