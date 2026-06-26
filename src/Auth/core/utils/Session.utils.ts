import { SESSION_STORAGE_KEY } from '../constants/Auth.constants'
import type { Session } from '../types/Auth.types'

export const saveSession = (session: Session): void => {
  sessionStorage.setItem(
    SESSION_STORAGE_KEY,
    JSON.stringify(session)
  )
}

export const getSession = (): Session | null => {
  const session = sessionStorage.getItem(SESSION_STORAGE_KEY)

  if (!session) {
    return null
  }

  return JSON.parse(session) as Session
}

export const clearSession = (): void => {
  sessionStorage.removeItem(SESSION_STORAGE_KEY)
}