import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About WeatherIQ",
  description:
    "WeatherIQ provides current conditions, forecasts and air quality information sourced from WeatherAPI.com, presented clearly with no account required.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose-container">
      <h1 className="text-3xl font-bold">About WeatherIQ</h1>

      <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted">
        <p>
          WeatherIQ is a weather information website built to make current
          conditions, forecasts and air quality data easy to find and
          understand for any location in the world. Our goal is straightforward:
          give people accurate, clearly presented weather information without
          clutter, without requiring an account, and without making claims we
          can&apos;t back up.
        </p>

        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          What WeatherIQ provides
        </h2>
        <p>
          The site shows current temperature and conditions, hourly and daily
          forecasts, air quality readings where available, sunrise and sunset
          times, and a growing library of original guides that explain what
          common weather terms and measurements actually mean.
        </p>

        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          How our weather data is sourced
        </h2>
        <p>
          All weather data is provided by{" "}
          <a
            href="https://www.weatherapi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            WeatherAPI.com
          </a>
          , a third-party weather data provider. We normalize their data into
          our own internal format before displaying it, but we do not alter
          the underlying readings or forecasts themselves. Weather forecasting
          is inherently uncertain — no provider, including ours, can guarantee
          100% accurate weather, and forecasts further in the future are
          generally less reliable than forecasts for the next few hours.
        </p>

        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          How you can use WeatherIQ
        </h2>
        <p>
          Search for any city, region, country or supported postal code, or
          use the &quot;Use My Location&quot; button to check the weather
          where you are. You can save favorite locations and revisit recent
          searches directly from your browser — no account or sign-up is
          required, since this data is stored locally on your device rather
          than on our servers.
        </p>

        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Our commitment
        </h2>
        <p>
          We aim to keep WeatherIQ genuinely useful: original content, clear
          navigation, honest labeling of data sources, and no manufactured or
          duplicated pages. If you notice anything that looks inaccurate or
          confusing, we&apos;d like to hear about it — see our{" "}
          <a href="/contact" className="underline">
            contact page
          </a>
          .
        </p>
      </div>
    </div>
  );
}
