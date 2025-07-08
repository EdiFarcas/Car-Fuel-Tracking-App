import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import CarGrid from '@/components/CarGrid';
import RecentActivity from '@/components/RecentActivity';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/auth/login');

  const userEmail = session.user.email!;
  // Fetch cars with last fill-up and mileage entries
  const cars = await prisma.car.findMany({
    where: { user: { email: userEmail } },
    include: {
      fillUps: { orderBy: { date: 'desc' }, take: 1 },
      mileage: { orderBy: { date: 'desc' }, take: 5 }, // fixed: use 'mileage' not 'mileageEntries'
    },
  });

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Personalized Greeting */}
      <div className="flex items-center gap-4 bg-[var(--muted)] rounded-xl p-6 mb-4 border border-[var(--border)] shadow">
        <span className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold text-2xl border-2 border-[var(--border)]">
          {session.user?.name?.[0]?.toUpperCase() || session.user?.email?.[0]?.toUpperCase() || 'U'}
        </span>
        <div>
          <h2 className="text-xl font-bold text-[var(--primary)]">Welcome back{session.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''}!</h2>
          <p className="text-[var(--foreground)]/60 text-sm">Ready to track your next fill-up?</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Cars</h1>
        <Link href="/dashboard/cars/new" className="bg-[var(--primary)] text-white px-4 py-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]">
          + Add Car
        </Link>
      </div>

      {cars.length ? (
        <CarGrid cars={cars} />
      ) : (
        <div className="flex flex-col items-center gap-2 py-12 text-[var(--foreground)]/40" role="status" aria-live="polite">
          <span className="text-5xl" aria-hidden="true">🚗</span>
          <div className="font-semibold">No cars added yet.</div>
          <div className="text-sm">Add your first car to get started!</div>
          <Link href="/dashboard/cars/new" className="mt-4 bg-[var(--primary)] text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-[var(--primary)]/80 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]">
            + Add Car
          </Link>
        </div>
      )}

      {/* Recent Activity Section */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-[var(--primary)] mb-4">Recent Activity</h2>
        <RecentActivity />
      </section>
    </main>
  );
}
