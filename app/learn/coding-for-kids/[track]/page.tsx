import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default async function CodingTrackPage({ params }: { params: { track: string } }) {
  const resolvedParams = await params;
  const { track } = resolvedParams;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 capitalize">
          {track.replace("-", " ")}
        </h1>
        <p className="text-muted-foreground text-lg">
          Detailed curriculum and materials for this track are currently under development.
        </p>
      </div>

      <Card className="border-dashed border-2">
        <CardContent className="pt-6 flex flex-col items-center justify-center text-center min-h-[300px] text-muted-foreground">
          <Construction className="w-16 h-16 mb-4 text-primary/40" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Content Coming Soon</h2>
          <p className="max-w-md">
            We are working hard to prepare the best interactive learning materials for {track.replace("-", " ")}. 
            Please check back later or enroll to get notified!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
