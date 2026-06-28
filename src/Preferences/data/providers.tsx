import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react"

import { PreferencesStore } from "./stores/PreferencesStore"

const PreferencesStoreContext = createContext<PreferencesStore | null>(null)

interface PreferencesStoreProviderProps {
  children: ReactNode
}

export function PreferencesStoreProvider({
  children,
}: PreferencesStoreProviderProps) {
  const storeRef = useRef<PreferencesStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = new PreferencesStore()
  }

  return (
    <PreferencesStoreContext.Provider value={storeRef.current}>
      {children}
    </PreferencesStoreContext.Provider>
  )
}

export function usePreferencesStore() {
  const store = useContext(PreferencesStoreContext)

  if (!store) {
    throw new Error(
      "usePreferencesStore must be used within PreferencesStoreProvider",
    )
  }

  return store
}
