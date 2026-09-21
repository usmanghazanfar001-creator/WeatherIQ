import { slugify } from "@/lib/utils/slug";
import type {
  AirQuality,
  CurrentWeather,
  DailyForecastItem,
  HourlyForecastItem,
  LocationInfo,
  LocationSearchResult,
  SunData,
  WeatherBundle,
} from "@/types/weather";

// --- Minimal shapes for the parts of WeatherAPI's response we use. ---
// Kept local to this file on purpose: nothing outside /lib/weather should
// ever see a raw WeatherAPI field name.

interface RawCondition {
  text: string;
  icon: string;
}

interface RawLocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime: string;
}

interface RawAstro {
  sunrise: string;
  sunset: string;
}

interface RawHour {
  time: string;
  temp_c: number;
  temp_f: number;
  condition: RawCondition;
  chance_of_rain: number;
  wind_kph: number;
  humidity: number;
  is_day: number;
}

interface RawDay {
  date: string;
  day: {
    condition: RawCondition;
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    daily_chance_of_rain: number;
    maxwind_kph: number;
    avghumidity: number;
  };
  astro: RawAstro;
  hour: RawHour[];
}

interface RawAirQuality {
  co?: number;
  no2?: number;
  o3?: number;
  so2?: number;
  pm2_5?: number;
  pm10?: number;
  "us-epa-index"?: number;
}

export interface RawForecastResponse {
  location: RawLocation;
  current: {
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    feelslike_f: number;
    condition: RawCondition;
    is_day: number;
    humidity: number;
    wind_kph: number;
    wind_mph: number;
    wind_dir: string;
    pressure_mb: number;
    vis_km: number;
    cloud: number;
    uv: number;
    precip_mm: number;
    last_updated: string;
    air_quality?: RawAirQuality;
  };
  forecast: {
    forecastday: RawDay[];
  };
}

export interface RawSearchResult {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

function buildLocationInfo(raw: RawLocation): LocationInfo {
  const countrySlug = slugify(raw.country);
  const citySlug = slugify(raw.name);
  return {
    name: raw.name,
    region: raw.region,
    country: raw.country,
    countrySlug,
    slug: citySlug,
    lat: raw.lat,
    lon: raw.lon,
    timezone: raw.tz_id,
    localtime: raw.localtime,
  };
}

function normalizeAirQuality(raw?: RawAirQuality): AirQuality {
  if (!raw) return { available: false };
  return {
    available: true,
    aqi: raw["us-epa-index"],
    pm2_5: raw.pm2_5,
    pm10: raw.pm10,
    co: raw.co,
    no2: raw.no2,
    so2: raw.so2,
    o3: raw.o3,
  };
}

export function normalizeForecast(raw: RawForecastResponse): WeatherBundle {
  const location = buildLocationInfo(raw.location);
  const today = raw.forecast.forecastday[0];

  const current: CurrentWeather = {
    location,
    tempC: raw.current.temp_c,
    tempF: raw.current.temp_f,
    feelsLikeC: raw.current.feelslike_c,
    feelsLikeF: raw.current.feelslike_f,
    condition: raw.current.condition.text,
    conditionIcon: normalizeIconUrl(raw.current.condition.icon),
    isDay: raw.current.is_day === 1,
    humidity: raw.current.humidity,
    windKph: raw.current.wind_kph,
    windMph: raw.current.wind_mph,
    windDir: raw.current.wind_dir,
    pressureMb: raw.current.pressure_mb,
    visibilityKm: raw.current.vis_km,
    cloudCoverPct: raw.current.cloud,
    uvIndex: raw.current.uv,
    precipitationMm: raw.current.precip_mm,
    lastUpdated: raw.current.last_updated,
  };

  // Only expose hours that are still ahead of / at "now" for today, and all
  // hours for subsequent days already returned by the API — never invent
  // hours the API didn't provide.
  const hourly: HourlyForecastItem[] = raw.forecast.forecastday.flatMap((day) =>
    day.hour.map((h) => ({
      time: h.time,
      tempC: h.temp_c,
      tempF: h.temp_f,
      condition: h.condition.text,
      conditionIcon: normalizeIconUrl(h.condition.icon),
      chanceOfRainPct: h.chance_of_rain,
      windKph: h.wind_kph,
      humidity: h.humidity,
      isDay: h.is_day === 1,
    }))
  );

  const daily: DailyForecastItem[] = raw.forecast.forecastday.map((day) => ({
    date: day.date,
    condition: day.day.condition.text,
    conditionIcon: normalizeIconUrl(day.day.condition.icon),
    maxTempC: day.day.maxtemp_c,
    maxTempF: day.day.maxtemp_f,
    minTempC: day.day.mintemp_c,
    minTempF: day.day.mintemp_f,
    chanceOfRainPct: day.day.daily_chance_of_rain,
    maxWindKph: day.day.maxwind_kph,
    avgHumidity: day.day.avghumidity,
    sunrise: day.astro.sunrise,
    sunset: day.astro.sunset,
  }));

  const sun: SunData = {
    sunrise: today.astro.sunrise,
    sunset: today.astro.sunset,
  };

  const airQuality = normalizeAirQuality(raw.current.air_quality);

  return { current, hourly, daily, airQuality, sun };
}

export function normalizeSearchResults(
  raw: RawSearchResult[]
): LocationSearchResult[] {
  return raw.map((r) => ({
    name: r.name,
    region: r.region,
    country: r.country,
    slug: slugify(r.name),
    countrySlug: slugify(r.country),
    lat: r.lat,
    lon: r.lon,
  }));
}

// WeatherAPI returns protocol-relative icon URLs ("//cdn.weatherapi.com/...").
function normalizeIconUrl(icon: string): string {
  return icon.startsWith("//") ? `https:${icon}` : icon;
}
