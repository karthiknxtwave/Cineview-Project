import { useNavigate } from 'react-router-dom'
import { clearSession } from '../../../../Auth/core/utils/Session.utils'
import * as S from './StyledComponents'



const Navbar = () => {
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
          <S.StyledNavLink to="/">
            Home
          </S.StyledNavLink>
  
          <S.StyledNavLink to="/search">
            Search
          </S.StyledNavLink>
  
          <S.StyledNavLink to="/watchlist">
            Watchlist
          </S.StyledNavLink>
  
          <S.StyledNavLink to="/collections">
            Collections
          </S.StyledNavLink>
  
          <S.StyledNavLink to="/settings">
            Settings
          </S.StyledNavLink>
        </S.NavLinks>
      </S.LeftSection>
  
      <S.RightSection>
        <S.SearchInput
          placeholder="Search (Coming Soon)"
          disabled
        />
  
        <S.Language disabled>
          <option>EN</option>
        </S.Language>
  
        <S.Avatar>A</S.Avatar>
  
        <S.LogoutButton
          type="button"
          onClick={handleLogout}
        >
          Logout
        </S.LogoutButton>
      </S.RightSection>
    </S.Nav>
  )
}

export default Navbar