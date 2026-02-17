import { z } from "zod";

const nonEmptyString = z.string().min(1, "Value is required");

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
  })
  .strict();

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
