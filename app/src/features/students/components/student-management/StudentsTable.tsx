"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { Student } from "../../types/student";
import { formatDateTime } from "@/app/src/shared/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Eye,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SortableField = keyof Pick<
  Student,
  "name" | "email" | "age" | "address" | "createdAt" | "updatedAt"
>;

export interface StudentsTableProps {
  students: Student[];
  selectedIds: Set<string>;
  disabled?: boolean;
  onSelect: (id: string, selected: boolean) => void;
  onSelectAll: () => void;
  onDetails: (student: Student) => void;
  onEdit: (student: Student) => void;
  onDeleteRequest: (id: string, name?: string | null) => void;
  sortBy?: SortableField;
  sortOrder?: "asc" | "desc";
  onColumnSort?: (field: SortableField) => void;
}

function SortableHeader({
  label,
  field,
  sortBy,
  sortOrder,
  onColumnSort,
  className,
}: {
  label: string;
  field: SortableField;
  sortBy?: SortableField;
  sortOrder?: "asc" | "desc";
  onColumnSort?: (field: SortableField) => void;
  className?: string;
}) {
  const isActive = sortBy === field;
  const canSort = !!onColumnSort;

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "h-auto gap-1 font-semibold hover:bg-muted/50 -ml-2",
        isActive && "text-foreground",
        className,
      )}
      onClick={() => canSort && onColumnSort(field)}
      disabled={!canSort}
    >
      {label}
      {canSort &&
        (isActive ? (
          sortOrder === "asc" ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )
        ) : (
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        ))}
    </Button>
  );
}

export function StudentsTable({
  students,
  selectedIds,
  disabled = false,
  onSelect,
  onSelectAll,
  onDetails,
  onEdit,
  onDeleteRequest,
  sortBy,
  sortOrder = "asc",
  onColumnSort,
}: StudentsTableProps) {
  const allSelected =
    students.length > 0 && selectedIds.size === students.length;
  const someSelected = selectedIds.size > 0;

  const columns: ColumnDef<Student>[] = [
    {
      id: "select",
      header: () => (
        <Checkbox
          checked={allSelected ? true : someSelected ? "indeterminate" : false}
          onCheckedChange={onSelectAll}
          disabled={disabled}
          aria-label="Select all"
          className="h-4 w-4"
        />
      ),
      cell: ({ row }) => {
        const id = row.original.id;
        if (!id) return null;
        return (
          <Checkbox
            checked={selectedIds.has(id)}
            onCheckedChange={(checked) => onSelect(id, !!checked)}
            disabled={disabled}
            aria-label={`Select ${row.original.name ?? id}`}
            className="h-4 w-4"
            onClick={(e) => e.stopPropagation()}
          />
        );
      },
      size: 44,
      meta: { sticky: "left" },
    },
    {
      accessorKey: "name",
      header: () => (
        <SortableHeader
          label="Name"
          field="name"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onColumnSort={onColumnSort}
        />
      ),
      cell: ({ row }) => (
        <span className="font-medium truncate max-w-[180px] block">
          {row.original.name ?? "—"}
        </span>
      ),
      size: 180,
    },
    {
      accessorKey: "email",
      header: () => (
        <SortableHeader
          label="Mail"
          field="email"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onColumnSort={onColumnSort}
        />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground truncate max-w-[220px] block">
          {row.original.email ?? "—"}
        </span>
      ),
      size: 220,
    },
    {
      accessorKey: "age",
      header: () => (
        <SortableHeader
          label="Age"
          field="age"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onColumnSort={onColumnSort}
        />
      ),
      cell: ({ row }) => (
        <span className="tabular-nums">{row.original.age ?? "—"}</span>
      ),
      size: 80,
    },
    {
      accessorKey: "address",
      header: () => (
        <SortableHeader
          label="Address"
          field="address"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onColumnSort={onColumnSort}
        />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground truncate max-w-[240px] block">
          {row.original.address ?? "—"}
        </span>
      ),
      size: 240,
    },
    {
      id: "updatedAt",
      header: () => (
        <SortableHeader
          label="Updated"
          field="updatedAt"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onColumnSort={onColumnSort}
        />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm whitespace-nowrap">
          {formatDateTime(row.original.updatedAt)}
        </span>
      ),
      size: 140,
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div className="flex items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => e.stopPropagation()}
                  disabled={disabled}
                  aria-label="Actions"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onDetails(student);
                  }}
                  className="cursor-pointer"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(student);
                  }}
                  className="cursor-pointer"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteRequest(student.id, student.name);
                  }}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      size: 140,
      meta: { sticky: "right" },
    },
  ];

  const table = useReactTable({
    data: students,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id ?? String(row.email ?? Math.random()),
  });

  return (
    <div className="rounded-lg border overflow-hidden overflow-x-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => {
                const meta = header.column.columnDef.meta as
                  | { sticky?: "left" | "right" }
                  | undefined;
                const isStickyLeft = meta?.sticky === "left";
                const isStickyRight = meta?.sticky === "right";
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "bg-muted/50 font-semibold whitespace-nowrap",
                      isStickyLeft &&
                        "sticky left-0 z-10 min-w-[44px] bg-muted/95 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]",
                      isStickyRight &&
                        "sticky right-0 z-10 text-right bg-muted/95 shadow-[-2px_0_4px_-2px_rgba(0,0,0,0.1)]",
                    )}
                    style={
                      header.column.getSize()
                        ? {
                            width: header.column.getSize(),
                            maxWidth: header.column.getSize(),
                          }
                        : undefined
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className={cn(
                "hover:bg-muted/30",
                selectedIds.has(row.original.id) && "bg-primary/5",
              )}
            >
              {row.getVisibleCells().map((cell) => {
                const meta = cell.column.columnDef.meta as
                  | { sticky?: "left" | "right" }
                  | undefined;
                const isStickyLeft = meta?.sticky === "left";
                const isStickyRight = meta?.sticky === "right";
                return (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      isStickyLeft &&
                        "sticky left-0 z-10 bg-background shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)]",
                      isStickyRight &&
                        "sticky right-0 z-10 bg-background text-right shadow-[-2px_0_4px_-2px_rgba(0,0,0,0.08)]",
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
