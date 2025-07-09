import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { name, make, model, year, fuelTypes } = body;

  if (!name || !make || !model || !year || !fuelTypes || !Array.isArray(fuelTypes) || fuelTypes.length === 0) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email ?? undefined },
  });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  await prisma.car.create({
    data: {
      name,
      make,
      model,
      year: parseInt(year),
      fuelTypes: { set: fuelTypes },
      userId: user.id,
    },
  });

  return NextResponse.json({ message: 'Car added successfully' }, { status: 200 });
}
