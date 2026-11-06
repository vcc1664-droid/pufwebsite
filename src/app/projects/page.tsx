import type { Metadata } from "next";
import { HighlightsMedia } from "@/components/sections/HighlightsMedia";
import { LetsTalk } from "@/components/sections/LetsTalk";
import { PageIntro } from "@/components/sections/PageIntro";
import { ProjectList } from "@/components/sections/projects/ProjectList";
import { TrustStrip } from "@/components/sections/TrustStrip";

export const metadata: Metadata = {
  title: "Projects | Synergy PUF",
  description: "Insulated panel projects delivered by Synergy PUF across India.",
};

export default function Projects() {
  return (
    // data-header switches the header to its dark style while this page is shown
    <main data-header="dark" className="flex-1">
      {/* Dark opening band; pulled up under the transparent header (96px tall, 127px from lg) so
          the header sits on black */}
      <div className="-mt-[96px] bg-black pt-[96px] lg:-mt-[127px] lg:pt-[127px]">
        <PageIntro
          tone="dark"
          title={
            <>
              Where our Panels <br />
              go to Work.
            </>
          }
          aside="Delivered Across India"
          body="Industrial insulation expertise. A company built around your project. Delivering reliable solutions with precision, performance, and quality you can trust."
        />
        <HighlightsMedia
          tone="dark"
          items={[
            "500+ Projects Delivered",
            "12+ States Served",
            "5L+ Sq. Ft./Month",
            "-35°C Coldest Zone",
            "Zero Thermal Loss",
          ]}
          // Uppercase .JPG has no static-import typings, so the photo is referenced by path.
          image={{
            src: "/Project/WhatsApp Image 2026-11-04 at 17.55.21-100kb.jpeg",
            alt: "Aerial view of a Synergy PUF project among farmland",
          }}
          listClassName="lg:w-[22.8%]"
          imageClassName="lg:w-[69.7%]"
          aspectClassName="aspect-[549/352]"
          priority
        />
      </div>
      <ProjectList />
      <LetsTalk
        title="Planning a build?"
        body="Send us the temperature range, area and timeline. Our engineering team will spec the panels and quote it"
        bodyClassName="max-w-[32.5em]"
      />
      <TrustStrip />
    </main>
  );
}
