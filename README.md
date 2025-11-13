# Reservation System (Next.js + SQLite + Prisma) — Option 2

This repository is a scaffold for a reservation system (hotel/taxi/doctor) using **Next.js** (pages router),
**SQLite** with **Prisma**, and **manual JWT auth**. It is designed for deploy to **Vercel** and local command-line usage.

Features included:
- Search & filter by time / location / category
- Create and cancel reservations
- Payment simulation endpoint
- Email / SMS notifications (simulated with nodemailer / Twilio stubs)
- Admin dashboard to manage reservations
- Concurrency handling via SQLite transactions and optimistic locking

## Quickstart (local / command prompt)
1. Copy `.env.example` to `.env` and edit values.
2. Install deps:
   ```
   npm install
   ```
3. Init Prisma and SQLite:
   ```
   npx prisma migrate dev --name init
   ```
4. Run dev server:
   ```
   npm run dev
   ```
5. Use `curl` or any HTTP client to call API endpoints in `pages/api/*`.

## Deploy to Vercel
- Push to GitHub and import project into Vercel.
- Add environment variables (DATABASE_URL, JWT_SECRET, etc.) in Vercel dashboard.
- For SQLite on Vercel: either use a hosted DB (Postgres) or enable filesystem persistence via Vercel's recommendations.
  For production consider switching `DATABASE_URL` to a managed Postgres and update `prisma/schema.prisma`.

## Notes
- This scaffold focuses on structure and core logic. You may replace SMS/email providers with real accounts.
- Concurrency: Reservation creation uses a check-then-insert wrapped in a transaction and optimistic locking on update.

