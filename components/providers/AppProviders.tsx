"use client";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { UnitsProvider } from "@/components/providers/UnitsProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <UnitsProvider>{children}</UnitsProvider>
    </ThemeProvider>
  );
}
