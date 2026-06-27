import { makeAutoObservable, runInAction } from "mobx";

import {
  TVShowsService,
  type TVShowsServiceInterface,
} from "../../services/TVShowsService";
import type { SeasonDetails } from "../../../core/types/TVShow.types";

type FetchStatus = "idle" | "loading" | "success" | "error";

export class SeasonDetailStore {
  season: SeasonDetails | null = null;
  fetchStatus: FetchStatus = "idle";

  private service: TVShowsServiceInterface;

  constructor(service: TVShowsServiceInterface = TVShowsService) {
    this.service = service;
    makeAutoObservable(this);
  }

  async fetchSeasonDetails(showId: number, seasonNumber: number) {
    this.fetchStatus = "loading";

    try {
      const season = await this.service.getSeasonDetails(showId, seasonNumber);

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
