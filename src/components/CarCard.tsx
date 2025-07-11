import Link from 'next/link';

// Removed unused Car import and suppressed 'any' type warning for pragmatic dashboard use
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CarCard({ car }: { car: any }) {
  const lastFill = car.fillUps?.[0];
  const mileageEntries = car.mileage || [];
  const avgMileage = mileageEntries.length > 1
    ? Math.round((mileageEntries[0].mileage - mileageEntries[mileageEntries.length - 1].mileage) / (mileageEntries.length - 1))
    : null;

  function getFuelBadgeColor(fuelType: string) {
    switch (fuelType) {
      case 'GASOLINE': return 'bg-blue-200 text-blue-800 dark:bg-blue-400 dark:text-blue-900';
      case 'DIESEL': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-300 dark:text-yellow-900';
      case 'LPG': return 'bg-purple-100 text-purple-800 dark:bg-purple-300 dark:text-purple-900';
      case 'ELECTRIC': return 'bg-green-100 text-green-800 dark:bg-green-300 dark:text-green-900';
      default: return 'bg-gray-200 text-gray-700 dark:bg-gray-400 dark:text-gray-900';
    }
  }

  // Show all fuel types as badges if car.fuelTypes is an array
  let fuelBadges = null;
  if (Array.isArray(car.fuelTypes) && car.fuelTypes.length > 0) {
    if (car.fuelTypes.length === 1) {
      fuelBadges = (
        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${getFuelBadgeColor(car.fuelTypes[0])}`}>{car.fuelTypes[0]}</span>
      );
    } else {
      // Show both, but visually split: half badge for each
      fuelBadges = (
        <span className="ml-2 flex items-center">
          <span className={`px-2 py-1 rounded-l-full text-xs font-bold ${getFuelBadgeColor(car.fuelTypes[0])}`} style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: '1px solid #ccc' }}>{car.fuelTypes[0]}</span>
          <span className={`px-2 py-1 rounded-r-full text-xs font-bold ${getFuelBadgeColor(car.fuelTypes[1])}`} style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>{car.fuelTypes[1]}</span>
        </span>
      );
    }
  } else if (car.fuelType) {
    fuelBadges = <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${getFuelBadgeColor(car.fuelType)}`}>{car.fuelType}</span>;
  }

  return (
    <Link href={`/dashboard/cars/${car.id}`}>
      <div className="border border-[var(--border)] rounded-xl p-4 shadow-sm hover:shadow-md transition bg-[var(--muted)]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--primary)]">{car.name}</h2>
          <span className="flex flex-wrap gap-1">{fuelBadges}</span>
        </div>
        <p className="text-[var(--foreground)]/80">{car.make} {car.model} ({car.year})</p>
        <div className="mt-3 text-sm text-[var(--foreground)]/80">
          {lastFill ? (
            <div>Last Fill-Up: <span className="font-semibold">{new Date(lastFill.date).toLocaleDateString()}</span> <span className="ml-2">({lastFill.mileage} km)</span></div>
          ) : (
            <div className="opacity-60">Last Fill-Up: Not enough data</div>
          )}
          {avgMileage !== null ? (
            <div>Avg. Mileage: <span className="font-semibold">{avgMileage} km</span></div>
          ) : (
            <div className="opacity-60">Avg. Mileage: Not enough data</div>
          )}
        </div>
      </div>
    </Link>
  );
}
