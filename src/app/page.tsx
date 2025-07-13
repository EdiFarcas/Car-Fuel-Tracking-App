"use client";
import React, { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LiveStatsPreview from "@/components/LiveStatsPreview";
import { useSession } from "next-auth/react";

function UseCaseBlocks() {
  const blocks = [
    {
      icon: "🚗",
      title: "For Commuters",
      desc: "Track daily costs and distance. See your monthly spend and optimize your route.",
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "For Families",
      desc: "Manage multiple cars in one account. Switch between vehicles with ease.",
    },
    {
      icon: "♻️",
      title: "For Eco-conscious Drivers",
      desc: "Get hybrid/EV performance and sustainability insights. See your CO₂ savings.",
    },
  ];
  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-[var(--primary)] mb-8">Who Is This For?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {blocks.map((b) => (
          <div key={b.title} className="group bg-white/40 dark:bg-[var(--muted)]/60 rounded-xl shadow p-6 flex flex-col items-center gap-3 border border-[var(--border)] transition-all hover:scale-105 hover:bg-white/60 dark:hover:bg-[var(--muted)]/80 animate-fade-in backdrop-blur">
            <span className="text-4xl group-hover:scale-125 transition-transform">{b.icon}</span>
            <h3 className="font-semibold text-lg text-[var(--primary)] group-hover:text-[var(--secondary)]">{b.title}</h3>
            <p className="text-center text-[var(--foreground)]/80 group-hover:text-[var(--foreground)]">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureGrid() {
  const features = [
    {
      icon: "⛽",
      title: "Log Fill-Ups",
      desc: "Quickly add fuel entries and keep your records organized.",
      more: "Supports gasoline, diesel, LPG, and electric charging. Hybrid-aware UI.",
    },
    {
      icon: "📊",
      title: "Analyze Stats",
      desc: "Visualize your fuel consumption, costs, and mileage trends.",
      more: "Export your data, filter by car or fuel type, and see your efficiency improve.",
    },
    {
      icon: "🚗",
      title: "Manage Cars",
      desc: "Track multiple vehicles and switch between them easily.",
      more: "Perfect for families, fleets, or anyone with more than one car.",
    },
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 py-12 px-4">
      {features.map((f, i) => (
        <div
          key={f.title}
          className={`flex flex-col items-center text-center gap-2 bg-white/40 dark:bg-[var(--muted)]/60 rounded-xl shadow p-6 border border-[var(--border)] transition-all duration-300 cursor-pointer ${open === i ? "scale-105 bg-white/60 dark:bg-[var(--muted)]/80" : ""} backdrop-blur`}
          onClick={() => setOpen(open === i ? null : i)}
          onMouseEnter={() => setOpen(i)}
          onMouseLeave={() => setOpen(null)}
        >
          <span className="text-4xl text-[var(--primary)]">{f.icon}</span>
          <h2 className="font-semibold text-lg text-[var(--foreground)]">{f.title}</h2>
          <p className="text-[var(--foreground)] opacity-80">{f.desc}</p>
          <div
            className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
          >
            <p className="text-[var(--foreground)]/90 text-sm bg-[var(--background)] rounded p-2 border mt-2 border-[var(--border)] shadow-inner animate-fade-in">
              {f.more}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

function CTAVariant() {
  // Randomly show one of two CTAs per session
  const [variant] = useState(() => Math.random() < 0.5 ? 0 : 1);
  const ctas = [
    { label: "Start Tracking for Free", href: "/auth/register" },
    { label: "Log Your First Fill-Up Now", href: "/auth/register" },
  ];
  return (
    <div className="flex justify-center my-8">
      <Link
        href={ctas[variant].href}
        className="rounded-lg bg-[var(--primary)] text-white px-8 py-4 text-lg font-bold shadow hover:bg-blue-700 transition animate-bounce-in"
      >
        {ctas[variant].label}
      </Link>
    </div>
  );
}

export default function Home() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  return (
    <div className="flex flex-col min-h-screen">
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
            {isLoggedIn ? "Welcome Back!" : "Track Your Car’s Fuel & Mileage Effortlessly"}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl text-center">
            {isLoggedIn
              ? "Jump right into your dashboard to log fill-ups, view stats, and manage your cars."
              : "Effortlessly log fill-ups, monitor fuel costs, and analyze your driving habits—all in one beautiful dashboard. Save money, track efficiency, and manage all your vehicles including hybrids and EVs."}
          </p>
          {/* CTA or Dashboard Button */}
          {isLoggedIn ? (
            <div className="flex justify-center my-8">
              <Link href="/dashboard" className="rounded-lg bg-[var(--primary)] text-white px-8 py-4 text-lg font-bold shadow hover:bg-blue-700 transition animate-bounce-in">
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-4 my-8 w-full">
              <Link
                href="/auth/login"
                className="w-full sm:w-auto rounded-lg bg-white border border-[var(--primary)] text-[var(--primary)] px-8 py-4 text-lg font-bold shadow hover:bg-[var(--primary)] hover:text-white transition text-center"
              >
                Log In
              </Link>
              <Link
                href="/auth/register"
                className="w-full sm:w-auto rounded-lg bg-[var(--primary)] text-white px-8 py-4 text-lg font-bold shadow hover:bg-blue-700 transition animate-bounce-in text-center"
              >
                Sign Up And Log Your First Fill-Up Now
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Live Stats Preview */}
      <Suspense fallback={<div className="text-center py-8">Loading live stats...</div>}>
        <LiveStatsPreview />
      </Suspense>

      {/* Use Case Blocks */}
      <UseCaseBlocks />

      {/* Dynamic Feature Grid */}
      <FeatureGrid />

      {/* ...existing reviews, etc... */}

      {/* Footer */}
      <footer className="w-full py-6 flex flex-col items-center justify-center border-t border-[var(--border)] bg-[var(--muted)] text-sm text-gray-500 gap-2 mt-auto">
        <nav className="flex gap-6 mb-1">
          <Link href="/about" className="hover:text-[var(--primary)] transition">About</Link>
          <Link href="/contact" className="hover:text-[var(--primary)] transition">Contact</Link>
          <Link href="/bugs" className="hover:text-[var(--primary)] transition">Bug Report</Link>
          <Link href="/improvment_ideas" className="hover:text-[var(--primary)] transition">Improvment Ideas</Link>
          <Link href="/privacy" className="hover:text-[var(--primary)] transition">Privacy Policy</Link>
        </nav>
        <span>&copy; {new Date().getFullYear()} Car Fuel Tracker.</span>
      </footer>
    </div>
  );
}
