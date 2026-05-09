import { LandingHeader } from "@/app/src/features/landing/components/LandingHeader";
import { LearnLayout } from "@/app/src/features/learn/components/LearnLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingHeader />
      <div className="flex-1">
        <LearnLayout>{children}</LearnLayout>
      </div>
    </div>
  );
}
