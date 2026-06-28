import {
  ApiClient,
  API_ROUTES,
  DEFAULT_TMDB_LOCALE,
  toTmdbQueryParams,
} from "../../../../Common";
import type { TmdbLocaleParams } from "../../../../Common/core/utils/TmdbParams.utils";

import {
  SeasonDetailsSchema,
  TVShowDetailsSchema,
} from "../../../core/types/TVShow.zod";

import type { TVShowsServiceInterface } from "./index";

class TVShowsService implements TVShowsServiceInterface {
  async getShowDetails(
    showId: number,
    locale: TmdbLocaleParams = DEFAULT_TMDB_LOCALE,
  ) {
    const response = await ApiClient.get(
      API_ROUTES.TV.DETAILS(showId),
      toTmdbQueryParams(locale),
    );

    return TVShowDetailsSchema.parse(response);
  }

  async getSeasonDetails(
    showId: number,
    seasonNumber: number,
    locale: TmdbLocaleParams = DEFAULT_TMDB_LOCALE,
  ) {
    const response = await ApiClient.get(
      API_ROUTES.TV.SEASON(showId, seasonNumber),
      toTmdbQueryParams(locale),
    );

    return SeasonDetailsSchema.parse(response);
  }
}

export const tvShowsService = new TVShowsService();
