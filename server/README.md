# Server Architecture

This directory contains the server-side code for the GraphQL API and database operations. The architecture follows a feature-based organization pattern for optimal maintainability and scalability.

## Structure

```
server/
├── features/                    # Feature-based modules
│   └── students/               # Student management feature
│       ├── datasources/       # Prisma-backed data access
│       │   └── Students.ts
│       ├── resolvers/         # GraphQL resolvers
│       │   └── index.ts
│       ├── schemas/           # GraphQL & validation schemas
│       │   ├── graphql.ts     # GraphQL typeDefs
│       │   └── validation.ts  # Zod validation schemas
│       └── types/             # TypeScript types
│           └── index.ts
│
├── shared/                     # Shared utilities and configurations
│   ├── config/                # Environment configuration
│   │   └── env.ts
│   ├── database/              # Prisma client & connection
│   │   └── prisma.ts
│   ├── errors/                # Custom error classes
│   │   └── index.ts
│   └── graphql/               # GraphQL utilities
│       ├── formatError.ts
│       └── types.ts
│
└── README.md                   # This file (includes architecture documentation)
```

## Architecture Principles

### 1. Feature-Based Organization

- Each feature is self-contained in its own directory
- All feature-related code (models, resolvers, schemas, datasources, types) is colocated
- Makes it easy to understand, maintain, and scale
- Clear boundaries between features

### 2. Shared Code Separation

- Reusable utilities, configurations, and error classes are in `shared/`
- Clear distinction between feature-specific and shared code
- Promotes code reuse across features
- Single source of truth for shared functionality

### 3. Type Safety

- Types are colocated with their features
- Shared GraphQL types in `shared/graphql/types.ts`
- Full TypeScript support throughout
- No `any` types allowed

### 4. Validation

- Zod schemas for runtime validation
- Validation happens at resolver level
- Type-safe validation with automatic TypeScript type inference
- Consistent validation across all inputs

## Key Features

### Environment Variable Validation

- All environment variables are validated at startup using Zod
- Located in `server/shared/config/env.ts`
- Throws descriptive errors if required variables are missing
- Type-safe environment configuration

### Error Handling

- Custom error classes in `server/shared/errors/index.ts`:
  - `AppError` - Base error class
  - `ValidationError` - For input validation failures (400)
  - `NotFoundError` - For resource not found scenarios (404)
  - `DatabaseError` - For database operation failures (500)
- GraphQL errors are properly formatted with error codes and status codes
- User-friendly error messages

### Database Connection

- Lazy connection initialization (connects on first request)
- Connection pooling configured for optimal performance
- Proper connection state management
- Event handlers registered only once to prevent duplicates
- Graceful error handling and reconnection

### GraphQL Setup

- Apollo Server with Next.js integration (`@as-integrations/next`)
- GraphQL API endpoint: `/api/graphql` (handles both GET and POST)
- Schema and context composed from a feature registry (`shared/graphql/schema.ts`, `context.ts`); add features without editing the route
- Type-safe resolvers with TypeScript
- Custom error formatting
- DataSources use the model injected via context (`this.model`)
- Introspection disabled in production

### Logging and Config

- `server/shared/logger.ts`: level-based logger (env `LOG_LEVEL`: debug, info, warn, error)
- `server/shared/config/upload.ts`: upload limits and allowed types (env `MAX_UPLOAD_SIZE_KB` optional)
- Feature-specific services (e.g. `features/students/services/photo.ts`) for reusable logic

## Adding a New Feature

1. Create a new directory under `features/`:

   ```bash
   mkdir -p server/features/your-feature/{datasources,resolvers,schemas,types}
   ```

2. Add feature-specific code:

   - `datasources/` - Prisma-backed data access (injected `PrismaClient`)
   - `resolvers/` - GraphQL resolvers
   - `schemas/` - GraphQL typeDefs and Zod validation schemas
   - `types/` - TypeScript types

3. Add a feature barrel `server/features/your-feature/index.ts` that exports:
   - `yourFeatureTypeDefsExport` (typeDefs string)
   - `yourFeatureResolversExport` (resolvers object)
   - `createYourFeatureDataSources()` (returns `{ yourResource: new YourDataSource(prisma) }`)

4. Register the feature:
   - In `server/shared/graphql/schema.ts`: add typeDefs and resolvers to `allTypeDefs` / `allResolvers`
   - In `server/shared/graphql/context.ts`: spread `...createYourFeatureDataSources()` into `dataSources`
   - In `server/shared/graphql/types.ts`: add the new dataSource to `ApolloContext["dataSources"]`

   The GraphQL route (`app/api/graphql/route.ts`) does not need to be edited.

## Import Patterns

### Feature Imports

```typescript
// From within a feature
import { StudentDocument } from "../types";
import { studentInputSchema } from "../schemas/validation";

// From outside a feature
import { StudentDocument } from "@/server/features/students/types";
import { studentInputSchema } from "@/server/features/students/schemas/validation";
```

### Shared Imports

```typescript
// Shared utilities
import { connectPrisma } from "@/server/shared/database/prisma";
import {
  ValidationError,
  NotFoundError,
  DatabaseError,
} from "@/server/shared/errors";
import { env } from "@/server/shared/config/env";
import { ApolloContext } from "@/server/shared/graphql/types";
```

## Best Practices

1. **Always validate inputs** using Zod schemas before database operations
2. **Use custom error classes** instead of generic Error
3. **Type everything** - avoid `any` types
4. **Handle errors gracefully** with proper error messages
5. **Lazy load connections** - don't connect at module level
6. **Colocate related code** - keep feature code together
7. **Use DataSources** for database operations, not direct model access
8. **Validate at boundaries** - validate inputs at resolver level
9. **Document complex logic** - add comments for non-obvious code
10. **Test features in isolation** - each feature should be testable independently

## Example: Student Feature

### Prisma schema (`prisma/schema.prisma`)

The Student model is defined in the root `prisma/schema.prisma` and generated with `pnpm prisma generate`. See the file for the full schema.

### Validation Schema (`features/students/schemas/validation.ts`)

```typescript
import { z } from "zod";

export const studentInputSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  // ...
});

export type StudentInput = z.infer<typeof studentInputSchema>;
```

### DataSource (`features/students/datasources/Students.ts`)

DataSources receive the Prisma client via the constructor and use it for all database operations:

```typescript
import type { PrismaClient } from "@prisma/client";
import { StudentInput, SearchStudentInput } from "../schemas/validation";
import type { StudentDocument } from "../types";

export default class Students {
  constructor(private readonly prisma: PrismaClient) {}
  async getAllStudents(input: SearchStudentInput): Promise<StudentDocument[]> {
    return this.prisma.student.findMany({ where, orderBy, take: limit, skip: offset });
  }
}
```

### Resolver (`features/students/resolvers/index.ts`)

```typescript
import { studentInputSchema } from "../schemas/validation";
import { ValidationError } from "@/server/shared/errors";

export const studentResolvers = {
  Query: {
    students: async (_, args, context) => {
      const validatedInput = studentInputSchema.parse(args.input);
      return await context.dataSources.students.getAllStudents(validatedInput);
    },
  },
};
```

## Testing

- Unit tests for resolvers
- Integration tests for DataSources
- Validation schema tests
- Error handling tests

## Documentation

- [Root README](../../README.md) - Project overview

---

This architecture provides a scalable, maintainable foundation for building GraphQL APIs with MongoDB and Next.js.
