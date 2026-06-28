import type { ThemeMode, ThemeTokens } from "../types/Theme.types"

const darkColors: ThemeTokens["colors"] = {
  pageBackground: "#0f172a",
  surface: "#111827",
  surfaceElevated: "#1e293b",
  surfaceMuted: "#1f2937",
  border: "#334155",
  borderStrong: "#64748b",
  textPrimary: "#f8fafc",
  textSecondary: "#cbd5e1",
  textMuted: "#94a3b8",
  textInverse: "#ffffff",
  primary: "#2563eb",
  primaryHover: "#1d4ed8",
  primaryActive: "#3b82f6",
  link: "#cbd5e1",
  linkActive: "#3b82f6",
  accent: "#93c5fd",
  danger: "#ef4444",
  dangerHover: "#dc2626",
  overlay: "rgba(15, 23, 42, 0.85)",
  heroGradientFrom: "#1e293b",
  heroGradientTo: "#0f172a",
  skeletonFrom: "#1e293b",
  skeletonTo: "#334155",
  scrollbarThumb: "#334155",
  focusRing: "rgba(59, 130, 246, 0.2)",
  inputBackground: "#0f172a",
  cardShadow: "0 20px 60px rgba(0, 0, 0, 0.45)",
}

const lightColors: ThemeTokens["colors"] = {
  pageBackground: "#f8fafc",
  surface: "#ffffff",
  surfaceElevated: "#f1f5f9",
  surfaceMuted: "#e2e8f0",
  border: "#cbd5e1",
  borderStrong: "#94a3b8",
  textPrimary: "#0f172a",
  textSecondary: "#334155",
  textMuted: "#64748b",
  textInverse: "#ffffff",
  primary: "#2563eb",
  primaryHover: "#1d4ed8",
  primaryActive: "#1d4ed8",
  link: "#334155",
  linkActive: "#2563eb",
  accent: "#1d4ed8",
  danger: "#ef4444",
  dangerHover: "#dc2626",
  overlay: "rgba(248, 250, 252, 0.92)",
  heroGradientFrom: "#dbeafe",
  heroGradientTo: "#f8fafc",
  skeletonFrom: "#e2e8f0",
  skeletonTo: "#cbd5e1",
  scrollbarThumb: "#cbd5e1",
  focusRing: "rgba(37, 99, 235, 0.2)",
  inputBackground: "#ffffff",
  cardShadow: "0 20px 60px rgba(15, 23, 42, 0.12)",
}

export const darkTheme: ThemeTokens = {
  mode: "dark",
  colors: darkColors,
}

export const lightTheme: ThemeTokens = {
  mode: "light",
  colors: lightColors,
}

export function resolveTheme(mode: ThemeMode): ThemeTokens {
  return mode === "light" ? lightTheme : darkTheme
}
