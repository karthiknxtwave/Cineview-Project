import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react"

import { WatchlistStore } from "./stores/WatchlistStore"

const WatchlistStoreContext = createContext<WatchlistStore | null>(null)

interface WatchlistStoreProviderProps {
  children: ReactNode
}

export function WatchlistStoreProvider({
  children,
}: WatchlistStoreProviderProps) {
  const storeRef = useRef<WatchlistStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = new WatchlistStore()
  }

  return (
    <WatchlistStoreContext.Provider value={storeRef.current}>
      {children}
    </WatchlistStoreContext.Provider>
  )
}

export function useWatchlistStore() {
  const store = useContext(WatchlistStoreContext)

  if (!store) {
    throw new Error(
      "useWatchlistStore must be used within WatchlistStoreProvider",
    )
  }

  return store
}
