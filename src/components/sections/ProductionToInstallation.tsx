import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER } from "@/constants/layout";
import { cn } from "@/lib/utils";
import constructionImage from "../../../public/Home/one stops solution.png";

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function ProductionToInstallation() {
  return (
    <section className={cn(CONTAINER, "py-16 lg:py-24")}>
      <div className="@container">
        <Reveal>
          <h2 className="max-w-[11em] text-[max(28px,3.8cqw)] leading-[1.2] font-medium tracking-[-0.02em] text-black">
            From panel production to site installation.
          </h2>
        </Reveal>

        <hr className="mt-8 border-[#d9d9d9] lg:mt-[4.2cqw]" />

        <Reveal delay={100} className="mt-8 lg:mt-[4cqw] lg:ml-[39.5%]">
          <p className="font-ui text-[max(15px,1.75cqw)] leading-[1.6] text-black">
            We manufacture and install insulated panel systems for industrial, refrigeration and specialised
            buildings, with expert technical support and project coordination.
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-10 lg:mt-[5.4cqw]">
          <Image
            src={constructionImage}
            alt="Tower cranes and high-rise buildings under construction"
            placeholder="blur"
            sizes="(min-width: 1920px) 1594px, 100vw"
            className="h-auto w-full rounded-[max(10px,1.3cqw)]"
          />
        </Reveal>
      </div>
    </section>
  );
}
