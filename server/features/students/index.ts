import { Model } from "mongoose";
import { StudentDocument } from "./types";
import { StudentModel } from "./models/Student";
import Students from "./datasources/Students";
import { studentTypeDefs } from "./schemas/graphql";
import { studentResolvers } from "./resolvers";

export const studentTypeDefsExport = studentTypeDefs;
export const studentResolversExport = studentResolvers;

export function createStudentDataSources(): {
  students: Students;
} {
  return {
    students: new Students({
      modelOrCollection: StudentModel as unknown as Model<StudentDocument>,
    }),
  };
}
