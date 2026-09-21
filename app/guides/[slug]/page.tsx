import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, getGuideBySlug } from "@/lib/guides";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://weatheriq.example.com";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return { title: "Guide Not Found" };
  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: { title: guide.title, description: guide.excerpt },
  };
}

function renderSection(raw: string) {
  const [, id, ...rest] = raw.match(/^## (\S+)\n([\s\S]*)$/) ?? [];
  return { id, text: rest.join("") };
}

export default function GuideArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const otherGuides = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    dateModified: guide.updated,
    url: `${SITE_URL}/guides/${guide.slug}`,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs
        siteUrl={SITE_URL}
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: guide.title, href: `/guides/${guide.slug}` },
        ]}
      />

      <article>
        <h1 className="text-3xl font-bold">{guide.title}</h1>
        <p className="text-xs text-muted mt-2">Updated {guide.updated}</p>

        <div className="mt-6 space-y-6">
          {guide.body.map((section) => {
            const { id, text } = renderSection(section);
            const heading = guide.headings.find((h) => h.id === id);
            return (
              <section key={id} aria-labelledby={id}>
                {heading && (
                  <h2 id={id} className="text-xl font-semibold mb-2">
                    {heading.label}
                  </h2>
                )}
                <p className="text-sm leading-relaxed text-muted">{text.trim()}</p>
              </section>
            );
          })}
        </div>
      </article>

      {otherGuides.length > 0 && (
        <aside className="mt-12 surface rounded-xl2 shadow-card p-6">
          <h2 className="font-semibold mb-3">Related guides</h2>
          <ul className="space-y-1.5 text-sm">
            {otherGuides.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="text-brand-600 hover:underline">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
