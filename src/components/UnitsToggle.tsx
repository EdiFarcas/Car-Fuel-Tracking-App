import React from "react";

export type Units = "metric" | "imperial";

export default function UnitsToggle({ units, setUnits, disabled = false }: { units: Units; setUnits: (u: Units) => void; disabled?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 w-full max-w-xs">
      <span className="text-xs font-semibold text-[var(--foreground)]/70 mb-1 sm:mb-0 sm:mr-2">Metrics:</span>
      <div className="flex flex-col sm:flex-row gap-2 w-full items-center">
        <button
          type="button"
          className={`w-full sm:w-auto px-3 py-1 rounded-md text-sm font-semibold border shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]
          ${units === "metric"
            ? "bg-[var(--primary)] text-white border-[var(--primary)] scale-105 shadow-lg"
            : "bg-[var(--muted)] text-[var(--primary)] border-[var(--border)] hover:bg-[var(--primary)] hover:text-white hover:scale-105"}
          `}
          aria-checked={units === "metric"}
          role="radio"
          tabIndex={0}
          onClick={() => !disabled && setUnits("metric")}
          disabled={disabled}
        >
          Metric (L/100km)
        </button>
        <button
          type="button"
          className={`w-full sm:w-auto px-3 py-1 rounded-md text-sm font-semibold border shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]
          ${units === "imperial"
            ? "bg-[var(--primary)] text-white border-[var(--primary)] scale-105 shadow-lg"
            : "bg-[var(--muted)] text-[var(--primary)] border-[var(--border)] hover:bg-[var(--primary)] hover:text-white hover:scale-105"}
          `}
          aria-checked={units === "imperial"}
          role="radio"
          tabIndex={0}
          onClick={() => !disabled && setUnits("imperial")}
          disabled={disabled}
        >
          Imperial (MPG)
        </button>
      </div>
    </div>
  );
}
