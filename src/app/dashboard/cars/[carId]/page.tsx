import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

interface CarDetailPageProps {
  params: {
    carId: string;
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const session = await getSession();
  if (!session) redirect('/auth/login');

  const userEmail = session.user?.email!;
  const car = await prisma.car.findFirst({
    where: {
      id: params.carId,
      user: { email: userEmail },
    },
  });

  if (!car) {
    return <div className="p-8 text-center text-red-500 text-lg font-semibold">Car not found or unauthorized access.</div>;
  }

  return (
    <main className="max-w-3xl mx-auto p-8 space-y-6 bg-[var(--muted)] rounded-xl shadow">
      <h1 className="text-3xl font-bold text-[var(--primary)]">{car.name}</h1>
      <p className="text-lg text-gray-700">{car.make} {car.model} ({car.year})</p>
      <p className="text-gray-600">Fuel Type: <span className="font-semibold text-[var(--secondary)]">{car.fuelType}</span></p>
      <div className="flex flex-wrap gap-4 mt-8">
        <Link
          href={`/dashboard/cars/${car.id}/mileage`}
          className="bg-[var(--primary)] text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
        >
          ➕ Add Mileage
        </Link>
        <Link
          href={`/dashboard/cars/${car.id}/fillups`}
          className="bg-[var(--secondary)] text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition"
        >
          ➕ Add Fill-Up
        </Link>
        <Link
          href={`/dashboard/cars/${car.id}/stats`}
          className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-purple-800 transition"
        >
          📊 View Stats
        </Link>
      </div>
    </main>
  );
}
