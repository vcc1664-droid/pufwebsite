import { PinBehind } from "@/components/motion/PinBehind";
import { Applications } from "@/components/sections/Applications";
import { Hero } from "@/components/sections/Hero";
import { CoreSlider } from "@/components/sections/CoreSlider";
import { HeroImage } from "@/components/sections/HeroImage";
import { InsulationCores } from "@/components/sections/InsulationCores";
import { PanelLayers } from "@/components/sections/PanelLayers";
import { PanelSystems } from "@/components/sections/PanelSystems";
import { ProductionToInstallation } from "@/components/sections/ProductionToInstallation";
import { RequirementFactors } from "@/components/sections/RequirementFactors";
import { RightRequirement } from "@/components/sections/RightRequirement";
import { SelectedProjects } from "@/components/sections/SelectedProjects";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

export default function Home() {
  return (
    <main className="flex-1">
      {/* The hero stays put underneath; everything after it scrolls up over it. */}
      <PinBehind>
        <Hero />
      </PinBehind>
      <div className="relative z-10 bg-white">
        <HeroImage />
        <PanelLayers />
        <WhyChooseUs />
        <Stats />
        <Applications />
        <RightRequirement />
        <RequirementFactors />
        <PanelSystems />
        <InsulationCores />
        <CoreSlider />
        <ProductionToInstallation />
        <SelectedProjects />
        <Testimonials />
      </div>
    </main>
  );
}
