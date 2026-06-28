import styled from 'styled-components'

export const Page = styled.main`
  min-height: calc(100vh - 72px);
  background: ${({ theme }) => theme.colors.pageBackground};
  padding-bottom: 48px;
`

export const StateContainer = styled.div`
  min-height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px;
  background: ${({ theme }) => theme.colors.pageBackground};
  text-align: center;
`

export const StateTitle = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const StateMessage = styled.p`
  margin: 0;
  max-width: 420px;
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const ActionButton = styled.button`
  margin-top: 8px;
  height: 44px;
  padding: 0 22px;
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`
