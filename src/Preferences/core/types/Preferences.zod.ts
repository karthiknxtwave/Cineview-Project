import { z } from "zod"

import { DEFAULT_USER_PREFERENCES } from "../constants/Preferences.constants"

import type { UserPreferences } from "./Preferences.types"

export const AppLanguageSchema = z.enum(["en", "es"])

export const AppThemeSchema = z.enum(["light", "dark"])

export const AppRegionSchema = z.enum([
  "US",
  "GB",
  "IN",
  "ES",
  "FR",
  "DE",
  "CA",
  "AU",
])

export const UserPreferencesSchema = z.object({
  language: AppLanguageSchema,
  theme: AppThemeSchema,
  region: AppRegionSchema,
})

export function parseUserPreferences(raw: string | null): UserPreferences {
  if (!raw) {
    return DEFAULT_USER_PREFERENCES
  }

  try {
    const result = UserPreferencesSchema.safeParse(JSON.parse(raw))

    if (result.success) {
      return result.data
    }
  } catch {
    return DEFAULT_USER_PREFERENCES
  }

  return DEFAULT_USER_PREFERENCES
}

export function serializeUserPreferences(
  preferences: UserPreferences,
): string {
  return JSON.stringify(UserPreferencesSchema.parse(preferences))
}
