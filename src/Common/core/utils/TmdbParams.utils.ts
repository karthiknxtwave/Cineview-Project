export interface TmdbLocaleParams {
  language: string
  region: string
}

export const DEFAULT_TMDB_LOCALE: TmdbLocaleParams = {
  language: "en-US",
  region: "US",
}

export function toTmdbQueryParams(
  params: TmdbLocaleParams,
): Record<string, string> {
  return {
    language: params.language,
    region: params.region,
  }
}
