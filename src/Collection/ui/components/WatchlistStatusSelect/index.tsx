import { useTranslation } from "react-i18next"

import { WATCHLIST_STATUSES } from "../../../core/constants/Watchlist.constants"

import type { WatchlistStatus } from "../../../core/types/Watchlist.types"

import * as S from "./StyledComponents"

interface WatchlistStatusSelectProps {
  value: WatchlistStatus
  onChange: (status: WatchlistStatus) => void
  id?: string
  "aria-label"?: string
}

export const WatchlistStatusSelect = ({
  value,
  onChange,
  id,
  "aria-label": ariaLabel,
}: WatchlistStatusSelectProps) => {
  const { t } = useTranslation("collection")
  const label = ariaLabel ?? t("watchlist.statusSelect.ariaLabel")

  return (
    <S.Select
      id={id}
      value={value}
      aria-label={label}
      onChange={event => onChange(event.target.value as WatchlistStatus)}
    >
      {WATCHLIST_STATUSES.map(status => (
        <option key={status} value={status}>
          {t(`watchlist.status.${status}`)}
        </option>
      ))}
    </S.Select>
  )
}
