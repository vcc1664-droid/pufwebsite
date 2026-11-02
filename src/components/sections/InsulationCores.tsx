import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER } from "@/constants/layout";
import { cn } from "@/lib/utils";

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function InsulationCores() {
  return (
    <section className={cn(CONTAINER, "py-16 lg:py-24")}>
      <div className="@container">
        <Reveal>
          <h2 className="text-[max(18px,1.95cqw)] leading-tight font-medium tracking-[-0.02em] text-black">
            Insulation selected around performance.
          </h2>
          <p className="mt-4 font-ui text-[max(22px,2.95cqw)] leading-[1.6] font-medium tracking-[-0.01em] text-[#9a9a9a] lg:mt-[1.5cqw]">
            <span className="text-black">Synergy manufactures insulated panels with</span> PUF, PIR and
            Rockwool, allowing each system to be selected around thermal performance, fire requirements,
            acoustics and application needs.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
