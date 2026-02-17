import { mergeResolvers } from "./mergeResolvers";
import { studentTypeDefsExport } from "@/server/features/students";
import { studentResolversExport } from "@/server/features/students";

const baseTypeDefs = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const allTypeDefs = [baseTypeDefs, studentTypeDefsExport];
const allResolvers = [studentResolversExport];

export const typeDefs = allTypeDefs;
export const resolvers = mergeResolvers(allResolvers);
