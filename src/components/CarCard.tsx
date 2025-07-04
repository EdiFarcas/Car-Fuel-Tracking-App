import Link from 'next/link';
import { Car } from '@prisma/client';

export default function CarCard({ car }: { car: Car }) {
  return (
    <Link href={`/dashboard/cars/${car.id}`}>
      <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-gray-50">
        <h2 className="text-xl font-bold text-black">{car.name}</h2>
        <p className="text-gray-600">{car.make} {car.model} ({car.year})</p>
        <p className="text-sm text-gray-500 mt-1">Fuel Type: {car.fuelType}</p>
      </div>
    </Link>
  );
}
