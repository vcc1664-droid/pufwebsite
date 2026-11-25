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

        {/* Three small certificate cards on a light grey band: logo and name */}
        <div className="mt-6 rounded-[max(16px,1.6cqw)] bg-[#F6F6F6] px-4 py-10 lg:mt-[2cqw] lg:py-[5cqw]">
          <ul className="flex flex-wrap justify-center gap-4 lg:gap-[2.2cqw]">
            {DOCUMENTS.map((doc, i) => (
              <li key={doc.title}>
                <Reveal
                  delay={100 + i * 100}
                  className="flex h-full w-[max(190px,16cqw)] flex-col items-center rounded-[max(10px,0.8cqw)] bg-white px-5 pt-7 pb-6 text-center shadow-[0_4px_18px_rgba(86,26,97,0.08)] lg:px-[1.4cqw] lg:pt-[2.2cqw] lg:pb-[2cqw]"
                >
                  {/* Issuer's logo or name */}
                  <div className="flex h-[max(76px,6.6cqw)] w-full items-center justify-center">
                    {doc.logo && (
                      <Image
                        src={doc.logo.src}
                        alt={doc.logo.alt}
                        sizes="(min-width: 1024px) 15vw, 190px"
                        className="h-full w-auto max-w-full object-contain"
                      />
                    )}
                    {!doc.logo && doc.issuerName && (
                      <p className="flex flex-col text-center font-ui text-[max(9px,0.72cqw)] leading-tight font-semibold text-white">
                        <span className="bg-[#e01e1e] px-[0.5em] py-[0.25em]">{doc.issuerName[0]}</span>
                        <span className="bg-[#1e7a1e] px-[0.5em] py-[0.25em]">{doc.issuerName[1]}</span>
                      </p>
                    )}
                  </div>

                  <h3 className="mt-2 font-ui text-[14px] leading-snug font-normal text-black lg:mt-[0.8cqw] lg:text-[max(13px,1.1cqw)]">
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
