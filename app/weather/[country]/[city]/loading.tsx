export default function LoadingLocationWeather() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-6 animate-pulse" aria-busy="true" aria-live="polite">
      <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="h-64 rounded-xl2 bg-slate-200 dark:bg-slate-800" />
      <div className="h-40 rounded-xl2 bg-slate-200 dark:bg-slate-800" />
      <div className="h-56 rounded-xl2 bg-slate-200 dark:bg-slate-800" />
      <span className="sr-only">Loading weather data…</span>
    </div>
  );
}
