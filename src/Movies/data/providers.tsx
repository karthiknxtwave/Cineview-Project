import { createContext, useContext, useRef, type ReactNode } from 'react'

import { HomeStore } from './stores/HomeStore'

const HomeStoreContext = createContext<HomeStore | null>(null)

interface HomeStoreProviderProps {
  children: ReactNode
}

export function HomeStoreProvider({
  children,
}: HomeStoreProviderProps) {
  const storeRef = useRef<HomeStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = new HomeStore()
  }

  return (
    <HomeStoreContext.Provider value={storeRef.current}>
      {children}
    </HomeStoreContext.Provider>
  )
}

export function useHomeStore() {
  const store = useContext(HomeStoreContext)

  if (!store) {
    throw new Error(
      'useHomeStore must be used within HomeStoreProvider'
    )
  }

  return store
}