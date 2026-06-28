import type {
  CastResponse,
  GenreListResponse,
  MovieDetails,
  MovieSummary,
  VideosResponse,
} from "../../../core/types/Movie.types";
import type { TmdbLocaleParams } from "../../../../Common/core/utils/TmdbParams.utils";

export interface MoviesServiceInterface {
  getTrending(locale: TmdbLocaleParams): Promise<MovieSummary[]>;
  getPopular(locale: TmdbLocaleParams): Promise<MovieSummary[]>;
  getTopRated(locale: TmdbLocaleParams): Promise<MovieSummary[]>;
  getUpcoming(locale: TmdbLocaleParams): Promise<MovieSummary[]>;
  getGenres(locale: TmdbLocaleParams): Promise<GenreListResponse>;
  getMovieDetails(
    movieId: number,
    locale: TmdbLocaleParams,
  ): Promise<MovieDetails>;
  getCast(movieId: number, locale: TmdbLocaleParams): Promise<CastResponse>;
  getVideos(movieId: number, locale: TmdbLocaleParams): Promise<VideosResponse>;
  getRecommendations(
    movieId: number,
    locale: TmdbLocaleParams,
  ): Promise<MovieSummary[]>;
  getSimilar(
    movieId: number,
    locale: TmdbLocaleParams,
  ): Promise<MovieSummary[]>;
}

export { moviesService as MoviesService } from "./index.api";
