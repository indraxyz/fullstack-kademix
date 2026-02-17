"use client";

import { useEffect, useState } from "react";
import { Student } from "../../types/student";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";

const AGE_MIN = 1;
const AGE_MAX = 120;

export interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sortBy: keyof Student;
  sortOrder: "asc" | "desc";
  sortOptions: readonly { value: keyof Student | string; label: string }[];
  onSortChange: (value: keyof Student) => void;
  onToggleSortOrder: () => void;
  ageRange: [number, number];
  onAgeRangeChange: (value: [number, number]) => void;
  onApply?: () => void;
  onReset?: () => void;
}

export function FilterDialog({
  open,
  onOpenChange,
  sortBy,
  sortOrder,
  sortOptions,
  onSortChange,
  onToggleSortOrder,
  ageRange,
  onAgeRangeChange,
  onApply,
  onReset,
}: FilterDialogProps) {
  const [draftAgeRange, setDraftAgeRange] = useState<[number, number]>(ageRange);

  useEffect(() => {
    if (open) {
      setDraftAgeRange(ageRange);
    }
  }, [open, ageRange]);

  const handleReset = () => {
    setDraftAgeRange([AGE_MIN, AGE_MAX]);
    onSortChange("name");
    onReset?.();
  };

  const handleApply = () => {
    onAgeRangeChange(draftAgeRange);
    onApply?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filter &amp; sort</DialogTitle>
          <DialogDescription>
            Refine results by age range and sort order.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <div className="space-y-2">
            <Label>Sort by</Label>
            <div className="flex items-center gap-2">
              <Select
                value={sortBy}
                onValueChange={(value) => onSortChange(value as keyof Student)}
              >
                <SelectTrigger className="flex-1 h-10">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="cursor-pointer"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant={sortOrder === "desc" ? "default" : "outline"}
                size="icon"
                className="h-10 w-10 shrink-0"
                onClick={onToggleSortOrder}
                title={sortOrder === "asc" ? "Ascending" : "Descending"}
              >
                {sortOrder === "asc" ? (
                  <ArrowUpAZ className="h-4 w-4" />
                ) : (
                  <ArrowDownAZ className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Age range</Label>
              <span className="text-sm text-muted-foreground tabular-nums">
                {draftAgeRange[0]} – {draftAgeRange[1]} years
              </span>
            </div>
            <Slider
              min={AGE_MIN}
              max={AGE_MAX}
              step={1}
              value={draftAgeRange}
              onValueChange={(value) =>
                setDraftAgeRange(value as [number, number])
              }
              className="w-full"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button type="button" onClick={handleApply}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
