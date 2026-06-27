import { z } from "zod";

const stringWithDefault = z
  .union([z.string(), z.null(), z.undefined()])
  .transform(value => value ?? "");

const numberArrayWithDefault = z
  .union([z.array(z.number()), z.null(), z.undefined()])
  .transform(value => value ?? []);

export const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const MovieSummarySchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: stringWithDefault,
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: stringWithDefault,
  vote_average: z.number(),
  vote_count: z.number(),
  popularity: z.number(),
  genre_ids: numberArrayWithDefault,
  adult: z.boolean().optional().default(false),
  original_language: stringWithDefault,
});

export const MovieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string(),
  runtime: z.number().nullable(),
  vote_average: z.number(),
  vote_count: z.number(),
  popularity: z.number(),
  genres: z.array(GenreSchema),
  homepage: z.string().nullable(),
  status: z.string(),
  tagline: z.string(),
  adult: z.boolean(),
  original_language: z.string(),
});

export const CastMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string(),
  profile_path: z.string().nullable(),
});

export const MovieListResponseSchema = z.object({
  page: z.number(),
  results: z.array(MovieSummarySchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const GenreListResponseSchema = z.object({
  genres: z.array(GenreSchema),
});

export const CastResponseSchema = z.object({
  id: z.number(),
  cast: z.array(CastMemberSchema),
});

export const VideoSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  site: z.string(),
  type: z.string(),
  official: z.boolean(),
});

export const VideosResponseSchema = z.object({
  id: z.number(),
  results: z.array(VideoSchema),
});