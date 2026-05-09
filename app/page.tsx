import { LandingHeader } from "./src/features/landing/components/LandingHeader";
import {
  HeroSection,
  ProgramsSection,
  ActivitiesSection,
  TestimonySection,
  ContactSection,
  FooterSection,
} from "./src/features/landing/sections";

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
