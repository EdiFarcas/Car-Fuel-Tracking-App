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
      user: { email: session.user?.email! },
    },
    select: {
      id: true,
      name: true,
      make: true,
      model: true,
      year: true,
      fuelType: true,
    },
  });

  if (!car) return NextResponse.json({ message: 'Car not found' }, { status: 404 });
  return NextResponse.json(car);
}
