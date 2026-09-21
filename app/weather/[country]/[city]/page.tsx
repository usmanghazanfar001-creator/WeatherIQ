import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { weatherProvider } from "@/lib/weather/weatherapi";
import { WeatherProviderError } from "@/types/weather";
import { unslugify } from "@/lib/utils/slug";
import { WeatherCard } from "@/components/WeatherCard";
import { HourlyForecast } from "@/components/HourlyForecast";
import { DailyForecast } from "@/components/DailyForecast";
import { AirQuality } from "@/components/AirQuality";
import { SunriseSunset } from "@/components/SunriseSunset";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { RecordRecentSearch } from "@/components/RecordRecentSearch";
import { RELATED_GUIDES_BY_DEFAULT, getGuideBySlug } from "@/lib/guides";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://weatheriq.example.com";

interface Params {
  country: string;
  city: string;
}

async function fetchBundle(country: string, city: string) {
  const query = `${unslugify(city)}, ${unslugify(country)}`;
  try {
    return await weatherProvider.getWeatherBundle(query);
  } catch (err) {
    if (err instanceof WeatherProviderError && err.code === "LOCATION_NOT_FOUND") {
      return null;
    }
    throw err;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const bundle = await fetchBundle(params.country, params.city);
  if (!bundle) return { title: "Location Not Found" };

  const { name, region, country } = bundle.current.location;
  const place = region ? `${name}, ${region}` : name;
  const title = `${name} Weather Today & Forecast`;
  const description = `Check the latest weather in ${place}, ${country} including current conditions, temperature, humidity, wind, hourly forecast and available upcoming weather.`;
  const canonical = `/weather/${params.country}/${params.city}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
    twitter: { title, description },
  };
}

export default async function LocationWeatherPage({
  params,
}: {
  params: Params;
}) {
  let bundle;
  try {
    bundle = await fetchBundle(params.country, params.city);
  } catch {
    // Upstream/config errors get a friendly in-page message rather than a
    // hard 404 (which would incorrectly imply the location doesn't exist).
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Weather temporarily unavailable</h1>
        <p className="mt-3 text-muted">
          We couldn&apos;t load weather data right now. Please try again in a
          moment.
        </p>
      </div>
    );
  }

  if (!bundle) notFound();

  const { location } = bundle.current;
  const relatedGuides = RELATED_GUIDES_BY_DEFAULT.map((slug) => getGuideBySlug(slug)).filter(
    Boolean
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <RecordRecentSearch location={location} />
      <Breadcrumbs
        siteUrl={SITE_URL}
        items={[
          { label: "Home", href: "/" },
          { label: "Weather", href: "/weather" },
          { label: location.country, href: `/weather/${location.countrySlug}` },
          {
            label: location.name,
            href: `/weather/${location.countrySlug}/${location.slug}`,
          },
        ]}
      />

      <div className="space-y-6">
        <WeatherCard current={bundle.current} />
        <HourlyForecast hours={bundle.hourly.slice(0, 24)} />
        <DailyForecast days={bundle.daily} />

        <div className="grid sm:grid-cols-2 gap-6">
          <AirQuality data={bundle.airQuality} />
          <SunriseSunset sun={bundle.sun} />
        </div>

        <AdSlot slot="location-page-mid" />

        {relatedGuides.length > 0 && (
          <section className="surface rounded-xl2 shadow-card p-6">
            <h2 className="font-semibold mb-3">
              Understand your forecast for {location.name}
            </h2>
            <ul className="space-y-2 text-sm">
              {relatedGuides.map((g) => (
                <li key={g!.slug}>
                  <Link
                    href={`/guides/${g!.slug}`}
                    className="text-brand-600 hover:underline font-medium"
                  >
                    {g!.title}
                  </Link>
                  <p className="text-muted">{g!.excerpt}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${location.name} Weather Today & Forecast`,
            url: `${SITE_URL}/weather/${location.countrySlug}/${location.slug}`,
          }),
        }}
      />
    </div>
  );
}
