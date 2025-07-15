export default function FillUpCard({ fill }: { fill: any }) {
  // If car.fuelType is ELECTRIC, show kWh instead of L
  const isElectric = fill.car?.fuelType === 'ELECTRIC';
  return (
    <div className="border border-[var(--border)] rounded p-3 bg-[var(--background)] shadow-sm">
      <div className="font-semibold text-[var(--foreground)]">
        {fill.mileage} km - {fill.liters} {isElectric ? 'kWh' : 'L'}
        <span className="ml-2 text-xs text-[var(--primary)] font-bold">{fill.fuelType}</span>
      </div>
      <div className="text-sm text-[var(--foreground)]/60">
        {fill.cost} {fill.currency} — {new Date(fill.date).toLocaleString()}
      </div>
    </div>
  );
}
