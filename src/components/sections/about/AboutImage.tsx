import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_BOTTOM } from "@/constants/layout";
import { cn } from "@/lib/utils";
import enclosureImage from "../../../../public/about/d4a839fa-81ad-439e-9c54-8a2208c85cc8-150kb.jpeg";

export function AboutImage() {
  return (
    <section className={cn(CONTAINER, SECTION_BOTTOM)}>
      <Reveal>
        <Image
          src={enclosureImage}
          alt="Synergy PUF insulated panel project"
          placeholder="blur"
          sizes="(min-width: 1920px) 1594px, 100vw"
          className="h-auto w-full rounded-[max(10px,0.8vw)]"
        />
      </Reveal>
    </section>
  );
}
