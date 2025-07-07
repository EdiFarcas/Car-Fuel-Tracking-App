import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="flex-1 flex flex-col items-center justify-center gap-10 p-8 sm:p-20">
        <div className="flex flex-col items-center gap-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={30}
            priority
          />
          <h1 className="text-4xl font-bold tracking-tight text-[var(--primary)] mb-2">
            Welcome to Car Fuel Tracker
          </h1>
          <p className="text-lg text-gray-500 max-w-xl text-center">
            Track your car's fuel fill-ups, mileage, and stats with a beautiful,
            simple dashboard.
          </p>
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/dashboard"
            className="rounded-lg bg-[var(--primary)] text-white px-6 py-3 font-semibold shadow hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>
          <a
            className="rounded-lg border border-[var(--border)] bg-[var(--muted)] text-[var(--primary)] px-6 py-3 font-semibold hover:bg-[var(--primary)] hover:text-white transition"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js Docs
          </a>
        </div>
      </section>
      <footer className="w-full py-4 flex items-center justify-center border-t border-[var(--border)] bg-[var(--muted)] text-sm text-gray-500">
        <span>
          &copy; {new Date().getFullYear()} Car Fuel Tracker. Built with Next.js.
        </span>
      </footer>
    </div>
  );
}
