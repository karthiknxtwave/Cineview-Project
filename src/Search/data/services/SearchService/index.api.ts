import { ApiClient, API_ROUTES } from "../../../../Common";

import {
  SearchResponseSchema,
  type SearchResult,
} from "../../../core/types";

import type { SearchServiceInterface } from "./index";

const SEARCH_DEBOUNCE_MS = 400;

class SearchService implements SearchServiceInterface {
  async search(query: string): Promise<SearchResult[]> {
    const response = await ApiClient.get(
      API_ROUTES.SEARCH.MULTI(query),
    );

    const parsedResponse = SearchResponseSchema.parse(response);

    return parsedResponse.results;
  }
}

export const searchService = new SearchService();

export { SEARCH_DEBOUNCE_MS };
