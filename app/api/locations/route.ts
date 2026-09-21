import { NextRequest, NextResponse } from "next/server";
import { weatherProvider } from "@/lib/weather/weatherapi";
import { WeatherProviderError } from "@/types/weather";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (q.length > 100 || !/^[\p{L}\p{N}\s,.'-]*$/u.test(q)) {
    return NextResponse.json(
      { error: "Please provide a valid search term." },
      { status: 400 }
    );
  }

  try {
    const results = await weatherProvider.searchLocations(q);
    return NextResponse.json(
      { results },
      { headers: { "Cache-Control": "public, max-age=0, s-maxage=1800" } }
    );
  } catch (err) {
    if (err instanceof WeatherProviderError) {
      // Autocomplete should degrade gracefully rather than surface an error.
      return NextResponse.json({ results: [] }, { status: 200 });
    }
    return NextResponse.json({ results: [] }, { status: 200 });
  }
}
