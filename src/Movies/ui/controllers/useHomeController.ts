import { useMemo } from 'react'
import { useObserver } from 'mobx-react-lite'

import type { Genre, MovieSummary } from '../../core/types/Movie.types'
import { useHomeStore } from '../../data/providers'

type RowKey = 'trending' | 'popular' | 'topRated' | 'upcoming'
type FetchStatus = 'idle' | 'loading' | 'success' | 'error'

export interface HomeController {
  movies: Record<RowKey, MovieSummary[]>
  rowStatus: Record<RowKey, FetchStatus>
  rowFilteredEmpty: Record<RowKey, boolean>
  genres: Genre[]
  genresStatus: FetchStatus
  selectedGenre: number | null
  featuredMovie: MovieSummary | undefined
  loading: boolean
  heroLoading: boolean
  error: boolean
  actions: {
    fetchHomeData: () => Promise<void>
    fetchRow: (key: RowKey) => Promise<void>
    fetchGenres: () => Promise<void>
    selectGenre: (genreId: number | null) => void
  }
}

export function useHomeController(): HomeController {
  const store = useHomeStore()

  const actions = useMemo(
    () => ({
      fetchHomeData: () => store.fetchHomeData(),
      fetchRow: (key: RowKey) => {
        switch (key) {
          case 'trending':
            return store.fetchTrending()
          case 'popular':
            return store.fetchPopular()
          case 'topRated':
            return store.fetchTopRated()
          case 'upcoming':
            return store.fetchUpcoming()
        }
      },
      fetchGenres: () => store.fetchGenres(),
      selectGenre: (genreId: number | null) => store.selectGenre(genreId),
    }),
    [store],
  )

  const state = useObserver(() => ({
    movies: {
      trending: store.filteredTrending,
      popular: store.filteredPopular,
      topRated: store.filteredTopRated,
      upcoming: store.filteredUpcoming,
    },
    rowStatus: {
      trending: store.trendingStatus,
      popular: store.popularStatus,
      topRated: store.topRatedStatus,
      upcoming: store.upcomingStatus,
    },
    rowFilteredEmpty: {
      trending: store.isRowFilteredEmpty('trending'),
      popular: store.isRowFilteredEmpty('popular'),
      topRated: store.isRowFilteredEmpty('topRated'),
      upcoming: store.isRowFilteredEmpty('upcoming'),
    },
    genres: store.genres,
    genresStatus: store.genresStatus,
    selectedGenre: store.selectedGenre,
    featuredMovie: store.featuredMovie,
    loading: store.isInitialLoading,
    heroLoading: store.isHeroLoading,
    error:
      store.trendingStatus === 'error' &&
      store.popularStatus === 'error' &&
      store.topRatedStatus === 'error' &&
      store.upcomingStatus === 'error',
  }))

  return { ...state, actions }
}
