import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
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
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Cars</h1>
        <Link href="/dashboard/cars/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add Car
        </Link>
      </div>

      {user?.cars.length ? (
        <ul className="grid gap-4">
          {user.cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </ul>
      ) : (
        <p>No cars added yet.</p>
      )}
    </main>
  );
}
