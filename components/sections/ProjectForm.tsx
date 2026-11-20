"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { briefChannel, services, site, waLink } from "@/lib/site";
import { ArrowRightIcon, CaretDownIcon } from "@phosphor-icons/react/dist/ssr";

const BUDGETS = ["Under ₹50k", "₹50k to ₹2L", "₹2L to ₹5L", "₹5L+"];

type Errors = Partial<Record<"name" | "phone", string>>;

const inputCls =
  "peer w-full border-0 border-b border-ink/20 bg-transparent px-0 pt-6 pb-3 text-base text-ink placeholder-transparent transition-colors focus:border-ink focus:ring-0 focus:outline-none aria-[invalid=true]:border-[#9e2f3b]";
const labelCls =
  "pointer-events-none absolute top-0 left-0 text-xs font-semibold tracking-[0.14em] text-taupe uppercase transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:tracking-[0.14em] peer-focus:uppercase";

function Field({ id, label, error, ...rest }: { id: string; label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <input id={id} name={id} placeholder={label} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={inputCls} {...rest} />
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      {error && (
        <p id={`${id}-err`} className="mt-2 text-sm text-[#9e2f3b]">
          {error}
        </p>
      )}
    </div>
  );
}

/** The project brief form. `?service=` deep links prefill the service. */
export default function ProjectForm() {
  return (
    <Suspense fallback={<div className="min-h-[560px] border-t border-ink" aria-hidden />}>
      <BriefForm />
    </Suspense>
  );
}

function BriefForm() {
  const params = useSearchParams();
  const preset = params.get("service");
  const presetService = services.some((s) => s.title === preset) ? (preset as string) : services[0].title;
  const [errors, setErrors] = useState<Errors>({});
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [prepared, setPrepared] = useState(false);

  function validate(form: HTMLFormElement) {
    const d = new FormData(form);
    const e: Errors = {};
    if (String(d.get("name") ?? "").trim().length < 2) e.name = "Please tell us your name.";
    const number = String(d.get("phone") ?? "").trim();
    const digits = number.replace(/\D/g, "");
    if ((number || briefChannel === "WhatsApp") && (digits.length < 7 || digits.length > 15)) {
      e.phone = "Enter a phone number with 7 to 15 digits, including your country code.";
    }
    return e;
  }

  return (
    <form
      noValidate
      className="grid gap-9 border-t border-ink pt-8"
      onSubmit={(ev) => {
        ev.preventDefault();
        const form = ev.currentTarget;
        const e = validate(form);
        setErrors(e);
        if (Object.keys(e).length) {
          form.querySelector<HTMLInputElement>(`#${Object.keys(e)[0]}`)?.focus();
          return;
        }
        const d = Object.fromEntries(new FormData(form)) as Record<string, string>;
        const brief = [
          `New project enquiry for ${site.brand} Studio`,
          `Name: ${d.name}`,
          d.brand && `Brand: ${d.brand}`,
          d.phone && `Phone: ${d.phone}`,
          `Service: ${d.service}`,
          `Budget: ${budget}`,
          d.message && `Brief: ${d.message}`,
        ]
          .filter(Boolean)
          .join("\n");
        if (briefChannel === "WhatsApp") {
          window.open(waLink(brief), "_blank", "noopener");
        } else if (briefChannel === "email") {
          window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Project enquiry for " + site.brand)}&body=${encodeURIComponent(brief)}`;
        } else {
          const url = URL.createObjectURL(new Blob([brief + "\n"], { type: "text/plain;charset=utf-8" }));
          const link = document.createElement("a");
          link.href = url;
          link.download = "verdane-project-brief.txt";
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
        setPrepared(true);
      }}
      onInput={(ev) => {
        setPrepared(false);
        if (Object.keys(errors).length) setErrors(validate(ev.currentTarget));
      }}
    >
      <div className="grid gap-9 sm:grid-cols-2">
        <Field id="name" label="Your name" autoComplete="name" required error={errors.name} />
        <Field id="brand" label="Brand / store (optional)" autoComplete="organization" />
      </div>
      <Field id="phone" label={briefChannel === "WhatsApp" ? "Mobile / WhatsApp" : "Phone (optional)"} type="tel" inputMode="tel" autoComplete="tel" required={briefChannel === "WhatsApp"} error={errors.phone} />

      <div className="relative">
        <select id="service" name="service" key={presetService} defaultValue={presetService} className={`${inputCls} appearance-none pr-8`}>
          {services.map((s) => (
            <option key={s.no}>{s.title}</option>
          ))}
          <option>Not sure yet</option>
        </select>
        <label htmlFor="service" className="label absolute top-0 left-0 text-taupe">
          What do you need?
        </label>
        <CaretDownIcon className="pointer-events-none absolute right-0 bottom-4 h-4 w-4 text-taupe" aria-hidden />
      </div>

      <fieldset>
        <legend className="label text-taupe">Budget</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <label
              key={b}
              className={`flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ink ${
                budget === b ? "border-ink bg-ink text-ivory" : "border-ink/20 text-ink/80 hover:border-ink/60"
              }`}
            >
              <input type="radio" name="budget" value={b} checked={budget === b} onChange={() => setBudget(b)} className="sr-only" />
              {b}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="relative">
        <textarea id="message" name="message" rows={3} placeholder="Tell us about the launch" className={`${inputCls} resize-none`} />
        <label htmlFor="message" className={labelCls}>
          Tell us about the launch (optional)
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="btn btn-primary">
          {briefChannel === "download" ? "Download project brief" : `Open brief in ${briefChannel}`}
          <ArrowRightIcon weight="bold" className="h-4 w-4" aria-hidden />
        </button>
        <p role="status" className="text-sm text-taupe">
          {briefChannel === "download"
            ? (prepared ? "Your text file is ready to save." : "Save a text copy on your device to share when ready.")
            : (prepared ? `Send your prepared brief from ${briefChannel}.` : `Review your brief in ${briefChannel} before sending.`)}
        </p>
      </div>
    </form>
  );
}
