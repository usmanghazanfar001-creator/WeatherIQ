import type { Metadata } from "next";
import { SearchBar } from "@/components/SearchBar";
import { LocationButton } from "@/components/LocationButton";
import { PopularLocations } from "@/components/PopularLocations";

export const metadata: Metadata = {
  title: "Search Weather by Location",
  description:
    "Search for current weather, hourly forecasts and daily forecasts for any city, region or country.",
  alternates: { canonical: "/weather" },
};

export default function WeatherIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Find weather for any location</h1>
      <p className="mt-3 text-muted">
        Search by city, region, country or postal code.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4">
        <SearchBar autoFocus />
        <LocationButton />
      </div>
      <div className="mt-10 text-left">
        <PopularLocations />
      </div>
    </div>
  );
}
