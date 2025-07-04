import { FillUp } from '@prisma/client';

export default function FillUpCard({ fill }: { fill: FillUp }) {
  return (
    <div className="border rounded p-3 bg-white shadow-sm">
      <div className="font-semibold text-black">{fill.mileage} km - {fill.liters} L</div>
      <div className="text-sm text-gray-500">
        {fill.cost} {fill.currency} — {new Date(fill.date).toLocaleString()}
      </div>
    </div>
  );
}
