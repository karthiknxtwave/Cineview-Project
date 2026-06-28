import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useObserver } from 'mobx-react-lite'

import { ErrorBoundary, IMAGE, type TmdbLocaleParams } from '../../../Common'
import {
  createMovieWatchlistSnapshot,
  useWatchlistController,
} from '../../../Collection'
import { usePreferenceChangeEffect } from '../../../Preferences'
import {
  MovieDetailStoreProvider,
  useMovieDetailStore,
} from '../../data/movieDetailProviders'
import { ContentRow } from '../components/ContentRow'
import { TrailerModal } from '../components/TrailerModal'
import { useMovieDetailController } from '../controllers/useMovieDetailController'
import * as S from './MovieDetailStyledComponents.ts'

const MovieDetailPageContent = () => {
  const { t } = useTranslation('collection')
  const { id } = useParams()
  const movieId = Number(id)
  const store = useMovieDetailStore()
  const [isTrailerOpen, setIsTrailerOpen] = useState(false)
  const {
    movie,
    cast,
    similarMovies,
    recommendedMovies,
    detailsStatus,
    castStatus,
    similarStatus,
    recommendationsStatus,
    trailerKey,
    videosStatus,
    actions,
  } = useMovieDetailController()
  const { isInWatchlist, toggle } = useWatchlistController()
  const isMovieInWatchlist = useObserver(() =>
    isInWatchlist('movie', movieId),
  )

  const handleToggleWatchlist = () => {
    if (!movie) {
      return
    }

    toggle({
      mediaType: 'movie',
      mediaId: movie.id,
      snapshot: createMovieWatchlistSnapshot(movie),
    })
  }

  const handleOpenTrailer = () => {
    setIsTrailerOpen(true)

    if (videosStatus === 'idle') {
      void actions.fetchVideos(movieId)
    }
  }

  useEffect(() => {
    if (!Number.isFinite(movieId)) {
      return
    }

    void actions.fetchAll(movieId)
  }, [actions, movieId])

  const handleLocaleChange = useCallback(() => {
    if (!Number.isFinite(movieId)) {
      return
    }

    void actions.fetchAll(movieId)
  }, [actions, movieId])

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

  if (!Number.isFinite(movieId)) {
    return (
      <S.StateContainer>
        <S.StateTitle>Movie not found</S.StateTitle>
        <S.StateMessage>The movie ID in this URL is invalid.</S.StateMessage>
      </S.StateContainer>
    )
  }

  if (detailsStatus === 'loading') {
    return (
      <S.StateContainer>
        <S.StateMessage>Loading movie details...</S.StateMessage>
      </S.StateContainer>
    )
  }

  if (detailsStatus === 'error' || !movie) {
    return (
      <S.StateContainer>
        <S.StateTitle>Movie not found</S.StateTitle>
        <S.StateMessage>
          We couldn&apos;t find a movie with ID {movieId}.
        </S.StateMessage>
        <S.ActionButton type="button" onClick={() => void actions.fetchDetails(movieId)}>
          Retry
        </S.ActionButton>
      </S.StateContainer>
    )
  }

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE.ORIGINAL}${movie.backdrop_path}`
    : undefined

  return (
    <S.Page>
      <S.Hero $src={backdropUrl}>
        <S.HeroContent>
          <S.Title>{movie.title}</S.Title>
          {movie.tagline && <S.Tagline>{movie.tagline}</S.Tagline>}
          <S.Meta>
            {movie.release_date.slice(0, 4)} · ★ {movie.vote_average.toFixed(1)}
            {movie.runtime ? ` · ${movie.runtime} min` : ''}
            {movie.status ? ` · ${movie.status}` : ''}
          </S.Meta>
          <S.DetailsGrid>
            {movie.original_language && (
              <S.DetailItem>
                <S.DetailLabel>Language</S.DetailLabel>
                <S.DetailValue>{movie.original_language.toUpperCase()}</S.DetailValue>
              </S.DetailItem>
            )}
            {movie.vote_count > 0 && (
              <S.DetailItem>
                <S.DetailLabel>Votes</S.DetailLabel>
                <S.DetailValue>{movie.vote_count.toLocaleString()}</S.DetailValue>
              </S.DetailItem>
            )}
            {movie.homepage && (
              <S.DetailItem>
                <S.DetailLabel>Website</S.DetailLabel>
                <S.HomepageLink href={movie.homepage} target="_blank" rel="noopener noreferrer">
                  Official site
                </S.HomepageLink>
              </S.DetailItem>
            )}
          </S.DetailsGrid>
          <S.Genres>
            {movie.genres.map(genre => (
              <S.Genre key={genre.id}>{genre.name}</S.Genre>
            ))}
          </S.Genres>
          <S.Overview>{movie.overview}</S.Overview>
          <S.Actions>
            <S.WatchlistButton
              type="button"
              $active={isMovieInWatchlist}
              onClick={handleToggleWatchlist}
            >
              {isMovieInWatchlist
                ? t('watchlist.actions.remove')
                : t('watchlist.actions.add')}
            </S.WatchlistButton>
            <S.TrailerButton type="button" onClick={handleOpenTrailer}>
              Watch Trailer
            </S.TrailerButton>
          </S.Actions>
        </S.HeroContent>
      </S.Hero>

      <ErrorBoundary sectionName="Cast">
        <S.Section>
          <S.SectionTitle>Cast</S.SectionTitle>
          {castStatus === 'loading' && (
            <S.StateMessage>Loading cast...</S.StateMessage>
          )}
          {castStatus === 'error' && (
            <S.InlineError>
              Couldn&apos;t load cast.{' '}
              <S.InlineButton type="button" onClick={() => void actions.fetchCast(movieId)}>
                Retry
              </S.InlineButton>
            </S.InlineError>
          )}
          {castStatus === 'success' && (
            <>
              {cast.length > 4 && (
                <S.CastHint>Scroll for more cast members</S.CastHint>
              )}
              <S.CastRow>
                {cast.slice(0, 12).map(member => (
                <S.CastCard key={member.id}>
                  <S.CastPhoto
                    $src={
                      member.profile_path
                        ? `${IMAGE.W342}${member.profile_path}`
                        : undefined
                    }
                  />
                  <S.CastName>{member.name}</S.CastName>
                  <S.CastRole>{member.character}</S.CastRole>
                </S.CastCard>
              ))}
              </S.CastRow>
            </>
          )}
        </S.Section>
      </ErrorBoundary>

      <ErrorBoundary sectionName="Similar Movies">
        <ContentRow
          title="Similar Movies"
          movies={similarMovies}
          loading={similarStatus === 'loading'}
          error={similarStatus === 'error'}
          onRetry={() => void actions.fetchSimilar(movieId)}
        />
      </ErrorBoundary>

      <ErrorBoundary sectionName="Recommendations">
        <ContentRow
          title="Recommendations"
          movies={recommendedMovies}
          loading={recommendationsStatus === 'loading'}
          error={recommendationsStatus === 'error'}
          onRetry={() => void actions.fetchRecommendations(movieId)}
        />
      </ErrorBoundary>

      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        youtubeKey={trailerKey}
        loading={videosStatus === 'loading'}
        error={videosStatus === 'error'}
        onRetry={() => void actions.fetchVideos(movieId)}
      />
    </S.Page>
  )
}

export const MovieDetailPage = () => (
  <MovieDetailStoreProvider>
    <MovieDetailPageContent />
  </MovieDetailStoreProvider>
)
