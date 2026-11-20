import Image from "next/image";
import type { StudyFrame } from "@/lib/kundan-study";

export default function StudyFigure({ frame, className = "", sizes, preload = false }: {
  frame: StudyFrame;
  className?: string;
  sizes: string;
  preload?: boolean;
}) {
  return (
    <figure className={`study-figure ${className}`}>
      <div className="study-image">
        <Image src={frame.src} alt={frame.alt} fill sizes={sizes} preload={preload}
          className="object-cover" style={{ objectPosition: frame.position }} />
      </div>
      <figcaption className="study-caption">
        <span>{frame.label}</span>
        {frame.reference && <small>Reference · Pexels</small>}
      </figcaption>
    </figure>
  );
}
