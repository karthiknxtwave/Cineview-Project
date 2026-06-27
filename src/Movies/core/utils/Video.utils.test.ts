import { describe, expect, it } from 'vitest'

import type { Video } from '../types/Movie.types'
import { getYouTubeTrailerKey } from './Video.utils'

const createVideo = (
  overrides: Partial<Video> & Pick<Video, 'key' | 'site' | 'type'>,
): Video => ({
  id: '1',
  name: 'Trailer',
  official: false,
  ...overrides,
})

describe('getYouTubeTrailerKey', () => {
  it('prefers official YouTube trailers', () => {
    const key = getYouTubeTrailerKey([
      createVideo({ key: 'teaser', site: 'YouTube', type: 'Teaser', official: true }),
      createVideo({ key: 'official-trailer', site: 'YouTube', type: 'Trailer', official: true }),
    ])

    expect(key).toBe('official-trailer')
  })

  it('falls back to the first YouTube trailer', () => {
    const key = getYouTubeTrailerKey([
      createVideo({ key: 'first-trailer', site: 'YouTube', type: 'Trailer', official: false }),
      createVideo({ key: 'second-trailer', site: 'YouTube', type: 'Trailer', official: false }),
    ])

    expect(key).toBe('first-trailer')
  })

  it('returns null when no YouTube videos exist', () => {
    expect(
      getYouTubeTrailerKey([
        createVideo({ key: 'vimeo', site: 'Vimeo', type: 'Trailer', official: true }),
      ]),
    ).toBeNull()
  })
})
