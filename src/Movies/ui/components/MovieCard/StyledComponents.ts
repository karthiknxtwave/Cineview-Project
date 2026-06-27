import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Card = styled.div`
  position: relative;
  flex: 0 0 160px;
`

export const CardLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`

export const WatchlistButton = styled.button<{ $active: boolean }>`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? '#2563eb' : 'rgba(15, 23, 42, 0.85)')};
  color: white;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2563eb;
  }
`

export const Poster = styled.div<{ $src?: string }>`
  width: 160px;
  height: 240px;
  border-radius: 12px;
  overflow: hidden;
  background: ${({ $src }) =>
    $src
      ? `url(${$src}) center / cover no-repeat`
      : 'linear-gradient(135deg, #1e293b, #334155)'};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
`

export const Title = styled.h3`
  margin: 10px 0 4px;
  font-size: 14px;
  font-weight: 600;
  color: #f8fafc;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const Meta = styled.p`
  margin: 0;
  font-size: 13px;
  color: #94a3b8;
`
