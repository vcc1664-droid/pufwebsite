"use client";

import { type FormEvent, useRef, useState } from "react";
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
  { name: "name", label: "Full Name", placeholder: "Enter your name ", autoComplete: "name", required: true },
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

// Light text and see-through fields on the purple form card
const label = "block font-ui text-[max(13px,1.1cqw)] text-white/85";
const control =
  "mt-2 w-full rounded-[3px] border border-white/40 bg-transparent px-[max(12px,1.3cqw)] font-ui text-[max(14px,1.1cqw)] text-white placeholder:text-white/45 transition-colors duration-200 outline-none focus:border-white lg:mt-[0.6cqw]";

type Status = { state: "idle" | "sending" } | { state: "sent" | "error"; message: string };

const newSubmissionId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  // One ID per enquiry, so a repeated send of the same enquiry is not saved twice.
  const submissionId = useRef<string | null>(null);

  // Saves the enquiry to the team's Notion database through /api/enquiry.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.state === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    submissionId.current ??= newSubmissionId();
    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value("name"),
          email: value("email"),
          phone: value("phone"),
          company: value("company"),
          subject: value("subject"),
          message: value("message"),
          submissionId: submissionId.current,
        }),
        signal: AbortSignal.timeout(30000),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (response.ok && result.ok) {
        form.reset();
        submissionId.current = null;
        setStatus({ state: "sent", message: "Thank you. Your enquiry has been sent and we’ll be in touch soon." });
        return;
      }
      // A problem with what was entered: let the visitor fix it.
      if (response.status === 422 || response.status === 413) {
        setStatus({ state: "error", message: result.error ?? "Please check your details and try again." });
        return;
      }
      throw new Error("save failed");
    } catch {
      // Saving failed: don't lose the enquiry, fall back to the visitor's mail app (the form's
      // original behaviour).
      setStatus({
        state: "error",
        message: `We couldn’t send your enquiry online, so we’ve opened your email app with it filled in. You can also email us at ${CONTACT_EMAIL}.`,
      });
      openMailApp(value);
    }
  };

  // Hands the enquiry to the visitor's mail app, pre-filled.
  const openMailApp = (value: (key: string) => string) => {
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
          <h1 className="font-sans text-[30px] leading-[1.3] font-normal tracking-normal text-[#171717] lg:text-[50.1815px] lg:leading-[65.2359px]">
            Let’s Explore Your Vision
          </h1>
        </Reveal>

        <hr className={cn(RULE_GAP, "border-[#8c8c8c]")} />

        {/* Black contact card on the left; the purple form card overlaps it, edged in white */}
        <div className={cn(RULE_GAP, "flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0")}>
          <Reveal className="relative overflow-hidden rounded-[max(16px,1.6cqw)] bg-[#0b0b0b] px-6 py-8 text-white lg:w-[44%] lg:p-[3cqw]">
            <p className="flex items-center gap-[0.4em] font-ui text-[max(14px,1.35cqw)] text-white/70">
              <span aria-hidden className="size-[0.35em] rounded-[1px] bg-current" />
              Speak with our team
            </p>
            <ul className="relative z-10 mt-4 font-ui text-[max(14px,1.35cqw)] lg:mt-[1.4cqw] lg:w-[72%]">
              {CONTACT_LINES.map((line) => (
                <li key={line.label} className="border-b border-white/35 py-3 lg:py-[1.6cqw]">
                  {line.href ? (
                    <a href={line.href} className="transition-colors duration-200 hover:text-white/70">
                      {line.label}
                    </a>
                  ) : (
                    line.label
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={100}
            className="relative z-10 rounded-[max(16px,1.6cqw)] bg-brand p-6 text-white ring-[6px] ring-white lg:-ml-[1.6cqw] lg:flex-1 lg:p-[2cqw]"
          >
            <p className="font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal text-white">
              Provide your project details below and we’ll be in touch.
            </p>

            <form onSubmit={handleSubmit} className={STACK_GAP}>
              <div className="grid gap-x-[3.5%] gap-y-4 sm:grid-cols-2 lg:gap-y-[1.5cqw]">
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
                      className={cn(control, "h-[max(40px,3.3cqw)]")}
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
                    className={cn(control, "h-[max(110px,9cqw)] resize-y py-[max(10px,1cqw)]")}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status.state === "sending"}
                className={cn(
                  STACK_GAP,
                  "h-[max(42px,3.3cqw)] w-full rounded-[max(4px,0.5cqw)] bg-white font-ui text-[max(14px,1.35cqw)] text-black transition-colors duration-200 hover:bg-[#e6e6e6] disabled:cursor-wait disabled:opacity-70",
                )}
              >
                {status.state === "sending" ? "Sending…" : "Submit"}
              </button>
              <p
                role="status"
                className={cn(
                  "mt-3 font-ui text-[max(13px,1.1cqw)] empty:hidden",
                  status.state === "error" ? "text-[#ffc9c4]" : "text-white",
                )}
              >
                {"message" in status ? status.message : ""}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
