"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { learnPrograms } from "../data/programs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function LearnLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row w-full max-w-[1600px] mx-auto items-start">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-[260px] lg:w-[300px] border-b md:border-b-0 md:border-r border-border/50 bg-card/30 md:sticky md:top-16 md:h-[calc(100vh-4rem)] shrink-0 z-10 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 h-full py-6 md:py-8 px-4 md:px-6">
          <div className="mb-8">
            <Link href="/learn" className="text-xl md:text-2xl font-extrabold tracking-tight text-primary flex items-center gap-2 px-2">
              Learning Center
            </Link>
            <p className="text-xs text-muted-foreground mt-1 px-2 font-medium">Modul Pembelajaran Kademix</p>
          </div>
          <div className="space-y-8">
            {learnPrograms.map((program) => (
              <div key={program.id}>
                <h4 className="mb-3 font-bold text-xs text-muted-foreground/80 uppercase tracking-widest px-2 border-b border-border/40 pb-2">
                  {program.title}
                </h4>
                <div className="flex flex-col space-y-1">
                  {program.courses.map((course) => (
                    <Link
                      key={course.id}
                      href={course.href}
                      className={cn(
                        "text-sm px-3 py-2.5 rounded-lg transition-all duration-200",
                        pathname === course.href
                          ? "bg-primary/10 text-primary font-bold shadow-sm"
                          : "text-foreground/70 hover:bg-muted hover:text-foreground font-medium"
                      )}
                    >
                      {course.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 w-full bg-background">
        <div className="px-4 py-8 md:px-8 lg:px-12 md:py-10 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
