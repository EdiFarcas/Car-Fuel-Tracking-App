export default function StatCard({ label, value, icon, color }: { label: string; value: string; icon?: string; color?: 'primary' | 'secondary' | 'accent' }) {
  const valueClass =
    label === 'Total Fuel Cost'
      ? 'text-gray-900'
      : color
      ? `text-[var(--${color})]`
      : 'text-[var(--foreground)]';
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white flex items-center gap-4">
      {icon && <span className={`text-2xl ${color ? `text-[var(--${color})]` : ''}`}>{icon}</span>}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`text-2xl font-semibold ${valueClass}`}>{value}</p>
      </div>
    </div>
  );
}
