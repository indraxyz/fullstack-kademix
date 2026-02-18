import { prisma } from "@/server/shared/database/prisma";
import Students from "./datasources/Students";
import { studentTypeDefs } from "./schemas/graphql";
import { studentResolvers } from "./resolvers";

export const studentTypeDefsExport = studentTypeDefs;
export const studentResolversExport = studentResolvers;

export function createStudentDataSources(): {
  students: Students;
} {
  return {
    students: new Students(prisma),
  };
}
