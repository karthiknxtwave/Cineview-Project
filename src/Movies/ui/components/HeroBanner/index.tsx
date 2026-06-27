import { IMAGE } from '../../../../Common'
import type { MovieSummary } from '../../../core/types/Movie.types'
import * as S from './StyledComponents'

interface HeroBannerProps {
  movie?: MovieSummary
  loading?: boolean
  onTrailerClick?: () => void
}

const getBackdropUrl = (path: string | null) =>
  path ? `${IMAGE.ORIGINAL}${path}` : undefined

const getReleaseYear = (releaseDate: string) =>
  releaseDate ? releaseDate.slice(0, 4) : '—'

export const HeroBanner = ({
  movie,
  loading = false,
  onTrailerClick,
}: HeroBannerProps) => {
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

  return (
    <S.Banner $src={backdropUrl}>
      <S.Content>
        <S.Eyebrow>Featured</S.Eyebrow>
        <S.Title>{movie.title}</S.Title>
        <S.Meta>
          {getReleaseYear(movie.release_date)} · ★ {movie.vote_average.toFixed(1)}
        </S.Meta>
        <S.Overview>{movie.overview}</S.Overview>
        <S.Actions>
          <S.Cta to={`/movie/${movie.id}`}>View Details</S.Cta>
          <S.TrailerButton
            type="button"
            onClick={onTrailerClick}
            disabled={!onTrailerClick}
          >
            Watch Trailer
          </S.TrailerButton>
        </S.Actions>
      </S.Content>
    </S.Banner>
  )
}
