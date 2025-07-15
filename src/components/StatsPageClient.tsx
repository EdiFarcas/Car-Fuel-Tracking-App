"use client";
import FuelStatsChart from '@/components/FuelStatsChart';
import StatCard from '@/components/StatCard';
import StatsTimeRangeFilter from '@/components/StatsTimeRangeFilter';
import StatsExportButton from '@/components/StatsExportButton';
import UnitsToggle, { Units } from '@/components/UnitsToggle';
import Achievements, { Achievement } from '@/components/Achievements';
import StatsSkeleton from '@/components/StatsSkeleton';
import AchievementsSkeleton from '@/components/AchievementsSkeleton';
import ChartSkeleton from '@/components/ChartSkeleton';
import { useMemo, useState } from 'react';

interface FillUp {
  id: string;
  mileage: number;
  liters: number;
  cost: number;
  currency: string;
  date: string | Date;
  car?: { fuelType?: string; fuelTypes?: string[] };
  fuelType?: string;
}

export default function StatsPageClient({ fillUps, carId, error, loading = false }: { fillUps: FillUp[]; carId: string; error?: string; loading?: boolean }) {
  const [range, setRange] = useState<number | null>(30);
  const [units, setUnits] = useState<Units>('metric');
  // Hybrid: fuel type selection
  const allFuelTypes = Array.from(new Set(fillUps.map(f => f.fuelType).filter(Boolean)));
  const [selectedFuelType, setSelectedFuelType] = useState<string>(allFuelTypes[0] || '');
  const filteredByFuel = useMemo(() => {
    return fillUps.filter(f => f.fuelType === selectedFuelType);
  }, [fillUps, selectedFuelType]);
  const now = useMemo(() => new Date(), []);
  const filtered = useMemo(() => {
    if (!range) return filteredByFuel;
    return filteredByFuel.filter(f => {
      const d = typeof f.date === 'string' ? new Date(f.date) : f.date;
      return d >= new Date(now.getTime() - (range ?? 30) * 24 * 60 * 60 * 1000);
    });
  }, [filteredByFuel, range, now]);

  if (error) {
    return (
      <main className="max-w-5xl mx-auto p-4 sm:p-8 space-y-8 bg-[var(--muted)] rounded-xl shadow m-2 sm:m-4 mb-8 px-2 sm:px-8 lg:px-16">
        <div className="flex flex-col items-center gap-4">
          <span className="text-7xl mb-2 opacity-80" role="img" aria-label="Error">❌</span>
          <h1 className="text-2xl font-bold text-[var(--primary)]">Oops, Something Went Wrong</h1>
          <p className="text-[var(--foreground)]/80 text-center max-w-xs">{error}</p>
          <a href={`/dashboard/cars/${carId}/fillups`} className="mt-4 inline-block bg-[var(--primary)] text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-[var(--secondary)] transition focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">➕ Add Your First Fill-Up</a>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto p-4 sm:p-8 space-y-8 bg-[var(--muted)] rounded-xl shadow m-2 sm:m-4 mb-8 px-2 sm:px-8 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
          <div className="h-10 w-40 bg-[var(--border)] rounded-full animate-pulse" />
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <div className="h-10 w-32 bg-[var(--border)] rounded-full animate-pulse" />
          <div className="h-10 w-32 bg-[var(--border)] rounded-full animate-pulse" />
        </div>
        <ChartSkeleton />
        <StatsSkeleton />
        <AchievementsSkeleton />
      </main>
    );
  }

  // Comparative insights logic
  // (removed duplicate block)

  // Stats calculations
  if (filtered.length < 2) {
    return (
      <main className="flex flex-col items-center justify-center py-16 px-2 min-h-[60vh]">
        <div className="w-full max-w-md mx-auto bg-[var(--muted)] rounded-xl shadow p-8 flex flex-col items-center">
          <span className="text-7xl mb-2 opacity-80" role="img" aria-label="No stats">📉</span>
          <h1 className="text-2xl font-bold text-[var(--primary)] text-center">No Stats Yet</h1>
          <p className="text-[var(--foreground)]/80 text-center max-w-xs mb-4">Add at least 2 fill-ups to unlock your personalized fuel stats, insights, and achievements. Start tracking your car’s journey today!</p>
          <a href={`/dashboard/cars/${carId}/fillups`} className="mt-4 inline-block bg-[var(--primary)] text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-[var(--secondary)] transition focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">➕ Add Your First Fill-Up</a>
        </div>
      </main>
    );
  }

  // --- MAIN RETURN BLOCK ---

  // MAIN RETURN BLOCK (only one return statement)

  // Comparative insights logic
  const last30 = filtered;
  const prev30 = fillUps.filter(f => {
    const d = typeof f.date === 'string' ? new Date(f.date) : f.date;
    return d < new Date(now.getTime() - (range ?? 30) * 24 * 60 * 60 * 1000) && d >= new Date(now.getTime() - 2 * (range ?? 30) * 24 * 60 * 60 * 1000);
  });
  function avgCons(list: FillUp[]) {
    if (list.length < 2) return null;
    let totalDist = 0, totalLit = 0;
    for (let i = 1; i < list.length; i++) {
      totalDist += list[i].mileage - list[i - 1].mileage;
      totalLit += list[i].liters;
    }
    return totalDist > 0 ? (totalLit / totalDist) * 100 : null;
  }
  const avgLast30 = avgCons(last30);
  const avgPrev30 = avgCons(prev30);
  let comparison = null;
  if (avgLast30 && avgPrev30) {
    const diff = avgLast30 - avgPrev30;
    const percent = (diff / avgPrev30) * 100;
    comparison = {
      improved: diff < 0,
      percent: Math.abs(percent).toFixed(1),
      diff: diff.toFixed(2),
    };
  }
  let insight = '';
  if (comparison) {
    if (comparison.improved) {
      insight = `Great job! Your average fuel consumption improved by ${comparison.percent}% over the selected period.`;
    } else if (Number(comparison.percent) > 0) {
      insight = `Heads up! Your average fuel consumption increased by ${comparison.percent}% over the selected period.`;
    }
  }

  // Stats calculations
  if (filtered.length < 2) {
    return (
      <main className="flex flex-col items-center justify-center py-16 px-2 min-h-[60vh]">
        <div className="w-full max-w-md mx-auto bg-[var(--muted)] rounded-xl shadow p-8 flex flex-col items-center">
          <span className="text-7xl mb-2 opacity-80" role="img" aria-label="No stats">📉</span>
          <h1 className="text-2xl font-bold text-[var(--primary)] text-center">No Stats Yet</h1>
          <p className="text-[var(--foreground)]/80 text-center max-w-xs mb-4">Add at least 2 fill-ups to unlock your personalized fuel stats, insights, and achievements. Start tracking your car’s journey today!</p>
          <a href={`/dashboard/cars/${carId}/fillups`} className="mt-4 inline-block bg-[var(--primary)] text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-[var(--secondary)] transition focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">➕ Add Your First Fill-Up</a>
        </div>
      </main>
    );
  }

  // Conversion helpers
  function kmToMiles(km: number) { return km * 0.621371; }
  function litersToGallons(l: number) { return l * 0.264172; }
  function lPer100kmToMpg(l100: number) { return l100 > 0 ? 235.215 / l100 : 0; }

  const first = filtered[0];
  const last = filtered[filtered.length - 1];
  const totalDistance = units === 'imperial' ? kmToMiles(last.mileage - first.mileage) : last.mileage - first.mileage;
  const totalLiters = filtered.slice(0, -1).reduce((sum, f) => sum + (units === 'imperial' ? litersToGallons(f.liters) : f.liters), 0);
  const totalCost = filtered.slice(0).reduce((sum, f) => sum + f.cost, 0);
  const avgConsumption = (() => {
    const dist = last.mileage - first.mileage;
    const lit = filtered.slice(0, -1).reduce((sum, f) => sum + f.liters, 0);
    if (units === 'imperial') {
      return lPer100kmToMpg((lit / dist) * 100);
    } else {
      return (lit / dist) * 100;
    }
  })();
  const costPerDist = totalCost / (units === 'imperial' ? kmToMiles(last.mileage - first.mileage) : last.mileage - first.mileage);
  const chartFillUps = filtered.map(f => ({ ...f, date: typeof f.date === 'string' ? f.date : f.date.toISOString() }));

  // Achievement logic
  const numFillUps = filtered.length;
  const totalKm = last.mileage - first.mileage;
  const bestEfficiency = Math.min(...filtered.slice(1).map((f, i) => {
    if (i === 0) return Infinity;
    const dist = filtered[i].mileage - filtered[i - 1].mileage;
    return dist > 0 ? (filtered[i].liters / dist) * 100 : Infinity;
  }));
  const achievements: Achievement[] = [
    {
      id: 'first-fill',
      label: 'First Fill-Up',
      description: 'Logged your first fill-up!',
      icon: '⛽',
      achieved: numFillUps >= 1,
    },
    {
      id: 'ten-fills',
      label: '10 Fill-Ups',
      description: 'Logged 10 fill-ups!',
      icon: '🔟',
      achieved: numFillUps >= 10,
    },
    {
      id: '1000km',
      label: '1,000 km',
      description: 'Tracked 1,000 km!',
      icon: '🛣️',
      achieved: totalKm >= 1000,
    },
    {
      id: 'best-eff',
      label: 'Best Efficiency',
      description: 'Achieved <6 L/100km!',
      icon: '🌱',
      achieved: bestEfficiency < 6,
    },
  ];

  // Get fuel type from first fill-up (all fill-ups for a car have the same type)
  const fuelType = filtered[0]?.fuelType;
  const isElectric = fuelType === 'ELECTRIC';
  // If electric, always use metric units
  const displayUnits = isElectric ? 'metric' : units;
  return (
    <main className="flex flex-col items-center justify-center py-8 px-2 w-full">
      {/* Centered header and controls */}
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-8 bg-[var(--muted)] rounded-xl shadow m-2 sm:m-4 mb-4 px-2 sm:px-8 lg:px-16 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--primary)] flex items-center gap-3 m-2 sm:m-4 mt-0 justify-center">
          <span role="img" aria-label="stats">📊</span> Fuel Stats
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 w-full justify-center">
                <span className="text-xs font-semibold text-[var(--foreground)]/70 mb-1 sm:mb-0 sm:mr-2">Fuel:</span>
          {allFuelTypes.length > 1 && (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <select
                value={selectedFuelType}
                onChange={e => setSelectedFuelType(e.target.value)}
                className="border border-[var(--border)] px-2 py-1 rounded-lg bg-[var(--background)] text-[var(--foreground)] font-semibold"
              >
                {allFuelTypes.map(ft => (
                  <option key={ft} value={ft}>{ft}</option>
                ))}
              </select>
            </div>
          )}
          {!isElectric && (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-center justify-center">
              <UnitsToggle units={units} setUnits={setUnits} disabled={isElectric} />
            </div>
          )}
          {isElectric && (
            <span className="text-xs font-semibold text-[var(--foreground)]/70 mb-1 sm:mb-0 sm:mr-2">Units: kWh/100km</span>
          )}
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 mb-2 w-full justify-center">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-center">
            <StatsTimeRangeFilter value={range} onChange={setRange} />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-center">
            <StatsExportButton fillUps={filtered} units={displayUnits} isElectric={isElectric} />
          </div>
        </div>
      </div>
      {/* 2x2 Responsive CSS grid for stats, chart, achievements (achievements only under chart) */}
      <div
        className="w-full max-w-7xl mx-auto grid grid-cols-1 grid-rows-[auto_auto] gap-4 items-start mb-0
        lg:grid-cols-2 lg:grid-rows-1 lg:gap-6"
      >
        {/* Stats Cards: top left (1x1) */}
        <div
          className="col-span-1 row-span-1 lg:col-start-1 lg:row-start-1 flex justify-center"
        >
          <div className="bg-[var(--background)] border border-[var(--border)] rounded-3xl shadow-2xl p-4 sm:p-6 w-full max-w-full animate-fadein flex justify-center items-start mb-0">
            <div className="flex flex-row flex-wrap gap-4 sm:gap-6 w-full justify-center items-stretch">
              <StatCard label={`Total Distance`} value={`${totalDistance.toFixed(0)} ${displayUnits === 'imperial' ? 'mi' : 'km'}`} icon="🛣️" color="primary" info={displayUnits === 'imperial' ? 'Total miles driven in selected period.' : 'Total kilometers driven in selected period.'} />
              <StatCard label={`Total Fuel Used`} value={`${totalLiters.toFixed(2)} ${isElectric ? 'kWh' : (displayUnits === 'imperial' ? 'gal' : 'L')}`} icon="⛽" color="secondary" info={isElectric ? 'Total kilowatt-hours used in selected period.' : (displayUnits === 'imperial' ? 'Total gallons used in selected period.' : 'Total liters used in selected period.')} />
              <StatCard label="Total Fuel Cost" value={`${totalCost.toFixed(2)} ${filtered[0].currency}`} icon="💸" color="accent" info="Sum of all fill-up costs in selected period." />
              <StatCard label="Average Consumption" value={`${avgConsumption.toFixed(2)} ${isElectric ? 'kWh / 100km' : (displayUnits === 'imperial' ? 'MPG' : 'L / 100km')}`} icon="📏" color="primary" info={isElectric ? 'Kilowatt-hours per 100km (lower is better).' : (displayUnits === 'imperial' ? 'Miles per gallon (higher is better).' : 'Liters per 100km (lower is better).')} />
              <StatCard label="Cost per Distance" value={`${costPerDist.toFixed(2)} ${filtered[0].currency} / ${displayUnits === 'imperial' ? 'mi' : 'km'}`} icon="💰" color="secondary" info="Fuel cost per unit of distance." />
              <StatCard label="Fill-Up Count" value={`${filtered.length}`} icon="⛽️" color="accent" info="Total number of fill-ups in selected period." />
            </div>
          </div>
        </div>

        {/* Chart: top right (1x1) */}
        <div
          className="col-span-1 row-span-1 lg:col-start-2 lg:row-start-1 flex flex-col items-center"
        >
          <div className="w-full overflow-x-auto flex justify-center">
            <FuelStatsChart fillUps={chartFillUps} units={displayUnits} />
          </div>
          {/* Achievements: only under chart on desktop */}
          <div className="w-full mt-4 flex justify-center mb-0">
            <Achievements achievements={achievements} />
          </div>
        </div>
      </div>
      {/* Comparative insights and tips */}
      {comparison && (
        <div className={`flex items-center gap-2 p-4 rounded-lg mb-2 font-medium ${comparison.improved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} w-full justify-center mx-auto`}> 
          {comparison.improved ? '⬇️' : '⬆️'}
          <span>
            Avg. consumption: <b>{units === 'imperial' ? `${lPer100kmToMpg(avgLast30 ?? 0).toFixed(2)} MPG` : `${avgLast30?.toFixed(2)} L/100km`}</b> ({comparison.improved ? '-' : '+'}{comparison.percent}%)
            <span className="ml-2 text-xs text-[var(--foreground)]/60">(Prev: {units === 'imperial' ? `${lPer100kmToMpg(avgPrev30 ?? 0).toFixed(2)} MPG` : `${avgPrev30?.toFixed(2)} L/100km`})</span>
          </span>
        </div>
      )}
      {insight && (
        <div className="mb-4 text-[var(--foreground)]/80 text-sm flex items-center gap-2 w-full justify-center mx-auto">
          <span role="img" aria-label="tip">💡</span> {insight}
        </div>
      )}
    </main>
  );
}
