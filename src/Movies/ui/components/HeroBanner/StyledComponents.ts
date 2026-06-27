import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Banner = styled.section<{ $src?: string }>`
  position: relative;
  min-height: 420px;
  display: flex;
  align-items: flex-end;
  padding: 48px 40px;
  background: ${({ $src }) =>
    $src
      ? `linear-gradient(to top, #0f172a 12%, rgba(15, 23, 42, 0.55) 55%, rgba(15, 23, 42, 0.25) 100%), url(${$src}) center / cover no-repeat`
      : 'linear-gradient(135deg, #1e293b, #0f172a)'};
`

export const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 640px;
`

export const Eyebrow = styled.p`
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #93c5fd;
`

export const Title = styled.h1`
  margin: 0 0 12px;
  font-size: 42px;
  font-weight: 800;
  line-height: 1.1;
  color: #f8fafc;
`

export const Overview = styled.p`
  margin: 0 0 20px;
  font-size: 16px;
  line-height: 1.6;
  color: #cbd5e1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const Meta = styled.p`
  margin: 0 0 20px;
  font-size: 14px;
  color: #94a3b8;
`

export const Cta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 22px;
  border-radius: 10px;
  background: #2563eb;
  color: white;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background: #1d4ed8;
  }
`

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`

export const TrailerButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 22px;
  border: 1px solid #64748b;
  border-radius: 10px;
  background: transparent;
  color: #f8fafc;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.08);
    border-color: #94a3b8;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`

export const Skeleton = styled.div`
  min-height: 420px;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 14px;
  background: linear-gradient(135deg, #1e293b, #0f172a);
`

export const SkeletonLine = styled.div<{ $width: string; $height?: string }>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height ?? '18px'};
  border-radius: 8px;
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
