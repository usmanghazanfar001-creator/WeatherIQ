"use client";

import Image from "next/image";
import type { CurrentWeather } from "@/types/weather";
import { useUnits } from "@/components/providers/UnitsProvider";
import { formatTemp } from "@/lib/utils/format";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ShareButton } from "@/components/ShareButton";

const DETAIL_ITEMS = (w: CurrentWeather, unit: "C" | "F") => [
  { label: "Feels like", value: formatTemp(w.feelsLikeC, w.feelsLikeF, unit) },
  { label: "Humidity", value: `${w.humidity}%` },
  { label: "Wind", value: `${Math.round(w.windKph)} km/h ${w.windDir}` },
  { label: "Pressure", value: `${Math.round(w.pressureMb)} mb` },
  { label: "Visibility", value: `${w.visibilityKm} km` },
  { label: "Cloud cover", value: `${w.cloudCoverPct}%` },
  { label: "UV index", value: `${w.uvIndex}` },
  { label: "Precipitation", value: `${w.precipitationMm} mm` },
];

export function WeatherCard({ current }: { current: CurrentWeather }) {
  const { unit } = useUnits();
  const { location } = current;

  return (
    <section
      aria-label="Current weather"
      className="surface rounded-xl2 shadow-card p-6 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">
            {location.name}
            {location.region ? `, ${location.region}` : ""}
          </h1>
          <p className="text-muted text-sm mt-1">{location.country}</p>
          <p className="text-muted text-xs mt-1">
            Local time: {location.localtime.replace("T", " ")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FavoriteButton location={location} />
          <ShareButton />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Image
          src={current.conditionIcon}
          alt={current.condition}
          width={80}
          height={80}
          unoptimized
        />
        <div>
          <div className="text-5xl font-bold leading-none">
            {formatTemp(current.tempC, current.tempF, unit)}
          </div>
          <p className="text-muted mt-2">{current.condition}</p>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {DETAIL_ITEMS(current, unit).map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-100 dark:border-slate-800 p-3">
            <dt className="text-xs text-muted">{item.label}</dt>
            <dd className="font-semibold mt-0.5">{item.value}</dd>
          </div>
        ))}
      </dl>

      <p className="text-xs text-muted mt-4">
        Last updated {current.lastUpdated}
      </p>
    </section>
  );
}
