import { notFound } from "next/navigation";

interface PageProps {
  params: {
    framework: string;
    level: string;
  };
}

export default async function WebDevPage({ params }: PageProps) {
  // We need to await params in Next.js 15
  const resolvedParams = await params;
  const { framework, level } = resolvedParams;

  // Basic validation to ensure valid levels
  const validLevels = ["junior", "senior", "university", "professional"];
  if (!validLevels.includes(level)) {
    notFound();
  }

  return (
    <div className="flex flex-col items-start min-h-[50vh] space-y-6">
      <div>
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground mb-4 uppercase">
          {level} Level
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight capitalize">
          {framework.replace("-", " ")} Development
        </h1>
      </div>
      
      <p className="text-xl text-muted-foreground max-w-2xl">
        This specific pathway is currently under construction. When completed, it will provide an end-to-end curriculum for building modern web applications using {framework.replace("-", " ")} at a {level} level.
      </p>
    </div>
  );
}
