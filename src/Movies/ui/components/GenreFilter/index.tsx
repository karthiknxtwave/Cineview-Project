import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('movies')

  if (loading) {
    return (
      <S.Section>
        <S.Title>{t('genreFilter.title')}</S.Title>
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
        <S.Title>{t('genreFilter.title')}</S.Title>
        <S.ErrorBox>
          <S.ErrorText>{t('genreFilter.loadError')}</S.ErrorText>
          {onRetry && (
            <S.RetryButton type="button" onClick={onRetry}>
              {t('genreFilter.retry')}
            </S.RetryButton>
          )}
        </S.ErrorBox>
      </S.Section>
    )
  }

  return (
    <S.Section>
      <S.Title>{t('genreFilter.title')}</S.Title>
      <S.ChipList>
        <S.Chip
          type="button"
          $active={selectedGenre === null}
          onClick={() => onSelectGenre(null)}
        >
          {t('genreFilter.all')}
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
