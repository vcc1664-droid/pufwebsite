import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER } from "@/constants/layout";
import { cn } from "@/lib/utils";
import panelsImage from "../../../../public/Products/67de9fa1-a114-4aa1-8d3d-653416d79cba.png";

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function ProductShowcase() {
  return (
    <section className={cn(CONTAINER, "pb-16 lg:pb-24")}>
      <div className="@container">
        <Reveal className="mx-auto w-full sm:w-[75%] lg:w-[55%]">
          <Image
            src={panelsImage}
            alt="Stack of PUF insulated roof panels showing the foam core and interlocking edges"
            placeholder="blur"
            priority
            sizes="(min-width: 1024px) 55vw, (min-width: 640px) 75vw, 100vw"
            className="h-auto w-full"
          />
        </Reveal>
      </div>
    </section>
  );
}
