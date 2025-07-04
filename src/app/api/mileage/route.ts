import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET: Return mileage entries for a car
export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const carId = searchParams.get('carId');

  const entries = await prisma.mileageEntry.findMany({
    where: {
      car: {
        id: carId || '',
        user: {
          email: session.user?.email!,
        },
      },
    },
    orderBy: { date: 'desc' },
  });

  return NextResponse.json(entries);
}

// POST: Add mileage entry
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { carId, mileage } = await req.json();
  if (!carId || !mileage) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  const car = await prisma.car.findFirst({
    where: {
      id: carId,
      user: { email: session.user?.email! },
    },
  });

  if (!car) return NextResponse.json({ message: 'Car not found' }, { status: 404 });

  const entry = await prisma.mileageEntry.create({
    data: {
      mileage: parseInt(mileage),
      carId,
    },
  });

  return NextResponse.json(entry);
}
