import { z } from "zod"

import {
  DEFAULT_WATCHLIST_STATE,
  MAX_WATCHLIST_NOTE_LENGTH,
} from "../constants/Watchlist.constants"

import type { WatchlistState } from "./Watchlist.types"

export const MediaTypeSchema = z.enum(["movie", "tv"])

export const WatchlistStatusSchema = z.enum([
  "want_to_watch",
  "watching",
  "completed",
])

export const WatchlistFilterSchema = z.enum([
  "all",
  "want_to_watch",
  "watching",
  "completed",
])

export const WatchlistSortOptionSchema = z.enum([
  "date_added",
  "rating",
  "title",
])

export const WatchlistMediaSnapshotSchema = z.object({
  title: z.string(),
  posterPath: z.string().nullable(),
  voteAverage: z.number(),
  year: z.string().nullable(),
  mediaType: MediaTypeSchema,
})

export const WatchlistEntrySchema = z.object({
  id: z.uuid(),
  mediaType: MediaTypeSchema,
  mediaId: z.number().int().positive(),
  status: WatchlistStatusSchema,
  note: z.string().max(MAX_WATCHLIST_NOTE_LENGTH).optional(),
  snapshot: WatchlistMediaSnapshotSchema,
  addedAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})

export const WatchlistStateSchema = z.object({
  entries: z.array(WatchlistEntrySchema),
})

export function parseWatchlistState(raw: string | null): WatchlistState {
  if (!raw) {
    return DEFAULT_WATCHLIST_STATE
  }

  try {
    const result = WatchlistStateSchema.safeParse(JSON.parse(raw))

    if (result.success) {
      return result.data
    }
  } catch {
    return DEFAULT_WATCHLIST_STATE
  }

  return DEFAULT_WATCHLIST_STATE
}

export function serializeWatchlistState(state: WatchlistState): string {
  return JSON.stringify(WatchlistStateSchema.parse(state))
}
