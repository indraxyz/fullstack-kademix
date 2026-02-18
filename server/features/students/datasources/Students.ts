import type { PrismaClient } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import { StudentInput, SearchStudentInput } from "../schemas/validation";
import { DatabaseError, NotFoundError } from "@/server/shared/errors";
import type { StudentDocument } from "../types";

function toPrismaCreateInput(input: StudentInput): Prisma.StudentCreateInput {
  return {
    name: input.name,
    email: input.email,
    age: input.age,
    address: input.address,
    photo: input.photo ?? undefined,
    dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : undefined,
    phoneNumber: input.phoneNumber?.trim() || undefined,
    latestEducation: input.latestEducation ?? undefined,
    gender: input.gender ?? undefined,
    notes: input.notes?.trim() || undefined,
    classMode: input.classMode ?? undefined,
    studyProgram: input.studyProgram ?? undefined,
    codingTrack: input.codingTrack ?? undefined,
  };
}

export default class Students {
  constructor(private readonly prisma: PrismaClient) {}

  async getAllStudents(input: SearchStudentInput): Promise<StudentDocument[]> {
    try {
      const { searchTerm, sortBy, sortOrder, limit, offset, ageMin, ageMax } = input;

      const where: Prisma.StudentWhereInput = {};

      if (searchTerm?.trim()) {
        const term = searchTerm.trim();
        where.OR = [
          { name: { contains: term, mode: "insensitive" } },
          { email: { contains: term, mode: "insensitive" } },
          { address: { contains: term, mode: "insensitive" } },
        ];
      }

      const ageCond: { gte?: number; lte?: number } = {};
      if (ageMin != null && !Number.isNaN(ageMin)) ageCond.gte = ageMin;
      if (ageMax != null && !Number.isNaN(ageMax)) ageCond.lte = ageMax;
      if (Object.keys(ageCond).length > 0) where.age = ageCond;

      const students = await this.prisma.student.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        take: limit,
        skip: offset,
      });

      return students;
    } catch (error) {
      throw new DatabaseError("Failed to fetch students", error);
    }
  }

  async getStudent({ id }: { id: string }): Promise<StudentDocument | null> {
    try {
      if (!id) throw new Error("Student ID is required");
      return await this.prisma.student.findUnique({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Student ID is required") {
        throw error;
      }
      throw new DatabaseError("Failed to fetch student", error);
    }
  }

  async createStudent({ input }: { input: StudentInput }): Promise<StudentDocument> {
    try {
      return await this.prisma.student.create({
        data: toPrismaCreateInput(input),
      });
    } catch (error) {
      if (error instanceof Error && error.name === "ValidationError") {
        throw new DatabaseError(`Validation failed: ${error.message}`, error);
      }
      throw new DatabaseError("Failed to create student", error);
    }
  }

  async updateStudent({
    input,
  }: {
    input: StudentInput & { id: string };
  }): Promise<StudentDocument> {
    try {
      const { id, ...rest } = input;
      if (!id) throw new Error("Student ID is required");

      const existing = await this.prisma.student.findUnique({ where: { id } });
      if (!existing) throw new NotFoundError("Student", id);

      const data = toPrismaCreateInput(rest as StudentInput);
      return await this.prisma.student.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      if (error instanceof Error && error.name === "ValidationError") {
        throw new DatabaseError(`Validation failed: ${error.message}`, error);
      }
      throw new DatabaseError("Failed to update student", error);
    }
  }

  async deleteStudent({ id }: { id: string }): Promise<string> {
    try {
      if (!id) throw new Error("Student ID is required");
      await this.prisma.student.delete({ where: { id } });
      return "Student deleted successfully";
    } catch (error: unknown) {
      if (error instanceof NotFoundError) throw error;
      const prismaNotFound =
        error && typeof error === "object" && "code" in error && (error as { code: string }).code === "P2025";
      if (prismaNotFound) throw new NotFoundError("Student", id);
      throw new DatabaseError("Failed to delete student", error);
    }
  }

  async deleteStudents({ ids }: { ids: string[] }): Promise<number> {
    try {
      if (!ids?.length) throw new Error("Student IDs are required");
      const result = await this.prisma.student.deleteMany({
        where: { id: { in: ids } },
      });
      return result.count;
    } catch (error) {
      throw new DatabaseError("Failed to delete students", error);
    }
  }
}
