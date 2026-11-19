import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER } from "@/constants/layout";
import { cn } from "@/lib/utils";
import panelsImage from "../../../../public/Products/6f776d2c7e449e77a767ae2adb326a8a17f8157c-100kb.jpeg";

/* Sizes (lg+) are cqw of the content width, measured from the design (559 × 508 on a 1920 frame). */
export function ProductShowcase() {
  return (
    <section className={cn(CONTAINER, "pb-6 lg:pb-[1.5cqw]")}>
      <div className="@container">
        {/* Multiply blends the photo's off-white JPEG background into the white page. It sits on
            the Reveal wrapper because the wrapper's transform would otherwise isolate the blend. */}
        <Reveal className="mx-auto w-[70%] mix-blend-multiply sm:w-[45%] lg:w-[35%]">
          <Image
            src={panelsImage}
            alt="Stack of PUF insulated wall panels showing the foam core and interlocking edges"
            placeholder="blur"
            priority
            sizes="(min-width: 1024px) 35vw, (min-width: 640px) 45vw, 70vw"
            className="h-auto w-full"
          />
        </Reveal>
      </div>
    </section>
  );
}
