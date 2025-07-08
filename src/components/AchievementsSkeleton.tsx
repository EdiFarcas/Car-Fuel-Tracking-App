export default function AchievementsSkeleton() {
  return (
    <div className="flex flex-wrap gap-3 mb-6 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-col items-center p-2 rounded-lg shadow border w-32 h-20 bg-[var(--muted)] border-[var(--border)] opacity-60">
          <div className="w-8 h-8 rounded-full bg-[var(--border)] mb-1" />
          <div className="h-3 w-3/4 bg-[var(--border)] rounded mb-0.5" />
          <div className="h-2 w-2/3 bg-[var(--border)] rounded" />
        </div>
      ))}
    </div>
  );
}
