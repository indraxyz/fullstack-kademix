import { z } from "zod";

import { STUDENT_FORM_CONSTANTS, PROGRAM_TRACKS } from "@/app/src/shared/validation/studentSchema";

const nonEmptyString = z.string().min(1, "Value is required");

const latestEducationEnum = z.enum(
  STUDENT_FORM_CONSTANTS.latestEducationOptions as unknown as [string, ...string[]],
  { message: "Invalid latest education" }
);
const genderEnum = z.enum(
  STUDENT_FORM_CONSTANTS.genderOptions as unknown as [string, ...string[]],
  { message: "Invalid gender" }
);
const classModeEnum = z.enum(
  STUDENT_FORM_CONSTANTS.classModeOptions as unknown as [string, ...string[]],
  { message: "Class must be online or offline" }
);
const studyProgramEnum = z.enum(
  STUDENT_FORM_CONSTANTS.studyProgramCards as unknown as [string, ...string[]],
  { message: "Invalid study program" }
);
const studyProgramOptionEnum = z.enum(
  STUDENT_FORM_CONSTANTS.studyProgramOptions as unknown as [string, ...string[]],
  { message: "Invalid study program option" }
);

const trackValues = Object.values(PROGRAM_TRACKS).flatMap(tracks => tracks.map(t => t.value));
const codingTrackEnum = z.enum(
  trackValues as unknown as [string, ...string[]],
  { message: "Invalid track" }
);

export const studentInputSchema = z
  .object({
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
      .refine(
        (v) => !v || !isNaN(Date.parse(v)),
        "Invalid date of birth"
      ),
    phoneNumber: z
      .string()
      .max(30, "Phone must be less than 30 characters")
      .trim()
      .optional()
      .or(z.literal("")),
    latestEducation: latestEducationEnum.optional().nullable(),
    gender: genderEnum.optional().nullable(),
    notes: z
      .string()
      .max(2000, "Notes must be less than 2000 characters")
      .trim()
      .optional()
      .nullable()
      .or(z.literal("")),
    classMode: classModeEnum.optional().nullable(),
    studyProgram: studyProgramEnum.optional().nullable(),
    codingTrack: codingTrackEnum.optional().nullable(),
    studyPrograms: z.array(studyProgramOptionEnum).optional().nullable(),
  })
  .strict()
  .refine(
    (data) => {
      const hasPrograms = Array.isArray(data.studyPrograms) && data.studyPrograms.length >= 1;
      const hasLegacy = data.studyProgram != null;
      return hasPrograms || hasLegacy;
    },
    { message: "Provide at least one study program (studyPrograms or studyProgram)", path: ["studyPrograms"] }
  );

export const searchStudentInputSchema = z
  .object({
    searchTerm: z.string().max(200).optional(),
    sortBy: z
      .enum(["name", "email", "age", "address", "createdAt", "updatedAt"])
      .default("name"),
    sortOrder: z.enum(["asc", "desc"]).default("asc"),
    limit: z.number().int().min(1).max(100).default(50),
    offset: z.number().int().min(0).default(0),
    ageMin: z.number().int().min(0).max(120).optional(),
    ageMax: z.number().int().min(0).max(120).optional(),
  })
  .strict();

export const studentIdSchema = nonEmptyString.max(100);
export const deleteStudentsIdsSchema = z
  .array(studentIdSchema)
  .min(1, "At least one student ID is required")
  .max(100, "Cannot delete more than 100 students at once");

export type StudentInput = z.infer<typeof studentInputSchema>;
export type SearchStudentInput = z.infer<typeof searchStudentInputSchema>;
