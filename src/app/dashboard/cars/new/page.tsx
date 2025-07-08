'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const fuelTypes = ['GASOLINE', 'DIESEL', 'LPG', 'ELECTRIC'];

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
      let data = { message: 'Failed to add car' };
      try {
        data = await res.json();
      } catch {
        // If response is empty or not JSON, keep default error
      }
      setError(data.message || 'Failed to add car');
    }
  };

  return (
    <main className="max-w-lg mx-auto mt-12 p-8 bg-[var(--muted)] border border-[var(--border)] rounded-2xl shadow-xl space-y-8 flex flex-col items-center">
      <div className="flex flex-col items-center gap-2">
        <span className="text-4xl text-[var(--primary)]">🚗</span>
        <h1 className="text-3xl font-extrabold text-[var(--primary)] tracking-tight">Add New Car</h1>
        <p className="text-[var(--foreground)]/70 text-center text-base">Fill in your car details to start tracking fuel and mileage.</p>
      </div>
      <form onSubmit={handleSubmit} className="w-full space-y-5">
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold text-[var(--foreground)]">Car Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="e.g. My BMW"
            className="w-full border border-[var(--border)] px-4 py-3 rounded-lg bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--foreground)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
        </div>
        <div>
          <label htmlFor="make" className="block mb-1 font-semibold text-[var(--foreground)]">Make</label>
          <input
            id="make"
            name="make"
            value={form.make}
            onChange={handleChange}
            required
            placeholder="e.g. BMW"
            className="w-full border border-[var(--border)] px-4 py-3 rounded-lg bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--foreground)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
        </div>
        <div>
          <label htmlFor="model" className="block mb-1 font-semibold text-[var(--foreground)]">Model</label>
          <input
            id="model"
            name="model"
            value={form.model}
            onChange={handleChange}
            required
            placeholder="e.g. 320i"
            className="w-full border border-[var(--border)] px-4 py-3 rounded-lg bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--foreground)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
        </div>
        <div>
          <label htmlFor="year" className="block mb-1 font-semibold text-[var(--foreground)]">Year</label>
          <input
            id="year"
            name="year"
            value={form.year}
            onChange={handleChange}
            required
            placeholder="e.g. 2020"
            className="w-full border border-[var(--border)] px-4 py-3 rounded-lg bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--foreground)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
        </div>
        <div>
          <label htmlFor="fuelType" className="block mb-1 font-semibold text-[var(--foreground)]">Fuel Type</label>
          <select
            id="fuelType"
            name="fuelType"
            value={form.fuelType}
            onChange={handleChange}
            className="w-full border border-[var(--border)] px-4 py-3 rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          >
            {fuelTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-[var(--primary)] text-white py-3 rounded-lg font-bold shadow-lg hover:bg-[var(--primary)]/80 hover:scale-[1.03] hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        >
          Save Car
        </button>
        {error && <p className="text-red-500 text-center font-semibold">{error}</p>}
      </form>
    </main>
  );
}
