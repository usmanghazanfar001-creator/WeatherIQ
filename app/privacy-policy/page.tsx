import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How WeatherIQ handles information when you use the site.",
  alternates: { canonical: "/privacy-policy" },
};

const SECTION = "text-sm leading-relaxed text-muted space-y-3";
const H2 = "text-lg font-semibold text-slate-900 dark:text-white mt-8 mb-2";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-xs text-muted">Last updated: January 2026</p>

      <div className={SECTION}>
        <p>
          This Privacy Policy explains what information WeatherIQ
          (&quot;we&quot;, &quot;us&quot;) processes when you use this
          website, and why. We aim to collect and store as little personal
          information as reasonably possible.
        </p>

        <h2 className={H2}>Search activity</h2>
        <p>
          When you search for a location, that search term is sent to our
          server so it can be forwarded to our weather data provider,
          WeatherAPI.com, and the resulting forecast returned to you. We do
          not build a server-side profile of your search history.
        </p>

        <h2 className={H2}>Local storage and cookies</h2>
        <p>
          WeatherIQ uses your browser&apos;s local storage (not tracking
          cookies) to remember your temperature unit preference (°C/°F),
          theme preference (light/dark/system), favorite locations and
          recent searches. This information stays on your device and is not
          transmitted to or stored on our servers. You can clear it at any
          time by clearing your browser&apos;s site data, or by using the
          &quot;Clear&quot; control next to recent searches.
        </p>

        <h2 className={H2}>Geolocation</h2>
        <p>
          If you use the &quot;Use My Location&quot; feature, your browser
          will ask for permission to share your approximate coordinates.
          These coordinates are used only to look up weather for your
          current location and are not permanently stored on our servers.
          You can decline this permission and search manually instead.
        </p>

        <h2 className={H2}>Contact form</h2>
        <p>
          If you submit our contact form, we process the name, email address
          and message you provide solely to respond to your inquiry.
        </p>

        <h2 className={H2}>Analytics</h2>
        <p>
          We may use privacy-conscious analytics tools to understand overall
          site usage (such as which pages are visited), which can involve
          cookies or similar technologies. If and when analytics are enabled,
          this policy will be updated to name the specific tool in use.
        </p>

        <h2 className={H2}>Advertising</h2>
        <p>
          WeatherIQ may in the future display advertisements through Google
          AdSense. If enabled, Google and its partners may use cookies to
          serve ads based on your prior visits to this or other websites. You
          can learn more about how Google uses this information and manage
          your ad personalization settings at{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Google&apos;s Ads Policy page
          </a>
          . Ads are not currently active on this site.
        </p>

        <h2 className={H2}>Third-party services</h2>
        <p>
          We rely on WeatherAPI.com to source weather, forecast and air
          quality data. Their handling of any data sent to them is governed
          by{" "}
          <a
            href="https://www.weatherapi.com/privacy.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            WeatherAPI&apos;s own privacy policy
          </a>
          .
        </p>

        <h2 className={H2}>Your rights</h2>
        <p>
          Since favorites, recent searches and preferences are stored only
          in your browser, you can remove them at any time through your
          browser settings. For questions about any information you&apos;ve
          submitted via our contact form, please reach out using the details
          below.
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
