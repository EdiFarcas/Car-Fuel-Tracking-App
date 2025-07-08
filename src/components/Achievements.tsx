import React from "react";

export type Achievement = {
  id: string;
  label: string;
  description: string;
  icon: string;
  achieved: boolean;
};

export default function Achievements({ achievements }: { achievements: Achievement[] }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 w-full max-w-3xl mx-auto"
      aria-label="Achievements"
    >
      {achievements.map(a => (
        <div
          key={a.id}
          className={`flex flex-col items-center p-2 rounded-lg shadow border transition-all duration-200 w-full min-w-0 min-h-20 ${a.achieved ? 'bg-[var(--background)] border-[var(--primary)]' : 'bg-[var(--muted)] border-[var(--border)] opacity-60'}`}
          aria-label={a.achieved ? `${a.label} unlocked` : `${a.label} locked`}
        >
          <span className={`text-xl mb-0.5 ${a.achieved ? 'text-[var(--primary)]' : 'text-[var(--foreground)]/40'}`}>{a.icon}</span>
          <span className="font-bold text-xs text-center mb-0.5 break-words leading-tight">{a.label}</span>
          <span className="text-[10px] text-center text-[var(--foreground)]/70 break-words leading-tight">{a.description}</span>
        </div>
      ))}
    </div>
  );
}
