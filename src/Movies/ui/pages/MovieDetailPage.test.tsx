import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { WatchlistStoreProvider } from '../../../Collection/data/providers'
import { PreferencesStoreProvider } from '../../../Preferences/data/providers'
import { MovieDetailPage } from './MovieDetailPage'

describe('MovieDetailPage', () => {
  it('shows not found state for invalid movie IDs', () => {
    render(
      <PreferencesStoreProvider>
        <WatchlistStoreProvider>
          <MemoryRouter initialEntries={['/movie/abc']}>
            <Routes>
              <Route path="/movie/:id" element={<MovieDetailPage />} />
            </Routes>
          </MemoryRouter>
        </WatchlistStoreProvider>
      </PreferencesStoreProvider>,
    )

    expect(screen.getByText('Movie not found')).toBeInTheDocument()
    expect(
      screen.getByText('The movie ID in this URL is invalid.'),
    ).toBeInTheDocument()
  })
})
