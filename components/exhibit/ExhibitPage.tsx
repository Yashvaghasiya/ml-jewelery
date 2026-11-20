"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { site, waLink, works, services, atelier, stats, process, testimonials, workStill, type Work } from "@/lib/site";
import HeroStage from "./HeroStage";

/* Shared scroll-in hook: adds data-in="1" once the element enters view. */
function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { el.setAttribute("data-in", "1"); io.disconnect(); }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", delay = 0, as: Tag = "div", style }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "h2" | "p" | "figure"; style?: React.CSSProperties }) {
  const ref = useInViewOnce<HTMLDivElement>();
  return (
    <Tag ref={ref as never} className={`vx-reveal ${className}`} style={{ ...style, ["--vx-delay" as string]: `${delay}ms` }} data-in="0">
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ hero */
const chapters = [
  { no: "01", label: "The Collection", href: "#exhibits" },
  { no: "02", label: "Statement", href: "#statement" },
  { no: "03", label: "Inside the Atelier", href: "#atelier" },
  { no: "04", label: "Disciplines", href: "#disciplines" },
  { no: "05", label: "Results", href: "#results" },
  { no: "06", label: "Process", href: "#process" },
  { no: "07", label: "Private Viewing", href: "#viewing" },
];

/* -------------------------------------------------------------- gallery */
function Gallery() {
  const railRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    const rail = railRef.current;
    if (!rail) return;
    drag.current = { x: e.clientX, left: rail.scrollLeft };
    rail.classList.add("is-drag");
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const rail = railRef.current;
    if (!rail || !drag.current) return;
    rail.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const endDrag = () => {
    drag.current = null;
    railRef.current?.classList.remove("is-drag");
  };
  const onKey = (e: React.KeyboardEvent) => {
    const rail = railRef.current;
    if (!rail) return;
    if (e.key === "ArrowRight") rail.scrollBy({ left: rail.clientWidth * 0.7, behavior: "smooth" });
    if (e.key === "ArrowLeft") rail.scrollBy({ left: -rail.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section className="vx-section" id="exhibits" aria-labelledby="exhibits-title">
      <div className="vx-gallery">
        <div>
          <Reveal>
            <p className="vx-eyebrow">The Collection — 8 Exhibits</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="vx-serif" id="exhibits-title" style={{ fontSize: "clamp(1.9rem,3.6vw,3rem)", marginTop: 16, lineHeight: 1.1 }}>
              Recent work, hung in order.
            </h2>
          </Reveal>
          <Reveal as="p" delay={140} style={{ color: "var(--vx-ink-dim)", marginTop: 14, maxWidth: "34ch" }}>
            Drag the rail, or use the arrow keys. Every plate carries the campaign's result.
          </Reveal>
        </div>
        <div
          ref={railRef}
          className="vx-gallery-rail"
          role="region"
          aria-label="Exhibit gallery, scrolls sideways"
          tabIndex={0}
          onKeyDown={onKey}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          {works.map((w: Work, i: number) => (
            <article className="vx-exhibit" key={w.slug}>
              <figure>
                <img src={workStill(w)} alt={w.alt} width={860} height={1075} loading={i < 3 ? "eager" : "lazy"} draggable={false} />
              </figure>
              <div className="vx-plate plate">
                <span className="no">EXHIBIT {String(i + 1).padStart(2, "0")}</span>
                <h3 className="vx-serif">{w.title}</h3>
                <p>
                  {w.client} · {w.service} · {w.year}
                </p>
                <p style={{ color: "var(--vx-gold)" }}>
                  {w.result}
                  {site.sampleContent ? " · Sample" : ""}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- atelier */
function Atelier() {
  const [on, setOn] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setOn(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="vx-section" id="atelier" aria-labelledby="atelier-title">
      <Reveal>
        <p className="vx-eyebrow">Inside the Atelier</p>
      </Reveal>
      <Reveal delay={60}>
        <h2 className="vx-serif" id="atelier-title" style={{ fontSize: "clamp(1.9rem,3.6vw,3rem)", margin: "16px 0 40px", lineHeight: 1.1, maxWidth: "20ch" }}>
          One frame, four lives.
        </h2>
      </Reveal>
      <div className="vx-atelier">
        <div className="vx-atelier-viewer" aria-live="polite">
          <div className="frame">
            {atelier.map((s, i) => (
              <img key={s.label} src={s.image.src} alt={s.image.alt} width={1000} height={1000} data-on={i === on ? "1" : "0"} loading={i === 0 ? "eager" : "lazy"} />
            ))}
          </div>
          <p style={{ marginTop: 12, fontSize: "0.8125rem", color: "var(--vx-ink-dim)" }}>
            {atelier[on]?.label} — stage {on + 1} of {atelier.length}
          </p>
        </div>
        <div className="vx-atelier-steps">
          {atelier.map((s, i) => (
            <div key={s.label} className="vx-atelier-step" data-i={i} ref={(el) => { stepRefs.current[i] = el; }}>
              <p className="step-no">{String(i + 1).padStart(2, "0")} / {s.label}</p>
              <h3 className="vx-serif">{s.label}</h3>
              <p>{s.line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- index */
function ServiceIndex() {
  const [open, setOpen] = useState(0);
  return (
    <section className="vx-section" id="disciplines" aria-labelledby="disciplines-title">
      <Reveal>
        <p className="vx-eyebrow">Disciplines — an Index</p>
      </Reveal>
      <Reveal delay={60}>
        <h2 className="vx-serif" id="disciplines-title" style={{ fontSize: "clamp(1.9rem,3.6vw,3rem)", margin: "16px 0 40px", lineHeight: 1.1, maxWidth: "24ch" }}>
          Five ways we make you impossible to scroll past.
        </h2>
      </Reveal>
      <div className="vx-index">
        {services.map((s, i) => (
          <div key={s.no}>
            <button
              className="vx-index-row"
              aria-expanded={open === i}
              aria-controls={`disc-${i}`}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <span className="no">{s.no}</span>
              <h3 className="vx-serif">{s.title}</h3>
              <span className="result">{s.result}</span>
            </button>
            <div className="vx-index-preview" id={`disc-${i}`} data-open={open === i ? "1" : "0"} hidden={open !== i}>
              <div className="vx-index-preview-inner">
                {s.shots.map((shot, j) => (
                  <img key={j} src={shot.src} alt={shot.alt ?? shot.label ?? s.title} loading="lazy" width={480} height={600} />
                ))}
              </div>
              <p style={{ padding: "0 4px 28px", color: "var(--vx-ink-dim)", maxWidth: "52ch" }}>{s.line}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- results */
function Counter({ value, suffix, decimals }: { value: number; suffix: string; decimals?: number }) {
  const ref = useInViewOnce<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1400);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(value * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [ref, value]);
  return <span ref={ref}>{n.toFixed(decimals ?? 0)}<span>{suffix}</span></span>;
}

function Results() {
  return (
    <section className="vx-section" id="results" aria-labelledby="results-title" style={{ paddingBottom: 0 }}>
      <Reveal>
        <p className="vx-eyebrow">Results — Engraved Plates</p>
      </Reveal>
      <Reveal delay={60}>
        <h2 className="vx-serif" id="results-title" style={{ fontSize: "clamp(1.9rem,3.6vw,3rem)", margin: "16px 0 40px", lineHeight: 1.1, maxWidth: "24ch" }}>
          Numbers, cut into brass.
        </h2>
      </Reveal>
      <div className="vx-plates">
        {stats.map((s) => (
          <div className="vx-plate-cell" key={s.label}>
            <p className="num"><Counter value={s.value} suffix={s.suffix} decimals={s.decimals} /></p>
            <p className="lbl">{s.label}</p>
            {site.sampleContent && <span className="sample">Sample</span>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- process */
function Process() {
  return (
    <section className="vx-section" id="process" aria-labelledby="process-title">
      <Reveal>
        <p className="vx-eyebrow" style={{ justifyContent: "center" }}>Process — Four Chapters</p>
      </Reveal>
      <Reveal delay={60}>
        <h2 className="vx-serif" id="process-title" style={{ fontSize: "clamp(1.9rem,3.6vw,3rem)", margin: "16px auto 56px", lineHeight: 1.1, textAlign: "center", maxWidth: "22ch" }}>
          From brief to booked-out season.
        </h2>
      </Reveal>
      <div className="vx-process">
        {process.map((p) => (
          <Reveal className="vx-chapter" key={p.no}>
            <p className="no">CHAPTER {p.no}</p>
            <h3>{p.title}</h3>
            <p>{p.line}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- quotes */
function Quotes() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  return (
    <section className="vx-section" aria-labelledby="quotes-title">
      <div className="vx-quote">
        <Reveal>
          <p className="vx-eyebrow" style={{ justifyContent: "center" }}>From the Guest Book</p>
        </Reveal>
        <blockquote className="vx-serif" aria-live="polite">{t.quote}</blockquote>
        <p className="who">
          <b>{t.name}</b> — {t.detail}
          {site.sampleContent ? " · Sample" : ""}
        </p>
        <div className="vx-quote-dots" role="group" aria-label="Choose a client quote">
          {testimonials.map((_, j) => (
            <button key={j} aria-pressed={j === i} aria-label={`Quote ${j + 1} of ${testimonials.length}`} onClick={() => setI(j)} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- closing */
function Closing() {
  const wa = waLink("Hello Verdane — I saw the exhibit. I'd like to commission a piece of work.");
  return (
    <section className="vx-closing" id="viewing" aria-labelledby="closing-title">
      <Reveal>
        <p className="vx-eyebrow" style={{ justifyContent: "center" }}>Private Viewing</p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="vx-serif" id="closing-title">
          The next exhibit could be <em>yours.</em>
        </h2>
      </Reveal>
      <Reveal delay={160}>
        <a className="gold-cta" href={wa} target="_blank" rel="noopener noreferrer">Commission a Piece →</a>
      </Reveal>
      <Reveal as="p" delay={220} className="vx-colophon">
        Verdane Studio · {site.address.join(", ") || site.city} · Since {site.since}
        <br />
        <a href="/" style={{ color: "var(--vx-ink-dim)" }}>← The ivory edition</a>
      </Reveal>
    </section>
  );
}

/* ----------------------------------------------------------------- page */
export default function ExhibitPage() {
  return (
    <div className="vx">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-[#B8975A] focus:px-4 focus:py-2 focus:text-sm focus:text-black">
        Skip to content
      </a>
      <div className="vx-topbar">
        <a className="brand" href="/exhibit">Verdane — The Exhibit</a>
        <nav aria-label="Site">
          {chapters.slice(0, 5).map((c) => (
            <a key={c.no} href={c.href}>{c.label}</a>
          ))}
        </nav>
      </div>
      <main id="main">
        <HeroStage chapters={chapters} />
        <Gallery />
        <Atelier />
        <ServiceIndex />
        <Results />
        <Process />
        <Quotes />
        <Closing />
      </main>
      <footer className="vx-footer">
        <span>© {new Date().getFullYear()} {site.brand} Studio</span>
        <span>{site.descriptor} · {site.city}</span>
        <a href="/">Ivory edition</a>
      </footer>
      <a className="vx-cta-fixed" href={waLink("Hello Verdane — I'd like to commission a piece of work.")} target="_blank" rel="noopener noreferrer">
        Commission a Piece
      </a>
    </div>
  );
}
