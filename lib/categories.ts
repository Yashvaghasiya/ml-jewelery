import data from "./categories-data.json";

export type CategoryImage = { src: string; alt: string; credit: string };
export type Category = { slug: string; name: string; blurb: string; images: CategoryImage[] };

export const categories = data as Category[];

/** Flat list of the category names, for pickers and meta descriptions. */
export const categoryNames = categories.map((c) => c.name);
