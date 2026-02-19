import { LandingHeader } from "./src/landing/components/LandingHeader";
import {
  HeroSection,
  ProgramsSection,
  ActivitiesSection,
  TestimonySection,
  ContactSection,
  FooterSection,
} from "./src/landing/sections";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        <HeroSection />
        <ProgramsSection />
        <ActivitiesSection />
        <TestimonySection />
        <ContactSection />
        <FooterSection />
      </main>
    </div>
  );
}
