"use client";

import type { FormEvent } from "react";
import { StudentFormData, StudentFormErrors } from "../../types/student";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  X,
  Loader2,
  UserPlus,
  UserPen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StudentFormFields } from "./StudentFormFields";

export interface StudentFormModalProps {
  isEditing: boolean;
  formData: StudentFormData;
  errors: StudentFormErrors;
  isSubmitting: boolean;
  onInputChange: (field: keyof StudentFormData, value: string | number | undefined | string[]) => void;
  onPhotoChange?: (file: File | null) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  formError: string | null;
  photoPreview?: string | null;
}

export function StudentFormModal({
  isEditing,
  formData,
  errors,
  isSubmitting,
  onInputChange,
  onPhotoChange,
  onSubmit,
  onClose,
  formError,
  photoPreview,
}: StudentFormModalProps) {
  const getInitials = (name: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg overflow-hidden p-0">
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background px-6 pt-6 pb-4">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  isEditing
                    ? "bg-primary/20 text-primary"
                    : "bg-primary text-primary-foreground"
                )}
              >
                {isEditing ? (
                  <UserPen className="h-5 w-5" />
                ) : (
                  <UserPlus className="h-5 w-5" />
                )}
              </div>
              <div>
                <DialogTitle className="text-xl">
                  {isEditing ? "Edit Student" : "Add New Student"}
                </DialogTitle>
                <DialogDescription className="text-sm">
                  {isEditing
                    ? "Update the student information below"
                    : "Fill in the details to add a new student"}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Error Banner */}
        {formError && (
          <div className="mx-6 mt-4 flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive animate-in slide-in-from-top-2 duration-300">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="flex-1">{formError}</p>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-destructive/20"
              onClick={() => {}}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <form onSubmit={onSubmit} className="px-6 py-4 space-y-5">
          <StudentFormFields
            formData={formData}
            errors={errors}
            onInputChange={onInputChange}
            showPhotoSection={true}
            photoPreview={photoPreview}
            onPhotoChange={onPhotoChange}
            getInitials={getInitials}
          />
          <Separator />

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sm:flex-none min-w-[140px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : isEditing ? (
                <>
                  <UserPen className="h-4 w-4" />
                  Update Student
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Add Student
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
