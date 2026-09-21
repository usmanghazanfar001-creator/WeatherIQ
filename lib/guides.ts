export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  updated: string; // YYYY-MM-DD
  body: string[]; // paragraphs / section content, rendered as-is
  headings: { id: string; label: string }[];
}

export const GUIDES: Guide[] = [
  {
    slug: "how-to-read-a-weather-forecast",
    title: "How to Read a Weather Forecast",
    excerpt:
      "A forecast is a summary of probabilities, not a guarantee — here's how to read one like a meteorologist.",
    updated: "2026-01-10",
    headings: [
      { id: "basics", label: "The basics" },
      { id: "probability", label: "Why forecasts use probability" },
      { id: "reading-icons", label: "Reading icons and conditions" },
      { id: "planning", label: "Using a forecast to plan your day" },
    ],
    body: [
      "## basics\nA weather forecast is a prediction built from current observations, historical patterns and atmospheric models. It typically bundles together a handful of core numbers: temperature, the chance of precipitation, wind speed and a short description of sky conditions. Understanding what each of these actually measures makes the whole forecast far more useful than just glancing at an icon.",
      "## probability\nOne of the most misunderstood parts of any forecast is the \"chance of rain\" figure. A 40% chance of rain does not mean it will rain for 40% of the day — it means that, given the current atmospheric setup, there's a 40% probability that measurable rain will fall at a given point in the forecast area during that period. Higher percentages mean forecasters are more confident precipitation will occur somewhere in the area, not that the rain will necessarily be heavier.",
      "## reading-icons\nWeather icons are a shorthand for the dominant condition expected during a period, not a complete picture. A sun icon with a small cloud usually means mostly clear skies with some cloud cover, while a solid cloud with rain lines means precipitation is expected for a meaningful portion of that period. Pairing the icon with the text condition and the rain probability gives a much fuller picture than the icon alone.",
      "## planning\nFor day-to-day planning, the most useful numbers are usually the \"feels like\" temperature (which accounts for wind and humidity), the hourly rain probability around the time you'll actually be outside, and the wind speed if you're near water or planning anything at height. Forecasts also get less certain the further out they go — a forecast for tomorrow is generally far more reliable than one for five days from now.",
    ],
  },
  {
    slug: "what-does-humidity-mean",
    title: "What Does Humidity Mean?",
    excerpt:
      "Relative humidity explains why 30°C can feel very different from one day to the next.",
    updated: "2026-01-10",
    headings: [
      { id: "definition", label: "What humidity actually measures" },
      { id: "comfort", label: "Why humidity affects how hot it feels" },
      { id: "ranges", label: "Typical comfortable ranges" },
    ],
    body: [
      "## definition\nThe humidity percentage shown in a weather forecast is relative humidity: the amount of water vapor currently in the air compared to the maximum amount the air could hold at that temperature. Warm air can hold far more moisture than cold air, so the same amount of water vapor produces a much higher relative humidity reading on a cold day than on a hot one.",
      "## comfort\nHumidity matters because it affects how efficiently your body can cool itself. Sweat cools you down as it evaporates, but in high humidity the air is already close to saturated, so sweat evaporates more slowly and you feel hotter than the air temperature alone would suggest. This is why \"feels like\" temperatures climb sharply on hot, humid days even when the actual thermometer reading hasn't changed.",
      "## ranges\nMost people find humidity between roughly 30% and 50% comfortable at typical indoor and outdoor temperatures. Above about 60%, the air can start to feel sticky or heavy, and prolonged exposure to high heat and high humidity together raises the risk of heat-related illness, since the body's main cooling mechanism becomes less effective.",
    ],
  },
  {
    slug: "what-is-the-uv-index",
    title: "What Is the UV Index?",
    excerpt:
      "The UV index tells you how strong the sun's ultraviolet radiation is — and how quickly skin can burn.",
    updated: "2026-01-10",
    headings: [
      { id: "scale", label: "How the scale works" },
      { id: "factors", label: "What drives a high UV index" },
      { id: "protecting", label: "Protecting yourself" },
    ],
    body: [
      "## scale\nThe UV index is an open-ended scale, typically shown from 0 upward, that measures the strength of ultraviolet radiation from the sun at a given place and time. Values of 0–2 are considered low risk, 3–5 moderate, 6–7 high, 8–10 very high, and 11 or above extreme. The higher the number, the less time it takes for unprotected skin to start burning.",
      "## factors\nUV index is driven mainly by the sun's angle in the sky, which is why it peaks around midday and is highest closer to the equator and at higher altitudes. Cloud cover reduces UV somewhat but doesn't block it entirely — it's possible to get a significant UV dose on an overcast day, especially with reflective surfaces like snow, sand or water nearby.",
      "## protecting\nAt UV index 3 and above, sun protection is generally recommended: seeking shade during peak hours, wearing protective clothing and a hat, and using sunscreen on exposed skin. At very high or extreme levels, minimizing time outdoors during the middle of the day is the most effective protection, since burning can occur in a matter of minutes.",
    ],
  },
  {
    slug: "celsius-vs-fahrenheit",
    title: "Celsius vs Fahrenheit",
    excerpt:
      "Two scales, one temperature — here's how they relate and quick ways to convert between them.",
    updated: "2026-01-10",
    headings: [
      { id: "origins", label: "Where the two scales come from" },
      { id: "conversion", label: "Converting between them" },
      { id: "reference-points", label: "Useful reference points" },
    ],
    body: [
      "## origins\nCelsius sets 0° at the freezing point of water and 100° at its boiling point at sea level, making it a naturally intuitive scale for most everyday weather. Fahrenheit, developed earlier, uses a different zero point and a finer-grained scale — water freezes at 32°F and boils at 212°F. Most of the world uses Celsius for weather; the United States is a notable exception that still uses Fahrenheit.",
      "## conversion\nThe exact formulas are °F = (°C × 9/5) + 32 and °C = (°F − 32) × 5/9. For a fast mental estimate, doubling a Celsius value and adding 30 gets you roughly close to Fahrenheit for everyday weather temperatures — accurate enough to decide what to wear, though not precise enough for scientific use.",
      "## reference-points\nA few points worth memorizing: 0°C (32°F) is freezing, 20°C (68°F) is a mild room temperature, 30°C (86°F) is a hot day, and 37°C (98.6°F) is normal human body temperature. WeatherIQ lets you switch the whole site between °C and °F at any time using the toggle in the header.",
    ],
  },
  {
    slug: "what-is-wind-chill",
    title: "What Is Wind Chill?",
    excerpt:
      "Wind makes cold air feel colder — wind chill is the number that captures how much colder.",
    updated: "2026-01-10",
    headings: [
      { id: "explained", label: "What wind chill measures" },
      { id: "why-it-matters", label: "Why it matters for safety" },
    ],
    body: [
      "## explained\nWind chill (often shown as part of a \"feels like\" temperature in cold conditions) estimates how cold moving air makes exposed skin feel compared to the actual air temperature. Wind strips away the thin layer of warm air your body naturally holds near your skin, speeding up heat loss — the stronger the wind, the faster that warm layer is carried away.",
      "## why-it-matters\nWind chill is particularly important for outdoor safety in freezing conditions, since it affects how quickly frostbite or hypothermia can develop on exposed skin, even if the actual air temperature alone wouldn't seem dangerous. It's a useful reminder that the thermometer reading alone doesn't always tell the full story of how conditions will actually feel.",
    ],
  },
  {
    slug: "what-does-rain-probability-mean",
    title: "What Does Rain Probability Mean?",
    excerpt:
      "A percentage chance of rain is one of the most misread numbers in any forecast.",
    updated: "2026-01-10",
    headings: [
      { id: "the-number", label: "What the percentage represents" },
      { id: "common-mistake", label: "The most common misreading" },
    ],
    body: [
      "## the-number\nRain probability combines two things forecasters assess separately: how confident they are that rain will develop at all, and how much of the forecast area is likely to see it. A 70% chance of rain generally reflects high confidence that measurable rain will occur somewhere in the area during that time window.",
      "## common-mistake\nThe most common misreading is assuming the percentage describes rain intensity or how long it will rain — it doesn't. A 90% chance of rain can still mean a brief shower, while a 30% chance can occasionally produce a heavier, more localized downpour if that lower-probability event does occur. Checking the hourly forecast alongside the daily percentage gives a clearer sense of timing.",
    ],
  },
  {
    slug: "how-to-understand-air-quality",
    title: "How to Understand Air Quality",
    excerpt:
      "AQI condenses several pollutants into one number — here's what it actually reflects.",
    updated: "2026-01-10",
    headings: [
      { id: "what-is-aqi", label: "What the index measures" },
      { id: "pollutants", label: "The pollutants behind the number" },
      { id: "sensitive-groups", label: "Who should pay closer attention" },
    ],
    body: [
      "## what-is-aqi\nAn Air Quality Index condenses measurements of several pollutants into a single scale so it's easy to judge air quality at a glance. Lower numbers mean cleaner air; as the index rises, health risk increases, first for sensitive groups and eventually for the general population at very high levels.",
      "## pollutants\nThe index is typically driven by whichever pollutant is currently highest relative to health guidelines — commonly fine particulate matter (PM2.5 and PM10), ground-level ozone, nitrogen dioxide, sulfur dioxide or carbon monoxide. PM2.5 in particular is small enough to be inhaled deep into the lungs, which is why it's weighted heavily in most air quality calculations.",
      "## sensitive-groups\nPeople with asthma or other respiratory conditions, older adults, children and pregnant people are generally more sensitive to elevated pollution levels and may want to reduce prolonged outdoor exertion sooner than the general population, even at \"moderate\" readings.",
    ],
  },
];

export const RELATED_GUIDES_BY_DEFAULT = [
  "how-to-read-a-weather-forecast",
  "what-does-humidity-mean",
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
