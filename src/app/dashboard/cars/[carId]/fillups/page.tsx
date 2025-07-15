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
  fuelType: string; // Add fuelType to FillUp interface
}

const currencies = ['EUR', 'USD', 'RON', 'GBP'];

export default function FillUpsPage() {
  const { carId } = useParams();
  const [fillups, setFillups] = useState<FillUp[]>([]);
  // Toggle for showing/hiding fill-ups
  const [showFillUps, setShowFillUps] = useState(false);
  // Filter and sort state
  const [filterFuelType, setFilterFuelType] = useState('');
  const [sortOrder, setSortOrder] = useState('date-desc');
  // Filter and sort logic for fill-ups
  const filteredFillUps = fillups
    .filter(f => !filterFuelType || f.fuelType === filterFuelType)
    .sort((a, b) => {
      if (sortOrder === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortOrder === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortOrder === 'mileage-desc') return b.mileage - a.mileage;
      if (sortOrder === 'mileage-asc') return a.mileage - b.mileage;
      return 0;
    });
  const [carFuelTypes, setCarFuelTypes] = useState<string[]>([]);
  const [form, setForm] = useState({
    mileage: '',
    liters: '',
    cost: '',
    currency: 'EUR',
    fuelType: '',
    date: '',
  });
  const [error, setError] = useState('');

  // Fetch fill-up entries
  useEffect(() => {
    fetch(`/api/fillups?carId=${carId}`)
      .then((res) => res.json())
      .then(setFillups);
  }, [carId]);

  // Fetch car fuel types
  useEffect(() => {
    fetch(`/api/cars/${carId}`)
      .then((res) => res.json())
      .then((car) => setCarFuelTypes(car?.fuelTypes || []));
  }, [carId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/fillups', {
      method: 'POST',
      body: JSON.stringify({ ...form, carId, fuelType: form.fuelType || carFuelTypes[0] }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const newFill = await res.json();
      setFillups((prev) => [newFill, ...prev]);
      setForm({ mileage: '', liters: '', cost: '', currency: 'EUR', fuelType: carFuelTypes[0] || '', date: '' });
      setError('');
    } else {
      const data = await res.json();
      setError(data.message || 'Error adding fill-up');
    }
  };

  // Only render fill-ups when carFuelTypes is loaded
  if (!carFuelTypes.length) {
    return (
      <main className="max-w-2xl mx-auto p-8 space-y-8 bg-[var(--muted)] rounded-xl shadow">
        <h1 className="text-2xl font-bold text-[var(--primary)]">Fuel Fill-Ups</h1>
        <div className="text-center text-[var(--foreground)]/60 py-12">Loading car details...</div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-8 space-y-8 bg-[var(--muted)] rounded-xl shadow mb-8">
      <h1 className="text-2xl font-bold text-[var(--primary)] text-center">Fuel Fill-Ups</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-lg border border-[var(--border)]">
        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="font-medium text-[var(--primary)]">Date & Time</label>
          <input
            id="date"
            name="date"
            type="datetime-local"
            value={form.date}
            onChange={handleChange}
            required
            className="border border-[var(--border)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--muted)] text-[var(--foreground)]"
          />
          <span className="text-xs text-gray-500">Select the date and hour of the fill-up</span>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="mileage" className="font-medium text-[var(--primary)]">Odometer</label>
          <input
            id="mileage"
            name="mileage"
            type="number"
            placeholder="e.g. 102300"
            value={form.mileage}
            onChange={handleChange}
            required
            className="border border-[var(--border)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--muted)] text-[var(--foreground)]"
          />
          <span className="text-xs text-gray-500">Enter the odometer reading at fill-up</span>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="liters" className="font-medium text-[var(--primary)]">
            {(() => {
              const fuel = carFuelTypes.length > 1 ? (form.fuelType || carFuelTypes[0]) : carFuelTypes[0];
              if (fuel === 'ELECTRIC') return 'Kilowatt-hours';
              if (fuel === 'LPG') return 'Liters (LPG)';
              if (fuel === 'GASOLINE') return 'Liters (Gasoline)';
              if (fuel === 'DIESEL') return 'Liters (Diesel)';
              return 'Liters';
            })()}
          </label>
          <input
            id="liters"
            name="liters"
            type="number"
            step="0.01"
            placeholder={(() => {
              const fuel = carFuelTypes.length > 1 ? (form.fuelType || carFuelTypes[0]) : carFuelTypes[0];
              if (fuel === 'ELECTRIC') return 'e.g. 45.5';
              return 'e.g. 45.5';
            })()}
            value={form.liters}
            onChange={handleChange}
            required
            className="border border-[var(--border)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--muted)] text-[var(--foreground)]"
          />
          <span className="text-xs text-gray-500">
            {(() => {
              const fuel = carFuelTypes.length > 1 ? (form.fuelType || carFuelTypes[0]) : carFuelTypes[0];
              if (fuel === 'ELECTRIC') return 'How many kilowatt-hours did you charge?';
              if (fuel === 'LPG') return 'How many liters of LPG did you fill?';
              if (fuel === 'GASOLINE') return 'How many liters of gasoline did you fill?';
              if (fuel === 'DIESEL') return 'How many liters of diesel did you fill?';
              return 'How many liters did you fill?';
            })()}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cost" className="font-medium text-[var(--primary)]">Total Cost</label>
          <input
            id="cost"
            name="cost"
            type="number"
            step="0.01"
            placeholder="e.g. 300.00"
            value={form.cost}
            onChange={handleChange}
            required
            className="border border-[var(--border)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--muted)] text-[var(--foreground)]"
          />
          <span className="text-xs text-gray-500">Total price paid for this fill-up</span>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="currency" className="font-medium text-[var(--primary)]">Currency</label>
          <select
            id="currency"
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="border border-[var(--border)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--muted)] text-[var(--foreground)]"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        {carFuelTypes.length > 1 && (
          <div className="flex flex-col gap-1 col-span-full">
            <label className="font-medium text-[var(--primary)]">Fuel Type</label>
            <select
              name="fuelType"
              value={form.fuelType || carFuelTypes[0]}
              onChange={handleChange}
              required
              className="border border-[var(--border)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--muted)] text-[var(--foreground)]"
            >
              {carFuelTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        )}
        {carFuelTypes.length === 1 && (
          <input type="hidden" name="fuelType" value={carFuelTypes[0]} />
        )}
        <button type="submit" className="col-span-full bg-[var(--secondary)] text-white py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition mt-2">
          ➕ Add Fill-Up
        </button>
        {error && <p className="col-span-full text-red-500 text-center mt-2">{error}</p>}
      </form>

      {/* Toggle and Filters for Fill-Ups */}
      {!showFillUps && (
        <div className="flex justify-center mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg font-semibold shadow border border-[var(--border)] transition-all bg-[var(--muted)] text-[var(--primary)]`}
            onClick={() => setShowFillUps(true)}
          >
            Show Fill-Ups
          </button>
        </div>
      )}
      {showFillUps && (
        <div className="flex flex-col items-center gap-4 mb-4">
          <button
            type="button"
            className="px-4 py-2 rounded-lg font-semibold shadow border border-[var(--border)] transition-all w-full max-w-xs bg-[var(--primary)] text-white mb-2"
            onClick={() => setShowFillUps(false)}
          >
            Hide Fill-Ups
          </button>
          <div className="flex flex-wrap gap-2 items-center justify-center w-full sm:flex-nowrap">
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <label className="text-sm font-medium text-[var(--primary)]">Filter by Fuel Type:</label>
              <select
                value={filterFuelType}
                onChange={e => setFilterFuelType(e.target.value)}
                className="border border-[var(--border)] px-2 py-1 rounded-lg bg-[var(--background)] text-[var(--foreground)] font-semibold"
              >
                <option value="">All</option>
                {carFuelTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <label className="text-sm font-medium text-[var(--primary)] sm:ml-2">Sort by:</label>
              <select
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
                className="border border-[var(--border)] px-2 py-1 rounded-lg bg-[var(--background)] text-[var(--foreground)] font-semibold"
              >
                <option value="date-desc">Newest</option>
                <option value="date-asc">Oldest</option>
                <option value="mileage-desc">Highest Mileage</option>
                <option value="mileage-asc">Lowest Mileage</option>
              </select>
            </div>
          </div>
        </div>
      )}
      {showFillUps && (
        <div className="mb-8">
          <ul
            className="space-y-3 overflow-y-auto pr-2"
            style={{ maxHeight: `${3 * 6.5}rem`, minHeight: filteredFillUps.length > 0 ? '6.5rem' : undefined }}
          >
            {filteredFillUps.map((fill) => (
              <FillUpCard key={fill.id} fill={{ ...fill, car: { fuelType: fill.fuelType } }} />
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
