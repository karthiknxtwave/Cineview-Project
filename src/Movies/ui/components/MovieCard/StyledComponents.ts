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
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.overlay};
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`

export const Poster = styled.div<{ $src?: string }>`
  width: 160px;
  height: 240px;
  border-radius: 12px;
  overflow: hidden;
  background: ${({ $src, theme }) =>
    $src
      ? `url(${$src}) center / cover no-repeat`
      : `linear-gradient(135deg, ${theme.colors.heroGradientFrom}, ${theme.colors.skeletonTo})`};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
`

export const Title = styled.h3`
  margin: 10px 0 4px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const Meta = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`
