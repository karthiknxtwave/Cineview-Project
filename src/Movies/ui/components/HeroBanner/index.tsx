import { useTranslation } from 'react-i18next'

import { formatDisplayYear, IMAGE } from '../../../../Common'
import type { MovieSummary } from '../../../core/types/Movie.types'
import * as S from './StyledComponents'

interface HeroBannerProps {
  movie?: MovieSummary
  loading?: boolean
  onTrailerClick?: () => void
}

const getBackdropUrl = (path: string | null) =>
  path ? `${IMAGE.ORIGINAL}${path}` : undefined

export const HeroBanner = ({
  movie,
  loading = false,
  onTrailerClick,
}: HeroBannerProps) => {
  const { t, i18n } = useTranslation('movies')

  if (loading) {
    return (
      <S.Skeleton>
        <S.SkeletonLine $width="120px" $height="14px" />
        <S.SkeletonLine $width="55%" $height="42px" />
        <S.SkeletonLine $width="80%" $height="16px" />
        <S.SkeletonLine $width="70%" $height="16px" />
        <S.SkeletonLine $width="160px" $height="44px" />
      </S.Skeleton>
    )
  }

  if (!movie) {
    return null
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path)
  const releaseYear = formatDisplayYear(movie.release_date, i18n.language)

  return (
    <S.Banner $src={backdropUrl}>
      <S.Content>
        <S.Eyebrow>{t('hero.featured')}</S.Eyebrow>
        <S.Title>{movie.title}</S.Title>
        <S.Meta>
          {releaseYear} · {t('hero.rating', { rating: movie.vote_average.toFixed(1) })}
        </S.Meta>
        <S.Overview>{movie.overview}</S.Overview>
        <S.Actions>
          <S.Cta to={`/movie/${movie.id}`}>{t('hero.viewDetails')}</S.Cta>
          <S.TrailerButton
            type="button"
            onClick={onTrailerClick}
            disabled={!onTrailerClick}
          >
            {t('hero.watchTrailer')}
          </S.TrailerButton>
        </S.Actions>
      </S.Content>
    </S.Banner>
  )
}
