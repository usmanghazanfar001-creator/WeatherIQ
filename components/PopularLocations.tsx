import Link from "next/link";

export const POPULAR_LOCATIONS = [
  { name: "Lahore", countrySlug: "pakistan", slug: "lahore" },
  { name: "Karachi", countrySlug: "pakistan", slug: "karachi" },
  { name: "Islamabad", countrySlug: "pakistan", slug: "islamabad" },
  { name: "London", countrySlug: "united-kingdom", slug: "london" },
  { name: "New York", countrySlug: "united-states-of-america", slug: "new-york" },
  { name: "Dubai", countrySlug: "united-arab-emirates", slug: "dubai" },
  { name: "Tokyo", countrySlug: "japan", slug: "tokyo" },
  { name: "Sydney", countrySlug: "australia", slug: "sydney" },
];

export function PopularLocations() {
  return (
    <div>
      <h2 className="text-sm font-semibold mb-2 text-muted">Popular locations</h2>
      <div className="flex flex-wrap gap-2">
        {POPULAR_LOCATIONS.map((loc) => (
          <Link
            key={loc.slug}
            href={`/weather/${loc.countrySlug}/${loc.slug}`}
            className="rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {loc.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
