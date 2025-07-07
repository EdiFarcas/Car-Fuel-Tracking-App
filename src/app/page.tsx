import Image from "next/image";
import Link from "next/link";
import { getSession } from "@/lib/auth";

export default async function Home() {
  const session = await getSession();
  const isLoggedIn = !!session;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center gap-10 p-8 sm:p-20">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/Car_Dashboard.jpg"
            alt="Car dashboard illustration"
            width={480}
            height={270}
            className="mb-2 rounded-xl shadow max-w-full h-auto object-cover"
            priority
          />
          <h1 className="text-5xl font-extrabold tracking-tight text-[var(--primary)] mb-2 text-center">
            {isLoggedIn ? "Welcome Back!" : "Track Your Car’s Fuel & Mileage"}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl text-center">
            {isLoggedIn
              ? "Jump right into your dashboard to log fill-ups, view stats, and manage your cars."
              : "Effortlessly log fill-ups, monitor fuel costs, and analyze your driving habits—all in one beautiful dashboard."}
          </p>
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="rounded-lg bg-[var(--primary)] text-white px-8 py-4 text-lg font-bold shadow hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-lg bg-[var(--primary)] text-white px-8 py-4 text-lg font-bold shadow hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="rounded-lg border border-[var(--primary)] bg-[var(--muted)] text-[var(--primary)] px-8 py-4 text-lg font-bold hover:bg-[var(--primary)] hover:text-white transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 py-12 px-4">
        <div className="flex flex-col items-center text-center gap-2 bg-[var(--muted)] rounded-xl shadow p-6 border border-[var(--border)]">
          <span className="text-4xl text-[var(--primary)]">⛽</span>
          <h2 className="font-semibold text-lg text-[var(--foreground)]">
            Log Fill-Ups
          </h2>
          <p className="text-[var(--foreground)] opacity-80">
            Quickly add fuel entries and keep your records organized.
          </p>
        </div>
        <div className="flex flex-col items-center text-center gap-2 bg-[var(--muted)] rounded-xl shadow p-6 border border-[var(--border)]">
          <span className="text-4xl text-[var(--secondary)]">📊</span>
          <h2 className="font-semibold text-lg text-[var(--foreground)]">
            Analyze Stats
          </h2>
          <p className="text-[var(--foreground)] opacity-80">
            Visualize your fuel consumption, costs, and mileage trends.
          </p>
        </div>
        <div className="flex flex-col items-center text-center gap-2 bg-[var(--muted)] rounded-xl shadow p-6 border border-[var(--border)]">
          <span className="text-4xl text-[var(--accent)]">🚗</span>
          <h2 className="font-semibold text-lg text-[var(--foreground)]">
            Manage Cars
          </h2>
          <p className="text-[var(--foreground)] opacity-80">
            Track multiple vehicles and switch between them easily.
          </p>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="w-full max-w-2xl mx-auto py-8 px-4">
        <div className="bg-[var(--muted)] rounded-xl shadow p-6 flex flex-col items-center gap-3 border border-[var(--border)]">
          <span className="text-3xl text-[var(--secondary)]">“</span>
          <p className="text-center text-lg text-[var(--foreground)] font-medium">
            This app made it so easy to track my car’s fuel expenses and spot
            trends. Highly recommended for anyone who wants to save money and
            understand their driving habits!
          </p>
          <span className="text-sm text-gray-500">— Happy Driver</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 flex flex-col items-center justify-center border-t border-[var(--border)] bg-[var(--muted)] text-sm text-gray-500 gap-2 mt-auto">
        <nav className="flex gap-6 mb-1">
          <Link
            href="/about"
            className="hover:text-[var(--primary)] transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-[var(--primary)] transition"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="hover:text-[var(--primary)] transition"
          >
            Privacy Policy
          </Link>
        </nav>
        <span>&copy; {new Date().getFullYear()} Car Fuel Tracker.</span>
      </footer>
    </div>
  );
}
