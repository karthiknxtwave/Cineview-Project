import { makeAutoObservable, runInAction } from 'mobx'

import {
  DEFAULT_TMDB_LOCALE,
  type TmdbLocaleParams,
} from '../../../../Common/core/utils/TmdbParams.utils'

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

  private tmdbLocale: TmdbLocaleParams = DEFAULT_TMDB_LOCALE

  private service: MoviesServiceInterface

  constructor(service: MoviesServiceInterface = MoviesService) {
    this.service = service
    makeAutoObservable(this)
  }

  setTmdbLocale(language: string, region: string) {
    this.tmdbLocale = { language, region }
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
      const movie = await this.service.getMovieDetails(movieId, this.tmdbLocale)

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
      const castResponse = await this.service.getCast(movieId, this.tmdbLocale)

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
      const similarMovies = await this.service.getSimilar(movieId, this.tmdbLocale)

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
      const recommendedMovies = await this.service.getRecommendations(
        movieId,
        this.tmdbLocale,
      )

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
      const videosResponse = await this.service.getVideos(movieId, this.tmdbLocale)

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
