import type { LocationInfo } from "@/types/weather";

export interface SavedLocation {
  name: string;
  region: string;
  country: string;
  slug: string;
  countrySlug: string;
}

const FAVORITES_KEY = "weatheriq:favorites";
const RECENTS_KEY = "weatheriq:recent-searches";
const MAX_RECENTS = 8;

function readList(key: string): SavedLocation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as SavedLocation[]) : [];
  } catch {
    return [];
  }
}

function writeList(key: string, list: SavedLocation[]) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // Ignore storage failures (private browsing, quota, etc.)
  }
}

function toSaved(location: LocationInfo): SavedLocation {
  return {
    name: location.name,
    region: location.region,
    country: location.country,
    slug: location.slug,
    countrySlug: location.countrySlug,
  };
}

export function getFavorites(): SavedLocation[] {
  return readList(FAVORITES_KEY);
}

export function isFavorite(slug: string): boolean {
  return getFavorites().some((f) => f.slug === slug);
}

export function toggleFavorite(location: LocationInfo): SavedLocation[] {
  const favorites = getFavorites();
  const exists = favorites.some((f) => f.slug === location.slug);
  const next = exists
    ? favorites.filter((f) => f.slug !== location.slug)
    : [...favorites, toSaved(location)];
  writeList(FAVORITES_KEY, next);
  return next;
}

export function getRecentSearches(): SavedLocation[] {
  return readList(RECENTS_KEY);
}

export function addRecentSearch(location: LocationInfo) {
  const recents = getRecentSearches().filter((r) => r.slug !== location.slug);
  const next = [toSaved(location), ...recents].slice(0, MAX_RECENTS);
  writeList(RECENTS_KEY, next);
}

export function clearRecentSearches() {
  writeList(RECENTS_KEY, []);
}
