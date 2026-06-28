import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import {
  DEFAULT_LANGUAGE,
  DEFAULT_REGION,
  DEFAULT_USER_PREFERENCES,
  PREFERENCES_STORAGE_KEY,
} from "../../../core/constants/Preferences.constants"
import { serializeUserPreferences } from "../../../core/types/Preferences.zod"

import { PreferencesStore } from "./index"

function mockMatchMedia(prefersLight: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches:
        query === "(prefers-color-scheme: light)" ? prefersLight : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

describe("PreferencesStore", () => {
  beforeEach(() => {
    localStorage.clear()
    mockMatchMedia(false)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("uses OS dark theme on first load when no saved preferences exist", () => {
    const store = new PreferencesStore()

    store.initialize()

    expect(store.language).toBe(DEFAULT_LANGUAGE)
    expect(store.region).toBe(DEFAULT_REGION)
    expect(store.theme).toBe("dark")
    expect(localStorage.getItem(PREFERENCES_STORAGE_KEY)).toBe(
      serializeUserPreferences({
        language: DEFAULT_LANGUAGE,
        theme: "dark",
        region: DEFAULT_REGION,
      }),
    )
  })

  it("uses OS light theme on first load when the system prefers light", () => {
    mockMatchMedia(true)

    const store = new PreferencesStore()

    store.initialize()

    expect(store.theme).toBe("light")
  })

  it("loads valid preferences from localStorage", () => {
    localStorage.setItem(
      PREFERENCES_STORAGE_KEY,
      serializeUserPreferences({
        language: "es",
        theme: "light",
        region: "ES",
      }),
    )

    const store = new PreferencesStore()

    store.initialize()

    expect(store.language).toBe("es")
    expect(store.theme).toBe("light")
    expect(store.region).toBe("ES")
  })

  it("falls back to defaults when stored preferences are invalid", () => {
    localStorage.setItem(PREFERENCES_STORAGE_KEY, '{"language":"invalid"}')

    const store = new PreferencesStore()

    store.initialize()

    expect(store.language).toBe(DEFAULT_USER_PREFERENCES.language)
    expect(store.theme).toBe(DEFAULT_USER_PREFERENCES.theme)
    expect(store.region).toBe(DEFAULT_USER_PREFERENCES.region)
  })

  it("persists language changes to localStorage", () => {
    const store = new PreferencesStore()

    store.initialize()
    store.setLanguage("es")

    const stored = JSON.parse(
      localStorage.getItem(PREFERENCES_STORAGE_KEY) ?? "{}",
    )

    expect(store.language).toBe("es")
    expect(stored.language).toBe("es")
    expect(store.tmdbLanguage).toBe("es-ES")
  })

  it("persists theme changes to localStorage", () => {
    const store = new PreferencesStore()

    store.initialize()
    store.setTheme("light")

    const stored = JSON.parse(
      localStorage.getItem(PREFERENCES_STORAGE_KEY) ?? "{}",
    )

    expect(store.theme).toBe("light")
    expect(stored.theme).toBe("light")
  })

  it("persists region changes to localStorage", () => {
    const store = new PreferencesStore()

    store.initialize()
    store.setRegion("IN")

    const stored = JSON.parse(
      localStorage.getItem(PREFERENCES_STORAGE_KEY) ?? "{}",
    )

    expect(store.region).toBe("IN")
    expect(stored.region).toBe("IN")
    expect(store.tmdbRegion).toBe("IN")
  })

  it("does not re-initialize after the first initialize call", () => {
    localStorage.setItem(
      PREFERENCES_STORAGE_KEY,
      serializeUserPreferences({
        language: "es",
        theme: "light",
        region: "ES",
      }),
    )

    const store = new PreferencesStore()

    store.initialize()
    store.setLanguage("en")
    store.initialize()

    expect(store.language).toBe("en")
  })
})
