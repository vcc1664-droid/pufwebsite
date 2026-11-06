import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/sections/PageIntro";
import { type LegalSection, LegalSections } from "@/components/sections/legal/LegalSections";

export const metadata: Metadata = {
  title: "Terms of Service | Synergy PUF",
  description: "The terms that apply when you use the Synergy PUF website.",
};

const SECTIONS: LegalSection[] = [
  {
    title: "About these terms",
    body: (
      <p>
        These terms apply to your use of the Synergy PUF website. Synergy PUF is a venture of the
        Synergy Group, with its corporate office at C-148, Phase 7, Industrial Area Sector 73, SAS
        Nagar, Punjab 160055, India. By using this website, you agree to these terms. If you do not
        agree, please do not use the website.
      </p>
    ),
  },
  {
    title: "Information on this website",
    body: (
      <>
        <p>
          The product details, specifications, photos and project information on this website are
          for general guidance only. They do not form an offer or a contract, and products may change
          without notice.
        </p>
        <p>
          Every project has its own conditions, so please ask our team to confirm the right panel,
          thickness and specification for your space before you order.
        </p>
      </>
    ),
  },
  {
    title: "Quotations and orders",
    body: (
      <p>
        Asking for a quote through this website, by email, phone or WhatsApp does not create an
        order. Prices, delivery dates and other terms are set out in the written quotation or
        agreement we give you, and those documents apply to your order.
      </p>
    ),
  },
  {
    title: "Using the website",
    body: (
      <>
        <p>When you use this website, you agree not to:</p>
        <ul>
          <li>use it for anything unlawful or misleading;</li>
          <li>try to break, overload or gain unauthorised access to the website;</li>
          <li>copy or reuse its content for commercial purposes without our permission.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Intellectual property",
    body: (
      <p>
        The text, photos, logos, designs and other content on this website belong to Synergy PUF or
        the Synergy Group, or are used with permission. You may view and share pages for your own
        project planning, but you may not reuse them in any other way without our written consent.
      </p>
    ),
  },
  {
    title: "Links to other websites",
    body: (
      <p>
        This website links to other websites, such as our Synergy Group companies and social media
        pages. We are not responsible for the content or practices of websites we do not run.
      </p>
    ),
  },
  {
    title: "Limitation of liability",
    body: (
      <p>
        We work to keep this website accurate and available, but we cannot promise it will always be
        error-free or uninterrupted. To the extent the law allows, we are not liable for any loss
        that comes from relying on the general information on this website. This does not limit
        anything agreed in your written quotation or contract with us.
      </p>
    ),
  },
  {
    title: "Your privacy",
    body: (
      <p>
        How we handle the information you share with us is explained in our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    title: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of India. Any dispute about them will be handled by the
        courts at SAS Nagar (Mohali), Punjab.
      </p>
    ),
  },
  {
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms from time to time. The date at the top of this page shows when
        they were last updated, and using the website after a change means you accept the updated
        terms.
      </p>
    ),
  },
  {
    title: "Contact us",
    body: (
      <p>
        For any question about these terms, email{" "}
        <a href="mailto:sales@synergypuf.com">sales@synergypuf.com</a> or call{" "}
        <a href="tel:+919988118888">+91 99881 18888</a>.
      </p>
    ),
  },
];

export default function Terms() {
  return (
    <main className="flex-1">
      <PageIntro title="Terms of Service" aside="Last updated" body="6 November 2026" />
      <LegalSections sections={SECTIONS} />
    </main>
  );
}
