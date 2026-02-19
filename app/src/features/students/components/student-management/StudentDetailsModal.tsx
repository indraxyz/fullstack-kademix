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
    <>
      <div className="flex items-center gap-3 text-sm">
        <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
        <dt className="text-muted-foreground w-28 shrink-0">{label}</dt>
        <dd className="font-medium min-w-0 truncate">{display}</dd>
      </div>
      <Separator />
    </>
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
          <dl className="grid gap-0">
            <DetailRow icon={Mail} label="Email" value={student.email} />
            <DetailRow icon={Calendar} label="Age" value={student.age} suffix=" years" />
            <DetailRow icon={Calendar} label="Date of birth" value={student.dateOfBirth} />
            <DetailRow icon={Phone} label="Phone" value={student.phoneNumber} />
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <dt className="text-muted-foreground mb-1">Address</dt>
                <dd className="font-medium">{student.address ?? "—"}</dd>
              </div>
            </div>
            <Separator />
            <DetailRow icon={GraduationCap} label="Education" value={student.latestEducation} />
            <DetailRow icon={Users} label="Gender" value={student.gender} />
            <DetailRow icon={Monitor} label="Class" value={student.classMode} />
            <DetailRow
              icon={BookOpen}
              label="Programs"
              value={
                student.studyPrograms?.length
                  ? student.studyPrograms.join(", ")
                  : student.studyProgram
                    ? student.studyProgram === "Coding" && student.codingTrack
                      ? `Coding – ${student.codingTrack.charAt(0).toUpperCase()}${student.codingTrack.slice(1)}`
                      : student.studyProgram
                    : undefined
              }
            />
            {student.notes && (
              <>
                <div className="flex items-start gap-3 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <dt className="text-muted-foreground mb-1">Notes</dt>
                    <dd className="font-medium whitespace-pre-wrap">{student.notes}</dd>
                  </div>
                </div>
                <Separator />
              </>
            )}
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
              <dt className="text-muted-foreground w-28 shrink-0">Updated</dt>
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
