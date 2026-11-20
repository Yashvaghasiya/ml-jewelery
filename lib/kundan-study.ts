import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { images, type Img } from "./images";

export const studyPath = "/work/kundan-in-window-light";
const publicPath = "/images/studies/kundan";
const directory = join(process.cwd(), "public", publicPath);

export type StudyFrame = Img & {
  label: string;
  reference: boolean;
  position: string;
};

const subjects = {
  detail: {
    label: "Setting detail", alt: "Close view of the Kundan setting",
    reference: images.portfolio[4], position: "50% 48%",
  },
  portrait: {
    label: "On model", alt: "Portrait with Kundan jewellery",
    reference: images.portfolio[1], position: "50% 32%",
  },
  "still-life": {
    label: "Still life", alt: "The jewellery arranged as a still life",
    reference: images.portfolio[4], position: "50% 54%",
  },
};

function uploaded(name: string) {
  for (const ext of ["webp", "jpg", "jpeg", "png", "avif"]) {
    const file = name + "." + ext;
    const path = join(directory, file);
    if (existsSync(path)) {
      // A replacement with the same filename also gets a fresh image-optimizer cache key.
      const version = createHash("sha256").update(readFileSync(path)).digest("hex").slice(0, 12);
      return publicPath + "/" + file + "?v=" + version;
    }
  }
  return null;
}

function frame(name: keyof typeof subjects): StudyFrame {
  const subject = subjects[name];
  const src = uploaded(name);
  return {
    label: subject.label,
    src: src ?? subject.reference.src,
    alt: src ? subject.alt : subject.reference.alt,
    position: src ? "50% 50%" : subject.position,
    reference: !src,
  };
}

export function getKundanStudy() {
  return {
    detail: frame("detail"),
    portrait: frame("portrait"),
    still: frame("still-life"),
    setup: uploaded("setup"),
  };
}
export type KundanStudy = ReturnType<typeof getKundanStudy>;
