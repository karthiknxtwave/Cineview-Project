export const API_ROUTES = {
  TRENDING: "/trending/movie/week",

  MOVIES: {
    POPULAR: "/movie/popular",
    TOP_RATED: "/movie/top_rated",
    UPCOMING: "/movie/upcoming",
    DETAILS: (id: number) => `/movie/${id}`,
    CAST: (id: number) => `/movie/${id}/credits`,
    RECOMMENDATIONS: (id: number) => `/movie/${id}/recommendations`,
    SIMILAR: (id: number) => `/movie/${id}/similar`,
    VIDEOS: (id:number) => `/movie/${id}/videos`,
  },

  GENRES: "/genre/movie/list",

  TV: {
    DETAILS: (id: number) => `/tv/${id}`,
    SEASON: (id: number, seasonNumber: number) =>
      `/tv/${id}/season/${seasonNumber}`,
  },

  SEARCH: {
    MULTI: (query: string) =>
      `/search/multi?query=${encodeURIComponent(query)}`,
  },
} as const;