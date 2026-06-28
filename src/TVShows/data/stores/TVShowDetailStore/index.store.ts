import { makeAutoObservable, runInAction } from "mobx";

import {
  DEFAULT_TMDB_LOCALE,
  type TmdbLocaleParams,
} from "../../../../Common/core/utils/TmdbParams.utils";

import {
  TVShowsService,
  type TVShowsServiceInterface,
} from "../../services/TVShowsService";
import type { TVShowDetails } from "../../../core/types/TVShow.types";

type FetchStatus = "idle" | "loading" | "success" | "error";

export class TVShowDetailStore {
  show: TVShowDetails | null = null;
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

  async fetchShowDetails(showId: number) {
    this.fetchStatus = "loading";

    try {
      const show = await this.service.getShowDetails(showId, this.tmdbLocale);

      runInAction(() => {
        this.show = show;
        this.fetchStatus = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.show = null;
        this.fetchStatus = "error";
      });

      console.error(error);
    }
  }
}
