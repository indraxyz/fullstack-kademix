import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b bg-card">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10" />
      <div className="relative container mx-auto px-4 py-20 sm:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary text-primary-foreground mb-6">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
            Kademix
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
            Computer training institute — learn Office, Excel, and Coding with
            experienced instructors. Start your journey today.
          </p>
          <Button size="lg" asChild className="gap-2">
            <Link href="/students-register">
              Register
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
