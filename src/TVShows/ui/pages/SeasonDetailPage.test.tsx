import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { PreferencesStoreProvider } from '../../../Preferences/data/providers'
import { SeasonDetailPage } from './SeasonDetailPage'

vi.mock('../../data/services/TVShowsService', () => ({
  TVShowsService: {
    getSeasonDetails: vi.fn().mockResolvedValue({
      id: 10,
      name: 'Season 1',
      season_number: 1,
      episodes: [
        {
          id: 101,
          name: 'Pilot',
          episode_number: 1,
          air_date: '2020-01-01',
          overview: 'The first episode.',
        },
      ],
    }),
  },
}))

describe('SeasonDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders episode list from fetched season data', async () => {
    render(
      <PreferencesStoreProvider>
        <MemoryRouter initialEntries={['/tv/1/season/1']}>
          <Routes>
            <Route
              path="/tv/:id/season/:seasonNumber"
              element={<SeasonDetailPage />}
            />
          </Routes>
        </MemoryRouter>
      </PreferencesStoreProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText(/Pilot/)).toBeInTheDocument()
    })

    expect(screen.getByText('1. Pilot')).toBeInTheDocument()
  })
})
