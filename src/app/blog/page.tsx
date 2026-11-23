import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/sections/PageIntro";
import { CONTAINER, SECTION_BOTTOM } from "@/constants/layout";

export const metadata: Metadata = {
  title: "Blog & Insights | Synergy PUF",
  description: "Latest news, industry updates, and technical guides on insulated sandwich panels.",
};

export default function BlogPage() {
  return (
    <main className="flex-1">
      <PageIntro
        title="Blog & Insights"
        aside="Knowledge Center"
        body="Technical articles, industry updates, and expert guidance on PUF, PIR, and Rockwool panel systems."
      />

      <section className={`${CONTAINER} ${SECTION_BOTTOM} py-12 lg:py-16`}>
        <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-8 sm:p-12 text-center max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-[#58166A] flex items-center justify-center mx-auto mb-4 font-bold text-lg">
            ✍️
          </div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">Technical Guides & Case Studies Coming Soon</h2>
          <p className="text-sm text-zinc-600 leading-relaxed mb-6">
            We are curating comprehensive case studies, installation best practices, and comparative thermal efficiency reports.
            Check back soon or explore our products in the meantime.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#58166A] text-white text-xs font-semibold hover:bg-[#481257] transition-colors"
          >
            Explore Panel Range
          </Link>
        </div>
      </section>
    </main>
  );
}
