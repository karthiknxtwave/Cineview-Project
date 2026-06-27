import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { MovieSummary } from '../../../core/types/Movie.types'
import type { MoviesServiceInterface } from '../../services/MoviesService'
import { HomeStore } from './index.store'

const createMovie = (id: number, genreIds: number[]): MovieSummary => ({
  id,
  title: `Movie ${id}`,
  overview: '',
  poster_path: null,
  backdrop_path: null,
  release_date: '2024-01-01',
  vote_average: 7,
  vote_count: 100,
  popularity: 1,
  genre_ids: genreIds,
  adult: false,
  original_language: 'en',
})

describe('HomeStore', () => {
  let store: HomeStore
  let mockService: MoviesServiceInterface

  beforeEach(() => {
    mockService = {
      getTrending: vi.fn().mockResolvedValue([
        createMovie(1, [28]),
        createMovie(2, [35]),
      ]),
      getPopular: vi.fn().mockResolvedValue([]),
      getTopRated: vi.fn().mockResolvedValue([]),
      getUpcoming: vi.fn().mockResolvedValue([]),
      getGenres: vi.fn().mockResolvedValue({ genres: [] }),
      getMovieDetails: vi.fn(),
      getCast: vi.fn(),
      getVideos: vi.fn(),
      getRecommendations: vi.fn(),
      getSimilar: vi.fn(),
    }

    store = new HomeStore(mockService)
  })

  it('filters movies by selected genre', async () => {
    await store.fetchTrending()

    store.selectGenre(28)

    expect(store.filteredTrending).toHaveLength(1)
    expect(store.filteredTrending[0]?.id).toBe(1)
  })

  it('restores all movies when genre filter is cleared', async () => {
    await store.fetchTrending()

    store.selectGenre(28)
    store.selectGenre(null)

    expect(store.filteredTrending).toHaveLength(2)
  })

  it('falls back to popular when trending is empty', async () => {
    const fallbackStore = new HomeStore({
      ...mockService,
      getTrending: vi.fn().mockResolvedValue([]),
      getPopular: vi.fn().mockResolvedValue([createMovie(5, [28])]),
    })

    await fallbackStore.fetchPopular()
    await fallbackStore.fetchTrending()

    expect(fallbackStore.featuredMovie?.id).toBe(5)
  })

  it('marks rows as filtered empty when genre removes all matches', async () => {
    await store.fetchTrending()

    store.selectGenre(99)

    expect(store.isRowFilteredEmpty('trending')).toBe(true)
    expect(store.filteredTrending).toHaveLength(0)
  })
})
