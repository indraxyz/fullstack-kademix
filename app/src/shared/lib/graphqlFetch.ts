export interface GraphQLResponse<T = unknown> {
  data?: T;
  errors?: Array<{ message: string; extensions?: Record<string, unknown> }>;
}

export async function graphqlFetch<T = unknown>(
  query: string,
  variables?: Record<string, unknown>
): Promise<GraphQLResponse<T>> {
  const res = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<GraphQLResponse<T>>;
}

export class GraphQLRequestError extends Error {
  constructor(
    message: string,
    public readonly graphQLErrors?: Array<{
      message: string;
      extensions?: Record<string, unknown>;
    }>
  ) {
    super(message);
    this.name = "GraphQLRequestError";
  }
}

export async function graphqlFetchOrThrow<T = unknown>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const result = await graphqlFetch<T>(query, variables);
  if (result.errors?.length) {
    const err = result.errors[0];
    throw new GraphQLRequestError(err.message, result.errors);
  }
  if (result.data == null) {
    throw new GraphQLRequestError("No data returned from GraphQL");
  }
  return result.data;
}
