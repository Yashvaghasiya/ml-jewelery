"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PlayIcon, TrendUpIcon } from "@phosphor-icons/react/dist/ssr";
import { services, type ServiceLayout, type Shot } from "@/lib/site";
import { EASE_LUXE, MaskLines, SectionLabel } from "@/components/ui/Reveal";
import { SampleTag } from "@/components/ui/Sample";
import WorkImage from "@/components/ui/WorkImage";

/**
 * Services as editorial chapters with quiet, weighted scroll motion
 * (transform and opacity only, base curve, once per element):
 * - photos are unveiled upward and settle from a slight zoom, then drift with the scroll;
 * - in two column layouts the second column moves at its own pace, for depth;
 * - the social feed arrives as a diagonal wave;
 * - titles rise from a mask, and a hairline under each label fills as you read;
 * - the pill tabs float at the top of the section and mark the current chapter.
 * With reduced motion, everything simply fades in and nothing drifts.
 */

type Ctx = { progress: MotionValue<number>; reduced: boolean };

/** A photo that is unveiled once, settles from a 1.15 zoom, then drifts slightly inside its frame. */
function Photo({ shot, ratio, sizes, delay = 0, ctx }: { shot: Shot; ratio: string; sizes: string; delay?: number; ctx: Ctx }) {
  const y = useTransform(ctx.progress, [0, 1], ctx.reduced ? ["0%", "0%"] : ["-5%", "5%"]);
  return (
    <div className={`group relative overflow-hidden rounded-3xl bg-cream ${ratio}`}>
      <motion.div className="absolute inset-x-0 -top-[7%] -bottom-[7%]" style={{ y }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.6, ease: EASE_LUXE, delay }}
        >
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]">
            <WorkImage src={shot.src} alt={shot.alt ?? shot.label ?? ""} sizes={sizes} />
          </div>
        </motion.div>
      </motion.div>
      {/* The veil: a sheet of page colour that lifts away upward */}
      <motion.div
        className="pointer-events-none absolute inset-0 origin-top bg-ivory"
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.1, ease: EASE_LUXE, delay }}
        aria-hidden
      />
    </div>
  );
}

/** Moves a column at its own pace across the chapter (px from start to end). */
function useDrift(ctx: Ctx, from: number, to: number) {
  return useTransform(ctx.progress, [0, 1], ctx.reduced ? [0, 0] : [from, to]);
}

const Caption = ({ children }: { children: React.ReactNode }) => (
  <figcaption className="mt-3 flex items-center gap-2 text-xs text-taupe">{children}</figcaption>
);

function TwoUp({ shots, ctx, lead }: { shots: Shot[]; ctx: Ctx; lead?: boolean }) {
  const drift = useDrift(ctx, 64, -64);
  return (
    <div className="grid grid-cols-2 gap-4">
      {shots.map((s, i) => {
        const wide = lead && i === 0;
        const late = lead ? i === 2 : i === 1;
        return (
          <motion.figure key={s.src} className={wide ? "col-span-2" : ""} style={late ? { y: drift } : undefined}>
            <Photo
              shot={s}
              ctx={ctx}
              delay={i * 0.12}
              ratio={wide ? "aspect-[16/10]" : "aspect-[4/5]"}
              sizes={wide ? "(min-width: 1024px) 55vw, 92vw" : "(min-width: 1024px) 27vw, 46vw"}
            />
            {s.label && <Caption>{s.label}</Caption>}
          </motion.figure>
        );
      })}
    </div>
  );
}

function Reels({ shots, ctx }: { shots: Shot[]; ctx: Ctx }) {
  const middle = useDrift(ctx, 72, -72);
  const sides = useDrift(ctx, -16, 16);
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {shots.map((s, i) => (
        <motion.figure key={s.src} style={{ y: i === 1 ? middle : sides }}>
          <div className="relative">
            <Photo shot={s} ctx={ctx} delay={[0.12, 0, 0.24][i] ?? 0} ratio="aspect-[9/16]" sizes="(min-width: 1024px) 18vw, 30vw" />
            <span className="pointer-events-none absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory/70 text-ink backdrop-blur-md" aria-hidden>
              <PlayIcon weight="fill" className="ml-0.5 h-4 w-4" />
            </span>
          </div>
          {s.label && (
            <Caption>
              {s.label}
              <SampleTag />
            </Caption>
          )}
        </motion.figure>
      ))}
    </div>
  );
}

