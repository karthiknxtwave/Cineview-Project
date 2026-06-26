import { useState, type SubmitEvent } from 'react'

import {
    VALID_USERNAME,
    VALID_PASSWORD,
  } from '../../../core/constants/Auth.constants'
import { saveSession } from '../../../core/utils/Session.utils'
import { useLocation, useNavigate } from 'react-router-dom'
import * as S from './StyledComponents'



const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  })
  const [loginError, setLoginError] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

const from = location.state?.from?.pathname || '/'

const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault()

    const newErrors = {
      username: '',
      password: '',
    }

    console.log({
      username,
      password,
      VALID_USERNAME,
      VALID_PASSWORD,
    })
    if (!username.trim()) {
      newErrors.username = 'Username is required'
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)

    if (newErrors.username || newErrors.password) {
      return
    }

    //check credentials
    if (
        username === VALID_USERNAME &&
        password === VALID_PASSWORD
      ) {
        saveSession({
          username,
          isLoggedIn: true,
        })
        console.log('Login Successful')
        navigate(from, { replace: true })
      } else {
        setLoginError('Invalid username or password')
    }
    
  }

  return (
    <S.Page>
      <S.Card onSubmit={handleSubmit}>
        <S.Logo>CineView</S.Logo>
  
        <S.Subtitle>
          Sign in to continue
        </S.Subtitle>
  
        <S.Field>
          <S.Label htmlFor="username">
            Username
          </S.Label>
  
          <S.Input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter username"
          />
  
          {errors.username && (
            <S.ErrorText>
              {errors.username}
            </S.ErrorText>
          )}
        </S.Field>
  
        <S.Field>
          <S.Label htmlFor="password">
            Password
          </S.Label>
  
          <S.Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
          />
  
          {errors.password && (
            <S.ErrorText>
              {errors.password}
            </S.ErrorText>
          )}
  
          {loginError && (
            <S.ErrorText>
              {loginError}
            </S.ErrorText>
          )}
        </S.Field>
  
        <S.CheckboxRow>
          <input
            id="show-password"
            type="checkbox"
            checked={showPassword}
            onChange={() =>
              setShowPassword(!showPassword)
            }
          />
  
          <label htmlFor="show-password">
            Show Password
          </label>
        </S.CheckboxRow>
  
        <S.LoginButton type="submit">
          Login
        </S.LoginButton>
      </S.Card>
    </S.Page>
  )
}

export default LoginForm