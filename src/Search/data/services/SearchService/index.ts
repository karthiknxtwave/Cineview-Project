import type { SearchResult } from "../../../core/types";

export interface SearchServiceInterface {
  search(query: string): Promise<SearchResult[]>;
}

export { searchService, SEARCH_DEBOUNCE_MS } from "./index.api";
