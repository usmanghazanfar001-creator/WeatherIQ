import type { Metadata } from "next";
import { SearchBar } from "@/components/SearchBar";
import { LocationButton } from "@/components/LocationButton";
import { PopularLocations } from "@/components/PopularLocations";
import { SavedLocations } from "@/components/SavedLocations";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "WeatherIQ — Accurate Weather Forecasts for Every Location",
  description:
    "Check current conditions, hourly forecasts, upcoming weather, air quality and detailed weather information for locations around the world.",
  alternates: { canonical: "/" },
};

const FEATURES = [
  {
    title: "Current conditions",
    body: "Temperature, feels-like, humidity, wind, pressure, visibility and UV index at a glance.",
  },
  {
    title: "Hourly & daily forecasts",
    body: "See how conditions will change through the day and over the coming days.",
  },
  {
    title: "Air quality",
    body: "PM2.5, PM10 and other pollutant levels explained in plain language, where available.",
  },
  {
    title: "No account needed",
    body: "Favorites and recent searches are saved locally in your browser — nothing to sign up for.",
  },
];

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://weatheriq.example.com";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WeatherIQ",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/weather/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-16 sm:py-24 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Weather<span className="text-brand-600">IQ</span>
        </h1>
        <p className="mt-4 text-xl font-medium">
          Accurate Weather Forecasts for Every Location
        </p>
        <p className="mt-3 text-muted max-w-2xl mx-auto">
          Check current conditions, hourly forecasts, upcoming weather, air
          quality and detailed weather information for locations around the
          world.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <SearchBar autoFocus />
          <LocationButton />
        </div>

        <div className="mt-10">
          <PopularLocations />
        </div>

        <SavedLocations />
      </section>

      <AdSlot slot="homepage-top" />

      <section className="py-12 grid sm:grid-cols-2 gap-6">
        {FEATURES.map((f) => (
          <div key={f.title} className="surface rounded-xl2 shadow-card p-6">
            <h2 className="font-semibold mb-1">{f.title}</h2>
            <p className="text-sm text-muted">{f.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
