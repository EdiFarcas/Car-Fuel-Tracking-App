'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface MileageEntry {
  id: string;
  mileage: number;
  date: string;
}

export default function MileagePage() {
  const { carId } = useParams();
  const router = useRouter();

  const [entries, setEntries] = useState<MileageEntry[]>([]);
  const [mileage, setMileage] = useState('');
  const [error, setError] = useState('');

  // Fetch existing entries
  useEffect(() => {
    fetch(`/api/mileage?carId=${carId}`)
      .then((res) => res.json())
      .then((data) => setEntries(data));
  }, [carId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/mileage', {
      method: 'POST',
      body: JSON.stringify({ carId, mileage }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const newEntry = await res.json();
      setEntries((prev) => [newEntry, ...prev]);
      setMileage('');
    } else {
      const data = await res.json();
      setError(data.message || 'Error adding mileage');
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6 bg-[var(--muted)] rounded-xl shadow">
      <h1 className="text-2xl font-bold text-[var(--primary)] flex items-center gap-2">
        <span role="img" aria-label="mileage">🛣️</span> Mileage Log
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 bg-white p-6 rounded-lg border border-[var(--border)] shadow">
        <div className="flex-1 flex flex-col gap-1 w-full">
          <label htmlFor="mileage" className="font-medium text-[var(--primary)]">Odometer</label>
          <input
            id="mileage"
            type="number"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            placeholder="e.g. 102300"
            className="w-full border border-[var(--border)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--muted)] text-[var(--foreground)] placeholder:text-gray-500 dark:placeholder:text-gray-400"
            required
          />
          <span className="text-xs text-[var(--primary)] font-semibold">Enter the current odometer reading</span>
        </div>
        <button type="submit" className="w-full sm:w-auto bg-[var(--secondary)] text-white py-2 px-6 rounded-lg font-semibold shadow hover:bg-green-700 transition mt-2 sm:mt-6">
          ➕ Add
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <ul className="space-y-2">
        {entries.map((entry) => (
          <li key={entry.id} className="border rounded p-3 bg-white shadow-sm flex items-center gap-4">
            <span className="text-[var(--primary)] text-xl">⛽</span>
            <div>
              <p className="font-medium text-gray-800">{entry.mileage} km</p>
              <p className="text-sm text-gray-600">{new Date(entry.date).toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
