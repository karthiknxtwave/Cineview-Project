import styled from 'styled-components'

export const Page = styled.main`
  min-height: calc(100vh - 72px);
  background: #0f172a;
  padding-bottom: 48px;
`

export const Hero = styled.section<{ $src?: string }>`
  min-height: 420px;
  padding: 48px 40px;
  background: ${({ $src }) =>
    $src
      ? `linear-gradient(to top, #0f172a 10%, rgba(15, 23, 42, 0.7) 60%, rgba(15, 23, 42, 0.35) 100%), url(${$src}) center / cover no-repeat`
      : 'linear-gradient(135deg, #1e293b, #0f172a)'};
`

export const HeroContent = styled.div`
  max-width: 760px;
`

export const Title = styled.h1`
  margin: 0 0 12px;
  font-size: 42px;
  font-weight: 800;
  color: #f8fafc;
`

export const Tagline = styled.p`
  margin: 0 0 12px;
  font-size: 18px;
  font-style: italic;
  color: #cbd5e1;
`

export const Meta = styled.p`
  margin: 0 0 16px;
  color: #94a3b8;
  font-size: 15px;
`

export const DetailsGrid = styled.dl`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 24px;
  margin: 0 0 16px;
`

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const DetailLabel = styled.dt`
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748b;
`

export const DetailValue = styled.dd`
  margin: 0;
  font-size: 14px;
  color: #e2e8f0;
`

export const HomepageLink = styled.a`
  font-size: 14px;
  color: #93c5fd;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`

export const Genre = styled.span`
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.2);
  color: #bfdbfe;
  font-size: 13px;
  font-weight: 600;
`

export const Overview = styled.p`
  margin: 0 0 20px;
  max-width: 720px;
  color: #cbd5e1;
  font-size: 16px;
  line-height: 1.7;
`

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`

export const WatchlistButton = styled.button`
  height: 44px;
  padding: 0 22px;
  border: none;
  border-radius: 10px;
  background: #2563eb;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`

export const TrailerButton = styled.button`
  height: 44px;
  padding: 0 22px;
  border: 1px solid #64748b;
  border-radius: 10px;
  background: transparent;
  color: #f8fafc;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`

export const Section = styled.section`
  padding: 32px 0 0;
`

export const SectionTitle = styled.h2`
  margin: 0 0 16px;
  padding: 0 40px;
  font-size: 22px;
  font-weight: 700;
  color: #f8fafc;
`

export const CastHint = styled.p`
  margin: 0 0 8px;
  padding: 0 40px;
  font-size: 13px;
  color: #64748b;
`

export const CastRow = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 0 40px 12px;
  scroll-snap-type: x mandatory;
  mask-image: linear-gradient(to right, black 90%, transparent 100%);
`

export const CastCard = styled.div`
  flex: 0 0 120px;
  scroll-snap-align: start;
`

export const CastPhoto = styled.div<{ $src?: string }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${({ $src }) =>
    $src
      ? `url(${$src}) center / cover no-repeat`
      : 'linear-gradient(135deg, #1e293b, #334155)'};
`

export const CastName = styled.p`
  margin: 10px 0 4px;
  font-size: 14px;
  font-weight: 600;
  color: #f8fafc;
`

export const CastRole = styled.p`
  margin: 0;
  font-size: 13px;
  color: #94a3b8;
`

export const StateContainer = styled.div`
  min-height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px;
  background: #0f172a;
  text-align: center;
`

export const StateTitle = styled.h2`
  margin: 0;
  font-size: 28px;
  color: #f8fafc;
`

export const StateMessage = styled.p`
  margin: 0;
  max-width: 420px;
  color: #94a3b8;
  line-height: 1.6;
`

export const ActionButton = styled.button`
  height: 44px;
  padding: 0 22px;
  border: none;
  border-radius: 10px;
  background: #2563eb;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`

export const InlineError = styled.p`
  margin: 0;
  padding: 0 40px;
  color: #94a3b8;
`

export const InlineButton = styled.button`
  border: none;
  background: transparent;
  color: #93c5fd;
  cursor: pointer;
  font-weight: 600;
`

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.75);
  z-index: 200;
`

export const ModalContent = styled.div`
  width: min(90vw, 560px);
  padding: 32px;
  border-radius: 16px;
  background: #1e293b;
  text-align: center;
`

export const ModalTitle = styled.h2`
  margin: 0 0 12px;
  color: #f8fafc;
`
