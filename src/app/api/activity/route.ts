import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const userEmail = session.user.email!;
  // Get all cars for the user
  const cars = await prisma.car.findMany({
    where: { user: { email: userEmail } },
    select: { id: true, name: true, make: true, model: true },
  });
  const carIds = cars.map((c) => c.id);

  // Get recent fill-ups and mileage entries for all cars
  const fillUps = await prisma.fillUp.findMany({
    where: { carId: { in: carIds } },
    orderBy: { date: 'desc' },
    take: 10,
    include: { car: { select: { name: true, make: true, model: true } } },
  });
  const mileageEntries = await prisma.mileageEntry.findMany({
    where: { carId: { in: carIds } },
    orderBy: { date: 'desc' },
    take: 10,
    include: { car: { select: { name: true, make: true, model: true } } },
  });

  // Merge and sort by date
  const activity = [
    ...fillUps.map(f => ({
      type: 'fillup',
      id: f.id,
      car: f.car,
      mileage: f.mileage,
      liters: f.liters,
      cost: f.cost,
      currency: f.currency,
      date: f.date,
    })),
    ...mileageEntries.map(m => ({
      type: 'mileage',
      id: m.id,
      car: m.car,
      mileage: m.mileage,
      date: m.date,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return NextResponse.json(activity.slice(0, 10));
}
