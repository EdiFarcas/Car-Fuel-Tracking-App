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
      user: { email: session.user?.email! },
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
      <main className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">Not Enough Data</h1>
        <p className="text-gray-600">Add at least 2 fill-ups to see statistics.</p>
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
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Fuel Stats</h1>

      <div className="space-y-2">
        <StatCard label="Total Distance" value={`${totalDistance.toFixed(0)} km`} />
        <StatCard label="Total Fuel Used" value={`${totalLiters.toFixed(2)} L`} />
        <StatCard label="Total Fuel Cost" value={`${totalCost.toFixed(2)} ${fillUps[0].currency}`} />
        <StatCard label="Average Consumption" value={`${avgConsumption.toFixed(2)} L / 100km`} />
        <StatCard label="Average Cost / km" value={`${costPerKm.toFixed(2)} ${fillUps[0].currency}`} />
      </div>
    </main>
  );
}
