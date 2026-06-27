import type { Video } from "../types/Movie.types";

export function getYouTubeTrailerKey(
  videos: Video[],
): string | null {
  const youtubeVideos = videos.filter(
    (video) => video.site === "YouTube",
  );

  const officialTrailer = youtubeVideos.find(
    (video) =>
      video.type === "Trailer" &&
      video.official,
  );

  if (officialTrailer) {
    return officialTrailer.key;
  }

  const trailer = youtubeVideos.find(
    (video) => video.type === "Trailer",
  );

  if (trailer) {
    return trailer.key;
  }

  return youtubeVideos[0]?.key ?? null;
}