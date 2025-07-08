import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FaCarSide, FaGasPump, FaCalendarAlt, FaIndustry, FaBolt } from 'react-icons/fa';

interface CarDetailPageProps {
  params: {
    carId: string;
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const resolvedParams = await params;
  const session = await getSession();
  if (!session) redirect('/auth/login');

  const userEmail = session.user?.email!;
  const car = await prisma.car.findFirst({
    where: {
      id: resolvedParams.carId,
      user: { email: userEmail },
    },
  });

  if (!car) {
    return <div className="p-8 text-center text-red-500 text-lg font-semibold">Car not found or unauthorized access.</div>;
  }

  // Fuel type badge color and icon
  const fuelMeta: Record<string, { color: string; icon: React.ReactNode }> = {
    GASOLINE: { color: 'bg-blue-100 text-blue-700', icon: <FaGasPump className="inline mr-1" /> },
    DIESEL: { color: 'bg-yellow-100 text-yellow-800', icon: <FaGasPump className="inline mr-1" /> },
    LPG: { color: 'bg-pink-100 text-pink-700', icon: <FaGasPump className="inline mr-1" /> },
    ELECTRIC: { color: 'bg-green-100 text-green-700', icon: <FaBolt className="inline mr-1 text-green-500" /> },
  };

  return (
    <main className="max-w-3xl mx-auto p-0 md:p-8 mt-8">
      <div className="rounded-3xl shadow-2xl bg-[var(--muted)] p-0 md:p-10 flex flex-col gap-10 border border-[var(--border)]">
        {/* Car Icon & Header */}
        <div className="flex flex-col items-center gap-3 p-8 rounded-t-3xl bg-[var(--muted)] border-b border-[var(--border)] shadow-sm">
          <span className="text-6xl text-[var(--primary)] drop-shadow-lg mb-2"><FaCarSide /></span>
          <h1 className="text-4xl font-extrabold text-[var(--primary)] leading-tight tracking-tight flex items-center gap-3">
            {car.name}
            <span className="inline-block px-3 py-1 rounded-full text-base font-bold bg-gray-200 text-gray-700 ml-2">{car.year}</span>
          </h1>
          <span className={`mt-2 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 ${fuelMeta[car.fuelType]?.color || 'bg-gray-100 text-gray-700'}`}>{fuelMeta[car.fuelType]?.icon}{car.fuelType}</span>
        </div>
        {/* Car Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8">
          <div className="flex items-center gap-3">
            <FaIndustry className="text-2xl text-gray-400" />
            <span className="font-semibold text-[var(--foreground)]">Make:</span>
            <span className="ml-1 text-gray-400 font-mono text-lg">{car.make}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCarSide className="text-2xl text-gray-400" />
            <span className="font-semibold text-[var(--foreground)]">Model:</span>
            <span className="ml-1 text-gray-400 font-mono text-lg">{car.model}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-2xl text-gray-400" />
            <span className="font-semibold text-[var(--foreground)]">Year:</span>
            <span className="ml-1 text-gray-400 font-mono text-lg">{car.year}</span>
          </div>
          <div className="flex items-center gap-3">
            {fuelMeta[car.fuelType]?.icon}
            <span className="font-semibold text-[var(--foreground)]">Fuel:</span>
            <span className={`ml-1 px-2 py-1 rounded-full text-xs font-bold ${fuelMeta[car.fuelType]?.color || 'bg-gray-100 text-gray-700'}`}>{car.fuelType}</span>
          </div>
        </div>
        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center px-8 pb-8">
          <Link
            href={`/dashboard/cars/${car.id}/mileage`}
            className="flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-700 hover:scale-[1.03] transition-all"
          >
            ➕ Add Mileage
          </Link>
          <Link
            href={`/dashboard/cars/${car.id}/fillups`}
            className="flex items-center gap-2 bg-[var(--secondary)] text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-green-700 hover:scale-[1.03] transition-all"
          >
            ➕ Add Fill-Up
          </Link>
          <Link
            href={`/dashboard/cars/${car.id}/stats`}
            className="flex items-center gap-2 bg-[var(--accent)] text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-purple-800 hover:scale-[1.03] transition-all"
          >
            📊 View Stats
          </Link>
        </div>
      </div>
    </main>
  );
}
