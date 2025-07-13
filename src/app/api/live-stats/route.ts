import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  // Calculate average fuel price (RON/L), average efficiency (L/100km), and total CO2 saved (kg)
  // For demo, fallback to fake values if not enough data
  const fillUps = await prisma.fillUp.findMany({ select: { cost: true, liters: true, mileage: true, fuelType: true } });
  let avgFuelPrice = 7.2;
  let avgEfficiency = 6.8;
  let totalCO2Saved = 12000;
  if (fillUps.length > 0) {
    avgFuelPrice = fillUps.reduce((sum, f) => sum + f.cost / f.liters, 0) / fillUps.length;
    avgEfficiency = fillUps.reduce((sum, f) => sum + (f.liters / (f.mileage || 1)) * 100, 0) / fillUps.length;
    // Assume 2.3kg CO2 per L gasoline, 0 for electric, 1.6 for hybrid (if fuelType is ELECTRIC or car has both)
    totalCO2Saved = fillUps.filter(f => f.fuelType === 'ELECTRIC').length * 2.3 * 40; // fake: 40L per fillup
  }
  return NextResponse.json({
    avgFuelPrice,
    avgEfficiency,
    totalCO2Saved,
  });
}
