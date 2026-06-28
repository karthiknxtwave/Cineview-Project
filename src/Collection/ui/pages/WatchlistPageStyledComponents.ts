import styled from "styled-components"

export const Page = styled.main`
  min-height: calc(100vh - 72px);
  padding: 32px 40px 48px;
  background: ${({ theme }) => theme.colors.pageBackground};
`

export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
`

export const Title = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 28px;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
`
