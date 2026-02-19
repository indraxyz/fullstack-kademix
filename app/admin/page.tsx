import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GraduationCap, ArrowRight } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Admin Dashboard
        </h1>
        {/* <p className="text-muted-foreground">
          Manage students and content for Kademix.
        </p> */}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold">Students</h2>
            <p className="text-sm text-muted-foreground">
              View, add, edit, and remove student records.
            </p>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/students" className="gap-2">
                Manage Students
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
