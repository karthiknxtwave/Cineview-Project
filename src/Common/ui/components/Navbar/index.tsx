import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { clearSession } from '../../../core/utils/Session.utils'
import * as S from './StyledComponents'

interface LanguageOption {
  code: string
  label: string
}

interface NavbarProps {
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchSlot?: ReactNode
  selectedLanguage?: string
  languageOptions?: readonly LanguageOption[]
  onLanguageChange?: (language: string) => void
  watchlistCount?: number
}

const Navbar = ({
  searchValue = '',
  onSearchChange,
  searchSlot,
  selectedLanguage,
  languageOptions = [],
  onLanguageChange,
  watchlistCount = 0,
}: NavbarProps) => {
  const { t } = useTranslation('collection')
  const navigate = useNavigate()
  const isLanguageSwitcherEnabled =
    Boolean(onLanguageChange) && languageOptions.length > 0

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
          <S.WatchlistNavLink to="/watchlist">
            {t('watchlist.navbar.label')}
            {watchlistCount > 0 && (
              <S.WatchlistBadge
                aria-label={t('watchlist.navbar.badgeAriaLabel', {
                  count: watchlistCount,
                })}
              >
                {watchlistCount}
              </S.WatchlistBadge>
            )}
          </S.WatchlistNavLink>
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

        <S.Language
          value={selectedLanguage ?? languageOptions[0]?.code ?? 'en'}
          disabled={!isLanguageSwitcherEnabled}
          onChange={event => onLanguageChange?.(event.target.value)}
          aria-label="Language"
        >
          {languageOptions.map(option => (
            <option key={option.code} value={option.code}>
              {option.label}
            </option>
          ))}
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
