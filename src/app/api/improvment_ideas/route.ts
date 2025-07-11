import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { name, email, idea } = await req.json();
  if (!idea) return NextResponse.json({ error: 'Idea description required' }, { status: 400 });
  const improvement = await prisma.improvementIdea.create({
    data: { name, email, idea },
  });
  return NextResponse.json({ success: true, id: improvement.id });
}
