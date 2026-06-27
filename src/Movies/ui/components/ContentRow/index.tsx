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
  if (error) {
    return (
      <S.Section>
        <S.Title>{title}</S.Title>
        <S.ErrorBox>
          <S.ErrorText>Couldn&apos;t load this row.</S.ErrorText>
          {onRetry && (
            <S.RetryButton type="button" onClick={onRetry}>
              Retry
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
          <S.ErrorText>No movies match this genre in this row.</S.ErrorText>
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
