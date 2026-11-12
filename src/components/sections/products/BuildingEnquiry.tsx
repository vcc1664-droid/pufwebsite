"use client";

import type { FormEvent } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTACT_EMAIL } from "@/components/sections/contact/ContactForm";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";

type Field = {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  /** Taller box, as in the design. */
  multiline?: boolean;
};

const FIELDS: Field[] = [
  { name: "name", label: "Name", autoComplete: "name", required: true },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", required: true },
  { name: "location", label: "Project location", multiline: true },
  { name: "use", label: "Use: cold store, pharma, data centre, other", multiline: true },
  { name: "area", label: "Approximate area" },
  { name: "temperature", label: "Operating temperature" },
];

const control =
  "w-full rounded-[max(8px,0.6cqw)] border border-[#d6d4cc] bg-[#faf9f6] px-[max(16px,1.65cqw)] py-[max(12px,1cqw)] font-ui text-[max(16px,1.5cqw)] leading-snug text-black placeholder:text-[#7a7a7a] transition-colors duration-200 outline-none focus:border-[#14213d]";

/**
 * Short project brief for a panel recommendation. The site's /api/enquiry needs an email address,
 * which this form (per the design) doesn't ask for, so it opens the visitor's mail app pre-filled.
 */
/* Sizes (lg+) are cqw of the content width, measured from the design. */
export function BuildingEnquiry() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = FIELDS.map((field) => `${field.label.split(":")[0]}: ${String(data.get(field.name) ?? "").trim()}`).join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Panel recommendation request")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        <Reveal>
          <h2 className="text-[max(26px,2.4cqw)] leading-tight font-bold tracking-[-0.01em] text-[#14213d]">
            Tell us about your building
          </h2>
          <p className="mt-4 font-ui text-[max(16px,1.5cqw)] leading-[1.5] text-[#3e3e3e] lg:mt-[2cqw]">
            Share the basics and our team will come back with a panel recommendation.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={handleSubmit} className="mt-6 lg:mt-[1.7cqw]">
            <div className="grid gap-4 sm:grid-cols-2 lg:gap-x-[1.65cqw] lg:gap-y-[1.6cqw]">
              {FIELDS.map((field) => (
                <label key={field.name} className="block">
                  <span className="sr-only">{field.label}</span>
                  {field.multiline ? (
                    <textarea
                      name={field.name}
                      placeholder={field.label}
                      required={field.required}
                      rows={2}
                      className={cn(control, "block min-h-[max(76px,6cqw)] resize-y")}
                    />
                  ) : (
                    <input
                      name={field.name}
                      type={field.type ?? "text"}
                      placeholder={field.label}
                      autoComplete={field.autoComplete}
                      required={field.required}
                      className={control}
                    />
                  )}
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="mt-6 rounded-[max(8px,0.6cqw)] bg-brand px-[max(24px,3.5cqw)] py-[max(14px,1.6cqw)] font-ui text-[max(16px,1.75cqw)] leading-none font-bold text-white transition-colors duration-200 hover:bg-black lg:mt-[1.7cqw]"
            >
              Request a quote
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
