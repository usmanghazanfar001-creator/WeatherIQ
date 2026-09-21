import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://weatheriq.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "WeatherIQ — Accurate Weather Forecasts for Every Location",
    template: "%s | WeatherIQ",
  },
  description:
    "Check current conditions, hourly forecasts, upcoming weather, air quality and detailed weather information for locations around the world.",
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "WeatherIQ",
    title: "WeatherIQ — Accurate Weather Forecasts for Every Location",
    description:
      "Check current conditions, hourly forecasts, upcoming weather, air quality and detailed weather information for locations around the world.",
  },
  twitter: {
    card: "summary",
    title: "WeatherIQ — Accurate Weather Forecasts for Every Location",
    description:
      "Check current conditions, hourly forecasts, upcoming weather, air quality and detailed weather information for locations around the world.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <AppProviders>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
