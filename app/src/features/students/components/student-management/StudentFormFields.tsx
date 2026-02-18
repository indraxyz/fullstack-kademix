"use client";

import { StudentFormData, StudentFormErrors } from "../../types/student";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  User,
  Mail,
  Calendar,
  MapPin,
  ImagePlus,
  X,
  Phone,
  GraduationCap,
  Users,
  FileText,
  Monitor,
  BookOpen,
} from "lucide-react";
import { STUDENT_FORM_CONSTANTS } from "@/app/src/shared/validation/studentSchema";

function FormField({
  label,
  required,
  error,
  children,
  htmlFor,
  icon: Icon,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  htmlFor: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={htmlFor}
        className={cn(
          "flex items-center gap-2 text-sm font-medium",
          error && "text-destructive"
        )}
      >
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-destructive animate-in slide-in-from-top-1 duration-200">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}

export interface StudentFormFieldsProps {
  formData: StudentFormData;
  errors: StudentFormErrors;
  onInputChange: (field: keyof StudentFormData, value: string | number | undefined) => void;
  showPhotoSection?: boolean;
  photoPreview?: string | null;
  onPhotoChange?: (file: File | null) => void;
  getInitials?: (name: string) => string;
}

export function StudentFormFields({
  formData,
  errors,
  onInputChange,
  showPhotoSection = true,
  photoPreview,
  onPhotoChange,
  getInitials = (name) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "?",
}: StudentFormFieldsProps) {
  return (
    <>
      {showPhotoSection && (
        <>
          <div className="flex items-start gap-4">
            <div className="relative group">
              <Avatar className="h-20 w-20 border-4 border-background shadow-lg ring-2 ring-border">
                <AvatarImage src={photoPreview || undefined} alt="Preview" />
                <AvatarFallback className="bg-muted text-muted-foreground text-lg">
                  {formData.name ? (
                    getInitials(formData.name)
                  ) : (
                    <User className="h-8 w-8" />
                  )}
                </AvatarFallback>
              </Avatar>
              {photoPreview && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -right-1 -top-1 h-6 w-6 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onPhotoChange?.(null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <ImagePlus className="h-4 w-4 text-muted-foreground" />
                Profile Photo
              </Label>
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="photo"
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-lg",
                    "border-2 border-dashed border-muted-foreground/25",
                    "px-4 py-2.5 text-sm font-medium transition-all duration-200",
                    "hover:border-primary/50 hover:bg-primary/5",
                    "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                  )}
                >
                  <ImagePlus className="h-4 w-4 text-primary" />
                  {photoPreview ? "Change Photo" : "Upload Photo"}
                </Label>
                <input
                  id="photo"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    onPhotoChange?.(file);
                  }}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                JPG, JPEG, or PNG. Max 1MB.
              </p>
              {errors.photo && (
                <p className="flex items-center gap-1.5 text-xs text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  {errors.photo}
                </p>
              )}
            </div>
          </div>
          <div className="border-t my-4" />
        </>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Full Name"
          required
          error={errors.name}
          htmlFor="name"
          icon={User}
        >
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            placeholder="John Doe"
            aria-invalid={!!errors.name}
            className={cn(
              "h-10 transition-all duration-200",
              errors.name &&
                "border-destructive focus-visible:ring-destructive/30"
            )}
          />
        </FormField>

        <FormField
          label="Age"
          required
          error={errors.age}
          htmlFor="age"
          icon={Calendar}
        >
          <Input
            id="age"
            type="number"
            min={1}
            max={120}
            value={formData.age || ""}
            onChange={(e) =>
              onInputChange("age", e.target.value ? parseInt(e.target.value, 10) : 0)
            }
            placeholder="18"
            aria-invalid={!!errors.age}
            className={cn(
              "h-10 transition-all duration-200",
              errors.age && "border-destructive focus-visible:ring-destructive/30"
            )}
          />
        </FormField>
      </div>

      <FormField
        label="Email Address"
        required
        error={errors.email}
        htmlFor="email"
        icon={Mail}
      >
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange("email", e.target.value)}
          placeholder="john.doe@example.com"
          aria-invalid={!!errors.email}
          className={cn(
            "h-10 transition-all duration-200",
            errors.email &&
              "border-destructive focus-visible:ring-destructive/30"
          )}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Date of Birth"
          error={errors.dateOfBirth}
          htmlFor="dateOfBirth"
          icon={Calendar}
        >
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth || ""}
            onChange={(e) => onInputChange("dateOfBirth", e.target.value)}
            aria-invalid={!!errors.dateOfBirth}
            className={cn(
              "h-10 transition-all duration-200",
              errors.dateOfBirth &&
                "border-destructive focus-visible:ring-destructive/30"
            )}
          />
        </FormField>

        <FormField
          label="Phone Number"
          error={errors.phoneNumber}
          htmlFor="phoneNumber"
          icon={Phone}
        >
          <Input
            id="phoneNumber"
            type="tel"
            value={formData.phoneNumber || ""}
            onChange={(e) => onInputChange("phoneNumber", e.target.value)}
            placeholder="+62 812 3456 7890"
            aria-invalid={!!errors.phoneNumber}
            className={cn(
              "h-10 transition-all duration-200",
              errors.phoneNumber &&
                "border-destructive focus-visible:ring-destructive/30"
            )}
          />
        </FormField>
      </div>

      <FormField
        label="Address"
        required
        error={errors.address}
        htmlFor="address"
        icon={MapPin}
      >
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => onInputChange("address", e.target.value)}
          placeholder="123 Main Street, City, Country"
          rows={3}
          className={cn(
            "resize-none transition-all duration-200",
            errors.address &&
              "border-destructive focus-visible:ring-destructive/30"
          )}
          aria-invalid={!!errors.address}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Latest Education"
          error={errors.latestEducation}
          htmlFor="latestEducation"
          icon={GraduationCap}
        >
          <Select
            value={formData.latestEducation ?? ""}
            onValueChange={(v) =>
              onInputChange("latestEducation", v || (undefined as never))
            }
          >
            <SelectTrigger
              id="latestEducation"
              className={cn(
                "w-full h-10",
                errors.latestEducation &&
                  "border-destructive focus-visible:ring-destructive/30"
              )}
            >
              <SelectValue placeholder="Select education" />
            </SelectTrigger>
            <SelectContent>
              {STUDENT_FORM_CONSTANTS.latestEducationOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField
          label="Gender"
          error={errors.gender}
          htmlFor="gender"
          icon={Users}
        >
          <Select
            value={formData.gender ?? ""}
            onValueChange={(v) =>
              onInputChange("gender", v || (undefined as never))
            }
          >
            <SelectTrigger
              id="gender"
              className={cn(
                "w-full h-10",
                errors.gender &&
                  "border-destructive focus-visible:ring-destructive/30"
              )}
            >
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              {STUDENT_FORM_CONSTANTS.genderOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Class"
          error={errors.classMode}
          htmlFor="classMode"
          icon={Monitor}
        >
          <Select
            value={formData.classMode ?? ""}
            onValueChange={(v) =>
              onInputChange("classMode", v || (undefined as never))
            }
          >
            <SelectTrigger
              id="classMode"
              className={cn(
                "w-full h-10",
                errors.classMode &&
                  "border-destructive focus-visible:ring-destructive/30"
              )}
            >
              <SelectValue placeholder="Online or Offline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField
          label="Study Program"
          error={errors.studyProgram}
          htmlFor="studyProgram"
          icon={BookOpen}
        >
          <Select
            value={formData.studyProgram ?? ""}
            onValueChange={(v) => {
              onInputChange("studyProgram", v || undefined);
              if (v !== "Coding") onInputChange("codingTrack", undefined);
            }}
          >
            <SelectTrigger
              id="studyProgram"
              className={cn(
                "w-full h-10",
                errors.studyProgram &&
                  "border-destructive focus-visible:ring-destructive/30"
              )}
            >
              <SelectValue placeholder="Select program" />
            </SelectTrigger>
            <SelectContent>
              {STUDENT_FORM_CONSTANTS.studyProgramOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      {formData.studyProgram === "Coding" && (
        <FormField
          label="Coding Track"
          error={errors.codingTrack}
          htmlFor="codingTrack"
          icon={BookOpen}
        >
          <Select
            value={formData.codingTrack ?? ""}
            onValueChange={(v) =>
              onInputChange("codingTrack", v || (undefined as never))
            }
          >
            <SelectTrigger
              id="codingTrack"
              className={cn(
                "w-full h-10",
                errors.codingTrack &&
                  "border-destructive focus-visible:ring-destructive/30"
              )}
            >
              <SelectValue placeholder="Select track" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fundamental">Fundamental</SelectItem>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
              <SelectItem value="fullstack">Fullstack</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      )}

      <FormField
        label="Notes"
        error={errors.notes}
        htmlFor="notes"
        icon={FileText}
      >
        <Textarea
          id="notes"
          value={formData.notes || ""}
          onChange={(e) => onInputChange("notes", e.target.value)}
          placeholder="Additional notes..."
          rows={3}
          className={cn(
            "resize-none transition-all duration-200",
            errors.notes &&
              "border-destructive focus-visible:ring-destructive/30"
          )}
          aria-invalid={!!errors.notes}
        />
      </FormField>
    </>
  );
}
