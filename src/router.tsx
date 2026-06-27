import { createBrowserRouter } from 'react-router-dom'

import { LoginPage } from './Auth'
import { HomePage, MovieDetailPage } from './Movies'
import { TVShowDetailPage, SeasonDetailPage } from './TVShows'
import { SearchPage } from './Search'
import {
  WatchlistPage,
  CollectionsPage,
  CollectionDetailPage,
} from './Collection'
import { SettingsPage } from './Preferences'

import { ProtectedRoute } from './Common'
import { SearchShellLayout } from './Search'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },

  {
    element: (
      <ProtectedRoute>
        <SearchShellLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/movie/:id',
        element: <MovieDetailPage />,
      },
      {
        path: '/tv/:id',
        element: <TVShowDetailPage />,
        children: [
          {
            path: 'season/:seasonNumber',
            element: <SeasonDetailPage />,
          },
        ],
      },
      {
        path: '/watchlist',
        element: <WatchlistPage />,
      },
      {
        path: '/collections',
        element: <CollectionsPage />,
      },
      {
        path: '/collections/:id',
        element: <CollectionDetailPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
])