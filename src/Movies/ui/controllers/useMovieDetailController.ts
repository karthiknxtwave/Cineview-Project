import { useMemo } from 'react'
import { useObserver } from 'mobx-react-lite'

import { useMovieDetailStore } from '../../data/movieDetailProviders'

export function useMovieDetailController() {
  const store = useMovieDetailStore()

  const actions = useMemo(
    () => ({
      fetchAll: (movieId: number) => store.fetchAll(movieId),
      fetchDetails: (movieId: number) => store.fetchDetails(movieId),
      fetchCast: (movieId: number) => store.fetchCast(movieId),
      fetchSimilar: (movieId: number) => store.fetchSimilar(movieId),
      fetchRecommendations: (movieId: number) =>
        store.fetchRecommendations(movieId),
      fetchVideos: (movieId: number) => store.fetchVideos(movieId),
    }),
    [store],
  )

  const state = useObserver(() => ({
    movie: store.movie,
    cast: store.cast,
    similarMovies: store.similarMovies,
    recommendedMovies: store.recommendedMovies,
    trailerKey: store.trailerKey,
    detailsStatus: store.detailsStatus,
    castStatus: store.castStatus,
    similarStatus: store.similarStatus,
    recommendationsStatus: store.recommendationsStatus,
    videosStatus: store.videosStatus,
  }))

  return { ...state, actions }
}
