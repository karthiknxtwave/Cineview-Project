import { ApiClient, API_ROUTES } from "../../../../Common";

import {
  MovieListResponseSchema,
  GenreListResponseSchema,
  MovieDetailsSchema,
  CastResponseSchema,
  VideosResponseSchema,
} from "../../../core/types/Movie.zod";

import type { MoviesServiceInterface } from "./index";

class MoviesService implements MoviesServiceInterface {
  async getTrending() {
    const response = await ApiClient.get(API_ROUTES.TRENDING);

    return MovieListResponseSchema.parse(response).results;
  }

  async getPopular() {
    const response = await ApiClient.get(API_ROUTES.MOVIES.POPULAR);

    return MovieListResponseSchema.parse(response).results;
  }

  async getTopRated() {
    const response = await ApiClient.get(API_ROUTES.MOVIES.TOP_RATED);

    return MovieListResponseSchema.parse(response).results;
  }

  async getUpcoming() {
    const response = await ApiClient.get(API_ROUTES.MOVIES.UPCOMING);

    return MovieListResponseSchema.parse(response).results;
  }

  async getGenres() {
    const response = await ApiClient.get(API_ROUTES.GENRES);

    return GenreListResponseSchema.parse(response);
  }

  async getMovieDetails(movieId: number) {
    const response = await ApiClient.get(
      API_ROUTES.MOVIES.DETAILS(movieId),
    );

    return MovieDetailsSchema.parse(response);
  }

  async getCast(movieId: number) {
    const response = await ApiClient.get(API_ROUTES.MOVIES.CAST(movieId));

    return CastResponseSchema.parse(response);
  }

  async getVideos(movieId: number) {
    const response = await ApiClient.get(
      API_ROUTES.MOVIES.VIDEOS(movieId),
    );
  
    return VideosResponseSchema.parse(response);
  }

  async getRecommendations(movieId: number) {
    const response = await ApiClient.get(
      API_ROUTES.MOVIES.RECOMMENDATIONS(movieId),
    );

    return MovieListResponseSchema.parse(response).results;
  }

  async getSimilar(movieId: number) {
    const response = await ApiClient.get(
      API_ROUTES.MOVIES.SIMILAR(movieId),
    );

    return MovieListResponseSchema.parse(response).results;
  }
}

export const moviesService = new MoviesService();
