import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { name, email, bug } = await req.json();
  if (!bug) return NextResponse.json({ error: 'Bug description required' }, { status: 400 });
  const report = await prisma.bugReport.create({
    data: { name, email, bug },
  });
  return NextResponse.json({ success: true, id: report.id });
}
