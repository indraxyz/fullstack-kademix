"use client";

import { Student } from "../../types/student";
import { formatDateTime } from "@/app/src/shared/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Calendar, MapPin, Clock } from "lucide-react";

export interface StudentDetailsModalProps {
  student: Student | null;
  onClose: () => void;
  onEdit?: (student: Student) => void;
}

function getInitials(name: string | null | undefined): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function StudentDetailsModal({
  student,
  onClose,
  onEdit,
}: StudentDetailsModalProps) {
  if (!student) return null;

  return (
    <Dialog open={!!student} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md overflow-hidden p-0">
        <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background px-6 pt-6 pb-4">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage src={student.photo} alt={student.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {getInitials(student.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-xl">
                  {student.name ?? "Unknown Student"}
                </DialogTitle>
                <DialogDescription className="text-sm">
                  Student details
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="px-6 py-4 space-y-4">
          <dl className="grid gap-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
              <dt className="text-muted-foreground w-20 shrink-0">Email</dt>
              <dd className="truncate font-medium min-w-0">{student.email ?? "—"}</dd>
            </div>
            <Separator />
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
              <dt className="text-muted-foreground w-20 shrink-0">Age</dt>
              <dd className="font-medium">{student.age ?? "—"} years</dd>
            </div>
            <Separator />
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <dt className="text-muted-foreground mb-1">Address</dt>
                <dd className="font-medium">{student.address ?? "—"}</dd>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
              <dt className="text-muted-foreground w-20 shrink-0">Updated</dt>
              <dd className="font-medium">{formatDateTime(student.updatedAt)}</dd>
            </div>
          </dl>

          {onEdit && (
            <>
              <Separator />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onEdit(student);
                  }}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Edit student
                </button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
