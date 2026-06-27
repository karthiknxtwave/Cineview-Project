import { makeAutoObservable, runInAction } from 'mobx'

import {
  MoviesService,
  type MoviesServiceInterface,
} from '../../services/MoviesService'
import { getYouTubeTrailerKey } from '../../../core/utils/Video.utils'
import type {
  CastMember,
  MovieDetails,
  MovieSummary,
} from '../../../core/types/Movie.types'

type FetchStatus = 'idle' | 'loading' | 'success' | 'error'

export class MovieDetailStore {
  movie: MovieDetails | null = null
  cast: CastMember[] = []
  similarMovies: MovieSummary[] = []
  recommendedMovies: MovieSummary[] = []

  detailsStatus: FetchStatus = 'idle'
  castStatus: FetchStatus = 'idle'
  similarStatus: FetchStatus = 'idle'
  recommendationsStatus: FetchStatus = 'idle'
  videosStatus: FetchStatus = 'idle'
  trailerKey: string | null = null

  private service: MoviesServiceInterface

  constructor(service: MoviesServiceInterface = MoviesService) {
    this.service = service
    makeAutoObservable(this)
  }

  async fetchAll(movieId: number) {
    await Promise.all([
      this.fetchDetails(movieId),
      this.fetchCast(movieId),
      this.fetchSimilar(movieId),
      this.fetchRecommendations(movieId),
    ])
  }

  async fetchDetails(movieId: number) {
    this.detailsStatus = 'loading'

    try {
      const movie = await this.service.getMovieDetails(movieId)

      runInAction(() => {
        this.movie = movie
        this.detailsStatus = 'success'
      })
    } catch (error) {
      runInAction(() => {
        this.detailsStatus = 'error'
        this.movie = null
      })

      console.error(error)
    }
  }

  async fetchCast(movieId: number) {
    this.castStatus = 'loading'

    try {
      const castResponse = await this.service.getCast(movieId)

      runInAction(() => {
        this.cast = castResponse.cast
        this.castStatus = 'success'
      })
    } catch (error) {
      runInAction(() => {
        this.castStatus = 'error'
      })

      console.error(error)
    }
  }

  async fetchSimilar(movieId: number) {
    this.similarStatus = 'loading'

    try {
      const similarMovies = await this.service.getSimilar(movieId)

      runInAction(() => {
        this.similarMovies = similarMovies
        this.similarStatus = 'success'
      })
    } catch (error) {
      runInAction(() => {
        this.similarStatus = 'error'
      })

      console.error(error)
    }
  }

  async fetchRecommendations(movieId: number) {
    this.recommendationsStatus = 'loading'

    try {
      const recommendedMovies = await this.service.getRecommendations(movieId)

      runInAction(() => {
        this.recommendedMovies = recommendedMovies
        this.recommendationsStatus = 'success'
      })
    } catch (error) {
      runInAction(() => {
        this.recommendationsStatus = 'error'
      })

      console.error(error)
    }
  }

  async fetchVideos(movieId: number) {
    this.videosStatus = 'loading'

    try {
      const videosResponse = await this.service.getVideos(movieId)

      runInAction(() => {
        this.trailerKey = getYouTubeTrailerKey(videosResponse.results)
        this.videosStatus = 'success'
      })
    } catch (error) {
      runInAction(() => {
        this.videosStatus = 'error'
        this.trailerKey = null
      })

      console.error(error)
    }
  }
}
