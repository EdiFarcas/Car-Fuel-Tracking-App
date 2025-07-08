import { useState, useRef, useEffect } from 'react';

interface InfoTooltipProps {
  label: string;
  description: string;
}

export default function InfoTooltip({ label, description }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const iconRef = useRef<HTMLButtonElement>(null);
  const tooltipId = `tooltip-${label.replace(/\s+/g, '-')}`;

  // Close tooltip on Escape key
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <span className="relative inline-block align-middle">
      <button
        ref={iconRef}
        type="button"
        aria-label={label}
        aria-describedby={open ? tooltipId : undefined}
        tabIndex={0}
        className="ml-1 text-[var(--primary)] hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-full"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" fill="none"/><text x="10" y="15" textAnchor="middle" fontSize="12" fill="currentColor" fontFamily="Arial" fontWeight="bold">i</text></svg>
      </button>
      {open && (
        <div
          id={tooltipId}
          role="tooltip"
          className="absolute z-50 left-1/2 -translate-x-1/2 mt-2 w-56 bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] rounded-lg shadow-lg p-3 text-sm"
        >
          {description}
        </div>
      )}
    </span>
  );
}
