import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";
import truckImage from "../../../public/Home/WHYCHOOSE/9.png";

const REASONS = [
  {
    title: "40+ year sold credible excellence",
    body: "From insulated wall and roof panels to specialized cold storage applications, Synergy PUF offers a complete range of high-performance sandwich panels engineered for every industrial, commercial, and infrastructure requirement.",
  },
  {
    title: "Pan India Presence and strong network",
    body: "Synergy PUF supplies and installs insulated panel systems for projects across India. Every order is coordinated from our manufacturing facility in Nalagarh to site, with dedicated teams managing dispatch, delivery and on-site installation.",
  },
  {
    title: "Unmatched Speed & Timely Delivery",
    body: "Orders are dispatched from our Nalagarh facility within 48 hours of confirmation, because a delayed panel means a delayed project. Production and logistics are planned together, so panels reach site on schedule across India.",
  },
];

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function WhyChooseUs() {
  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-0">
        <div className="lg:w-[39.2%] lg:pt-[4.9cqw]">
          <Reveal>
            <h2 className="text-[max(26px,3.5cqw)] leading-none tracking-[-0.02em] text-black uppercase">
              Why Choose Us?
            </h2>
          </Reveal>

          <ul className="mt-8 lg:mt-[3.6cqw]">
            {REASONS.map((reason, i) => (
              <li
                key={reason.title}
                className="border-b border-[#616161] py-6 first:pt-0 lg:pt-[3.3cqw] lg:pb-[2.2cqw] lg:first:pt-0"
              >
                <Reveal delay={100 + i * 100}>
                  <h3 className="font-ui text-[max(17px,1.5cqw)] leading-tight font-medium text-black">
                    {reason.title}
                  </h3>
                  <p className="mt-3 font-ui text-[max(14px,1.16cqw)] leading-[1.58] text-[#909090] lg:mt-[1.4cqw]">
                    {reason.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal
          delay={150}
          className="relative aspect-4/3 overflow-hidden rounded-[max(16px,1.8cqw)] lg:aspect-auto lg:min-h-[59.4cqw] lg:w-[54%]"
        >
          <Image
            src={truckImage}
            alt="Synergy PUF delivery truck on a highway"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 54vw, 100vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
