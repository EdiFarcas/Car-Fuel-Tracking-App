import { useState } from "react";
import InfoTooltip from "./InfoTooltip";

export default function StatCard({ label, value, icon, color, info }: { label: string; value: string; icon?: string; color?: 'primary' | 'secondary' | 'accent'; info?: string }) {
  const valueClass =
    label === 'Total Fuel Cost'
      ? 'text-[var(--foreground)]'
      : color
      ? `text-[var(--${color})]`
      : 'text-[var(--foreground)]';

  // Determine card color scheme
  let cardBg = 'var(--statcard-default-bg)';
  let cardBorder = 'var(--statcard-default-border)';
  if (color === 'primary') {
    cardBg = 'var(--statcard-primary-bg)';
    cardBorder = 'var(--statcard-primary-border)';
  } else if (color === 'secondary') {
    cardBg = 'var(--statcard-secondary-bg)';
    cardBorder = 'var(--statcard-secondary-border)';
  } else if (color === 'accent') {
    cardBg = 'var(--statcard-accent-bg)';
    cardBorder = 'var(--statcard-accent-border)';
  }

  return (
    <div
      className="rounded-xl p-4 shadow-sm flex flex-col justify-center w-full"
      style={{ background: cardBg, border: `1.5px solid ${cardBorder}` }}
    >
      <div className="flex flex-row items-center justify-center w-full gap-4">
        {icon && <span className={`text-2xl ${color ? `text-[var(--${color})]` : ''}`}>{icon}</span>}
        <div className="flex flex-col items-center w-full">
          <p className="text-sm text-[var(--foreground)]/60 flex items-center gap-1 text-center w-full justify-center">
            {label}
            {info && (
              <InfoTooltip label={`Info: ${label}`} description={info} />
            )}
          </p>
          <p className={`text-2xl font-semibold ${valueClass} text-center w-full`}>{value}</p>
        </div>
      </div>
    </div>
  );
}
