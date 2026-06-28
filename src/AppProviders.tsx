import { useEffect, useRef, type ReactNode } from "react"
import { I18nextProvider } from "react-i18next"
import { useObserver } from "mobx-react-lite"
import { createGlobalStyle, ThemeProvider } from "styled-components"

import { resolveTheme } from "./Common"
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
  const store = usePreferencesStore()
  const initializedRef = useRef(false)

  useEffect(() => {
    if (initializedRef.current) {
      return
    }

    store.initialize()
    initI18n(store.language)
    initializedRef.current = true
  }, [store])

  useEffect(() => {
    document.title = "CineView"
  }, [store.language])

  const theme = useObserver(() => resolveTheme(store.theme))

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
      <AppProvidersContent>{children}</AppProvidersContent>
    </PreferencesStoreProvider>
  )
}
