import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const carId = searchParams.get('carId');

  const fillUps = await prisma.fillUp.findMany({
    where: {
      car: {
        id: carId || '',
        user: { email: session.user?.email! },
      },
    },
    orderBy: { date: 'desc' },
  });

  return NextResponse.json(fillUps);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { carId, mileage, liters, cost, currency, fuelType } = await req.json();
  if (!carId || !mileage || !liters || !cost || !currency || !fuelType) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  const car = await prisma.car.findFirst({
    where: {
      id: carId,
      user: { email: session.user?.email ?? undefined },
    },
  });

  if (!car) return NextResponse.json({ message: 'Car not found' }, { status: 404 });

  const fillUp = await prisma.fillUp.create({
    data: {
      mileage: parseInt(mileage),
      liters: parseFloat(liters),
      cost: parseFloat(cost),
      currency,
      carId,
      fuelType,
    },
  });

  return NextResponse.json(fillUp);
}
