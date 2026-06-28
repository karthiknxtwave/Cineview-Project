import { makeAutoObservable, runInAction } from "mobx";

import {
  DEFAULT_TMDB_LOCALE,
  type TmdbLocaleParams,
} from "../../../../Common/core/utils/TmdbParams.utils";

import {
  TVShowsService,
  type TVShowsServiceInterface,
} from "../../services/TVShowsService";
import type { SeasonDetails } from "../../../core/types/TVShow.types";

type FetchStatus = "idle" | "loading" | "success" | "error";

export class SeasonDetailStore {
  season: SeasonDetails | null = null;
  fetchStatus: FetchStatus = "idle";

  private tmdbLocale: TmdbLocaleParams = DEFAULT_TMDB_LOCALE;

  private service: TVShowsServiceInterface;

  constructor(service: TVShowsServiceInterface = TVShowsService) {
    this.service = service;
    makeAutoObservable(this);
  }

  setTmdbLocale(language: string, region: string) {
    this.tmdbLocale = { language, region };
  }

  async fetchSeasonDetails(showId: number, seasonNumber: number) {
    this.fetchStatus = "loading";

    try {
      const season = await this.service.getSeasonDetails(
        showId,
        seasonNumber,
        this.tmdbLocale,
      );

      runInAction(() => {
        this.season = season;
        this.fetchStatus = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.season = null;
        this.fetchStatus = "error";
      });

      console.error(error);
    }
  }
}
