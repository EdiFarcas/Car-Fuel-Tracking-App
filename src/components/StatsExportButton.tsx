"use client";

import { Units } from './UnitsToggle';

export default function StatsExportButton({ fillUps, units, isElectric: isElectricProp }: { fillUps: { car?: { fuelType?: string; name?: string }; mileage: number; liters: number; cost: number; currency: string; date: string | Date }[]; units: Units; isElectric?: boolean }) {
  function kmToMiles(km: number) { return km * 0.621371; }
  function litersToGallons(l: number) { return l * 0.264172; }

  // Determine if electric from prop or fillUps
  const isElectric = isElectricProp ?? (fillUps[0]?.car?.fuelType === 'ELECTRIC');

  function handleExport() {
    if (!fillUps?.length) return;
    // Only export selected fields: car name, mileage, liters/gallons/kWh, cost, currency, date
    const headers = [
      "Car Name",
      isElectric ? "Mileage (km)" : (units === 'imperial' ? "Mileage (mi)" : "Mileage (km)"),
      isElectric ? "kWh" : (units === 'imperial' ? "Gallons" : "Liters"),
      "Cost",
      "Currency",
      "Date"
    ];
    const rows = fillUps.map(f => [
      f.car?.name || '',
      isElectric ? f.mileage : (units === 'imperial' ? kmToMiles(f.mileage).toFixed(1) : f.mileage),
      isElectric ? f.liters : (units === 'imperial' ? litersToGallons(f.liters).toFixed(2) : f.liters),
      f.cost,
      f.currency,
      f.date instanceof Date ? f.date.toISOString() : f.date
    ]);
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `car-stats-${isElectric ? 'electric' : units}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <button
      className="px-4 py-2 rounded-lg border border-[var(--primary)] font-semibold shadow-sm transition bg-[var(--muted)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] mb-4 ml-2"
      onClick={handleExport}
      type="button"
      aria-label="Export stats as CSV"
    >
      Export CSV
    </button>
  );
}
