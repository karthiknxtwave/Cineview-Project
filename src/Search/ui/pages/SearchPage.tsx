import { ErrorBoundary } from "../../../Common";
import { SearchResultCard } from "../components/SearchResultCard/index.tsx";
import { useSearchController } from "../controllers/useSearchController";
import * as S from "./StyledComponents";

const SearchPageContent = () => {
  const {
    query,
    movieResults,
    tvResults,
    personResults,
    recentSearches,
    loading,
    error,
    isEmpty,
    hasResults,
    fetchStatus,
    actions,
  } = useSearchController();

  const showRecent =
    !query.trim() && recentSearches.length > 0 && fetchStatus === "idle";

  return (
    <S.Page>
      <S.Header>
        <S.Title>Search</S.Title>
        <S.SearchInput
          type="search"
          placeholder="Search movies, TV shows, people..."
          value={query}
          onChange={event => actions.setQuery(event.target.value)}
          aria-label="Search query"
        />
      </S.Header>

      {showRecent && (
        <S.Section>
          <S.SectionHeader>
            <S.SectionTitle>Recent Searches</S.SectionTitle>
            <S.TextButton type="button" onClick={actions.clearRecentSearches}>
              Clear
            </S.TextButton>
          </S.SectionHeader>
          <S.RecentList>
            {recentSearches.map(search => (
              <S.RecentChip
                key={search}
                type="button"
                onClick={() => actions.selectRecentSearch(search)}
              >
                {search}
              </S.RecentChip>
            ))}
          </S.RecentList>
        </S.Section>
      )}

      {!query.trim() && !showRecent && (
        <S.StateMessage>
          Start typing to search the TMDB catalogue.
        </S.StateMessage>
      )}

      {loading && (
        <S.StateMessage>Searching for &ldquo;{query}&rdquo;...</S.StateMessage>
      )}

      {error && (
        <S.ErrorBox>
          <S.ErrorTitle>Something went wrong</S.ErrorTitle>
          <S.StateMessage>
            We couldn&apos;t load search results. Please try again.
          </S.StateMessage>
          <S.ActionButton type="button" onClick={() => void actions.search()}>
            Retry
          </S.ActionButton>
        </S.ErrorBox>
      )}

      {isEmpty && (
        <S.StateMessage>
          No results found for &ldquo;{query}&rdquo;.
        </S.StateMessage>
      )}

      {hasResults && (
        <>
          {movieResults.length > 0 && (
            <ErrorBoundary sectionName="Movies">
              <S.Section>
                <S.SectionTitle>Movies</S.SectionTitle>
                <S.ResultsGrid>
                  {movieResults.map(result => (
                    <SearchResultCard key={`movie-${result.id}`} result={result} />
                  ))}
                </S.ResultsGrid>
              </S.Section>
            </ErrorBoundary>
          )}

          {tvResults.length > 0 && (
            <ErrorBoundary sectionName="TV Shows">
              <S.Section>
                <S.SectionTitle>TV Shows</S.SectionTitle>
                <S.ResultsGrid>
                  {tvResults.map(result => (
                    <SearchResultCard key={`tv-${result.id}`} result={result} />
                  ))}
                </S.ResultsGrid>
              </S.Section>
            </ErrorBoundary>
          )}

          {personResults.length > 0 && (
            <ErrorBoundary sectionName="People">
              <S.Section>
                <S.SectionTitle>People</S.SectionTitle>
                <S.ResultsGrid>
                  {personResults.map(result => (
                    <SearchResultCard
                      key={`person-${result.id}`}
                      result={result}
                    />
                  ))}
                </S.ResultsGrid>
              </S.Section>
            </ErrorBoundary>
          )}
        </>
      )}
    </S.Page>
  );
};

export const SearchPage = () => <SearchPageContent />;
