import { Link } from "react-router-dom";
import styled from "styled-components";

export const CardContainer = styled.div`
  position: relative;
  flex: 0 0 160px;
  color: inherit;
`;

export const CardLink = styled(Link)`
  position: relative;
  flex: 0 0 160px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const Poster = styled.div<{ $src?: string }>`
  width: 160px;
  height: 240px;
  border-radius: 12px;
  overflow: hidden;
  background: ${({ $src }) =>
    $src
      ? `url(${$src}) center / cover no-repeat`
      : "linear-gradient(135deg, #1e293b, #334155)"};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
`;

export const Title = styled.h3`
  margin: 10px 0 4px;
  font-size: 14px;
  font-weight: 600;
  color: #f8fafc;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Meta = styled.p`
  margin: 0;
  font-size: 13px;
  color: #94a3b8;
`;

export const Badge = styled.span<{
  $type: "movie" | "tv" | "person";
}>`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  color: white;
  background: ${({ $type }) => {
    if ($type === "movie") {
      return "#2563eb";
    }

    if ($type === "tv") {
      return "#7c3aed";
    }

    return "#059669";
  }};
`;
