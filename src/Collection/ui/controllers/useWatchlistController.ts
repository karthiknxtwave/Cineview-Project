import { useMemo } from "react"
import { useObserver } from "mobx-react-lite"

import type {
  AddWatchlistEntryInput,
  MediaType,
  WatchlistEntry,
  WatchlistMediaRef,
  WatchlistStatus,
  WatchlistStatusCounts,
} from "../../core/types/Watchlist.types"
import { useWatchlistStore } from "../../data/providers"

export interface WatchlistController {
  entries: WatchlistEntry[]
  totalCount: number
  countByStatus: WatchlistStatusCounts
  isInWatchlist: (mediaType: MediaType, mediaId: number) => boolean
  getEntry: (ref: WatchlistMediaRef) => WatchlistEntry | undefined
  add: (input: AddWatchlistEntryInput) => void
  remove: (entryId: string) => void
  toggle: (input: AddWatchlistEntryInput) => void
  updateStatus: (entryId: string, status: WatchlistStatus) => void
}

export function useWatchlistController(): WatchlistController {
  const store = useWatchlistStore()

  const actions = useMemo(
    () => ({
      isInWatchlist: (mediaType: MediaType, mediaId: number) =>
        store.isInWatchlist(mediaType, mediaId),
      getEntry: (ref: WatchlistMediaRef) => store.getEntry(ref),
      add: (input: AddWatchlistEntryInput) => store.add(input),
      remove: (entryId: string) => store.remove(entryId),
      toggle: (input: AddWatchlistEntryInput) => store.toggle(input),
      updateStatus: (entryId: string, status: WatchlistStatus) =>
        store.updateStatus(entryId, status),
    }),
    [store],
  )

  const state = useObserver(() => ({
    entries: store.entries,
    totalCount: store.totalCount,
    countByStatus: store.countByStatus,
  }))

  return { ...state, ...actions }
}
