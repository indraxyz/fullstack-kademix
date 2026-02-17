import { MongoDataSource } from "apollo-datasource-mongodb";
import { Model } from "mongoose";
import { StudentDocument } from "../types";
import { StudentInput, SearchStudentInput } from "../schemas/validation";
import { DatabaseError, NotFoundError } from "@/server/shared/errors";

export default class Students extends MongoDataSource<StudentDocument> {
  private getModel(): Model<StudentDocument> {
    const m = (this as unknown as { model: Model<StudentDocument> }).model;
    if (!m) throw new DatabaseError("Students datasource model not initialized");
    return m;
  }

  async getAllStudents(input: SearchStudentInput): Promise<StudentDocument[]> {
    try {
      const { searchTerm, sortBy, sortOrder, limit, offset, ageMin, ageMax } =
        input;

      const query: Record<string, unknown> = {};

      if (searchTerm && searchTerm.trim() !== "") {
        const searchRegex = new RegExp(searchTerm, "i");
        Object.assign(query, {
          $or: [
            { name: searchRegex },
            { email: searchRegex },
            { address: searchRegex },
          ],
        });
      }

      const ageCondition: Record<string, number> = {};
      if (ageMin != null && !Number.isNaN(ageMin)) {
        ageCondition.$gte = ageMin;
      }
      if (ageMax != null && !Number.isNaN(ageMax)) {
        ageCondition.$lte = ageMax;
      }
      if (Object.keys(ageCondition).length > 0) {
        query.age = ageCondition;
      }

      const sortObj: Record<string, 1 | -1> = {};
      sortObj[sortBy] = sortOrder === "desc" ? -1 : 1;

      const students = await this.getModel()
        .find(query)
        .sort(sortObj)
        .limit(limit)
        .skip(offset);

      return students;
    } catch (error) {
      throw new DatabaseError("Failed to fetch students", error);
    }
  }

  async getStudent({ id }: { id: string }): Promise<StudentDocument | null> {
    try {
      if (!id) {
        throw new Error("Student ID is required");
      }
      return await this.getModel().findById(id);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Student ID is required"
      ) {
        throw error;
      }
      throw new DatabaseError("Failed to fetch student", error);
    }
  }

  async createStudent({
    input,
  }: {
    input: StudentInput;
  }): Promise<StudentDocument> {
    try {
      const newStudent = await this.getModel().create(input);
      return newStudent;
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
      const { id, ...updateData } = input;

      if (!id) {
        throw new Error("Student ID is required");
      }

      const updatedStudent = await this.getModel().findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedStudent) {
        throw new NotFoundError("Student", id);
      }

      return updatedStudent;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error && error.name === "ValidationError") {
        throw new DatabaseError(`Validation failed: ${error.message}`, error);
      }
      throw new DatabaseError("Failed to update student", error);
    }
  }

  async deleteStudent({ id }: { id: string }): Promise<string> {
    try {
      if (!id) {
        throw new Error("Student ID is required");
      }

      const deletedStudent = await this.getModel().findByIdAndDelete(id);

      if (!deletedStudent) {
        throw new NotFoundError("Student", id);
      }

      return "Student deleted successfully";
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError("Failed to delete student", error);
    }
  }

  async deleteStudents({ ids }: { ids: string[] }): Promise<number> {
    try {
      if (!ids || ids.length === 0) {
        throw new Error("Student IDs are required");
      }

      const result = await this.getModel().deleteMany({
        _id: { $in: ids },
      });

      return result.deletedCount || 0;
    } catch (error) {
      throw new DatabaseError("Failed to delete students", error);
    }
  }
}
