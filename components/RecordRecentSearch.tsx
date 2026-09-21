"use client";

import { useEffect } from "react";
import type { LocationInfo } from "@/types/weather";
import { addRecentSearch } from "@/lib/utils/storage";

export function RecordRecentSearch({ location }: { location: LocationInfo }) {
  useEffect(() => {
    addRecentSearch(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.slug]);

  return null;
}
