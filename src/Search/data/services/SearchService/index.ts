import type { SearchResult } from "../../../core/types";
import type { TmdbLocaleParams } from "../../../../Common/core/utils/TmdbParams.utils";

export interface SearchServiceInterface {
  search(query: string, locale: TmdbLocaleParams): Promise<SearchResult[]>;
}

export { searchService, SEARCH_DEBOUNCE_MS } from "./index.api";
