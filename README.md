# yukine

A modern full-stack application built with TypeScript and Turbo.

## Tech Stack

### Frontend

- **React Router** - Declarative routing for React

### Backend

- **Elysia** - Ergonomic framework for humans
- **Eden** - End-to-end type safety for Elysia

### Database

- **Drizzle ORM** - TypeScript ORM with SQL-like syntax

### Authentication

- **Basic Auth** - Simple authentication implementation

### Build Tools

- **Turbo** - High-performance build system for JavaScript and TypeScript
- **TypeScript** - JavaScript with syntax for types
- **Oxlint** - Designed to catch erroneous or useless code without requiring any configurations by default
- **Oxfmt** - A Prettier-compatible code formatter
- **Bun** - Package manager

## Getting Started

1. Clone the repository

```bash
git clone git@github.com:your-username/yukine.git
cd yukine
```

2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables:

```bash
cp .env.example .env
```

4. Set up the database:

```bash
bun run db:push
```

5. Start the development server:

```bash
bun run dev
```

## Project Structure

```text
yukine/
├── apps/                    # Applications
│   ├── api/                 # Elysia app
│   └── react-router/        # React-router app
├── packages/                # Shared packages
│   ├── db/                  # Database package
│   ├── ui/                  # Shared shadcn/ui components
│   └── validators/          # Shared validation schemas
├── tools/                   # Build tools and configurations
│   ├── oxfmt/               # Oxfmt configuration
│   ├── oxlint/              # Oxlint configuration
│   └── typescript/          # TypeScript configuration
├── turbo.json               # Turbo configuration
└── package.json             # Root package.json
```

## Database

This project uses Drizzle ORM for database operations.

### Database Commands

```bash
# Push schema changes to database
cd packages/db
bun run db:push

# Open Drizzle Studio
cd packages/db
bun run db:studio
```

## Authentication

Basic authentication implementation for simple use cases.

## Scripts

```bash
# Development
bun run dev          # Start development server
bun run build        # Build for production

# Code Quality
bun run lint         # Run Oxlint
bun run typecheck    # Run TypeScript checks

# Database
bun run db:push       # Push schema changes
bun run db:studio     # Open database studio
```
