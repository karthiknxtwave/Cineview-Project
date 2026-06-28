import type {
  AppLanguage,
  AppRegion,
  AppTheme,
  LanguageOption,
  RegionOption,
  UserPreferences,
} from "../types/Preferences.types"

export const PREFERENCES_STORAGE_KEY = "cineview_preferences"

export const DEFAULT_LANGUAGE: AppLanguage = "en"

export const DEFAULT_THEME: AppTheme = "dark"

export const DEFAULT_REGION: AppRegion = "US"

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  language: DEFAULT_LANGUAGE,
  theme: DEFAULT_THEME,
  region: DEFAULT_REGION,
}

export const SUPPORTED_LANGUAGES: readonly LanguageOption[] = [
  { code: "en", label: "English", tmdbLanguage: "en-US" },
  { code: "es", label: "Español", tmdbLanguage: "es-ES" },
]

export const SUPPORTED_REGIONS: readonly RegionOption[] = [
  { code: "US", label: "United States" },
  { code: "GB", label: "United Kingdom" },
  { code: "IN", label: "India" },
  { code: "ES", label: "Spain" },
  { code: "FR", label: "France" },
  { code: "DE", label: "Germany" },
  { code: "CA", label: "Canada" },
  { code: "AU", label: "Australia" },
]
