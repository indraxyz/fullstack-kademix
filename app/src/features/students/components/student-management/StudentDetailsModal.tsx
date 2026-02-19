"use client";

import { Student } from "../../types/student";
import { formatDateTime } from "@/app/src/shared/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Calendar,
  MapPin,
  Clock,
  Phone,
  GraduationCap,
  Users,
  FileText,
  Monitor,
  BookOpen,
  Pencil,
} from "lucide-react";

function DetailRow({
  icon: Icon,
  label,
  value,
  suffix,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number | null | undefined;
  suffix?: string;
}) {
  const display = value != null && value !== "" ? `${value}${suffix ?? ""}` : "—";
  return (
    <div className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
      <Icon className="h-4 w-4 text-primary/60 shrink-0 mt-0.5" />
      <div className="min-w-0 flex-1">
        <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
          {label}
        </dt>
        <dd className="text-sm font-medium text-foreground break-words">{display}</dd>
      </div>
    </div>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-muted/30 p-4">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        {title}
      </h3>
      <div className="space-y-0">{children}</div>
    </section>
  );
}

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

const programDisplay = (student: Student) => {
  if (student.studyPrograms?.length) {
    return student.studyPrograms.join(", ");
  }
  if (student.studyProgram === "Coding" && student.codingTrack) {
    return `Coding – ${student.codingTrack.charAt(0).toUpperCase()}${student.codingTrack.slice(1)}`;
  }
  return student.studyProgram ?? undefined;
};

export function StudentDetailsModal({
  student,
  onClose,
  onEdit,
}: StudentDetailsModalProps) {
  if (!student) return null;

  return (
    <Dialog open={!!student} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-hidden p-0 flex flex-col">
        <div className="shrink-0 relative bg-gradient-to-br from-primary/15 via-primary/5 to-background px-6 pt-6 pb-5">
          <DialogHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-md ring-2 ring-background">
                <AvatarImage src={student.photo ?? undefined} alt={student.name ?? "Student"} />
                <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                  {getInitials(student.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <DialogTitle className="text-xl font-semibold tracking-tight">
                  {student.name ?? "Unknown Student"}
                </DialogTitle>
                <DialogDescription className="text-sm mt-0.5">
                  {student.email || "No email"}
                </DialogDescription>
                {student.age != null && (
                  <span className="inline-block mt-2 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                    {student.age} years old
                  </span>
                )}
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 space-y-4">
          <DetailSection title="Contact">
            <DetailRow icon={Mail} label="Email" value={student.email} />
            <DetailRow icon={Phone} label="Phone" value={student.phoneNumber} />
            <div className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
              <MapPin className="h-4 w-4 text-primary/60 shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
                  Address
                </dt>
                <dd className="text-sm font-medium text-foreground break-words">
                  {student.address ?? "—"}
                </dd>
              </div>
            </div>
          </DetailSection>

          <DetailSection title="Education & program">
            <DetailRow icon={GraduationCap} label="Education" value={student.latestEducation} />
            <DetailRow icon={Users} label="Gender" value={student.gender} />
            <DetailRow icon={Monitor} label="Class mode" value={student.classMode} />
            <DetailRow icon={BookOpen} label="Programs" value={programDisplay(student)} />
            <DetailRow icon={Calendar} label="Date of birth" value={student.dateOfBirth} />
          </DetailSection>

          {student.notes && (
            <DetailSection title="Notes">
              <div className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                <FileText className="h-4 w-4 text-primary/60 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <dd className="text-sm font-medium text-foreground whitespace-pre-wrap">
                    {student.notes}
                  </dd>
                </div>
              </div>
            </DetailSection>
          )}

          <div className="flex items-center gap-3 rounded-xl border bg-muted/30 px-4 py-3">
            <Clock className="h-4 w-4 text-primary/60 shrink-0" />
            <div>
              <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Last updated
              </dt>
              <dd className="text-sm font-medium">{formatDateTime(student.updatedAt)}</dd>
            </div>
          </div>
        </div>

        <DialogFooter className="shrink-0 gap-2 border-t bg-background px-6 py-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
            Close
          </Button>
          {onEdit && (
            <Button
              type="button"
              onClick={() => {
                onClose();
                onEdit(student);
              }}
              className="flex-1 sm:flex-none min-w-[120px]"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit student
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
