import { NextRequest, NextResponse } from "next/server";
import { weatherProvider } from "@/lib/weather/weatherapi";
import { WeatherProviderError } from "@/types/weather";

export const runtime = "nodejs";

function isValidQuery(q: string): boolean {
  if (!q || q.trim().length === 0) return false;
  if (q.length > 100) return false;
  // Allow letters (incl. accented), numbers, spaces, commas, periods,
  // hyphens and "lat,lon" style queries. Reject anything else outright.
  return /^[\p{L}\p{N}\s,.'-]+$/u.test(q);
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!isValidQuery(q)) {
    return NextResponse.json(
      { error: "Please provide a valid location." },
      { status: 400 }
    );
  }

  try {
    const bundle = await weatherProvider.getWeatherBundle(q);
    return NextResponse.json(bundle, {
      headers: { "Cache-Control": "public, max-age=0, s-maxage=600" },
    });
  } catch (err) {
    if (err instanceof WeatherProviderError) {
      const status =
        err.code === "LOCATION_NOT_FOUND"
          ? 404
          : err.code === "RATE_LIMITED"
          ? 429
          : err.code === "CONFIG_ERROR"
          ? 500
          : 502;
      // Config errors must never leak details to the client.
      const message =
        err.code === "CONFIG_ERROR"
          ? "The weather service is temporarily unavailable."
          : err.message;
      return NextResponse.json({ error: message }, { status });
    }
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
