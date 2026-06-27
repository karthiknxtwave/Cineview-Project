import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { clearSession } from '../../../core/utils/Session.utils'
import * as S from './StyledComponents'

interface NavbarProps {
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchSlot?: ReactNode
}

const Navbar = ({
  searchValue = '',
  onSearchChange,
  searchSlot,
}: NavbarProps) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    clearSession()
    navigate('/login', { replace: true })
  }

  return (
    <S.Nav>
      <S.LeftSection>
        <S.Logo>CineView</S.Logo>

        <S.NavLinks>
          <S.StyledNavLink to="/">Home</S.StyledNavLink>
          <S.StyledNavLink to="/search">Search</S.StyledNavLink>
          <S.StyledNavLink to="/watchlist">Watchlist</S.StyledNavLink>
          <S.StyledNavLink to="/collections">Collections</S.StyledNavLink>
          <S.StyledNavLink to="/settings">Settings</S.StyledNavLink>
        </S.NavLinks>
      </S.LeftSection>

      <S.RightSection>
        {searchSlot ?? (
          <S.SearchInput
            type="search"
            placeholder="Search movies, TV shows, people..."
            value={searchValue}
            onChange={event => onSearchChange?.(event.target.value)}
            aria-label="Search"
            disabled={!onSearchChange}
          />
        )}

        <S.Language disabled>
          <option>EN</option>
        </S.Language>

        <S.Avatar>A</S.Avatar>

        <S.LogoutButton type="button" onClick={handleLogout}>
          Logout
        </S.LogoutButton>
      </S.RightSection>
    </S.Nav>
  )
}

export default Navbar
