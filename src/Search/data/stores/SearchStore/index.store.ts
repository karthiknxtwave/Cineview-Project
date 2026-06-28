import { makeAutoObservable, runInAction } from "mobx";

import {
  DEFAULT_TMDB_LOCALE,
  type TmdbLocaleParams,
} from "../../../../Common/core/utils/TmdbParams.utils";

import {
  searchService,
  SEARCH_DEBOUNCE_MS,
  type SearchServiceInterface,
} from "../../services/SearchService";

import type { SearchResult } from "../../../core/types";

import {
  RECENT_SEARCHES_KEY,
  MAX_RECENT_SEARCHES,
} from "../../../core/constants/Search.constants";

type FetchStatus = "idle" | "loading" | "success" | "error";

export class SearchStore {
  query = "";

  results: SearchResult[] = [];

  recentSearches: string[] = [];

  fetchStatus: FetchStatus = "idle";

  private tmdbLocale: TmdbLocaleParams = DEFAULT_TMDB_LOCALE;

  private searchRequestId = 0;

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  private service: SearchServiceInterface;

  constructor(service: SearchServiceInterface = searchService) {
    this.service = service;
    makeAutoObservable(this);

    this.loadRecentSearches();
  }

  setTmdbLocale(language: string, region: string) {
    this.tmdbLocale = { language, region };
  }

  setQuery(query: string) {
    this.query = query;

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    if (!query.trim()) {
      this.results = [];
      this.fetchStatus = "idle";
      return;
    }

    this.debounceTimer = setTimeout(() => {
      void this.search();
    }, SEARCH_DEBOUNCE_MS);
  }

  selectRecentSearch(query: string) {
    this.setQuery(query);
  }

  async search(query: string = this.query) {
    const trimmedQuery = query.trim();
    const requestId = ++this.searchRequestId;

    this.query = trimmedQuery;

    if (!trimmedQuery) {
      runInAction(() => {
        this.results = [];
        this.fetchStatus = "idle";
      });

      return;
    }

    this.fetchStatus = "loading";

    try {
      const results = await this.service.search(trimmedQuery, this.tmdbLocale);

      if (requestId !== this.searchRequestId) {
        return;
      }

      runInAction(() => {
        this.results = results;
        this.fetchStatus = "success";
      });

      this.addRecentSearch(trimmedQuery);
    } catch (error) {
      if (requestId !== this.searchRequestId) {
        return;
      }

      runInAction(() => {
        this.fetchStatus = "error";
      });

      console.error(error);
    }
  }

  loadRecentSearches() {
    const storedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);

    if (!storedSearches) {
      this.recentSearches = [];
      return;
    }

    try {
      this.recentSearches = JSON.parse(storedSearches);
    } catch {
      this.recentSearches = [];
    }
  }

  clearRecentSearches() {
    this.recentSearches = [];
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  }

  private addRecentSearch(query: string) {
    const updatedSearches = [
      query,
      ...this.recentSearches.filter(
        search => search.toLowerCase() !== query.toLowerCase(),
      ),
    ].slice(0, MAX_RECENT_SEARCHES);

    this.recentSearches = updatedSearches;

    localStorage.setItem(
      RECENT_SEARCHES_KEY,
      JSON.stringify(updatedSearches),
    );
  }

  get movieResults() {
    return this.results.filter(result => result.media_type === "movie");
  }

  get tvResults() {
    return this.results.filter(result => result.media_type === "tv");
  }

  get personResults() {
    return this.results.filter(result => result.media_type === "person");
  }

  get hasResults() {
    return this.results.length > 0;
  }

  get isLoading() {
    return this.fetchStatus === "loading";
  }

  get isEmpty() {
    return this.fetchStatus === "success" && this.results.length === 0;
  }
}
