export default function StatsSkeleton() {
  return (
    <div className="bg-[var(--background)] border border-[var(--border)] rounded-3xl shadow-2xl p-10 mb-6 w-full mx-auto m-4 mb-8 mx-4 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--muted)]">
            <div className="w-10 h-10 rounded-full bg-[var(--border)]" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/2 bg-[var(--border)] rounded" />
              <div className="h-6 w-2/3 bg-[var(--border)] rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
