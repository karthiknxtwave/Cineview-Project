export { API } from './core/constants/API.constants'
export { IMAGE } from './core/constants/Image.constants'
export { API_ROUTES } from './core/constants/Routes.constants'
export { SESSION_STORAGE_KEY } from './core/constants/Session.constants'
export {
  darkTheme,
  lightTheme,
  resolveTheme,
} from './core/constants/Theme.constants'

export type { Session } from './core/types/Session.types'
export type {
  ThemeColors,
  ThemeMode,
  ThemeTokens,
} from './core/types/Theme.types'

export {
  saveSession,
  getSession,
  clearSession,
} from './core/utils/Session.utils'

export {
  formatDisplayDate,
  formatDisplayYear,
} from './utils/FormatDate.utils'

export {
  DEFAULT_TMDB_LOCALE,
  toTmdbQueryParams,
} from './core/utils/TmdbParams.utils'

export type { TmdbLocaleParams } from './core/utils/TmdbParams.utils'

export { ApiClient } from './data/services/ApiClient'

export { default as Navbar } from './ui/components/Navbar'
export { default as ShellLayout } from './ui/components/ShellLayout'
export { default as ProtectedRoute } from './ui/components/ProtectedRoute'

export { ErrorBoundary } from './errors/ErrorBoundary'
