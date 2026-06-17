import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Theme = "light" | "dark";
type ColorPalette = "default" | "emerald" | "sky" | "rose" | "violet";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  colorPalette: ColorPalette;
  setColorPalette: (p: ColorPalette) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem("campuslink_theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const [colorPalette, setColorPaletteState] = useState<ColorPalette>(() => {
    const stored = localStorage.getItem("campuslink_palette");
    return (stored as ColorPalette) || "default";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("campuslink_theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme-color", colorPalette);
    localStorage.setItem("campuslink_palette", colorPalette);
  }, [colorPalette]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () => setThemeState(prev => prev === "light" ? "dark" : "light");
  const setColorPalette = (p: ColorPalette) => setColorPaletteState(p);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, colorPalette, setColorPalette }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
