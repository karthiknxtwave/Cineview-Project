import styled from "styled-components"

export const TabList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

export const Tab = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primaryActive : theme.colors.border};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primaryHover : theme.colors.surfaceElevated};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.textInverse : theme.colors.textSecondary};
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryActive};
    color: ${({ theme }) => theme.colors.textInverse};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`

export const Count = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.overlay};
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
`
