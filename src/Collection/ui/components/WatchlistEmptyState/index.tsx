import { useTranslation } from "react-i18next"

import * as S from "./StyledComponents"

type WatchlistEmptyStateVariant = "empty" | "filtered"

interface WatchlistEmptyStateProps {
  variant?: WatchlistEmptyStateVariant
}

export const WatchlistEmptyState = ({
  variant = "empty",
}: WatchlistEmptyStateProps) => {
  const { t } = useTranslation("collection")
  const isFiltered = variant === "filtered"

  return (
    <S.Container>
      <S.Title>
        {t(
          isFiltered
            ? "watchlist.empty.filteredTitle"
            : "watchlist.empty.title",
        )}
      </S.Title>
      <S.Description>
        {t(
          isFiltered
            ? "watchlist.empty.filteredDescription"
            : "watchlist.empty.description",
        )}
      </S.Description>
      {!isFiltered && (
        <S.BrowseLink to="/">{t("watchlist.empty.browseLink")}</S.BrowseLink>
      )}
    </S.Container>
  )
}
