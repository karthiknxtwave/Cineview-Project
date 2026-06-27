import styled from 'styled-components'

export const Section = styled.section`
  margin-bottom: 36px;
`

export const Title = styled.h2`
  margin: 0 0 16px;
  padding: 0 40px;
  font-size: 22px;
  font-weight: 700;
  color: #f8fafc;
`

export const Row = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 4px 40px 12px;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 999px;
  }

  scrollbar-width: thin;
  scrollbar-color: #334155 transparent;
`

export const SkeletonCard = styled.div`
  flex: 0 0 160px;
  height: 240px;
  border-radius: 12px;
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
  margin: 0 40px;
  padding: 20px 24px;
  border-radius: 12px;
  background: #1e293b;
  border: 1px solid #334155;
`

export const EmptyBox = styled.div`
  margin: 0 40px;
  padding: 16px 24px;
  border-radius: 12px;
  background: #1e293b;
  border: 1px dashed #334155;
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
