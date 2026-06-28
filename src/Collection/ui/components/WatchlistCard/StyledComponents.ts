import { Link } from "react-router-dom"
import styled from "styled-components"

export const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
`

export const RemoveButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.overlay};
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.danger};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`

export const PosterLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
`

export const Poster = styled.div<{ $src?: string }>`
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: 12px;
  overflow: hidden;
  background: ${({ $src, theme }) =>
    $src
      ? `url(${$src}) center / cover no-repeat`
      : `linear-gradient(135deg, ${theme.colors.heroGradientFrom}, ${theme.colors.skeletonTo})`};
`

export const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  margin-top: 14px;
`

export const TitleLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover h3 {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s;
`

export const Meta = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const StatusField = styled.div`
  margin-top: auto;
`

export const StatusLabel = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`
