# Threadline Storefront

A premium, modern e-commerce storefront built with Next.js 15, Tailwind CSS v4, and React 19.

## Tech Stack
- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4
- Prisma ORM
- PostgreSQL (via Prisma Adapter)
- Zod Validation

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database (Optional)

The application can run entirely in a local-only "preview mode" utilizing embedded product data if no database is connected.

To connect a PostgreSQL database:
1. Copy `.env.example` to `.env`
2. Add your PostgreSQL connection string as `DATABASE_URL`
3. Run `npx prisma db push` to synchronize the schema

## Project Structure

- `app/`: Next.js App Router pages and layouts
- `app/api/`: Next.js Route Handlers
- `components/`: React components (Header, Footer, ProductCard, etc.)
- `context/`: React Context providers (State management)
- `lib/`: Utility functions and Prisma client setup
- `prisma/`: Database schema and migrations
- `public/`: Static assets
- `styles/`: Global CSS and Tailwind definitions
