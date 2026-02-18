import { connectPrisma } from "@/server/shared/database/prisma";
import { createStudentDataSources } from "@/server/features/students";
import type { ApolloContext } from "./types";

export async function createApolloContext(): Promise<ApolloContext> {
  await connectPrisma();
  const dataSources = {
    ...createStudentDataSources(),
  };
  return { dataSources };
}
