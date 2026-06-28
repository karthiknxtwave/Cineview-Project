import { useCallback, useMemo, useState } from "react"
import { useObserver } from "mobx-react-lite"

import { DEFAULT_WATCHLIST_SORT } from "../../core/constants/Watchlist.constants"

import type {
  WatchlistEntry,
  WatchlistFilter,
  WatchlistSortOption,
  WatchlistStatus,
} from "../../core/types/Watchlist.types"

import { useWatchlistController } from "./useWatchlistController"

export interface WatchlistPageController {
  filteredEntries: WatchlistEntry[]
  activeFilter: WatchlistFilter
  sortOption: WatchlistSortOption
  counts: Record<WatchlistFilter, number>
  isEmpty: boolean
  isFilteredEmpty: boolean
  setActiveFilter: (filter: WatchlistFilter) => void
  setSortOption: (option: WatchlistSortOption) => void
  handleStatusChange: (entryId: string, status: WatchlistStatus) => void
  handleRemove: (entryId: string) => void
}

function sortEntries(
  entries: WatchlistEntry[],
  sortOption: WatchlistSortOption,
): WatchlistEntry[] {
  const sorted = [...entries]

  switch (sortOption) {
    case "date_added":
      sorted.sort((left, right) => right.addedAt.localeCompare(left.addedAt))
      break
    case "rating":
      sorted.sort(
        (left, right) =>
          right.snapshot.voteAverage - left.snapshot.voteAverage,
      )
      break
    case "title":
      sorted.sort((left, right) =>
        left.snapshot.title.localeCompare(right.snapshot.title, undefined, {
          sensitivity: "base",
        }),
      )
      break
  }

  return sorted
}

function filterEntries(
  entries: WatchlistEntry[],
  activeFilter: WatchlistFilter,
): WatchlistEntry[] {
  if (activeFilter === "all") {
    return entries
  }

  return entries.filter(entry => entry.status === activeFilter)
}

export function useWatchlistPageController(): WatchlistPageController {
  const watchlist = useWatchlistController()
  const [activeFilter, setActiveFilter] = useState<WatchlistFilter>("all")
  const [sortOption, setSortOption] =
    useState<WatchlistSortOption>(DEFAULT_WATCHLIST_SORT)

  const pageState = useObserver(() => {
    const counts: Record<WatchlistFilter, number> = {
      all: watchlist.totalCount,
      want_to_watch: watchlist.countByStatus.want_to_watch,
      watching: watchlist.countByStatus.watching,
      completed: watchlist.countByStatus.completed,
    }

    const filtered = filterEntries(watchlist.entries, activeFilter)
    const filteredEntries = sortEntries(filtered, sortOption)

    return {
      filteredEntries,
      counts,
      isEmpty: watchlist.totalCount === 0,
      isFilteredEmpty:
        watchlist.totalCount > 0 && filteredEntries.length === 0,
    }
  })

  const handleStatusChange = useCallback(
    (entryId: string, status: WatchlistStatus) => {
      watchlist.updateStatus(entryId, status)
    },
    [watchlist],
  )

  const handleRemove = useCallback(
    (entryId: string) => {
      watchlist.remove(entryId)
    },
    [watchlist],
  )

  return useMemo(
    () => ({
      ...pageState,
      activeFilter,
      sortOption,
      setActiveFilter,
      setSortOption,
      handleStatusChange,
      handleRemove,
    }),
    [
      pageState,
      activeFilter,
      sortOption,
      handleStatusChange,
      handleRemove,
    ],
  )
}
