import styled from 'styled-components'

export const Section = styled.section`
  padding: 24px 40px 8px;
`

export const Title = styled.h2`
  margin: 0 0 14px;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const ChipList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

export const Chip = styled.button<{ $active: boolean }>`
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
`

export const SkeletonChip = styled.div`
  width: 88px;
  height: 36px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.skeletonFrom} 25%,
    ${({ theme }) => theme.colors.skeletonTo} 50%,
    ${({ theme }) => theme.colors.skeletonFrom} 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`

export const ErrorBox = styled.div`
  padding: 16px 20px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
`

export const ErrorText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
`

export const RetryButton = styled.button`
  margin-top: 12px;
  height: 36px;
  padding: 0 16px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`
