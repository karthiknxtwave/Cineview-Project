import { useMemo } from "react";
import { useObserver } from "mobx-react-lite";
import { useSearchStore } from "../../data/providers";

export function useSearchController() {
  const store = useSearchStore();

  const actions = useMemo(
    () => ({
      setQuery: (query: string) => store.setQuery(query),
      search: (query?: string) => store.search(query),
      selectRecentSearch: (query: string) => store.selectRecentSearch(query),
      clearRecentSearches: () => store.clearRecentSearches(),
    }),
    [store],
  );

  const state = useObserver(() => ({
    query: store.query,
    results: store.results,
    movieResults: store.movieResults,
    tvResults: store.tvResults,
    personResults: store.personResults,
    recentSearches: store.recentSearches,
    loading: store.isLoading,
    error: store.fetchStatus === "error",
    isEmpty: store.isEmpty,
    hasResults: store.hasResults,
    fetchStatus: store.fetchStatus,
  }));

  return { ...state, actions };
}
