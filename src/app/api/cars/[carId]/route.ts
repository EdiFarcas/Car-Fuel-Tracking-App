import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { carId: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const carId = params.carId;
  if (!carId) return NextResponse.json({ message: 'Missing carId' }, { status: 400 });

  const car = await prisma.car.findFirst({
    where: {
      id: carId,
      user: { email: session.user?.email ?? undefined },
    },
    select: {
      id: true,
      name: true,
      make: true,
      model: true,
      year: true,
      fuelTypes: true,
    },
  });

  if (!car) return NextResponse.json({ message: 'Car not found' }, { status: 404 });
  return NextResponse.json(car);
}

export async function DELETE(req: Request, { params }: { params: { carId: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const carId = params.carId;
  if (!carId) return NextResponse.json({ message: 'Missing carId' }, { status: 400 });

  // Only allow deleting user's own car
  const car = await prisma.car.findFirst({
    where: {
      id: carId,
      user: { email: session.user?.email ?? undefined },
    },
  });
  if (!car) return NextResponse.json({ message: 'Car not found' }, { status: 404 });

  await prisma.car.delete({ where: { id: carId } });
  return NextResponse.json({ message: 'Car deleted' });
}
