import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/sections/PageIntro";
import { type LegalSection, LegalSections } from "@/components/sections/legal/LegalSections";

export const metadata: Metadata = {
  title: "Privacy Policy | Synergy PUF",
  description: "How Synergy PUF handles the personal information you share with us.",
};

// Written to match how the site works today: no accounts, cookies or analytics; the Contact form
// saves enquiries to Notion and the admin panel (via /api/enquiry), and the Products page form opens
// the visitor's own email app. Update it if any of that changes.
const SECTIONS: LegalSection[] = [
  {
    title: "Who we are",
    body: (
      <p>
        This website is run by Synergy PUF, a venture of the Synergy Group, which manufactures and
        installs insulated panel systems. Our corporate office is at C-148, Phase 7, Industrial Area
        Sector 73, SAS Nagar, Punjab 160055, India. In this policy, &ldquo;we&rdquo;,
        &ldquo;us&rdquo; and &ldquo;our&rdquo; mean Synergy PUF.
      </p>
    ),
  },
  {
    title: "Information we collect",
    body: (
      <>
        <p>We only collect personal information that you choose to send us. This may include:</p>
        <ul>
          <li>your name, email address, phone number and company name;</li>
          <li>details about your project, such as location, area, temperature range and timeline;</li>
          <li>anything else you include in an email, call or WhatsApp message to us.</li>
        </ul>
        <p>
          You can browse this website without telling us who you are. We do not ask you to create an
          account.
        </p>
      </>
    ),
  },
  {
    title: "How our enquiry forms work",
    body: (
      <>
        <p>
          When you submit the form on our <Link href="/contact">Contact</Link> page, your name, email
          address, phone number, company name, subject and message are sent securely to our team,
          together with the date and time of your enquiry. We record them in our enquiry management
          tools so that we can reply and follow up.
        </p>
        <p>
          If the form cannot be sent online, it opens your own email app with your details filled in
          instead. In that case nothing reaches us until you send that email yourself.
        </p>
        <p>
          The &ldquo;Tell us about your building&rdquo; form on our{" "}
          <Link href="/products">Products</Link> page, including its &ldquo;Request a quote&rdquo; and
          &ldquo;Request a sample&rdquo; buttons, does not send anything through this website. It
          opens your own email app with your details filled in, for you to send.
        </p>
      </>
    ),
  },
  {
    title: "How we use your information",
    body: (
      <>
        <p>We use the information you share with us to:</p>
        <ul>
          <li>reply to your enquiry and understand your project;</li>
          <li>prepare quotations, specifications and delivery plans;</li>
          <li>manufacture, dispatch and install the panels you order;</li>
          <li>keep records we are required to keep by law, such as invoices.</li>
        </ul>
        <p>We do not sell your personal information or use it for unrelated marketing.</p>
      </>
    ),
  },
  {
    title: "Cookies and tracking",
    body: (
      <p>
        This website does not use cookies, analytics or advertising trackers. Your web host and
        browser may still keep standard technical logs, such as your IP address and the pages you
        requested, to deliver the site and keep it secure.
      </p>
    ),
  },
  {
    title: "Third-party services",
    body: (
      <>
        <p>
          Enquiries sent through our Contact form are stored in Notion, an online workspace run by
          Notion Labs, Inc., which we use to manage enquiries. Notion may store this information on
          servers outside India. We use it only to handle your enquiry, under Notion&rsquo;s own
          security and privacy terms.
        </p>
        <p>
          Our website also links to services run by other companies, including WhatsApp, Instagram,
          YouTube, LinkedIn, Facebook and our Synergy Group company websites. When you use those
          links, the service&rsquo;s own privacy policy applies to what you share there.
        </p>
      </>
    ),
  },
  {
    title: "Sharing your information",
    body: (
      <p>
        We share your information only when needed to deliver your project, for example with our
        logistics and installation partners or within the Synergy Group, or when the law requires us
        to.
      </p>
    ),
  },
  {
    title: "How long we keep it",
    body: (
      <p>
        We keep enquiry and project information for as long as we need it to serve you, and longer
        only where the law asks us to keep records, such as for tax and accounting.
      </p>
    ),
  },
  {
    title: "Your rights",
    body: (
      <p>
        Under India&rsquo;s Digital Personal Data Protection Act, 2023, you can ask us to tell you what
        personal information we hold about you, to correct or update it, or to erase it where we no
        longer need it. You can also withdraw any consent you have given. To make a request, contact
        us using the details below.
      </p>
    ),
  },
  {
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy when our website or services change. The date at the top of this
        page shows when it was last updated.
      </p>
    ),
  },
  {
    title: "Contact us",
    body: (
      <p>
        For any question about this policy or your information, email{" "}
        <a href="mailto:sales@synergypuf.com">sales@synergypuf.com</a> or call{" "}
        <a href="tel:+919988118888">+91 99881 18888</a>.
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <main className="flex-1">
      <PageIntro title="Privacy Policy" aside="Last updated" body="13 November 2026" />
      <LegalSections sections={SECTIONS} />
    </main>
  );
}
