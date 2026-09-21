import type { SunData } from "@/types/weather";

function parseTimeToMinutes(t: string): number | null {
  // WeatherAPI returns astro times like "06:12 AM"
  const match = t.match(/(\d+):(\d+)\s?(AM|PM)/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

export function SunriseSunset({ sun }: { sun: SunData }) {
  const riseMin = parseTimeToMinutes(sun.sunrise);
  const setMin = parseTimeToMinutes(sun.sunset);
  let dayLength: string | null = null;
  if (riseMin !== null && setMin !== null) {
    const diff = setMin >= riseMin ? setMin - riseMin : setMin + 1440 - riseMin;
    const hrs = Math.floor(diff / 60);
    const mins = diff % 60;
    dayLength = `${hrs}h ${mins}m`;
  }

  return (
    <section aria-label="Sunrise and sunset" className="surface rounded-xl2 shadow-card p-6">
      <h2 className="font-semibold mb-4">Sunrise &amp; Sunset</h2>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-muted">Sunrise</p>
          <p className="font-semibold mt-1">{sun.sunrise}</p>
        </div>
        <div>
          <p className="text-xs text-muted">Sunset</p>
          <p className="font-semibold mt-1">{sun.sunset}</p>
        </div>
        <div>
          <p className="text-xs text-muted">Day length</p>
          <p className="font-semibold mt-1">{dayLength ?? "—"}</p>
        </div>
      </div>
    </section>
  );
}
