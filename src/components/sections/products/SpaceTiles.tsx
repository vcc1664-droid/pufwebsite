import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";

// All four tiles read "Temperature-controlled" in the design; replace each label (and add a
// photo) once the final spaces are confirmed.
const TILES = [
  "Temperature-controlled",
  "Temperature-controlled",
  "Temperature-controlled",
  "Temperature-controlled",
];

/* Sizes (lg+) are cqw of the content width, measured from the design. */
export function SpaceTiles() {
  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-[2.4cqw]">
          {TILES.map((label, i) => (
            <li key={i}>
              <Reveal
                delay={i * 100}
                className="relative flex aspect-[164/146] items-end rounded-[max(10px,1.5cqw)] bg-[#9a6a6a] p-3 lg:px-[2cqw] lg:pb-[2.4cqw]"
              >
                <p className="font-ui text-[max(14px,1.55cqw)] leading-tight text-white">
                  {label}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
