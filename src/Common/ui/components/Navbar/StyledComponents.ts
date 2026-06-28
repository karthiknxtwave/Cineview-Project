import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const Nav = styled.nav`
  height: 72px;
  background: ${({ theme }) => theme.colors.surface};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 40px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.surfaceMuted};

  position: sticky;
  top: 0;
  z-index: 100;
`

export const Logo = styled.h1`
  margin: 0;

  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 28px;

  font-weight: 700;

  letter-spacing: 0.5px;
`

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
`

export const NavLinks = styled.div`
  display: flex;
  gap: 28px;
`

export const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.link};

  text-decoration: none;

  font-size: 15px;

  font-weight: 500;

  transition: 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &.active {
    color: ${({ theme }) => theme.colors.linkActive};
  }
`

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const SearchInput = styled.input`
  width: 280px;

  height: 40px;

  border-radius: 20px;

  border: 1px solid ${({ theme }) => theme.colors.border};

  background: ${({ theme }) => theme.colors.surfaceElevated};

  color: ${({ theme }) => theme.colors.textPrimary};

  padding: 0 16px;

  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primaryActive};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusRing};
  }
`

export const Language = styled.select`
  height: 40px;

  border-radius: 10px;

  border: 1px solid ${({ theme }) => theme.colors.border};

  background: ${({ theme }) => theme.colors.surfaceElevated};

  color: ${({ theme }) => theme.colors.textPrimary};

  padding: 0 12px;
`

export const Avatar = styled.div`
  width: 40px;
  height: 40px;

  border-radius: 50%;

  background: ${({ theme }) => theme.colors.primaryActive};

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.textInverse};

  font-weight: bold;

  font-size: 16px;
`

export const LogoutButton = styled.button`
  border: none;

  height: 40px;

  padding: 0 18px;

  border-radius: 10px;

  background: ${({ theme }) => theme.colors.danger};

  color: ${({ theme }) => theme.colors.textInverse};

  cursor: pointer;

  font-weight: 600;

  transition: 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.dangerHover};
  }
`
