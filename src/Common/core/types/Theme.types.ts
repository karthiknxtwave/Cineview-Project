export type ThemeMode = "light" | "dark"

export interface ThemeColors {
  pageBackground: string
  surface: string
  surfaceElevated: string
  surfaceMuted: string
  border: string
  borderStrong: string
  textPrimary: string
  textSecondary: string
  textMuted: string
  textInverse: string
  primary: string
  primaryHover: string
  primaryActive: string
  link: string
  linkActive: string
  accent: string
  danger: string
  dangerHover: string
  overlay: string
  heroGradientFrom: string
  heroGradientTo: string
  skeletonFrom: string
  skeletonTo: string
  scrollbarThumb: string
  focusRing: string
  inputBackground: string
  cardShadow: string
}

export interface ThemeTokens {
  mode: ThemeMode
  colors: ThemeColors
}

declare module "styled-components" {
  export interface DefaultTheme extends ThemeTokens {}
}
