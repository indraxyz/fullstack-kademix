"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookOpen,
  FileSpreadsheet,
  Code,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { STUDENT_FORM_CONSTANTS } from "@/app/src/shared/validation/studentSchema";
import { useCart } from "@/app/src/features/cart/useCart";
import { toast } from "sonner";

const programIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "Office Administration": BookOpen,
  Excel: FileSpreadsheet,
  Coding: Code,
};

const codingTracks = [
  { value: "fundamental", label: "Fundamental" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "fullstack", label: "Fullstack" },
];

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
            const isCoding = program === "Coding";
            return (
              <Card
                key={program}
                className="shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="px-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {program}
                  </h3>
                  {isCoding ? (
                    <ul className="text-sm text-muted-foreground mb-4 flex flex-wrap gap-2">
                      {codingTracks.map((t) => (
                        <li key={t.value} className="capitalize">
                          {t.label}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground text-sm mb-4">
                      Practical, hands-on training for real-world use.
                    </p>
                  )}
                  {isCoding ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-2"
                        >
                          Enroll
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="w-[--radix-dropdown-menu-trigger-width]"
                      >
                        {codingTracks.map((t) => (
                          <DropdownMenuItem
                            key={t.value}
                            onClick={() => handleEnroll(program, t.value)}
                            className="gap-2"
                          >
                            {t.label}
                            <ArrowRight className="w-4 h-4 ml-auto" />
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => handleEnroll(program)}
                    >
                      Enroll
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
