import { useCallback, useEffect, useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useObserver } from "mobx-react-lite";

import { ErrorBoundary, IMAGE, type TmdbLocaleParams } from "../../../Common";
import {
  createTvShowWatchlistSnapshot,
  useWatchlistController,
} from "../../../Collection";
import { usePreferenceChangeEffect } from "../../../Preferences";
import { TVShowDetailStoreProvider, useTVShowDetailStore } from "../../data/providers";
import * as S from "./StyledComponents";

const TVShowDetailContent = () => {
  const { t } = useTranslation("collection");
  const { id } = useParams();
  const showId = Number(id);
  const store = useTVShowDetailStore();
  const { isInWatchlist, toggle } = useWatchlistController();
  const isShowInWatchlist = useObserver(() => isInWatchlist("tv", showId));

  const actions = useMemo(
    () => ({
      fetchShowDetails: (nextShowId: number) =>
        store.fetchShowDetails(nextShowId),
    }),
    [store],
  );

  const { show, fetchStatus } = useObserver(() => ({
    show: store.show,
    fetchStatus: store.fetchStatus,
  }));

  useEffect(() => {
    if (!Number.isFinite(showId)) {
      return;
    }

    void actions.fetchShowDetails(showId);
  }, [actions, showId]);

  const handleLocaleChange = useCallback(() => {
    if (!Number.isFinite(showId)) {
      return;
    }

    void actions.fetchShowDetails(showId);
  }, [actions, showId]);

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

  if (!Number.isFinite(showId)) {
    return (
      <S.StateContainer>
        <S.StateTitle>TV show not found</S.StateTitle>
      </S.StateContainer>
    );
  }

  if (fetchStatus === "loading") {
    return (
      <S.StateContainer>
        <S.StateMessage>Loading TV show...</S.StateMessage>
      </S.StateContainer>
    );
  }

  if (fetchStatus === "error" || !show) {
    return (
      <S.StateContainer>
        <S.StateTitle>TV show not found</S.StateTitle>
        <S.ActionButton
          type="button"
          onClick={() => void actions.fetchShowDetails(showId)}
        >
          Retry
        </S.ActionButton>
      </S.StateContainer>
    );
  }

  const backdropUrl = show.backdrop_path
    ? `${IMAGE.ORIGINAL}${show.backdrop_path}`
    : undefined;

  const handleToggleWatchlist = () => {
    toggle({
      mediaType: "tv",
      mediaId: show.id,
      snapshot: createTvShowWatchlistSnapshot(show),
    });
  };

  return (
    <S.Page>
      <S.Hero $src={backdropUrl}>
        <S.Title>{show.name}</S.Title>
        <S.Meta>
          {show.first_air_date.slice(0, 4)} · ★ {show.vote_average.toFixed(1)} ·{" "}
          {show.number_of_seasons} seasons
        </S.Meta>
        <S.Overview>{show.overview}</S.Overview>
        <S.WatchlistButton
          type="button"
          $active={isShowInWatchlist}
          onClick={handleToggleWatchlist}
        >
          {isShowInWatchlist
            ? t("watchlist.actions.remove")
            : t("watchlist.actions.add")}
        </S.WatchlistButton>
      </S.Hero>

      <ErrorBoundary sectionName="Seasons">
        <S.Section>
          <S.SectionTitle>Seasons</S.SectionTitle>
          <S.SeasonList>
            {show.seasons
              .filter(season => season.season_number > 0)
              .map(season => (
                <S.SeasonLink
                  key={season.id}
                  to={`/tv/${show.id}/season/${season.season_number}`}
                >
                  <S.SeasonName>
                    {season.name} ({season.episode_count} episodes)
                  </S.SeasonName>
                </S.SeasonLink>
              ))}
          </S.SeasonList>
        </S.Section>
      </ErrorBoundary>

      <Outlet />
    </S.Page>
  );
};

export const TVShowDetailPage = () => (
  <TVShowDetailStoreProvider>
    <TVShowDetailContent />
  </TVShowDetailStoreProvider>
);
