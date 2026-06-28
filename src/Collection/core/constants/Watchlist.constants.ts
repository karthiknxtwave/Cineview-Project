import type {
  WatchlistFilter,
  WatchlistSortOption,
  WatchlistState,
  WatchlistStatus,
} from "../types/Watchlist.types"

export const WATCHLIST_STORAGE_KEY = "cineview_watchlist"

export const DEFAULT_WATCHLIST_STATUS: WatchlistStatus = "want_to_watch"

export const MAX_WATCHLIST_NOTE_LENGTH = 300

export const WATCHLIST_STATUSES: readonly WatchlistStatus[] = [
  "want_to_watch",
  "watching",
  "completed",
]

export const WATCHLIST_FILTERS: readonly WatchlistFilter[] = [
  "all",
  "want_to_watch",
  "watching",
  "completed",
]

export const WATCHLIST_SORT_OPTIONS: readonly WatchlistSortOption[] = [
  "date_added",
  "rating",
  "title",
]

export const DEFAULT_WATCHLIST_SORT: WatchlistSortOption = "date_added"

export const DEFAULT_WATCHLIST_STATE: WatchlistState = {
  entries: [],
}
