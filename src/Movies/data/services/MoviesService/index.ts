import type {
  CastResponse,
  GenreListResponse,
  MovieDetails,
  MovieSummary,
  VideosResponse,
} from "../../../core/types/Movie.types";

export interface MoviesServiceInterface {
  getTrending(): Promise<MovieSummary[]>;
  getPopular(): Promise<MovieSummary[]>;
  getTopRated(): Promise<MovieSummary[]>;
  getUpcoming(): Promise<MovieSummary[]>;
  getGenres(): Promise<GenreListResponse>;
  getMovieDetails(movieId: number): Promise<MovieDetails>;
  getCast(movieId: number): Promise<CastResponse>;
  getVideos(movieId: number): Promise<VideosResponse>;
  getRecommendations(movieId: number): Promise<MovieSummary[]>;
  getSimilar(movieId: number): Promise<MovieSummary[]>;
}

export { moviesService as MoviesService } from "./index.api";
