export function formatTemp(c: number, f: number, unit: "C" | "F"): string {
  const value = unit === "C" ? c : f;
  return `${Math.round(value)}°${unit}`;
}

export function formatTime(iso: string, timeZone?: string): string {
  try {
    return new Date(iso.replace(" ", "T")).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      ...(timeZone ? { timeZone } : {}),
    });
  } catch {
    return iso;
  }
}

export function formatDayLabel(dateStr: string, index: number): string {
  if (index === 0) return "Today";
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString(undefined, { weekday: "short" });
}
