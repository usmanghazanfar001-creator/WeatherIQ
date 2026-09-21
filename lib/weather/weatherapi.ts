import "server-only";
import type { WeatherProvider } from "@/lib/weather/provider";
import {
  normalizeForecast,
  normalizeSearchResults,
  type RawForecastResponse,
  type RawSearchResult,
} from "@/lib/weather/normalize";
import { WeatherProviderError, type WeatherBundle, type LocationSearchResult } from "@/types/weather";

const BASE_URL = "https://api.weatherapi.com/v1";

// How many forecast days we request/display. WeatherAPI's free tier
// supports up to 3 days — raise this only if your plan supports more,
// and keep it in sync with any "N-day forecast" copy in the UI.
export const FORECAST_DAYS = 3;

function getApiKey(): string {
  const key = process.env.WEATHER_API_KEY;
  if (!key) {
    // Never leak *why* in a way that reaches the browser — callers must
    // convert this into a generic user-facing message.
    throw new WeatherProviderError(
      "CONFIG_ERROR",
      "WEATHER_API_KEY is not configured on the server."
    );
  }
  return key;
}

async function safeFetch(url: string): Promise<Response> {
  let res: Response;
  try {
    res = await fetch(url, {
      // Revalidate reasonably often so data stays fresh without hammering
      // the upstream API on every request.
      next: { revalidate: 600 },
    });
  } catch {
    throw new WeatherProviderError(
      "UPSTREAM_ERROR",
      "Could not reach the weather data provider."
    );
  }
  return res;
}

async function handleErrorResponse(res: Response): Promise<never> {
  if (res.status === 400) {
    throw new WeatherProviderError(
      "LOCATION_NOT_FOUND",
      "We couldn't find that location. Please check the spelling and try again."
    );
  }
  if (res.status === 401 || res.status === 403) {
    throw new WeatherProviderError(
      "CONFIG_ERROR",
      "Weather provider authentication failed."
    );
  }
  if (res.status === 429) {
    throw new WeatherProviderError(
      "RATE_LIMITED",
      "The weather service is temporarily busy. Please try again shortly."
    );
  }
  throw new WeatherProviderError(
    "UPSTREAM_ERROR",
    "The weather service is temporarily unavailable. Please try again shortly."
  );
}

export class WeatherApiProvider implements WeatherProvider {
  async getWeatherBundle(query: string): Promise<WeatherBundle> {
    const key = getApiKey();
    const url = `${BASE_URL}/forecast.json?key=${key}&q=${encodeURIComponent(
      query
    )}&days=${FORECAST_DAYS}&aqi=yes&alerts=no`;

    const res = await safeFetch(url);
    if (!res.ok) {
      await handleErrorResponse(res);
    }

    let data: RawForecastResponse;
    try {
      data = (await res.json()) as RawForecastResponse;
    } catch {
      throw new WeatherProviderError(
        "UPSTREAM_ERROR",
        "Received an invalid response from the weather provider."
      );
    }

    return normalizeForecast(data);
  }

  async searchLocations(query: string): Promise<LocationSearchResult[]> {
    if (!query || query.trim().length < 2) return [];
    const key = getApiKey();
    const url = `${BASE_URL}/search.json?key=${key}&q=${encodeURIComponent(
      query
    )}`;

    const res = await safeFetch(url);
    if (!res.ok) {
      // Search failures should degrade to "no results" rather than a hard
      // error in most UI contexts — callers may catch and swallow this.
      await handleErrorResponse(res);
    }

    let data: RawSearchResult[];
    try {
      data = (await res.json()) as RawSearchResult[];
    } catch {
      throw new WeatherProviderError(
        "UPSTREAM_ERROR",
        "Received an invalid response from the weather provider."
      );
    }

    return normalizeSearchResults(data);
  }
}

// Singleton instance used across server code. Swapping providers later
// means changing this one export.
export const weatherProvider: WeatherProvider = new WeatherApiProvider();
