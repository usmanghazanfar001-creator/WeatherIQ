import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How WeatherIQ uses cookies and local storage.",
  alternates: { canonical: "/cookie-policy" },
};

const SECTION = "text-sm leading-relaxed text-muted space-y-3";
const H2 = "text-lg font-semibold text-slate-900 dark:text-white mt-8 mb-2";

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Cookie Policy</h1>
      <p className="mt-2 text-xs text-muted">Last updated: January 2026</p>

      <div className={SECTION}>
        <p>
          WeatherIQ primarily relies on your browser&apos;s local storage
          rather than traditional tracking cookies. This page explains what
          is stored and why.
        </p>

        <h2 className={H2}>Essential local storage</h2>
        <p>
          We store your temperature unit (°C/°F), theme preference
          (light/dark/system), favorite locations and recent searches
          directly in your browser&apos;s local storage. This data never
          leaves your device and is not accessible to us. It is essential to
          the core functionality of the site — without it, your preferences
          would reset on every visit.
        </p>

        <h2 className={H2}>Analytics cookies</h2>
        <p>
          If we enable an analytics tool in the future, it may set cookies
          to help us understand aggregate site usage, such as which pages
          are most visited. This section will be updated to name the
          specific tool if and when one is enabled.
        </p>

        <h2 className={H2}>Advertising cookies</h2>
        <p>
          If Google AdSense is enabled on WeatherIQ in the future, Google and
          its advertising partners may set cookies to serve and measure ads,
          including based on your visits to this and other sites. Ads are
          not currently active on WeatherIQ. When enabled, you will be able
          to manage ad personalization through{" "}
          <a
            href="https://adssettings.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Google Ads Settings
          </a>
          .
        </p>

        <h2 className={H2}>Managing cookies and local storage</h2>
        <p>
          Most browsers let you view, delete or block cookies and local
          storage through their settings. Clearing your browser&apos;s site
          data for WeatherIQ will reset your saved preferences, favorites and
          recent searches.
        </p>

        <h2 className={H2}>Contact</h2>
        <p>
          Questions about this policy can be sent via our{" "}
          <a href="/contact" className="underline">
            contact page
          </a>
          .
        </p>
      </div>
    </div>
  );
}
