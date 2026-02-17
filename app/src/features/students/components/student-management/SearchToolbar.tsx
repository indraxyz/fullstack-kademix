"use client";

import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Users,
  Loader2,
  LayoutGrid,
  Table2,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchStats } from "./types";

export type ViewMode = "cards" | "table";

export interface SearchToolbarProps {
  searchTerm: string;
  stats: SearchStats;
  isLoading?: boolean;
  onSearchChange: (value: string) => void;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  showViewSwitcher?: boolean;
  onOpenFilter?: () => void;
  hasActiveFilters?: boolean;
  ageRange?: [number, number];
}

export function SearchToolbar({
  searchTerm,
  stats,
  isLoading = false,
  onSearchChange,
  viewMode = "cards",
  onViewModeChange,
  showViewSwitcher = false,
  onOpenFilter,
  hasActiveFilters = false,
  ageRange,
}: SearchToolbarProps) {
  const showAgeRange =
    ageRange &&
    (ageRange[0] !== 1 || ageRange[1] !== 120);
  const searchInputId = useId();

  return (
    <div className="space-y-3">
      <div className="flex flex-row items-center gap-2 overflow-x-auto">
        {/* Search Input */}
        <div className="relative flex-1 group min-w-64 shrink-0">
          <Search
            className={cn(
              "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-200",
              searchTerm ? "text-primary" : "text-muted-foreground",
              "group-focus-within:text-primary",
            )}
          />
          <label htmlFor={searchInputId} className="sr-only">
            Search student
          </label>
          <Input
            id={searchInputId}
            type="search"
            placeholder="Search name, email, address..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(
              "pl-10 h-11 transition-all duration-200",
              "focus:ring-2 focus:ring-primary/20 focus:border-primary",
              searchTerm && "border-primary/50 bg-primary/5",
            )}
          />
        </div>

        {/* Filter button */}
        {onOpenFilter && (
          <Button
            type="button"
            variant={hasActiveFilters ? "secondary" : "outline"}
            size="icon"
            className={cn(
              "h-10 w-10 shrink-0",
              hasActiveFilters && "border-primary/50 bg-primary/5",
            )}
            onClick={onOpenFilter}
            aria-label="Open filter and sort"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        )}

        {showViewSwitcher && onViewModeChange && (
          <div className="flex items-center gap-1 rounded-lg border border-border/50 p-1 bg-muted/30 shrink-0">
            <Button
              variant={viewMode === "cards" ? "secondary" : "ghost"}
              size="sm"
              className="h-8 gap-1.5"
              onClick={() => onViewModeChange("cards")}
              aria-pressed={viewMode === "cards"}
              aria-label="Card view"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Cards</span>
            </Button>
            <Button
              variant={viewMode === "table" ? "secondary" : "ghost"}
              size="sm"
              className="h-8 gap-1.5"
              onClick={() => onViewModeChange("table")}
              aria-pressed={viewMode === "table"}
              aria-label="Table view"
            >
              <Table2 className="h-4 w-4" />
              <span className="hidden sm:inline">Table</span>
            </Button>
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {isLoading ? (
          <Badge variant="secondary" className="gap-1.5 font-normal">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Loading...
          </Badge>
        ) : (
          <>
            <Users className="h-4 w-4 shrink-0" />
            {stats.hasSearch ? (
              <span>
                <span className="font-medium text-foreground">
                  {stats.filtered}
                </span>{" "}
                of {stats.total} students
              </span>
            ) : (
              <span>
                <span className="font-medium text-foreground">
                  {stats.total}
                </span>{" "}
                student{stats.total !== 1 ? "s" : ""}
              </span>
            )}
            {showAgeRange && ageRange && (
              <Badge variant="outline" className="font-normal">
                Age: {ageRange[0]}–{ageRange[1]}
              </Badge>
            )}
          </>
        )}
      </div>
    </div>
  );
}
