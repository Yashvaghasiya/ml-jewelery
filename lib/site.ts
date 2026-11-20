// Everything a client-specific build needs to change lives in this file.
// Photos live in lib/images.ts (and the files in /public/images/).
import { images } from "./images";

export const site = {
  brand: "Verdane",
  descriptor: "Jewellery Marketing Studio",
  tagline: "We make jewellery impossible to scroll past.",
  // Production origin for portfolio links and share previews.
  url: "https://ml-jewelery.vercel.app",
  // International format, digits only (e.g. 919876543210).
  whatsapp: "",
  phone: "",
  email: "",
  city: "Mumbai",
  address: [] as string[],
  since: 2016,
  locale: "en-IN",
  // Leave a link empty ("") to hide it; no dead "#" links are shown.
  social: { instagram: "", behance: "", youtube: "", linkedin: "" },
  /**
   * Stats, client quotes and project results on this site are SAMPLES until you
   * replace them with your own. The public portfolio hides sample figures and quotes.
   * Set to false only once every figure and quote is real.
   */
  sampleContent: true,
};

export const waLink = (text: string) => site.whatsapp
  ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
  : "/start-a-project";

export const briefChannel = site.whatsapp ? "WhatsApp" : site.email ? "email" : "download";

/* --------------------------------------------------------------------------
   Portfolio: the photos turning around the hero pendant, and the work viewer.

   The photos are TEMPORARY free-licence stock photos from Pexels
   (https://www.pexels.com/license/). Change the photos in lib/images.ts or by
   replacing the files in /public/images/portfolio/. When a photo is yours,
   delete that item's `credit` line (it prints "Placeholder photo · ...").
   A reel instead of a photo: media: { type: "video", src: "/images/portfolio/01.mp4", poster: images.portfolio[0].src }
   Results are samples (see site.sampleContent).
   -------------------------------------------------------------------------- */
export type Media = { type: "image"; src: string } | { type: "video"; src: string; poster?: string };

export type Work = {
  slug: string;
  title: string;
  client: string;
  service: string;
  year: number;
  result: string;
  media: Media;
  alt: string;
  credit?: string;
};

// Order matters: this is the order the tiles sit around the hero pendant.
export const works: Work[] = [
  { slug: "solitaire", title: "The Solitaire Edit", client: "Placeholder Jewellers", service: "Product photography", year: 2026, result: "+38% add to cart on product pages", media: { type: "image", src: images.portfolio[0].src }, alt: images.portfolio[0].alt, credit: "The Glorious Studio / Pexels" },
  { slug: "nisha", title: "Nisha Bridal Reels", client: "Placeholder Bridal House", service: "Reels & short film", year: 2025, result: "4.6x ROAS on Meta ads", media: { type: "image", src: images.portfolio[1].src }, alt: images.portfolio[1].alt, credit: "Pexels" },
  { slug: "rose-gold", title: "Rose Gold Edit", client: "Placeholder Atelier", service: "Ecommerce shoot", year: 2026, result: "120 pieces shot in 3 days", media: { type: "image", src: images.portfolio[2].src }, alt: images.portfolio[2].alt, credit: "Pexels" },
  { slug: "golden-hour", title: "Golden Hour Campaign", client: "Placeholder Fine Jewels", service: "Campaign & social", year: 2026, result: "2.1M organic reach in 3 weeks", media: { type: "image", src: images.portfolio[3].src }, alt: images.portfolio[3].alt, credit: "cottonbro studio / Pexels" },
  { slug: "kundan", title: "Kundan Heritage Story", client: "Placeholder Heritage Jewellers", service: "Product photography", year: 2025, result: "+64% saves on Instagram", media: { type: "image", src: images.portfolio[4].src }, alt: images.portfolio[4].alt, credit: "Pexels" },
  { slug: "bangles", title: "Festive Bangles Edit", client: "Placeholder Heritage Jewellers", service: "Campaign & social", year: 2025, result: "+52% festive season enquiries", media: { type: "image", src: images.portfolio[5].src }, alt: images.portfolio[5].alt, credit: "Pexels" },
  { slug: "diamond-line", title: "Diamond Line Online Store", client: "Placeholder Atelier", service: "Ecommerce shoot", year: 2025, result: "180 SKUs shot in 4 days", media: { type: "image", src: images.portfolio[6].src }, alt: images.portfolio[6].alt, credit: "Pexels" },
  { slug: "pearl", title: "Pearl Season", client: "Placeholder Gems", service: "Performance ads", year: 2024, result: "CPA cut from ₹2,400 to ₹890", media: { type: "image", src: images.portfolio[7].src }, alt: images.portfolio[7].alt, credit: "Pexels" },
];

/** Image to show for a work item (video poster, or the image itself). */
export const workStill = (w: Work) => (w.media.type === "video" ? (w.media.poster ?? "") : w.media.src);

/** The centrepiece of the hero: a real photo, shown in a round champagne frame. */
export const heroPendant = images.heroPendant;

/* --------------------------------------------------------------------------
   Services journey: each service is a stop in the scroll-driven section,
   shown with the kind of work it produces (`layout` picks how its photos are arranged).
   Photos come from lib/images.ts → images.services (files in /public/images/services/).
   -------------------------------------------------------------------------- */
export type Shot = { src: string; alt?: string; label?: string };
export type ServiceLayout = "gallery" | "reels" | "phone" | "ads" | "browser";


