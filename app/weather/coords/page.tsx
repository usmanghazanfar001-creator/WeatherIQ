import { redirect } from "next/navigation";
import { weatherProvider } from "@/lib/weather/weatherapi";

export default async function WeatherCoordsRedirect({
  searchParams,
}: {
  searchParams: { lat?: string; lon?: string };
}) {
  const lat = Number(searchParams.lat);
  const lon = Number(searchParams.lon);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    redirect("/weather");
  }

  let target: string;
  try {
    const bundle = await weatherProvider.getWeatherBundle(`${lat},${lon}`);
    const { countrySlug, slug } = bundle.current.location;
    target = `/weather/${countrySlug}/${slug}`;
  } catch {
    target = "/weather?notfound=your-location";
  }

  redirect(target);
}
