import { useTranslation } from "react-i18next"

import { WATCHLIST_FILTERS } from "../../../core/constants/Watchlist.constants"

import type { WatchlistFilter } from "../../../core/types/Watchlist.types"

import * as S from "./StyledComponents"

interface WatchlistFilterTabsProps {
  activeFilter: WatchlistFilter
  counts: Record<WatchlistFilter, number>
  onFilterChange: (filter: WatchlistFilter) => void
}

export const WatchlistFilterTabs = ({
  activeFilter,
  counts,
  onFilterChange,
}: WatchlistFilterTabsProps) => {
  const { t } = useTranslation("collection")

  return (
    <S.TabList role="tablist" aria-label={t("watchlist.filter.ariaLabel")}>
      {WATCHLIST_FILTERS.map(filter => {
        const isActive = activeFilter === filter

        return (
          <S.Tab
            key={filter}
            type="button"
            role="tab"
            aria-selected={isActive}
            $active={isActive}
            onClick={() => onFilterChange(filter)}
          >
            {t(`watchlist.filter.${filter}`)}
            <S.Count
              aria-label={t("watchlist.filter.itemCount", {
                count: counts[filter],
              })}
            >
              {counts[filter]}
            </S.Count>
          </S.Tab>
        )
      })}
    </S.TabList>
  )
}
