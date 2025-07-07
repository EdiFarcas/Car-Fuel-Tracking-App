import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import CarCard from '@/components/CarCard';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/auth/login');

  const userEmail = session.user.email!;
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: { cars: true },
  });

  return (
    <main className="flex flex-col gap-8 max-w-5xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-[var(--primary)]">Your Cars</h1>
        <Link href="/dashboard/cars/new" className="bg-[var(--primary)] text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition">
          + Add Car
        </Link>
      </div>
      {user?.cars.length ? (
        <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {user.cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500 py-12">
          <p className="mb-4">No cars added yet.</p>
          <Link href="/dashboard/cars/new" className="text-[var(--primary)] underline hover:text-blue-700">Add your first car</Link>
        </div>
      )}
    </main>
  );
}
