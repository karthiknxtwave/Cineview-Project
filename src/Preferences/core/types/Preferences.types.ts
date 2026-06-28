export type AppLanguage = "en" | "es"

export type AppTheme = "light" | "dark"

export type AppRegion =
  | "US"
  | "GB"
  | "IN"
  | "ES"
  | "FR"
  | "DE"
  | "CA"
  | "AU"

export interface UserPreferences {
  language: AppLanguage
  theme: AppTheme
  region: AppRegion
}

export interface LanguageOption {
  code: AppLanguage
  label: string
  tmdbLanguage: string
}

export interface RegionOption {
  code: AppRegion
  label: string
}
