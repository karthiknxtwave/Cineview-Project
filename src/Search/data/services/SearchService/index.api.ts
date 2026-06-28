import {
  ApiClient,
  API_ROUTES,
  DEFAULT_TMDB_LOCALE,
  toTmdbQueryParams,
} from "../../../../Common";
import type { TmdbLocaleParams } from "../../../../Common/core/utils/TmdbParams.utils";

import {
  SearchResponseSchema,
  type SearchResult,
} from "../../../core/types";

import type { SearchServiceInterface } from "./index";

const SEARCH_DEBOUNCE_MS = 400;

class SearchService implements SearchServiceInterface {
  async search(
    query: string,
    locale: TmdbLocaleParams = DEFAULT_TMDB_LOCALE,
  ): Promise<SearchResult[]> {
    const response = await ApiClient.get(
      API_ROUTES.SEARCH.MULTI(query),
      toTmdbQueryParams(locale),
    );

    const parsedResponse = SearchResponseSchema.parse(response);

    return parsedResponse.results;
  }
}

export const searchService = new SearchService();

export { SEARCH_DEBOUNCE_MS };
