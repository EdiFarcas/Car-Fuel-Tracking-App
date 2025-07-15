"use client";
import { useState, useMemo } from 'react';
import CarCard from '@/components/CarCard';

const fuelTypes = ['ALL', 'GASOLINE', 'DIESEL', 'LPG', 'ELECTRIC'];
const sortOptions = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'year', label: 'Year (Newest)' },
];

export default function CarGrid({ cars }: { cars: any[] }) {
  const [fuel, setFuel] = useState('ALL');
  const [sort, setSort] = useState('recent');

  const filtered = useMemo(() => {
    let filtered = fuel === 'ALL' ? cars : cars.filter((c) => c.fuelType === fuel);
    if (sort === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'year') filtered = [...filtered].sort((a, b) => b.year - a.year);
    else filtered = [...filtered].sort((a, b) => b.id.localeCompare(a.id)); // fallback: recent
    return filtered;
  }, [cars, fuel, sort]);

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-4 items-center sm:flex-nowrap">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <label htmlFor="fuel-filter" className="font-medium text-sm">Fuel:</label>
          <select id="fuel-filter" value={fuel} onChange={e => setFuel(e.target.value)} className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
            {fuelTypes.map((type) => (
              <option key={type} value={type}>{type.charAt(0) + type.slice(1).toLowerCase()}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <label htmlFor="sort-cars" className="font-medium text-sm sm:ml-4">Sort by:</label>
          <select id="sort-cars" value={sort} onChange={e => setSort(e.target.value)} className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      {filtered.length ? (
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="list" aria-label="Your cars">
          {filtered.map((car) => (
            <li key={car.id} className="focus-within:ring-2 focus-within:ring-[var(--primary)]" tabIndex={-1}>
              <CarCard car={car} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-2 py-12 text-gray-400" role="status" aria-live="polite">
          <span className="text-5xl" aria-hidden="true">🚗</span>
          <div className="font-semibold">No cars match your filter.</div>
        </div>
      )}
    </div>
  );
}
