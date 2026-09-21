import { redirect } from "next/navigation";
import { weatherProvider } from "@/lib/weather/weatherapi";

export default async function WeatherSearchRedirect({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q?.trim();

  if (!q) {
    redirect("/weather");
  }

  // Resolve the target first, then call redirect() once outside the
  // try/catch — redirect() throws internally, and catching that here
  // would incorrectly route successful lookups to the "not found" path.
  let target: string;
  try {
    const bundle = await weatherProvider.getWeatherBundle(q as string);
    const { countrySlug, slug } = bundle.current.location;
    target = `/weather/${countrySlug}/${slug}`;
  } catch {
    target = `/weather?notfound=${encodeURIComponent(q as string)}`;
  }

  redirect(target);
}
