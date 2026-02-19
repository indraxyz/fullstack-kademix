import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Excel Program",
    text: "Kademix helped me master Excel from basics to advanced. Now I use it daily at work.",
  },
  {
    name: "Siti Aminah",
    role: "Office Administration",
    text: "The instructors are patient and the materials are very practical. Highly recommended.",
  },
  {
    name: "Andi Wijaya",
    role: "Coding — Fullstack",
    text: "I switched career to web development after completing the Fullstack track. Great institute.",
  },
];

export function TestimonySection() {
  return (
    <section id="testimonials" className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from our alumni and current students.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="shadow-lg border-l-4 border-l-primary py-0"
            >
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-primary/50 mb-4" />
                <p className="text-muted-foreground mb-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
