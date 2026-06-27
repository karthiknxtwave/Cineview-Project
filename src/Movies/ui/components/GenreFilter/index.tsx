import type { Genre } from '../../../core/types/Movie.types'
import * as S from './StyledComponents'

interface GenreFilterProps {
  genres: Genre[]
  selectedGenre: number | null
  onSelectGenre: (genreId: number | null) => void
  loading?: boolean
  error?: boolean
  onRetry?: () => void
}

const SKELETON_CHIP_COUNT = 8

export const GenreFilter = ({
  genres,
  selectedGenre,
  onSelectGenre,
  loading = false,
  error = false,
  onRetry,
}: GenreFilterProps) => {
  if (loading) {
    return (
      <S.Section>
        <S.Title>Browse by Genre</S.Title>
        <S.ChipList>
          {Array.from({ length: SKELETON_CHIP_COUNT }, (_, index) => (
            <S.SkeletonChip key={index} />
          ))}
        </S.ChipList>
      </S.Section>
    )
  }

  if (error) {
    return (
      <S.Section>
        <S.Title>Browse by Genre</S.Title>
        <S.ErrorBox>
          <S.ErrorText>Couldn&apos;t load genres.</S.ErrorText>
          {onRetry && (
            <S.RetryButton type="button" onClick={onRetry}>
              Retry
            </S.RetryButton>
          )}
        </S.ErrorBox>
      </S.Section>
    )
  }

  return (
    <S.Section>
      <S.Title>Browse by Genre</S.Title>
      <S.ChipList>
        <S.Chip
          type="button"
          $active={selectedGenre === null}
          onClick={() => onSelectGenre(null)}
        >
          All
        </S.Chip>
        {genres.map(genre => (
          <S.Chip
            key={genre.id}
            type="button"
            $active={selectedGenre === genre.id}
            onClick={() => onSelectGenre(genre.id)}
          >
            {genre.name}
          </S.Chip>
        ))}
      </S.ChipList>
    </S.Section>
  )
}
