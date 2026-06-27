import { z } from "zod";

export const MovieSearchResultSchema = z.object({
  media_type: z.literal("movie"),

  id: z.number(),

  title: z.string(),

  overview: z.string(),

  poster_path: z.string().nullable(),

  backdrop_path: z.string().nullable(),

  release_date: z.string().optional(),

  vote_average: z.number(),

  vote_count: z.number(),

  popularity: z.number(),

  adult: z.boolean(),

  original_language: z.string(),

  genre_ids: z.array(z.number()),
});

export const TVSearchResultSchema = z.object({
  media_type: z.literal("tv"),

  id: z.number(),

  name: z.string(),

  overview: z.string(),

  poster_path: z.string().nullable(),

  backdrop_path: z.string().nullable(),

  first_air_date: z.string().optional(),

  vote_average: z.number(),

  vote_count: z.number(),

  popularity: z.number(),

  original_language: z.string(),

  genre_ids: z.array(z.number()),
});

/**
 * We validate "person" results so the API response parses successfully.
 * These will be filtered out inside SearchService.
 */
export const PersonSearchResultSchema = z.object({
  media_type: z.literal("person"),

  id: z.number(),

  name: z.string(),

  profile_path: z.string().nullable(),

  popularity: z.number(),
});

export const SearchResultSchema = z.discriminatedUnion("media_type", [
  MovieSearchResultSchema,
  TVSearchResultSchema,
  PersonSearchResultSchema,
]);

export const SearchResponseSchema = z.object({
  page: z.number(),

  results: z.array(SearchResultSchema),

  total_pages: z.number(),

  total_results: z.number(),
});