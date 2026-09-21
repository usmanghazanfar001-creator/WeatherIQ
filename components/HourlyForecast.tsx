"use client";

import Image from "next/image";
import type { HourlyForecastItem } from "@/types/weather";
import { useUnits } from "@/components/providers/UnitsProvider";
import { formatTemp } from "@/lib/utils/format";

export function HourlyForecast({ hours }: { hours: HourlyForecastItem[] }) {
  const { unit } = useUnits();

  if (hours.length === 0) return null;

  return (
    <section aria-label="Hourly forecast" className="surface rounded-xl2 shadow-card p-6">
      <h2 className="font-semibold mb-4">Hourly Forecast</h2>
      <div className="flex gap-3 overflow-x-auto scrollbar-thin pb-2">
        {hours.map((h) => (
          <div
            key={h.time}
            className="flex-shrink-0 w-24 rounded-xl border border-slate-100 dark:border-slate-800 p-3 text-center"
          >
            <p className="text-xs text-muted">
              {new Date(h.time.replace(" ", "T")).toLocaleTimeString(undefined, {
                hour: "numeric",
              })}
            </p>
            <Image
              src={h.conditionIcon}
              alt={h.condition}
              width={40}
              height={40}
              unoptimized
              className="mx-auto my-1"
            />
            <p className="font-semibold text-sm">{formatTemp(h.tempC, h.tempF, unit)}</p>
            <p className="text-[11px] text-muted mt-1">{h.chanceOfRainPct}% rain</p>
            <p className="text-[11px] text-muted">{Math.round(h.windKph)} km/h</p>
          </div>
        ))}
      </div>
    </section>
  );
}
