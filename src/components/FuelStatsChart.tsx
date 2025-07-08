"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import InfoTooltip from "./InfoTooltip";
import { Units } from './UnitsToggle';

interface FillUp {
  date: string;
  mileage: number;
  liters: number;
  cost: number;
  currency: string;
}

function kmToMiles(km: number) { return km * 0.621371; }
function litersToGallons(l: number) { return l * 0.264172; }
function lPer100kmToMpg(l100: number) { return l100 > 0 ? 235.215 / l100 : 0; }

export default function FuelStatsChart({ fillUps, units = 'metric' }: { fillUps: (FillUp & { car?: { fuelType?: string } })[]; units?: Units }) {
  if (!fillUps || fillUps.length < 2) return null;

  // Get fuel type from first fill-up
  const fuelType = fillUps[0]?.car?.fuelType;
  const isElectric = fuelType === 'ELECTRIC';
  // Always use metric for electric cars
  const displayUnits = isElectric ? 'metric' : units;

  // Prepare data: skip first fill (no consumption calc)
  const chartData = fillUps.slice(1).map((f, i) => {
    const prev = fillUps[i];
    const distance = displayUnits === 'imperial' ? kmToMiles(f.mileage - prev.mileage) : f.mileage - prev.mileage;
    const liters = displayUnits === 'imperial' ? litersToGallons(f.liters) : f.liters;
    const consumption = isElectric
      ? (liters / distance) * 100
      : (displayUnits === 'imperial'
        ? lPer100kmToMpg((f.liters / (f.mileage - prev.mileage)) * 100)
        : (liters / distance) * 100);
    return {
      date: new Date(f.date).toLocaleDateString(),
      consumption: Number.isFinite(consumption) ? Number(consumption.toFixed(2)) : 0,
      cost: f.cost,
      mileage: displayUnits === 'imperial' ? kmToMiles(f.mileage) : f.mileage,
    };
  });

  // Chart title with info icon
  const chartTitle = (
    <span className="flex items-center gap-1">
      Fuel Consumption Over Time
      <InfoTooltip
        label="Chart info"
        description={`This chart shows your car's fuel consumption trend over time, calculated from your fill-up records. Units: ${isElectric ? 'kWh/100km (lower is better)' : (displayUnits === 'imperial' ? 'MPG (higher is better)' : 'L/100km (lower is better)')}.`}
      />
    </span>
  );

  return (
    <div className="w-full h-72 bg-[var(--muted)] rounded-xl p-4 shadow border border-[var(--border)] flex flex-col">
      <h2 className="text-lg font-bold mb-2 text-[var(--primary)] flex items-center justify-center">{chartTitle}</h2>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: 30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="date" stroke="var(--foreground)" fontSize={12} />
            <YAxis
              stroke="var(--foreground)"
              fontSize={12}
              domain={[0, 'auto']}
              tickFormatter={v => v}
              label={{ value: isElectric ? 'kWh/100km' : (displayUnits === 'imperial' ? 'MPG' : 'L/100km'), angle: -90, position: 'insideLeft', offset: 10 }}
            />
            <RechartsTooltip contentStyle={{ background: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--border)' }} />
            <Line type="monotone" dataKey="consumption" stroke="#2563eb" strokeWidth={2} dot={{ r: 4, fill: '#2563eb' }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Y-axis info icon for screen readers, visually above chart */}
      <div className="sr-only" aria-live="polite">Fuel consumption is measured in {isElectric ? 'kilowatt-hours per 100 kilometers (kWh/100km)' : (displayUnits === 'imperial' ? 'miles per gallon (MPG)' : 'liters per 100 kilometers (L/100km)')}.</div>
    </div>
  );
}
