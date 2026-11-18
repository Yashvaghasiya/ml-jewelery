/* ==========================================================================
   ALL WEBSITE IMAGES — change photos here.

   EASY WAY (no code): every image is a file in /public/images/. To change one,
   upload your photo with the SAME file name and it replaces the old one.
     public/images/hero/pendant.webp        → round photo in the middle of the hero
     public/images/portfolio/01.webp … 08   → photos turning around the pendant
                                               (and the full-screen work viewer)
     public/images/services/…               → photos beside each service

   If your photo is a .jpg or .png, either rename the file, or change ".webp"
   to ".jpg"/".png" on that line below. Also update `alt` (a short description
   of the photo, read by Google and screen readers).

   Best sizes: hero pendant SQUARE (1:1, at least 800×800, piece in the centre).
   Portfolio and services: any shape, about 1600–2000px on the long side.
   ========================================================================== */

export type Img = { src: string; alt: string };

export const images = {
  /** Hero: the round photo in the centre (square photo, piece centred). */
  heroPendant: { src: "/images/hero/pendant.webp", alt: "Emerald and diamond flower pendant" } as Img,

  /** Portfolio: 8 photos around the pendant, in this order (01 at the top, then clockwise).
      Titles, clients and results for each are in lib/site.ts → works. */
  portfolio: [
    { src: "/images/portfolio/01.webp", alt: "Diamond solitaire ring on a dark stand" }, // 01 · The Solitaire Edit
    { src: "/images/portfolio/02.webp", alt: "Bride in red with kundan necklace, nath and maang tikka" }, // 02 · Nisha Bridal Reels
    { src: "/images/portfolio/03.webp", alt: "Rose gold diamond drop earrings on blue paper" }, // 03 · Rose Gold Edit
    { src: "/images/portfolio/04.webp", alt: "Woman in window light wearing a gold collar necklace" }, // 04 · Golden Hour Campaign
    { src: "/images/portfolio/05.webp", alt: "Kundan choker and maang tikka with red and green stones" }, // 05 · Kundan Heritage Story
    { src: "/images/portfolio/06.webp", alt: "Hands wearing layered gold bracelets" }, // 06 · Festive Bangles Edit
    { src: "/images/portfolio/07.webp", alt: "Diamond necklace, bracelet, ring and earrings set on pale blue" }, // 07 · Diamond Line Online Store
    { src: "/images/portfolio/08.webp", alt: "Pearl necklace and earrings in an open jewellery box" }, // 08 · Pearl Season
  ] as Img[],

  /** Photos shown beside each service in the "Services & work" section. */
  services: {
    // Jewellery photography: 3 photos
    photography: [
      { src: "/images/services/photography-1.webp", alt: "Solitaire · macro" },
      { src: "/images/services/photography-2.webp", alt: "Pear diamond" },
      { src: "/images/services/photography-3.webp", alt: "Two tone band" },
    ] as Img[],
    // Reels & campaign films: 3 phone screens
    reels: [
      { src: "/images/services/reels-1.webp", alt: "1.2M views" },
      { src: "/images/services/reels-2.webp", alt: "860K views" },
      { src: "/images/services/reels-3.webp", alt: "2.4M views" },
    ] as Img[],
    // Social media: 9 photos in the phone feed
    social: [
      { src: "/images/services/social-1.webp", alt: "social photo" },
      { src: "/images/services/social-2.webp", alt: "social photo" },
      { src: "/images/services/social-3.webp", alt: "social photo" },
      { src: "/images/services/social-4.webp", alt: "social photo" },
      { src: "/images/services/social-5.webp", alt: "social photo" },
      { src: "/images/services/social-6.webp", alt: "social photo" },
      { src: "/images/services/social-7.webp", alt: "social photo" },
      { src: "/images/services/social-8.webp", alt: "social photo" },
      { src: "/images/services/social-9.webp", alt: "social photo" },
    ] as Img[],
    // Performance ads: 2 ad cards
    ads: [
      { src: "/images/services/ads-1.webp", alt: "Rose Gold Cuff" },
      { src: "/images/services/ads-2.webp", alt: "Festive Bangles" },
    ] as Img[],
    // Websites: 1 = big browser photo, 2 = phone photo
    website: [
      { src: "/images/services/website-1.webp", alt: "Heritage Necklace" },
      { src: "/images/services/website-2.webp", alt: "website photo" },
    ] as Img[],
  },
};
