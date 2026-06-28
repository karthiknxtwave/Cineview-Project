import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('movies')

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
          <S.StateMessage>{t('trailerModal.loading')}</S.StateMessage>
        </S.StateContainer>
      )
    }

    if (error) {
      return (
        <S.StateContainer>
          <S.StateMessage>{t('trailerModal.loadError')}</S.StateMessage>
          {onRetry && (
            <S.RetryButton type="button" onClick={onRetry}>
              {t('trailerModal.retry')}
            </S.RetryButton>
          )}
        </S.StateContainer>
      )
    }

    if (!youtubeKey) {
      return (
        <S.StateContainer>
          <S.StateMessage>{t('trailerModal.unavailable')}</S.StateMessage>
        </S.StateContainer>
      )
    }

    return (
      <S.VideoWrapper>
        <S.YouTubeIframe
          src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1`}
          title={t('trailerModal.iframeTitle')}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </S.VideoWrapper>
    )
  }

  return (
    <S.Backdrop onClick={onClose}>
      <S.Content onClick={event => event.stopPropagation()}>
        <S.CloseButton
          type="button"
          onClick={onClose}
          aria-label={t('trailerModal.closeLabel')}
        >
          ×
        </S.CloseButton>
        {renderBody()}
      </S.Content>
    </S.Backdrop>
  )
}
