import { useEffect, useRef } from "react"

import type { TmdbLocaleParams } from "../../../Common/core/utils/TmdbParams.utils"

import { usePreferencesController } from "../controllers/usePreferencesController"

interface UsePreferenceChangeEffectOptions {
  onLocaleChange: () => void
  syncStoreLocale?: (locale: TmdbLocaleParams) => void
}

export function usePreferenceChangeEffect({
  onLocaleChange,
  syncStoreLocale,
}: UsePreferenceChangeEffectOptions) {
  const { language, region, tmdbLanguage, tmdbRegion } =
    usePreferencesController()
  const isInitialMount = useRef(true)

  useEffect(() => {
    syncStoreLocale?.({
      language: tmdbLanguage,
      region: tmdbRegion,
    })

    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    onLocaleChange()
  }, [
    language,
    region,
    tmdbLanguage,
    tmdbRegion,
    onLocaleChange,
    syncStoreLocale,
  ])
}
