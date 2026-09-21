import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { POPULAR_LOCATIONS } from "@/components/PopularLocations";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://weatheriq.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/weather`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/guides`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/cookie-policy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Only genuinely useful, curated location pages are included — never
  // auto-generated at scale, per our thin-content policy.
  const locationPages: MetadataRoute.Sitemap = POPULAR_LOCATIONS.map((loc) => ({
    url: `${SITE_URL}/weather/${loc.countrySlug}/${loc.slug}`,
    changeFrequency: "hourly",
    priority: 0.6,
  }));

  const guidePages: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    lastModified: g.updated,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...locationPages, ...guidePages];
}
