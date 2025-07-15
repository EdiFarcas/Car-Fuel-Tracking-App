import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 flex flex-col items-center justify-center border-t border-[var(--border)] bg-[var(--muted)] text-sm text-gray-500 gap-2 mt-auto">
      <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-1 w-full px-2">
        <Link href="/about" className="hover:text-[var(--primary)] transition">About</Link>
        <Link href="/contact" className="hover:text-[var(--primary)] transition">Contact</Link>
        <Link href="/bugs" className="hover:text-[var(--primary)] transition">Bug Report</Link>
        <Link href="/improvment_ideas" className="hover:text-[var(--primary)] transition">Improvment Ideas</Link>
        <Link href="/privacy" className="hover:text-[var(--primary)] transition">Privacy Policy</Link>
      </nav>
      <span>&copy; {new Date().getFullYear()} FuelTrack</span>
    </footer>
  );
}
