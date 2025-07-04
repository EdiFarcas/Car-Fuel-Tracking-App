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
    return <div className="p-6">Car not found or unauthorized access.</div>;
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">{car.name}</h1>
      <p className="text-gray-700">{car.make} {car.model} ({car.year})</p>
      <p className="text-gray-600">Fuel Type: {car.fuelType}</p>

      <div className="flex gap-4 mt-6">
        <Link
          href={`/dashboard/cars/${car.id}/mileage`}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          ➕ Add Mileage
        </Link>

        <Link
          href={`/dashboard/cars/${car.id}/fillups`}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          ➕ Add Fill-Up
        </Link>

        <Link
          href={`/dashboard/cars/${car.id}/stats`}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          📊 View Stats
        </Link>
      </div>
    </main>
  );
}
