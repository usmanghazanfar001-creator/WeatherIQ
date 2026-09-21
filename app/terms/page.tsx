import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of WeatherIQ.",
  alternates: { canonical: "/terms" },
};

const SECTION = "text-sm leading-relaxed text-muted space-y-3";
const H2 = "text-lg font-semibold text-slate-900 dark:text-white mt-8 mb-2";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="mt-2 text-xs text-muted">Last updated: January 2026</p>

      <div className={SECTION}>
        <p>
          By accessing or using WeatherIQ, you agree to the following terms.
          If you do not agree, please do not use the site.
        </p>

        <h2 className={H2}>Acceptable use</h2>
        <p>
          You agree to use WeatherIQ only for lawful purposes and not to
          attempt to disrupt the site, scrape it at volumes that degrade
          service for others, or circumvent any access controls.
        </p>

        <h2 className={H2}>Weather information disclaimer</h2>
        <p>
          Weather forecasts, current conditions, air quality readings and
          related information on WeatherIQ are provided for general
          informational purposes only. Weather forecasting is inherently
          uncertain, and forecasts — especially those further in the future —
          may be inaccurate. WeatherIQ makes no guarantee of accuracy,
          completeness or timeliness of any weather data shown, and should
          not be relied upon as the sole source of information for decisions
          involving safety, travel, agriculture or any other activity where
          inaccurate weather information could cause harm. Always consult
          official government meteorological warnings for severe weather
          events.
        </p>

        <h2 className={H2}>Third-party data and services</h2>
        <p>
          Weather data displayed on WeatherIQ is sourced from WeatherAPI.com.
          We do not control the accuracy of data supplied by third-party
          providers and are not responsible for errors originating from
          those sources.
        </p>

        <h2 className={H2}>Availability</h2>
        <p>
          We aim to keep WeatherIQ available and up to date but do not
          guarantee uninterrupted access. The site may be unavailable
          periodically for maintenance, technical issues, or issues with
          third-party data providers.
        </p>

        <h2 className={H2}>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, WeatherIQ and its
          operators shall not be liable for any direct, indirect, incidental
          or consequential damages arising from your use of, or inability to
          use, this site or any information it provides.
        </p>

        <h2 className={H2}>Intellectual property</h2>
        <p>
          The WeatherIQ name, logo, design and original written content
          (including our guides) are the property of WeatherIQ unless
          otherwise noted. Weather data itself is sourced from and remains
          subject to the terms of WeatherAPI.com.
        </p>

        <h2 className={H2}>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the
          site after changes are posted constitutes acceptance of the
          updated terms.
        </p>

        <h2 className={H2}>Contact</h2>
        <p>
          Questions about these terms can be sent via our{" "}
          <a href="/contact" className="underline">
            contact page
          </a>
          .
        </p>
      </div>
    </div>
  );
}
