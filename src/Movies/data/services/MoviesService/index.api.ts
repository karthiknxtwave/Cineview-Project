import {
  ApiClient,
  API_ROUTES,
  DEFAULT_TMDB_LOCALE,
  toTmdbQueryParams,
} from "../../../../Common";
import type { TmdbLocaleParams } from "../../../../Common/core/utils/TmdbParams.utils";

import {
  MovieListResponseSchema,
  GenreListResponseSchema,
  MovieDetailsSchema,
  CastResponseSchema,
  VideosResponseSchema,
} from "../../../core/types/Movie.zod";

import type { MoviesServiceInterface } from "./index";

class MoviesService implements MoviesServiceInterface {
  async getTrending(locale: TmdbLocaleParams = DEFAULT_TMDB_LOCALE) {
    const response = await ApiClient.get(
      API_ROUTES.TRENDING,
      toTmdbQueryParams(locale),
    );

    return MovieListResponseSchema.parse(response).results;
  }

  async getPopular(locale: TmdbLocaleParams = DEFAULT_TMDB_LOCALE) {
    const response = await ApiClient.get(
      API_ROUTES.MOVIES.POPULAR,
      toTmdbQueryParams(locale),
    );

    return MovieListResponseSchema.parse(response).results;
  }

  async getTopRated(locale: TmdbLocaleParams = DEFAULT_TMDB_LOCALE) {
    const response = await ApiClient.get(
      API_ROUTES.MOVIES.TOP_RATED,
      toTmdbQueryParams(locale),
    );

    return MovieListResponseSchema.parse(response).results;
  }

  async getUpcoming(locale: TmdbLocaleParams = DEFAULT_TMDB_LOCALE) {
    const response = await ApiClient.get(
      API_ROUTES.MOVIES.UPCOMING,
      toTmdbQueryParams(locale),
    );

    return MovieListResponseSchema.parse(response).results;
  }

  async getGenres(locale: TmdbLocaleParams = DEFAULT_TMDB_LOCALE) {
    const response = await ApiClient.get(
      API_ROUTES.GENRES,
      toTmdbQueryParams(locale),
    );

    return GenreListResponseSchema.parse(response);
  }

  async getMovieDetails(
    movieId: number,
    locale: TmdbLocaleParams = DEFAULT_TMDB_LOCALE,
  ) {
    const response = await ApiClient.get(
      API_ROUTES.MOVIES.DETAILS(movieId),
      toTmdbQueryParams(locale),
    );

    return MovieDetailsSchema.parse(response);
  }

  async getCast(
    movieId: number,
    locale: TmdbLocaleParams = DEFAULT_TMDB_LOCALE,
  ) {
    const response = await ApiClient.get(
      API_ROUTES.MOVIES.CAST(movieId),
      toTmdbQueryParams(locale),
    );

    return CastResponseSchema.parse(response);
  }

  async getVideos(
    movieId: number,
    locale: TmdbLocaleParams = DEFAULT_TMDB_LOCALE,
  ) {
    const response = await ApiClient.get(
      API_ROUTES.MOVIES.VIDEOS(movieId),
      toTmdbQueryParams(locale),
    );

    return VideosResponseSchema.parse(response);
  }

  async getRecommendations(
    movieId: number,
    locale: TmdbLocaleParams = DEFAULT_TMDB_LOCALE,
  ) {
    const response = await ApiClient.get(
      API_ROUTES.MOVIES.RECOMMENDATIONS(movieId),
      toTmdbQueryParams(locale),
    );

    return MovieListResponseSchema.parse(response).results;
  }

  async getSimilar(
    movieId: number,
    locale: TmdbLocaleParams = DEFAULT_TMDB_LOCALE,
  ) {
    const response = await ApiClient.get(
      API_ROUTES.MOVIES.SIMILAR(movieId),
      toTmdbQueryParams(locale),
    );

    return MovieListResponseSchema.parse(response).results;
  }
}

export const moviesService = new MoviesService();
