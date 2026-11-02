import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER } from "@/constants/layout";
import { cn } from "@/lib/utils";
import lineImage from "../../../../public/about/df70c243-af54-4fd2-9c7a-5d2027d0518d.png";

// Values marked "To confirm" are placeholders from the design.
const SPECS = [
  { label: "Plant floor area", value: "To confirm" },
  { label: "Key machinery", value: "To confirm" },
  { label: "Monthly output", value: "See verified capacity" },
];

const STEPS = ["Raw material check", "Core density control", "Bonding", "Dispatch inspection"];

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function Manufacturing() {
  return (
    <section className={cn(CONTAINER, "py-16 lg:py-24")}>
      <div className="@container flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
        <Reveal className="lg:w-[47.2%] lg:pt-[1.6cqw]">
          <h2 className="text-[max(24px,2.3cqw)] leading-tight font-medium tracking-[-0.01em] text-black">
            Manufacturing &amp; capability
          </h2>

          <p className="mt-6 flex items-center gap-1.5 font-ui text-[max(14px,1.35cqw)] text-[#1e1e1e] lg:mt-[3cqw]">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-[1em] shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            Nalagarh, Himachal Pradesh
          </p>

          <dl className="mt-3 border-t border-[#d9d9d9] font-ui text-[max(13px,1.2cqw)] lg:mt-[1.2cqw]">
            {SPECS.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between gap-4 border-b border-[#d9d9d9] py-4 lg:py-[1.75cqw]"
              >
                <dt className="text-[#909090]">{spec.label}</dt>
                <dd className="text-right text-[#1e1e1e]">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <ol aria-label="Quality checkpoints" className="mt-10 flex lg:mt-[3.8cqw]">
            {STEPS.map((step, i) => {
              const isLast = i === STEPS.length - 1;

              return (
                <li key={step} className={cn(isLast ? "shrink-0" : "flex-1")}>
                  {/* Dot, plus the line that runs on to the next checkpoint */}
                  <div aria-hidden className="flex items-center">
                    <span className="size-[max(7px,0.65cqw)] shrink-0 rounded-full bg-brand ring-[max(2px,0.2cqw)] ring-brand/15" />
                    {!isLast && <span className="h-px flex-1 bg-[#d9d9d9]" />}
                  </div>
                  <p className="mt-2 max-w-[7em] pr-2 font-ui text-[max(12px,1.1cqw)] leading-snug text-[#1e1e1e] lg:mt-[1cqw]">
                    {step}
                  </p>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <Reveal delay={100} className="lg:w-[46.8%]">
          <div className="relative aspect-[454/389] overflow-hidden rounded-[max(14px,2.1cqw)]">
            <Image
              src={lineImage}
              alt="Worker operating the PUF panel production line at the Nalagarh plant"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 47vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
