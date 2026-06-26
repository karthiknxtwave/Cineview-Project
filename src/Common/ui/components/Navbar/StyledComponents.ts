import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const Nav = styled.nav`
  height: 72px;
  background: #111827;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 40px;

  border-bottom: 1px solid #1f2937;

  position: sticky;
  top: 0;
  z-index: 100;
`

export const Logo = styled.h1`
  margin: 0;

  color: white;

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
  color: #cbd5e1;

  text-decoration: none;

  font-size: 15px;

  font-weight: 500;

  transition: 0.2s;

  &:hover {
    color: white;
  }

  &.active {
    color: #3b82f6;
  }
`

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const SearchInput = styled.input`
  width: 220px;

  height: 40px;

  border-radius: 20px;

  border: 1px solid #334155;

  background: #1e293b;

  color: white;

  padding: 0 16px;

  outline: none;

  &::placeholder {
    color: #94a3b8;
  }
`

export const Language = styled.select`
  height: 40px;

  border-radius: 10px;

  border: 1px solid #334155;

  background: #1e293b;

  color: white;

  padding: 0 12px;
`

export const Avatar = styled.div`
  width: 40px;
  height: 40px;

  border-radius: 50%;

  background: #3b82f6;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;

  font-weight: bold;

  font-size: 16px;
`

export const LogoutButton = styled.button`
  border: none;

  height: 40px;

  padding: 0 18px;

  border-radius: 10px;

  background: #ef4444;

  color: white;

  cursor: pointer;

  font-weight: 600;

  transition: 0.2s;

  &:hover {
    background: #dc2626;
  }
`