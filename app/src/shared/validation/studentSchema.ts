import { z } from "zod";

const latestEducationOptions = [
  "Primary",
  "Junior",
  "Senior",
  "Vocational",
  "Associate Degree",
  "Bachelor Degree",
  "Master",
  "Doctoral",
] as const;
const genderOptions = ["Male", "Female", "Other"] as const;
const classModeOptions = ["online", "offline"] as const;
const studyProgramCards = [
  "Office Administration",
  "Excel",
  "Coding",
] as const;

const studyProgramOptions = [
  "Office Administration",
  "Excel",
  "Coding – Fundamental",
  "Coding – Frontend",
  "Coding – Backend",
  "Coding – Fullstack",
] as const;

const codingTrackOptions = [
  "fundamental",
  "frontend",
  "backend",
  "fullstack",
] as const;

export const studentFormSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email format")
    .trim()
    .toLowerCase(),
  age: z
    .number({ message: "Age is required" })
    .int("Age must be an integer")
    .min(1, "Age must be at least 1")
    .max(120, "Age must be less than 120"),
  address: z
    .string({ message: "Address is required" })
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be less than 500 characters")
    .trim(),
  photo: z.string().nullable().optional(),
  dateOfBirth: z
    .string()
    .optional()
    .refine((v) => !v || !Number.isNaN(Date.parse(v)), "Invalid date"),
  phoneNumber: z
    .string()
    .max(30, "Phone must be less than 30 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  latestEducation: z.enum(latestEducationOptions).optional().nullable(),
  gender: z.enum(genderOptions).optional().nullable(),
  notes: z
    .string()
    .max(2000, "Notes must be less than 2000 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  classMode: z.enum(classModeOptions).optional().nullable(),
  studyPrograms: z.array(z.enum(studyProgramOptions)).optional().nullable(),
}).refine((data) => (data.studyPrograms?.length ?? 0) >= 1, {
  message: "Select at least one study program",
  path: ["studyPrograms"],
});

export type StudentFormSchema = z.infer<typeof studentFormSchema>;

export const STUDENT_FORM_CONSTANTS = {
  latestEducationOptions: [...latestEducationOptions],
  genderOptions: [...genderOptions],
  classModeOptions: [...classModeOptions],
  studyProgramCards: [...studyProgramCards],
  studyProgramOptions: [...studyProgramOptions],
  codingTrackOptions: [...codingTrackOptions],
} as const;
