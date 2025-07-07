import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import StatCard from '@/components/StatCard';

interface StatsProps {
  params: {
    carId: string;
  };
}

export default async function StatsPage({ params }: StatsProps) {
  const session = await getSession();
  if (!session) redirect('/auth/login');

  const car = await prisma.car.findFirst({
    where: {
      id: params.carId,
      user: { email: session.user?.email || '' },
    },
    include: {
      fillUps: {
        orderBy: { mileage: 'asc' },
      },
    },
  });

  if (!car) return <div className="p-6">Car not found or unauthorized.</div>;
  const fillUps = car.fillUps;

  if (fillUps.length < 2) {
    return (
      <main className="max-w-xl mx-auto p-8 flex flex-col items-center justify-center bg-[var(--muted)] rounded-xl shadow space-y-4">
        <div className="flex flex-col items-center gap-2">
          <span className="text-5xl text-[var(--primary)]">⛽</span>
          <h1 className="text-2xl font-bold text-[var(--primary)]">Not Enough Data</h1>
          <p className="text-gray-700 text-center">Add at least 2 fill-ups to see your fuel statistics and insights.</p>
          <a href={`/dashboard/cars/${params.carId}/fillups`} className="mt-4 inline-block bg-[var(--secondary)] text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition">➕ Add Fill-Up</a>
        </div>
      </main>
    );
  }

  // Compute stats
  const first = fillUps[0];
  const last = fillUps[fillUps.length - 1];

  const totalDistance = last.mileage - first.mileage;
  const totalLiters = fillUps.slice(1).reduce((sum, f) => sum + f.liters, 0); // ignore first fill
  const totalCost = fillUps.slice(1).reduce((sum, f) => sum + f.cost, 0);

  const avgConsumption = (totalLiters / totalDistance) * 100; // L/100km
  const costPerKm = totalCost / totalDistance;

  return (
    <main className="max-w-2xl mx-auto p-8 space-y-8 bg-[var(--muted)] rounded-xl shadow">
      <h1 className="text-3xl font-bold text-[var(--primary)] flex items-center gap-2">
        <span role="img" aria-label="stats">📊</span> Fuel Stats
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatCard label="Total Distance" value={`${totalDistance.toFixed(0)} km`} icon="🛣️" color="primary" />
        <StatCard label="Total Fuel Used" value={`${totalLiters.toFixed(2)} L`} icon="⛽" color="secondary" />
        <StatCard label="Total Fuel Cost" value={`${totalCost.toFixed(2)} ${fillUps[0].currency}`} icon="💸" color="accent" />
        <StatCard label="Average Consumption" value={`${avgConsumption.toFixed(2)} L / 100km`} icon="📏" color="primary" />
        <StatCard label="Average Cost / km" value={`${costPerKm.toFixed(2)} ${fillUps[0].currency}`} icon="💰" color="secondary" />
      </div>
    </main>
  );
}
