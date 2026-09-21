"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LocationButton() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function useMyLocation() {
    if (!("geolocation" in navigator)) {
      setStatus("error");
      setError("Geolocation isn't available in this browser. Please search manually instead.");
      return;
    }

    setStatus("loading");
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // We only ever use the coordinates for a single lookup — nothing is
        // stored permanently on the server or in the browser.
        router.push(`/weather/coords?lat=${latitude}&lon=${longitude}`);
      },
      (err) => {
        setStatus("error");
        if (err.code === err.PERMISSION_DENIED) {
          setError("Location permission was denied. You can still search manually.");
        } else {
          setError("We couldn't determine your location. Please search manually instead.");
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }

  return (
    <div>
      <button
        onClick={useMyLocation}
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 rounded-xl2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-60"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="2.5" fill="currentColor" />
          <path d="M8 1v2.2M8 12.8V15M1 8h2.2M12.8 8H15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        {status === "loading" ? "Locating…" : "Use My Location"}
      </button>
      {status === "error" && error && (
        <p role="alert" className="mt-2 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
