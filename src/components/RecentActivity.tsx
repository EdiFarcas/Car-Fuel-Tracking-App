"use client";
import { useEffect, useState } from 'react';

interface ActivityItem {
  type: 'fillup' | 'mileage';
  id: string;
  car: { name: string; make: string; model: string };
  mileage: number;
  liters?: number;
  cost?: number;
  currency?: string;
  date: string;
  fuelType?: string; // Add fuelType for fill-ups
}

export default function RecentActivity() {
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/activity')
      .then((res) => res.json())
      .then((data) => {
        setActivity(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-[var(--foreground)]/40 flex flex-col items-center gap-2 py-8" role="status" aria-live="polite"><span className="text-4xl" aria-hidden="true">⏳</span>Loading activity...</div>;
  if (!activity.length) return (
    <div className="flex flex-col items-center gap-2 py-8 text-[var(--foreground)]/40" role="status" aria-live="polite">
      <span className="text-4xl" aria-hidden="true">📋</span>
      <div className="font-semibold">No recent activity yet.</div>
      <div className="text-sm">Start by logging a fill-up or mileage entry!</div>
    </div>
  );

  return (
    <ul className="space-y-3" role="list" aria-label="Recent activity">
      {activity.map((item) => (
        <li key={item.type + item.id} className="flex items-center gap-3 bg-[var(--muted)] rounded-lg p-4 border border-[var(--border)] shadow-sm focus-within:ring-2 focus-within:ring-[var(--primary)]" tabIndex={0} aria-label={`${item.type === 'fillup' ? 'Fill-Up' : 'Mileage'} for ${item.car.name}`}> 
          <span className={`text-2xl ${item.type === 'fillup' ? 'text-[var(--secondary)]' : 'text-[var(--primary)]'}`} aria-hidden="true">{item.type === 'fillup' ? '⛽' : '🛣️'}</span>
          <div className="flex-1">
            <div className="font-semibold text-[var(--foreground)]">
              {item.type === 'fillup' ? 'Fill-Up' : 'Mileage'} for <span className="text-[var(--primary)]">{item.car.name}</span>
            </div>
            <div className="text-sm text-[var(--foreground)]/60">
              {item.type === 'fillup'
                ? `${item.liters} ${item.fuelType === 'ELECTRIC' ? 'kWh' : item.fuelType === 'LPG' ? 'L (LPG)' : item.fuelType === 'GASOLINE' ? 'L (Gasoline)' : item.fuelType === 'DIESEL' ? 'L (Diesel)' : 'L'}, ${item.mileage} km${item.cost ? `, ${item.cost} ${item.currency}` : ''}`
                : `${item.mileage} km`}
              {' '}on {new Date(item.date).toLocaleDateString()}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
