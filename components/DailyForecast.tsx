"use client";

import Image from "next/image";
import type { DailyForecastItem } from "@/types/weather";
import { useUnits } from "@/components/providers/UnitsProvider";
import { formatTemp, formatDayLabel } from "@/lib/utils/format";

export function DailyForecast({ days }: { days: DailyForecastItem[] }) {
  const { unit } = useUnits();

  if (days.length === 0) return null;

  return (
    <section aria-label="Daily forecast" className="surface rounded-xl2 shadow-card p-6">
      <h2 className="font-semibold mb-4">
        {days.length}-Day Forecast
      </h2>
      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {days.map((d, i) => (
          <li key={d.date} className="flex items-center justify-between gap-4 py-3">
            <span className="w-20 font-medium text-sm">{formatDayLabel(d.date, i)}</span>
            <Image src={d.conditionIcon} alt={d.condition} width={32} height={32} unoptimized />
            <span className="flex-1 text-sm text-muted truncate hidden sm:block">
              {d.condition}
            </span>
            <span className="text-xs text-muted w-16 text-right">{d.chanceOfRainPct}% rain</span>
            <span className="text-sm font-semibold w-20 text-right">
              {formatTemp(d.maxTempC, d.maxTempF, unit)} / {formatTemp(d.minTempC, d.minTempF, unit)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
