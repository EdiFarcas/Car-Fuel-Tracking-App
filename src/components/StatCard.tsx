export default function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
