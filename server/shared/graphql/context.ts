import { connectDB } from "@/server/shared/database/connectDB";
import { createStudentDataSources } from "@/server/features/students";
import type { ApolloContext } from "./types";

export async function createApolloContext(): Promise<ApolloContext> {
  await connectDB();
  const dataSources = {
    ...createStudentDataSources(),
  };
  return { dataSources };
}