/** A brand feed: nine posts arriving as a diagonal wave, like a profile filling up. */
function Feed({ shots, ctx }: { shots: Shot[]; ctx: Ctx }) {
  return (
    <motion.div
      className="grid grid-cols-3 gap-1 overflow-hidden rounded-3xl"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {shots.map((s, i) => {
        const wave = (Math.floor(i / 3) + (i % 3)) * 0.08;
        return (
          <motion.div
            key={s.src}
            className="relative aspect-square overflow-hidden bg-cream"
            variants={{
              hidden: { opacity: 0, scale: 0.92 },
              show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE_LUXE, delay: wave } },
            }}
          >
            <WorkImage src={s.src} alt={s.alt ?? s.label ?? ""} sizes="(min-width: 1024px) 18vw, 30vw" />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function Gallery({ layout, shots, ctx }: { layout: ServiceLayout; shots: Shot[]; ctx: Ctx }) {
  switch (layout) {
    case "gallery":
      return <TwoUp shots={shots} ctx={ctx} lead />;
    case "reels":
      return <Reels shots={shots} ctx={ctx} />;
    case "phone":
      return <Feed shots={shots} ctx={ctx} />;
    case "ads":
    case "browser":
      return <TwoUp shots={shots} ctx={ctx} />;
  }
}

// Transforms are skipped for reduced motion users by <MotionConfig reducedMotion="user">; opacity still fades.
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.8, ease: EASE_LUXE, delay },
});

function Chapter({ svc, total, reduced }: { svc: (typeof services)[number]; total: string; reduced: boolean }) {
  const ref = useRef<HTMLElement>(null);
  // Drift runs while the chapter crosses the screen; the reading line fills from centre to centre.
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const { scrollYProgress: reading } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const ctx = { progress, reduced };

  return (
    <article ref={ref} id={`service-${svc.no}`} className="grid scroll-mt-40 gap-10 border-t border-line-light py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-40">
          <div className="flex items-center gap-4">
            <p className="label text-taupe tabular-nums">
              {svc.no} / {total}
            </p>
            <span className="relative h-px w-24 overflow-hidden bg-line-light" aria-hidden>
              <motion.span className="absolute inset-0 origin-left bg-ink" style={{ scaleX: reduced ? 1 : reading }} />
            </span>
          </div>
          <h3 className="display display-md mt-4">
            <MaskLines lines={[svc.title]} />
          </h3>
          <motion.p className="mt-6 max-w-sm text-base text-taupe" {...rise(0.15)}>
            {svc.line}
          </motion.p>
          <ul className="mt-8 space-y-3 text-sm">
            {svc.points.map((p, i) => (
              <motion.li key={p} className="flex items-center gap-3" {...rise(0.25 + i * 0.07)}>
                <span className="h-px w-4 bg-champagne-deep" aria-hidden />
                {p}
              </motion.li>
            ))}
          </ul>
          <motion.p
            className="mt-8 inline-flex flex-wrap items-center gap-2 rounded-full border border-line-light py-2 pr-2 pl-4 text-sm font-semibold"
            {...rise(0.5)}
          >
            <TrendUpIcon weight="bold" className="h-4 w-4 text-taupe" aria-hidden />
            {svc.result}
            <SampleTag />
          </motion.p>
        </div>
      </div>

      <div className="lg:col-span-7 lg:col-start-6">
        <Gallery layout={svc.layout} shots={svc.shots} ctx={ctx} />
      </div>
    </article>
  );
}

/** Floating pill tabs that mark the chapter in view, and keep it visible on small screens. */
function ChapterTabs() {
  const [active, setActive] = useState<string | null>(null);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    services.forEach((s) => {
      const el = document.getElementById(`service-${s.no}`);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // On narrow screens the row scrolls sideways: bring the current tab into view (the bar only, never the page).
  useEffect(() => {
    const nav = bar.current;
    const tab = nav?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!nav || !tab) return;
    nav.scrollTo({ left: tab.offsetLeft - nav.clientWidth / 2 + tab.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <div className="sticky top-20 z-30 mt-12 flex">
      <nav
        ref={bar}
        aria-label="Services"
        className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border border-line-light bg-ivory/80 p-1.5 backdrop-blur-xl"
      >
        {services.map((svc) => {
          const current = active === `service-${svc.no}`;
          return (
            <a key={svc.no} href={`#service-${svc.no}`} aria-current={current ? "true" : undefined} className="chip shrink-0 border-transparent whitespace-nowrap">
              <span className={`text-xs tabular-nums ${current ? "text-greige" : "text-taupe"}`}>{svc.no}</span>
              {svc.title}
            </a>
          );
        })}
      </nav>
    </div>
  );
}

export default function ServiceJourney() {
  // Scroll-linked drift is not covered by MotionConfig, so it reads the setting itself (after mount, to match the server render).
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  const total = String(services.length).padStart(2, "0");
  return (
    <section id="services" data-header="light" className="section border-t border-line-light text-ink">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel no="02">Services &amp; work</SectionLabel>
            <h2 className="display display-xl mt-6">
              <MaskLines lines={["Everything a jewellery", <>brand needs to be <em className="text-taupe">seen.</em></>]} />
            </h2>
          </div>
          <motion.p className="max-w-sm text-lg text-taupe lg:col-span-4 lg:col-start-9" {...rise(0.2)}>
            Five services, one studio. Each comes with the kind of work it delivers.
          </motion.p>
        </div>

        <ChapterTabs />

        <div className="mt-16">
          {services.map((svc) => (
            <Chapter key={svc.no} svc={svc} total={total} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}
