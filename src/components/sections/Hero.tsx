import Link from "next/link";
import { CONTAINER } from "@/constants/layout";
import { cn } from "@/lib/utils";

/*
 * Sizes are in cqw (% of the content width) so the layout keeps the Figma
 * proportions at every width; small UI text has a px floor for mobile.
 * Left edge lines up with the logo, right edge with "Start Your Quote".
 */
export function Hero() {
  return (
    <section className={cn(CONTAINER, "pt-6 pb-12 lg:pt-4")}>
      <div className="@container">
        <div className="animate-rise md:ml-[65.83%]">
          <p className="max-w-md font-ui text-[max(13px,1.2cqw)] leading-[1.5] text-muted md:max-w-none">
            Roofing, wall and cold storage panels engineered for India&apos;s industrial and
            commercial infrastructure.
          </p>
          <Link
            href="/products"
            className="mt-[max(12px,1.09cqw)] inline-flex h-[max(36px,3.3cqw)] items-center gap-[max(6px,0.8cqw)] rounded-[max(6px,0.6cqw)] bg-black px-[max(14px,1.5cqw)] font-ui text-[max(12px,1.1cqw)] text-white transition-opacity duration-200 hover:opacity-80"
          >
            Explore products
            <svg
              aria-hidden
              viewBox="0 0 10 10"
              className="size-[max(8px,0.6cqw)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path d="M1.5 8.5 8.5 1.5M3 1.5h5.5V7" />
            </svg>
          </Link>
        </div>

        <h1 className="mt-6 font-light text-heading md:mt-[0.17cqw]">
          <span className="animate-rise block -ml-[0.075em] text-[max(22px,4.5cqw)] leading-none [animation-delay:80ms]">
            High Density
          </span>
          <span className="sr-only"> PUF </span>
          {/* viewBox is the cap-height ink box of "PUF" (Plus Jakarta Sans 600, 1000 units) */}
          <svg
            aria-hidden
            viewBox="77 -745 1843 757"
            className="animate-rise mt-[max(10px,2.49cqw)] block w-full [animation-delay:160ms]"
          >
            <text x="0" y="0" fontSize="1000" fontWeight="600" className="fill-brand font-sans">
              PUF
            </text>
          </svg>
          <span className="animate-rise block -mr-[0.03em] text-right text-[max(22px,4.5cqw)] leading-none [animation-delay:240ms]">
            Insulated Panels
          </span>
        </h1>
      </div>
    </section>
  );
}
