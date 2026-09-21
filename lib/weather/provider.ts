import type {
  WeatherBundle,
  LocationSearchResult,
} from "@/types/weather";

/**
 * Abstract contract every weather data source must implement.
 * The rest of the app (routes, pages, components) only talks to this
 * interface, so swapping WeatherAPI.com for another provider later means
 * writing one new file, not rewriting the UI.
 */
export interface WeatherProvider {
  getWeatherBundle(query: string): Promise<WeatherBundle>;
  searchLocations(query: string): Promise<LocationSearchResult[]>;
}
