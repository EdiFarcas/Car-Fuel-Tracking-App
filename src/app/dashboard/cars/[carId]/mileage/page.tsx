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
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Mileage Log</h1>

      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <input
          type="number"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          placeholder="Odometer (e.g. 102300)"
          className="flex-1 border px-3 py-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          ➕ Add
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2">
        {entries.map((entry) => (
          <li key={entry.id} className="border rounded p-3">
            <p className="font-medium">{entry.mileage} km</p>
            <p className="text-sm text-gray-500">{new Date(entry.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
