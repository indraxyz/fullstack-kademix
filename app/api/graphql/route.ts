import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import type { GraphQLFormattedError } from "graphql";
import type { IExecutableSchemaDefinition } from "@graphql-tools/schema";
import { formatGraphQLError } from "@/server/shared/graphql/formatError";
import { typeDefs, resolvers } from "@/server/shared/graphql/schema";
import { createApolloContext } from "@/server/shared/graphql/context";
import type { ApolloContext } from "@/server/shared/graphql/types";
import { env } from "@/server/shared/config/env";

const server = new ApolloServer<ApolloContext>({
  typeDefs,
  resolvers: resolvers as IExecutableSchemaDefinition<ApolloContext>["resolvers"],
  formatError: (
    formattedError: GraphQLFormattedError,
    error: unknown,
  ): GraphQLFormattedError => formatGraphQLError(formattedError, error),
  introspection: env.NODE_ENV !== "production",
});

const handler = startServerAndCreateNextHandler(server, {
  context: createApolloContext,
});

const apolloHandler = handler as (request: NextRequest) => Promise<Response>;

export const GET = apolloHandler;
export const POST = apolloHandler;
