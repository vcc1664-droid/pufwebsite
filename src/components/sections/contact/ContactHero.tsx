import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, RULE_GAP, SECTION_BOTTOM } from "@/constants/layout";
import { cn } from "@/lib/utils";
import facilityImage from "../../../../public/contact/52bc05be81b9f55479e645dd700576f9dec4e576-100kb.jpeg";

// Same numbers and address as the footer and the WhatsApp button
const PHONE = "tel:+919988118888";
const WHATSAPP = "https://wa.me/919988118888";
const MANUFACTURING_UNIT = "VPO Manjholi, Tehsil Nalagarh, District Solan, HP 174010, India";
const DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MANUFACTURING_UNIT)}`;

const button =
  "relative isolate inline-flex h-[max(36px,2.6cqw)] min-w-[max(120px,9.2cqw)] items-center whitespace-nowrap justify-center gap-[0.5em] overflow-hidden rounded-[max(6px,0.5cqw)] px-[max(16px,1.4cqw)] font-ui text-[max(12px,0.95cqw)] leading-none transition-colors duration-300";
/** Hover fill that sweeps in from the left; each button sets its colour with before:bg-*. */
const sweep =
  "before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:transition-transform before:duration-300 before:ease-out before:content-[''] hover:before:scale-x-100";
const outline = cn(button, sweep, "border border-black text-black before:bg-black hover:text-white");

/** Contact page opener: what to send us, ways to reach the team, and the facility photo. */
/* Sizes (lg+) are cqw of the content width, measured from the design. */
export function ContactHero() {
  return (
    <section className={cn(CONTAINER, "pt-12 lg:pt-16", SECTION_BOTTOM)}>
      <div className="@container">
        <Reveal>
          <h1 className="font-sans text-[30px] leading-[1.3] font-normal tracking-normal text-[#171717] lg:text-[50.1815px] lg:leading-[65.2359px]">
            Tell us What You&apos;re Building
          </h1>
        </Reveal>

        <hr className={cn(RULE_GAP, "border-[#bdbdbd]")} />

        {/* Copy and buttons on the right half, then the photo full width below, as in the design */}
        <div className={cn(RULE_GAP, "flex flex-col gap-10 lg:gap-[2.6cqw]")}>
          <Reveal delay={100} className="lg:ml-[45.4%]">
            <p className="max-w-[36em] font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal text-[#7a7a7a]">
              <span className="text-brand">Planning a cold store, warehouse or industrial facility?</span>{" "}
              Share your location and panel requirements. If you have drawings, send them through and our
              team can help you select a panel and prepare a quote.
            </p>

            <div className="mt-6 grid max-w-[max(400px,40cqw)] grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-[2cqw] lg:gap-[1.1cqw]">
              {/* Jumps to the enquiry form just below */}
              <a href="#enquiry" className={cn(button, sweep, "bg-black text-white before:bg-[#561A61]")}>
                Request a Quote
                <svg
                  aria-hidden
                  viewBox="0 0 10 10"
                  className="size-[0.7em]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M1.5 8.5 8.5 1.5M3 1.5h5.5V7" />
                </svg>
              </a>
              <a href={PHONE} className={outline}>
                Call Sales
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={outline}>
                WhatsApp Sale
              </a>
              {/* Disabled for now: shown but not clickable. To turn it back on, make this an <a> with
                  href={DIRECTIONS} target="_blank" rel="noopener noreferrer" className={outline}. */}
              <span
                role="link"
                aria-disabled="true"
                data-href={DIRECTIONS}
                className={cn(button, "cursor-not-allowed border border-black/30 text-black/40")}
              >
                Get Directions
              </span>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative aspect-[3/2] overflow-hidden rounded-[max(14px,1.6cqw)] sm:aspect-[465/226]">
              <Image
                src={facilityImage}
                alt="Aerial view of the Synergy PUF manufacturing facility"
                fill
                placeholder="blur"
                sizes="(min-width: 1920px) 1594px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
