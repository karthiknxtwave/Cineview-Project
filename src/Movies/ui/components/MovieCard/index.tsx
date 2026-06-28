import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { IMAGE } from '../../../../Common'
import type { MovieSummary } from '../../../core/types/Movie.types'
import * as S from './StyledComponents'

interface MovieCardProps {
  movie: MovieSummary
  isInWatchlist?: boolean
  onToggleWatchlist?: () => void
}

const getPosterUrl = (path: string | null) =>
  path ? `${IMAGE.W342}${path}` : undefined

const getReleaseYear = (releaseDate: string) =>
  releaseDate ? releaseDate.slice(0, 4) : '—'

export const MovieCard = ({
  movie,
  isInWatchlist = false,
  onToggleWatchlist,
}: MovieCardProps) => {
  const { t } = useTranslation('collection')
  const posterUrl = getPosterUrl(movie.poster_path)

  const handleToggleWatchlist = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
    event.stopPropagation()
    onToggleWatchlist?.()
  }

  return (
    <S.Card>
      <S.WatchlistButton
        type="button"
        aria-label={
          isInWatchlist
            ? t('watchlist.actions.removeAriaLabel')
            : t('watchlist.actions.addAriaLabel')
        }
        aria-pressed={isInWatchlist}
        $active={isInWatchlist}
        onClick={handleToggleWatchlist}
      >
        {isInWatchlist ? '✓' : '+'}
      </S.WatchlistButton>

      <S.CardLink to={`/movie/${movie.id}`}>
        <S.Poster $src={posterUrl} role="img" aria-label={movie.title} />
        <S.Title>{movie.title}</S.Title>
        <S.Meta>
          {getReleaseYear(movie.release_date)} · ★ {movie.vote_average.toFixed(1)}
        </S.Meta>
      </S.CardLink>
    </S.Card>
  )
}
