import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useObserver } from "mobx-react-lite";

import { ErrorBoundary } from "../../../Common";
import { SeasonDetailStoreProvider, useSeasonDetailStore } from "../../data/providers";
import * as S from "./StyledComponents.ts";

const SeasonDetailContent = () => {
  const { id, seasonNumber } = useParams();
  const showId = Number(id);
  const seasonNum = Number(seasonNumber);
  const store = useSeasonDetailStore();

  const actions = useMemo(
    () => ({
      fetchSeasonDetails: (nextShowId: number, nextSeasonNumber: number) =>
        store.fetchSeasonDetails(nextShowId, nextSeasonNumber),
    }),
    [store],
  );

  const { season, fetchStatus } = useObserver(() => ({
    season: store.season,
    fetchStatus: store.fetchStatus,
  }));

  useEffect(() => {
    if (!Number.isFinite(showId) || !Number.isFinite(seasonNum)) {
      return;
    }

    void actions.fetchSeasonDetails(showId, seasonNum);
  }, [actions, showId, seasonNum]);

  if (!Number.isFinite(showId) || !Number.isFinite(seasonNum)) {
    return null;
  }

  if (fetchStatus === "loading") {
    return (
      <S.SeasonPanel>
        <S.StateMessage>Loading season...</S.StateMessage>
      </S.SeasonPanel>
    );
  }

  if (fetchStatus === "error" || !season) {
    return (
      <S.SeasonPanel>
        <S.InlineError>Couldn&apos;t load this season.</S.InlineError>
        <S.ActionButton
          type="button"
          onClick={() => void actions.fetchSeasonDetails(showId, seasonNum)}
        >
          Retry
        </S.ActionButton>
      </S.SeasonPanel>
    );
  }

  return (
    <ErrorBoundary sectionName="Episodes">
      <S.SeasonPanel>
        <S.SectionTitle>
          {season.name} · Season {season.season_number}
        </S.SectionTitle>
        <S.EpisodeList>
          {season.episodes.map(episode => (
            <S.EpisodeCard key={episode.id}>
              <S.EpisodeHeader>
                <S.EpisodeTitle>
                  {episode.episode_number}. {episode.name}
                </S.EpisodeTitle>
                <S.EpisodeCheckbox
                  type="checkbox"
                  disabled
                  aria-label={`Mark episode ${episode.episode_number} as watched`}
                />
              </S.EpisodeHeader>
              <S.EpisodeMeta>{episode.air_date || "TBA"}</S.EpisodeMeta>
              <S.EpisodeOverview>{episode.overview}</S.EpisodeOverview>
            </S.EpisodeCard>
          ))}
        </S.EpisodeList>
      </S.SeasonPanel>
    </ErrorBoundary>
  );
};

export const SeasonDetailPage = () => (
  <SeasonDetailStoreProvider>
    <SeasonDetailContent />
  </SeasonDetailStoreProvider>
);
