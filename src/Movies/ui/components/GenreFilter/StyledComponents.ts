import styled from 'styled-components'

export const Section = styled.section`
  padding: 24px 40px 8px;
`

export const Title = styled.h2`
  margin: 0 0 14px;
  font-size: 18px;
  font-weight: 600;
  color: #e2e8f0;
`

export const ChipList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

export const Chip = styled.button<{ $active: boolean }>`
  border: 1px solid ${({ $active }) => ($active ? '#3b82f6' : '#334155')};
  background: ${({ $active }) => ($active ? '#1d4ed8' : '#1e293b')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#cbd5e1')};
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3b82f6;
    color: white;
  }
`

export const SkeletonChip = styled.div`
  width: 88px;
  height: 36px;
  border-radius: 999px;
  background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%);
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
  background: #1e293b;
  border: 1px solid #334155;
`

export const ErrorText = styled.p`
  margin: 0;
  color: #94a3b8;
  font-size: 14px;
`

export const RetryButton = styled.button`
  margin-top: 12px;
  height: 36px;
  padding: 0 16px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`
