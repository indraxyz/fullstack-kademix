import Link from "next/link";
import { learnPrograms } from "@/app/src/features/learn/data/programs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LearnPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to Kademix Learning</h1>
        <p className="text-muted-foreground text-lg">
          Select a program below to start mastering new skills.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {learnPrograms.map((program) => (
          <Card key={program.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{program.title}</CardTitle>
              <CardDescription>{program.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-2">
              {program.courses.map((course) => (
                <Link key={course.id} href={course.href} className="w-full">
                  <Button variant="outline" className="w-full justify-start">
                    {course.title}
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
