"use client";

import { useUnits } from "@/components/providers/UnitsProvider";

export function TemperatureToggle() {
  const { unit, setUnit } = useUnits();

  return (
    <div
      role="radiogroup"
      aria-label="Temperature unit"
      className="flex items-center gap-0.5 rounded-full border border-slate-200 dark:border-slate-700 p-0.5 text-xs font-medium"
    >
      {(["C", "F"] as const).map((u) => (
        <button
          key={u}
          role="radio"
          aria-checked={unit === u}
          onClick={() => setUnit(u)}
          className={`w-7 h-7 rounded-full transition-colors ${
            unit === u
              ? "bg-brand-600 text-white"
              : "text-muted hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          °{u}
        </button>
      ))}
    </div>
  );
}
