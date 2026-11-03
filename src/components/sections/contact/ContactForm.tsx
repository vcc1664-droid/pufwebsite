"use client";

import type { FormEvent } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, RULE_GAP, SECTION_BOTTOM, STACK_GAP } from "@/constants/layout";
import { cn } from "@/lib/utils";

// Contact details as given in the design; they differ from the footer and need confirming.
export const CONTACT_EMAIL = "info@synergypuf.com";
const CONTACT_LINES = [
  { label: "+91 98765 43210 / +91 98765 43211", href: "tel:+919876543210" },
  { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: "Mon - Sat: 9:00 AM - 6:30 PM" },
];

type Field = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  wide?: boolean;
};

const FIELDS: Field[] = [
  { name: "name", label: "Full Name", placeholder: "John Doe", autoComplete: "name", required: true },
  {
    name: "email",
    label: "Email Address",
    placeholder: "john@company.com",
    type: "email",
    autoComplete: "email",
    required: true,
  },
  { name: "phone", label: "Phone Number", placeholder: "+91 98765 43210", type: "tel", autoComplete: "tel" },
  {
    name: "company",
    label: "Company Name",
    placeholder: "Acme Industrial Ltd",
    autoComplete: "organization",
  },
  { name: "subject", label: "Subject", placeholder: "Cold room panels for a new facility", wide: true },
];

const label = "block font-ui text-[max(13px,1.1cqw)] text-[#1e1e1e]";
const control =
  "mt-2 w-full rounded-[3px] border border-[#cfcfcf] bg-white px-[max(12px,1.3cqw)] font-ui text-[max(14px,1.1cqw)] text-black placeholder:text-[#a3a3a3] transition-colors duration-200 outline-none focus:border-brand lg:mt-[1cqw]";

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function ContactForm() {
  // No form backend yet: hand the enquiry to the visitor's mail app, pre-filled.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const body = [
      `Name: ${value("name")}`,
      `Email: ${value("email")}`,
      `Phone: ${value("phone")}`,
      `Company: ${value("company")}`,
      "",
      value("message"),
    ].join("\n");
    const subject = value("subject") || "Project enquiry";
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className={cn(CONTAINER, "pt-12 lg:pt-16", SECTION_BOTTOM)}>
      <div className="@container">
        <Reveal>
          <h1 className="text-[max(30px,3.6cqw)] leading-[1.2] font-medium tracking-[-0.02em] text-black">
            Let’s explore your vision
          </h1>
        </Reveal>

        <hr className={cn(RULE_GAP, "border-[#8c8c8c]")} />

        <div className={cn(RULE_GAP, "flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-0")}>
          <Reveal className="lg:w-[32.2%]">
            <p className="flex items-center gap-[0.4em] font-ui text-[max(14px,1.35cqw)] text-black">
              <span aria-hidden className="size-[0.35em] rounded-[1px] bg-current" />
              Speak with our team
            </p>
            <ul className="mt-8 font-ui text-[max(14px,1.35cqw)] text-black lg:mt-[6.8cqw]">
              {CONTACT_LINES.map((line) => (
                <li key={line.label} className="border-b border-[#8c8c8c] py-3 lg:py-[2.1cqw]">
                  {line.href ? (
                    <a href={line.href} className="transition-colors duration-200 hover:text-brand">
                      {line.label}
                    </a>
                  ) : (
                    line.label
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className="lg:w-[54.8%]">
            <p className="font-ui text-[max(16px,1.9cqw)] text-[#8a8a8a]">
              Provide your project details below and we’ll be in touch.
            </p>

            <form onSubmit={handleSubmit} className={STACK_GAP}>
              <div className="grid gap-x-[3.5%] gap-y-5 sm:grid-cols-2 lg:gap-y-[2.8cqw]">
                {FIELDS.map((field) => (
                  <div key={field.name} className={cn(field.wide && "sm:col-span-2")}>
                    <label htmlFor={`contact-${field.name}`} className={label}>
                      {field.label}
                    </label>
                    <input
                      id={`contact-${field.name}`}
                      name={field.name}
                      type={field.type ?? "text"}
                      autoComplete={field.autoComplete}
                      required={field.required}
                      placeholder={field.placeholder}
                      className={cn(control, "h-[max(44px,4.9cqw)]")}
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className={label}>
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    placeholder="Please describe your project requirements, quantities, and panel specs..."
                    className={cn(control, "h-[max(140px,19.8cqw)] resize-y py-[max(12px,1.3cqw)]")}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={cn(
                  STACK_GAP,
                  "h-[max(44px,4.5cqw)] w-full rounded-[max(4px,0.5cqw)] bg-brand font-ui text-[max(14px,1.35cqw)] text-white transition-colors duration-200 hover:bg-black",
                )}
              >
                Submit
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
