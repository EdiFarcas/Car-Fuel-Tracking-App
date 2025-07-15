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
      className="rounded-xl p-3 shadow-sm flex flex-row items-center gap-4 w-full h-full min-w-0 min-h-0"
      style={{ background: cardBg, border: `1.5px solid ${cardBorder}` }}
    >
      {icon && <span className={`text-2xl ${color ? `text-[var(--${color})]` : ''}`}>{icon}</span>}
      <div className="flex flex-row items-center w-full min-w-0 gap-2">
        <span className="text-sm text-[var(--foreground)]/60 flex items-center gap-1 text-left overflow-hidden text-ellipsis whitespace-nowrap max-w-[40%]">
          {label}
          {info && (
            <InfoTooltip label={`Info: ${label}`} description={info} />
          )}
        </span>
        <span className={`text-2xl font-semibold ${valueClass} text-left break-words flex-1 min-w-0`}>{value}</span>
      </div>
    </div>
  );
}
