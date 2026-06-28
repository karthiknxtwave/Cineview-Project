import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import { SUPPORTED_LANGUAGES } from "../../core/constants/Preferences.constants"
import type { AppLanguage } from "../../core/types/Preferences.types"

import enCollection from "./locales/en/collection.json"
import enMovies from "./locales/en/movies.json"
import enPreferences from "./locales/en/preferences.json"
import enSearch from "./locales/en/search.json"
import esCollection from "./locales/es/collection.json"
import esMovies from "./locales/es/movies.json"
import esPreferences from "./locales/es/preferences.json"
import esSearch from "./locales/es/search.json"

export const I18N_NAMESPACES = [
  "movies",
  "search",
  "preferences",
  "collection",
] as const

export type I18nNamespace = (typeof I18N_NAMESPACES)[number]

const resources = {
  en: {
    movies: enMovies,
    search: enSearch,
    preferences: enPreferences,
    collection: enCollection,
  },
  es: {
    movies: esMovies,
    search: esSearch,
    preferences: esPreferences,
    collection: esCollection,
  },
} as const

export function initI18n(language: AppLanguage = "en") {
  if (i18n.isInitialized) {
    void i18n.changeLanguage(language)
    return i18n
  }

  void i18n.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGUAGES.map(option => option.code),
    ns: [...I18N_NAMESPACES],
    defaultNS: "movies",
    interpolation: {
      escapeValue: false,
    },
  })

  return i18n
}

export async function changeAppLanguage(language: AppLanguage) {
  if (!i18n.isInitialized) {
    return
  }

  await i18n.changeLanguage(language)
}

export { i18n }
