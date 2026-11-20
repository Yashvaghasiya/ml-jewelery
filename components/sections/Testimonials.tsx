"use client";

import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { site, testimonials } from "@/lib/site";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;
  const quote = testimonials[index];

  function move(direction: number) {
    setIndex(current => (current + direction + count) % count);
  }

  return (
    <section className="quote-page" aria-label="Client quotes" aria-roledescription="carousel">
      <header>
        <h2 className="edition-label">In their words</h2>
        {site.sampleContent && <span>Sample testimonial</span>}
      </header>
      <div aria-live="polite" aria-atomic="true" className="quote-paper">
        <figure key={index}>
          <blockquote>“{quote.quote}”</blockquote>
          <figcaption><strong>{quote.name}</strong><span>{quote.detail}</span></figcaption>
        </figure>
      </div>
      <div className="quote-nav">
        <button type="button" onClick={() => move(-1)} aria-label="Previous quote"><ArrowLeftIcon aria-hidden /></button>
        <div role="group" aria-label="Choose a quote">
          {testimonials.map((item, i) => (
            <button key={item.quote} type="button" aria-label={`Quote ${i + 1} of ${count}`} aria-pressed={index === i} onClick={() => setIndex(i)}>
              <span />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => move(1)} aria-label="Next quote"><ArrowRightIcon aria-hidden /></button>
      </div>
    </section>
  );
}
