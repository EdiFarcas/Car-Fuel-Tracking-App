
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FaCarSide, FaGasPump, FaCalendarAlt, FaIndustry, FaBolt } from 'react-icons/fa';
import DeleteCarButton from '@/components/DeleteCarButton';

interface CarDetailPageProps {
  params: {
    carId: string;
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const session = await getSession();
  if (!session) redirect('/auth/login');

  const userEmail = session.user?.email || '';
  const car = await prisma.car.findFirst({
    where: {
      id: params.carId,
      user: { email: userEmail },
    },
    select: {
      id: true,
      name: true,
      make: true,
      model: true,
      year: true,
      fuelTypes: true,
    },
  }) as { id: string; name: string; make: string; model: string; year: number; fuelTypes?: string[] };

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

  // Normalize fuelTypes for compatibility
  const fuelTypes = Array.isArray(car.fuelTypes) ? car.fuelTypes : car.fuelTypes ? [car.fuelTypes] : [];

  return (
    <main className="max-w-full md:max-w-3xl mx-auto p-2 sm:p-4 md:p-8 mt-8">
      <div className="rounded-3xl shadow-2xl bg-[var(--muted)] p-2 sm:p-4 md:p-10 flex flex-col gap-4 sm:gap-6 md:gap-10 border border-[var(--border)] w-[96vw] max-w-[98vw] sm:w-[90vw] sm:max-w-[95vw] md:w-auto md:max-w-none">
        {/* Car Icon & Header */}
        <div className="flex flex-col items-center gap-2 sm:gap-3 p-2 sm:p-4 md:p-8 rounded-t-3xl bg-[var(--muted)] border-b border-[var(--border)] shadow-sm">
          <div className="flex flex-row flex-wrap items-center justify-center gap-2 w-full">
            <span className="text-3xl sm:text-4xl md:text-6xl text-[var(--primary)] drop-shadow-lg"><FaCarSide /></span>
            <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-[var(--primary)] leading-tight tracking-tight flex flex-row flex-wrap items-center gap-1 sm:gap-2 md:gap-3">
              <span>{car.name}</span>
              <span className="inline-block px-2 md:px-3 py-1 rounded-full text-sm md:text-base font-bold bg-gray-200 text-gray-700 ml-2">{car.year}</span>
            </h1>
          </div>
          {/* Fuel Types Row */}
          {fuelTypes.length > 0 && (
            <div className="flex flex-row flex-wrap items-center justify-center gap-2 w-full mt-1">
              {fuelTypes.length > 1 ? (
                <>
                  <span className={`px-2 py-1 rounded-l-full text-xs font-bold ${fuelMeta[fuelTypes[0]]?.color || 'bg-gray-100 text-gray-700'}`} style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: '1px solid #ccc' }}>{fuelMeta[fuelTypes[0]]?.icon}{fuelTypes[0]}</span>
                  <span className={`px-2 py-1 rounded-r-full text-xs font-bold ${fuelMeta[fuelTypes[1]]?.color || 'bg-gray-100 text-gray-700'}`} style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>{fuelMeta[fuelTypes[1]]?.icon}{fuelTypes[1]}</span>
                </>
              ) : (
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${fuelMeta[fuelTypes[0]]?.color || 'bg-gray-100 text-gray-700'}`}>{fuelMeta[fuelTypes[0]]?.icon}{fuelTypes[0]}</span>
              )}
            </div>
          )}
        </div>
        {/* Car Details */}
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 px-1 sm:px-2 md:px-8 w-full">
          {/* Make & Model Row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 w-full">
            <div className="flex items-center gap-2 md:gap-3">
              <FaIndustry className="text-xl md:text-2xl text-gray-400" />
              <span className="font-semibold text-[var(--foreground)]">Make:</span>
              <span className="ml-1 text-gray-400 font-mono text-base md:text-lg">{car.make}</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 md:ml-8">
              <FaCarSide className="text-xl md:text-2xl text-gray-400" />
              <span className="font-semibold text-[var(--foreground)]">Model:</span>
              <span className="ml-1 text-gray-400 font-mono text-base md:text-lg">{car.model}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 justify-center w-full">
            <FaCalendarAlt className="text-xl md:text-2xl text-gray-400" />
            <span className="font-semibold text-[var(--foreground)]">Year:</span>
            <span className="text-gray-400 font-mono text-base md:text-lg">{car.year}</span>
          </div>
        </div>
        {/* Actions */}
        <div className="flex flex-col md:flex-row flex-wrap gap-2 md:gap-4 justify-center items-center px-1 sm:px-2 md:px-8 pb-2 sm:pb-4 md:pb-8 w-full">
          <div className="w-full max-w-xs md:w-auto md:max-w-none flex justify-center">
            <Link
              href={`/dashboard/cars/${car.id}/mileage`}
              className="flex items-center justify-center gap-2 bg-blue-500 dark:bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold shadow-lg hover:bg-blue-700 dark:hover:bg-blue-800 hover:scale-[1.03] transition-all w-full"
            >
              ➕ Add Mileage
            </Link>
          </div>
          <div className="w-full max-w-xs md:w-auto md:max-w-none flex justify-center">
            <Link
              href={`/dashboard/cars/${car.id}/fillups`}
              className="flex items-center justify-center gap-2 bg-green-500 dark:bg-green-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold shadow-lg hover:bg-green-700 dark:hover:bg-green-800 hover:scale-[1.03] transition-all w-full"
            >
              ➕ Add Fill-Up
            </Link>
          </div>
          <div className="w-full max-w-xs md:w-auto md:max-w-none flex justify-center">
            <Link
              href={`/dashboard/cars/${car.id}/stats`}
              className="flex items-center justify-center gap-2 bg-indigo-500 dark:bg-indigo-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-800 hover:scale-[1.03] transition-all w-full"
            >
              📊 View Stats
            </Link>
          </div>
          <div className="w-full max-w-xs md:w-auto md:max-w-none flex justify-center">
            <DeleteCarButton carId={car.id} />
          </div>
        </div>
      </div>
    </main>
  );
}

