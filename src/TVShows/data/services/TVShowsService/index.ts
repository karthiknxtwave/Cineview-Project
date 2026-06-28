import type {
  SeasonDetails,
  TVShowDetails,
} from "../../../core/types/TVShow.types";
import type { TmdbLocaleParams } from "../../../../Common/core/utils/TmdbParams.utils";

export interface TVShowsServiceInterface {
  getShowDetails(
    showId: number,
    locale: TmdbLocaleParams,
  ): Promise<TVShowDetails>;
  getSeasonDetails(
    showId: number,
    seasonNumber: number,
    locale: TmdbLocaleParams,
  ): Promise<SeasonDetails>;
}

export { tvShowsService as TVShowsService } from "./index.api";
