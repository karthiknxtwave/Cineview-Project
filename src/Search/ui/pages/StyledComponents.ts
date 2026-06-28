import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 72px);
  padding: 32px 40px 48px;
  background: ${({ theme }) => theme.colors.pageBackground};
`;

export const Header = styled.header`
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  margin: 0 0 16px;
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 560px;
  height: 48px;
  padding: 0 18px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primaryActive};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusRing};
  }
`;

export const Section = styled.section`
  margin-bottom: 36px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ResultsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const RecentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const RecentChip = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  padding: 8px 14px;
  background: ${({ theme }) => theme.colors.surfaceElevated};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

export const TextButton = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.linkActive};
  }
`;

export const StateMessage = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ErrorBox = styled.div`
  padding: 24px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ErrorTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ActionButton = styled.button`
  margin-top: 16px;
  height: 44px;
  padding: 0 22px;
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;
