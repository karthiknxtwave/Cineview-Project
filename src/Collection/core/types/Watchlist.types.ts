export type MediaType = "movie" | "tv"

export type WatchlistStatus = "want_to_watch" | "watching" | "completed"

export type WatchlistFilter = "all" | WatchlistStatus

export type WatchlistSortOption = "date_added" | "rating" | "title"

export interface WatchlistMediaSnapshot {
  title: string
  posterPath: string | null
  voteAverage: number
  year: string | null
  mediaType: MediaType
}

export interface WatchlistEntry {
  id: string
  mediaType: MediaType
  mediaId: number
  status: WatchlistStatus
  note?: string
  snapshot: WatchlistMediaSnapshot
  addedAt: string
  updatedAt: string
}

export interface WatchlistState {
  entries: WatchlistEntry[]
}

export interface AddWatchlistEntryInput {
  mediaType: MediaType
  mediaId: number
  snapshot: WatchlistMediaSnapshot
  status?: WatchlistStatus
}

export interface WatchlistMediaRef {
  mediaType: MediaType
  mediaId: number
}

export type WatchlistStatusCounts = Record<WatchlistStatus, number>
