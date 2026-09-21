"use client";

import { useEffect, useState } from "react";
import type { LocationInfo } from "@/types/weather";
import { isFavorite, toggleFavorite } from "@/lib/utils/storage";

export function FavoriteButton({ location }: { location: LocationInfo }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(location.slug));
  }, [location.slug]);

  return (
    <button
      onClick={() => {
        toggleFavorite(location);
        setFav((v) => !v);
      }}
      aria-pressed={fav}
      aria-label={fav ? "Remove from favorites" : "Add to favorites"}
      className={`p-2.5 rounded-full border transition-colors ${
        fav
          ? "border-amber-400 bg-amber-50 dark:bg-amber-400/10 text-amber-500"
          : "border-slate-200 dark:border-slate-700 text-muted hover:text-slate-900 dark:hover:text-white"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 20 20" fill={fav ? "currentColor" : "none"} aria-hidden="true">
        <path
          d="M10 15.27 15.18 18l-1.36-5.87L18 8.24l-6-.52L10 2 8 7.72l-6 .52 4.18 3.89L4.82 18z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
