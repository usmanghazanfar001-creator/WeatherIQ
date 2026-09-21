"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { LocationSearchResult } from "@/types/weather";

export function SearchBar({ autoFocus = false }: { autoFocus?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationSearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/locations?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results ?? []);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  function goToLocation(result: LocationSearchResult) {
    setOpen(false);
    setQuery("");
    router.push(`/weather/${result.countrySlug}/${result.slug}`);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (results[0]) {
      goToLocation(results[0]);
    } else if (query.trim()) {
      router.push(`/weather/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <form onSubmit={onSubmit} role="search" className="flex gap-2">
        <label htmlFor="location-search" className="sr-only">
          Search for a city, region, country or postal code
        </label>
        <input
          id="location-search"
          type="text"
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search city, region, country or ZIP code"
          className="flex-1 rounded-xl2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm shadow-card focus:ring-2 focus:ring-brand-500 outline-none"
          autoComplete="off"
        />
        <button
          type="submit"
          className="rounded-xl2 bg-brand-600 hover:bg-brand-700 text-white px-5 py-3 text-sm font-semibold transition-colors"
        >
          Search
        </button>
      </form>

      {open && (query.trim().length >= 2) && (
        <ul
          role="listbox"
          className="absolute z-50 mt-2 w-full surface rounded-xl2 shadow-card overflow-hidden max-h-72 overflow-y-auto"
        >
          {loading && (
            <li className="px-4 py-3 text-sm text-muted">Searching…</li>
          )}
          {!loading && results.length === 0 && (
            <li className="px-4 py-3 text-sm text-muted">No matching locations.</li>
          )}
          {!loading &&
            results.map((r) => (
              <li key={`${r.name}-${r.lat}-${r.lon}`}>
                <button
                  role="option"
                  onClick={() => goToLocation(r)}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <span className="font-medium">{r.name}</span>
                  <span className="text-muted">
                    {r.region ? `, ${r.region}` : ""}, {r.country}
                  </span>
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
