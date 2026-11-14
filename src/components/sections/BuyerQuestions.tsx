import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { QUOTE_CTA } from "@/constants/navigation";
import { cn } from "@/lib/utils";

// Answers are drawn from what the site already says (panel layers, cores, spec sheet, process,
// "Let's talk"); review them before launch.
const QUESTIONS: { question: string; answer: ReactNode }[] = [
  {
    question: "What is a PUF panel?",
    answer:
      "A PUF panel is a sandwich panel: two steel faces with a rigid polyurethane foam (PUF) core between them. The core is the insulation layer, which is why PUF panels are used for cold rooms, roofs and walls that need to hold a steady temperature.",
  },
  {
    question: "PUF or PIR: which core do I need?",
    answer:
      "PUF gives reliable thermal insulation for cold storage and enclosed spaces. PIR adds improved fire performance with high thermal efficiency, so it suits facilities with stricter fire requirements. Tell us how the space will be used and our team will recommend the core.",
  },
  {
    question: "How thick should the wall panel be?",
    answer:
      "It depends on the temperature the space has to hold and how it is used. PUF wall panels are available in 40, 50, 60, 80, 100, 120 and 150 mm; share your temperature range and our engineering team will specify the right thickness.",
  },
  {
    question: "Who installs the panels?",
    answer:
      "We do. Synergy PUF manufactures, dispatches and installs its insulated panel systems, so one team stays accountable. Our installation team builds the finished enclosure, sealing joints and interfaces as specified.",
  },
  {
    question: "What should I send to get a quote?",
    answer: (
      <>
        Send us the temperature range, area and timeline, plus the project location. Our engineering
        team will specify the panels and quote it. <Link href={QUOTE_CTA.href}>Start your quote</Link>.
      </>
    ),
  },
];

/* Sizes (lg+) are cqw of the content width, measured from the design. */
export function BuyerQuestions() {
  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        <Reveal>
          <h2 className="font-sans text-[26px] leading-[1] font-medium tracking-[-1.29024px] text-[#000000] lg:text-[50.1815px] lg:leading-[50.1815px]">
            Questions buyers ask
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-6 flex flex-col gap-4 lg:mt-[1.6cqw] lg:gap-[1.1cqw]">
          {QUESTIONS.map((item) => (
            // Native <details>: opens with click, Enter or Space, no JavaScript needed
            <details
              key={item.question}
              className="group rounded-[max(8px,0.55cqw)] border border-[#e1dfd7] bg-[#faf9f6]"
            >
              {/* Arrow (0.6em) + gap (0.75em) = 1.35em of this text; the answer is indented by the same */}
              <summary className="flex cursor-pointer list-none items-center gap-[0.75em] px-5 py-4 font-sans text-[18px] leading-[1.25] font-medium tracking-[-0.29952px] text-[#171717] transition-colors duration-200 hover:text-brand lg:px-[1.4cqw] lg:py-[1.05cqw] [&::-webkit-details-marker]:hidden">
                <svg
                  aria-hidden
                  viewBox="0 0 10 10"
                  className="size-[0.6em] shrink-0 fill-current transition-transform duration-200 group-open:rotate-90"
                >
                  <path d="M1 0.5 9.5 5 1 9.5z" />
                </svg>
                {item.question}
              </summary>
              <p className="px-5 pb-5 pl-[calc(1.25rem+1.35*18px)] font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal text-[#696969] lg:px-[1.4cqw] lg:pb-[1.3cqw] lg:pl-[calc(1.4cqw+1.35*18px)] [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2">
                {item.answer}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
