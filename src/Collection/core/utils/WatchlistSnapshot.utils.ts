import type { MovieDetails, MovieSummary } from "../../../Movies"
import type { TVShowDetails } from "../../../TVShows"

import type { WatchlistMediaSnapshot } from "../types/Watchlist.types"

function extractYear(date: string | undefined): string | null {
  if (!date) {
    return null
  }

  const year = date.slice(0, 4)

  return year.length === 4 ? year : null
}

export function createMovieWatchlistSnapshot(
  movie: MovieSummary | MovieDetails,
): WatchlistMediaSnapshot {
  return {
    title: movie.title,
    posterPath: movie.poster_path,
    voteAverage: movie.vote_average,
    year: extractYear(movie.release_date),
    mediaType: "movie",
  }
}

export function createTvShowWatchlistSnapshot(
  show: TVShowDetails,
): WatchlistMediaSnapshot {
  return {
    title: show.name,
    posterPath: show.poster_path,
    voteAverage: show.vote_average,
    year: extractYear(show.first_air_date),
    mediaType: "tv",
  }
}

export function createTvShowSummaryWatchlistSnapshot(show: {
  id: number
  name: string
  poster_path: string | null
  vote_average: number
  first_air_date?: string
}): WatchlistMediaSnapshot {
  return {
    title: show.name,
    posterPath: show.poster_path,
    voteAverage: show.vote_average,
    year: extractYear(show.first_air_date),
    mediaType: "tv",
  }
}

export function createSearchResultWatchlistSnapshot(result: {
  media_type: "movie"
  title: string
  poster_path: string | null
  vote_average: number
  release_date?: string
}): WatchlistMediaSnapshot
export function createSearchResultWatchlistSnapshot(result: {
  media_type: "tv"
  name: string
  poster_path: string | null
  vote_average: number
  first_air_date?: string
}): WatchlistMediaSnapshot
export function createSearchResultWatchlistSnapshot(
  result:
    | {
        media_type: "movie"
        title: string
        poster_path: string | null
        vote_average: number
        release_date?: string
      }
    | {
        media_type: "tv"
        name: string
        poster_path: string | null
        vote_average: number
        first_air_date?: string
      },
): WatchlistMediaSnapshot {
  if (result.media_type === "movie") {
    return {
      title: result.title,
      posterPath: result.poster_path,
      voteAverage: result.vote_average,
      year: extractYear(result.release_date),
      mediaType: "movie",
    }
  }

  return {
    title: result.name,
    posterPath: result.poster_path,
    voteAverage: result.vote_average,
    year: extractYear(result.first_air_date),
    mediaType: "tv",
  }
}
