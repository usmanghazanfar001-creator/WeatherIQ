"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Unit = "C" | "F";

interface UnitsContextValue {
  unit: Unit;
  toggleUnit: () => void;
  setUnit: (u: Unit) => void;
}

const UnitsContext = createContext<UnitsContextValue | null>(null);
const STORAGE_KEY = "weatheriq:unit";

export function UnitsProvider({ children }: { children: React.ReactNode }) {
  const [unit, setUnitState] = useState<Unit>("C");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Unit | null;
      if (stored === "C" || stored === "F") setUnitState(stored);
    } catch {
      // Ignore — default of Celsius stands.
    }
  }, []);

  const setUnit = (u: Unit) => {
    setUnitState(u);
    try {
      localStorage.setItem(STORAGE_KEY, u);
    } catch {
      // Ignore storage failures.
    }
  };

  const toggleUnit = () => setUnit(unit === "C" ? "F" : "C");

  return (
    <UnitsContext.Provider value={{ unit, toggleUnit, setUnit }}>
      {children}
    </UnitsContext.Provider>
  );
}

export function useUnits() {
  const ctx = useContext(UnitsContext);
  if (!ctx) throw new Error("useUnits must be used within UnitsProvider");
  return ctx;
}
