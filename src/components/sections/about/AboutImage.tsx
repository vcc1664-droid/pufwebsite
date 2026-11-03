import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_BOTTOM } from "@/constants/layout";
import { cn } from "@/lib/utils";
import enclosureImage from "../../../../public/about/applications_hero_enclosure.jpg";

export function AboutImage() {
  return (
    <section className={cn(CONTAINER, SECTION_BOTTOM)}>
      <Reveal>
        <Image
          src={enclosureImage}
          alt="Insulated cold room enclosure with a stainless steel door inside a warehouse"
          placeholder="blur"
          sizes="(min-width: 1920px) 1594px, 100vw"
          className="h-auto w-full rounded-[max(10px,0.8vw)]"
        />
      </Reveal>
    </section>
  );
}
