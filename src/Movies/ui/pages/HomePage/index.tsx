import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ErrorBoundary, type TmdbLocaleParams } from '../../../../Common'
import { usePreferenceChangeEffect } from '../../../../Preferences'
import { HomeStoreProvider, useHomeStore } from '../../../data/providers'
import { ContentRow } from '../../components/ContentRow'
import { GenreFilter } from '../../components/GenreFilter'
import { HeroBanner } from '../../components/HeroBanner'
import { TrailerModal } from '../../components/TrailerModal'
import { useHomeController } from '../../controllers/useHomeController'
import { useTrailerModal } from '../../controllers/useTrailerModal'
import * as S from './StyledComponents'

const ROWS = [
  { key: 'trending', titleKey: 'rows.trending' },
  { key: 'popular', titleKey: 'rows.popular' },
  { key: 'topRated', titleKey: 'rows.topRated' },
  { key: 'upcoming', titleKey: 'rows.upcoming' },
] as const

const HomePageContent = () => {
  const { t } = useTranslation('movies')
  const store = useHomeStore()
  const {
    movies,
    rowStatus,
    rowFilteredEmpty,
    genres,
    genresStatus,
    selectedGenre,
    featuredMovie,
    loading,
    heroLoading,
    error,
    actions,
  } = useHomeController()
  const trailer = useTrailerModal()

  const handleLocaleChange = useCallback(() => {
    void actions.fetchHomeData()
  }, [actions])

  const syncStoreLocale = useCallback(
    (locale: TmdbLocaleParams) => {
      store.setTmdbLocale(locale.language, locale.region)
    },
    [store],
  )

  usePreferenceChangeEffect({
    onLocaleChange: handleLocaleChange,
    syncStoreLocale,
  })

  useEffect(() => {
    void actions.fetchHomeData()
  }, [actions])

  const hasVisibleMovies = ROWS.some(row => movies[row.key].length > 0)
  const hasFilteredEmptyRows = ROWS.some(row => rowFilteredEmpty[row.key])

  if (error && !hasVisibleMovies && !loading) {
    return (
      <S.StateContainer>
        <S.StateTitle>{t('states.errorTitle')}</S.StateTitle>
        <S.StateMessage>{t('states.errorMessage')}</S.StateMessage>
        <S.ActionButton type="button" onClick={() => void actions.fetchHomeData()}>
          {t('states.retry')}
        </S.ActionButton>
      </S.StateContainer>
    )
  }

  if (!loading && !hasVisibleMovies && !hasFilteredEmptyRows) {
    return (
      <S.StateContainer>
        <S.StateTitle>{t('states.emptyTitle')}</S.StateTitle>
        <S.StateMessage>
          {selectedGenre !== null
            ? t('states.emptyFilteredMessage')
            : t('states.emptyDefaultMessage')}
        </S.StateMessage>
        {selectedGenre !== null && (
          <S.ActionButton type="button" onClick={() => actions.selectGenre(null)}>
            {t('states.clearFilter')}
          </S.ActionButton>
        )}
      </S.StateContainer>
    )
  }

  return (
    <S.Page>
      <ErrorBoundary sectionName="Hero">
        <HeroBanner
          movie={featuredMovie}
          loading={heroLoading}
          onTrailerClick={
            featuredMovie
              ? () => trailer.openTrailer(featuredMovie.id)
              : undefined
          }
        />
      </ErrorBoundary>

      <ErrorBoundary sectionName="Genres">
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onSelectGenre={actions.selectGenre}
          loading={genresStatus === 'loading' && genres.length === 0}
          error={genresStatus === 'error'}
          onRetry={() => void actions.fetchGenres()}
        />
      </ErrorBoundary>

      {ROWS.map(row => (
        <ErrorBoundary
          key={row.key}
          sectionName={t(row.titleKey)}
          onRetry={() => void actions.fetchRow(row.key)}
        >
          <ContentRow
            title={t(row.titleKey)}
            movies={movies[row.key]}
            loading={rowStatus[row.key] === 'loading' && movies[row.key].length === 0}
            error={rowStatus[row.key] === 'error'}
            filteredEmpty={rowFilteredEmpty[row.key]}
            onRetry={() => void actions.fetchRow(row.key)}
          />
        </ErrorBoundary>
      ))}

      <TrailerModal
        isOpen={trailer.isOpen}
        onClose={trailer.closeTrailer}
        youtubeKey={trailer.trailerKey}
        loading={trailer.loading}
        error={trailer.error}
        onRetry={trailer.retryTrailer}
      />
    </S.Page>
  )
}

export const HomePage = () => (
  <HomeStoreProvider>
    <HomePageContent />
  </HomeStoreProvider>
)
