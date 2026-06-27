import { z } from "zod";

export const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const TVSeasonSummarySchema = z.object({
  id: z.number(),
  name: z.string(),
  season_number: z.number(),
  episode_count: z.number(),
  poster_path: z.string().nullable(),
});

export const TVShowDetailsSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  first_air_date: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  genres: z.array(GenreSchema),
  seasons: z.array(TVSeasonSummarySchema),
  number_of_seasons: z.number(),
});

export const EpisodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  air_date: z.string(),
  episode_number: z.number(),
  season_number: z.number(),
  still_path: z.string().nullable(),
});

export const SeasonDetailsSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  season_number: z.number(),
  episodes: z.array(EpisodeSchema),
});
