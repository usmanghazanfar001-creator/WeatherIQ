/**
 * Normalized WeatherIQ data model.
 * The UI only ever consumes these shapes — never a raw provider response.
 * This decouples the UI from WeatherAPI.com so the provider can be swapped
 * later without touching any component.
 */

export interface LocationInfo {
  name: string;
  region: string;
  country: string;
  countrySlug: string;
  slug: string;
  lat: number;
  lon: number;
  timezone: string;
  localtime: string; // ISO-like local time string from provider
}

export interface CurrentWeather {
  location: LocationInfo;
  tempC: number;
  tempF: number;
  feelsLikeC: number;
  feelsLikeF: number;
  condition: string;
  conditionIcon: string;
  isDay: boolean;
  humidity: number;
  windKph: number;
  windMph: number;
  windDir: string;
  pressureMb: number;
  visibilityKm: number;
  cloudCoverPct: number;
  uvIndex: number;
  precipitationMm: number;
  lastUpdated: string;
}

export interface HourlyForecastItem {
  time: string; // ISO
  tempC: number;
  tempF: number;
  condition: string;
  conditionIcon: string;
  chanceOfRainPct: number;
  windKph: number;
  humidity: number;
  isDay: boolean;
}

export interface DailyForecastItem {
  date: string; // YYYY-MM-DD
  condition: string;
  conditionIcon: string;
  maxTempC: number;
  maxTempF: number;
  minTempC: number;
  minTempF: number;
  chanceOfRainPct: number;
  maxWindKph: number;
  avgHumidity: number;
  sunrise: string;
  sunset: string;
}

export interface AirQuality {
  available: boolean;
  aqi?: number; // US EPA index 1-6, normalized
  pm2_5?: number;
  pm10?: number;
  co?: number;
  no2?: number;
  so2?: number;
  o3?: number;
}

export interface SunData {
  sunrise: string;
  sunset: string;
  dayLengthMinutes?: number;
}

export interface LocationSearchResult {
  name: string;
  region: string;
  country: string;
  slug: string;
  countrySlug: string;
  lat: number;
  lon: number;
}

export interface WeatherBundle {
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  airQuality: AirQuality;
  sun: SunData;
}

export class WeatherProviderError extends Error {
  code:
    | "LOCATION_NOT_FOUND"
    | "RATE_LIMITED"
    | "UPSTREAM_ERROR"
    | "INVALID_REQUEST"
    | "CONFIG_ERROR";

  constructor(code: WeatherProviderError["code"], message: string) {
    super(message);
    this.code = code;
    this.name = "WeatherProviderError";
  }
}
