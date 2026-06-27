import { useEffect } from 'react'

import { ErrorBoundary } from '../../../../Common'
import { HomeStoreProvider } from '../../../data/providers'
import { ContentRow } from '../../components/ContentRow'
import { GenreFilter } from '../../components/GenreFilter'
import { HeroBanner } from '../../components/HeroBanner'
import { TrailerModal } from '../../components/TrailerModal'
import { useHomeController } from '../../controllers/useHomeController'
import { useTrailerModal } from '../../controllers/useTrailerModal'
import * as S from './StyledComponents'

const ROWS = [
  { key: 'trending', title: 'Trending Now' },
  { key: 'popular', title: 'Popular' },
  { key: 'topRated', title: 'Top Rated' },
  { key: 'upcoming', title: 'Upcoming' },
] as const

const HomePageContent = () => {
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

  useEffect(() => {
    void actions.fetchHomeData()
  }, [actions])

  const hasVisibleMovies = ROWS.some(row => movies[row.key].length > 0)
  const hasFilteredEmptyRows = ROWS.some(row => rowFilteredEmpty[row.key])

  if (error && !hasVisibleMovies && !loading) {
    return (
      <S.StateContainer>
        <S.StateTitle>Something went wrong</S.StateTitle>
        <S.StateMessage>
          We couldn&apos;t load movies right now. Please try again.
        </S.StateMessage>
        <S.ActionButton type="button" onClick={() => void actions.fetchHomeData()}>
          Retry
        </S.ActionButton>
      </S.StateContainer>
    )
  }

  if (!loading && !hasVisibleMovies && !hasFilteredEmptyRows) {
    return (
      <S.StateContainer>
        <S.StateTitle>No movies found</S.StateTitle>
        <S.StateMessage>
          {selectedGenre !== null
            ? 'Try selecting a different genre or clear the filter.'
            : 'There are no movies to show at the moment.'}
        </S.StateMessage>
        {selectedGenre !== null && (
          <S.ActionButton type="button" onClick={() => actions.selectGenre(null)}>
            Clear Filter
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
          sectionName={row.title}
          onRetry={() => void actions.fetchRow(row.key)}
        >
          <ContentRow
            title={row.title}
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
