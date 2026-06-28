import { makeAutoObservable, runInAction } from "mobx"

import {
  DEFAULT_LANGUAGE,
  DEFAULT_REGION,
  DEFAULT_THEME,
  PREFERENCES_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
} from "../../../core/constants/Preferences.constants"

import {
  parseUserPreferences,
  serializeUserPreferences,
} from "../../../core/types/Preferences.zod"

import { changeAppLanguage } from "../../i18n"

import type {
  AppLanguage,
  AppRegion,
  AppTheme,
} from "../../../core/types/Preferences.types"

export class PreferencesStore {
  language: AppLanguage = DEFAULT_LANGUAGE

  theme: AppTheme = DEFAULT_THEME

  region: AppRegion = DEFAULT_REGION

  private initialized = false

  constructor() {
    makeAutoObservable(this)
  }

  get tmdbLanguage(): string {
    return (
      SUPPORTED_LANGUAGES.find(option => option.code === this.language)
        ?.tmdbLanguage ?? "en-US"
    )
  }

  get tmdbRegion(): AppRegion {
    return this.region
  }

  initialize(): void {
    if (this.initialized) {
      return
    }

    const storedPreferences = localStorage.getItem(PREFERENCES_STORAGE_KEY)

    if (storedPreferences === null) {
      runInAction(() => {
        this.language = DEFAULT_LANGUAGE
        this.region = DEFAULT_REGION
        this.theme = this.getSystemTheme()
      })
      this.persist()
    } else {
      const preferences = parseUserPreferences(storedPreferences)

      runInAction(() => {
        this.language = preferences.language
        this.theme = preferences.theme
        this.region = preferences.region
      })
    }

    this.initialized = true
  }

  setLanguage(language: AppLanguage): void {
    this.language = language
    this.persist()
    void changeAppLanguage(language)
  }

  setTheme(theme: AppTheme): void {
    this.theme = theme
    this.persist()
  }

  setRegion(region: AppRegion): void {
    this.region = region
    this.persist()
  }

  private getSystemTheme(): AppTheme {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return DEFAULT_THEME
    }

    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark"
  }

  private persist(): void {
    localStorage.setItem(
      PREFERENCES_STORAGE_KEY,
      serializeUserPreferences({
        language: this.language,
        theme: this.theme,
        region: this.region,
      }),
    )
  }
}
