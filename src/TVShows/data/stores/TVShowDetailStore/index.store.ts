import { makeAutoObservable, runInAction } from "mobx";

import {
  TVShowsService,
  type TVShowsServiceInterface,
} from "../../services/TVShowsService";
import type { TVShowDetails } from "../../../core/types/TVShow.types";

type FetchStatus = "idle" | "loading" | "success" | "error";

export class TVShowDetailStore {
  show: TVShowDetails | null = null;
  fetchStatus: FetchStatus = "idle";

  private service: TVShowsServiceInterface;

  constructor(service: TVShowsServiceInterface = TVShowsService) {
    this.service = service;
    makeAutoObservable(this);
  }

  async fetchShowDetails(showId: number) {
    this.fetchStatus = "loading";

    try {
      const show = await this.service.getShowDetails(showId);

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
