import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";

// Same addresses as the footer.
const OFFICES = [
  {
    kind: "Head Office",
    address: "C-148, Phase 7, Industrial Area Sector 73, SAS Nagar Punjab 160055",
  },
  {
    kind: "Factory & Works",
    address: "VPO Manjholi, Tehsil Nalagarh District Solan HP 174010, India",
  },
];

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function Offices() {
  return (
    <section className="bg-[#0b0b0b] text-white">
      {/* Dark band is full-bleed; content sits in the shared gutter (logo → Start Your Quote). */}
      <div className={CONTAINER}>
        <div className={cn("@container flex flex-col gap-10 lg:flex-row lg:gap-0", SECTION_Y)}>
          {OFFICES.map((office, i) => (
            <Reveal
              key={office.kind}
              delay={i * 100}
              className={cn(i === 0 ? "lg:w-[45.4%]" : "lg:ml-[12.8%] lg:w-[37.6%]")}
            >
              <h2 className="flex items-center gap-[0.4em] border-b border-[#4a4a4a] pb-3 font-ui text-[max(14px,1.3cqw)] lg:pb-[1.2cqw]">
                <span aria-hidden className="size-[0.35em] rounded-[1px] bg-current" />
                {office.kind}
              </h2>
              <address className="mt-4 font-ui text-[max(14px,1.35cqw)] leading-[1.55] not-italic lg:mt-[1.5cqw]">
                <span className="block text-[#7a7a7a]">{office.address}</span>
              </address>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
