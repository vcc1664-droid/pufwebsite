import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";

const PANELS = [
  { title: "Roof panels", body: "Standing seam. Cores: PUF or PIR." },
  { title: "Wall panels", body: "Single skin, micro-rib and concealed fix." },
  { title: "PIR panels", body: "Foam core, chosen where fire behaviour matters more." },
];

/** Quick overview of the panel families, shown before the detailed ranges. */
/* Sizes (lg+) are cqw of the content width, measured from the design. */
export function ChoosePanel() {
  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        <Reveal>
          <h2 className="font-sans text-[26px] leading-[1] font-medium tracking-[-1.29024px] text-[#000000] lg:text-[50.1815px] lg:leading-[50.1815px]">
            Choose Your Panel
          </h2>
        </Reveal>

        <ul className="mt-6 grid gap-4 sm:grid-cols-3 lg:mt-[2cqw] lg:gap-[1.6cqw]">
          {PANELS.map((panel, i) => (
            <li key={panel.title}>
              <Reveal
                delay={100 + i * 100}
                className="h-full rounded-[max(12px,0.9cqw)] border border-[#dad8cf] bg-[#faf9f6] p-6 lg:min-h-[13cqw] lg:px-[2.2cqw] lg:pt-[2.3cqw] lg:pb-[2.6cqw]"
              >
                <h3 className="font-ui text-[max(20px,1.6cqw)] leading-tight font-semibold text-[#3e3e3e]">
                  {panel.title}
                </h3>
                <p className="mt-2 font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal text-[#5c5c5c] lg:mt-[0.6cqw]">
                  {panel.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
