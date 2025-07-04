'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const fuelTypes = ['GASOLINE', 'DIESEL', 'LPG'];

export default function AddCarPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    make: '',
    model: '',
    year: '',
    fuelType: 'GASOLINE',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/cars', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      const data = await res.json();
      setError(data.message || 'Failed to add car');
    }
  };

  return (
    <main className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Add New Car</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Car Name"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="make"
          value={form.make}
          onChange={handleChange}
          required
          placeholder="Make (e.g. BMW)"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="model"
          value={form.model}
          onChange={handleChange}
          required
          placeholder="Model (e.g. 320i)"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="year"
          type="number"
          value={form.year}
          onChange={handleChange}
          required
          placeholder="Year"
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="fuelType"
          value={form.fuelType}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          {fuelTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Save Car
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
}
