"use client";

import Image from "next/image";
import { useLenis } from "lenis/react";
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef } from "react";
import { site, works, workStill, type Work } from "@/lib/site";

type Props = {
  items?: Work[];
  index: number | null;
  onIndex: (index: number) => void;
  onClose: () => void;
};

export default function WorkViewer({ items = works, index, onIndex, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const lenis = useLenis();
  const work = index === null ? undefined : items[index];
  const open = Boolean(work);

  useEffect(() => {
    const sheet = dialog.current;
    if (!open || !sheet) return;
    sheet.showModal();
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      sheet.close();
      root.style.overflow = overflow;
      lenis?.start();
    };
  }, [open, lenis]);

  function step(direction: number) {
    if (index !== null && items.length > 1) onIndex((index + direction + items.length) % items.length);
  }

  return (
    <dialog
      ref={dialog}
      className="print-viewer"
      data-lenis-prevent
      aria-label="Portfolio viewer"
      onCancel={event => { event.preventDefault(); onClose(); }}
      onKeyDown={event => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          step(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
    >
      {work && index !== null && (
        <>
          <header>
            <p className="edition-label">Selected work <span>{index + 1} / {items.length}</span></p>
            <button type="button" className="viewer-control" onClick={onClose} aria-label="Close viewer"><XIcon aria-hidden /></button>
          </header>
          <div
            className="viewer-image"
            onTouchStart={e => { start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
            onTouchEnd={e => {
              if (!start.current) return;
              const dx = e.changedTouches[0].clientX - start.current.x;
              const dy = e.changedTouches[0].clientY - start.current.y;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
              start.current = null;
            }}
            onTouchCancel={() => { start.current = null; }}
          >
            {work.media.type === "video"
              ? <video key={work.slug} src={work.media.src} poster={work.media.poster} muted playsInline controls />
              : <Image key={work.slug} src={work.media.src} alt={work.alt} fill sizes="100vw" className="object-contain" />}
          </div>
          <div className="viewer-caption">
            <div aria-live="polite">
              <p className="edition-label">{work.service}{!site.sampleContent && ` · ${work.year}`}</p>
              <h3>{work.title}</h3>
              {work.credit && <p>Reference photograph · {work.credit}</p>}
              {!site.sampleContent && <p>{work.client}</p>}
              {!site.sampleContent && <p className="viewer-result">{work.result}</p>}
            </div>
            {items.length > 1 && (
              <div className="viewer-nav">
                <button type="button" className="viewer-control" onClick={() => step(-1)} aria-label="Previous project"><ArrowLeftIcon aria-hidden /></button>
                <div className="viewer-thumbs" role="group" aria-label="Choose a project">
                  {items.map((item, i) => (
                    <button key={item.slug} type="button" aria-label={`Show ${item.title}`} aria-pressed={i === index} onClick={() => onIndex(i)}>
                      <Image src={workStill(item)} alt="" fill sizes="48px" className="object-cover" />
                    </button>
                  ))}
                </div>
                <button type="button" className="viewer-control" onClick={() => step(1)} aria-label="Next project"><ArrowRightIcon aria-hidden /></button>
              </div>
            )}
          </div>
        </>
      )}
    </dialog>
  );
}
