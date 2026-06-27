import { z } from "zod";

import {
  MovieSearchResultSchema,
  TVSearchResultSchema,
  PersonSearchResultSchema,
  SearchResultSchema,
  SearchResponseSchema,
} from "./Search.zod";

export type MovieSearchResult = z.infer<typeof MovieSearchResultSchema>;

export type TVSearchResult = z.infer<typeof TVSearchResultSchema>;

export type PersonSearchResult = z.infer<typeof PersonSearchResultSchema>;

export type SearchResult = z.infer<typeof SearchResultSchema>;

export type SearchResponse = z.infer<typeof SearchResponseSchema>;