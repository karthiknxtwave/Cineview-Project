import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { useObserver } from "mobx-react-lite";

import { formatDisplayYear, IMAGE } from "../../../../Common";
import {
  createSearchResultWatchlistSnapshot,
  useWatchlistController,
} from "../../../../Collection";
import type { SearchResult } from "../../../core/types";
import * as S from "./StyledComponents";

interface SearchResultCardProps {
  result: SearchResult;
}

const getPosterUrl = (path: string | null) =>
  path ? `${IMAGE.W342}${path}` : undefined;

const getTitle = (result: SearchResult) => {
  if (result.media_type === "person") {
    return result.name;
  }

  return result.media_type === "movie" ? result.title : result.name;
};

const getRoute = (result: SearchResult) => {
  if (result.media_type === "person") {
    return null;
  }

  return result.media_type === "movie"
    ? `/movie/${result.id}`
    : `/tv/${result.id}`;
};

const getImagePath = (result: SearchResult) => {
  if (result.media_type === "person") {
    return result.profile_path;
  }

  return result.poster_path;
};

export const SearchResultCard = ({ result }: SearchResultCardProps) => {
  const { t, i18n } = useTranslation(["search", "collection"]);
  const { isInWatchlist, toggle } = useWatchlistController();
  const posterUrl = getPosterUrl(getImagePath(result));
  const title = getTitle(result);
  const route = getRoute(result);
  const isWatchable = result.media_type !== "person";
  const mediaType = result.media_type === "movie" ? "movie" : "tv";
  const inWatchlist = useObserver(() =>
    isWatchable ? isInWatchlist(mediaType, result.id) : false,
  );

  const handleToggleWatchlist = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isWatchable) {
      return;
    }

    if (result.media_type === "movie") {
      toggle({
        mediaType: "movie",
        mediaId: result.id,
        snapshot: createSearchResultWatchlistSnapshot(result),
      });
      return;
    }

    toggle({
      mediaType: "tv",
      mediaId: result.id,
      snapshot: createSearchResultWatchlistSnapshot(result),
    });
  };

  const meta =
    result.media_type === "person"
      ? t("resultCard.castAndCrew")
      : `${formatDisplayYear(
          (result.media_type === "movie"
            ? result.release_date
            : result.first_air_date) ?? "",
          i18n.language,
        )} · ${t("resultCard.rating", {
          rating: result.vote_average.toFixed(1),
        })}`;

  const content = (
    <>
      {isWatchable && (
        <S.WatchlistButton
          type="button"
          aria-label={
            inWatchlist
              ? t("collection:watchlist.actions.removeAriaLabel")
              : t("collection:watchlist.actions.addAriaLabel")
          }
          aria-pressed={inWatchlist}
          $active={inWatchlist}
          onClick={handleToggleWatchlist}
        >
          {inWatchlist ? "✓" : "+"}
        </S.WatchlistButton>
      )}
      <S.Poster $src={posterUrl} role="img" aria-label={title} />
      <S.Title>{title}</S.Title>
      <S.Meta>{meta}</S.Meta>
      <S.Badge $type={result.media_type}>
        {t(`resultCard.mediaType.${result.media_type}`)}
      </S.Badge>
    </>
  );

  if (!route) {
    return <S.CardContainer>{content}</S.CardContainer>;
  }

  return <S.CardLink to={route}>{content}</S.CardLink>;
};
