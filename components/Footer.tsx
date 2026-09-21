import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="font-bold text-lg mb-2">
            Weather<span className="text-brand-600">IQ</span>
          </div>
          <p className="text-sm text-muted max-w-xs">
            Useful weather information for locations around the world.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3">Navigate</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/" className="hover:text-slate-900 dark:hover:text-white">Home</Link></li>
            <li><Link href="/weather" className="hover:text-slate-900 dark:hover:text-white">Weather</Link></li>
            <li><Link href="/guides" className="hover:text-slate-900 dark:hover:text-white">Guides</Link></li>
            <li><Link href="/about" className="hover:text-slate-900 dark:hover:text-white">About</Link></li>
            <li><Link href="/contact" className="hover:text-slate-900 dark:hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/privacy-policy" className="hover:text-slate-900 dark:hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-slate-900 dark:hover:text-white">Terms of Service</Link></li>
            <li><Link href="/cookie-policy" className="hover:text-slate-900 dark:hover:text-white">Cookie Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3">Data source</h3>
          <p className="text-sm text-muted">
            Weather data provided by{" "}
            <a
              href="https://www.weatherapi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-900 dark:hover:text-white"
            >
              WeatherAPI.com
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted flex flex-col sm:flex-row gap-2 sm:justify-between">
          <span>© {year} WeatherIQ. All rights reserved.</span>
          <span>Weather forecasts are estimates and may change without notice.</span>
        </div>
      </div>
    </footer>
  );
}
