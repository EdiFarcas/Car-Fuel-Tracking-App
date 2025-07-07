import { Car } from '@prisma/client';
import Link from 'next/link';

export default function CarCard({ car }: { car: Car }) {
  return (
    <Link href={`/dashboard/cars/${car.id}`} className="block group">
      <div className="border border-[var(--border)] rounded-xl p-6 shadow-sm bg-white group-hover:shadow-lg transition flex flex-col gap-2 h-full">
        <h2 className="text-xl font-bold text-[var(--primary)] group-hover:underline">{car.name}</h2>
        <p className="text-gray-700">{car.make} {car.model} <span className="text-gray-400">({car.year})</span></p>
        <p className="text-sm text-[var(--secondary)] mt-1 font-semibold">Fuel Type: {car.fuelType}</p>
      </div>
    </Link>
  );
}
