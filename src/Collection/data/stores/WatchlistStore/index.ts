import { makeAutoObservable, runInAction } from "mobx"

import {
  DEFAULT_WATCHLIST_STATUS,
  WATCHLIST_STORAGE_KEY,
} from "../../../core/constants/Watchlist.constants"

import {
  parseWatchlistState,
  serializeWatchlistState,
} from "../../../core/types/Watchlist.zod"

import type {
  AddWatchlistEntryInput,
  MediaType,
  WatchlistEntry,
  WatchlistMediaRef,
  WatchlistMediaSnapshot,
  WatchlistStatus,
} from "../../../core/types/Watchlist.types"

export class WatchlistStore {
  entries: WatchlistEntry[] = []

  private initialized = false

  constructor() {
    makeAutoObservable(this)
  }

  get totalCount(): number {
    return this.entries.length
  }

  get countByStatus(): Record<WatchlistStatus, number> {
    return {
      want_to_watch: this.entries.filter(entry => entry.status === "want_to_watch")
        .length,
      watching: this.entries.filter(entry => entry.status === "watching").length,
      completed: this.entries.filter(entry => entry.status === "completed").length,
    }
  }

  initialize(): void {
    if (this.initialized) {
      return
    }

    const storedState = localStorage.getItem(WATCHLIST_STORAGE_KEY)
    const state = parseWatchlistState(storedState)

    runInAction(() => {
      this.entries = state.entries
    })

    this.initialized = true
  }

  isInWatchlist(mediaType: MediaType, mediaId: number): boolean {
    return this.getEntry({ mediaType, mediaId }) !== undefined
  }

  getEntry(ref: WatchlistMediaRef): WatchlistEntry | undefined {
    return this.entries.find(
      entry => entry.mediaType === ref.mediaType && entry.mediaId === ref.mediaId,
    )
  }

  add(input: AddWatchlistEntryInput): void {
    if (this.isInWatchlist(input.mediaType, input.mediaId)) {
      return
    }

    const now = new Date().toISOString()

    const entry: WatchlistEntry = {
      id: crypto.randomUUID(),
      mediaType: input.mediaType,
      mediaId: input.mediaId,
      status: input.status ?? DEFAULT_WATCHLIST_STATUS,
      snapshot: input.snapshot,
      addedAt: now,
      updatedAt: now,
    }

    this.entries.push(entry)
    this.persist()
  }

  remove(entryId: string): void {
    const index = this.entries.findIndex(entry => entry.id === entryId)

    if (index === -1) {
      return
    }

    this.entries.splice(index, 1)
    this.persist()
  }

  removeByMediaRef(ref: WatchlistMediaRef): void {
    const entry = this.getEntry(ref)

    if (entry) {
      this.remove(entry.id)
    }
  }

  toggle(input: AddWatchlistEntryInput): void {
    if (this.isInWatchlist(input.mediaType, input.mediaId)) {
      this.removeByMediaRef({
        mediaType: input.mediaType,
        mediaId: input.mediaId,
      })
      return
    }

    this.add(input)
  }

  updateStatus(entryId: string, status: WatchlistStatus): void {
    const entry = this.entries.find(item => item.id === entryId)

    if (!entry) {
      return
    }

    entry.status = status
    entry.updatedAt = new Date().toISOString()
    this.persist()
  }

  updateNote(entryId: string, note: string | undefined): void {
    const entry = this.entries.find(item => item.id === entryId)

    if (!entry) {
      return
    }

    entry.note = note
    entry.updatedAt = new Date().toISOString()
    this.persist()
  }

  updateSnapshot(
    ref: WatchlistMediaRef,
    snapshot: WatchlistMediaSnapshot,
  ): void {
    const entry = this.getEntry(ref)

    if (!entry) {
      return
    }

    entry.snapshot = snapshot
    entry.updatedAt = new Date().toISOString()
    this.persist()
  }

  private persist(): void {
    localStorage.setItem(
      WATCHLIST_STORAGE_KEY,
      serializeWatchlistState({ entries: this.entries }),
    )
  }
}
