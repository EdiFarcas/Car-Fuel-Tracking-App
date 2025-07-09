# Car Fuel & EV Charging Tracking App

A modern web application to track your car's fuel fill-ups, electric vehicle (EV) charging sessions, mileage, and fuel/energy statistics. Built with Next.js, React, Prisma, and PostgreSQL, it provides a beautiful dashboard for managing your vehicles and analyzing efficiency over time—whether you drive gas, diesel, or electric.

## Features

- 🚗 **Multi-car support**: Track multiple vehicles (gas, diesel, or electric), each with its own stats and history.
- ⛽ **Fill-up & charging logging**: Record every fuel fill-up (liters/gallons) or EV charge (kWh), with mileage, cost, and currency.
- 🛣️ **Mileage tracking**: Log odometer readings to monitor your driving habits and efficiency.
- 📊 **Statistics dashboard**: View total distance, fuel/energy used, cost, average consumption (L/100km, MPG, or kWh/100km), and more.
- 🔄 **Unit-aware UI**: Metric/imperial toggle for combustion vehicles; automatic metric units for electric cars (kWh, kWh/100km).
- 📈 **Interactive charts**: Visualize fuel/energy consumption trends over time.
- ⬇️ **CSV export**: Download your stats for further analysis.
- 🔒 **Authentication**: Secure login and registration with hashed passwords (NextAuth.js).
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
- `src/components/` — Reusable UI components (cards, charts, toggles, etc.)
- `prisma/schema.prisma` — Database schema (User, Car, FillUp, MileageEntry, enums for FuelType and Currency)
- `src/lib/` — Auth and Prisma helpers
- `public/` — Static assets

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Lint code

## Database Schema
See [`prisma/schema.prisma`](prisma/schema.prisma) for models:
- `User`: Authentication and user management
- `Car`: Vehicle details (make, model, year, fuel type)
- `FillUp`: Fuel or charging session records
- `MileageEntry`: Odometer readings
- Enums: `FuelType` (GASOLINE, DIESEL, ELECTRIC), `Currency`

## Notable Implementation Details

- **EV support**: The UI and logic automatically switch to kWh and kWh/100km for electric cars, disabling imperial units and MPG where not applicable.
- **API endpoints**: RESTful endpoints for cars, fill-ups, mileage, and authentication.
- **Type safety**: End-to-end TypeScript, including API routes and Prisma models.
- **Modern UX**: Loading skeletons, tooltips, and accessibility best practices.

---

> Built with passion using Next.js, Prisma, and Tailwind CSS. Contributions welcome!
