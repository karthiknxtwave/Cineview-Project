import { useTranslation } from "react-i18next"

import { WatchlistCard } from "../components/WatchlistCard"
import { WatchlistEmptyState } from "../components/WatchlistEmptyState"
import { WatchlistFilterTabs } from "../components/WatchlistFilterTabs"
import { WatchlistSortControl } from "../components/WatchlistSortControl"
import { useWatchlistPageController } from "../controllers/useWatchlistPageController"
import * as S from "./WatchlistPageStyledComponents"

export const WatchlistPage = () => {
  const { t } = useTranslation("collection")
  const {
    filteredEntries,
    activeFilter,
    sortOption,
    counts,
    isEmpty,
    isFilteredEmpty,
    setActiveFilter,
    setSortOption,
    handleStatusChange,
    handleRemove,
  } = useWatchlistPageController()

  return (
    <S.Page>
      <S.Header>
        <S.Title>{t("watchlist.page.title")}</S.Title>
        {!isEmpty && (
          <WatchlistSortControl value={sortOption} onChange={setSortOption} />
        )}
      </S.Header>

      {!isEmpty && (
        <S.Controls>
          <WatchlistFilterTabs
            activeFilter={activeFilter}
            counts={counts}
            onFilterChange={setActiveFilter}
          />
        </S.Controls>
      )}

      {isEmpty && <WatchlistEmptyState variant="empty" />}

      {!isEmpty && isFilteredEmpty && (
        <WatchlistEmptyState variant="filtered" />
      )}

      {!isEmpty && !isFilteredEmpty && (
        <S.Grid>
          {filteredEntries.map(entry => (
            <WatchlistCard
              key={entry.id}
              entry={entry}
              onStatusChange={status => handleStatusChange(entry.id, status)}
              onRemove={() => handleRemove(entry.id)}
            />
          ))}
        </S.Grid>
      )}
    </S.Page>
  )
}
