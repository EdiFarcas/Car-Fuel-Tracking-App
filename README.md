# Car Fuel Tracking App

A modern web application to track your car's fuel fill-ups, mileage, and fuel statistics. Built with Next.js, React, Prisma, and PostgreSQL, it provides a beautiful dashboard for managing your vehicles and analyzing fuel efficiency over time.

## Features

- 🚗 **Multi-car support**: Track multiple vehicles, each with its own stats and history.
- ⛽ **Fill-up logging**: Record every fuel fill-up with mileage, liters, cost, and currency.
- 🛣️ **Mileage tracking**: Log odometer readings to monitor your driving habits.
- 📊 **Statistics dashboard**: View total distance, fuel used, cost, average consumption, and more.
- 🔒 **Authentication**: Secure login and registration with hashed passwords.
- 🌗 **Responsive & modern UI**: Clean, mobile-friendly design with dark mode support.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [NextAuth.js](https://next-auth.js.org/) (Credentials provider)
- [Tailwind CSS](https://tailwindcss.com/)
- TypeScript

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Car-Fuel-Tracking-App
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root with the following:
```
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
NEXTAUTH_SECRET=your_secret_key
```

### 4. Set up the database
Run Prisma migrations to set up the schema:
```bash
npx prisma migrate deploy
# or for development
npx prisma migrate dev
```

### 5. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` — Next.js app directory (routes, pages, API)
- `src/components/` — Reusable UI components
- `prisma/schema.prisma` — Database schema
- `src/lib/` — Auth and Prisma helpers
- `public/` — Static assets

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Lint code

## Database Schema
See [`prisma/schema.prisma`](prisma/schema.prisma) for models: `User`, `Car`, `FillUp`, `MileageEntry`, enums for `FuelType` and `Currency`.

---

> Built with passion using Next.js, Prisma, and Tailwind CSS.
