import { useCallback, useState } from 'react'

import { getYouTubeTrailerKey } from '../../core/utils/Video.utils'
import { MoviesService } from '../../data/services/MoviesService'

type TrailerStatus = 'idle' | 'loading' | 'success' | 'error'

export function useTrailerModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [trailerKey, setTrailerKey] = useState<string | null>(null)
  const [status, setStatus] = useState<TrailerStatus>('idle')
  const [movieId, setMovieId] = useState<number | null>(null)

  const fetchVideos = useCallback(async (nextMovieId: number) => {
    setStatus('loading')
    setTrailerKey(null)

    try {
      const videosResponse = await MoviesService.getVideos(nextMovieId)

      setTrailerKey(getYouTubeTrailerKey(videosResponse.results))
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setTrailerKey(null)
      console.error(error)
    }
  }, [])

  const openTrailer = useCallback(
    (nextMovieId: number) => {
      setMovieId(nextMovieId)
      setIsOpen(true)

      if (status === 'idle' || movieId !== nextMovieId) {
        void fetchVideos(nextMovieId)
      }
    },
    [fetchVideos, movieId, status],
  )

  const closeTrailer = useCallback(() => {
    setIsOpen(false)
  }, [])

  const retryTrailer = useCallback(() => {
    if (movieId !== null) {
      void fetchVideos(movieId)
    }
  }, [fetchVideos, movieId])

  return {
    isOpen,
    trailerKey,
    loading: status === 'loading',
    error: status === 'error',
    openTrailer,
    closeTrailer,
    retryTrailer,
  }
}
