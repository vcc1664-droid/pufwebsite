import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { BLOCK_GAP, CONTAINER, RULE_GAP, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";
import constructionImage from "../../../public/Home/33c4a67f-4ff8-4df2-92b8-4830eda7bd7f.jpg";

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function ProductionToInstallation() {
  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        <Reveal>
          <h2 className="max-w-[11em] text-[max(28px,3.8cqw)] leading-[1.2] font-medium tracking-[-0.02em] text-black">
            From panel production to site installation.
          </h2>
        </Reveal>

        <hr className={cn(RULE_GAP, "border-[#d9d9d9]")} />

        <Reveal delay={100} className={cn(RULE_GAP, "lg:ml-[39.5%]")}>
          <p className="font-ui text-[max(15px,1.75cqw)] leading-[1.6] text-black">
            We manufacture and install insulated panel systems for industrial, refrigeration and specialised
            buildings, with expert technical support and project coordination.
          </p>
        </Reveal>

        <Reveal delay={150} className={BLOCK_GAP}>
          <Image
            src={constructionImage}
            alt="Synergy PUF insulated panel manufacturing and installation"
            placeholder="blur"
            sizes="(min-width: 1920px) 1594px, 100vw"
            className="h-auto w-full rounded-[max(10px,1.3cqw)]"
          />
        </Reveal>
      </div>
    </section>
  );
}
