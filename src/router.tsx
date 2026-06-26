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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
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
  },
  {
    path: '/tv/:id/season/:seasonNumber',
    element: <SeasonDetailPage />,
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
])