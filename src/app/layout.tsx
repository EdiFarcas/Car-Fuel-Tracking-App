import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Car Fuel Tracker",
  description: "Track your car's fuel and mileage easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <header className="w-full px-6 py-4 flex items-center justify-between border-b border-[var(--border)] bg-[var(--muted)] shadow-sm">
          <Link href="/dashboard" className="text-2xl font-bold tracking-tight text-[var(--primary)]">
            🚗 Car Fuel Tracker
          </Link>
          <nav className="flex gap-4">
            <Link href="/dashboard" className="hover:text-[var(--primary)] transition">Dashboard</Link>
            <Link href="/dashboard/cars/new" className="hover:text-[var(--secondary)] transition">Add Car</Link>
          </nav>
        </header>
        <div className="min-h-screen flex flex-col">
          <div className="h-4" /> {/* Spacer between navbar and content */}
          {children}
        </div>
      </body>
    </html>
  );
}
