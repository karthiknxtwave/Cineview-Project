import styled from 'styled-components'

export const Page = styled.main`
  min-height: calc(100vh - 72px);
  background: #0f172a;
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
  background: #0f172a;
  text-align: center;
`

export const StateTitle = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #f8fafc;
`

export const StateMessage = styled.p`
  margin: 0;
  max-width: 420px;
  font-size: 16px;
  line-height: 1.6;
  color: #94a3b8;
`

export const ActionButton = styled.button`
  margin-top: 8px;
  height: 44px;
  padding: 0 22px;
  border: none;
  border-radius: 10px;
  background: #2563eb;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #1d4ed8;
  }
`