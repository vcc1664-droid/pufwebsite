import Image from "next/image";
import shoppingCenters from "../../../public/Home/Shopping Centers.jpg";

/** Edge-to-edge, full-viewport image directly below the hero. */
export function HeroImage() {
  return (
    <section className="relative h-svh w-full overflow-hidden">
      <Image
        src={shoppingCenters}
        alt="Multi-storey shopping centre atrium with a glazed roof"
        fill
        sizes="100vw"
        placeholder="blur"
        className="object-cover"
      />
    </section>
  );
}
