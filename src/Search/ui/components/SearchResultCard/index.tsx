import { IMAGE } from "../../../../Common";
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

const getYear = (result: SearchResult) => {
  if (result.media_type === "person") {
    return "Person";
  }

  const date =
    result.media_type === "movie"
      ? result.release_date
      : result.first_air_date;

  return date ? date.slice(0, 4) : "—";
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
  const posterUrl = getPosterUrl(getImagePath(result));
  const title = getTitle(result);
  const route = getRoute(result);
  const meta =
    result.media_type === "person"
      ? "Cast & crew"
      : `${getYear(result)} · ★ ${result.vote_average.toFixed(1)}`;

  const content = (
    <>
      <S.Poster $src={posterUrl} role="img" aria-label={title} />
      <S.Title>{title}</S.Title>
      <S.Meta>{meta}</S.Meta>
      <S.Badge $type={result.media_type}>
        {result.media_type.toUpperCase()}
      </S.Badge>
    </>
  );

  if (!route) {
    return <S.CardContainer>{content}</S.CardContainer>;
  }

  return <S.CardLink to={route}>{content}</S.CardLink>;
};
