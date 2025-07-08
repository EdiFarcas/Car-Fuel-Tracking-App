import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import StatsPageClient from '@/components/StatsPageClient';

interface StatsProps {
  params: {
    carId: string;
  };
}

export default async function StatsPage({ params }: StatsProps) {
  let fillUpsWithCarName = [];
  let error = null;
  try {
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

    if (!car) throw new Error('Car not found or unauthorized.');
    fillUpsWithCarName = car.fillUps.map(f => ({ ...f, car: { name: car.name, fuelType: car.fuelType } }));
  } catch (e: any) {
    error = e?.message || 'An unexpected error occurred.';
  }
  return <StatsPageClient fillUps={fillUpsWithCarName} carId={params.carId} error={error} />;
}
