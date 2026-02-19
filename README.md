# Students Management - Next.js + MongoDB + GraphQL

A modern full-stack application built with Next.js 16, MongoDB, and GraphQL using Apollo Server and Client. Features a feature-based architecture for optimal maintainability and scalability.

## Tech Stack

- **Next.js 16.0.10** (App Router with Turbopack)
- **React 19.2.0**
- **TypeScript 5** (Strict mode)
- **Apollo Server & Client** (GraphQL)
- **MongoDB** (Mongoose with Typegoose)
- **Zod** (Runtime validation, v4)
- **Tailwind CSS 4**
- **React Hook Form** + **@hookform/resolvers** (forms with Zod)
- **TanStack Table** (data tables, sortable columns)
- **Zustand** (state management)
- **next-themes** (theme toggle)
- **Radix UI** / **shadcn** (UI primitives)
- **date-fns** (Date utilities)
- **Jest** (Testing)
- **@graphql-tools/schema** (GraphQL schema types)

## Features

### Backend

- Type-safe GraphQL API with proper TypeScript types
- Typegoose for enhanced TypeScript type inference with MongoDB
- Zod validation for all inputs (student, search, IDs) with `.strict()` and clear messages
- Environment variable validation at startup
- Custom error classes (`ValidationError`, `NotFoundError`, `DatabaseError`)
- Optimized database connection pooling and lazy connection initialization
- Student CRUD with photo upload (optional Vercel Blob)
- Search by name, email, address only (no search by age)
- Age range filter (`ageMin` / `ageMax`) in query
- ID validation (`studentIdSchema`, `deleteStudentsIdsSchema`) for single and bulk delete
- Feature-based architecture; schema and resolvers merged from feature registry
- Logging and upload config in shared config

### Frontend

- Student CRUD with modal form (React Hook Form + Zod)
- **Cards and Table view** with switcher; table has sortable column headers (chevrons) synced with filter dialog
- **Filter dialog**: sort by field, sort order, age range slider; filters applied only on **Apply**
- **Search** by name, email, address; active age range shown in toolbar when not default
- **Bulk delete** in both cards and table view (select all in cards only)
- **Student details modal** (read-only) with link to edit
- Table actions column uses dropdown (View details, Edit, Delete)
- Student cards: checkbox and actions menu always visible on mobile, hover on desktop
- Custom hooks (CRUD, form, search, UI), toasts, confirmation dialogs, empty and error states
- Theme toggle (next-themes) aligned with back button on students page

## Roadmap

### Planned features & tech stack

| Feature                | Planned tech                                |
| ---------------------- | ------------------------------------------- |
| User authentication    | Better Auth, Neon (PostgreSQL)              |
| ORM                    | Prisma (MongoDB), Drizzle (Neon PostgreSQL) |
| Data fetching          | SWR                                         |
| List virtualization    | TanStack Virtual                            |
| Utility functions      | Lodash                                      |
| Data visualization     | ECharts                                     |
| Rich text editor       | Tiptap                                      |
| Carousel / slider      | Swiper                                      |
| Automation workflow    | n8n                                         |
| MCP development server | TypeScript                                  |

- Student registration Form (next priority)

_Already in use: React Hook Form + Zod (forms), TanStack Table (data table), Zustand (state)._

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud instance)
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/students-db
NODE_ENV=development
```

Optional (photo upload):

```env
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

Admin panel login (required to access `/admin`):

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
```

4. Start the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser
   - **Homepage** (`/`): Kademix landing (hero, programs, activities, testimonials, contact)
   - **Register** (`/students-register`): Public student registration form (no login)
   - **Cart** (`/cart`): Enrollment cart (localStorage); checkout goes to register with programs pre-filled
   - **Admin Login** (`/admin-login`): Admin sign-in (requires `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`)
   - **Admin** (`/admin`): Admin dashboard (requires login)
   - **Student Management** (`/admin/students`): Admin-only CRUD, cards/table view, filter dialog, bulk delete, multiple study programs per student

## Project Structure

```
├── app/                           # Next.js App Router
│   ├── api/
│   │   └── graphql/               # GraphQL API route
│   ├── src/                       # Student management feature
│   │   ├── features/
│   │   │   └── students/
│   │   │       ├── components/
│   │   │       │   ├── StudentManagement.tsx
│   │   │       │   └── student-management/
│   │   │       │       ├── PageHeader.tsx
│   │   │       │       ├── SearchToolbar.tsx
│   │   │       │       ├── FilterDialog.tsx
│   │   │       │       ├── StudentsTable.tsx
│   │   │       │       ├── StudentCard.tsx
│   │   │       │       ├── StudentFormModal.tsx
│   │   │       │       ├── StudentDetailsModal.tsx
│   │   │       │       ├── EmptyState.tsx
│   │   │       │       ├── ConfirmDialog.tsx
│   │   │       │       ├── StateOverlay.tsx
│   │   │       │       ├── types.ts
│   │   │       │       └── index.ts
│   │   │       ├── hooks/
│   │   │       ├── graphql/
│   │   │       └── types/
│   │   ├── shared/
│   │   │   ├── hooks/
│   │   │   ├── lib/
│   │   │   ├── utils/
│   │   │   └── validation/
│   │   └── page.tsx
│   ├── page.tsx
│   └── layout.tsx
│
├── server/
│   ├── features/
│   │   └── students/
│   │       ├── datasources/
│   │       ├── models/
│   │       ├── resolvers/
│   │       ├── schemas/
│   │       ├── services/
│   │       ├── types/
│   │       └── index.ts
│   └── shared/
│       ├── config/
│       ├── database/
│       ├── errors/
│       ├── graphql/               # schema, context, mergeResolvers, formatError, types
│       └── logger.ts
│
└── public/
```

## Architecture

### Feature-Based Organization

- **Features**: Self-contained modules (components, hooks, models, resolvers, schemas, types, services)
- **Shared**: Reusable utilities, config, errors, GraphQL wiring
- **Backend**: typeDefs and resolvers merged in `shared/graphql/schema.ts`; context builds dataSources from features

See:

- [Frontend README](app/src/README.md)
- [Backend README](server/README.md)

## Key Improvements

### Type Safety

- Strict TypeScript; GraphQL resolvers and inputs fully typed
- Zod schemas with inferred types; no `any`

### Validation

- Zod at API boundaries (student input, search input, IDs)
- Form validation via React Hook Form + Zod resolver
- Filter dialog applies age range only on Apply

### Error Handling

- Custom errors with codes; GraphQL error formatting; user-facing messages

### Database

- Lazy connection, pooling, single event registration

### Frontend

- Cards + table view; sortable table headers synced with filter dialog
- Filter dialog (sort + age range); bulk delete; details modal
- React Hook Form + Zod for create/edit; mobile-friendly card actions and checkbox

## Development

### Scripts

- `pnpm dev` – Start development server (Turbopack)
- `pnpm build` – Build for production
- `pnpm start` – Start production server

## Best Practices

1. **Type safety**: Strict TypeScript; avoid `any`
2. **Validation**: Zod at boundaries; RHF + Zod for forms
3. **Errors**: Use custom error classes
4. **Database**: Lazy connection; do not connect at module level
5. **Structure**: Feature-based; keep components and hooks focused
6. **Testing**: Cover critical paths

## Documentation

- [Frontend README](app/src/README.md) – Student management UI and architecture
- [Backend README](server/README.md) – GraphQL API and architecture

## License

MIT
