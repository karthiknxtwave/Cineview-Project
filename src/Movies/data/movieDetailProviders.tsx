import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from 'react'

import { MovieDetailStore } from './stores/MovieDetailStore'

const MovieDetailStoreContext = createContext<MovieDetailStore | null>(null)

interface MovieDetailStoreProviderProps {
  children: ReactNode
}

export function MovieDetailStoreProvider({
  children,
}: MovieDetailStoreProviderProps) {
  const storeRef = useRef<MovieDetailStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = new MovieDetailStore()
  }

  return (
    <MovieDetailStoreContext.Provider value={storeRef.current}>
      {children}
    </MovieDetailStoreContext.Provider>
  )
}

export function useMovieDetailStore() {
  const store = useContext(MovieDetailStoreContext)

  if (!store) {
    throw new Error(
      'useMovieDetailStore must be used within MovieDetailStoreProvider',
    )
  }

  return store
}
