'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import FillUpCard from '@/components/FillUpCard';

interface FillUp {
  id: string;
  mileage: number;
  liters: number;
  cost: number;
  currency: string;
  date: string;
}

const currencies = ['EUR', 'USD', 'RON', 'GBP'];

export default function FillUpsPage() {
  const { carId } = useParams();
  const [fillups, setFillups] = useState<FillUp[]>([]);
  const [form, setForm] = useState({
    mileage: '',
    liters: '',
    cost: '',
    currency: 'EUR',
  });
  const [error, setError] = useState('');

  // Fetch fill-up entries
  useEffect(() => {
    fetch(`/api/fillups?carId=${carId}`)
      .then((res) => res.json())
      .then(setFillups);
  }, [carId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/fillups', {
      method: 'POST',
      body: JSON.stringify({ ...form, carId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const newFill = await res.json();
      setFillups((prev) => [newFill, ...prev]);
      setForm({ mileage: '', liters: '', cost: '', currency: 'EUR' });
      setError('');
    } else {
      const data = await res.json();
      setError(data.message || 'Error adding fill-up');
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Fuel Fill-Ups</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="mileage"
          type="number"
          placeholder="Odometer"
          value={form.mileage}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="liters"
          type="number"
          step="0.01"
          placeholder="Liters"
          value={form.liters}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="cost"
          type="number"
          step="0.01"
          placeholder="Total Cost"
          value={form.cost}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="currency"
          value={form.currency}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          {currencies.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          ➕ Add Fill-Up
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>

      <ul className="space-y-2">
        {fillups.map((fill) => (
          <FillUpCard key={fill.id} fill={fill} /> // ✅
        ))}
      </ul>
    </main>
  );
}
