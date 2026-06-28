import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ErrorBoundary, type TmdbLocaleParams } from "../../../Common";
import { usePreferenceChangeEffect } from "../../../Preferences";
import { SearchResultCard } from "../components/SearchResultCard/index.tsx";
import { useSearchController } from "../controllers/useSearchController";
import { useSearchStore } from "../../data/providers";
import * as S from "./StyledComponents";

const SearchPageContent = () => {
  const { t } = useTranslation("search");
  const store = useSearchStore();
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

  const handleLocaleChange = useCallback(() => {
    if (query.trim()) {
      void actions.search();
    }
  }, [actions, query]);

  const syncStoreLocale = useCallback(
    (locale: TmdbLocaleParams) => {
      store.setTmdbLocale(locale.language, locale.region);
    },
    [store],
  );

  usePreferenceChangeEffect({
    onLocaleChange: handleLocaleChange,
    syncStoreLocale,
  });

  return (
    <S.Page>
      <S.Header>
        <S.Title>{t("pageTitle")}</S.Title>
        <S.SearchInput
          type="search"
          placeholder={t("searchPlaceholder")}
          value={query}
          onChange={event => actions.setQuery(event.target.value)}
          aria-label={t("searchAriaLabel")}
        />
      </S.Header>

      {showRecent && (
        <S.Section>
          <S.SectionHeader>
            <S.SectionTitle>{t("recentSearches")}</S.SectionTitle>
            <S.TextButton type="button" onClick={actions.clearRecentSearches}>
              {t("clearRecent")}
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
        <S.StateMessage>{t("idleMessage")}</S.StateMessage>
      )}

      {loading && (
        <S.StateMessage>{t("loadingMessage", { query })}</S.StateMessage>
      )}

      {error && (
        <S.ErrorBox>
          <S.ErrorTitle>{t("errorTitle")}</S.ErrorTitle>
          <S.StateMessage>{t("errorMessage")}</S.StateMessage>
          <S.ActionButton type="button" onClick={() => void actions.search()}>
            {t("retry")}
          </S.ActionButton>
        </S.ErrorBox>
      )}

      {isEmpty && (
        <S.StateMessage>{t("emptyMessage", { query })}</S.StateMessage>
      )}

      {hasResults && (
        <>
          {movieResults.length > 0 && (
            <ErrorBoundary sectionName={t("sections.movies")}>
              <S.Section>
                <S.SectionTitle>
                  {t("sections.movies")} ·{" "}
                  {t("resultCount", { count: movieResults.length })}
                </S.SectionTitle>
                <S.ResultsGrid>
                  {movieResults.map(result => (
                    <SearchResultCard key={`movie-${result.id}`} result={result} />
                  ))}
                </S.ResultsGrid>
              </S.Section>
            </ErrorBoundary>
          )}

          {tvResults.length > 0 && (
            <ErrorBoundary sectionName={t("sections.tvShows")}>
              <S.Section>
                <S.SectionTitle>
                  {t("sections.tvShows")} ·{" "}
                  {t("resultCount", { count: tvResults.length })}
                </S.SectionTitle>
                <S.ResultsGrid>
                  {tvResults.map(result => (
                    <SearchResultCard key={`tv-${result.id}`} result={result} />
                  ))}
                </S.ResultsGrid>
              </S.Section>
            </ErrorBoundary>
          )}

          {personResults.length > 0 && (
            <ErrorBoundary sectionName={t("sections.people")}>
              <S.Section>
                <S.SectionTitle>
                  {t("sections.people")} ·{" "}
                  {t("resultCount", { count: personResults.length })}
                </S.SectionTitle>
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
