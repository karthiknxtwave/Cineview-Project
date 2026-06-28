import styled from 'styled-components'

export const Section = styled.section`
  margin-bottom: 36px;
`

export const Title = styled.h2`
  margin: 0 0 16px;
  padding: 0 40px;
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Row = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 4px 40px 12px;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const SkeletonCard = styled.div`
  flex: 0 0 160px;
  height: 240px;
  border-radius: 12px;
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
  margin: 0 40px;
  padding: 20px 24px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
`

export const EmptyBox = styled.div`
  margin: 0 40px;
  padding: 16px 24px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px dashed ${({ theme }) => theme.colors.border};
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
