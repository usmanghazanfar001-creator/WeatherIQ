"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

const OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

export function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="flex items-center gap-0.5 rounded-full border border-slate-200 dark:border-slate-700 p-0.5 text-xs"
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          role="radio"
          aria-checked={mode === opt.value}
          onClick={() => setMode(opt.value)}
          className={`px-2.5 py-1 rounded-full transition-colors ${
            mode === opt.value
              ? "bg-brand-600 text-white"
              : "text-muted hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
