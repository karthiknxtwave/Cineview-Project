import styled from "styled-components"

export const Page = styled.main`
  min-height: calc(100vh - 72px);
  padding: 32px 40px 48px;
  background: ${({ theme }) => theme.colors.pageBackground};
`

export const Title = styled.h1`
  margin: 0 0 24px;
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Sections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 720px;
`

export const Select = styled.select`
  min-width: 220px;
  height: 44px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 15px;
`

export const ThemeOptions = styled.div`
  display: flex;
  gap: 12px;
`

export const ThemeButton = styled.button<{ $active: boolean }>`
  height: 44px;
  padding: 0 18px;
  border-radius: 10px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primaryActive : theme.colors.border};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.inputBackground};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.textInverse : theme.colors.textPrimary};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryActive};
  }
`

export const LogoutButton = styled.button`
  height: 44px;
  padding: 0 18px;
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.dangerHover};
  }
`
