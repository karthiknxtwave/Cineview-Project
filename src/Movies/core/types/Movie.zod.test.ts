import { describe, expect, it } from 'vitest'

import { MovieListResponseSchema, MovieSummarySchema } from './Movie.zod'

describe('MovieSummarySchema', () => {
  it('accepts null optional fields from TMDB', () => {
    const parsed = MovieSummarySchema.parse({
      id: 1,
      title: 'Test Movie',
      overview: null,
      poster_path: null,
      backdrop_path: null,
      release_date: null,
      vote_average: 7.5,
      vote_count: 100,
      popularity: 10,
      genre_ids: null,
      original_language: null,
    })

    expect(parsed.overview).toBe('')
    expect(parsed.release_date).toBe('')
    expect(parsed.genre_ids).toEqual([])
    expect(parsed.original_language).toBe('')
    expect(parsed.adult).toBe(false)
  })

  it('parses movie list responses with mixed null values', () => {
    const parsed = MovieListResponseSchema.parse({
      page: 1,
      total_pages: 1,
      total_results: 1,
      results: [
        {
          id: 1,
          title: 'Test Movie',
          overview: null,
          poster_path: null,
          backdrop_path: null,
          release_date: null,
          vote_average: 7.5,
          vote_count: 100,
          popularity: 10,
          genre_ids: null,
          original_language: null,
        },
      ],
    })

    expect(parsed.results).toHaveLength(1)
  })
})
