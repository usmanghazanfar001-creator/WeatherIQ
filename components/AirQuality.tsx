import type { AirQuality as AirQualityData } from "@/types/weather";

const EPA_LABELS: Record<number, { label: string; description: string }> = {
  1: { label: "Good", description: "Air quality is satisfactory and poses little or no risk." },
  2: { label: "Moderate", description: "Air quality is acceptable, though a few pollutants may be a concern for unusually sensitive people." },
  3: { label: "Unhealthy for sensitive groups", description: "Sensitive groups may experience health effects; the general public is less likely to be affected." },
  4: { label: "Unhealthy", description: "Everyone may begin to experience health effects; sensitive groups may experience more serious effects." },
  5: { label: "Very unhealthy", description: "Health alert: everyone may experience more serious health effects." },
  6: { label: "Hazardous", description: "Health warning of emergency conditions; the entire population is more likely to be affected." },
};

function Metric({ label, value, unit }: { label: string; value?: number; unit: string }) {
  return (
    <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="font-semibold mt-0.5">
        {value !== undefined ? `${value.toFixed(1)} ${unit}` : "—"}
      </dd>
    </div>
  );
}

export function AirQuality({ data }: { data: AirQualityData }) {
  if (!data.available) {
    return (
      <section aria-label="Air quality" className="surface rounded-xl2 shadow-card p-6">
        <h2 className="font-semibold mb-2">Air Quality</h2>
        <p className="text-sm text-muted">
          Air quality information is currently unavailable for this location.
        </p>
      </section>
    );
  }

  const epa = data.aqi ? EPA_LABELS[data.aqi] : undefined;

  return (
    <section aria-label="Air quality" className="surface rounded-xl2 shadow-card p-6">
      <h2 className="font-semibold mb-2">Air Quality</h2>
      {epa && (
        <p className="text-sm mb-4">
          <span className="font-semibold">{epa.label}.</span>{" "}
          <span className="text-muted">{epa.description}</span>
        </p>
      )}
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Metric label="PM2.5" value={data.pm2_5} unit="µg/m³" />
        <Metric label="PM10" value={data.pm10} unit="µg/m³" />
        <Metric label="CO" value={data.co} unit="µg/m³" />
        <Metric label="NO2" value={data.no2} unit="µg/m³" />
        <Metric label="SO2" value={data.so2} unit="µg/m³" />
        <Metric label="O3" value={data.o3} unit="µg/m³" />
      </dl>
    </section>
  );
}
