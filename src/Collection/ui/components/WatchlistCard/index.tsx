import { useTranslation } from "react-i18next"

import { IMAGE } from "../../../../Common"

import type {
  WatchlistEntry,
  WatchlistStatus,
} from "../../../core/types/Watchlist.types"
import { WatchlistStatusSelect } from "../WatchlistStatusSelect"

import * as S from "./StyledComponents"

interface WatchlistCardProps {
  entry: WatchlistEntry
  onStatusChange: (status: WatchlistStatus) => void
  onRemove: () => void
}

const getPosterUrl = (posterPath: string | null) =>
  posterPath ? `${IMAGE.W342}${posterPath}` : undefined

const getDetailRoute = (entry: WatchlistEntry) =>
  entry.mediaType === "movie"
    ? `/movie/${entry.mediaId}`
    : `/tv/${entry.mediaId}`

const getMetaLabel = (entry: WatchlistEntry) => {
  const year = entry.snapshot.year ?? "—"
  const rating = entry.snapshot.voteAverage.toFixed(1)

  return `${year} · ★ ${rating}`
}

export const WatchlistCard = ({
  entry,
  onStatusChange,
  onRemove,
}: WatchlistCardProps) => {
  const { t } = useTranslation("collection")
  const posterUrl = getPosterUrl(entry.snapshot.posterPath)
  const detailRoute = getDetailRoute(entry)
  const statusFieldId = `watchlist-status-${entry.id}`

  return (
    <S.Card>
      <S.RemoveButton
        type="button"
        aria-label={t("watchlist.actions.removeFromCard", {
          title: entry.snapshot.title,
        })}
        onClick={onRemove}
      >
        ×
      </S.RemoveButton>

      <S.PosterLink to={detailRoute}>
        <S.Poster $src={posterUrl} role="img" aria-label={entry.snapshot.title} />
      </S.PosterLink>

      <S.Body>
        <div>
          <S.TitleLink to={detailRoute}>
            <S.Title>{entry.snapshot.title}</S.Title>
          </S.TitleLink>
          <S.Meta>{getMetaLabel(entry)}</S.Meta>
        </div>

        <S.StatusField>
          <S.StatusLabel htmlFor={statusFieldId}>
            {t("watchlist.card.statusLabel")}
          </S.StatusLabel>
          <WatchlistStatusSelect
            id={statusFieldId}
            value={entry.status}
            aria-label={t("watchlist.card.statusAriaLabel", {
              title: entry.snapshot.title,
            })}
            onChange={onStatusChange}
          />
        </S.StatusField>
      </S.Body>
    </S.Card>
  )
}
