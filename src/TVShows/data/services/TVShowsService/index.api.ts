import { ApiClient, API_ROUTES } from "../../../../Common";

import {
  SeasonDetailsSchema,
  TVShowDetailsSchema,
} from "../../../core/types/TVShow.zod";

import type { TVShowsServiceInterface } from "./index";

class TVShowsService implements TVShowsServiceInterface {
  async getShowDetails(showId: number) {
    const response = await ApiClient.get(API_ROUTES.TV.DETAILS(showId));

    return TVShowDetailsSchema.parse(response);
  }

  async getSeasonDetails(showId: number, seasonNumber: number) {
    const response = await ApiClient.get(
      API_ROUTES.TV.SEASON(showId, seasonNumber),
    );

    return SeasonDetailsSchema.parse(response);
  }
}

export const tvShowsService = new TVShowsService();
