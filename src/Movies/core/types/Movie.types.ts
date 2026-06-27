import { z } from "zod";

import {
  GenreSchema,
  MovieSummarySchema,
  MovieDetailsSchema,
  CastMemberSchema,
  MovieListResponseSchema,
  GenreListResponseSchema,
  CastResponseSchema,
  VideoSchema,
  VideosResponseSchema,
} from "./Movie.zod";

export type Genre = z.infer<typeof GenreSchema>;

export type MovieSummary = z.infer<typeof MovieSummarySchema>;

export type MovieDetails = z.infer<typeof MovieDetailsSchema>;

export type CastMember = z.infer<typeof CastMemberSchema>;

export type MovieListResponse = z.infer<typeof MovieListResponseSchema>;

export type GenreListResponse = z.infer<typeof GenreListResponseSchema>;

export type CastResponse = z.infer<typeof CastResponseSchema>;

export type Video = z.infer<typeof VideoSchema>;

export type VideosResponse = z.infer<typeof VideosResponseSchema>;