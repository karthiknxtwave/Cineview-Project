import { useTranslation } from 'react-i18next'

import type { MovieSummary } from '../../../core/types/Movie.types'
import { MovieCard } from '../MovieCard'
import * as S from './StyledComponents'

interface ContentRowProps {
  title: string
  movies: MovieSummary[]
  loading?: boolean
  error?: boolean
  filteredEmpty?: boolean
  onRetry?: () => void
}

const SKELETON_COUNT = 6

export const ContentRow = ({
  title,
  movies,
  loading = false,
  error = false,
  filteredEmpty = false,
  onRetry,
}: ContentRowProps) => {
  const { t } = useTranslation('movies')

  if (error) {
    return (
      <S.Section>
        <S.Title>{title}</S.Title>
        <S.ErrorBox>
          <S.ErrorText>{t('contentRow.loadError')}</S.ErrorText>
          {onRetry && (
            <S.RetryButton type="button" onClick={onRetry}>
              {t('contentRow.retry')}
            </S.RetryButton>
          )}
        </S.ErrorBox>
      </S.Section>
    )
  }

  if (filteredEmpty) {
    return (
      <S.Section>
        <S.Title>{title}</S.Title>
        <S.EmptyBox>
          <S.ErrorText>{t('contentRow.filteredEmpty')}</S.ErrorText>
        </S.EmptyBox>
      </S.Section>
    )
  }

  if (!loading && movies.length === 0) {
    return null
  }

  return (
    <S.Section>
      <S.Title>{title}</S.Title>
      <S.Row>
        {loading
          ? Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <S.SkeletonCard key={index} />
            ))
          : movies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isInWatchlist={false}
                onToggleWatchlist={() => undefined}
              />
            ))}
      </S.Row>
    </S.Section>
  )
}
