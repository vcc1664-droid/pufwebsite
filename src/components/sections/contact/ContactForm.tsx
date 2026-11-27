"use client";

import { type FormEvent, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, RULE_GAP, SECTION_BOTTOM, STACK_GAP } from "@/constants/layout";
import { cn } from "@/lib/utils";

// Contact details as given in the design; they differ from the footer and need confirming.
export const CONTACT_EMAIL = "info@synergypuf.com";
const CONTACT_LINES = [
  { label: "+91 9988118888", href: "tel:+919988118888" },
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
  { name: "name", label: "Full Name", placeholder: "Enter your name", autoComplete: "name", required: true },
  {
    name: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
    autoComplete: "email",
    required: true,
  },
  { name: "phone", label: "Phone Number", placeholder: "Enter your phone number", type: "tel", autoComplete: "tel" },
  {
    name: "company",
    label: "Company Name",
    placeholder: "Enter company name",
    autoComplete: "organization",
  },
  { name: "location", label: "Project Location", placeholder: "Enter project location", wide: true },
];

const PANEL_REQUIREMENTS = [
  "PUF Panels",
  "PIR Panels",
  "Rockwool Panels",
  "Roof Panels",
  "Wall Panels",
  "Cold Room Panels",
  "Not sure yet",
];

const BENEFITS = [
  "Get guidance on suitable PUF and PIR panels",
  "Share drawings or specifications for review",
  "Receive a response from the sales team",
];

