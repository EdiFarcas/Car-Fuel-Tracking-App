import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  if (!message) return NextResponse.json({ error: 'Message required' }, { status: 400 });
  const contact = await prisma.contactMessage.create({
    data: { name, email, message },
  });
  return NextResponse.json({ success: true, id: contact.id });
}
