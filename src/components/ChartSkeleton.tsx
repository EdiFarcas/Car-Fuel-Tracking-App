export default function ChartSkeleton() {
  return (
    <div className="w-full h-72 bg-[var(--muted)] rounded-xl p-4 shadow border border-[var(--border)] flex items-center justify-center animate-pulse mb-6">
      <div className="w-3/4 h-2/3 bg-[var(--border)] rounded" />
    </div>
  );
}
