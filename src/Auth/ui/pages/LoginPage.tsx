import { Navigate } from 'react-router-dom'

import LoginForm from '../components/LoginForm'
import { getSession } from '../../core/utils/Session.utils'

export const LoginPage = () => {
  const session = getSession()

  if (session?.isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return <LoginForm />
}

export default LoginPage