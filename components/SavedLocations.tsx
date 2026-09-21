"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  clearRecentSearches,
  getFavorites,
  getRecentSearches,
  type SavedLocation,
} from "@/lib/utils/storage";

function LocationChips({ items }: { items: SavedLocation[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((loc) => (
        <Link
          key={loc.slug}
          href={`/weather/${loc.countrySlug}/${loc.slug}`}
          className="rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          {loc.name}
        </Link>
      ))}
    </div>
  );
}

export function SavedLocations() {
  const [favorites, setFavorites] = useState<SavedLocation[]>([]);
  const [recents, setRecents] = useState<SavedLocation[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
    setRecents(getRecentSearches());
    setHydrated(true);
  }, []);

  if (!hydrated || (favorites.length === 0 && recents.length === 0)) return null;

  return (
    <div className="mt-8 space-y-6">
      {favorites.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold mb-2 text-muted">Favorite locations</h2>
          <LocationChips items={favorites} />
        </div>
      )}
      {recents.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-muted">Recent searches</h2>
            <button
              onClick={() => {
                clearRecentSearches();
                setRecents([]);
              }}
              className="text-xs text-muted hover:text-slate-900 dark:hover:text-white underline"
            >
              Clear
            </button>
          </div>
          <LocationChips items={recents} />
        </div>
      )}
    </div>
  );
}
