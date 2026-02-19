"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Play, ImageIcon } from "lucide-react";

const placeholderItems = [
  { id: "1", type: "image", title: "Classroom session" },
  { id: "2", type: "video", title: "Coding workshop" },
  { id: "3", type: "image", title: "Excel training" },
  { id: "4", type: "video", title: "Graduation day" },
  { id: "5", type: "image", title: "Office skills lab" },
  { id: "6", type: "video", title: "Student project demo" },
];

export function ActivitiesSection() {
  return (
    <section id="activities" className="py-16 sm:py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Activities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A glimpse of our classes, workshops, and events.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {placeholderItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group py-0"
            >
              <div className="aspect-video bg-muted flex items-center justify-center relative">
                {item.type === "video" ? (
                  <Play className="w-16 h-16 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                ) : (
                  <ImageIcon className="w-16 h-16 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                )}
              </div>
              <CardContent className="p-3">
                <p className="text-sm font-medium text-foreground truncate">
                  {item.title}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