/** Accepted drawing files (checked again on the server, with a 10 MB cap). */
const FILE_ACCEPT = ".pdf,.jpg,.jpeg,.png,.dwg,.webp";

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
  // Name of the drawing picked in the upload box, shown in place of the hint
  const [fileName, setFileName] = useState("");
  // Whether a panel requirement is picked (the empty choice shows in placeholder grey)
  const [panelPicked, setPanelPicked] = useState(false);

  // Saves the enquiry to the team's Notion database through /api/enquiry.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.state === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => {
      const v = data.get(key);
      return typeof v === "string" ? v.trim() : "";
    };
    const picked = data.get("drawing");
    const file = picked instanceof File && picked.size > 0 ? picked : null;
    submissionId.current ??= newSubmissionId();
    setStatus({ state: "sending" });

    try {
      // Sent as form data so the optional drawing goes along with it.
      const body = new FormData();
      body.append("name", value("name"));
      body.append("email", value("email"));
      body.append("phone", value("phone"));
      body.append("company", value("company"));
      body.append("location", value("location"));
      body.append("panel", value("panel"));
      body.append("subject", value("panel") || "Website enquiry");
      body.append("message", composeMessage(value, file));
      body.append("submissionId", submissionId.current);
      if (file) body.append("drawing", file);

      const response = await fetch("/api/enquiry", {
        method: "POST",
        body,
        signal: AbortSignal.timeout(60000),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (response.ok && result.ok) {
        form.reset();
        setFileName("");
        setPanelPicked(false);
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
      openMailApp(value, file);
    }
  };

  // The enquiry's details as one message (Notion's "Your Message" and the email fallback)
  const composeMessage = (value: (key: string) => string, file: File | null) =>
    [
      `Project location: ${value("location") || "Not given"}`,
      `Panel requirement: ${value("panel") || "Not given"}`,
      `Drawing: ${file ? file.name : "None"}`,
    ].join("\n");

  // Hands the enquiry to the visitor's mail app, pre-filled (an email link can't carry the file).
  const openMailApp = (value: (key: string) => string, file: File | null) => {
    const body = [
      `Name: ${value("name")}`,
      `Email: ${value("email")}`,
      `Phone: ${value("phone")}`,
      `Company: ${value("company")}`,
      "",
      composeMessage(value, file),
      ...(file ? ["", "Please attach the drawing to this email."] : []),
    ].join("\n");
    const subject = value("panel") || "Project enquiry";
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="enquiry" className={cn(CONTAINER, "pt-12 lg:pt-16", SECTION_BOTTOM)}>
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
            <ul className="relative z-10 font-ui text-[max(14px,1.35cqw)] lg:w-[72%]">
              {CONTACT_LINES.map((line) => (
                <li key={line.label} className="border-b border-white/35 py-3 first:pt-0 lg:py-[1.6cqw] lg:first:pt-0">
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

            <p className="mt-8 max-w-[24em] font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal text-white lg:mt-[3cqw]">
              Tell us a little about your requirement. Add your project location and panel details so our team
              can guide you towards the right solution.
            </p>

            <ul className="mt-6 space-y-3 font-ui text-[max(12px,0.95cqw)] text-white/90 lg:mt-[2cqw] lg:space-y-[0.9cqw]">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-[0.7em]">
                  <svg aria-hidden viewBox="0 0 24 24" className="size-[1.3em] shrink-0">
                    <circle cx="12" cy="12" r="11" fill="#8e4a9c" />
                    <path
                      d="m7 12.5 3.2 3.2L17 9"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={100}
            className="relative z-10 rounded-[max(16px,1.6cqw)] bg-brand p-6 text-white ring-[6px] ring-white lg:-ml-[1.6cqw] lg:flex-1 lg:p-[2cqw]"
          >
            <p className="font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal text-white">
              Share your requirements with us. Our team will get back to you shortly.
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
                  <label htmlFor="contact-panel" className={label}>
                    Panel Requirements
                  </label>
                  <div className="relative">
                    <select
                      id="contact-panel"
                      name="panel"
                      defaultValue=""
                      className={cn(
                        control,
                        "h-[max(40px,3.3cqw)] appearance-none pr-10 [&>option]:text-black",
                        !panelPicked && "text-white/45",
                      )}
                      onChange={(event) => setPanelPicked(event.currentTarget.value !== "")}
                    >
                      <option value="" disabled>
                        Select your panel requirement
                      </option>
                      {PANEL_REQUIREMENTS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="pointer-events-none absolute top-1/2 right-[max(12px,1.3cqw)] mt-1 size-[1.1em] -translate-y-1/2 text-white lg:mt-[0.3cqw]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <p className={label}>
                    Drawing Upload <span className="text-[0.85em] text-white/60">(Optional)</span>
                  </p>
                  {/* The whole box opens the file picker; the chosen file's name replaces the hint */}
                  <label
                    htmlFor="contact-drawing"
                    className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-4 rounded-[3px] border border-dashed border-white/40 px-4 py-6 text-center transition-colors duration-200 hover:border-white sm:flex-row sm:gap-[max(16px,3cqw)] lg:mt-[0.6cqw] lg:py-[2cqw]"
                  >
                    <span className="flex items-center gap-3 text-left">
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        className="size-[max(26px,2cqw)] shrink-0 text-white/80"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 8.5a4 4 0 0 1-.5 9.5" />
                        <path d="M12 12v8M9 15l3-3 3 3" />
                      </svg>
                      <span className="font-ui">
                        <span className="block text-[max(13px,1.1cqw)] text-white/70">
                          {fileName || "Upload Drawing / Project File"}
                        </span>
                        <span className="block text-[max(11px,0.8cqw)] text-white/45">PDF, JPG, PNG or DWG</span>
                      </span>
                    </span>
                    <span className="rounded-[3px] border border-white/70 px-[max(12px,1cqw)] py-[max(5px,0.4cqw)] font-ui text-[max(11px,0.8cqw)] text-white">
                      Browse File
                    </span>
                  </label>
                  <input
                    id="contact-drawing"
                    name="drawing"
                    type="file"
                    accept={FILE_ACCEPT}
                    className="sr-only"
                    onChange={(event) => setFileName(event.currentTarget.files?.[0]?.name ?? "")}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status.state === "sending"}
                className={cn(
                  STACK_GAP,
                  "relative isolate h-[max(42px,3.3cqw)] w-full overflow-hidden rounded-[max(4px,0.5cqw)] bg-white font-ui text-[max(14px,1.35cqw)] text-black transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-black before:transition-transform before:duration-300 before:ease-out before:content-[''] enabled:hover:text-white enabled:hover:before:scale-x-100 disabled:cursor-wait disabled:opacity-70",
                )}
              >
                {status.state === "sending" ? "Sending…" : "Submit Enquiry"}
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
