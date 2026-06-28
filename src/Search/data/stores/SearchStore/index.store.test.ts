import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { RECENT_SEARCHES_KEY } from '../../../core/constants/Search.constants'
import type { SearchResult } from '../../../core/types'
import type { SearchServiceInterface } from '../../services/SearchService'
import { SEARCH_DEBOUNCE_MS } from '../../services/SearchService'
import { SearchStore } from './index.store'

const mixedResults: SearchResult[] = [
  {
    id: 1,
    media_type: 'movie',
    title: 'Batman',
    overview: '',
    poster_path: null,
    backdrop_path: null,
    release_date: '2022-01-01',
    vote_average: 7,
    vote_count: 100,
    popularity: 10,
    adult: false,
    original_language: 'en',
    genre_ids: [28],
  },
  {
    id: 2,
    media_type: 'tv',
    name: 'Batwoman',
    overview: '',
    poster_path: null,
    backdrop_path: null,
    first_air_date: '2019-01-01',
    vote_average: 6,
    vote_count: 50,
    popularity: 8,
    original_language: 'en',
    genre_ids: [10759],
  },
  {
    id: 3,
    media_type: 'person',
    name: 'Christian Bale',
    profile_path: null,
    popularity: 20,
  },
]

describe('SearchStore', () => {
  let store: SearchStore
  let search: ReturnType<typeof vi.fn<SearchServiceInterface['search']>>

  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()

    search = vi.fn().mockResolvedValue(mixedResults)
    store = new SearchStore({ search })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('debounces search requests', async () => {
    store.setQuery('batman')

    expect(search).not.toHaveBeenCalled()

    vi.advanceTimersByTime(SEARCH_DEBOUNCE_MS)
    await vi.runAllTimersAsync()

    expect(search).toHaveBeenCalledWith('batman', expect.any(Object))
  })

  it('groups results by media type', async () => {
    await store.search('batman')

    expect(store.movieResults).toHaveLength(1)
    expect(store.tvResults).toHaveLength(1)
    expect(store.personResults).toHaveLength(1)
  })

  it('persists successful searches to localStorage', async () => {
    await store.search('batman')

    const stored = JSON.parse(
      localStorage.getItem(RECENT_SEARCHES_KEY) ?? '[]',
    ) as string[]

    expect(stored).toContain('batman')
  })
})
