import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 72px);
  padding: 32px 40px 48px;
  background: #0f172a;
`;

export const Header = styled.header`
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  margin: 0 0 16px;
  font-size: 32px;
  font-weight: 700;
  color: #f8fafc;
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 560px;
  height: 48px;
  padding: 0 18px;
  border-radius: 12px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #f8fafc;
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: #3b82f6;
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
  color: #f8fafc;
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
  border: 1px solid #334155;
  border-radius: 999px;
  padding: 8px 14px;
  background: #1e293b;
  color: #e2e8f0;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #334155;
  }
`;

export const TextButton = styled.button`
  border: none;
  background: transparent;
  color: #93c5fd;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: #bfdbfe;
  }
`;

export const StateMessage = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #94a3b8;
`;

export const ErrorBox = styled.div`
  padding: 24px;
  border-radius: 12px;
  background: #1e293b;
  border: 1px solid #334155;
`;

export const ErrorTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  color: #f8fafc;
`;

export const ActionButton = styled.button`
  margin-top: 16px;
  height: 44px;
  padding: 0 22px;
  border: none;
  border-radius: 10px;
  background: #2563eb;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;
