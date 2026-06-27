import { useEffect } from 'react'

import * as S from './StyledComponents'

export interface TrailerModalProps {
  isOpen: boolean
  onClose: () => void
  youtubeKey: string | null
  loading?: boolean
  error?: boolean
  onRetry?: () => void
}

export const TrailerModal = ({
  isOpen,
  onClose,
  youtubeKey,
  loading = false,
  error = false,
  onRetry,
}: TrailerModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const renderBody = () => {
    if (loading) {
      return (
        <S.StateContainer>
          <S.StateMessage>Loading trailer…</S.StateMessage>
        </S.StateContainer>
      )
    }

    if (error) {
      return (
        <S.StateContainer>
          <S.StateMessage>Couldn&apos;t load the trailer.</S.StateMessage>
          {onRetry && (
            <S.RetryButton type="button" onClick={onRetry}>
              Retry
            </S.RetryButton>
          )}
        </S.StateContainer>
      )
    }

    if (!youtubeKey) {
      return (
        <S.StateContainer>
          <S.StateMessage>
            No trailer is available for this movie.
          </S.StateMessage>
        </S.StateContainer>
      )
    }

    return (
      <S.VideoWrapper>
        <S.YouTubeIframe
          src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1`}
          title="Movie trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </S.VideoWrapper>
    )
  }

  return (
    <S.Backdrop onClick={onClose}>
      <S.Content onClick={event => event.stopPropagation()}>
        <S.CloseButton type="button" onClick={onClose} aria-label="Close trailer">
          ×
        </S.CloseButton>
        {renderBody()}
      </S.Content>
    </S.Backdrop>
  )
}