export const services: {
  no: string;
  title: string;
  line: string;
  layout: ServiceLayout;
  points: string[];
  result: string;
  shots: Shot[];
}[] = [
  {
    no: "01",
    title: "Jewellery photography",
    line: "Macro product, on model and lifestyle shoots, lit for metal and stone, retouched to catalogue standard.",
    layout: "gallery",
    points: ["Macro on white", "On model & lifestyle", "Hand retouching"],
    result: "+38% add to cart on product pages",
    shots: [
      { ...images.services.photography[0], label: "Solitaire · macro" },
      { ...images.services.photography[1], label: "Pear diamond" },
      { ...images.services.photography[2], label: "Two tone band" },
    ],
  },
  {
    no: "02",
    title: "Reels & campaign films",
    line: "Scroll stopping 9:16 reels, launch films and bridal stories, scripted, shot and edited in house.",
    layout: "reels",
    points: ["Concept & script", "4K / 120fps shoots", "Edit, colour & sound"],
    result: "2.1M organic reach in 3 weeks",
    shots: [
      { ...images.services.reels[0], label: "1.2M views" },
      { ...images.services.reels[1], label: "860K views" },
      { ...images.services.reels[2], label: "2.4M views" },
    ],
  },
  {
    no: "03",
    title: "Social media management",
    line: "Content calendars, community and creator collaborations that keep your feed looking like a magazine.",
    layout: "phone",
    points: ["Content calendar", "Daily posting & stories", "Community & creators"],
    result: "+3,280 followers a month",
    shots: [
      { ...images.services.social[0] },
      { ...images.services.social[1] },
      { ...images.services.social[2] },
      { ...images.services.social[3] },
      { ...images.services.social[4] },
      { ...images.services.social[5] },
      { ...images.services.social[6] },
      { ...images.services.social[7] },
      { ...images.services.social[8] },
    ],
  },
  {
    no: "04",
    title: "Performance ads",
    line: "Meta and Google campaigns built around festive and wedding seasons, measured to the rupee.",
    layout: "ads",
    points: ["Meta & Google ads", "Festive & wedding campaigns", "Weekly ROAS reports"],
    result: "4.6x return on ad spend",
    shots: [
      { ...images.services.ads[0], label: "Rose Gold Cuff" },
      { ...images.services.ads[1], label: "Festive Bangles" },
    ],
  },
  {
    no: "05",
    title: "Websites & ecommerce",
    line: "Fast Shopify and Next.js storefronts with the product pages your photography deserves.",
    layout: "browser",
    points: ["Shopify & Next.js", "Product pages that convert", "Speed & SEO"],
    result: "1.8x conversion after redesign",
    shots: [
      { ...images.services.website[0], label: "Heritage Necklace" },
      { ...images.services.website[1] },
    ],
  },
];

/* --------------------------------------------------------------------------
   The atelier: the scroll moment where one frame turns through the stages
   of the work. Each stage shows one photo (from lib/images.ts) and one line.
   -------------------------------------------------------------------------- */
export const atelier: { label: string; line: string; image: { src: string; alt: string } }[] = [
  { label: "Macro", line: "Every facet in focus, and metal in its true tone.", image: images.services.photography[0] },
  { label: "On model", line: "Pieces worn the way your customer will wear them.", image: images.portfolio[1] },
  { label: "Campaign", line: "One story across the shoot, the reel and the ads.", image: images.portfolio[3] },
  { label: "Feed", line: "Posts cut for every placement, ready to publish.", image: images.services.social[4] },
];

// Placeholder numbers: replace with your real results before going live.
export const stats = [
  { value: 140, suffix: "+", label: "Jewellery brands served" },
  { value: 38, suffix: "k", label: "Products photographed" },
  { value: 4.2, suffix: "x", label: "Average ad ROAS", decimals: 1 },
  { value: 9, suffix: "", label: "Years behind the lens" },
];

export const process = [
  { no: "01", title: "Brief & moodboard", line: "Agree on the lighting references, props and shot list before the first piece goes on set." },
  { no: "02", title: "Shoot", line: "Controlled macro studio for product, location and models for campaign. You can join live on video." },
  { no: "03", title: "Retouch & edit", line: "Dust, reflections and metal tones corrected by hand. Reels cut, coloured and sound designed in house." },
  { no: "04", title: "Launch & scale", line: "Assets cut for every placement, ads launched, and a weekly report on what is selling." },
];

// Placeholder testimonials: replace with real client quotes.
export const testimonials = [
  { quote: "Our diamonds finally look the way they do under the loupe. The first reel did more for us than a year of posting.", name: "Client Name", detail: "Founder, Placeholder Jewellers" },
  { quote: "They understand metal. Yellow gold looks warm, platinum looks cold, and nothing looks fake. That is rarer than it sounds.", name: "Client Name", detail: "Marketing Head, Placeholder Fine Jewels" },
  { quote: "Our product pages finally show the stone's true colour. The 'is this the real colour?' calls have almost stopped.", name: "Client Name", detail: "Ecommerce Lead, Placeholder Diamonds" },
];

export const faq: { q: string; a: string }[] = [
  { q: "How much does a jewellery shoot cost?", a: "Piece count, styling, retouching and the number of final images shape the quote. Include those details and your budget range in the project brief." },
  { q: "How soon can the images be ready?", a: "Add your launch date to the brief. The schedule depends on the pieces, the shot list and the retouching involved." },
  { q: "Should we send the jewellery to the studio?", a: "Include your location in the brief. Agree the shoot location, collection and return arrangements with the studio before sending any pieces." },
  { q: "Can you match our existing brand style?", a: "Yes. Include your current catalogue and visual guidelines so the moodboard can follow your colours, crops and lighting." },
  { q: "Can the shoot include models?", a: "Yes. Specify which pieces need to be worn and how the images will be used, so model casting and styling can be included in the quote." },
  { q: "Can we book social media or ads separately?", a: "Yes. Choose a single discipline in the brief, or describe the combination of content, posting and advertising you need." },
  { q: "What usage and revisions are included?", a: "List your intended placements, usage period and review rounds in the brief. Confirm those details in the quote before the shoot." },
];
