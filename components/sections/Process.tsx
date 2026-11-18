import { process } from "@/lib/site";
import { MaskLines, Reveal, SectionLabel } from "@/components/ui/Reveal";

/** Four steps as soft, hairline cards on the paper canvas (Oura feature cards). */
export default function Process() {
  return (
    <section id="process" data-header="light" className="section border-t border-line-light text-ink">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel no="04">Process</SectionLabel>
            <h2 className="display display-xl mt-6">
              <MaskLines lines={["From brief", "to bestseller."]} />
            </h2>
          </div>
          <p className="max-w-sm text-lg text-taupe lg:col-span-4 lg:col-start-9">
            Four steps, one point of contact, and a shared folder you can see from day one.
          </p>
        </div>

        <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal
              as="li"
              key={p.no}
              delay={i * 0.06}
              className="flex min-h-80 flex-col justify-between rounded-4xl border border-line-light p-8 transition-colors duration-300 hover:border-ink/30"
            >
              <span className="display text-7xl leading-none text-taupe tabular-nums">{p.no}</span>
              <div className="mt-12">
                <h3 className="display text-4xl">{p.title}</h3>
                <p className="mt-4 text-base text-taupe">{p.line}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
