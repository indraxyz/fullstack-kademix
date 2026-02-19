import { formatISO } from "date-fns";
import type { StudentDocument } from "../types";
import {
  StudentParent,
  QueryArgs,
  StudentQueryArgs,
  CreateStudentArgs,
  UpdateStudentArgs,
  DeleteStudentArgs,
  DeleteStudentsArgs,
} from "../types";
import {
  studentInputSchema,
  searchStudentInputSchema,
  studentIdSchema,
  deleteStudentsIdsSchema,
} from "../schemas/validation";
import {
  ValidationError,
  NotFoundError,
  DatabaseError,
} from "@/server/shared/errors";
import type { ApolloContext } from "@/server/shared/graphql/types";
import { ZodError } from "zod";
import { logger } from "@/server/shared/logger";
import { deleteStudentPhoto, saveStudentPhoto } from "../services/photo";

const formatDate = (date: Date | string | undefined): string => {
  if (!date) {
    return formatISO(new Date());
  }

  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) {
      logger.warn("Invalid date:", date);
      return formatISO(new Date());
    }
    return formatISO(dateObj);
  } catch (error) {
    logger.error("Error parsing date:", error);
    return formatISO(new Date());
  }
};

export const studentResolvers = {
  Student: {
    id: (parent: StudentParent): string => {
      if (parent.id) return parent.id;
      if (parent._id) {
        return typeof parent._id === "string"
          ? parent._id
          : parent._id.toString();
      }
      throw new Error("Student ID is missing");
    },

    createdAt: (parent: StudentParent): string => {
      return formatDate(parent.createdAt);
    },

    updatedAt: (parent: StudentParent): string => {
      return formatDate(parent.updatedAt);
    },

    dateOfBirth: (parent: StudentParent): string | null => {
      const d = parent.dateOfBirth;
      if (!d) return null;
      return formatDate(d);
    },

    studyPrograms: (parent: StudentParent): string[] => {
      const raw = parent.studyPrograms;
      if (Array.isArray(raw) && raw.length > 0) return raw as string[];
      if (parent.studyProgram) {
        if (parent.studyProgram === "Coding" && parent.codingTrack) {
          const track = parent.codingTrack as string;
          const label = track.charAt(0).toUpperCase() + track.slice(1);
          return [`Coding – ${label}`];
        }
        return [parent.studyProgram];
      }
      return [];
    },
  },
  Query: {
    students: async (_: unknown, args: QueryArgs, context: ApolloContext) => {
      try {
        const validatedInput = searchStudentInputSchema.parse(args.input || {});
        const result =
          await context.dataSources.students.getAllStudents(validatedInput);
        logger.info(
          `✅ Query: students - Success: Found ${result.length} student(s)`,
        );
        return result;
      } catch (error) {
        logger.error("❌ Query: students - Error:", error);
        if (error instanceof Error && error.name === "ZodError") {
          throw new ValidationError("Invalid search parameters", {
            search: error.message,
          });
        }
        throw new DatabaseError("Failed to fetch students", error);
      }
    },
    student: async (
      _: unknown,
      args: StudentQueryArgs,
      context: ApolloContext,
    ) => {
      try {
        const id = studentIdSchema.parse(args.id);
        const student = await context.dataSources.students.getStudent({
          id,
        });
        if (!student) {
          logger.info(`❌ Query: student - Not found: ${id}`);
          throw new NotFoundError("Student", id);
        }
        logger.info(
          `✅ Query: student - Success: Found student "${
            student.name || "Unknown"
          }" (${id})`,
        );
        return student;
      } catch (error) {
        logger.error("❌ Query: student - Error:", error);
        if (error instanceof ZodError) {
          throw new ValidationError("Invalid student ID", {
            id: error.issues.map((i) => i.message).join(" "),
          });
        }
        if (
          error instanceof NotFoundError ||
          error instanceof ValidationError
        ) {
          throw error;
        }
        throw new DatabaseError("Failed to fetch student", error);
      }
    },
  },
  Mutation: {
    createStudent: async (
      _: unknown,
      args: CreateStudentArgs,
      context: ApolloContext,
    ) => {
      try {
        logger.info("🆕 Mutation: createStudent - Input:", {
          ...args.input,
          photo: args.input.photo
            ? args.input.photo.startsWith("data:image/")
              ? `[base64 image, ${Math.round(
                  (args.input.photo.length * 3) / 4 / 1024,
                )}KB]`
              : args.input.photo
            : undefined,
        });

        // Extract photo from input if it's base64
        const { photo: photoBase64, ...restInput } = args.input;

        // Remove undefined and null values from input
        const cleanInput = Object.fromEntries(
          Object.entries(restInput).filter(
            ([_, value]) => value !== undefined && value !== null,
          ),
        );

        // Validate input (without photo for now)
        const validatedInput = studentInputSchema.parse(cleanInput);
        logger.info("✅ Mutation: createStudent - Validation passed");

        // Create student first to get the ID
        const newStudent = await context.dataSources.students.createStudent({
          input: validatedInput,
        });

        if (!newStudent) {
          throw new DatabaseError("Student creation returned null");
        }

        const studentId = newStudent.id ?? "";
        logger.info(
          `✅ Mutation: createStudent - Student created: ${studentId} (${
            validatedInput.name || "Unknown"
          })`,
        );

        // Handle photo upload if base64 data is provided
        if (
          photoBase64 &&
          typeof photoBase64 === "string" &&
          photoBase64.startsWith("data:image/")
        ) {
          try {
            logger.info("📸 Mutation: createStudent - Uploading photo...");
            const photoPath = await saveStudentPhoto(
              photoBase64,
              studentId,
              validatedInput.name || "student",
              null,
            );

            // Update student with photo path
            const updatedStudent =
              await context.dataSources.students.updateStudent({
                input: { id: studentId, ...validatedInput, photo: photoPath },
              });

            logger.info(
              `✅ Mutation: createStudent - Photo uploaded: ${photoPath}`,
            );
            return updatedStudent || newStudent;
          } catch (photoError) {
            logger.error(
              "⚠️ Mutation: createStudent - Error saving photo, but student was created:",
              photoError,
            );
            // Don't fail the entire operation if photo save fails
            // Student is already created, just return it without photo
          }
        }

        return newStudent;
      } catch (error) {
        logger.error("❌ Mutation: createStudent - Error:", error);

        // Handle Zod validation errors with detailed field messages
        if (error instanceof ZodError) {
          const fieldErrors: Record<string, string> = {};

          error.issues.forEach((issue) => {
            const field = issue.path[0] as string;
            if (field) {
              fieldErrors[field] = issue.message;
            }
          });

          // Get the first error message for the main error
          const firstError = error.issues[0];
          const errorMessage = firstError
            ? `${String(firstError.path[0])}: ${firstError.message}`
            : "Invalid student data";

          logger.error("Validation errors:", fieldErrors);
          throw new ValidationError(errorMessage, fieldErrors);
        }

        if (
          error instanceof ValidationError ||
          error instanceof DatabaseError
        ) {
          throw error;
        }
        throw new DatabaseError("Failed to create student", error);
      }
    },
    updateStudent: async (
      _: unknown,
      args: UpdateStudentArgs,
      context: ApolloContext,
    ) => {
      try {
        logger.info("✏️ Mutation: updateStudent - ID:", args.id, "Input:", {
          ...args.input,
          photo: args.input.photo
            ? args.input.photo.startsWith("data:image/")
              ? `[base64 image, ${Math.round(
                  (args.input.photo.length * 3) / 4 / 1024,
                )}KB]`
              : args.input.photo
            : undefined,
        });

        const id = studentIdSchema.parse(args.id);

        const existingStudent = await context.dataSources.students.getStudent({
          id,
        });

        if (!existingStudent) {
          logger.info(`❌ Mutation: updateStudent - Student not found: ${id}`);
          throw new NotFoundError("Student", id);
        }

        logger.info(
          `📋 Mutation: updateStudent - Existing student: "${
            existingStudent.name || "Unknown"
          }"`,
        );

        // Extract photo from input if it's base64
        const { photo: photoBase64, ...restInput } = args.input;

        // Remove undefined and null values from input
        const cleanInput = Object.fromEntries(
          Object.entries(restInput).filter(
            ([_, value]) => value !== undefined && value !== null,
          ),
        );

        // Validate input (without photo for now)
        const validatedInput = studentInputSchema.parse(cleanInput);
        logger.info("✅ Mutation: updateStudent - Validation passed");

        // Handle photo upload if base64 data is provided
        let photoPath: string | undefined = undefined;
        if (
          photoBase64 &&
          typeof photoBase64 === "string" &&
          photoBase64.startsWith("data:image/")
        ) {
          try {
            logger.info("📸 Mutation: updateStudent - Uploading new photo...");
            photoPath = await saveStudentPhoto(
              photoBase64,
              id,
              validatedInput.name || existingStudent.name || "student",
              existingStudent.photo || null,
            );
            logger.info(
              `✅ Mutation: updateStudent - Photo uploaded: ${photoPath}`,
            );
          } catch (photoError) {
            logger.error(
              "⚠️ Mutation: updateStudent - Error saving photo:",
              photoError,
            );
            // If photo save fails, continue with update but without photo
            // Or throw error if you want to fail the entire update
            if (photoError instanceof ValidationError) {
              throw photoError;
            }
          }
        }

        // Update student with validated input and photo path (if available)
        const updateData = photoPath
          ? { ...validatedInput, photo: photoPath }
          : validatedInput;

        const updatedStudent = await context.dataSources.students.updateStudent(
          {
            input: { id, ...updateData },
          },
        );

        if (!updatedStudent) {
          throw new NotFoundError("Student", id);
        }

        logger.info(
          `✅ Mutation: updateStudent - Success: Student "${
            updatedStudent.name || "Unknown"
          }" updated`,
        );
        return updatedStudent;
      } catch (error) {
        logger.error("❌ Mutation: updateStudent - Error:", error);

        // Handle Zod validation errors with detailed field messages
        if (error instanceof ZodError) {
          const fieldErrors: Record<string, string> = {};

          error.issues.forEach((issue) => {
            const field = issue.path[0] as string;
            if (field) {
              fieldErrors[field] = issue.message;
            }
          });

          // Get the first error message for the main error
          const firstError = error.issues[0];
          const errorMessage = firstError
            ? `${String(firstError.path[0])}: ${firstError.message}`
            : "Invalid student data";

          logger.error("Validation errors:", fieldErrors);
          throw new ValidationError(errorMessage, fieldErrors);
        }

        if (
          error instanceof NotFoundError ||
          error instanceof ValidationError ||
          error instanceof DatabaseError
        ) {
          throw error;
        }
        throw new DatabaseError("Failed to update student", error);
      }
    },
    deleteStudent: async (
      _: unknown,
      args: DeleteStudentArgs,
      context: ApolloContext,
    ) => {
      try {
        const id = studentIdSchema.parse(args.id);
        logger.info("🗑️ Mutation: deleteStudent - ID:", id);

        const student = await context.dataSources.students.getStudent({
          id,
        });
        if (!student) {
          logger.info(`❌ Mutation: deleteStudent - Student not found: ${id}`);
          throw new NotFoundError("Student", id);
        }

        logger.info(
          `📋 Mutation: deleteStudent - Student found: "${
            student.name || "Unknown"
          }"`,
        );

        // Delete photo file if exists (handles both local and Vercel Blob)
        if (student.photo) {
          try {
            logger.info(
              `📸 Mutation: deleteStudent - Deleting photo: ${student.photo}`,
            );
            await deleteStudentPhoto(student.photo);
            logger.info(
              `✅ Mutation: deleteStudent - Photo deleted: ${student.photo}`,
            );
          } catch (error) {
            logger.warn(
              "⚠️ Mutation: deleteStudent - Error deleting photo file:",
              error,
            );
            // Continue with student deletion even if photo deletion fails
          }
        }

        const result = await context.dataSources.students.deleteStudent({
          id,
        });

        logger.info(
          `✅ Mutation: deleteStudent - Success: Student "${
            student.name || "Unknown"
          }" deleted`,
        );
        return result;
      } catch (error) {
        logger.error("❌ Mutation: deleteStudent - Error:", error);
        if (
          error instanceof NotFoundError ||
          error instanceof ValidationError
        ) {
          throw error;
        }
        throw new DatabaseError("Failed to delete student", error);
      }
    },
    deleteStudents: async (
      _: unknown,
      args: DeleteStudentsArgs,
      context: ApolloContext,
    ) => {
      try {
        const ids = deleteStudentsIdsSchema.parse(args.ids);
        logger.info("🗑️ Mutation: deleteStudents - IDs:", ids);

        const studentsToDelete = await Promise.all(
          ids.map((id) => context.dataSources.students.getStudent({ id })),
        );

        const validStudents = studentsToDelete.filter(
          (student: StudentDocument | null): student is StudentDocument =>
            student !== null
        );

        logger.info(
          `📋 Mutation: deleteStudents - Found ${validStudents.length} student(s) to delete`,
        );

        // Delete all photos
        for (const student of validStudents) {
          if (student && student.photo) {
            try {
              const studentId = student.id ?? "unknown";
              logger.info(
                `📸 Mutation: deleteStudents - Deleting photo: ${student.photo}`,
              );
              await deleteStudentPhoto(student.photo);
            } catch (error) {
              const studentId = student.id ?? "unknown";
              logger.warn(
                `⚠️ Mutation: deleteStudents - Error deleting photo for student ${studentId}:`,
                error,
              );
              // Continue even if photo deletion fails
            }
          }
        }

        const deletedCount = await context.dataSources.students.deleteStudents({
          ids,
        });

        logger.info(
          `✅ Mutation: deleteStudents - Success: Deleted ${deletedCount} student(s)`,
        );

        return deletedCount;
      } catch (error) {
        logger.error("❌ Mutation: deleteStudents - Error:", error);
        if (error instanceof ZodError) {
          const first = error.issues[0];
          throw new ValidationError(first?.message ?? "Invalid student IDs", {
            ids: error.message,
          });
        }
        if (
          error instanceof NotFoundError ||
          error instanceof ValidationError
        ) {
          throw error;
        }
        throw new DatabaseError("Failed to delete students", error);
      }
    },
  },
};
