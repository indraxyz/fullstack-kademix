"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/src/cart/useCart";
import { STUDENT_FORM_CONSTANTS } from "@/app/src/shared/validation/studentSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  ArrowLeft,
  ShoppingCart,
  Trash2,
  Loader2,
  PlusCircle,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

const codingTrackLabels: Record<string, string> = {
  fundamental: "Fundamental",
  frontend: "Frontend",
  backend: "Backend",
  fullstack: "Fullstack",
};

function optionToCartItem(option: string): {
  studyProgram: string;
  codingTrack?: string;
} {
  if (option.startsWith("Coding – ")) {
    const track = option.slice("Coding – ".length).toLowerCase();
    return { studyProgram: "Coding", codingTrack: track };
  }
  return { studyProgram: option };
}

export default function CartPage() {
  const router = useRouter();
  const { items, addItem, removeItem, clear } = useCart();
  const [addProgramValue, setAddProgramValue] = useState("");

  const handleAddProgram = (value: string) => {
    if (!value) return;
    const item = optionToCartItem(value);
    addItem(item);
    setAddProgramValue("");
    toast.success("Added to cart", {
      description: value,
    });
  };

  const handleCheckout = () => {
    router.push("/students-register");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Button variant="ghost" asChild className="-ml-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <ThemeToggle />
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">
                    Enrollment Cart
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {items.length === 0
                      ? "Add study programs, then checkout to register."
                      : `${items.length} program(s) selected. Proceed to checkout to register as a student.`}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                <label className="text-sm font-medium text-foreground">
                  Add program
                </label>
                <Select
                  value={addProgramValue}
                  onValueChange={(v) => {
                    handleAddProgram(v);
                  }}
                >
                  <SelectTrigger className="w-full sm:w-[220px] h-10">
                    <SelectValue placeholder="Select program to add" />
                  </SelectTrigger>
                  <SelectContent>
                    {STUDENT_FORM_CONSTANTS.studyProgramOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {items.length === 0 ? (
                <div className="rounded-lg border border-dashed py-8 text-center text-muted-foreground">
                  <p className="mb-4">Your cart is empty.</p>
                  <p className="text-sm mb-4">
                    Use the select above for adding programs.
                  </p>
                  {/* <Button asChild variant="outline" className="gap-2">
                    <Link href="/#programs">
                      <PlusCircle className="h-4 w-4" />
                      Browse programs
                    </Link>
                  </Button> */}
                </div>
              ) : (
                <>
                  <ul className="space-y-2">
                    {items.map((item, index) => (
                      <li
                        key={`${item.studyProgram}-${item.codingTrack ?? ""}-${index}`}
                        className="flex items-center justify-between rounded-lg border bg-card px-4 py-3"
                      >
                        <span className="font-medium">
                          {item.studyProgram}
                          {item.codingTrack
                            ? ` · ${codingTrackLabels[item.codingTrack] ?? item.codingTrack}`
                            : ""}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label="Remove"
                          onClick={() => removeItem(index)}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-between pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        clear();
                      }}
                    >
                      Clear cart
                    </Button>
                    <Button onClick={handleCheckout} className="gap-2">
                      <ArrowRight className="h-4 w-4" />
                      Checkout
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
