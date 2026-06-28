import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import {
  DEFAULT_WATCHLIST_STATE,
  WATCHLIST_STORAGE_KEY,
} from "../../../core/constants/Watchlist.constants"
import { serializeWatchlistState } from "../../../core/types/Watchlist.zod"

import type { WatchlistMediaSnapshot } from "../../../core/types/Watchlist.types"

import { WatchlistStore } from "./index"

const movieSnapshot: WatchlistMediaSnapshot = {
  title: "Inception",
  posterPath: "/poster.jpg",
  voteAverage: 8.8,
  year: "2010",
  mediaType: "movie",
}

const tvSnapshot: WatchlistMediaSnapshot = {
  title: "Breaking Bad",
  posterPath: "/tv-poster.jpg",
  voteAverage: 9.5,
  year: "2008",
  mediaType: "tv",
}

const TEST_ENTRY_ID = "00000000-0000-4000-8000-000000000001"

describe("WatchlistStore", () => {
  beforeEach(() => {
    localStorage.clear()

    let uuidCounter = 0

    vi.stubGlobal("crypto", {
      randomUUID: vi.fn(() => {
        uuidCounter += 1

        return `00000000-0000-4000-8000-${String(uuidCounter).padStart(12, "0")}`
      }),
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it("initializes with an empty watchlist when localStorage is empty", () => {
    const store = new WatchlistStore()

    store.initialize()

    expect(store.entries).toEqual([])
    expect(store.totalCount).toBe(0)
  })

  it("loads valid watchlist data from localStorage", () => {
    localStorage.setItem(
      WATCHLIST_STORAGE_KEY,
      serializeWatchlistState({
        entries: [
          {
            id: TEST_ENTRY_ID,
            mediaType: "movie",
            mediaId: 27205,
            status: "want_to_watch",
            snapshot: movieSnapshot,
            addedAt: "2026-01-01T00:00:00.000Z",
            updatedAt: "2026-01-01T00:00:00.000Z",
          },
        ],
      }),
    )

    const store = new WatchlistStore()

    store.initialize()

    expect(store.totalCount).toBe(1)
    expect(store.entries[0]?.mediaId).toBe(27205)
  })

  it("falls back to an empty watchlist when stored data is invalid", () => {
    localStorage.setItem(WATCHLIST_STORAGE_KEY, '{"entries":[{"id":"bad"}]}')

    const store = new WatchlistStore()

    store.initialize()

    expect(store.entries).toEqual(DEFAULT_WATCHLIST_STATE.entries)
  })

  it("adds an entry with default want_to_watch status and persists", () => {
    const store = new WatchlistStore()

    store.initialize()
    store.add({
      mediaType: "movie",
      mediaId: 27205,
      snapshot: movieSnapshot,
    })

    expect(store.totalCount).toBe(1)
    expect(store.entries[0]?.status).toBe("want_to_watch")
    expect(store.isInWatchlist("movie", 27205)).toBe(true)

    const stored = JSON.parse(
      localStorage.getItem(WATCHLIST_STORAGE_KEY) ?? "{}",
    )

    expect(stored.entries).toHaveLength(1)
    expect(stored.entries[0].mediaId).toBe(27205)
  })

  it("does not add duplicate entries for the same media reference", () => {
    const store = new WatchlistStore()

    store.initialize()
    store.add({
      mediaType: "movie",
      mediaId: 27205,
      snapshot: movieSnapshot,
    })
    store.add({
      mediaType: "movie",
      mediaId: 27205,
      snapshot: movieSnapshot,
    })

    expect(store.totalCount).toBe(1)
  })

  it("removes an entry and persists the change", () => {
    const store = new WatchlistStore()

    store.initialize()
    store.add({
      mediaType: "movie",
      mediaId: 27205,
      snapshot: movieSnapshot,
    })
    store.remove(store.entries[0]?.id ?? "")

    expect(store.totalCount).toBe(0)
    expect(localStorage.getItem(WATCHLIST_STORAGE_KEY)).toBe(
      serializeWatchlistState({ entries: [] }),
    )
  })

  it("toggles an entry off when it already exists", () => {
    const store = new WatchlistStore()

    store.initialize()
    store.toggle({
      mediaType: "movie",
      mediaId: 27205,
      snapshot: movieSnapshot,
    })
    store.toggle({
      mediaType: "movie",
      mediaId: 27205,
      snapshot: movieSnapshot,
    })

    expect(store.totalCount).toBe(0)
  })

  it("updates entry status and persists", () => {
    const store = new WatchlistStore()

    store.initialize()
    store.add({
      mediaType: "movie",
      mediaId: 27205,
      snapshot: movieSnapshot,
    })

    const entryId = store.entries[0]?.id ?? ""

    store.updateStatus(entryId, "watching")

    expect(store.entries[0]?.status).toBe("watching")

    const stored = JSON.parse(
      localStorage.getItem(WATCHLIST_STORAGE_KEY) ?? "{}",
    )

    expect(stored.entries[0].status).toBe("watching")
  })

  it("computes countByStatus from entries", () => {
    const store = new WatchlistStore()

    store.initialize()
    store.add({
      mediaType: "movie",
      mediaId: 1,
      snapshot: movieSnapshot,
      status: "want_to_watch",
    })
    store.add({
      mediaType: "movie",
      mediaId: 2,
      snapshot: { ...movieSnapshot, title: "Movie 2" },
      status: "watching",
    })
    store.add({
      mediaType: "tv",
      mediaId: 3,
      snapshot: tvSnapshot,
      status: "completed",
    })

    expect(store.countByStatus).toEqual({
      want_to_watch: 1,
      watching: 1,
      completed: 1,
    })
  })

  it("does not re-initialize after the first initialize call", () => {
    localStorage.setItem(
      WATCHLIST_STORAGE_KEY,
      serializeWatchlistState({
        entries: [
          {
            id: TEST_ENTRY_ID,
            mediaType: "movie",
            mediaId: 27205,
            status: "want_to_watch",
            snapshot: movieSnapshot,
            addedAt: "2026-01-01T00:00:00.000Z",
            updatedAt: "2026-01-01T00:00:00.000Z",
          },
        ],
      }),
    )

    const store = new WatchlistStore()

    store.initialize()
    store.remove(TEST_ENTRY_ID)
    store.initialize()

    expect(store.totalCount).toBe(0)
  })
})
