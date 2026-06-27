import { z } from "zod";

import {
  TVSeasonSummarySchema,
  TVShowDetailsSchema,
  EpisodeSchema,
  SeasonDetailsSchema,
} from "./TVShow.zod";

export type TVSeasonSummary = z.infer<typeof TVSeasonSummarySchema>;
export type TVShowDetails = z.infer<typeof TVShowDetailsSchema>;
export type Episode = z.infer<typeof EpisodeSchema>;
export type SeasonDetails = z.infer<typeof SeasonDetailsSchema>;
