import { makeAutoObservable, runInAction } from 'mobx'

import {
  MoviesService,
  type MoviesServiceInterface,
} from '../../services/MoviesService'
import type { Genre, MovieSummary } from '../../../core/types/Movie.types'

type FetchStatus = 'idle' | 'loading' | 'success' | 'error'

type RowKey = 'trending' | 'popular' | 'topRated' | 'upcoming'

export class HomeStore {
  trendingMovies: MovieSummary[] = []
  popularMovies: MovieSummary[] = []
  topRatedMovies: MovieSummary[] = []
  upcomingMovies: MovieSummary[] = []

  genres: Genre[] = []

  selectedGenre: number | null = null

  trendingStatus: FetchStatus = 'idle'
  popularStatus: FetchStatus = 'idle'
  topRatedStatus: FetchStatus = 'idle'
  upcomingStatus: FetchStatus = 'idle'
  genresStatus: FetchStatus = 'idle'

  private service: MoviesServiceInterface

  constructor(service: MoviesServiceInterface = MoviesService) {
    this.service = service
    makeAutoObservable(this)
  }

  async fetchHomeData() {
    await Promise.all([
      this.fetchTrending(),
      this.fetchPopular(),
      this.fetchTopRated(),
      this.fetchUpcoming(),
      this.fetchGenres(),
    ])
  }

  async fetchTrending() {
    await this.fetchRow('trending', () => this.service.getTrending())
  }

  async fetchPopular() {
    await this.fetchRow('popular', () => this.service.getPopular())
  }

  async fetchTopRated() {
    await this.fetchRow('topRated', () => this.service.getTopRated())
  }

  async fetchUpcoming() {
    await this.fetchRow('upcoming', () => this.service.getUpcoming())
  }

  async fetchGenres() {
    this.genresStatus = 'loading'

    try {
      const genresResponse = await this.service.getGenres()

      runInAction(() => {
        this.genres = genresResponse.genres
        this.genresStatus = 'success'
      })
    } catch (error) {
      runInAction(() => {
        this.genresStatus = 'error'
      })

      console.error(error)
    }
  }

  selectGenre(genreId: number | null) {
    this.selectedGenre = genreId
  }

  get filteredTrending() {
    return this.filterMovies(this.trendingMovies)
  }

  get filteredPopular() {
    return this.filterMovies(this.popularMovies)
  }

  get filteredTopRated() {
    return this.filterMovies(this.topRatedMovies)
  }

  get filteredUpcoming() {
    return this.filterMovies(this.upcomingMovies)
  }

  get featuredMovie(): MovieSummary | undefined {
    return (
      this.trendingMovies[0] ??
      this.popularMovies[0] ??
      this.topRatedMovies[0] ??
      this.upcomingMovies[0]
    )
  }

  get hasAnyMovies() {
    return (
      this.trendingMovies.length > 0 ||
      this.popularMovies.length > 0 ||
      this.topRatedMovies.length > 0 ||
      this.upcomingMovies.length > 0
    )
  }

  get isAnyRowLoading() {
    return (
      (this.trendingStatus === 'loading' && this.trendingMovies.length === 0) ||
      (this.popularStatus === 'loading' && this.popularMovies.length === 0) ||
      (this.topRatedStatus === 'loading' && this.topRatedMovies.length === 0) ||
      (this.upcomingStatus === 'loading' && this.upcomingMovies.length === 0)
    )
  }

  get isInitialLoading() {
    return this.isAnyRowLoading && !this.hasAnyMovies
  }

  get isHeroLoading() {
    return !this.featuredMovie && this.isAnyRowLoading
  }

  isRowFilteredEmpty(key: RowKey) {
    if (this.selectedGenre === null) {
      return false
    }

    const sourceMovies = this.getRowMovies(key)

    return (
      sourceMovies.length > 0 &&
      this.filterMovies(sourceMovies).length === 0
    )
  }

  private getRowMovies(key: RowKey) {
    switch (key) {
      case 'trending':
        return this.trendingMovies
      case 'popular':
        return this.popularMovies
      case 'topRated':
        return this.topRatedMovies
      case 'upcoming':
        return this.upcomingMovies
    }
  }

  private async fetchRow(
    key: RowKey,
    fetcher: () => Promise<MovieSummary[]>,
  ) {
    this.setRowStatus(key, 'loading')

    try {
      const movies = await fetcher()

      runInAction(() => {
        switch (key) {
          case 'trending':
            this.trendingMovies = movies
            break
          case 'popular':
            this.popularMovies = movies
            break
          case 'topRated':
            this.topRatedMovies = movies
            break
          case 'upcoming':
            this.upcomingMovies = movies
            break
        }

        this.setRowStatus(key, 'success')
      })
    } catch (error) {
      runInAction(() => {
        this.setRowStatus(key, 'error')
      })

      console.error(error)
    }
  }

  private setRowStatus(key: RowKey, status: FetchStatus) {
    switch (key) {
      case 'trending':
        this.trendingStatus = status
        break
      case 'popular':
        this.popularStatus = status
        break
      case 'topRated':
        this.topRatedStatus = status
        break
      case 'upcoming':
        this.upcomingStatus = status
        break
    }
  }

  private filterMovies(movies: MovieSummary[]) {
    if (this.selectedGenre === null) {
      return movies
    }

    return movies.filter(movie =>
      movie.genre_ids.includes(this.selectedGenre!),
    )
  }
}
