"use client";
import { useEffect, useState } from "react";

interface LiveStats {
  avgFuelPrice: number;
  avgEfficiency: number;
  totalCO2Saved: number;
}

export default function LiveStatsPreview() {
  const [stats, setStats] = useState<LiveStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/live-stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  return (
    <section className="w-full max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-center text-[var(--primary)] mb-6">Live Community Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[var(--muted)] rounded-xl shadow p-6 flex flex-col items-center gap-2 border border-[var(--border)] animate-fade-in">
          <span className="text-3xl">⛽</span>
          <span className="font-semibold text-lg">Avg. Fuel Price</span>
          <span className="text-2xl font-bold text-[var(--primary)]">{loading ? "..." : `${stats?.avgFuelPrice.toFixed(2)} RON/L`}</span>
        </div>
        <div className="bg-[var(--muted)] rounded-xl shadow p-6 flex flex-col items-center gap-2 border border-[var(--border)] animate-fade-in">
          <span className="text-3xl">📉</span>
          <span className="font-semibold text-lg">Avg. Efficiency</span>
          <span className="text-2xl font-bold text-[var(--primary)]">{loading ? "..." : `${stats?.avgEfficiency.toFixed(1)} L/100km`}</span>
        </div>
        <div className="bg-[var(--muted)] rounded-xl shadow p-6 flex flex-col items-center gap-2 border border-[var(--border)] animate-fade-in">
          <span className="text-3xl">🌱</span>
          <span className="font-semibold text-lg text-center w-full">CO₂ Saved by Hybrids/EVs</span>
          <span className="text-2xl font-bold text-green-700">{loading ? "..." : `${stats?.totalCO2Saved.toLocaleString()} kg`}</span>
        </div>
      </div>
    </section>
  );
}
