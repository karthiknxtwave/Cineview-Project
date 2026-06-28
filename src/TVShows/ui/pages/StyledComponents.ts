import { Link } from "react-router-dom";
import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 72px);
  background: #0f172a;
  padding-bottom: 48px;
`;

export const Hero = styled.section<{ $src?: string }>`
  padding: 48px 40px;
  background: ${({ $src }) =>
    $src
      ? `linear-gradient(to top, #0f172a 10%, rgba(15, 23, 42, 0.75) 100%), url(${$src}) center / cover no-repeat`
      : "linear-gradient(135deg, #1e293b, #0f172a)"};
`;

export const Title = styled.h1`
  margin: 0 0 12px;
  font-size: 40px;
  color: #f8fafc;
`;

export const Meta = styled.p`
  margin: 0 0 16px;
  color: #94a3b8;
`;

export const Overview = styled.p`
  margin: 0 0 20px;
  max-width: 760px;
  color: #cbd5e1;
  line-height: 1.7;
`;

export const WatchlistButton = styled.button<{ $active?: boolean }>`
  height: 44px;
  padding: 0 22px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.border : "transparent"};
  border-radius: 10px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.surfaceElevated : theme.colors.primary};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.textPrimary : theme.colors.textInverse};
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.inputBackground : theme.colors.primaryHover};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const Section = styled.section`
  padding: 32px 40px 0;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 22px;
  color: #f8fafc;
`;

export const SeasonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SeasonLink = styled(Link)`
  padding: 16px 18px;
  border-radius: 12px;
  background: #1e293b;
  color: #f8fafc;
  text-decoration: none;
  border: 1px solid #334155;

  &:hover {
    border-color: #3b82f6;
  }
`;

export const SeasonName = styled.span`
  font-weight: 600;
`;

export const SeasonPanel = styled.section`
  margin: 32px 40px 0;
  padding-top: 24px;
  border-top: 1px solid #334155;
`;

export const EpisodeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const EpisodeCard = styled.article`
  padding: 18px;
  border-radius: 12px;
  background: #1e293b;
  border: 1px solid #334155;
`;

export const EpisodeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const EpisodeTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #f8fafc;
`;

export const EpisodeCheckbox = styled.input`
  width: 18px;
  height: 18px;
`;

export const EpisodeMeta = styled.p`
  margin: 8px 0;
  color: #94a3b8;
  font-size: 14px;
`;

export const EpisodeOverview = styled.p`
  margin: 0;
  color: #cbd5e1;
  line-height: 1.6;
`;

export const StateContainer = styled.div`
  min-height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px;
  background: #0f172a;
`;

export const StateTitle = styled.h2`
  margin: 0;
  color: #f8fafc;
`;

export const StateMessage = styled.p`
  margin: 0;
  color: #94a3b8;
`;

export const ActionButton = styled.button`
  height: 44px;
  padding: 0 22px;
  border: none;
  border-radius: 10px;
  background: #2563eb;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

export const InlineError = styled.p`
  margin: 0 0 12px;
  color: #94a3b8;
`;
