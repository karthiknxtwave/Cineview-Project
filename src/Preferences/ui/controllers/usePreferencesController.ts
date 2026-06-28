import { useMemo } from "react"
import { useObserver } from "mobx-react-lite"

import { SUPPORTED_LANGUAGES, SUPPORTED_REGIONS } from "../../core/constants/Preferences.constants"

import type {
  AppLanguage,
  AppRegion,
  AppTheme,
  LanguageOption,
  RegionOption,
} from "../../core/types/Preferences.types"
import { usePreferencesStore } from "../../data/providers"

export interface PreferencesController {
  language: AppLanguage
  theme: AppTheme
  region: AppRegion
  tmdbLanguage: string
  tmdbRegion: AppRegion
  supportedLanguages: readonly LanguageOption[]
  supportedRegions: readonly RegionOption[]
  setLanguage: (language: AppLanguage) => void
  setTheme: (theme: AppTheme) => void
  setRegion: (region: AppRegion) => void
}

export function usePreferencesController(): PreferencesController {
  const store = usePreferencesStore()

  const actions = useMemo(
    () => ({
      setLanguage: (language: AppLanguage) => store.setLanguage(language),
      setTheme: (theme: AppTheme) => store.setTheme(theme),
      setRegion: (region: AppRegion) => store.setRegion(region),
    }),
    [store],
  )

  const state = useObserver(() => ({
    language: store.language,
    theme: store.theme,
    region: store.region,
    tmdbLanguage: store.tmdbLanguage,
    tmdbRegion: store.tmdbRegion,
    supportedLanguages: SUPPORTED_LANGUAGES,
    supportedRegions: SUPPORTED_REGIONS,
  }))

  return { ...state, ...actions }
}
