import type {
  SeasonDetails,
  TVShowDetails,
} from "../../../core/types/TVShow.types";

export interface TVShowsServiceInterface {
  getShowDetails(showId: number): Promise<TVShowDetails>;
  getSeasonDetails(
    showId: number,
    seasonNumber: number,
  ): Promise<SeasonDetails>;
}

export { tvShowsService as TVShowsService } from "./index.api";
