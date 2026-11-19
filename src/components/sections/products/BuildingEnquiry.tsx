"use client";

import type { FormEvent } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTACT_EMAIL } from "@/components/sections/contact/ContactForm";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";

type Field = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
};

// Labels as in the design; placeholders show an example answer
const FIELDS: Field[] = [
  { name: "name", label: "Name", placeholder: "Enter your name ", autoComplete: "name", required: true },
  { name: "phone", label: "Phone Number", placeholder: "+91 98765 43210", type: "tel", autoComplete: "tel", required: true },
  { name: "location", label: "Project Location", placeholder: "Chandigarh" },
  { name: "use", label: "Use: cold store, pharma, data center, other", placeholder: "Cold store" },
  { name: "area", label: "Approximate area", placeholder: "10,000 sq ft" },
  { name: "temperature", label: "Operating Temperature", placeholder: "-20°C" },
];

// Light text and see-through fields on the purple form card (text sizes unchanged)
const label = "block font-ui text-[max(13px,1.1cqw)] text-white/85";
const control =
  "mt-2 w-full rounded-[max(4px,0.4cqw)] border border-white/40 bg-transparent px-[max(14px,1.2cqw)] py-[max(10px,0.8cqw)] font-ui text-[max(16px,1.5cqw)] leading-snug text-white placeholder:font-ui placeholder:text-[15.5324px] placeholder:leading-[23.2985px] placeholder:font-normal placeholder:tracking-normal placeholder:text-white/45 transition-colors duration-200 outline-none focus:border-white lg:mt-[0.6cqw]";

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
    // Which button was pressed decides the email subject
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const subject = submitter?.value === "sample" ? "Panel sample request" : "Panel recommendation request";
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        {/* Black intro card on the left; the purple form card overlaps it, edged in white */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0">
          <Reveal className="relative flex flex-col overflow-hidden rounded-[max(16px,1.6cqw)] bg-[#0b0b0b] px-6 py-8 text-white lg:w-[42%] lg:p-[3cqw]">
            <h2 className="relative z-10 max-w-[6em] font-sans text-[26px] leading-[1.3] font-normal tracking-normal text-white lg:text-[50.1815px] lg:leading-[65.2359px]">
              Tell us about your Building
            </h2>
            <p className="relative z-10 mt-4 max-w-[26em] font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal text-white/60 lg:mt-[1.2cqw]">
              Share the basics and our team will come back with a panel recommendation.
            </p>
          </Reveal>

          <Reveal
            delay={100}
            className="relative z-10 rounded-[max(16px,1.6cqw)] bg-brand p-6 text-white ring-[6px] ring-white lg:-ml-[1.6cqw] lg:flex-1 lg:p-[2.2cqw]"
          >
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 lg:gap-x-[1.65cqw] lg:gap-y-[1.4cqw]">
                {FIELDS.map((field) => (
                  <div key={field.name}>
                    <label htmlFor={`building-${field.name}`} className={label}>
                      {field.label}
                    </label>
                    <input
                      id={`building-${field.name}`}
                      name={field.name}
                      type={field.type ?? "text"}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      required={field.required}
                      className={control}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3 lg:mt-[1.7cqw] lg:gap-[1.1cqw]">
                <button
                  type="submit"
                  value="quote"
                  className="inline-flex items-center justify-center rounded-[max(6px,0.5cqw)] bg-black px-[max(20px,2.1cqw)] py-[max(12px,1.05cqw)] font-ui text-[max(14px,0.95cqw)] leading-none text-white transition-colors duration-200 hover:bg-[#2a2a2a]"
                >
                  Request a quote
                </button>
                <button
                  type="submit"
                  value="sample"
                  className="inline-flex items-center justify-center rounded-[max(6px,0.5cqw)] bg-white px-[max(20px,2.1cqw)] py-[max(12px,1.05cqw)] font-ui text-[max(14px,0.95cqw)] leading-none text-black transition-colors duration-200 hover:bg-[#e6e6e6]"
                >
                  Request a sample
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
