import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { getSession } from '../../../core/utils/Session.utils'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation()
  const session = getSession()

  if (!session?.isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    )
  }

  return <>{children}</>
}

export default ProtectedRoute