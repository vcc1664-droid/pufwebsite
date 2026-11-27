import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";
import { QualitySteps } from "./QualitySteps";
import lineImage from "../../../../public/Home/about/Industrial Conveyor Line in Action.png";

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
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
        <Reveal className="lg:w-[47.2%] lg:pt-[1.6cqw]">
          <h2 className="font-sans text-[24px] leading-[1.3] font-normal tracking-normal text-[#171717] lg:text-[50.1815px] lg:leading-[65.2359px]">
            Manufacturing &amp; Capability
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

          {/* Line runs from dot to dot in a loop; each dot glows as it is reached */}
          <QualitySteps steps={STEPS} />
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
