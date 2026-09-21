import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Weather Guides",
  description:
    "Original, plain-language guides to understanding forecasts, humidity, UV index, air quality and more.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">Weather Guides</h1>
      <p className="mt-2 text-muted">
        Plain-language explanations to help you get more out of every forecast.
      </p>

      <ul className="mt-8 grid sm:grid-cols-2 gap-4">
        {GUIDES.map((g) => (
          <li key={g.slug} className="surface rounded-xl2 shadow-card p-5">
            <Link href={`/guides/${g.slug}`} className="font-semibold hover:text-brand-600">
              {g.title}
            </Link>
            <p className="text-sm text-muted mt-1.5">{g.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
