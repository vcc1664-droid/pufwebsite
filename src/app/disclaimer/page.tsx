import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/sections/PageIntro";
import { type LegalSection, LegalSections } from "@/components/sections/legal/LegalSections";

export const metadata: Metadata = {
  title: "Disclaimer | Synergy PUF",
  description: "How to use the product, technical and project information on the Synergy PUF website.",
};

// Written around what the site actually shows: typical performance values, company and project
// figures, project photos and videos (some illustrative), and links to other websites.
const SECTIONS: LegalSection[] = [
  {
    title: "General information only",
    body: (
      <p>
        The content on this website is published by Synergy PUF, a venture of the Synergy Group, to
        give a general overview of our insulated panel systems and services. It is not professional,
        engineering or design advice for any specific building, and it does not form an offer or a
        contract.
      </p>
    ),
  },
  {
    title: "Technical values and specifications",
    body: (
      <>
        <p>
          Figures such as core density, thermal conductivity, U-values, temperature range, fire
          performance, water absorption and span capability are typical industry values. Actual
          performance depends on the panel type, thickness, core, facing, installation and the
          conditions of your site.
        </p>
        <p>
          Please confirm the right specification with our team, and check the relevant datasheets,
          test reports and certificates, before you design or order. Where you need certified or
          guaranteed values, they will be stated in writing in your quotation or contract.
        </p>
      </>
    ),
  },
  {
    title: "Applications and suitability",
    body: (
      <p>
        Descriptions of applications, such as cold storage, cleanrooms, pharmaceutical facilities,
        data centres, roofing and cladding, show where our panels are commonly used. They do not
        mean that a particular panel is suitable for your project. Suitability, compliance with
        building codes, fire regulations and other approvals should be confirmed for each project
        by qualified professionals.
      </p>
    ),
  },
  {
    title: "Company and project figures",
    body: (
      <p>
        Figures such as the number of projects delivered, states served, production capacity, years
        of experience and dispatch times describe our business in general terms and may be rounded
        or approximate. Project names, locations, dates, areas and client details are shown for
        reference and may be simplified, and some are still being confirmed.
      </p>
    ),
  },
  {
    title: "Photos, videos and illustrations",
    body: (
      <p>
        Photos, videos, renders and illustrations on this website are for presentation only. Some
        are representative or digitally created images rather than photos of a specific project or
        product. Colours, finishes and details of actual panels may differ.
      </p>
    ),
  },
  {
    title: "Testimonials",
    body: (
      <p>
        Testimonials reflect the experience of individual customers on their own projects. Results
        on your project may differ.
      </p>
    ),
  },
  {
    title: "Accuracy and changes",
    body: (
      <p>
        We work to keep this website accurate and up to date, but we cannot promise that all of its
        content is complete, current or free from errors. We may change products, specifications and
        content at any time without notice.
      </p>
    ),
  },
  {
    title: "Links to other websites",
    body: (
      <p>
        This website links to other websites, including Synergy Group companies, WhatsApp and social
        media pages. We do not control those websites and are not responsible for their content,
        availability or practices.
      </p>
    ),
  },
  {
    title: "Limitation of liability",
    body: (
      <p>
        To the extent the law allows, Synergy PUF is not liable for any loss or damage that comes
        from relying on the general information on this website. This does not limit anything
        agreed in your written quotation or contract with us. Your use of this website is also
        covered by our <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    title: "Contact us",
    body: (
      <p>
        For any question about the information on this website, email{" "}
        <a href="mailto:sales@synergypuf.com">sales@synergypuf.com</a> or call{" "}
        <a href="tel:+919988118888">+91 99881 18888</a>.
      </p>
    ),
  },
];

export default function Disclaimer() {
  return (
    <main className="flex-1">
      <PageIntro title="Disclaimer" aside="Last updated" body="13 November 2026" />
      <LegalSections sections={SECTIONS} />
    </main>
  );
}
