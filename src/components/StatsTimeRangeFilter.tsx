"use client";
import { useState } from "react";

const ranges = [
	{ label: "7d", value: 7, aria: "Show stats for last 7 days" },
	{ label: "30d", value: 30, aria: "Show stats for last 30 days" },
	{ label: "Year", value: 365, aria: "Show stats for last year" },
	{ label: "All", value: null, aria: "Show stats for all time" },
];

export default function StatsTimeRangeFilter({
	value,
	onChange,
}: {
	value: number | null;
	onChange: (v: number | null) => void;
}) {
	return (
		<div
			className="flex flex-row items-center gap-2 w-auto mb-0"
			role="group"
			aria-label="Select time range for stats"
		>
			<span className="text-xs font-semibold text-[var(--foreground)]/70 mr-2 mb-0">
				Sort by:
			</span>
			<div className="flex flex-row gap-2 w-auto mb-0">
				{ranges.map((r) => (
					<button
						key={r.label}
						className={`w-full sm:w-auto px-4 py-1 rounded-full border font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm
						${value === r.value
							? "bg-[var(--primary)] text-white border-[var(--primary)] scale-105 shadow-lg"
							: "bg-[var(--muted)] text-[var(--primary)] border-[var(--border)] hover:bg-[var(--primary)] hover:text-white hover:scale-105"}
						`}
						onClick={() => onChange(r.value)}
						type="button"
						aria-label={r.aria}
						aria-pressed={value === r.value}
					>
						{r.label}
					</button>
				))}
			</div>
		</div>
	);
}
