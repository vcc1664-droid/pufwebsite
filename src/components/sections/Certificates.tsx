import Image, { type StaticImageData } from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";
import isoLogo from "../../../public/Home/ISOcertified/ISO.png";
import grihaLogo from "../../../public/Home/ISOcertified/e0bfcbda0ecba02413ece654bed198d0a39e58a9.png";

type Document = {
  /** Issuer's logo on the left; the space stays empty without one. */
  logo?: { src: StaticImageData; alt: string };
  /** Issuer's name written as text, in two coloured bands like its letterhead (used without a logo). */
  issuerName?: [string, string];
  title: string;
  /** Link text for the PDF. */
  linkLabel: string;
  /**
   * PDF in /public, e.g. "/certificates/iso-9001-2015.pdf". Left empty until the file is added;
   * the link only shows once it is set.
   */
  pdf?: string;
};

const DOCUMENTS: Document[] = [
  {
    logo: { src: grihaLogo, alt: "GRIHA logo" },
    title: "GRIHA Certified",
    linkLabel: "View certificate (PDF)",
  },
  {
    logo: { src: isoLogo, alt: "ISO logo" },
    title: "ISO 9001:2015 Certified",
    linkLabel: "View certificate (PDF)",
  },
  {
    issuerName: ["National Soil Testing &", "Research Lab. Panchkula (Regd.)"],
    title: "Tested at an Independent Lab",
    linkLabel: "View test report (PDF)",
  },
];


/** Certificates and lab reports as small cards: issuer logo, tick and name (plus a PDF link once added). */
/* Sizes (lg+) are cqw of the content width. */
export function Certificates() {
  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        <Reveal>
          <h2 className="font-sans text-[26px] leading-[1.3] font-normal tracking-normal text-[#171717] lg:text-[50.1815px] lg:leading-[65.2359px]">
            Certificates and Test Reports
          </h2>
          <p className="mt-3 font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal text-[#696969] lg:mt-[1cqw]">
            Read the documents behind our quality, not just our word for it.
          </p>
        </Reveal>

        {/* Three small certificate cards on a soft lavender band: logo, tick, name */}
        <div className="mt-6 rounded-[max(16px,1.6cqw)] bg-[radial-gradient(ellipse_at_center,#f1ebf3_0%,#f8f5f9_55%,#ffffff_100%)] px-4 py-8 lg:mt-[2cqw] lg:py-[3cqw]">
          <ul className="flex flex-wrap justify-center gap-4 lg:gap-[2.2cqw]">
            {DOCUMENTS.map((doc, i) => (
              <li key={doc.title}>
                <Reveal
                  delay={100 + i * 100}
                  className="flex h-full w-[max(140px,10.5cqw)] flex-col items-center rounded-[max(10px,0.8cqw)] bg-white px-3 pt-4 pb-3 text-center shadow-[0_4px_18px_rgba(86,26,97,0.08)] lg:px-[0.9cqw] lg:pt-[1.2cqw] lg:pb-[1cqw]"
                >
                  {/* Issuer's logo or name */}
                  <div className="flex h-[max(56px,4.4cqw)] w-full items-center justify-center">
                    {doc.logo && (
                      <Image
                        src={doc.logo.src}
                        alt={doc.logo.alt}
                        sizes="(min-width: 1024px) 10vw, 140px"
                        className="h-full w-auto max-w-full object-contain"
                      />
                    )}
                    {!doc.logo && doc.issuerName && (
                      <p className="flex flex-col text-center font-ui text-[max(8px,0.6cqw)] leading-tight font-semibold text-white">
                        <span className="bg-[#e01e1e] px-[0.5em] py-[0.25em]">{doc.issuerName[0]}</span>
                        <span className="bg-[#1e7a1e] px-[0.5em] py-[0.25em]">{doc.issuerName[1]}</span>
                      </p>
                    )}
                  </div>

                  <svg aria-hidden viewBox="0 0 24 24" className="mt-3 size-[max(20px,1.5cqw)] shrink-0 lg:mt-[0.8cqw]">
                    <circle cx="12" cy="12" r="11" fill="#561A61" />
                    <path d="m7 12.5 3.2 3.2L17 9" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                  <h3 className="mt-2 font-ui text-[13px] leading-snug font-normal text-black lg:mt-[0.6cqw] lg:text-[max(12px,0.95cqw)]">
                    {doc.title}
                  </h3>
                  {doc.pdf && (
                    <a
                      href={encodeURI(doc.pdf)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block font-ui text-[12px] font-semibold text-[#561A61] underline underline-offset-[0.2em] transition-opacity duration-200 hover:opacity-70"
                    >
                      {doc.linkLabel} →
                    </a>
                  )}
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
