import { useTranslation } from "react-i18next"

import { WATCHLIST_SORT_OPTIONS } from "../../../core/constants/Watchlist.constants"

import type { WatchlistSortOption } from "../../../core/types/Watchlist.types"

import * as S from "./StyledComponents"

interface WatchlistSortControlProps {
  value: WatchlistSortOption
  onChange: (option: WatchlistSortOption) => void
}

export const WatchlistSortControl = ({
  value,
  onChange,
}: WatchlistSortControlProps) => {
  const { t } = useTranslation("collection")

  return (
    <S.Field>
      {t("watchlist.sort.label")}
      <S.Select
        value={value}
        aria-label={t("watchlist.sort.ariaLabel")}
        onChange={event =>
          onChange(event.target.value as WatchlistSortOption)
        }
      >
        {WATCHLIST_SORT_OPTIONS.map(option => (
          <option key={option} value={option}>
            {t(`watchlist.sort.${option}`)}
          </option>
        ))}
      </S.Select>
    </S.Field>
  )
}
