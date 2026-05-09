"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookOpen,
  Code,
  Laptop,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { STUDENT_FORM_CONSTANTS, PROGRAM_TRACKS } from "@/app/src/shared/validation/studentSchema";
import { useCart } from "@/app/src/features/cart/useCart";
import { toast } from "sonner";

const programIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "Office Administration": BookOpen,
  "Coding for Kids": Code,
  "Web Development": Laptop,
};

export function ProgramsSection() {
  const { addItem } = useCart();

  const handleEnroll = (program: string, codingTrack?: string) => {
    addItem(
      codingTrack
        ? { studyProgram: program, codingTrack }
        : { studyProgram: program },
    );
    toast.success("Added to cart", {
      description: codingTrack
        ? `${program} (${codingTrack}) added. Go to cart to checkout.`
        : `${program} added. Go to cart to checkout.`,
    });
  };

  return (
    <section id="programs" className="py-16 sm:py-20 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Study Programs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our programs — from office skills to professional coding
            tracks.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STUDENT_FORM_CONSTANTS.studyProgramCards.map((program) => {
            const Icon = programIcons[program] ?? BookOpen;
            const tracks = PROGRAM_TRACKS[program as keyof typeof PROGRAM_TRACKS] || [];
            
            return (
              <Card
                key={program}
                className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full relative overflow-hidden group border-muted/60"
              >
                <CardContent className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                      <Icon className="w-7 h-7" />
                    </div>
                    <Badge variant="secondary" className="font-semibold tracking-wider text-[10px] uppercase h-fit py-1 px-3 mt-1">
                      {program === "Office Administration" ? "Essential" : program === "Coding for Kids" ? "Popular" : "Hot"}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
                    {program}
                  </h3>
                  <ul className="text-sm text-muted-foreground mb-8 flex flex-wrap gap-2 content-start">
                    {tracks.map((t) => (
                      <li key={t.value} className="capitalize bg-muted/60 text-foreground/80 px-2.5 py-1 rounded-md text-xs font-medium border border-border/50 shadow-sm transition-colors hover:bg-muted">
                        {t.label}
                      </li>
                    ))}
                  </ul>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2 mt-auto"
                      >
                        Programs
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="w-[--radix-dropdown-menu-trigger-width]"
                    >
                      {tracks.map((t) => (
                        <DropdownMenuItem
                          key={t.value}
                          onClick={() => handleEnroll(program, t.value)}
                          className="gap-2 cursor-pointer"
                        >
                          {t.label}
                          <ArrowRight className="w-4 h-4 ml-auto" />
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
