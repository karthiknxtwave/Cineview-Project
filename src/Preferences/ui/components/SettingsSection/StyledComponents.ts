import styled from "styled-components"

export const Section = styled.section`
  padding: 24px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
`

export const SectionTitle = styled.h2`
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const SectionDescription = styled.p`
  margin: 0 0 16px;
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const SectionContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`
