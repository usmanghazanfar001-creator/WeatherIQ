# WeatherIQ

A production-oriented weather website built with Next.js (App Router),
TypeScript and Tailwind CSS. Weather data is sourced from
[WeatherAPI.com](https://www.weatherapi.com/).

## Features

- Current conditions, hourly and 3-day forecast, air quality and
  sunrise/sunset for any searchable location
- Location search with autocomplete, "Use My Location" geolocation, and
  no-account favorites/recent searches (stored in `localStorage`)
- °C/°F and light/dark/system theme toggles, both persisted
- SEO-friendly hierarchical URLs (`/weather/[country]/[city]`), per-page
  metadata, canonical URLs, Open Graph/Twitter tags, JSON-LD structured
  data, `sitemap.xml` and `robots.txt`
- A `/guides` section with original, plain-language educational articles
- Legal pages: About, Contact (with a validated/honeypot-protected form),
  Privacy Policy, Terms of Service, Cookie Policy
- A disabled-by-default `<AdSlot />` component, ready to wire up to Google
  AdSense later without touching the rest of the UI
- Server-only WeatherAPI integration behind a provider interface
  (`lib/weather/provider.ts`) so the data source can be swapped later
  without rebuilding the UI

## Tech stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Vercel-ready, no
database or backend required.

## Project structure

```
/app
  /api/weather        Server route — fetches + normalizes current weather
  /api/locations       Server route — location search/autocomplete
  /api/contact          Server route — contact form handling
  /weather/[country]/[city]   Main SEO location page
  /weather/search        Resolves a free-text query to a canonical URL
  /weather/coords        Resolves lat/lon (from geolocation) to a canonical URL
  /guides/[slug]         Guide articles
  /about, /contact, /privacy-policy, /terms, /cookie-policy
  sitemap.ts, robots.ts

/components             UI components (Header, WeatherCard, SearchBar, ...)
/lib/weather            Provider interface, WeatherAPI implementation, normalizer
/lib/utils              Slug, format and localStorage helpers
/lib/guides.ts           Guide content registry
/types/weather.ts        Normalized WeatherIQ data model
/public/icons            Favicon and app icon set generated from your logo
```

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure your WeatherAPI.com key**

   An account already exists for the key you provided. It has been placed
   in `.env.local` (already git-ignored) as:

   ```
   WEATHER_API_KEY=54846b2cfd5b4218850113049262109
   ```

   `.env.example` is provided as a template with no real key, safe to
   commit. **Never** rename the variable to `NEXT_PUBLIC_WEATHER_API_KEY`
   — it must stay server-side only.

3. **Run the dev server**

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000`.

4. **Type-check and lint**

   ```bash
   npm run typecheck
   npm run lint
   ```

5. **Production build**

   ```bash
   npm run build
   npm run start
   ```

## Deploying to Vercel

1. Push this project to a Git repository (`.env.local` will **not** be
   committed — that's intentional).
2. Import the repo in Vercel.
3. In the Vercel project's **Settings → Environment Variables**, add:
   - `WEATHER_API_KEY` = your WeatherAPI.com key
   - `NEXT_PUBLIC_SITE_URL` = your production URL (used for canonical URLs,
     sitemap and structured data — defaults to a placeholder if omitted)
4. Deploy. No filesystem or long-running process dependencies are used, so
   it runs cleanly on Vercel's serverless/edge functions.

## Favicon / branding

Your uploaded logo was used to generate the full icon set:

- `app/favicon.ico` (multi-size .ico)
- `public/icons/favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png`
- `public/icons/apple-touch-icon.png` (180×180)
- `public/icons/icon-192.png`, `icon-512.png` (referenced by
  `public/site.webmanifest` for PWA/home-screen use)

These are wired up in `app/layout.tsx`'s `metadata.icons` and in the header
logo.

## API attribution

"Weather data provided by WeatherAPI.com" appears in the footer on every
page, linking to weatherapi.com, per WeatherAPI's attribution requirement.

## AdSense readiness

`components/AdSlot.tsx` renders nothing until
`NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set — no fake or placeholder ads exist
anywhere in the codebase. See the comment in that file for the exact steps
to wire up real ad units later.

## What's intentionally scoped down (follow-ups)

This is a complete, working, deployable core — but a couple of areas from
a full 50-point production spec were kept deliberately small so the build
stays honest and maintainable rather than padded:

- **Guides**: 7 original articles are included (forecasts, humidity, UV
  index, °C/°F, wind chill, rain probability, air quality). The remaining
  topics (how forecasts work, extreme heat/rain prep, wind speed
  measurement, atmospheric pressure) follow the exact same pattern in
  `lib/guides.ts` — add an entry to the `GUIDES` array and a page is
  generated automatically.
- **Location pages**: `POPULAR_LOCATIONS` in
  `components/PopularLocations.tsx` seeds 8 curated cities. Any location
  WeatherAPI recognizes works at `/weather/[country]/[city]` — add more
  entries there (and to the sitemap, which reads from the same list) as
  you identify genuinely useful pages to index. Deliberately not
  auto-generating thousands of pages, per the AdSense thin-content policy.
- **Contact form**: validates input and blocks obvious bots (honeypot
  field) but does not send email yet — see the `TODO` in
  `app/api/contact/route.ts` for wiring up a provider (Resend, Postmark,
  SES, etc.).
- **Analytics**: no analytics tool is wired in. If you add one, update the
  "Analytics" sections of the Privacy Policy and Cookie Policy to name it.

## Troubleshooting

- **"Location not found"**: the query didn't match anything on
  WeatherAPI.com — check spelling, or try a broader query (just the city
  name).
- **500 errors on every weather request**: check that `WEATHER_API_KEY` is
  set correctly in your environment (locally in `.env.local`, in
  production in Vercel's environment variables) and that the key is
  active on WeatherAPI.com.
- **Icons/favicon not showing after deploy**: hard-refresh or check that
  `public/icons/` and `app/favicon.ico` were included in your deployment
  (they should be, since nothing in `.gitignore` excludes them).
