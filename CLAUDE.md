# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 application for managing Solace advocates. The project uses:
- **Next.js 14** with App Router
- **Drizzle ORM** for database interactions with PostgreSQL
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Docker Compose** for local PostgreSQL setup

## Common Commands

### Development
```bash
npm i                    # Install dependencies
npm run dev             # Start development server on http://localhost:3000
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
```

### Database
```bash
docker compose up -d                    # Start PostgreSQL container
npx drizzle-kit push                    # Push schema changes to database
curl -X POST http://localhost:3000/api/seed  # Seed database with advocate data
npx drizzle-kit generate                # Generate migration files
```

## Architecture

### Database Layer (`src/db/`)
- **`schema.ts`**: Drizzle schema definition for the `advocates` table
  - Uses PostgreSQL-specific types (pgTable, serial, jsonb, bigint)
  - Main fields: firstName, lastName, city, degree, specialties (JSONB array), yearsOfExperience, phoneNumber
- **`index.ts`**: Database connection setup with error handling
  - Returns mock object if DATABASE_URL is not set (allows running without DB)
  - Uses postgres.js client with Drizzle ORM
- **`seed/advocates.ts`**: Mock data for seeding

### API Routes (`src/app/api/`)
- **`/api/advocates`** (GET): Fetches all advocates from database
  - Currently configured to use database (line 7 in route.ts)
  - Falls back to mock data if DATABASE_URL is not set
- **`/api/seed`** (POST): Seeds database with advocate data

### Frontend (`src/app/`)
- **`page.tsx`**: Main advocates listing page (client-side)
  - Fetches advocates on mount via `/api/advocates`
  - Implements search/filter functionality across all advocate fields
  - Known issues documented in DISCUSSION.md (hydration error, search bug with numeric fields)

## Database Configuration

The app can run with or without a database:

1. **With Database** (recommended for full functionality):
   - Set `DATABASE_URL` in `.env` (example: `postgresql://solace:solace@localhost:5432/solaceassignment`)
   - Ensure database connection is active in `src/app/api/advocates/route.ts`

2. **Without Database** (quick start):
   - Leave `DATABASE_URL` commented in `.env`
   - App returns mock data from `src/db/seed/advocates.ts`

## Important Notes

- **Environment Variables**: The project uses `.env` (tracked) rather than `.env.local` (gitignored). Consider using `.env.local` for local development to avoid committing sensitive data.
- **Known Bugs**: See DISCUSSION.md for documented issues including:
  - Hydration error with `<th>` tags in `<thead>` (src/app/page.tsx:61-67)
  - Search functionality fails on numeric fields like yearsOfExperience (src/app/page.tsx:32)
- **Schema Field Naming**: The `specialties` field in the schema (line 18 of schema.ts) is mapped to a column named `payload` in the database, which may be confusing.
