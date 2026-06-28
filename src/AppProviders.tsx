import { useEffect, useRef, type ReactNode } from "react"
import { I18nextProvider } from "react-i18next"
import { useObserver } from "mobx-react-lite"
import { createGlobalStyle, ThemeProvider } from "styled-components"

import { resolveTheme } from "./Common"
import { WatchlistStoreProvider, useWatchlistStore } from "./Collection/data/providers"
import {
  PreferencesStoreProvider,
  usePreferencesStore,
} from "./Preferences/data/providers"
import { initI18n, i18n } from "./Preferences/data/i18n"

interface AppProvidersProps {
  children: ReactNode
}

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    min-height: 100%;
  }

  body {
    background-color: ${({ theme }) => theme.colors.pageBackground};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`

function AppProvidersContent({ children }: AppProvidersProps) {
  const preferencesStore = usePreferencesStore()
  const watchlistStore = useWatchlistStore()
  const initializedRef = useRef(false)

  useEffect(() => {
    if (initializedRef.current) {
      return
    }

    preferencesStore.initialize()
    watchlistStore.initialize()
    initI18n(preferencesStore.language)
    initializedRef.current = true
  }, [preferencesStore, watchlistStore])

  useEffect(() => {
    document.title = "CineView"
  }, [preferencesStore.language])

  const theme = useObserver(() => resolveTheme(preferencesStore.theme))

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </I18nextProvider>
  )
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <PreferencesStoreProvider>
      <WatchlistStoreProvider>
        <AppProvidersContent>{children}</AppProvidersContent>
      </WatchlistStoreProvider>
    </PreferencesStoreProvider>
  )
}
