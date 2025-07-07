"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ClientNavbar() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const pathname = usePathname();
  const userInitial = session?.user?.name?.[0]?.toUpperCase() || session?.user?.email?.[0]?.toUpperCase() || "U";
  const [open, setOpen] = useState(false);

  function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`px-4 py-2 rounded-lg font-semibold transition hover:bg-[var(--primary)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${isActive ? "underline text-[var(--primary)]" : "text-[var(--foreground)]"}`}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <nav className="flex w-full items-center justify-between">
      <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-[var(--primary)] hover:scale-105 transition">
        <span className="text-3xl">🚗</span>
        <span>Car Fuel Tracker</span>
      </Link>
      {/* Desktop nav */}
      <div className="hidden md:flex gap-4 items-center">
        <NavLink href="/dashboard">Dashboard</NavLink>
        {isLoggedIn && <NavLink href="/dashboard/cars/new">Add Car</NavLink>}
        {isLoggedIn ? (
          <div className="flex items-center gap-2 ml-4">
            <span className="w-9 h-9 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-lg border-2 border-[var(--border)] shadow" title={session.user?.name || session.user?.email || undefined}>{userInitial}</span>
            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white font-semibold shadow hover:bg-purple-800 transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                Log Out
              </button>
            </form>
          </div>
        ) : (
          <>
            <Link href="/auth/login" className="px-4 py-2 rounded-lg border border-[var(--primary)] text-[var(--primary)] font-semibold hover:bg-[var(--primary)] hover:text-white transition focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">Login</Link>
            <Link href="/auth/register" className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-semibold shadow hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">Register</Link>
          </>
        )}
      </div>
      {/* Hamburger for mobile */}
      <div className="md:hidden relative">
        <button
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--muted)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-2xl">☰</span>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-[var(--muted)] rounded-xl shadow-lg border border-[var(--border)] z-50 flex flex-col p-2 gap-2 animate-fade-in">
            <NavLink href="/dashboard">Dashboard</NavLink>
            {isLoggedIn && <NavLink href="/dashboard/cars/new">Add Car</NavLink>}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-base border-2 border-[var(--border)] shadow">{userInitial}</span>
                <form action="/api/auth/signout" method="post" className="w-full">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 rounded-lg bg-[var(--accent)] text-white font-semibold shadow hover:bg-purple-800 transition mt-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  >
                    Log Out
                  </button>
                </form>
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="w-full px-4 py-2 rounded-lg border border-[var(--primary)] text-[var(--primary)] font-semibold hover:bg-[var(--primary)] hover:text-white transition focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">Login</Link>
                <Link href="/auth/register" className="w-full px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-semibold shadow hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
